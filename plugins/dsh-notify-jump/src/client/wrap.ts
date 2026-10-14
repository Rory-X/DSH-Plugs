import { getDesktopNotifications, type DesktopNotificationBridge } from '@just-genius/dsh-plugin-runtime/client'
import type { NotificationPermissions } from './permissions'
import { NOTIFICATION_TAG_PREFIX, sessionIdFromTag } from './tag'

export type OpenSession = (sessionId: string) => void
const DESKTOP_CONTRIBUTOR = 'dsh-notification'

/** Bounded ASCII id, retaining identity even for long or non-ASCII tags. */
function notificationHash(tag: string): string {
  let hash = 14695981039346656037n
  for (let index = 0; index < tag.length; index++) {
    hash = BigInt.asUintN(64, (hash ^ BigInt(tag.charCodeAt(index))) * 1099511628211n)
  }
  return hash.toString(16)
}

export function desktopNotificationId(tag: string): string {
  return `${tag.replace(/[^A-Za-z0-9._-]/g, '-').slice(0, 40)}-${notificationHash(tag)}`
}

/** Chromium prefixes the origin to this tag; Windows limits the resulting ID. */
export function browserNotificationTag(tag: string): string {
  return tag.startsWith(NOTIFICATION_TAG_PREFIX) ? `dsh-${notificationHash(tag)}` : tag
}

function clip(value: string, maximum: number): string {
  let clipped = value.slice(0, maximum)
  if (/[\uD800-\uDBFF]$/.test(clipped)) clipped = clipped.slice(0, -1)
  return clipped
}

class DesktopNote extends EventTarget {
  readonly id: string
  readonly tag: string
  readonly body: string
  onclick: Notification['onclick'] = null
  onshow: Notification['onshow'] = null
  onerror: Notification['onerror'] = null
  onclose: Notification['onclose'] = null
  private closed = false

  constructor(
    readonly title: string,
    private readonly options: NotificationOptions | undefined,
    private readonly desktop: DesktopNotificationBridge,
    private readonly forget: (note: DesktopNote) => void,
  ) {
    super()
    this.tag = options?.tag || `dsh-native-${crypto.randomUUID()}`
    this.id = desktopNotificationId(this.tag)
    this.body = options?.body || title || 'DSH'
  }

  emit(type: 'click' | 'show' | 'error' | 'close', message?: string): void {
    const event = new Event(type)
    if (message !== undefined) Object.defineProperty(event, 'message', { value: message })
    this.dispatchEvent(event)
    this[`on${type}`]?.call(this as unknown as Notification, event)
  }

  async show(): Promise<void> {
    try {
      const result = await this.desktop.show({
        contributor: DESKTOP_CONTRIBUTOR, id: this.id,
        title: clip(this.title.trim() || 'DSH', 80), body: clip(this.body, 240),
        silent: this.options?.silent === true,
      })
      if (this.closed) return
      if (result.shown) this.emit('show')
      else {
        this.closed = true
        this.forget(this)
        this.emit('error', result.error ?? result.reason ?? 'Notification was not shown')
      }
    } catch (error) {
      if (this.closed) return
      this.closed = true
      this.forget(this)
      this.emit('error', error instanceof Error ? error.message : String(error))
    }
  }

  close(): void {
    if (this.closed) return
    this.closed = true
    this.forget(this)
    void this.desktop.close(DESKTOP_CONTRIBUTOR, this.id).catch(() => {})
    this.emit('close')
  }
}

/** Route desktop notifications and permission through the same native transport. */
export function installNotificationJump(
  openSession: OpenSession,
  permissions: Pick<NotificationPermissions, 'getSnapshot' | 'requestPermission'>,
  desktop = getDesktopNotifications(),
): () => void {
  const Native = window.Notification
  if (typeof Native !== 'function') return () => {}
  const original = Object.getOwnPropertyDescriptor(window, 'Notification')
  const notes = new Map<string, DesktopNote>()
  const browserNotes = new Map<string, Notification>()
  const forget = (note: DesktopNote) => { if (notes.get(note.id) === note) notes.delete(note.id) }
  const jump = (tag: string) => {
    const id = sessionIdFromTag(tag)
    if (id === undefined) return
    try { openSession(id) } catch (error) { console.warn('[dsh-notify-jump] sessions.open failed', error) }
  }
  const offAction = desktop?.onAction(action => {
    if (action.contributor !== DESKTOP_CONTRIBUTOR) return
    const note = notes.get(action.id)
    if (note === undefined) return
    window.focus()
    try { note.emit('click') } finally { jump(note.tag); note.close() }
  })

  const Wrapped = function Notification(title: string, options?: NotificationOptions): Notification {
    if (desktop !== undefined) {
      const note = new DesktopNote(title, options, desktop, forget)
      notes.get(note.id)?.close()
      notes.set(note.id, note)
      void note.show()
      return note as unknown as Notification
    }
    const logicalTag = options?.tag ?? ''
    const note = new Native(title, options === undefined ? undefined : { ...options, tag: browserNotificationTag(logicalTag) })
    const key = logicalTag || `dsh-browser-${crypto.randomUUID()}`
    browserNotes.get(key)?.close()
    browserNotes.set(key, note)
    const release = () => { if (browserNotes.get(key) === note) browserNotes.delete(key) }
    note.addEventListener('close', release)
    note.addEventListener('error', release)
    if (browserNotes.size > 128) {
      const [oldestKey, oldest] = browserNotes.entries().next().value!
      browserNotes.delete(oldestKey)
      oldest.close()
    }
    note.addEventListener('click', () => { window.focus(); jump(logicalTag); note.close() })
    return note
  } as unknown as typeof Notification
  Object.setPrototypeOf(Wrapped, Native)
  Wrapped.prototype = Native.prototype
  Object.defineProperties(Wrapped, {
    permission: { configurable: true, get: () => desktop === undefined ? Native.permission : permissions.getSnapshot().permission },
    requestPermission: { configurable: true, value: (callback?: NotificationPermissionCallback) => {
      const result = permissions.requestPermission()
      if (callback !== undefined) void result.then(callback)
      return result
    } },
  })
  Object.defineProperty(window, 'Notification', { configurable: true, writable: true, value: Wrapped })
  return () => {
    offAction?.()
    for (const note of [...notes.values()]) note.close()
    notes.clear()
    for (const note of browserNotes.values()) note.close()
    browserNotes.clear()
    if (window.Notification !== Wrapped) return
    if (original !== undefined) Object.defineProperty(window, 'Notification', original)
    else Object.defineProperty(window, 'Notification', { configurable: true, writable: true, value: Native })
  }
}
