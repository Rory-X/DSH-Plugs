import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    host: 'src/host.ts',
    client: 'src/client.ts',
    websocket: 'src/websocket.ts',
  },
  format: 'esm',
  dts: true,
  outDir: 'lib',
  clean: true,
  platform: 'neutral',
  deps: { neverBundle: true },
  outExtensions: () => ({ js: '.js', dts: '.d.ts' }),
})
