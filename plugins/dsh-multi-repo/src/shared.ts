/** HTTP path: adopt one folder as a workspace unit. */
export const SCAN_PATH = '/dsh-multi-repo/scan'

/** HTTP path: bind / list / delete multi-repo projects. */
export const PROJECT_PATH = '/dsh-multi-repo/project'

export type UnitKind = 'git' | 'folder'

export type UnitRole = 'primary' | 'secondary'

export interface RepoFolder {
  name: string
  path: string
  /** Kept for stored bindings; new units are always folders. */
  kind?: UnitKind
  /** True when this unit sits outside the official workspace (the primary). */
  external?: boolean
}

export interface AdoptResult {
  name: string
  path: string
}

export interface MultiRepoProject {
  /** Official DSH workspace path; always the primary unit (session cwd). */
  root: string
  title: string
  primaryPath: string
  repos: RepoFolder[]
  updatedAt: number
}

export interface MemoryHttpOk<T> {
  ok: true
  value: T
}

export interface MemoryHttpErr {
  ok: false
  message: string
}

export type HttpResult<T> = MemoryHttpOk<T> | MemoryHttpErr

export type ProjectAction =
  | { action: 'bind'; root: string; repos: RepoFolder[]; title?: string; primaryPath?: string }
  | { action: 'delete'; root: string }

export function isUnder(child: string, parent: string): boolean {
  const a = normalizeCompare(child)
  const b = normalizeCompare(parent)
  if (a === b) return true
  const sep = b.endsWith('/') ? '' : '/'
  return a.startsWith(`${b}${sep}`)
}

export function samePath(a: string, b: string): boolean {
  return normalizeCompare(a) === normalizeCompare(b)
}

export function normalizeCompare(path: string): string {
  return path.replace(/\\/g, '/').replace(/\/+$/, '').toLowerCase()
}

export function normalizePrimaryPath(repos: RepoFolder[], primaryPath?: string): string {
  if (primaryPath !== undefined && repos.some((repo) => samePath(repo.path, primaryPath))) {
    const match = repos.find((repo) => samePath(repo.path, primaryPath))
    return match?.path ?? repos[0]?.path ?? primaryPath
  }
  return repos[0]?.path ?? primaryPath ?? ''
}

export function roleOf(path: string, primaryPath: string): UnitRole {
  return samePath(path, primaryPath) ? 'primary' : 'secondary'
}

export function folderName(path: string): string {
  return path.split(/[\\/]/).filter(Boolean).at(-1) || path
}

/** Repos with the primary first, then the rest in stored order. */
export function orderedRepos(project: MultiRepoProject): RepoFolder[] {
  const primary = normalizePrimaryPath(project.repos, project.primaryPath)
  const head = project.repos.filter((repo) => samePath(repo.path, primary))
  const rest = project.repos.filter((repo) => !samePath(repo.path, primary))
  return [...head, ...rest]
}
