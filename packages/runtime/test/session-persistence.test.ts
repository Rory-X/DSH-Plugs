import { afterEach, describe, expect, it, vi } from 'vitest'
import { mkdtemp, mkdir, readFile, rm, symlink, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { prepareSessionDeletion, readPersistedSession } from '../src/session-persistence'

const temporaryRoots: string[] = []
afterEach(async () => {
  for (const root of temporaryRoots.splice(0)) await rm(root, { recursive: true, force: true })
})

async function fixture() {
  const root = await mkdtemp(join(tmpdir(), 'dsh-session-delete-test-'))
  temporaryRoots.push(root)
  const directory = join(root, 'project', 'session-one')
  const path = join(directory, 'v3.jsonl')
  await mkdir(directory, { recursive: true })
  await writeFile(path, 'session one')
  const header = { id: 'session-one' } as Parameters<typeof prepareSessionDeletion>[1]
  const provider = {
    name: 'session-persistence-jsonl',
    config: { root },
    resolveCurrentLog: vi.fn(async () => path as string | undefined),
    locate: () => ({ kind: 'jsonl', path }),
  }
  const prepare = () => prepareSessionDeletion(provider as unknown as Parameters<typeof prepareSessionDeletion>[0], header)
  return { root, directory, path, provider, prepare }
}

describe('session persistence RC adapter', () => {
  it('retains the durable fork boundary when reading stored history', async () => {
    const close = vi.fn(async () => {})
    const header = { id: 'child', parentSession: 'parent' }
    const events = [{ seq: 5 }]
    const open = vi.fn(async () => ({ header, inheritedEventCount: 4, read: async () => ({ events }), close }))
    const result = await readPersistedSession({ open } as unknown as Parameters<typeof readPersistedSession>[0], 'child' as never)
    expect(result).toEqual({ header, inheritedEventCount: 4, events })
    expect(open).toHaveBeenCalledWith('child', 'read')
    expect(close).toHaveBeenCalledOnce()
  })

  it('closes the read handle even if decoding fails', async () => {
    const close = vi.fn(async () => {})
    const handle = { read: vi.fn(async () => { throw new Error('corrupt log') }), close }
    const open = vi.fn(async () => handle)
    await expect(readPersistedSession({ open } as unknown as Parameters<typeof readPersistedSession>[0], 'one' as never)).rejects.toThrow('corrupt log')
    expect(open).toHaveBeenCalledWith('one', 'read')
    expect(close).toHaveBeenCalledOnce()
  })

  it('prepares without deleting, then deletes only that session and its generations', async () => {
    const { root, directory, path, prepare } = await fixture()
    const sibling = join(root, 'project', 'session-two')
    await mkdir(sibling)
    await writeFile(join(sibling, 'v3.jsonl'), 'keep')
    await writeFile(join(directory, 'v2.jsonl'), 'historical')
    const remove = await prepare()
    expect(await readFile(path, 'utf8')).toBe('session one')
    await remove()
    await expect(readFile(path)).rejects.toMatchObject({ code: 'ENOENT' })
    expect(await readFile(join(sibling, 'v3.jsonl'), 'utf8')).toBe('keep')
  })

  it('supports historical-only sessions', async () => {
    const { path, provider, prepare } = await fixture()
    provider.resolveCurrentLog.mockResolvedValue(undefined)
    await (await prepare())()
    await expect(readFile(path)).rejects.toMatchObject({ code: 'ENOENT' })
  })

  it('refuses a foreign path or another session directory', async () => {
    const { root, path, provider, prepare } = await fixture()
    provider.resolveCurrentLog.mockResolvedValue(undefined)
    for (const location of [join(root, '..', 'session-one', 'v3.jsonl'), join(root, 'project', 'other', 'v3.jsonl')]) {
      provider.locate = () => ({ kind: 'jsonl', path: location })
      await expect(prepare()).rejects.toThrow('outside the session directory')
    }
    expect(await readFile(path, 'utf8')).toBe('session one')
  })

  it('rechecks the path and refuses a junction substituted after preparation', async () => {
    const { root, directory, prepare } = await fixture()
    const remove = await prepare()
    const other = join(root, 'keep')
    await mkdir(other)
    await writeFile(join(other, 'v3.jsonl'), 'keep')
    await rm(directory, { recursive: true })
    await symlink(other, directory, process.platform === 'win32' ? 'junction' : 'dir')
    await expect(remove()).rejects.toThrow('not a regular directory')
    expect(await readFile(join(other, 'v3.jsonl'), 'utf8')).toBe('keep')
  })

  it('preserves a newer-format refusal before any deletion', async () => {
    const { path, provider, prepare } = await fixture()
    provider.resolveCurrentLog.mockRejectedValue(new Error('future session format'))
    await expect(prepare()).rejects.toThrow('future session format')
    expect(await readFile(path, 'utf8')).toBe('session one')
  })
})
