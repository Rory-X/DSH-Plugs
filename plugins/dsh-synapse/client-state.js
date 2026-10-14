// These adapters contain no React or DOM code. A render reads cached data;
// acquiring a host binding and subscribing to it belongs to the observer.
const MARKDOWN_LABELS = Object.freeze({
  code: Object.freeze({
    copyLabel: '复制', copiedLabel: '已复制',
    toolbarLabels: Object.freeze({ codeLabel: '代码', wrapLabel: '自动换行', unwrapLabel: '取消换行' }),
  }),
  footnotes: '脚注',
})

export function markdownProps(text, streaming) {
  return { text: String(text ?? ''), streaming: streaming === true, labels: MARKDOWN_LABELS }
}

export function errorMessage(error) {
  return typeof error?.message === 'string' ? error.message : '这一轮暂时无法加载'
}

function cleanup(callback, report) {
  try { callback?.() } catch (error) { report(error) }
}

function borrowedBinding(ctx, id) {
  const binding = ctx.sessions.binding(id)
  if (binding === undefined) return undefined
  if (binding.session !== undefined) return binding
  const scope = ctx.sessions.scope?.(id)
  const session = scope === undefined ? undefined : ctx.sessions.sessionOf(scope)
  return session === undefined ? undefined : { ...binding, session, owner: binding }
}

function chatSource(ctx, binding) {
  return ctx.uiConversation.binding(binding.owner ?? binding).target('chat')
}

export function createTurnReader(ctx, id, timers = globalThis, report = () => {}) {
  let value = { snapshot: undefined, chat: undefined, error: '', loading: true }
  const listeners = new Set()
  let active = false
  let generation = 0
  let reference
  let binding
  let chat
  let offSources = []
  let offList = () => {}
  let refreshTimer
  let retryTimer
  let tries = 0

  const publish = next => {
    if (!active || Object.keys(next).every(key => next[key] === value[key])) return
    value = next
    for (const listener of [...listeners]) cleanup(listener, report)
  }
  const fail = (error, token = generation) => {
    if (!active || token !== generation) return
    const message = errorMessage(error)
    if (message !== value.error) report(error)
    publish({ ...value, error: message, loading: false })
  }
  const releaseBinding = () => {
    ++generation
    const oldReference = reference
    reference = undefined
    binding = undefined
    chat = undefined
    for (const off of offSources.splice(0)) cleanup(off, report)
    cleanup(() => oldReference?.release(), report)
  }
  const read = () => {
    if (!active || binding === undefined) return
    try {
      const snapshot = binding.session.getSnapshot()
      const nextChat = chat?.getSnapshot()
      const error = snapshot.openState === 'error' ? errorMessage(snapshot.openError) : ''
      publish({ snapshot, chat: nextChat, error, loading: snapshot.openState === 'cold' || snapshot.openState === 'loading' })
    } catch (error) { fail(error) }
  }
  const refresh = () => {
    refreshTimer = undefined
    if (!active) return
    // Failed setup can itself publish retention bookkeeping. Retrying from
    // that notification would create an endless acquire/release loop.
    if (binding === undefined && value.error !== '') return
    try {
      const current = ctx.sessions.binding(id)
      if (binding === undefined || current !== (binding.owner ?? binding)) acquire()
      else read()
    } catch (error) { fail(error) }
  }
  const schedule = () => {
    if (active && refreshTimer === undefined) refreshTimer = timers.setTimeout(refresh, 16)
  }
  const acquire = () => {
    if (!active) return
    timers.clearTimeout(retryTimer)
    retryTimer = undefined
    releaseBinding()
    const token = generation
    try {
      // Modern controllers lend bindings only while a reference is retained.
      // A plugin reference keeps details alive without becoming the main view.
      if (typeof ctx.sessions.retain === 'function') {
        reference = ctx.sessions.retain(id, { source: 'plugin' })
        Promise.resolve(reference.ready).then(() => {
          if (active && token === generation) read()
        }, error => fail(error, token))
        binding = reference.binding
      } else binding = borrowedBinding(ctx, id)
      if (binding === undefined) {
        if (tries++ < 25) retryTimer = timers.setTimeout(acquire, 200)
        else fail(new Error('关联的会话已不可用'), token)
        return
      }
      const changed = () => { if (active && token === generation) schedule() }
      offSources.push(binding.session.subscribe(changed))
      chat = chatSource(ctx, binding)
      if (chat !== undefined) offSources.push(chat.subscribe(changed))
      if (reference === undefined) Promise.resolve(binding.session.open?.()).then(() => {
        if (active && token === generation) read()
      }, error => fail(error, token))
      read()
    } catch (error) {
      releaseBinding()
      fail(error)
    }
  }
  const start = () => {
    active = true
    tries = 0
    try {
      offList = ctx.sessions.list?.subscribe(schedule) ?? (() => {})
      acquire()
    } catch (error) { fail(error) }
  }
  const stop = () => {
    active = false
    timers.clearTimeout(refreshTimer)
    timers.clearTimeout(retryTimer)
    refreshTimer = retryTimer = undefined
    cleanup(offList, report)
    releaseBinding()
  }
  return {
    getSnapshot: () => value,
    retry() { if (active) acquire() },
    subscribe(listener) {
      listeners.add(listener)
      if (listeners.size === 1) start()
      return () => { listeners.delete(listener); if (listeners.size === 0 && active) stop() }
    },
  }
}

