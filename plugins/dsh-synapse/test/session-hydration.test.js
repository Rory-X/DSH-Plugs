import assert from 'node:assert/strict'
import { mkdtemp } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import test from 'node:test'
import { createSessionHydrator, WorkspaceStore } from '../index.js'

test('reads unopened ancestors once through read handles and keeps live session history authoritative', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'dsh-synapse-hydrate-'))
  const store = new WorkspaceStore(join(directory, 'state.json'))
  const prompt = (seq, text) => ({ type: 'user/message', seq, time: seq, data: { content: [{ type: 'text', text }] } })
  const child = { id: 'child', header: { cwd: 'C:/child', parentSession: 'parent' }, inheritedEventCount: 4, events: [prompt(5, 'Live child question')] }
  const persisted = {
    parent: { header: { cwd: 'C:/parent', parentSession: 'root' }, inheritedEventCount: 2, events: [prompt(1, 'Inherited root'), prompt(3, 'Parent question')] },
    root: { header: { cwd: 'C:/root' }, inheritedEventCount: 0, events: [prompt(1, 'Root question')] },
  }
  const reads = []
  const closed = []
  const errors = []
  const ctx = {
    sessions: { list: () => [child] },
    sessionPersistence: { open: async (id, access) => {
      reads.push([id, access])
      const session = persisted[id]
      return { ...session, read: async () => ({ events: session.events }), close: async () => { closed.push(id) } }
    } },
  }
  const hydrate = createSessionHydrator(ctx, store, 'DSH', error => errors.push(error))
  await Promise.all([hydrate([{ id: 'child' }]), hydrate([{ id: 'child' }])])
  await hydrate([{ id: 'child' }])
  assert.deepEqual(reads, [['parent', 'read'], ['root', 'read']])
  assert.deepEqual(closed, ['parent', 'root'])
  assert.deepEqual(errors, [])
  const workspaces = await Promise.all((await store.list()).map(workspace => store.get(workspace.id)))
  const threads = workspaces.flatMap(workspace => workspace.threads)
  assert.deepEqual(threads.map(thread => thread.messages.map(message => message.text)), [['Root question'], ['Parent question'], ['Live child question']])
  assert.equal(threads[2].parentId, threads[1].id)
  assert.equal(threads[1].parentId, threads[0].id)
  await store.flush()
})

test('a failed history read can retry and never becomes a message card', async () => {
  const errors = []
  const projected = []
  let failed = true
  let closed = 0
  const hydrate = createSessionHydrator({
    sessions: { list: () => [] },
    sessionPersistence: { open: async () => ({
      header: {}, inheritedEventCount: 0,
      read: async () => { if (failed) throw new Error('Unavailable'); return { events: [] } },
      close: async () => { closed++ },
    }) },
  }, { projectSession: async session => projected.push(session) }, 'DSH', error => errors.push(error))
  await hydrate([{ id: 'session' }])
  assert.equal(projected.length, 0)
  failed = false
  await hydrate([{ id: 'session' }])
  assert.equal(projected.length, 1)
  assert.equal(errors.length, 1)
  assert.equal(closed, 2)
})

test('hydrates the known parent of a blank fork without creating a child message', async () => {
  const projected = []
  const hydrate = createSessionHydrator({ sessions: { list: () => [{ id: 'parent', header: {}, events: [] }] } },
    { projectSession: async session => projected.push(session.id) }, 'DSH', error => { throw error })
  await hydrate([{ id: 'empty-fork', blank: true, parentId: 'parent' }])
  assert.deepEqual(projected, ['parent'])
})
