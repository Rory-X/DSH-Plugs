import { describe, expect, it, vi } from 'vitest'
import { adaptPendingInteraction } from '../src/client-compat'

describe('pending interaction adapter', () => {
  it('retains identity and forwards only valid approval outcomes', async () => {
    const answer = vi.fn(async () => {})
    const wait = { kind: 'approval', key: 'a', sessionId: 's', toolName: 'bash', callId: 'c', reason: 'run', answer } as unknown as Parameters<typeof adaptPendingInteraction>[0]
    const adapted = adaptPendingInteraction(wait)
    expect(adaptPendingInteraction(wait)).toBe(adapted)
    expect((await adapted.respond({ ok: true, value: { outcome: 'always' } })).accepted).toBe(false)
    expect(answer).not.toHaveBeenCalled()
    await adapted.respond({ ok: true, value: { outcome: 'allowed-once' } })
    expect(answer).toHaveBeenCalledWith('allowed-once')
  })

  it('routes question and plan-review answers and cancellations to their native wait', async () => {
    for (const kind of ['question', 'plan-review']) {
      const answer = vi.fn(async () => {})
      const cancel = vi.fn(async () => {})
      const wait = { kind, key: kind, sessionId: 's', questions: [], answer, cancel } as unknown as Parameters<typeof adaptPendingInteraction>[0]
      const adapted = adaptPendingInteraction(wait)
      expect(adapted.kind).toBe('question')
      await adapted.respond({ ok: true, value: { answer: { choice: 'yes' } } })
      expect(answer).toHaveBeenCalledWith({ choice: 'yes' })
      await adapted.respond({ ok: false, error: { code: 'cancelled' } })
      expect(cancel).toHaveBeenCalledOnce()
    }
  })
})
