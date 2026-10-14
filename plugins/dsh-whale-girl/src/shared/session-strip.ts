import type { SessionView } from './sessions.ts'

export type PendingKind = 'approval' | 'question' | 'plan-review'
export interface SessionStripContext {
  currentId?: string
  pending: Array<{ id: string; kind: PendingKind }>
}
export interface SessionStripRow {
  id: string
  title: string
  preview: string
  status: 'running' | 'waiting' | 'done' | 'error' | 'cancelled'
  label: string
  startedAt: number
  workspace: string
  parentId?: string
  depth: number
  childCount: number
  ancestors: string[]
}

export const COMPLETED_VISIBLE_MS = 8000

export function readSessionViews(raw: unknown): SessionView[] | null {
  if (!Array.isArray(raw)) return null
  return raw.flatMap(value => {
    if (value === null || typeof value !== 'object') return []
    const row = value as Record<string, unknown>
    if (typeof row.id !== 'string' || typeof row.activity !== 'string' || typeof row.since !== 'number') return []
    const numeric = (key: string) => typeof row[key] === 'number' && Number.isFinite(row[key]) ? row[key] as number : undefined
    const string = (key: string) => typeof row[key] === 'string' ? row[key] as string : undefined
    return [{ id: row.id, activity: row.activity, since: row.since, title: string('title') ?? null,
      running: typeof row.running === 'boolean' ? row.running : row.activity === 'thinking' || row.activity === 'responding' || row.activity.startsWith('tool:'),
      message: string('message'), prompt: string('prompt'), cwd: string('cwd'), parentId: string('parentId'),
      origin: row.origin === 'subagent' ? 'subagent' as const : undefined,
      updatedAt: numeric('updatedAt'), startedAt: numeric('startedAt'), completedAt: numeric('completedAt'), activeToolCount: numeric('activeToolCount') }]
  })
}

export function readSessionStripContext(raw: unknown): SessionStripContext | null {
  if (raw === null || typeof raw !== 'object') return null
  const value = raw as Record<string, unknown>
  if (!Array.isArray(value.pending)) return null
  const pending: SessionStripContext['pending'] = []
  for (const item of value.pending.slice(0, 128)) {
    if (item === null || typeof item !== 'object') continue
    const row = item as Record<string, unknown>
    if (typeof row.id !== 'string' || row.id.length > 200) continue
    if (row.kind === 'approval' || row.kind === 'question' || row.kind === 'plan-review') pending.push({ id: row.id, kind: row.kind })
  }
  return { currentId: typeof value.currentId === 'string' ? value.currentId : undefined, pending }
}

export function previewText(value: string | undefined, max = 220): string {
  const text = (value ?? '').replace(/\u001b\[[0-9;]*[a-zA-Z]/g, '')
    .replace(/```[^\n]*\n?/g, '').replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/[*#`]/g, '')
    .replace(/[\u0000-\u0008\u000b-\u001f\u007f]/g, '').replace(/\s+/g, ' ').trim()
  return text.length > max ? `…${text.slice(-(max - 1))}` : text
}

