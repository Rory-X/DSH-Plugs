//#region src/mode.d.ts
/**
 * Session-scoped Flow mode state.
 *
 * Flow mode is OFF by default and only ever turns on when the user asks — via
 * the `/flow` command or the canvas toggle. The alternative (a permanently
 * installed prompt section) made the model guess whether a request was "big
 * enough" to warrant a graph, which is both unreliable and invisible to the
 * user. Explicit entry is the whole point.
 *
 * State lives in process memory, keyed by session id, exactly as
 * @just-genius/dsh-debug-mode does it: writing custom event types into the
 * durable session log would poison reload, because they fall outside the
 * session layer's known event vocabulary.
 */
/** What one session's mode looks like right now. */
interface SessionFlowState {
  /** Currently in effect for the model's next assembly. */
  active: boolean;
  /**
   * Target while a turn is open, or `null` when no switch is pending.
   *
   * A mode change requested mid-turn cannot rewrite the prompt already sent to
   * the model, so it is staged here and committed at the next pre-step.
   */
  wanted: boolean | null;
}
interface FlowModeStore {
  get(sessionId: string): SessionFlowState | undefined;
  ensure(sessionId: string): SessionFlowState;
  /** Effective mode: a pending target wins over the committed value. */
  isOn(sessionId: string): boolean;
  delete(sessionId: string): void;
  clear(): void;
}
/**
 * Mode, tools, and the Flow tab all share one key: the conversation session.
 *
 * `agent.id` is the live Agent, which is not what the canvas posts as
 * `sessionId`. Keying on that made `/flow` look on while `flow.plan` and the
 * tab still saw the mode as off.
 */
declare function sessionIdOf(agent: {
  readonly session: {
    readonly id: unknown;
  };
}): string;
declare function createFlowModeStore(): FlowModeStore;
/**
 * Why a mode switch cannot always apply immediately.
 *
 * The prompt for the in-flight step is already assembled, so a mid-turn switch
 * is staged and committed at the next pre-step boundary.
 */
type ModeSwitchOutcome = 'committed' | 'queued' | 'restarted' | 'noop';
/** Apply a mode target for one session, respecting an open turn. */
declare function setFlowMode(store: FlowModeStore, sessionId: string, on: boolean, turnOpen: boolean): ModeSwitchOutcome;
/**
 * Commit any staged switch. Called at `agent/pre-step`, the one point where a
 * new prompt can still be assembled for the model.
 */
declare function commitFlowMode(store: FlowModeStore, sessionId: string): boolean;
//#endregion
export { FlowModeStore, ModeSwitchOutcome, SessionFlowState, commitFlowMode, createFlowModeStore, sessionIdOf, setFlowMode };