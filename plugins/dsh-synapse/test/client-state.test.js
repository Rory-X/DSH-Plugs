import assert from 'node:assert/strict'
import test from 'node:test'
import { createTurnReader, createLiveReplyBridge, createContextPublisher, markdownProps, liveReplyOf } from '../client-state.js'

function scheduler() {
  let sequence = 0
  const pending = new Map()
  return {
    pending,
    setTimeout(fn, delay) { pending.set(++sequence, { fn, delay }); return sequence },
    clearTimeout(id) { pending.delete(id) },
    flush(maxDelay = 16) {
      let count = 0
      while (true) {
        const job = [...pending].find(([, value]) => value.delay <= maxDelay)
        if (job === undefined) break
        assert.ok(count++ < 100, 'observer setup must not reenter indefinitely')
        pending.delete(job[0])
        job[1].fn()
      }
    },
  }
}

function source(initial) {
  const listeners = new Set()
  return {
    value: initial, listeners,
    getSnapshot() { return this.value },
    subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn) },
    emit() { for (const fn of [...listeners]) fn() },
    set(next) { this.value = next; this.emit() },
  }
}

function host({ modern = true, listed = ['a', 'b'] } = {}) {
  const timers = scheduler()
  const bindings = new Map()
  const references = []
  const calls = []
  const errors = []
  const list = source({ ids: listed })
  function materialize(id) {
    const session = source({ running: true, openState: 'open' })
    session.open = () => { calls.push(['open', id]); return Promise.resolve() }
    const chat = source({ legacy: { partial: { blocks: [{ kind: 'text', text: id + ' partial' }] } } })
    const binding = { sessionId: id, session, chat, refs: 0 }
    bindings.set(id, binding)
    return binding
  }
  for (const id of listed) materialize(id)
  const ctx = {
    uiWorkspace: { openSession() { assert.fail('observing a turn must not navigate') } },
    sessions: {
      list,
      binding(id) { calls.push(['borrow', id]); return bindings.get(id) },
      scope(id) { return bindings.get(id) },
      sessionOf(binding) { return binding.session },
      open() { assert.fail('observing a turn must not change the main selection') },
    },
    uiConversation: { binding(owner) {
      assert.equal(bindings.get(owner.sessionId), owner, 'only an active binding can assemble chat')
      return {
        activate() { assert.fail('read paths must not activate a projection') },
        target(name) { assert.equal(name, 'chat'); return owner.chat },
      }
    } },
  }
  if (modern) ctx.sessions.retain = (id, options) => {
    assert.equal(options.source, 'plugin')
    if (!list.value.ids.includes(id)) throw new Error('Unknown session')
    const binding = bindings.get(id) ?? materialize(id)
    ++binding.refs
    const ready = Promise.withResolvers()
    // Retain publishes list bookkeeping synchronously, like the desktop host.
    list.emit()
    let released = false
    const reference = {
      ready: ready.promise,
      resolve: ready.resolve, reject: ready.reject,
      get binding() { assert.equal(released, false); return binding },
      release() { if (!released) { released = true; --binding.refs; calls.push(['release', id]); list.emit() } },
    }
    references.push(reference)
    calls.push(['retain', id])
    return reference
  }
  return { ctx, timers, bindings, references, calls, errors, materialize, report: error => errors.push(error.message) }
}

test('Markdown props satisfy the code fence and footnote interfaces with stable localized labels', () => {
  const first = markdownProps('```pwsh\nGet-Item .\n```\n\nNote[^1]\n\n[^1]: Footnote', true)
  const next = markdownProps('```pwsh\nGet-Item .\n```\n\nComplete', false)
  assert.equal(first.streaming, true)
  assert.equal(next.streaming, false)
  assert.equal(first.labels, next.labels, 'streaming renderer caches must survive a chunk update')
  assert.equal(first.labels.code.copyLabel, '复制')
  assert.equal(first.labels.code.copiedLabel, '已复制')
  assert.equal(first.labels.footnotes, '脚注')
  assert.deepEqual(first.labels.code.toolbarLabels, { codeLabel: '代码', wrapLabel: '自动换行', unwrapLabel: '取消换行' })
  assert.equal(first.codeLabels, undefined)
})

