import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const client = await readFile(new URL('../client.js', import.meta.url), 'utf8')
const app = await readFile(new URL('../app.js', import.meta.url), 'utf8')

for (const currentId of ['session', 'branch']) {
  test(`details for a running card preserve the current session ${currentId} and camera`, () => {
    const messages = []
    const state = {
      currentDsh: { id: currentId },
      inspectorCardId: 'other-card',
      canvasCamera: { x: -800, y: 400 },
      zoom: 0.8,
      mapCardSessionSwitches: new Set(),
      canvasCardsById: new Map([['card', { sourceSeq: 17, turnIndex: 2 }]]),
    }
    const watchCardTurn = new Function('state', 'post', 'closeCardInspector',
      `${app.slice(app.indexOf('function watchCardTurn('), app.indexOf('function dropThreadsFromCanvas('))}; return watchCardTurn`)(
      state, (type, payload) => messages.push({ type, ...payload }),
      () => { state.inspectorCardId = null },
    )
    watchCardTurn({ dshSessionId: 'branch' }, 'card')
    assert.deepEqual(messages, [{ type: 'synapse:watch-turn', sessionId: 'branch', seq: 17, turnIndex: 2, cardId: 'card' }])
    assert.equal(state.currentDsh.id, currentId)
    assert.deepEqual(state.canvasCamera, { x: -800, y: 400 })
    assert.equal(state.zoom, 0.8)
    assert.equal(state.mapCardSessionSwitches.size, 0)
    assert.equal(state.inspectorCardId, null)
  })
}

test('the host accepts a detail request without navigating, and a close request clears only the pane', () => {
  const handler = client.slice(client.indexOf("if (event.data.type === 'synapse:watch-turn')"),
    client.indexOf("if (event.data.type === 'synapse:activate-session')"))
  const messages = []
  const turnWatch = { value: null, set(next) { this.value = next } }
  const handle = new Function('event', 'turnWatch', 'send', handler)
  const send = type => messages.push(type)
  handle({ data: { type: 'synapse:watch-turn', sessionId: 'branch', seq: 17, turnIndex: 2, cardId: 'card' } }, turnWatch, send)
  assert.deepEqual(turnWatch.value, { sessionId: 'branch', seq: 17, turnIndex: 2, cardId: 'card' })
  assert.deepEqual(messages, ['synapse:close-inspector'])
  handle({ data: { type: 'synapse:watch-turn' } }, turnWatch, send)
  assert.equal(turnWatch.value, null)
  assert.deepEqual(messages, ['synapse:close-inspector'])
})

