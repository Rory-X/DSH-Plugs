import { describe, expect, it } from 'vitest'

import { guardReason, pathArgumentOf, SCOPE_UNSAFE_TOOLS } from '../src/guard.ts'

const CWD = '/repo'

describe('pathArgumentOf', () => {
  it('reads file_path, the name the fs tools use', () => {
    expect(pathArgumentOf({ file_path: 'src/a.ts' })).toBe('src/a.ts')
  })

  it('tolerates the alternative spellings', () => {
    expect(pathArgumentOf({ filePath: 'src/a.ts' })).toBe('src/a.ts')
    expect(pathArgumentOf({ path: 'src/a.ts' })).toBe('src/a.ts')
  })

  it('returns null for missing, blank, or non-object arguments', () => {
    expect(pathArgumentOf({})).toBeNull()
    expect(pathArgumentOf({ file_path: '   ' })).toBeNull()
    expect(pathArgumentOf({ file_path: 42 })).toBeNull()
    expect(pathArgumentOf(null)).toBeNull()
    expect(pathArgumentOf('src/a.ts')).toBeNull()
  })
})

describe('guardReason — no declaration means exclusive', () => {
  it('allows every tool when the node declared no scope', () => {
    // Exclusive is a scheduling claim ("run me alone"), not a write
    // restriction. Enforcing it would break every undeclared plan.
    for (const toolName of ['edit', 'write', 'bash', 'subagent', 'run_code']) {
      expect(guardReason({ toolName, args: { file_path: '/anywhere/at/all.ts' }, declared: undefined, cwd: CWD })).toBeNull()
    }
  })
})

describe('guardReason — read-only declaration', () => {
  const declared: string[] = []

  it('refuses file writers', () => {
    expect(guardReason({ toolName: 'edit', args: { file_path: 'src/a.ts' }, declared, cwd: CWD })).toMatch(/writeScope: \[\]/)
    expect(guardReason({ toolName: 'write', args: { file_path: 'src/a.ts' }, declared, cwd: CWD })).toMatch(/writeScope: \[\]/)
  })

  it('refuses shells and escape hatches too', () => {
    // A read-only step that delegates would hand the write to a session this
    // guard is never consulted for.
    for (const toolName of ['bash', 'subagent', 'workflow']) {
      const reason = guardReason({ toolName, args: {}, declared, cwd: CWD })
      expect(reason, `${toolName} should be refused`).not.toBeNull()
    }
  })

  it('still allows run_code, whose inner calls come back through this guard', () => {
    // Under an r-mode/ptc preset run_code is the only outer tool a child has.
    // Refusing the transport would leave a read-only step unable to read
    // anything; its inner write calls are guarded individually instead.
    expect(guardReason({ toolName: 'run_code', args: {}, declared, cwd: CWD })).toBeNull()
  })

  it('allows ordinary read-only tools', () => {
    for (const toolName of ['read', 'grep', 'glob', 'web_search']) {
      expect(guardReason({ toolName, args: {}, declared, cwd: CWD })).toBeNull()
    }
  })
})

describe('guardReason — scoped declaration', () => {
  const declared = ['src/a']

  it('allows a write inside the declared prefix', () => {
    expect(guardReason({ toolName: 'edit', args: { file_path: 'src/a/b.ts' }, declared, cwd: CWD })).toBeNull()
    expect(guardReason({ toolName: 'write', args: { file_path: '/repo/src/a/b.ts' }, declared, cwd: CWD })).toBeNull()
  })

  it('refuses a write outside every declared prefix, naming the target', () => {
    const reason = guardReason({ toolName: 'edit', args: { file_path: 'src/b/b.ts' }, declared, cwd: CWD })
    expect(reason).toContain('src/b/b.ts')
    expect(reason).toContain('src/a')
  })

  it('refuses a write to an absolute path outside the workspace', () => {
    // The leading slash survives workspaceRelative, so it can never satisfy a
    // relative scope — an out-of-workspace target fails closed.
    expect(guardReason({ toolName: 'write', args: { file_path: '/etc/passwd' }, declared, cwd: CWD })).not.toBeNull()
  })

  it('refuses a sibling directory that shares a name prefix', () => {
    expect(guardReason({ toolName: 'edit', args: { file_path: 'src/a2.ts' }, declared, cwd: CWD })).not.toBeNull()
  })

  it('refuses shells, since containment cannot be parsed', () => {
    expect(guardReason({ toolName: 'bash', args: { command: 'rm -rf /' }, declared, cwd: CWD })).toMatch(/shell can write outside it/)
  })

  it('refuses escape hatches that would reach an ungoverned session', () => {
    for (const toolName of ['subagent', 'subagent_fork', 'spawn_teammate', 'workflow']) {
      expect(guardReason({ toolName, args: {}, declared, cwd: CWD }), toolName).not.toBeNull()
    }
  })

  it('allows run_code and skill, which do not escape the guard', () => {
    // run_code's inner calls carry the same agent and are judged here; skill
    // returns instructions. Refusing either would be redundant, and refusing
    // run_code would break every PTC-preset child.
    expect(guardReason({ toolName: 'run_code', args: {}, declared, cwd: CWD })).toBeNull()
    expect(guardReason({ toolName: 'skill', args: {}, declared, cwd: CWD })).toBeNull()
  })

  it('allows read-only and search tools', () => {
    for (const toolName of ['read', 'grep', 'glob', 'read_image', 'web_fetch', 'todo_write']) {
      expect(guardReason({ toolName, args: {}, declared, cwd: CWD }), toolName).toBeNull()
    }
  })

  it('ignores a path argument on a non-writing tool', () => {
    expect(guardReason({ toolName: 'read', args: { file_path: '/etc/passwd' }, declared, cwd: CWD })).toBeNull()
  })

  it('decides nothing when a path cannot be read off the arguments', () => {
    // No target means nothing to compare; the tool's own validation owns it.
    expect(guardReason({ toolName: 'edit', args: {}, declared, cwd: CWD })).toBeNull()
  })
})

describe('SCOPE_UNSAFE_TOOLS', () => {
  it('covers the shells and every session-creating hatch', () => {
    for (const tool of ['bash', 'pwsh', 'subagent', 'subagent_fork', 'spawn_teammate', 'workflow']) {
      expect(SCOPE_UNSAFE_TOOLS).toContain(tool)
    }
  })

  it('leaves run_code out, since its inner calls are guarded individually', () => {
    expect(SCOPE_UNSAFE_TOOLS).not.toContain('run_code')
  })
})
