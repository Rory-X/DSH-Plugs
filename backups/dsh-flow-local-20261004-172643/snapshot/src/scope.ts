/**
 * Write-scope algebra: which workspace paths a step may modify, and which steps
 * may therefore run at the same time.
 *
 * Why this module exists. A DSH subagent cannot be given its own working
 * directory: the in-process provider derives every child's `cwd` from the
 * parent's durable session (`childSessionMeta` spreads `parentHeader.cwd`), and
 * the subagent seam exposes no `cwd` override. Two children editing one
 * checkout therefore cannot be isolated by the filesystem. The safety property
 * has to come from ownership instead:
 *
 *   - a node MAY declare `writeScope` — the workspace-relative paths it may
 *     modify;
 *   - the scheduler refuses to run two nodes whose declared scopes overlap;
 *   - a global tool guard refuses a child's `edit`/`write` outside its scope.
 *
 * Declaration is what buys parallelism, and the three states are deliberate:
 *
 *   - absent       → `exclusive`: unknown blast radius, so the node runs alone.
 *   - `[]`         → `readonly`:  provably touches nothing, parallelizes freely.
 *   - `['src/a']`  → `scoped`:    parallel with every non-overlapping scope.
 *
 * The default is the conservative one. A Leader that wants a parallel fleet has
 * to state how the writers are partitioned — which is exactly the judgement a
 * scheduler cannot make on the model's behalf.
 *
 * Deliberately free of Host services and I/O so the rules stay unit-testable.
 */

/** Anything carrying a declared write scope; structural so tests can pass literals. */
export interface ScopeCarrier {
  readonly writeScope?: readonly string[] | undefined
}

/** How a node's declared scope constrains co-scheduling. */
export type ScopeKind =
  /** No declaration: the node runs alone. */
  | 'exclusive'
  /** Explicitly empty: the node may run beside anything. */
  | 'readonly'
  /** A non-empty list: parallel only with non-overlapping scopes. */
  | 'scoped'

/**
 * Normalize one declared scope entry for comparison.
 *
 * Accepts the spellings a model actually writes (`./src/a`, `src/a/`,
 * `src/a/**`, backslashes) and reduces them to the bare workspace-relative
 * directory prefix. An entry that normalizes to `''` means the workspace root,
 * which {@link covers} treats as "everything" — a sloppy declaration fails
 * closed rather than silently becoming read-only.
 */
