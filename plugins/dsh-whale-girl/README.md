# @just-genius/dsh-whale-girl

Desktop pet (whale-girl) for DSH. In a plain browser it is an in-page floating companion; in [DSH-Desktop](https://github.com/JustGenius-s/DSH-Desktop) it opens a transparent always-on-top overlay via `window.dshDesktop.overlays`, so the pet sits on the OS desktop — no separate Tauri/Electron companion app to package.

Assets and the state machine come from [whale-girl](https://github.com/vlln/whale-girl) (MIT; character design by ZipZipPipe).

## Features

- **Two runtimes, one plugin** — the client probes `dshDesktop.overlays`; when present it opens the overlay window at `/whale-girl/overlay`, otherwise it falls back to the in-page pet.
- **Direct dragging** — hold the pet's body to move it, then release to stop. Roaming pauses while held; a click still feeds or plays with the pet. Recent desktop shells track the cursor in the main process, with a coalesced movement fallback for older shells.
- **Desktop session strip** — active conversations show their title, latest visible assistant text, activity and elapsed time beside the pet. The count opens a scrollable list; select a row to follow it, or use its arrow to open the corresponding conversation. Waiting interactions take priority and subagent sessions are grouped under their parent.
- **Stable progress display** — streamed updates preserve the selected conversation. Finished turns remain briefly before disappearing, and the panel opens leftward or upward near screen edges while keeping the pet's anchor. Reading an expanded list pauses roaming.
- **Compact panel controls** — two small DSH icon buttons independently toggle desktop conversations and the level/XP bar. Both start collapsed and remember your choice locally; live updates never reopen a collapsed panel. A dot on the conversation button indicates running work or a pending interaction. The in-page pet also has a persistent level/XP toggle.
- **Retractable controls** — the translucent glass handle below the pet reveals an arrow on hover or keyboard focus, with the icon buttons centered directly beneath it. Click its up arrow to hide the buttons and panels; click its down arrow to restore the buttons and conversation card. The hidden state persists, and the level/XP preference is preserved. Hovering the handle pauses roaming.
- **Return to DSH** — the conversation card and its compact header arrow open the selected conversation, or focus the DSH main window when there are no active conversations. Count, jump, and close controls share one aligned header row.
- **Shared DSH icons** — panel controls, session navigation, hierarchy markers, and in-page interaction buttons use the shared UI icon library, bundled locally for the standalone overlay.
- **Presence heartbeats** — while the overlay is online it POSTs to `/whale-girl/presence`, and the in-page pet hides itself (`companionOnline`) so the two never appear at once.
- **Persistent ledger** — XP, titles, and memories are kept host-side (`/whale-girl/state|events|interact`).
- **Settings card** — Settings → Plugins gets a 桌面宠物 card (visibility, roaming, size, opacity, napping), next to the update plugin's entry.

## Design

| Half | Role |
| --- | --- |
| host `src/index.ts` | Ledger + routes: `state` / `events` / `interact` / `presence` / `config` / `assets` / `overlay` |
| client `src/client/**` | Overlay detection, in-page pet, settings card |

The host serves the overlay page and the pet assets, so the transparent desktop window is just another browser view of the same plugin — state stays in one place.

## Develop

```sh
pnpm install
pnpm typecheck
pnpm test
pnpm build
```

## Install

```sh
dsh plugin --profile web add ./plugins/dsh-whale-girl
```

Restart DSH web. In DSH-Desktop the pet appears on the OS desktop; in a plain browser it stays in the bottom-right corner of the page.
