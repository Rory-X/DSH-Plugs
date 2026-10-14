import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const source = await readFile(new URL('../app.js', import.meta.url), 'utf8')

function contextHandler(state, overrides = {}) {
  const updates = source.slice(source.indexOf('function receiveDshWorkspaces('), source.indexOf("window.addEventListener('message'", source.indexOf('function receiveDshWorkspaces(')))
  const handlerStart = source.indexOf("window.addEventListener('message', event => {")
  const handler = source.slice(source.indexOf('if (!isBridgeEvent', handlerStart), source.indexOf("if (data.type === 'synapse:live-reply'", handlerStart))
  const dependencies = {
    state,
    window: {},
    isBridgeEvent: () => true,
    resetCanvasCamera: () => {},
    currentDshThread: () => undefined,
    currentDshWorkspace: () => state.dshWorkspaces.find(workspace => workspace.sessionIds.includes(state.currentDsh?.id)),
    openCurrentWorkspace: async () => false,
    openDshWorkspace: async () => true,
    canReplaceView: () => true,
    render: () => {},
    focusActiveCard: () => {},
    setError: error => { throw error },
    ...overrides,
  }
  return new Function(...Object.keys(dependencies), `${updates}; return event => { ${handler} }`)(...Object.values(dependencies))
}

function initialState() {
  return { currentDsh: { id: 'a' }, sessionContextVersion: 0, dshWorkspaces: [], selectedDshWorkspaceId: null, mapCardSessionSwitches: new Set() }
}

test('atomic context loads the newly selected workspace using the new session family', async () => {
  const state = initialState()
  const loads = []
  const handle = contextHandler(state, { openDshWorkspace: async id => { loads.push([id, state.currentDsh.id]); return true } })
  handle({ data: { type: 'synapse:context', session: { id: 'b' }, workspaces: [
    { id: 'old', title: 'Old', sessionIds: ['a'] },
    { id: 'new', title: 'New', sessionIds: ['b'] },
  ] } })
  await Promise.resolve()
  assert.deepEqual(loads, [['new', 'b']])
})

test('an older session-switch completion cannot focus or redraw a newer selection', async () => {
  const state = initialState()
  const pending = []
  let renders = 0
  let focuses = 0
  const handle = contextHandler(state, {
    openCurrentWorkspace: () => { const deferred = Promise.withResolvers(); pending.push(deferred); return deferred.promise },
    render: () => ++renders,
    focusActiveCard: () => ++focuses,
  })
  handle({ data: { type: 'synapse:current-session', session: { id: 'b' } } })
  handle({ data: { type: 'synapse:current-session', session: { id: 'c' } } })
  pending[0].resolve(false)
  await Promise.resolve()
  assert.equal(renders, 0)
  assert.equal(focuses, 0)
  pending[1].resolve(false)
  await Promise.resolve()
  assert.equal(renders, 1)
  assert.equal(focuses, 1)
  assert.equal(state.currentDsh.id, 'c')
})

test('a projection refresh loads changed data once rather than repeating the workspace fetch', async () => {
  const logic = source.slice(source.indexOf('async function refreshProjection('), source.indexOf('function openNewSession('))
  let loads = 0
  const refresh = new Function('refreshSummaries', `${logic}; return refreshProjection`)(async () => { ++loads; return true })
  assert.equal(await refresh(), true)
  assert.equal(loads, 1)
})

test('multiple running cards receive their updates in one animation frame', () => {
  const logic = source.slice(source.indexOf('const liveCardSessionIds ='), source.indexOf('function applyLiveReplyToCard('))
  const frames = []
  const updated = []
  const schedule = new Function('window', 'applyLiveReplyToCard', `let liveCardFrame = 0; ${logic}; return scheduleLiveCardUpdate`)(
    { requestAnimationFrame: fn => { frames.push(fn); return frames.length } }, id => updated.push(id),
  )
  schedule('a')
  schedule('b')
  schedule('a')
  assert.equal(frames.length, 1)
  frames[0]()
  assert.deepEqual(updated, ['a', 'b'])
})
