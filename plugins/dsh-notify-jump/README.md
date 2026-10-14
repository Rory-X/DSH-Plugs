# @just-genius/dsh-notify-jump

Session notifications with native DSH-Desktop delivery and a browser fallback:

1. **Jump** — click a session notification to focus the window and open that session. Its logical tag is `dsh-notification-<sessionId>`; the browser transport uses a short hash to fit Windows notification ID limits.
2. **Pending waits** — when a listed session enters `approval`, `question` (ask), or `plan-review`, show a system notification (same tag, so click still jumps). First list snapshot and reconnect replay seed the baseline and do not fire.
3. **Turn completion** — notify when a previously running session finishes its turn. No separate `dsh-notification` package is required.

**Settings → Notifications** shows the current permission, sends a test notification,
and opens OS notification settings when needed. Desktop permission comes from the
native bridge, so a denied Chromium site permission or a changed localhost port
does not block native notifications. Plain browsers keep their normal permission
request flow. A test is successful only after the transport reports delivery.

Settings-page test pings (`dsh-notification-test`) do not jump. Subagent rows are skipped.
No banner while you are looking at that session in the focused window; a visible
DSH window behind another app still receives notifications.

Install:

```sh
dsh plugin --profile web add ./plugins/dsh-notify-jump
```

Restart the web profile after the first install (bundle-stack change). Later client rebuilds need a page refresh.

## Official DeepSeek Harness Desktop

DSH Desktop 0.2 publishes `uiSession.sessionStatus`; older Web versions expose
`pendingInteractions`. The shared runtime adapter supports both. The official
desktop uses host-owned `turn/end`, `approval/asked`, and user-question requests
for reminders, including sessions outside its compatibility client's catalog.
Events arrive over the authenticated desktop WebSocket transport, which keeps
working while Chromium suspends timers in a minimized window. Reconnect resumes
from the last received cursor; a fresh client seeds without replaying old alerts.
The official desktop shell uses the Web
Notification API; the optional native bridge is used only when present.
Windows receives a short, stable tag instead of the full session ID. Chromium
prefixes the page origin to notification IDs, so a full session tag can exceed
the Windows limit even when a settings-page test notification succeeds. The
original session ID stays in the click callback for navigation.

Build with `pnpm --filter @just-genius/dsh-notify-jump build:desktop`, then install
the standalone `lib/desktop` directory into the **desktop** profile, preferably
after copying it to `~/.dsh/plugins/notify-jump-desktop`. The package contains no
workspace dependencies. Enable it in Settings → Plugins and reload the client
when requested by DSH. Settings → Notifications includes a delivery test.

Windows notification settings and Do Not Disturb still control visible banners.
Permission being granted alone does not prove that a banner was displayed.
