/** Coalesce live notifications and serialize reads so an old response cannot replace a newer snapshot. */
export function createRefreshQueue(run: () => Promise<void>, onError: (error: unknown) => void = () => {}) {
  let pending = false
  let disposed = false
  let running: Promise<void> | undefined
  const request = (): Promise<void> => {
    if (disposed) return Promise.resolve()
    pending = true
    if (!running) {
      running = Promise.resolve().then(async () => {
        while (pending && !disposed) {
          pending = false
          try { await run() } catch (error) { onError(error) }
        }
      }).finally(() => {
        running = undefined
        if (pending && !disposed) void request()
      })
    }
    return running
  }
  return { request, dispose() { disposed = true; pending = false } }
}
