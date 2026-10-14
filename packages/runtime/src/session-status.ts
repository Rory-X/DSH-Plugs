import type { UiSession } from '@deepseek-ai/dsh-client-ui-session/client'
import type { SessionId } from '@deepseek-ai/dsh-session/types'

export type PendingInteractionsSource = UiSession['pendingInteractions']
type PendingSnapshot = ReturnType<PendingInteractionsSource['getSnapshot']>
type PendingValue = PendingSnapshot extends ReadonlyMap<unknown, infer Value> ? Value : never

/** DSH 0.2 combines activity and waits in one public UI-owned source. */
export interface SessionStatus {
  readonly running?: boolean
  readonly pendingInteraction?: PendingValue
  readonly completionUnread?: boolean
}

export interface SessionStatusSource {
  getSnapshot(): ReadonlyMap<SessionId, SessionStatus>
  subscribe(listener: () => void): () => void
}

export interface UiSessionNotificationFace {
  readonly pendingInteractions?: PendingInteractionsSource
  readonly sessionStatus?: SessionStatusSource
}

const adapters = new WeakMap<SessionStatusSource, PendingInteractionsSource>()

/** Preserve native wait objects and stable snapshots across both desktop generations. */
export function resolvePendingInteractions(uiSession: UiSessionNotificationFace): PendingInteractionsSource {
  if (uiSession.pendingInteractions !== undefined) return uiSession.pendingInteractions
  const source = uiSession.sessionStatus
  if (source === undefined) throw new Error('DSH does not expose session notification status')
  const cached = adapters.get(source)
  if (cached !== undefined) return cached
  let previous: ReturnType<SessionStatusSource['getSnapshot']> | undefined
  let snapshot: PendingSnapshot = new Map()
  const adapter: PendingInteractionsSource = {
    getSnapshot() {
      const current = source.getSnapshot()
      if (current === previous) return snapshot
      previous = current
      snapshot = new Map([...current].flatMap(([id, status]) =>
        status.pendingInteraction === undefined ? [] : [[id, status.pendingInteraction] as const],
      ))
      return snapshot
    },
    subscribe: listener => source.subscribe(listener),
  }
  adapters.set(source, adapter)
  return adapter
}
