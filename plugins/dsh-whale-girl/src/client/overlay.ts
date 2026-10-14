import { DEFAULTS, HEARTBEAT_MS, OVERLAY_ID, type WhaleGirlConfig } from '../shared/config.ts'
import {
  ASSETS_PATH,
  CONFIG_PATH,
  EVENTS_PATH,
  INTERACT_PATH,
  PRESENCE_PATH,
  SESSIONS_PATH,
  STATE_PATH,
} from '../shared/routes.ts'
import { JOY_MS, TRANSIENT_MS, WAKE_MS, getCharacter, nextBlinkAt, nextFacingAt, nextWorkingRhythm, pickState, stateOf, wakeFromInteraction, type Character, type StateAnim } from '../shared/logic.ts'
import { titleDef, titleDescription, titleIcon, titleName, xpFillAsset, xpProgress } from '../shared/pet-state.ts'
import { bridge } from './bridge.ts'
import { createAssetCache, startRecoverableInitialization } from './asset-cache.ts'
import { createDragController, createLatestMoveQueue } from './drag-controller.ts'
import { createSessionStrip } from './session-strip.ts'
import { createDshIcon } from '@just-genius/dsh-plugin-ui/icons-dom'
import { createPetPanelPreferences, petPanelVisibility, PET_PANEL_PREFERENCES_KEY } from '../shared/panel-preferences.ts'
import { createPetPanelDock } from './panel-dock.ts'

interface Snapshot {
  pet?: { level?: number; xp?: number; stats?: { tasksDone?: number }; titles?: string[] }
  activity?: { name: string; until: number; sessionThink?: boolean; sessionWait?: boolean; turnCompletedUntil?: number }
  configRevision?: number
}

const OVERLAY = OVERLAY_ID
const overlays = () => bridge()?.overlays

async function postJson(path: string, body: unknown): Promise<unknown> {
  const res = await fetch(path, {
    method: 'POST',
    signal: AbortSignal.timeout(5000),
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`${path} ${res.status}`)
  return res.json()
}

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(path, { cache: 'no-store', signal: AbortSignal.timeout(5000) })
  if (!res.ok) throw new Error(`${path} ${res.status}`)
  return res.json() as Promise<T>
}

function rand(min: number, max: number): number {
  return min + Math.random() * (max - min)
}

const canvas = document.getElementById('pet') as HTMLCanvasElement
const bubble = document.getElementById('bubble') as HTMLElement
const xpRoot = document.getElementById('xp') as HTMLElement
const xpLv = document.getElementById('xp-lv') as HTMLElement
const xpTrack = document.getElementById('xp-track') as HTMLElement
const xpFill = document.getElementById('xp-fill') as HTMLElement
const xpVal = document.getElementById('xp-val') as HTMLElement
const xpNote = document.getElementById('xp-note') as HTMLElement
const xpBadges = document.getElementById('xp-badges') as HTMLElement
const xpTip = document.getElementById('xp-tip') as HTMLElement
const xpToggle = document.getElementById('xp-toggle') as HTMLButtonElement
const panelPreferences = createPetPanelPreferences(() => localStorage)
xpToggle.append(createDshIcon('IconSparkle16', 14))
xpToggle.addEventListener('click', () => panelPreferences.toggle('statsExpanded'))
const panelDock = createPetPanelDock(panelPreferences, 'pet-controls session-strip session-list xp')
panelDock.element.id = 'pet-dock'
panelDock.element.style.cssText = 'position:fixed;left:calc(var(--pet-x, 0px) + 56px);top:calc(var(--pet-y, 0px) + 198px);'
document.getElementById('pet-controls')!.before(panelDock.element)
const maybeCtx = canvas.getContext('2d')
if (maybeCtx === null) throw new Error('no canvas')
const ctx: CanvasRenderingContext2D = maybeCtx

let renderedTitleKey = ''
let badgeTipHideTimer: ReturnType<typeof setTimeout> | null = null

