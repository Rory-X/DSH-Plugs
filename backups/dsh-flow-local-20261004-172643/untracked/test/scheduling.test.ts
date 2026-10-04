import { describe, expect, it } from 'vitest'

import { mayRunTogether, scopeKindOf } from '../src/scope.ts'
import { CONCURRENCY_DEFAULT } from '../src/shared.ts'

/**
 * The scheduler's parallel-safety rule, tested as the pure predicate the pump
 * consults.
 *
 * `FlowOrchestrator.pump` keeps a list of in-flight nodes and skips any ready
 * node that `mayRunTogether` rejects against one of them, so the predicate IS
 * the safety property: if it can be wrong in the permissive direction, two
 * children can be dispatched into the same files at the same time.
 *
 * The scheduler itself is not instantiated here — it needs a live Agent and a
 * subagent seam — so these cases pin the decision table that drives it.
 */

const exclusive = {}
const readOnly = { writeScope: [] }
const scoped = (...paths: string[]) => ({ writeScope: paths })

describe('the default plan declares no scope', () => {
  it('is exclusive, so an undeclared plan cannot run two writers at once', () => {
    expect(scopeKindOf(exclusive)).toBe('exclusive')
    expect(mayRunTogether(exclusive, exclusive)).toBe(false)
  })

  it('does not depend on the concurrency cap to stay safe', () => {
    // The cap is a ceiling, not a promise: even though the default is now > 1,
    // undeclared nodes are serialized by the scope gate rather than by the cap.
    // This is what makes raising CONCURRENCY_DEFAULT a safe change.
    expect(CONCURRENCY_DEFAULT).toBeGreaterThan(1)
    expect(mayRunTogether(exclusive, exclusive)).toBe(false)
  })
})

describe('a wave of independent writers', () => {
  it('admits N disjoint scopes running together', () => {
    // The target scenario: a fleet of subagents editing separate directories.
    const wave = [scoped('src/a'), scoped('src/b'), scoped('src/c'), scoped('src/d')]
    for (let i = 0; i < wave.length; i += 1) {
      for (let j = i + 1; j < wave.length; j += 1) {
        expect(mayRunTogether(wave[i]!, wave[j]!), `${i} vs ${j}`).toBe(true)
      }
    }
  })

  it('refuses the one pair that shares a directory', () => {
    expect(mayRunTogether(scoped('src/a'), scoped('src/a'))).toBe(false)
  })

  it('refuses a nested pair, because a parent write can land inside the child', () => {
    expect(mayRunTogether(scoped('src/a'), scoped('src/a/deep'))).toBe(false)
  })

  it('lets a read-only step ride along with any writer', () => {
    expect(mayRunTogether(readOnly, scoped('src/a'))).toBe(true)
    expect(mayRunTogether(scoped('src/a'), readOnly)).toBe(true)
  })

  it('serializes a single undeclared step against the whole wave', () => {
    // One exclusive node (a commit, an install) must not overlap ANY writer,
    // even one whose scope could never conflict with it in practice.
    expect(mayRunTogether(exclusive, scoped('src/a'))).toBe(false)
    expect(mayRunTogether(scoped('src/a'), exclusive)).toBe(false)
    expect(mayRunTogether(exclusive, readOnly)).toBe(false)
  })
})

describe('declaration spellings a model actually produces', () => {
  it('treats glob and dot spellings as the directories they name', () => {
    expect(mayRunTogether(scoped('./src/a/'), scoped('src/a/**'))).toBe(false)
    expect(mayRunTogether(scoped('src/a/'), scoped('src/b/'))).toBe(true)
  })

  it('fails closed on a declaration that names the workspace root', () => {
    // `''` covers everything, so it conflicts with every other scope. A sloppy
    // declaration is serialized rather than silently treated as read-only.
    expect(mayRunTogether(scoped(''), scoped('src/a'))).toBe(false)
    expect(scopeKindOf(scoped(''))).toBe('scoped')
  })
})
