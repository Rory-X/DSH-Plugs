import { createPortal } from 'react-dom'
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react'
import type { MouseEvent as ReactMouseEvent } from 'react'
import type { SettingsScope } from '@deepseek-ai/dsh-client-runtime/client'
import { clampFullSessionLoadLimit, DEFAULT_CONFIG, type DshCodexConfig } from '../../../shared/config'
import { isAppendSurfaceEvent, isReplacementSurfaceEvent } from '@deepseek-ai/dsh-client-runtime/client'
import type { IApiClient, SubagentAddress } from '@deepseek-ai/dsh-client-connection/client'

/** Stepped bar widths, indexed by distance from the hovered bar (e-pi effect). */
const LEVEL_WIDTHS = [18, 26, 34, 46]

/** Hit-area geometry: a 16px tall transparent button per tick, overlapped by
 * 5px so the visible bars stay ~8px apart while every pixel along the rail is
 * hoverable (no dead zones between ticks). */
const HIT_HEIGHT = 16
const OVERLAP = 5
/** Comfortable bar pitch. Overflow uses a focus-centered window instead of packing tighter. */
const COMFORT_SPACING = HIT_HEIGHT - OVERLAP
/** Gaussian fade band at each end of an overflowing rail window. */
const RAIL_FADE_PX = 22