function showBadgeTip(id: string, anchor: HTMLElement): void {
  if (badgeTipHideTimer !== null) {
    clearTimeout(badgeTipHideTimer)
    badgeTipHideTimer = null
  }
  const def = titleDef(id)
  const name = def?.name ?? titleName(id)
  const desc = def?.description ?? titleDescription(id)
  xpTip.innerHTML = desc
    ? `<span>${name}</span><span class="xp-tip-desc">${desc}</span>`
    : `<span>${name}</span>`
  xpTip.classList.add('show')
  const r = anchor.getBoundingClientRect()
  const tipW = xpTip.offsetWidth || 160
  const tipH = xpTip.offsetHeight || 56
  let left = r.left + r.width / 2 - tipW / 2
  let top = r.top - tipH - 8
  if (top < 8) top = r.bottom + 8
  left = Math.max(8, Math.min(left, window.innerWidth - tipW - 8))
  xpTip.style.left = `${Math.round(left)}px`
  xpTip.style.top = `${Math.round(top)}px`
}

function hideBadgeTip(): void {
  if (badgeTipHideTimer !== null) clearTimeout(badgeTipHideTimer)
  badgeTipHideTimer = setTimeout(() => {
    xpTip.classList.remove('show')
    xpTip.textContent = ''
    badgeTipHideTimer = null
  }, 80)
}

function renderTitleBadges(ids: string[] | undefined): void {
  const list = Array.isArray(ids) ? ids.filter((id) => typeof id === 'string' && titleDef(id)) : []
  const key = list.join(',')
  if (key === renderedTitleKey) return
  renderedTitleKey = key
  xpBadges.replaceChildren()
  hideBadgeTip()
  xpTip.classList.remove('show')
  if (list.length === 0) {
    xpBadges.classList.remove('show')
    return
  }
  xpBadges.classList.add('show')
  for (const id of list) {
    const btn = document.createElement('button')
    btn.type = 'button'
    btn.className = 'xp-badge'
    const name = titleName(id)
    const desc = titleDescription(id)
    btn.setAttribute('aria-label', desc ? `${name} · ${desc}` : name)
    const img = document.createElement('img')
    img.src = `${ASSETS_PATH}/hud/${titleIcon(id)}`
    img.alt = ''
    img.draggable = false
    btn.appendChild(img)
    btn.addEventListener('mouseenter', () => showBadgeTip(id, btn))
    btn.addEventListener('mouseleave', hideBadgeTip)
    btn.addEventListener('focus', () => showBadgeTip(id, btn))
    btn.addEventListener('blur', hideBadgeTip)
    xpBadges.appendChild(btn)
  }
}

let manifest: unknown = null
let character: Character | null = null
let characterId = 'whale-girl'
interface SpriteSheet { img: HTMLImageElement; w: number; h: number; rendered?: boolean }
const sheetCache = createAssetCache<SpriteSheet>(async key => {
  const response = await fetch(`${ASSETS_PATH}/characters/${key}`, { signal: AbortSignal.timeout(5000) })
  if (!response.ok) throw new Error(`sprite request failed (${response.status}): ${key}`)
  const url = URL.createObjectURL(await response.blob())
  try {
    const img = new Image()
    img.src = url
    await img.decode()
    if (img.naturalWidth === 0 || img.naturalHeight === 0) throw new Error(`empty sprite: ${key}`)
    return { img, w: img.naturalWidth, h: img.naturalHeight }
  } finally {
    URL.revokeObjectURL(url)
  }
}, { onError: (key, error) => console.warn('[whale-girl] sprite load failed', key, error) })
let animState = 'idle'
let frame = 0
let frameDir = 1
let lastFrameAt = 0
let blinkActive = false
let blinkAt = 0
let flip = 1
let facingAt = 0
let snapshot: Snapshot | null = null
let bubbleTimer: ReturnType<typeof setTimeout> | null = null
let config: WhaleGirlConfig = { ...DEFAULTS, walk: { ...DEFAULTS.walk }, replies: { feed: [...DEFAULTS.replies.feed], play: [...DEFAULTS.replies.play] } }
let lastConfigRevision = -1

