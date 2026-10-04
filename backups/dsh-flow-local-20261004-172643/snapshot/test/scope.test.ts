import { describe, expect, it } from 'vitest'

import {
  describeScope,
  mayRunTogether,
  normalizeScope,
  normalizeScopePath,
  scopeAdmits,
  scopeKindOf,
  scopesOverlap,
  workspaceRelative,
  writeDenialReason,
} from '../src/scope.ts'

describe('normalizeScopePath', () => {
  it('accepts the spellings a model actually writes', () => {
    expect(normalizeScopePath('src/a')).toBe('src/a')
    expect(normalizeScopePath('./src/a')).toBe('src/a')
    expect(normalizeScopePath('src/a/')).toBe('src/a')
    expect(normalizeScopePath('src/a/**')).toBe('src/a')
    expect(normalizeScopePath('src/a/*')).toBe('src/a')
    expect(normalizeScopePath('  src/a  ')).toBe('src/a')
    expect(normalizeScopePath('src\\a')).toBe('src/a')
  })

  it('reads the workspace root spellings as the empty string', () => {
    expect(normalizeScopePath('.')).toBe('')
    expect(normalizeScopePath('./')).toBe('')
    expect(normalizeScopePath('/')).toBe('')
    expect(normalizeScopePath('')).toBe('')
  })
})

describe('scopeKindOf', () => {
  it('treats an absent declaration as exclusive', () => {
    expect(scopeKindOf({})).toBe('exclusive')
    expect(scopeKindOf({ writeScope: undefined })).toBe('exclusive')
  })

  it('treats an explicitly empty declaration as readonly', () => {
    expect(scopeKindOf({ writeScope: [] })).toBe('readonly')
  })

  it('treats a non-empty declaration as scoped', () => {
    expect(scopeKindOf({ writeScope: ['src/a'] })).toBe('scoped')
  })

  it('keeps a blank entry as scoped, so a sloppy declaration fails closed', () => {
    // `['']` normalizes to the workspace root, which covers everything: the
    // node stays `scoped` and conflicts with every other scope rather than
    // being silently upgraded to the read-only exemption.
    expect(scopeKindOf({ writeScope: [''] })).toBe('scoped')
    expect(scopeKindOf({ writeScope: ['./'] })).toBe('scoped')
  })

  it('drops a whitespace-only entry from "readonly" only when the rest is empty', () => {
    expect(scopeKindOf({ writeScope: ['   '] })).toBe('scoped')
  })
})

describe('scope overlap', () => {
  it('treats prefix containment as overlap, in both directions', () => {
    expect(scopesOverlap(['src/a'], ['src/a/b'])).toBe(true)
    expect(scopesOverlap(['src/a/b'], ['src/a'])).toBe(true)
  })

  it('separates sibling directories', () => {
    expect(scopesOverlap(['src/a'], ['src/b'])).toBe(false)
  })

  it('separates a file from its sibling directory', () => {
    expect(scopesOverlap(['src/a.ts'], ['src/ab.ts'])).toBe(false)
  })

  it('treats the workspace root as covering everything', () => {
    expect(scopesOverlap([''], ['anything/at/all'])).toBe(true)
  })

  it('ignores path spelling differences', () => {
    expect(scopesOverlap(['./src/a/'], ['src/a/**'])).toBe(true)
  })
})

describe('mayRunTogether', () => {
  it('never pairs an exclusive node with anything', () => {
    expect(mayRunTogether({}, {})).toBe(false)
    expect(mayRunTogether({}, { writeScope: [] })).toBe(false)
    expect(mayRunTogether({ writeScope: [] }, {})).toBe(false)
    expect(mayRunTogether({}, { writeScope: ['src/a'] })).toBe(false)
    expect(mayRunTogether({ writeScope: ['src/a'] }, {})).toBe(false)
  })

  it('pairs two read-only nodes freely', () => {
    expect(mayRunTogether({ writeScope: [] }, { writeScope: [] })).toBe(true)
  })

  it('pairs read-only with any scoped node', () => {
    expect(mayRunTogether({ writeScope: [] }, { writeScope: ['src/a'] })).toBe(true)
    expect(mayRunTogether({ writeScope: ['src/a'] }, { writeScope: [] })).toBe(true)
  })

  it('pairs scoped nodes only when their prefixes are disjoint', () => {
    expect(mayRunTogether({ writeScope: ['src/a'] }, { writeScope: ['src/b'] })).toBe(true)
    expect(mayRunTogether({ writeScope: ['src/a'] }, { writeScope: ['src/a/b'] })).toBe(false)
  })
})

