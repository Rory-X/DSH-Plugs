import { _ as clampConcurrency, a as validatePlan, c as MODE_PATH, d as STATE_PATH, f as STATUS_FOCUS_LIMIT, g as UPSTREAM_LIMIT, h as SUMMARY_LIMIT, l as OUTPUT_STORE_LIMIT, m as STATUS_TOTAL_LIMIT, o as ACTION_PATH, p as STATUS_RESULT_LIMIT, r as readyIds, s as FLOW_COMMAND, t as depthOf, u as SETTLED_STATUSES, v as truncate } from "./graph-8rtF3gph.js";
import { shouldWakeLeader } from "./wake-policy.js";
import { commitFlowMode, createFlowModeStore, sessionIdOf, setFlowMode } from "./mode.js";
import { HOST_SERVICES, createUserMessage, defineTool, errorMessage, readJsonBody, sendJson } from "@just-genius/dsh-plugin-runtime/host";
//#region src/scope.ts
/**
* Normalize one declared scope entry for comparison.
*
* Accepts the spellings a model actually writes (`./src/a`, `src/a/`,
* `src/a/**`, backslashes) and reduces them to the bare workspace-relative
* directory prefix. An entry that normalizes to `''` means the workspace root,
* which {@link covers} treats as "everything" — a sloppy declaration fails
* closed rather than silently becoming read-only.
*/
function normalizeScopePath(raw) {
	let value = raw.trim().replace(/\\/g, "/");
	value = value.replace(/\/\*\*$/, "").replace(/\/\*$/, "");
	value = value.replace(/^\.\//, "");
	value = value.replace(/\/+$/, "");
	if (value === "." || value === "/") return "";
	return value;
}
/**
* Normalize a whole declared scope.
*
* Blank spellings are kept: a blank entry normalizes to the workspace root,
* which {@link covers} reads as "everything". That is the fail-closed reading
* of a sloppy declaration — a model that writes `""` grants more than it meant,
* and the node is then serialized against every writer rather than quietly
* becoming read-only.
*/
function normalizeScope(scope) {
	return scope.map(normalizeScopePath);
}
/** Classify one node's declaration into its scheduling meaning. */
function scopeKindOf(carrier) {
	const declared = carrier.writeScope;
	if (declared === void 0) return "exclusive";
	if (normalizeScope(declared).length === 0) return "readonly";
	return "scoped";
}
/** Whether one normalized entry admits a workspace-relative path. */
function covers(entry, path) {
	if (entry === "") return true;
	if (path === "") return false;
	return path === entry || path.startsWith(`${entry}/`);
}
/** Whether two normalized entries can touch the same path, either direction. */
function entriesOverlap(a, b) {
	return covers(a, b) || covers(b, a);
}
/**
* Whether two declared scopes can touch the same workspace path.
*
* Prefix containment counts: `src/a` and `src/a/b` overlap, because a write to
* the first can land inside the second.
*/
function scopesOverlap(a, b) {
	for (const left of normalizeScope(a)) for (const right of normalizeScope(b)) if (entriesOverlap(left, right)) return true;
	return false;
}
/**
* Whether two nodes may be in flight at the same time.
*
* An `exclusive` node (no declaration) pairs with nothing, which is what keeps
* the current sequential behaviour the default. Two `readonly` nodes always
* pair. Two `scoped` nodes pair only when their prefixes are disjoint.
*/
function mayRunTogether(a, b) {
	const left = scopeKindOf(a);
	const right = scopeKindOf(b);
	if (left === "exclusive" || right === "exclusive") return false;
	if (left === "readonly" || right === "readonly") return true;
	return !scopesOverlap(a.writeScope ?? [], b.writeScope ?? []);
}
/**
* Reduce a model- or tool-supplied path to workspace-relative form.
*
* Only a path that provably sits under `cwd` is rewritten. An absolute path
* that never matched `cwd` KEEPS its leading slash, so it can never satisfy a
* workspace-relative scope entry: the guard fails closed instead of
* reinterpreting an out-of-workspace target as a relative one.
*/
function workspaceRelative(candidate, cwd) {
	let value = candidate.trim().replace(/\\/g, "/");
	if (cwd !== void 0 && cwd !== "") {
		const root = cwd.trim().replace(/\\/g, "/").replace(/\/+$/, "");
		if (root !== "" && (value === root || value.startsWith(`${root}/`))) value = value.slice(root.length).replace(/^\/+/, "");
	}
	value = value.replace(/^\.\//, "");
	return value.replace(/\/+$/, "");
}
/** Human-facing description of a declaration, for tool results and the canvas. */
function describeScope(carrier) {
	switch (scopeKindOf(carrier)) {
		case "readonly": return "只读";
		case "exclusive": return "独占（未声明写作用域）";
		default: return normalizeScope(carrier.writeScope ?? []).join(", ");
	}
}
/**
* Why a write to `relativePath` must be refused for a node with this
* declaration, or `null` when it is allowed.
*
* The three states again, this time as enforcement:
*   - `undefined` (exclusive) → allowed. Exclusive is a *scheduling* claim
*     ("run me alone"), not a grant restriction; refusing here would break
*     every plan that never declared a scope.
*   - `[]` (readonly)         → refused. The node promised not to write.
*   - `[paths]`               → refused outside the declared prefixes.
*
* `relativePath` must already be workspace-relative (see
* {@link workspaceRelative}); an absolute path outside the workspace simply
* fails to match and is refused.
*/
function writeDenialReason(declaration, relativePath) {
	if (declaration === void 0) return null;
	const normalized = normalizeScope(declaration);
	if (normalized.length === 0) return "this step declared an empty write scope, so it may not modify any file";
	if (normalized.some((entry) => covers(entry, relativePath))) return null;
	return `this step may only write inside ${normalized.join(", ")}, but "${relativePath}" is outside every declared prefix`;
}
//#endregion
//#region src/policy.ts
/**
* The Leader contract, injected only while Flow mode is on.
*
* Because the user turned the mode on explicitly, this section does not need to
* guess whether the work warrants a graph — the mode itself is the decision. It
* therefore states the loop imperatively instead of hedging about thresholds.
*/
const LEADER_POLICY = [
	"## Flow mode",
	"",
	"You are the Leader. You plan; child agents execute. You have the `flow.*`",
	"tools and read-only tools only — you cannot edit files, write files, or run",
	"commands, by design. Work you would normally do yourself must become a step",
	"in the graph and be delegated to a child.",
	"",
	"The loop is sequential and gated by you:",
	"1. Decompose the request into steps. Give each step a complete, self-contained",
	"   prompt — a child agent does NOT see this conversation. Declare real",
	"   dependencies with `deps`.",
	"2. Declare `writeScope` on every step (see 「Parallelism」 below) unless it",
	"   genuinely needs a shell or must run alone.",
	"3. `flow.plan` starts the ready steps that may run together. Tell the user",
	"   which steps are running, then stop. Do not start later steps yourself.",
	"4. When the wave settles you are woken. Call `flow.status` (optionally with",
	"   `nodeId`) and inspect the results.",
	"5. If the results are good, call `flow.next` to release the next wave, then",
	"   stop. Do not write a long user-facing recap of every step. Do NOT ask the",
	"   user to confirm ordinary steps.",
	"6. If a result is bad, `flow.patch` (retry with a revised prompt, skip, or",
	"   add a corrective step). A failed step blocks its dependents until you act.",
	"7. A child may call `flow.expand` when its assignment is actually several",
	"   steps. Inspect the breakdown, then `flow.next` to start the first child.",
	"   You may also author `parentId` on nodes in `flow.plan` / `flow.patch`.",
	"8. Ask a human only when a real decision is needed (ambiguous requirement,",
	"   risky change, expand looks wrong). Then call `flow.confirm` with a short",
	"   question and stop. Mark a planned gate with `confirm: true` on that node.",
	"   The Flow tab shows 「通过并继续」 only while a confirm is pending.",
	"9. Write a user-facing summary only after the plan settles, or when you need",
	"   a decision from the user.",
	"",
	"## Parallelism: what actually makes steps run at once",
	"",
	"A child agent inherits THIS session’s working directory — it cannot be given",
	"its own checkout. Two steps that edit the same files would therefore overwrite",
	"each other. `writeScope` is how you prevent that, and it is what buys speed:",
	"",
	"- `writeScope: [\"src/auth\"]` — may write only under that prefix. Two steps",
	"  with non-overlapping prefixes run in the SAME wave.",
	"- `writeScope: []` — the step only reads. Always parallelizable.",
	"- omitting it — unknown blast radius, so the step runs ALONE and blocks every",
	"  other writer while it runs. Commit steps and steps needing a shell go here.",
	"",
	"Consequences worth internalising:",
	"- A step with a `writeScope` CANNOT use `bash`/`pwsh` or delegate",
	"  (`subagent`, `workflow`, `run_code`): a shell or a grandchild session could",
	"  write anywhere, making the scope a lie. The guard refuses those calls. If a",
	"  step needs a shell, give it no scope and accept that it runs alone.",
	"  (Commit, install, and test-runner steps are exclusive by nature.)",
	"- Splitting work so each step owns a disjoint directory is the whole game.",
	"  Prefer 3 focused parallel steps over 6 that fight over one file.",
	"- If `flow.next` reports steps \"deferred for write-scope conflicts\", the",
	"  scopes overlap or were never declared. That is usually a planning mistake,",
	"  not a scheduler limitation — fix the scopes rather than just waiting.",
	"",
	"Rules:",
	"- Never assume later steps have started. They wait for `flow.next`.",
	"- Do not request human confirmation after every step.",
	"- Do not poll `flow.status` in a loop. A notice arrives when a child settles.",
	"- A failed step is information. Diagnose why, then change the graph or the",
	"   prompt — do not blindly retry the same brief.",
	"- Keep steps small enough to review and large enough to be self-contained.",
	"- Read-only investigation (reading files, searching, fetching docs) is yours to",
	"   do directly; it makes your plans better and costs no delegation.",
	"- Two steps with overlapping scopes must be ordered with `deps` instead of run",
	"   in parallel. The scheduler enforces this, but an explicit `deps` edge",
	"   records WHY and survives a later scope tweak.",
	"",
	"The user leaves this mode with `/flow off`. Until then, lead."
].join("\n");
/** Shown when the user is in Flow mode but has not planned anything yet. */
const IDLE_HINT = [
	"Flow mode is on and no plan is active. When the user gives you work, express",
	"it as a graph with `flow.plan` rather than doing it step by step yourself.",
	"Coarse steps are fine: a child that finds it owns several real steps will",
	"expand itself into a subtree. Declare `writeScope` per step so independent",
	"work can run in the same wave instead of one step at a time."
].join("\n");
/** Appended to every child brief so a coarse node can split itself. */
const CHILD_EXPAND_HINT = [
	"## If this assignment is several steps",
	"Call `flow.expand` with smaller child nodes (each needs `id`, `title`,",
	"`prompt`; use `deps` between siblings). Then stop — do not do the subtree",
	"yourself. The Leader will review and start the first child with `flow.next`.",
	"",
	"## If you need a human decision",
	"Call `flow.confirm` with a short question, then stop. Do not keep working.",
	"Ordinary steps do not need confirmation."
].join("\n");
/**
* Appended to every child brief so the canvas shows live progress.
*
* The subagent seam exposes no streaming channel, so this hint is the whole
* visibility story: the child narrates its own findings and the canvas renders
* the latest note on the running node. The granularity is the CONCLUSION, not
* the tool call — a note is what a batch of investigation or edits added up
* to, so the canvas reads as a stream of judgments rather than a tool log.
*/
const CHILD_REPORT_HINT = [
	"## Progress visibility",
	"The user watches this node on a canvas that only shows what you report.",
	"Work in bursts of tool calls; when a burst produces a conclusion — a",
	"finding, a decision, a finished change, a verified result, a blocker —",
	"report that conclusion in one line with `flow.report`, in the user's",
	"language. Examples: \"接口定义在 src/foo.ts，需要加 retry 参数\" · \"修改已",
	"应用，测试全过\" · \"foo.ts 没有这个接口，改从 bar.ts 入手\". Do not report",
	"individual tool calls (\"正在读 X\") — the note is what you LEARNED or DID,",
	"not what you are about to do. Never paste file contents or command output",
	"into a note."
].join("\n");
//#endregion
//#region src/orchestrator.ts
const DEFAULT_PROVIDER = "spawn";
var FlowOrchestrator = class {
	ctx;
	subagents;
	plan = null;
	counter = 0;
	revision = 0;
	/**
	* Bumped whenever the plan is replaced or cleared.
	*
	* A dispatched child owns an OS-level process, so cancelling it does not make
	* its settlement promise stop existing. Without a generation check, a child
	* from a replaced plan would settle into the NEW plan — re-pumping it and
	* waking the Leader about a node that no longer exists.
	*/
	generation = 0;
	/** Settlements already reported, so we wake once per node attempt. */
	woken = /* @__PURE__ */ new Set();
	/** Coalesces parallel settlements into one Leader turn. */
	wakeTimer = null;
	wakePending = false;
	constructor(ctx, subagents) {
		this.ctx = ctx;
		this.subagents = subagents;
	}
	/** Monotonic counter for change detection; the canvas compares it. */
	get version() {
		return this.revision;
	}
	/** True when the subagent service was unavailable at mount time. */
	get degradedReason() {
		return this.subagents === void 0 ? "subagent service is not mounted" : null;
	}
	/**
	* Replace the current plan and start dispatching.
	*
	* Returns synchronously after the first dispatch wave — the Leader is not
	* blocked on child work, which is the whole point of delegating.
	*/
	setPlan(spec, parent) {
		const validated = validatePlan(spec);
		if (!validated.ok) return {
			ok: false,
			rejection: validated.rejection
		};
		this.disposeCurrentPlan();
		this.counter += 1;
		this.generation += 1;
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const nodes = /* @__PURE__ */ new Map();
		const order = [];
		for (const node of validated.plan.nodes) {
			nodes.set(node.id, {
				spec: normalizeSpec(node),
				status: "pending",
				run: null,
				output: null,
				summary: null,
				diagnostic: null,
				notes: [],
				updatedAt: now,
				attempts: 0
			});
			order.push(node.id);
		}
		this.plan = {
			id: `plan-${this.counter}`,
			title: spec.title.trim() === "" ? "Untitled plan" : spec.title.trim(),
			status: "idle",
			concurrency: clampConcurrency(spec.concurrency),
			nodes,
			order,
			createdAt: now,
			updatedAt: now,
			confirm: null,
			parent
		};
		this.revision += 1;
		this.woken.clear();
		this.markContainers();
		this.pump(parent);
		return {
			ok: true,
			plan: this.view()
		};
	}
	/**
	* Insert a node into the live plan.
	*
	* This is how the Leader inserts a corrective step after a failure. The new
	* node is validated against the graph it is joining, so an id collision or a
	* cycle is reported to the model instead of corrupting the plan.
	*/
	addNode(spec) {
		const inserted = this.insertNode(spec);
		if (!inserted.ok) return inserted;
		this.revision += 1;
		this.markContainers();
		this.refreshPlanStatus();
		return {
			ok: true,
			message: null
		};
	}
	/**
	* Attach child nodes under `parentId`.
	*
	* Used by the Leader and by the child that is currently running that parent.
	* Does not start the new children — the Leader calls `flow.next` after review.
	*/
	expand(parentId, specs) {
		const plan = this.plan;
		if (plan === null) return "No plan is active. Call flow.plan to create one.";
		const parent = plan.nodes.get(parentId);
		if (parent === void 0) return `Unknown node "${parentId}".`;
		if (parent.status === "failed" || parent.status === "skipped") return `Cannot expand "${parentId}" while it is ${parent.status}. Retry or skip it first.`;
		if (this.parentDepth(parentId) >= 3) return `Cannot expand "${parentId}": the tree is already 4 levels deep.`;
		if (specs.length === 0) return "flow.expand needs at least one child node.";
		const added = [];
		for (const spec of specs) {
			const child = {
				...spec,
				parentId
			};
			const inserted = this.insertNode(child);
			if (!inserted.ok) return `expand stopped at "${spec.id}": ${inserted.message ?? "failed"}\n\n${this.report()}`;
			added.push(spec.id);
		}
		if (parent.status === "pending" || parent.status === "done") {
			parent.status = "expanded";
			parent.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
		}
		plan.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
		this.revision += 1;
		this.refreshPlanStatus();
		return [
			`Expanded "${parentId}" with ${added.length} child node(s): ${added.join(", ")}.`,
			parent.status === "running" ? "The parent is still running. After it settles, inspect with flow.status, then flow.next." : "Inspect with flow.status, then flow.next to start the first child.",
			"",
			this.report()
		].join("\n");
	}
	/**
	* Pause dispatch until a human answers.
	*
	* Used only when the Leader or a child actually needs a decision — not after
	* every settled step. The canvas shows the question; `flow.next` or the
	* 「通过并继续」 button clears the gate and continues.
	*/
	requestConfirm(question, nodeId, opts) {
		const plan = this.plan;
		if (plan === null) return "No plan is active. Call flow.plan to create one.";
		const trimmed = question.trim();
		if (trimmed === "") return "flow.confirm needs a non-empty `question`.";
		if (nodeId !== null && nodeId !== "" && !plan.nodes.has(nodeId)) return `Unknown node "${nodeId}".`;
		plan.confirm = {
			question: trimmed,
			nodeId: nodeId === "" ? null : nodeId
		};
		plan.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
		this.revision += 1;
		if (opts?.wake === true) this.scheduleWake(plan.parent);
		return [
			`Human confirmation requested${plan.confirm.nodeId !== null ? ` for "${plan.confirm.nodeId}"` : ""}.`,
			plan.confirm.question,
			"Stop. Do not call flow.next or continue the subtree. The user will answer on the Flow tab or in chat."
		].join("\n");
	}
	/**
	* Append a progress note to the node a running child owns.
	*
	* This is the only live signal the canvas has while a child works: the
	* subagent seam exposes no streaming channel, so the child reports its own
	* key moments. Notes are per-attempt — a retry starts with a clean slate.
	*/
	reportNote(agent, text) {
		const plan = this.plan;
		if (plan === null) return "No plan is active.";
		const node = this.runningNodeFor(agent);
		if (node === null) return "flow.report is for the child that is currently running a node.";
		const trimmed = text.trim();
		if (trimmed === "") return "flow.report needs a non-empty `note`.";
		node.notes.push({
			text: truncate(trimmed, 200),
			at: (/* @__PURE__ */ new Date()).toISOString()
		});
		if (node.notes.length > 50) node.notes.splice(0, node.notes.length - 50);
		node.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
		plan.updatedAt = node.updatedAt;
		this.revision += 1;
		return "Noted. Keep working; report again at the next key moment.";
	}
	/** The live graph node owned by this child agent, if any. */
	runningNodeFor(agent) {
		const plan = this.plan;
		if (plan === null) return null;
		const ids = /* @__PURE__ */ new Set([String(agent.id)]);
		if (agent.session !== void 0) ids.add(String(agent.session.id));
		for (const node of plan.nodes.values()) {
			if (node.status !== "running" || node.run === null) continue;
			const childId = node.run.childId;
			if (childId !== null && ids.has(childId)) return node;
		}
		return null;
	}
	/** Remove a node that is not running and is nobody's dependency. */
	removeNode(id) {
		const plan = this.plan;
		if (plan === null) return {
			ok: false,
			message: "no plan is active"
		};
		const node = plan.nodes.get(id);
		if (node === void 0) return {
			ok: false,
			message: `unknown node "${id}"`
		};
		if (node.status === "running") return {
			ok: false,
			message: `"${id}" is running; cancel it first`
		};
		if (this.childrenOf(id).length > 0) return {
			ok: false,
			message: `"${id}" still has child nodes; remove those first`
		};
		for (const other of plan.nodes.values()) if (other.spec.id !== id && other.spec.deps.includes(id)) return {
			ok: false,
			message: `"${other.spec.id}" still depends on "${id}"`
		};
		plan.nodes.delete(id);
		plan.order.splice(plan.order.indexOf(id), 1);
		plan.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
		this.revision += 1;
		this.refreshPlanStatus();
		return {
			ok: true,
			message: null
		};
	}
	/**
	* Rewrite a settled node's brief before re-dispatching it.
	*
	* Changing `deps` re-validates against cycles, so the Leader can reroute a
	* step around a failed neighbour.
	*/
	updateNode(id, patch) {
		const plan = this.plan;
		if (plan === null) return {
			ok: false,
			message: "no plan is active"
		};
		const node = plan.nodes.get(id);
		if (node === void 0) return {
			ok: false,
			message: `unknown node "${id}"`
		};
		if (node.status === "running") return {
			ok: false,
			message: `"${id}" is running; cancel it first`
		};
		const nextDeps = patch.deps ?? node.spec.deps;
		for (const dep of nextDeps) {
			if (dep === id) return {
				ok: false,
				message: `"${id}" cannot depend on itself`
			};
			if (!plan.nodes.has(dep)) return {
				ok: false,
				message: `unknown dependency "${dep}"`
			};
			if (this.dependsOn(dep, id)) return {
				ok: false,
				message: `"${dep}" would create a cycle`
			};
		}
		node.spec = {
			...node.spec,
			...patch.title !== void 0 ? { title: patch.title.trim() } : {},
			...patch.prompt !== void 0 ? { prompt: patch.prompt } : {},
			...patch.deps !== void 0 ? { deps: [...new Set(nextDeps)] } : {}
		};
		node.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
		plan.updatedAt = node.updatedAt;
		this.revision += 1;
		return {
			ok: true,
			message: null
		};
	}
	/** True when `from` transitively depends on `to`. */
	dependsOn(from, to) {
		const plan = this.plan;
		if (plan === null) return false;
		const stack = [...plan.nodes.get(from)?.spec.deps ?? []];
		const seen = /* @__PURE__ */ new Set();
		while (stack.length > 0) {
			const current = stack.pop();
			if (current === to) return true;
			if (seen.has(current)) continue;
			seen.add(current);
			stack.push(...plan.nodes.get(current)?.spec.deps ?? []);
		}
		return false;
	}
	/**
	* Change how many children may run at once.
	*
	* Raising the cap can start more work immediately, so this re-pumps. Children
	* already running above a lowered cap are left alone rather than killed.
	*/
	setConcurrency(value) {
		const plan = this.plan;
		if (plan === null) return;
		plan.concurrency = clampConcurrency(value);
		plan.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
		this.revision += 1;
		this.pump(plan.parent);
	}
	/** Apply one mutation from the canvas or the Leader's `flow.patch` tool. */
	applyAction(action) {
		const plan = this.plan;
		if (plan === null) return {
			ok: false,
			message: "no plan is active"
		};
		if (action.kind === "clear") {
			this.disposeCurrentPlan();
			this.plan = null;
			this.generation += 1;
			this.revision += 1;
			return {
				ok: true,
				message: null
			};
		}
		if (action.kind === "next") {
			plan.confirm = null;
			const message = this.advance();
			return {
				ok: message.startsWith("Started"),
				message
			};
		}
		const node = plan.nodes.get(action.nodeId);
		if (node === void 0) return {
			ok: false,
			message: `unknown node "${action.nodeId}"`
		};
		if (action.kind === "retry") {
			if (node.status !== "failed" && node.status !== "skipped" && node.status !== "done") return {
				ok: false,
				message: `node "${action.nodeId}" is ${node.status}; only a settled node can be retried`
			};
			plan.confirm = null;
			this.disposeNode(node);
			node.status = "pending";
			node.run = null;
			node.output = null;
			node.summary = null;
			node.diagnostic = null;
			node.notes = [];
			node.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
			plan.status = "running";
			this.revision += 1;
			this.pump(plan.parent);
			return {
				ok: true,
				message: null
			};
		}
		if (action.kind === "skip") {
			if (node.status === "running") this.disposeNode(node);
			if (node.status === "done") return {
				ok: false,
				message: `node "${action.nodeId}" already completed`
			};
			this.settle(node, "skipped", null, null);
			plan.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
			this.revision += 1;
			this.refreshPlanStatus();
			return {
				ok: true,
				message: null
			};
		}
		if (node.status !== "running" && node.status !== "ready") return {
			ok: false,
			message: `node "${action.nodeId}" is ${node.status}; only a live node can be cancelled`
		};
		this.disposeNode(node);
		this.settle(node, "failed", null, "cancelled by request");
		plan.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
		this.revision += 1;
		this.refreshPlanStatus();
		return {
			ok: true,
			message: null
		};
	}
	/**
	* Start the next ready step(s), up to the unused concurrency slots.
	*
	* The Host does not auto-advance after a child settles — the Leader reviews
	* that result and calls this when it is willing to continue.
	*/
	advance() {
		const plan = this.plan;
		if (plan === null) return "No plan is active. Call flow.plan to create one.";
		if (plan.status === "settled") return "Every node has settled. Summarise the outcome for the user; there is nothing left to dispatch.";
		if (plan.confirm !== null) plan.confirm = null;
		const started = this.pump(plan.parent);
		if (started.length > 0) {
			const deferred = this.describeScopeBlocks();
			const lines = [`Started ${started.map((id) => `"${id}"`).join(", ")}.`];
			if (deferred !== null) lines.push("", deferred);
			lines.push("", this.report());
			return lines.join("\n");
		}
		const running = [...plan.nodes.values()].filter((node) => node.status === "running");
		if (running.length > 0) {
			const deferred = this.describeScopeBlocks();
			const lines = [`Nothing new started; ${running.map((node) => node.spec.id).join(", ")} already running. Wait for that child to settle.`];
			if (deferred !== null) lines.push("", deferred);
			return lines.join("\n");
		}
		const failed = [...plan.nodes.values()].filter((node) => node.status === "failed");
		if (failed.length > 0) return `Nothing is ready. Failed node(s) block dependents: ${failed.map((node) => node.spec.id).join(", ")}. Patch them (retry / skip / add), then call flow.next.`;
		const deferred = this.describeScopeBlocks();
		if (deferred !== null) return deferred;
		return "Nothing is ready to run yet. Call flow.status and inspect the graph.";
	}
	/**
	* Model-facing account of the last pump's write-scope deferrals, or `null`
	* when nothing was deferred.
	*
	* Without this, a Leader whose parallel plan ran one step at a time would
	* only see "already running" and could not tell a full concurrency budget
	* from a scope conflict it is able to fix.
	*/
	describeScopeBlocks() {
		const plan = this.plan;
		if (plan === null || this.lastScopeBlocks.length === 0) return null;
		const lines = ["Deferred for write-scope conflicts (they stay pending and start on a later wave):"];
		for (const block of this.lastScopeBlocks) {
			const node = plan.nodes.get(block.nodeId);
			const holder = plan.nodes.get(block.holderId);
			lines.push(`- "${block.nodeId}" waits for "${block.holderId}": ${holder?.spec.title ?? ""} (${describeScope(holder?.spec ?? {})}) conflicts with ${describeScope(node?.spec ?? {})}.`);
		}
		lines.push("", "To parallelize them, declare disjoint `writeScope` prefixes on each node (or `[]` for a step that only reads).");
		return lines.join("\n");
	}
	/** The wire-safe projection consumed by the canvas. */
	view() {
		const plan = this.plan;
		if (plan === null) return null;
		const nodes = [];
		for (const id of plan.order) {
			const node = plan.nodes.get(id);
			if (node === void 0) continue;
			nodes.push({
				...node.spec,
				status: node.status,
				childId: node.run?.childId ?? null,
				summary: node.summary,
				diagnostic: node.diagnostic,
				notes: [...node.notes],
				updatedAt: node.updatedAt,
				attempts: node.attempts,
				scopeKind: scopeKindOf(node.spec)
			});
		}
		return {
			id: plan.id,
			title: plan.title,
			status: plan.status,
			concurrency: plan.concurrency,
			nodes,
			createdAt: plan.createdAt,
			updatedAt: plan.updatedAt,
			confirm: plan.confirm
		};
	}
	/**
	* Model-facing status. Reads host-held full output, not the canvas summary.
	*
	* `focusId` dumps one node up to `STATUS_FOCUS_LIMIT`. The graph view caps
	* each result and the whole report so a large child cannot blow the turn.
	*/
	report(focusId) {
		const plan = this.plan;
		if (plan === null) return "No plan is active. Call flow.plan to create one.";
		if (focusId !== void 0 && focusId !== "") {
			const node = plan.nodes.get(focusId);
			if (node === void 0) return `Unknown node "${focusId}".`;
			return renderFocused(node);
		}
		const lines = [`Plan "${plan.title}" — ${plan.status}`, ""];
		if (plan.confirm !== null) {
			const where = plan.confirm.nodeId !== null ? ` (${plan.confirm.nodeId})` : "";
			lines.push(`Waiting for human confirmation${where}: ${plan.confirm.question}`, "");
		}
		for (const id of plan.order) {
			const node = plan.nodes.get(id);
			if (node === void 0) continue;
			const deps = node.spec.deps.length === 0 ? "" : ` (deps: ${node.spec.deps.join(", ")})`;
			const parent = node.spec.parentId === void 0 ? "" : ` (parent: ${node.spec.parentId})`;
			const pad = node.spec.parentId === void 0 ? "" : "  ";
			lines.push(`${pad}- ${node.spec.id} [${node.status}] ${node.spec.title}${deps}${parent}`);
			if (node.status === "running" && node.notes.length > 0) lines.push(`    progress: ${node.notes[node.notes.length - 1].text}`);
			if (node.status === "done" && node.output !== null && node.output !== "") {
				lines.push("    result:");
				lines.push(indent(truncate(node.output, STATUS_RESULT_LIMIT)));
			}
			if (node.status === "failed") {
				lines.push(`    failure: ${node.diagnostic ?? "unknown"}`);
				if (node.output !== null && node.output !== "") {
					lines.push("    output:");
					lines.push(indent(truncate(node.output, STATUS_RESULT_LIMIT)));
				}
			}
		}
		lines.push("", "Terminal statuses: done, skipped. A failed node blocks its dependents until you retry or skip it.");
		lines.push("Pass `nodeId` to flow.status to read one node's full output.");
		return truncate(lines.join("\n"), STATUS_TOTAL_LIMIT);
	}
	/** Cancel every live child and drop the plan. Called on plugin disposal. */
	shutdown() {
		this.cancelWake();
		this.disposeCurrentPlan();
		this.plan = null;
		this.generation += 1;
		this.revision += 1;
	}
	/**
	* Dispatch ready nodes up to the unused concurrency slots.
	*
	* Called when the Leader (or an explicit retry/add) asks to start work — not
	* automatically after a sibling settles.
	*/
	pump(parent) {
		const plan = this.plan;
		if (plan === null) return [];
		if (this.subagents === void 0) {
			this.refreshPlanStatus();
			return [];
		}
		if (plan.confirm !== null) {
			this.refreshPlanStatus();
			return [];
		}
		const runningNodes = [...plan.nodes.values()].filter((node) => node.status === "running");
		let budget = plan.concurrency - runningNodes.length;
		const started = [];
		const blocked = [];
		const inFlight = [...runningNodes];
		for (const id of readyIds(this.ordered(), (nodeId) => this.statusOf(nodeId))) {
			if (budget <= 0) break;
			const node = plan.nodes.get(id);
			if (node === void 0 || node.status !== "pending") continue;
			const conflict = inFlight.find((other) => !mayRunTogether(node.spec, other.spec));
			if (conflict !== void 0) {
				blocked.push({
					nodeId: id,
					holderId: conflict.spec.id
				});
				continue;
			}
			if (this.dispatch(node, parent)) {
				started.push(id);
				inFlight.push(node);
				budget -= 1;
			}
		}
		this.lastScopeBlocks = blocked;
		this.refreshPlanStatus();
		return started;
	}
	/**
	* Ready nodes that the last pump deferred for write-scope reasons, with the
	* in-flight holder that caused each deferral.
	*
	* Reported through `flow.status` / `advance()`: a Leader that sees nothing
	* started deserves to know whether the graph was blocked or the scopes were.
	*/
	lastScopeBlocks = [];
	/** Deferrals recorded by the most recent pump, for model-facing reports. */
	get scopeBlocks() {
		return this.lastScopeBlocks;
	}
	/**
	* The write scope and cwd of one live child, or `null` when this session is
	* not a flow child.
	*
	* The tool guard resolves an executing Agent through this. A child is
	* identified by its session id — the only handle the guard has, and the same
	* value the plan already stores as `run.childId`.
	*
	* Returning `null` (rather than an empty scope) is load-bearing: it is what
	* tells the guard "not ours, leave this call alone". A node that declared
	* nothing yields `declared: undefined`, which the guard reads as exclusive.
	*/
	scopeOfChildSession(sessionId) {
		const plan = this.plan;
		if (plan === null) return null;
		for (const node of plan.nodes.values()) {
			if (node.run?.childId !== sessionId) continue;
			const child = this.ctx.get("agents")?.get(sessionId);
			return {
				declared: node.spec.writeScope,
				cwd: child?.session.header.cwd
			};
		}
		return null;
	}
	/** Start one child agent for a node. Returns false when it could not start. */
	dispatch(node, parent) {
		const seam = this.subagents;
		const plan = this.plan;
		if (seam === void 0 || plan === null) return false;
		const generation = this.generation;
		const controller = new AbortController();
		const handle = { run: null };
		const state = { childId: null };
		const run = {
			get childId() {
				return state.childId;
			},
			set childId(value) {
				state.childId = value;
			},
			dispose: async () => {
				controller.abort();
				const started = handle.run;
				if (started !== null) try {
					await started.dispose();
				} catch {}
			},
			result: (async () => {
				const started = await seam.start(DEFAULT_PROVIDER, {
					label: node.spec.title,
					prompt: [{
						type: "text",
						text: this.buildPrompt(node)
					}],
					parent,
					signal: controller.signal,
					...node.spec.persona !== void 0 ? { persona: node.spec.persona } : {},
					...node.spec.toolFilter !== void 0 ? { toolFilter: { ...node.spec.toolFilter } } : {}
				});
				handle.run = started;
				state.childId = started.id;
				const outcome = await started.result;
				return {
					stopReason: outcome.stopReason,
					output: textOf(outcome.output),
					diagnostic: outcome.diagnostic ?? null
				};
			})()
		};
		node.run = run;
		node.status = "running";
		node.attempts += 1;
		node.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
		plan.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
		this.revision += 1;
		run.result.then((outcome) => {
			if (generation !== this.generation) return;
			const ok = outcome.stopReason === "completed";
			const next = ok && this.childrenOf(node.spec.id).length > 0 ? "expanded" : ok ? "done" : "failed";
			this.settle(node, next, outcome.output, outcome.diagnostic);
			this.onSettled(node, outcome);
		}).catch((error) => {
			if (generation !== this.generation) return;
			this.settle(node, "failed", null, `dispatch failed: ${messageOf(error)}`);
			this.onSettled(node, null);
		});
		return true;
	}
	/**
	* After any node settles: refresh the graph and wake the Leader.
	*
	* Do not start the next step here. Sequential review is the point — the
	* Leader inspects the result and calls `flow.next` when it wants to continue.
	*/
	onSettled(node, _outcome) {
		const plan = this.plan;
		if (plan === null) return;
		this.revision += 1;
		this.closeExpandedParents();
		if (node.spec.confirm === true && (node.status === "done" || node.status === "expanded") && plan.confirm === null) plan.confirm = {
			question: `「${node.spec.title}」已完成，是否继续？`,
			nodeId: node.spec.id
		};
		this.refreshPlanStatus();
		const key = `${node.spec.id}@${node.attempts}`;
		if (this.woken.has(key)) return;
		this.woken.add(key);
		const running = [...plan.nodes.values()].filter((item) => item.status === "running").length;
		if (!shouldWakeLeader({
			newlyFailed: node.status === "failed",
			remaining: this.remainingCount(),
			running
		})) return;
		this.scheduleWake(plan.parent);
	}
	/**
	* Merge nearby settlements into a single followup.
	*
	* Parallel children often finish in the same second; without a short delay
	* each would queue its own Leader turn.
	*/
	scheduleWake(parent) {
		this.wakePending = true;
		if (this.wakeTimer !== null) clearTimeout(this.wakeTimer);
		const generation = this.generation;
		this.wakeTimer = setTimeout(() => {
			this.wakeTimer = null;
			if (generation !== this.generation || !this.wakePending) return;
			this.wakePending = false;
			this.wake(parent, this.describeWave());
		}, 400);
	}
	cancelWake() {
		if (this.wakeTimer !== null) {
			clearTimeout(this.wakeTimer);
			this.wakeTimer = null;
		}
		this.wakePending = false;
	}
	/**
	* Hand the Leader a compact account of the current wave.
	*
	* Best effort: the canvas is the primary UI, and a failed wake must never
	* strand the plan. Results stay in the graph for the next `flow.status`.
	*/
	wake(parent, text) {
		try {
			const live = this.ctx.get("agents")?.get(parent.id);
			if (live === void 0 || typeof live.followup !== "function") return;
			const message = createUserMessage({
				content: [{
					type: "text",
					text
				}],
				source: {
					kind: "dsh-flow",
					form: "notice",
					summary: truncate(text, 120)
				}
			});
			live.followup(message);
		} catch {}
	}
	describeWave() {
		const plan = this.plan;
		if (plan === null) return "The flow plan was cleared.";
		const remaining = this.remainingCount();
		const confirmLine = plan.confirm !== null ? `Human confirmation is pending${plan.confirm.nodeId !== null ? ` (${plan.confirm.nodeId})` : ""}: ${plan.confirm.question} Tell the user, then stop. Do not call flow.next until they answer.` : remaining === 0 ? "Every node has settled. Call flow.status, then summarise for the user in one reply." : `${remaining} node(s) still outstanding. Call flow.status, inspect the result, then flow.next to start the next ready step — or flow.patch if it failed. Call flow.confirm only when you need a human decision.`;
		const lines = [
			`Flow update — plan "${plan.title}" is ${plan.status}.`,
			confirmLine,
			""
		];
		for (const id of plan.order) {
			const node = plan.nodes.get(id);
			if (node === void 0) continue;
			let extra = "";
			if (node.status === "failed") extra = ` — ${node.diagnostic ?? "unknown"}`;
			lines.push(`- ${node.spec.id} [${node.status}] ${node.spec.title}${extra}`);
		}
		return lines.join("\n");
	}
	remainingCount() {
		const plan = this.plan;
		if (plan === null) return 0;
		return [...plan.nodes.values()].filter((node) => !SETTLED_STATUSES.includes(node.status)).length;
	}
	settle(node, status, output, diagnostic) {
		node.status = status;
		node.run = null;
		const stored = output === null || output.trim() === "" ? null : truncate(output, OUTPUT_STORE_LIMIT);
		node.output = stored;
		node.summary = stored === null ? null : truncate(stored, SUMMARY_LIMIT);
		node.diagnostic = diagnostic;
		node.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
		if (this.plan !== null) this.plan.updatedAt = node.updatedAt;
	}
	refreshPlanStatus() {
		const plan = this.plan;
		if (plan === null) return;
		const statuses = [...plan.nodes.values()].map((node) => node.status);
		if (statuses.some((status) => status === "running" || status === "ready")) {
			plan.status = "running";
			return;
		}
		plan.status = statuses.every((status) => SETTLED_STATUSES.includes(status)) ? "settled" : "idle";
	}
	async disposeNode(node) {
		const run = node.run;
		node.run = null;
		if (run === null) return;
		try {
			await run.dispose();
		} catch {}
	}
	disposeCurrentPlan() {
		this.cancelWake();
		const plan = this.plan;
		if (plan === null) return;
		for (const node of plan.nodes.values()) if (node.run !== null) this.disposeNode(node);
	}
	ordered() {
		const plan = this.plan;
		if (plan === null) return [];
		const out = [];
		for (const id of plan.order) {
			const node = plan.nodes.get(id);
			if (node !== void 0) out.push({
				id,
				deps: node.spec.deps,
				...node.spec.parentId !== void 0 ? { parentId: node.spec.parentId } : {}
			});
		}
		return out;
	}
	statusOf(id) {
		return this.plan?.nodes.get(id)?.status ?? "pending";
	}
	childrenOf(id) {
		const plan = this.plan;
		if (plan === null) return [];
		return [...plan.nodes.values()].filter((node) => node.spec.parentId === id);
	}
	parentDepth(id) {
		const plan = this.plan;
		if (plan === null) return 0;
		let depth = 0;
		let current = id;
		const seen = /* @__PURE__ */ new Set();
		while (current !== void 0 && current !== "") {
			if (seen.has(current)) break;
			seen.add(current);
			const next = plan.nodes.get(current)?.spec.parentId;
			if (next === void 0 || next === "") break;
			depth += 1;
			current = next;
		}
		return depth;
	}
	/** Nodes that already have children never run themselves — they are containers. */
	markContainers() {
		const plan = this.plan;
		if (plan === null) return;
		for (const node of plan.nodes.values()) {
			if (node.status !== "pending") continue;
			if (this.childrenOf(node.spec.id).length === 0) continue;
			node.status = "expanded";
		}
	}
	/** An expanded parent becomes `done` once every child has settled. */
	closeExpandedParents() {
		const plan = this.plan;
		if (plan === null) return;
		let changed = true;
		while (changed) {
			changed = false;
			for (const node of plan.nodes.values()) {
				if (node.status !== "expanded") continue;
				const children = this.childrenOf(node.spec.id);
				if (children.length === 0) continue;
				if (!children.every((child) => SETTLED_STATUSES.includes(child.status))) continue;
				node.status = "done";
				if (node.summary === null) node.summary = "subtree completed";
				node.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
				changed = true;
			}
		}
	}
	insertNode(spec) {
		const plan = this.plan;
		if (plan === null) return {
			ok: false,
			message: "no plan is active"
		};
		if (plan.nodes.has(spec.id)) return {
			ok: false,
			message: `node "${spec.id}" already exists`
		};
		if (spec.deps.includes(spec.id)) return {
			ok: false,
			message: `node "${spec.id}" depends on itself`
		};
		for (const dep of spec.deps) if (!plan.nodes.has(dep)) return {
			ok: false,
			message: `node "${spec.id}" depends on unknown node "${dep}"`
		};
		if (spec.parentId !== void 0 && spec.parentId !== "") {
			if (spec.parentId === spec.id) return {
				ok: false,
				message: `node "${spec.id}" cannot be its own parent`
			};
			if (!plan.nodes.has(spec.parentId)) return {
				ok: false,
				message: `unknown parent "${spec.parentId}"`
			};
			if (this.parentDepth(spec.parentId) >= 3) return {
				ok: false,
				message: `node "${spec.id}" would nest deeper than 4 levels`
			};
		}
		for (const dep of spec.deps) if (this.dependsOn(dep, spec.id)) return {
			ok: false,
			message: `adding "${spec.id}" would create a cycle through "${dep}"`
		};
		const now = (/* @__PURE__ */ new Date()).toISOString();
		plan.nodes.set(spec.id, {
			spec: normalizeSpec(spec),
			status: "pending",
			run: null,
			output: null,
			summary: null,
			diagnostic: null,
			notes: [],
			updatedAt: now,
			attempts: 0
		});
		plan.order.push(spec.id);
		plan.updatedAt = now;
		if (plan.status === "settled") plan.status = "idle";
		return {
			ok: true,
			message: null
		};
	}
	/**
	* The brief handed to the child.
	*
	* Children run in their own context, so the brief must be self-contained.
	* We add the upstream results the Leader declared — that is what makes a DAG
	* more useful than a flat task list.
	*/
	buildPrompt(node) {
		const plan = this.plan;
		const lines = [
			`# Task: ${node.spec.title}`,
			"",
			node.spec.prompt.trim()
		];
		if (plan !== null && node.spec.deps.length > 0) {
			const upstream = [];
			for (const dep of node.spec.deps) {
				const depNode = plan.nodes.get(dep);
				if (depNode === void 0) continue;
				const outcome = depNode.status === "done" ? truncate(depNode.output ?? depNode.summary ?? "(no output)", UPSTREAM_LIMIT) : depNode.status === "skipped" ? "(skipped by the Leader)" : "(not settled)";
				upstream.push(`- ${depNode.spec.title} (${dep}): ${outcome}`);
			}
			if (upstream.length > 0) lines.push("", "## Upstream steps", "", ...upstream);
		}
		lines.push("", CHILD_EXPAND_HINT);
		lines.push("", CHILD_REPORT_HINT);
		lines.push("", "## Output contract", "Answer with only the result of this one step. Do not plan beyond it and do not modify unrelated files.");
		return lines.join("\n");
	}
	/** Column index per node, exported for the canvas layout. */
	layout() {
		return depthOf(this.ordered());
	}
};
function normalizeSpec(spec) {
	const deps = Array.isArray(spec.deps) ? [...new Set(spec.deps.filter((dep) => typeof dep === "string"))] : [];
	return {
		id: spec.id,
		title: spec.title.trim(),
		prompt: spec.prompt,
		deps,
		...spec.parentId !== void 0 && spec.parentId !== "" ? { parentId: spec.parentId } : {},
		...spec.persona !== void 0 ? { persona: spec.persona } : {},
		...spec.confirm === true ? { confirm: true } : {},
		...spec.toolFilter !== void 0 ? { toolFilter: { ...spec.toolFilter } } : {},
		...Array.isArray(spec.writeScope) ? { writeScope: [...spec.writeScope] } : {}
	};
}
function textOf(blocks) {
	const parts = [];
	for (const block of blocks) if (block.type === "text" && typeof block.text === "string") parts.push(block.text);
	return parts.join("\n\n").trim();
}
function messageOf(error) {
	return error instanceof Error ? error.message : String(error);
}
function renderFocused(node) {
	const lines = [`${node.spec.id} [${node.status}] ${node.spec.title}`, node.spec.deps.length === 0 ? "deps: (none)" : `deps: ${node.spec.deps.join(", ")}`];
	if (node.diagnostic !== null) lines.push(`failure: ${node.diagnostic}`);
	const body = node.output ?? node.summary;
	if (body !== null && body !== "") lines.push("", "output:", body);
	return truncate(lines.join("\n"), STATUS_FOCUS_LIMIT);
}
function indent(value) {
	return value.split("\n").map((line) => `      ${line}`).join("\n");
}
//#endregion
//#region src/guard.ts
/**
* The write guard: which tool calls a flow child may make, given the write
* scope its node declared.
*
* This is the enforcement half of `./scope.ts` (the scheduling half). Both are
* needed: the scheduler stops two overlapping writers from sharing a wave, and
* the guard stops a running writer from reaching outside the scope it was
* scheduled under. Without the guard, a node's `writeScope` would be a promise
* the model could quietly break mid-run.
*
* Kept pure so the rules are unit-testable: the caller supplies the tool name,
* its parsed arguments, and the child's cwd.
*
* ## What is and is not enforced
*
* `edit` and `write` take a path, so containment is decidable and is enforced.
*
* Shells are NOT path-checkable, so a declared scope refuses them outright
* rather than attempting a parser (see {@link SHELL_TOOLS}). A step that needs
* a shell keeps no scope and runs exclusively.
*
* Enforcement lives here rather than in a per-child `tools.restrict()` filter:
* `restrict()` validates names against the registry and THROWS on unknown ones,
* while `pwsh` is absent on macOS and `subagent` is absent whenever Agent Teams
* replaces it — a static deny list would crash child creation on normal setups.
*/
/** Structured writers whose target path can be read from the arguments. */
const PATH_TOOLS = ["edit", "write"];
/**
* Shells: no parseable containment, so a scoped child may not use them.
*
* A shell command can write anywhere — through a redirection, a script, a build
* tool — and any parser would have holes that fail *open*, which is worse than
* no claim at all (Claude Code's own worktree isolation refuses commands it
* cannot parse for exactly this reason). So the honest route is taken instead
* of guessing: declaring a non-empty scope removes the shells from that child
* through the guard below. A step that needs a shell keeps no scope and runs
* exclusively. Parallel safety and unrestricted shell are therefore mutually
* exclusive by construction, not by convention.
*/
const SHELL_TOOLS = ["bash", "pwsh"];
/**
* Escape hatches that could reach a writer this guard never inspects.
*
* Exactly one rule decides membership: does the tool create a NEW session? A
* delegation (`subagent`, `subagent_fork`, `spawn_teammate`) or a
* `workflow` script starts child agents on their own sessions, and this guard
* resolves a caller by session — so a write issued inside one of those children
* is never checked. Blocking the hatch is the only sound option.
*
* Deliberately NOT in this list, though it looks like one:
*   - `run_code` (PTC): its inner calls are dispatched back through the tool
*     scheduler carrying the SAME `exec.agent`, so `tools.edit(...)` inside a
*     program IS guarded by the checks above. Blocking the transport would be
*     redundant, and actively harmful — under an r-mode/ptc preset `run_code`
*     is the only outer tool a child has, so a scoped node could not work at
*     all. `tools.bash(...)` inside it is still refused by {@link SHELL_TOOLS}.
*   - `skill`: it returns instructions, not a session or a write.
*
* Not covered at all, and stated in the README rather than papered over: MCP
* tools and any other out-of-process writer. A scoped node's guarantee is
* therefore "inside the DSH file tools and their PTC bindings", not "inside the
* filesystem".
*/
const ESCAPE_HATCH_TOOLS = [
	"subagent",
	"subagent_fork",
	"spawn_teammate",
	"workflow"
];
[...SHELL_TOOLS, ...ESCAPE_HATCH_TOOLS];
/** Read `file_path` off tool arguments, tolerating the spellings tools accept. */
function pathArgumentOf(args) {
	if (args === null || typeof args !== "object") return null;
	const value = args;
	for (const key of [
		"file_path",
		"filePath",
		"path"
	]) {
		const candidate = value[key];
		if (typeof candidate === "string" && candidate.trim() !== "") return candidate;
	}
	return null;
}
/**
* Why this tool call must be refused, or `null` to allow it.
*
* Ordering note: the "no declaration" case returns early. An exclusive node is
* a *scheduling* claim ("run me alone"), not a grant restriction — refusing its
* writes would break every plan that never declared a scope, which is the
* default.
*
* Enforcement deliberately lives in the guard rather than in a per-child
* `tools.restrict()` filter: `restrict()` validates its names against the
* registry and THROWS on an unknown one, while a name like `pwsh` is absent on
* macOS and `subagent` is absent whenever Agent Teams replaces it. A static
* deny list would therefore crash child creation on perfectly normal setups.
* The guard takes an arbitrary name and simply is not consulted for tools that
* do not exist, so the same rule holds on every platform.
*/
function guardReason(input) {
	const { toolName, declared, args, cwd } = input;
	if (declared === void 0) return null;
	const readOnly = scopeKindOf({ writeScope: declared }) === "readonly";
	if (PATH_TOOLS.includes(toolName)) {
		if (readOnly) return `This step declared writeScope: [], so it may not modify files. "${toolName}" is refused; report what needs changing instead.`;
		const target = pathArgumentOf(args);
		if (target === null) return null;
		const denial = writeDenialReason(declared, workspaceRelative(target, cwd));
		if (denial === null) return null;
		return `${denial}. Stay inside the declared writeScope, or report the needed change so the Leader can schedule it.`;
	}
	if (SHELL_TOOLS.includes(toolName)) return `"${toolName}" is unavailable to a step that declares a writeScope, because a shell can write outside it. Do the edit with the file tools, or ask the Leader to re-plan this step with no writeScope (it will then run alone).`;
	if (ESCAPE_HATCH_TOOLS.includes(toolName)) return `"${toolName}" is unavailable to a step that declares a writeScope: the agent or script it starts is a different session that this scope cannot govern. Do the work directly, or ask the Leader to re-plan this step with no writeScope (it will then run alone).`;
	return null;
}
//#endregion
//#region src/tools.ts
/**
* The Leader's tool surface.
*
* Five tools, deliberately few: the Leader plans, inspects, advances, reshapes,
* and clears — it never executes. Every tool that needs the delegating Agent reads
* it from its own execution context, so the orchestrator always knows whose
* plan it is driving.
*
* The parameter schema is the repository's author-facing DSL, not raw JSON
* Schema: object nodes must declare `additionalProperties`, arrays carry a
* single `items` value schema, and nested objects are `type: 'object'` values.
*/
/** Rejection text when a flow tool is called outside Flow mode. */
const MODE_OFF = "Flow mode is off. Enter it with `/flow` before using flow tools.";
/**
* The node shape, shared by `flow.plan`, `flow.patch`, and `flow.expand`.
*
* Exported so the boot-safety test compiles THE REAL schema rather than a copy:
* a duplicated literal in the test file cannot catch drift, and an unsupported
* key here crashes the whole profile at startup (these tools are built inside
* `apply()`).
*
* No `required` block on purpose. The schema DSL compiles an array's `items`
* with `allowRequired: false`, so a `required` key inside an object that is
* itself an array item is rejected at boot — a hard failure, not a warning.
* Requiredness is therefore described in the description text and enforced by
* `readNode`, which already validates every argument before use.
*/
const NODE_SCHEMA = {
	type: "object",
	additionalProperties: false,
	properties: {
		id: {
			type: "string",
			description: "Required. Stable unique id, referenced by other nodes in `deps`."
		},
		title: {
			type: "string",
			description: "Required. One-line label shown on the graph."
		},
		prompt: {
			type: "string",
			description: "Required. The complete self-contained brief for this step."
		},
		deps: {
			type: "array",
			items: { type: "string" },
			description: "Ids that must settle first."
		},
		parentId: {
			type: "string",
			description: "Optional. Nest this node under another node as a child step."
		},
		persona: {
			type: "string",
			description: "Optional per-node persona override for the child."
		},
		confirm: {
			type: "boolean",
			description: "Optional. If true, pause for a human after this node settles."
		},
		writeScope: {
			type: "array",
			items: { type: "string" },
			description: "Workspace-relative paths this step may modify. Omit it and the step runs ALONE (unknown blast radius). Pass [] for a step that only reads. Pass explicit prefixes ([\"src/auth\", \"src/auth/client.ts\"]) so steps with disjoint scopes share a wave. A child is hard-blocked from writing outside its declared prefixes."
		}
	}
};
/** Render a plan outcome as the model-facing text of one tool call. */
function renderPlan(outcome) {
	if (!outcome.ok) return [
		`Plan rejected: ${outcome.rejection.message}`,
		"",
		"Fix the graph and call flow.plan again. Nothing was dispatched."
	].join("\n");
	const plan = outcome.plan;
	const lines = [`Plan "${plan.title}" accepted with ${plan.nodes.length} node(s); concurrency ${plan.concurrency}.`, ""];
	for (const node of plan.nodes) {
		const deps = node.deps.length === 0 ? "no deps" : `depends on ${node.deps.join(", ")}`;
		lines.push(`- ${node.id} [${node.status}] ${node.title} (${deps}) — ${SCOPE_LABEL[node.scopeKind]}`);
	}
	const started = plan.nodes.filter((node) => node.status === "running");
	const exclusive = plan.nodes.filter((node) => node.scopeKind === "exclusive");
	if (plan.nodes.length > 1 && exclusive.length > 0) lines.push("", `${exclusive.length} node(s) declared no \`writeScope\`, so they run one at a time and block every other writer while running.`, "If those steps touch disjoint directories, declare each `writeScope` and they will share a wave.");
	lines.push("", started.length > 0 ? `Started ${started.length} step(s): ${started.map((node) => node.id).join(", ")}. Tell the user those are running, then stop.` : "Nothing started yet. Inspect the graph with flow.status.", "When a step settles, inspect with flow.status. If the result is good, call flow.next.", "Later steps do not start until you do.");
	return lines.join("\n");
}
/** One-line scope summary for tool output. */
const SCOPE_LABEL = {
	exclusive: "独占（未声明 writeScope，单独运行）",
	readonly: "只读",
	scoped: "可并行（已声明写作用域）"
};
function createFlowTools(deps) {
	const { orchestrator, parentOf, isEnabled } = deps;
	/** Guard every flow tool on the session's mode. */
	const gate = (exec) => {
		const parent = parentOf(exec);
		if (parent === void 0) return "flow tools require a live agent context.";
		if (!isEnabled(sessionIdOf(parent))) return MODE_OFF;
		return null;
	};
	return [
		defineTool({
			name: "flow.plan",
			description: "Flow mode only. Replace the current workflow graph with a new plan and start the first ready step(s). Later steps stay pending until you accept a result and call flow.next. Use `parentId` to nest child steps under a node. A child that finds it owns several tasks can also call flow.expand. Each node needs a complete, self-contained prompt. For real parallelism, give every step that writes a `writeScope`; steps without one run alone.",
			parameters: {
				title: {
					type: "string",
					description: "Short name for this plan, shown on the Flow tab."
				},
				nodes: {
					type: "array",
					description: "The steps. Order does not matter; dependencies do.",
					items: NODE_SCHEMA
				},
				concurrency: {
					type: "integer",
					description: `How many steps may run at once (1–8). Actual parallelism is also bounded by write scopes: steps with no declared \`writeScope\` never overlap, and overlapping scopes are deferred to a later wave.`
				}
			},
			output: {
				schema: { type: "string" },
				render: (_args, value) => [{
					type: "text",
					text: value
				}]
			},
			execute: async (args, exec) => {
				const blocked = gate(exec);
				if (blocked !== null) return blocked;
				const parent = parentOf(exec);
				if (parent === void 0) return "flow.plan requires a live agent context.";
				const normalized = normalizePlanArgs(args);
				if (typeof normalized === "string") return normalized;
				return renderPlan(orchestrator.setPlan(normalized, parent));
			}
		}),
		defineTool({
			name: "flow.status",
			description: "Flow mode only. Read the current workflow graph with each completed node's output. Call this after a child settles, before flow.next or flow.patch. Pass `nodeId` to read one node's full output.",
			parameters: { nodeId: {
				type: "string",
				description: "Optional. If set, return that node's full output instead of the compact graph."
			} },
			output: {
				schema: { type: "string" },
				render: (_args, value) => [{
					type: "text",
					text: value
				}]
			},
			execute: async (args, exec) => {
				const blocked = gate(exec);
				if (blocked !== null) return blocked;
				const nodeId = typeof args.nodeId === "string" ? args.nodeId : void 0;
				return orchestrator.report(nodeId);
			}
		}),
		defineTool({
			name: "flow.next",
			description: "Flow mode only. After you have inspected a settled child and accepted the result, start the next ready step. The Host does not auto-advance. Call this once per review unless a human confirmation is pending — then wait for the user (or they click 「通过并继续」). Do not start later work yourself.",
			parameters: {},
			output: {
				schema: { type: "string" },
				render: (_args, value) => [{
					type: "text",
					text: value
				}]
			},
			execute: async (_args, exec) => {
				const blocked = gate(exec);
				if (blocked !== null) return blocked;
				return orchestrator.advance();
			}
		}),
		defineTool({
			name: "flow.expand",
			description: "Split one graph node into child steps. The running child of that node may call this when the assignment is actually several tasks (for example implementing a feature). The Leader may also call it. New children do not start until the Leader reviews and calls flow.next. After expanding, the child should stop — do not execute the subtree yourself.",
			parameters: {
				parentId: {
					type: "string",
					description: "Node to expand. Optional for a running child — inferred. The Leader must set it."
				},
				nodes: {
					type: "array",
					description: "Child steps to insert under the parent.",
					items: NODE_SCHEMA
				}
			},
			output: {
				schema: { type: "string" },
				render: (_args, value) => [{
					type: "text",
					text: value
				}]
			},
			execute: async (args, exec) => {
				const caller = parentOf(exec);
				if (caller === void 0) return "flow.expand requires a live agent context.";
				const running = orchestrator.runningNodeFor(caller);
				if (!isEnabled(sessionIdOf(caller)) && running === null) return "flow.expand is for the Leader (after `/flow`) or the child that is currently running a node.";
				const requested = typeof args.parentId === "string" ? args.parentId.trim() : "";
				const parentId = running !== null ? running.spec.id : requested;
				if (parentId === "") return "flow.expand needs `parentId` when the Leader calls it.";
				if (running !== null && requested !== "" && requested !== parentId) return `A running child can only expand its own node (${parentId}).`;
				if (!Array.isArray(args.nodes)) return "flow.expand needs a `nodes` array.";
				const nodes = [];
				for (const raw of args.nodes) {
					const spec = readNode(raw);
					if (typeof spec === "string") return spec;
					nodes.push(spec);
				}
				return orchestrator.expand(parentId, nodes);
			}
		}),
		defineTool({
			name: "flow.confirm",
			description: "Pause the plan until a human answers. Use only when a real decision is needed — not after every step. The Leader or the running child may call it. After calling, stop. The Flow tab shows the question; the user clicks 「通过并继续」 or replies in chat.",
			parameters: {
				question: {
					type: "string",
					description: "Required. Short question shown to the user."
				},
				nodeId: {
					type: "string",
					description: "Optional. Node this question is about. Inferred for a running child."
				}
			},
			output: {
				schema: { type: "string" },
				render: (_args, value) => [{
					type: "text",
					text: value
				}]
			},
			execute: async (args, exec) => {
				const caller = parentOf(exec);
				if (caller === void 0) return "flow.confirm requires a live agent context.";
				const running = orchestrator.runningNodeFor(caller);
				if (!isEnabled(sessionIdOf(caller)) && running === null) return "flow.confirm is for the Leader (after `/flow`) or the child that is currently running a node.";
				const question = typeof args.question === "string" ? args.question : "";
				const requested = typeof args.nodeId === "string" ? args.nodeId.trim() : "";
				const nodeId = running !== null ? running.spec.id : requested === "" ? null : requested;
				if (running !== null && requested !== "" && requested !== nodeId) return `A running child can only request confirmation for its own node (${nodeId}).`;
				return orchestrator.requestConfirm(question, nodeId, { wake: running !== null });
			}
		}),
		defineTool({
			name: "flow.report",
			description: "Post a one-line progress note to the Flow canvas. For the child currently running a node: after a burst of tool calls produces a conclusion (a finding, a decision, a finished change, a verified result, a blocker), report that conclusion so the user can follow your work. Do not call it for individual tool calls.",
			parameters: { note: {
				type: "string",
				description: "Required. One line stating the conclusion, e.g. \"鉴权模块读完，token 刷新逻辑需要改两处\"."
			} },
			output: {
				schema: { type: "string" },
				render: (_args, value) => [{
					type: "text",
					text: value
				}]
			},
			execute: async (args, exec) => {
				const caller = parentOf(exec);
				if (caller === void 0) return "flow.report requires a live agent context.";
				const note = typeof args.note === "string" ? args.note : "";
				return orchestrator.reportNote(caller, note);
			}
		}),
		defineTool({
			name: "flow.patch",
			description: "Flow mode only. Adjust the current workflow graph in response to child results. `retry` re-dispatches a settled node (optionally with a revised prompt, title, or dependency set) and unblocks its dependents; `skip` marks it done-without-running so dependents can proceed; `cancel` stops a live node and marks it failed; `add` inserts new nodes — use it to insert a corrective step after a failure. You cannot change a node that is currently running.",
			parameters: { ops: {
				type: "array",
				description: "The adjustments to apply, in order.",
				items: {
					type: "object",
					additionalProperties: false,
					properties: {
						op: {
							type: "string",
							enum: [
								"retry",
								"skip",
								"cancel",
								"add",
								"remove"
							],
							description: "Required. The adjustment to apply."
						},
						nodeId: {
							type: "string",
							description: "Target node id (for retry / skip / cancel / remove)."
						},
						node: {
							description: "For `add`: the new node. For `retry`: fields to override before re-dispatching.",
							type: "json"
						}
					}
				}
			} },
			output: {
				schema: { type: "string" },
				render: (_args, value) => [{
					type: "text",
					text: value
				}]
			},
			execute: async (args, exec) => {
				const blocked = gate(exec);
				if (blocked !== null) return blocked;
				return applyPatch(orchestrator, Array.isArray(args.ops) ? args.ops : []);
			}
		}),
		defineTool({
			name: "flow.clear",
			description: "Flow mode only. Cancel every running child and drop the current plan. Use it when the plan is obsolete or the user changes direction.",
			parameters: {},
			output: {
				schema: { type: "string" },
				render: (_args, value) => [{
					type: "text",
					text: value
				}]
			},
			execute: async (_args, exec) => {
				const blocked = gate(exec);
				if (blocked !== null) return blocked;
				const result = orchestrator.applyAction({ kind: "clear" });
				return result.ok ? "Plan cleared; every running child was cancelled." : `Could not clear: ${result.message}`;
			}
		})
	];
}
function normalizePlanArgs(args) {
	if (args === null || typeof args !== "object") return "flow.plan needs an object argument.";
	const value = args;
	const title = typeof value.title === "string" ? value.title : "Untitled plan";
	if (!Array.isArray(value.nodes)) return "flow.plan needs a `nodes` array.";
	const nodes = [];
	for (const raw of value.nodes) {
		const spec = readNode(raw);
		if (typeof spec === "string") return spec;
		nodes.push(spec);
	}
	const spec = {
		title,
		nodes,
		...typeof value.concurrency === "number" ? { concurrency: value.concurrency } : {}
	};
	const validated = validatePlan(spec);
	if (!validated.ok) return `Plan rejected: ${validated.rejection.message}`;
	return spec;
}
/**
* Apply patch ops sequentially, reporting each result.
*
* Sequential matters: a later op may depend on the graph an earlier op produced
* (skip a subtree, then add a corrective node behind it).
*/
function applyPatch(orchestrator, ops) {
	if (ops.length === 0) return "flow.patch needs at least one op.";
	const lines = [];
	for (const raw of ops) {
		if (raw === null || typeof raw !== "object") {
			lines.push("- skipped a malformed op (not an object)");
			continue;
		}
		const op = raw;
		const kind = op.op;
		const nodeId = typeof op.nodeId === "string" ? op.nodeId : null;
		if (kind === "add") {
			const spec = readNode(op.node);
			if (typeof spec === "string") {
				lines.push(`- add: ${spec}`);
				continue;
			}
			const result = orchestrator.addNode(spec);
			lines.push(`- add ${spec.id}: ${result.ok ? "inserted" : result.message ?? "failed"}`);
			continue;
		}
		if (kind === "remove") {
			if (nodeId === null) {
				lines.push("- remove: needs `nodeId`");
				continue;
			}
			const result = orchestrator.removeNode(nodeId);
			lines.push(`- remove ${nodeId}: ${result.ok ? "removed" : result.message ?? "failed"}`);
			continue;
		}
		if (kind !== "retry" && kind !== "skip" && kind !== "cancel") {
			lines.push(`- unknown op "${String(kind)}"`);
			continue;
		}
		if (nodeId === null) {
			lines.push(`- ${String(kind)}: needs \`nodeId\``);
			continue;
		}
		if (kind === "retry" && op.node !== void 0 && op.node !== null) {
			const patch = readNodePatch(op.node);
			if (typeof patch === "string") {
				lines.push(`- retry ${nodeId}: ${patch}`);
				continue;
			}
			const updated = orchestrator.updateNode(nodeId, patch);
			if (!updated.ok) {
				lines.push(`- retry ${nodeId}: ${updated.message ?? "could not update the node"}`);
				continue;
			}
		}
		const action = {
			kind,
			nodeId
		};
		const result = orchestrator.applyAction(action);
		lines.push(`- ${kind} ${nodeId}: ${result.ok ? "applied" : result.message ?? "failed"}`);
	}
	lines.push("", orchestrator.report());
	return lines.join("\n");
}
function readNode(raw) {
	if (raw === null || typeof raw !== "object") return "every node must be an object.";
	const node = raw;
	if (typeof node.id !== "string" || node.id.trim() === "") return "every node needs a non-empty string `id`.";
	if (typeof node.title !== "string" || node.title.trim() === "") return `\`${node.id}\` needs a non-empty string \`title\`.`;
	if (typeof node.prompt !== "string" || node.prompt.trim() === "") return `\`${node.id}\` needs a non-empty string \`prompt\`.`;
	const deps = Array.isArray(node.deps) ? node.deps.filter((dep) => typeof dep === "string") : [];
	return {
		id: node.id,
		title: node.title,
		prompt: node.prompt,
		deps,
		...typeof node.parentId === "string" && node.parentId.trim() !== "" ? { parentId: node.parentId } : {},
		...typeof node.persona === "string" ? { persona: node.persona } : {},
		...node.confirm === true ? { confirm: true } : {},
		...Array.isArray(node.writeScope) ? { writeScope: node.writeScope.filter((entry) => typeof entry === "string") } : {}
	};
}
function readNodePatch(raw) {
	if (raw === null || typeof raw !== "object") return "`node` must be an object.";
	const node = raw;
	const patch = {};
	if (typeof node.title === "string" && node.title.trim() !== "") patch.title = node.title;
	if (typeof node.prompt === "string" && node.prompt.trim() !== "") patch.prompt = node.prompt;
	if (Array.isArray(node.deps)) patch.deps = node.deps.filter((dep) => typeof dep === "string");
	if (Object.keys(patch).length === 0) return "`node` carried no updatable fields.";
	return patch;
}
//#endregion
//#region src/index.ts
const name = "dsh-flow";
const inject = [
	HOST_SERVICES.systemPrompt,
	HOST_SERVICES.tools,
	HOST_SERVICES.webServer
];
/**
* Where the Leader section sits in the assembled prompt.
*
* The repository's shared boundary pins an older `@deepseek-ai/dsh-system-prompt`
* whose service does not expose `getSectionOrder`, so the band is a literal.
* 30 places it after the deployment persona and before tool guidance.
*/
const LEADER_SECTION_ORDER = 30;
/**
* Tools the Leader may still call while Flow mode is on.
*
* Everything else — notably `edit`, `write`, `bash` — disappears from the
* model's visible tool set, which is what makes "the Leader only plans" a
* structural guarantee rather than a request. Read-only tools stay because a
* Leader that can read the codebase plans better; the point is to remove the
* ability to *do* the work, not to blind it.
*/
const LEADER_TOOL_ALLOWLIST = [
	"flow.plan",
	"flow.status",
	"flow.next",
	"flow.expand",
	"flow.confirm",
	"flow.report",
	"flow.patch",
	"flow.clear",
	"read",
	"glob",
	"grep",
	"read_image",
	"web_search",
	"web_fetch",
	"skill",
	"todo_write",
	"ask_user_question"
];
function apply(ctx) {
	const subagents = ctx.get("subagents");
	const orchestrator = new FlowOrchestrator(ctx, subagents);
	const modes = createFlowModeStore();
	if (subagents === void 0) ctx.logger("dsh-flow").warn("subagent service unavailable; plans will validate but never dispatch");
	ctx.effect(() => {
		const disposers = createFlowTools({
			orchestrator,
			parentOf: (exec) => exec.agent,
			isEnabled: (sessionId) => modes.isOn(sessionId)
		}).map((tool) => ctx.tools.register(tool));
		return () => {
			for (const dispose of disposers) dispose();
		};
	}, "dsh-flow: model tools");
	ctx.effect(() => ctx.systemPrompt.section({
		name: "dsh-flow:leader",
		order: LEADER_SECTION_ORDER,
		text: (context) => {
			const agent = context.agent;
			if (agent === void 0) return "";
			if (!modes.isOn(sessionIdOf(agent))) return "";
			return orchestrator.view() === null ? `${LEADER_POLICY}\n\n${IDLE_HINT}` : LEADER_POLICY;
		}
	}), "dsh-flow: leader section");
	ctx.effect(() => ctx.tools.guard((exec) => {
		const agent = exec.agent;
		if (agent === void 0) return void 0;
		if (!modes.isOn(sessionIdOf(agent))) return void 0;
		if (LEADER_TOOL_ALLOWLIST.includes(exec.name)) return void 0;
		return `Flow mode is on: "${exec.name}" is unavailable to the Leader. Express this work as a step in the graph (flow.plan / flow.patch) and let a child agent execute it, or leave Flow mode with \`/flow off\`.`;
	}), "dsh-flow: leader tool guard");
	ctx.effect(() => ctx.tools.guard((exec) => {
		const agent = exec.agent;
		if (agent === void 0) return void 0;
		const child = orchestrator.scopeOfChildSession(sessionIdOf(agent));
		if (child === null) return void 0;
		return guardReason({
			toolName: exec.name,
			args: exec.arguments,
			declared: child.declared,
			cwd: child.cwd
		}) ?? void 0;
	}), "dsh-flow: write-scope guard");
	ctx.effect(() => ctx.on("agent/pre-step", (payload, next) => {
		commitFlowMode(modes, sessionIdOf(payload.agent));
		return next();
	}), "dsh-flow: commit mode at pre-step");
	ctx.effect(() => ctx.webServer.register({
		kind: "exact",
		path: STATE_PATH,
		handler: (req, res) => {
			handleState(req, res, orchestrator, modes);
		}
	}), "dsh-flow: state route");
	ctx.effect(() => ctx.webServer.register({
		kind: "exact",
		path: ACTION_PATH,
		handler: (req, res) => {
			handleAction(req, res, orchestrator, modes);
		}
	}), "dsh-flow: action route");
	ctx.effect(() => ctx.webServer.register({
		kind: "exact",
		path: MODE_PATH,
		handler: (req, res) => {
			handleMode(req, res, modes);
		}
	}), "dsh-flow: mode route");
	ctx.inject([HOST_SERVICES.commands], (commandCtx) => {
		ctx.effect(() => commandCtx.commands.register({
			name: FLOW_COMMAND,
			description: "Enter or leave Flow mode (Leader plans, child agents execute)",
			input: { hint: "[off|message]" },
			handler: ({ agent, rawInput }) => handleFlowCommand(agent, rawInput, modes, orchestrator)
		}), "dsh-flow: command");
	});
	ctx.effect(() => () => {
		orchestrator.shutdown();
		modes.clear();
	}, "dsh-flow: shutdown");
}
/** `/flow [off|message]` — the explicit switch the user asked for. */
function handleFlowCommand(agent, rawInput, modes, orchestrator) {
	const sessionId = sessionIdOf(agent);
	const message = rawInput.trim();
	const turnOpen = agent.status === "running";
	const outcome = setFlowMode(modes, sessionId, message !== "off", turnOpen);
	if (message === "off") {
		if (orchestrator.view() !== null) orchestrator.applyAction({ kind: "clear" });
		return {
			kind: "success",
			text: formatOff(outcome)
		};
	}
	if (message !== "") agent.steer(createUserMessage({
		content: [{
			type: "text",
			text: message
		}],
		source: { kind: "user" }
	}));
	return {
		kind: "success",
		text: formatOn(outcome, turnOpen, message !== "")
	};
}
function formatOn(outcome, turnOpen, forwarded) {
	const forwardedNote = forwarded ? " The rest of the line was forwarded as the task." : "";
	switch (outcome) {
		case "noop": return `Flow mode is already on.${forwardedNote}`;
		case "queued": return `Entering Flow mode (applies from the next step).${forwardedNote}`;
		default: return turnOpen ? `Flow mode on. From the next step I will plan work as a graph and delegate each step to a child agent.${forwardedNote}` : [
			"Flow mode on. I am now the Leader: I plan work as a dependency graph and",
			"delegate each step to a child agent. Execution tools are unavailable to me",
			"while this mode is on — use `/flow off` to leave."
		].join(" ") + forwardedNote;
	}
}
function formatOff(outcome) {
	switch (outcome) {
		case "noop": return "Flow mode is already off.";
		case "queued": return "Leaving Flow mode (applies from the next step).";
		default: return "Flow mode off. Execution tools restored; any running child agents were cancelled.";
	}
}
async function handleState(req, res, orchestrator, modes) {
	if (req.method !== "GET") {
		send(res, 405, {
			ok: false,
			message: "method not allowed"
		});
		return;
	}
	const sessionId = sessionOf(req);
	if (sessionId === null) {
		send(res, 400, {
			ok: false,
			message: "sessionId is required"
		});
		return;
	}
	const state = modes.get(sessionId);
	send(res, 200, {
		ok: true,
		value: {
			plan: orchestrator.view(),
			mode: modes.isOn(sessionId),
			modePending: state?.wanted ?? null,
			degraded: orchestrator.degradedReason !== null,
			degradedReason: orchestrator.degradedReason
		}
	});
}
async function handleAction(req, res, orchestrator, modes) {
	if (req.method !== "POST") {
		send(res, 405, {
			ok: false,
			message: "method not allowed"
		});
		return;
	}
	const sessionId = sessionOf(req);
	if (sessionId === null) {
		send(res, 400, {
			ok: false,
			message: "sessionId is required"
		});
		return;
	}
	let body;
	try {
		body = await readJsonBody(req);
	} catch (error) {
		send(res, 400, {
			ok: false,
			message: errorMessage(error)
		});
		return;
	}
	const action = parseRequest(body);
	if (action === null) {
		send(res, 400, {
			ok: false,
			message: "invalid action"
		});
		return;
	}
	if (action.kind === "setMode") {
		const outcome = setFlowMode(modes, sessionId, action.on, false);
		if (!action.on && orchestrator.view() !== null) orchestrator.applyAction({ kind: "clear" });
		send(res, 200, {
			ok: true,
			value: {
				ok: true,
				message: outcome
			}
		});
		return;
	}
	if (action.kind === "setConcurrency") {
		orchestrator.setConcurrency(clampConcurrency(action.concurrency));
		send(res, 200, {
			ok: true,
			value: {
				ok: true,
				message: null
			}
		});
		return;
	}
	send(res, 200, {
		ok: true,
		value: orchestrator.applyAction(action)
	});
}
/** `GET/POST MODE_PATH` — lets the canvas toggle Flow mode without the command. */
async function handleMode(req, res, modes) {
	const sessionId = sessionOf(req);
	if (sessionId === null) {
		send(res, 400, {
			ok: false,
			message: "sessionId is required"
		});
		return;
	}
	if (req.method === "GET") {
		const state = modes.get(sessionId);
		send(res, 200, {
			ok: true,
			value: {
				mode: modes.isOn(sessionId),
				pending: state?.wanted ?? null
			}
		});
		return;
	}
	if (req.method !== "POST") {
		send(res, 405, {
			ok: false,
			message: "method not allowed"
		});
		return;
	}
	let body;
	try {
		body = await readJsonBody(req);
	} catch (error) {
		send(res, 400, {
			ok: false,
			message: errorMessage(error)
		});
		return;
	}
	const value = body ?? {};
	if (typeof value.on !== "boolean") {
		send(res, 400, {
			ok: false,
			message: "`on` must be a boolean"
		});
		return;
	}
	send(res, 200, {
		ok: true,
		value: {
			ok: true,
			message: setFlowMode(modes, sessionId, value.on, false)
		}
	});
}
function parseRequest(body) {
	if (body === null || typeof body !== "object") return null;
	const value = body;
	if (value.kind === "setMode" && typeof value.on === "boolean") return {
		kind: "setMode",
		on: value.on
	};
	if (value.kind === "setConcurrency" && typeof value.concurrency === "number") return {
		kind: "setConcurrency",
		concurrency: value.concurrency
	};
	if (value.kind === "next") return { kind: "next" };
	const nodeId = value.nodeId;
	if (typeof nodeId !== "string" || nodeId === "") return null;
	if (value.kind === "retry" || value.kind === "skip" || value.kind === "cancel") return {
		kind: value.kind,
		nodeId
	};
	return null;
}
function sessionOf(req) {
	const value = new URL(req.url ?? "/", "http://localhost").searchParams.get("sessionId");
	return value === null || value === "" ? null : value;
}
function send(res, status, value) {
	sendJson(res, status, value);
}
//#endregion
export { apply, inject, name };
