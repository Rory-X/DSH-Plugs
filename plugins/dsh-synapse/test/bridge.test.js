import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

test('current session follows the UI binding on modern hosts and the controller on legacy hosts', async () => {
  const source = await readFile(new URL('../client.js', import.meta.url), 'utf8')
  const current = source.slice(source.indexOf('const currentSession ='), source.indexOf('const sessionSnapshot ='))
  const currentSession = new Function(`${current}; return currentSession`)()
  const snapshot = { current: 'stale', byId: { stale: { displayTitle: 'Old' }, active: { displayTitle: 'Active', parentId: 'parent' } } }
  const ctx = { sessions: { list: { getSnapshot: () => snapshot } }, uiSession: { current: { getSnapshot: () => ({ key: 'active' }) } } }
  assert.equal(currentSession(ctx).id, 'active')
  assert.equal(currentSession(ctx).parentId, 'parent')
  ctx.uiSession.current.getSnapshot = () => ({ key: undefined })
  assert.equal(currentSession(ctx), null)
  delete ctx.uiSession
  assert.equal(currentSession(ctx).id, 'stale')
})

test('session navigation uses the modern workspace service with a legacy fallback', async () => {
  const source = await readFile(new URL('../client.js', import.meta.url), 'utf8')
  const logic = source.slice(source.indexOf('function openSession('), source.indexOf('const h = React.createElement'))
  const openSession = new Function(`${logic}; return openSession`)()
  const opened = []
  openSession({ uiWorkspace: { openSession: id => opened.push(['modern', id]) } }, 'child')
  openSession({ sessions: { open: id => opened.push(['legacy', id]) } }, 'root')
  assert.deepEqual(opened, [['modern', 'child'], ['legacy', 'root']])
})

for (const file of ['app.js', 'client.js']) {
  const source = await readFile(new URL(`../${file}`, import.meta.url), 'utf8')
  const start = source.indexOf('function bridgeTargetOrigin')
  const end = source.indexOf(file === 'app.js' ? 'function post(' : 'function chatTargetOf(', start)
  const { bridgeTargetOrigin, isBridgeEvent } = new Function(`${source.slice(start, end)}; return { bridgeTargetOrigin, isBridgeEvent }`)()

  test(`${file}: desktop bridge accepts opaque origins only from the paired window`, () => {
    const location = { protocol: 'dsh-app:', host: 'app', origin: 'dsh-app://app' }
    const peer = {}
    const message = { source: peer, origin: 'null', data: { source: 'dsh-synapse', type: 'synapse:current-session' } }
    assert.equal(bridgeTargetOrigin(location), '*')
    assert.equal(isBridgeEvent(message, peer, location), true)
    assert.equal(isBridgeEvent({ ...message, origin: 'dsh-app://app' }, peer, location), true)
    assert.equal(isBridgeEvent({ ...message, source: {} }, peer, location), false)
    assert.equal(isBridgeEvent({ ...message, origin: 'https://unrelated.example' }, peer, location), false)
    assert.equal(isBridgeEvent(message, undefined, location), false)
  })

  test(`${file}: web bridge requires both the correct origin and paired window`, () => {
    const location = { protocol: 'http:', host: 'localhost:19387', origin: 'http://localhost:19387' }
    const peer = {}
    const message = { source: peer, origin: location.origin, data: { source: 'dsh-synapse' } }
    assert.equal(bridgeTargetOrigin(location), location.origin)
    assert.equal(isBridgeEvent(message, peer, location), true)
    assert.equal(isBridgeEvent({ ...message, origin: 'null' }, peer, location), false)
    assert.equal(isBridgeEvent({ ...message, source: {} }, peer, location), false)
  })
}
