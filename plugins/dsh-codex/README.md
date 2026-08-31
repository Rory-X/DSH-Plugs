# @just-genius/dsh-codex

The consolidated Codex shell for DSH: message navigation, turn collapsing, a side-panel host with file preview, Codex-style side chat, a Warp-style terminal, and a git commit graph — all configurable from one Codex settings section.

## Features

- **Navigator** — a vertical tick rail on the transcript, one tick per user message, with active highlight and smooth jump. Optional **full session load** drains `loadOlder` until the history window is complete, so the rail is not missing older turns; default stays windowed.
- **Sticky user bubble** — pins a full-width one-line clone of the prompt after that bubble has left the top (text ellipsis when it exceeds the column; attached images come along as a compact thumbnail strip with an edge fade when they overflow; hover an image for a zoom control that opens a full preview; click the bar to expand, no copy/time chrome). Expanded view collapses on any other action (scroll, key, click outside). Hidden while any later user prompt is still visible in the transcript. Optional: only while a turn is running, or always.
- **Worked-for collapsing** — completed turns that ran tools collapse into a Cursor-style **Worked for** row; the closing assistant message stays visible as the conclusion.
- **Side panels** — a right-side `side.panel` host with a scrollable tab strip, plus the imperative `ctx.sidePanels` service other features use to open panels.
- **Side chat** — Codex-style `/side` side conversations: each open tab is one blank side dialog that shares the current session's working directory (identical sandbox) but never loads the parent's history, without interrupting the main task. Renders with the same Markdown/tool primitives DSH's own chat uses, and the composer mirrors the main one: attach images, switch model, and change sandbox permission. Ask "why is this written this way?" or "what does this error mean?" while the main task keeps running. `/side` in the composer or a new **侧聊** tab opens one; closing the tab disposes and archives it.
- **Files panel** — session-cwd file tree with status badges, read-only preview and git diff view. Syntax highlighting uses shiki's `light-plus` / `dark-plus` (VSCode's default token colors) and follows the app's light/dark switch; line-number gutters stay pinned during horizontal scroll.
- **File links in chat** — chat file links open in the side-panel preview instead of the OS default app (toggleable).
- **Terminal panel** — Warp-style blocks backed by a real login-shell PTY over WebSocket (`/dsh-codex/terminal/ws`), with completions, history, ghost hints, and full-screen program (vim/htop) alt-screen support. Follows the app theme.
- **Git graph panel** — read-only commit graph walking `git log` (`/dsh-codex/git-graph`), with lane layout, branch filter, and a commit context menu (copy, checkout, branch, cherry-pick, revert, reset).

## Design

| Half | Source | Role |
| --- | --- | --- |
| host | `src/index.ts`, `src/host/**` | PTY server, git-log/exec routes, side-chat fork lifecycle, settings persistence |
| client | `src/client/index.tsx`, `src/client/features/**` | One folder per feature, wired by `core/feature-manager.ts` |
| shared | `src/shared/**` | Config schema + WS/REST protocols shared by both halves |

- Client features are plain modules with a `definition.ts` (slot registrations, config gates); the feature manager mounts them in order, so a feature is added by dropping in a folder.
- The terminal renders the whole transcript onto **one canvas** (`cell-render.ts`): headless xterm grids are pure data, `doc-model.ts` flattens blocks into a linear document, and the painter draws only the visible window — one surface, one scrollbar, one selection model.
- Highlighting is bundled eagerly (single-file client bundle, no lazy chunks): `createHighlighterCoreSync` + the JS regex engine, dual-theme tokenize so theme switching needs no re-highlight.
- Legacy localStorage keys from the retired standalone side-panel / terminal plugins are still read, so existing panel state survives the consolidation.

## Develop

```sh
pnpm install
pnpm typecheck
pnpm build
```

With the plugin linked into the web profile and DSH's client HMR running, `pnpm build` (or `pnpm watch`) hot-reloads the client bundle — no page refresh needed.

## Install

```sh
dsh plugin --profile web add ./plugins/dsh-codex
```

Restart DSH web after the first install.
