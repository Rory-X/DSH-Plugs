import { defineConfig } from 'tsdown'
import { resolve } from 'node:path'

export default defineConfig({
  entry: ['src/index.ts'],
  format: 'esm',
  dts: true,
  outDir: 'lib',
  clean: true,
  platform: 'node',
  alias: {
    '@just-genius/dsh-plugin-runtime/host': resolve('../../packages/runtime/src/host.ts'),
    '@just-genius/dsh-plugin-runtime/websocket': resolve('../../packages/runtime/src/websocket.ts'),
  },
  deps: { neverBundle: true, alwaysBundle: [/^@just-genius\/dsh-plugin-runtime/, /^ws$/] },
  treeshake: { moduleSideEffects: false },
  outExtensions: () => ({ js: '.js', dts: '.d.ts' }),
})
