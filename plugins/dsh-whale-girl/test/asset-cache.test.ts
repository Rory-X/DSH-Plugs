import { afterEach, describe, expect, it, vi } from 'vitest'
import { createAssetCache, startRecoverableInitialization } from '../src/client/asset-cache'

afterEach(() => vi.useRealTimers())

describe('sprite loading', () => {
  it('shares a pending load between animation and bootstrap, then reuses its result', async () => {
    let resolve!: (value: string) => void
    const load = vi.fn(() => new Promise<string>(done => { resolve = done }))
    const cache = createAssetCache(load)
    const first = cache.load('idle.png')
    const second = cache.load('idle.png')
    expect(first).toBe(second)
    await Promise.resolve()
    resolve('decoded sprite')
    await first
    expect(await cache.load('idle.png')).toBe('decoded sprite')
    expect(load).toHaveBeenCalledOnce()
  })

  it('backs off after failure and retries instead of retaining a permanent blank', async () => {
    let now = 0
    const load = vi.fn().mockRejectedValueOnce(new Error('temporary 503')).mockResolvedValueOnce('sprite')
    const onError = vi.fn()
    const cache = createAssetCache(load, { now: () => now, retryMs: 2000, onError })
    expect(await cache.load('idle.png')).toBeNull()
    expect(cache.has('idle.png')).toBe(false)
    expect(await cache.load('idle.png')).toBeNull()
    expect(load).toHaveBeenCalledOnce()
    now = 2000
    expect(await cache.load('idle.png')).toBe('sprite')
    expect(onError).toHaveBeenCalledOnce()
  })

  it('restarts initialization after an unavailable manifest and stops retrying after success', async () => {
    vi.useFakeTimers()
    const initialize = vi.fn().mockRejectedValueOnce(new Error('offline')).mockResolvedValue(undefined)
    const failed = vi.fn()
    const stop = startRecoverableInitialization(initialize, failed)
    await vi.advanceTimersByTimeAsync(3000)
    expect(initialize).toHaveBeenCalledTimes(2)
    await vi.advanceTimersByTimeAsync(30_000)
    expect(initialize).toHaveBeenCalledTimes(2)
    expect(failed).toHaveBeenCalledOnce()
    stop()
  })

  it('does not restart a widget after its window has closed', async () => {
    vi.useFakeTimers()
    const initialize = vi.fn().mockRejectedValue(new Error('offline'))
    const stop = startRecoverableInitialization(initialize, vi.fn())
    stop()
    await vi.advanceTimersByTimeAsync(10_000)
    expect(initialize).toHaveBeenCalledOnce()
  })
})
