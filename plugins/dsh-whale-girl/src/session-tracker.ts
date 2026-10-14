import { createSessionView, type SessionView } from './shared/sessions.ts'

export interface SessionMeta {
  id: string
  createdAt: number
  title?: string | null
  cwd?: string
  parentId?: string
  origin?: 'subagent'
}

type ObjectValue = Record<string, unknown>
const object = (value: unknown): ObjectValue => value !== null && typeof value === 'object' && !Array.isArray(value) ? value as ObjectValue : {}
const timestamp = (value: unknown, fallback: number) => typeof value === 'number' && Number.isFinite(value) && value >= 0 ? value : fallback
const bounded = (text: string) => text.slice(-2000)

/** Read visible text only; reasoning, tool arguments and attachment payloads stay out of the desktop preview. */
export function visibleMessageText(content: unknown): string {
  if (typeof content === 'string') return bounded(content)
  if (!Array.isArray(content)) return ''
  return bounded(content.map(part => {
    const block = object(part)
    return block.type === 'text' && typeof block.text === 'string' ? block.text : ''
  }).filter(Boolean).join('\n'))
}

interface Entry {
  view: SessionView
  seq: number
  tools: Map<string, string>
  committed: string
  stream: { attempt: string; revision: number; index: number; text: string; ended: boolean } | undefined
}

/** One independent projection per session, including replay and transient assistant streams. */
export class SessionTracker {
  private readonly entries = new Map<string, Entry>()

  has(id: string): boolean { return this.entries.has(id) }
  remove(id: string): void { this.entries.delete(id) }
  snapshot(): SessionView[] { return [...this.entries.values()].map(entry => ({ ...entry.view })) }

  seed(meta: SessionMeta, events: readonly unknown[], running?: boolean, now = Date.now()): void {
    this.entries.delete(meta.id)
    this.ensure(meta)
    for (const event of events) this.event(meta, event, now)
    if (running !== undefined) this.status(meta, running, now)
    this.metadata(meta)
  }

  metadata(meta: SessionMeta): void {
    const entry = this.ensure(meta)
    const title = meta.title?.trim()
    if (title && title !== entry.view.title) entry.view = { ...entry.view, title: title.slice(0, 160) }
  }

  /** A driver can still be draining after turn/end; snapshot reads must not reopen that completed turn. */
  reconcile(meta: SessionMeta, running: boolean, now = Date.now()): boolean {
    const entry = this.ensure(meta)
    return !running && entry.view.running === true ? this.status(meta, false, now) : false
  }

  private ensure(meta: SessionMeta): Entry {
    let entry = this.entries.get(meta.id)
    if (!entry) {
      entry = {
        view: { ...createSessionView(meta.id, meta.createdAt), title: meta.title ?? null, cwd: meta.cwd,
          parentId: meta.parentId, origin: meta.origin, running: false, message: '', prompt: '', updatedAt: meta.createdAt },
        seq: -1, tools: new Map(), committed: '', stream: undefined,
      }
      this.entries.set(meta.id, entry)
    }
    return entry
  }

  status(meta: SessionMeta, running: boolean, now = Date.now()): boolean {
    const entry = this.ensure(meta)
    if (entry.view.running === running) return false
    if (running) {
      entry.view = { ...entry.view, running, activity: 'thinking', startedAt: now, completedAt: undefined,
        updatedAt: now, message: '', prompt: '' }
    } else {
      entry.tools.clear()
      entry.view = { ...entry.view, running, activeToolCount: 0, updatedAt: now,
        activity: ['waiting', 'error', 'cancelled'].includes(entry.view.activity) ? entry.view.activity : 'done',
        completedAt: entry.view.completedAt ?? now }
    }
    return true
  }