const sched = {
  sleepAfterMs: config.sleepAfterMs,
  idleSince: 0,
  sleeping: false,
  joyUntil: 0,
  transient: null as string | null,
  transientUntil: 0,
  walking: false,
  nextWalkAt: 0,
  working: { active: false, until: 0 },
}

function applySize(size = config.size): void {
  // Assigning canvas dimensions clears its pixels, even when the value is unchanged.
  if (canvas.width !== size || canvas.height !== size) {
    canvas.width = size
    canvas.height = size
  }
  canvas.style.width = `${size}px`
  canvas.style.height = `${size}px`
  canvas.style.opacity = String(config.opacity)
  ctx.imageSmoothingEnabled = false
  drawFrame()
  void reportHitarea()
}

function sheetKey(sheet: string): string {
  return `${characterId}/${sheet}`
}

function framesOf(cfg: StateAnim): number {
  return typeof cfg.frames === 'number' && cfg.frames > 0 ? Math.floor(cfg.frames) : 1
}

async function ensureSheet(cfg: StateAnim): Promise<{ img: HTMLImageElement; w: number; h: number } | null> {
  return sheetCache.load(sheetKey(cfg.sheet))
}

function drawPlaceholder(): void {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.save()
  ctx.translate(canvas.width / 2, canvas.height / 2)
  ctx.font = `${Math.floor(canvas.width * 0.4)}px system-ui`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('🐳', 0, 0)
  ctx.restore()
}

function drawFrame(): void {
  const cfg = stateOf(character, animState)
  if (!cfg) return drawPlaceholder()
  const entry = sheetCache.get(sheetKey(cfg.sheet))
  if (!entry) return drawPlaceholder()
  const frameW = Math.floor(entry.w / framesOf(cfg))
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.save()
  ctx.translate(canvas.width / 2, canvas.height / 2)
  ctx.scale(flip, 1)
  ctx.drawImage(entry.img, frame * frameW, 0, frameW, entry.h, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height)
  ctx.restore()
  entry.rendered = true
}

async function switchAnim(name: string): Promise<void> {
  if (name === animState) {
    const cfg = stateOf(character, name)
    if (cfg && !sheetCache.has(sheetKey(cfg.sheet))) {
      await ensureSheet(cfg)
      drawFrame()
      void reportHitarea()
    }
    return
  }
  animState = name
  frame = 0
  frameDir = 1
  blinkActive = false
  blinkAt = 0
  lastFrameAt = 0
  if (name === 'walk') {
    walkDir = Math.random() < 0.5 ? 1 : -1
    flip = -walkDir
  }
  applySize()
  const cfg = stateOf(character, name)
  if (!cfg) { drawPlaceholder(); return }
  await ensureSheet(cfg)
  drawFrame()
  void reportHitarea()
}

async function reportHitarea(): Promise<void> {
  const api = overlays()
  if (!api) return
  try {
    // A loading/empty animation frame must not disable mouse input for the
    // entire widget. The canvas remains the stable drag and interaction target.
    await api.setIgnoreMouseEvents(OVERLAY, false)
    if (api.setDragRegions && api.onDrag && api.cancelDrag) {
      const { x, y, width, height } = canvas.getBoundingClientRect()
      await api.setDragRegions(OVERLAY, [{ x, y, width, height }])
      nativeDragReady = true
    }
  } catch (error) {
    console.warn('[whale-girl] pointer region update failed', error)
  }
}

