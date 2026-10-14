export interface SessionOpenRequest {
  sessionId: string
  ancestors: string[]
}

export type PetNavigationMessage = { type: 'focus-owner' } | (SessionOpenRequest & { type: 'open-session' })

/** Both an empty card and a selected session bring the existing DSH window forward. */
export function requestPetNavigation(
  send: (message: PetNavigationMessage, options: { focusOwner: true }) => Promise<boolean>,
  session?: { id: string; ancestors: string[] },
): Promise<boolean> {
  return send(session
    ? { type: 'open-session', sessionId: session.id, ancestors: session.ancestors }
    : { type: 'focus-owner' }, { focusOwner: true })
}

export function sessionOpenRequest(raw: unknown): SessionOpenRequest | null {
  if (raw === null || typeof raw !== 'object') return null
  const value = raw as Record<string, unknown>
  if (value.type !== 'open-session' || typeof value.sessionId !== 'string' || !value.sessionId || value.sessionId.length > 200) return null
  const ancestors = Array.isArray(value.ancestors)
    ? value.ancestors.slice(0, 16).filter((id): id is string => typeof id === 'string' && id.length > 0 && id.length <= 200)
    : []
  return { sessionId: value.sessionId, ancestors }
}

/** Resolve catalog children through their real parent addresses; never invent a child route. */
export async function openTrackedSession<T>(source: {
  has: (id: string) => boolean
  open: (id: string) => void
  refresh: () => Promise<void>
  address: (id: string) => T | undefined
  refreshChildren: (id: string) => Promise<void>
  openChild: (address: T) => void
}, request: SessionOpenRequest): Promise<'session' | 'subagent' | 'parent'> {
  if (request.ancestors.length > 0) {
    let address = source.address(request.sessionId)
    if (!address) {
      for (const parent of request.ancestors) {
        try { await source.refreshChildren(parent) } catch { break }
      }
      address = source.address(request.sessionId)
    }
    if (address) { source.openChild(address); return 'subagent' }
    const root = request.ancestors.find(id => source.has(id))
    if (root) { source.open(root); return 'parent' }
  }
  if (!source.has(request.sessionId)) await source.refresh()
  if (!source.has(request.sessionId)) throw new Error('会话已结束或已移除')
  source.open(request.sessionId)
  return 'session'
}
