import { afterEach, describe, expect, it, vi } from 'vitest'
import type { DesktopNotificationBridge, DesktopNotifyAction, DesktopNotifySpec } from '@just-genius/dsh-plugin-runtime/client'
import { browserNotificationTag, desktopNotificationId, installNotificationJump } from '../src/client/wrap'
import { createNotificationPermissions, waitForTestNotification } from '../src/client/permissions'
import { NOTIFICATION_TEST_TAG, notificationTag } from '../src/client/tag'

const disposers: Array<() => void> = []
afterEach(() => { for (const dispose of disposers.splice(0)) dispose(); vi.unstubAllGlobals() })

async function fixture(native = true) {
  class BrowserNote extends EventTarget {
    static permission: NotificationPermission = 'denied'
    static requestPermission = vi.fn(async (): Promise<NotificationPermission> => 'granted')
    tag: string
    close = vi.fn()
    constructor(_title: string, options?: NotificationOptions) { super(); this.tag = options?.tag ?? '' }
  }
  const focus = vi.fn()
  vi.stubGlobal('window', { Notification: BrowserNote, focus })
  let action!: (event: DesktopNotifyAction) => void
  const desktop = {
    getStatus: vi.fn(async () => ({ supported: true, permission: 'granted' as const })),
    show: vi.fn(async (_spec: DesktopNotifySpec) => ({ shown: true })), close: vi.fn(async () => {}),
    onAction: (callback: (event: DesktopNotifyAction) => void) => { action = callback; return vi.fn() },
  } satisfies DesktopNotificationBridge
  const permissions = createNotificationPermissions(BrowserNote as unknown as typeof Notification, native ? desktop : undefined)
  await permissions.refresh()
  const openSession = vi.fn()
  const dispose = installNotificationJump(openSession, permissions, native ? desktop : undefined)
  disposers.push(dispose)
  return { BrowserNote, desktop, openSession, focus, action: (id: string) => action({ contributor: 'dsh-notification', id }), dispose }
}

describe('native notification wrapper', () => {
  it('grants the native route, forwards delivery, and navigates once on click', async () => {
    const { BrowserNote, desktop, openSession, action, focus } = await fixture()
    expect(window.Notification.permission).toBe('granted')
    expect(BrowserNote.permission).toBe('denied')
    await expect(window.Notification.requestPermission()).resolves.toBe('granted')
    const tag = notificationTag('session-123')
    const note = new window.Notification('Needs approval', { body: 'Task', tag })
    const onClick = vi.fn()
    note.addEventListener('click', onClick)
    await Promise.resolve()
    const id = desktopNotificationId(tag)
    action(id); action(id)
    expect(onClick).toHaveBeenCalledOnce()
    expect(openSession).toHaveBeenCalledExactlyOnceWith('session-123')
    expect(focus).toHaveBeenCalledOnce()
    expect(desktop.close).toHaveBeenCalledWith('dsh-notification', id)
  })

  it('keeps the test notification and untagged notifications out of session navigation', async () => {
    const { openSession, action, desktop } = await fixture()
    new window.Notification('Test', { tag: NOTIFICATION_TEST_TAG })
    action(desktopNotificationId(NOTIFICATION_TEST_TAG))
    new window.Notification('Other')
    action(desktop.show.mock.calls.at(-1)![0].id)
    expect(openSession).not.toHaveBeenCalled()
  })

  it('reports native failure to the test helper instead of claiming success', async () => {
    const { desktop } = await fixture()
    desktop.show.mockResolvedValueOnce({ shown: false })
    await expect(waitForTestNotification(() => new window.Notification('Test'))).rejects.toThrow('not shown')
  })

  it('fits the desktop payload limits without cutting an emoji in half', async () => {
    const { desktop } = await fixture()
    new window.Notification('a'.repeat(79) + '🔔', { body: 'b'.repeat(300) })
    expect(desktop.show.mock.calls[0][0]).toMatchObject({ title: 'a'.repeat(79), body: 'b'.repeat(240) })
  })

  it('keeps long tags distinct and restores the original constructor on disposal', async () => {
    const { BrowserNote, dispose } = await fixture()
    expect(desktopNotificationId('a'.repeat(100) + 'one')).not.toBe(desktopNotificationId('a'.repeat(100) + 'two'))
    expect(desktopNotificationId('中文')).toMatch(/^[A-Za-z0-9._-]{1,64}$/)
    dispose()
    expect(window.Notification).toBe(BrowserNote)
  })

  it('preserves browser notification clicks and permission behavior without a desktop bridge', async () => {
    const { openSession } = await fixture(false)
    expect(window.Notification.permission).toBe('denied')
    const note = new window.Notification('Browser', { tag: notificationTag('browser-session') })
    note.dispatchEvent(new Event('click'))
    expect(openSession).toHaveBeenCalledWith('browser-session')
  })

  it('keeps browser reminders alive until replacement or disposal', async () => {
    const { dispose } = await fixture(false)
    const first = new window.Notification('Question', { tag: notificationTag('s') })
    const second = new window.Notification('Completed', { tag: notificationTag('s') })
    expect(first.close).toHaveBeenCalledOnce()
    expect(second.close).not.toHaveBeenCalled()
    dispose()
    expect(second.close).toHaveBeenCalledOnce()
  })

  it('fits Windows notification IDs while preserving the original session on click', async () => {
    const { openSession } = await fixture(false)
    const id = 'session-c6d18057-5c0a-4106-9995-af6e801aa02c'
    const tag = notificationTag(id)
    const note = new window.Notification('Question', { tag })
    expect(note.tag).toMatch(/^dsh-[a-f0-9]{1,16}$/)
    expect(browserNotificationTag(notificationTag(id + '-other'))).not.toBe(note.tag)
    expect(browserNotificationTag('other-plugin')).toBe('other-plugin')
    note.dispatchEvent(new Event('click'))
    expect(openSession).toHaveBeenCalledExactlyOnceWith(id)
  })
})