test('reading a turn snapshot never resolves or publishes a host binding during render', () => {
  const fixture = host()
  const reader = createTurnReader(fixture.ctx, 'a', fixture.timers, fixture.report)
  const snapshot = reader.getSnapshot()
  for (let i = 0; i < 100; ++i) assert.equal(reader.getSnapshot(), snapshot)
  assert.deepEqual(fixture.calls, [])
  assert.equal(fixture.references.length, 0)
})

test('details retain an unopened background session and release it after the last subscriber closes', () => {
  const fixture = host()
  fixture.bindings.delete('b')
  const reader = createTurnReader(fixture.ctx, 'b', fixture.timers, fixture.report)
  const off = reader.subscribe(() => {})
  const offOther = reader.subscribe(() => {})
  assert.deepEqual(fixture.calls.filter(([kind]) => kind === 'retain'), [['retain', 'b']])
  assert.equal(reader.getSnapshot().snapshot.running, true)
  assert.equal(fixture.bindings.get('b').refs, 1)
  off()
  assert.equal(fixture.bindings.get('b').refs, 1)
  offOther()
  assert.equal(fixture.bindings.get('b').refs, 0)
  assert.equal(fixture.bindings.get('b').session.listeners.size, 0)
  assert.equal(fixture.bindings.get('b').chat.listeners.size, 0)
  assert.equal(fixture.ctx.sessions.list.listeners.size, 0)
  assert.equal(fixture.timers.pending.size, 0)
})

test('streaming chunks coalesce while completion is still delivered', () => {
  const fixture = host()
  const reader = createTurnReader(fixture.ctx, 'a', fixture.timers, fixture.report)
  let updates = 0
  const off = reader.subscribe(() => ++updates)
  fixture.timers.flush()
  const before = updates
  const binding = fixture.bindings.get('a')
  for (let i = 0; i < 100; ++i) binding.chat.set({ legacy: { partial: { blocks: [{ kind: 'text', text: 'chunk ' + i }] } } })
  assert.equal(updates, before)
  fixture.timers.flush()
  assert.equal(updates, before + 1)
  assert.equal(liveReplyOf(reader.getSnapshot().snapshot, reader.getSnapshot().chat).text, 'chunk 99')
  binding.session.set({ running: false, openState: 'open' })
  fixture.timers.flush()
  assert.equal(reader.getSnapshot().snapshot.running, false)
  off()
})

test('replacement generations release old sources and ignore their queued callbacks', () => {
  const fixture = host()
  const reader = createTurnReader(fixture.ctx, 'a', fixture.timers, fixture.report)
  const off = reader.subscribe(() => {})
  const previous = fixture.bindings.get('a')
  const staleCallback = [...previous.chat.listeners][0]
  const replacement = fixture.materialize('a')
  fixture.ctx.sessions.list.emit()
  fixture.timers.flush()
  assert.equal(previous.refs, 0)
  assert.equal(previous.chat.listeners.size, 0)
  assert.equal(replacement.refs, 1)
  staleCallback()
  fixture.timers.flush()
  assert.equal(fixture.references.length, 2)
  off()
  assert.equal(replacement.refs, 0)
})

test('opening failures stay local and late failures cannot overwrite a new reader', async () => {
  const fixture = host()
  const reader = createTurnReader(fixture.ctx, 'a', fixture.timers, fixture.report)
  const off = reader.subscribe(() => {})
  fixture.references[0].reject(new Error('History unavailable'))
  await Promise.resolve()
  assert.equal(reader.getSnapshot().error, 'History unavailable')
  off()
  const next = createTurnReader(fixture.ctx, 'b', fixture.timers, fixture.report)
  const offNext = next.subscribe(() => {})
  offNext()
  fixture.references[1].reject(new Error('Late failure'))
  await Promise.resolve()
  assert.deepEqual(fixture.errors, ['History unavailable'])
  assert.equal(fixture.timers.pending.size, 0)
})

