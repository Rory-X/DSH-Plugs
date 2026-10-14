import { describe, expect, it, vi } from 'vitest'
import type { DesktopNotificationBridge } from '@just-genius/dsh-plugin-runtime/client'
import { createNotificationPermissions } from '../src/client/permissions'

describe('notification permission source', () => {
  it('uses native permission even when the Chromium origin is denied', async () => {
    const Native = { permission: 'denied', requestPermission: vi.fn() } as unknown as typeof Notification
    const getStatus = vi.fn(async () => ({ supported: true, permission: 'granted', setting: 'Enabled' }))
    const controller = createNotificationPermissions(Native, { getStatus } as unknown as DesktopNotificationBridge)
    expect(await controller.refresh()).toBe('granted')
    expect(controller.getSnapshot()).toMatchObject({ transport: 'desktop', permission: 'granted' })
    await controller.requestPermission()
    expect(Native.requestPermission).not.toHaveBeenCalled()
  })

  it('keeps real browser permission requests in the click stack', async () => {
    const request = vi.fn(async () => 'granted')
    const controller = createNotificationPermissions({ permission: 'default', requestPermission: request } as unknown as typeof Notification, undefined)
    const pending = controller.requestPermission()
    expect(request).toHaveBeenCalledOnce()
    expect(await pending).toBe('granted')
    expect(controller.getSnapshot().transport).toBe('browser')
  })

  it('preserves an OS denial instead of inventing a grant', async () => {
    const controller = createNotificationPermissions(undefined, {
      getStatus: async () => ({ supported: true, permission: 'denied', setting: 'DisabledForApplication' }),
    } as unknown as DesktopNotificationBridge)
    expect(await controller.refresh()).toBe('denied')
    expect(controller.getSnapshot().setting).toBe('DisabledForApplication')
  })

  it('does not overwrite newer permission data with a delayed reply', async () => {
    let finishOld!: (value: unknown) => void
    const old = new Promise(resolve => { finishOld = resolve })
    const getStatus = vi.fn().mockReturnValueOnce(old).mockResolvedValueOnce({ supported: true, permission: 'granted' })
    const controller = createNotificationPermissions(undefined, { getStatus } as unknown as DesktopNotificationBridge)
    const first = controller.refresh()
    await controller.refresh()
    finishOld({ supported: true, permission: 'denied' })
    await first
    expect(controller.getSnapshot().permission).toBe('granted')
  })
})
