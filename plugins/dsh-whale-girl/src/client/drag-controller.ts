export interface DragPoint { x: number; y: number }

/** Older desktop shells get one pending move, replaced by the latest target. */
export function createLatestMoveQueue(
  send: (point: DragPoint) => Promise<unknown>,
  onError: (error: unknown) => void = () => {},
) {
  let pending: DragPoint | undefined
  let running: Promise<void> | undefined
  const pump = () => {
    if (running) return
    running = Promise.resolve().then(async () => {
      while (pending) {
        const point = pending
        pending = undefined
        try { await send(point) } catch (error) { onError(error) }
      }
    }).finally(() => {
      running = undefined
      if (pending) pump()
    })
  }
  return {
    push(point: DragPoint) { pending = { ...point }; pump() },
    clear() { pending = undefined },
    idle: () => running ?? Promise.resolve(),
  }
}

/** Gesture math is independent of the canvas and of asynchronous IPC replies. */
export function createDragController(options: {
  move: (point: DragPoint) => void
  start: () => void
  finish: (cancelled: boolean) => void
  click: () => void
  threshold?: number
}) {
  let state: { cursor: DragPoint; origin: DragPoint; dragged: boolean } | undefined
  const update = (point: DragPoint) => {
    if (!state) return
    const dx = point.x - state.cursor.x
    const dy = point.y - state.cursor.y
    if (!Number.isFinite(dx) || !Number.isFinite(dy)) return
    if (!state.dragged) {
      if (Math.hypot(dx, dy) < (options.threshold ?? 3)) return
      state.dragged = true
      options.start()
    }
    options.move({ x: Math.round(state.origin.x + dx), y: Math.round(state.origin.y + dy) })
  }
  const cancel = () => {
    if (!state) return
    state = undefined
    options.finish(true)
  }
  return {
    begin(cursor: DragPoint, origin: DragPoint) {
      cancel()
      state = { cursor: { ...cursor }, origin: { ...origin }, dragged: false }
    },
    update,
    end(point: DragPoint) {
      if (!state) return
      update(point)
      const dragged = state.dragged
      state = undefined
      options.finish(false)
      if (!dragged) options.click()
    },
    cancel,
  }
}
