import { describe, expect, it } from 'vitest'
import { SessionTracker, visibleMessageText, type SessionMeta } from '../src/session-tracker'

const a: SessionMeta = { id: 'a', title: '修复终端', createdAt: 100, cwd: 'E:\\Project' }
const b: SessionMeta = { id: 'b', title: '检查通知', createdAt: 200 }
const event = (type: string, data: unknown = {}, time = 1000) => ({ type, data, time })
const frame = (text: string, index = 0, revision = 1) => ({ type: 'chunk', attemptId: `attempt-${revision}`, revision, index, time: 1200, chunk: { type: 'text-delta', index: 0, text } })

describe('independent session progress', () => {
  it('keeps simultaneous sessions separate when one finishes', () => {
    const tracker = new SessionTracker()
    tracker.event(a, event('turn/start'))
    tracker.event(b, event('turn/start'))
    tracker.stream(a, frame('正在适配 PowerShell'))
    tracker.stream(b, frame('正在验证通知权限'))
    tracker.event(a, event('turn/end', { reason: { kind: 'completed' } }, 1500))
    expect(tracker.snapshot().find(row => row.id === 'a')).toMatchObject({ running: false, activity: 'done', message: '正在适配 PowerShell' })
    expect(tracker.snapshot().find(row => row.id === 'b')).toMatchObject({ running: true, activity: 'responding', message: '正在验证通知权限' })
  })

  it('replays a live session and does not duplicate its last committed event', () => {
    const tracker = new SessionTracker()
    const call = { ...event('tool/call', { callId: 'c', name: 'read_file' }), seq: 2 }
    tracker.seed(a, [{ ...event('turn/start'), seq: 0 }, { ...event('user/message', { source: { kind: 'user' }, content: '检查拖拽' }), seq: 1 }, call], true, 2000)
    expect(tracker.event(a, call)).toBe(false)
    expect(tracker.snapshot()[0]).toMatchObject({ running: true, activeToolCount: 1, prompt: '检查拖拽', startedAt: 1000 })
  })

  it('ignores stale stream attempts, duplicate chunks and reasoning text', () => {
    const tracker = new SessionTracker()
    tracker.event(a, event('turn/start'))
    tracker.stream(a, frame('旧进展'))
    tracker.stream(a, { type: 'start', attemptId: 'attempt-2', revision: 2 })
    expect(tracker.stream(a, frame('迟到内容', 1, 1))).toBe(false)
    tracker.stream(a, frame('新进展', 0, 2))
    expect(tracker.stream(a, frame('重复', 0, 2))).toBe(false)
    tracker.stream(a, { ...frame('', 1, 2), chunk: { type: 'reasoning-delta', text: '不展示内部推理' } })
    expect(tracker.snapshot()[0].message).toBe('新进展')
  })

  it('keeps remaining parallel tools running until all have returned', () => {
    const tracker = new SessionTracker()
    tracker.event(a, event('turn/start'))
    tracker.event(a, event('tool/call', { callId: '1', name: 'read_file' }))
    tracker.event(a, event('tool/call', { callId: '2', name: 'search' }))
    tracker.event(a, event('tool/result', { callId: '1' }))
    expect(tracker.snapshot()[0]).toMatchObject({ activity: 'tool:search', activeToolCount: 1 })
    tracker.event(a, event('tool/result', { callId: '2' }))
    expect(tracker.snapshot()[0]).toMatchObject({ activity: 'thinking', activeToolCount: 0, running: true })
  })

  it('distinguishes waiting, failure and cancellation from successful completion', () => {
    const tracker = new SessionTracker()
    for (const [kind, activity] of [['blocked', 'waiting'], ['error', 'error'], ['aborted', 'cancelled']]) {
      tracker.event(a, event('turn/start'))
      tracker.event(a, event('turn/end', { reason: { kind } }))
      expect(tracker.snapshot()[0]).toMatchObject({ activity, running: false })
    }
    tracker.status(a, true, 4000)
    expect(tracker.snapshot()[0]).toMatchObject({ running: true, activity: 'thinking', completedAt: undefined })
  })

  it('restores the committed preview after an abandoned streamed attempt', () => {
    const tracker = new SessionTracker()
    tracker.event(a, event('turn/start'))
    tracker.event(a, event('assistant/message', { message: { content: [{ type: 'text', text: '已完成检查，继续修复。' }] } }))
    tracker.stream(a, frame('临时输出'))
    tracker.stream(a, { type: 'end', attemptId: 'attempt-1', revision: 1, outcome: { kind: 'abandoned' } })
    expect(tracker.snapshot()[0].message).toBe('已完成检查，继续修复。')
    expect(tracker.stream(a, frame('迟到', 2))).toBe(false)
  })

  it('excludes injected context and bounds long previews', () => {
    const tracker = new SessionTracker()
    tracker.event(a, event('user/message', { source: { kind: 'plugin' }, content: 'AGENTS instructions' }))
    expect(tracker.snapshot()[0].prompt).toBe('')
    tracker.event(a, event('turn/start'))
    tracker.stream(a, frame('x'.repeat(4000)))
    expect(tracker.snapshot()[0].message?.length).toBe(2000)
    expect(visibleMessageText([{ type: 'reasoning', text: 'hidden' }, { type: 'text', text: '公开进展' }, { type: 'image', data: 'binary' }])).toBe('公开进展')
  })

  it('does not revive historical idle sessions as newly completed tasks', () => {
    const tracker = new SessionTracker()
    tracker.seed(a, [event('turn/start'), event('turn/end', { reason: { kind: 'completed' } }, 1500)], false, 50000)
    expect(tracker.snapshot()[0].completedAt).toBe(1500)
    tracker.remove('a')
    expect(tracker.snapshot()).toEqual([])
  })

  it('preserves the turn result while the agent is still draining after turn/end', () => {
    const tracker = new SessionTracker()
    tracker.status(a, true, 900)
    tracker.event(a, event('turn/start'))
    tracker.stream(a, frame('已找到问题'))
    tracker.event(a, event('turn/end', { reason: { kind: 'error' } }, 1500))
    tracker.reconcile(a, true, 1600)
    tracker.status(a, false, 1700)
    expect(tracker.snapshot()[0]).toMatchObject({ running: false, activity: 'error', message: '已找到问题', completedAt: 1500 })
  })
})
