import { fileURLToPath } from 'node:url'
import { defineConfig } from 'tsdown'

// The desktop artifact bundles only Synapse's shared helpers. Shipping the
// entire workspace runtime would also bring its older, unrelated DSH peers.
export default defineConfig({
  entry: { index: 'index.js' },
  format: 'esm',
  dts: false,
  outDir: 'lib/desktop',
  clean: true,
  platform: 'node',
  alias: {
    '@just-genius/dsh-plugin-runtime/host': fileURLToPath(new URL('../../packages/runtime/src/host.ts', import.meta.url)),
  },
  deps: { alwaysBundle: [/^@just-genius\/dsh-plugin-runtime(?:\/|$)/] },
  // The shared boundary consists of declarations, helpers and re-exports;
  // unused re-exports must not eagerly load unrelated official packages.
  treeshake: { moduleSideEffects: false },
  outExtensions: () => ({ js: '.js' }),
})
