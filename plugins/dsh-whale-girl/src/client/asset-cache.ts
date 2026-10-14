/** Deduplicate sprite loads and retry failures instead of caching a blank forever. */
export function createAssetCache<T>(
  load: (key: string) => Promise<T>,
  options: { now?: () => number; retryMs?: number; onError?: (key: string, error: unknown) => void } = {},
) {
  const values = new Map<string, T>()
  const pending = new Map<string, Promise<T | null>>()
  const retryAt = new Map<string, number>()
  const now = options.now ?? Date.now
  return {
    get: (key: string) => values.get(key),
    has: (key: string) => values.has(key),
    load(key: string): Promise<T | null> {
      if (values.has(key)) return Promise.resolve(values.get(key)!)
      const inflight = pending.get(key)
      if (inflight !== undefined) return inflight
      if ((retryAt.get(key) ?? 0) > now()) return Promise.resolve(null)
      const request = Promise.resolve().then(() => load(key)).then(value => {
        values.set(key, value)
        retryAt.delete(key)
        return value
      }).catch(error => {
        retryAt.set(key, now() + (options.retryMs ?? 2000))
        options.onError?.(key, error)
        return null
      }).finally(() => { pending.delete(key) })
      pending.set(key, request)
      return request
    },
  }
}

/** A failed initial fetch must not permanently prevent the animation loop starting. */
export function startRecoverableInitialization(
  initialize: () => Promise<void>,
  onError: (error: unknown) => void,
  retryMs = 3000,
): () => void {
  let stopped = false
  let timer: ReturnType<typeof setTimeout> | undefined
  const run = async () => {
    try { await initialize() } catch (error) {
      if (stopped) return
      onError(error)
      timer = setTimeout(() => { void run() }, retryMs)
    }
  }
  void run()
  return () => { stopped = true; clearTimeout(timer) }
}
