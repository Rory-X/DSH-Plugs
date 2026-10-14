import { getPendingInteractions, getSessions, type ClientContext, type SessionId } from '@just-genius/dsh-plugin-runtime/client'
import { CONTRIBUTOR, OVERLAY_ID } from '../shared/config.ts'
import { openTrackedSession, sessionOpenRequest } from '../shared/session-navigation.ts'
import type { PendingKind, SessionStripContext } from '../shared/session-strip.ts'
import { bridge } from './bridge.ts'

export function installSessionOwner(ctx: ClientContext): () => void {
  const api = bridge()?.overlays
  if (!api?.postMessage || !api.onMessage) return () => {}
  const sessions = getSessions(ctx)
  const pending = getPendingInteractions(ctx)
  let lastContext = ''
  let disposed = false
  const publish = (force = false) => {
    if (disposed) return
    const state = sessions.list.getSnapshot()
    if (state.phase === 'pending') return
    const waits: SessionStripContext['pending'] = []
    for (const [id, value] of pending.getSnapshot()) {
      if (value.kind === 'approval' || value.kind === 'question' || value.kind === 'plan-review') {
        waits.push({ id, kind: value.kind as PendingKind })
      }
    }
    const context: SessionStripContext = { currentId: state.current, pending: waits.slice(0, 128) }
    const key = JSON.stringify(context)
    if (!force && key === lastContext) return
    lastContext = key
    void api.postMessage!(OVERLAY_ID, { type: 'session-context', context }).catch(() => { lastContext = '' })
  }
  const offMessage = api.onMessage(event => {
    if (event.contributor !== CONTRIBUTOR || event.id !== OVERLAY_ID || disposed) return
    const payload = event.payload as { type?: unknown } | null
    // focusOwner is handled by the desktop shell; keep the user's current page.
    if (payload?.type === 'focus-owner') { publish(true); return }
    if (payload?.type === 'sessions-ready') { publish(true); return }
    const request = sessionOpenRequest(event.payload)
    if (!request) return
    void openTrackedSession({
      has: id => sessions.list.getSnapshot().byId[id as SessionId] !== undefined,
      open: id => sessions.open(id as SessionId),
      refresh: () => sessions.refresh(),
      address: id => sessions.subagentAddress(id as SessionId),
      refreshChildren: id => sessions.refreshSubagents(id as SessionId),
      openChild: address => sessions.openSubagent(address),
    }, request).then(result => {
      if (result === 'parent' && !disposed) return api.postMessage!(OVERLAY_ID, {
        type: 'session-notice', message: '已打开所属会话，可在子任务列表中查看。',
      })
    }).catch(() => {
      if (!disposed) void api.postMessage!(OVERLAY_ID, { type: 'session-notice', message: '会话暂时无法打开，请稍后重试。' }).catch(() => {})
    })
  })
  const offList = sessions.list.subscribe(() => publish())
  const offPending = pending.subscribe(() => publish())
  publish()
  return () => { disposed = true; offMessage(); offList(); offPending() }
}
