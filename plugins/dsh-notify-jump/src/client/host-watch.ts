import { SOCKET_PATH, type ReminderBatch, type ReminderEvent } from '../shared'
import { completionCopy, pendingCopy } from './pending'
import { notificationTag } from './tag'

/** The official desktop's compatibility Session list may not own its main UI sessions. */
export function showHostReminder(event: ReminderEvent, currentSessionId?: string): void {
  if (typeof window.Notification !== 'function' || window.Notification.permission !== 'granted') return
  if (!document.hidden && document.hasFocus() && (currentSessionId === undefined || currentSessionId === event.sessionId)) return
  const copy = event.kind === 'completion' ? completionCopy(event.title) : pendingCopy(event.kind, event.title)
  const note = new window.Notification(copy.title, { body: copy.body, tag: notificationTag(event.sessionId) })
  note.addEventListener?.('error', event => console.warn('[dsh-notify-jump] delivery failed', event))
}

export function reminderSocketUrl(base: string, epoch?: string, cursor?: number): string {
  const url = new URL(SOCKET_PATH, base)
  url.protocol = url.protocol === 'https:' ? 'wss:' : 'ws:'
  if (epoch !== undefined && cursor !== undefined) {
    url.searchParams.set('epoch', epoch)
    url.searchParams.set('after', String(cursor))
  }
  return url.href
}

/** Network message delivery continues when Chromium suspends background timers. */
export function startHostReminderWatcher(currentSessionId: () => string | undefined): () => void {
  let disposed = false
  let connecting = false
  let timer: ReturnType<typeof setTimeout> | undefined
  let epoch: string | undefined
  let cursor: number | undefined
  let socket: WebSocket | undefined
  const reconnect = () => {
    if (disposed || connecting || socket !== undefined && socket.readyState < 2) return
    clearTimeout(timer)
    void connect()
  }
  const connect = async () => {
    if (disposed || connecting) return
    connecting = true
    try {
      const bridge = (window as unknown as { dshDesktopBoot?: { ready(): Promise<{ streamBaseUrl: string }> } }).dshDesktopBoot
      const base = bridge === undefined ? location.href : (await bridge.ready()).streamBaseUrl
      if (disposed) return
      const current = new WebSocket(reminderSocketUrl(base, epoch, cursor))
      socket = current
      current.onmessage = message => {
        if (disposed || socket !== current) return
        try {
          const batch = JSON.parse(String(message.data)) as ReminderBatch
          if (typeof batch.epoch !== 'string' || !Number.isSafeInteger(batch.cursor) || !Array.isArray(batch.events)) throw new Error('Invalid notification monitor response')
          if (epoch === batch.epoch) for (const event of batch.events) showHostReminder(event, currentSessionId())
          epoch = batch.epoch
          cursor = batch.cursor
        } catch (error) { console.warn('[dsh-notify-jump] monitor', error) }
      }
      current.onclose = () => {
        if (socket !== current) return
        socket = undefined
        if (!disposed) timer = setTimeout(reconnect, 1000)
      }
      current.onerror = () => { if (!disposed) console.warn('[dsh-notify-jump] notification connection unavailable') }
    } catch (error) {
      if (!disposed) {
        console.warn('[dsh-notify-jump] monitor', error)
        timer = setTimeout(reconnect, 1000)
      }
    } finally { connecting = false }
  }
  window.addEventListener?.('focus', reconnect)
  void connect()
  return () => { disposed = true; clearTimeout(timer); window.removeEventListener?.('focus', reconnect); socket?.close() }
}