function tickFrame(now: number): void {
  const cfg = stateOf(character, animState)
  if (!cfg || !cfg.sheet || !(cfg.frames > 1)) return
  const step = () => {
    const entry = sheetCache.get(sheetKey(cfg.sheet))
    if (!entry) return
    const frames = framesOf(cfg)
    const frameW = Math.floor(entry.w / frames)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.save()
    ctx.translate(canvas.width / 2, canvas.height / 2)
    ctx.scale(flip, 1)
    ctx.drawImage(entry.img, frame * frameW, 0, frameW, entry.h, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height)
    ctx.restore()
  }
  if (cfg.playback === 'blink') {
    if (blinkActive) {
      if (now - lastFrameAt >= 1000 / cfg.fps) {
        lastFrameAt = now
        frame += 1
        if (frame >= cfg.frames) { frame = 0; blinkActive = false; blinkAt = nextBlinkAt({ now }) }
        step()
      }
    } else {
      if (frame !== 0) { frame = 0; step() }
      if (blinkAt === 0) blinkAt = nextBlinkAt({ now })
      if (now >= blinkAt) blinkActive = true
    }
    return
  }
  if (now - lastFrameAt >= 1000 / (cfg.fps || 2)) {
    lastFrameAt = now
    frame += frameDir
    if (cfg.playback === 'pingpong') {
      if (frame >= cfg.frames - 1 || frame <= 0) frameDir *= -1
      frame = Math.max(0, Math.min(cfg.frames - 1, frame))
    } else if (frame >= cfg.frames) {
      if (cfg.playback === 'loop') frame = 0
      else frame = cfg.frames - 1
    }
    step()
  } else if (!sheetCache.get(sheetKey(cfg.sheet))?.rendered) {
    step()
  }
}

function tickFacing(now: number, cfg: StateAnim): void {
  if (animState === 'idle' || animState === 'think' || animState === 'wait') {
    if (facingAt === 0) facingAt = nextFacingAt({ now })
    if (now >= facingAt) {
      flip = -flip
      facingAt = nextFacingAt({ now })
      drawFrame()
    }
  } else if (facingAt !== 0) {
    facingAt = 0
  }
  void cfg
}

let walkDir = 0
let lastWalkStepAt = 0
function loop(now: number): void {
  const cfg = stateOf(character, animState)
  if (cfg) {
    tickFrame(now)
    tickFacing(now, cfg)
  }
  if (!pointerHeld && !sessionStrip?.inspecting && animState === 'walk' && walkDir !== 0 && now - lastWalkStepAt >= 50) {
    lastWalkStepAt = now
    const dx = Math.round(config.walk.speedPxPerSec * 0.05 * walkDir)
    void overlays()?.move(OVERLAY, { dx, dy: 0 }).then((hit) => {
      if (hit.hitEdge) { walkDir = -walkDir; flip = -flip; drawFrame() }
    })
  }
  requestAnimationFrame(loop)
}

function showBubble(text: string): void {
  bubble.textContent = text
  bubble.classList.add('show')
  if (bubbleTimer !== null) clearTimeout(bubbleTimer)
  bubbleTimer = setTimeout(() => bubble.classList.remove('show'), config.bubbleMs)
}

function renderBadge(): void {
  const expanded = petPanelVisibility(panelPreferences.getSnapshot()).stats
  xpToggle.setAttribute('aria-expanded', String(expanded))
  const toggleLabel = `${expanded ? '收起' : '展开'}等级和经验条`
  xpToggle.setAttribute('aria-label', toggleLabel)
  xpToggle.title = toggleLabel
  xpRoot.hidden = !expanded
  xpRoot.classList.toggle('show', expanded)
  if (!expanded) {
    xpTip.classList.remove('show')
    xpTip.textContent = ''
  }
  if (!snapshot) { xpNote.textContent = '状态加载中…'; return }
  const p = snapshot.pet
  const prog = xpProgress(p?.xp ?? 0)
  xpLv.textContent = prog.maxed ? `Lv.${prog.level} MAX` : `Lv.${prog.level}`
  const usable = Math.max(0, (xpTrack.clientWidth || 80) - 4)
  xpFill.style.width = `${Math.round(usable * prog.ratio)}px`
  xpFill.style.backgroundImage = `url(${ASSETS_PATH}/hud/${xpFillAsset(prog.ratio)})`
  xpVal.textContent = prog.maxed ? 'MAX' : `${prog.into} / ${prog.need}`
  const tasks = p?.stats?.tasksDone ?? 0
  const bits: string[] = [`${tasks} 任务`]
  if (snapshot.activity?.sessionThink) bits.push('思考中')
  xpNote.textContent = bits.join(' · ')
  renderTitleBadges(p?.titles)
}

