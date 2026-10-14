import { spawnSync } from 'node:child_process'
import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createHash } from 'node:crypto'
import { createRequire } from 'node:module'

const root = fileURLToPath(new URL('../', import.meta.url))
const output = join(root, 'lib/desktop')
const source = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'))
const tsdownPackage = fileURLToPath(import.meta.resolve('tsdown/package.json'))
const tsdown = JSON.parse(await readFile(tsdownPackage, 'utf8'))
const cli = join(dirname(tsdownPackage), typeof tsdown.bin === 'string' ? tsdown.bin : tsdown.bin.tsdown)
for (const config of ['tsdown.config.ts', 'tsdown.client.config.ts']) {
  const result = spawnSync(process.execPath, [cli, '-c', config], { cwd: root, stdio: 'inherit', windowsHide: true })
  if (result.error) throw result.error
  if (result.status !== 0) throw new Error(`Notification build failed: ${result.status}`)
}

await mkdir(output, { recursive: true })
for (const [input, target] of [['lib/index.js', 'index.js'], ['lib/client.js', 'client.js'], ['cordis.patch.yml', 'cordis.patch.yml'], ['README.md', 'README.md']]) {
  await copyFile(join(root, input), join(output, target))
}
const manifest = {
  name: source.name, version: source.version, description: source.description, type: 'module', main: 'index.js',
  exports: { '.': './index.js', './client': './client.js', './package.json': './package.json' },
  files: ['index.js', 'client.js', 'cordis.patch.yml', 'README.md', 'BUILD.json', 'THIRD_PARTY_NOTICES.txt'],
  engines: { node: '>=22.19.0' },
  dsh: { bundle: { patch: './cordis.patch.yml' }, client: source.dsh.client },
}
await writeFile(join(output, 'package.json'), JSON.stringify(manifest, null, 2) + '\n')
const client = await readFile(join(output, 'client.js'), 'utf8')
const external = new Set([...client.matchAll(/\brequire\("([^"]+)"\)/g)].map(match => match[1]))
for (const name of external) {
  if (name !== 'react' && name !== 'react-dom' && !name.startsWith('react/') && !manifest.dsh.client.inject.some(id => name === id || name.startsWith(id + '/'))) {
    throw new Error(`Desktop notification package has an undeclared dependency: ${name}`)
  }
}
await writeFile(join(output, 'BUILD.json'), JSON.stringify({
  format: 'standalone-desktop', supportedStatusSources: ['sessionStatus', 'pendingInteractions'],
  clientSha256: createHash('sha256').update(client).digest('hex'),
}, null, 2) + '\n')
const runtimeManifest = fileURLToPath(import.meta.resolve('@just-genius/dsh-plugin-runtime/package.json'))
const wsManifest = createRequire(runtimeManifest).resolve('ws/package.json')
const websocket = JSON.parse(await readFile(wsManifest, 'utf8'))
await writeFile(join(output, 'THIRD_PARTY_NOTICES.txt'), `${websocket.name} ${websocket.version}\n\n${await readFile(join(dirname(wsManifest), 'LICENSE'), 'utf8')}`)
console.log(`Standalone notification plugin: ${output}`)
