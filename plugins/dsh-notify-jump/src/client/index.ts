/**
 * Browser half of @just-genius/dsh-notify-jump.
 *
 * 1. Wrap `window.Notification` so a `dsh-notification-<sessionId>` banner
 *    click focuses the window and opens that session.
 * 2. Watch the session list for approval / ask / plan-review waits and show
 *    a system notification on the rising edge (same tag, so click still jumps).
 */
import type { ClientContext } from '@just-genius/dsh-plugin-runtime/client'
import { CLIENT_SERVICES, getDesktopNotifications, getPendingInteractions, getSessionStatus, getSessions } from '@just-genius/dsh-plugin-runtime/client'
import { startCompletionWatcher, startPendingWatcher, type SessionsListFace } from './watch'
import { installNotificationJump } from './wrap'
import { createNotificationPermissions } from './permissions'
import { NotificationSettings } from './NotificationSettings'
import { en, zh, type NotificationKey } from './locales'
import { startHostReminderWatcher } from './host-watch'

export const inject = [CLIENT_SERVICES.sessions, CLIENT_SERVICES.uiSession, CLIENT_SERVICES.slots, CLIENT_SERVICES.locale] as const

declare module '@just-genius/dsh-plugin-runtime/client' {
  interface PluginLocaleNamespaceMap { notifications: NotificationKey }
}

export function apply(ctx: ClientContext): void {
  const sessions = getSessions(ctx) as unknown as SessionsListFace & { open(id: string): void }
  const desktop = getDesktopNotifications()
  const officialDesktop = desktop === undefined && (window as unknown as { dshDesktop?: { protocolVersion?: number } }).dshDesktop?.protocolVersion === 1
  const permissions = createNotificationPermissions(window.Notification, desktop)
  ctx.effect(() => ctx.locale.register('notifications', { zh, en }), 'dsh-notify-jump: dictionaries')
  const t = ctx.locale.bind('notifications')
  ctx.slots.inject('settings.section', () => ctx.slots.register({
    name: 'settings.section', id: 'notifications', order: 46,
    label: () => t('nav'), inject: () => ({ permissions, t }),
  }, NotificationSettings))
  ctx.effect(
    () => installNotificationJump((id) => {
      const workspace = ctx.uiWorkspace as unknown as { openSession?: (id: string) => void } | undefined
      if (workspace?.openSession !== undefined) workspace.openSession(id)
      else sessions.open(id)
    }, permissions, desktop),
    'dsh-notify-jump: wrap Notification',
  )
  ctx.effect(
    () => officialDesktop ? startHostReminderWatcher(() => {
      const state = sessions.list.getSnapshot()
      return state.current ?? Object.values(state.byId).find(row => ((row as unknown as { retainedBy?: { mainView?: number } }).retainedBy?.mainView ?? 0) > 0)?.id
    }) : startPendingWatcher(sessions, getPendingInteractions(ctx), (listener) => ctx.on('connection/reset', listener), permissions.subscribe),
    'dsh-notify-jump: pending waits',
  )
  ctx.effect(
    () => officialDesktop ? () => {} : startCompletionWatcher(sessions, getPendingInteractions(ctx), listener => ctx.on('connection/reset', listener), permissions.subscribe, getSessionStatus(ctx)),
    'dsh-notify-jump: completed turns',
  )
  ctx.effect(() => {
    const refresh = () => { void permissions.refresh() }
    window.addEventListener('focus', refresh)
    refresh()
    return () => { window.removeEventListener('focus', refresh); permissions.dispose() }
  }, 'dsh-notify-jump: notification permission')
}
