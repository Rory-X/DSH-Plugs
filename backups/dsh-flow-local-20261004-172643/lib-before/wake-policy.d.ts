//#region src/wake-policy.d.ts
/**
 * When the Leader should be woken after a child settles.
 *
 * Dispatch is gated: the Host starts at most a concurrency-sized slot, then
 * waits. Every settlement is a review point — the Leader inspects the result
 * and calls `flow.next` (or patches) before anything else runs.
 */
declare function shouldWakeLeader(_input: {
  readonly newlyFailed: boolean;
  readonly remaining: number;
  readonly running: number;
}): boolean;
//#endregion
export { shouldWakeLeader };