describe('workspaceRelative', () => {
  it('strips an absolute cwd prefix', () => {
    expect(workspaceRelative('/repo/src/a.ts', '/repo')).toBe('src/a.ts')
    expect(workspaceRelative('/repo', '/repo')).toBe('')
  })

  it('leaves an already-relative path alone, minus a leading ./', () => {
    expect(workspaceRelative('src/a.ts', '/repo')).toBe('src/a.ts')
    expect(workspaceRelative('./src/a.ts', '/repo')).toBe('src/a.ts')
  })

  it('keeps an out-of-workspace absolute path distinguishable from a relative one', () => {
    // The leading slash survives, so it can never satisfy a relative scope and
    // the guard denies it rather than silently rewriting the target.
    expect(workspaceRelative('/etc/passwd', '/repo')).toBe('/etc/passwd')
    expect(scopeAdmits(['src/a'], '/etc/passwd')).toBe(false)
    expect(writeDenialReason(['src/a'], '/etc/passwd')).not.toBeNull()
  })

  it('tolerates a trailing slash on cwd and backslash separators', () => {
    expect(workspaceRelative('/repo/src/a.ts', '/repo/')).toBe('src/a.ts')
    expect(workspaceRelative('/repo\\src\\a.ts', '/repo')).toBe('src/a.ts')
  })

  it('does not treat a sibling directory sharing a prefix as inside cwd', () => {
    expect(workspaceRelative('/repo-other/a.ts', '/repo')).toBe('/repo-other/a.ts')
  })
})

describe('scopeAdmits', () => {
  it('admits a path inside a declared prefix', () => {
    expect(scopeAdmits(['src/a'], 'src/a/b.ts')).toBe(true)
    expect(scopeAdmits(['src/a'], 'src/a')).toBe(true)
  })

  it('refuses a path outside every prefix', () => {
    expect(scopeAdmits(['src/a'], 'src/b/b.ts')).toBe(false)
    expect(scopeAdmits(['src/a'], 'src/a2.ts')).toBe(false)
  })

  it('admits everything under a root declaration', () => {
    expect(scopeAdmits([''], 'anywhere/at/all.ts')).toBe(true)
  })
})

describe('writeDenialReason', () => {
  it('allows any write when the node never declared a scope', () => {
    // Exclusive is a scheduling claim ("run me alone"), not a write
    // restriction; enforcing it here would break every undeclared plan.
    expect(writeDenialReason(undefined, 'anywhere.ts')).toBeNull()
  })

  it('refuses every write when the node declared an empty scope', () => {
    expect(writeDenialReason([], 'anything.ts')).toMatch(/empty write scope/)
  })

  it('allows a write inside a declared prefix', () => {
    expect(writeDenialReason(['src/a'], 'src/a/b.ts')).toBeNull()
  })

  it('refuses a write outside every declared prefix, naming the target', () => {
    const reason = writeDenialReason(['src/a'], 'src/b/b.ts')
    expect(reason).not.toBeNull()
    expect(reason).toContain('src/b/b.ts')
    expect(reason).toContain('src/a')
  })

  it('normalizes the declaration before deciding', () => {
    expect(writeDenialReason(['./src/a/**'], 'src/a/b.ts')).toBeNull()
  })
})

describe('normalizeScope', () => {
  it('normalizes each entry and preserves blank ones for fail-closed matching', () => {
    expect(normalizeScope(['./src/a/', 'src/b'])).toEqual(['src/a', 'src/b'])
    expect(normalizeScope(['.'])).toEqual([''])
  })
})

describe('describeScope', () => {
  it('labels each of the three states', () => {
    expect(describeScope({})).toContain('独占')
    expect(describeScope({ writeScope: [] })).toBe('只读')
    expect(describeScope({ writeScope: ['src/a', 'src/b'] })).toBe('src/a, src/b')
  })
})
