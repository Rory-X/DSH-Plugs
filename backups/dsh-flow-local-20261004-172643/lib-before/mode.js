//#region src/mode.ts
/**
* Mode, tools, and the Flow tab all share one key: the conversation session.
*
* `agent.id` is the live Agent, which is not what the canvas posts as
* `sessionId`. Keying on that made `/flow` look on while `flow.plan` and the
* tab still saw the mode as off.
*/
function sessionIdOf(agent) {
	return String(agent.session.id);
}
function createFlowModeStore() {
	const store = /* @__PURE__ */ new Map();
	return {
		get: (sessionId) => store.get(sessionId),
		ensure(sessionId) {
			const existing = store.get(sessionId);
			if (existing !== void 0) return existing;
			const fresh = {
				active: false,
				wanted: null
			};
			store.set(sessionId, fresh);
			return fresh;
		},
		isOn(sessionId) {
			const state = store.get(sessionId);
			if (state === void 0) return false;
			return state.wanted ?? state.active;
		},
		delete: (sessionId) => void store.delete(sessionId),
		clear: () => store.clear()
	};
}
/** Apply a mode target for one session, respecting an open turn. */
function setFlowMode(store, sessionId, on, turnOpen) {
	const state = store.ensure(sessionId);
	if (on && state.active && state.wanted !== false) return "noop";
	if (!on && !state.active && state.wanted !== true) return "noop";
	if (turnOpen) {
		if (state.wanted !== null && state.wanted !== on) {
			state.wanted = null;
			return state.active === on ? "noop" : "queued";
		}
		if (state.active === on) {
			state.wanted = null;
			return "noop";
		}
		state.wanted = on;
		return "queued";
	}
	const wasActive = state.active;
	state.active = on;
	state.wanted = null;
	return wasActive ? "restarted" : "committed";
}
/**
* Commit any staged switch. Called at `agent/pre-step`, the one point where a
* new prompt can still be assembled for the model.
*/
function commitFlowMode(store, sessionId) {
	const state = store.get(sessionId);
	if (state === void 0 || state.wanted === null) return false;
	state.active = state.wanted;
	state.wanted = null;
	return true;
}
//#endregion
export { commitFlowMode, createFlowModeStore, sessionIdOf, setFlowMode };
