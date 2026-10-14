import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

async function messageView(thread) {
  const source = await readFile(new URL('../app.js', import.meta.url), 'utf8')
  const state = { workspace: { threads: [thread] }, historyBySession: new Map(), pendingReplies: new Map(), liveReplies: new Map() }
  const messages = source.slice(source.indexOf('function persistedMessagesFor'), source.indexOf('function latestMessage'))
  const detail = source.slice(source.indexOf('function messagesForCard'), source.indexOf('function inspectorProcessEntries'))
  return { state, ...new Function('state', `${messages}\n${detail}\nreturn { messagesFor, messagesForCard }`)(state) }
}

test('a failed submitted question settles its optimistic reply instead of leaving a fake running answer', async () => {
  const thread = { id: 'thread', dshSessionId: 'session', messages: [
    { kind: 'user', text: 'Question', sourceSeq: 1, at: new Date(1000).toISOString() },
    { kind: 'error', text: 'Request failed', sourceSeq: 2 },
  ] }
  const { state, messagesFor } = await messageView(thread)
  state.pendingReplies.set('session', { text: 'Question', at: 1000 })
  assert.deepEqual(messagesFor(thread), thread.messages)
  assert.equal(state.pendingReplies.size, 0)
})

test('filters old injected context without removing an explicitly human-authored quotation', async () => {
  const thread = { id: 'thread', messages: [
    { kind: 'user', text: '<system-reminder>Old cached context</system-reminder>' },
    { kind: 'user', text: 'File notification', source: { kind: 'plugin' } },
    { kind: 'user', text: '<system-reminder>Quoted text</system-reminder>', source: { kind: 'user' } },
  ] }
  const { messagesFor } = await messageView(thread)
  assert.deepEqual(messagesFor(thread), [thread.messages[2]])
})

test('reply-only fork cards and subsequent questions resolve to their own detail messages', async () => {
  const thread = { id: 'thread', messages: [
    { kind: 'assistant', text: 'Alternative reply', sourceSeq: 5 },
    { kind: 'user', text: 'Follow up', sourceSeq: 7 },
    { kind: 'assistant', text: 'Follow-up reply', sourceSeq: 8 },
  ] }
  const { messagesForCard } = await messageView(thread)
  assert.deepEqual(messagesForCard({ dshThreadId: 'thread', turnIndex: 0 }).messages, [thread.messages[0]])
  assert.deepEqual(messagesForCard({ dshThreadId: 'thread', turnIndex: 1 }).messages, thread.messages.slice(1))
})

test('an assistant sequence opens the correct native turn despite inherited user turns', async () => {
  const source = await readFile(new URL('../client.js', import.meta.url), 'utf8')
  const logic = source.slice(source.indexOf('const sliceTurnNodes'), source.indexOf('function MarkdownBody'))
  const { sliceTurnNodes, isLastUserTurn } = new Function('seqOf', `${logic}\nreturn { sliceTurnNodes, isLastUserTurn }`)(node => node.anchorSeq)
  const nodes = [
    { key: 'u1', kind: 'user', anchorSeq: 1 }, { key: 'a1', kind: 'assistant', anchorSeq: 2 },
    { key: 'u2', kind: 'user', anchorSeq: 3 }, { key: 'a2', kind: 'assistant', anchorSeq: 5 },
  ]
  const chat = { order: nodes.map(node => node.key), nodes: new Map(nodes.map(node => [node.key, node])) }
  assert.deepEqual(sliceTurnNodes(chat, 5, 0), nodes.slice(2))
  assert.equal(isLastUserTurn(chat, 5, 0), true)
})
