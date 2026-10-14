export const EVENTS_PATH = '/dsh-notify-jump/events'
export const SOCKET_PATH = '/dsh-notify-jump/socket'
export type ReminderKind = 'approval' | 'question' | 'plan-review' | 'completion'
export interface ReminderEvent {
  seq: number
  sessionId: string
  kind: ReminderKind
  title: string
}
export interface ReminderBatch { epoch: string; cursor: number; events: ReminderEvent[] }

export function reminderOriginAllowed(origin: string | undefined, host: string | undefined): boolean {
  if (origin === undefined || host === undefined) return false
  try {
    const url = new URL(origin)
    return (url.protocol === 'http:' || url.protocol === 'https:') && url.host.toLowerCase() === host.toLowerCase()
  } catch { return false }
}

/** Runtime ownership determines children; durable parent lineage can belong to a resumed root. */
export function isReminderRoot<T>(id: string, agents: { get(id: string): T | undefined; roots(): readonly T[] }): boolean {
  const agent = agents.get(id)
  return agent === undefined || agents.roots().includes(agent)
}

export function observeQuestions<Request>(
  source: { on(name: string, listener: (request: Request, next: () => Promise<unknown>) => Promise<unknown>, options: { prepend: boolean }): unknown },
  publish: (request: Request) => void,
): void {
  source.on('user-questions/request', async (request, next) => {
    // The existing answerer consumes the waterfall. Observe before it and always delegate.
    try { publish(request) } catch { /* Notification failures must not interrupt a question. */ }
    return next()
  }, { prepend: true })
}

/** Bounded, per-host event journal. A new client seeds without replaying old reminders. */
export function createReminderJournal(epoch: string, capacity = 128) {
  let sequence = 0
  const events: ReminderEvent[] = []
  return {
    append(event: Omit<ReminderEvent, 'seq'>) {
      const next = { ...event, seq: ++sequence }
      events.push(next)
      if (events.length > capacity) events.splice(0, events.length - capacity)
      return next
    },
    read(after?: number): ReminderBatch {
      return { epoch, cursor: sequence, events: after === undefined ? [] : events.filter(event => event.seq > after) }
    },
  }
}
