import type { DesktopNotificationBridge, DesktopNotificationStatus } from '@just-genius/dsh-plugin-runtime/client'

export interface NotificationPermissionState extends DesktopNotificationStatus {
  transport: 'desktop' | 'browser'
  checking: boolean
}

export interface NotificationPermissions {
  getSnapshot(): NotificationPermissionState
  subscribe(listener: () => void): () => void
  refresh(): Promise<NotificationPermission>
  requestPermission(): Promise<NotificationPermission>
  openSettings?(): Promise<void>
  dispose(): void
}

/** Keep native OS permission separate from Chromium's per-port site permission. */
export function createNotificationPermissions(
  Native: typeof Notification | undefined,
  desktop: DesktopNotificationBridge | undefined,
): NotificationPermissions {
  let state: NotificationPermissionState = {
    transport: desktop === undefined ? 'browser' : 'desktop',
    supported: desktop !== undefined || Native !== undefined,
    permission: desktop?.getStatus === undefined ? Native?.permission ?? 'denied' : 'default',
    checking: false,
  }
  let revision = 0
  let disposed = false
  const listeners = new Set<() => void>()
  const publish = (next: Partial<NotificationPermissionState>) => {
    if (disposed) return
    state = { ...state, ...next }
    for (const listener of listeners) listener()
  }
  const refresh = async (): Promise<NotificationPermission> => {
    const current = ++revision
    publish({ checking: true })
    try {
      const next = desktop?.getStatus === undefined
        ? { supported: Native !== undefined, permission: Native?.permission ?? 'denied' as NotificationPermission }
        : await desktop.getStatus()
      if (current === revision) publish({ ...next, checking: false })
    } catch {
      if (current === revision) publish({ checking: false, permission: 'default', setting: 'Unknown' })
    }
    return state.permission
  }
  return {
    getSnapshot: () => state,
    subscribe(listener) { listeners.add(listener); return () => { listeners.delete(listener) } },
    refresh,
    async requestPermission() {
      if (desktop?.getStatus !== undefined) return refresh()
      const current = ++revision
      // Keep the browser call directly in the user's click stack.
      const permission = Native === undefined ? 'denied' : await Native.requestPermission()
      if (current === revision) publish({ permission, checking: false })
      return permission
    },
    ...(desktop?.openSettings === undefined ? {} : { openSettings: () => desktop.openSettings!() }),
    dispose() { disposed = true; revision++; listeners.clear() },
  }
}

/** Wait for the transport result instead of treating construction as success. */
export function waitForTestNotification(create: () => Notification): Promise<void> {
  return new Promise((resolve, reject) => {
    let note: Notification
    try { note = create() } catch (error) { reject(error); return }
    const finish = (error?: Error) => {
      clearTimeout(timer)
      note.removeEventListener('show', shown)
      note.removeEventListener('error', failed)
      error ? reject(error) : resolve()
    }
    const shown = () => finish()
    const failed = (event: Event) => finish(new Error((event as Event & { message?: string }).message ?? 'Notification was not shown'))
    const timer = setTimeout(() => finish(new Error('Notification delivery timed out')), 10_000)
    note.addEventListener('show', shown)
    note.addEventListener('error', failed)
  })
}
