/** JSON contract shared by plugins that use the DSH-Desktop notification bridge. */
export interface DesktopNotifySpec {
  contributor: string
  id: string
  title: string
  body: string
  silent?: boolean
}

export interface DesktopNotifyAction { contributor: string; id: string }

export interface DesktopNotifyResult {
  shown: boolean
  reason?: 'unsupported' | 'rate-limited' | 'limit' | 'failed' | 'cancelled' | 'timed-out'
  error?: string
}

export interface DesktopNotificationStatus {
  supported: boolean
  permission: NotificationPermission
  /** Native OS setting, when the platform exposes one. */
  setting?: string
}

export interface DesktopNotificationBridge {
  show(spec: DesktopNotifySpec): Promise<DesktopNotifyResult>
  close(contributor: string, id?: string): Promise<void>
  onAction(listener: (action: DesktopNotifyAction) => void): () => void
  /** Optional for compatibility with older desktop shells. */
  getStatus?(): Promise<DesktopNotificationStatus>
  openSettings?(): Promise<void>
}

export function getDesktopNotifications(): DesktopNotificationBridge | undefined {
  if (typeof window === 'undefined') return undefined
  return (window as unknown as { dshDesktop?: { notify?: DesktopNotificationBridge } }).dshDesktop?.notify
}