export function liveReplyOf(snapshot, chat) {
  const blocks = chat?.legacy?.partial?.blocks
  const text = Array.isArray(blocks) ? blocks.filter(block => block?.kind === 'text' && typeof block.text === 'string').map(block => block.text).join('\n') : ''
  return { running: snapshot?.running === true, text }
}

// Only observe materialized sessions while the map is mounted. Reconcile by
// binding identity as well as id: reconnects can replace a session generation.
export function createLiveReplyBridge(ctx, send, timers = globalThis, report = () => {}) {
  const entries = new Map()
  const dirty = new Set()
  let active = false
  let syncTimer
  let publishTimer
  const remove = (id, entry) => {
    entries.delete(id)
    dirty.delete(id)
    entry.live = false
    for (const off of entry.off) cleanup(off, report)
  }
  const flush = () => {
    publishTimer = undefined
    if (!active) return
    const ids = [...dirty]
    dirty.clear()
    for (const id of ids) {
      const entry = entries.get(id)
      if (entry === undefined) continue
      try {
        if (ctx.sessions.binding(id) !== (entry.binding.owner ?? entry.binding)) { sync(); continue }
        const next = liveReplyOf(entry.binding.session.getSnapshot(), entry.chat?.getSnapshot())
        if (entry.last?.running === next.running && entry.last?.text === next.text) continue
        entry.last = next
        send('synapse:live-reply', { sessionId: id, ...next })
      } catch (error) { remove(id, entry); report(error) }
    }
  }
  const mark = (id, entry) => {
    if (!active || !entry.live) return
    dirty.add(id)
    if (publishTimer === undefined) publishTimer = timers.setTimeout(flush, 16)
  }
  const reconcileEntries = () => {
    syncTimer = undefined
    if (!active) return
    const ids = new Set(ctx.sessions.list.getSnapshot().ids)
    for (const [id, entry] of entries) {
      if (!ids.has(id) || ctx.sessions.binding(id) !== (entry.binding.owner ?? entry.binding)) remove(id, entry)
    }
    for (const id of ids) {
      if (entries.has(id)) continue
      let entry
      try {
        const binding = borrowedBinding(ctx, id)
        if (binding === undefined) continue
        entry = { binding, live: true, off: [], chat: undefined, last: undefined }
        // Register before subscribe: activating chat can synchronously notify
        // the host and call sync() again. That must not duplicate this entry.
        entries.set(id, entry)
        const changed = () => mark(id, entry)
        entry.off.push(binding.session.subscribe(changed))
        entry.chat = chatSource(ctx, binding)
        if (entry.chat !== undefined) entry.off.push(entry.chat.subscribe(changed))
        mark(id, entry)
      } catch (error) { if (entry !== undefined) remove(id, entry); report(error) }
    }
  }
  const reconcile = () => { try { reconcileEntries() } catch (error) { report(error) } }
  const sync = () => {
    if (active && syncTimer === undefined) syncTimer = timers.setTimeout(reconcile, 0)
  }
  const stop = () => {
    active = false
    timers.clearTimeout(syncTimer)
    timers.clearTimeout(publishTimer)
    syncTimer = publishTimer = undefined
    for (const [id, entry] of entries) remove(id, entry)
  }
  return {
    sync,
    replay() { for (const [id, entry] of entries) { entry.last = undefined; mark(id, entry) } },
    setActive(next) { if (next === active) return; if (next) { active = true; sync() } else stop() },
    dispose: stop,
  }
}

// Retaining details changes catalog bookkeeping, not the map's context. Send
// one coherent context only when its user-facing fields actually changed.
export function createContextPublisher(read, send, timers = globalThis) {
  let last
  let timer
  let disposed = false
  const flush = (force = false) => {
    timers.clearTimeout(timer)
    timer = undefined
    if (disposed) return
    const context = read()
    const signature = JSON.stringify(context)
    if (!force && signature === last) return
    last = signature
    send('synapse:context', context)
  }
  return {
    sync() { if (!disposed && timer === undefined) timer = timers.setTimeout(() => flush(), 0) },
    force() { flush(true) },
    dispose() { disposed = true; timers.clearTimeout(timer) },
  }
}
