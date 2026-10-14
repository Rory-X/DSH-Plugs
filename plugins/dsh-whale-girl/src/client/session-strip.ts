import type { DshDesktopOverlays } from './bridge.ts'
import { createDshIcon } from '@just-genius/dsh-plugin-ui/icons-dom'
import type { SessionView } from '../shared/sessions.ts'
import { petPanelVisibility, type PetPanelPreferenceStore } from '../shared/panel-preferences.ts'
import { requestPetNavigation } from '../shared/session-navigation.ts'
import { CONTRIBUTOR, OVERLAY_ID } from '../shared/config.ts'
import { createRefreshQueue } from '../shared/refresh-queue.ts'
import {
  elapsedLabel, readSessionStripContext, readSessionViews, sessionStripLayout, sessionStripOverview,
  type SessionStripContext, type SessionStripRow,
} from '../shared/session-strip.ts'

function element<T extends HTMLElement>(id: string): T { return document.getElementById(id) as T }

export function createSessionStrip(options: {
  api: () => DshDesktopOverlays | undefined
  load: () => Promise<unknown>
  preferences: PetPanelPreferenceStore
  isDragging: () => boolean
  onLayout: () => void
  onInspect: (inspecting: boolean) => void
  notice: (message: string) => void
}) {
  const card = element<HTMLElement>('session-strip')
  const status = element<HTMLElement>('session-status')
  const timer = element<HTMLElement>('session-time')
  const count = element<HTMLButtonElement>('session-count')
  const countLabel = element<HTMLElement>('session-count-label')
  const toggle = element<HTMLButtonElement>('session-toggle')
  const collapse = element<HTMLButtonElement>('session-collapse')
  const openIcon = element<HTMLButtonElement>('session-open-icon')
  const open = element<HTMLButtonElement>('session-open')
  const title = element<HTMLElement>('session-title')
  const preview = element<HTMLElement>('session-preview')
  const list = element<HTMLElement>('session-list')
  const controls = element<HTMLElement>('pet-controls')
  const dock = element<HTMLButtonElement>('pet-dock')
  const stats = element<HTMLElement>('xp')
  toggle.append(createDshIcon('IconSideChatColor16', 14))
  collapse.append(createDshIcon('IconCloseOutline16', 12))
  count.append(createDshIcon('IconChevronDownOutline14', 10))
  openIcon.append(createDshIcon('IconOpenInWindowOutline16', 12))
  let views: SessionView[] = []
  let context: SessionStripContext = { pending: [] }
  let selectedId: string | undefined
  let expanded = false
  const hovered = new Set<HTMLElement>()
  const inspectEvents = new AbortController()
  let lastInspecting: boolean | undefined
  let offline = false
  let disposed = false
  let layoutKey = ''
  let orderKey = ''
  let current = sessionStripOverview(views, context, selectedId, Date.now())
  let layout = sessionStripLayout({ x: 0, y: 0 }, { x: 0, y: 0, width: 1920, height: 1080 }, false, 0, false)
  const rowElements = new Map<string, {
    root: HTMLElement; choose: HTMLButtonElement; title: HTMLElement; branch: SVGSVGElement; preview: HTMLElement; meta: HTMLElement; open: HTMLButtonElement
  }>()

  const applyLayout = () => {
    document.documentElement.style.setProperty('--pet-x', `${layout.petX}px`)
    document.documentElement.style.setProperty('--pet-y', `${layout.petY}px`)
    document.documentElement.style.setProperty('--pet-panel-x', `${layout.panelX}px`)
    document.documentElement.style.setProperty('--pet-panel-width', `${layout.panelWidth}px`)
    document.body.classList.toggle('has-sessions', petPanelVisibility(options.preferences.getSnapshot()).sessions)
    card.style.left = `${layout.panelX}px`
    card.style.top = `${layout.panelY}px`
    card.style.width = `${layout.panelWidth}px`
    list.style.left = `${layout.panelX}px`
    list.style.top = `${layout.listY}px`
    list.style.width = `${layout.panelWidth}px`
    list.style.height = `${layout.listHeight}px`
    options.onLayout()
  }
  const layoutRequests = createRefreshQueue(async () => {
    if (disposed || options.isDragging()) return
    const api = options.api()
    const info = api?.update ? (await api.list()).find(row => row.id === OVERLAY_ID) : undefined
    if (disposed || options.isDragging()) return
    const display = window.screen as Screen & { availLeft?: number; availTop?: number }
    const area = info?.workArea ?? (info
      ? { x: display.availLeft ?? 0, y: display.availTop ?? 0, width: display.availWidth, height: display.availHeight }
      : { x: 0, y: 0, width: Math.max(window.innerWidth, 176), height: Math.max(window.innerHeight, 220) })
    const anchor = info ? { x: info.bounds.x + layout.petX, y: info.bounds.y + layout.petY } : { x: 0, y: 0 }
    const visible = petPanelVisibility(options.preferences.getSnapshot())
    const next = sessionStripLayout(anchor, area, visible.sessions, current.rows.length, expanded, visible.stats, visible.controls)
    if (info && api?.update && Object.keys(next.bounds).some(key => next.bounds[key as keyof typeof next.bounds] !== info.bounds[key as keyof typeof info.bounds])) {
      await api.update(OVERLAY_ID, { bounds: next.bounds })
    }
    if (disposed) return
    layout = next
    applyLayout()
  }, () => { layoutKey = '' })

  const reveal = async (row: SessionStripRow | undefined) => {
    const api = options.api()
    if (!api?.postMessage) { options.notice('请在 DSH-Desktop 中打开主窗口。'); return }
    try {
      const delivered = await requestPetNavigation((message, settings) => api.postMessage!(OVERLAY_ID, message, settings), row)
      if (!delivered) options.notice('主窗口暂时无法连接，请稍后重试。')
      else if (expanded) { expanded = false; render() }
    } catch { options.notice('DSH 暂时无法打开，请稍后重试。') }
  }

  const isInspecting = () => {
    const visible = petPanelVisibility(options.preferences.getSnapshot())
    const targets = [dock, ...(visible.controls ? [controls] : []),
      ...(visible.sessions ? [card, ...(expanded ? [list] : [])] : []), ...(visible.stats ? [stats] : [])]
    return visible.sessions && expanded || targets.some(target => hovered.has(target)
      || document.hasFocus() && target.contains(document.activeElement))
  }
  const updateInspecting = () => {
    const inspecting = isInspecting()
    if (inspecting !== lastInspecting) { lastInspecting = inspecting; options.onInspect(inspecting) }
  }
  const render = () => {
    if (disposed) return
    const now = Date.now()
    current = sessionStripOverview(views, context, selectedId, now)
    selectedId = current.selected?.id
    const visible = petPanelVisibility(options.preferences.getSnapshot())
    if (!visible.sessions || current.rows.length <= 1) expanded = false
    controls.hidden = !visible.controls
    card.hidden = !visible.sessions
    list.hidden = !visible.sessions || !expanded || current.rows.length <= 1
    for (const target of [controls, card, list, stats]) if (target.hidden) hovered.delete(target)
    if (!visible.stats) hovered.delete(stats)
    toggle.dataset.status = offline ? 'offline' : current.waitingCount ? 'waiting' : current.activeCount ? 'running' : 'idle'
    dock.dataset.status = toggle.dataset.status
    const toggleLabel = `${visible.sessions ? '收起' : '展开'}会话：${current.activeCount} 项进行中，${current.waitingCount} 项等待处理${offline ? '；连接恢复中' : ''}`
    toggle.title = toggleLabel
    toggle.setAttribute('aria-label', toggleLabel)
    toggle.setAttribute('aria-expanded', String(visible.sessions))
    count.disabled = current.rows.length <= 1
    count.classList.toggle('attention', current.waitingCount > 0)
    count.setAttribute('aria-expanded', String(expanded))
    count.setAttribute('aria-label', `${current.activeCount} 项进行中，${current.waitingCount} 项等待处理；${expanded ? '收起' : '展开'}会话列表`)
    const navigationLabel = current.selected ? `在 DSH 中查看：${current.selected.title}` : '打开 DSH 主界面'
    openIcon.title = navigationLabel
    openIcon.setAttribute('aria-label', navigationLabel)
    if (current.selected) {
      const row = current.selected
      card.dataset.status = offline ? 'offline' : row.status
      const statusText = offline ? '连接恢复中' : row.label
      if (status.textContent !== statusText) status.textContent = statusText
      timer.textContent = row.status === 'running' || row.status === 'waiting' ? elapsedLabel(row.startedAt, now) : ''
      countLabel.textContent = current.activeCount > 0
        ? `${current.rootCount} 会话${current.waitingCount ? ` · ${current.waitingCount} 待处理` : current.childActiveCount ? ` · ${current.childActiveCount} 子任务` : ''}`
        : '最近完成'
      title.textContent = row.title
      preview.textContent = row.preview
      open.title = `${row.title}\n${row.preview}`
      open.setAttribute('aria-label', `在主窗口查看：${row.title}`)
    } else {
      card.dataset.status = offline ? 'offline' : 'idle'
      status.textContent = offline ? '连接恢复中' : '暂无会话'
      timer.textContent = ''
      countLabel.textContent = '0 会话'
      title.textContent = '暂时没有进行中的会话'
      preview.textContent = offline ? '连接恢复中，点击仍可返回 DSH。' : '点击返回 DSH，继续或开始新的会话。'
      open.title = navigationLabel
      open.setAttribute('aria-label', navigationLabel)
    }
    for (const row of current.rows) {
      let nodes = rowElements.get(row.id)
      if (!nodes) {
        const root = document.createElement('div')
        root.className = 'session-row'
        const choose = document.createElement('button')
        choose.type = 'button'
        choose.className = 'session-choose'
        const heading = document.createElement('span')
        heading.className = 'session-row-title'
        const headingLine = document.createElement('span')
        headingLine.className = 'session-row-heading'
        const branch = createDshIcon('IconTreeCorner8x10', 10)
        branch.classList.add('session-tree-icon')
        headingLine.append(branch, heading)
        const body = document.createElement('span')
        body.className = 'session-row-preview'
        const meta = document.createElement('span')
        meta.className = 'session-row-meta'
        choose.append(headingLine, body, meta)
        choose.addEventListener('click', () => { selectedId = row.id; render() })
        const jump = document.createElement('button')
        jump.type = 'button'
        jump.className = 'session-jump'
        jump.append(createDshIcon('IconOpenInWindowOutline16', 12))
        jump.addEventListener('click', () => { void reveal(current.rows.find(item => item.id === row.id)) })
        root.append(choose, jump)
        nodes = { root, choose, title: heading, branch, preview: body, meta, open: jump }
        rowElements.set(row.id, nodes)
      }
      nodes.root.dataset.status = row.status
      nodes.root.classList.toggle('selected', row.id === selectedId)
      nodes.root.style.setProperty('--depth', String(Math.min(row.depth, 3)))
      nodes.branch.style.display = row.depth ? '' : 'none'
      nodes.title.textContent = `${row.title}${row.childCount ? ` · ${row.childCount} 子任务` : ''}`
      nodes.preview.textContent = row.preview
      nodes.meta.textContent = [row.label, row.workspace, row.status === 'running' || row.status === 'waiting' ? elapsedLabel(row.startedAt, now) : ''].filter(Boolean).join(' · ')
      nodes.choose.setAttribute('aria-pressed', String(row.id === selectedId))
      nodes.choose.title = row.preview
      nodes.open.setAttribute('aria-label', `在主窗口查看：${row.title}`)
    }
    const ids = new Set(current.rows.map(row => row.id))
    for (const [id, node] of rowElements) if (!ids.has(id)) { node.root.remove(); rowElements.delete(id) }
    const nextOrder = current.rows.map(row => row.id).join('\n')
    if (nextOrder !== orderKey) {
      const focused = list.contains(document.activeElement) ? document.activeElement as HTMLElement : undefined
      list.replaceChildren(...current.rows.map(row => rowElements.get(row.id)!.root))
      if (focused?.isConnected) focused.focus({ preventScroll: true })
      orderKey = nextOrder
    }
    const nextLayout = `${visible.controls}:${visible.sessions}:${visible.stats}:${expanded}:${expanded ? Math.min(4, current.rows.length) : 0}`
    if (nextLayout !== layoutKey) {
      layoutKey = nextLayout
      void layoutRequests.request()
    }
    updateInspecting()
  }

  const refresh = createRefreshQueue(async () => {
    const result = readSessionViews(await options.load())
    if (result === null) throw new Error('invalid session snapshot')
    if (disposed) return
    views = result
    offline = false
    render()
  }, () => { offline = true; render() })
  const offMessage = options.api()?.onMessage?.(event => {
    if (event.contributor !== CONTRIBUTOR || event.id !== OVERLAY_ID) return
    if (event.payload === null || typeof event.payload !== 'object') return
    const payload = event.payload as Record<string, unknown>
    if (payload.type === 'session-context') {
      const next = readSessionStripContext(payload.context)
      if (next) { context = next; render() }
    } else if (payload.type === 'session-notice' && typeof payload.message === 'string') options.notice(payload.message)
  })
  open.addEventListener('click', () => { void reveal(current.selected) })
  openIcon.addEventListener('click', () => { void reveal(current.selected) })
  count.addEventListener('click', () => { expanded = !expanded; render() })
  toggle.addEventListener('click', () => { options.preferences.toggle('sessionsExpanded') })
  collapse.addEventListener('click', () => {
    options.preferences.set('sessionsExpanded', false)
    toggle.focus()
  })
  for (const container of [card, list, controls, dock, stats]) {
    container.addEventListener('pointerenter', () => { hovered.add(container); updateInspecting() }, { signal: inspectEvents.signal })
    container.addEventListener('pointerleave', () => { hovered.delete(container); updateInspecting() }, { signal: inspectEvents.signal })
    container.addEventListener('focusin', updateInspecting, { signal: inspectEvents.signal })
    container.addEventListener('focusout', () => queueMicrotask(() => { if (!disposed) updateInspecting() }), { signal: inspectEvents.signal })
  }
  window.addEventListener('blur', () => { hovered.clear(); updateInspecting() }, { signal: inspectEvents.signal })
  window.addEventListener('focus', updateInspecting, { signal: inspectEvents.signal })
  const keydown = (event: KeyboardEvent) => {
    if (event.key !== 'Escape' || !petPanelVisibility(options.preferences.getSnapshot()).sessions) return
    if (expanded) { expanded = false; render(); count.focus() }
    else { options.preferences.set('sessionsExpanded', false); toggle.focus() }
  }
  window.addEventListener('keydown', keydown)
  const offPreferences = options.preferences.subscribe(render)
  const tick = setInterval(render, 1000)
  render()
  void options.api()?.postMessage?.(OVERLAY_ID, { type: 'sessions-ready' }).catch(() => {})
  return {
    refresh: refresh.request,
    get activeCount() { return current.activeCount },
    get waitingCount() { return current.waitingCount },
    get inspecting() { return isInspecting() },
    settleLayout() { layoutKey = ''; render() },
    dispose() {
      disposed = true
      clearInterval(tick)
      offMessage?.()
      offPreferences()
      inspectEvents.abort()
      refresh.dispose()
      layoutRequests.dispose()
      window.removeEventListener('keydown', keydown)
    },
  }
}