  event(meta: SessionMeta, raw: unknown, now = Date.now()): boolean {
    const entry = this.ensure(meta)
    const event = object(raw)
    if (typeof event.seq === 'number' && Number.isSafeInteger(event.seq)) {
      if (event.seq <= entry.seq) return false
      entry.seq = event.seq
    }
    const data = object(event.data)
    const time = timestamp(event.time, now)
    const previous = entry.view
    const patch = (value: Partial<SessionView>) => { entry.view = { ...entry.view, ...value, updatedAt: time } }
    switch (event.type) {
      case 'session/title':
        if (typeof data.title === 'string' && data.title.trim()) patch({ title: data.title.trim().slice(0, 160) })
        break
      case 'turn/start':
        entry.tools.clear()
        entry.stream = undefined
        entry.committed = ''
        patch({ running: true, activity: 'thinking', startedAt: time, completedAt: undefined,
          message: '', prompt: '', activeToolCount: 0 })
        break
      case 'user/message': {
        const source = object(data.source)
        if (source.kind && source.kind !== 'human' && source.kind !== 'user') break
        const prompt = visibleMessageText(data.content)
        if (prompt) patch({ prompt, title: entry.view.title || prompt.replace(/\s+/g, ' ').slice(0, 80) })
        break
      }
      case 'assistant/message': {
        const text = visibleMessageText(object(data.message).content)
        if (text) {
          entry.committed = text
          patch({ message: text, activity: entry.view.running ? 'responding' : entry.view.activity })
        }
        break
      }
      case 'tool/call': {
        if (typeof data.name !== 'string' || !data.name) break
        entry.tools.set(typeof data.callId === 'string' ? data.callId : data.name, data.name)
        patch({ activity: `tool:${data.name}`, activeToolCount: entry.tools.size })
        break
      }
      case 'tool/result': {
        if (typeof data.callId === 'string') entry.tools.delete(data.callId)
        const name = [...entry.tools.values()].at(-1)
        patch({ activity: name ? `tool:${name}` : entry.view.running ? 'thinking' : entry.view.activity,
          activeToolCount: entry.tools.size })
        break
      }
      case 'turn/end': {
        entry.tools.clear()
        if (entry.stream) entry.stream.ended = true
        const kind = object(data.reason).kind
        const activity = kind === 'blocked' ? 'waiting'
          : kind === 'error' || kind === 'failed' ? 'error'
          : kind === 'cancelled' || kind === 'aborted' || kind === 'interrupted' ? 'cancelled' : 'done'
        patch({ running: false, activity, completedAt: time, activeToolCount: 0 })
        break
      }
    }
    return previous !== entry.view
  }

  stream(meta: SessionMeta, raw: unknown, now = Date.now()): boolean {
    const entry = this.ensure(meta)
    const frame = object(raw)
    if (typeof frame.attemptId !== 'string' || typeof frame.revision !== 'number') return false
    const old = entry.stream
    if (old && frame.revision < old.revision) return false
    if (frame.type === 'start') {
      if (old && frame.revision === old.revision) return false
      entry.stream = { attempt: frame.attemptId, revision: frame.revision, index: -1, text: '', ended: false }
      entry.view = { ...entry.view, running: true, activity: 'thinking', completedAt: undefined, updatedAt: now }
      return true
    }
    if (!old || frame.revision > old.revision) {
      entry.stream = { attempt: frame.attemptId, revision: frame.revision, index: -1, text: '', ended: false }
    }
    const stream = entry.stream!
    if (frame.attemptId !== stream.attempt || stream.ended) return false
    if (frame.type === 'end') {
      stream.ended = true
      if (object(frame.outcome).kind === 'abandoned') {
        entry.view = { ...entry.view, message: entry.committed, activity: 'thinking', updatedAt: now }
        return true
      }
      return false
    }
    if (frame.type !== 'chunk' || typeof frame.index !== 'number' || frame.index <= stream.index) return false
    stream.index = frame.index
    const chunk = object(frame.chunk)
    if (chunk.type !== 'text-delta' || typeof chunk.text !== 'string' || chunk.text === '') return false
    stream.text = bounded(stream.text + chunk.text)
    entry.view = { ...entry.view, message: stream.text, activity: 'responding', running: true,
      completedAt: undefined, updatedAt: timestamp(frame.time, now) }
    return true
  }
}
