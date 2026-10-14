import { afterEach, describe, expect, it, vi } from 'vitest'
import { createReminderJournal, isReminderRoot, observeQuestions, reminderOriginAllowed } from '../src/shared'
import { reminderSocketUrl, showHostReminder, startHostReminderWatcher } from '../src/client/host-watch'

afterEach(() => { vi.unstubAllGlobals(); vi.useRealTimers() })

describe('host reminder transport', () => {
  it('observes questions before a consuming answerer and leaves its answer unchanged', async () => {
    const on = vi.fn()
    const publish = vi.fn()
    observeQuestions({ on }, publish)
    expect(on).toHaveBeenCalledWith('user-questions/request', expect.any(Function), { prepend: true })
    const listener = on.mock.calls[0][1]
    const request = { id: 'question' }
    const next = vi.fn(async () => 'answer')
    await expect(listener(request, next)).resolves.toBe('answer')
    expect(publish).toHaveBeenCalledWith(request)
    expect(next).toHaveBeenCalledOnce()
  })

  it('does not interrupt a question when notification publishing fails', async () => {
    const on = vi.fn()
    observeQuestions({ on }, () => { throw new Error('notification unavailable') })
    await expect(on.mock.calls[0][1]({}, async () => 'answer')).resolves.toBe('answer')
  })

  it('permits resumed roots and skips only currently owned agents', () => {
    const root = { header: { parentSession: 'old-session' } }
    const child = {}
    const agents = { get: (id: string) => id === 'root' ? root : child, roots: () => [root] }
    expect(isReminderRoot('root', agents)).toBe(true)
    expect(isReminderRoot('child', agents)).toBe(false)
  })

  it('seeds new clients, retains recent events and resumes from a cursor', () => {
    const journal = createReminderJournal('host', 2)
    const event = { sessionId: 's', kind: 'question' as const, title: 'Task' }
    journal.append(event)
    expect(journal.read()).toEqual({ epoch: 'host', cursor: 1, events: [] })
    journal.append(event); journal.append({ ...event, kind: 'completion' })
    expect(journal.read(0).events.map(row => row.seq)).toEqual([2, 3])
    expect(journal.read(2).events[0].kind).toBe('completion')
  })

  it('sends a native-web notification for a background session and suppresses a focused current session', () => {
    const show = vi.fn()
    class Notification { static permission = 'granted'; constructor(title: string, options: unknown) { show(title, options) } }
    vi.stubGlobal('window', { Notification })
    vi.stubGlobal('document', { hidden: false, hasFocus: () => true, documentElement: { lang: 'zh' } })
    const event = { seq: 1, sessionId: 's', kind: 'question' as const, title: 'Task' }
    showHostReminder(event, 's'); expect(show).not.toHaveBeenCalled()
    vi.stubGlobal('document', { hidden: true, hasFocus: () => false, documentElement: { lang: 'zh' } })
    showHostReminder(event, 's')
    expect(show).toHaveBeenCalledWith('等待回答', expect.objectContaining({ body: 'Task', tag: 'dsh-notification-s' }))
  })

  it('uses the authenticated desktop loopback WebSocket and retains its resume cursor', () => {
    expect(reminderSocketUrl('http://127.0.0.1:1234', 'host', 7)).toBe('ws://127.0.0.1:1234/dsh-notify-jump/socket?epoch=host&after=7')
    expect(reminderOriginAllowed('http://127.0.0.1:1234', '127.0.0.1:1234')).toBe(true)
    expect(reminderOriginAllowed('https://example.com', '127.0.0.1:1234')).toBe(false)
  })

  it('closes its owned connection when the plugin is disposed', () => {
    const close = vi.fn()
    class Socket { close = close; readyState = 0 }
    vi.stubGlobal('WebSocket', Socket)
    vi.stubGlobal('window', {})
    vi.stubGlobal('location', { href: 'http://localhost/' })
    const stop = startHostReminderWatcher(() => undefined)
    stop()
    expect(close).toHaveBeenCalledOnce()
  })

  it('delivers a pushed background reminder without waiting for a front-end timer', () => {
    const show = vi.fn()
    class Note { static permission = 'granted'; constructor(title: string) { show(title) } }
    const connections: Array<{ onmessage?: (message: { data: string }) => void }> = []
    class Socket { readyState = 1; onmessage?: (message: { data: string }) => void; close() {}; constructor() { connections.push(this) } }
    vi.stubGlobal('WebSocket', Socket)
    vi.stubGlobal('window', { Notification: Note })
    vi.stubGlobal('location', { href: 'http://localhost/' })
    vi.stubGlobal('document', { hidden: true, hasFocus: () => false, documentElement: { lang: 'zh' } })
    const stop = startHostReminderWatcher(() => 's')
    const send = (batch: unknown) => connections[0].onmessage?.({ data: JSON.stringify(batch) })
    send({ epoch: 'host', cursor: 0, events: [] })
    send({ epoch: 'host', cursor: 1, events: [{ seq: 1, sessionId: 's', kind: 'completion', title: 'Task' }] })
    expect(show).toHaveBeenCalledWith('本轮会话已结束')
    stop()
  })
})
