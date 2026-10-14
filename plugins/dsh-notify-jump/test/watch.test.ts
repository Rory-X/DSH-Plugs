import { afterEach, describe, expect, it, vi } from 'vitest'
import type { PendingInteractionsSource, SessionId, SessionListState, SessionStatus, SessionStatusSource } from '@just-genius/dsh-plugin-runtime/client'
import { canNotifySession, startCompletionWatcher, startPendingWatcher } from '../src/client/watch'
import { pendingAdvance } from '../src/client/pending'

function store<T>(initial: T) {
  let state = initial
  const listeners = new Set<() => void>()
  return {
    getSnapshot: () => state,
    subscribe(fn: () => void) { listeners.add(fn); return () => { listeners.delete(fn) } },
    set(next: T) { state = next; for (const fn of listeners) fn() },
  }
}

const cleanup: Array<() => void> = []
afterEach(() => { for (const stop of cleanup.splice(0)) stop(); vi.unstubAllGlobals() })

function fixture() {
  const shown: Array<{ title: string; options: NotificationOptions }> = []
  class Note {
    static permission: NotificationPermission = 'granted'
    constructor(title: string, options: NotificationOptions) { shown.push({ title, options }) }
  }
  vi.stubGlobal('window', { Notification: Note })
  vi.stubGlobal('document', { hidden: false, hasFocus: () => false, documentElement: { lang: 'zh' } })
  const id = 'session-one' as SessionId
  const state = (running: boolean, phase: SessionListState['phase'] = 'ready'): SessionListState => ({
    ids: [id], current: id, phase,
    byId: { [id]: { id, displayTitle: 'Task', running, blank: false, updatedAt: 1 } },
    subagentsByParent: {}, jobsBySession: {}, currentAddress: undefined,
  })
  const list = store(state(false))
  const pending = store<ReadonlyMap<string, unknown>>(new Map())
  let reset!: () => void
  let permissionChanged!: () => void
  const pendingFace = pending as unknown as PendingInteractionsSource
  return { list, pending, pendingFace, state, shown, Note,
    onReset: (fn: () => void) => { reset = fn; return () => {} }, reset: () => reset(),
    onPermission: (fn: () => void) => { permissionChanged = fn; return () => {} }, permissionChanged: () => permissionChanged(),
  }
}

describe('session notification triggers', () => {
  it('notifies for a new wait and a different wait of the same kind', () => {
    const f = fixture()
    cleanup.push(startPendingWatcher({ list: f.list }, f.pendingFace, f.onReset))
    const wait = (key: string) => new Map([['session-one', { kind: 'approval', key }]])
    f.pending.set(wait('first')); f.pending.set(wait('first')); f.pending.set(wait('second'))
    expect(f.shown).toHaveLength(2)
    expect(f.shown[0].options.tag).toBe('dsh-notification-session-one')
  })

  it('does not lose a newly arrived wait while native permission is resolving', () => {
    const f = fixture()
    f.Note.permission = 'default'
    cleanup.push(startPendingWatcher({ list: f.list }, f.pendingFace, f.onReset, f.onPermission))
    f.pending.set(new Map([['session-one', { kind: 'question', key: 'q' }]]))
    expect(f.shown).toHaveLength(0)
    f.Note.permission = 'granted'
    f.permissionChanged()
    expect(f.shown).toHaveLength(1)
  })

  it('seeds first snapshots and reconnect replay without replaying old alerts', () => {
    const f = fixture()
    f.pending.set(new Map([['session-one', { kind: 'approval', key: 'existing' }]]))
    cleanup.push(startPendingWatcher({ list: f.list }, f.pendingFace, f.onReset))
    f.reset()
    f.list.set(f.state(false, 'pending'))
    f.list.set(f.state(false))
    expect(f.shown).toHaveLength(0)
  })

  it('notifies on a completed turn even when the DSH window remains visible in the background', () => {
    const f = fixture()
    cleanup.push(startCompletionWatcher({ list: f.list }, f.pendingFace, f.onReset))
    f.list.set(f.state(true)); f.list.set(f.state(false)); f.list.set(f.state(false))
    expect(f.shown).toHaveLength(1)
    expect(f.shown[0].title).toBe('本轮会话已结束')
  })

  it('does not confuse waiting for approval with a finished turn', () => {
    const f = fixture()
    cleanup.push(startCompletionWatcher({ list: f.list }, f.pendingFace, f.onReset))
    f.list.set(f.state(true))
    f.pending.set(new Map([['session-one', { kind: 'approval', key: 'a' }]]))
    f.list.set(f.state(false))
    expect(f.shown).toHaveLength(0)
  })

  it('observes desktop activity events before the session list refreshes', () => {
    const f = fixture()
    const id = 'session-one' as SessionId
    const status = store<ReadonlyMap<SessionId, SessionStatus>>(new Map([[id, { running: false }]]))
    cleanup.push(startCompletionWatcher({ list: f.list }, f.pendingFace, f.onReset, undefined, status))
    status.set(new Map([[id, { running: true }]]))
    status.set(new Map([[id, { running: false }]]))
    f.list.set(f.state(false))
    expect(f.shown).toHaveLength(1)
    expect(f.shown[0].title).toBe('本轮会话已结束')
  })

  it('reseeds desktop activity after reconnect without announcing an old completion', () => {
    const f = fixture()
    const id = 'session-one' as SessionId
    const status = store<ReadonlyMap<SessionId, SessionStatus>>(new Map([[id, { running: true }]]))
    cleanup.push(startCompletionWatcher({ list: f.list }, f.pendingFace, f.onReset, undefined, status))
    f.reset()
    status.set(new Map([[id, { running: false }]]))
    expect(f.shown).toHaveLength(0)
  })

  it('suppresses only the session the user is actually looking at', () => {
    expect(canNotifySession('a', 'a', true, true)).toBe(false)
    expect(canNotifySession('a', 'a', true, false)).toBe(true)
    expect(canNotifySession('a', 'a', false, true)).toBe(true)
    expect(canNotifySession('b', 'a', true, true)).toBe(true)
    expect(pendingAdvance(undefined, 'question', 'a').fresh).toBe(false)
  })
})