test('a source read exception becomes cached error data and recovers on a later update', () => {
  const fixture = host()
  const binding = fixture.bindings.get('a')
  const getChat = binding.chat.getSnapshot
  binding.chat.getSnapshot = () => { throw new Error('Projection unavailable') }
  const reader = createTurnReader(fixture.ctx, 'a', fixture.timers, fixture.report)
  const off = reader.subscribe(() => {})
  assert.equal(reader.getSnapshot().error, 'Projection unavailable')
  assert.doesNotThrow(() => reader.getSnapshot())
  binding.chat.getSnapshot = getChat
  binding.chat.emit()
  fixture.timers.flush()
  assert.equal(reader.getSnapshot().error, '')
  off()
})

test('remote openState errors are surfaced even when the readiness promise resolves', async () => {
  const fixture = host()
  fixture.bindings.get('a').session.value = { running: false, openState: 'error', openError: { message: 'Remote history failed' } }
  const reader = createTurnReader(fixture.ctx, 'a', fixture.timers, fixture.report)
  const off = reader.subscribe(() => {})
  fixture.references[0].resolve()
  await Promise.resolve()
  assert.equal(reader.getSnapshot().error, 'Remote history failed')
  off()
})

test('failed subscription setup releases the listener and modern reference', () => {
  const fixture = host()
  fixture.bindings.get('a').chat.subscribe = () => { throw new Error('Subscription failed') }
  const reader = createTurnReader(fixture.ctx, 'a', fixture.timers, fixture.report)
  const off = reader.subscribe(() => {})
  assert.equal(reader.getSnapshot().error, 'Subscription failed')
  assert.equal(fixture.bindings.get('a').session.listeners.size, 0)
  assert.equal(fixture.bindings.get('a').refs, 0)
  fixture.timers.flush()
  assert.equal(fixture.references.length, 1, 'retention callbacks must not repeatedly retry a failed setup')
  fixture.bindings.get('a').chat.subscribe = () => () => {}
  reader.retry()
  assert.equal(reader.getSnapshot().error, '')
  assert.equal(fixture.bindings.get('a').refs, 1)
  off()
})

test('legacy histories load without selecting a session, and a cancelled retry cannot reopen one', () => {
  const fixture = host({ modern: false })
  const reader = createTurnReader(fixture.ctx, 'a', fixture.timers, fixture.report)
  const off = reader.subscribe(() => {})
  assert.ok(fixture.calls.some(([kind]) => kind === 'open'))
  off()
  fixture.bindings.delete('b')
  const waiting = createTurnReader(fixture.ctx, 'b', fixture.timers, fixture.report)
  const offWaiting = waiting.subscribe(() => {})
  const retry = [...fixture.timers.pending.values()].find(job => job.delay === 200).fn
  offWaiting()
  fixture.materialize('b')
  retry()
  assert.equal(fixture.bindings.get('b').session.listeners.size, 0)
  assert.equal(fixture.timers.pending.size, 0)
})

test('live reply bridge survives synchronous subscribe notifications without duplicate sources', () => {
  const fixture = host()
  const messages = []
  const bridge = createLiveReplyBridge(fixture.ctx, (type, payload) => messages.push({ type, ...payload }), fixture.timers, fixture.report)
  for (const binding of fixture.bindings.values()) {
    const subscribe = binding.chat.subscribe.bind(binding.chat)
    binding.chat.subscribe = fn => { const off = subscribe(fn); bridge.sync(); fn(); return off }
  }
  bridge.setActive(true)
  fixture.timers.flush()
  assert.equal(messages.length, 2)
  for (const binding of fixture.bindings.values()) {
    assert.equal(binding.chat.listeners.size, 1)
    assert.equal(binding.session.listeners.size, 1)
  }
  assert.equal(fixture.references.length, 0, 'background sync must not acquire every session')
  bridge.dispose()
  for (const binding of fixture.bindings.values()) assert.equal(binding.chat.listeners.size, 0)
})

