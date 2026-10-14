import { copyFile } from 'node:fs/promises'

await copyFile(new URL('../src/overlay.html', import.meta.url), new URL('../lib/overlay.html', import.meta.url))
