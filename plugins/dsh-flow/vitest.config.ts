import { fileURLToPath } from 'node:url';

const pluginRoot = fileURLToPath(new URL('.', import.meta.url));

export default {
  root: pluginRoot,
  // The shared UI kit's ROOT entry forwards the official conversation
  // primitives, so importing anything from it — even one of the kit's own
  // glyphs — pulls that package in. It is a browser-only DSH client module:
  // it imports CSS modules and needs `simple-icons`, `katex`, and `shiki`,
  // none of which resolve under Node.
  //
  // The kit is inlined so Vite (not Node's loader) owns its imports, and the
  // browser-only package is aliased to a stub. A test that renders a
  // conversation surface would need the real package — none of these do.
  resolve: {
    // Matched exactly, so a subpath import (the package's own `./client`
    // entry) is not silently rewritten to this stub.
    alias: [{
      find: /^@deepseek-ai\/dsh-client-ui-primitives$/,
      replacement: fileURLToPath(new URL('./test/fixtures/primitives-stub.ts', import.meta.url)),
    }],
  },
  test: {
    environment: 'node',
    dir: pluginRoot,
    include: ['test/**/*.test.ts'],
    server: {
      deps: {
        inline: [/@just-genius\/dsh-plugin-ui/],
      },
    },
  },
};