function stepScheduler(now: number): void {
  const act = snapshot?.activity ?? { name: 'idle', until: 0, sessionThink: false, sessionWait: false }
  if (sched.transient !== null && now >= sched.transientUntil) {
    const wasFun = sched.transient === 'eat' || sched.transient === 'play'
    sched.transient = null
    if (wasFun) sched.joyUntil = now + JOY_MS
  }
  const isActive = act.name !== 'idle' || act.until > now || act.sessionThink === true || act.sessionWait === true
    || (sessionStrip?.activeCount ?? 0) > 0
  if (isActive) sched.idleSince = 0
  else if (sched.idleSince === 0) sched.idleSince = now
  sched.sleeping = !isActive && sched.idleSince !== 0 && now - sched.idleSince > sched.sleepAfterMs
  if (act.sessionThink !== true) {
    if (sched.working.active || sched.working.until !== 0) sched.working = { active: false, until: 0 }
  } else if (sched.working.until === 0 || now >= sched.working.until) {
    sched.working = nextWorkingRhythm({ now, sessionThink: true, working: sched.working })
  }
  if (sched.walking) {
    if (now >= sched.nextWalkAt) {
      sched.walking = false
      sched.nextWalkAt = now + rand(config.walk.minWaitMs, config.walk.maxWaitMs)
    }
  } else if (!isActive && !sessionStrip?.inspecting && !sched.sleeping && act.name === 'idle' && config.walk.enabled) {
    if (sched.nextWalkAt === 0) sched.nextWalkAt = now + rand(config.walk.minWaitMs, config.walk.maxWaitMs)
    if (now >= sched.nextWalkAt) {
      sched.walking = true
      sched.nextWalkAt = now + rand(config.walk.minMs, config.walk.maxMs)
    }
  } else {
    sched.nextWalkAt = 0
  }
}

function currentAnim(now = Date.now()): string {
  const act = snapshot?.activity ?? { name: 'idle', until: 0 }
  return pickState({
    activity: { name: act.name, until: act.until },
    dragging,
    walking: sched.walking,
    transient: sched.transient,
    sleeping: sched.sleeping,
    joyUntil: sched.joyUntil,
    now,
    sessionThink: act.sessionThink === true || (sessionStrip?.activeCount ?? 0) > 0,
    sessionWait: act.sessionWait === true || (sessionStrip?.waitingCount ?? 0) > 0,
    workingActive: sched.working.active,
    celebrateUntil: act.turnCompletedUntil ?? 0,
  })
}

async function refresh(): Promise<void> {
  try {
    snapshot = await getJson<Snapshot>(STATE_PATH)
    if (typeof snapshot.configRevision === 'number' && snapshot.configRevision !== lastConfigRevision) {
      lastConfigRevision = snapshot.configRevision
      const body = await getJson<{ config?: WhaleGirlConfig }>(CONFIG_PATH)
      if (body.config) {
        config = body.config
        if (config.enabled === false) {
          void heartbeat(false)
          void overlays()?.close(OVERLAY)
          return
        }
        sched.sleepAfterMs = config.sleepAfterMs
        applySize(config.size)
      }
    }
    renderBadge()
  } catch {
    // keep last snapshot
  }
}

