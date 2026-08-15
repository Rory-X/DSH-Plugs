import type { Catalog, CatalogPlugin } from './catalog.ts'
import { OMDSH_OWNER, OMDSH_SOURCE, OMDSH_URL } from './dsh-plugs.ts'

const CACHE_MS = 10 * 60 * 1000
const FETCH_MS = 15_000

/** Hub / runtime / docs repos tagged dsh-plugin that are not installable plugins. */
const OMDSH_SKIP = new Set([
  '.github',
  'community',
  'dsh-hub',
  'dsh-hub-workshop',
  'dsh-plugin-dev',
  'dsh-plugin-skills',
  'omdsh',
  'omdsh-runtime',
  'plugin-template',
])

interface GithubRepo {
  name?: unknown
  description?: unknown
  html_url?: unknown
  fork?: unknown
  archived?: unknown
  topics?: unknown
}

let githubCache: { at: number; plugins: CatalogPlugin[] } | null = null

export function claimOmdshSource(catalog: Catalog): Catalog {
  const plugins = catalog.plugins.map((plugin) => {
    if (plugin.owner.toLowerCase() !== OMDSH_OWNER) return plugin
    if (plugin.source === OMDSH_SOURCE) return plugin
    return { ...plugin, source: OMDSH_SOURCE }
  })
  return withOmdshSources(catalog, plugins)
}

export async function ensureOmdsh(catalog: Catalog): Promise<Catalog> {
  const claimed = claimOmdshSource(catalog)
  let extra: CatalogPlugin[] = []
  try {
    extra = await loadOmdshGithubPlugins()
  } catch {
    extra = []
  }
  if (extra.length === 0) return claimed
  const seen = new Set(claimed.plugins.map((plugin) => (plugin.packageName ?? plugin.name).toLowerCase()))
  const add = extra.filter((plugin) => !seen.has((plugin.packageName ?? plugin.name).toLowerCase()))
  if (add.length === 0) return claimed
  return withOmdshSources(claimed, [...claimed.plugins, ...add])
}

export async function loadOmdshGithubPlugins(force = false): Promise<CatalogPlugin[]> {
  const now = Date.now()
  if (!force && githubCache && now - githubCache.at < CACHE_MS) return githubCache.plugins
  const plugins: CatalogPlugin[] = []
  for (const repo of await fetchOmdshRepos()) {
    const plugin = omdshRepoToPlugin(repo)
    if (plugin) plugins.push(plugin)
  }
  githubCache = { at: now, plugins }
  return plugins
}

function withOmdshSources(catalog: Catalog, plugins: CatalogPlugin[]): Catalog {
  const sources = { ...catalog.sources }
  sources[OMDSH_SOURCE] = { en: 'omdsh-dev', zh: 'omdsh-dev' }
  for (const plugin of plugins) {
    if (sources[plugin.source] === undefined) {
      sources[plugin.source] = { en: plugin.source, zh: plugin.source }
    }
  }
  return { ...catalog, plugins, sources, count: plugins.length }
}

function omdshRepoToPlugin(repo: GithubRepo): CatalogPlugin | null {
  if (typeof repo.name !== 'string' || repo.name === '') return null
  if (repo.fork === true || repo.archived === true) return null
  if (OMDSH_SKIP.has(repo.name)) return null
  const topics = Array.isArray(repo.topics)
    ? repo.topics.filter((topic): topic is string => typeof topic === 'string')
    : []
  if (!topics.includes('dsh-plugin')) return null
  const spec = `github:${OMDSH_OWNER}/${repo.name}`
  const description = typeof repo.description === 'string' && repo.description.trim() !== ''
    ? repo.description.trim()
    : repo.name
  const url = typeof repo.html_url === 'string' && repo.html_url !== ''
    ? repo.html_url
    : `${OMDSH_URL}/${repo.name}`
  return {
    name: repo.name,
    owner: OMDSH_OWNER,
    url,
    category: categoryForOmdsh(repo.name, topics),
    description: { en: description, zh: description },
    install: `dsh plugin --profile web add ${spec}`,
    spec,
    source: OMDSH_SOURCE,
    added: '',
  }
}

function categoryForOmdsh(name: string, topics: readonly string[]): string {
  const n = name.toLowerCase()
  if (topics.includes('sandbox') || n.startsWith('sandbox-')) return 'dev'
  if (n.startsWith('dsh-tool-') || n === 'dsh-toolkit' || n === 'dsh-custom-tool') return 'tools'
  if (n.includes('mnemon') || n.includes('kb-')) return 'memory'
  if (n.includes('qwen') || n.includes('ernie') || n.includes('voice') || n.includes('ocr') || n.includes('llm-fallback')) {
    return 'model'
  }
  if (n.includes('notify') || n.includes('lark') || n.includes('open-in-vscode')) return 'notify'
  if (
    n.includes('inspect')
    || n.includes('research')
    || n.includes('revive')
    || n.includes('fusion')
    || n.includes('shuttle')
    || n.includes('book2skill')
    || n.includes('github-integration')
  ) return 'workflow'
  if (n.includes('session') || n === 'dsh-essential' || n.includes('teleport')) return 'session'
  if (
    n.startsWith('dsh-fun-')
    || n.includes('gomoku')
    || n.includes('chess')
    || n.includes('minigame')
    || n.includes('whale')
    || n.includes('pet')
    || n.includes('fortune')
    || n.includes('typewriter')
    || n.includes('ticker')
    || n.includes('weather')
    || n === '7d7d'
    || n === 'dsh-mygo'
    || n.includes('deep-sleep')
  ) return 'fun'
  if (
    n.includes('plugin-check')
    || n.includes('security')
    || n.includes('session-health')
    || n === 'fabric'
    || n.includes('bash-encoding')
    || n.includes('scout')
  ) return 'dev'
  if (n.includes('science') || n.includes('data-agent') || n.includes('advisor') || n.includes('longbridge')) {
    return 'tools'
  }
  return 'ui'
}

async function fetchOmdshRepos(): Promise<GithubRepo[]> {
  const headers = githubHeaders()
  const repos: GithubRepo[] = []
  for (let page = 1; page <= 3; page += 1) {
    const url = `https://api.github.com/users/${OMDSH_OWNER}/repos?per_page=100&type=owner&page=${page}`
    const response = await fetch(url, {
      signal: AbortSignal.timeout(FETCH_MS),
      headers,
    })
    if (!response.ok) throw new Error(`omdsh-dev github fetch failed: ${response.status}`)
    const batch = await response.json() as unknown
    if (!Array.isArray(batch) || batch.length === 0) break
    for (const item of batch) {
      if (item !== null && typeof item === 'object') repos.push(item as GithubRepo)
    }
    if (batch.length < 100) break
  }
  return repos
}

function githubHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    accept: 'application/vnd.github+json',
  }
  const env = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env
  if (env !== undefined) {
    headers['user-agent'] = 'dsh-plugin-marketplace'
    const token = env.GITHUB_TOKEN || env.GH_TOKEN
    if (token) headers.authorization = `Bearer ${token}`
  }
  return headers
}
