/**
 * The write guard: which tool calls a flow child may make, given the write
 * scope its node declared.
 *
 * This is the enforcement half of `./scope.ts` (the scheduling half). Both are
 * needed: the scheduler stops two overlapping writers from sharing a wave, and
 * the guard stops a running writer from reaching outside the scope it was
 * scheduled under. Without the guard, a node's `writeScope` would be a promise
 * the model could quietly break mid-run.
 *
 * Kept pure so the rules are unit-testable: the caller supplies the tool name,
 * its parsed arguments, and the child's cwd.
 *
 * ## What is and is not enforced
 *
 * `edit` and `write` take a path, so containment is decidable and is enforced.
 *
 * Shells are NOT path-checkable, so a declared scope refuses them outright
 * rather than attempting a parser (see {@link SHELL_TOOLS}). A step that needs
 * a shell keeps no scope and runs exclusively.
 *
 * Enforcement lives here rather than in a per-child `tools.restrict()` filter:
 * `restrict()` validates names against the registry and THROWS on unknown ones,
 * while `pwsh` is absent on macOS and `subagent` is absent whenever Agent Teams
 * replaces it — a static deny list would crash child creation on normal setups.
 */

import { scopeKindOf, workspaceRelative, writeDenialReason } from './scope.ts'

/** Structured writers whose target path can be read from the arguments. */
const PATH_TOOLS: readonly string[] = ['edit', 'write']

/**
 * Shells: no parseable containment, so a scoped child may not use them.
 *
 * A shell command can write anywhere — through a redirection, a script, a build
 * tool — and any parser would have holes that fail *open*, which is worse than
 * no claim at all (Claude Code's own worktree isolation refuses commands it
 * cannot parse for exactly this reason). So the honest route is taken instead
 * of guessing: declaring a non-empty scope removes the shells from that child
 * through the guard below. A step that needs a shell keeps no scope and runs
 * exclusively. Parallel safety and unrestricted shell are therefore mutually
 * exclusive by construction, not by convention.
 */
const SHELL_TOOLS: readonly string[] = ['bash', 'pwsh']

/**
 * Escape hatches that could reach a writer this guard never inspects.
 *
 * Exactly one rule decides membership: does the tool create a NEW session? A
 * delegation (`subagent`, `subagent_fork`, `spawn_teammate`) or a
 * `workflow` script starts child agents on their own sessions, and this guard
 * resolves a caller by session — so a write issued inside one of those children
 * is never checked. Blocking the hatch is the only sound option.
 *
 * Deliberately NOT in this list, though it looks like one:
 *   - `run_code` (PTC): its inner calls are dispatched back through the tool
 *     scheduler carrying the SAME `exec.agent`, so `tools.edit(...)` inside a
 *     program IS guarded by the checks above. Blocking the transport would be
 *     redundant, and actively harmful — under an r-mode/ptc preset `run_code`
 *     is the only outer tool a child has, so a scoped node could not work at
 *     all. `tools.bash(...)` inside it is still refused by {@link SHELL_TOOLS}.
 *   - `skill`: it returns instructions, not a session or a write.
 *
 * Not covered at all, and stated in the README rather than papered over: MCP
 * tools and any other out-of-process writer. A scoped node's guarantee is
 * therefore "inside the DSH file tools and their PTC bindings", not "inside the
 * filesystem".
 */
const ESCAPE_HATCH_TOOLS: readonly string[] = [
  'subagent',
  'subagent_fork',
  'spawn_teammate',
  'workflow',
]

/** Every tool a scoped or read-only child may not call. */
export const SCOPE_UNSAFE_TOOLS: readonly string[] = [...SHELL_TOOLS, ...ESCAPE_HATCH_TOOLS]

/** What the caller observed about one tool execution. */
export interface GuardInput {
  readonly toolName: string
  /** Parsed tool arguments; only `file_path` is read. */
  readonly args: unknown
  /** The node's declaration. `undefined` means exclusive (no restriction). */
  readonly declared: readonly string[] | undefined
  /** The child session's working directory, for making a path relative. */
  readonly cwd: string | undefined
}

/** Read `file_path` off tool arguments, tolerating the spellings tools accept. */
export function pathArgumentOf(args: unknown): string | null {
  if (args === null || typeof args !== 'object') return null
  const value = args as Record<string, unknown>
  for (const key of ['file_path', 'filePath', 'path']) {
    const candidate = value[key]
    if (typeof candidate === 'string' && candidate.trim() !== '') return candidate
  }
  return null
}

/**
 * Why this tool call must be refused, or `null` to allow it.
 *
 * Ordering note: the "no declaration" case returns early. An exclusive node is
 * a *scheduling* claim ("run me alone"), not a grant restriction — refusing its
 * writes would break every plan that never declared a scope, which is the
 * default.
 *
 * Enforcement deliberately lives in the guard rather than in a per-child
 * `tools.restrict()` filter: `restrict()` validates its names against the
 * registry and THROWS on an unknown one, while a name like `pwsh` is absent on
 * macOS and `subagent` is absent whenever Agent Teams replaces it. A static
 * deny list would therefore crash child creation on perfectly normal setups.
 * The guard takes an arbitrary name and simply is not consulted for tools that
 * do not exist, so the same rule holds on every platform.
 */
export function guardReason(input: GuardInput): string | null {
  const { toolName, declared, args, cwd } = input
  if (declared === undefined) return null

  const readOnly = scopeKindOf({ writeScope: declared }) === 'readonly'

  if (PATH_TOOLS.includes(toolName)) {
    if (readOnly) {
      return `This step declared writeScope: [], so it may not modify files. "${toolName}" is refused; report what needs changing instead.`
    }
    const target = pathArgumentOf(args)
    if (target === null) return null
    const relative = workspaceRelative(target, cwd)
    const denial = writeDenialReason(declared, relative)
    if (denial === null) return null
    return `${denial}. Stay inside the declared writeScope, or report the needed change so the Leader can schedule it.`
  }

  if (SHELL_TOOLS.includes(toolName)) {
    return `"${toolName}" is unavailable to a step that declares a writeScope, because a shell can write outside it. `
      + 'Do the edit with the file tools, or ask the Leader to re-plan this step with no writeScope (it will then run alone).'
  }

  // Blocked for ANY declaration, read-only included. The guard resolves a
  // caller by session, and a grandchild is a different session it is never
  // consulted for — so allowing delegation here would let a read-only step
  // write through a child this guard cannot see. Blocking the hatch is the
  // only sound option; a step that needs to delegate keeps no scope and runs
  // exclusively.
  if (ESCAPE_HATCH_TOOLS.includes(toolName)) {
    return `"${toolName}" is unavailable to a step that declares a writeScope: the agent or script it starts is a different session that this scope cannot govern. `
      + 'Do the work directly, or ask the Leader to re-plan this step with no writeScope (it will then run alone).'
  }

  return null
}
