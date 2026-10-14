import assert from 'node:assert/strict'
import { cp, mkdtemp, readFile, rm } from 'node:fs/promises'
import { createServer } from 'node:http'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import test from 'node:test'

test('standalone desktop package imports without workspace dependencies and serves its own assets', async t => {
  const directory = await mkdtemp(join(tmpdir(), 'synapse-desktop-package-'))
  const packageDir = join(directory, 'package')
  await cp(new URL('../lib/desktop/', import.meta.url), packageDir, { recursive: true })
  t.after(() => rm(directory, { recursive: true, force: true }))
  const manifest = JSON.parse(await readFile(join(packageDir, 'package.json'), 'utf8'))
  assert.equal(manifest.dependencies, undefined)
  assert.equal(manifest.dsh.client.platform, 'web')
  const plugin = await import(pathToFileURL(join(packageDir, 'index.js')))
  const routes = []
  const listeners = new Map()
  const cleanups = []
  const errors = []
  const ctx = {
    webServer: { register(route) { routes.push(route); return () => {} } },
    sessions: { list: () => [] },
    effect(setup) { cleanups.push(setup()) },
    on(name, handler) { listeners.set(name, handler) },
    logger: { warn: error => errors.push(error), error: error => errors.push(error) },
  }
  plugin.apply(ctx, { dataFile: join(directory, 'data', 'workspaces.json') })
  const server = createServer((req, res) => {
    const pathname = new URL(req.url, 'http://localhost').pathname
    const route = routes.find(route => route.kind === 'exact' ? pathname === route.path : pathname.startsWith(route.path))
    if (!route) { res.writeHead(404); res.end(); return }
    Promise.resolve(route.handler(req, res)).catch(error => { errors.push(error); res.writeHead(500); res.end() })
  })
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve))
  t.after(async () => {
    for (const cleanup of cleanups.reverse()) if (typeof cleanup === 'function') await cleanup()
    await new Promise(resolve => server.close(resolve))
  })
  const origin = 'http://127.0.0.1:' + server.address().port
  for (const [path, contentType] of [
    ['/synapse/', 'text/html'],
    ['/synapse/app.js', 'text/javascript'],
    ['/synapse/styles.css', 'text/css'],
    ['/synapse/deepseek-mark.svg', 'image/svg+xml'],
  ]) {
    const response = await fetch(origin + path)
    assert.equal(response.status, 200, path)
    assert.ok(response.headers.get('content-type').startsWith(contentType), path)
    assert.ok((await response.text()).length > 0, path)
  }
  const session = {
    id: 'desktop-smoke-session',
    header: { meta: { cwd: directory } },
    title: 'Desktop smoke session',
    snapshotEvents: () => [{ seq: 1, type: 'message/user', data: { content: [{ type: 'text', text: 'Desktop projection' }] } }],
  }
  listeners.get('session/created')(session)
  const response = await fetch(origin + '/synapse/api/workspaces')
  assert.equal(response.status, 200)
  const { workspaces } = await response.json()
  assert.equal(workspaces.length, 1)
  const detail = await (await fetch(origin + '/synapse/api/workspaces/' + workspaces[0].id)).json()
  assert.equal(detail.workspace.threads[0].dshSessionId, session.id)
  assert.deepEqual(errors, [])
  // Let the store's documented deferred save finish before removing its directory.
  await new Promise(resolve => setTimeout(resolve, 1000))
})
