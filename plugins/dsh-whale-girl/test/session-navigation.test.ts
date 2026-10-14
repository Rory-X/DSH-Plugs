import { describe, expect, it, vi } from 'vitest'
import { openTrackedSession, requestPetNavigation, sessionOpenRequest } from '../src/shared/session-navigation'
import { createRefreshQueue } from '../src/shared/refresh-queue'

describe('session navigation contract', () => {
  it('focuses the DSH owner for an empty card without inventing a session', async () => {
    const send = vi.fn(async () => true)
    await expect(requestPetNavigation(send)).resolves.toBe(true)
    expect(send).toHaveBeenCalledExactlyOnceWith({ type: 'focus-owner' }, { focusOwner: true })
  })
  it('keeps selected-session addressing and reports an unavailable owner', async () => {
    const send = vi.fn(async () => false)
    await expect(requestPetNavigation(send, { id: 'child', ancestors: ['root'] })).resolves.toBe(false)
    expect(send).toHaveBeenCalledExactlyOnceWith({ type: 'open-session', sessionId: 'child', ancestors: ['root'] }, { focusOwner: true })
  })
  function source() {
    return { has: vi.fn((id: string) => id === 'root'), open: vi.fn(), refresh: vi.fn(async () => {}),
      address: vi.fn((_id: string): { parent: string; child: string } | undefined => undefined),
      refreshChildren: vi.fn(async (_id: string) => {}), openChild: vi.fn() }
  }
  it('opens a listed session without changing any conversation data', async () => {
    const api = source()
    await expect(openTrackedSession(api, { sessionId: 'root', ancestors: [] })).resolves.toBe('session')
    expect(api.open).toHaveBeenCalledWith('root')
    expect(api.refresh).not.toHaveBeenCalled()
  })
  it('resolves nested child addresses in ancestor order', async () => {
    const api = source()
    api.address.mockReturnValueOnce(undefined).mockReturnValue({ parent: 'child', child: 'grandchild' })
    await expect(openTrackedSession(api, { sessionId: 'grandchild', ancestors: ['root', 'child'] })).resolves.toBe('subagent')
    expect(api.refreshChildren.mock.calls).toEqual([['root'], ['child']])
    expect(api.openChild).toHaveBeenCalledWith({ parent: 'child', child: 'grandchild' })
  })
  it('falls back to the real parent instead of guessing a subagent route', async () => {
    const api = source()
    await expect(openTrackedSession(api, { sessionId: 'child', ancestors: ['root'] })).resolves.toBe('parent')
    expect(api.open).toHaveBeenCalledWith('root')
    expect(api.openChild).not.toHaveBeenCalled()
  })
  it('rejects a removed session after refreshing the list and validates messages', async () => {
    const api = source()
    await expect(openTrackedSession(api, { sessionId: 'removed', ancestors: [] })).rejects.toThrow('会话已结束或已移除')
    expect(api.open).not.toHaveBeenCalled()
    expect(sessionOpenRequest({ type: 'unknown', sessionId: 'root' })).toBeNull()
    expect(sessionOpenRequest({ type: 'open-session', sessionId: 'root', ancestors: [null, 'parent'] })).toEqual({ sessionId: 'root', ancestors: ['parent'] })
  })
})

describe('coalesced live updates', () => {
  it('serializes reads and collapses a burst of stream notifications', async () => {
    let resolve!: () => void
    const read = vi.fn().mockImplementationOnce(() => new Promise<void>(done => { resolve = done })).mockResolvedValue(undefined)
    const queue = createRefreshQueue(read)
    const first = queue.request()
    await Promise.resolve()
    for (let i = 0; i < 100; i++) void queue.request()
    expect(read).toHaveBeenCalledOnce()
    resolve()
    await first
    expect(read).toHaveBeenCalledTimes(2)
  })
  it('recovers after a read error and does not run after disposal', async () => {
    const read = vi.fn().mockRejectedValueOnce(new Error('offline')).mockResolvedValue(undefined)
    const failed = vi.fn()
    const queue = createRefreshQueue(read, failed)
    await queue.request()
    await queue.request()
    queue.dispose()
    await queue.request()
    expect(read).toHaveBeenCalledTimes(2)
    expect(failed).toHaveBeenCalledOnce()
  })
})
