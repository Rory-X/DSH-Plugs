//#region src/shared.ts
/**
* Wire vocabulary shared by the Host orchestrator and the browser canvas.
*
* Everything here must stay lossless JSON: it crosses the HTTP boundary as-is.
* Host-only runtime state (live `SubagentRun` handles, abort controllers, the
* parent Agent) never appears in this module — see `./types.ts`.
*/
/** HTTP routes the Host half registers and the Client half calls. */
const STATE_PATH = "/api/dsh-flow/state";
const ACTION_PATH = "/api/dsh-flow/action";
const MODE_PATH = "/api/dsh-flow/mode";
/** The slash command that turns Flow mode on and off. */
const FLOW_COMMAND = "flow";
/** A node status that lets its dependents proceed. */
const SETTLED_STATUSES = ["done", "skipped"];
/** Truncation applied to child output before it crosses the HTTP wire. */
const SUMMARY_LIMIT = 2e3;
/** Safety cap on host-held child output (one node). */
const OUTPUT_STORE_LIMIT = 2e5;
/** Per-node result size in `flow.status` (whole-graph view). */
const STATUS_RESULT_LIMIT = 12e3;
/** Cap for the entire `flow.status` report. */
const STATUS_TOTAL_LIMIT = 48e3;
/** Cap when `flow.status` focuses a single node. */
const STATUS_FOCUS_LIMIT = 8e4;
/** How much upstream output a child brief may carry. */
const UPSTREAM_LIMIT = 16e3;
function clampConcurrency(value) {
	if (typeof value !== "number" || !Number.isFinite(value)) return 4;
	const rounded = Math.trunc(value);
	if (rounded < 1) return 1;
	if (rounded > 8) return 8;
	return rounded;
}
function truncate(value, limit) {
	if (value.length <= limit) return value;
	return `${value.slice(0, limit).trimEnd()}…`;
}
/** True only when someone asked for a human gate — not after every step. */
function waitingForConfirm(plan) {
	return plan.confirm !== null;
}
//#endregion
//#region src/graph.ts
/**
* Accept a plan spec or explain exactly why it cannot be scheduled.
*
* Rejecting here is the point: a plan the scheduler cannot drive must fail in
* the Leader's tool result, where the model can fix it, rather than half-run.
*/
function validatePlan(spec) {
	if (!Array.isArray(spec.nodes) || spec.nodes.length === 0) return {
		ok: false,
		rejection: {
			code: "empty",
			message: "plan needs at least one node"
		}
	};
	const seen = /* @__PURE__ */ new Set();
	for (const node of spec.nodes) {
		if (typeof node.id !== "string" || node.id.trim() === "") return {
			ok: false,
			rejection: {
				code: "blank",
				message: "every node needs a non-empty id",
				id: String(node.id)
			}
		};
		if (seen.has(node.id)) return {
			ok: false,
			rejection: {
				code: "duplicate-id",
				message: `duplicate node id "${node.id}"`,
				id: node.id
			}
		};
		seen.add(node.id);
		if (typeof node.title !== "string" || node.title.trim() === "") return {
			ok: false,
			rejection: {
				code: "blank",
				message: `node "${node.id}" needs a non-empty title`,
				id: node.id
			}
		};
		if (typeof node.prompt !== "string" || node.prompt.trim() === "") return {
			ok: false,
			rejection: {
				code: "blank",
				message: `node "${node.id}" needs a non-empty prompt`,
				id: node.id
			}
		};
	}
	for (const node of spec.nodes) {
		for (const dep of node.deps) {
			if (dep === node.id) return {
				ok: false,
				rejection: {
					code: "self-dep",
					message: `node "${node.id}" depends on itself`,
					id: node.id
				}
			};
			if (!seen.has(dep)) return {
				ok: false,
				rejection: {
					code: "unknown-dep",
					message: `node "${node.id}" depends on unknown node "${dep}"`,
					id: node.id,
					dep
				}
			};
		}
		if (node.parentId !== void 0 && node.parentId !== "") {
			if (node.parentId === node.id) return {
				ok: false,
				rejection: {
					code: "self-dep",
					message: `node "${node.id}" cannot be its own parent`,
					id: node.id
				}
			};
			if (!seen.has(node.parentId)) return {
				ok: false,
				rejection: {
					code: "unknown-parent",
					message: `node "${node.id}" has unknown parent "${node.parentId}"`,
					id: node.id,
					parentId: node.parentId
				}
			};
		}
	}
	const cycle = findCycle(spec.nodes);
	if (cycle !== null) return {
		ok: false,
		rejection: {
			code: "cycle",
			message: `dependency cycle: ${cycle.join(" → ")}`,
			path: cycle
		}
	};
	return {
		ok: true,
		plan: spec
	};
}
/**
* Return one dependency cycle as a node path, or `null` when the graph is a DAG.
*
* A node that is skipped counts as settled for its dependents, so cycles are a
* property of the dependency edges alone — never of runtime outcomes.
*/
function findCycle(nodes) {
	const edges = /* @__PURE__ */ new Map();
	for (const node of nodes) {
		const inbound = [...node.deps];
		if (node.parentId !== void 0 && node.parentId !== "") inbound.push(node.parentId);
		edges.set(node.id, inbound);
	}
	const WHITE = 0;
	const GREY = 1;
	const BLACK = 2;
	const color = /* @__PURE__ */ new Map();
	for (const node of nodes) color.set(node.id, WHITE);
	const stack = [];
	const visit = (id) => {
		color.set(id, GREY);
		stack.push(id);
		for (const dep of edges.get(id) ?? []) {
			const depColor = color.get(dep) ?? BLACK;
			if (depColor === GREY) return [...stack.slice(stack.indexOf(dep)), dep];
			if (depColor === WHITE) {
				const found = visit(dep);
				if (found !== null) return found;
			}
		}
		stack.pop();
		color.set(id, BLACK);
		return null;
	};
	for (const node of nodes) if ((color.get(node.id) ?? WHITE) === WHITE) {
		const found = visit(node.id);
		if (found !== null) return found;
	}
	return null;
}
/**
* Whether `id` and every descendant have finished.
*
* An `expanded` parent is a container: dependents of that parent wait until
* every child under it is done or skipped. A skipped parent does not wait
* on children (the Leader dropped the subtree).
*/
function subtreeSettled(id, nodes, statusOf, guard = /* @__PURE__ */ new Set()) {
	if (guard.has(id)) return false;
	guard.add(id);
	const status = statusOf(id);
	const children = nodes.filter((node) => node.parentId === id);
	if (status === "skipped") return true;
	if (status === "failed" || status === "pending" || status === "running" || status === "ready") return false;
	if (status === "expanded") return children.length > 0 && children.every((child) => subtreeSettled(child.id, nodes, statusOf, guard));
	if (status === "done") return children.every((child) => subtreeSettled(child.id, nodes, statusOf, guard));
	return false;
}
/** Node ids whose dependencies (and parent, if any) have all settled. */
function readyIds(nodes, statusOf) {
	const ready = [];
	for (const node of nodes) {
		if (statusOf(node.id) !== "pending") continue;
		if (node.parentId !== void 0 && node.parentId !== "") {
			const parentStatus = statusOf(node.parentId);
			if (parentStatus !== "expanded" && parentStatus !== "done") continue;
		}
		if (node.deps.every((dep) => subtreeSettled(dep, nodes, statusOf))) ready.push(node.id);
	}
	return ready;
}
/** Longest-path depth per node, used by the canvas to lay out columns. */
function depthOf(nodes) {
	const byId = new Map(nodes.map((node) => [node.id, node]));
	const depths = /* @__PURE__ */ new Map();
	const resolve = (id, guard) => {
		const cached = depths.get(id);
		if (cached !== void 0) return cached;
		if (guard.has(id)) return 0;
		guard.add(id);
		const node = byId.get(id);
		let depth = 0;
		if (node !== void 0) {
			const inbound = [...node.deps, ...node.parentId !== void 0 && node.parentId !== "" ? [node.parentId] : []];
			for (const dep of inbound) depth = Math.max(depth, resolve(dep, guard) + 1);
		}
		guard.delete(id);
		depths.set(id, depth);
		return depth;
	};
	for (const node of nodes) resolve(node.id, /* @__PURE__ */ new Set());
	return depths;
}
//#endregion
export { clampConcurrency as _, validatePlan as a, MODE_PATH as c, STATE_PATH as d, STATUS_FOCUS_LIMIT as f, UPSTREAM_LIMIT as g, SUMMARY_LIMIT as h, subtreeSettled as i, OUTPUT_STORE_LIMIT as l, STATUS_TOTAL_LIMIT as m, findCycle as n, ACTION_PATH as o, STATUS_RESULT_LIMIT as p, readyIds as r, FLOW_COMMAND as s, depthOf as t, SETTLED_STATUSES as u, truncate as v, waitingForConfirm as y };
