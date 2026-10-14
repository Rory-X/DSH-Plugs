import { describe, expect, it, vi } from 'vitest'
import { createDragController, createLatestMoveQueue } from '../src/client/drag-controller'

function fixture() {
  const callbacks = { move: vi.fn(), start: vi.fn(), finish: vi.fn(), click: vi.fn() }
  return { ...callbacks, drag: createDragController(callbacks) }
}

describe('pet drag gesture', () => {
  it('preserves the first movement after crossing the threshold', () => {
    const f = fixture()
    f.drag.begin({ x: 140, y: 150 }, { x: 100, y: 100 })
    f.drag.update({ x: 152, y: 145 })
    expect(f.move).toHaveBeenLastCalledWith({ x: 112, y: 95 })
    f.drag.end({ x: 190, y: 175 })
    expect(f.move).toHaveBeenLastCalledWith({ x: 150, y: 125 })
    expect(f.start).toHaveBeenCalledOnce()
    expect(f.click).not.toHaveBeenCalled()
  })

  it('retains click-to-interact for small pointer jitter', () => {
    const f = fixture()
    f.drag.begin({ x: 50, y: 50 }, { x: 100, y: 100 })
    f.drag.end({ x: 51, y: 51 })
    expect(f.click).toHaveBeenCalledOnce()
    expect(f.move).not.toHaveBeenCalled()
  })

  it('flushes a fast release even when no intermediate pointermove was delivered', () => {
    const f = fixture()
    f.drag.begin({ x: 50, y: 50 }, { x: -500, y: -200 })
    f.drag.end({ x: -25, y: 80 })
    expect(f.move).toHaveBeenLastCalledWith({ x: -575, y: -170 })
    expect(f.click).not.toHaveBeenCalled()
  })

  it('ends a cancelled capture without interaction or later movements', () => {
    const f = fixture()
    f.drag.begin({ x: 50, y: 50 }, { x: 100, y: 100 })
    f.drag.cancel()
    f.drag.update({ x: 150, y: 150 })
    f.drag.end({ x: 200, y: 200 })
    expect(f.finish).toHaveBeenCalledWith(true)
    expect(f.move).not.toHaveBeenCalled()
    expect(f.click).not.toHaveBeenCalled()
  })
})

describe('legacy move backpressure', () => {
  it('replaces delayed intermediate requests with the final absolute target', async () => {
    let resolve!: () => void
    const send = vi.fn().mockImplementationOnce(() => new Promise<void>(done => { resolve = done })).mockResolvedValue(undefined)
    const queue = createLatestMoveQueue(send)
    queue.push({ x: 1, y: 1 })
    await Promise.resolve()
    for (let x = 2; x <= 200; x++) queue.push({ x, y: -x })
    expect(send).toHaveBeenCalledOnce()
    resolve()
    await queue.idle()
    expect(send.mock.calls).toEqual([[{ x: 1, y: 1 }], [{ x: 200, y: -200 }]])
  })

  it('discards queued movement after cancellation and recovers from a failed IPC', async () => {
    const failed = vi.fn()
    const send = vi.fn().mockRejectedValueOnce(new Error('window closed')).mockResolvedValue(undefined)
    const queue = createLatestMoveQueue(send, failed)
    queue.push({ x: 10, y: 10 })
    queue.clear()
    await queue.idle()
    expect(send).not.toHaveBeenCalled()
    queue.push({ x: 20, y: 20 })
    await queue.idle()
    queue.push({ x: 30, y: 30 })
    await queue.idle()
    expect(failed).toHaveBeenCalledOnce()
    expect(send).toHaveBeenLastCalledWith({ x: 30, y: 30 })
  })
})