export function normalizeScopePath(raw: string): string {
  let value = raw.trim().replace(/\\/g, '/')
  // A glob suffix is a spelling of the directory, not a path of its own.
  value = value.replace(/\/\*\*$/, '').replace(/\/\*$/, '')
  value = value.replace(/^\.\//, '')
  value = value.replace(/\/+$/, '')
  if (value === '.' || value === '/') return ''
  return value
}

/**
 * Normalize a whole declared scope.
 *
 * Blank spellings are kept: a blank entry normalizes to the workspace root,
 * which {@link covers} reads as "everything". That is the fail-closed reading
 * of a sloppy declaration — a model that writes `""` grants more than it meant,
 * and the node is then serialized against every writer rather than quietly
 * becoming read-only.
 */
export function normalizeScope(scope: readonly string[]): string[] {
  return scope.map(normalizeScopePath)
}

/** Classify one node's declaration into its scheduling meaning. */
export function scopeKindOf(carrier: ScopeCarrier): ScopeKind {
  const declared = carrier.writeScope
  if (declared === undefined) return 'exclusive'
  const normalized = normalizeScope(declared)
  // `[]` is the explicit read-only claim; `['', …]` normalizes to the root and
  // stays `scoped`, so it still conflicts with everything (fail closed).
  if (normalized.length === 0) return 'readonly'
  return 'scoped'
}

/** Whether one normalized entry admits a workspace-relative path. */
export function covers(entry: string, path: string): boolean {
  if (entry === '') return true
  if (path === '') return false
  return path === entry || path.startsWith(`${entry}/`)
}

/** Whether two normalized entries can touch the same path, either direction. */
export function entriesOverlap(a: string, b: string): boolean {
  return covers(a, b) || covers(b, a)
}

/**
 * Whether two declared scopes can touch the same workspace path.
 *
 * Prefix containment counts: `src/a` and `src/a/b` overlap, because a write to
 * the first can land inside the second.
 */
export function scopesOverlap(a: readonly string[], b: readonly string[]): boolean {
  for (const left of normalizeScope(a)) {
    for (const right of normalizeScope(b)) {
      if (entriesOverlap(left, right)) return true
    }
  }
  return false
}

/**
 * Whether two nodes may be in flight at the same time.
 *
 * An `exclusive` node (no declaration) pairs with nothing, which is what keeps
 * the current sequential behaviour the default. Two `readonly` nodes always
 * pair. Two `scoped` nodes pair only when their prefixes are disjoint.
 */
export function mayRunTogether(a: ScopeCarrier, b: ScopeCarrier): boolean {
  const left = scopeKindOf(a)
  const right = scopeKindOf(b)
  if (left === 'exclusive' || right === 'exclusive') return false
  if (left === 'readonly' || right === 'readonly') return true
  return !scopesOverlap(a.writeScope ?? [], b.writeScope ?? [])
}

/**
 * Reduce a model- or tool-supplied path to workspace-relative form.
 *
 * Only a path that provably sits under `cwd` is rewritten. An absolute path
 * that never matched `cwd` KEEPS its leading slash, so it can never satisfy a
 * workspace-relative scope entry: the guard fails closed instead of
 * reinterpreting an out-of-workspace target as a relative one.
 */
export function workspaceRelative(candidate: string, cwd: string | undefined): string {
  let value = candidate.trim().replace(/\\/g, '/')
  if (cwd !== undefined && cwd !== '') {
    const root = cwd.trim().replace(/\\/g, '/').replace(/\/+$/, '')
    if (root !== '' && (value === root || value.startsWith(`${root}/`))) {
      // Provably inside cwd, so the separator left by the slice is a boundary
      // rather than a root marker and is safe to drop.
      value = value.slice(root.length).replace(/^\/+/, '')
    }
  }
  value = value.replace(/^\.\//, '')
  return value.replace(/\/+$/, '')
}

/** Whether one workspace-relative path is inside a declared scope. */
export function scopeAdmits(scope: readonly string[], relativePath: string): boolean {
  return normalizeScope(scope).some((entry) => covers(entry, relativePath))
}

/** Human-facing description of a declaration, for tool results and the canvas. */
export function describeScope(carrier: ScopeCarrier): string {
  switch (scopeKindOf(carrier)) {
    case 'readonly':
      return '只读'
    case 'exclusive':
      return '独占（未声明写作用域）'
    default:
      return normalizeScope(carrier.writeScope ?? []).join(', ')
  }
}

/**
 * Why a write to `relativePath` must be refused for a node with this
 * declaration, or `null` when it is allowed.
 *
 * The three states again, this time as enforcement:
 *   - `undefined` (exclusive) → allowed. Exclusive is a *scheduling* claim
 *     ("run me alone"), not a grant restriction; refusing here would break
 *     every plan that never declared a scope.
 *   - `[]` (readonly)         → refused. The node promised not to write.
 *   - `[paths]`               → refused outside the declared prefixes.
 *
 * `relativePath` must already be workspace-relative (see
 * {@link workspaceRelative}); an absolute path outside the workspace simply
 * fails to match and is refused.
 */
export function writeDenialReason(
  declaration: readonly string[] | undefined,
  relativePath: string,
): string | null {
  if (declaration === undefined) return null
  const normalized = normalizeScope(declaration)
  if (normalized.length === 0) {
    return 'this step declared an empty write scope, so it may not modify any file'
  }
  if (normalized.some((entry) => covers(entry, relativePath))) return null
  return `this step may only write inside ${normalized.join(', ')}, but "${relativePath}" is outside every declared prefix`
}