test('parallel live replies both publish, idle updates deduplicate, and iframe reload replays data', () => {
  const fixture = host()
  const messages = []
  const bridge = createLiveReplyBridge(fixture.ctx, (type, payload) => messages.push(payload), fixture.timers, fixture.report)
  bridge.setActive(true)
  fixture.timers.flush()
  messages.length = 0
  for (let i = 0; i < 50; ++i) for (const [id, binding] of fixture.bindings) binding.chat.set({ legacy: { partial: { blocks: [{ kind: 'text', text: id + i }] } } })
  fixture.timers.flush()
  assert.deepEqual(messages.map(message => message.text), ['a49', 'b49'])
  for (const binding of fixture.bindings.values()) binding.session.emit()
  fixture.timers.flush()
  assert.equal(messages.length, 2)
  bridge.replay()
  fixture.timers.flush()
  assert.equal(messages.length, 4)
  bridge.setActive(false)
  for (const binding of fixture.bindings.values()) binding.chat.emit()
  fixture.timers.flush()
  assert.equal(messages.length, 4)
  assert.equal(fixture.timers.pending.size, 0)
})

test('live bridges replace stale generations and isolate a failing session from other replies', () => {
  const fixture = host()
  const messages = []
  const bridge = createLiveReplyBridge(fixture.ctx, (type, payload) => messages.push(payload), fixture.timers, fixture.report)
  bridge.setActive(true)
  fixture.timers.flush()
  const previous = fixture.bindings.get('a')
  const staleCallback = [...previous.chat.listeners][0]
  fixture.materialize('a')
  fixture.bindings.get('b').chat.getSnapshot = () => { throw new Error('Broken session') }
  bridge.sync()
  fixture.bindings.get('b').chat.emit()
  fixture.timers.flush()
  assert.equal(previous.chat.listeners.size, 0)
  assert.equal(fixture.bindings.get('a').chat.listeners.size, 1)
  assert.ok(messages.some(message => message.sessionId === 'a'))
  assert.ok(fixture.errors.includes('Broken session'))
  staleCallback()
  bridge.dispose()
  fixture.timers.flush()
})

test('partial replies tolerate an absent or malformed block list', () => {
  assert.deepEqual(liveReplyOf({ running: true }, { legacy: { partial: {} } }), { running: true, text: '' })
  assert.deepEqual(liveReplyOf(undefined, undefined), { running: false, text: '' })
  assert.equal(liveReplyOf({}, { legacy: { partial: { blocks: [null, {}, { kind: 'text', text: 'valid' }] } } }).text, 'valid')
})

test('context publication batches a transient absent binding and sends one coherent settled context', () => {
  const timers = scheduler()
  let context = { session: { id: 'a' }, workspaces: [{ id: 'workspace', sessionIds: ['a', 'b'] }] }
  const messages = []
  const publisher = createContextPublisher(() => context, (type, payload) => messages.push({ type, ...payload }), timers)
  publisher.force()
  context = { ...context, session: null }
  publisher.sync()
  context = { ...context, session: { id: 'b' } }
  publisher.sync()
  timers.flush()
  assert.equal(messages.length, 2)
  assert.equal(messages[1].session.id, 'b')
  assert.equal(messages[1].type, 'synapse:context')
  publisher.sync()
  timers.flush()
  assert.equal(messages.length, 2, 'unchanged context must not reload the map')
  publisher.force()
  assert.equal(messages.length, 3, 'a newly loaded iframe needs the current context again')
  publisher.sync()
  publisher.dispose()
  timers.flush()
  assert.equal(messages.length, 3)
})

test('repeated open-close cycles leave no retained references, listeners or scheduled work', () => {
  const fixture = host()
  for (let i = 0; i < 100; ++i) {
    const reader = createTurnReader(fixture.ctx, i % 2 ? 'a' : 'b', fixture.timers, fixture.report)
    const off = reader.subscribe(() => {})
    fixture.timers.flush()
    off()
  }
  for (const binding of fixture.bindings.values()) {
    assert.equal(binding.refs, 0)
    assert.equal(binding.session.listeners.size, 0)
    assert.equal(binding.chat.listeners.size, 0)
  }
  assert.equal(fixture.ctx.sessions.list.listeners.size, 0)
  assert.equal(fixture.timers.pending.size, 0)
  assert.deepEqual(fixture.errors, [])
})