function clampInt(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

/**
 * Sliding window over the tick list.
 *
 * Keep the previous start while the current tick still fits, so older pages
 * prepend from the top and ticks below the current one fall off the bottom.
 * If a prepend (or a real focus move) pushes the current tick out, slide just
 * enough to bring it back — never leave the active message off the rail.
 */
function railWindowStart(args: {
  length: number
  maxTicks: number
  focusIndex: number
  prevStart: number
}): number {
  const { length, maxTicks, focusIndex, prevStart } = args
  if (length <= maxTicks) return 0
  const maxStart = length - maxTicks
  const start = clampInt(prevStart, 0, maxStart)
  if (focusIndex < 0) return start
  if (focusIndex < start) return focusIndex
  if (focusIndex >= start + maxTicks) return focusIndex - maxTicks + 1
  return start
}

/** Top margin left above the message when jumping (so it doesn't sit flush at the viewport top). */
const JUMP_MARGIN = 20

/** Ignore scroll-driven unpin while a jump animation (280ms) plus layout settle runs. */
const UNPIN_SUPPRESS_MS = 450

/** Keep the clicked tick active through tiny post-jump layout jitter. */
const UNPIN_SCROLL_PX = 12

/** Page size used when reading the full session history from the host. */
const HISTORY_PAGE_SIZE = 50

interface Entry {
  key: string | null
  seq: number
  label: string
}

interface HistoryEntry {
  seq: number
  label: string
}

function textOf(data: unknown): string {
  if (data && typeof data === 'object') {
    const content = (data as any).content
    if (Array.isArray(content)) {
      const text = content
        .filter((b: any) => b && typeof b === 'object' && b.type === 'text')
        .map((b: any) => String(b.text ?? ''))
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim()
      if (text) return text.length > 80 ? text.slice(0, 80) + '…' : text
    }
  }
  return 'Message'
}

/** Mirror the ChatView classification: compaction checkpoints are markers, not user messages. */
function isCompactionCheckpoint(event: any): boolean {
  if (!event || event.type !== 'user/message') return false
  const source = (event as any).data?.source
  return source?.kind === 'plugin' && source?.plugin === 'compact' && isReplacementSurfaceEvent(event)
}

/** True for one durable user-authored append-surface message. */
function isUserMessageEvent(event: any): boolean {
  if (!event || event.type !== 'user/message') return false
  const data = (event as any).data
  if (!data || data.source?.kind !== 'user') return false
  if (!isAppendSurfaceEvent(event)) return false
  return !isCompactionCheckpoint(event)
}

async function fetchHistoryPage(
  api: IApiClient,
  sessionId: string,
  address: SubagentAddress | undefined,
  beforeSeq: number | undefined,
): Promise<{ events: Array<{ event: any }>; hasMore: boolean } | null> {
  const payload: any = { maxMessages: HISTORY_PAGE_SIZE }
  if (beforeSeq !== undefined) payload.beforeSeq = beforeSeq
  const response: any = address
    ? await api.subagents.history({ ...address, ...payload })
    : await api.sessions.history({ sessionId, ...payload })
  const result = response?.result
  if (!result?.ok) return null
  return result.value as { events: Array<{ event: any }>; hasMore: boolean }
}

function seqOf(node: { anchorSeq?: unknown; data?: unknown; visibility?: string } | undefined): number | undefined {
  if (node === undefined) return undefined
  const dataSeq = node.data !== null && typeof node.data === 'object'
    ? (node.data as { seq?: unknown }).seq
    : undefined
  const raw = typeof node.anchorSeq === 'number' ? node.anchorSeq : dataSeq
  return typeof raw === 'number' && Number.isFinite(raw) ? raw : undefined
}

/** Match ChatView: do not interpolate keys into a CSS selector. */
function anchorElement(root: ParentNode, key: string): HTMLElement | null {
  for (const row of root.querySelectorAll('[data-chat-anchor-key]')) {
    if (row instanceof HTMLElement && row.dataset.chatAnchorKey === key) return row
  }
  return null
}

function userRowsOf(sp: ParentNode): HTMLElement[] {
  const flow = sp instanceof Element ? sp.querySelector('[data-chat-flow]') : null
  const root = flow ?? sp
  const rows: HTMLElement[] = []
  for (const row of root.querySelectorAll('[data-chat-anchor-key]')) {
    if (!(row instanceof HTMLElement)) continue
    if (row.dataset.chatFlowKind !== 'user') continue
    if (row.getBoundingClientRect().height < 1) continue
    rows.push(row)
  }
  return rows
}

function rowContentY(row: HTMLElement, sp: HTMLElement): number {
  return row.getBoundingClientRect().top - sp.getBoundingClientRect().top + sp.scrollTop
}

/** In-window ticks follow ChatView order; history only prepends strictly older unloaded turns. */
function mergeRailEntries(historyEntries: HistoryEntry[], order: readonly string[] | undefined, nodes: { get?(key: string): any } | undefined): Entry[] {
  const loaded: Entry[] = []
  for (const key of order ?? []) {
    const node = nodes?.get?.(key)
    if (node?.kind !== 'user') continue
    if (node.visibility === 'hidden') continue
    loaded.push({ key, seq: seqOf(node) ?? Number.NaN, label: textOf(node.data) })
  }
  const loadedSeqs = loaded.map(entry => entry.seq).filter((seq): seq is number => Number.isFinite(seq))
  const firstLoadedSeq = loadedSeqs.length > 0 ? Math.min(...loadedSeqs) : undefined
  if (firstLoadedSeq === undefined) {
    return historyEntries.map(item => ({ key: null, seq: item.seq, label: item.label }))
  }
  const seen = new Set(loadedSeqs)
  const older: Entry[] = []
  for (const item of historyEntries) {
    if (item.seq < firstLoadedSeq && !seen.has(item.seq)) {
      older.push({ key: null, seq: item.seq, label: item.label })
    }
  }
  return [...older, ...loaded]
}

function requestOlderPage(
  sessionId: string,
  loadOlder: ((id: string) => unknown) | undefined,
  sp: HTMLElement | null,
): void {
  const flow = sp?.querySelector('[data-chat-flow]')
  if (flow) {
    for (const btn of flow.querySelectorAll('button')) {
      if (!(btn instanceof HTMLButtonElement)) continue
      if (btn.disabled) continue
      if (btn.closest('[data-chat-anchor-key]')) continue
      btn.click()
      return
    }
  }
  const result = loadOlder?.(sessionId)
  if (result && typeof (result as Promise<void>).catch === 'function') {
    (result as Promise<void>).catch(() => {})
  }
}

let railStylesInstalled = false
function ensureRailStyles(): void {
  if (railStylesInstalled || typeof document === 'undefined') return
  railStylesInstalled = true
  const el = document.createElement('style')
  el.textContent = [
    `.dsh-codex-nav-fade{position:absolute;left:0;right:0;height:${RAIL_FADE_PX}px;pointer-events:none;z-index:1;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px)}`,
    '.dsh-codex-nav-fade-top{top:0;-webkit-mask-image:linear-gradient(to bottom,#000,transparent);mask-image:linear-gradient(to bottom,#000,transparent)}',
    '.dsh-codex-nav-fade-bottom{bottom:0;-webkit-mask-image:linear-gradient(to top,#000,transparent);mask-image:linear-gradient(to top,#000,transparent)}',
  ].join('')
  document.head.appendChild(el)
}

function conversationRoot(from: Element | null): HTMLElement | null {
  if (from === null) return null
  const rooted = from.closest('[data-phase]')
  if (rooted instanceof HTMLElement) return rooted
  return from instanceof HTMLElement ? from : null
}

/** Header chrome sits outside the transcript scrollport. */
function scrollportOf(from: Element | null): HTMLElement | null {
  const root = conversationRoot(from)
  const scoped = root?.querySelector('[data-conversation-scroll]')
  if (scoped instanceof HTMLElement) return scoped
  const found = document.querySelector('[data-conversation-scroll]')
  return found instanceof HTMLElement ? found : null
}

/** rAF-driven scroll: sets scrollTop directly each frame so it cannot be
 * canceled by the browser (unlike scrollTo({behavior:'smooth'})) and keeps
 * re-asserting, which survives the ChatView's stick-to-bottom while at the
 * conversation floor. Target is re-read each frame so a prepend cannot leave
 * the jump aimed at a stale Y (the first row). */
let scrollAnim = 0
function animateScroll(sp: HTMLElement, getTarget: () => number) {
  const start = sp.scrollTop
  const duration = 280
  const startTime = performance.now()
  const id = ++scrollAnim
  const apply = (value: number) => {
    sp.scrollTop = value
  }
  const dest0 = getTarget()
  if (Math.abs(dest0 - start) < 1) {
    apply(dest0)
    return
  }
  const step = (now: number) => {
    if (id !== scrollAnim) return
    const dest = getTarget()
    const t = Math.min(1, (now - startTime) / duration)
    const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
    apply(start + (dest - start) * eased)
    if (t < 1) requestAnimationFrame(step)
    else {
      const holdUntil = now + 180
      const hold = (later: number) => {
        if (id !== scrollAnim) return
        apply(getTarget())
        if (later < holdUntil) requestAnimationFrame(hold)
      }
      requestAnimationFrame(hold)
    }
  }
  requestAnimationFrame(step)
}

export function NavigatorRail(props: any) {
  const { sessionId, useSession, api } = props
  const scope = props.scope as SettingsScope<DshCodexConfig> | undefined
  const scopeSnapshot = useSyncExternalStore(
    scope === undefined ? () => () => {} : listener => scope.subscribe(listener),
    scope === undefined ? () => undefined : () => scope.getSnapshot(),
    scope === undefined ? () => undefined : () => scope.getSnapshot(),
  )
  const navigatorEnabled = scopeSnapshot?.value?.navigatorEnabled ?? true
  const fullSessionLoadEnabled = scopeSnapshot?.value?.fullSessionLoadEnabled ?? DEFAULT_CONFIG.fullSessionLoadEnabled
  const messageCap = fullSessionLoadEnabled
    ? clampFullSessionLoadLimit(
      typeof scopeSnapshot?.value?.fullSessionLoadLimit === 'number'
        ? scopeSnapshot.value.fullSessionLoadLimit
        : DEFAULT_CONFIG.fullSessionLoadLimit,
    )
    : undefined

  const hostRef = useRef<HTMLSpanElement | null>(null)
  const order = useSession((s: any) => s?.chat?.order)
  const nodes = useSession((s: any) => s?.chat?.nodes)
  const hasMore = useSession((s: any) => s?.hasMore)
  const loadingOlder = useSession((s: any) => s?.loadingOlder)
  const subagent = useSession((s: any) => s?.subagent)

  const address: SubagentAddress | undefined = subagent?.address
  const addressKey = address
    ? `subagent:${address.parentSessionId}:${address.childSessionId}:${address.mode}`
    : 'session'

  const [historyEntries, setHistoryEntries] = useState<HistoryEntry[]>([])
  const [view, setView] = useState({ scrollTop: 0, left: 0, height: window.innerHeight, viewport: window.innerHeight })
  const [offsets, setOffsets] = useState<Record<string, number>>({})
  const [hoveredKey, setHoveredKey] = useState<string | null>(null)
  const [tip, setTip] = useState<{ top: number; left: number; label: string } | null>(null)
  const [pendingSeq, setPendingSeq] = useState<number | null>(null)
  const [pinnedId, setPinnedId] = useState<string | null>(null)
  const pinnedIdRef = useRef<string | null>(null)
  const pinnedScrollTopRef = useRef<number | null>(null)
  const suppressUnpinUntilRef = useRef(0)
  const lastFirstSeqRef = useRef<number | null>(null)
  const loadAttemptsRef = useRef(0)
  const windowStartRef = useRef(0)

  const pin = (id: string | null) => {
    pinnedIdRef.current = id
    setPinnedId(id)
    if (id === null) pinnedScrollTopRef.current = null
  }
  const suppressUnpin = (ms = UNPIN_SUPPRESS_MS) => {
    suppressUnpinUntilRef.current = Math.max(suppressUnpinUntilRef.current, performance.now() + ms)
  }

  useEffect(() => {
    if (!api) return
    let cancelled = false
    const acc = new Map<number, HistoryEntry>()
    const publish = () => {
      if (cancelled) return
      const sorted = [...acc.values()].sort((a, b) => a.seq - b.seq)
      setHistoryEntries(
        messageCap !== undefined && sorted.length > messageCap
          ? sorted.slice(sorted.length - messageCap)
          : sorted,
      )
    }
    ;(async () => {
      let beforeSeq: number | undefined
      while (!cancelled) {
        const page = await fetchHistoryPage(api, sessionId, address, beforeSeq)
        if (cancelled) return
        if (!page) break
        for (const item of page.events) {
          const event = item?.event
          if (!isUserMessageEvent(event)) continue
          acc.set(event.seq, { seq: event.seq, label: textOf(event.data) })
        }
        publish()
        if (messageCap !== undefined && acc.size >= messageCap) break
        if (!page.hasMore) break
        const first = page.events[0]?.event
        if (!first || first.seq <= 0) break
        if (beforeSeq !== undefined && first.seq >= beforeSeq) break
        beforeSeq = first.seq
      }
    })()
    return () => { cancelled = true }
  }, [api, sessionId, addressKey, messageCap])

  const entries: Entry[] = useMemo(
    () => mergeRailEntries(historyEntries, order, nodes),
    [historyEntries, order, nodes],
  )

  useEffect(() => {
    if (!navigatorEnabled) return
    const host = hostRef.current
    const sp = scrollportOf(host)
    if (sp === null) {
      const retry = window.setTimeout(() => {
        if (scrollportOf(hostRef.current) !== null) {
          setView(current => ({ ...current }))
        }
      }, 50)
      return () => window.clearTimeout(retry)
    }
    let scheduled = 0
    const measure = () => {
      const rect = sp.getBoundingClientRect()
      const off: Record<string, number> = {}
      for (const e of entries) {
        if (!e.key) continue
        const row = anchorElement(sp, e.key)
        if (row) off[e.key] = rowContentY(row, sp)
      }
      setOffsets(off)
      setView({ scrollTop: sp.scrollTop, left: rect.left, height: window.innerHeight, viewport: rect.height })
    }
    const schedule = () => {
      if (scheduled !== 0) return
      scheduled = requestAnimationFrame(() => {
        scheduled = 0
        measure()
      })
    }
    schedule()
    const onScroll = () => {
      schedule()
      if (pinnedIdRef.current === null) return
      if (performance.now() < suppressUnpinUntilRef.current) {
        pinnedScrollTopRef.current = sp.scrollTop
        return
      }
      const origin = pinnedScrollTopRef.current
      if (origin !== null && Math.abs(sp.scrollTop - origin) < UNPIN_SCROLL_PX) return
      pin(null)
    }
    sp.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', schedule)
    const ro = new ResizeObserver(schedule)
    ro.observe(sp)
    const flow = sp.querySelector('[data-chat-flow]')
    const mo = new MutationObserver(schedule)
    mo.observe(flow ?? sp, { childList: true, subtree: true })
    return () => {
      if (scheduled !== 0) cancelAnimationFrame(scheduled)
      sp.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', schedule)
      ro.disconnect()
      mo.disconnect()
    }
  }, [entries, navigatorEnabled])

  const scrollActiveId = useMemo(() => {
    const top = view.scrollTop
    const line = top + Math.min(120, Math.max(40, view.viewport * 0.25))
    let lastPastLine: string | undefined
    let firstInView: string | undefined
    for (const e of entries) {
      if (!e.key) continue
      const offset = offsets[e.key]
      if (offset === undefined) continue
      if (offset <= line) lastPastLine = e.key
      else if (firstInView === undefined && offset < top + view.viewport) firstInView = e.key
    }
    return lastPastLine ?? firstInView
  }, [entries, offsets, view.scrollTop, view.viewport])

  const activeId = useMemo(() => {
    if (pinnedId !== null) {
      const exists = entries.some(e => e.key === pinnedId || (e.key ?? `seq:${e.seq}`) === pinnedId)
      if (exists) return pinnedId
    }
    return scrollActiveId
  }, [entries, pinnedId, scrollActiveId])

  const jumpToRow = (sp: HTMLElement, row: HTMLElement) => {
    const getTarget = () => Math.max(0, rowContentY(row, sp) - JUMP_MARGIN)
    pinnedScrollTopRef.current = getTarget()
    suppressUnpin(800)
    animateScroll(sp, getTarget)
  }

  const resolveRow = (sp: HTMLElement, entry: Entry): HTMLElement | null => {
    const keyed = entries.filter(item => item.key !== null)
    let idx = keyed.indexOf(entry)
    if (idx < 0) {
      idx = keyed.findIndex(item => (
        (entry.key !== null && item.key === entry.key)
        || (Number.isFinite(entry.seq) && item.seq === entry.seq)
      ))
    }
    const rows = userRowsOf(sp)
    if (idx >= 0 && rows[idx] !== undefined) return rows[idx]
    if (entry.key) return anchorElement(sp, entry.key)
    return null
  }

  const jumpToEntry = (entry: Entry, attempt = 0) => {
    pin(entry.key ?? `seq:${entry.seq}`)
    suppressUnpin()
    if (entry.key) setPendingSeq(null)
    const sp = scrollportOf(hostRef.current)
    if (sp) {
      const row = resolveRow(sp, entry)
      if (row) {
        setPendingSeq(null)
        jumpToRow(sp, row)
        return
      }
    }
    if (entry.key) {
      if (attempt < 8) {
        requestAnimationFrame(() => jumpToEntry(entry, attempt + 1))
        return
      }
      console.warn('[session-navigator] jump: row not found', entry.key)
      return
    }
    setPendingSeq(entry.seq)
  }

  const jumpToKey = (key: string, attempt = 0) => {
    const entry = entries.find(item => item.key === key)
    if (entry) {
      jumpToEntry(entry, attempt)
      return
    }
    pin(key)
    suppressUnpin()
    const sp = scrollportOf(hostRef.current)
    if (!sp) {
      console.warn('[session-navigator] jump: scrollport not found')
      return
    }
    const row = anchorElement(sp, key)
    if (!row) {
      if (attempt < 8) {
        requestAnimationFrame(() => jumpToKey(key, attempt + 1))
        return
      }
      console.warn('[session-navigator] jump: row not found', key)
      return
    }
    jumpToRow(sp, row)
  }

  useEffect(() => {
    pin(null)
    windowStartRef.current = 0
  }, [sessionId, addressKey])

  useEffect(() => {
    if (pendingSeq === null) return
    const loaded = entries.find((e) => e.seq === pendingSeq && e.key !== null)
    if (loaded?.key) {
      setPendingSeq(null)
      const key = loaded.key
      requestAnimationFrame(() => jumpToKey(key))
      return
    }
    if (!hasMore) {
      console.warn('[session-navigator] jump: message not in window and no more history', pendingSeq)
      setPendingSeq(null)
      pin(null)
      return
    }
    if (loadingOlder) return
    if (typeof props.loadOlder !== 'function') {
      console.warn('[session-navigator] jump: loadOlder unavailable')
      setPendingSeq(null)
      pin(null)
      return
    }
    const firstLoadedSeq = entries.find((e) => e.key !== null)?.seq ?? null
    if (firstLoadedSeq !== null && Number.isFinite(firstLoadedSeq) && pendingSeq >= firstLoadedSeq) {
      const inRange = entries.find((e) => e.seq === pendingSeq)
      if (inRange?.key) {
        requestAnimationFrame(() => jumpToKey(inRange.key as string))
        setPendingSeq(null)
        return
      }
      if (inRange) {
        console.warn('[session-navigator] jump: target is not a user node in the loaded window', pendingSeq)
        setPendingSeq(null)
        pin(null)
        return
      }
    }
    if (firstLoadedSeq === lastFirstSeqRef.current) {
      loadAttemptsRef.current += 1
    } else {
      loadAttemptsRef.current = 0
      lastFirstSeqRef.current = firstLoadedSeq
    }
    if (loadAttemptsRef.current > 3) {
      console.warn('[session-navigator] jump: history page did not advance', pendingSeq)
      setPendingSeq(null)
      pin(null)
      return
    }
    const id = window.setTimeout(() => {
      try {
        suppressUnpin(800)
        requestOlderPage(sessionId, props.loadOlder, scrollportOf(hostRef.current))
      } catch (error) {
        console.warn('[session-navigator] jump: loadOlder failed', error)
        setPendingSeq(null)
      }
    }, 0)
    return () => window.clearTimeout(id)
  }, [pendingSeq, entries, hasMore, loadingOlder, props.loadOlder, sessionId])

  const spacing = COMFORT_SPACING
  const hitHeight = spacing + OVERLAP
  const railHeight = Math.max(160, view.height * 0.8)
  const maxTicks = Math.max(1, Math.floor((railHeight - OVERLAP) / COMFORT_SPACING))
  const focusIndex = activeId === undefined || activeId === null
    ? -1
    : entries.findIndex(e => (e.key ?? `seq:${e.seq}`) === activeId)
  const startIndex = railWindowStart({
    length: entries.length,
    maxTicks,
    focusIndex,
    prevStart: windowStartRef.current,
  })
  windowStartRef.current = startIndex
  const visibleEntries = entries.length <= maxTicks
    ? entries
    : entries.slice(startIndex, startIndex + maxTicks)
  const windowed = entries.length > maxTicks

  const hoveredIndex = hoveredKey
    ? visibleEntries.findIndex((e) => (e.key ?? `seq:${e.seq}`) === hoveredKey)
    : -1

  const enter = (event: ReactMouseEvent<HTMLElement>, key: string, label: string) => {
    setHoveredKey(key)
    const rect = event.currentTarget.getBoundingClientRect()
    setTip({ top: rect.top + rect.height / 2, left: rect.right + 10, label })
  }
  const leave = () => {
    setHoveredKey(null)
    setTip(null)
  }

  if (!navigatorEnabled) return null
  ensureRailStyles()

  const canFadeTop = windowed && startIndex > 0
  const canFadeBottom = windowed && startIndex + visibleEntries.length < entries.length

  const rail = (
    <div
      className="dsh-codex-nav-rail"
      style={{
        position: 'fixed',
        top: '50%',
        transform: 'translateY(-50%)',
        left: Math.max(8, view.left + 8),
        zIndex: 60,
        width: LEVEL_WIDTHS[3],
        maxHeight: railHeight,
        overflow: 'hidden',
        isolation: 'isolate',
        pointerEvents: 'none',
      }}
      onMouseLeave={leave}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          overflow: 'hidden',
        }}
      >
        {visibleEntries.map((e, index) => {
          const hoverId = e.key ?? `seq:${e.seq}`
          const active = hoverId === activeId
          const distance = hoveredIndex < 0 ? undefined : Math.abs(index - hoveredIndex)
          const level = distance === undefined ? 0 : distance === 0 ? 3 : distance === 1 ? 2 : distance === 2 ? 1 : 0
          const width = LEVEL_WIDTHS[level]
          const color = active
            ? 'var(--dsw-static-deepseek-500)'
            : distance === 0
              ? 'var(--dsw-alias-label-primary)'
              : 'var(--dsw-alias-label-tertiary)'
          return (
            <button
              key={hoverId}
              type="button"
              aria-label={`Jump to: ${e.label}`}
              onMouseEnter={(ev) => enter(ev, hoverId, e.label)}
              onClick={() => jumpToEntry(e)}
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                width: LEVEL_WIDTHS[3],
                height: hitHeight,
                marginTop: index === 0 ? 0 : -OVERLAP,
                padding: 0,
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                pointerEvents: 'auto',
                zIndex: index + 1,
              }}
            >
              <span
                style={{
                  display: 'block',
                  width,
                  height: 3,
                  borderRadius: 2,
                  background: color,
                  opacity: active || distance === 0 ? 1 : 0.55,
                  transition: 'width .14s ease, background .14s ease',
                }}
              />
            </button>
          )
        })}
      </div>
      {canFadeTop ? <div className="dsh-codex-nav-fade dsh-codex-nav-fade-top" aria-hidden="true" /> : null}
      {canFadeBottom ? <div className="dsh-codex-nav-fade dsh-codex-nav-fade-bottom" aria-hidden="true" /> : null}
    </div>
  )

  return (
    <>
      <span ref={hostRef} style={{ display: 'none' }} aria-hidden="true" />
      {createPortal(rail, document.body)}
      {tip &&
        createPortal(
          <div
            style={{
              position: 'fixed',
              top: tip.top,
              left: tip.left,
              transform: 'translateY(-50%)',
              whiteSpace: 'nowrap',
              maxWidth: 320,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              background: 'var(--dsw-alias-bg-base)',
              border: '1px solid var(--dsw-alias-border-l2)',
              borderRadius: 8,
              padding: '6px 10px',
              fontSize: 12,
              color: 'var(--dsw-alias-label-primary)',
              boxShadow: 'var(--dsw-shadow-lv2)',
              pointerEvents: 'none',
              zIndex: 61,
            }}
          >
            {tip.label}
          </div>,
          document.body,
        )}
    </>
  )
}