async function interact(action: 'feed' | 'play'): Promise<void> {
  const now = Date.now()
  const woke = wakeFromInteraction({ sleeping: sched.sleeping })
  sched.sleeping = woke.sleeping
  sched.idleSince = now
  sched.transient = action === 'play' ? 'play' : 'eat'
  sched.transientUntil = now + TRANSIENT_MS
  if (woke.wake) {
    sched.transient = 'wake'
    sched.transientUntil = now + WAKE_MS
  }
  try {
    const body = await postJson(INTERACT_PATH, { action }) as { reply?: string }
    if (typeof body.reply === 'string') showBubble(body.reply)
  } catch {
    // local animation still runs
  }
  void switchAnim(currentAnim(now))
}

async function heartbeat(online: boolean): Promise<void> {
  try { await postJson(PRESENCE_PATH, { online }) } catch { /* ignore */ }
}

let dragging = false
let pointerHeld = false
let pointerId: number | undefined
let pointerNative = false
let nativeDragReady = false
let lastPointerX = 0
let sessionStrip: ReturnType<typeof createSessionStrip> | undefined

function releasePointer(): void {
  const id = pointerId
  pointerId = undefined
  if (id !== undefined && canvas.hasPointerCapture(id)) canvas.releasePointerCapture(id)
}

function pressPet(): void {
  pointerHeld = true
  sched.walking = false
  canvas.classList.add('dragging')
}

function startPetDrag(): void {
  dragging = true
  void switchAnim('drag')
}

function finishPetDrag(): void {
  releasePointer()
  pointerHeld = false
  dragging = false
  sched.walking = false
  sched.sleeping = false
  sched.idleSince = Date.now()
  sched.nextWalkAt = Date.now() + rand(config.walk.minWaitMs, config.walk.maxWaitMs)
  canvas.classList.remove('dragging')
  void switchAnim(currentAnim())
  void fallbackMoves.idle().then(() => sessionStrip?.settleLayout())
}

function clickPet(): void {
  const action = sessionStorage.getItem('wg:lastAction') === 'feed' ? 'play' : 'feed'
  sessionStorage.setItem('wg:lastAction', action)
  void interact(action)
}

const fallbackMoves = createLatestMoveQueue(
  point => overlays()?.move(OVERLAY, point) ?? Promise.resolve(),
  error => console.warn('[whale-girl] drag move failed', error),
)
const fallbackDrag = createDragController({
  move: point => fallbackMoves.push(point),
  start: startPetDrag,
  finish: cancelled => { if (cancelled) fallbackMoves.clear(); finishPetDrag() },
  click: clickPet,
})
const offNativeDrag = overlays()?.onDrag?.(event => {
  if (event.id !== OVERLAY) return
  if (event.phase === 'start') {
    nativeDragReady = true
    pointerNative = true
    pressPet()
  }
  else if (event.phase === 'move') startPetDrag()
  else {
    finishPetDrag()
    if (event.phase === 'end' && !event.dragged) clickPet()
  }
})

