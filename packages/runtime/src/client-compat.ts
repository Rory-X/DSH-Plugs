import type { SessionSnapshot } from '@deepseek-ai/dsh-api-session-controller/client'
import type { SessionHistoryRecord } from '@deepseek-ai/dsh-api-session-controller/types'
import type { PendingApproval } from '@deepseek-ai/dsh-client-ui-approval/client'
import type { PendingQuestion, QuestionAnswer } from '@deepseek-ai/dsh-client-ui-user-questions/client'
import type { SessionId } from '@deepseek-ai/dsh-session/types'
import type { RemoteResult } from '@deepseek-ai/dsh-typert-protocol'

/** Older plugin views called the Session control snapshot a conversation. */
export type ConversationSnapshot = SessionSnapshot & {
  readonly pending?: readonly PendingInteraction[]
}

export type HistoryEntry = SessionHistoryRecord

/** Optional legacy transport, used only by clients that still expose it. */
export interface IApiClient {
  sessions: { history(input: unknown): Promise<HistoryResponse> }
  subagents: { history(input: unknown): Promise<HistoryResponse> }
}

interface HistoryResponse {
  result: RemoteResult<{ events: HistoryEntry[]; hasMore: boolean }>
}

interface PendingPayloads {
  approval: Pick<PendingApproval, 'callId' | 'reason' | 'toolName'> & { approvalId?: string }
  question: { questions: PendingQuestion['questions'] }
}

export interface PendingWait<K extends keyof PendingPayloads = keyof PendingPayloads> {
  readonly kind: K
  readonly key: string
  readonly sessionId: SessionId
  readonly payload: PendingPayloads[K]
  respond(result: Record<string, unknown>): Promise<{ accepted: boolean; reason?: string }>
}

export type PendingInteraction = PendingWait<'approval'> | PendingWait<'question'>

const waits = new WeakMap<PendingApproval | PendingQuestion, PendingInteraction>()

/** Keep existing plugin controls on the current, UI-owned interaction carrier. */
export function adaptPendingInteraction(wait: PendingApproval | PendingQuestion): PendingInteraction {
  const cached = waits.get(wait)
  if (cached !== undefined) return cached
  const interaction: PendingInteraction = wait.kind === 'approval'
    ? {
        kind: 'approval', key: wait.key, sessionId: wait.sessionId,
        payload: { callId: wait.callId, reason: wait.reason, toolName: wait.toolName },
        async respond(result) {
          const value = result.value as { outcome?: unknown } | undefined
          if (result.ok !== true || (value?.outcome !== 'allowed-once' && value?.outcome !== 'rejected')) {
            return { accepted: false, reason: 'invalid approval decision' }
          }
          await wait.answer(value.outcome)
          return { accepted: true }
        },
      }
    : {
        kind: 'question', key: wait.key, sessionId: wait.sessionId,
        payload: { questions: wait.questions },
        async respond(result) {
          if (result.ok === false) {
            const error = result.error as { code?: unknown } | undefined
            if (error?.code !== 'cancelled') return { accepted: false, reason: 'invalid question cancellation' }
            await wait.cancel()
          } else {
            const value = result.value as { answer?: QuestionAnswer } | undefined
            if (result.ok !== true || value?.answer === undefined) return { accepted: false, reason: 'missing question answer' }
            await wait.answer(value.answer)
          }
          return { accepted: true }
        },
      }
  waits.set(wait, interaction)
  return interaction
}
