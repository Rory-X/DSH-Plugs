import type { PendingInteractionsSource, SessionListState, SessionStatusSource } from '@just-genius/dsh-plugin-runtime/client'
import { completionCopy, pendingAdvance, pendingCopy, type ObservedPending, type PendingKind } from './pending'
import { notificationTag } from './tag'

export interface SessionsListFace {
  readonly list: {
    getSnapshot(): SessionListState
    subscribe(listener: () => void): () => void
  }
}

/**
 * Watch UI-owned approval / ask / plan-review waits and show a
 * desktop notification on the rising edge. Uses the same tag as turn-end
 * banners so the Notification wrap still opens the session.
 */
export function startPendingWatcher(
  sessions: SessionsListFace,
  pendingInteractions: PendingInteractionsSource,
  onConnectionReset: (listener: () => void) => () => void,
  onPermissionChange: (listener: () => void) => () => void = () => () => {},
): () => void {
  const observed = new Map<string, ObservedPending>()

  const reseed = () => {
    observed.clear()
  }

  const stopReset = onConnectionReset(reseed)
  const update = () => {
    const state = sessions.list.getSnapshot()
    if (state.phase === 'pending') return
    const pending = pendingInteractions.getSnapshot()
    for (const id of state.ids) {
      const summary = state.byId[id]
      if (summary === undefined) continue
      const wait = pending.get(id)
      const next = asPendingKind(wait?.kind)
      const { observed: nextObserved, fresh } = pendingAdvance(observed.get(id), next, wait?.key)
      if (fresh && !notificationsAllowed()) continue
      observed.set(id, nextObserved)
      if (!fresh) continue
      if (summary.origin === 'subagent') continue
      if (!shouldShow(id, state.current)) continue
      const kind = next as PendingKind
      const copy = pendingCopy(kind, summary.title ?? summary.displayTitle ?? '')
      show(copy.title, copy.body, id)
    }
    const live = new Set(state.ids.map(String))
    for (const id of [...observed.keys()]) {
      if (!live.has(id)) observed.delete(id)
    }
  }
  const offList = sessions.list.subscribe(update)
  const offPending = pendingInteractions.subscribe(update)
  const offPermission = onPermissionChange(update)
  update()

  return () => {
    offList()
    offPending()
    offPermission()
    stopReset()
  }
}

function asPendingKind(value: string | undefined): PendingKind | undefined {
  if (value === 'approval' || value === 'plan-review' || value === 'question') return value
  return undefined
}

function notificationsAllowed(): boolean {
  const api = window.Notification
  return typeof api === 'function' && api.permission === 'granted'
}

export function canNotifySession(sessionId: string, currentSessionId: string | undefined, visible: boolean, focused: boolean): boolean {
  return sessionId !== currentSessionId || !visible || !focused
}

function shouldShow(sessionId: string, currentSessionId: string | undefined): boolean {
  return notificationsAllowed() && canNotifySession(sessionId, currentSessionId, !document.hidden, document.hasFocus())
}

function show(title: string, body: string, sessionId: string): void {
  const api = window.Notification
  if (typeof api !== 'function' || api.permission !== 'granted') return
  new api(title, {
    body,
    tag: notificationTag(sessionId),
    requireInteraction: true,
  })
}

/** Turn-end notifications are owned here; no separate dsh-notification package is required. */
export function startCompletionWatcher(
  sessions: SessionsListFace,
  pendingInteractions: PendingInteractionsSource,
  onConnectionReset: (listener: () => void) => () => void,
  onPermissionChange: (listener: () => void) => () => void = () => () => {},
  sessionStatus?: SessionStatusSource,
): () => void {
  const running = new Map<string, boolean>()
  const update = () => {
    const state = sessions.list.getSnapshot()
    if (state.phase === 'pending') return
    const pending = pendingInteractions.getSnapshot()
    const statuses = sessionStatus?.getSnapshot()
    for (const id of state.ids) {
      const summary = state.byId[id]
      if (summary === undefined) continue
      const active = statuses?.get(id)?.running ?? summary.running
      const finished = running.get(id) === true && !active
      if (finished && !notificationsAllowed()) continue
      running.set(id, active)
      if (!finished || summary.origin === 'subagent' || pending.has(id) || !shouldShow(id, state.current)) continue
      const copy = completionCopy(summary.title ?? summary.displayTitle ?? '')
      show(copy.title, copy.body, id)
    }
    const ids = new Set(state.ids)
    for (const id of running.keys()) if (!ids.has(id as typeof state.ids[number])) running.delete(id)
  }
  const offList = sessions.list.subscribe(update)
  const offStatus = sessionStatus?.subscribe(update)
  const offReset = onConnectionReset(() => running.clear())
  const offPermission = onPermissionChange(update)
  update()
  return () => { offList(); offStatus?.(); offReset(); offPermission() }
}
