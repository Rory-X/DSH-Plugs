import { copyFile, cp, mkdir, readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const root = new URL('../', import.meta.url)
const output = new URL('lib/desktop/', root)
const source = JSON.parse(await readFile(new URL('package.json', root), 'utf8'))
await mkdir(new URL('lib/', output), { recursive: true })
for (const name of ['app.js', 'styles.css', 'deepseek-mark.svg', 'cordis.patch.yml', 'README.md', 'LICENSE', 'lib/client.js']) {
  await copyFile(new URL(name, root), new URL(name, output))
}
await cp(new URL('docs/', root), new URL('docs/', output), { recursive: true })
const manifest = {
  name: source.name,
  version: source.version,
  description: source.description,
  type: source.type,
  main: 'index.js',
  exports: source.exports,
  files: ['index.js', 'lib/client.js', 'app.js', 'styles.css', 'deepseek-mark.svg', 'cordis.patch.yml', 'docs', 'README.md', 'LICENSE'],
  engines: source.engines,
  license: source.license,
  dsh: source.dsh,
  peerDependencies: source.peerDependencies,
}
await writeFile(new URL('package.json', output), JSON.stringify(manifest, null, 2) + '\n')
const host = await readFile(new URL('index.js', output), 'utf8')
if (host.includes('@just-genius/') || host.includes('@deepseek-ai/')) {
  throw new Error('The standalone Synapse host still references workspace or official runtime packages')
}
console.log('Standalone desktop package ready: ' + fileURLToPath(output))
