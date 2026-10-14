import { resolve } from 'node:path'
import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: { client: 'client.js' },
  format: 'cjs',
  dts: false,
  outDir: 'lib',
  platform: 'browser',
  alias: {
    '@just-genius/dsh-plugin-ui/official-primitives': resolve('../../packages/ui/src/official-primitives.ts'),
    '@just-genius/dsh-plugin-runtime/client': resolve('../../packages/runtime/src/client.ts'),
  },
  deps: { neverBundle: true, alwaysBundle: [/^@just-genius\/dsh-plugin-(?:ui|runtime)(?:\/|$)/] },
  outExtensions: () => ({ js: '.js' }),
  banner: {
    js: `window.__ModuleLoader__.load({ id: "dsh-synapse", factory: (require) => {
var module = { exports: {} };
var exports = module.exports;`,
  },
  footer: { js: 'return module.exports; } });' },
})