export function sessionStripOverview(views: readonly SessionView[], context: SessionStripContext,
  selectedId: string | undefined, now: number) {
  const byId = new Map(views.map(view => [view.id, view]))
  const pending = new Map(context.pending.map(value => [value.id, value.kind]))
  const visible = new Set(views.filter(view => view.running || pending.has(view.id) || view.activity === 'waiting'
    || (typeof view.completedAt === 'number' && now - view.completedAt < COMPLETED_VISIBLE_MS)).map(view => view.id))
  // An idle parent still represents running children. Forked root sessions are
  // independent: only origin=subagent participates in this hierarchy.
  for (const id of [...visible]) {
    const seen = new Set([id])
    let view = byId.get(id)
    while (view?.origin === 'subagent' && view.parentId && byId.has(view.parentId) && !seen.has(view.parentId)) {
      visible.add(view.parentId)
      seen.add(view.parentId)
      view = byId.get(view.parentId)
    }
  }
  const rows = [...visible].flatMap(id => {
    const view = byId.get(id)
    if (!view) return []
    const kind = pending.get(id)
    const status: SessionStripRow['status'] = kind || view.activity === 'waiting' ? 'waiting'
      : view.running ? 'running' : view.activity === 'error' ? 'error' : view.activity === 'cancelled' ? 'cancelled' : 'done'
    const label = kind === 'approval' ? '等待确认' : kind === 'question' ? '等待回答'
      : kind === 'plan-review' ? '等待计划确认' : status === 'waiting' ? '等待继续'
      : status === 'error' ? '运行失败' : status === 'cancelled' ? '已停止' : status === 'done' ? '已完成'
      : (view.activeToolCount ?? 0) > 1 ? `${view.activeToolCount} 项操作执行中`
      : view.activity.startsWith('tool:') ? '正在执行操作' : view.activity === 'responding' ? '正在回复' : '正在思考'
    const row: SessionStripRow = {
      id, title: previewText(view.title || view.prompt || '未命名会话', 2000).slice(0, 100),
      preview: previewText(view.message || view.prompt) || (status === 'running' ? '正在处理这条会话…' : label),
      status, label, startedAt: view.startedAt ?? view.since, workspace: view.cwd?.split(/[\\/]/).filter(Boolean).at(-1) ?? '',
      parentId: view.origin === 'subagent' && view.parentId !== id && visible.has(view.parentId ?? '') ? view.parentId : undefined,
      depth: 0, childCount: 0, ancestors: [],
    }
    return [row]
  })
  const rowMap = new Map(rows.map(row => [row.id, row]))
  for (const row of rows) {
    const seen = new Set([row.id])
    let parent = row.parentId ? rowMap.get(row.parentId) : undefined
    while (parent && !seen.has(parent.id)) {
      seen.add(parent.id)
      row.depth++
      row.ancestors.unshift(parent.id)
      parent.childCount++
      if (row.status === 'running' || row.status === 'waiting') {
        if (row.status === 'waiting' && parent.status !== 'waiting') {
          parent.status = 'waiting'
          parent.label = '子任务等待处理'
          parent.preview = `${row.title}：${row.preview}`
        } else if (parent.status === 'done') {
          parent.status = 'running'
          parent.label = '子任务进行中'
          parent.preview = `${row.title}：${row.preview}`
        }
      }
      parent = parent.parentId ? rowMap.get(parent.parentId) : undefined
    }
    if (parent) { row.parentId = undefined; row.depth = 0; row.ancestors = [] }
  }
  const rank = (row: SessionStripRow) => row.status === 'waiting' ? 0 : row.status === 'running' ? 1 : row.status === 'error' ? 2 : 3
  const compare = (a: SessionStripRow, b: SessionStripRow) => rank(a) - rank(b) || a.startedAt - b.startedAt || a.id.localeCompare(b.id)
  const ordered: SessionStripRow[] = []
  const placed = new Set<string>()
  const append = (row: SessionStripRow) => {
    if (placed.has(row.id)) return
    placed.add(row.id)
    ordered.push(row)
    rows.filter(child => child.parentId === row.id).sort(compare).forEach(append)
  }
  rows.filter(row => !row.parentId).sort(compare).forEach(append)
  rows.sort(compare).forEach(append)
  const activeCount = views.filter(view => view.running || pending.has(view.id) || view.activity === 'waiting').length
  const rootCount = rows.filter(row => !row.parentId && (row.status === 'running' || row.status === 'waiting')).length
  const childActiveCount = views.filter(view => view.origin === 'subagent' && (view.running || pending.has(view.id) || view.activity === 'waiting')).length
  const waitingCount = views.filter(view => pending.has(view.id) || view.activity === 'waiting').length
  const selected = ordered.find(row => row.id === selectedId)
    ?? ordered.find(row => pending.has(row.id) || byId.get(row.id)?.activity === 'waiting')
    ?? ordered.find(row => row.id === context.currentId)
    ?? ordered[0]
  return { rows: ordered, selected, activeCount, rootCount, childActiveCount, waitingCount }
}

export function elapsedLabel(startedAt: number, now: number): string {
  const seconds = Math.max(0, Math.floor((now - startedAt) / 1000))
  if (seconds >= 3600) return `${Math.floor(seconds / 3600)}:${String(Math.floor(seconds / 60) % 60).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`
}

export interface StripRect { x: number; y: number; width: number; height: number }
export interface StripLayout {
  bounds: StripRect
  petX: number
  petY: number
  panelX: number
  panelY: number
  panelWidth: number
  listY: number
  listHeight: number
}

/** Keep the pet's screen anchor while the strip grows left/right or above/below it. */
export function sessionStripLayout(anchor: { x: number; y: number }, area: StripRect, visible: boolean, rowCount: number, expanded: boolean, statsVisible = false, controlsVisible = false): StripLayout {
  const width = Math.min(visible ? 512 : statsVisible ? 290 : 176, area.width)
  const panelWidth = Math.max(100, width - 176)
  const listHeight = visible && expanded && rowCount > 1 ? Math.min(4, rowCount) * 68 + 8 : 0
  const baseHeight = controlsVisible ? 252 : 220
  const belowHeight = Math.max(baseHeight, listHeight ? 174 + listHeight : baseHeight)
  // When the list opens upward, reserve the stats row above the session card too.
  const aboveExtra = listHeight ? Math.max(0, listHeight + 16 - (statsVisible ? 10 : 62)) : 0
  const left = (visible || statsVisible) && anchor.x + width > area.x + area.width && anchor.x - area.x >= panelWidth + 16
  const above = aboveExtra > 0 && anchor.y + belowHeight > area.y + area.height && anchor.y - area.y >= aboveExtra
  const height = above ? baseHeight + aboveExtra : belowHeight
  const petX = left ? panelWidth + 16 : 0
  const petY = above ? aboveExtra : 0
  const x = Math.max(area.x, Math.min(anchor.x - petX, area.x + Math.max(0, area.width - width)))
  const y = Math.max(area.y, Math.min(anchor.y - petY, area.y + Math.max(0, area.height - height)))
  return { bounds: { x: Math.round(x), y: Math.round(y), width, height }, petX, petY,
    panelX: left ? 8 : 168, panelY: petY + 62, panelWidth,
    listY: above ? 8 : 166, listHeight }
}
