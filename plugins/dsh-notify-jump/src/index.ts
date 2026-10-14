import { randomUUID } from 'node:crypto'
import type { Context } from '@just-genius/dsh-plugin-runtime/host'
import { HOST_SERVICES, sendJson } from '@just-genius/dsh-plugin-runtime/host'
import { WebSocketServer } from '@just-genius/dsh-plugin-runtime/websocket'
import { createReminderJournal, EVENTS_PATH, SOCKET_PATH, isReminderRoot, observeQuestions, reminderOriginAllowed, type ReminderKind } from './shared'

export const name = 'dsh-notify-jump'
export const inject = [HOST_SERVICES.webServer, HOST_SERVICES.sessionTitle, HOST_SERVICES.sessions, HOST_SERVICES.agents] as const

interface ReminderSession {
  id: string
  header: { parentSession?: unknown }
}
interface QuestionRequest {
  agent?: { session: ReminderSession }
  questions: readonly { intent?: { kind?: string } }[]
}

export function apply(ctx: Context): void {
  const journal = createReminderJournal(randomUUID())
  const sockets = new WebSocketServer({ noServer: true, maxPayload: 1024 })
  const record = (session: ReminderSession, kind: ReminderKind) => {
    if (!isReminderRoot(String(session.id), ctx.agents as unknown as { get(id: string): unknown; roots(): readonly unknown[] })) return
    const snapshot = ctx.sessionTitle.get(session as never)
    const title = typeof snapshot === 'string' ? snapshot : snapshot?.title ?? ''
    const event = journal.append({ sessionId: String(session.id), kind, title })
    const batch = JSON.stringify({ ...journal.read(), events: [event] })
    for (const socket of sockets.clients) if (socket.readyState === 1) {
      socket.send(batch, error => { if (error) socket.terminate() })
    }
  }
  ctx.on('session/event', (session, event) => {
    if (event.type === 'approval/asked') record(session as unknown as ReminderSession, 'approval')
    if (event.type === 'turn/end') record(session as unknown as ReminderSession, 'completion')
  })
  // Observe the request without claiming it or changing the answerer's result.
  const events = ctx as unknown as {
    on(name: string, listener: (request: QuestionRequest, next: () => Promise<unknown>) => Promise<unknown>, options: { prepend: boolean }): unknown
  }
  observeQuestions(events, request => {
    if (request.agent !== undefined) record(request.agent.session,
      request.questions.some(question => question.intent?.kind === 'plan-review') ? 'plan-review' : 'question')
  })
  ctx.effect(() => ctx.webServer.registerUpgrade({
    path: SOCKET_PATH,
    handler(req, socket, head) {
      if (!reminderOriginAllowed(req.headers.origin, req.headers.host)) {
        socket.end('HTTP/1.1 403 Forbidden\r\nConnection: close\r\n\r\n'); return
      }
      sockets.handleUpgrade(req, socket, head, client => {
        const url = new URL(req.url ?? '/', 'http://localhost')
        const after = Number(url.searchParams.get('after'))
        const sameHost = url.searchParams.get('epoch') === journal.read().epoch
        client.on('error', () => client.terminate())
        client.send(JSON.stringify(journal.read(sameHost && Number.isSafeInteger(after) && after >= 0 ? after : undefined)))
      })
    },
  }), 'dsh-notify-jump: reminder socket')
  ctx.effect(() => {
    const heartbeat = setInterval(() => {
      for (const socket of sockets.clients) if (socket.readyState === 1) socket.ping()
    }, 20_000)
    return () => { clearInterval(heartbeat); for (const socket of sockets.clients) socket.terminate(); sockets.close() }
  }, 'dsh-notify-jump: socket lifetime')
  ctx.effect(() => ctx.webServer.register({
    kind: 'exact', path: EVENTS_PATH,
    handler(req, res) {
      if (req.method !== 'GET') { sendJson(res, 405, { error: 'method not allowed' }); return }
      const raw = new URL(req.url ?? '/', 'http://localhost').searchParams.get('after')
      const after = raw === null ? undefined : Number(raw)
      if (after !== undefined && (!Number.isSafeInteger(after) || after < 0)) {
        sendJson(res, 400, { error: 'invalid cursor' }); return
      }
      const batch = journal.read(after)
      if (new URL(req.url ?? '/', 'http://localhost').searchParams.has('inspect')) {
        sendJson(res, 200, { ...batch, clients: sockets.clients.size, agents: ctx.agents.list().map(agent => ({ id: String(agent.id), status: agent.status })) })
      } else sendJson(res, 200, batch)
    },
  }), 'dsh-notify-jump: reminder events')
}
