import { test } from 'node:test'
import assert from 'node:assert/strict'
import { cpSync, mkdirSync, mkdtempSync, realpathSync, rmSync, symlinkSync } from 'node:fs'
import { createRequire } from 'node:module'
import { execFileSync } from 'node:child_process'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { repairProfileScopeIdentity } from '../src/profile-singletons.ts'
import { observeWorkspaceOpenFailures } from '../../../plugins/dsh-workspace-plus/src/client/navigation-feedback.ts'
import { loadHostClient } from './host-client-fixture.js'

const root = process.env.DSH_HOST_MODULE_ROOT
const hostTest = root === undefined ? test.skip : test

hostTest('installed ToolRuntime reproduces duplicate scope leakage, then isolates both agents after repair', () => {
  const tools = realpathSync(join(root, 'dsh-tools/lib/index.js'))
  const host = createRequire(tools)
  const scope = dirname(host.resolve('@deepseek-ai/dsh-scope/package.json'))
  const profile = mkdtempSync(join(tmpdir(), 'dsh-host-scope-'))
  try {
    const modules = join(profile, 'node_modules/@deepseek-ai')
    mkdirSync(modules, { recursive: true })
    cpSync(scope, join(modules, 'dsh-scope'), { recursive: true })
    symlinkSync(dirname(host.resolve('@deepseek-ai/cordis/package.json')), join(modules, 'cordis'), 'dir')
    const probe = () => JSON.parse(execFileSync(process.execPath, [
      fileURLToPath(new URL('./host-scope-probe.mjs', import.meta.url)), tools, profile,
    ], { encoding: 'utf8', timeout: 15_000 }).trim())

    const before = probe()
    assert.equal(before.recognized, false)
    assert.equal(before.globalLeak, true)
    assert.match(before.error, /already registered/)
    assert.ok(repairProfileScopeIdentity(profile, tools))
    const after = probe()
    assert.deepEqual(after, { recognized: true, globalLeak: false, isolated: true, secondSurvives: true })
    assert.equal(repairProfileScopeIdentity(profile, tools), undefined)
  } finally {
    rmSync(profile, { recursive: true, force: true })
  }
})

hostTest('installed void startSession reports creation failure, then permits a successful retry', async () => {
  const { UiWorkspaceService } = loadHostClient(join(root, 'dsh-client-ui-workspace/lib/client.js'), ['UiWorkspaceService'], {
    '@deepseek-ai/cordis': { Service: class { constructor(ctx) { this.ctx = ctx } } },
    '@deepseek-ai/dsh-client-store': {},
    'react/jsx-runtime': {},
    react: { memo: component => component },
    '@deepseek-ai/dsh-client-ui-primitives': {},
  })
  const failure = new Error('tool "mcp__playwright-mcp__browser_close" is already registered')
  const errors = []
  const opened = []
  let failing = true
  const navigation = new UiWorkspaceService({
    effect() {},
    layout: { beginNavigation: () => new AbortController().signal, selectPanel() {} },
  }, {}, {
    list: { getSnapshot: () => ({
      phase: 'ready', items: [{ workspaceId: 'ws', path: '/test', sessionIds: [] }], archivedSessionIds: [],
    }) },
  }, {
    list: { getSnapshot: () => ({ phase: 'ready', ids: [], byId: {} }) },
    async create() { if (failing) throw failure; return 'new' },
    open(id) { opened.push(id) },
  })
  const dispose = observeWorkspaceOpenFailures(navigation, error => errors.push(error))
  try {
    assert.equal(navigation.startSession('ws'), undefined)
    await new Promise(resolve => setImmediate(resolve))
    assert.deepEqual(errors, [failure])
    assert.deepEqual(opened, [])
    failing = false
    navigation.startSession('ws')
    await new Promise(resolve => setImmediate(resolve))
    assert.deepEqual(opened, ['new'])
    assert.deepEqual(errors, [failure])
  } finally { dispose() }
})
