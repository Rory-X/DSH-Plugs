//#region src/shared.d.ts
/**
 * Lifecycle of one graph node.
 *
 * - `pending`  — waiting on dependencies that have not settled yet
 * - `ready`    — dependencies settled, waiting for the Leader to call flow.next
 * - `running`  — a child agent owns this node right now
 * - `done`     — child settled with `stopReason: 'completed'`
 * - `failed`   — child settled any other way (`error`, `aborted`, `refusal`, `max-tokens`)
 * - `skipped`  — the Leader dropped this node; it never runs and never blocks
 */
type NodeStatus = 'pending' | 'ready' | 'running' | 'expanded' | 'done' | 'failed' | 'skipped';
/** The model-authored shape of one step. */
interface FlowNodeSpec {
  /** Caller-chosen stable id, unique inside one plan. Referenced by `deps`. */
  readonly id: string;
  /** One-line label shown on the canvas. */
  readonly title: string;
  /** The complete, self-contained brief handed to the child agent. */
  readonly prompt: string;
  /** Ids that must reach a settled state before this node may start. */
  readonly deps: readonly string[];
  /**
   * Optional parent node. Children are the next level of work under that
   * parent — they run only after the parent has expanded (or already finished).
   */
  readonly parentId?: string;
  /** Optional per-node persona override for the child. */
  readonly persona?: string;
  /**
   * When true, settling this node pauses the plan until a human confirms.
   * Ordinary nodes do not wait — only planned or requested gates do.
   */
  readonly confirm?: boolean;
  /** Optional per-node tool scoping for the child. */
  readonly toolFilter?: {
    readonly allow?: readonly string[];
    readonly deny?: readonly string[];
  };
  /**
   * Workspace-relative paths this step may modify.
   *
   * Omitted means "unknown blast radius", and the node then runs alone
   * (`exclusive`). An empty array is the explicit read-only claim. A non-empty
   * list makes the node parallel-safe against any scope it does not overlap.
   * See `./scope.ts` for why this is a declaration rather than an isolation
   * mechanism: a DSH child inherits the parent's `cwd`, so ownership is the
   * only available safety property.
   */
  readonly writeScope?: readonly string[];
}
/** The model-authored shape of one plan. */
interface FlowPlanSpec {
  /** Short human-facing name for this plan (also the canvas heading). */
  readonly title: string;
  readonly nodes: readonly FlowNodeSpec[];
  /** Maximum concurrently running children. Clamped by the Host. */
  readonly concurrency?: number;
}
/** One progress note a running child posted through `flow.report`. */
interface FlowNote {
  readonly text: string;
  /** ISO timestamp, so the canvas can render a timeline. */
  readonly at: string;
}
/** A node as the canvas renders it: the spec plus everything execution added. */
interface FlowNodeView extends FlowNodeSpec {
  readonly status: NodeStatus;
  /** The child agent's session id, once dispatched. Stable for the node's life. */
  readonly childId: string | null;
  /** Truncated child output, present once the node settles. */
  readonly summary: string | null;
  /** Provider-authored failure detail for a `failed` node. */
  readonly diagnostic: string | null;
  /** Progress notes the running child reported, oldest first. */
  readonly notes: readonly FlowNote[];
  /** ISO timestamp of the last status change. */
  readonly updatedAt: string;
  /** How many times this node has been dispatched (a retry starts a new run). */
  readonly attempts: number;
  /**
   * Scheduling meaning of this node's declaration, so the canvas can show why
   * a node is or is not running beside its siblings.
   */
  readonly scopeKind: 'exclusive' | 'readonly' | 'scoped';
}
/** A pending human gate, set by the Leader, a child, or a node marked `confirm`. */
interface FlowConfirmRequest {
  readonly question: string;
  readonly nodeId: string | null;
}
/** The whole plan as the canvas renders it. */
interface FlowPlanView {
  readonly id: string;
  readonly title: string;
  readonly status: FlowPlanStatus;
  readonly concurrency: number;
  readonly nodes: readonly FlowNodeView[];
  readonly createdAt: string;
  readonly updatedAt: string;
  /** Present only when a human decision is required before the next dispatch. */
  readonly confirm: FlowConfirmRequest | null;
}
/**
 * Plan-level rollup. `idle` before the first dispatch, `running` while any
 * child is live, `settled` once every node reached a terminal status.
 */
type FlowPlanStatus = 'idle' | 'running' | 'settled';
/** True only when someone asked for a human gate — not after every step. */
declare function waitingForConfirm(plan: FlowPlanView): boolean;
//#endregion
//#region src/graph.d.ts
/** Why a plan spec was rejected. */
type PlanRejection = {
  readonly code: 'empty';
  readonly message: string;
} | {
  readonly code: 'duplicate-id';
  readonly message: string;
  readonly id: string;
} | {
  readonly code: 'unknown-dep';
  readonly message: string;
  readonly id: string;
  readonly dep: string;
} | {
  readonly code: 'unknown-parent';
  readonly message: string;
  readonly id: string;
  readonly parentId: string;
} | {
  readonly code: 'self-dep';
  readonly message: string;
  readonly id: string;
} | {
  readonly code: 'cycle';
  readonly message: string;
  readonly path: readonly string[];
} | {
  readonly code: 'blank';
  readonly message: string;
  readonly id: string;
};
type ValidatedPlan = {
  readonly ok: true;
  readonly plan: FlowPlanSpec;
} | {
  readonly ok: false;
  readonly rejection: PlanRejection;
};
/**
 * Accept a plan spec or explain exactly why it cannot be scheduled.
 *
 * Rejecting here is the point: a plan the scheduler cannot drive must fail in
 * the Leader's tool result, where the model can fix it, rather than half-run.
 */
declare function validatePlan(spec: FlowPlanSpec): ValidatedPlan;
/**
 * Return one dependency cycle as a node path, or `null` when the graph is a DAG.
 *
 * A node that is skipped counts as settled for its dependents, so cycles are a
 * property of the dependency edges alone — never of runtime outcomes.
 */
declare function findCycle(nodes: readonly FlowNodeSpec[]): readonly string[] | null;
/** A node as the scheduler sees it — deps plus an optional parent. */
interface GraphNode {
  readonly id: string;
  readonly deps: readonly string[];
  readonly parentId?: string;
}
/**
 * Whether `id` and every descendant have finished.
 *
 * An `expanded` parent is a container: dependents of that parent wait until
 * every child under it is done or skipped. A skipped parent does not wait
 * on children (the Leader dropped the subtree).
 */
declare function subtreeSettled(id: string, nodes: readonly GraphNode[], statusOf: (id: string) => NodeStatus, guard?: Set<string>): boolean;
/** Node ids whose dependencies (and parent, if any) have all settled. */
declare function readyIds(nodes: readonly GraphNode[], statusOf: (id: string) => NodeStatus): string[];
/** Longest-path depth per node, used by the canvas to lay out columns. */
declare function depthOf(nodes: readonly GraphNode[]): Map<string, number>;
//#endregion
export { GraphNode, PlanRejection, ValidatedPlan, depthOf, findCycle, readyIds, subtreeSettled, validatePlan, waitingForConfirm };