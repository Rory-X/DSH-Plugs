/** Wait kinds published by `uiSession.pendingInteractions`. */
export type PendingKind = 'approval' | 'plan-review' | 'question'

/** Seeded observation: `''` means no wait after the first list snapshot. */
export interface ObservedPending { kind: PendingKind | ''; key?: string }

/**
 * First observation seeds the baseline (never fires). Later, a new or
 * different wait identity is the rising edge to notify on. Reconnect must
 * reseed so mux replay of still-pending waits does not spam.
 */
export function pendingAdvance(
  prev: ObservedPending | undefined,
  next: PendingKind | undefined,
  key?: string,
): { observed: ObservedPending; fresh: boolean } {
  const observed: ObservedPending = { kind: next ?? '', key }
  const fresh = prev !== undefined && next !== undefined && (next !== prev.kind || (key !== undefined && key !== prev.key))
  return { observed, fresh }
}

export function pendingCopy(kind: PendingKind, sessionTitle: string): { title: string; body: string } {
  const zh = isZh()
  const title = zh
    ? {
        approval: '等待审批',
        question: '等待回答',
        'plan-review': '等待确认计划',
      }[kind]
    : {
        approval: 'Waiting for approval',
        question: 'Waiting for an answer',
        'plan-review': 'Waiting for plan review',
      }[kind]
  const fallback = zh ? '会话需要你处理' : 'A session needs your attention'
  const trimmed = sessionTitle.trim()
  return { title, body: trimmed === '' ? fallback : trimmed }
}

export function completionCopy(sessionTitle: string): { title: string; body: string } {
  return {
    title: isZh() ? '本轮会话已结束' : 'Session turn finished',
    body: sessionTitle.trim() || (isZh() ? '智能体已结束本轮运行' : 'The agent has finished this turn'),
  }
}

function isZh(): boolean {
  const lang = (document.documentElement.lang || navigator.language || '').toLowerCase()
  return lang.startsWith('zh')
}
