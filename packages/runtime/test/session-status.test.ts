import { describe, expect, it, vi } from 'vitest'
import { resolvePendingInteractions, type PendingInteractionsSource, type SessionStatus, type SessionStatusSource } from '../src/session-status'
import type { SessionId } from '@deepseek-ai/dsh-session/types'

describe('official desktop session status adapter', () => {
  it('keeps the legacy source unchanged', () => {
    const legacy = { getSnapshot: () => new Map(), subscribe: vi.fn() } as unknown as PendingInteractionsSource
    expect(resolvePendingInteractions({ pendingInteractions: legacy })).toBe(legacy)
  })

  it('projects the current waits, preserves their identity, and caches unchanged snapshots', () => {
    const id = 'session' as SessionId
    const wait = { kind: 'approval', key: 'request', sessionId: id } as SessionStatus['pendingInteraction']
    let state: ReturnType<SessionStatusSource['getSnapshot']> = new Map([[id, { running: true, pendingInteraction: wait }]])
    const source = { getSnapshot: () => state, subscribe: vi.fn(() => () => {}) }
    const pending = resolvePendingInteractions({ sessionStatus: source })
    expect(resolvePendingInteractions({ sessionStatus: source })).toBe(pending)
    expect(pending.getSnapshot().get(id)).toBe(wait)
    expect(pending.getSnapshot()).toBe(pending.getSnapshot())
    state = new Map([[id, { running: true }]])
    expect(pending.getSnapshot().has(id)).toBe(false)
  })

  it('forwards subscription and teardown to the official source', () => {
    const stop = vi.fn()
    const subscribe = vi.fn(() => stop)
    const source = { getSnapshot: () => new Map(), subscribe }
    const listener = vi.fn()
    const dispose = resolvePendingInteractions({ sessionStatus: source }).subscribe(listener)
    expect(subscribe).toHaveBeenCalledWith(listener)
    dispose()
    expect(stop).toHaveBeenCalledOnce()
  })
})
