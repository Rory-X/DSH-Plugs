/**
 * Browser half of @just-genius/dsh-notify-jump.
 *
 * 1. Wrap `window.Notification` so a `dsh-notification-<sessionId>` banner
 *    click focuses the window and opens that session.
 * 2. Watch the session list for approval / ask / plan-review waits and show
 *    a system notification on the rising edge (same tag, so click still jumps).
 */
import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client'
import { startPendingWatcher, type SessionsListFace } from './watch.ts'
import { installNotificationJump } from './wrap.ts'

export const inject = ['sessions'] as const

export function apply(ctx: ClientContext): void {
  const sessions = ctx.get('sessions') as SessionsListFace & { open(id: string): void }
  ctx.effect(
    () => installNotificationJump((id) => sessions.open(id)),
    'dsh-notify-jump: wrap Notification',
  )
  ctx.effect(
    () => startPendingWatcher(sessions, (listener) => ctx.on('connection/reset', listener)),
    'dsh-notify-jump: pending waits',
  )
}
