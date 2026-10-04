//#region src/wake-policy.ts
/**
* When the Leader should be woken after a child settles.
*
* Dispatch is gated: the Host starts at most a concurrency-sized slot, then
* waits. Every settlement is a review point — the Leader inspects the result
* and calls `flow.next` (or patches) before anything else runs.
*/
function shouldWakeLeader(_input) {
	return true;
}
//#endregion
export { shouldWakeLeader };