canvas.addEventListener('pointerdown', e => {
  if (e.button !== 0 || !e.isPrimary || pointerId !== undefined) return
  e.preventDefault()
  pointerId = e.pointerId
  pointerNative = nativeDragReady && e.pointerType === 'mouse'
  lastPointerX = e.screenX
  pressPet()
  try { canvas.setPointerCapture(e.pointerId) } catch { /* window-level release still works */ }
  if (!pointerNative) fallbackDrag.begin({ x: e.screenX, y: e.screenY }, { x: window.screenX, y: window.screenY })
})
window.addEventListener('pointermove', e => {
  if (pointerId !== e.pointerId) return
  if (!pointerNative) fallbackDrag.update({ x: e.screenX, y: e.screenY })
  if (dragging && e.screenX !== lastPointerX) {
    const nextFlip = e.screenX < lastPointerX ? 1 : -1
    if (nextFlip !== flip) { flip = nextFlip; drawFrame() }
  }
  lastPointerX = e.screenX
})
window.addEventListener('pointerup', e => {
  if (pointerId !== e.pointerId) return
  if (pointerNative) releasePointer()
  else fallbackDrag.end({ x: e.screenX, y: e.screenY })
})
function cancelPetDrag(): void {
  if (pointerNative) overlays()?.cancelDrag?.(OVERLAY)
  fallbackDrag.cancel()
  fallbackMoves.clear()
  finishPetDrag()
}
canvas.addEventListener('lostpointercapture', e => { if (pointerId === e.pointerId) cancelPetDrag() })
window.addEventListener('pointercancel', e => { if (pointerId === e.pointerId) cancelPetDrag() })
window.addEventListener('blur', () => { if (pointerHeld) cancelPetDrag() })
window.addEventListener('resize', () => { void reportHitarea() })
window.addEventListener('pagehide', () => {
  overlays()?.cancelDrag?.(OVERLAY)
  offNativeDrag?.()
  fallbackMoves.clear()
  sessionStrip?.dispose()
  offPanelPreferences()
  panelDock.dispose()
  window.removeEventListener('storage', onPanelStorage)
})

sessionStrip = createSessionStrip({
  api: overlays,
  load: () => getJson(SESSIONS_PATH),
  preferences: panelPreferences,
  isDragging: () => pointerHeld || dragging,
  onLayout: () => { void reportHitarea() },
  onInspect: inspecting => {
    sched.walking = false
    if (!inspecting) sched.nextWalkAt = Date.now() + rand(config.walk.minWaitMs, config.walk.maxWaitMs)
  },
  notice: showBubble,
})

const offPanelPreferences = panelPreferences.subscribe(renderBadge)
const onPanelStorage = (event: StorageEvent) => {
  if (event.key === PET_PANEL_PREFERENCES_KEY || event.key === null) panelPreferences.reload()
}
window.addEventListener('storage', onPanelStorage)
renderBadge()

setInterval(() => {
  const now = Date.now()
  stepScheduler(now)
  if (!pointerHeld && !dragging) void switchAnim(currentAnim(now))
}, 250)

drawPlaceholder()
canvas.setAttribute('aria-label', '桌面宠物')
const stopInitialization = startRecoverableInitialization(async () => {
  applySize()
  manifest = await getJson(`${ASSETS_PATH}/manifest.json`)
  const parsed = getCharacter(manifest, (manifest as { default?: string })?.default ?? characterId)
  if (parsed) {
    character = parsed
    characterId = parsed.id
  }
  const initial = stateOf(character, 'idle')
  if (!initial) throw new Error('pet manifest has no idle animation')
  if (!await ensureSheet(initial)) throw new Error('pet sprite is not ready')
  canvas.setAttribute('aria-label', character?.name ?? '桌面宠物')
  await Promise.all([refresh(), sessionStrip?.refresh()])
  if (!config.enabled) return
  await heartbeat(true)
  await switchAnim(currentAnim())
  drawFrame()
  requestAnimationFrame(loop)
  setInterval(() => { void refresh(); void sessionStrip?.refresh() }, config.pollMs)
  setInterval(() => { void heartbeat(true) }, HEARTBEAT_MS)
  try {
    const sse = new EventSource(EVENTS_PATH)
    sse.onmessage = event => {
      let sessionsOnly = false
      try { sessionsOnly = JSON.parse(event.data).type === 'sessions' } catch { /* full refresh */ }
      if (!sessionsOnly) void refresh()
      void sessionStrip?.refresh()
    }
    window.addEventListener('pagehide', () => sse.close())
  } catch { /* poll fallback */ }
  window.addEventListener('pagehide', () => { void heartbeat(false) })
}, error => {
  console.warn('[whale-girl] initialization failed; retrying', error)
  drawPlaceholder()
  showBubble('桌宠暂时加载失败，正在重试…')
})
window.addEventListener('pagehide', stopInitialization)
