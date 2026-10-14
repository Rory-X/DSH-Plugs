import { readFile } from 'node:fs/promises'
import { Script } from 'node:vm'
import { test } from 'node:test'
import assert from 'node:assert/strict'

const output = new URL('../lib/desktop/', import.meta.url)

test('standalone desktop package registers a loader factory without workspace dependencies', async () => {
  const manifest = JSON.parse(await readFile(new URL('package.json', output), 'utf8'))
  assert.equal(manifest.main, 'index.js')
  assert.equal(manifest.dependencies, undefined)
  let registration
  const client = await readFile(new URL('client.js', output), 'utf8')
  new Script(client).runInNewContext({ window: { __ModuleLoader__: { load(value) { registration = value } } } })
  assert.equal(registration.id, manifest.name)
  assert.equal(typeof registration.factory, 'function')
  assert.ok(client.includes('sessionStatus'))
  assert.ok(client.includes('new Native'))
})
