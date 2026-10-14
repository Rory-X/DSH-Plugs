import { lstat, realpath, rm } from 'node:fs/promises'
import { basename, dirname, isAbsolute, relative, resolve, sep } from 'node:path'
import type { SessionHeader, SessionId } from '@deepseek-ai/dsh-session'
import type { SessionPersistence } from '@deepseek-ai/dsh-session-persistence'

/** Read through a short-lived read handle; never acquire a writer for inspection. */
export async function readPersistedSession(persistence: Pick<SessionPersistence, 'open'>, id: SessionId) {
  const handle = await persistence.open(id, 'read')
  try {
    const { events } = await handle.read()
    return { header: handle.header, inheritedEventCount: handle.inheritedEventCount, events }
  } finally {
    await handle.close()
  }
}

interface JsonlLocationProvider {
  name?: string
  config?: { root?: string }
  resolveCurrentLog?: (id: SessionId) => Promise<string | undefined>
  locate?: (header: SessionHeader) => { kind: string; path: string }
}

// JSONL uses UTF-16 hex escapes for unsafe path characters (including '~').
function sessionSegment(id: string): string {
  if (id === '') throw new Error('session id is empty')
  if (id === '.' || id === '..') return '~002E'.repeat(id.length)
  let segment = ''
  for (let i = 0; i < id.length; i++) {
    const char = id.charAt(i)
    segment += /^[A-Za-z0-9._-]$/.test(char)
      ? char
      : `~${id.charCodeAt(i).toString(16).toUpperCase().padStart(4, '0')}`
  }
  return segment
}

async function validateDirectory(root: string, directory: string, id: string): Promise<boolean> {
  const part = relative(root, directory)
  const segments = part.split(sep)
  if (isAbsolute(part) || segments.length !== 2 || segments.some(s => s === '' || s === '..')
    || basename(directory) !== sessionSegment(id)) {
    throw new Error('refusing to delete a path outside the session directory')
  }
  try {
    const info = await lstat(directory)
    if (!info.isDirectory() || info.isSymbolicLink()) throw new Error('session directory is not a regular directory')
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return false
    throw error
  }
  const actualRoot = await realpath(root)
  const actualDirectory = await realpath(directory)
  if (relative(resolve(actualRoot, ...segments), actualDirectory) !== '') {
    throw new Error('refusing to follow a redirected session directory')
  }
  return true
}

/**
 * The abstract persistence API has no delete verb. Isolate the pinned JSONL
 * provider's location adapter here, and refuse unfamiliar backends or layouts.
 * Preparation validates before the caller detaches the session; removal checks
 * the path again after writer handles have been closed.
 */
export async function prepareSessionDeletion(
  persistence: SessionPersistence,
  header: SessionHeader,
): Promise<() => Promise<void>> {
  const provider = persistence as unknown as JsonlLocationProvider
  if (provider.name !== 'session-persistence-jsonl' || typeof provider.config?.root !== 'string'
    || typeof provider.resolveCurrentLog !== 'function' || typeof provider.locate !== 'function') {
    throw new Error('this session persistence backend does not support deletion')
  }
  const root = resolve(provider.config.root)
  // This also preserves the provider's refusal to touch a newer format.
  const current = await provider.resolveCurrentLog(header.id)
  // Historical-only sessions have no current log, but share the same directory.
  const location = provider.locate(header)
  if (location.kind !== 'jsonl') throw new Error('unsupported session storage location')
  const directory = dirname(resolve(location.path))
  if (current !== undefined && relative(directory, dirname(resolve(current))) !== '') {
    throw new Error('session storage locations disagree')
  }
  await validateDirectory(root, directory, String(header.id))
  return async () => {
    if (await validateDirectory(root, directory, String(header.id))) {
      await rm(directory, { recursive: true, force: true })
    }
  }
}
