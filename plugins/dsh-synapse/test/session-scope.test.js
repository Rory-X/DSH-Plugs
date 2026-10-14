import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

async function loadScope(state = {}, api = () => {}) {
  const source = await readFile(new URL('../app.js', import.meta.url), 'utf8')
  const scope = source.slice(source.indexOf('function resolveThreadParents'), source.indexOf('function workspaceChoices'))
  const load = source.slice(source.indexOf('async function threadsForDshWorkspace'), source.indexOf('async function openDshWorkspace'))
  return new Function('state', 'api', `${scope}\n${load}\nreturn { threadFamily, visibleThreads, threadsForDshWorkspace }`)(state, api)
}

const threads = [
  { id: 'root', parentId: null, dshSessionId: 's-root' },
  { id: 'parent', parentId: 'root', dshSessionId: 's-parent' },
  { id: 'current', parentId: 'parent', dshSessionId: 's-current' },
  { id: 'child', parentId: 'current', dshSessionId: 's-child' },
  { id: 'grandchild', parentId: 'child', dshSessionId: 's-grandchild' },
  { id: 'sibling', parentId: 'parent', dshSessionId: 's-sibling' },
  { id: 'uncle', parentId: 'root', dshSessionId: 's-uncle' },
  { id: 'unrelated', parentId: null, dshSessionId: 's-unrelated' },
]

test('limits the map to the current session, its descendants and ancestor path', async () => {
  const { threadFamily } = await loadScope()
  assert.deepEqual(threadFamily(threads, threads[2]).map(thread => thread.id), ['root', 'parent', 'current', 'child', 'grandchild'])
  assert.deepEqual(threadFamily(threads, threads[0]).map(thread => thread.id), threads.slice(0, -1).map(thread => thread.id))
  assert.deepEqual(threadFamily(threads, undefined), [])
})

test('never leaks unrelated cards while the current session is missing or loading', async () => {
  const state = { workspace: { threads }, currentDsh: null }
  const { visibleThreads } = await loadScope(state)
  assert.deepEqual(visibleThreads(), [])
  state.currentDsh = { id: 'not-projected' }
  assert.deepEqual(visibleThreads(), [])
  state.currentDsh = { id: 's-current' }
  assert.deepEqual(visibleThreads().map(thread => thread.id), ['root', 'parent', 'current', 'child', 'grandchild'])
  state.currentDsh = { id: 's-unrelated' }
  assert.deepEqual(visibleThreads().map(thread => thread.id), ['unrelated'])
})

test('loads ancestors across workspaces and a newly forked descendant before list sync', async () => {
  const projections = {
    a: { workspace: { threads: [{ id: 'root', dshSessionId: 's-root', sourceParentSessionId: null }] } },
    b: { workspace: { threads: [{ id: 'current', dshSessionId: 's-current', parentId: 'stale', sourceParentSessionId: 's-root' }] } },
    c: { workspace: { threads: [{ id: 'child', dshSessionId: 's-child', parentId: null, sourceParentSessionId: 's-current' }] } },
    d: { workspace: { threads: [{ id: 'other', dshSessionId: 's-other', sourceParentSessionId: null }] } },
  }
  const state = { summaries: Object.keys(projections).map(id => ({ id })), currentDsh: { id: 's-current' } }
  const { threadsForDshWorkspace, visibleThreads } = await loadScope(state, async path => projections[path.split('/').at(-1)])
  const loaded = await threadsForDshWorkspace({ sessionIds: ['s-current'] })
  assert.deepEqual(loaded.map(thread => [thread.id, thread.parentId]), [['root', null], ['current', 'root'], ['child', 'current']])
  state.workspace = { threads: loaded }
  assert.deepEqual(visibleThreads().map(thread => thread.id), ['root', 'current', 'child'])
})

test('lineage traversal terminates when persisted relationships contain a cycle', async () => {
  const { threadFamily } = await loadScope()
  const cycle = [{ id: 'a', parentId: 'b' }, { id: 'b', parentId: 'a' }]
  assert.deepEqual(threadFamily(cycle, cycle[0]), cycle)
})

test('an empty new fork can show its ancestors before its own projection arrives', async () => {
  const state = { workspace: { threads }, currentDsh: { id: 'new-fork', parentId: 's-parent' } }
  const { visibleThreads } = await loadScope(state)
  assert.deepEqual(visibleThreads().map(thread => thread.id), ['root', 'parent'])
})

test('loads the cross-workspace parent of a new fork missing from projection caches', async () => {
  const state = { summaries: [{ id: 'root-workspace' }], currentDsh: { id: 'new-fork', parentId: 's-root' } }
  const { threadsForDshWorkspace } = await loadScope(state, async () => ({ workspace: { threads: [threads[0], threads.at(-1)] } }))
  const loaded = await threadsForDshWorkspace({ sessionIds: ['new-fork'] })
  assert.deepEqual(loaded.map(thread => thread.id), ['root'])
})
