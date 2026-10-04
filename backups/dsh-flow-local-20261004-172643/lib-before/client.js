window.__ModuleLoader__.load({ id: "@just-genius/dsh-flow", factory: (require) => {
var module = { exports: {} };
var exports = module.exports;
(function(){
var tagId = "@just-genius/dsh-flow/reactflow";
if (typeof document !== 'undefined' && document.querySelector('style[data-plugin-css=' + JSON.stringify(tagId) + ']') === null) {
  var tag = document.createElement('style');
  tag.dataset.plugin = "@just-genius/dsh-flow";
  tag.dataset.pluginCss = tagId;
  tag.textContent = "/* this gets exported as style.css and can be used for the default theming */\n/* these are the necessary styles for React Flow, they get used by base.css and style.css */\n.react-flow {\n  direction: ltr;\n}\n.react-flow__container {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n}\n.react-flow__pane {\n  z-index: 1;\n  cursor: -webkit-grab;\n  cursor: grab;\n}\n.react-flow__pane.selection {\n    cursor: pointer;\n  }\n.react-flow__pane.dragging {\n    cursor: -webkit-grabbing;\n    cursor: grabbing;\n  }\n.react-flow__viewport {\n  transform-origin: 0 0;\n  z-index: 2;\n  pointer-events: none;\n}\n.react-flow__renderer {\n  z-index: 4;\n}\n.react-flow__selection {\n  z-index: 6;\n}\n.react-flow__nodesselection-rect:focus,\n.react-flow__nodesselection-rect:focus-visible {\n  outline: none;\n}\n.react-flow .react-flow__edges {\n  pointer-events: none;\n  overflow: visible;\n}\n.react-flow__edge-path,\n.react-flow__connection-path {\n  stroke: #b1b1b7;\n  stroke-width: 1;\n  fill: none;\n}\n.react-flow__edge {\n  pointer-events: visibleStroke;\n  cursor: pointer;\n}\n.react-flow__edge.animated path {\n    stroke-dasharray: 5;\n    -webkit-animation: dashdraw 0.5s linear infinite;\n            animation: dashdraw 0.5s linear infinite;\n  }\n.react-flow__edge.animated path.react-flow__edge-interaction {\n    stroke-dasharray: none;\n    -webkit-animation: none;\n            animation: none;\n  }\n.react-flow__edge.inactive {\n    pointer-events: none;\n  }\n.react-flow__edge.selected,\n  .react-flow__edge:focus,\n  .react-flow__edge:focus-visible {\n    outline: none;\n  }\n.react-flow__edge.selected .react-flow__edge-path,\n  .react-flow__edge:focus .react-flow__edge-path,\n  .react-flow__edge:focus-visible .react-flow__edge-path {\n    stroke: #555;\n  }\n.react-flow__edge-textwrapper {\n    pointer-events: all;\n  }\n.react-flow__edge-textbg {\n    fill: white;\n  }\n.react-flow__edge .react-flow__edge-text {\n    pointer-events: none;\n    -webkit-user-select: none;\n       -moz-user-select: none;\n            user-select: none;\n  }\n.react-flow__connection {\n  pointer-events: none;\n}\n.react-flow__connection .animated {\n    stroke-dasharray: 5;\n    -webkit-animation: dashdraw 0.5s linear infinite;\n            animation: dashdraw 0.5s linear infinite;\n  }\n.react-flow__connectionline {\n  z-index: 1001;\n}\n.react-flow__nodes {\n  pointer-events: none;\n  transform-origin: 0 0;\n}\n.react-flow__node {\n  position: absolute;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n          user-select: none;\n  pointer-events: all;\n  transform-origin: 0 0;\n  box-sizing: border-box;\n  cursor: -webkit-grab;\n  cursor: grab;\n}\n.react-flow__node.dragging {\n    cursor: -webkit-grabbing;\n    cursor: grabbing;\n  }\n.react-flow__nodesselection {\n  z-index: 3;\n  transform-origin: left top;\n  pointer-events: none;\n}\n.react-flow__nodesselection-rect {\n    position: absolute;\n    pointer-events: all;\n    cursor: -webkit-grab;\n    cursor: grab;\n  }\n.react-flow__handle {\n  position: absolute;\n  pointer-events: none;\n  min-width: 5px;\n  min-height: 5px;\n  width: 6px;\n  height: 6px;\n  background: #1a192b;\n  border: 1px solid white;\n  border-radius: 100%;\n}\n.react-flow__handle.connectionindicator {\n    pointer-events: all;\n    cursor: crosshair;\n  }\n.react-flow__handle-bottom {\n    top: auto;\n    left: 50%;\n    bottom: -4px;\n    transform: translate(-50%, 0);\n  }\n.react-flow__handle-top {\n    left: 50%;\n    top: -4px;\n    transform: translate(-50%, 0);\n  }\n.react-flow__handle-left {\n    top: 50%;\n    left: -4px;\n    transform: translate(0, -50%);\n  }\n.react-flow__handle-right {\n    right: -4px;\n    top: 50%;\n    transform: translate(0, -50%);\n  }\n.react-flow__edgeupdater {\n  cursor: move;\n  pointer-events: all;\n}\n.react-flow__panel {\n  position: absolute;\n  z-index: 5;\n  margin: 15px;\n}\n.react-flow__panel.top {\n    top: 0;\n  }\n.react-flow__panel.bottom {\n    bottom: 0;\n  }\n.react-flow__panel.left {\n    left: 0;\n  }\n.react-flow__panel.right {\n    right: 0;\n  }\n.react-flow__panel.center {\n    left: 50%;\n    transform: translateX(-50%);\n  }\n.react-flow__attribution {\n  font-size: 10px;\n  background: rgba(255, 255, 255, 0.5);\n  padding: 2px 3px;\n  margin: 0;\n}\n.react-flow__attribution a {\n    text-decoration: none;\n    color: #999;\n  }\n@-webkit-keyframes dashdraw {\n  from {\n    stroke-dashoffset: 10;\n  }\n}\n@keyframes dashdraw {\n  from {\n    stroke-dashoffset: 10;\n  }\n}\n.react-flow__edgelabel-renderer {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  pointer-events: none;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n          user-select: none;\n}\n.react-flow__edge.updating .react-flow__edge-path {\n      stroke: #777;\n    }\n.react-flow__edge-text {\n    font-size: 10px;\n  }\n.react-flow__node.selectable:focus,\n  .react-flow__node.selectable:focus-visible {\n    outline: none;\n  }\n.react-flow__node-default,\n.react-flow__node-input,\n.react-flow__node-output,\n.react-flow__node-group {\n  padding: 10px;\n  border-radius: 3px;\n  width: 150px;\n  font-size: 12px;\n  color: #222;\n  text-align: center;\n  border-width: 1px;\n  border-style: solid;\n  border-color: #1a192b;\n  background-color: white;\n}\n.react-flow__node-default.selectable:hover, .react-flow__node-input.selectable:hover, .react-flow__node-output.selectable:hover, .react-flow__node-group.selectable:hover {\n      box-shadow: 0 1px 4px 1px rgba(0, 0, 0, 0.08);\n    }\n.react-flow__node-default.selectable.selected,\n    .react-flow__node-default.selectable:focus,\n    .react-flow__node-default.selectable:focus-visible,\n    .react-flow__node-input.selectable.selected,\n    .react-flow__node-input.selectable:focus,\n    .react-flow__node-input.selectable:focus-visible,\n    .react-flow__node-output.selectable.selected,\n    .react-flow__node-output.selectable:focus,\n    .react-flow__node-output.selectable:focus-visible,\n    .react-flow__node-group.selectable.selected,\n    .react-flow__node-group.selectable:focus,\n    .react-flow__node-group.selectable:focus-visible {\n      box-shadow: 0 0 0 0.5px #1a192b;\n    }\n.react-flow__node-group {\n  background-color: rgba(240, 240, 240, 0.25);\n}\n.react-flow__nodesselection-rect,\n.react-flow__selection {\n  background: rgba(0, 89, 220, 0.08);\n  border: 1px dotted rgba(0, 89, 220, 0.8);\n}\n.react-flow__nodesselection-rect:focus,\n  .react-flow__nodesselection-rect:focus-visible,\n  .react-flow__selection:focus,\n  .react-flow__selection:focus-visible {\n    outline: none;\n  }\n.react-flow__controls {\n  box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.08);\n}\n.react-flow__controls-button {\n    border: none;\n    background: #fefefe;\n    border-bottom: 1px solid #eee;\n    box-sizing: content-box;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    width: 16px;\n    height: 16px;\n    cursor: pointer;\n    -webkit-user-select: none;\n       -moz-user-select: none;\n            user-select: none;\n    padding: 5px;\n  }\n.react-flow__controls-button:hover {\n      background: #f4f4f4;\n    }\n.react-flow__controls-button svg {\n      width: 100%;\n      max-width: 12px;\n      max-height: 12px;\n    }\n.react-flow__controls-button:disabled {\n      pointer-events: none;\n    }\n.react-flow__controls-button:disabled svg {\n        fill-opacity: 0.4;\n      }\n.react-flow__minimap {\n  background-color: #fff;\n}\n.react-flow__minimap svg {\n  display: block;\n}\n.react-flow__resize-control {\n  position: absolute;\n}\n.react-flow__resize-control.left,\n.react-flow__resize-control.right {\n  cursor: ew-resize;\n}\n.react-flow__resize-control.top,\n.react-flow__resize-control.bottom {\n  cursor: ns-resize;\n}\n.react-flow__resize-control.top.left,\n.react-flow__resize-control.bottom.right {\n  cursor: nwse-resize;\n}\n.react-flow__resize-control.bottom.left,\n.react-flow__resize-control.top.right {\n  cursor: nesw-resize;\n}\n/* handle styles */\n.react-flow__resize-control.handle {\n  width: 4px;\n  height: 4px;\n  border: 1px solid #fff;\n  border-radius: 1px;\n  background-color: #3367d9;\n  transform: translate(-50%, -50%);\n}\n.react-flow__resize-control.handle.left {\n  left: 0;\n  top: 50%;\n}\n.react-flow__resize-control.handle.right {\n  left: 100%;\n  top: 50%;\n}\n.react-flow__resize-control.handle.top {\n  left: 50%;\n  top: 0;\n}\n.react-flow__resize-control.handle.bottom {\n  left: 50%;\n  top: 100%;\n}\n.react-flow__resize-control.handle.top.left {\n  left: 0;\n}\n.react-flow__resize-control.handle.bottom.left {\n  left: 0;\n}\n.react-flow__resize-control.handle.top.right {\n  left: 100%;\n}\n.react-flow__resize-control.handle.bottom.right {\n  left: 100%;\n}\n/* line styles */\n.react-flow__resize-control.line {\n  border-color: #3367d9;\n  border-width: 0;\n  border-style: solid;\n}\n.react-flow__resize-control.line.left,\n.react-flow__resize-control.line.right {\n  width: 1px;\n  transform: translate(-50%, 0);\n  top: 0;\n  height: 100%;\n}\n.react-flow__resize-control.line.left {\n  left: 0;\n  border-left-width: 1px;\n}\n.react-flow__resize-control.line.right {\n  left: 100%;\n  border-right-width: 1px;\n}\n.react-flow__resize-control.line.top,\n.react-flow__resize-control.line.bottom {\n  height: 1px;\n  transform: translate(0, -50%);\n  left: 0;\n  width: 100%;\n}\n.react-flow__resize-control.line.top {\n  top: 0;\n  border-top-width: 1px;\n}\n.react-flow__resize-control.line.bottom {\n  border-bottom-width: 1px;\n  top: 100%;\n}\n";
  document.head.appendChild(tag);
}
})();
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
//#region \0rolldown/runtime.js
var __create = Object.create;
var __defProp$1 = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJSMin = (cb, mod) => () => (mod || (cb((mod = { exports: {} }).exports, mod), cb = null), mod.exports);
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp$1(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule || !__hasOwnProp.call(mod, "default") ? __defProp$1(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
//#endregion
let react = require("react");
react = __toESM(react, 1);
let react_jsx_runtime = require("react/jsx-runtime");
require("react-dom");
require("@deepseek-ai/dsh-client-ui-primitives");
//#region ../../packages/runtime/lib/client.js
/** Canonical browser service names used by plugin inject declarations. */
const CLIENT_SERVICES = {
	connection: "connection",
	/** Scope-aware conversation controller, including draft attachments. */
	conversation: "conversation",
	/** @deprecated DSH 0.1.2+ moved the registry to `uiConversation.events`. */
	conversationEvents: "conversationEvents",
	/** Conversation registries (`events` / `views`) since DSH 0.1.2. */
	uiConversation: "uiConversation",
	/** Session-scoped UI state, including the 0.1.5 pending-interaction store. */
	uiSession: "uiSession",
	inputTriggers: "inputTriggers",
	locale: "locale",
	modelDirectories: "modelDirectories",
	remote: "remote",
	/** Session Typert namespace exposed below `ctx.remote`. */
	remoteSession: "remote.session",
	remoteCommands: "remote.commands",
	remoteCredentials: "remote.credentials",
	remoteLlm: "remote.llm",
	remotePluginInventory: "remote.pluginInventory",
	remoteSettings: "remote.settings",
	sessions: "sessions",
	/** Official DSH 0.1.5+ right-Sidebar navigation service. */
	sidebarRight: "sidebarRight",
	/** Official DSH 0.1.5+ right-Sidebar tab-type registry. */
	sidebarRightTabs: "sidebarRightTabs",
	slots: "slots",
	settingsScope: "configForms",
	settingsSchema: "settingsSchema",
	uiWorkspace: "uiWorkspace",
	workspaces: "workspaces"
};
async function requestJson(path, init = {}) {
	const response = await fetch(path, {
		cache: "no-store",
		headers: {
			accept: "application/json",
			...init.headers
		},
		...init
	});
	let body;
	try {
		body = await response.json();
	} catch {
		throw new Error(`request failed (${response.status})`);
	}
	if (!response.ok) {
		const record = body !== null && typeof body === "object" ? body : void 0;
		throw new Error(record?.message ?? record?.error ?? record?.detail ?? `request failed (${response.status})`);
	}
	return body;
}
/** Read the repository's conventional `{ ok, value | message }` envelope. */
async function requestResult(path, init = {}) {
	const result = await requestJson(path, init);
	if (!result.ok || result.value === void 0) throw new Error(result.message ?? result.error ?? result.detail ?? "request failed");
	return result.value;
}
function getResult(path) {
	return requestResult(path);
}
function postResult(path, body) {
	return requestResult(path, {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify(body)
	});
}
//#endregion
//#region ../../packages/ui/lib/index.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
function r(e) {
	var t, f, n = "";
	if ("string" == typeof e || "number" == typeof e) n += e;
	else if ("object" == typeof e) if (Array.isArray(e)) {
		var o = e.length;
		for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
	} else for (f in e) e[f] && (n && (n += " "), n += f);
	return n;
}
function clsx() {
	for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
	return n;
}
const css$9 = ".uhTX6a_e3cf54_button{cursor:pointer;color:var(--dsw-alias-label-primary);background:0 0;border:none;border-radius:18px;justify-content:center;align-items:center;gap:4px;padding:0 14px;font-size:14px;line-height:22px;display:inline-flex}.uhTX6a_e3cf54_button:disabled{cursor:not-allowed;opacity:.4}.uhTX6a_e3cf54_md{height:36px}.uhTX6a_e3cf54_sm{border-radius:14px;height:28px;padding:0 10px;font-size:12px;line-height:18px}.uhTX6a_e3cf54_primary{background:var(--dsw-alias-button-primary-fill);color:var(--dsw-alias-label-primary-foreground)}.uhTX6a_e3cf54_primary:hover:not(:disabled){background:var(--dsw-alias-button-primary-hover)}.uhTX6a_e3cf54_ghost:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover)}.uhTX6a_e3cf54_ghost:active:not(:disabled){background:var(--dsw-alias-interactive-bg-active)}.uhTX6a_e3cf54_outline{border:1px solid var(--dsw-alias-border-l2);background:0 0}.uhTX6a_e3cf54_outline:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover)}.uhTX6a_e3cf54_toolbar{background:var(--dsw-alias-button-tool-bar-fill)}.uhTX6a_e3cf54_toolbar:hover:not(:disabled){background:var(--dsw-alias-button-tool-bar-hover)}.uhTX6a_e3cf54_icon{justify-content:center;align-items:center;width:16px;height:16px;display:inline-flex}";
const tagId$9 = "@just-genius/dsh-plugin-ui/Button.module.css-e3cf54";
if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$9) + "]") === null) {
	const tag = document.createElement("style");
	tag.dataset.plugin = "@just-genius/dsh-plugin-ui";
	tag.dataset.pluginCss = tagId$9;
	tag.textContent = css$9;
	document.head.appendChild(tag);
}
var Button_module_css_default = {
	"button": "uhTX6a_e3cf54_button",
	"sm": "uhTX6a_e3cf54_sm",
	"ghost": "uhTX6a_e3cf54_ghost",
	"primary": "uhTX6a_e3cf54_primary",
	"outline": "uhTX6a_e3cf54_outline",
	"md": "uhTX6a_e3cf54_md",
	"toolbar": "uhTX6a_e3cf54_toolbar",
	"icon": "uhTX6a_e3cf54_icon"
};
/**
* Render a button.
* @param props.variant - visual family (default 'ghost').
* @param props.size - 'md' 36px capsule (figma Button) or 'sm' 28px compact.
* @param props.icon - optional leading 16px icon node.
* @returns the button element; native button attributes pass through.
*/
function Button({ variant = "ghost", size = "md", icon, className, children, ...rest }) {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
		type: "button",
		className: clsx(Button_module_css_default.button, Button_module_css_default[variant], Button_module_css_default[size], className),
		...rest,
		children: [icon != null && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
			className: Button_module_css_default.icon,
			children: icon
		}), children]
	});
}
const css$8 = ".aK0kgq_fd7494_wrap{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);border-radius:8px;align-items:center;gap:6px;height:32px;padding:0 8px;display:inline-flex}.aK0kgq_fd7494_wrap:focus-within{border-color:var(--dsw-alias-brand-primary)}.aK0kgq_fd7494_icon{width:16px;height:16px;color:var(--dsw-alias-label-tertiary);justify-content:center;align-items:center;display:inline-flex}.aK0kgq_fd7494_input{min-width:0;color:var(--dsw-alias-label-primary);background:0 0;border:none;outline:none;flex:1;font-size:14px;line-height:22px}.aK0kgq_fd7494_input::placeholder{color:var(--dsw-alias-label-dimmed)}";
const tagId$8 = "@just-genius/dsh-plugin-ui/Input.module.css-fd7494";
if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$8) + "]") === null) {
	const tag = document.createElement("style");
	tag.dataset.plugin = "@just-genius/dsh-plugin-ui";
	tag.dataset.pluginCss = tagId$8;
	tag.textContent = css$8;
	document.head.appendChild(tag);
}
const css$7 = ".Nl9A-a_56250f_pill{height:24px;color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-layer-2);border:none;border-radius:12px;align-items:center;gap:4px;padding:0 8px;font-size:12px;line-height:18px;display:inline-flex}.Nl9A-a_56250f_interactive{cursor:pointer}.Nl9A-a_56250f_interactive:hover{background:var(--dsw-alias-interactive-bg-hover)}.Nl9A-a_56250f_active{color:var(--dsw-alias-label-primary);background:var(--dsw-alias-button-ghost-active-fill);box-shadow:inset 0 0 0 1px var(--dsw-alias-button-ghost-active-border)}";
const tagId$7 = "@just-genius/dsh-plugin-ui/Pill.module.css-56250f";
if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$7) + "]") === null) {
	const tag = document.createElement("style");
	tag.dataset.plugin = "@just-genius/dsh-plugin-ui";
	tag.dataset.pluginCss = tagId$7;
	tag.textContent = css$7;
	document.head.appendChild(tag);
}
const css$6 = ".KhBbNq_369387_bubble{z-index:100;-webkit-app-region:no-drag;app-region:no-drag;background:var(--dsw-alias-tooltip-bg);width:max-content;max-width:50vw;color:var(--dsw-static-neutral-bluish-00);white-space:pre-line;overflow-wrap:break-word;pointer-events:none;animation:KhBbNq_369387_tooltip-in .15s var(--ds-ease-in-out);border-radius:8px;padding:3px 7px;font-size:13px;line-height:20px;position:fixed}.KhBbNq_369387_bubble[data-side=right]{transform:translateY(-50%)}.KhBbNq_369387_bubble[data-side=bottom]{transform:translate(-50%)}.KhBbNq_369387_bubble[data-side=top]{transform:translate(-50%,-100%)}@keyframes KhBbNq_369387_tooltip-in{0%{opacity:0}}@media (prefers-reduced-motion:reduce){.KhBbNq_369387_bubble{animation:none}}";
const tagId$6 = "@just-genius/dsh-plugin-ui/Tooltip.module.css-369387";
if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$6) + "]") === null) {
	const tag = document.createElement("style");
	tag.dataset.plugin = "@just-genius/dsh-plugin-ui";
	tag.dataset.pluginCss = tagId$6;
	tag.textContent = css$6;
	document.head.appendChild(tag);
}
const css$5 = ".dEpm_a_e040ca_root{z-index:1000;-webkit-app-region:no-drag;app-region:no-drag;justify-content:center;align-items:center;padding:24px;display:flex;position:fixed;inset:0}.dEpm_a_e040ca_mask{background:var(--dsw-alias-bg-mask-1);backdrop-filter:var(--dsw-mask-blur);position:absolute;inset:0}.dEpm_a_e040ca_dialog{z-index:1;border:1px solid var(--dsw-alias-border-inverted);background:var(--dsw-alias-bg-layer-2);width:min(380px,100%);box-shadow:var(--dsw-shadow-lv3);border-radius:24px;flex-direction:column;gap:20px;padding:0 0 24px;display:flex;position:relative;overflow:hidden}.dEpm_a_e040ca_content{flex-direction:column;width:100%;display:flex}.dEpm_a_e040ca_header{justify-content:space-between;align-items:center;gap:8px;padding:22px 14px 12px 24px;display:flex}.dEpm_a_e040ca_title{color:var(--dsw-alias-label-primary);margin:0;font-size:16px;font-weight:500;line-height:24px}.dEpm_a_e040ca_close{cursor:pointer;width:28px;height:28px;color:var(--dsw-alias-label-secondary);background:0 0;border:none;border-radius:8px;flex:none;justify-content:center;align-items:center;display:inline-flex}.dEpm_a_e040ca_close:hover{background:var(--dsw-alias-interactive-bg-hover)}.dEpm_a_e040ca_description{color:var(--dsw-alias-label-primary);margin:0;padding:0 24px;font-size:14px;font-weight:400;line-height:22px}.dEpm_a_e040ca_body{flex-direction:column;min-width:0;margin-top:20px;padding:0 24px;display:flex}.dEpm_a_e040ca_footer{justify-content:flex-end;align-items:center;gap:8px;padding:0 24px;display:flex}";
const tagId$5 = "@just-genius/dsh-plugin-ui/Modal.module.css-e040ca";
if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$5) + "]") === null) {
	const tag = document.createElement("style");
	tag.dataset.plugin = "@just-genius/dsh-plugin-ui";
	tag.dataset.pluginCss = tagId$5;
	tag.textContent = css$5;
	document.head.appendChild(tag);
}
const css$4 = ".ppBzTW_e8ae85_dot,.ppBzTW_e8ae85_matrix{--dsh-state-ongoing:var(--dsw-static-deepseek-450)}.ppBzTW_e8ae85_dot{flex:none;display:inline-block;position:relative}.ppBzTW_e8ae85_dot:before{content:\"\";opacity:.1;background:currentColor;border-radius:50%;position:absolute;inset:0}.ppBzTW_e8ae85_dot:after{content:\"\";background:currentColor;border-radius:50%;position:absolute;inset:20%}.ppBzTW_e8ae85_dot[data-state=done]{color:var(--dsw-alias-state-success-primary)}.ppBzTW_e8ae85_dot[data-state=warning]{color:var(--dsw-alias-state-warn-primary)}.ppBzTW_e8ae85_dot[data-state=error]{color:var(--dsw-alias-state-error-primary)}.ppBzTW_e8ae85_matrix{color:var(--dsh-state-ongoing);flex:none}.ppBzTW_e8ae85_cell{fill:currentColor;opacity:.15;animation:1s infinite ppBzTW_e8ae85_dsh-state-dot-chase}@keyframes ppBzTW_e8ae85_dsh-state-dot-chase{0%,12.4%{opacity:1}12.5%,24.9%{opacity:.6}25%,37.4%{opacity:.35}37.5%,to{opacity:.15}}";
const tagId$4 = "@just-genius/dsh-plugin-ui/StateDot.module.css-e8ae85";
if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$4) + "]") === null) {
	const tag = document.createElement("style");
	tag.dataset.plugin = "@just-genius/dsh-plugin-ui";
	tag.dataset.pluginCss = tagId$4;
	tag.textContent = css$4;
	document.head.appendChild(tag);
}
const css$3 = ".x8yftq_f616c8_root{flex-direction:column;width:100%;min-width:0;display:flex}.x8yftq_f616c8_row{align-items:center;min-width:0;height:24px;display:flex;position:relative;overflow:hidden}.x8yftq_f616c8_row[data-expandable]{cursor:pointer}.x8yftq_f616c8_leading{width:16px;height:16px;color:var(--dsw-alias-label-tertiary);background:0 0;border:none;flex:none;justify-content:center;align-items:center;margin-right:6px;padding:0;display:inline-flex;position:relative}button.x8yftq_f616c8_leading{cursor:pointer}.x8yftq_f616c8_iconIdle{opacity:1;transition:opacity .1s;display:inline-flex}.x8yftq_f616c8_chevronHover{opacity:0;margin:auto;transition:opacity .1s;position:absolute;inset:0}.x8yftq_f616c8_row:hover .x8yftq_f616c8_iconIdle{opacity:0}.x8yftq_f616c8_row:hover .x8yftq_f616c8_chevronHover{opacity:1}.x8yftq_f616c8_title{color:var(--dsw-alias-label-secondary);flex:none;font-size:14px;line-height:24px}";
const tagId$3 = "@just-genius/dsh-plugin-ui/DisclosureRow.module.css-f616c8";
if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$3) + "]") === null) {
	const tag = document.createElement("style");
	tag.dataset.plugin = "@just-genius/dsh-plugin-ui";
	tag.dataset.pluginCss = tagId$3;
	tag.textContent = css$3;
	document.head.appendChild(tag);
}
/*! @license DOMPurify 3.4.14 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.4.14/LICENSE */
function _arrayLikeToArray(r, a) {
	(null == a || a > r.length) && (a = r.length);
	for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
	return n;
}
function _arrayWithHoles(r) {
	if (Array.isArray(r)) return r;
}
function _iterableToArrayLimit(r, l) {
	var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
	if (null != t) {
		var e, n, i, u, a = [], f = true, o = false;
		try {
			if (i = (t = t.call(r)).next, 0 === l);
			else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
		} catch (r) {
			o = true, n = r;
		} finally {
			try {
				if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
			} finally {
				if (o) throw n;
			}
		}
		return a;
	}
}
function _nonIterableRest() {
	throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _slicedToArray(r, e) {
	return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function _unsupportedIterableToArray(r, a) {
	if (r) {
		if ("string" == typeof r) return _arrayLikeToArray(r, a);
		var t = {}.toString.call(r).slice(8, -1);
		return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
	}
}
const entries = Object.entries;
const setPrototypeOf = Object.setPrototypeOf;
const isFrozen = Object.isFrozen;
const getPrototypeOf = Object.getPrototypeOf;
const getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
let freeze = Object.freeze;
let seal = Object.seal;
let create$1 = Object.create;
let _ref = typeof Reflect !== "undefined" && Reflect;
let apply$1 = _ref.apply;
let construct = _ref.construct;
if (!freeze) freeze = function freeze(x) {
	return x;
};
if (!seal) seal = function seal(x) {
	return x;
};
if (!apply$1) apply$1 = function apply(func, thisArg) {
	for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) args[_key - 2] = arguments[_key];
	return func.apply(thisArg, args);
};
if (!construct) construct = function construct(Func) {
	for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) args[_key2 - 1] = arguments[_key2];
	return new Func(...args);
};
const arrayForEach = unapply(Array.prototype.forEach);
const arrayLastIndexOf = unapply(Array.prototype.lastIndexOf);
const arrayPop = unapply(Array.prototype.pop);
const arrayPush = unapply(Array.prototype.push);
const arraySplice = unapply(Array.prototype.splice);
const arrayIsArray = Array.isArray;
const stringToLowerCase = unapply(String.prototype.toLowerCase);
const stringToString = unapply(String.prototype.toString);
const stringMatch = unapply(String.prototype.match);
const stringReplace = unapply(String.prototype.replace);
const stringIndexOf = unapply(String.prototype.indexOf);
const stringTrim = unapply(String.prototype.trim);
const numberToString = unapply(Number.prototype.toString);
const booleanToString = unapply(Boolean.prototype.toString);
const bigintToString = typeof BigInt === "undefined" ? null : unapply(BigInt.prototype.toString);
const symbolToString = typeof Symbol === "undefined" ? null : unapply(Symbol.prototype.toString);
const objectHasOwnProperty = unapply(Object.prototype.hasOwnProperty);
const objectToString = unapply(Object.prototype.toString);
const regExpTest = unapply(RegExp.prototype.test);
const typeErrorCreate = unconstruct(TypeError);
/**
* Creates a new function that calls the given function with a specified thisArg and arguments.
*
* @param func - The function to be wrapped and called.
* @returns A new function that calls the given function with a specified thisArg and arguments.
*/
function unapply(func) {
	return function(thisArg) {
		if (thisArg instanceof RegExp) thisArg.lastIndex = 0;
		for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) args[_key3 - 1] = arguments[_key3];
		return apply$1(func, thisArg, args);
	};
}
/**
* Creates a new function that constructs an instance of the given constructor function with the provided arguments.
*
* @param func - The constructor function to be wrapped and called.
* @returns A new function that constructs an instance of the given constructor function with the provided arguments.
*/
function unconstruct(Func) {
	return function() {
		for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) args[_key4] = arguments[_key4];
		return construct(Func, args);
	};
}
/**
* Add properties to a lookup table
*
* @param set - The set to which elements will be added.
* @param array - The array containing elements to be added to the set.
* @param transformCaseFunc - An optional function to transform the case of each element before adding to the set.
* @returns The modified set with added elements.
*/
function addToSet(set, array) {
	let transformCaseFunc = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : stringToLowerCase;
	if (setPrototypeOf) setPrototypeOf(set, null);
	if (!arrayIsArray(array)) return set;
	let l = array.length;
	while (l--) {
		let element = array[l];
		if (typeof element === "string") {
			const lcElement = transformCaseFunc(element);
			if (lcElement !== element) {
				if (!isFrozen(array)) array[l] = lcElement;
				element = lcElement;
			}
		}
		set[element] = true;
	}
	return set;
}
/**
* Clean up an array to harden against CSPP
*
* @param array - The array to be cleaned.
* @returns The cleaned version of the array
*/
function cleanArray(array) {
	for (let index = 0; index < array.length; index++) if (!objectHasOwnProperty(array, index)) array[index] = null;
	return array;
}
/**
* Shallow clone an object
*
* @param object - The object to be cloned.
* @returns A new object that copies the original.
*/
function clone(object) {
	const newObject = create$1(null);
	for (const _ref2 of entries(object)) {
		var _ref3 = _slicedToArray(_ref2, 2);
		const property = _ref3[0];
		const value = _ref3[1];
		if (objectHasOwnProperty(object, property)) {
			if (arrayIsArray(value)) newObject[property] = cleanArray(value);
			else if (value && typeof value === "object" && value.constructor === Object) newObject[property] = clone(value);
			else newObject[property] = value;
		}
	}
	return newObject;
}
/**
* Convert non-node values into strings without depending on direct property access.
*
* @param value - The value to stringify.
* @returns A string representation of the provided value.
*/
function stringifyValue(value) {
	switch (typeof value) {
		case "string": return value;
		case "number": return numberToString(value);
		case "boolean": return booleanToString(value);
		case "bigint": return bigintToString ? bigintToString(value) : "0";
		case "symbol": return symbolToString ? symbolToString(value) : "Symbol()";
		case "undefined": return objectToString(value);
		case "function":
		case "object": {
			if (value === null) return objectToString(value);
			const valueAsRecord = value;
			const valueToString = lookupGetter(valueAsRecord, "toString");
			if (typeof valueToString === "function") {
				const stringified = valueToString(valueAsRecord);
				return typeof stringified === "string" ? stringified : objectToString(stringified);
			}
			return objectToString(value);
		}
		default: return objectToString(value);
	}
}
/**
* This method automatically checks if the prop is function or getter and behaves accordingly.
*
* @param object - The object to look up the getter function in its prototype chain.
* @param prop - The property name for which to find the getter function.
* @returns The getter function found in the prototype chain or a fallback function.
*/
function lookupGetter(object, prop) {
	while (object !== null) {
		const desc = getOwnPropertyDescriptor(object, prop);
		if (desc) {
			if (desc.get) return unapply(desc.get);
			if (typeof desc.value === "function") return unapply(desc.value);
		}
		object = getPrototypeOf(object);
	}
	function fallbackValue() {
		return null;
	}
	return fallbackValue;
}
function isRegex(value) {
	try {
		regExpTest(value, "");
		return true;
	} catch (_unused) {
		return false;
	}
}
const html$1 = freeze([
	"a",
	"abbr",
	"acronym",
	"address",
	"area",
	"article",
	"aside",
	"audio",
	"b",
	"bdi",
	"bdo",
	"big",
	"blink",
	"blockquote",
	"body",
	"br",
	"button",
	"canvas",
	"caption",
	"center",
	"cite",
	"code",
	"col",
	"colgroup",
	"content",
	"data",
	"datalist",
	"dd",
	"decorator",
	"del",
	"details",
	"dfn",
	"dialog",
	"dir",
	"div",
	"dl",
	"dt",
	"element",
	"em",
	"fieldset",
	"figcaption",
	"figure",
	"font",
	"footer",
	"form",
	"h1",
	"h2",
	"h3",
	"h4",
	"h5",
	"h6",
	"head",
	"header",
	"hgroup",
	"hr",
	"html",
	"i",
	"img",
	"input",
	"ins",
	"kbd",
	"label",
	"legend",
	"li",
	"main",
	"map",
	"mark",
	"marquee",
	"menu",
	"menuitem",
	"meter",
	"nav",
	"nobr",
	"ol",
	"optgroup",
	"option",
	"output",
	"p",
	"picture",
	"pre",
	"progress",
	"q",
	"rp",
	"rt",
	"ruby",
	"s",
	"samp",
	"search",
	"section",
	"select",
	"shadow",
	"slot",
	"small",
	"source",
	"spacer",
	"span",
	"strike",
	"strong",
	"style",
	"sub",
	"summary",
	"sup",
	"table",
	"tbody",
	"td",
	"template",
	"textarea",
	"tfoot",
	"th",
	"thead",
	"time",
	"tr",
	"track",
	"tt",
	"u",
	"ul",
	"var",
	"video",
	"wbr"
]);
const svg$1 = freeze([
	"svg",
	"a",
	"altglyph",
	"altglyphdef",
	"altglyphitem",
	"animatecolor",
	"animatemotion",
	"animatetransform",
	"circle",
	"clippath",
	"defs",
	"desc",
	"ellipse",
	"enterkeyhint",
	"exportparts",
	"filter",
	"font",
	"g",
	"glyph",
	"glyphref",
	"hkern",
	"image",
	"inputmode",
	"line",
	"lineargradient",
	"marker",
	"mask",
	"metadata",
	"mpath",
	"part",
	"path",
	"pattern",
	"polygon",
	"polyline",
	"radialgradient",
	"rect",
	"stop",
	"style",
	"switch",
	"symbol",
	"text",
	"textpath",
	"title",
	"tref",
	"tspan",
	"view",
	"vkern"
]);
const svgFilters = freeze([
	"feBlend",
	"feColorMatrix",
	"feComponentTransfer",
	"feComposite",
	"feConvolveMatrix",
	"feDiffuseLighting",
	"feDisplacementMap",
	"feDistantLight",
	"feDropShadow",
	"feFlood",
	"feFuncA",
	"feFuncB",
	"feFuncG",
	"feFuncR",
	"feGaussianBlur",
	"feImage",
	"feMerge",
	"feMergeNode",
	"feMorphology",
	"feOffset",
	"fePointLight",
	"feSpecularLighting",
	"feSpotLight",
	"feTile",
	"feTurbulence"
]);
const svgDisallowed = freeze([
	"animate",
	"color-profile",
	"cursor",
	"discard",
	"font-face",
	"font-face-format",
	"font-face-name",
	"font-face-src",
	"font-face-uri",
	"foreignobject",
	"hatch",
	"hatchpath",
	"mesh",
	"meshgradient",
	"meshpatch",
	"meshrow",
	"missing-glyph",
	"script",
	"set",
	"solidcolor",
	"unknown",
	"use"
]);
const mathMl$1 = freeze([
	"math",
	"menclose",
	"merror",
	"mfenced",
	"mfrac",
	"mglyph",
	"mi",
	"mlabeledtr",
	"mmultiscripts",
	"mn",
	"mo",
	"mover",
	"mpadded",
	"mphantom",
	"mroot",
	"mrow",
	"ms",
	"mspace",
	"msqrt",
	"mstyle",
	"msub",
	"msup",
	"msubsup",
	"mtable",
	"mtd",
	"mtext",
	"mtr",
	"munder",
	"munderover",
	"mprescripts"
]);
const mathMlDisallowed = freeze([
	"maction",
	"maligngroup",
	"malignmark",
	"mlongdiv",
	"mscarries",
	"mscarry",
	"msgroup",
	"mstack",
	"msline",
	"msrow",
	"semantics",
	"annotation",
	"annotation-xml",
	"mprescripts",
	"none"
]);
const text$1 = freeze(["#text"]);
const html = freeze([
	"accept",
	"action",
	"align",
	"alt",
	"autocapitalize",
	"autocomplete",
	"autopictureinpicture",
	"autoplay",
	"background",
	"bgcolor",
	"border",
	"capture",
	"cellpadding",
	"cellspacing",
	"checked",
	"cite",
	"class",
	"clear",
	"color",
	"cols",
	"colspan",
	"command",
	"commandfor",
	"controls",
	"controlslist",
	"coords",
	"crossorigin",
	"datetime",
	"decoding",
	"default",
	"dir",
	"disabled",
	"disablepictureinpicture",
	"disableremoteplayback",
	"download",
	"draggable",
	"enctype",
	"enterkeyhint",
	"exportparts",
	"face",
	"for",
	"headers",
	"height",
	"hidden",
	"high",
	"href",
	"hreflang",
	"id",
	"inert",
	"inputmode",
	"integrity",
	"ismap",
	"kind",
	"label",
	"lang",
	"list",
	"loading",
	"loop",
	"low",
	"max",
	"maxlength",
	"media",
	"method",
	"min",
	"minlength",
	"multiple",
	"muted",
	"name",
	"nonce",
	"noshade",
	"novalidate",
	"nowrap",
	"open",
	"optimum",
	"part",
	"pattern",
	"placeholder",
	"playsinline",
	"popover",
	"popovertarget",
	"popovertargetaction",
	"poster",
	"preload",
	"pubdate",
	"radiogroup",
	"readonly",
	"rel",
	"required",
	"rev",
	"reversed",
	"role",
	"rows",
	"rowspan",
	"spellcheck",
	"scope",
	"selected",
	"shape",
	"size",
	"sizes",
	"slot",
	"span",
	"srclang",
	"start",
	"src",
	"srcset",
	"step",
	"style",
	"summary",
	"tabindex",
	"title",
	"translate",
	"type",
	"usemap",
	"valign",
	"value",
	"width",
	"wrap",
	"xmlns"
]);
const svg = freeze([
	"accent-height",
	"accumulate",
	"additive",
	"alignment-baseline",
	"amplitude",
	"ascent",
	"attributename",
	"attributetype",
	"azimuth",
	"basefrequency",
	"baseline-shift",
	"begin",
	"bias",
	"by",
	"class",
	"clip",
	"clippathunits",
	"clip-path",
	"clip-rule",
	"color",
	"color-interpolation",
	"color-interpolation-filters",
	"color-profile",
	"color-rendering",
	"cx",
	"cy",
	"d",
	"dx",
	"dy",
	"diffuseconstant",
	"direction",
	"display",
	"divisor",
	"dominant-baseline",
	"dur",
	"edgemode",
	"elevation",
	"end",
	"exponent",
	"fill",
	"fill-opacity",
	"fill-rule",
	"filter",
	"filterunits",
	"flood-color",
	"flood-opacity",
	"font-family",
	"font-size",
	"font-size-adjust",
	"font-stretch",
	"font-style",
	"font-variant",
	"font-weight",
	"fx",
	"fy",
	"g1",
	"g2",
	"glyph-name",
	"glyphref",
	"gradientunits",
	"gradienttransform",
	"height",
	"href",
	"id",
	"image-rendering",
	"in",
	"in2",
	"intercept",
	"k",
	"k1",
	"k2",
	"k3",
	"k4",
	"kerning",
	"keypoints",
	"keysplines",
	"keytimes",
	"lang",
	"lengthadjust",
	"letter-spacing",
	"kernelmatrix",
	"kernelunitlength",
	"lighting-color",
	"local",
	"marker-end",
	"marker-mid",
	"marker-start",
	"markerheight",
	"markerunits",
	"markerwidth",
	"maskcontentunits",
	"maskunits",
	"max",
	"mask",
	"mask-type",
	"media",
	"method",
	"mode",
	"min",
	"name",
	"numoctaves",
	"offset",
	"operator",
	"opacity",
	"order",
	"orient",
	"orientation",
	"origin",
	"overflow",
	"paint-order",
	"path",
	"pathlength",
	"patterncontentunits",
	"patterntransform",
	"patternunits",
	"pointer-events",
	"points",
	"preservealpha",
	"preserveaspectratio",
	"primitiveunits",
	"r",
	"rx",
	"ry",
	"radius",
	"refx",
	"refy",
	"repeatcount",
	"repeatdur",
	"restart",
	"result",
	"rotate",
	"scale",
	"seed",
	"shape-rendering",
	"slope",
	"specularconstant",
	"specularexponent",
	"spreadmethod",
	"startoffset",
	"stddeviation",
	"stitchtiles",
	"stop-color",
	"stop-opacity",
	"stroke-dasharray",
	"stroke-dashoffset",
	"stroke-linecap",
	"stroke-linejoin",
	"stroke-miterlimit",
	"stroke-opacity",
	"stroke",
	"stroke-width",
	"style",
	"surfacescale",
	"systemlanguage",
	"tabindex",
	"tablevalues",
	"targetx",
	"targety",
	"transform",
	"transform-origin",
	"text-anchor",
	"text-decoration",
	"text-orientation",
	"text-rendering",
	"textlength",
	"type",
	"u1",
	"u2",
	"unicode",
	"values",
	"vector-effect",
	"viewbox",
	"visibility",
	"version",
	"vert-adv-y",
	"vert-origin-x",
	"vert-origin-y",
	"width",
	"word-spacing",
	"wrap",
	"writing-mode",
	"xchannelselector",
	"ychannelselector",
	"x",
	"x1",
	"x2",
	"xmlns",
	"y",
	"y1",
	"y2",
	"z",
	"zoomandpan"
]);
const mathMl = freeze([
	"accent",
	"accentunder",
	"align",
	"bevelled",
	"close",
	"columnalign",
	"columnlines",
	"columnspacing",
	"columnspan",
	"denomalign",
	"depth",
	"dir",
	"display",
	"displaystyle",
	"encoding",
	"fence",
	"frame",
	"height",
	"href",
	"id",
	"largeop",
	"length",
	"linethickness",
	"lquote",
	"lspace",
	"mathbackground",
	"mathcolor",
	"mathsize",
	"mathvariant",
	"maxsize",
	"minsize",
	"movablelimits",
	"notation",
	"numalign",
	"open",
	"rowalign",
	"rowlines",
	"rowspacing",
	"rowspan",
	"rspace",
	"rquote",
	"scriptlevel",
	"scriptminsize",
	"scriptsizemultiplier",
	"selection",
	"separator",
	"separators",
	"stretchy",
	"subscriptshift",
	"supscriptshift",
	"symmetric",
	"voffset",
	"width",
	"xmlns"
]);
const xml = freeze([
	"xlink:href",
	"xml:id",
	"xlink:title",
	"xml:space",
	"xmlns:xlink"
]);
const MUSTACHE_EXPR = seal(/{{[\w\W]*|^[\w\W]*}}/g);
const ERB_EXPR = seal(/<%[\w\W]*|^[\w\W]*%>/g);
const TMPLIT_EXPR = seal(/\${[\w\W]*/g);
const DATA_ATTR = seal(/^data-[\-\w.\u00B7-\uFFFF]+$/);
const ARIA_ATTR = seal(/^aria-[\-\w]+$/);
const IS_ALLOWED_URI = seal(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i);
const IS_SCRIPT_OR_DATA = seal(/^(?:\w+script|data):/i);
const ATTR_WHITESPACE = seal(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g);
const DOCTYPE_NAME = seal(/^html$/i);
const CUSTOM_ELEMENT = seal(/^[a-z][.\w]*(-[.\w]+)+$/i);
const ELEMENT_MARKUP_PROBE = seal(/<[/\w!]/g);
const COMMENT_MARKUP_PROBE = seal(/<[/\w]/g);
const FALLBACK_TAG_CLOSE = seal(/<\/no(script|embed|frames)/i);
const SELF_CLOSING_TAG = seal(/\/>/i);
const NODE_TYPE = {
	element: 1,
	attribute: 2,
	text: 3,
	cdataSection: 4,
	entityReference: 5,
	entityNode: 6,
	processingInstruction: 7,
	comment: 8,
	document: 9,
	documentType: 10,
	documentFragment: 11,
	notation: 12
};
const LITERAL_TEXT_ELEMENT_NAMES = [
	"style",
	"script",
	"xmp",
	"iframe",
	"noembed",
	"noframes",
	"plaintext",
	"noscript"
];
const LITERAL_TEXT_ELEMENTS = freeze(addToSet({}, LITERAL_TEXT_ELEMENT_NAMES));
const LITERAL_TEXT_CLOSE = function() {
	const map = {};
	arrayForEach(LITERAL_TEXT_ELEMENT_NAMES, (name) => {
		map[name] = seal(new RegExp("</" + name + "(?=[\\t\\n\\f\\r />])", "i"));
	});
	return freeze(map);
}();
const getGlobal = function getGlobal() {
	return typeof window === "undefined" ? null : window;
};
/**
* Creates a no-op policy for internal use only.
* Don't export this function outside this module!
* @param trustedTypes The policy factory.
* @param purifyHostElement The Script element used to load DOMPurify (to determine policy name suffix).
* @return The policy created (or null, if Trusted Types
* are not supported or creating the policy failed).
*/
const _createTrustedTypesPolicy = function _createTrustedTypesPolicy(trustedTypes, purifyHostElement) {
	if (typeof trustedTypes !== "object" || typeof trustedTypes.createPolicy !== "function") return null;
	let suffix = null;
	const ATTR_NAME = "data-tt-policy-suffix";
	if (purifyHostElement && purifyHostElement.hasAttribute(ATTR_NAME)) suffix = purifyHostElement.getAttribute(ATTR_NAME);
	const policyName = "dompurify" + (suffix ? "#" + suffix : "");
	try {
		return trustedTypes.createPolicy(policyName, {
			createHTML(html) {
				return html;
			},
			createScriptURL(scriptUrl) {
				return scriptUrl;
			}
		});
	} catch (_) {
		console.warn("TrustedTypes policy " + policyName + " could not be created.");
		return null;
	}
};
const _createHooksMap = function _createHooksMap() {
	return {
		afterSanitizeAttributes: [],
		afterSanitizeElements: [],
		afterSanitizeShadowDOM: [],
		beforeSanitizeAttributes: [],
		beforeSanitizeElements: [],
		beforeSanitizeShadowDOM: [],
		uponSanitizeAttribute: [],
		uponSanitizeElement: [],
		uponSanitizeShadowNode: []
	};
};
/**
* Resolve a set-valued configuration option: a fresh set built from
* cfg[key] when it is an own array property (seeded with a clone of
* options.base when given, case-normalized via options.transform),
* the fallback set otherwise.
*
* @param cfg the cloned, prototype-free configuration object
* @param key the configuration property to read
* @param fallback the set to use when the option is absent or not an array
* @param options transform and optional base set to merge into
* @returns the resolved set
*/
const _resolveSetOption = function _resolveSetOption(cfg, key, fallback, options) {
	return objectHasOwnProperty(cfg, key) && arrayIsArray(cfg[key]) ? addToSet(options.base ? clone(options.base) : {}, cfg[key], options.transform) : fallback;
};
/**
* Resolve an object-valued configuration option: a prototype-free clone
* of cfg[key] when it is an own, truthy object property, else a fresh
* fallback built by makeFallback (fresh on every parse, so a previous
* parse can never leak state into the next one).
*
* @param cfg the cloned, prototype-free configuration object
* @param key the configuration property to read
* @param makeFallback builds the fallback value when the option is absent
* @returns the resolved object
*/
const _resolveObjectOption = function _resolveObjectOption(cfg, key, makeFallback) {
	const value = objectHasOwnProperty(cfg, key) ? cfg[key] : void 0;
	return value && typeof value === "object" ? clone(value) : makeFallback();
};
function createDOMPurify() {
	let window = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : getGlobal();
	const DOMPurify = (root) => createDOMPurify(root);
	DOMPurify.version = "3.4.14";
	DOMPurify.removed = [];
	if (!window || !window.document || window.document.nodeType !== NODE_TYPE.document || !window.Element) {
		DOMPurify.isSupported = false;
		return DOMPurify;
	}
	let document = window.document;
	const originalDocument = document;
	const currentScript = originalDocument.currentScript;
	window.DocumentFragment;
	const HTMLTemplateElement = window.HTMLTemplateElement, Node = window.Node, Element = window.Element, NodeFilter = window.NodeFilter;
	window.NamedNodeMap === void 0 && (window.NamedNodeMap || window.MozNamedAttrMap);
	window.HTMLFormElement;
	const DOMParser = window.DOMParser, trustedTypes = window.trustedTypes;
	const ElementPrototype = Element.prototype;
	const cloneNode = lookupGetter(ElementPrototype, "cloneNode");
	const remove = lookupGetter(ElementPrototype, "remove");
	const getNextSibling = lookupGetter(ElementPrototype, "nextSibling");
	const getChildNodes = lookupGetter(ElementPrototype, "childNodes");
	const getParentNode = lookupGetter(ElementPrototype, "parentNode");
	const getShadowRoot = lookupGetter(ElementPrototype, "shadowRoot");
	const getAttributes = lookupGetter(ElementPrototype, "attributes");
	const getNodeType = Node && Node.prototype ? lookupGetter(Node.prototype, "nodeType") : null;
	const getNodeName = Node && Node.prototype ? lookupGetter(Node.prototype, "nodeName") : null;
	const getOwnerDocument = Node && Node.prototype ? lookupGetter(Node.prototype, "ownerDocument") : null;
	const _readNodeType = function _readNodeType(node) {
		return getNodeType ? getNodeType(node) : node.nodeType;
	};
	const _readNodeName = function _readNodeName(node) {
		return getNodeName ? getNodeName(node) : node.nodeName;
	};
	if (typeof HTMLTemplateElement === "function") {
		const template = document.createElement("template");
		if (template.content && template.content.ownerDocument) document = template.content.ownerDocument;
	}
	let trustedTypesPolicy;
	let emptyHTML = "";
	let defaultTrustedTypesPolicy;
	let defaultTrustedTypesPolicyResolved = false;
	let IN_TRUSTED_TYPES_POLICY = 0;
	const _assertNotInTrustedTypesPolicy = function _assertNotInTrustedTypesPolicy() {
		if (IN_TRUSTED_TYPES_POLICY > 0) throw typeErrorCreate("A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the \"DOMPurify and Trusted Types\" section of the README.");
	};
	const _createTrustedHTML = function _createTrustedHTML(html) {
		_assertNotInTrustedTypesPolicy();
		IN_TRUSTED_TYPES_POLICY++;
		try {
			return trustedTypesPolicy.createHTML(html);
		} finally {
			IN_TRUSTED_TYPES_POLICY--;
		}
	};
	const _createTrustedScriptURL = function _createTrustedScriptURL(scriptUrl) {
		_assertNotInTrustedTypesPolicy();
		IN_TRUSTED_TYPES_POLICY++;
		try {
			return trustedTypesPolicy.createScriptURL(scriptUrl);
		} finally {
			IN_TRUSTED_TYPES_POLICY--;
		}
	};
	const _getDefaultTrustedTypesPolicy = function _getDefaultTrustedTypesPolicy() {
		if (!defaultTrustedTypesPolicyResolved) {
			defaultTrustedTypesPolicy = _createTrustedTypesPolicy(trustedTypes, currentScript);
			defaultTrustedTypesPolicyResolved = true;
		}
		return defaultTrustedTypesPolicy;
	};
	const _document = document, implementation = _document.implementation, createNodeIterator = _document.createNodeIterator, createDocumentFragment = _document.createDocumentFragment, getElementsByTagName = _document.getElementsByTagName;
	const importNode = originalDocument.importNode;
	let hooks = _createHooksMap();
	/**
	* Expose whether this browser supports running the full DOMPurify.
	*/
	DOMPurify.isSupported = typeof entries === "function" && typeof getParentNode === "function" && implementation && implementation.createHTMLDocument !== void 0;
	const MUSTACHE_EXPR$1 = MUSTACHE_EXPR, ERB_EXPR$1 = ERB_EXPR, TMPLIT_EXPR$1 = TMPLIT_EXPR, DATA_ATTR$1 = DATA_ATTR, ARIA_ATTR$1 = ARIA_ATTR, IS_SCRIPT_OR_DATA$1 = IS_SCRIPT_OR_DATA, ATTR_WHITESPACE$1 = ATTR_WHITESPACE, CUSTOM_ELEMENT$1 = CUSTOM_ELEMENT;
	let IS_ALLOWED_URI$1 = IS_ALLOWED_URI;
	/**
	* We consider the elements and attributes below to be safe. Ideally
	* don't add any new ones but feel free to remove unwanted ones.
	*/
	let ALLOWED_TAGS = null;
	const DEFAULT_ALLOWED_TAGS = addToSet({}, [
		...html$1,
		...svg$1,
		...svgFilters,
		...mathMl$1,
		...text$1
	]);
	let ALLOWED_ATTR = null;
	const DEFAULT_ALLOWED_ATTR = addToSet({}, [
		...html,
		...svg,
		...mathMl,
		...xml
	]);
	let CUSTOM_ELEMENT_HANDLING = Object.seal(create$1(null, {
		tagNameCheck: {
			writable: true,
			configurable: false,
			enumerable: true,
			value: null
		},
		attributeNameCheck: {
			writable: true,
			configurable: false,
			enumerable: true,
			value: null
		},
		allowCustomizedBuiltInElements: {
			writable: true,
			configurable: false,
			enumerable: true,
			value: false
		}
	}));
	let FORBID_TAGS = null;
	let FORBID_ATTR = null;
	const EXTRA_ELEMENT_HANDLING = Object.seal(create$1(null, {
		tagCheck: {
			writable: true,
			configurable: false,
			enumerable: true,
			value: null
		},
		attributeCheck: {
			writable: true,
			configurable: false,
			enumerable: true,
			value: null
		}
	}));
	let ALLOW_ARIA_ATTR = true;
	let ALLOW_DATA_ATTR = true;
	let ALLOW_UNKNOWN_PROTOCOLS = false;
	let ALLOW_SELF_CLOSE_IN_ATTR = true;
	let SAFE_FOR_TEMPLATES = false;
	let SAFE_FOR_XML = true;
	let WHOLE_DOCUMENT = false;
	let SET_CONFIG = false;
	let SET_CONFIG_ALLOWED_TAGS = null;
	let SET_CONFIG_ALLOWED_ATTR = null;
	let FORCE_BODY = false;
	let RETURN_DOM = false;
	let RETURN_DOM_FRAGMENT = false;
	let RETURN_TRUSTED_TYPE = false;
	let SANITIZE_DOM = true;
	let SANITIZE_NAMED_PROPS = false;
	const SANITIZE_NAMED_PROPS_PREFIX = "user-content-";
	let KEEP_CONTENT = true;
	let IN_PLACE = false;
	let USE_PROFILES = {};
	let FORBID_CONTENTS = null;
	const DEFAULT_FORBID_CONTENTS = addToSet({}, [
		"annotation-xml",
		"audio",
		"colgroup",
		"desc",
		"foreignobject",
		"head",
		"iframe",
		"math",
		"mi",
		"mn",
		"mo",
		"ms",
		"mtext",
		"noembed",
		"noframes",
		"noscript",
		"plaintext",
		"script",
		"selectedcontent",
		"style",
		"svg",
		"template",
		"thead",
		"title",
		"video",
		"xmp"
	]);
	let DATA_URI_TAGS = null;
	const DEFAULT_DATA_URI_TAGS = addToSet({}, [
		"audio",
		"video",
		"img",
		"source",
		"image",
		"track"
	]);
	let URI_SAFE_ATTRIBUTES = null;
	const DEFAULT_URI_SAFE_ATTRIBUTES = addToSet({}, [
		"alt",
		"class",
		"for",
		"id",
		"label",
		"name",
		"pattern",
		"placeholder",
		"role",
		"summary",
		"title",
		"value",
		"style",
		"xmlns"
	]);
	const MATHML_NAMESPACE = "http://www.w3.org/1998/Math/MathML";
	const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
	const HTML_NAMESPACE = "http://www.w3.org/1999/xhtml";
	let NAMESPACE = HTML_NAMESPACE;
	let IS_EMPTY_INPUT = false;
	let ALLOWED_NAMESPACES = null;
	const DEFAULT_ALLOWED_NAMESPACES = addToSet({}, [
		MATHML_NAMESPACE,
		SVG_NAMESPACE,
		HTML_NAMESPACE
	], stringToString);
	const DEFAULT_MATHML_TEXT_INTEGRATION_POINTS = freeze([
		"mi",
		"mo",
		"mn",
		"ms",
		"mtext"
	]);
	let MATHML_TEXT_INTEGRATION_POINTS = addToSet({}, DEFAULT_MATHML_TEXT_INTEGRATION_POINTS);
	const DEFAULT_HTML_INTEGRATION_POINTS = freeze(["annotation-xml"]);
	let HTML_INTEGRATION_POINTS = addToSet({}, DEFAULT_HTML_INTEGRATION_POINTS);
	const COMMON_SVG_AND_HTML_ELEMENTS = addToSet({}, [
		"title",
		"style",
		"font",
		"a",
		"script"
	]);
	let PARSER_MEDIA_TYPE = null;
	const SUPPORTED_PARSER_MEDIA_TYPES = ["application/xhtml+xml", "text/html"];
	const DEFAULT_PARSER_MEDIA_TYPE = "text/html";
	let transformCaseFunc = null;
	let CONFIG = null;
	const formElement = document.createElement("form");
	const isRegexOrFunction = function isRegexOrFunction(testValue) {
		return testValue instanceof RegExp || testValue instanceof Function;
	};
	/**
	* _parseConfig
	*
	* @param cfg optional config literal
	*/
	const _parseConfig = function _parseConfig() {
		let cfg = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
		if (CONFIG && CONFIG === cfg) return;
		if (!cfg || typeof cfg !== "object") cfg = {};
		cfg = clone(cfg);
		PARSER_MEDIA_TYPE = SUPPORTED_PARSER_MEDIA_TYPES.indexOf(cfg.PARSER_MEDIA_TYPE) === -1 ? DEFAULT_PARSER_MEDIA_TYPE : cfg.PARSER_MEDIA_TYPE;
		transformCaseFunc = PARSER_MEDIA_TYPE === "application/xhtml+xml" ? stringToString : stringToLowerCase;
		ALLOWED_TAGS = _resolveSetOption(cfg, "ALLOWED_TAGS", DEFAULT_ALLOWED_TAGS, { transform: transformCaseFunc });
		ALLOWED_ATTR = _resolveSetOption(cfg, "ALLOWED_ATTR", DEFAULT_ALLOWED_ATTR, { transform: transformCaseFunc });
		ALLOWED_NAMESPACES = _resolveSetOption(cfg, "ALLOWED_NAMESPACES", DEFAULT_ALLOWED_NAMESPACES, { transform: stringToString });
		URI_SAFE_ATTRIBUTES = _resolveSetOption(cfg, "ADD_URI_SAFE_ATTR", DEFAULT_URI_SAFE_ATTRIBUTES, {
			transform: transformCaseFunc,
			base: DEFAULT_URI_SAFE_ATTRIBUTES
		});
		DATA_URI_TAGS = _resolveSetOption(cfg, "ADD_DATA_URI_TAGS", DEFAULT_DATA_URI_TAGS, {
			transform: transformCaseFunc,
			base: DEFAULT_DATA_URI_TAGS
		});
		FORBID_CONTENTS = _resolveSetOption(cfg, "FORBID_CONTENTS", DEFAULT_FORBID_CONTENTS, { transform: transformCaseFunc });
		FORBID_TAGS = _resolveSetOption(cfg, "FORBID_TAGS", clone({}), { transform: transformCaseFunc });
		FORBID_ATTR = _resolveSetOption(cfg, "FORBID_ATTR", clone({}), { transform: transformCaseFunc });
		USE_PROFILES = objectHasOwnProperty(cfg, "USE_PROFILES") ? cfg.USE_PROFILES && typeof cfg.USE_PROFILES === "object" ? clone(cfg.USE_PROFILES) : cfg.USE_PROFILES : false;
		ALLOW_ARIA_ATTR = cfg.ALLOW_ARIA_ATTR !== false;
		ALLOW_DATA_ATTR = cfg.ALLOW_DATA_ATTR !== false;
		ALLOW_UNKNOWN_PROTOCOLS = cfg.ALLOW_UNKNOWN_PROTOCOLS || false;
		ALLOW_SELF_CLOSE_IN_ATTR = cfg.ALLOW_SELF_CLOSE_IN_ATTR !== false;
		SAFE_FOR_TEMPLATES = cfg.SAFE_FOR_TEMPLATES || false;
		SAFE_FOR_XML = cfg.SAFE_FOR_XML !== false;
		WHOLE_DOCUMENT = cfg.WHOLE_DOCUMENT || false;
		RETURN_DOM = cfg.RETURN_DOM || false;
		RETURN_DOM_FRAGMENT = cfg.RETURN_DOM_FRAGMENT || false;
		RETURN_TRUSTED_TYPE = cfg.RETURN_TRUSTED_TYPE || false;
		FORCE_BODY = cfg.FORCE_BODY || false;
		SANITIZE_DOM = cfg.SANITIZE_DOM !== false;
		SANITIZE_NAMED_PROPS = cfg.SANITIZE_NAMED_PROPS || false;
		KEEP_CONTENT = cfg.KEEP_CONTENT !== false;
		IN_PLACE = cfg.IN_PLACE || false;
		IS_ALLOWED_URI$1 = isRegex(cfg.ALLOWED_URI_REGEXP) ? cfg.ALLOWED_URI_REGEXP : IS_ALLOWED_URI;
		NAMESPACE = typeof cfg.NAMESPACE === "string" ? cfg.NAMESPACE : HTML_NAMESPACE;
		MATHML_TEXT_INTEGRATION_POINTS = _resolveObjectOption(cfg, "MATHML_TEXT_INTEGRATION_POINTS", () => addToSet({}, DEFAULT_MATHML_TEXT_INTEGRATION_POINTS));
		HTML_INTEGRATION_POINTS = _resolveObjectOption(cfg, "HTML_INTEGRATION_POINTS", () => addToSet({}, DEFAULT_HTML_INTEGRATION_POINTS));
		const customElementHandling = _resolveObjectOption(cfg, "CUSTOM_ELEMENT_HANDLING", () => create$1(null));
		CUSTOM_ELEMENT_HANDLING = create$1(null);
		if (objectHasOwnProperty(customElementHandling, "tagNameCheck") && isRegexOrFunction(customElementHandling.tagNameCheck)) CUSTOM_ELEMENT_HANDLING.tagNameCheck = customElementHandling.tagNameCheck;
		if (objectHasOwnProperty(customElementHandling, "attributeNameCheck") && isRegexOrFunction(customElementHandling.attributeNameCheck)) CUSTOM_ELEMENT_HANDLING.attributeNameCheck = customElementHandling.attributeNameCheck;
		if (objectHasOwnProperty(customElementHandling, "allowCustomizedBuiltInElements") && typeof customElementHandling.allowCustomizedBuiltInElements === "boolean") CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements = customElementHandling.allowCustomizedBuiltInElements;
		seal(CUSTOM_ELEMENT_HANDLING);
		if (SAFE_FOR_TEMPLATES) ALLOW_DATA_ATTR = false;
		if (RETURN_DOM_FRAGMENT) RETURN_DOM = true;
		if (USE_PROFILES) {
			ALLOWED_TAGS = addToSet({}, text$1);
			ALLOWED_ATTR = create$1(null);
			if (USE_PROFILES.html === true) {
				addToSet(ALLOWED_TAGS, html$1);
				addToSet(ALLOWED_ATTR, html);
			}
			if (USE_PROFILES.svg === true) {
				addToSet(ALLOWED_TAGS, svg$1);
				addToSet(ALLOWED_ATTR, svg);
				addToSet(ALLOWED_ATTR, xml);
			}
			if (USE_PROFILES.svgFilters === true) {
				addToSet(ALLOWED_TAGS, svgFilters);
				addToSet(ALLOWED_ATTR, svg);
				addToSet(ALLOWED_ATTR, xml);
			}
			if (USE_PROFILES.mathMl === true) {
				addToSet(ALLOWED_TAGS, mathMl$1);
				addToSet(ALLOWED_ATTR, mathMl);
				addToSet(ALLOWED_ATTR, xml);
			}
		}
		EXTRA_ELEMENT_HANDLING.tagCheck = null;
		EXTRA_ELEMENT_HANDLING.attributeCheck = null;
		if (objectHasOwnProperty(cfg, "ADD_TAGS")) {
			if (typeof cfg.ADD_TAGS === "function") EXTRA_ELEMENT_HANDLING.tagCheck = cfg.ADD_TAGS;
			else if (arrayIsArray(cfg.ADD_TAGS)) {
				if (ALLOWED_TAGS === DEFAULT_ALLOWED_TAGS) ALLOWED_TAGS = clone(ALLOWED_TAGS);
				addToSet(ALLOWED_TAGS, cfg.ADD_TAGS, transformCaseFunc);
			}
		}
		if (objectHasOwnProperty(cfg, "ADD_ATTR")) {
			if (typeof cfg.ADD_ATTR === "function") EXTRA_ELEMENT_HANDLING.attributeCheck = cfg.ADD_ATTR;
			else if (arrayIsArray(cfg.ADD_ATTR)) {
				if (ALLOWED_ATTR === DEFAULT_ALLOWED_ATTR) ALLOWED_ATTR = clone(ALLOWED_ATTR);
				addToSet(ALLOWED_ATTR, cfg.ADD_ATTR, transformCaseFunc);
			}
		}
		if (objectHasOwnProperty(cfg, "ADD_FORBID_CONTENTS") && arrayIsArray(cfg.ADD_FORBID_CONTENTS)) {
			if (FORBID_CONTENTS === DEFAULT_FORBID_CONTENTS) FORBID_CONTENTS = clone(FORBID_CONTENTS);
			addToSet(FORBID_CONTENTS, cfg.ADD_FORBID_CONTENTS, transformCaseFunc);
		}
		if (KEEP_CONTENT) ALLOWED_TAGS["#text"] = true;
		if (WHOLE_DOCUMENT) addToSet(ALLOWED_TAGS, [
			"html",
			"head",
			"body"
		]);
		if (ALLOWED_TAGS.table) {
			addToSet(ALLOWED_TAGS, ["tbody"]);
			delete FORBID_TAGS.tbody;
		}
		if (cfg.TRUSTED_TYPES_POLICY) {
			if (typeof cfg.TRUSTED_TYPES_POLICY.createHTML !== "function") throw typeErrorCreate("TRUSTED_TYPES_POLICY configuration option must provide a \"createHTML\" hook.");
			if (typeof cfg.TRUSTED_TYPES_POLICY.createScriptURL !== "function") throw typeErrorCreate("TRUSTED_TYPES_POLICY configuration option must provide a \"createScriptURL\" hook.");
			const previousTrustedTypesPolicy = trustedTypesPolicy;
			trustedTypesPolicy = cfg.TRUSTED_TYPES_POLICY;
			try {
				emptyHTML = _createTrustedHTML("");
			} catch (error) {
				trustedTypesPolicy = previousTrustedTypesPolicy;
				throw error;
			}
		} else if (cfg.TRUSTED_TYPES_POLICY === null) {
			trustedTypesPolicy = void 0;
			emptyHTML = "";
		} else {
			if (trustedTypesPolicy === void 0) trustedTypesPolicy = _getDefaultTrustedTypesPolicy();
			if (trustedTypesPolicy && typeof emptyHTML === "string") emptyHTML = _createTrustedHTML("");
		}
		if (freeze) freeze(cfg);
		CONFIG = cfg;
	};
	const ALL_SVG_TAGS = addToSet({}, [
		...svg$1,
		...svgFilters,
		...svgDisallowed
	]);
	const ALL_MATHML_TAGS = addToSet({}, [...mathMl$1, ...mathMlDisallowed]);
	/**
	* Namespace rules for an element in the SVG namespace.
	*
	* @param tagName the element's lowercase tag name
	* @param parent the (possibly simulated) parent node
	* @param parentTagName the parent's lowercase tag name
	* @returns true if a spec-compliant parser could produce this element
	*/
	const _checkSvgNamespace = function _checkSvgNamespace(tagName, parent, parentTagName) {
		if (parent.namespaceURI === HTML_NAMESPACE) return tagName === "svg";
		if (parent.namespaceURI === MATHML_NAMESPACE) return tagName === "svg" && (parentTagName === "annotation-xml" || MATHML_TEXT_INTEGRATION_POINTS[parentTagName]);
		return Boolean(ALL_SVG_TAGS[tagName]);
	};
	/**
	* Namespace rules for an element in the MathML namespace.
	*
	* @param tagName the element's lowercase tag name
	* @param parent the (possibly simulated) parent node
	* @param parentTagName the parent's lowercase tag name
	* @returns true if a spec-compliant parser could produce this element
	*/
	const _checkMathMlNamespace = function _checkMathMlNamespace(tagName, parent, parentTagName) {
		if (parent.namespaceURI === HTML_NAMESPACE) return tagName === "math";
		if (parent.namespaceURI === SVG_NAMESPACE) return tagName === "math" && HTML_INTEGRATION_POINTS[parentTagName];
		return Boolean(ALL_MATHML_TAGS[tagName]);
	};
	/**
	* Namespace rules for an element in the HTML namespace.
	*
	* @param tagName the element's lowercase tag name
	* @param parent the (possibly simulated) parent node
	* @param parentTagName the parent's lowercase tag name
	* @returns true if a spec-compliant parser could produce this element
	*/
	const _checkHtmlNamespace = function _checkHtmlNamespace(tagName, parent, parentTagName) {
		if (parent.namespaceURI === SVG_NAMESPACE && !HTML_INTEGRATION_POINTS[parentTagName]) return false;
		if (parent.namespaceURI === MATHML_NAMESPACE && !MATHML_TEXT_INTEGRATION_POINTS[parentTagName]) return false;
		return !ALL_MATHML_TAGS[tagName] && (COMMON_SVG_AND_HTML_ELEMENTS[tagName] || !ALL_SVG_TAGS[tagName]);
	};
	/**
	* @param element a DOM element whose namespace is being checked
	* @returns Return false if the element has a
	*  namespace that a spec-compliant parser would never
	*  return. Return true otherwise.
	*/
	const _checkValidNamespace = function _checkValidNamespace(element) {
		let parent = getParentNode(element);
		if (!parent || !parent.tagName) parent = {
			namespaceURI: NAMESPACE,
			tagName: "template"
		};
		const tagName = stringToLowerCase(element.tagName);
		const parentTagName = stringToLowerCase(parent.tagName);
		if (!ALLOWED_NAMESPACES[element.namespaceURI]) return false;
		if (element.namespaceURI === SVG_NAMESPACE) return _checkSvgNamespace(tagName, parent, parentTagName);
		if (element.namespaceURI === MATHML_NAMESPACE) return _checkMathMlNamespace(tagName, parent, parentTagName);
		if (element.namespaceURI === HTML_NAMESPACE) return _checkHtmlNamespace(tagName, parent, parentTagName);
		if (PARSER_MEDIA_TYPE === "application/xhtml+xml" && ALLOWED_NAMESPACES[element.namespaceURI]) return true;
		return false;
	};
	/**
	* _forceRemove
	*
	* @param node a DOM node
	*/
	const _forceRemove = function _forceRemove(node) {
		arrayPush(DOMPurify.removed, { element: node });
		try {
			getParentNode(node).removeChild(node);
		} catch (_) {
			remove(node);
			if (!getParentNode(node)) throw typeErrorCreate("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place");
		}
	};
	/**
	* _stripAttributeNode
	*
	* Remove a single Attr node case/namespace-exactly on an attribute-teardown
	* path. Name-based removeAttribute() ASCII-lowercases its lookup key for an
	* HTML element in an HTML document and so silently misses a case-preserved
	* handler (e.g. `ONERROR` off an XML/XHTML import) - the same defect
	* _removeAttribute() was fixed for, which a name-based call would reintroduce
	* on these IN_PLACE teardown paths. Unlike _removeAttribute this does not
	* record into DOMPurify.removed: the neutralize passes intentionally do not
	* book-keep. A clobbered/detached node falls back to best-effort name-based
	* removal.
	*
	* @param element the element to strip the attribute from
	* @param attribute the Attr node to remove
	* @param name the attribute's name, for the fallback path
	*/
	const _stripAttributeNode = function _stripAttributeNode(element, attribute, name) {
		try {
			element.removeAttributeNode(attribute);
		} catch (_) {
			try {
				element.removeAttribute(name);
			} catch (_) {}
		}
	};
	/**
	* _neutralizeRoot
	*
	* Fail-closed teardown of an in-place root after the sanitize walk aborts
	* (campaign-3 F2). An internal throw mid-walk — e.g. a page-registered
	* custom element's reaction detaches a node so `_forceRemove`'s deliberate
	* parentless guard throws, or any other re-entrant engine mutation — would
	* otherwise leave the caller's *live* tree half-sanitized, with everything
	* after the abort point still carrying its handlers. There is no safe way
	* to resume the walk (the tree mutated under us), so we strip the root bare:
	* remove every child and every attribute, then let the caller's catch see
	* the original error. Clobber-safe (cached `remove`/`childNodes`/`attributes`
	* getters; the root was already clobber-pre-flighted at the IN_PLACE entry).
	*
	* @param root the in-place root to empty
	*/
	const _neutralizeRoot = function _neutralizeRoot(root) {
		_neutralizeSubtree(root);
		const childNodes = getChildNodes(root);
		if (childNodes) {
			const snapshot = [];
			arrayForEach(childNodes, (child) => {
				arrayPush(snapshot, child);
			});
			arrayForEach(snapshot, (child) => {
				try {
					remove(child);
				} catch (_) {}
			});
		}
		const attributes = getAttributes(root);
		if (attributes) for (let i = attributes.length - 1; i >= 0; --i) {
			const attribute = attributes[i];
			const name = attribute && attribute.name;
			if (typeof name === "string") _stripAttributeNode(root, attribute, name);
		}
	};
	/**
	* _removeAttribute
	*
	* Name-based getAttributeNode()/removeAttribute() ASCII-lowercase their
	* lookup key for HTML elements in an HTML document, so they silently miss an
	* attribute whose stored qualified name still contains uppercase ASCII
	* letters. That happens when the node came from a case-preserving source
	* (an XML/XHTML document imported via importNode(), or createAttributeNS()),
	* where e.g. `ONERROR` survives the walk: the policy check lowercases to
	* `onerror` and rejects it, but `removeAttribute('ONERROR')` looks up
	* `onerror` and finds nothing. Remove the exact Attr node instead, which is
	* case- and namespace-exact, and fall back to name-based removal only when
	* the caller could not supply the node.
	*
	* @param name an Attribute name
	* @param element a DOM node
	* @param attr the exact Attr node to remove, when the caller has it
	*/
	const _removeAttribute = function _removeAttribute(name, element, attr) {
		if (!attr) try {
			attr = element.getAttributeNode(name);
		} catch (_) {
			attr = null;
		}
		arrayPush(DOMPurify.removed, {
			attribute: attr || null,
			from: element
		});
		try {
			if (attr) element.removeAttributeNode(attr);
			else element.removeAttribute(name);
		} catch (_) {
			try {
				element.removeAttribute(name);
			} catch (_) {}
		}
		if (name === "is") {
			if (RETURN_DOM || RETURN_DOM_FRAGMENT) try {
				_forceRemove(element);
			} catch (_) {}
			else try {
				element.setAttribute(name, "");
			} catch (_) {}
		}
	};
	/**
	* _stripDisallowedAttributes
	*
	* Removes every attribute the active configuration does not allow from a
	* single element, using the same allowlist as the main attribute pass (so
	* `on*` handlers go, but no `/^on/` blocklist is introduced). Used only to
	* neutralise nodes that are being discarded from an in-place tree.
	*
	* @param element the element to strip
	*/
	const _stripDisallowedAttributes = function _stripDisallowedAttributes(element) {
		const attributes = getAttributes(element);
		if (!attributes) return;
		for (let i = attributes.length - 1; i >= 0; --i) {
			const attribute = attributes[i];
			const name = attribute && attribute.name;
			if (typeof name !== "string" || ALLOWED_ATTR[transformCaseFunc(name)]) continue;
			_stripAttributeNode(element, attribute, name);
		}
	};
	/**
	* _neutralizeSubtree
	*
	* Completes the audit-5 F1 fix across every removal path. The KEEP_CONTENT
	* move-hoist neutralises only disallowed-tag removals; clobber, mXSS-canary,
	* namespace, comment, processing-instruction and KEEP_CONTENT:false removals
	* all drop their subtree wholesale via `_forceRemove`. On the IN_PLACE path
	* those dropped nodes are detached from the caller's LIVE tree but a
	* handler-bearing original among them (an `<img onerror>`/`<video>` that was
	* loading) keeps its queued resource event, which fires in page scope after
	* sanitize returns. This walks a removed subtree and strips every attribute
	* the active configuration does not allow — so `on*` handlers are cancelled
	* through the SAME allowlist that governs kept nodes, not a separate `/^on/`
	* blocklist. Run synchronously before sanitize returns, i.e. before any
	* queued event can fire. Hook-free by design: these nodes leave the output,
	* so firing attribute hooks for them would be surprising. Clobber-safe reads;
	* a doomed clobbered node may shadow `removeAttribute` (its own attributes are
	* irrelevant — it is discarded — while its non-clobbered descendants, e.g.
	* the `<img>`, are reached and scrubbed).
	*
	* @param root the root of a removed subtree to neutralise
	*/
	const _neutralizeSubtree = function _neutralizeSubtree(root) {
		const stack = [root];
		while (stack.length > 0) {
			const node = stack.pop();
			if (_readNodeType(node) === NODE_TYPE.element) _stripDisallowedAttributes(node);
			const childNodes = getChildNodes(node);
			if (childNodes) for (let i = childNodes.length - 1; i >= 0; --i) stack.push(childNodes[i]);
		}
	};
	/**
	* _neutralizePatchLinkage
	*
	* IN_PLACE entry pre-pass (declarative-partial-updates / streaming
	* hardening, https://github.com/WICG/declarative-partial-updates).
	*
	* The main walk strips patch linkage (`for`/`patchsrc`) and removes range
	* markers (PIs / markup comments) node-by-node, in document order, AS it
	* reaches each node. On a live in-place root that leaves a window: from the
	* moment the root is connected until the walk arrives at a given node, that
	* node's linkage is live. A patch applied on connection/stream can fire as
	* a microtask during the walk and inject or teleport an unsanitized DOM
	* range into a region the iterator has already passed and will not revisit,
	* so the post-return "tree is sanitized" contract is violated. Sweep the
	* whole tree once up front and sever every linkage before the walk begins,
	* closing that window.
	*
	* This CANNOT undo a patch that already fired before sanitize ran — that is
	* the irreducible "do not IN_PLACE a live-connected attacker tree" caveat —
	* but it closes everything from sanitize-start onward. Gated on SAFE_FOR_XML
	* to group with the rest of the declarative-partial-updates handling and
	* stay overridable, consistent with the codebase.
	*
	* Clobber-safe traversal (cached childNodes getter); per-node try/catch so a
	* clobbered root cannot defeat the sweep of its non-clobbered descendants.
	*
	* NOTE (pending real-Chrome confirmation, see test/declarative-patch-probe
	* .html Q1): this mirrors the existing policy of keeping `for` on
	* <label>/<output>. If the shipping feature can drive a patch through a
	* surviving `for`-on-label/output + `id` pair, this pre-pass and the
	* attribute check at _isBasicCustomElement's caller must additionally drop
	* that pair on the IN_PLACE path. Left as-is until the taxonomy is verified.
	*
	* @param root the in-place root to sweep
	*/
	/**
	* Central policy for declarative-partial-updates patch-linkage attributes,
	* shared by the _neutralizePatchLinkage pre-pass and _isValidAttribute so
	* the two sites cannot drift: `patchsrc` always links, `for` links
	* everywhere except on <label>/<output>, and the whole policy is gated on
	* SAFE_FOR_XML (see the rationale block in _isValidAttribute).
	*
	* @param lcName the transformCaseFunc'd attribute name
	* @param lcTag the transformCaseFunc'd tag name of the carrying element
	* @return true if the attribute is patch linkage and must be dropped
	*/
	const _isPatchLinkageAttribute = function _isPatchLinkageAttribute(lcName, lcTag) {
		if (!SAFE_FOR_XML) return false;
		if (lcName === "patchsrc") return true;
		return lcName === "for" && lcTag !== "label" && lcTag !== "output";
	};
	const _neutralizePatchLinkage = function _neutralizePatchLinkage(root) {
		if (!SAFE_FOR_XML) return;
		const stack = [root];
		while (stack.length > 0) {
			const node = stack.pop();
			const nodeType = _readNodeType(node);
			if (nodeType === NODE_TYPE.processingInstruction || nodeType === NODE_TYPE.comment && regExpTest(COMMENT_MARKUP_PROBE, node.data)) {
				try {
					remove(node);
				} catch (_) {}
				continue;
			}
			if (nodeType === NODE_TYPE.element) {
				const element = node;
				const lcTag = transformCaseFunc(_readNodeName(node));
				try {
					if (element.hasAttribute && element.hasAttribute("patchsrc")) element.removeAttribute("patchsrc");
					if (element.hasAttribute && element.hasAttribute("for") && _isPatchLinkageAttribute("for", lcTag)) element.removeAttribute("for");
				} catch (_) {}
			}
			const childNodes = getChildNodes(node);
			if (childNodes) for (let i = childNodes.length - 1; i >= 0; --i) stack.push(childNodes[i]);
		}
	};
	/**
	* _initDocument
	*
	* @param dirty - a string of dirty markup
	* @return a DOM, filled with the dirty markup
	*/
	const _initDocument = function _initDocument(dirty) {
		let doc = null;
		let leadingWhitespace = null;
		if (FORCE_BODY) dirty = "<remove></remove>" + dirty;
		else {
			const matches = stringMatch(dirty, /^[\r\n\t ]+/);
			leadingWhitespace = matches && matches[0];
		}
		if (PARSER_MEDIA_TYPE === "application/xhtml+xml" && NAMESPACE === HTML_NAMESPACE) dirty = "<html xmlns=\"http://www.w3.org/1999/xhtml\"><head></head><body>" + dirty + "</body></html>";
		const dirtyPayload = trustedTypesPolicy ? _createTrustedHTML(dirty) : dirty;
		if (NAMESPACE === HTML_NAMESPACE) try {
			doc = new DOMParser().parseFromString(dirtyPayload, PARSER_MEDIA_TYPE);
		} catch (_) {}
		if (!doc || !doc.documentElement) {
			doc = implementation.createDocument(NAMESPACE, "template", null);
			try {
				doc.documentElement.innerHTML = IS_EMPTY_INPUT ? emptyHTML : dirtyPayload;
			} catch (_) {}
		}
		const body = doc.body || doc.documentElement;
		if (dirty && leadingWhitespace) body.insertBefore(document.createTextNode(leadingWhitespace), body.childNodes[0] || null);
		if (NAMESPACE === HTML_NAMESPACE) return getElementsByTagName.call(doc, WHOLE_DOCUMENT ? "html" : "body")[0];
		return WHOLE_DOCUMENT ? doc.documentElement : body;
	};
	/**
	* Creates a NodeIterator object that you can use to traverse filtered lists of nodes or elements in a document.
	*
	* @param root The root element or node to start traversing on.
	* @return The created NodeIterator
	*/
	const _createNodeIterator = function _createNodeIterator(root) {
		const doc = getOwnerDocument ? getOwnerDocument(root) : root.ownerDocument;
		return createNodeIterator.call(doc || root, root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT | NodeFilter.SHOW_PROCESSING_INSTRUCTION | NodeFilter.SHOW_CDATA_SECTION, null);
	};
	/**
	* Replace template expression syntax (mustache, ERB, template
	* literal) with a space; shared by all SAFE_FOR_TEMPLATES scrub
	* sites. Order matters: mustache, then ERB, then template literal.
	*
	* @param value the string to scrub
	* @returns the scrubbed string
	*/
	const _stripTemplateExpressions = function _stripTemplateExpressions(value) {
		value = stringReplace(value, MUSTACHE_EXPR$1, " ");
		value = stringReplace(value, ERB_EXPR$1, " ");
		value = stringReplace(value, TMPLIT_EXPR$1, " ");
		return value;
	};
	/**
	* Strip template-engine expressions ({{...}}, ${...}, <%...%>) from the
	* character data of an element subtree. Used as the final safety net for
	* SAFE_FOR_TEMPLATES on every DOM-returning code path so that expressions
	* which only form after text-node normalization (e.g. fragments split across
	* stripped elements) cannot survive into a template-evaluating framework.
	*
	* Walks text/comment/CDATA/processing-instruction nodes and mutates `.data`
	* in place rather than round-tripping through innerHTML. This preserves
	* descendant node references (important for IN_PLACE callers), avoids a
	* serialize/reparse cycle, and reads literal character data — which means
	* `<%...%>` in text content matches the ERB regex against its real bytes
	* instead of the HTML-entity-escaped form innerHTML would produce.
	*
	* Attribute values are not visited here; SAFE_FOR_TEMPLATES handling for
	* attributes is performed during the per-node `_sanitizeAttributes` pass.
	*
	* @param node The root element whose character data should be scrubbed.
	*/
	const _scrubTemplateExpressions2 = function _scrubTemplateExpressions(node) {
		var _node$querySelectorAl;
		node.normalize();
		const doc = getOwnerDocument ? getOwnerDocument(node) : node.ownerDocument;
		const walker = createNodeIterator.call(doc || node, node, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_CDATA_SECTION | NodeFilter.SHOW_PROCESSING_INSTRUCTION, null);
		let currentNode = walker.nextNode();
		while (currentNode) {
			currentNode.data = _stripTemplateExpressions(currentNode.data);
			currentNode = walker.nextNode();
		}
		const templates = (_node$querySelectorAl = node.querySelectorAll) === null || _node$querySelectorAl === void 0 ? void 0 : _node$querySelectorAl.call(node, "template");
		if (templates) arrayForEach(templates, (tmpl) => {
			if (_isDocumentFragment(tmpl.content)) _scrubTemplateExpressions2(tmpl.content);
		});
	};
	/**
	* _isClobbered
	*
	* Detect DOM-clobbering on HTMLFormElement nodes. Form is the only HTML
	* interface with [LegacyOverrideBuiltIns]; a descendant element with a
	* `name` attribute matching a prototype property shadows that property
	* on direct reads. We use this check at the IN_PLACE entry-point and
	* during attribute sanitization to refuse clobbered forms.
	*
	* @param element element to check for clobbering attacks
	* @return true if clobbered, false if safe
	*/
	const _isClobbered = function _isClobbered(element) {
		const realTagName = getNodeName ? getNodeName(element) : null;
		if (typeof realTagName !== "string") return false;
		if (transformCaseFunc(realTagName) !== "form") return false;
		return typeof element.nodeName !== "string" || typeof element.textContent !== "string" || typeof element.removeChild !== "function" || element.attributes !== getAttributes(element) || typeof element.removeAttribute !== "function" || typeof element.setAttribute !== "function" || typeof element.namespaceURI !== "string" || typeof element.insertBefore !== "function" || typeof element.hasChildNodes !== "function" || element.nodeType !== getNodeType(element) || element.childNodes !== getChildNodes(element);
	};
	/**
	* Checks whether the given value is a DocumentFragment from any realm.
	*
	* The realm-independent replacement reads `nodeType` through the cached
	* Node.prototype getter and compares to the DOCUMENT_FRAGMENT_NODE
	* constant (11). nodeType is a numeric value resolved from the node's
	* internal slot, identical across realms for the same kind of node.
	*
	* @param value object to check
	* @return true if value is a DocumentFragment-shaped node from any realm
	*/
	const _isDocumentFragment = function _isDocumentFragment(value) {
		if (!getNodeType || typeof value !== "object" || value === null) return false;
		try {
			return getNodeType(value) === NODE_TYPE.documentFragment;
		} catch (_) {
			return false;
		}
	};
	/**
	* Checks whether the given object is a DOM node, including nodes that
	* originate from a different window/realm (e.g. an iframe's
	* contentDocument). The previous `value instanceof Node` check was
	* realm-bound: nodes from a different window failed it, causing
	* sanitize() to silently stringify them and reset IN_PLACE to false,
	* returning the original node unsanitized. See GHSA-4w3q-35jp-p934.
	*
	* @param value object to check whether it's a DOM node
	* @return true if value is a DOM node from any realm
	*/
	const _isNode = function _isNode(value) {
		if (!getNodeType || typeof value !== "object" || value === null) return false;
		try {
			return typeof getNodeType(value) === "number";
		} catch (_) {
			return false;
		}
	};
	function _executeHooks(hooks, currentNode, data) {
		if (hooks.length === 0) return;
		arrayForEach(hooks, (hook) => {
			hook.call(DOMPurify, currentNode, data, CONFIG);
		});
	}
	/**
	* Structural-threat checks that condemn a node regardless of the
	* allowlists: mXSS via namespace confusion, risky CSS construction,
	* processing instructions, markup-bearing comments. Pure predicate;
	* the caller removes. Check order is load-bearing.
	*
	* @param currentNode the node to inspect
	* @param tagName the node's transformCaseFunc'd tag name
	* @return true if the node must be removed
	*/
	const _isUnsafeNode = function _isUnsafeNode(currentNode, tagName) {
		if (SAFE_FOR_XML && currentNode.hasChildNodes() && !_isNode(currentNode.firstElementChild) && regExpTest(ELEMENT_MARKUP_PROBE, currentNode.textContent) && regExpTest(ELEMENT_MARKUP_PROBE, currentNode.innerHTML)) return true;
		if (SAFE_FOR_XML && currentNode.namespaceURI === HTML_NAMESPACE && LITERAL_TEXT_ELEMENTS[tagName] && (_isNode(currentNode.firstElementChild) || typeof currentNode.textContent === "string" && regExpTest(LITERAL_TEXT_CLOSE[tagName], currentNode.textContent))) return true;
		if (currentNode.nodeType === NODE_TYPE.processingInstruction) return true;
		if (SAFE_FOR_XML && currentNode.nodeType === NODE_TYPE.comment && regExpTest(COMMENT_MARKUP_PROBE, currentNode.data)) return true;
		return false;
	};
	/**
	* Evaluate a CUSTOM_ELEMENT_HANDLING check (a RegExp or a predicate
	* function, per the validation in _parseConfig) against a name.
	* Additional arguments are forwarded to predicate functions - the
	* attributeNameCheck predicate receives the tag name as its second
	* argument. A null/absent check never matches.
	*
	* @param check the configured tagNameCheck / attributeNameCheck value
	* @param name the name to test
	* @param args extra arguments forwarded to a predicate function
	* @return true if the check matches the name
	*/
	const _matchesNameCheck = function _matchesNameCheck(check, name) {
		if (check instanceof RegExp) return regExpTest(check, name);
		if (check instanceof Function) {
			for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) args[_key - 2] = arguments[_key];
			return Boolean(check(name, ...args));
		}
		return false;
	};
	/**
	* Handle a node whose tag is forbidden or not allowlisted: keep
	* allowed custom elements (false return exits _sanitizeElements
	* early - the namespace and fallback-tag removal checks are
	* intentionally skipped for kept custom elements), else hoist
	* content per KEEP_CONTENT and remove.
	*
	* A kept custom element is the ONLY case in which this function
	* returns false, so the caller uses that return value to run the
	* afterSanitizeElements hook on the kept element and keep the
	* element-hook lifecycle consistent with normal allowlisted
	* elements (GHSA-c2j3-45gr-mqc4).
	*
	* @param currentNode the disallowed node
	* @param tagName the node's transformCaseFunc'd tag name
	* @return true if the node was removed, false if kept
	*/
	const _sanitizeDisallowedNode = function _sanitizeDisallowedNode(currentNode, tagName, root) {
		if (!FORBID_TAGS[tagName] && _isBasicCustomElement(tagName) && _matchesNameCheck(CUSTOM_ELEMENT_HANDLING.tagNameCheck, tagName)) return false;
		if (KEEP_CONTENT && !FORBID_CONTENTS[tagName]) {
			const parentNode = getParentNode(currentNode);
			const childNodes = getChildNodes(currentNode);
			if (childNodes && parentNode) {
				const childCount = childNodes.length;
				for (let i = childCount - 1; i >= 0; --i) {
					const hoisted = currentNode === root ? cloneNode(childNodes[i], true) : childNodes[i];
					parentNode.insertBefore(hoisted, getNextSibling(currentNode));
				}
			}
		}
		_forceRemove(currentNode);
		return true;
	};
	/**
	* Fork a hook-mutable allowlist off its shared binding the first time a
	* (possibly lazily-installed) uponSanitize* hook is about to see it, so the
	* hook cannot widen the per-instance default or the setConfig binding by
	* reference and leak past the call. Returns the set unchanged once it is
	* already call-local, so repeated calls across elements are idempotent.
	*
	* @param hookList the uponSanitize* hook array for this event
	* @param set the current ALLOWED_TAGS / ALLOWED_ATTR binding
	* @param defaultSet the per-instance DEFAULT_ALLOWED_* constant
	* @param setConfigSet the captured setConfig() binding, or null
	* @return a call-local clone if a hook is present and set is still shared,
	*   else set unchanged
	*/
	const _forkSharedAllowlist = function _forkSharedAllowlist(hookList, set, defaultSet, setConfigSet) {
		if (hookList.length === 0) return set;
		return set === defaultSet || set === setConfigSet ? clone(set) : set;
	};
	/**
	* Shared guard for a node that a hook has detached from the walk tree,
	* used after each element-hook site in _sanitizeElements. Detaching is a
	* long-standing user pattern (issue #469; draw.io-style foreignObject
	* filtering). Per the cached, unclobberable parentNode getter the node is
	* genuinely out of the tree, so it can reach neither the serialized
	* output nor an IN_PLACE live tree; treat it as removed and stop
	* processing it. Without this guard, the unsafe-node / namespace checks
	* would call _forceRemove on a parentless node and hit the REPORT-3
	* fail-closed throw — which exists for nodes DOMPurify wants gone but
	* *cannot* detach (clobbered / parentless roots), the opposite of a node
	* that is already safely gone. The walk root is exempt: a detached
	* IN_PLACE root is legitimate input and must still be fully sanitized,
	* and a kill-decision on it must keep hitting the REPORT-3 throw.
	*
	* Nodes detached by hooks stay the hook's responsibility for placement:
	* they are not recorded in DOMPurify.removed, so the post-walk IN_PLACE
	* pass (which iterates DOMPurify.removed) does not reach them. But a
	* hook-detached subtree can still hold a queued resource-event handler -
	* e.g. an <img onload> that began loading when the caller built the live
	* tree - which fires in page scope after sanitize returns even though the
	* handler never reached the returned tree. That is the audit-5 F1 hazard,
	* and the documented node.remove() hook pattern walks straight into it.
	* So on the IN_PLACE path we neutralize the detached subtree inline,
	* stripping its non-allow-listed attributes before returning, exactly as
	* the post-walk pass does for _forceRemove'd subtrees.
	*
	* @param currentNode the node a hook may have detached
	* @param root the current walk root
	* @return true if the node is detached and now handled, false otherwise
	*/
	const _handleHookDetachedNode = function _handleHookDetachedNode(currentNode, root) {
		if (currentNode === root || getParentNode(currentNode) !== null) return false;
		if (IN_PLACE) _neutralizeSubtree(currentNode);
		return true;
	};
	/**
	* _sanitizeElements
	*
	* @protect nodeName
	* @protect textContent
	* @protect removeChild
	* @param currentNode to check for permission to exist
	* @return true if node was killed, false if left alive
	*/
	const _sanitizeElements = function _sanitizeElements(currentNode, root) {
		_executeHooks(hooks.beforeSanitizeElements, currentNode, null);
		if (_handleHookDetachedNode(currentNode, root)) return true;
		if (_isClobbered(currentNode)) {
			_forceRemove(currentNode);
			return true;
		}
		const tagName = transformCaseFunc(_readNodeName(currentNode));
		ALLOWED_TAGS = _forkSharedAllowlist(hooks.uponSanitizeElement, ALLOWED_TAGS, DEFAULT_ALLOWED_TAGS, SET_CONFIG_ALLOWED_TAGS);
		_executeHooks(hooks.uponSanitizeElement, currentNode, {
			tagName,
			allowedTags: ALLOWED_TAGS
		});
		if (_handleHookDetachedNode(currentNode, root)) return true;
		if (_isUnsafeNode(currentNode, tagName)) {
			_forceRemove(currentNode);
			return true;
		}
		if (FORBID_TAGS[tagName] || !(EXTRA_ELEMENT_HANDLING.tagCheck instanceof Function && EXTRA_ELEMENT_HANDLING.tagCheck(tagName)) && !ALLOWED_TAGS[tagName]) {
			const removed = _sanitizeDisallowedNode(currentNode, tagName, root);
			if (removed === false) _executeHooks(hooks.afterSanitizeElements, currentNode, null);
			return removed;
		}
		if (_readNodeType(currentNode) === NODE_TYPE.element && !_checkValidNamespace(currentNode)) {
			_forceRemove(currentNode);
			return true;
		}
		if ((tagName === "noscript" || tagName === "noembed" || tagName === "noframes") && regExpTest(FALLBACK_TAG_CLOSE, currentNode.innerHTML)) {
			_forceRemove(currentNode);
			return true;
		}
		if (SAFE_FOR_TEMPLATES && currentNode.nodeType === NODE_TYPE.text) {
			const content = _stripTemplateExpressions(currentNode.textContent);
			if (currentNode.textContent !== content) {
				arrayPush(DOMPurify.removed, { element: currentNode.cloneNode() });
				currentNode.textContent = content;
			}
		}
		_executeHooks(hooks.afterSanitizeElements, currentNode, null);
		return false;
	};
	/**
	* _isValidAttribute
	*
	* @param lcTag Lowercase tag name of containing element.
	* @param lcName Lowercase attribute name.
	* @param value Attribute value.
	* @return Returns true if `value` is valid, otherwise false.
	*/
	const _isValidAttribute = function _isValidAttribute(lcTag, lcName, value) {
		if (FORBID_ATTR[lcName]) return false;
		if (_isPatchLinkageAttribute(lcName, lcTag)) return false;
		if (SANITIZE_DOM && (lcName === "id" || lcName === "name") && (value in document || value in formElement)) return false;
		const nameIsPermitted = ALLOWED_ATTR[lcName] || EXTRA_ELEMENT_HANDLING.attributeCheck instanceof Function && EXTRA_ELEMENT_HANDLING.attributeCheck(lcName, lcTag);
		if (ALLOW_DATA_ATTR && regExpTest(DATA_ATTR$1, lcName)) return true;
		if (ALLOW_ARIA_ATTR && regExpTest(ARIA_ATTR$1, lcName)) return true;
		if (!nameIsPermitted) return _isBasicCustomElement(lcTag) && _matchesNameCheck(CUSTOM_ELEMENT_HANDLING.tagNameCheck, lcTag) && _matchesNameCheck(CUSTOM_ELEMENT_HANDLING.attributeNameCheck, lcName, lcTag) || lcName === "is" && CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements && _matchesNameCheck(CUSTOM_ELEMENT_HANDLING.tagNameCheck, value);
		if (URI_SAFE_ATTRIBUTES[lcName]) return true;
		if (regExpTest(IS_ALLOWED_URI$1, stringReplace(value, ATTR_WHITESPACE$1, ""))) return true;
		if ((lcName === "src" || lcName === "xlink:href" || lcName === "href") && lcTag !== "script" && stringIndexOf(value, "data:") === 0 && DATA_URI_TAGS[lcTag]) return true;
		if (ALLOW_UNKNOWN_PROTOCOLS && !regExpTest(IS_SCRIPT_OR_DATA$1, stringReplace(value, ATTR_WHITESPACE$1, ""))) return true;
		return !value;
	};
	const RESERVED_CUSTOM_ELEMENT_NAMES = addToSet({}, [
		"annotation-xml",
		"color-profile",
		"font-face",
		"font-face-format",
		"font-face-name",
		"font-face-src",
		"font-face-uri",
		"missing-glyph"
	]);
	/**
	* _isBasicCustomElement
	* checks if at least one dash is included in tagName, and it's not the first char
	* for more sophisticated checking see https://github.com/sindresorhus/validate-element-name
	*
	* @param tagName name of the tag of the node to sanitize
	* @returns Returns true if the tag name meets the basic criteria for a custom element, otherwise false.
	*/
	const _isBasicCustomElement = function _isBasicCustomElement(tagName) {
		return !RESERVED_CUSTOM_ELEMENT_NAMES[stringToLowerCase(tagName)] && regExpTest(CUSTOM_ELEMENT$1, tagName);
	};
	/**
	* Wrap an attribute value in the matching Trusted Types object when
	* the active policy requires it. Namespaced attributes pass through
	* unchanged (no TT support yet, see
	* https://bugs.chromium.org/p/chromium/issues/detail?id=1305293).
	*
	* @param lcTag lowercase tag name of the containing element
	* @param lcName lowercase attribute name
	* @param namespaceURI the attribute's namespace, if any
	* @param value the attribute value to wrap
	* @return the value, wrapped when Trusted Types demand it
	*/
	const _applyTrustedTypesToAttribute = function _applyTrustedTypesToAttribute(lcTag, lcName, namespaceURI, value) {
		if (trustedTypesPolicy && typeof trustedTypes === "object" && typeof trustedTypes.getAttributeType === "function" && !namespaceURI) switch (trustedTypes.getAttributeType(lcTag, lcName)) {
			case "TrustedHTML": return _createTrustedHTML(value);
			case "TrustedScriptURL": return _createTrustedScriptURL(value);
		}
		return value;
	};
	/**
	* Write a modified attribute value back onto the element. On
	* success, re-probe for clobbering introduced by the new value and
	* remove the element when found; otherwise pop the removal entry
	* recorded by the earlier _removeAttribute (long-standing pairing
	* with the SANITIZE_NAMED_PROPS path - do not "fix" casually). On
	* failure, remove the attribute instead.
	*
	* @param currentNode the element carrying the attribute
	* @param name the attribute name as present on the element
	* @param namespaceURI the attribute's namespace, if any
	* @param value the new attribute value
	*/
	const _setAttributeValue = function _setAttributeValue(currentNode, name, namespaceURI, value) {
		try {
			if (namespaceURI) currentNode.setAttributeNS(namespaceURI, name, value);
			else currentNode.setAttribute(name, value);
			if (_isClobbered(currentNode)) _forceRemove(currentNode);
			else arrayPop(DOMPurify.removed);
		} catch (_) {
			_removeAttribute(name, currentNode);
		}
	};
	/**
	* _sanitizeAttributes
	*
	* @protect attributes
	* @protect nodeName
	* @protect removeAttribute
	* @protect setAttribute
	*
	* @param currentNode to sanitize
	*/
	const _sanitizeAttributes = function _sanitizeAttributes(currentNode) {
		_executeHooks(hooks.beforeSanitizeAttributes, currentNode, null);
		const attributes = currentNode.attributes;
		if (!attributes || _isClobbered(currentNode)) return;
		ALLOWED_ATTR = _forkSharedAllowlist(hooks.uponSanitizeAttribute, ALLOWED_ATTR, DEFAULT_ALLOWED_ATTR, SET_CONFIG_ALLOWED_ATTR);
		const hookEvent = {
			attrName: "",
			attrValue: "",
			keepAttr: true,
			allowedAttributes: ALLOWED_ATTR,
			forceKeepAttr: void 0
		};
		let l = attributes.length;
		const lcTag = transformCaseFunc(currentNode.nodeName);
		while (l--) {
			const attr = attributes[l];
			const name = attr.name, namespaceURI = attr.namespaceURI, attrValue = attr.value;
			const lcName = transformCaseFunc(name);
			const initValue = attrValue;
			let value = name === "value" ? initValue : stringTrim(initValue);
			hookEvent.attrName = lcName;
			hookEvent.attrValue = value;
			hookEvent.keepAttr = true;
			hookEvent.forceKeepAttr = void 0;
			_executeHooks(hooks.uponSanitizeAttribute, currentNode, hookEvent);
			value = hookEvent.attrValue;
			if (SANITIZE_NAMED_PROPS && (lcName === "id" || lcName === "name") && stringIndexOf(value, SANITIZE_NAMED_PROPS_PREFIX) !== 0) {
				_removeAttribute(name, currentNode, attr);
				value = SANITIZE_NAMED_PROPS_PREFIX + value;
			}
			if (SAFE_FOR_XML && regExpTest(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i, value)) {
				_removeAttribute(name, currentNode, attr);
				continue;
			}
			if (lcName === "attributename" && stringMatch(value, "href")) {
				_removeAttribute(name, currentNode, attr);
				continue;
			}
			if (hookEvent.forceKeepAttr) continue;
			if (!hookEvent.keepAttr) {
				_removeAttribute(name, currentNode, attr);
				continue;
			}
			if (!ALLOW_SELF_CLOSE_IN_ATTR && regExpTest(SELF_CLOSING_TAG, value)) {
				_removeAttribute(name, currentNode, attr);
				continue;
			}
			if (SAFE_FOR_TEMPLATES) value = _stripTemplateExpressions(value);
			if (!_isValidAttribute(lcTag, lcName, value)) {
				_removeAttribute(name, currentNode, attr);
				continue;
			}
			value = _applyTrustedTypesToAttribute(lcTag, lcName, namespaceURI, value);
			if (value !== initValue) _setAttributeValue(currentNode, name, namespaceURI, value);
		}
		_executeHooks(hooks.afterSanitizeAttributes, currentNode, null);
	};
	/**
	* _sanitizeShadowDOM
	*
	* @param fragment to iterate over recursively
	*/
	const _sanitizeShadowDOM2 = function _sanitizeShadowDOM(fragment) {
		let shadowNode = null;
		const shadowIterator = _createNodeIterator(fragment);
		_executeHooks(hooks.beforeSanitizeShadowDOM, fragment, null);
		while (shadowNode = shadowIterator.nextNode()) {
			_executeHooks(hooks.uponSanitizeShadowNode, shadowNode, null);
			_sanitizeElements(shadowNode, fragment);
			_sanitizeAttributes(shadowNode);
			if (_isDocumentFragment(shadowNode.content)) _sanitizeShadowDOM2(shadowNode.content);
			if (_readNodeType(shadowNode) === NODE_TYPE.element) {
				const innerSr = getShadowRoot(shadowNode);
				if (_isDocumentFragment(innerSr)) {
					_sanitizeAttachedShadowRoots(innerSr);
					_sanitizeShadowDOM2(innerSr);
				}
			}
		}
		_executeHooks(hooks.afterSanitizeShadowDOM, fragment, null);
	};
	/**
	* _sanitizeAttachedShadowRoots
	*
	* Walks `root` and feeds every attached shadow root we encounter into
	* the existing _sanitizeShadowDOM pipeline. The default node iterator
	* does not descend into shadow trees, so nodes inside an attached
	* shadow root would otherwise be skipped entirely.
	*
	* Two real input paths put attached shadow roots in front of us:
	*   1. IN_PLACE on a DOM node that already has shadow roots attached.
	*   2. DOM-node input where importNode(dirty, true) deep-clones the
	*      shadow root because it was created with `clonable: true`.
	*
	* This pass runs once, up front, so the main iteration loop (and the
	* existing _sanitizeShadowDOM template-content recursion) stay
	* untouched — string-input paths are not affected.
	*
	* @param root the subtree root to walk for attached shadow roots
	*/
	const _sanitizeAttachedShadowRoots = function _sanitizeAttachedShadowRoots(root) {
		const stack = [{
			node: root,
			shadow: null
		}];
		while (stack.length > 0) {
			const item = stack.pop();
			if (item.shadow) {
				_sanitizeShadowDOM2(item.shadow);
				continue;
			}
			const node = item.node;
			const isElement = _readNodeType(node) === NODE_TYPE.element;
			const childNodes = getChildNodes(node);
			if (childNodes) for (let i = childNodes.length - 1; i >= 0; --i) stack.push({
				node: childNodes[i],
				shadow: null
			});
			if (isElement) {
				const rootName = getNodeName ? getNodeName(node) : null;
				if (typeof rootName === "string" && transformCaseFunc(rootName) === "template") {
					const content = node.content;
					if (_isDocumentFragment(content)) stack.push({
						node: content,
						shadow: null
					});
				}
			}
			if (isElement) {
				const sr = getShadowRoot(node);
				if (_isDocumentFragment(sr)) stack.push({
					node: null,
					shadow: sr
				}, {
					node: sr,
					shadow: null
				});
			}
		}
	};
	DOMPurify.sanitize = function(dirty) {
		let cfg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
		let body = null;
		let importedNode = null;
		let currentNode = null;
		let returnNode = null;
		IS_EMPTY_INPUT = !dirty;
		if (IS_EMPTY_INPUT) dirty = "<!-->";
		if (typeof dirty !== "string" && !_isNode(dirty)) {
			dirty = stringifyValue(dirty);
			if (typeof dirty !== "string") throw typeErrorCreate("dirty is not a string, aborting");
		}
		if (!DOMPurify.isSupported) return dirty;
		if (SET_CONFIG) {
			ALLOWED_TAGS = SET_CONFIG_ALLOWED_TAGS;
			ALLOWED_ATTR = SET_CONFIG_ALLOWED_ATTR;
		} else _parseConfig(cfg);
		if (hooks.uponSanitizeElement.length > 0 || hooks.uponSanitizeAttribute.length > 0) ALLOWED_TAGS = clone(ALLOWED_TAGS);
		if (hooks.uponSanitizeAttribute.length > 0) ALLOWED_ATTR = clone(ALLOWED_ATTR);
		DOMPurify.removed = [];
		const inPlace = IN_PLACE && typeof dirty !== "string" && _isNode(dirty);
		if (inPlace) {
			_neutralizePatchLinkage(dirty);
			const nn = _readNodeName(dirty);
			if (typeof nn === "string") {
				const tagName = transformCaseFunc(nn);
				if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
					_neutralizeRoot(dirty);
					throw typeErrorCreate("root node is forbidden and cannot be sanitized in-place");
				}
			}
			if (_isClobbered(dirty)) {
				_neutralizeRoot(dirty);
				throw typeErrorCreate("root node is clobbered and cannot be sanitized in-place");
			}
			try {
				_sanitizeAttachedShadowRoots(dirty);
			} catch (error) {
				_neutralizeRoot(dirty);
				throw error;
			}
		} else if (_isNode(dirty)) {
			body = _initDocument("<!---->");
			importedNode = body.ownerDocument.importNode(dirty, true);
			if (importedNode.nodeType === NODE_TYPE.element && importedNode.nodeName === "BODY") body = importedNode;
			else if (importedNode.nodeName === "HTML") body = importedNode;
			else body.appendChild(importedNode);
			_sanitizeAttachedShadowRoots(importedNode);
		} else {
			if (!RETURN_DOM && !SAFE_FOR_TEMPLATES && !WHOLE_DOCUMENT && dirty.indexOf("<") === -1) return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? _createTrustedHTML(dirty) : dirty;
			body = _initDocument(dirty);
			if (!body) return RETURN_DOM ? null : RETURN_TRUSTED_TYPE ? emptyHTML : "";
		}
		if (body && FORCE_BODY) _forceRemove(body.firstChild);
		const walkRoot = inPlace ? dirty : body;
		try {
			const nodeIterator = _createNodeIterator(walkRoot);
			while (currentNode = nodeIterator.nextNode()) {
				_sanitizeElements(currentNode, walkRoot);
				_sanitizeAttributes(currentNode);
				if (_isDocumentFragment(currentNode.content)) _sanitizeShadowDOM2(currentNode.content);
			}
		} catch (error) {
			if (inPlace) {
				_neutralizeRoot(dirty);
				arrayForEach(DOMPurify.removed, (entry) => {
					if (entry.element) _neutralizeSubtree(entry.element);
				});
			}
			throw error;
		}
		if (inPlace) {
			arrayForEach(DOMPurify.removed, (entry) => {
				if (entry.element) _neutralizeSubtree(entry.element);
			});
			if (SAFE_FOR_TEMPLATES) _scrubTemplateExpressions2(dirty);
			return dirty;
		}
		if (RETURN_DOM) {
			if (SAFE_FOR_TEMPLATES) _scrubTemplateExpressions2(body);
			if (RETURN_DOM_FRAGMENT) {
				returnNode = createDocumentFragment.call(body.ownerDocument);
				while (body.firstChild) returnNode.appendChild(body.firstChild);
			} else returnNode = body;
			if (ALLOWED_ATTR.shadowroot || ALLOWED_ATTR.shadowrootmode) returnNode = importNode.call(originalDocument, returnNode, true);
			return returnNode;
		}
		let serializedHTML = WHOLE_DOCUMENT ? body.outerHTML : body.innerHTML;
		if (WHOLE_DOCUMENT && ALLOWED_TAGS["!doctype"] && body.ownerDocument && body.ownerDocument.doctype && body.ownerDocument.doctype.name && regExpTest(DOCTYPE_NAME, body.ownerDocument.doctype.name)) serializedHTML = "<!DOCTYPE " + body.ownerDocument.doctype.name + ">\n" + serializedHTML;
		if (SAFE_FOR_TEMPLATES) serializedHTML = _stripTemplateExpressions(serializedHTML);
		return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? _createTrustedHTML(serializedHTML) : serializedHTML;
	};
	DOMPurify.setConfig = function() {
		let cfg = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
		_parseConfig(cfg);
		SET_CONFIG = true;
		SET_CONFIG_ALLOWED_TAGS = ALLOWED_TAGS;
		SET_CONFIG_ALLOWED_ATTR = ALLOWED_ATTR;
	};
	DOMPurify.clearConfig = function() {
		CONFIG = null;
		SET_CONFIG = false;
		SET_CONFIG_ALLOWED_TAGS = null;
		SET_CONFIG_ALLOWED_ATTR = null;
		trustedTypesPolicy = defaultTrustedTypesPolicy;
		emptyHTML = "";
	};
	DOMPurify.isValidAttribute = function(tag, attr, value) {
		if (!CONFIG) _parseConfig({});
		const lcTag = transformCaseFunc(tag);
		const lcName = transformCaseFunc(attr);
		return _isValidAttribute(lcTag, lcName, value);
	};
	DOMPurify.addHook = function(entryPoint, hookFunction) {
		if (typeof hookFunction !== "function") return;
		if (!objectHasOwnProperty(hooks, entryPoint)) return;
		arrayPush(hooks[entryPoint], hookFunction);
	};
	DOMPurify.removeHook = function(entryPoint, hookFunction) {
		if (!objectHasOwnProperty(hooks, entryPoint)) return;
		if (hookFunction !== void 0) {
			const index = arrayLastIndexOf(hooks[entryPoint], hookFunction);
			return index === -1 ? void 0 : arraySplice(hooks[entryPoint], index, 1)[0];
		}
		return arrayPop(hooks[entryPoint]);
	};
	DOMPurify.removeHooks = function(entryPoint) {
		if (!objectHasOwnProperty(hooks, entryPoint)) return;
		hooks[entryPoint] = [];
	};
	DOMPurify.removeAllHooks = function() {
		hooks = _createHooksMap();
	};
	return DOMPurify;
}
createDOMPurify();
const decodeCache = {};
function getDecodeCache(exclude) {
	let cache = decodeCache[exclude];
	if (cache) return cache;
	cache = decodeCache[exclude] = [];
	for (let i = 0; i < 128; i++) {
		const ch = String.fromCharCode(i);
		cache.push(ch);
	}
	for (let i = 0; i < exclude.length; i++) {
		const ch = exclude.charCodeAt(i);
		cache[ch] = "%" + ("0" + ch.toString(16).toUpperCase()).slice(-2);
	}
	return cache;
}
function decode$1(string, exclude) {
	if (typeof exclude !== "string") exclude = decode$1.defaultChars;
	const cache = getDecodeCache(exclude);
	return string.replace(/(%[a-f0-9]{2})+/gi, function(seq) {
		let result = "";
		for (let i = 0, l = seq.length; i < l; i += 3) {
			const b1 = parseInt(seq.slice(i + 1, i + 3), 16);
			if (b1 < 128) {
				result += cache[b1];
				continue;
			}
			if ((b1 & 224) === 192 && i + 3 < l) {
				const b2 = parseInt(seq.slice(i + 4, i + 6), 16);
				if ((b2 & 192) === 128) {
					const chr = b1 << 6 & 1984 | b2 & 63;
					if (chr < 128) result += "��";
					else result += String.fromCharCode(chr);
					i += 3;
					continue;
				}
			}
			if ((b1 & 240) === 224 && i + 6 < l) {
				const b2 = parseInt(seq.slice(i + 4, i + 6), 16);
				const b3 = parseInt(seq.slice(i + 7, i + 9), 16);
				if ((b2 & 192) === 128 && (b3 & 192) === 128) {
					const chr = b1 << 12 & 61440 | b2 << 6 & 4032 | b3 & 63;
					if (chr < 2048 || chr >= 55296 && chr <= 57343) result += "���";
					else result += String.fromCharCode(chr);
					i += 6;
					continue;
				}
			}
			if ((b1 & 248) === 240 && i + 9 < l) {
				const b2 = parseInt(seq.slice(i + 4, i + 6), 16);
				const b3 = parseInt(seq.slice(i + 7, i + 9), 16);
				const b4 = parseInt(seq.slice(i + 10, i + 12), 16);
				if ((b2 & 192) === 128 && (b3 & 192) === 128 && (b4 & 192) === 128) {
					let chr = b1 << 18 & 1835008 | b2 << 12 & 258048 | b3 << 6 & 4032 | b4 & 63;
					if (chr < 65536 || chr > 1114111) result += "����";
					else {
						chr -= 65536;
						result += String.fromCharCode(55296 + (chr >> 10), 56320 + (chr & 1023));
					}
					i += 9;
					continue;
				}
			}
			result += "�";
		}
		return result;
	});
}
decode$1.defaultChars = ";/?:@&=+$,#";
decode$1.componentChars = "";
const encodeCache = {};
function getEncodeCache(exclude) {
	let cache = encodeCache[exclude];
	if (cache) return cache;
	cache = encodeCache[exclude] = [];
	for (let i = 0; i < 128; i++) {
		const ch = String.fromCharCode(i);
		if (/^[0-9a-z]$/i.test(ch)) cache.push(ch);
		else cache.push("%" + ("0" + i.toString(16).toUpperCase()).slice(-2));
	}
	for (let i = 0; i < exclude.length; i++) cache[exclude.charCodeAt(i)] = exclude[i];
	return cache;
}
function encode$1(string, exclude, keepEscaped) {
	if (typeof exclude !== "string") {
		keepEscaped = exclude;
		exclude = encode$1.defaultChars;
	}
	if (typeof keepEscaped === "undefined") keepEscaped = true;
	const cache = getEncodeCache(exclude);
	let result = "";
	for (let i = 0, l = string.length; i < l; i++) {
		const code = string.charCodeAt(i);
		if (keepEscaped && code === 37 && i + 2 < l) {
			if (/^[0-9a-f]{2}$/i.test(string.slice(i + 1, i + 3))) {
				result += string.slice(i, i + 3);
				i += 2;
				continue;
			}
		}
		if (code < 128) {
			result += cache[code];
			continue;
		}
		if (code >= 55296 && code <= 57343) {
			if (code >= 55296 && code <= 56319 && i + 1 < l) {
				const nextCode = string.charCodeAt(i + 1);
				if (nextCode >= 56320 && nextCode <= 57343) {
					result += encodeURIComponent(string[i] + string[i + 1]);
					i++;
					continue;
				}
			}
			result += "%EF%BF%BD";
			continue;
		}
		result += encodeURIComponent(string[i]);
	}
	return result;
}
encode$1.defaultChars = ";/?:@&=+$,-_.!~*'()#";
encode$1.componentChars = "-_.!~*'()";
function format(url) {
	let result = "";
	result += url.protocol || "";
	result += url.slashes ? "//" : "";
	result += url.auth ? url.auth + "@" : "";
	if (url.hostname && url.hostname.indexOf(":") !== -1) result += "[" + url.hostname + "]";
	else result += url.hostname || "";
	result += url.port ? ":" + url.port : "";
	result += url.pathname || "";
	result += url.search || "";
	result += url.hash || "";
	return result;
}
function Url() {
	this.protocol = null;
	this.slashes = null;
	this.auth = null;
	this.port = null;
	this.hostname = null;
	this.hash = null;
	this.search = null;
	this.pathname = null;
}
const protocolPattern = /^([a-z0-9.+-]+:)/i;
const portPattern = /:[0-9]*$/;
const simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/;
const unwise = [
	"{",
	"}",
	"|",
	"\\",
	"^",
	"`"
].concat([
	"<",
	">",
	"\"",
	"`",
	" ",
	"\r",
	"\n",
	"	"
]);
const autoEscape = ["'"].concat(unwise);
const nonHostChars = [
	"%",
	"/",
	"?",
	";",
	"#"
].concat(autoEscape);
const hostEndingChars = [
	"/",
	"?",
	"#"
];
const hostnameMaxLen = 255;
const hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/;
const hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/;
const hostlessProtocol = {
	javascript: true,
	"javascript:": true
};
const slashedProtocol = {
	http: true,
	https: true,
	ftp: true,
	gopher: true,
	file: true,
	"http:": true,
	"https:": true,
	"ftp:": true,
	"gopher:": true,
	"file:": true
};
function urlParse(url, slashesDenoteHost) {
	if (url && url instanceof Url) return url;
	const u = new Url();
	u.parse(url, slashesDenoteHost);
	return u;
}
Url.prototype.parse = function(url, slashesDenoteHost) {
	let lowerProto, hec, slashes;
	let rest = url;
	rest = rest.trim();
	if (!slashesDenoteHost && url.split("#").length === 1) {
		const simplePath = simplePathPattern.exec(rest);
		if (simplePath) {
			this.pathname = simplePath[1];
			if (simplePath[2]) this.search = simplePath[2];
			return this;
		}
	}
	let proto = protocolPattern.exec(rest);
	if (proto) {
		proto = proto[0];
		lowerProto = proto.toLowerCase();
		this.protocol = proto;
		rest = rest.substr(proto.length);
	}
	if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
		slashes = rest.substr(0, 2) === "//";
		if (slashes && !(proto && hostlessProtocol[proto])) {
			rest = rest.substr(2);
			this.slashes = true;
		}
	}
	if (!hostlessProtocol[proto] && (slashes || proto && !slashedProtocol[proto])) {
		let hostEnd = -1;
		for (let i = 0; i < hostEndingChars.length; i++) {
			hec = rest.indexOf(hostEndingChars[i]);
			if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) hostEnd = hec;
		}
		let auth, atSign;
		if (hostEnd === -1) atSign = rest.lastIndexOf("@");
		else atSign = rest.lastIndexOf("@", hostEnd);
		if (atSign !== -1) {
			auth = rest.slice(0, atSign);
			rest = rest.slice(atSign + 1);
			this.auth = auth;
		}
		hostEnd = -1;
		for (let i = 0; i < nonHostChars.length; i++) {
			hec = rest.indexOf(nonHostChars[i]);
			if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) hostEnd = hec;
		}
		if (hostEnd === -1) hostEnd = rest.length;
		if (rest[hostEnd - 1] === ":") hostEnd--;
		const host = rest.slice(0, hostEnd);
		rest = rest.slice(hostEnd);
		this.parseHost(host);
		this.hostname = this.hostname || "";
		const ipv6Hostname = this.hostname[0] === "[" && this.hostname[this.hostname.length - 1] === "]";
		if (!ipv6Hostname) {
			const hostparts = this.hostname.split(/\./);
			for (let i = 0, l = hostparts.length; i < l; i++) {
				const part = hostparts[i];
				if (!part) continue;
				if (!part.match(hostnamePartPattern)) {
					let newpart = "";
					for (let j = 0, k = part.length; j < k; j++) if (part.charCodeAt(j) > 127) newpart += "x";
					else newpart += part[j];
					if (!newpart.match(hostnamePartPattern)) {
						const validParts = hostparts.slice(0, i);
						const notHost = hostparts.slice(i + 1);
						const bit = part.match(hostnamePartStart);
						if (bit) {
							validParts.push(bit[1]);
							notHost.unshift(bit[2]);
						}
						if (notHost.length) rest = notHost.join(".") + rest;
						this.hostname = validParts.join(".");
						break;
					}
				}
			}
		}
		if (this.hostname.length > hostnameMaxLen) this.hostname = "";
		if (ipv6Hostname) this.hostname = this.hostname.substr(1, this.hostname.length - 2);
	}
	const hash = rest.indexOf("#");
	if (hash !== -1) {
		this.hash = rest.substr(hash);
		rest = rest.slice(0, hash);
	}
	const qm = rest.indexOf("?");
	if (qm !== -1) {
		this.search = rest.substr(qm);
		rest = rest.slice(0, qm);
	}
	if (rest) this.pathname = rest;
	if (slashedProtocol[lowerProto] && this.hostname && !this.pathname) this.pathname = "";
	return this;
};
Url.prototype.parseHost = function(host) {
	let port = portPattern.exec(host);
	if (port) {
		port = port[0];
		if (port !== ":") this.port = port.substr(1);
		host = host.substr(0, host.length - port.length);
	}
	if (host) this.hostname = host;
};
var mdurl_exports = /* @__PURE__ */ __exportAll({
	decode: () => decode$1,
	encode: () => encode$1,
	format: () => format,
	parse: () => urlParse
});
var regex_default$5 = /[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
var regex_default$4 = /[\0-\x1F\x7F-\x9F]/;
var regex_default$3 = /[\xAD\u0600-\u0605\u061C\u06DD\u070F\u0890\u0891\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD80D[\uDC30-\uDC3F]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/;
var regex_default$2 = /[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061D-\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1B7D\u1B7E\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52-\u2E5D\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDEAD\uDF55-\uDF59\uDF86-\uDF89]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5A\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDEB9\uDF3C-\uDF3E]|\uD806[\uDC3B\uDD44-\uDD46\uDDE2\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2\uDF00-\uDF09]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8\uDF43-\uDF4F\uDFFF]|\uD809[\uDC70-\uDC74]|\uD80B[\uDFF1\uDFF2]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A\uDFE2]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/;
var regex_default$1 = /[\$\+<->\^`\|~\xA2-\xA6\xA8\xA9\xAC\xAE-\xB1\xB4\xB8\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u03F6\u0482\u058D-\u058F\u0606-\u0608\u060B\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u07FE\u07FF\u0888\u09F2\u09F3\u09FA\u09FB\u0AF1\u0B70\u0BF3-\u0BFA\u0C7F\u0D4F\u0D79\u0E3F\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u166D\u17DB\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2044\u2052\u207A-\u207C\u208A-\u208C\u20A0-\u20C0\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2307\u230C-\u2328\u232B-\u2426\u2440-\u244A\u249C-\u24E9\u2500-\u2767\u2794-\u27C4\u27C7-\u27E5\u27F0-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2B73\u2B76-\u2B95\u2B97-\u2BFF\u2CE5-\u2CEA\u2E50\u2E51\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFF\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u309B\u309C\u3190\u3191\u3196-\u319F\u31C0-\u31E3\u31EF\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uAA77-\uAA79\uAB5B\uAB6A\uAB6B\uFB29\uFBB2-\uFBC2\uFD40-\uFD4F\uFDCF\uFDFC-\uFDFF\uFE62\uFE64-\uFE66\uFE69\uFF04\uFF0B\uFF1C-\uFF1E\uFF3E\uFF40\uFF5C\uFF5E\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD]|\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9C\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|\uD805\uDF3F|\uD807[\uDFD5-\uDFF1]|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD82F\uDC9C|\uD833[\uDF50-\uDFC3]|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDEA\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD838[\uDD4F\uDEFF]|\uD83B[\uDCAC\uDCB0\uDD2E\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD0D-\uDDAD\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED7\uDEDC-\uDEEC\uDEF0-\uDEFC\uDF00-\uDF76\uDF7B-\uDFD9\uDFE0-\uDFEB\uDFF0]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDCB0\uDCB1\uDD00-\uDE53\uDE60-\uDE6D\uDE70-\uDE7C\uDE80-\uDE88\uDE90-\uDEBD\uDEBF-\uDEC5\uDECE-\uDEDB\uDEE0-\uDEE8\uDEF0-\uDEF8\uDF00-\uDF92\uDF94-\uDFCA]/;
var regex_default = /[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/;
var uc_micro_exports = /* @__PURE__ */ __exportAll({
	Any: () => regex_default$5,
	Cc: () => regex_default$4,
	Cf: () => regex_default$3,
	P: () => regex_default$2,
	S: () => regex_default$1,
	Z: () => regex_default
});
var decode_data_html_default = new Uint16Array("ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻\"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻\xA0ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌".split("").map((c) => c.charCodeAt(0)));
var decode_data_xml_default = new Uint16Array("Ȁaglq	\x1Bɭ\0\0p;䀦os;䀧t;䀾t;䀼uot;䀢".split("").map((c) => c.charCodeAt(0)));
var _a;
const decodeMap = /* @__PURE__ */ new Map([
	[0, 65533],
	[128, 8364],
	[130, 8218],
	[131, 402],
	[132, 8222],
	[133, 8230],
	[134, 8224],
	[135, 8225],
	[136, 710],
	[137, 8240],
	[138, 352],
	[139, 8249],
	[140, 338],
	[142, 381],
	[145, 8216],
	[146, 8217],
	[147, 8220],
	[148, 8221],
	[149, 8226],
	[150, 8211],
	[151, 8212],
	[152, 732],
	[153, 8482],
	[154, 353],
	[155, 8250],
	[156, 339],
	[158, 382],
	[159, 376]
]);
/**
* Polyfill for `String.fromCodePoint`. It is used to create a string from a Unicode code point.
*/
const fromCodePoint$1 = (_a = String.fromCodePoint) !== null && _a !== void 0 ? _a : function(codePoint) {
	let output = "";
	if (codePoint > 65535) {
		codePoint -= 65536;
		output += String.fromCharCode(codePoint >>> 10 & 1023 | 55296);
		codePoint = 56320 | codePoint & 1023;
	}
	output += String.fromCharCode(codePoint);
	return output;
};
/**
* Replace the given code point with a replacement character if it is a
* surrogate or is outside the valid range. Otherwise return the code
* point unchanged.
*/
function replaceCodePoint(codePoint) {
	var _a;
	if (codePoint >= 55296 && codePoint <= 57343 || codePoint > 1114111) return 65533;
	return (_a = decodeMap.get(codePoint)) !== null && _a !== void 0 ? _a : codePoint;
}
var CharCodes;
(function(CharCodes) {
	CharCodes[CharCodes["NUM"] = 35] = "NUM";
	CharCodes[CharCodes["SEMI"] = 59] = "SEMI";
	CharCodes[CharCodes["EQUALS"] = 61] = "EQUALS";
	CharCodes[CharCodes["ZERO"] = 48] = "ZERO";
	CharCodes[CharCodes["NINE"] = 57] = "NINE";
	CharCodes[CharCodes["LOWER_A"] = 97] = "LOWER_A";
	CharCodes[CharCodes["LOWER_F"] = 102] = "LOWER_F";
	CharCodes[CharCodes["LOWER_X"] = 120] = "LOWER_X";
	CharCodes[CharCodes["LOWER_Z"] = 122] = "LOWER_Z";
	CharCodes[CharCodes["UPPER_A"] = 65] = "UPPER_A";
	CharCodes[CharCodes["UPPER_F"] = 70] = "UPPER_F";
	CharCodes[CharCodes["UPPER_Z"] = 90] = "UPPER_Z";
})(CharCodes || (CharCodes = {}));
/** Bit that needs to be set to convert an upper case ASCII character to lower case */
const TO_LOWER_BIT = 32;
var BinTrieFlags;
(function(BinTrieFlags) {
	BinTrieFlags[BinTrieFlags["VALUE_LENGTH"] = 49152] = "VALUE_LENGTH";
	BinTrieFlags[BinTrieFlags["BRANCH_LENGTH"] = 16256] = "BRANCH_LENGTH";
	BinTrieFlags[BinTrieFlags["JUMP_TABLE"] = 127] = "JUMP_TABLE";
})(BinTrieFlags || (BinTrieFlags = {}));
function isNumber(code) {
	return code >= CharCodes.ZERO && code <= CharCodes.NINE;
}
function isHexadecimalCharacter(code) {
	return code >= CharCodes.UPPER_A && code <= CharCodes.UPPER_F || code >= CharCodes.LOWER_A && code <= CharCodes.LOWER_F;
}
function isAsciiAlphaNumeric(code) {
	return code >= CharCodes.UPPER_A && code <= CharCodes.UPPER_Z || code >= CharCodes.LOWER_A && code <= CharCodes.LOWER_Z || isNumber(code);
}
/**
* Checks if the given character is a valid end character for an entity in an attribute.
*
* Attribute values that aren't terminated properly aren't parsed, and shouldn't lead to a parser error.
* See the example in https://html.spec.whatwg.org/multipage/parsing.html#named-character-reference-state
*/
function isEntityInAttributeInvalidEnd(code) {
	return code === CharCodes.EQUALS || isAsciiAlphaNumeric(code);
}
var EntityDecoderState;
(function(EntityDecoderState) {
	EntityDecoderState[EntityDecoderState["EntityStart"] = 0] = "EntityStart";
	EntityDecoderState[EntityDecoderState["NumericStart"] = 1] = "NumericStart";
	EntityDecoderState[EntityDecoderState["NumericDecimal"] = 2] = "NumericDecimal";
	EntityDecoderState[EntityDecoderState["NumericHex"] = 3] = "NumericHex";
	EntityDecoderState[EntityDecoderState["NamedEntity"] = 4] = "NamedEntity";
})(EntityDecoderState || (EntityDecoderState = {}));
var DecodingMode;
(function(DecodingMode) {
	/** Entities in text nodes that can end with any character. */
	DecodingMode[DecodingMode["Legacy"] = 0] = "Legacy";
	/** Only allow entities terminated with a semicolon. */
	DecodingMode[DecodingMode["Strict"] = 1] = "Strict";
	/** Entities in attributes have limitations on ending characters. */
	DecodingMode[DecodingMode["Attribute"] = 2] = "Attribute";
})(DecodingMode || (DecodingMode = {}));
/**
* Token decoder with support of writing partial entities.
*/
var EntityDecoder = class {
	constructor(decodeTree, emitCodePoint, errors) {
		this.decodeTree = decodeTree;
		this.emitCodePoint = emitCodePoint;
		this.errors = errors;
		/** The current state of the decoder. */
		this.state = EntityDecoderState.EntityStart;
		/** Characters that were consumed while parsing an entity. */
		this.consumed = 1;
		/**
		* The result of the entity.
		*
		* Either the result index of a numeric entity, or the codepoint of a
		* numeric entity.
		*/
		this.result = 0;
		/** The current index in the decode tree. */
		this.treeIndex = 0;
		/** The number of characters that were consumed in excess. */
		this.excess = 1;
		/** The mode in which the decoder is operating. */
		this.decodeMode = DecodingMode.Strict;
	}
	/** Resets the instance to make it reusable. */
	startEntity(decodeMode) {
		this.decodeMode = decodeMode;
		this.state = EntityDecoderState.EntityStart;
		this.result = 0;
		this.treeIndex = 0;
		this.excess = 1;
		this.consumed = 1;
	}
	/**
	* Write an entity to the decoder. This can be called multiple times with partial entities.
	* If the entity is incomplete, the decoder will return -1.
	*
	* Mirrors the implementation of `getDecoder`, but with the ability to stop decoding if the
	* entity is incomplete, and resume when the next string is written.
	*
	* @param string The string containing the entity (or a continuation of the entity).
	* @param offset The offset at which the entity begins. Should be 0 if this is not the first call.
	* @returns The number of characters that were consumed, or -1 if the entity is incomplete.
	*/
	write(str, offset) {
		switch (this.state) {
			case EntityDecoderState.EntityStart:
				if (str.charCodeAt(offset) === CharCodes.NUM) {
					this.state = EntityDecoderState.NumericStart;
					this.consumed += 1;
					return this.stateNumericStart(str, offset + 1);
				}
				this.state = EntityDecoderState.NamedEntity;
				return this.stateNamedEntity(str, offset);
			case EntityDecoderState.NumericStart: return this.stateNumericStart(str, offset);
			case EntityDecoderState.NumericDecimal: return this.stateNumericDecimal(str, offset);
			case EntityDecoderState.NumericHex: return this.stateNumericHex(str, offset);
			case EntityDecoderState.NamedEntity: return this.stateNamedEntity(str, offset);
		}
	}
	/**
	* Switches between the numeric decimal and hexadecimal states.
	*
	* Equivalent to the `Numeric character reference state` in the HTML spec.
	*
	* @param str The string containing the entity (or a continuation of the entity).
	* @param offset The current offset.
	* @returns The number of characters that were consumed, or -1 if the entity is incomplete.
	*/
	stateNumericStart(str, offset) {
		if (offset >= str.length) return -1;
		if ((str.charCodeAt(offset) | TO_LOWER_BIT) === CharCodes.LOWER_X) {
			this.state = EntityDecoderState.NumericHex;
			this.consumed += 1;
			return this.stateNumericHex(str, offset + 1);
		}
		this.state = EntityDecoderState.NumericDecimal;
		return this.stateNumericDecimal(str, offset);
	}
	addToNumericResult(str, start, end, base) {
		if (start !== end) {
			const digitCount = end - start;
			this.result = this.result * Math.pow(base, digitCount) + parseInt(str.substr(start, digitCount), base);
			this.consumed += digitCount;
		}
	}
	/**
	* Parses a hexadecimal numeric entity.
	*
	* Equivalent to the `Hexademical character reference state` in the HTML spec.
	*
	* @param str The string containing the entity (or a continuation of the entity).
	* @param offset The current offset.
	* @returns The number of characters that were consumed, or -1 if the entity is incomplete.
	*/
	stateNumericHex(str, offset) {
		const startIdx = offset;
		while (offset < str.length) {
			const char = str.charCodeAt(offset);
			if (isNumber(char) || isHexadecimalCharacter(char)) offset += 1;
			else {
				this.addToNumericResult(str, startIdx, offset, 16);
				return this.emitNumericEntity(char, 3);
			}
		}
		this.addToNumericResult(str, startIdx, offset, 16);
		return -1;
	}
	/**
	* Parses a decimal numeric entity.
	*
	* Equivalent to the `Decimal character reference state` in the HTML spec.
	*
	* @param str The string containing the entity (or a continuation of the entity).
	* @param offset The current offset.
	* @returns The number of characters that were consumed, or -1 if the entity is incomplete.
	*/
	stateNumericDecimal(str, offset) {
		const startIdx = offset;
		while (offset < str.length) {
			const char = str.charCodeAt(offset);
			if (isNumber(char)) offset += 1;
			else {
				this.addToNumericResult(str, startIdx, offset, 10);
				return this.emitNumericEntity(char, 2);
			}
		}
		this.addToNumericResult(str, startIdx, offset, 10);
		return -1;
	}
	/**
	* Validate and emit a numeric entity.
	*
	* Implements the logic from the `Hexademical character reference start
	* state` and `Numeric character reference end state` in the HTML spec.
	*
	* @param lastCp The last code point of the entity. Used to see if the
	*               entity was terminated with a semicolon.
	* @param expectedLength The minimum number of characters that should be
	*                       consumed. Used to validate that at least one digit
	*                       was consumed.
	* @returns The number of characters that were consumed.
	*/
	emitNumericEntity(lastCp, expectedLength) {
		var _a;
		if (this.consumed <= expectedLength) {
			(_a = this.errors) === null || _a === void 0 || _a.absenceOfDigitsInNumericCharacterReference(this.consumed);
			return 0;
		}
		if (lastCp === CharCodes.SEMI) this.consumed += 1;
		else if (this.decodeMode === DecodingMode.Strict) return 0;
		this.emitCodePoint(replaceCodePoint(this.result), this.consumed);
		if (this.errors) {
			if (lastCp !== CharCodes.SEMI) this.errors.missingSemicolonAfterCharacterReference();
			this.errors.validateNumericCharacterReference(this.result);
		}
		return this.consumed;
	}
	/**
	* Parses a named entity.
	*
	* Equivalent to the `Named character reference state` in the HTML spec.
	*
	* @param str The string containing the entity (or a continuation of the entity).
	* @param offset The current offset.
	* @returns The number of characters that were consumed, or -1 if the entity is incomplete.
	*/
	stateNamedEntity(str, offset) {
		const { decodeTree } = this;
		let current = decodeTree[this.treeIndex];
		let valueLength = (current & BinTrieFlags.VALUE_LENGTH) >> 14;
		for (; offset < str.length; offset++, this.excess++) {
			const char = str.charCodeAt(offset);
			this.treeIndex = determineBranch(decodeTree, current, this.treeIndex + Math.max(1, valueLength), char);
			if (this.treeIndex < 0) return this.result === 0 || this.decodeMode === DecodingMode.Attribute && (valueLength === 0 || isEntityInAttributeInvalidEnd(char)) ? 0 : this.emitNotTerminatedNamedEntity();
			current = decodeTree[this.treeIndex];
			valueLength = (current & BinTrieFlags.VALUE_LENGTH) >> 14;
			if (valueLength !== 0) {
				if (char === CharCodes.SEMI) return this.emitNamedEntityData(this.treeIndex, valueLength, this.consumed + this.excess);
				if (this.decodeMode !== DecodingMode.Strict) {
					this.result = this.treeIndex;
					this.consumed += this.excess;
					this.excess = 0;
				}
			}
		}
		return -1;
	}
	/**
	* Emit a named entity that was not terminated with a semicolon.
	*
	* @returns The number of characters consumed.
	*/
	emitNotTerminatedNamedEntity() {
		var _a;
		const { result, decodeTree } = this;
		const valueLength = (decodeTree[result] & BinTrieFlags.VALUE_LENGTH) >> 14;
		this.emitNamedEntityData(result, valueLength, this.consumed);
		(_a = this.errors) === null || _a === void 0 || _a.missingSemicolonAfterCharacterReference();
		return this.consumed;
	}
	/**
	* Emit a named entity.
	*
	* @param result The index of the entity in the decode tree.
	* @param valueLength The number of bytes in the entity.
	* @param consumed The number of characters consumed.
	*
	* @returns The number of characters consumed.
	*/
	emitNamedEntityData(result, valueLength, consumed) {
		const { decodeTree } = this;
		this.emitCodePoint(valueLength === 1 ? decodeTree[result] & ~BinTrieFlags.VALUE_LENGTH : decodeTree[result + 1], consumed);
		if (valueLength === 3) this.emitCodePoint(decodeTree[result + 2], consumed);
		return consumed;
	}
	/**
	* Signal to the parser that the end of the input was reached.
	*
	* Remaining data will be emitted and relevant errors will be produced.
	*
	* @returns The number of characters consumed.
	*/
	end() {
		var _a;
		switch (this.state) {
			case EntityDecoderState.NamedEntity: return this.result !== 0 && (this.decodeMode !== DecodingMode.Attribute || this.result === this.treeIndex) ? this.emitNotTerminatedNamedEntity() : 0;
			case EntityDecoderState.NumericDecimal: return this.emitNumericEntity(0, 2);
			case EntityDecoderState.NumericHex: return this.emitNumericEntity(0, 3);
			case EntityDecoderState.NumericStart:
				(_a = this.errors) === null || _a === void 0 || _a.absenceOfDigitsInNumericCharacterReference(this.consumed);
				return 0;
			case EntityDecoderState.EntityStart: return 0;
		}
	}
};
/**
* Creates a function that decodes entities in a string.
*
* @param decodeTree The decode tree.
* @returns A function that decodes entities in a string.
*/
function getDecoder(decodeTree) {
	let ret = "";
	const decoder = new EntityDecoder(decodeTree, (str) => ret += fromCodePoint$1(str));
	return function decodeWithTrie(str, decodeMode) {
		let lastIndex = 0;
		let offset = 0;
		while ((offset = str.indexOf("&", offset)) >= 0) {
			ret += str.slice(lastIndex, offset);
			decoder.startEntity(decodeMode);
			const len = decoder.write(str, offset + 1);
			if (len < 0) {
				lastIndex = offset + decoder.end();
				break;
			}
			lastIndex = offset + len;
			offset = len === 0 ? lastIndex + 1 : lastIndex;
		}
		const result = ret + str.slice(lastIndex);
		ret = "";
		return result;
	};
}
/**
* Determines the branch of the current node that is taken given the current
* character. This function is used to traverse the trie.
*
* @param decodeTree The trie.
* @param current The current node.
* @param nodeIdx The index right after the current node and its value.
* @param char The current character.
* @returns The index of the next node, or -1 if no branch is taken.
*/
function determineBranch(decodeTree, current, nodeIdx, char) {
	const branchCount = (current & BinTrieFlags.BRANCH_LENGTH) >> 7;
	const jumpOffset = current & BinTrieFlags.JUMP_TABLE;
	if (branchCount === 0) return jumpOffset !== 0 && char === jumpOffset ? nodeIdx : -1;
	if (jumpOffset) {
		const value = char - jumpOffset;
		return value < 0 || value >= branchCount ? -1 : decodeTree[nodeIdx + value] - 1;
	}
	let lo = nodeIdx;
	let hi = lo + branchCount - 1;
	while (lo <= hi) {
		const mid = lo + hi >>> 1;
		const midVal = decodeTree[mid];
		if (midVal < char) lo = mid + 1;
		else if (midVal > char) hi = mid - 1;
		else return decodeTree[mid + branchCount];
	}
	return -1;
}
const htmlDecoder = getDecoder(decode_data_html_default);
getDecoder(decode_data_xml_default);
/**
* Decodes an HTML string.
*
* @param str The string to decode.
* @param mode The decoding mode.
* @returns The decoded string.
*/
function decodeHTML(str, mode = DecodingMode.Legacy) {
	return htmlDecoder(str, mode);
}
/**
* Decodes an HTML string, requiring all entities to be terminated by a semicolon.
*
* @param str The string to decode.
* @returns The decoded string.
*/
function decodeHTMLStrict(str) {
	return htmlDecoder(str, DecodingMode.Strict);
}
var utils_exports = /* @__PURE__ */ __exportAll({
	arrayReplaceAt: () => arrayReplaceAt,
	asciiTrim: () => asciiTrim,
	assign: () => assign$1,
	escapeHtml: () => escapeHtml,
	escapeRE: () => escapeRE$1,
	fromCodePoint: () => fromCodePoint,
	has: () => has,
	isMdAsciiPunct: () => isMdAsciiPunct,
	isPunctChar: () => isPunctChar,
	isPunctCharCode: () => isPunctCharCode,
	isSpace: () => isSpace,
	isString: () => isString$1,
	isValidEntityCode: () => isValidEntityCode,
	isWhiteSpace: () => isWhiteSpace,
	lib: () => lib,
	normalizeReference: () => normalizeReference,
	unescapeAll: () => unescapeAll,
	unescapeMd: () => unescapeMd
});
function _class$1(obj) {
	return Object.prototype.toString.call(obj);
}
function isString$1(obj) {
	return _class$1(obj) === "[object String]";
}
const _hasOwnProperty = Object.prototype.hasOwnProperty;
function has(object, key) {
	return _hasOwnProperty.call(object, key);
}
function assign$1(obj) {
	Array.prototype.slice.call(arguments, 1).forEach(function(source) {
		if (!source) return;
		if (typeof source !== "object") throw new TypeError(source + "must be object");
		Object.keys(source).forEach(function(key) {
			obj[key] = source[key];
		});
	});
	return obj;
}
function arrayReplaceAt(src, pos, newElements) {
	return [].concat(src.slice(0, pos), newElements, src.slice(pos + 1));
}
function isValidEntityCode(c) {
	if (c >= 55296 && c <= 57343) return false;
	if (c >= 64976 && c <= 65007) return false;
	if ((c & 65535) === 65535 || (c & 65535) === 65534) return false;
	if (c >= 0 && c <= 8) return false;
	if (c === 11) return false;
	if (c >= 14 && c <= 31) return false;
	if (c >= 127 && c <= 159) return false;
	if (c > 1114111) return false;
	return true;
}
function fromCodePoint(c) {
	if (c > 65535) {
		c -= 65536;
		const surrogate1 = 55296 + (c >> 10);
		const surrogate2 = 56320 + (c & 1023);
		return String.fromCharCode(surrogate1, surrogate2);
	}
	return String.fromCharCode(c);
}
const UNESCAPE_MD_RE = /\\([!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/g;
const UNESCAPE_ALL_RE = new RegExp(UNESCAPE_MD_RE.source + "|" + /&([a-z#][a-z0-9]{1,31});/gi.source, "gi");
const DIGITAL_ENTITY_TEST_RE = /^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))$/i;
function replaceEntityPattern(match, name) {
	if (name.charCodeAt(0) === 35 && DIGITAL_ENTITY_TEST_RE.test(name)) {
		const code = name[1].toLowerCase() === "x" ? parseInt(name.slice(2), 16) : parseInt(name.slice(1), 10);
		if (isValidEntityCode(code)) return fromCodePoint(code);
		return match;
	}
	const decoded = decodeHTML(match);
	if (decoded !== match) return decoded;
	return match;
}
function unescapeMd(str) {
	if (str.indexOf("\\") < 0) return str;
	return str.replace(UNESCAPE_MD_RE, "$1");
}
function unescapeAll(str) {
	if (str.indexOf("\\") < 0 && str.indexOf("&") < 0) return str;
	return str.replace(UNESCAPE_ALL_RE, function(match, escaped, entity) {
		if (escaped) return escaped;
		return replaceEntityPattern(match, entity);
	});
}
const HTML_ESCAPE_TEST_RE = /[&<>"]/;
const HTML_ESCAPE_REPLACE_RE = /[&<>"]/g;
const HTML_REPLACEMENTS = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;"
};
function replaceUnsafeChar(ch) {
	return HTML_REPLACEMENTS[ch];
}
function escapeHtml(str) {
	if (HTML_ESCAPE_TEST_RE.test(str)) return str.replace(HTML_ESCAPE_REPLACE_RE, replaceUnsafeChar);
	return str;
}
const REGEXP_ESCAPE_RE = /[.?*+^$[\]\\(){}|-]/g;
function escapeRE$1(str) {
	return str.replace(REGEXP_ESCAPE_RE, "\\$&");
}
function isSpace(code) {
	switch (code) {
		case 9:
		case 32: return true;
	}
	return false;
}
function isWhiteSpace(code) {
	if (code >= 8192 && code <= 8202) return true;
	switch (code) {
		case 9:
		case 10:
		case 11:
		case 12:
		case 13:
		case 32:
		case 160:
		case 5760:
		case 8239:
		case 8287:
		case 12288: return true;
	}
	return false;
}
function isPunctChar(ch) {
	return regex_default$2.test(ch) || regex_default$1.test(ch);
}
function isPunctCharCode(code) {
	return isPunctChar(fromCodePoint(code));
}
function isMdAsciiPunct(ch) {
	switch (ch) {
		case 33:
		case 34:
		case 35:
		case 36:
		case 37:
		case 38:
		case 39:
		case 40:
		case 41:
		case 42:
		case 43:
		case 44:
		case 45:
		case 46:
		case 47:
		case 58:
		case 59:
		case 60:
		case 61:
		case 62:
		case 63:
		case 64:
		case 91:
		case 92:
		case 93:
		case 94:
		case 95:
		case 96:
		case 123:
		case 124:
		case 125:
		case 126: return true;
		default: return false;
	}
}
function normalizeReference(str) {
	str = str.trim().replace(/\s+/g, " ");
	if ("ẞ".toLowerCase() === "Ṿ")
 /* c8 ignore next 2 */
	str = str.replace(/ẞ/g, "ß");
	return str.toLowerCase().toUpperCase();
}
function isAsciiTrimmable(c) {
	return c === 32 || c === 9 || c === 10 || c === 13;
}
function asciiTrim(str) {
	let start = 0;
	for (; start < str.length; start++) if (!isAsciiTrimmable(str.charCodeAt(start))) break;
	let end = str.length - 1;
	for (; end >= start; end--) if (!isAsciiTrimmable(str.charCodeAt(end))) break;
	return str.slice(start, end + 1);
}
const lib = {
	mdurl: mdurl_exports,
	ucmicro: uc_micro_exports
};
function parseLinkLabel(state, start, disableNested) {
	let level, found, marker, prevPos;
	const max = state.posMax;
	const oldPos = state.pos;
	state.pos = start + 1;
	level = 1;
	while (state.pos < max) {
		marker = state.src.charCodeAt(state.pos);
		if (marker === 93) {
			level--;
			if (level === 0) {
				found = true;
				break;
			}
		}
		prevPos = state.pos;
		state.md.inline.skipToken(state);
		if (marker === 91) {
			if (prevPos === state.pos - 1) level++;
			else if (disableNested) {
				state.pos = oldPos;
				return -1;
			}
		}
	}
	let labelEnd = -1;
	if (found) labelEnd = state.pos;
	state.pos = oldPos;
	return labelEnd;
}
function parseLinkDestination(str, start, max) {
	let code;
	let pos = start;
	const result = {
		ok: false,
		pos: 0,
		str: ""
	};
	if (str.charCodeAt(pos) === 60) {
		pos++;
		while (pos < max) {
			code = str.charCodeAt(pos);
			if (code === 10) return result;
			if (code === 60) return result;
			if (code === 62) {
				result.pos = pos + 1;
				result.str = unescapeAll(str.slice(start + 1, pos));
				result.ok = true;
				return result;
			}
			if (code === 92 && pos + 1 < max) {
				pos += 2;
				continue;
			}
			pos++;
		}
		return result;
	}
	let level = 0;
	while (pos < max) {
		code = str.charCodeAt(pos);
		if (code === 32) break;
		if (code < 32 || code === 127) break;
		if (code === 92 && pos + 1 < max) {
			if (str.charCodeAt(pos + 1) === 32) break;
			pos += 2;
			continue;
		}
		if (code === 40) {
			level++;
			if (level > 32) return result;
		}
		if (code === 41) {
			if (level === 0) break;
			level--;
		}
		pos++;
	}
	if (start === pos) return result;
	if (level !== 0) return result;
	result.str = unescapeAll(str.slice(start, pos));
	result.pos = pos;
	result.ok = true;
	return result;
}
function parseLinkTitle(str, start, max, prev_state) {
	let code;
	let pos = start;
	const state = {
		ok: false,
		can_continue: false,
		pos: 0,
		str: "",
		marker: 0
	};
	if (prev_state) {
		state.str = prev_state.str;
		state.marker = prev_state.marker;
	} else {
		if (pos >= max) return state;
		let marker = str.charCodeAt(pos);
		if (marker !== 34 && marker !== 39 && marker !== 40) return state;
		start++;
		pos++;
		if (marker === 40) marker = 41;
		state.marker = marker;
	}
	while (pos < max) {
		code = str.charCodeAt(pos);
		if (code === state.marker) {
			state.pos = pos + 1;
			state.str += unescapeAll(str.slice(start, pos));
			state.ok = true;
			return state;
		} else if (code === 40 && state.marker === 41) return state;
		else if (code === 92 && pos + 1 < max) pos++;
		pos++;
	}
	state.can_continue = true;
	state.str += unescapeAll(str.slice(start, pos));
	return state;
}
var helpers_exports = /* @__PURE__ */ __exportAll({
	parseLinkDestination: () => parseLinkDestination,
	parseLinkLabel: () => parseLinkLabel,
	parseLinkTitle: () => parseLinkTitle
});
/**
* class Renderer
*
* Generates HTML from parsed token stream. Each instance has independent
* copy of rules. Those can be rewritten with ease. Also, you can add new
* rules if you create plugin and adds new token types.
**/
const default_rules = {};
default_rules.code_inline = function(tokens, idx, options, env, slf) {
	const token = tokens[idx];
	return "<code" + slf.renderAttrs(token) + ">" + escapeHtml(token.content) + "</code>";
};
default_rules.code_block = function(tokens, idx, options, env, slf) {
	const token = tokens[idx];
	return "<pre" + slf.renderAttrs(token) + "><code>" + escapeHtml(tokens[idx].content) + "</code></pre>\n";
};
default_rules.fence = function(tokens, idx, options, env, slf) {
	const token = tokens[idx];
	const info = token.info ? unescapeAll(token.info).trim() : "";
	let langName = "";
	let langAttrs = "";
	if (info) {
		const arr = info.split(/(\s+)/g);
		langName = arr[0];
		langAttrs = arr.slice(2).join("");
	}
	let highlighted;
	if (options.highlight) highlighted = options.highlight(token.content, langName, langAttrs) || escapeHtml(token.content);
	else highlighted = escapeHtml(token.content);
	if (highlighted.indexOf("<pre") === 0) return highlighted + "\n";
	if (info) {
		const i = token.attrIndex("class");
		const tmpAttrs = token.attrs ? token.attrs.slice() : [];
		if (i < 0) tmpAttrs.push(["class", options.langPrefix + langName]);
		else {
			tmpAttrs[i] = tmpAttrs[i].slice();
			tmpAttrs[i][1] += " " + options.langPrefix + langName;
		}
		const tmpToken = { attrs: tmpAttrs };
		return `<pre><code${slf.renderAttrs(tmpToken)}>${highlighted}</code></pre>\n`;
	}
	return `<pre><code${slf.renderAttrs(token)}>${highlighted}</code></pre>\n`;
};
default_rules.image = function(tokens, idx, options, env, slf) {
	const token = tokens[idx];
	token.attrs[token.attrIndex("alt")][1] = slf.renderInlineAsText(token.children, options, env);
	return slf.renderToken(tokens, idx, options);
};
default_rules.hardbreak = function(tokens, idx, options) {
	return options.xhtmlOut ? "<br />\n" : "<br>\n";
};
default_rules.softbreak = function(tokens, idx, options) {
	return options.breaks ? options.xhtmlOut ? "<br />\n" : "<br>\n" : "\n";
};
default_rules.text = function(tokens, idx) {
	return escapeHtml(tokens[idx].content);
};
default_rules.html_block = function(tokens, idx) {
	return tokens[idx].content;
};
default_rules.html_inline = function(tokens, idx) {
	return tokens[idx].content;
};
/**
* new Renderer()
*
* Creates new [[Renderer]] instance and fill [[Renderer#rules]] with defaults.
**/
function Renderer() {
	/**
	* Renderer#rules -> Object
	*
	* Contains render rules for tokens. Can be updated and extended.
	*
	* ##### Example
	*
	* ```javascript
	* var md = require('markdown-it')();
	*
	* md.renderer.rules.strong_open  = function () { return '<b>'; };
	* md.renderer.rules.strong_close = function () { return '</b>'; };
	*
	* var result = md.renderInline(...);
	* ```
	*
	* Each rule is called as independent static function with fixed signature:
	*
	* ```javascript
	* function my_token_render(tokens, idx, options, env, renderer) {
	*   // ...
	*   return renderedHTML;
	* }
	* ```
	*
	* See [source code](https://github.com/markdown-it/markdown-it/blob/master/lib/renderer.mjs)
	* for more details and examples.
	**/
	this.rules = assign$1({}, default_rules);
}
/**
* Renderer.renderAttrs(token) -> String
*
* Render token attributes to string.
**/
Renderer.prototype.renderAttrs = function renderAttrs(token) {
	let i, l, result;
	if (!token.attrs) return "";
	result = "";
	for (i = 0, l = token.attrs.length; i < l; i++) result += " " + escapeHtml(token.attrs[i][0]) + "=\"" + escapeHtml(token.attrs[i][1]) + "\"";
	return result;
};
/**
* Renderer.renderToken(tokens, idx, options) -> String
* - tokens (Array): list of tokens
* - idx (Numbed): token index to render
* - options (Object): params of parser instance
*
* Default token renderer. Can be overriden by custom function
* in [[Renderer#rules]].
**/
Renderer.prototype.renderToken = function renderToken(tokens, idx, options) {
	const token = tokens[idx];
	let result = "";
	if (token.hidden) return "";
	if (token.block && token.nesting !== -1 && idx && tokens[idx - 1].hidden) result += "\n";
	result += (token.nesting === -1 ? "</" : "<") + token.tag;
	result += this.renderAttrs(token);
	if (token.nesting === 0 && options.xhtmlOut) result += " /";
	let needLf = false;
	if (token.block) {
		needLf = true;
		if (token.nesting === 1) {
			if (idx + 1 < tokens.length) {
				const nextToken = tokens[idx + 1];
				if (nextToken.type === "inline" || nextToken.hidden) needLf = false;
				else if (nextToken.nesting === -1 && nextToken.tag === token.tag) needLf = false;
			}
		}
	}
	result += needLf ? ">\n" : ">";
	return result;
};
/**
* Renderer.renderInline(tokens, options, env) -> String
* - tokens (Array): list on block tokens to render
* - options (Object): params of parser instance
* - env (Object): additional data from parsed input (references, for example)
*
* The same as [[Renderer.render]], but for single token of `inline` type.
**/
Renderer.prototype.renderInline = function(tokens, options, env) {
	let result = "";
	const rules = this.rules;
	for (let i = 0, len = tokens.length; i < len; i++) {
		const type = tokens[i].type;
		if (typeof rules[type] !== "undefined") result += rules[type](tokens, i, options, env, this);
		else result += this.renderToken(tokens, i, options);
	}
	return result;
};
/** internal
* Renderer.renderInlineAsText(tokens, options, env) -> String
* - tokens (Array): list on block tokens to render
* - options (Object): params of parser instance
* - env (Object): additional data from parsed input (references, for example)
*
* Special kludge for image `alt` attributes to conform CommonMark spec.
* Don't try to use it! Spec requires to show `alt` content with stripped markup,
* instead of simple escaping.
**/
Renderer.prototype.renderInlineAsText = function(tokens, options, env) {
	let result = "";
	for (let i = 0, len = tokens.length; i < len; i++) switch (tokens[i].type) {
		case "text":
			result += tokens[i].content;
			break;
		case "image":
			result += this.renderInlineAsText(tokens[i].children, options, env);
			break;
		case "html_inline":
		case "html_block":
			result += tokens[i].content;
			break;
		case "softbreak":
		case "hardbreak": result += "\n";
	}
	return result;
};
/**
* Renderer.render(tokens, options, env) -> String
* - tokens (Array): list on block tokens to render
* - options (Object): params of parser instance
* - env (Object): additional data from parsed input (references, for example)
*
* Takes token stream and generates HTML. Probably, you will never need to call
* this method directly.
**/
Renderer.prototype.render = function(tokens, options, env) {
	let result = "";
	const rules = this.rules;
	for (let i = 0, len = tokens.length; i < len; i++) {
		const type = tokens[i].type;
		if (type === "inline") result += this.renderInline(tokens[i].children, options, env);
		else if (typeof rules[type] !== "undefined") result += rules[type](tokens, i, options, env, this);
		else result += this.renderToken(tokens, i, options, env);
	}
	return result;
};
/**
* class Ruler
*
* Helper class, used by [[MarkdownIt#core]], [[MarkdownIt#block]] and
* [[MarkdownIt#inline]] to manage sequences of functions (rules):
*
* - keep rules in defined order
* - assign the name to each rule
* - enable/disable rules
* - add/replace rules
* - allow assign rules to additional named chains (in the same)
* - cacheing lists of active rules
*
* You will not need use this class directly until write plugins. For simple
* rules control use [[MarkdownIt.disable]], [[MarkdownIt.enable]] and
* [[MarkdownIt.use]].
**/
/**
* new Ruler()
**/
function Ruler() {
	this.__rules__ = [];
	this.__cache__ = null;
}
Ruler.prototype.__find__ = function(name) {
	for (let i = 0; i < this.__rules__.length; i++) if (this.__rules__[i].name === name) return i;
	return -1;
};
Ruler.prototype.__compile__ = function() {
	const self = this;
	const chains = [""];
	self.__rules__.forEach(function(rule) {
		if (!rule.enabled) return;
		rule.alt.forEach(function(altName) {
			if (chains.indexOf(altName) < 0) chains.push(altName);
		});
	});
	self.__cache__ = {};
	chains.forEach(function(chain) {
		self.__cache__[chain] = [];
		self.__rules__.forEach(function(rule) {
			if (!rule.enabled) return;
			if (chain && rule.alt.indexOf(chain) < 0) return;
			self.__cache__[chain].push(rule.fn);
		});
	});
};
/**
* Ruler.at(name, fn [, options])
* - name (String): rule name to replace.
* - fn (Function): new rule function.
* - options (Object): new rule options (not mandatory).
*
* Replace rule by name with new function & options. Throws error if name not
* found.
*
* ##### Options:
*
* - __alt__ - array with names of "alternate" chains.
*
* ##### Example
*
* Replace existing typographer replacement rule with new one:
*
* ```javascript
* var md = require('markdown-it')();
*
* md.core.ruler.at('replacements', function replace(state) {
*   //...
* });
* ```
**/
Ruler.prototype.at = function(name, fn, options) {
	const index = this.__find__(name);
	const opt = options || {};
	if (index === -1) throw new Error("Parser rule not found: " + name);
	this.__rules__[index].fn = fn;
	this.__rules__[index].alt = opt.alt || [];
	this.__cache__ = null;
};
/**
* Ruler.before(beforeName, ruleName, fn [, options])
* - beforeName (String): new rule will be added before this one.
* - ruleName (String): name of added rule.
* - fn (Function): rule function.
* - options (Object): rule options (not mandatory).
*
* Add new rule to chain before one with given name. See also
* [[Ruler.after]], [[Ruler.push]].
*
* ##### Options:
*
* - __alt__ - array with names of "alternate" chains.
*
* ##### Example
*
* ```javascript
* var md = require('markdown-it')();
*
* md.block.ruler.before('paragraph', 'my_rule', function replace(state) {
*   //...
* });
* ```
**/
Ruler.prototype.before = function(beforeName, ruleName, fn, options) {
	const index = this.__find__(beforeName);
	const opt = options || {};
	if (index === -1) throw new Error("Parser rule not found: " + beforeName);
	this.__rules__.splice(index, 0, {
		name: ruleName,
		enabled: true,
		fn,
		alt: opt.alt || []
	});
	this.__cache__ = null;
};
/**
* Ruler.after(afterName, ruleName, fn [, options])
* - afterName (String): new rule will be added after this one.
* - ruleName (String): name of added rule.
* - fn (Function): rule function.
* - options (Object): rule options (not mandatory).
*
* Add new rule to chain after one with given name. See also
* [[Ruler.before]], [[Ruler.push]].
*
* ##### Options:
*
* - __alt__ - array with names of "alternate" chains.
*
* ##### Example
*
* ```javascript
* var md = require('markdown-it')();
*
* md.inline.ruler.after('text', 'my_rule', function replace(state) {
*   //...
* });
* ```
**/
Ruler.prototype.after = function(afterName, ruleName, fn, options) {
	const index = this.__find__(afterName);
	const opt = options || {};
	if (index === -1) throw new Error("Parser rule not found: " + afterName);
	this.__rules__.splice(index + 1, 0, {
		name: ruleName,
		enabled: true,
		fn,
		alt: opt.alt || []
	});
	this.__cache__ = null;
};
/**
* Ruler.push(ruleName, fn [, options])
* - ruleName (String): name of added rule.
* - fn (Function): rule function.
* - options (Object): rule options (not mandatory).
*
* Push new rule to the end of chain. See also
* [[Ruler.before]], [[Ruler.after]].
*
* ##### Options:
*
* - __alt__ - array with names of "alternate" chains.
*
* ##### Example
*
* ```javascript
* var md = require('markdown-it')();
*
* md.core.ruler.push('my_rule', function replace(state) {
*   //...
* });
* ```
**/
Ruler.prototype.push = function(ruleName, fn, options) {
	const opt = options || {};
	this.__rules__.push({
		name: ruleName,
		enabled: true,
		fn,
		alt: opt.alt || []
	});
	this.__cache__ = null;
};
/**
* Ruler.enable(list [, ignoreInvalid]) -> Array
* - list (String|Array): list of rule names to enable.
* - ignoreInvalid (Boolean): set `true` to ignore errors when rule not found.
*
* Enable rules with given names. If any rule name not found - throw Error.
* Errors can be disabled by second param.
*
* Returns list of found rule names (if no exception happened).
*
* See also [[Ruler.disable]], [[Ruler.enableOnly]].
**/
Ruler.prototype.enable = function(list, ignoreInvalid) {
	if (!Array.isArray(list)) list = [list];
	const result = [];
	list.forEach(function(name) {
		const idx = this.__find__(name);
		if (idx < 0) {
			if (ignoreInvalid) return;
			throw new Error("Rules manager: invalid rule name " + name);
		}
		this.__rules__[idx].enabled = true;
		result.push(name);
	}, this);
	this.__cache__ = null;
	return result;
};
/**
* Ruler.enableOnly(list [, ignoreInvalid])
* - list (String|Array): list of rule names to enable (whitelist).
* - ignoreInvalid (Boolean): set `true` to ignore errors when rule not found.
*
* Enable rules with given names, and disable everything else. If any rule name
* not found - throw Error. Errors can be disabled by second param.
*
* See also [[Ruler.disable]], [[Ruler.enable]].
**/
Ruler.prototype.enableOnly = function(list, ignoreInvalid) {
	if (!Array.isArray(list)) list = [list];
	this.__rules__.forEach(function(rule) {
		rule.enabled = false;
	});
	this.enable(list, ignoreInvalid);
};
/**
* Ruler.disable(list [, ignoreInvalid]) -> Array
* - list (String|Array): list of rule names to disable.
* - ignoreInvalid (Boolean): set `true` to ignore errors when rule not found.
*
* Disable rules with given names. If any rule name not found - throw Error.
* Errors can be disabled by second param.
*
* Returns list of found rule names (if no exception happened).
*
* See also [[Ruler.enable]], [[Ruler.enableOnly]].
**/
Ruler.prototype.disable = function(list, ignoreInvalid) {
	if (!Array.isArray(list)) list = [list];
	const result = [];
	list.forEach(function(name) {
		const idx = this.__find__(name);
		if (idx < 0) {
			if (ignoreInvalid) return;
			throw new Error("Rules manager: invalid rule name " + name);
		}
		this.__rules__[idx].enabled = false;
		result.push(name);
	}, this);
	this.__cache__ = null;
	return result;
};
/**
* Ruler.getRules(chainName) -> Array
*
* Return array of active functions (rules) for given chain name. It analyzes
* rules configuration, compiles caches if not exists and returns result.
*
* Default chain name is `''` (empty string). It can't be skipped. That's
* done intentionally, to keep signature monomorphic for high speed.
**/
Ruler.prototype.getRules = function(chainName) {
	if (this.__cache__ === null) this.__compile__();
	return this.__cache__[chainName] || [];
};
/**
* class Token
**/
/**
* new Token(type, tag, nesting)
*
* Create new token and fill passed properties.
**/
function Token(type, tag, nesting) {
	/**
	* Token#type -> String
	*
	* Type of the token (string, e.g. "paragraph_open")
	**/
	this.type = type;
	/**
	* Token#tag -> String
	*
	* html tag name, e.g. "p"
	**/
	this.tag = tag;
	/**
	* Token#attrs -> Array
	*
	* Html attributes. Format: `[ [ name1, value1 ], [ name2, value2 ] ]`
	**/
	this.attrs = null;
	/**
	* Token#map -> Array
	*
	* Source map info. Format: `[ line_begin, line_end ]`
	**/
	this.map = null;
	/**
	* Token#nesting -> Number
	*
	* Level change (number in {-1, 0, 1} set), where:
	*
	* -  `1` means the tag is opening
	* -  `0` means the tag is self-closing
	* - `-1` means the tag is closing
	**/
	this.nesting = nesting;
	/**
	* Token#level -> Number
	*
	* nesting level, the same as `state.level`
	**/
	this.level = 0;
	/**
	* Token#children -> Array
	*
	* An array of child nodes (inline and img tokens)
	**/
	this.children = null;
	/**
	* Token#content -> String
	*
	* In a case of self-closing tag (code, html, fence, etc.),
	* it has contents of this tag.
	**/
	this.content = "";
	/**
	* Token#markup -> String
	*
	* '*' or '_' for emphasis, fence string for fence, etc.
	**/
	this.markup = "";
	/**
	* Token#info -> String
	*
	* Additional information:
	*
	* - Info string for "fence" tokens
	* - The value "auto" for autolink "link_open" and "link_close" tokens
	* - The string value of the item marker for ordered-list "list_item_open" tokens
	**/
	this.info = "";
	/**
	* Token#meta -> Object
	*
	* A place for plugins to store an arbitrary data
	**/
	this.meta = null;
	/**
	* Token#block -> Boolean
	*
	* True for block-level tokens, false for inline tokens.
	* Used in renderer to calculate line breaks
	**/
	this.block = false;
	/**
	* Token#hidden -> Boolean
	*
	* If it's true, ignore this element when rendering. Used for tight lists
	* to hide paragraphs.
	**/
	this.hidden = false;
}
/**
* Token.attrIndex(name) -> Number
*
* Search attribute index by name.
**/
Token.prototype.attrIndex = function attrIndex(name) {
	if (!this.attrs) return -1;
	const attrs = this.attrs;
	for (let i = 0, len = attrs.length; i < len; i++) if (attrs[i][0] === name) return i;
	return -1;
};
/**
* Token.attrPush(attrData)
*
* Add `[ name, value ]` attribute to list. Init attrs if necessary
**/
Token.prototype.attrPush = function attrPush(attrData) {
	if (this.attrs) this.attrs.push(attrData);
	else this.attrs = [attrData];
};
/**
* Token.attrSet(name, value)
*
* Set `name` attribute to `value`. Override old value if exists.
**/
Token.prototype.attrSet = function attrSet(name, value) {
	const idx = this.attrIndex(name);
	const attrData = [name, value];
	if (idx < 0) this.attrPush(attrData);
	else this.attrs[idx] = attrData;
};
/**
* Token.attrGet(name)
*
* Get the value of attribute `name`, or null if it does not exist.
**/
Token.prototype.attrGet = function attrGet(name) {
	const idx = this.attrIndex(name);
	let value = null;
	if (idx >= 0) value = this.attrs[idx][1];
	return value;
};
/**
* Token.attrJoin(name, value)
*
* Join value to existing attribute via space. Or create new attribute if not
* exists. Useful to operate with token classes.
**/
Token.prototype.attrJoin = function attrJoin(name, value) {
	const idx = this.attrIndex(name);
	if (idx < 0) this.attrPush([name, value]);
	else this.attrs[idx][1] = this.attrs[idx][1] + " " + value;
};
function StateCore(src, md, env) {
	this.src = src;
	this.env = env;
	this.tokens = [];
	this.inlineMode = false;
	this.md = md;
}
StateCore.prototype.Token = Token;
const NEWLINES_RE = /\r\n?|\n/g;
const NULL_RE = /\0/g;
function normalize(state) {
	let str;
	str = state.src.replace(NEWLINES_RE, "\n");
	str = str.replace(NULL_RE, "�");
	state.src = str;
}
function block(state) {
	let token;
	if (state.inlineMode) {
		token = new state.Token("inline", "", 0);
		token.content = state.src;
		token.map = [0, 1];
		token.children = [];
		state.tokens.push(token);
	} else state.md.block.parse(state.src, state.md, state.env, state.tokens);
}
function inline(state) {
	const tokens = state.tokens;
	for (let i = 0, l = tokens.length; i < l; i++) {
		const tok = tokens[i];
		if (tok.type === "inline") state.md.inline.parse(tok.content, state.md, state.env, tok.children);
	}
}
function isLinkOpen$1(str) {
	return /^<a[>\s]/i.test(str);
}
function isLinkClose$1(str) {
	return /^<\/a\s*>/i.test(str);
}
function linkify$1(state) {
	const blockTokens = state.tokens;
	if (!state.md.options.linkify) return;
	for (let j = 0, l = blockTokens.length; j < l; j++) {
		if (blockTokens[j].type !== "inline" || !state.md.linkify.pretest(blockTokens[j].content)) continue;
		let tokens = blockTokens[j].children;
		let htmlLinkLevel = 0;
		for (let i = tokens.length - 1; i >= 0; i--) {
			const currentToken = tokens[i];
			if (currentToken.type === "link_close") {
				i--;
				while (tokens[i].level !== currentToken.level && tokens[i].type !== "link_open") i--;
				continue;
			}
			if (currentToken.type === "html_inline") {
				if (isLinkOpen$1(currentToken.content) && htmlLinkLevel > 0) htmlLinkLevel--;
				if (isLinkClose$1(currentToken.content)) htmlLinkLevel++;
			}
			if (htmlLinkLevel > 0) continue;
			if (currentToken.type === "text" && state.md.linkify.test(currentToken.content)) {
				const text = currentToken.content;
				let links = state.md.linkify.match(text);
				const nodes = [];
				let level = currentToken.level;
				let lastPos = 0;
				if (links.length > 0 && links[0].index === 0 && i > 0 && tokens[i - 1].type === "text_special") links = links.slice(1);
				for (let ln = 0; ln < links.length; ln++) {
					const url = links[ln].url;
					const fullUrl = state.md.normalizeLink(url);
					if (!state.md.validateLink(fullUrl)) continue;
					let urlText = links[ln].text;
					if (!links[ln].schema) urlText = state.md.normalizeLinkText("http://" + urlText).replace(/^http:\/\//, "");
					else if (links[ln].schema === "mailto:" && !/^mailto:/i.test(urlText)) urlText = state.md.normalizeLinkText("mailto:" + urlText).replace(/^mailto:/, "");
					else urlText = state.md.normalizeLinkText(urlText);
					const pos = links[ln].index;
					if (pos > lastPos) {
						const token = new state.Token("text", "", 0);
						token.content = text.slice(lastPos, pos);
						token.level = level;
						nodes.push(token);
					}
					const token_o = new state.Token("link_open", "a", 1);
					token_o.attrs = [["href", fullUrl]];
					token_o.level = level++;
					token_o.markup = "linkify";
					token_o.info = "auto";
					nodes.push(token_o);
					const token_t = new state.Token("text", "", 0);
					token_t.content = urlText;
					token_t.level = level;
					nodes.push(token_t);
					const token_c = new state.Token("link_close", "a", -1);
					token_c.level = --level;
					token_c.markup = "linkify";
					token_c.info = "auto";
					nodes.push(token_c);
					lastPos = links[ln].lastIndex;
				}
				if (lastPos < text.length) {
					const token = new state.Token("text", "", 0);
					token.content = text.slice(lastPos);
					token.level = level;
					nodes.push(token);
				}
				blockTokens[j].children = tokens = arrayReplaceAt(tokens, i, nodes);
			}
		}
	}
}
const RARE_RE = /\+-|\.\.|\?\?\?\?|!!!!|,,|--/;
const SCOPED_ABBR_TEST_RE = /\((c|tm|r)\)/i;
const SCOPED_ABBR_RE = /\((c|tm|r)\)/gi;
const SCOPED_ABBR = {
	c: "©",
	r: "®",
	tm: "™"
};
function replaceFn(match, name) {
	return SCOPED_ABBR[name.toLowerCase()];
}
function replace_scoped(inlineTokens) {
	let inside_autolink = 0;
	for (let i = inlineTokens.length - 1; i >= 0; i--) {
		const token = inlineTokens[i];
		if (token.type === "text" && !inside_autolink) token.content = token.content.replace(SCOPED_ABBR_RE, replaceFn);
		if (token.type === "link_open" && token.info === "auto") inside_autolink--;
		if (token.type === "link_close" && token.info === "auto") inside_autolink++;
	}
}
function replace_rare(inlineTokens) {
	let inside_autolink = 0;
	for (let i = inlineTokens.length - 1; i >= 0; i--) {
		const token = inlineTokens[i];
		if (token.type === "text" && !inside_autolink) {
			if (RARE_RE.test(token.content)) token.content = token.content.replace(/\+-/g, "±").replace(/\.{2,}/g, "…").replace(/([?!])…/g, "$1..").replace(/([?!]){4,}/g, "$1$1$1").replace(/,{2,}/g, ",").replace(/(^|[^-])---(?=[^-]|$)/gm, "$1—").replace(/(^|\s)--(?=\s|$)/gm, "$1–").replace(/(^|[^-\s])--(?=[^-\s]|$)/gm, "$1–");
		}
		if (token.type === "link_open" && token.info === "auto") inside_autolink--;
		if (token.type === "link_close" && token.info === "auto") inside_autolink++;
	}
}
function replace(state) {
	let blkIdx;
	if (!state.md.options.typographer) return;
	for (blkIdx = state.tokens.length - 1; blkIdx >= 0; blkIdx--) {
		if (state.tokens[blkIdx].type !== "inline") continue;
		if (SCOPED_ABBR_TEST_RE.test(state.tokens[blkIdx].content)) replace_scoped(state.tokens[blkIdx].children);
		if (RARE_RE.test(state.tokens[blkIdx].content)) replace_rare(state.tokens[blkIdx].children);
	}
}
const QUOTE_TEST_RE = /['"]/;
const QUOTE_RE = /['"]/g;
const APOSTROPHE = "’";
function addReplacement(replacements, tokenIdx, pos, ch) {
	if (!replacements[tokenIdx]) replacements[tokenIdx] = [];
	replacements[tokenIdx].push({
		pos,
		ch
	});
}
function applyReplacements(str, replacements) {
	let result = "";
	let lastPos = 0;
	replacements.sort((a, b) => a.pos - b.pos);
	for (let i = 0; i < replacements.length; i++) {
		const replacement = replacements[i];
		result += str.slice(lastPos, replacement.pos) + replacement.ch;
		lastPos = replacement.pos + 1;
	}
	return result + str.slice(lastPos);
}
function process_inlines(tokens, state) {
	let j;
	const stack = [];
	const replacements = {};
	for (let i = 0; i < tokens.length; i++) {
		const token = tokens[i];
		const thisLevel = tokens[i].level;
		for (j = stack.length - 1; j >= 0; j--) if (stack[j].level <= thisLevel) break;
		stack.length = j + 1;
		if (token.type !== "text") continue;
		const text = token.content;
		let pos = 0;
		const max = text.length;
		OUTER: while (pos < max) {
			QUOTE_RE.lastIndex = pos;
			const t = QUOTE_RE.exec(text);
			if (!t) break;
			let canOpen = true;
			let canClose = true;
			pos = t.index + 1;
			const isSingle = t[0] === "'";
			let lastChar = 32;
			if (t.index - 1 >= 0) lastChar = text.charCodeAt(t.index - 1);
			else for (j = i - 1; j >= 0; j--) {
				if (tokens[j].type === "softbreak" || tokens[j].type === "hardbreak") break;
				if (!tokens[j].content) continue;
				lastChar = tokens[j].content.charCodeAt(tokens[j].content.length - 1);
				break;
			}
			let nextChar = 32;
			if (pos < max) nextChar = text.charCodeAt(pos);
			else for (j = i + 1; j < tokens.length; j++) {
				if (tokens[j].type === "softbreak" || tokens[j].type === "hardbreak") break;
				if (!tokens[j].content) continue;
				nextChar = tokens[j].content.charCodeAt(0);
				break;
			}
			const isLastPunctChar = isMdAsciiPunct(lastChar) || isPunctCharCode(lastChar);
			const isNextPunctChar = isMdAsciiPunct(nextChar) || isPunctCharCode(nextChar);
			const isLastWhiteSpace = isWhiteSpace(lastChar);
			const isNextWhiteSpace = isWhiteSpace(nextChar);
			if (isNextWhiteSpace) canOpen = false;
			else if (isNextPunctChar) {
				if (!(isLastWhiteSpace || isLastPunctChar)) canOpen = false;
			}
			if (isLastWhiteSpace) canClose = false;
			else if (isLastPunctChar) {
				if (!(isNextWhiteSpace || isNextPunctChar)) canClose = false;
			}
			if (nextChar === 34 && t[0] === "\"") {
				if (lastChar >= 48 && lastChar <= 57) canClose = canOpen = false;
			}
			if (canOpen && canClose) {
				canOpen = isLastPunctChar;
				canClose = isNextPunctChar;
			}
			if (!canOpen && !canClose) {
				if (isSingle) addReplacement(replacements, i, t.index, APOSTROPHE);
				continue;
			}
			if (canClose) for (j = stack.length - 1; j >= 0; j--) {
				let item = stack[j];
				if (stack[j].level < thisLevel) break;
				if (item.single === isSingle && stack[j].level === thisLevel) {
					item = stack[j];
					let openQuote;
					let closeQuote;
					if (isSingle) {
						openQuote = state.md.options.quotes[2];
						closeQuote = state.md.options.quotes[3];
					} else {
						openQuote = state.md.options.quotes[0];
						closeQuote = state.md.options.quotes[1];
					}
					addReplacement(replacements, i, t.index, closeQuote);
					addReplacement(replacements, item.token, item.pos, openQuote);
					stack.length = j;
					continue OUTER;
				}
			}
			if (canOpen) stack.push({
				token: i,
				pos: t.index,
				single: isSingle,
				level: thisLevel
			});
			else if (canClose && isSingle) addReplacement(replacements, i, t.index, APOSTROPHE);
		}
	}
	Object.keys(replacements).forEach(function(tokenIdx) {
		tokens[tokenIdx].content = applyReplacements(tokens[tokenIdx].content, replacements[tokenIdx]);
	});
}
function smartquotes(state) {
	if (!state.md.options.typographer) return;
	for (let blkIdx = state.tokens.length - 1; blkIdx >= 0; blkIdx--) {
		if (state.tokens[blkIdx].type !== "inline" || !QUOTE_TEST_RE.test(state.tokens[blkIdx].content)) continue;
		process_inlines(state.tokens[blkIdx].children, state);
	}
}
function text_join(state) {
	let curr, last;
	const blockTokens = state.tokens;
	const l = blockTokens.length;
	for (let j = 0; j < l; j++) {
		if (blockTokens[j].type !== "inline") continue;
		const tokens = blockTokens[j].children;
		const max = tokens.length;
		for (curr = 0; curr < max; curr++) if (tokens[curr].type === "text_special") tokens[curr].type = "text";
		for (curr = last = 0; curr < max; curr++) if (tokens[curr].type === "text" && curr + 1 < max && tokens[curr + 1].type === "text") tokens[curr + 1].content = tokens[curr].content + tokens[curr + 1].content;
		else {
			if (curr !== last) tokens[last] = tokens[curr];
			last++;
		}
		if (curr !== last) tokens.length = last;
	}
}
/** internal
* class Core
*
* Top-level rules executor. Glues block/inline parsers and does intermediate
* transformations.
**/
const _rules$2 = [
	["normalize", normalize],
	["block", block],
	["inline", inline],
	["linkify", linkify$1],
	["replacements", replace],
	["smartquotes", smartquotes],
	["text_join", text_join]
];
/**
* new Core()
**/
function Core() {
	/**
	* Core#ruler -> Ruler
	*
	* [[Ruler]] instance. Keep configuration of core rules.
	**/
	this.ruler = new Ruler();
	for (let i = 0; i < _rules$2.length; i++) this.ruler.push(_rules$2[i][0], _rules$2[i][1]);
}
/**
* Core.process(state)
*
* Executes core chain rules.
**/
Core.prototype.process = function(state) {
	const rules = this.ruler.getRules("");
	for (let i = 0, l = rules.length; i < l; i++) rules[i](state);
};
Core.prototype.State = StateCore;
function StateBlock(src, md, env, tokens) {
	this.src = src;
	this.md = md;
	this.env = env;
	this.tokens = tokens;
	this.bMarks = [];
	this.eMarks = [];
	this.tShift = [];
	this.sCount = [];
	this.bsCount = [];
	this.blkIndent = 0;
	this.line = 0;
	this.lineMax = 0;
	this.tight = false;
	this.ddIndent = -1;
	this.listIndent = -1;
	this.parentType = "root";
	this.level = 0;
	const s = this.src;
	for (let start = 0, pos = 0, indent = 0, offset = 0, len = s.length, indent_found = false; pos < len; pos++) {
		const ch = s.charCodeAt(pos);
		if (!indent_found) {
			if (isSpace(ch)) {
				indent++;
				if (ch === 9) offset += 4 - offset % 4;
				else offset++;
				continue;
			} else indent_found = true;
		}
		if (ch === 10 || pos === len - 1) {
			if (ch !== 10) pos++;
			this.bMarks.push(start);
			this.eMarks.push(pos);
			this.tShift.push(indent);
			this.sCount.push(offset);
			this.bsCount.push(0);
			indent_found = false;
			indent = 0;
			offset = 0;
			start = pos + 1;
		}
	}
	this.bMarks.push(s.length);
	this.eMarks.push(s.length);
	this.tShift.push(0);
	this.sCount.push(0);
	this.bsCount.push(0);
	this.lineMax = this.bMarks.length - 1;
}
StateBlock.prototype.push = function(type, tag, nesting) {
	const token = new Token(type, tag, nesting);
	token.block = true;
	if (nesting < 0) this.level--;
	token.level = this.level;
	if (nesting > 0) this.level++;
	this.tokens.push(token);
	return token;
};
StateBlock.prototype.isEmpty = function isEmpty(line) {
	return this.bMarks[line] + this.tShift[line] >= this.eMarks[line];
};
StateBlock.prototype.skipEmptyLines = function skipEmptyLines(from) {
	for (let max = this.lineMax; from < max; from++) if (this.bMarks[from] + this.tShift[from] < this.eMarks[from]) break;
	return from;
};
StateBlock.prototype.skipSpaces = function skipSpaces(pos) {
	for (let max = this.src.length; pos < max; pos++) if (!isSpace(this.src.charCodeAt(pos))) break;
	return pos;
};
StateBlock.prototype.skipSpacesBack = function skipSpacesBack(pos, min) {
	if (pos <= min) return pos;
	while (pos > min) if (!isSpace(this.src.charCodeAt(--pos))) return pos + 1;
	return pos;
};
StateBlock.prototype.skipChars = function skipChars(pos, code) {
	for (let max = this.src.length; pos < max; pos++) if (this.src.charCodeAt(pos) !== code) break;
	return pos;
};
StateBlock.prototype.skipCharsBack = function skipCharsBack(pos, code, min) {
	if (pos <= min) return pos;
	while (pos > min) if (code !== this.src.charCodeAt(--pos)) return pos + 1;
	return pos;
};
StateBlock.prototype.getLines = function getLines(begin, end, indent, keepLastLF) {
	if (begin >= end) return "";
	const queue = new Array(end - begin);
	for (let i = 0, line = begin; line < end; line++, i++) {
		let lineIndent = 0;
		const lineStart = this.bMarks[line];
		let first = lineStart;
		let last;
		if (line + 1 < end || keepLastLF) last = this.eMarks[line] + 1;
		else last = this.eMarks[line];
		while (first < last && lineIndent < indent) {
			const ch = this.src.charCodeAt(first);
			if (isSpace(ch)) {
				if (ch === 9) lineIndent += 4 - (lineIndent + this.bsCount[line]) % 4;
				else lineIndent++;
			} else if (first - lineStart < this.tShift[line]) lineIndent++;
			else break;
			first++;
		}
		if (lineIndent > indent) queue[i] = new Array(lineIndent - indent + 1).join(" ") + this.src.slice(first, last);
		else queue[i] = this.src.slice(first, last);
	}
	return queue.join("");
};
StateBlock.prototype.Token = Token;
const MAX_AUTOCOMPLETED_CELLS = 65536;
function getLine(state, line) {
	const pos = state.bMarks[line] + state.tShift[line];
	const max = state.eMarks[line];
	return state.src.slice(pos, max);
}
function escapedSplit(str) {
	const result = [];
	const max = str.length;
	let pos = 0;
	let ch = str.charCodeAt(pos);
	let isEscaped = false;
	let lastPos = 0;
	let current = "";
	while (pos < max) {
		if (ch === 124) {
			if (!isEscaped) {
				result.push(current + str.substring(lastPos, pos));
				current = "";
				lastPos = pos + 1;
			} else {
				current += str.substring(lastPos, pos - 1);
				lastPos = pos;
			}
		}
		isEscaped = ch === 92;
		pos++;
		ch = str.charCodeAt(pos);
	}
	result.push(current + str.substring(lastPos));
	return result;
}
function table(state, startLine, endLine, silent) {
	if (startLine + 2 > endLine) return false;
	let nextLine = startLine + 1;
	if (state.sCount[nextLine] < state.blkIndent) return false;
	if (state.sCount[nextLine] - state.blkIndent >= 4) return false;
	let pos = state.bMarks[nextLine] + state.tShift[nextLine];
	if (pos >= state.eMarks[nextLine]) return false;
	const firstCh = state.src.charCodeAt(pos++);
	if (firstCh !== 124 && firstCh !== 45 && firstCh !== 58) return false;
	if (pos >= state.eMarks[nextLine]) return false;
	const secondCh = state.src.charCodeAt(pos++);
	if (secondCh !== 124 && secondCh !== 45 && secondCh !== 58 && !isSpace(secondCh)) return false;
	if (firstCh === 45 && isSpace(secondCh)) return false;
	while (pos < state.eMarks[nextLine]) {
		const ch = state.src.charCodeAt(pos);
		if (ch !== 124 && ch !== 45 && ch !== 58 && !isSpace(ch)) return false;
		pos++;
	}
	let lineText = getLine(state, startLine + 1);
	let columns = lineText.split("|");
	const aligns = [];
	for (let i = 0; i < columns.length; i++) {
		const t = columns[i].trim();
		if (!t) {
			if (i === 0 || i === columns.length - 1) continue;
			else return false;
		}
		if (!/^:?-+:?$/.test(t)) return false;
		if (t.charCodeAt(t.length - 1) === 58) aligns.push(t.charCodeAt(0) === 58 ? "center" : "right");
		else if (t.charCodeAt(0) === 58) aligns.push("left");
		else aligns.push("");
	}
	lineText = getLine(state, startLine).trim();
	if (lineText.indexOf("|") === -1) return false;
	if (state.sCount[startLine] - state.blkIndent >= 4) return false;
	columns = escapedSplit(lineText);
	if (columns.length && columns[0] === "") columns.shift();
	if (columns.length && columns[columns.length - 1] === "") columns.pop();
	const columnCount = columns.length;
	if (columnCount === 0 || columnCount !== aligns.length) return false;
	if (silent) return true;
	const oldParentType = state.parentType;
	state.parentType = "table";
	const terminatorRules = state.md.block.ruler.getRules("blockquote");
	const token_to = state.push("table_open", "table", 1);
	const tableLines = [startLine, 0];
	token_to.map = tableLines;
	const token_tho = state.push("thead_open", "thead", 1);
	token_tho.map = [startLine, startLine + 1];
	const token_htro = state.push("tr_open", "tr", 1);
	token_htro.map = [startLine, startLine + 1];
	for (let i = 0; i < columns.length; i++) {
		const token_ho = state.push("th_open", "th", 1);
		if (aligns[i]) token_ho.attrs = [["style", "text-align:" + aligns[i]]];
		const token_il = state.push("inline", "", 0);
		token_il.content = columns[i].trim();
		token_il.children = [];
		state.push("th_close", "th", -1);
	}
	state.push("tr_close", "tr", -1);
	state.push("thead_close", "thead", -1);
	let tbodyLines;
	let autocompletedCells = 0;
	for (nextLine = startLine + 2; nextLine < endLine; nextLine++) {
		if (state.sCount[nextLine] < state.blkIndent) break;
		let terminate = false;
		for (let i = 0, l = terminatorRules.length; i < l; i++) if (terminatorRules[i](state, nextLine, endLine, true)) {
			terminate = true;
			break;
		}
		if (terminate) break;
		lineText = getLine(state, nextLine).trim();
		if (!lineText) break;
		if (state.sCount[nextLine] - state.blkIndent >= 4) break;
		columns = escapedSplit(lineText);
		if (columns.length && columns[0] === "") columns.shift();
		if (columns.length && columns[columns.length - 1] === "") columns.pop();
		autocompletedCells += columnCount - columns.length;
		if (autocompletedCells > MAX_AUTOCOMPLETED_CELLS) break;
		if (nextLine === startLine + 2) {
			const token_tbo = state.push("tbody_open", "tbody", 1);
			token_tbo.map = tbodyLines = [startLine + 2, 0];
		}
		const token_tro = state.push("tr_open", "tr", 1);
		token_tro.map = [nextLine, nextLine + 1];
		for (let i = 0; i < columnCount; i++) {
			const token_tdo = state.push("td_open", "td", 1);
			if (aligns[i]) token_tdo.attrs = [["style", "text-align:" + aligns[i]]];
			const token_il = state.push("inline", "", 0);
			token_il.content = columns[i] ? columns[i].trim() : "";
			token_il.children = [];
			state.push("td_close", "td", -1);
		}
		state.push("tr_close", "tr", -1);
	}
	if (tbodyLines) {
		state.push("tbody_close", "tbody", -1);
		tbodyLines[1] = nextLine;
	}
	state.push("table_close", "table", -1);
	tableLines[1] = nextLine;
	state.parentType = oldParentType;
	state.line = nextLine;
	return true;
}
function code(state, startLine, endLine) {
	if (state.sCount[startLine] - state.blkIndent < 4) return false;
	let nextLine = startLine + 1;
	let last = nextLine;
	while (nextLine < endLine) {
		if (state.isEmpty(nextLine)) {
			nextLine++;
			continue;
		}
		if (state.sCount[nextLine] - state.blkIndent >= 4) {
			nextLine++;
			last = nextLine;
			continue;
		}
		break;
	}
	state.line = last;
	const token = state.push("code_block", "code", 0);
	token.content = state.getLines(startLine, last, 4 + state.blkIndent, false) + "\n";
	token.map = [startLine, state.line];
	return true;
}
function fence(state, startLine, endLine, silent) {
	let pos = state.bMarks[startLine] + state.tShift[startLine];
	let max = state.eMarks[startLine];
	if (state.sCount[startLine] - state.blkIndent >= 4) return false;
	if (pos + 3 > max) return false;
	const marker = state.src.charCodeAt(pos);
	if (marker !== 126 && marker !== 96) return false;
	let mem = pos;
	pos = state.skipChars(pos, marker);
	let len = pos - mem;
	if (len < 3) return false;
	const markup = state.src.slice(mem, pos);
	const params = state.src.slice(pos, max);
	if (marker === 96) {
		if (params.indexOf(String.fromCharCode(marker)) >= 0) return false;
	}
	if (silent) return true;
	let nextLine = startLine;
	let haveEndMarker = false;
	for (;;) {
		nextLine++;
		if (nextLine >= endLine) break;
		pos = mem = state.bMarks[nextLine] + state.tShift[nextLine];
		max = state.eMarks[nextLine];
		if (pos < max && state.sCount[nextLine] < state.blkIndent) break;
		if (state.src.charCodeAt(pos) !== marker) continue;
		if (state.sCount[nextLine] - state.blkIndent >= 4) continue;
		pos = state.skipChars(pos, marker);
		if (pos - mem < len) continue;
		pos = state.skipSpaces(pos);
		if (pos < max) continue;
		haveEndMarker = true;
		break;
	}
	len = state.sCount[startLine];
	state.line = nextLine + (haveEndMarker ? 1 : 0);
	const token = state.push("fence", "code", 0);
	token.info = params;
	token.content = state.getLines(startLine + 1, nextLine, len, true);
	token.markup = markup;
	token.map = [startLine, state.line];
	return true;
}
function blockquote(state, startLine, endLine, silent) {
	let pos = state.bMarks[startLine] + state.tShift[startLine];
	let max = state.eMarks[startLine];
	const oldLineMax = state.lineMax;
	if (state.sCount[startLine] - state.blkIndent >= 4) return false;
	if (state.src.charCodeAt(pos) !== 62) return false;
	if (silent) return true;
	const oldBMarks = [];
	const oldBSCount = [];
	const oldSCount = [];
	const oldTShift = [];
	const terminatorRules = state.md.block.ruler.getRules("blockquote");
	const oldParentType = state.parentType;
	state.parentType = "blockquote";
	let lastLineEmpty = false;
	let nextLine;
	for (nextLine = startLine; nextLine < endLine; nextLine++) {
		const isOutdented = state.sCount[nextLine] < state.blkIndent;
		pos = state.bMarks[nextLine] + state.tShift[nextLine];
		max = state.eMarks[nextLine];
		if (pos >= max) break;
		if (state.src.charCodeAt(pos++) === 62 && !isOutdented) {
			let initial = state.sCount[nextLine] + 1;
			let spaceAfterMarker;
			let adjustTab;
			if (state.src.charCodeAt(pos) === 32) {
				pos++;
				initial++;
				adjustTab = false;
				spaceAfterMarker = true;
			} else if (state.src.charCodeAt(pos) === 9) {
				spaceAfterMarker = true;
				if ((state.bsCount[nextLine] + initial) % 4 === 3) {
					pos++;
					initial++;
					adjustTab = false;
				} else adjustTab = true;
			} else spaceAfterMarker = false;
			let offset = initial;
			oldBMarks.push(state.bMarks[nextLine]);
			state.bMarks[nextLine] = pos;
			while (pos < max) {
				const ch = state.src.charCodeAt(pos);
				if (isSpace(ch)) {
					if (ch === 9) offset += 4 - (offset + state.bsCount[nextLine] + (adjustTab ? 1 : 0)) % 4;
					else offset++;
				} else break;
				pos++;
			}
			lastLineEmpty = pos >= max;
			oldBSCount.push(state.bsCount[nextLine]);
			state.bsCount[nextLine] = state.sCount[nextLine] + 1 + (spaceAfterMarker ? 1 : 0);
			oldSCount.push(state.sCount[nextLine]);
			state.sCount[nextLine] = offset - initial;
			oldTShift.push(state.tShift[nextLine]);
			state.tShift[nextLine] = pos - state.bMarks[nextLine];
			continue;
		}
		if (lastLineEmpty) break;
		let terminate = false;
		for (let i = 0, l = terminatorRules.length; i < l; i++) if (terminatorRules[i](state, nextLine, endLine, true)) {
			terminate = true;
			break;
		}
		if (terminate) {
			state.lineMax = nextLine;
			if (state.blkIndent !== 0) {
				oldBMarks.push(state.bMarks[nextLine]);
				oldBSCount.push(state.bsCount[nextLine]);
				oldTShift.push(state.tShift[nextLine]);
				oldSCount.push(state.sCount[nextLine]);
				state.sCount[nextLine] -= state.blkIndent;
			}
			break;
		}
		oldBMarks.push(state.bMarks[nextLine]);
		oldBSCount.push(state.bsCount[nextLine]);
		oldTShift.push(state.tShift[nextLine]);
		oldSCount.push(state.sCount[nextLine]);
		state.sCount[nextLine] = -1;
	}
	const oldIndent = state.blkIndent;
	state.blkIndent = 0;
	const token_o = state.push("blockquote_open", "blockquote", 1);
	token_o.markup = ">";
	const lines = [startLine, 0];
	token_o.map = lines;
	state.md.block.tokenize(state, startLine, nextLine);
	const token_c = state.push("blockquote_close", "blockquote", -1);
	token_c.markup = ">";
	state.lineMax = oldLineMax;
	state.parentType = oldParentType;
	lines[1] = state.line;
	for (let i = 0; i < oldTShift.length; i++) {
		state.bMarks[i + startLine] = oldBMarks[i];
		state.tShift[i + startLine] = oldTShift[i];
		state.sCount[i + startLine] = oldSCount[i];
		state.bsCount[i + startLine] = oldBSCount[i];
	}
	state.blkIndent = oldIndent;
	return true;
}
function hr(state, startLine, endLine, silent) {
	const max = state.eMarks[startLine];
	if (state.sCount[startLine] - state.blkIndent >= 4) return false;
	let pos = state.bMarks[startLine] + state.tShift[startLine];
	const marker = state.src.charCodeAt(pos++);
	if (marker !== 42 && marker !== 45 && marker !== 95) return false;
	let cnt = 1;
	while (pos < max) {
		const ch = state.src.charCodeAt(pos++);
		if (ch !== marker && !isSpace(ch)) return false;
		if (ch === marker) cnt++;
	}
	if (cnt < 3) return false;
	if (silent) return true;
	state.line = startLine + 1;
	const token = state.push("hr", "hr", 0);
	token.map = [startLine, state.line];
	token.markup = Array(cnt + 1).join(String.fromCharCode(marker));
	return true;
}
function skipBulletListMarker(state, startLine) {
	const max = state.eMarks[startLine];
	let pos = state.bMarks[startLine] + state.tShift[startLine];
	const marker = state.src.charCodeAt(pos++);
	if (marker !== 42 && marker !== 45 && marker !== 43) return -1;
	if (pos < max) {
		if (!isSpace(state.src.charCodeAt(pos))) return -1;
	}
	return pos;
}
function skipOrderedListMarker(state, startLine) {
	const start = state.bMarks[startLine] + state.tShift[startLine];
	const max = state.eMarks[startLine];
	let pos = start;
	if (pos + 1 >= max) return -1;
	let ch = state.src.charCodeAt(pos++);
	if (ch < 48 || ch > 57) return -1;
	for (;;) {
		if (pos >= max) return -1;
		ch = state.src.charCodeAt(pos++);
		if (ch >= 48 && ch <= 57) {
			if (pos - start >= 10) return -1;
			continue;
		}
		if (ch === 41 || ch === 46) break;
		return -1;
	}
	if (pos < max) {
		ch = state.src.charCodeAt(pos);
		if (!isSpace(ch)) return -1;
	}
	return pos;
}
function markTightParagraphs(state, idx) {
	const level = state.level + 2;
	for (let i = idx + 2, l = state.tokens.length - 2; i < l; i++) if (state.tokens[i].level === level && state.tokens[i].type === "paragraph_open") {
		state.tokens[i + 2].hidden = true;
		state.tokens[i].hidden = true;
		i += 2;
	}
}
function list(state, startLine, endLine, silent) {
	let max, pos, start, token;
	let nextLine = startLine;
	let tight = true;
	if (state.sCount[nextLine] - state.blkIndent >= 4) return false;
	if (state.listIndent >= 0 && state.sCount[nextLine] - state.listIndent >= 4 && state.sCount[nextLine] < state.blkIndent) return false;
	let isTerminatingParagraph = false;
	if (silent && state.parentType === "paragraph") {
		if (state.sCount[nextLine] >= state.blkIndent) isTerminatingParagraph = true;
	}
	let isOrdered;
	let markerValue;
	let posAfterMarker;
	if ((posAfterMarker = skipOrderedListMarker(state, nextLine)) >= 0) {
		isOrdered = true;
		start = state.bMarks[nextLine] + state.tShift[nextLine];
		markerValue = Number(state.src.slice(start, posAfterMarker - 1));
		if (isTerminatingParagraph && markerValue !== 1) return false;
	} else if ((posAfterMarker = skipBulletListMarker(state, nextLine)) >= 0) isOrdered = false;
	else return false;
	if (isTerminatingParagraph) {
		if (state.skipSpaces(posAfterMarker) >= state.eMarks[nextLine]) return false;
	}
	if (silent) return true;
	const markerCharCode = state.src.charCodeAt(posAfterMarker - 1);
	const listTokIdx = state.tokens.length;
	if (isOrdered) {
		token = state.push("ordered_list_open", "ol", 1);
		if (markerValue !== 1) token.attrs = [["start", markerValue]];
	} else token = state.push("bullet_list_open", "ul", 1);
	const listLines = [nextLine, 0];
	token.map = listLines;
	token.markup = String.fromCharCode(markerCharCode);
	let prevEmptyEnd = false;
	const terminatorRules = state.md.block.ruler.getRules("list");
	const oldParentType = state.parentType;
	state.parentType = "list";
	while (nextLine < endLine) {
		pos = posAfterMarker;
		max = state.eMarks[nextLine];
		const initial = state.sCount[nextLine] + posAfterMarker - (state.bMarks[nextLine] + state.tShift[nextLine]);
		let offset = initial;
		while (pos < max) {
			const ch = state.src.charCodeAt(pos);
			if (ch === 9) offset += 4 - (offset + state.bsCount[nextLine]) % 4;
			else if (ch === 32) offset++;
			else break;
			pos++;
		}
		const contentStart = pos;
		let indentAfterMarker;
		if (contentStart >= max) indentAfterMarker = 1;
		else indentAfterMarker = offset - initial;
		if (indentAfterMarker > 4) indentAfterMarker = 1;
		const indent = initial + indentAfterMarker;
		token = state.push("list_item_open", "li", 1);
		token.markup = String.fromCharCode(markerCharCode);
		const itemLines = [nextLine, 0];
		token.map = itemLines;
		if (isOrdered) token.info = state.src.slice(start, posAfterMarker - 1);
		const oldTight = state.tight;
		const oldTShift = state.tShift[nextLine];
		const oldSCount = state.sCount[nextLine];
		const oldListIndent = state.listIndent;
		state.listIndent = state.blkIndent;
		state.blkIndent = indent;
		state.tight = true;
		state.tShift[nextLine] = contentStart - state.bMarks[nextLine];
		state.sCount[nextLine] = offset;
		if (contentStart >= max && state.isEmpty(nextLine + 1)) state.line = Math.min(state.line + 2, endLine);
		else state.md.block.tokenize(state, nextLine, endLine, true);
		if (!state.tight || prevEmptyEnd) tight = false;
		prevEmptyEnd = state.line - nextLine > 1 && state.isEmpty(state.line - 1);
		state.blkIndent = state.listIndent;
		state.listIndent = oldListIndent;
		state.tShift[nextLine] = oldTShift;
		state.sCount[nextLine] = oldSCount;
		state.tight = oldTight;
		token = state.push("list_item_close", "li", -1);
		token.markup = String.fromCharCode(markerCharCode);
		nextLine = state.line;
		itemLines[1] = nextLine;
		if (nextLine >= endLine) break;
		if (state.sCount[nextLine] < state.blkIndent) break;
		if (state.sCount[nextLine] - state.blkIndent >= 4) break;
		let terminate = false;
		for (let i = 0, l = terminatorRules.length; i < l; i++) if (terminatorRules[i](state, nextLine, endLine, true)) {
			terminate = true;
			break;
		}
		if (terminate) break;
		if (isOrdered) {
			posAfterMarker = skipOrderedListMarker(state, nextLine);
			if (posAfterMarker < 0) break;
			start = state.bMarks[nextLine] + state.tShift[nextLine];
		} else {
			posAfterMarker = skipBulletListMarker(state, nextLine);
			if (posAfterMarker < 0) break;
		}
		if (markerCharCode !== state.src.charCodeAt(posAfterMarker - 1)) break;
	}
	if (isOrdered) token = state.push("ordered_list_close", "ol", -1);
	else token = state.push("bullet_list_close", "ul", -1);
	token.markup = String.fromCharCode(markerCharCode);
	listLines[1] = nextLine;
	state.line = nextLine;
	state.parentType = oldParentType;
	if (tight) markTightParagraphs(state, listTokIdx);
	return true;
}
function reference(state, startLine, _endLine, silent) {
	let pos = state.bMarks[startLine] + state.tShift[startLine];
	let max = state.eMarks[startLine];
	let nextLine = startLine + 1;
	if (state.sCount[startLine] - state.blkIndent >= 4) return false;
	if (state.src.charCodeAt(pos) !== 91) return false;
	function getNextLine(nextLine) {
		const endLine = state.lineMax;
		if (nextLine >= endLine || state.isEmpty(nextLine)) return null;
		let isContinuation = false;
		if (state.sCount[nextLine] - state.blkIndent > 3) isContinuation = true;
		if (state.sCount[nextLine] < 0) isContinuation = true;
		if (!isContinuation) {
			const terminatorRules = state.md.block.ruler.getRules("reference");
			const oldParentType = state.parentType;
			state.parentType = "reference";
			let terminate = false;
			for (let i = 0, l = terminatorRules.length; i < l; i++) if (terminatorRules[i](state, nextLine, endLine, true)) {
				terminate = true;
				break;
			}
			state.parentType = oldParentType;
			if (terminate) return null;
		}
		const pos = state.bMarks[nextLine] + state.tShift[nextLine];
		const max = state.eMarks[nextLine];
		return state.src.slice(pos, max + 1);
	}
	let str = state.src.slice(pos, max + 1);
	max = str.length;
	let labelEnd = -1;
	for (pos = 1; pos < max; pos++) {
		const ch = str.charCodeAt(pos);
		if (ch === 91) return false;
		else if (ch === 93) {
			labelEnd = pos;
			break;
		} else if (ch === 10) {
			const lineContent = getNextLine(nextLine);
			if (lineContent !== null) {
				str += lineContent;
				max = str.length;
				nextLine++;
			}
		} else if (ch === 92) {
			pos++;
			if (pos < max && str.charCodeAt(pos) === 10) {
				const lineContent = getNextLine(nextLine);
				if (lineContent !== null) {
					str += lineContent;
					max = str.length;
					nextLine++;
				}
			}
		}
	}
	if (labelEnd < 0 || str.charCodeAt(labelEnd + 1) !== 58) return false;
	for (pos = labelEnd + 2; pos < max; pos++) {
		const ch = str.charCodeAt(pos);
		if (ch === 10) {
			const lineContent = getNextLine(nextLine);
			if (lineContent !== null) {
				str += lineContent;
				max = str.length;
				nextLine++;
			}
		} else if (isSpace(ch)) {} else break;
	}
	const destRes = state.md.helpers.parseLinkDestination(str, pos, max);
	if (!destRes.ok) return false;
	const href = state.md.normalizeLink(destRes.str);
	if (!state.md.validateLink(href)) return false;
	pos = destRes.pos;
	const destEndPos = pos;
	const destEndLineNo = nextLine;
	const start = pos;
	for (; pos < max; pos++) {
		const ch = str.charCodeAt(pos);
		if (ch === 10) {
			const lineContent = getNextLine(nextLine);
			if (lineContent !== null) {
				str += lineContent;
				max = str.length;
				nextLine++;
			}
		} else if (isSpace(ch)) {} else break;
	}
	let titleRes = state.md.helpers.parseLinkTitle(str, pos, max);
	while (titleRes.can_continue) {
		const lineContent = getNextLine(nextLine);
		if (lineContent === null) break;
		str += lineContent;
		pos = max;
		max = str.length;
		nextLine++;
		titleRes = state.md.helpers.parseLinkTitle(str, pos, max, titleRes);
	}
	let title;
	if (pos < max && start !== pos && titleRes.ok) {
		title = titleRes.str;
		pos = titleRes.pos;
	} else {
		title = "";
		pos = destEndPos;
		nextLine = destEndLineNo;
	}
	while (pos < max) {
		if (!isSpace(str.charCodeAt(pos))) break;
		pos++;
	}
	if (pos < max && str.charCodeAt(pos) !== 10) {
		if (title) {
			title = "";
			pos = destEndPos;
			nextLine = destEndLineNo;
			while (pos < max) {
				if (!isSpace(str.charCodeAt(pos))) break;
				pos++;
			}
		}
	}
	if (pos < max && str.charCodeAt(pos) !== 10) return false;
	const label = normalizeReference(str.slice(1, labelEnd));
	if (!label) return false;
	/* istanbul ignore if */
	if (silent) return true;
	if (typeof state.env.references === "undefined") state.env.references = {};
	if (typeof state.env.references[label] === "undefined") state.env.references[label] = {
		title,
		href
	};
	state.line = nextLine;
	return true;
}
var html_blocks_default = [
	"address",
	"article",
	"aside",
	"base",
	"basefont",
	"blockquote",
	"body",
	"caption",
	"center",
	"col",
	"colgroup",
	"dd",
	"details",
	"dialog",
	"dir",
	"div",
	"dl",
	"dt",
	"fieldset",
	"figcaption",
	"figure",
	"footer",
	"form",
	"frame",
	"frameset",
	"h1",
	"h2",
	"h3",
	"h4",
	"h5",
	"h6",
	"head",
	"header",
	"hr",
	"html",
	"iframe",
	"legend",
	"li",
	"link",
	"main",
	"menu",
	"menuitem",
	"nav",
	"noframes",
	"ol",
	"optgroup",
	"option",
	"p",
	"param",
	"search",
	"section",
	"summary",
	"table",
	"tbody",
	"td",
	"tfoot",
	"th",
	"thead",
	"title",
	"tr",
	"track",
	"ul"
];
const HTML_TAG_RE = /* @__PURE__ */ new RegExp("^(?:<[A-Za-z][A-Za-z0-9\\-]*(?:\\s+[a-zA-Z_:][a-zA-Z0-9:._-]*(?:\\s*=\\s*(?:[^\"'=<>`\\x00-\\x20]+|'[^']*'|\"[^\"]*\"))?)*\\s*\\/?>|<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>|<!---?>|<!--(?:[^-]|-[^-]|--[^>])*-->|<[?][\\s\\S]*?[?]>|<![A-Za-z][^>]*>|<!\\[CDATA\\[[\\s\\S]*?\\]\\]>)");
const HTML_OPEN_CLOSE_TAG_RE = /* @__PURE__ */ new RegExp("^(?:<[A-Za-z][A-Za-z0-9\\-]*(?:\\s+[a-zA-Z_:][a-zA-Z0-9:._-]*(?:\\s*=\\s*(?:[^\"'=<>`\\x00-\\x20]+|'[^']*'|\"[^\"]*\"))?)*\\s*\\/?>|<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>)");
const HTML_SEQUENCES = [
	[
		/^<(script|pre|style|textarea)(?=(\s|>|$))/i,
		/<\/(script|pre|style|textarea)>/i,
		true
	],
	[
		/^<!--/,
		/-->/,
		true
	],
	[
		/^<\?/,
		/\?>/,
		true
	],
	[
		/^<![A-Z]/,
		/>/,
		true
	],
	[
		/^<!\[CDATA\[/,
		/\]\]>/,
		true
	],
	[
		new RegExp("^</?(" + html_blocks_default.join("|") + ")(?=(\\s|/?>|$))", "i"),
		/^$/,
		true
	],
	[
		new RegExp(HTML_OPEN_CLOSE_TAG_RE.source + "\\s*$"),
		/^$/,
		false
	]
];
function html_block(state, startLine, endLine, silent) {
	let pos = state.bMarks[startLine] + state.tShift[startLine];
	let max = state.eMarks[startLine];
	if (state.sCount[startLine] - state.blkIndent >= 4) return false;
	if (!state.md.options.html) return false;
	if (state.src.charCodeAt(pos) !== 60) return false;
	let lineText = state.src.slice(pos, max);
	let i = 0;
	for (; i < HTML_SEQUENCES.length; i++) if (HTML_SEQUENCES[i][0].test(lineText)) break;
	if (i === HTML_SEQUENCES.length) return false;
	if (silent) return HTML_SEQUENCES[i][2];
	let nextLine = startLine + 1;
	const endsOnBlankLine = HTML_SEQUENCES[i][1].test("");
	if (!HTML_SEQUENCES[i][1].test(lineText)) for (; nextLine < endLine; nextLine++) {
		if (state.sCount[nextLine] < state.blkIndent) {
			if (endsOnBlankLine || !state.isEmpty(nextLine)) break;
		}
		pos = state.bMarks[nextLine] + state.tShift[nextLine];
		max = state.eMarks[nextLine];
		lineText = state.src.slice(pos, max);
		if (HTML_SEQUENCES[i][1].test(lineText)) {
			if (lineText.length !== 0) nextLine++;
			break;
		}
	}
	state.line = nextLine;
	const token = state.push("html_block", "", 0);
	token.map = [startLine, nextLine];
	token.content = state.getLines(startLine, nextLine, state.blkIndent, true);
	return true;
}
function heading(state, startLine, endLine, silent) {
	let pos = state.bMarks[startLine] + state.tShift[startLine];
	let max = state.eMarks[startLine];
	if (state.sCount[startLine] - state.blkIndent >= 4) return false;
	let ch = state.src.charCodeAt(pos);
	if (ch !== 35 || pos >= max) return false;
	let level = 1;
	ch = state.src.charCodeAt(++pos);
	while (ch === 35 && pos < max && level <= 6) {
		level++;
		ch = state.src.charCodeAt(++pos);
	}
	if (level > 6 || pos < max && !isSpace(ch)) return false;
	if (silent) return true;
	max = state.skipSpacesBack(max, pos);
	const tmp = state.skipCharsBack(max, 35, pos);
	if (tmp > pos && isSpace(state.src.charCodeAt(tmp - 1))) max = tmp;
	state.line = startLine + 1;
	const token_o = state.push("heading_open", "h" + String(level), 1);
	token_o.markup = "########".slice(0, level);
	token_o.map = [startLine, state.line];
	const token_i = state.push("inline", "", 0);
	token_i.content = asciiTrim(state.src.slice(pos, max));
	token_i.map = [startLine, state.line];
	token_i.children = [];
	const token_c = state.push("heading_close", "h" + String(level), -1);
	token_c.markup = "########".slice(0, level);
	return true;
}
function lheading(state, startLine, endLine) {
	const terminatorRules = state.md.block.ruler.getRules("paragraph");
	if (state.sCount[startLine] - state.blkIndent >= 4) return false;
	const oldParentType = state.parentType;
	state.parentType = "paragraph";
	let level = 0;
	let marker;
	let nextLine = startLine + 1;
	for (; nextLine < endLine && !state.isEmpty(nextLine); nextLine++) {
		if (state.sCount[nextLine] - state.blkIndent > 3) continue;
		if (state.sCount[nextLine] >= state.blkIndent) {
			let pos = state.bMarks[nextLine] + state.tShift[nextLine];
			const max = state.eMarks[nextLine];
			if (pos < max) {
				marker = state.src.charCodeAt(pos);
				if (marker === 45 || marker === 61) {
					pos = state.skipChars(pos, marker);
					pos = state.skipSpaces(pos);
					if (pos >= max) {
						level = marker === 61 ? 1 : 2;
						break;
					}
				}
			}
		}
		if (state.sCount[nextLine] < 0) continue;
		let terminate = false;
		for (let i = 0, l = terminatorRules.length; i < l; i++) if (terminatorRules[i](state, nextLine, endLine, true)) {
			terminate = true;
			break;
		}
		if (terminate) break;
	}
	if (!level) {
		state.parentType = oldParentType;
		return false;
	}
	const content = asciiTrim(state.getLines(startLine, nextLine, state.blkIndent, false));
	state.line = nextLine + 1;
	const token_o = state.push("heading_open", "h" + String(level), 1);
	token_o.markup = String.fromCharCode(marker);
	token_o.map = [startLine, state.line];
	const token_i = state.push("inline", "", 0);
	token_i.content = content;
	token_i.map = [startLine, state.line - 1];
	token_i.children = [];
	const token_c = state.push("heading_close", "h" + String(level), -1);
	token_c.markup = String.fromCharCode(marker);
	state.parentType = oldParentType;
	return true;
}
function paragraph(state, startLine, endLine) {
	const terminatorRules = state.md.block.ruler.getRules("paragraph");
	const oldParentType = state.parentType;
	let nextLine = startLine + 1;
	state.parentType = "paragraph";
	for (; nextLine < endLine && !state.isEmpty(nextLine); nextLine++) {
		if (state.sCount[nextLine] - state.blkIndent > 3) continue;
		if (state.sCount[nextLine] < 0) continue;
		let terminate = false;
		for (let i = 0, l = terminatorRules.length; i < l; i++) if (terminatorRules[i](state, nextLine, endLine, true)) {
			terminate = true;
			break;
		}
		if (terminate) break;
	}
	const content = asciiTrim(state.getLines(startLine, nextLine, state.blkIndent, false));
	state.line = nextLine;
	const token_o = state.push("paragraph_open", "p", 1);
	token_o.map = [startLine, state.line];
	const token_i = state.push("inline", "", 0);
	token_i.content = content;
	token_i.map = [startLine, state.line];
	token_i.children = [];
	state.push("paragraph_close", "p", -1);
	state.parentType = oldParentType;
	return true;
}
/** internal
* class ParserBlock
*
* Block-level tokenizer.
**/
const _rules$1 = [
	[
		"table",
		table,
		["paragraph", "reference"]
	],
	["code", code],
	[
		"fence",
		fence,
		[
			"paragraph",
			"reference",
			"blockquote",
			"list"
		]
	],
	[
		"blockquote",
		blockquote,
		[
			"paragraph",
			"reference",
			"blockquote",
			"list"
		]
	],
	[
		"hr",
		hr,
		[
			"paragraph",
			"reference",
			"blockquote",
			"list"
		]
	],
	[
		"list",
		list,
		[
			"paragraph",
			"reference",
			"blockquote"
		]
	],
	["reference", reference],
	[
		"html_block",
		html_block,
		[
			"paragraph",
			"reference",
			"blockquote"
		]
	],
	[
		"heading",
		heading,
		[
			"paragraph",
			"reference",
			"blockquote"
		]
	],
	["lheading", lheading],
	["paragraph", paragraph]
];
/**
* new ParserBlock()
**/
function ParserBlock() {
	/**
	* ParserBlock#ruler -> Ruler
	*
	* [[Ruler]] instance. Keep configuration of block rules.
	**/
	this.ruler = new Ruler();
	for (let i = 0; i < _rules$1.length; i++) this.ruler.push(_rules$1[i][0], _rules$1[i][1], { alt: (_rules$1[i][2] || []).slice() });
}
ParserBlock.prototype.tokenize = function(state, startLine, endLine) {
	const rules = this.ruler.getRules("");
	const len = rules.length;
	const maxNesting = state.md.options.maxNesting;
	let line = startLine;
	let hasEmptyLines = false;
	while (line < endLine) {
		state.line = line = state.skipEmptyLines(line);
		if (line >= endLine) break;
		if (state.sCount[line] < state.blkIndent) break;
		if (state.level >= maxNesting) {
			state.line = endLine;
			break;
		}
		const prevLine = state.line;
		let ok = false;
		for (let i = 0; i < len; i++) {
			ok = rules[i](state, line, endLine, false);
			if (ok) {
				if (prevLine >= state.line) throw new Error("block rule didn't increment state.line");
				break;
			}
		}
		if (!ok) throw new Error("none of the block rules matched");
		state.tight = !hasEmptyLines;
		if (state.isEmpty(state.line - 1)) hasEmptyLines = true;
		line = state.line;
		if (line < endLine && state.isEmpty(line)) {
			hasEmptyLines = true;
			line++;
			state.line = line;
		}
	}
};
/**
* ParserBlock.parse(str, md, env, outTokens)
*
* Process input string and push block tokens into `outTokens`
**/
ParserBlock.prototype.parse = function(src, md, env, outTokens) {
	if (!src) return;
	const state = new this.State(src, md, env, outTokens);
	this.tokenize(state, state.line, state.lineMax);
};
ParserBlock.prototype.State = StateBlock;
function StateInline(src, md, env, outTokens) {
	this.src = src;
	this.env = env;
	this.md = md;
	this.tokens = outTokens;
	this.tokens_meta = Array(outTokens.length);
	this.pos = 0;
	this.posMax = this.src.length;
	this.level = 0;
	this.pending = "";
	this.pendingLevel = 0;
	this.cache = {};
	this.delimiters = [];
	this._prev_delimiters = [];
	this.backticks = {};
	this.backticksScanned = false;
	this.linkLevel = 0;
}
StateInline.prototype.pushPending = function() {
	const token = new Token("text", "", 0);
	token.content = this.pending;
	token.level = this.pendingLevel;
	this.tokens.push(token);
	this.pending = "";
	return token;
};
StateInline.prototype.push = function(type, tag, nesting) {
	if (this.pending) this.pushPending();
	const token = new Token(type, tag, nesting);
	let token_meta = null;
	if (nesting < 0) {
		this.level--;
		this.delimiters = this._prev_delimiters.pop();
	}
	token.level = this.level;
	if (nesting > 0) {
		this.level++;
		this._prev_delimiters.push(this.delimiters);
		this.delimiters = [];
		token_meta = { delimiters: this.delimiters };
	}
	this.pendingLevel = this.level;
	this.tokens.push(token);
	this.tokens_meta.push(token_meta);
	return token;
};
StateInline.prototype.scanDelims = function(start, canSplitWord) {
	const max = this.posMax;
	const marker = this.src.charCodeAt(start);
	let lastChar;
	if (start === 0) lastChar = 32;
	else if (start === 1) {
		lastChar = this.src.charCodeAt(0);
		if ((lastChar & 63488) === 55296) lastChar = 65533;
	} else {
		lastChar = this.src.charCodeAt(start - 1);
		if ((lastChar & 64512) === 56320) {
			const highSurr = this.src.charCodeAt(start - 2);
			lastChar = (highSurr & 64512) === 55296 ? 65536 + (highSurr - 55296 << 10) + (lastChar - 56320) : 65533;
		} else if ((lastChar & 64512) === 55296) lastChar = 65533;
	}
	let pos = start;
	while (pos < max && this.src.charCodeAt(pos) === marker) pos++;
	const count = pos - start;
	let nextChar = pos < max ? this.src.charCodeAt(pos) : 32;
	if ((nextChar & 64512) === 55296) {
		const lowSurr = this.src.charCodeAt(pos + 1);
		nextChar = (lowSurr & 64512) === 56320 ? 65536 + (nextChar - 55296 << 10) + (lowSurr - 56320) : 65533;
	} else if ((nextChar & 64512) === 56320) nextChar = 65533;
	const isLastPunctChar = isMdAsciiPunct(lastChar) || isPunctCharCode(lastChar);
	const isNextPunctChar = isMdAsciiPunct(nextChar) || isPunctCharCode(nextChar);
	const isLastWhiteSpace = isWhiteSpace(lastChar);
	const isNextWhiteSpace = isWhiteSpace(nextChar);
	const left_flanking = !isNextWhiteSpace && (!isNextPunctChar || isLastWhiteSpace || isLastPunctChar);
	const right_flanking = !isLastWhiteSpace && (!isLastPunctChar || isNextWhiteSpace || isNextPunctChar);
	return {
		can_open: left_flanking && (canSplitWord || !right_flanking || isLastPunctChar),
		can_close: right_flanking && (canSplitWord || !left_flanking || isNextPunctChar),
		length: count
	};
};
StateInline.prototype.Token = Token;
function isTerminatorChar(ch) {
	switch (ch) {
		case 10:
		case 33:
		case 35:
		case 36:
		case 37:
		case 38:
		case 42:
		case 43:
		case 45:
		case 58:
		case 60:
		case 61:
		case 62:
		case 64:
		case 91:
		case 92:
		case 93:
		case 94:
		case 95:
		case 96:
		case 123:
		case 125:
		case 126: return true;
		default: return false;
	}
}
function text(state, silent) {
	let pos = state.pos;
	while (pos < state.posMax && !isTerminatorChar(state.src.charCodeAt(pos))) pos++;
	if (pos === state.pos) return false;
	if (!silent) state.pending += state.src.slice(state.pos, pos);
	state.pos = pos;
	return true;
}
const SCHEME_RE = /(?:^|[^a-z0-9.+-])([a-z][a-z0-9.+-]*)$/i;
function linkify(state, silent) {
	if (!state.md.options.linkify) return false;
	if (state.linkLevel > 0) return false;
	const pos = state.pos;
	const max = state.posMax;
	if (pos + 3 > max) return false;
	if (state.src.charCodeAt(pos) !== 58) return false;
	if (state.src.charCodeAt(pos + 1) !== 47) return false;
	if (state.src.charCodeAt(pos + 2) !== 47) return false;
	const match = state.pending.match(SCHEME_RE);
	if (!match) return false;
	const proto = match[1];
	const link = state.md.linkify.matchAtStart(state.src.slice(pos - proto.length));
	if (!link) return false;
	let url = link.url;
	if (url.length <= proto.length) return false;
	let urlEnd = url.length;
	while (urlEnd > 0 && url.charCodeAt(urlEnd - 1) === 42) urlEnd--;
	if (urlEnd !== url.length) url = url.slice(0, urlEnd);
	const fullUrl = state.md.normalizeLink(url);
	if (!state.md.validateLink(fullUrl)) return false;
	if (!silent) {
		state.pending = state.pending.slice(0, -proto.length);
		const token_o = state.push("link_open", "a", 1);
		token_o.attrs = [["href", fullUrl]];
		token_o.markup = "linkify";
		token_o.info = "auto";
		const token_t = state.push("text", "", 0);
		token_t.content = state.md.normalizeLinkText(url);
		const token_c = state.push("link_close", "a", -1);
		token_c.markup = "linkify";
		token_c.info = "auto";
	}
	state.pos += url.length - proto.length;
	return true;
}
function newline(state, silent) {
	let pos = state.pos;
	if (state.src.charCodeAt(pos) !== 10) return false;
	const pmax = state.pending.length - 1;
	const max = state.posMax;
	if (!silent) {
		if (pmax >= 0 && state.pending.charCodeAt(pmax) === 32) {
			if (pmax >= 1 && state.pending.charCodeAt(pmax - 1) === 32) {
				let ws = pmax - 1;
				while (ws >= 1 && state.pending.charCodeAt(ws - 1) === 32) ws--;
				state.pending = state.pending.slice(0, ws);
				state.push("hardbreak", "br", 0);
			} else {
				state.pending = state.pending.slice(0, -1);
				state.push("softbreak", "br", 0);
			}
		} else state.push("softbreak", "br", 0);
	}
	pos++;
	while (pos < max && isSpace(state.src.charCodeAt(pos))) pos++;
	state.pos = pos;
	return true;
}
const ESCAPED = [];
for (let i = 0; i < 256; i++) ESCAPED.push(0);
"\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function(ch) {
	ESCAPED[ch.charCodeAt(0)] = 1;
});
function escape(state, silent) {
	let pos = state.pos;
	const max = state.posMax;
	if (state.src.charCodeAt(pos) !== 92) return false;
	pos++;
	if (pos >= max) return false;
	let ch1 = state.src.charCodeAt(pos);
	if (ch1 === 10) {
		if (!silent) state.push("hardbreak", "br", 0);
		pos++;
		while (pos < max) {
			ch1 = state.src.charCodeAt(pos);
			if (!isSpace(ch1)) break;
			pos++;
		}
		state.pos = pos;
		return true;
	}
	if (ch1 === 32) {
		if (!silent) {
			const token = state.push("text_special", "", 0);
			token.content = "\\";
			token.markup = "\\";
			token.info = "escape";
		}
		state.pos = pos;
		return true;
	}
	let escapedStr = state.src[pos];
	if (ch1 >= 55296 && ch1 <= 56319 && pos + 1 < max) {
		const ch2 = state.src.charCodeAt(pos + 1);
		if (ch2 >= 56320 && ch2 <= 57343) {
			escapedStr += state.src[pos + 1];
			pos++;
		}
	}
	const origStr = "\\" + escapedStr;
	if (!silent) {
		const token = state.push("text_special", "", 0);
		if (ch1 < 256 && ESCAPED[ch1] !== 0) token.content = escapedStr;
		else token.content = origStr;
		token.markup = origStr;
		token.info = "escape";
	}
	state.pos = pos + 1;
	return true;
}
function backtick(state, silent) {
	let pos = state.pos;
	if (state.src.charCodeAt(pos) !== 96) return false;
	const start = pos;
	pos++;
	const max = state.posMax;
	while (pos < max && state.src.charCodeAt(pos) === 96) pos++;
	const marker = state.src.slice(start, pos);
	const openerLength = marker.length;
	if (state.backticksScanned && (state.backticks[openerLength] || 0) <= start) {
		if (!silent) state.pending += marker;
		state.pos += openerLength;
		return true;
	}
	let matchEnd = pos;
	let matchStart;
	while ((matchStart = state.src.indexOf("`", matchEnd)) !== -1) {
		matchEnd = matchStart + 1;
		while (matchEnd < max && state.src.charCodeAt(matchEnd) === 96) matchEnd++;
		const closerLength = matchEnd - matchStart;
		if (closerLength === openerLength) {
			if (!silent) {
				const token = state.push("code_inline", "code", 0);
				token.markup = marker;
				token.content = state.src.slice(pos, matchStart).replace(/\n/g, " ").replace(/^ (.+) $/, "$1");
			}
			state.pos = matchEnd;
			return true;
		}
		state.backticks[closerLength] = matchStart;
	}
	state.backticksScanned = true;
	if (!silent) state.pending += marker;
	state.pos += openerLength;
	return true;
}
function strikethrough_tokenize(state, silent) {
	const start = state.pos;
	const marker = state.src.charCodeAt(start);
	if (silent) return false;
	if (marker !== 126) return false;
	const scanned = state.scanDelims(state.pos, true);
	let len = scanned.length;
	const ch = String.fromCharCode(marker);
	if (len < 2) return false;
	let token;
	if (len % 2) {
		token = state.push("text", "", 0);
		token.content = ch;
		len--;
	}
	for (let i = 0; i < len; i += 2) {
		token = state.push("text", "", 0);
		token.content = ch + ch;
		state.delimiters.push({
			marker,
			length: 0,
			token: state.tokens.length - 1,
			end: -1,
			open: scanned.can_open,
			close: scanned.can_close
		});
	}
	state.pos += scanned.length;
	return true;
}
function postProcess$1(state, delimiters) {
	let token;
	const loneMarkers = [];
	const max = delimiters.length;
	for (let i = 0; i < max; i++) {
		const startDelim = delimiters[i];
		if (startDelim.marker !== 126) continue;
		if (startDelim.end === -1) continue;
		const endDelim = delimiters[startDelim.end];
		token = state.tokens[startDelim.token];
		token.type = "s_open";
		token.tag = "s";
		token.nesting = 1;
		token.markup = "~~";
		token.content = "";
		token = state.tokens[endDelim.token];
		token.type = "s_close";
		token.tag = "s";
		token.nesting = -1;
		token.markup = "~~";
		token.content = "";
		if (state.tokens[endDelim.token - 1].type === "text" && state.tokens[endDelim.token - 1].content === "~") loneMarkers.push(endDelim.token - 1);
	}
	while (loneMarkers.length) {
		const i = loneMarkers.pop();
		let j = i + 1;
		while (j < state.tokens.length && state.tokens[j].type === "s_close") j++;
		j--;
		if (i !== j) {
			token = state.tokens[j];
			state.tokens[j] = state.tokens[i];
			state.tokens[i] = token;
		}
	}
}
function strikethrough_postProcess(state) {
	const tokens_meta = state.tokens_meta;
	const max = state.tokens_meta.length;
	postProcess$1(state, state.delimiters);
	for (let curr = 0; curr < max; curr++) if (tokens_meta[curr] && tokens_meta[curr].delimiters) postProcess$1(state, tokens_meta[curr].delimiters);
}
var strikethrough_default = {
	tokenize: strikethrough_tokenize,
	postProcess: strikethrough_postProcess
};
function emphasis_tokenize(state, silent) {
	const start = state.pos;
	const marker = state.src.charCodeAt(start);
	if (silent) return false;
	if (marker !== 95 && marker !== 42) return false;
	const scanned = state.scanDelims(state.pos, marker === 42);
	for (let i = 0; i < scanned.length; i++) {
		const token = state.push("text", "", 0);
		token.content = String.fromCharCode(marker);
		state.delimiters.push({
			marker,
			length: scanned.length,
			token: state.tokens.length - 1,
			end: -1,
			open: scanned.can_open,
			close: scanned.can_close
		});
	}
	state.pos += scanned.length;
	return true;
}
function postProcess(state, delimiters) {
	const max = delimiters.length;
	for (let i = max - 1; i >= 0; i--) {
		const startDelim = delimiters[i];
		if (startDelim.marker !== 95 && startDelim.marker !== 42) continue;
		if (startDelim.end === -1) continue;
		const endDelim = delimiters[startDelim.end];
		const isStrong = i > 0 && delimiters[i - 1].end === startDelim.end + 1 && delimiters[i - 1].marker === startDelim.marker && delimiters[i - 1].token === startDelim.token - 1 && delimiters[startDelim.end + 1].token === endDelim.token + 1;
		const ch = String.fromCharCode(startDelim.marker);
		const token_o = state.tokens[startDelim.token];
		token_o.type = isStrong ? "strong_open" : "em_open";
		token_o.tag = isStrong ? "strong" : "em";
		token_o.nesting = 1;
		token_o.markup = isStrong ? ch + ch : ch;
		token_o.content = "";
		const token_c = state.tokens[endDelim.token];
		token_c.type = isStrong ? "strong_close" : "em_close";
		token_c.tag = isStrong ? "strong" : "em";
		token_c.nesting = -1;
		token_c.markup = isStrong ? ch + ch : ch;
		token_c.content = "";
		if (isStrong) {
			state.tokens[delimiters[i - 1].token].content = "";
			state.tokens[delimiters[startDelim.end + 1].token].content = "";
			i--;
		}
	}
}
function emphasis_post_process(state) {
	const tokens_meta = state.tokens_meta;
	const max = state.tokens_meta.length;
	postProcess(state, state.delimiters);
	for (let curr = 0; curr < max; curr++) if (tokens_meta[curr] && tokens_meta[curr].delimiters) postProcess(state, tokens_meta[curr].delimiters);
}
var emphasis_default = {
	tokenize: emphasis_tokenize,
	postProcess: emphasis_post_process
};
function link(state, silent) {
	let code, label, res, ref;
	let href = "";
	let title = "";
	let start = state.pos;
	let parseReference = true;
	if (state.src.charCodeAt(state.pos) !== 91) return false;
	const oldPos = state.pos;
	const max = state.posMax;
	const labelStart = state.pos + 1;
	const labelEnd = state.md.helpers.parseLinkLabel(state, state.pos, true);
	if (labelEnd < 0) return false;
	let pos = labelEnd + 1;
	if (pos < max && state.src.charCodeAt(pos) === 40) {
		parseReference = false;
		pos++;
		for (; pos < max; pos++) {
			code = state.src.charCodeAt(pos);
			if (!isSpace(code) && code !== 10) break;
		}
		if (pos >= max) return false;
		start = pos;
		res = state.md.helpers.parseLinkDestination(state.src, pos, state.posMax);
		if (res.ok) {
			href = state.md.normalizeLink(res.str);
			if (state.md.validateLink(href)) pos = res.pos;
			else href = "";
			start = pos;
			for (; pos < max; pos++) {
				code = state.src.charCodeAt(pos);
				if (!isSpace(code) && code !== 10) break;
			}
			res = state.md.helpers.parseLinkTitle(state.src, pos, state.posMax);
			if (pos < max && start !== pos && res.ok) {
				title = res.str;
				pos = res.pos;
				for (; pos < max; pos++) {
					code = state.src.charCodeAt(pos);
					if (!isSpace(code) && code !== 10) break;
				}
			}
		}
		if (pos >= max || state.src.charCodeAt(pos) !== 41) parseReference = true;
		pos++;
	}
	if (parseReference) {
		if (typeof state.env.references === "undefined") return false;
		if (pos < max && state.src.charCodeAt(pos) === 91) {
			start = pos + 1;
			pos = state.md.helpers.parseLinkLabel(state, pos);
			if (pos >= 0) label = state.src.slice(start, pos++);
			else pos = labelEnd + 1;
		} else pos = labelEnd + 1;
		if (!label) label = state.src.slice(labelStart, labelEnd);
		ref = state.env.references[normalizeReference(label)];
		if (!ref) {
			state.pos = oldPos;
			return false;
		}
		href = ref.href;
		title = ref.title;
	}
	if (!silent) {
		state.pos = labelStart;
		state.posMax = labelEnd;
		const token_o = state.push("link_open", "a", 1);
		const attrs = [["href", href]];
		token_o.attrs = attrs;
		if (title) attrs.push(["title", title]);
		state.linkLevel++;
		state.md.inline.tokenize(state);
		state.linkLevel--;
		state.push("link_close", "a", -1);
	}
	state.pos = pos;
	state.posMax = max;
	return true;
}
function image(state, silent) {
	let code, content, label, pos, ref, res, title, start;
	let href = "";
	const oldPos = state.pos;
	const max = state.posMax;
	if (state.src.charCodeAt(state.pos) !== 33) return false;
	if (state.src.charCodeAt(state.pos + 1) !== 91) return false;
	const labelStart = state.pos + 2;
	const labelEnd = state.md.helpers.parseLinkLabel(state, state.pos + 1, false);
	if (labelEnd < 0) return false;
	pos = labelEnd + 1;
	if (pos < max && state.src.charCodeAt(pos) === 40) {
		pos++;
		for (; pos < max; pos++) {
			code = state.src.charCodeAt(pos);
			if (!isSpace(code) && code !== 10) break;
		}
		if (pos >= max) return false;
		start = pos;
		res = state.md.helpers.parseLinkDestination(state.src, pos, state.posMax);
		if (res.ok) {
			href = state.md.normalizeLink(res.str);
			if (state.md.validateLink(href)) pos = res.pos;
			else href = "";
		}
		start = pos;
		for (; pos < max; pos++) {
			code = state.src.charCodeAt(pos);
			if (!isSpace(code) && code !== 10) break;
		}
		res = state.md.helpers.parseLinkTitle(state.src, pos, state.posMax);
		if (pos < max && start !== pos && res.ok) {
			title = res.str;
			pos = res.pos;
			for (; pos < max; pos++) {
				code = state.src.charCodeAt(pos);
				if (!isSpace(code) && code !== 10) break;
			}
		} else title = "";
		if (pos >= max || state.src.charCodeAt(pos) !== 41) {
			state.pos = oldPos;
			return false;
		}
		pos++;
	} else {
		if (typeof state.env.references === "undefined") return false;
		if (pos < max && state.src.charCodeAt(pos) === 91) {
			start = pos + 1;
			pos = state.md.helpers.parseLinkLabel(state, pos);
			if (pos >= 0) label = state.src.slice(start, pos++);
			else pos = labelEnd + 1;
		} else pos = labelEnd + 1;
		if (!label) label = state.src.slice(labelStart, labelEnd);
		ref = state.env.references[normalizeReference(label)];
		if (!ref) {
			state.pos = oldPos;
			return false;
		}
		href = ref.href;
		title = ref.title;
	}
	if (!silent) {
		content = state.src.slice(labelStart, labelEnd);
		const tokens = [];
		state.md.inline.parse(content, state.md, state.env, tokens);
		const token = state.push("image", "img", 0);
		const attrs = [["src", href], ["alt", ""]];
		token.attrs = attrs;
		token.children = tokens;
		token.content = content;
		if (title) attrs.push(["title", title]);
	}
	state.pos = pos;
	state.posMax = max;
	return true;
}
const EMAIL_RE = /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/;
const AUTOLINK_RE = /^([a-zA-Z][a-zA-Z0-9+.-]{1,31}):([^<>\x00-\x20]*)$/;
function autolink(state, silent) {
	let pos = state.pos;
	if (state.src.charCodeAt(pos) !== 60) return false;
	const start = state.pos;
	const max = state.posMax;
	for (;;) {
		if (++pos >= max) return false;
		const ch = state.src.charCodeAt(pos);
		if (ch === 60) return false;
		if (ch === 62) break;
	}
	const url = state.src.slice(start + 1, pos);
	if (AUTOLINK_RE.test(url)) {
		const fullUrl = state.md.normalizeLink(url);
		if (!state.md.validateLink(fullUrl)) return false;
		if (!silent) {
			const token_o = state.push("link_open", "a", 1);
			token_o.attrs = [["href", fullUrl]];
			token_o.markup = "autolink";
			token_o.info = "auto";
			const token_t = state.push("text", "", 0);
			token_t.content = state.md.normalizeLinkText(url);
			const token_c = state.push("link_close", "a", -1);
			token_c.markup = "autolink";
			token_c.info = "auto";
		}
		state.pos += url.length + 2;
		return true;
	}
	if (EMAIL_RE.test(url)) {
		const fullUrl = state.md.normalizeLink("mailto:" + url);
		if (!state.md.validateLink(fullUrl)) return false;
		if (!silent) {
			const token_o = state.push("link_open", "a", 1);
			token_o.attrs = [["href", fullUrl]];
			token_o.markup = "autolink";
			token_o.info = "auto";
			const token_t = state.push("text", "", 0);
			token_t.content = state.md.normalizeLinkText(url);
			const token_c = state.push("link_close", "a", -1);
			token_c.markup = "autolink";
			token_c.info = "auto";
		}
		state.pos += url.length + 2;
		return true;
	}
	return false;
}
function isLinkOpen(str) {
	return /^<a[>\s]/i.test(str);
}
function isLinkClose(str) {
	return /^<\/a\s*>/i.test(str);
}
function isLetter(ch) {
	const lc = ch | 32;
	return lc >= 97 && lc <= 122;
}
function html_inline(state, silent) {
	if (!state.md.options.html) return false;
	const max = state.posMax;
	const pos = state.pos;
	if (state.src.charCodeAt(pos) !== 60 || pos + 2 >= max) return false;
	const ch = state.src.charCodeAt(pos + 1);
	if (ch !== 33 && ch !== 63 && ch !== 47 && !isLetter(ch)) return false;
	const match = state.src.slice(pos).match(HTML_TAG_RE);
	if (!match) return false;
	if (!silent) {
		const token = state.push("html_inline", "", 0);
		token.content = match[0];
		if (isLinkOpen(token.content)) state.linkLevel++;
		if (isLinkClose(token.content)) state.linkLevel--;
	}
	state.pos += match[0].length;
	return true;
}
const DIGITAL_RE = /^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i;
const NAMED_RE = /^&([a-z][a-z0-9]{1,31});/i;
function entity(state, silent) {
	const pos = state.pos;
	const max = state.posMax;
	if (state.src.charCodeAt(pos) !== 38) return false;
	if (pos + 1 >= max) return false;
	if (state.src.charCodeAt(pos + 1) === 35) {
		const match = state.src.slice(pos).match(DIGITAL_RE);
		if (match) {
			if (!silent) {
				const code = match[1][0].toLowerCase() === "x" ? parseInt(match[1].slice(1), 16) : parseInt(match[1], 10);
				const token = state.push("text_special", "", 0);
				token.content = isValidEntityCode(code) ? fromCodePoint(code) : fromCodePoint(65533);
				token.markup = match[0];
				token.info = "entity";
			}
			state.pos += match[0].length;
			return true;
		}
	} else {
		const match = state.src.slice(pos).match(NAMED_RE);
		if (match) {
			const decoded = decodeHTMLStrict(match[0]);
			if (decoded !== match[0]) {
				if (!silent) {
					const token = state.push("text_special", "", 0);
					token.content = decoded;
					token.markup = match[0];
					token.info = "entity";
				}
				state.pos += match[0].length;
				return true;
			}
		}
	}
	return false;
}
function processDelimiters(delimiters) {
	const openersBottom = {};
	const max = delimiters.length;
	if (!max) return;
	let headerIdx = 0;
	let lastTokenIdx = -2;
	const jumps = [];
	for (let closerIdx = 0; closerIdx < max; closerIdx++) {
		const closer = delimiters[closerIdx];
		jumps.push(0);
		if (delimiters[headerIdx].marker !== closer.marker || lastTokenIdx !== closer.token - 1) headerIdx = closerIdx;
		lastTokenIdx = closer.token;
		closer.length = closer.length || 0;
		if (!closer.close) continue;
		if (!openersBottom.hasOwnProperty(closer.marker)) openersBottom[closer.marker] = [
			-1,
			-1,
			-1,
			-1,
			-1,
			-1
		];
		const minOpenerIdx = openersBottom[closer.marker][(closer.open ? 3 : 0) + closer.length % 3];
		let openerIdx = headerIdx - jumps[headerIdx] - 1;
		let newMinOpenerIdx = openerIdx;
		for (; openerIdx > minOpenerIdx; openerIdx -= jumps[openerIdx] + 1) {
			const opener = delimiters[openerIdx];
			if (opener.marker !== closer.marker) continue;
			if (opener.open && opener.end < 0) {
				let isOddMatch = false;
				if (opener.close || closer.open) {
					if ((opener.length + closer.length) % 3 === 0) {
						if (opener.length % 3 !== 0 || closer.length % 3 !== 0) isOddMatch = true;
					}
				}
				if (!isOddMatch) {
					const lastJump = openerIdx > 0 && !delimiters[openerIdx - 1].open ? jumps[openerIdx - 1] + 1 : 0;
					jumps[closerIdx] = closerIdx - openerIdx + lastJump;
					jumps[openerIdx] = lastJump;
					closer.open = false;
					opener.end = closerIdx;
					opener.close = false;
					newMinOpenerIdx = -1;
					lastTokenIdx = -2;
					break;
				}
			}
		}
		if (newMinOpenerIdx !== -1) openersBottom[closer.marker][(closer.open ? 3 : 0) + (closer.length || 0) % 3] = newMinOpenerIdx;
	}
}
function link_pairs(state) {
	const tokens_meta = state.tokens_meta;
	const max = state.tokens_meta.length;
	processDelimiters(state.delimiters);
	for (let curr = 0; curr < max; curr++) if (tokens_meta[curr] && tokens_meta[curr].delimiters) processDelimiters(tokens_meta[curr].delimiters);
}
function fragments_join(state) {
	let curr, last;
	let level = 0;
	const tokens = state.tokens;
	const max = state.tokens.length;
	for (curr = last = 0; curr < max; curr++) {
		if (tokens[curr].nesting < 0) level--;
		tokens[curr].level = level;
		if (tokens[curr].nesting > 0) level++;
		if (tokens[curr].type === "text" && curr + 1 < max && tokens[curr + 1].type === "text") tokens[curr + 1].content = tokens[curr].content + tokens[curr + 1].content;
		else {
			if (curr !== last) tokens[last] = tokens[curr];
			last++;
		}
	}
	if (curr !== last) tokens.length = last;
}
/** internal
* class ParserInline
*
* Tokenizes paragraph content.
**/
const _rules = [
	["text", text],
	["linkify", linkify],
	["newline", newline],
	["escape", escape],
	["backticks", backtick],
	["strikethrough", strikethrough_default.tokenize],
	["emphasis", emphasis_default.tokenize],
	["link", link],
	["image", image],
	["autolink", autolink],
	["html_inline", html_inline],
	["entity", entity]
];
const _rules2 = [
	["balance_pairs", link_pairs],
	["strikethrough", strikethrough_default.postProcess],
	["emphasis", emphasis_default.postProcess],
	["fragments_join", fragments_join]
];
/**
* new ParserInline()
**/
function ParserInline() {
	/**
	* ParserInline#ruler -> Ruler
	*
	* [[Ruler]] instance. Keep configuration of inline rules.
	**/
	this.ruler = new Ruler();
	for (let i = 0; i < _rules.length; i++) this.ruler.push(_rules[i][0], _rules[i][1]);
	/**
	* ParserInline#ruler2 -> Ruler
	*
	* [[Ruler]] instance. Second ruler used for post-processing
	* (e.g. in emphasis-like rules).
	**/
	this.ruler2 = new Ruler();
	for (let i = 0; i < _rules2.length; i++) this.ruler2.push(_rules2[i][0], _rules2[i][1]);
}
ParserInline.prototype.skipToken = function(state) {
	const pos = state.pos;
	const rules = this.ruler.getRules("");
	const len = rules.length;
	const maxNesting = state.md.options.maxNesting;
	const cache = state.cache;
	if (typeof cache[pos] !== "undefined") {
		state.pos = cache[pos];
		return;
	}
	let ok = false;
	if (state.level < maxNesting) for (let i = 0; i < len; i++) {
		state.level++;
		ok = rules[i](state, true);
		state.level--;
		if (ok) {
			if (pos >= state.pos) throw new Error("inline rule didn't increment state.pos");
			break;
		}
	}
	else state.pos = state.posMax;
	if (!ok) state.pos++;
	cache[pos] = state.pos;
};
ParserInline.prototype.tokenize = function(state) {
	const rules = this.ruler.getRules("");
	const len = rules.length;
	const end = state.posMax;
	const maxNesting = state.md.options.maxNesting;
	while (state.pos < end) {
		const prevPos = state.pos;
		let ok = false;
		if (state.level < maxNesting) for (let i = 0; i < len; i++) {
			ok = rules[i](state, false);
			if (ok) {
				if (prevPos >= state.pos) throw new Error("inline rule didn't increment state.pos");
				break;
			}
		}
		if (ok) {
			if (state.pos >= end) break;
			continue;
		}
		state.pending += state.src[state.pos++];
	}
	if (state.pending) state.pushPending();
};
/**
* ParserInline.parse(str, md, env, outTokens)
*
* Process input string and push inline tokens into `outTokens`
**/
ParserInline.prototype.parse = function(str, md, env, outTokens) {
	const state = new this.State(str, md, env, outTokens);
	this.tokenize(state);
	const rules = this.ruler2.getRules("");
	const len = rules.length;
	for (let i = 0; i < len; i++) rules[i](state);
};
ParserInline.prototype.State = StateInline;
function re_default(opts) {
	const re = {};
	opts = opts || {};
	re.src_Any = regex_default$5.source;
	re.src_Cc = regex_default$4.source;
	re.src_Z = regex_default.source;
	re.src_P = regex_default$2.source;
	re.src_ZPCc = [
		re.src_Z,
		re.src_P,
		re.src_Cc
	].join("|");
	re.src_ZCc = [re.src_Z, re.src_Cc].join("|");
	const text_separators = "[><｜]";
	re.src_pseudo_letter = `(?:(?!${text_separators}|${re.src_ZPCc})${re.src_Any})`;
	re.src_ip4 = "(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)";
	re.src_auth = `(?:(?:(?!${re.src_ZCc}|[@/\\[\\]()]).){1,50}@)?`;
	re.src_port = "(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?";
	re.src_host_terminator = `(?=$|${text_separators}|${re.src_ZPCc})(?!${opts["---"] ? "-(?!--)|" : "-|"}_|:\\d|\\.-|\\.(?!$|${re.src_ZPCc}))`;
	re.src_path = `(?:[/?#](?:(?!${re.src_ZCc}|${text_separators}|[()[\\]{}.,"'?!\\-;]).|\\[(?:(?!${re.src_ZCc}|\\]).)*\\]|\\((?:(?!${re.src_ZCc}|[)]).)*\\)|\\{(?:(?!${re.src_ZCc}|[}]).)*\\}|\\"(?:(?!${re.src_ZCc}|["]).)+\\"|\\'(?:(?!${re.src_ZCc}|[']).)+\\'|\\'(?=${re.src_pseudo_letter}|[-])|\\.{2,}[a-zA-Z0-9%/&]|\\.(?!${re.src_ZCc}|[.]|$)|` + (opts["---"] ? "\\-(?!--(?:[^-]|$))(?:-*)|" : "\\-+|") + `,(?!${re.src_ZCc}|$)|;(?!${re.src_ZCc}|$)|\\!+(?!${re.src_ZCc}|[!]|$)|\\?(?!${re.src_ZCc}|[?]|$))+|\\/)?`;
	re.src_email_name = "[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\\"\\.a-zA-Z0-9_]{0,63}";
	re.src_xn = "xn--[a-z0-9\\-]{1,59}";
	re.src_domain_root = "(?:" + re.src_xn + `|${re.src_pseudo_letter}{1,63})`;
	re.src_domain = "(?:" + re.src_xn + `|(?:${re.src_pseudo_letter})|(?:${re.src_pseudo_letter}(?:-|${re.src_pseudo_letter}){0,61}${re.src_pseudo_letter}))`;
	re.src_host = `(?:(?:(?:(?:${re.src_domain})\\.)*${re.src_domain}))`;
	re.tpl_host_fuzzy = "(?:" + re.src_ip4 + `|(?:(?:(?:${re.src_domain})\\.)+(?:%TLDS%)))`;
	re.tpl_host_no_ip_fuzzy = `(?:(?:(?:${re.src_domain})\\.)+(?:%TLDS%))`;
	re.src_host_strict = re.src_host + re.src_host_terminator;
	re.tpl_host_fuzzy_strict = re.tpl_host_fuzzy + re.src_host_terminator;
	re.src_host_port_strict = re.src_host + re.src_port + re.src_host_terminator;
	re.tpl_host_port_fuzzy_strict = re.tpl_host_fuzzy + re.src_port + re.src_host_terminator;
	re.tpl_host_port_no_ip_fuzzy_strict = re.tpl_host_no_ip_fuzzy + re.src_port + re.src_host_terminator;
	re.tpl_host_fuzzy_test = `localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:${re.src_ZPCc}|>|$))`;
	re.tpl_email_fuzzy = `(^|${text_separators}|"|\\(|${re.src_ZCc})(${re.src_email_name}@${re.tpl_host_fuzzy_strict})`;
	re.tpl_link_fuzzy = `(^|(?![.:/\\-_@])(?:[$+<=>^\`|\uff5c]|${re.src_ZPCc}))((?![$+<=>^\`|\uff5c])${re.tpl_host_port_fuzzy_strict}${re.src_path})`;
	re.tpl_link_no_ip_fuzzy = `(^|(?![.:/\\-_@])(?:[$+<=>^\`|\uff5c]|${re.src_ZPCc}))((?![$+<=>^\`|\uff5c])${re.tpl_host_port_no_ip_fuzzy_strict}${re.src_path})`;
	return re;
}
function assign(obj) {
	Array.prototype.slice.call(arguments, 1).forEach(function(source) {
		if (!source) return;
		Object.keys(source).forEach(function(key) {
			obj[key] = source[key];
		});
	});
	return obj;
}
function _class(obj) {
	return Object.prototype.toString.call(obj);
}
function isString(obj) {
	return _class(obj) === "[object String]";
}
function isObject(obj) {
	return _class(obj) === "[object Object]";
}
function isRegExp(obj) {
	return _class(obj) === "[object RegExp]";
}
function isFunction(obj) {
	return _class(obj) === "[object Function]";
}
function escapeRE(str) {
	return str.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
}
const defaultOptions = {
	fuzzyLink: true,
	fuzzyEmail: true,
	fuzzyIP: false
};
function isOptionsObj(obj) {
	return Object.keys(obj || {}).reduce(function(acc, k) {
		return acc || defaultOptions.hasOwnProperty(k);
	}, false);
}
const defaultSchemas = {
	"http:": { validate: function(text, pos, self) {
		const tail = text.slice(pos);
		if (!self.re.http) self.re.http = new RegExp(`^\\/\\/${self.re.src_auth}${self.re.src_host_port_strict}${self.re.src_path}`, "i");
		if (self.re.http.test(tail)) return tail.match(self.re.http)[0].length;
		return 0;
	} },
	"https:": "http:",
	"ftp:": "http:",
	"//": { validate: function(text, pos, self) {
		const tail = text.slice(pos);
		if (!self.re.no_http) self.re.no_http = new RegExp("^" + self.re.src_auth + `(?:localhost|(?:(?:${self.re.src_domain})\\.)+${self.re.src_domain_root})` + self.re.src_port + self.re.src_host_terminator + self.re.src_path, "i");
		if (self.re.no_http.test(tail)) {
			if (pos >= 3 && text[pos - 3] === ":") return 0;
			if (pos >= 3 && text[pos - 3] === "/") return 0;
			return tail.match(self.re.no_http)[0].length;
		}
		return 0;
	} },
	"mailto:": { validate: function(text, pos, self) {
		const tail = text.slice(pos);
		if (!self.re.mailto) self.re.mailto = new RegExp(`^${self.re.src_email_name}@${self.re.src_host_strict}`, "i");
		if (self.re.mailto.test(tail)) return tail.match(self.re.mailto)[0].length;
		return 0;
	} }
};
const tlds_2ch_src_re = "a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]";
const tlds_default = "biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф".split("|");
function createValidator(re) {
	return function(text, pos) {
		const tail = text.slice(pos);
		if (re.test(tail)) return tail.match(re)[0].length;
		return 0;
	};
}
function createNormalizer() {
	return function(match, self) {
		self.normalize(match);
	};
}
function compile(self) {
	const re = self.re = re_default(self.__opts__);
	const tlds = self.__tlds__.slice();
	self.onCompile();
	if (!self.__tlds_replaced__) tlds.push(tlds_2ch_src_re);
	tlds.push(re.src_xn);
	re.src_tlds = tlds.join("|");
	function untpl(tpl) {
		return tpl.replace("%TLDS%", re.src_tlds);
	}
	re.email_fuzzy = RegExp(untpl(re.tpl_email_fuzzy), "i");
	re.email_fuzzy_global = RegExp(untpl(re.tpl_email_fuzzy), "ig");
	re.link_fuzzy = RegExp(untpl(re.tpl_link_fuzzy), "i");
	re.link_fuzzy_global = RegExp(untpl(re.tpl_link_fuzzy), "ig");
	re.link_no_ip_fuzzy = RegExp(untpl(re.tpl_link_no_ip_fuzzy), "i");
	re.link_no_ip_fuzzy_global = RegExp(untpl(re.tpl_link_no_ip_fuzzy), "ig");
	re.host_fuzzy_test = RegExp(untpl(re.tpl_host_fuzzy_test), "i");
	const aliases = [];
	self.__compiled__ = {};
	function schemaError(name, val) {
		throw new Error(`(LinkifyIt) Invalid schema "${name}": ${val}`);
	}
	Object.keys(self.__schemas__).forEach(function(name) {
		const val = self.__schemas__[name];
		if (val === null) return;
		const compiled = {
			validate: null,
			link: null
		};
		self.__compiled__[name] = compiled;
		if (isObject(val)) {
			if (isRegExp(val.validate)) compiled.validate = createValidator(val.validate);
			else if (isFunction(val.validate)) compiled.validate = val.validate;
			else schemaError(name, val);
			if (isFunction(val.normalize)) compiled.normalize = val.normalize;
			else if (!val.normalize) compiled.normalize = createNormalizer();
			else schemaError(name, val);
			return;
		}
		if (isString(val)) {
			aliases.push(name);
			return;
		}
		schemaError(name, val);
	});
	aliases.forEach(function(alias) {
		if (!self.__compiled__[self.__schemas__[alias]]) return;
		self.__compiled__[alias].validate = self.__compiled__[self.__schemas__[alias]].validate;
		self.__compiled__[alias].normalize = self.__compiled__[self.__schemas__[alias]].normalize;
	});
	self.__compiled__[""] = {
		validate: null,
		normalize: createNormalizer()
	};
	const slist = Object.keys(self.__compiled__).filter(function(name) {
		return name.length > 0 && self.__compiled__[name];
	}).map(escapeRE).join("|");
	self.re.schema_test = RegExp(`(^|(?!_)(?:[><\uff5c]|${re.src_ZPCc}))(${slist})`, "i");
	self.re.schema_search = RegExp(`(^|(?!_)(?:[><\uff5c]|${re.src_ZPCc}))(${slist})`, "ig");
	self.re.schema_at_start = RegExp(`^${self.re.schema_search.source}`, "i");
	self.re.pretest = RegExp(`(${self.re.schema_test.source})|(${self.re.host_fuzzy_test.source})|@`, "i");
}
/**
* class Match
*
* Match result. Single element of array, returned by [[LinkifyIt#match]]
**/
function Match(text, schema, index, lastIndex) {
	const raw = text.slice(index, lastIndex);
	/**
	* Match#schema -> String
	*
	* Prefix (protocol) for matched string.
	**/
	this.schema = schema.toLowerCase();
	/**
	* Match#index -> Number
	*
	* First position of matched string.
	**/
	this.index = index;
	/**
	* Match#lastIndex -> Number
	*
	* Next position after matched string.
	**/
	this.lastIndex = lastIndex;
	/**
	* Match#raw -> String
	*
	* Matched string.
	**/
	this.raw = raw;
	/**
	* Match#text -> String
	*
	* Notmalized text of matched string.
	**/
	this.text = raw;
	/**
	* Match#url -> String
	*
	* Normalized url of matched string.
	**/
	this.url = raw;
}
/**
* class LinkifyIt
**/
/**
* new LinkifyIt(schemas, options)
* - schemas (Object): Optional. Additional schemas to validate (prefix/validator)
* - options (Object): { fuzzyLink|fuzzyEmail|fuzzyIP: true|false }
*
* Creates new linkifier instance with optional additional schemas.
* Can be called without `new` keyword for convenience.
*
* By default understands:
*
* - `http(s)://...` , `ftp://...`, `mailto:...` & `//...` links
* - "fuzzy" links and emails (example.com, foo@bar.com).
*
* `schemas` is an object, where each key/value describes protocol/rule:
*
* - __key__ - link prefix (usually, protocol name with `:` at the end, `skype:`
*   for example). `linkify-it` makes shure that prefix is not preceeded with
*   alphanumeric char and symbols. Only whitespaces and punctuation allowed.
* - __value__ - rule to check tail after link prefix
*   - _String_ - just alias to existing rule
*   - _Object_
*     - _validate_ - validator function (should return matched length on success),
*       or `RegExp`.
*     - _normalize_ - optional function to normalize text & url of matched result
*       (for example, for @twitter mentions).
*
* `options`:
*
* - __fuzzyLink__ - recognige URL-s without `http(s):` prefix. Default `true`.
* - __fuzzyIP__ - allow IPs in fuzzy links above. Can conflict with some texts
*   like version numbers. Default `false`.
* - __fuzzyEmail__ - recognize emails without `mailto:` prefix.
*
**/
function LinkifyIt(schemas, options) {
	if (!(this instanceof LinkifyIt)) return new LinkifyIt(schemas, options);
	if (!options) {
		if (isOptionsObj(schemas)) {
			options = schemas;
			schemas = {};
		}
	}
	this.__opts__ = assign({}, defaultOptions, options);
	this.__schemas__ = assign({}, defaultSchemas, schemas);
	this.__compiled__ = {};
	this.__tlds__ = tlds_default;
	this.__tlds_replaced__ = false;
	this.re = {};
	compile(this);
}
/** chainable
* LinkifyIt#add(schema, definition)
* - schema (String): rule name (fixed pattern prefix)
* - definition (String|RegExp|Object): schema definition
*
* Add new rule definition. See constructor description for details.
**/
LinkifyIt.prototype.add = function add(schema, definition) {
	this.__schemas__[schema] = definition;
	compile(this);
	return this;
};
/** chainable
* LinkifyIt#set(options)
* - options (Object): { fuzzyLink|fuzzyEmail|fuzzyIP: true|false }
*
* Set recognition options for links without schema.
**/
LinkifyIt.prototype.set = function set(options) {
	this.__opts__ = assign(this.__opts__, options);
	return this;
};
/**
* LinkifyIt#test(text) -> Boolean
*
* Searches linkifiable pattern and returns `true` on success or `false` on fail.
**/
LinkifyIt.prototype.test = function test(text) {
	if (!text.length) return false;
	let m, re;
	if (this.re.schema_test.test(text)) {
		re = this.re.schema_search;
		re.lastIndex = 0;
		while ((m = re.exec(text)) !== null) if (this.testSchemaAt(text, m[2], re.lastIndex)) return true;
	}
	if (this.__opts__.fuzzyLink && this.__compiled__["http:"]) {
		if (text.search(this.re.host_fuzzy_test) >= 0) {
			if (text.match(this.__opts__.fuzzyIP ? this.re.link_fuzzy : this.re.link_no_ip_fuzzy) !== null) return true;
		}
	}
	if (this.__opts__.fuzzyEmail && this.__compiled__["mailto:"]) {
		if (text.indexOf("@") >= 0) {
			if (text.match(this.re.email_fuzzy) !== null) return true;
		}
	}
	return false;
};
/**
* LinkifyIt#pretest(text) -> Boolean
*
* Very quick check, that can give false positives. Returns true if link MAY BE
* can exists. Can be used for speed optimization, when you need to check that
* link NOT exists.
**/
LinkifyIt.prototype.pretest = function pretest(text) {
	return this.re.pretest.test(text);
};
/**
* LinkifyIt#testSchemaAt(text, name, position) -> Number
* - text (String): text to scan
* - name (String): rule (schema) name
* - position (Number): text offset to check from
*
* Similar to [[LinkifyIt#test]] but checks only specific protocol tail exactly
* at given position. Returns length of found pattern (0 on fail).
**/
LinkifyIt.prototype.testSchemaAt = function testSchemaAt(text, schema, pos) {
	if (!this.__compiled__[schema.toLowerCase()]) return 0;
	return this.__compiled__[schema.toLowerCase()].validate(text, pos, this);
};
/**
* LinkifyIt#match(text) -> Array|null
*
* Returns array of found link descriptions or `null` on fail. We strongly
* recommend to use [[LinkifyIt#test]] first, for best speed.
*
* ##### Result match description
*
* - __schema__ - link schema, can be empty for fuzzy links, or `//` for
*   protocol-neutral  links.
* - __index__ - offset of matched text
* - __lastIndex__ - index of next char after mathch end
* - __raw__ - matched text
* - __text__ - normalized text
* - __url__ - link, generated from matched text
**/
LinkifyIt.prototype.match = function match(text) {
	const result = [];
	const type_schemed = [];
	const type_fuzzy_link = [];
	const type_fuzzy_email = [];
	let m, len, re;
	function choose(a, b) {
		if (!a) return b;
		if (!b) return a;
		if (a.index !== b.index) return a.index < b.index ? a : b;
		return a.lastIndex >= b.lastIndex ? a : b;
	}
	if (!text.length) return null;
	if (this.re.schema_test.test(text)) {
		re = this.re.schema_search;
		re.lastIndex = 0;
		while ((m = re.exec(text)) !== null) {
			len = this.testSchemaAt(text, m[2], re.lastIndex);
			if (len) type_schemed.push({
				schema: m[2],
				index: m.index + m[1].length,
				lastIndex: m.index + m[0].length + len
			});
		}
	}
	if (this.__opts__.fuzzyLink && this.__compiled__["http:"]) {
		re = this.__opts__.fuzzyIP ? this.re.link_fuzzy_global : this.re.link_no_ip_fuzzy_global;
		re.lastIndex = 0;
		while ((m = re.exec(text)) !== null) type_fuzzy_link.push({
			schema: "",
			index: m.index + m[1].length,
			lastIndex: m.index + m[0].length
		});
	}
	if (this.__opts__.fuzzyEmail && this.__compiled__["mailto:"]) {
		re = this.re.email_fuzzy_global;
		re.lastIndex = 0;
		while ((m = re.exec(text)) !== null) type_fuzzy_email.push({
			schema: "mailto:",
			index: m.index + m[1].length,
			lastIndex: m.index + m[0].length
		});
	}
	const indexes = [
		0,
		0,
		0
	];
	let lastIndex = 0;
	for (;;) {
		const candidates = [
			type_schemed[indexes[0]],
			type_fuzzy_email[indexes[1]],
			type_fuzzy_link[indexes[2]]
		];
		const candidate = choose(choose(candidates[0], candidates[1]), candidates[2]);
		if (!candidate) break;
		if (candidate === candidates[0]) indexes[0]++;
		else if (candidate === candidates[1]) indexes[1]++;
		else indexes[2]++;
		if (candidate.index < lastIndex) continue;
		const match = new Match(text, candidate.schema, candidate.index, candidate.lastIndex);
		this.__compiled__[match.schema].normalize(match, this);
		result.push(match);
		lastIndex = candidate.lastIndex;
	}
	if (result.length) return result;
	return null;
};
/**
* LinkifyIt#matchAtStart(text) -> Match|null
*
* Returns fully-formed (not fuzzy) link if it starts at the beginning
* of the string, and null otherwise.
**/
LinkifyIt.prototype.matchAtStart = function matchAtStart(text) {
	if (!text.length) return null;
	const m = this.re.schema_at_start.exec(text);
	if (!m) return null;
	const len = this.testSchemaAt(text, m[2], m[0].length);
	if (!len) return null;
	const match = new Match(text, m[2], m.index + m[1].length, m.index + m[0].length + len);
	this.__compiled__[match.schema].normalize(match, this);
	return match;
};
/** chainable
* LinkifyIt#tlds(list [, keepOld]) -> this
* - list (Array): list of tlds
* - keepOld (Boolean): merge with current list if `true` (`false` by default)
*
* Load (or merge) new tlds list. Those are user for fuzzy links (without prefix)
* to avoid false positives. By default this algorythm used:
*
* - hostname with any 2-letter root zones are ok.
* - biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф
*   are ok.
* - encoded (`xn--...`) root zones are ok.
*
* If list is replaced, then exact match for 2-chars root zones will be checked.
**/
LinkifyIt.prototype.tlds = function tlds(list, keepOld) {
	list = Array.isArray(list) ? list : [list];
	if (!keepOld) {
		this.__tlds__ = list.slice();
		this.__tlds_replaced__ = true;
		compile(this);
		return this;
	}
	this.__tlds__ = this.__tlds__.concat(list).sort().filter(function(el, idx, arr) {
		return el !== arr[idx - 1];
	}).reverse();
	compile(this);
	return this;
};
/**
* LinkifyIt#normalize(match)
*
* Default normalizer (if schema does not define it's own).
**/
LinkifyIt.prototype.normalize = function normalize(match) {
	if (!match.schema) match.url = `http://${match.url}`;
	if (match.schema === "mailto:" && !/^mailto:/i.test(match.url)) match.url = `mailto:${match.url}`;
};
/**
* LinkifyIt#onCompile()
*
* Override to modify basic RegExp-s.
**/
LinkifyIt.prototype.onCompile = function onCompile() {};
/** Highest positive signed 32-bit float value */
const maxInt = 2147483647;
/** Bootstring parameters */
const base = 36;
const tMin = 1;
const tMax = 26;
const skew = 38;
const damp = 700;
const initialBias = 72;
const initialN = 128;
const delimiter = "-";
/** Regular expressions */
const regexPunycode = /^xn--/;
const regexNonASCII = /[^\0-\x7F]/;
const regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g;
/** Error messages */
const errors = {
	"overflow": "Overflow: input needs wider integers to process",
	"not-basic": "Illegal input >= 0x80 (not a basic code point)",
	"invalid-input": "Invalid input"
};
/** Convenience shortcuts */
const baseMinusTMin = 35;
const floor = Math.floor;
const stringFromCharCode = String.fromCharCode;
/**
* A generic error utility function.
* @private
* @param {String} type The error type.
* @returns {Error} Throws a `RangeError` with the applicable error message.
*/
function error(type) {
	throw new RangeError(errors[type]);
}
/**
* A generic `Array#map` utility function.
* @private
* @param {Array} array The array to iterate over.
* @param {Function} callback The function that gets called for every array
* item.
* @returns {Array} A new array of values returned by the callback function.
*/
function map(array, callback) {
	const result = [];
	let length = array.length;
	while (length--) result[length] = callback(array[length]);
	return result;
}
/**
* A simple `Array#map`-like wrapper to work with domain name strings or email
* addresses.
* @private
* @param {String} domain The domain name or email address.
* @param {Function} callback The function that gets called for every
* character.
* @returns {String} A new string of characters returned by the callback
* function.
*/
function mapDomain(domain, callback) {
	const parts = domain.split("@");
	let result = "";
	if (parts.length > 1) {
		result = parts[0] + "@";
		domain = parts[1];
	}
	domain = domain.replace(regexSeparators, ".");
	const encoded = map(domain.split("."), callback).join(".");
	return result + encoded;
}
/**
* Creates an array containing the numeric code points of each Unicode
* character in the string. While JavaScript uses UCS-2 internally,
* this function will convert a pair of surrogate halves (each of which
* UCS-2 exposes as separate characters) into a single code point,
* matching UTF-16.
* @see `punycode.ucs2.encode`
* @see <https://mathiasbynens.be/notes/javascript-encoding>
* @memberOf punycode.ucs2
* @name decode
* @param {String} string The Unicode input string (UCS-2).
* @returns {Array} The new array of code points.
*/
function ucs2decode(string) {
	const output = [];
	let counter = 0;
	const length = string.length;
	while (counter < length) {
		const value = string.charCodeAt(counter++);
		if (value >= 55296 && value <= 56319 && counter < length) {
			const extra = string.charCodeAt(counter++);
			if ((extra & 64512) == 56320) output.push(((value & 1023) << 10) + (extra & 1023) + 65536);
			else {
				output.push(value);
				counter--;
			}
		} else output.push(value);
	}
	return output;
}
/**
* Creates a string based on an array of numeric code points.
* @see `punycode.ucs2.decode`
* @memberOf punycode.ucs2
* @name encode
* @param {Array} codePoints The array of numeric code points.
* @returns {String} The new Unicode string (UCS-2).
*/
const ucs2encode = (codePoints) => String.fromCodePoint(...codePoints);
/**
* Converts a basic code point into a digit/integer.
* @see `digitToBasic()`
* @private
* @param {Number} codePoint The basic numeric code point value.
* @returns {Number} The numeric value of a basic code point (for use in
* representing integers) in the range `0` to `base - 1`, or `base` if
* the code point does not represent a value.
*/
const basicToDigit = function(codePoint) {
	if (codePoint >= 48 && codePoint < 58) return 26 + (codePoint - 48);
	if (codePoint >= 65 && codePoint < 91) return codePoint - 65;
	if (codePoint >= 97 && codePoint < 123) return codePoint - 97;
	return base;
};
/**
* Converts a digit/integer into a basic code point.
* @see `basicToDigit()`
* @private
* @param {Number} digit The numeric value of a basic code point.
* @returns {Number} The basic code point whose value (when used for
* representing integers) is `digit`, which needs to be in the range
* `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
* used; else, the lowercase form is used. The behavior is undefined
* if `flag` is non-zero and `digit` has no uppercase form.
*/
const digitToBasic = function(digit, flag) {
	return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
};
/**
* Bias adaptation function as per section 3.4 of RFC 3492.
* https://tools.ietf.org/html/rfc3492#section-3.4
* @private
*/
const adapt = function(delta, numPoints, firstTime) {
	let k = 0;
	delta = firstTime ? floor(delta / damp) : delta >> 1;
	delta += floor(delta / numPoints);
	for (; delta > 455; k += base) delta = floor(delta / baseMinusTMin);
	return floor(k + 36 * delta / (delta + skew));
};
/**
* Converts a Punycode string of ASCII-only symbols to a string of Unicode
* symbols.
* @memberOf punycode
* @param {String} input The Punycode string of ASCII-only symbols.
* @returns {String} The resulting string of Unicode symbols.
*/
const decode = function(input) {
	const output = [];
	const inputLength = input.length;
	let i = 0;
	let n = initialN;
	let bias = initialBias;
	let basic = input.lastIndexOf(delimiter);
	if (basic < 0) basic = 0;
	for (let j = 0; j < basic; ++j) {
		if (input.charCodeAt(j) >= 128) error("not-basic");
		output.push(input.charCodeAt(j));
	}
	for (let index = basic > 0 ? basic + 1 : 0; index < inputLength;) {
		const oldi = i;
		for (let w = 1, k = base;; k += base) {
			if (index >= inputLength) error("invalid-input");
			const digit = basicToDigit(input.charCodeAt(index++));
			if (digit >= base) error("invalid-input");
			if (digit > floor((maxInt - i) / w)) error("overflow");
			i += digit * w;
			const t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
			if (digit < t) break;
			const baseMinusT = base - t;
			if (w > floor(maxInt / baseMinusT)) error("overflow");
			w *= baseMinusT;
		}
		const out = output.length + 1;
		bias = adapt(i - oldi, out, oldi == 0);
		if (floor(i / out) > maxInt - n) error("overflow");
		n += floor(i / out);
		i %= out;
		output.splice(i++, 0, n);
	}
	return String.fromCodePoint(...output);
};
/**
* Converts a string of Unicode symbols (e.g. a domain name label) to a
* Punycode string of ASCII-only symbols.
* @memberOf punycode
* @param {String} input The string of Unicode symbols.
* @returns {String} The resulting Punycode string of ASCII-only symbols.
*/
const encode = function(input) {
	const output = [];
	input = ucs2decode(input);
	const inputLength = input.length;
	let n = initialN;
	let delta = 0;
	let bias = initialBias;
	for (const currentValue of input) if (currentValue < 128) output.push(stringFromCharCode(currentValue));
	const basicLength = output.length;
	let handledCPCount = basicLength;
	if (basicLength) output.push(delimiter);
	while (handledCPCount < inputLength) {
		let m = maxInt;
		for (const currentValue of input) if (currentValue >= n && currentValue < m) m = currentValue;
		const handledCPCountPlusOne = handledCPCount + 1;
		if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) error("overflow");
		delta += (m - n) * handledCPCountPlusOne;
		n = m;
		for (const currentValue of input) {
			if (currentValue < n && ++delta > maxInt) error("overflow");
			if (currentValue === n) {
				let q = delta;
				for (let k = base;; k += base) {
					const t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
					if (q < t) break;
					const qMinusT = q - t;
					const baseMinusT = base - t;
					output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0)));
					q = floor(qMinusT / baseMinusT);
				}
				output.push(stringFromCharCode(digitToBasic(q, 0)));
				bias = adapt(delta, handledCPCountPlusOne, handledCPCount === basicLength);
				delta = 0;
				++handledCPCount;
			}
		}
		++delta;
		++n;
	}
	return output.join("");
};
/**
* Converts a Punycode string representing a domain name or an email address
* to Unicode. Only the Punycoded parts of the input will be converted, i.e.
* it doesn't matter if you call it on a string that has already been
* converted to Unicode.
* @memberOf punycode
* @param {String} input The Punycoded domain name or email address to
* convert to Unicode.
* @returns {String} The Unicode representation of the given Punycode
* string.
*/
const toUnicode = function(input) {
	return mapDomain(input, function(string) {
		return regexPunycode.test(string) ? decode(string.slice(4).toLowerCase()) : string;
	});
};
/**
* Converts a Unicode string representing a domain name or an email address to
* Punycode. Only the non-ASCII parts of the domain name will be converted,
* i.e. it doesn't matter if you call it with a domain that's already in
* ASCII.
* @memberOf punycode
* @param {String} input The domain name or email address to convert, as a
* Unicode string.
* @returns {String} The Punycode representation of the given domain name or
* email address.
*/
const toASCII = function(input) {
	return mapDomain(input, function(string) {
		return regexNonASCII.test(string) ? "xn--" + encode(string) : string;
	});
};
/** Define the public API */
const punycode = {
	/**
	* A string representing the current Punycode.js version number.
	* @memberOf punycode
	* @type String
	*/
	"version": "2.3.1",
	/**
	* An object of methods to convert from JavaScript's internal character
	* representation (UCS-2) to Unicode code points, and back.
	* @see <https://mathiasbynens.be/notes/javascript-encoding>
	* @memberOf punycode
	* @type Object
	*/
	"ucs2": {
		"decode": ucs2decode,
		"encode": ucs2encode
	},
	"decode": decode,
	"encode": encode,
	"toASCII": toASCII,
	"toUnicode": toUnicode
};
const config = {
	default: {
		options: {
			html: false,
			xhtmlOut: false,
			breaks: false,
			langPrefix: "language-",
			linkify: false,
			typographer: false,
			quotes: "“”‘’",
			highlight: null,
			maxNesting: 100
		},
		components: {
			core: {},
			block: {},
			inline: {}
		}
	},
	zero: {
		options: {
			html: false,
			xhtmlOut: false,
			breaks: false,
			langPrefix: "language-",
			linkify: false,
			typographer: false,
			quotes: "“”‘’",
			highlight: null,
			maxNesting: 20
		},
		components: {
			core: { rules: [
				"normalize",
				"block",
				"inline",
				"text_join"
			] },
			block: { rules: ["paragraph"] },
			inline: {
				rules: ["text"],
				rules2: ["balance_pairs", "fragments_join"]
			}
		}
	},
	commonmark: {
		options: {
			html: true,
			xhtmlOut: true,
			breaks: false,
			langPrefix: "language-",
			linkify: false,
			typographer: false,
			quotes: "“”‘’",
			highlight: null,
			maxNesting: 20
		},
		components: {
			core: { rules: [
				"normalize",
				"block",
				"inline",
				"text_join"
			] },
			block: { rules: [
				"blockquote",
				"code",
				"fence",
				"heading",
				"hr",
				"html_block",
				"lheading",
				"list",
				"reference",
				"paragraph"
			] },
			inline: {
				rules: [
					"autolink",
					"backticks",
					"emphasis",
					"entity",
					"escape",
					"html_inline",
					"image",
					"link",
					"newline",
					"text"
				],
				rules2: [
					"balance_pairs",
					"emphasis",
					"fragments_join"
				]
			}
		}
	}
};
const BAD_PROTO_RE = /^(vbscript|javascript|file|data):/;
const GOOD_DATA_RE = /^data:image\/(gif|png|jpeg|webp);/;
function validateLink(url) {
	const str = url.trim().toLowerCase();
	return BAD_PROTO_RE.test(str) ? GOOD_DATA_RE.test(str) : true;
}
const RECODE_HOSTNAME_FOR = [
	"http:",
	"https:",
	"mailto:"
];
function normalizeLink(url) {
	const parsed = urlParse(url, true);
	if (parsed.hostname) {
		if (!parsed.protocol || RECODE_HOSTNAME_FOR.indexOf(parsed.protocol) >= 0) try {
			parsed.hostname = punycode.toASCII(parsed.hostname);
		} catch (er) {}
	}
	return encode$1(format(parsed));
}
function normalizeLinkText(url) {
	const parsed = urlParse(url, true);
	if (parsed.hostname) {
		if (!parsed.protocol || RECODE_HOSTNAME_FOR.indexOf(parsed.protocol) >= 0) try {
			parsed.hostname = punycode.toUnicode(parsed.hostname);
		} catch (er) {}
	}
	return decode$1(format(parsed), decode$1.defaultChars + "%");
}
/**
* class MarkdownIt
*
* Main parser/renderer class.
*
* ##### Usage
*
* ```javascript
* // node.js, "classic" way:
* var MarkdownIt = require('markdown-it'),
*     md = new MarkdownIt();
* var result = md.render('# markdown-it rulezz!');
*
* // node.js, the same, but with sugar:
* var md = require('markdown-it')();
* var result = md.render('# markdown-it rulezz!');
*
* // browser without AMD, added to "window" on script load
* // Note, there are no dash.
* var md = window.markdownit();
* var result = md.render('# markdown-it rulezz!');
* ```
*
* Single line rendering, without paragraph wrap:
*
* ```javascript
* var md = require('markdown-it')();
* var result = md.renderInline('__markdown-it__ rulezz!');
* ```
**/
/**
* new MarkdownIt([presetName, options])
* - presetName (String): optional, `commonmark` / `zero`
* - options (Object)
*
* Creates parser instanse with given config. Can be called without `new`.
*
* ##### presetName
*
* MarkdownIt provides named presets as a convenience to quickly
* enable/disable active syntax rules and options for common use cases.
*
* - ["commonmark"](https://github.com/markdown-it/markdown-it/blob/master/lib/presets/commonmark.mjs) -
*   configures parser to strict [CommonMark](http://commonmark.org/) mode.
* - [default](https://github.com/markdown-it/markdown-it/blob/master/lib/presets/default.mjs) -
*   similar to GFM, used when no preset name given. Enables all available rules,
*   but still without html, typographer & autolinker.
* - ["zero"](https://github.com/markdown-it/markdown-it/blob/master/lib/presets/zero.mjs) -
*   all rules disabled. Useful to quickly setup your config via `.enable()`.
*   For example, when you need only `bold` and `italic` markup and nothing else.
*
* ##### options:
*
* - __html__ - `false`. Set `true` to enable HTML tags in source. Be careful!
*   That's not safe! You may need external sanitizer to protect output from XSS.
*   It's better to extend features via plugins, instead of enabling HTML.
* - __xhtmlOut__ - `false`. Set `true` to add '/' when closing single tags
*   (`<br />`). This is needed only for full CommonMark compatibility. In real
*   world you will need HTML output.
* - __breaks__ - `false`. Set `true` to convert `\n` in paragraphs into `<br>`.
* - __langPrefix__ - `language-`. CSS language class prefix for fenced blocks.
*   Can be useful for external highlighters.
* - __linkify__ - `false`. Set `true` to autoconvert URL-like text to links.
* - __typographer__  - `false`. Set `true` to enable [some language-neutral
*   replacement](https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.mjs) +
*   quotes beautification (smartquotes).
* - __quotes__ - `“”‘’`, String or Array. Double + single quotes replacement
*   pairs, when typographer enabled and smartquotes on. For example, you can
*   use `'«»„“'` for Russian, `'„“‚‘'` for German, and
*   `['«\xA0', '\xA0»', '‹\xA0', '\xA0›']` for French (including nbsp).
* - __highlight__ - `null`. Highlighter function for fenced code blocks.
*   Highlighter `function (str, lang)` should return escaped HTML. It can also
*   return empty string if the source was not changed and should be escaped
*   externaly. If result starts with <pre... internal wrapper is skipped.
*
* ##### Example
*
* ```javascript
* // commonmark mode
* var md = require('markdown-it')('commonmark');
*
* // default mode
* var md = require('markdown-it')();
*
* // enable everything
* var md = require('markdown-it')({
*   html: true,
*   linkify: true,
*   typographer: true
* });
* ```
*
* ##### Syntax highlighting
*
* ```js
* var hljs = require('highlight.js') // https://highlightjs.org/
*
* var md = require('markdown-it')({
*   highlight: function (str, lang) {
*     if (lang && hljs.getLanguage(lang)) {
*       try {
*         return hljs.highlight(str, { language: lang, ignoreIllegals: true }).value;
*       } catch (__) {}
*     }
*
*     return ''; // use external default escaping
*   }
* });
* ```
*
* Or with full wrapper override (if you need assign class to `<pre>` or `<code>`):
*
* ```javascript
* var hljs = require('highlight.js') // https://highlightjs.org/
*
* // Actual default values
* var md = require('markdown-it')({
*   highlight: function (str, lang) {
*     if (lang && hljs.getLanguage(lang)) {
*       try {
*         return '<pre><code class="hljs">' +
*                hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
*                '</code></pre>';
*       } catch (__) {}
*     }
*
*     return '<pre><code class="hljs">' + md.utils.escapeHtml(str) + '</code></pre>';
*   }
* });
* ```
*
**/
function MarkdownIt(presetName, options) {
	if (!(this instanceof MarkdownIt)) return new MarkdownIt(presetName, options);
	if (!options) {
		if (!isString$1(presetName)) {
			options = presetName || {};
			presetName = "default";
		}
	}
	/**
	* MarkdownIt#inline -> ParserInline
	*
	* Instance of [[ParserInline]]. You may need it to add new rules when
	* writing plugins. For simple rules control use [[MarkdownIt.disable]] and
	* [[MarkdownIt.enable]].
	**/
	this.inline = new ParserInline();
	/**
	* MarkdownIt#block -> ParserBlock
	*
	* Instance of [[ParserBlock]]. You may need it to add new rules when
	* writing plugins. For simple rules control use [[MarkdownIt.disable]] and
	* [[MarkdownIt.enable]].
	**/
	this.block = new ParserBlock();
	/**
	* MarkdownIt#core -> Core
	*
	* Instance of [[Core]] chain executor. You may need it to add new rules when
	* writing plugins. For simple rules control use [[MarkdownIt.disable]] and
	* [[MarkdownIt.enable]].
	**/
	this.core = new Core();
	/**
	* MarkdownIt#renderer -> Renderer
	*
	* Instance of [[Renderer]]. Use it to modify output look. Or to add rendering
	* rules for new token types, generated by plugins.
	*
	* ##### Example
	*
	* ```javascript
	* var md = require('markdown-it')();
	*
	* function myToken(tokens, idx, options, env, self) {
	*   //...
	*   return result;
	* };
	*
	* md.renderer.rules['my_token'] = myToken
	* ```
	*
	* See [[Renderer]] docs and [source code](https://github.com/markdown-it/markdown-it/blob/master/lib/renderer.mjs).
	**/
	this.renderer = new Renderer();
	/**
	* MarkdownIt#linkify -> LinkifyIt
	*
	* [linkify-it](https://github.com/markdown-it/linkify-it) instance.
	* Used by [linkify](https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/linkify.mjs)
	* rule.
	**/
	this.linkify = new LinkifyIt();
	/**
	* MarkdownIt#validateLink(url) -> Boolean
	*
	* Link validation function. CommonMark allows too much in links. By default
	* we disable `javascript:`, `vbscript:`, `file:` schemas, and almost all `data:...` schemas
	* except some embedded image types.
	*
	* You can change this behaviour:
	*
	* ```javascript
	* var md = require('markdown-it')();
	* // enable everything
	* md.validateLink = function () { return true; }
	* ```
	**/
	this.validateLink = validateLink;
	/**
	* MarkdownIt#normalizeLink(url) -> String
	*
	* Function used to encode link url to a machine-readable format,
	* which includes url-encoding, punycode, etc.
	**/
	this.normalizeLink = normalizeLink;
	/**
	* MarkdownIt#normalizeLinkText(url) -> String
	*
	* Function used to decode link url to a human-readable format`
	**/
	this.normalizeLinkText = normalizeLinkText;
	/**
	* MarkdownIt#utils -> utils
	*
	* Assorted utility functions, useful to write plugins. See details
	* [here](https://github.com/markdown-it/markdown-it/blob/master/lib/common/utils.mjs).
	**/
	this.utils = utils_exports;
	/**
	* MarkdownIt#helpers -> helpers
	*
	* Link components parser functions, useful to write plugins. See details
	* [here](https://github.com/markdown-it/markdown-it/blob/master/lib/helpers).
	**/
	this.helpers = assign$1({}, helpers_exports);
	this.options = {};
	this.configure(presetName);
	if (options) this.set(options);
}
/** chainable
* MarkdownIt.set(options)
*
* Set parser options (in the same format as in constructor). Probably, you
* will never need it, but you can change options after constructor call.
*
* ##### Example
*
* ```javascript
* var md = require('markdown-it')()
*             .set({ html: true, breaks: true })
*             .set({ typographer: true });
* ```
*
* __Note:__ To achieve the best possible performance, don't modify a
* `markdown-it` instance options on the fly. If you need multiple configurations
* it's best to create multiple instances and initialize each with separate
* config.
**/
MarkdownIt.prototype.set = function(options) {
	assign$1(this.options, options);
	return this;
};
/** chainable, internal
* MarkdownIt.configure(presets)
*
* Batch load of all options and compenent settings. This is internal method,
* and you probably will not need it. But if you will - see available presets
* and data structure [here](https://github.com/markdown-it/markdown-it/tree/master/lib/presets)
*
* We strongly recommend to use presets instead of direct config loads. That
* will give better compatibility with next versions.
**/
MarkdownIt.prototype.configure = function(presets) {
	const self = this;
	if (isString$1(presets)) {
		const presetName = presets;
		presets = config[presetName];
		if (!presets) throw new Error("Wrong `markdown-it` preset \"" + presetName + "\", check name");
	}
	if (!presets) throw new Error("Wrong `markdown-it` preset, can't be empty");
	if (presets.options) self.set(presets.options);
	if (presets.components) Object.keys(presets.components).forEach(function(name) {
		if (presets.components[name].rules) self[name].ruler.enableOnly(presets.components[name].rules);
		if (presets.components[name].rules2) self[name].ruler2.enableOnly(presets.components[name].rules2);
	});
	return this;
};
/** chainable
* MarkdownIt.enable(list, ignoreInvalid)
* - list (String|Array): rule name or list of rule names to enable
* - ignoreInvalid (Boolean): set `true` to ignore errors when rule not found.
*
* Enable list or rules. It will automatically find appropriate components,
* containing rules with given names. If rule not found, and `ignoreInvalid`
* not set - throws exception.
*
* ##### Example
*
* ```javascript
* var md = require('markdown-it')()
*             .enable(['sub', 'sup'])
*             .disable('smartquotes');
* ```
**/
MarkdownIt.prototype.enable = function(list, ignoreInvalid) {
	let result = [];
	if (!Array.isArray(list)) list = [list];
	[
		"core",
		"block",
		"inline"
	].forEach(function(chain) {
		result = result.concat(this[chain].ruler.enable(list, true));
	}, this);
	result = result.concat(this.inline.ruler2.enable(list, true));
	const missed = list.filter(function(name) {
		return result.indexOf(name) < 0;
	});
	if (missed.length && !ignoreInvalid) throw new Error("MarkdownIt. Failed to enable unknown rule(s): " + missed);
	return this;
};
/** chainable
* MarkdownIt.disable(list, ignoreInvalid)
* - list (String|Array): rule name or list of rule names to disable.
* - ignoreInvalid (Boolean): set `true` to ignore errors when rule not found.
*
* The same as [[MarkdownIt.enable]], but turn specified rules off.
**/
MarkdownIt.prototype.disable = function(list, ignoreInvalid) {
	let result = [];
	if (!Array.isArray(list)) list = [list];
	[
		"core",
		"block",
		"inline"
	].forEach(function(chain) {
		result = result.concat(this[chain].ruler.disable(list, true));
	}, this);
	result = result.concat(this.inline.ruler2.disable(list, true));
	const missed = list.filter(function(name) {
		return result.indexOf(name) < 0;
	});
	if (missed.length && !ignoreInvalid) throw new Error("MarkdownIt. Failed to disable unknown rule(s): " + missed);
	return this;
};
/** chainable
* MarkdownIt.use(plugin, params)
*
* Load specified plugin with given params into current parser instance.
* It's just a sugar to call `plugin(md, params)` with curring.
*
* ##### Example
*
* ```javascript
* var iterator = require('markdown-it-for-inline');
* var md = require('markdown-it')()
*             .use(iterator, 'foo_replace', 'text', function (tokens, idx) {
*               tokens[idx].content = tokens[idx].content.replace(/foo/g, 'bar');
*             });
* ```
**/
MarkdownIt.prototype.use = function(plugin) {
	const args = [this].concat(Array.prototype.slice.call(arguments, 1));
	plugin.apply(plugin, args);
	return this;
};
/** internal
* MarkdownIt.parse(src, env) -> Array
* - src (String): source string
* - env (Object): environment sandbox
*
* Parse input string and return list of block tokens (special token type
* "inline" will contain list of inline tokens). You should not call this
* method directly, until you write custom renderer (for example, to produce
* AST).
*
* `env` is used to pass data between "distributed" rules and return additional
* metadata like reference info, needed for the renderer. It also can be used to
* inject data in specific cases. Usually, you will be ok to pass `{}`,
* and then pass updated object to renderer.
**/
MarkdownIt.prototype.parse = function(src, env) {
	if (typeof src !== "string") throw new Error("Input data should be a String");
	const state = new this.core.State(src, this, env);
	this.core.process(state);
	return state.tokens;
};
/**
* MarkdownIt.render(src [, env]) -> String
* - src (String): source string
* - env (Object): environment sandbox
*
* Render markdown string into html. It does all magic for you :).
*
* `env` can be used to inject additional metadata (`{}` by default).
* But you will not need it with high probability. See also comment
* in [[MarkdownIt.parse]].
**/
MarkdownIt.prototype.render = function(src, env) {
	env = env || {};
	return this.renderer.render(this.parse(src, env), this.options, env);
};
/** internal
* MarkdownIt.parseInline(src, env) -> Array
* - src (String): source string
* - env (Object): environment sandbox
*
* The same as [[MarkdownIt.parse]] but skip all block rules. It returns the
* block tokens list with the single `inline` element, containing parsed inline
* tokens in `children` property. Also updates `env` object.
**/
MarkdownIt.prototype.parseInline = function(src, env) {
	const state = new this.core.State(src, this, env);
	state.inlineMode = true;
	this.core.process(state);
	return state.tokens;
};
/**
* MarkdownIt.renderInline(src [, env]) -> String
* - src (String): source string
* - env (Object): environment sandbox
*
* Similar to [[MarkdownIt.render]] but for single paragraph content. Result
* will NOT be wrapped into `<p>` tags.
**/
MarkdownIt.prototype.renderInline = function(src, env) {
	env = env || {};
	return this.renderer.render(this.parseInline(src, env), this.options, env);
};
const css$2 = ".lbq12a_4e9fae_root{color:inherit;overflow-wrap:anywhere}.lbq12a_4e9fae_root>:first-child{margin-top:0}.lbq12a_4e9fae_root>:last-child{margin-bottom:0}.lbq12a_4e9fae_root p,.lbq12a_4e9fae_root ul,.lbq12a_4e9fae_root ol,.lbq12a_4e9fae_root pre,.lbq12a_4e9fae_root blockquote{margin:.55em 0}.lbq12a_4e9fae_root ul,.lbq12a_4e9fae_root ol{padding-left:1.5em}.lbq12a_4e9fae_root code{font-family:var(--dsw-font-family-mono,ui-monospace, SFMono-Regular, Menlo, monospace);font-size:.92em}.lbq12a_4e9fae_root :not(pre)>code{background:var(--dsw-alias-fill-tertiary,#7f7f7f24);border-radius:4px;padding:.1em .3em}.lbq12a_4e9fae_root pre{background:var(--dsw-alias-fill-tertiary,#7f7f7f24);border-radius:8px;padding:10px 12px;overflow-x:auto}.lbq12a_4e9fae_root a{color:var(--dsw-alias-label-accent,currentColor)}.lbq12a_4e9fae_root blockquote{border-left:3px solid var(--dsw-alias-border-l1,currentColor);color:var(--dsw-alias-label-secondary,inherit);padding-left:.8em}";
const tagId$2 = "@just-genius/dsh-plugin-ui/MarkdownText.module.css-4e9fae";
if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$2) + "]") === null) {
	const tag = document.createElement("style");
	tag.dataset.plugin = "@just-genius/dsh-plugin-ui";
	tag.dataset.pluginCss = tagId$2;
	tag.textContent = css$2;
	document.head.appendChild(tag);
}
const markdown = new MarkdownIt({
	breaks: false,
	html: false,
	linkify: true,
	typographer: false
});
const defaultLinkOpen = markdown.renderer.rules.link_open;
markdown.renderer.rules.link_open = (tokens, index, options, env, self) => {
	const token = tokens[index];
	token?.attrSet("target", "_blank");
	token?.attrSet("rel", "noreferrer noopener");
	return defaultLinkOpen?.(tokens, index, options, env, self) ?? self.renderToken(tokens, index, options);
};
const css$1 = ".RqNyuG_27bd4a_confirmation{width:min(440px,100%);max-height:calc(100vh - 48px);overflow:hidden}.RqNyuG_27bd4a_content{overscroll-behavior:contain;min-height:0;overflow-y:auto}.RqNyuG_27bd4a_warning{color:var(--dsw-alias-label-secondary);align-items:flex-start;gap:10px;font-size:14px;line-height:22px;display:flex}.RqNyuG_27bd4a_warning p{margin:0}.RqNyuG_27bd4a_warningIcon{color:var(--dsw-alias-state-error-primary);flex:none;margin-top:2px}.RqNyuG_27bd4a_acknowledgement{color:var(--dsw-alias-label-primary);cursor:pointer;align-items:flex-start;gap:10px;margin-top:20px;font-size:14px;line-height:22px;display:flex}.RqNyuG_27bd4a_acknowledgement input{width:16px;height:16px;accent-color:var(--dsw-alias-button-primary-fill);flex:none;margin:3px 0 0}.RqNyuG_27bd4a_action{min-width:88px}";
const tagId$1 = "@just-genius/dsh-plugin-ui/RiskConfirmation.module.css-27bd4a";
if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$1) + "]") === null) {
	const tag = document.createElement("style");
	tag.dataset.plugin = "@just-genius/dsh-plugin-ui";
	tag.dataset.pluginCss = tagId$1;
	tag.textContent = css$1;
	document.head.appendChild(tag);
}
const css$10 = ".RuU-ja_9a33f8_toast{z-index:1100;pointer-events:none;-webkit-app-region:no-drag;app-region:no-drag;background:var(--dsw-alias-button-contrast-fill);max-width:min(560px,100vw - 48px);color:var(--dsw-alias-label-primary-inverted);box-shadow:var(--dsw-shadow-lv3);border-radius:14px;align-items:center;gap:10px;padding:12px 16px;font-size:14px;line-height:22px;animation:.16s ease-out RuU-ja_9a33f8_toast-in,1s 3s forwards RuU-ja_9a33f8_toast-fade;display:flex;position:fixed;top:120px;left:50%;transform:translate(-50%)}.RuU-ja_9a33f8_icon{color:var(--dsw-alias-state-warn-label);flex:none;place-items:center;display:grid}@keyframes RuU-ja_9a33f8_toast-in{0%{opacity:0;transform:translate(-50%,-6px)}to{opacity:1;transform:translate(-50%)}}@keyframes RuU-ja_9a33f8_toast-fade{to{opacity:0}}@media (prefers-reduced-motion:reduce){.RuU-ja_9a33f8_toast{animation:1s 3s forwards RuU-ja_9a33f8_toast-fade}}";
const tagId$10 = "@just-genius/dsh-plugin-ui/Toast.module.css-9a33f8";
if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$10) + "]") === null) {
	const tag = document.createElement("style");
	tag.dataset.plugin = "@just-genius/dsh-plugin-ui";
	tag.dataset.pluginCss = tagId$10;
	tag.textContent = css$10;
	document.head.appendChild(tag);
}
/**
* Width-fitting rules for the forwarded conversation surfaces.
*
* `@deepseek-ai/dsh-client-ui-primitives` ships `MarkdownText`, `CodeBlock`,
* `JsonBlock` and `TerminalBlock` as a module-loader bundle.
* A plugin bundle that imports them through this package gets the components
* with their hashed class names but WITHOUT the matching stylesheet —
* verified against a built bundle: the class names are referenced on the DOM
* while no injected `<style>` contains them (`TnfYnq_*`, `twwVoa_*`,
* `fXMbVG_*`, `_9j33BW_*` all appear in the markup and in none of the
* injected CSS strings).
*
* The consequence is not merely cosmetic: with no stylesheet the browser's
* defaults apply, and a default `<pre>` never wraps. In a narrow side panel
* that means any long code line, table, or unwrapped token produces a
* horizontal scrollbar — the transcript stops reflowing to the window width.
*
* These rules restore the wrapping behaviour the official sheet would provide.
* They are structural only (wrapping, min-width, contained overflow) — colors,
* fonts and spacing stay with the consuming plugin, so this sheet cannot
* restyle a surface it does not own.
*
* Specificity note: every rule targets descendant elements (`.md pre`) rather
* than the hashed module classes, so the rules hold regardless of which hash
* the upstream build produced.
*/
/**
* The raw rule text, without a selector prefix.
*
* Exported so a consumer can scope the rules to its own containers by
* prefixing them (see {@link fitRulesFor}) or inject them verbatim under a
* global class (see {@link ensurePrimitivesFitStyles}).
*
* Selectors are descendant-only, so a consumer scopes the whole set by
* wrapping it in one ancestor selector.
*/
const FIT_RULES = `
/* Long unbroken tokens (URLs, hashes, minified lines) wrap rather than
   overflow: anywhere plus an explicit break opportunity covers a bare
   text node in engines that need it. */
&{min-width:0;max-width:100%;overflow-wrap:anywhere;word-break:break-word}
& :where(p,li,blockquote,dd,dt,h1,h2,h3,h4,h5,h6){overflow-wrap:anywhere}
& :where(code,span,kbd,samp){overflow-wrap:anywhere;word-break:break-word}

/* Fenced code: wrap long lines instead of scrolling sideways. pre-wrap
   preserves indentation; break-word handles a token wider than the panel.
   The official CodeBlock sheet already does this, so this rule matters for
   raw <pre> markup that reaches a container without that sheet. */
& :where(pre){white-space:pre-wrap;word-break:break-word;overflow-wrap:anywhere;max-width:100%}
& :where(pre) :where(code){white-space:pre-wrap;word-break:break-word;overflow-wrap:anywhere}

/* Tables are deliberately NOT forced to reflow. The official sheet puts them
   in a .tableScroll wrapper (max-width:100%;overflow-x:auto) whose table is
   width:max-content — forcing table-layout:fixed there collapses the columns.
   Cells still need to wrap so a wide cell does not force the wrapper itself
   past the panel edge. */
& :where(th,td){overflow-wrap:anywhere;word-break:break-word}

/* Inline code chips must not become the widest element on their row. */
& :not(pre) > code{max-width:100%;overflow-wrap:anywhere}

/* Math: KaTeX display blocks overflow rather than wrap; keep them contained. */
& :where(.katex-display){max-width:100%;overflow-x:auto}

/* Replaced content stays inside the column. */
& :where(img,video,svg){max-width:100%;height:auto}
`;
/**
* Scope the fit rules to one or more ancestor selectors.
*
* @param selectors - CSS selectors that own the rendered primitives, e.g.
*   `'.dsh-codex-sidechat-md-body'`. The `&` placeholder in the rule text is
*   replaced by each selector, so the rules apply to the container's
*   descendants at any depth.
* @returns a stylesheet fragment safe to concatenate into a plugin's CSS.
*/
function fitRulesFor(selectors) {
	return selectors.map((selector) => FIT_RULES.replaceAll("&", selector)).join("\n");
}
fitRulesFor([`.dsh-ui-primitives-fit`]);
//#endregion
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
/** True only when someone asked for a human gate — not after every step. */
function waitingForConfirm(plan) {
	return plan.confirm !== null;
}
//#endregion
//#region ../../node_modules/.pnpm/classcat@5.0.5/node_modules/classcat/index.js
function cc(names) {
	if (typeof names === "string" || typeof names === "number") return "" + names;
	let out = "";
	if (Array.isArray(names)) {
		for (let i = 0, tmp; i < names.length; i++) if ((tmp = cc(names[i])) !== "") out += (out && " ") + tmp;
	} else for (let k in names) if (names[k]) out += (out && " ") + k;
	return out;
}
//#endregion
//#region ../../node_modules/.pnpm/use-sync-external-store@1.2.0_react@18.3.1/node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.production.min.js
/**
* @license React
* use-sync-external-store-shim.production.min.js
*
* Copyright (c) Facebook, Inc. and its affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_use_sync_external_store_shim_production_min = /* @__PURE__ */ __commonJSMin(((exports) => {
	var e = require("react");
	function h(a, b) {
		return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
	}
	var k = "function" === typeof Object.is ? Object.is : h;
	var l = e.useState;
	var m = e.useEffect;
	var n = e.useLayoutEffect;
	var p = e.useDebugValue;
	function q(a, b) {
		var d = b(), f = l({ inst: {
			value: d,
			getSnapshot: b
		} }), c = f[0].inst, g = f[1];
		n(function() {
			c.value = d;
			c.getSnapshot = b;
			r(c) && g({ inst: c });
		}, [
			a,
			d,
			b
		]);
		m(function() {
			r(c) && g({ inst: c });
			return a(function() {
				r(c) && g({ inst: c });
			});
		}, [a]);
		p(d);
		return d;
	}
	function r(a) {
		var b = a.getSnapshot;
		a = a.value;
		try {
			var d = b();
			return !k(a, d);
		} catch (f) {
			return !0;
		}
	}
	function t(a, b) {
		return b();
	}
	var u = "undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement ? t : q;
	exports.useSyncExternalStore = void 0 !== e.useSyncExternalStore ? e.useSyncExternalStore : u;
}));
//#endregion
//#region ../../node_modules/.pnpm/use-sync-external-store@1.2.0_react@18.3.1/node_modules/use-sync-external-store/shim/index.js
var require_shim = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_use_sync_external_store_shim_production_min();
}));
//#endregion
//#region ../../node_modules/.pnpm/use-sync-external-store@1.2.0_react@18.3.1/node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.production.min.js
/**
* @license React
* use-sync-external-store-shim/with-selector.production.min.js
*
* Copyright (c) Facebook, Inc. and its affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_with_selector_production_min = /* @__PURE__ */ __commonJSMin(((exports) => {
	var h = require("react");
	var n = require_shim();
	function p(a, b) {
		return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
	}
	var q = "function" === typeof Object.is ? Object.is : p;
	var r = n.useSyncExternalStore;
	var t = h.useRef;
	var u = h.useEffect;
	var v = h.useMemo;
	var w = h.useDebugValue;
	exports.useSyncExternalStoreWithSelector = function(a, b, e, l, g) {
		var c = t(null);
		if (null === c.current) {
			var f = {
				hasValue: !1,
				value: null
			};
			c.current = f;
		} else f = c.current;
		c = v(function() {
			function a(a) {
				if (!c) {
					c = !0;
					d = a;
					a = l(a);
					if (void 0 !== g && f.hasValue) {
						var b = f.value;
						if (g(b, a)) return k = b;
					}
					return k = a;
				}
				b = k;
				if (q(d, a)) return b;
				var e = l(a);
				if (void 0 !== g && g(b, e)) return b;
				d = a;
				return k = e;
			}
			var c = !1, d, k, m = void 0 === e ? null : e;
			return [function() {
				return a(b());
			}, null === m ? void 0 : function() {
				return a(m());
			}];
		}, [
			b,
			e,
			l,
			g
		]);
		var d = r(a, c[0], c[1]);
		u(function() {
			f.hasValue = !0;
			f.value = d;
		}, [d]);
		w(d);
		return d;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/use-sync-external-store@1.2.0_react@18.3.1/node_modules/use-sync-external-store/shim/with-selector.js
var require_with_selector = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_with_selector_production_min();
}));
//#endregion
//#region ../../node_modules/.pnpm/zustand@4.4.7_@types+react@18.3.31_immer@10.2.0_react@18.3.1/node_modules/zustand/esm/vanilla.mjs
const createStoreImpl = (createState) => {
	let state;
	const listeners = /* @__PURE__ */ new Set();
	const setState = (partial, replace) => {
		const nextState = typeof partial === "function" ? partial(state) : partial;
		if (!Object.is(nextState, state)) {
			const previousState = state;
			state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
			listeners.forEach((listener) => listener(state, previousState));
		}
	};
	const getState = () => state;
	const subscribe = (listener) => {
		listeners.add(listener);
		return () => listeners.delete(listener);
	};
	const destroy = () => {
		if (({}.env ? {}.env.MODE : void 0) !== "production") console.warn("[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected.");
		listeners.clear();
	};
	const api = {
		setState,
		getState,
		subscribe,
		destroy
	};
	state = createState(setState, getState, api);
	return api;
};
const createStore = (createState) => createState ? createStoreImpl(createState) : createStoreImpl;
//#endregion
//#region ../../node_modules/.pnpm/zustand@4.4.7_@types+react@18.3.31_immer@10.2.0_react@18.3.1/node_modules/zustand/esm/traditional.mjs
var import_with_selector = /* @__PURE__ */ __toESM(require_with_selector(), 1);
const { useDebugValue } = react.default;
const { useSyncExternalStoreWithSelector } = import_with_selector.default;
function useStoreWithEqualityFn(api, selector = api.getState, equalityFn) {
	const slice = useSyncExternalStoreWithSelector(api.subscribe, api.getState, api.getServerState || api.getState, selector, equalityFn);
	useDebugValue(slice);
	return slice;
}
const createWithEqualityFnImpl = (createState, defaultEqualityFn) => {
	const api = createStore(createState);
	const useBoundStoreWithEqualityFn = (selector, equalityFn = defaultEqualityFn) => useStoreWithEqualityFn(api, selector, equalityFn);
	Object.assign(useBoundStoreWithEqualityFn, api);
	return useBoundStoreWithEqualityFn;
};
const createWithEqualityFn = (createState, defaultEqualityFn) => createState ? createWithEqualityFnImpl(createState, defaultEqualityFn) : createWithEqualityFnImpl;
//#endregion
//#region ../../node_modules/.pnpm/zustand@4.4.7_@types+react@18.3.31_immer@10.2.0_react@18.3.1/node_modules/zustand/esm/shallow.mjs
function shallow$1(objA, objB) {
	if (Object.is(objA, objB)) return true;
	if (typeof objA !== "object" || objA === null || typeof objB !== "object" || objB === null) return false;
	if (objA instanceof Map && objB instanceof Map) {
		if (objA.size !== objB.size) return false;
		for (const [key, value] of objA) if (!Object.is(value, objB.get(key))) return false;
		return true;
	}
	if (objA instanceof Set && objB instanceof Set) {
		if (objA.size !== objB.size) return false;
		for (const value of objA) if (!objB.has(value)) return false;
		return true;
	}
	const keysA = Object.keys(objA);
	if (keysA.length !== Object.keys(objB).length) return false;
	for (let i = 0; i < keysA.length; i++) if (!Object.prototype.hasOwnProperty.call(objB, keysA[i]) || !Object.is(objA[keysA[i]], objB[keysA[i]])) return false;
	return true;
}
//#endregion
//#region ../../node_modules/.pnpm/d3-dispatch@3.0.1/node_modules/d3-dispatch/src/dispatch.js
var noop$1 = { value: () => {} };
function dispatch() {
	for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
		if (!(t = arguments[i] + "") || t in _ || /[\s.]/.test(t)) throw new Error("illegal type: " + t);
		_[t] = [];
	}
	return new Dispatch(_);
}
function Dispatch(_) {
	this._ = _;
}
function parseTypenames$1(typenames, types) {
	return typenames.trim().split(/^|\s+/).map(function(t) {
		var name = "", i = t.indexOf(".");
		if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
		if (t && !types.hasOwnProperty(t)) throw new Error("unknown type: " + t);
		return {
			type: t,
			name
		};
	});
}
Dispatch.prototype = dispatch.prototype = {
	constructor: Dispatch,
	on: function(typename, callback) {
		var _ = this._, T = parseTypenames$1(typename + "", _), t, i = -1, n = T.length;
		if (arguments.length < 2) {
			while (++i < n) if ((t = (typename = T[i]).type) && (t = get$1(_[t], typename.name))) return t;
			return;
		}
		if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
		while (++i < n) if (t = (typename = T[i]).type) _[t] = set$1(_[t], typename.name, callback);
		else if (callback == null) for (t in _) _[t] = set$1(_[t], typename.name, null);
		return this;
	},
	copy: function() {
		var copy = {}, _ = this._;
		for (var t in _) copy[t] = _[t].slice();
		return new Dispatch(copy);
	},
	call: function(type, that) {
		if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];
		if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
		for (t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
	},
	apply: function(type, that, args) {
		if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
		for (var t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
	}
};
function get$1(type, name) {
	for (var i = 0, n = type.length, c; i < n; ++i) if ((c = type[i]).name === name) return c.value;
}
function set$1(type, name, callback) {
	for (var i = 0, n = type.length; i < n; ++i) if (type[i].name === name) {
		type[i] = noop$1, type = type.slice(0, i).concat(type.slice(i + 1));
		break;
	}
	if (callback != null) type.push({
		name,
		value: callback
	});
	return type;
}
var namespaces_default = {
	svg: "http://www.w3.org/2000/svg",
	xhtml: "http://www.w3.org/1999/xhtml",
	xlink: "http://www.w3.org/1999/xlink",
	xml: "http://www.w3.org/XML/1998/namespace",
	xmlns: "http://www.w3.org/2000/xmlns/"
};
//#endregion
//#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/namespace.js
function namespace_default(name) {
	var prefix = name += "", i = prefix.indexOf(":");
	if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
	return namespaces_default.hasOwnProperty(prefix) ? {
		space: namespaces_default[prefix],
		local: name
	} : name;
}
//#endregion
//#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/creator.js
function creatorInherit(name) {
	return function() {
		var document = this.ownerDocument, uri = this.namespaceURI;
		return uri === "http://www.w3.org/1999/xhtml" && document.documentElement.namespaceURI === "http://www.w3.org/1999/xhtml" ? document.createElement(name) : document.createElementNS(uri, name);
	};
}
function creatorFixed(fullname) {
	return function() {
		return this.ownerDocument.createElementNS(fullname.space, fullname.local);
	};
}
function creator_default(name) {
	var fullname = namespace_default(name);
	return (fullname.local ? creatorFixed : creatorInherit)(fullname);
}
//#endregion
//#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selector.js
function none() {}
function selector_default(selector) {
	return selector == null ? none : function() {
		return this.querySelector(selector);
	};
}
//#endregion
//#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/select.js
function select_default$2(select) {
	if (typeof select !== "function") select = selector_default(select);
	for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
		if ("__data__" in node) subnode.__data__ = node.__data__;
		subgroup[i] = subnode;
	}
	return new Selection$1(subgroups, this._parents);
}
//#endregion
//#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/array.js
function array(x) {
	return x == null ? [] : Array.isArray(x) ? x : Array.from(x);
}
//#endregion
//#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selectorAll.js
function empty() {
	return [];
}
function selectorAll_default(selector) {
	return selector == null ? empty : function() {
		return this.querySelectorAll(selector);
	};
}
//#endregion
//#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/selectAll.js
function arrayAll(select) {
	return function() {
		return array(select.apply(this, arguments));
	};
}
function selectAll_default$1(select) {
	if (typeof select === "function") select = arrayAll(select);
	else select = selectorAll_default(select);
	for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) if (node = group[i]) {
		subgroups.push(select.call(node, node.__data__, i, group));
		parents.push(node);
	}
	return new Selection$1(subgroups, parents);
}
//#endregion
//#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/matcher.js
function matcher_default(selector) {
	return function() {
		return this.matches(selector);
	};
}
function childMatcher(selector) {
	return function(node) {
		return node.matches(selector);
	};
}
//#endregion
//#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/selectChild.js
var find = Array.prototype.find;
function childFind(match) {
	return function() {
		return find.call(this.children, match);
	};
}
function childFirst() {
	return this.firstElementChild;
}
function selectChild_default(match) {
	return this.select(match == null ? childFirst : childFind(typeof match === "function" ? match : childMatcher(match)));
}
//#endregion
//#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/selectChildren.js
var filter = Array.prototype.filter;
function children() {
	return Array.from(this.children);
}
function childrenFilter(match) {
	return function() {
		return filter.call(this.children, match);
	};
}
function selectChildren_default(match) {
	return this.selectAll(match == null ? children : childrenFilter(typeof match === "function" ? match : childMatcher(match)));
}
//#endregion
//#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/filter.js
function filter_default$1(match) {
	if (typeof match !== "function") match = matcher_default(match);
	for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) if ((node = group[i]) && match.call(node, node.__data__, i, group)) subgroup.push(node);
	return new Selection$1(subgroups, this._parents);
}
//#endregion
//#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/sparse.js
function sparse_default(update) {
	return new Array(update.length);
}
//#endregion
//#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/enter.js
function enter_default() {
	return new Selection$1(this._enter || this._groups.map(sparse_default), this._parents);
}
function EnterNode(parent, datum) {
	this.ownerDocument = parent.ownerDocument;
	this.namespaceURI = parent.namespaceURI;
	this._next = null;
	this._parent = parent;
	this.__data__ = datum;
}
EnterNode.prototype = {
	constructor: EnterNode,
	appendChild: function(child) {
		return this._parent.insertBefore(child, this._next);
	},
	insertBefore: function(child, next) {
		return this._parent.insertBefore(child, next);
	},
	querySelector: function(selector) {
		return this._parent.querySelector(selector);
	},
	querySelectorAll: function(selector) {
		return this._parent.querySelectorAll(selector);
	}
};
//#endregion
//#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/constant.js
function constant_default$3(x) {
	return function() {
		return x;
	};
}
//#endregion
//#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/data.js
function bindIndex(parent, group, enter, update, exit, data) {
	var i = 0, node, groupLength = group.length, dataLength = data.length;
	for (; i < dataLength; ++i) if (node = group[i]) {
		node.__data__ = data[i];
		update[i] = node;
	} else enter[i] = new EnterNode(parent, data[i]);
	for (; i < groupLength; ++i) if (node = group[i]) exit[i] = node;
}
function bindKey(parent, group, enter, update, exit, data, key) {
	var i, node, nodeByKeyValue = /* @__PURE__ */ new Map(), groupLength = group.length, dataLength = data.length, keyValues = new Array(groupLength), keyValue;
	for (i = 0; i < groupLength; ++i) if (node = group[i]) {
		keyValues[i] = keyValue = key.call(node, node.__data__, i, group) + "";
		if (nodeByKeyValue.has(keyValue)) exit[i] = node;
		else nodeByKeyValue.set(keyValue, node);
	}
	for (i = 0; i < dataLength; ++i) {
		keyValue = key.call(parent, data[i], i, data) + "";
		if (node = nodeByKeyValue.get(keyValue)) {
			update[i] = node;
			node.__data__ = data[i];
			nodeByKeyValue.delete(keyValue);
		} else enter[i] = new EnterNode(parent, data[i]);
	}
	for (i = 0; i < groupLength; ++i) if ((node = group[i]) && nodeByKeyValue.get(keyValues[i]) === node) exit[i] = node;
}
function datum(node) {
	return node.__data__;
}
function data_default(value, key) {
	if (!arguments.length) return Array.from(this, datum);
	var bind = key ? bindKey : bindIndex, parents = this._parents, groups = this._groups;
	if (typeof value !== "function") value = constant_default$3(value);
	for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
		var parent = parents[j], group = groups[j], groupLength = group.length, data = arraylike(value.call(parent, parent && parent.__data__, j, parents)), dataLength = data.length, enterGroup = enter[j] = new Array(dataLength), updateGroup = update[j] = new Array(dataLength);
		bind(parent, group, enterGroup, updateGroup, exit[j] = new Array(groupLength), data, key);
		for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) if (previous = enterGroup[i0]) {
			if (i0 >= i1) i1 = i0 + 1;
			while (!(next = updateGroup[i1]) && ++i1 < dataLength);
			previous._next = next || null;
		}
	}
	update = new Selection$1(update, parents);
	update._enter = enter;
	update._exit = exit;
	return update;
}
function arraylike(data) {
	return typeof data === "object" && "length" in data ? data : Array.from(data);
}
//#endregion
//#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/exit.js
function exit_default() {
	return new Selection$1(this._exit || this._groups.map(sparse_default), this._parents);
}
//#endregion
//#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/join.js
function join_default(onenter, onupdate, onexit) {
	var enter = this.enter(), update = this, exit = this.exit();
	if (typeof onenter === "function") {
		enter = onenter(enter);
		if (enter) enter = enter.selection();
	} else enter = enter.append(onenter + "");
	if (onupdate != null) {
		update = onupdate(update);
		if (update) update = update.selection();
	}
	if (onexit == null) exit.remove();
	else onexit(exit);
	return enter && update ? enter.merge(update).order() : update;
}
//#endregion
//#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/merge.js
function merge_default$1(context) {
	var selection = context.selection ? context.selection() : context;
	for (var groups0 = this._groups, groups1 = selection._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) if (node = group0[i] || group1[i]) merge[i] = node;
	for (; j < m0; ++j) merges[j] = groups0[j];
	return new Selection$1(merges, this._parents);
}
//#endregion
//#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/order.js
function order_default() {
	for (var groups = this._groups, j = -1, m = groups.length; ++j < m;) for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0;) if (node = group[i]) {
		if (next && node.compareDocumentPosition(next) ^ 4) next.parentNode.insertBefore(node, next);
		next = node;
	}
	return this;
}
//#endregion
//#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/sort.js
function sort_default(compare) {
	if (!compare) compare = ascending;
	function compareNode(a, b) {
		return a && b ? compare(a.__data__, b.__data__) : !a - !b;
	}
	for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
		for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) if (node = group[i]) sortgroup[i] = node;
		sortgroup.sort(compareNode);
	}
	return new Selection$1(sortgroups, this._parents).order();
}
function ascending(a, b) {
	return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}
//#endregion
//#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/call.js
function call_default() {
	var callback = arguments[0];
	arguments[0] = this;
	callback.apply(null, arguments);
	return this;
}
//#endregion
//#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/nodes.js
function nodes_default() {
	return Array.from(this);
}
//#endregion
//#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/node.js
function node_default() {
	for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
		var node = group[i];
		if (node) return node;
	}
	return null;
}
//#endregion
//#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/size.js
function size_default() {
	let size = 0;
	for (const node of this) ++size;
	return size;
}
//#endregion
//#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/empty.js
function empty_default() {
	return !this.node();
}
//#endregion
//#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/each.js
function each_default(callback) {
	for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) if (node = group[i]) callback.call(node, node.__data__, i, group);
	return this;
}
//#endregion
//#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/attr.js
function attrRemove$1(name) {
	return function() {
		this.removeAttribute(name);
	};
}
function attrRemoveNS$1(fullname) {
	return function() {
		this.removeAttributeNS(fullname.space, fullname.local);
	};
}
function attrConstant$1(name, value) {
	return function() {
		this.setAttribute(name, value);
	};
}
function attrConstantNS$1(fullname, value) {
	return function() {
		this.setAttributeNS(fullname.space, fullname.local, value);
	};
}
function attrFunction$1(name, value) {
	return function() {
		var v = value.apply(this, arguments);
		if (v == null) this.removeAttribute(name);
		else this.setAttribute(name, v);
	};
}
function attrFunctionNS$1(fullname, value) {
	return function() {
		var v = value.apply(this, arguments);
		if (v == null) this.removeAttributeNS(fullname.space, fullname.local);
		else this.setAttributeNS(fullname.space, fullname.local, v);
	};
}
function attr_default$1(name, value) {
	var fullname = namespace_default(name);
	if (arguments.length < 2) {
		var node = this.node();
		return fullname.local ? node.getAttributeNS(fullname.space, fullname.local) : node.getAttribute(fullname);
	}
	return this.each((value == null ? fullname.local ? attrRemoveNS$1 : attrRemove$1 : typeof value === "function" ? fullname.local ? attrFunctionNS$1 : attrFunction$1 : fullname.local ? attrConstantNS$1 : attrConstant$1)(fullname, value));
}
//#endregion
//#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/window.js
function window_default(node) {
	return node.ownerDocument && node.ownerDocument.defaultView || node.document && node || node.defaultView;
}
//#endregion
//#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/style.js
function styleRemove$1(name) {
	return function() {
		this.style.removeProperty(name);
	};
}
function styleConstant$1(name, value, priority) {
	return function() {
		this.style.setProperty(name, value, priority);
	};
}
function styleFunction$1(name, value, priority) {
	return function() {
		var v = value.apply(this, arguments);
		if (v == null) this.style.removeProperty(name);
		else this.style.setProperty(name, v, priority);
	};
}
function style_default$1(name, value, priority) {
	return arguments.length > 1 ? this.each((value == null ? styleRemove$1 : typeof value === "function" ? styleFunction$1 : styleConstant$1)(name, value, priority == null ? "" : priority)) : styleValue(this.node(), name);
}
function styleValue(node, name) {
	return node.style.getPropertyValue(name) || window_default(node).getComputedStyle(node, null).getPropertyValue(name);
}
//#endregion
//#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/property.js
function propertyRemove(name) {
	return function() {
		delete this[name];
	};
}
function propertyConstant(name, value) {
	return function() {
		this[name] = value;
	};
}
function propertyFunction(name, value) {
	return function() {
		var v = value.apply(this, arguments);
		if (v == null) delete this[name];
		else this[name] = v;
	};
}
function property_default(name, value) {
	return arguments.length > 1 ? this.each((value == null ? propertyRemove : typeof value === "function" ? propertyFunction : propertyConstant)(name, value)) : this.node()[name];
}
//#endregion
//#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/classed.js
function classArray(string) {
	return string.trim().split(/^|\s+/);
}
function classList(node) {
	return node.classList || new ClassList(node);
}
function ClassList(node) {
	this._node = node;
	this._names = classArray(node.getAttribute("class") || "");
}
ClassList.prototype = {
	add: function(name) {
		if (this._names.indexOf(name) < 0) {
			this._names.push(name);
			this._node.setAttribute("class", this._names.join(" "));
		}
	},
	remove: function(name) {
		var i = this._names.indexOf(name);
		if (i >= 0) {
			this._names.splice(i, 1);
			this._node.setAttribute("class", this._names.join(" "));
		}
	},
	contains: function(name) {
		return this._names.indexOf(name) >= 0;
	}
};
function classedAdd(node, names) {
	var list = classList(node), i = -1, n = names.length;
	while (++i < n) list.add(names[i]);
}
function classedRemove(node, names) {
	var list = classList(node), i = -1, n = names.length;
	while (++i < n) list.remove(names[i]);
}
function classedTrue(names) {
	return function() {
		classedAdd(this, names);
	};
}
function classedFalse(names) {
	return function() {
		classedRemove(this, names);
	};
}
function classedFunction(names, value) {
	return function() {
		(value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
	};
}
function classed_default(name, value) {
	var names = classArray(name + "");
	if (arguments.length < 2) {
		var list = classList(this.node()), i = -1, n = names.length;
		while (++i < n) if (!list.contains(names[i])) return false;
		return true;
	}
	return this.each((typeof value === "function" ? classedFunction : value ? classedTrue : classedFalse)(names, value));
}
//#endregion
//#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/text.js
function textRemove() {
	this.textContent = "";
}
function textConstant$1(value) {
	return function() {
		this.textContent = value;
	};
}
function textFunction$1(value) {
	return function() {
		var v = value.apply(this, arguments);
		this.textContent = v == null ? "" : v;
	};
}
function text_default$1(value) {
	return arguments.length ? this.each(value == null ? textRemove : (typeof value === "function" ? textFunction$1 : textConstant$1)(value)) : this.node().textContent;
}
//#endregion
//#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/html.js
function htmlRemove() {
	this.innerHTML = "";
}
function htmlConstant(value) {
	return function() {
		this.innerHTML = value;
	};
}
function htmlFunction(value) {
	return function() {
		var v = value.apply(this, arguments);
		this.innerHTML = v == null ? "" : v;
	};
}
function html_default(value) {
	return arguments.length ? this.each(value == null ? htmlRemove : (typeof value === "function" ? htmlFunction : htmlConstant)(value)) : this.node().innerHTML;
}
//#endregion
//#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/raise.js
function raise() {
	if (this.nextSibling) this.parentNode.appendChild(this);
}
function raise_default() {
	return this.each(raise);
}
//#endregion
//#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/lower.js
function lower() {
	if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function lower_default() {
	return this.each(lower);
}
//#endregion
//#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/append.js
function append_default(name) {
	var create = typeof name === "function" ? name : creator_default(name);
	return this.select(function() {
		return this.appendChild(create.apply(this, arguments));
	});
}
//#endregion
//#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/insert.js
function constantNull() {
	return null;
}
function insert_default(name, before) {
	var create = typeof name === "function" ? name : creator_default(name), select = before == null ? constantNull : typeof before === "function" ? before : selector_default(before);
	return this.select(function() {
		return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
	});
}
//#endregion
//#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/remove.js
function remove() {
	var parent = this.parentNode;
	if (parent) parent.removeChild(this);
}
function remove_default$1() {
	return this.each(remove);
}
//#endregion
//#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/clone.js
function selection_cloneShallow() {
	var clone = this.cloneNode(false), parent = this.parentNode;
	return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}
function selection_cloneDeep() {
	var clone = this.cloneNode(true), parent = this.parentNode;
	return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}
function clone_default(deep) {
	return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
}
//#endregion
//#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/datum.js
function datum_default(value) {
	return arguments.length ? this.property("__data__", value) : this.node().__data__;
}
//#endregion
//#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/on.js
function contextListener(listener) {
	return function(event) {
		listener.call(this, event, this.__data__);
	};
}
function parseTypenames(typenames) {
	return typenames.trim().split(/^|\s+/).map(function(t) {
		var name = "", i = t.indexOf(".");
		if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
		return {
			type: t,
			name
		};
	});
}
function onRemove(typename) {
	return function() {
		var on = this.__on;
		if (!on) return;
		for (var j = 0, i = -1, m = on.length, o; j < m; ++j) if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) this.removeEventListener(o.type, o.listener, o.options);
		else on[++i] = o;
		if (++i) on.length = i;
		else delete this.__on;
	};
}
function onAdd(typename, value, options) {
	return function() {
		var on = this.__on, o, listener = contextListener(value);
		if (on) {
			for (var j = 0, m = on.length; j < m; ++j) if ((o = on[j]).type === typename.type && o.name === typename.name) {
				this.removeEventListener(o.type, o.listener, o.options);
				this.addEventListener(o.type, o.listener = listener, o.options = options);
				o.value = value;
				return;
			}
		}
		this.addEventListener(typename.type, listener, options);
		o = {
			type: typename.type,
			name: typename.name,
			value,
			listener,
			options
		};
		if (!on) this.__on = [o];
		else on.push(o);
	};
}
function on_default$1(typename, value, options) {
	var typenames = parseTypenames(typename + ""), i, n = typenames.length, t;
	if (arguments.length < 2) {
		var on = this.node().__on;
		if (on) {
			for (var j = 0, m = on.length, o; j < m; ++j) for (i = 0, o = on[j]; i < n; ++i) if ((t = typenames[i]).type === o.type && t.name === o.name) return o.value;
		}
		return;
	}
	on = value ? onAdd : onRemove;
	for (i = 0; i < n; ++i) this.each(on(typenames[i], value, options));
	return this;
}
//#endregion
//#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/dispatch.js
function dispatchEvent(node, type, params) {
	var window = window_default(node), event = window.CustomEvent;
	if (typeof event === "function") event = new event(type, params);
	else {
		event = window.document.createEvent("Event");
		if (params) event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;
		else event.initEvent(type, false, false);
	}
	node.dispatchEvent(event);
}
function dispatchConstant(type, params) {
	return function() {
		return dispatchEvent(this, type, params);
	};
}
function dispatchFunction(type, params) {
	return function() {
		return dispatchEvent(this, type, params.apply(this, arguments));
	};
}
function dispatch_default(type, params) {
	return this.each((typeof params === "function" ? dispatchFunction : dispatchConstant)(type, params));
}
//#endregion
//#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/iterator.js
function* iterator_default() {
	for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) if (node = group[i]) yield node;
}
//#endregion
//#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/index.js
var root = [null];
function Selection$1(groups, parents) {
	this._groups = groups;
	this._parents = parents;
}
function selection() {
	return new Selection$1([[document.documentElement]], root);
}
function selection_selection() {
	return this;
}
Selection$1.prototype = selection.prototype = {
	constructor: Selection$1,
	select: select_default$2,
	selectAll: selectAll_default$1,
	selectChild: selectChild_default,
	selectChildren: selectChildren_default,
	filter: filter_default$1,
	data: data_default,
	enter: enter_default,
	exit: exit_default,
	join: join_default,
	merge: merge_default$1,
	selection: selection_selection,
	order: order_default,
	sort: sort_default,
	call: call_default,
	nodes: nodes_default,
	node: node_default,
	size: size_default,
	empty: empty_default,
	each: each_default,
	attr: attr_default$1,
	style: style_default$1,
	property: property_default,
	classed: classed_default,
	text: text_default$1,
	html: html_default,
	raise: raise_default,
	lower: lower_default,
	append: append_default,
	insert: insert_default,
	remove: remove_default$1,
	clone: clone_default,
	datum: datum_default,
	on: on_default$1,
	dispatch: dispatch_default,
	[Symbol.iterator]: iterator_default
};
//#endregion
//#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/select.js
function select_default$1(selector) {
	return typeof selector === "string" ? new Selection$1([[document.querySelector(selector)]], [document.documentElement]) : new Selection$1([[selector]], root);
}
//#endregion
//#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/sourceEvent.js
function sourceEvent_default(event) {
	let sourceEvent;
	while (sourceEvent = event.sourceEvent) event = sourceEvent;
	return event;
}
//#endregion
//#region ../../node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/pointer.js
function pointer_default(event, node) {
	event = sourceEvent_default(event);
	if (node === void 0) node = event.currentTarget;
	if (node) {
		var svg = node.ownerSVGElement || node;
		if (svg.createSVGPoint) {
			var point = svg.createSVGPoint();
			point.x = event.clientX, point.y = event.clientY;
			point = point.matrixTransform(node.getScreenCTM().inverse());
			return [point.x, point.y];
		}
		if (node.getBoundingClientRect) {
			var rect = node.getBoundingClientRect();
			return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];
		}
	}
	return [event.pageX, event.pageY];
}
//#endregion
//#region ../../node_modules/.pnpm/d3-drag@3.0.0/node_modules/d3-drag/src/noevent.js
const nonpassive = { passive: false };
const nonpassivecapture = {
	capture: true,
	passive: false
};
function nopropagation$1(event) {
	event.stopImmediatePropagation();
}
function noevent_default$1(event) {
	event.preventDefault();
	event.stopImmediatePropagation();
}
//#endregion
//#region ../../node_modules/.pnpm/d3-drag@3.0.0/node_modules/d3-drag/src/nodrag.js
function nodrag_default(view) {
	var root = view.document.documentElement, selection = select_default$1(view).on("dragstart.drag", noevent_default$1, nonpassivecapture);
	if ("onselectstart" in root) selection.on("selectstart.drag", noevent_default$1, nonpassivecapture);
	else {
		root.__noselect = root.style.MozUserSelect;
		root.style.MozUserSelect = "none";
	}
}
function yesdrag(view, noclick) {
	var root = view.document.documentElement, selection = select_default$1(view).on("dragstart.drag", null);
	if (noclick) {
		selection.on("click.drag", noevent_default$1, nonpassivecapture);
		setTimeout(function() {
			selection.on("click.drag", null);
		}, 0);
	}
	if ("onselectstart" in root) selection.on("selectstart.drag", null);
	else {
		root.style.MozUserSelect = root.__noselect;
		delete root.__noselect;
	}
}
//#endregion
//#region ../../node_modules/.pnpm/d3-drag@3.0.0/node_modules/d3-drag/src/constant.js
var constant_default$2 = (x) => () => x;
//#endregion
//#region ../../node_modules/.pnpm/d3-drag@3.0.0/node_modules/d3-drag/src/event.js
function DragEvent(type, { sourceEvent, subject, target, identifier, active, x, y, dx, dy, dispatch }) {
	Object.defineProperties(this, {
		type: {
			value: type,
			enumerable: true,
			configurable: true
		},
		sourceEvent: {
			value: sourceEvent,
			enumerable: true,
			configurable: true
		},
		subject: {
			value: subject,
			enumerable: true,
			configurable: true
		},
		target: {
			value: target,
			enumerable: true,
			configurable: true
		},
		identifier: {
			value: identifier,
			enumerable: true,
			configurable: true
		},
		active: {
			value: active,
			enumerable: true,
			configurable: true
		},
		x: {
			value: x,
			enumerable: true,
			configurable: true
		},
		y: {
			value: y,
			enumerable: true,
			configurable: true
		},
		dx: {
			value: dx,
			enumerable: true,
			configurable: true
		},
		dy: {
			value: dy,
			enumerable: true,
			configurable: true
		},
		_: { value: dispatch }
	});
}
DragEvent.prototype.on = function() {
	var value = this._.on.apply(this._, arguments);
	return value === this._ ? this : value;
};
//#endregion
//#region ../../node_modules/.pnpm/d3-drag@3.0.0/node_modules/d3-drag/src/drag.js
function defaultFilter$1(event) {
	return !event.ctrlKey && !event.button;
}
function defaultContainer() {
	return this.parentNode;
}
function defaultSubject(event, d) {
	return d == null ? {
		x: event.x,
		y: event.y
	} : d;
}
function defaultTouchable$1() {
	return navigator.maxTouchPoints || "ontouchstart" in this;
}
function drag_default() {
	var filter = defaultFilter$1, container = defaultContainer, subject = defaultSubject, touchable = defaultTouchable$1, gestures = {}, listeners = dispatch("start", "drag", "end"), active = 0, mousedownx, mousedowny, mousemoving, touchending, clickDistance2 = 0;
	function drag(selection) {
		selection.on("mousedown.drag", mousedowned).filter(touchable).on("touchstart.drag", touchstarted).on("touchmove.drag", touchmoved, nonpassive).on("touchend.drag touchcancel.drag", touchended).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
	}
	function mousedowned(event, d) {
		if (touchending || !filter.call(this, event, d)) return;
		var gesture = beforestart(this, container.call(this, event, d), event, d, "mouse");
		if (!gesture) return;
		select_default$1(event.view).on("mousemove.drag", mousemoved, nonpassivecapture).on("mouseup.drag", mouseupped, nonpassivecapture);
		nodrag_default(event.view);
		nopropagation$1(event);
		mousemoving = false;
		mousedownx = event.clientX;
		mousedowny = event.clientY;
		gesture("start", event);
	}
	function mousemoved(event) {
		noevent_default$1(event);
		if (!mousemoving) {
			var dx = event.clientX - mousedownx, dy = event.clientY - mousedowny;
			mousemoving = dx * dx + dy * dy > clickDistance2;
		}
		gestures.mouse("drag", event);
	}
	function mouseupped(event) {
		select_default$1(event.view).on("mousemove.drag mouseup.drag", null);
		yesdrag(event.view, mousemoving);
		noevent_default$1(event);
		gestures.mouse("end", event);
	}
	function touchstarted(event, d) {
		if (!filter.call(this, event, d)) return;
		var touches = event.changedTouches, c = container.call(this, event, d), n = touches.length, i, gesture;
		for (i = 0; i < n; ++i) if (gesture = beforestart(this, c, event, d, touches[i].identifier, touches[i])) {
			nopropagation$1(event);
			gesture("start", event, touches[i]);
		}
	}
	function touchmoved(event) {
		var touches = event.changedTouches, n = touches.length, i, gesture;
		for (i = 0; i < n; ++i) if (gesture = gestures[touches[i].identifier]) {
			noevent_default$1(event);
			gesture("drag", event, touches[i]);
		}
	}
	function touchended(event) {
		var touches = event.changedTouches, n = touches.length, i, gesture;
		if (touchending) clearTimeout(touchending);
		touchending = setTimeout(function() {
			touchending = null;
		}, 500);
		for (i = 0; i < n; ++i) if (gesture = gestures[touches[i].identifier]) {
			nopropagation$1(event);
			gesture("end", event, touches[i]);
		}
	}
	function beforestart(that, container, event, d, identifier, touch) {
		var dispatch = listeners.copy(), p = pointer_default(touch || event, container), dx, dy, s;
		if ((s = subject.call(that, new DragEvent("beforestart", {
			sourceEvent: event,
			target: drag,
			identifier,
			active,
			x: p[0],
			y: p[1],
			dx: 0,
			dy: 0,
			dispatch
		}), d)) == null) return;
		dx = s.x - p[0] || 0;
		dy = s.y - p[1] || 0;
		return function gesture(type, event, touch) {
			var p0 = p, n;
			switch (type) {
				case "start":
					gestures[identifier] = gesture, n = active++;
					break;
				case "end": delete gestures[identifier], --active;
				case "drag": p = pointer_default(touch || event, container), n = active;
			}
			dispatch.call(type, that, new DragEvent(type, {
				sourceEvent: event,
				subject: s,
				target: drag,
				identifier,
				active: n,
				x: p[0] + dx,
				y: p[1] + dy,
				dx: p[0] - p0[0],
				dy: p[1] - p0[1],
				dispatch
			}), d);
		};
	}
	drag.filter = function(_) {
		return arguments.length ? (filter = typeof _ === "function" ? _ : constant_default$2(!!_), drag) : filter;
	};
	drag.container = function(_) {
		return arguments.length ? (container = typeof _ === "function" ? _ : constant_default$2(_), drag) : container;
	};
	drag.subject = function(_) {
		return arguments.length ? (subject = typeof _ === "function" ? _ : constant_default$2(_), drag) : subject;
	};
	drag.touchable = function(_) {
		return arguments.length ? (touchable = typeof _ === "function" ? _ : constant_default$2(!!_), drag) : touchable;
	};
	drag.on = function() {
		var value = listeners.on.apply(listeners, arguments);
		return value === listeners ? drag : value;
	};
	drag.clickDistance = function(_) {
		return arguments.length ? (clickDistance2 = (_ = +_) * _, drag) : Math.sqrt(clickDistance2);
	};
	return drag;
}
//#endregion
//#region ../../node_modules/.pnpm/d3-color@3.1.0/node_modules/d3-color/src/define.js
function define_default(constructor, factory, prototype) {
	constructor.prototype = factory.prototype = prototype;
	prototype.constructor = constructor;
}
function extend(parent, definition) {
	var prototype = Object.create(parent.prototype);
	for (var key in definition) prototype[key] = definition[key];
	return prototype;
}
//#endregion
//#region ../../node_modules/.pnpm/d3-color@3.1.0/node_modules/d3-color/src/color.js
function Color() {}
var darker = .7;
var brighter = 1 / darker;
var reI = "\\s*([+-]?\\d+)\\s*";
var reN = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*";
var reP = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*";
var reHex = /^#([0-9a-f]{3,8})$/;
var reRgbInteger = new RegExp(`^rgb\\(${reI},${reI},${reI}\\)$`);
var reRgbPercent = new RegExp(`^rgb\\(${reP},${reP},${reP}\\)$`);
var reRgbaInteger = new RegExp(`^rgba\\(${reI},${reI},${reI},${reN}\\)$`);
var reRgbaPercent = new RegExp(`^rgba\\(${reP},${reP},${reP},${reN}\\)$`);
var reHslPercent = new RegExp(`^hsl\\(${reN},${reP},${reP}\\)$`);
var reHslaPercent = new RegExp(`^hsla\\(${reN},${reP},${reP},${reN}\\)$`);
var named = {
	aliceblue: 15792383,
	antiquewhite: 16444375,
	aqua: 65535,
	aquamarine: 8388564,
	azure: 15794175,
	beige: 16119260,
	bisque: 16770244,
	black: 0,
	blanchedalmond: 16772045,
	blue: 255,
	blueviolet: 9055202,
	brown: 10824234,
	burlywood: 14596231,
	cadetblue: 6266528,
	chartreuse: 8388352,
	chocolate: 13789470,
	coral: 16744272,
	cornflowerblue: 6591981,
	cornsilk: 16775388,
	crimson: 14423100,
	cyan: 65535,
	darkblue: 139,
	darkcyan: 35723,
	darkgoldenrod: 12092939,
	darkgray: 11119017,
	darkgreen: 25600,
	darkgrey: 11119017,
	darkkhaki: 12433259,
	darkmagenta: 9109643,
	darkolivegreen: 5597999,
	darkorange: 16747520,
	darkorchid: 10040012,
	darkred: 9109504,
	darksalmon: 15308410,
	darkseagreen: 9419919,
	darkslateblue: 4734347,
	darkslategray: 3100495,
	darkslategrey: 3100495,
	darkturquoise: 52945,
	darkviolet: 9699539,
	deeppink: 16716947,
	deepskyblue: 49151,
	dimgray: 6908265,
	dimgrey: 6908265,
	dodgerblue: 2003199,
	firebrick: 11674146,
	floralwhite: 16775920,
	forestgreen: 2263842,
	fuchsia: 16711935,
	gainsboro: 14474460,
	ghostwhite: 16316671,
	gold: 16766720,
	goldenrod: 14329120,
	gray: 8421504,
	green: 32768,
	greenyellow: 11403055,
	grey: 8421504,
	honeydew: 15794160,
	hotpink: 16738740,
	indianred: 13458524,
	indigo: 4915330,
	ivory: 16777200,
	khaki: 15787660,
	lavender: 15132410,
	lavenderblush: 16773365,
	lawngreen: 8190976,
	lemonchiffon: 16775885,
	lightblue: 11393254,
	lightcoral: 15761536,
	lightcyan: 14745599,
	lightgoldenrodyellow: 16448210,
	lightgray: 13882323,
	lightgreen: 9498256,
	lightgrey: 13882323,
	lightpink: 16758465,
	lightsalmon: 16752762,
	lightseagreen: 2142890,
	lightskyblue: 8900346,
	lightslategray: 7833753,
	lightslategrey: 7833753,
	lightsteelblue: 11584734,
	lightyellow: 16777184,
	lime: 65280,
	limegreen: 3329330,
	linen: 16445670,
	magenta: 16711935,
	maroon: 8388608,
	mediumaquamarine: 6737322,
	mediumblue: 205,
	mediumorchid: 12211667,
	mediumpurple: 9662683,
	mediumseagreen: 3978097,
	mediumslateblue: 8087790,
	mediumspringgreen: 64154,
	mediumturquoise: 4772300,
	mediumvioletred: 13047173,
	midnightblue: 1644912,
	mintcream: 16121850,
	mistyrose: 16770273,
	moccasin: 16770229,
	navajowhite: 16768685,
	navy: 128,
	oldlace: 16643558,
	olive: 8421376,
	olivedrab: 7048739,
	orange: 16753920,
	orangered: 16729344,
	orchid: 14315734,
	palegoldenrod: 15657130,
	palegreen: 10025880,
	paleturquoise: 11529966,
	palevioletred: 14381203,
	papayawhip: 16773077,
	peachpuff: 16767673,
	peru: 13468991,
	pink: 16761035,
	plum: 14524637,
	powderblue: 11591910,
	purple: 8388736,
	rebeccapurple: 6697881,
	red: 16711680,
	rosybrown: 12357519,
	royalblue: 4286945,
	saddlebrown: 9127187,
	salmon: 16416882,
	sandybrown: 16032864,
	seagreen: 3050327,
	seashell: 16774638,
	sienna: 10506797,
	silver: 12632256,
	skyblue: 8900331,
	slateblue: 6970061,
	slategray: 7372944,
	slategrey: 7372944,
	snow: 16775930,
	springgreen: 65407,
	steelblue: 4620980,
	tan: 13808780,
	teal: 32896,
	thistle: 14204888,
	tomato: 16737095,
	turquoise: 4251856,
	violet: 15631086,
	wheat: 16113331,
	white: 16777215,
	whitesmoke: 16119285,
	yellow: 16776960,
	yellowgreen: 10145074
};
define_default(Color, color, {
	copy(channels) {
		return Object.assign(new this.constructor(), this, channels);
	},
	displayable() {
		return this.rgb().displayable();
	},
	hex: color_formatHex,
	formatHex: color_formatHex,
	formatHex8: color_formatHex8,
	formatHsl: color_formatHsl,
	formatRgb: color_formatRgb,
	toString: color_formatRgb
});
function color_formatHex() {
	return this.rgb().formatHex();
}
function color_formatHex8() {
	return this.rgb().formatHex8();
}
function color_formatHsl() {
	return hslConvert(this).formatHsl();
}
function color_formatRgb() {
	return this.rgb().formatRgb();
}
function color(format) {
	var m, l;
	format = (format + "").trim().toLowerCase();
	return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) : l === 3 ? new Rgb(m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, (m & 15) << 4 | m & 15, 1) : l === 8 ? rgba(m >> 24 & 255, m >> 16 & 255, m >> 8 & 255, (m & 255) / 255) : l === 4 ? rgba(m >> 12 & 15 | m >> 8 & 240, m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, ((m & 15) << 4 | m & 15) / 255) : null) : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) : named.hasOwnProperty(format) ? rgbn(named[format]) : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
}
function rgbn(n) {
	return new Rgb(n >> 16 & 255, n >> 8 & 255, n & 255, 1);
}
function rgba(r, g, b, a) {
	if (a <= 0) r = g = b = NaN;
	return new Rgb(r, g, b, a);
}
function rgbConvert(o) {
	if (!(o instanceof Color)) o = color(o);
	if (!o) return new Rgb();
	o = o.rgb();
	return new Rgb(o.r, o.g, o.b, o.opacity);
}
function rgb(r, g, b, opacity) {
	return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
}
function Rgb(r, g, b, opacity) {
	this.r = +r;
	this.g = +g;
	this.b = +b;
	this.opacity = +opacity;
}
define_default(Rgb, rgb, extend(Color, {
	brighter(k) {
		k = k == null ? brighter : Math.pow(brighter, k);
		return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
	},
	darker(k) {
		k = k == null ? darker : Math.pow(darker, k);
		return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
	},
	rgb() {
		return this;
	},
	clamp() {
		return new Rgb(clampi(this.r), clampi(this.g), clampi(this.b), clampa(this.opacity));
	},
	displayable() {
		return -.5 <= this.r && this.r < 255.5 && -.5 <= this.g && this.g < 255.5 && -.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
	},
	hex: rgb_formatHex,
	formatHex: rgb_formatHex,
	formatHex8: rgb_formatHex8,
	formatRgb: rgb_formatRgb,
	toString: rgb_formatRgb
}));
function rgb_formatHex() {
	return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}`;
}
function rgb_formatHex8() {
	return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}${hex((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function rgb_formatRgb() {
	const a = clampa(this.opacity);
	return `${a === 1 ? "rgb(" : "rgba("}${clampi(this.r)}, ${clampi(this.g)}, ${clampi(this.b)}${a === 1 ? ")" : `, ${a})`}`;
}
function clampa(opacity) {
	return isNaN(opacity) ? 1 : Math.max(0, Math.min(1, opacity));
}
function clampi(value) {
	return Math.max(0, Math.min(255, Math.round(value) || 0));
}
function hex(value) {
	value = clampi(value);
	return (value < 16 ? "0" : "") + value.toString(16);
}
function hsla(h, s, l, a) {
	if (a <= 0) h = s = l = NaN;
	else if (l <= 0 || l >= 1) h = s = NaN;
	else if (s <= 0) h = NaN;
	return new Hsl(h, s, l, a);
}
function hslConvert(o) {
	if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
	if (!(o instanceof Color)) o = color(o);
	if (!o) return new Hsl();
	if (o instanceof Hsl) return o;
	o = o.rgb();
	var r = o.r / 255, g = o.g / 255, b = o.b / 255, min = Math.min(r, g, b), max = Math.max(r, g, b), h = NaN, s = max - min, l = (max + min) / 2;
	if (s) {
		if (r === max) h = (g - b) / s + (g < b) * 6;
		else if (g === max) h = (b - r) / s + 2;
		else h = (r - g) / s + 4;
		s /= l < .5 ? max + min : 2 - max - min;
		h *= 60;
	} else s = l > 0 && l < 1 ? 0 : h;
	return new Hsl(h, s, l, o.opacity);
}
function hsl(h, s, l, opacity) {
	return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
}
function Hsl(h, s, l, opacity) {
	this.h = +h;
	this.s = +s;
	this.l = +l;
	this.opacity = +opacity;
}
define_default(Hsl, hsl, extend(Color, {
	brighter(k) {
		k = k == null ? brighter : Math.pow(brighter, k);
		return new Hsl(this.h, this.s, this.l * k, this.opacity);
	},
	darker(k) {
		k = k == null ? darker : Math.pow(darker, k);
		return new Hsl(this.h, this.s, this.l * k, this.opacity);
	},
	rgb() {
		var h = this.h % 360 + (this.h < 0) * 360, s = isNaN(h) || isNaN(this.s) ? 0 : this.s, l = this.l, m2 = l + (l < .5 ? l : 1 - l) * s, m1 = 2 * l - m2;
		return new Rgb(hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2), hsl2rgb(h, m1, m2), hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2), this.opacity);
	},
	clamp() {
		return new Hsl(clamph(this.h), clampt(this.s), clampt(this.l), clampa(this.opacity));
	},
	displayable() {
		return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
	},
	formatHsl() {
		const a = clampa(this.opacity);
		return `${a === 1 ? "hsl(" : "hsla("}${clamph(this.h)}, ${clampt(this.s) * 100}%, ${clampt(this.l) * 100}%${a === 1 ? ")" : `, ${a})`}`;
	}
}));
function clamph(value) {
	value = (value || 0) % 360;
	return value < 0 ? value + 360 : value;
}
function clampt(value) {
	return Math.max(0, Math.min(1, value || 0));
}
function hsl2rgb(h, m1, m2) {
	return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
}
//#endregion
//#region ../../node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/constant.js
var constant_default$1 = (x) => () => x;
//#endregion
//#region ../../node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/color.js
function linear(a, d) {
	return function(t) {
		return a + t * d;
	};
}
function exponential(a, b, y) {
	return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
		return Math.pow(a + t * b, y);
	};
}
function gamma(y) {
	return (y = +y) === 1 ? nogamma : function(a, b) {
		return b - a ? exponential(a, b, y) : constant_default$1(isNaN(a) ? b : a);
	};
}
function nogamma(a, b) {
	var d = b - a;
	return d ? linear(a, d) : constant_default$1(isNaN(a) ? b : a);
}
//#endregion
//#region ../../node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/rgb.js
var rgb_default = (function rgbGamma(y) {
	var color = gamma(y);
	function rgb$1(start, end) {
		var r = color((start = rgb(start)).r, (end = rgb(end)).r), g = color(start.g, end.g), b = color(start.b, end.b), opacity = nogamma(start.opacity, end.opacity);
		return function(t) {
			start.r = r(t);
			start.g = g(t);
			start.b = b(t);
			start.opacity = opacity(t);
			return start + "";
		};
	}
	rgb$1.gamma = rgbGamma;
	return rgb$1;
})(1);
//#endregion
//#region ../../node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/number.js
function number_default(a, b) {
	return a = +a, b = +b, function(t) {
		return a * (1 - t) + b * t;
	};
}
//#endregion
//#region ../../node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/string.js
var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
var reB = new RegExp(reA.source, "g");
function zero(b) {
	return function() {
		return b;
	};
}
function one(b) {
	return function(t) {
		return b(t) + "";
	};
}
function string_default(a, b) {
	var bi = reA.lastIndex = reB.lastIndex = 0, am, bm, bs, i = -1, s = [], q = [];
	a = a + "", b = b + "";
	while ((am = reA.exec(a)) && (bm = reB.exec(b))) {
		if ((bs = bm.index) > bi) {
			bs = b.slice(bi, bs);
			if (s[i]) s[i] += bs;
			else s[++i] = bs;
		}
		if ((am = am[0]) === (bm = bm[0])) {
			if (s[i]) s[i] += bm;
			else s[++i] = bm;
		} else {
			s[++i] = null;
			q.push({
				i,
				x: number_default(am, bm)
			});
		}
		bi = reB.lastIndex;
	}
	if (bi < b.length) {
		bs = b.slice(bi);
		if (s[i]) s[i] += bs;
		else s[++i] = bs;
	}
	return s.length < 2 ? q[0] ? one(q[0].x) : zero(b) : (b = q.length, function(t) {
		for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);
		return s.join("");
	});
}
//#endregion
//#region ../../node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/transform/decompose.js
var degrees = 180 / Math.PI;
var identity$1 = {
	translateX: 0,
	translateY: 0,
	rotate: 0,
	skewX: 0,
	scaleX: 1,
	scaleY: 1
};
function decompose_default(a, b, c, d, e, f) {
	var scaleX, scaleY, skewX;
	if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
	if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
	if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
	if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
	return {
		translateX: e,
		translateY: f,
		rotate: Math.atan2(b, a) * degrees,
		skewX: Math.atan(skewX) * degrees,
		scaleX,
		scaleY
	};
}
//#endregion
//#region ../../node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/transform/parse.js
var svgNode;
function parseCss(value) {
	const m = new (typeof DOMMatrix === "function" ? DOMMatrix : WebKitCSSMatrix)(value + "");
	return m.isIdentity ? identity$1 : decompose_default(m.a, m.b, m.c, m.d, m.e, m.f);
}
function parseSvg(value) {
	if (value == null) return identity$1;
	if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
	svgNode.setAttribute("transform", value);
	if (!(value = svgNode.transform.baseVal.consolidate())) return identity$1;
	value = value.matrix;
	return decompose_default(value.a, value.b, value.c, value.d, value.e, value.f);
}
//#endregion
//#region ../../node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/transform/index.js
function interpolateTransform(parse, pxComma, pxParen, degParen) {
	function pop(s) {
		return s.length ? s.pop() + " " : "";
	}
	function translate(xa, ya, xb, yb, s, q) {
		if (xa !== xb || ya !== yb) {
			var i = s.push("translate(", null, pxComma, null, pxParen);
			q.push({
				i: i - 4,
				x: number_default(xa, xb)
			}, {
				i: i - 2,
				x: number_default(ya, yb)
			});
		} else if (xb || yb) s.push("translate(" + xb + pxComma + yb + pxParen);
	}
	function rotate(a, b, s, q) {
		if (a !== b) {
			if (a - b > 180) b += 360;
			else if (b - a > 180) a += 360;
			q.push({
				i: s.push(pop(s) + "rotate(", null, degParen) - 2,
				x: number_default(a, b)
			});
		} else if (b) s.push(pop(s) + "rotate(" + b + degParen);
	}
	function skewX(a, b, s, q) {
		if (a !== b) q.push({
			i: s.push(pop(s) + "skewX(", null, degParen) - 2,
			x: number_default(a, b)
		});
		else if (b) s.push(pop(s) + "skewX(" + b + degParen);
	}
	function scale(xa, ya, xb, yb, s, q) {
		if (xa !== xb || ya !== yb) {
			var i = s.push(pop(s) + "scale(", null, ",", null, ")");
			q.push({
				i: i - 4,
				x: number_default(xa, xb)
			}, {
				i: i - 2,
				x: number_default(ya, yb)
			});
		} else if (xb !== 1 || yb !== 1) s.push(pop(s) + "scale(" + xb + "," + yb + ")");
	}
	return function(a, b) {
		var s = [], q = [];
		a = parse(a), b = parse(b);
		translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
		rotate(a.rotate, b.rotate, s, q);
		skewX(a.skewX, b.skewX, s, q);
		scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
		a = b = null;
		return function(t) {
			var i = -1, n = q.length, o;
			while (++i < n) s[(o = q[i]).i] = o.x(t);
			return s.join("");
		};
	};
}
var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");
//#endregion
//#region ../../node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/zoom.js
var epsilon2 = 1e-12;
function cosh(x) {
	return ((x = Math.exp(x)) + 1 / x) / 2;
}
function sinh(x) {
	return ((x = Math.exp(x)) - 1 / x) / 2;
}
function tanh(x) {
	return ((x = Math.exp(2 * x)) - 1) / (x + 1);
}
var zoom_default$1 = (function zoomRho(rho, rho2, rho4) {
	function zoom(p0, p1) {
		var ux0 = p0[0], uy0 = p0[1], w0 = p0[2], ux1 = p1[0], uy1 = p1[1], w1 = p1[2], dx = ux1 - ux0, dy = uy1 - uy0, d2 = dx * dx + dy * dy, i, S;
		if (d2 < epsilon2) {
			S = Math.log(w1 / w0) / rho;
			i = function(t) {
				return [
					ux0 + t * dx,
					uy0 + t * dy,
					w0 * Math.exp(rho * t * S)
				];
			};
		} else {
			var d1 = Math.sqrt(d2), b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1), b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1), r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0);
			S = (Math.log(Math.sqrt(b1 * b1 + 1) - b1) - r0) / rho;
			i = function(t) {
				var s = t * S, coshr0 = cosh(r0), u = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s + r0) - sinh(r0));
				return [
					ux0 + u * dx,
					uy0 + u * dy,
					w0 * coshr0 / cosh(rho * s + r0)
				];
			};
		}
		i.duration = S * 1e3 * rho / Math.SQRT2;
		return i;
	}
	zoom.rho = function(_) {
		var _1 = Math.max(.001, +_), _2 = _1 * _1;
		return zoomRho(_1, _2, _2 * _2);
	};
	return zoom;
})(Math.SQRT2, 2, 4);
//#endregion
//#region ../../node_modules/.pnpm/d3-timer@3.0.1/node_modules/d3-timer/src/timer.js
var frame = 0;
var timeout = 0;
var interval = 0;
var pokeDelay = 1e3;
var taskHead;
var taskTail;
var clockLast = 0;
var clockNow = 0;
var clockSkew = 0;
var clock = typeof performance === "object" && performance.now ? performance : Date;
var setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) {
	setTimeout(f, 17);
};
function now() {
	return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
}
function clearNow() {
	clockNow = 0;
}
function Timer() {
	this._call = this._time = this._next = null;
}
Timer.prototype = timer.prototype = {
	constructor: Timer,
	restart: function(callback, delay, time) {
		if (typeof callback !== "function") throw new TypeError("callback is not a function");
		time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
		if (!this._next && taskTail !== this) {
			if (taskTail) taskTail._next = this;
			else taskHead = this;
			taskTail = this;
		}
		this._call = callback;
		this._time = time;
		sleep();
	},
	stop: function() {
		if (this._call) {
			this._call = null;
			this._time = Infinity;
			sleep();
		}
	}
};
function timer(callback, delay, time) {
	var t = new Timer();
	t.restart(callback, delay, time);
	return t;
}
function timerFlush() {
	now();
	++frame;
	var t = taskHead, e;
	while (t) {
		if ((e = clockNow - t._time) >= 0) t._call.call(void 0, e);
		t = t._next;
	}
	--frame;
}
function wake() {
	clockNow = (clockLast = clock.now()) + clockSkew;
	frame = timeout = 0;
	try {
		timerFlush();
	} finally {
		frame = 0;
		nap();
		clockNow = 0;
	}
}
function poke() {
	var now = clock.now(), delay = now - clockLast;
	if (delay > pokeDelay) clockSkew -= delay, clockLast = now;
}
function nap() {
	var t0, t1 = taskHead, t2, time = Infinity;
	while (t1) if (t1._call) {
		if (time > t1._time) time = t1._time;
		t0 = t1, t1 = t1._next;
	} else {
		t2 = t1._next, t1._next = null;
		t1 = t0 ? t0._next = t2 : taskHead = t2;
	}
	taskTail = t0;
	sleep(time);
}
function sleep(time) {
	if (frame) return;
	if (timeout) timeout = clearTimeout(timeout);
	if (time - clockNow > 24) {
		if (time < Infinity) timeout = setTimeout(wake, time - clock.now() - clockSkew);
		if (interval) interval = clearInterval(interval);
	} else {
		if (!interval) clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
		frame = 1, setFrame(wake);
	}
}
//#endregion
//#region ../../node_modules/.pnpm/d3-timer@3.0.1/node_modules/d3-timer/src/timeout.js
function timeout_default(callback, delay, time) {
	var t = new Timer();
	delay = delay == null ? 0 : +delay;
	t.restart((elapsed) => {
		t.stop();
		callback(elapsed + delay);
	}, delay, time);
	return t;
}
//#endregion
//#region ../../node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/schedule.js
var emptyOn = dispatch("start", "end", "cancel", "interrupt");
var emptyTween = [];
function schedule_default(node, name, id, index, group, timing) {
	var schedules = node.__transition;
	if (!schedules) node.__transition = {};
	else if (id in schedules) return;
	create(node, id, {
		name,
		index,
		group,
		on: emptyOn,
		tween: emptyTween,
		time: timing.time,
		delay: timing.delay,
		duration: timing.duration,
		ease: timing.ease,
		timer: null,
		state: 0
	});
}
function init(node, id) {
	var schedule = get(node, id);
	if (schedule.state > 0) throw new Error("too late; already scheduled");
	return schedule;
}
function set(node, id) {
	var schedule = get(node, id);
	if (schedule.state > 3) throw new Error("too late; already running");
	return schedule;
}
function get(node, id) {
	var schedule = node.__transition;
	if (!schedule || !(schedule = schedule[id])) throw new Error("transition not found");
	return schedule;
}
function create(node, id, self) {
	var schedules = node.__transition, tween;
	schedules[id] = self;
	self.timer = timer(schedule, 0, self.time);
	function schedule(elapsed) {
		self.state = 1;
		self.timer.restart(start, self.delay, self.time);
		if (self.delay <= elapsed) start(elapsed - self.delay);
	}
	function start(elapsed) {
		var i, j, n, o;
		if (self.state !== 1) return stop();
		for (i in schedules) {
			o = schedules[i];
			if (o.name !== self.name) continue;
			if (o.state === 3) return timeout_default(start);
			if (o.state === 4) {
				o.state = 6;
				o.timer.stop();
				o.on.call("interrupt", node, node.__data__, o.index, o.group);
				delete schedules[i];
			} else if (+i < id) {
				o.state = 6;
				o.timer.stop();
				o.on.call("cancel", node, node.__data__, o.index, o.group);
				delete schedules[i];
			}
		}
		timeout_default(function() {
			if (self.state === 3) {
				self.state = 4;
				self.timer.restart(tick, self.delay, self.time);
				tick(elapsed);
			}
		});
		self.state = 2;
		self.on.call("start", node, node.__data__, self.index, self.group);
		if (self.state !== 2) return;
		self.state = 3;
		tween = new Array(n = self.tween.length);
		for (i = 0, j = -1; i < n; ++i) if (o = self.tween[i].value.call(node, node.__data__, self.index, self.group)) tween[++j] = o;
		tween.length = j + 1;
	}
	function tick(elapsed) {
		var t = elapsed < self.duration ? self.ease.call(null, elapsed / self.duration) : (self.timer.restart(stop), self.state = 5, 1), i = -1, n = tween.length;
		while (++i < n) tween[i].call(node, t);
		if (self.state === 5) {
			self.on.call("end", node, node.__data__, self.index, self.group);
			stop();
		}
	}
	function stop() {
		self.state = 6;
		self.timer.stop();
		delete schedules[id];
		for (var i in schedules) return;
		delete node.__transition;
	}
}
//#endregion
//#region ../../node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/interrupt.js
function interrupt_default$1(node, name) {
	var schedules = node.__transition, schedule, active, empty = true, i;
	if (!schedules) return;
	name = name == null ? null : name + "";
	for (i in schedules) {
		if ((schedule = schedules[i]).name !== name) {
			empty = false;
			continue;
		}
		active = schedule.state > 2 && schedule.state < 5;
		schedule.state = 6;
		schedule.timer.stop();
		schedule.on.call(active ? "interrupt" : "cancel", node, node.__data__, schedule.index, schedule.group);
		delete schedules[i];
	}
	if (empty) delete node.__transition;
}
//#endregion
//#region ../../node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/selection/interrupt.js
function interrupt_default(name) {
	return this.each(function() {
		interrupt_default$1(this, name);
	});
}
//#endregion
//#region ../../node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/tween.js
function tweenRemove(id, name) {
	var tween0, tween1;
	return function() {
		var schedule = set(this, id), tween = schedule.tween;
		if (tween !== tween0) {
			tween1 = tween0 = tween;
			for (var i = 0, n = tween1.length; i < n; ++i) if (tween1[i].name === name) {
				tween1 = tween1.slice();
				tween1.splice(i, 1);
				break;
			}
		}
		schedule.tween = tween1;
	};
}
function tweenFunction(id, name, value) {
	var tween0, tween1;
	if (typeof value !== "function") throw new Error();
	return function() {
		var schedule = set(this, id), tween = schedule.tween;
		if (tween !== tween0) {
			tween1 = (tween0 = tween).slice();
			for (var t = {
				name,
				value
			}, i = 0, n = tween1.length; i < n; ++i) if (tween1[i].name === name) {
				tween1[i] = t;
				break;
			}
			if (i === n) tween1.push(t);
		}
		schedule.tween = tween1;
	};
}
function tween_default(name, value) {
	var id = this._id;
	name += "";
	if (arguments.length < 2) {
		var tween = get(this.node(), id).tween;
		for (var i = 0, n = tween.length, t; i < n; ++i) if ((t = tween[i]).name === name) return t.value;
		return null;
	}
	return this.each((value == null ? tweenRemove : tweenFunction)(id, name, value));
}
function tweenValue(transition, name, value) {
	var id = transition._id;
	transition.each(function() {
		var schedule = set(this, id);
		(schedule.value || (schedule.value = {}))[name] = value.apply(this, arguments);
	});
	return function(node) {
		return get(node, id).value[name];
	};
}
//#endregion
//#region ../../node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/interpolate.js
function interpolate_default(a, b) {
	var c;
	return (typeof b === "number" ? number_default : b instanceof color ? rgb_default : (c = color(b)) ? (b = c, rgb_default) : string_default)(a, b);
}
//#endregion
//#region ../../node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/attr.js
function attrRemove(name) {
	return function() {
		this.removeAttribute(name);
	};
}
function attrRemoveNS(fullname) {
	return function() {
		this.removeAttributeNS(fullname.space, fullname.local);
	};
}
function attrConstant(name, interpolate, value1) {
	var string00, string1 = value1 + "", interpolate0;
	return function() {
		var string0 = this.getAttribute(name);
		return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
	};
}
function attrConstantNS(fullname, interpolate, value1) {
	var string00, string1 = value1 + "", interpolate0;
	return function() {
		var string0 = this.getAttributeNS(fullname.space, fullname.local);
		return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
	};
}
function attrFunction(name, interpolate, value) {
	var string00, string10, interpolate0;
	return function() {
		var string0, value1 = value(this), string1;
		if (value1 == null) return void this.removeAttribute(name);
		string0 = this.getAttribute(name);
		string1 = value1 + "";
		return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
	};
}
function attrFunctionNS(fullname, interpolate, value) {
	var string00, string10, interpolate0;
	return function() {
		var string0, value1 = value(this), string1;
		if (value1 == null) return void this.removeAttributeNS(fullname.space, fullname.local);
		string0 = this.getAttributeNS(fullname.space, fullname.local);
		string1 = value1 + "";
		return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
	};
}
function attr_default(name, value) {
	var fullname = namespace_default(name), i = fullname === "transform" ? interpolateTransformSvg : interpolate_default;
	return this.attrTween(name, typeof value === "function" ? (fullname.local ? attrFunctionNS : attrFunction)(fullname, i, tweenValue(this, "attr." + name, value)) : value == null ? (fullname.local ? attrRemoveNS : attrRemove)(fullname) : (fullname.local ? attrConstantNS : attrConstant)(fullname, i, value));
}
//#endregion
//#region ../../node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/attrTween.js
function attrInterpolate(name, i) {
	return function(t) {
		this.setAttribute(name, i.call(this, t));
	};
}
function attrInterpolateNS(fullname, i) {
	return function(t) {
		this.setAttributeNS(fullname.space, fullname.local, i.call(this, t));
	};
}
function attrTweenNS(fullname, value) {
	var t0, i0;
	function tween() {
		var i = value.apply(this, arguments);
		if (i !== i0) t0 = (i0 = i) && attrInterpolateNS(fullname, i);
		return t0;
	}
	tween._value = value;
	return tween;
}
function attrTween(name, value) {
	var t0, i0;
	function tween() {
		var i = value.apply(this, arguments);
		if (i !== i0) t0 = (i0 = i) && attrInterpolate(name, i);
		return t0;
	}
	tween._value = value;
	return tween;
}
function attrTween_default(name, value) {
	var key = "attr." + name;
	if (arguments.length < 2) return (key = this.tween(key)) && key._value;
	if (value == null) return this.tween(key, null);
	if (typeof value !== "function") throw new Error();
	var fullname = namespace_default(name);
	return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
}
//#endregion
//#region ../../node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/delay.js
function delayFunction(id, value) {
	return function() {
		init(this, id).delay = +value.apply(this, arguments);
	};
}
function delayConstant(id, value) {
	return value = +value, function() {
		init(this, id).delay = value;
	};
}
function delay_default(value) {
	var id = this._id;
	return arguments.length ? this.each((typeof value === "function" ? delayFunction : delayConstant)(id, value)) : get(this.node(), id).delay;
}
//#endregion
//#region ../../node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/duration.js
function durationFunction(id, value) {
	return function() {
		set(this, id).duration = +value.apply(this, arguments);
	};
}
function durationConstant(id, value) {
	return value = +value, function() {
		set(this, id).duration = value;
	};
}
function duration_default(value) {
	var id = this._id;
	return arguments.length ? this.each((typeof value === "function" ? durationFunction : durationConstant)(id, value)) : get(this.node(), id).duration;
}
//#endregion
//#region ../../node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/ease.js
function easeConstant(id, value) {
	if (typeof value !== "function") throw new Error();
	return function() {
		set(this, id).ease = value;
	};
}
function ease_default(value) {
	var id = this._id;
	return arguments.length ? this.each(easeConstant(id, value)) : get(this.node(), id).ease;
}
//#endregion
//#region ../../node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/easeVarying.js
function easeVarying(id, value) {
	return function() {
		var v = value.apply(this, arguments);
		if (typeof v !== "function") throw new Error();
		set(this, id).ease = v;
	};
}
function easeVarying_default(value) {
	if (typeof value !== "function") throw new Error();
	return this.each(easeVarying(this._id, value));
}
//#endregion
//#region ../../node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/filter.js
function filter_default(match) {
	if (typeof match !== "function") match = matcher_default(match);
	for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) if ((node = group[i]) && match.call(node, node.__data__, i, group)) subgroup.push(node);
	return new Transition(subgroups, this._parents, this._name, this._id);
}
//#endregion
//#region ../../node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/merge.js
function merge_default(transition) {
	if (transition._id !== this._id) throw new Error();
	for (var groups0 = this._groups, groups1 = transition._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) if (node = group0[i] || group1[i]) merge[i] = node;
	for (; j < m0; ++j) merges[j] = groups0[j];
	return new Transition(merges, this._parents, this._name, this._id);
}
//#endregion
//#region ../../node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/on.js
function start(name) {
	return (name + "").trim().split(/^|\s+/).every(function(t) {
		var i = t.indexOf(".");
		if (i >= 0) t = t.slice(0, i);
		return !t || t === "start";
	});
}
function onFunction(id, name, listener) {
	var on0, on1, sit = start(name) ? init : set;
	return function() {
		var schedule = sit(this, id), on = schedule.on;
		if (on !== on0) (on1 = (on0 = on).copy()).on(name, listener);
		schedule.on = on1;
	};
}
function on_default(name, listener) {
	var id = this._id;
	return arguments.length < 2 ? get(this.node(), id).on.on(name) : this.each(onFunction(id, name, listener));
}
//#endregion
//#region ../../node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/remove.js
function removeFunction(id) {
	return function() {
		var parent = this.parentNode;
		for (var i in this.__transition) if (+i !== id) return;
		if (parent) parent.removeChild(this);
	};
}
function remove_default() {
	return this.on("end.remove", removeFunction(this._id));
}
//#endregion
//#region ../../node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/select.js
function select_default(select) {
	var name = this._name, id = this._id;
	if (typeof select !== "function") select = selector_default(select);
	for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
		if ("__data__" in node) subnode.__data__ = node.__data__;
		subgroup[i] = subnode;
		schedule_default(subgroup[i], name, id, i, subgroup, get(node, id));
	}
	return new Transition(subgroups, this._parents, name, id);
}
//#endregion
//#region ../../node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/selectAll.js
function selectAll_default(select) {
	var name = this._name, id = this._id;
	if (typeof select !== "function") select = selectorAll_default(select);
	for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) if (node = group[i]) {
		for (var children = select.call(node, node.__data__, i, group), child, inherit = get(node, id), k = 0, l = children.length; k < l; ++k) if (child = children[k]) schedule_default(child, name, id, k, children, inherit);
		subgroups.push(children);
		parents.push(node);
	}
	return new Transition(subgroups, parents, name, id);
}
//#endregion
//#region ../../node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/selection.js
var Selection = selection.prototype.constructor;
function selection_default() {
	return new Selection(this._groups, this._parents);
}
//#endregion
//#region ../../node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/style.js
function styleNull(name, interpolate) {
	var string00, string10, interpolate0;
	return function() {
		var string0 = styleValue(this, name), string1 = (this.style.removeProperty(name), styleValue(this, name));
		return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : interpolate0 = interpolate(string00 = string0, string10 = string1);
	};
}
function styleRemove(name) {
	return function() {
		this.style.removeProperty(name);
	};
}
function styleConstant(name, interpolate, value1) {
	var string00, string1 = value1 + "", interpolate0;
	return function() {
		var string0 = styleValue(this, name);
		return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
	};
}
function styleFunction(name, interpolate, value) {
	var string00, string10, interpolate0;
	return function() {
		var string0 = styleValue(this, name), value1 = value(this), string1 = value1 + "";
		if (value1 == null) string1 = value1 = (this.style.removeProperty(name), styleValue(this, name));
		return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
	};
}
function styleMaybeRemove(id, name) {
	var on0, on1, listener0, key = "style." + name, event = "end." + key, remove;
	return function() {
		var schedule = set(this, id), on = schedule.on, listener = schedule.value[key] == null ? remove || (remove = styleRemove(name)) : void 0;
		if (on !== on0 || listener0 !== listener) (on1 = (on0 = on).copy()).on(event, listener0 = listener);
		schedule.on = on1;
	};
}
function style_default(name, value, priority) {
	var i = (name += "") === "transform" ? interpolateTransformCss : interpolate_default;
	return value == null ? this.styleTween(name, styleNull(name, i)).on("end.style." + name, styleRemove(name)) : typeof value === "function" ? this.styleTween(name, styleFunction(name, i, tweenValue(this, "style." + name, value))).each(styleMaybeRemove(this._id, name)) : this.styleTween(name, styleConstant(name, i, value), priority).on("end.style." + name, null);
}
//#endregion
//#region ../../node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/styleTween.js
function styleInterpolate(name, i, priority) {
	return function(t) {
		this.style.setProperty(name, i.call(this, t), priority);
	};
}
function styleTween(name, value, priority) {
	var t, i0;
	function tween() {
		var i = value.apply(this, arguments);
		if (i !== i0) t = (i0 = i) && styleInterpolate(name, i, priority);
		return t;
	}
	tween._value = value;
	return tween;
}
function styleTween_default(name, value, priority) {
	var key = "style." + (name += "");
	if (arguments.length < 2) return (key = this.tween(key)) && key._value;
	if (value == null) return this.tween(key, null);
	if (typeof value !== "function") throw new Error();
	return this.tween(key, styleTween(name, value, priority == null ? "" : priority));
}
//#endregion
//#region ../../node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/text.js
function textConstant(value) {
	return function() {
		this.textContent = value;
	};
}
function textFunction(value) {
	return function() {
		var value1 = value(this);
		this.textContent = value1 == null ? "" : value1;
	};
}
function text_default(value) {
	return this.tween("text", typeof value === "function" ? textFunction(tweenValue(this, "text", value)) : textConstant(value == null ? "" : value + ""));
}
//#endregion
//#region ../../node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/textTween.js
function textInterpolate(i) {
	return function(t) {
		this.textContent = i.call(this, t);
	};
}
function textTween(value) {
	var t0, i0;
	function tween() {
		var i = value.apply(this, arguments);
		if (i !== i0) t0 = (i0 = i) && textInterpolate(i);
		return t0;
	}
	tween._value = value;
	return tween;
}
function textTween_default(value) {
	var key = "text";
	if (arguments.length < 1) return (key = this.tween(key)) && key._value;
	if (value == null) return this.tween(key, null);
	if (typeof value !== "function") throw new Error();
	return this.tween(key, textTween(value));
}
//#endregion
//#region ../../node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/transition.js
function transition_default$1() {
	var name = this._name, id0 = this._id, id1 = newId();
	for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) if (node = group[i]) {
		var inherit = get(node, id0);
		schedule_default(node, name, id1, i, group, {
			time: inherit.time + inherit.delay + inherit.duration,
			delay: 0,
			duration: inherit.duration,
			ease: inherit.ease
		});
	}
	return new Transition(groups, this._parents, name, id1);
}
//#endregion
//#region ../../node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/end.js
function end_default() {
	var on0, on1, that = this, id = that._id, size = that.size();
	return new Promise(function(resolve, reject) {
		var cancel = { value: reject }, end = { value: function() {
			if (--size === 0) resolve();
		} };
		that.each(function() {
			var schedule = set(this, id), on = schedule.on;
			if (on !== on0) {
				on1 = (on0 = on).copy();
				on1._.cancel.push(cancel);
				on1._.interrupt.push(cancel);
				on1._.end.push(end);
			}
			schedule.on = on1;
		});
		if (size === 0) resolve();
	});
}
//#endregion
//#region ../../node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/index.js
var id = 0;
function Transition(groups, parents, name, id) {
	this._groups = groups;
	this._parents = parents;
	this._name = name;
	this._id = id;
}
function transition(name) {
	return selection().transition(name);
}
function newId() {
	return ++id;
}
var selection_prototype = selection.prototype;
Transition.prototype = transition.prototype = {
	constructor: Transition,
	select: select_default,
	selectAll: selectAll_default,
	selectChild: selection_prototype.selectChild,
	selectChildren: selection_prototype.selectChildren,
	filter: filter_default,
	merge: merge_default,
	selection: selection_default,
	transition: transition_default$1,
	call: selection_prototype.call,
	nodes: selection_prototype.nodes,
	node: selection_prototype.node,
	size: selection_prototype.size,
	empty: selection_prototype.empty,
	each: selection_prototype.each,
	on: on_default,
	attr: attr_default,
	attrTween: attrTween_default,
	style: style_default,
	styleTween: styleTween_default,
	text: text_default,
	textTween: textTween_default,
	remove: remove_default,
	tween: tween_default,
	delay: delay_default,
	duration: duration_default,
	ease: ease_default,
	easeVarying: easeVarying_default,
	end: end_default,
	[Symbol.iterator]: selection_prototype[Symbol.iterator]
};
//#endregion
//#region ../../node_modules/.pnpm/d3-ease@3.0.1/node_modules/d3-ease/src/cubic.js
function cubicInOut(t) {
	return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
//#endregion
//#region ../../node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/selection/transition.js
var defaultTiming = {
	time: null,
	delay: 0,
	duration: 250,
	ease: cubicInOut
};
function inherit(node, id) {
	var timing;
	while (!(timing = node.__transition) || !(timing = timing[id])) if (!(node = node.parentNode)) throw new Error(`transition ${id} not found`);
	return timing;
}
function transition_default(name) {
	var id, timing;
	if (name instanceof Transition) id = name._id, name = name._name;
	else id = newId(), (timing = defaultTiming).time = now(), name = name == null ? null : name + "";
	for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) if (node = group[i]) schedule_default(node, name, id, i, group, timing || inherit(node, id));
	return new Transition(groups, this._parents, name, id);
}
//#endregion
//#region ../../node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/selection/index.js
selection.prototype.interrupt = interrupt_default;
selection.prototype.transition = transition_default;
//#endregion
//#region ../../node_modules/.pnpm/d3-zoom@3.0.0/node_modules/d3-zoom/src/constant.js
var constant_default = (x) => () => x;
//#endregion
//#region ../../node_modules/.pnpm/d3-zoom@3.0.0/node_modules/d3-zoom/src/event.js
function ZoomEvent(type, { sourceEvent, target, transform, dispatch }) {
	Object.defineProperties(this, {
		type: {
			value: type,
			enumerable: true,
			configurable: true
		},
		sourceEvent: {
			value: sourceEvent,
			enumerable: true,
			configurable: true
		},
		target: {
			value: target,
			enumerable: true,
			configurable: true
		},
		transform: {
			value: transform,
			enumerable: true,
			configurable: true
		},
		_: { value: dispatch }
	});
}
//#endregion
//#region ../../node_modules/.pnpm/d3-zoom@3.0.0/node_modules/d3-zoom/src/transform.js
function Transform(k, x, y) {
	this.k = k;
	this.x = x;
	this.y = y;
}
Transform.prototype = {
	constructor: Transform,
	scale: function(k) {
		return k === 1 ? this : new Transform(this.k * k, this.x, this.y);
	},
	translate: function(x, y) {
		return x === 0 & y === 0 ? this : new Transform(this.k, this.x + this.k * x, this.y + this.k * y);
	},
	apply: function(point) {
		return [point[0] * this.k + this.x, point[1] * this.k + this.y];
	},
	applyX: function(x) {
		return x * this.k + this.x;
	},
	applyY: function(y) {
		return y * this.k + this.y;
	},
	invert: function(location) {
		return [(location[0] - this.x) / this.k, (location[1] - this.y) / this.k];
	},
	invertX: function(x) {
		return (x - this.x) / this.k;
	},
	invertY: function(y) {
		return (y - this.y) / this.k;
	},
	rescaleX: function(x) {
		return x.copy().domain(x.range().map(this.invertX, this).map(x.invert, x));
	},
	rescaleY: function(y) {
		return y.copy().domain(y.range().map(this.invertY, this).map(y.invert, y));
	},
	toString: function() {
		return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
	}
};
var identity = new Transform(1, 0, 0);
transform.prototype = Transform.prototype;
function transform(node) {
	while (!node.__zoom) if (!(node = node.parentNode)) return identity;
	return node.__zoom;
}
//#endregion
//#region ../../node_modules/.pnpm/d3-zoom@3.0.0/node_modules/d3-zoom/src/noevent.js
function nopropagation(event) {
	event.stopImmediatePropagation();
}
function noevent_default(event) {
	event.preventDefault();
	event.stopImmediatePropagation();
}
//#endregion
//#region ../../node_modules/.pnpm/d3-zoom@3.0.0/node_modules/d3-zoom/src/zoom.js
function defaultFilter(event) {
	return (!event.ctrlKey || event.type === "wheel") && !event.button;
}
function defaultExtent() {
	var e = this;
	if (e instanceof SVGElement) {
		e = e.ownerSVGElement || e;
		if (e.hasAttribute("viewBox")) {
			e = e.viewBox.baseVal;
			return [[e.x, e.y], [e.x + e.width, e.y + e.height]];
		}
		return [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]];
	}
	return [[0, 0], [e.clientWidth, e.clientHeight]];
}
function defaultTransform() {
	return this.__zoom || identity;
}
function defaultWheelDelta(event) {
	return -event.deltaY * (event.deltaMode === 1 ? .05 : event.deltaMode ? 1 : .002) * (event.ctrlKey ? 10 : 1);
}
function defaultTouchable() {
	return navigator.maxTouchPoints || "ontouchstart" in this;
}
function defaultConstrain(transform, extent, translateExtent) {
	var dx0 = transform.invertX(extent[0][0]) - translateExtent[0][0], dx1 = transform.invertX(extent[1][0]) - translateExtent[1][0], dy0 = transform.invertY(extent[0][1]) - translateExtent[0][1], dy1 = transform.invertY(extent[1][1]) - translateExtent[1][1];
	return transform.translate(dx1 > dx0 ? (dx0 + dx1) / 2 : Math.min(0, dx0) || Math.max(0, dx1), dy1 > dy0 ? (dy0 + dy1) / 2 : Math.min(0, dy0) || Math.max(0, dy1));
}
function zoom_default() {
	var filter = defaultFilter, extent = defaultExtent, constrain = defaultConstrain, wheelDelta = defaultWheelDelta, touchable = defaultTouchable, scaleExtent = [0, Infinity], translateExtent = [[-Infinity, -Infinity], [Infinity, Infinity]], duration = 250, interpolate = zoom_default$1, listeners = dispatch("start", "zoom", "end"), touchstarting, touchfirst, touchending, touchDelay = 500, wheelDelay = 150, clickDistance2 = 0, tapDistance = 10;
	function zoom(selection) {
		selection.property("__zoom", defaultTransform).on("wheel.zoom", wheeled, { passive: false }).on("mousedown.zoom", mousedowned).on("dblclick.zoom", dblclicked).filter(touchable).on("touchstart.zoom", touchstarted).on("touchmove.zoom", touchmoved).on("touchend.zoom touchcancel.zoom", touchended).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
	}
	zoom.transform = function(collection, transform, point, event) {
		var selection = collection.selection ? collection.selection() : collection;
		selection.property("__zoom", defaultTransform);
		if (collection !== selection) schedule(collection, transform, point, event);
		else selection.interrupt().each(function() {
			gesture(this, arguments).event(event).start().zoom(null, typeof transform === "function" ? transform.apply(this, arguments) : transform).end();
		});
	};
	zoom.scaleBy = function(selection, k, p, event) {
		zoom.scaleTo(selection, function() {
			return this.__zoom.k * (typeof k === "function" ? k.apply(this, arguments) : k);
		}, p, event);
	};
	zoom.scaleTo = function(selection, k, p, event) {
		zoom.transform(selection, function() {
			var e = extent.apply(this, arguments), t0 = this.__zoom, p0 = p == null ? centroid(e) : typeof p === "function" ? p.apply(this, arguments) : p, p1 = t0.invert(p0), k1 = typeof k === "function" ? k.apply(this, arguments) : k;
			return constrain(translate(scale(t0, k1), p0, p1), e, translateExtent);
		}, p, event);
	};
	zoom.translateBy = function(selection, x, y, event) {
		zoom.transform(selection, function() {
			return constrain(this.__zoom.translate(typeof x === "function" ? x.apply(this, arguments) : x, typeof y === "function" ? y.apply(this, arguments) : y), extent.apply(this, arguments), translateExtent);
		}, null, event);
	};
	zoom.translateTo = function(selection, x, y, p, event) {
		zoom.transform(selection, function() {
			var e = extent.apply(this, arguments), t = this.__zoom, p0 = p == null ? centroid(e) : typeof p === "function" ? p.apply(this, arguments) : p;
			return constrain(identity.translate(p0[0], p0[1]).scale(t.k).translate(typeof x === "function" ? -x.apply(this, arguments) : -x, typeof y === "function" ? -y.apply(this, arguments) : -y), e, translateExtent);
		}, p, event);
	};
	function scale(transform, k) {
		k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], k));
		return k === transform.k ? transform : new Transform(k, transform.x, transform.y);
	}
	function translate(transform, p0, p1) {
		var x = p0[0] - p1[0] * transform.k, y = p0[1] - p1[1] * transform.k;
		return x === transform.x && y === transform.y ? transform : new Transform(transform.k, x, y);
	}
	function centroid(extent) {
		return [(+extent[0][0] + +extent[1][0]) / 2, (+extent[0][1] + +extent[1][1]) / 2];
	}
	function schedule(transition, transform, point, event) {
		transition.on("start.zoom", function() {
			gesture(this, arguments).event(event).start();
		}).on("interrupt.zoom end.zoom", function() {
			gesture(this, arguments).event(event).end();
		}).tween("zoom", function() {
			var that = this, args = arguments, g = gesture(that, args).event(event), e = extent.apply(that, args), p = point == null ? centroid(e) : typeof point === "function" ? point.apply(that, args) : point, w = Math.max(e[1][0] - e[0][0], e[1][1] - e[0][1]), a = that.__zoom, b = typeof transform === "function" ? transform.apply(that, args) : transform, i = interpolate(a.invert(p).concat(w / a.k), b.invert(p).concat(w / b.k));
			return function(t) {
				if (t === 1) t = b;
				else {
					var l = i(t), k = w / l[2];
					t = new Transform(k, p[0] - l[0] * k, p[1] - l[1] * k);
				}
				g.zoom(null, t);
			};
		});
	}
	function gesture(that, args, clean) {
		return !clean && that.__zooming || new Gesture(that, args);
	}
	function Gesture(that, args) {
		this.that = that;
		this.args = args;
		this.active = 0;
		this.sourceEvent = null;
		this.extent = extent.apply(that, args);
		this.taps = 0;
	}
	Gesture.prototype = {
		event: function(event) {
			if (event) this.sourceEvent = event;
			return this;
		},
		start: function() {
			if (++this.active === 1) {
				this.that.__zooming = this;
				this.emit("start");
			}
			return this;
		},
		zoom: function(key, transform) {
			if (this.mouse && key !== "mouse") this.mouse[1] = transform.invert(this.mouse[0]);
			if (this.touch0 && key !== "touch") this.touch0[1] = transform.invert(this.touch0[0]);
			if (this.touch1 && key !== "touch") this.touch1[1] = transform.invert(this.touch1[0]);
			this.that.__zoom = transform;
			this.emit("zoom");
			return this;
		},
		end: function() {
			if (--this.active === 0) {
				delete this.that.__zooming;
				this.emit("end");
			}
			return this;
		},
		emit: function(type) {
			var d = select_default$1(this.that).datum();
			listeners.call(type, this.that, new ZoomEvent(type, {
				sourceEvent: this.sourceEvent,
				target: zoom,
				type,
				transform: this.that.__zoom,
				dispatch: listeners
			}), d);
		}
	};
	function wheeled(event, ...args) {
		if (!filter.apply(this, arguments)) return;
		var g = gesture(this, args).event(event), t = this.__zoom, k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], t.k * Math.pow(2, wheelDelta.apply(this, arguments)))), p = pointer_default(event);
		if (g.wheel) {
			if (g.mouse[0][0] !== p[0] || g.mouse[0][1] !== p[1]) g.mouse[1] = t.invert(g.mouse[0] = p);
			clearTimeout(g.wheel);
		} else if (t.k === k) return;
		else {
			g.mouse = [p, t.invert(p)];
			interrupt_default$1(this);
			g.start();
		}
		noevent_default(event);
		g.wheel = setTimeout(wheelidled, wheelDelay);
		g.zoom("mouse", constrain(translate(scale(t, k), g.mouse[0], g.mouse[1]), g.extent, translateExtent));
		function wheelidled() {
			g.wheel = null;
			g.end();
		}
	}
	function mousedowned(event, ...args) {
		if (touchending || !filter.apply(this, arguments)) return;
		var currentTarget = event.currentTarget, g = gesture(this, args, true).event(event), v = select_default$1(event.view).on("mousemove.zoom", mousemoved, true).on("mouseup.zoom", mouseupped, true), p = pointer_default(event, currentTarget), x0 = event.clientX, y0 = event.clientY;
		nodrag_default(event.view);
		nopropagation(event);
		g.mouse = [p, this.__zoom.invert(p)];
		interrupt_default$1(this);
		g.start();
		function mousemoved(event) {
			noevent_default(event);
			if (!g.moved) {
				var dx = event.clientX - x0, dy = event.clientY - y0;
				g.moved = dx * dx + dy * dy > clickDistance2;
			}
			g.event(event).zoom("mouse", constrain(translate(g.that.__zoom, g.mouse[0] = pointer_default(event, currentTarget), g.mouse[1]), g.extent, translateExtent));
		}
		function mouseupped(event) {
			v.on("mousemove.zoom mouseup.zoom", null);
			yesdrag(event.view, g.moved);
			noevent_default(event);
			g.event(event).end();
		}
	}
	function dblclicked(event, ...args) {
		if (!filter.apply(this, arguments)) return;
		var t0 = this.__zoom, p0 = pointer_default(event.changedTouches ? event.changedTouches[0] : event, this), p1 = t0.invert(p0), k1 = t0.k * (event.shiftKey ? .5 : 2), t1 = constrain(translate(scale(t0, k1), p0, p1), extent.apply(this, args), translateExtent);
		noevent_default(event);
		if (duration > 0) select_default$1(this).transition().duration(duration).call(schedule, t1, p0, event);
		else select_default$1(this).call(zoom.transform, t1, p0, event);
	}
	function touchstarted(event, ...args) {
		if (!filter.apply(this, arguments)) return;
		var touches = event.touches, n = touches.length, g = gesture(this, args, event.changedTouches.length === n).event(event), started, i, t, p;
		nopropagation(event);
		for (i = 0; i < n; ++i) {
			t = touches[i], p = pointer_default(t, this);
			p = [
				p,
				this.__zoom.invert(p),
				t.identifier
			];
			if (!g.touch0) g.touch0 = p, started = true, g.taps = 1 + !!touchstarting;
			else if (!g.touch1 && g.touch0[2] !== p[2]) g.touch1 = p, g.taps = 0;
		}
		if (touchstarting) touchstarting = clearTimeout(touchstarting);
		if (started) {
			if (g.taps < 2) touchfirst = p[0], touchstarting = setTimeout(function() {
				touchstarting = null;
			}, touchDelay);
			interrupt_default$1(this);
			g.start();
		}
	}
	function touchmoved(event, ...args) {
		if (!this.__zooming) return;
		var g = gesture(this, args).event(event), touches = event.changedTouches, n = touches.length, i, t, p, l;
		noevent_default(event);
		for (i = 0; i < n; ++i) {
			t = touches[i], p = pointer_default(t, this);
			if (g.touch0 && g.touch0[2] === t.identifier) g.touch0[0] = p;
			else if (g.touch1 && g.touch1[2] === t.identifier) g.touch1[0] = p;
		}
		t = g.that.__zoom;
		if (g.touch1) {
			var p0 = g.touch0[0], l0 = g.touch0[1], p1 = g.touch1[0], l1 = g.touch1[1], dp = (dp = p1[0] - p0[0]) * dp + (dp = p1[1] - p0[1]) * dp, dl = (dl = l1[0] - l0[0]) * dl + (dl = l1[1] - l0[1]) * dl;
			t = scale(t, Math.sqrt(dp / dl));
			p = [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2];
			l = [(l0[0] + l1[0]) / 2, (l0[1] + l1[1]) / 2];
		} else if (g.touch0) p = g.touch0[0], l = g.touch0[1];
		else return;
		g.zoom("touch", constrain(translate(t, p, l), g.extent, translateExtent));
	}
	function touchended(event, ...args) {
		if (!this.__zooming) return;
		var g = gesture(this, args).event(event), touches = event.changedTouches, n = touches.length, i, t;
		nopropagation(event);
		if (touchending) clearTimeout(touchending);
		touchending = setTimeout(function() {
			touchending = null;
		}, touchDelay);
		for (i = 0; i < n; ++i) {
			t = touches[i];
			if (g.touch0 && g.touch0[2] === t.identifier) delete g.touch0;
			else if (g.touch1 && g.touch1[2] === t.identifier) delete g.touch1;
		}
		if (g.touch1 && !g.touch0) g.touch0 = g.touch1, delete g.touch1;
		if (g.touch0) g.touch0[1] = this.__zoom.invert(g.touch0[0]);
		else {
			g.end();
			if (g.taps === 2) {
				t = pointer_default(t, this);
				if (Math.hypot(touchfirst[0] - t[0], touchfirst[1] - t[1]) < tapDistance) {
					var p = select_default$1(this).on("dblclick.zoom");
					if (p) p.apply(this, arguments);
				}
			}
		}
	}
	zoom.wheelDelta = function(_) {
		return arguments.length ? (wheelDelta = typeof _ === "function" ? _ : constant_default(+_), zoom) : wheelDelta;
	};
	zoom.filter = function(_) {
		return arguments.length ? (filter = typeof _ === "function" ? _ : constant_default(!!_), zoom) : filter;
	};
	zoom.touchable = function(_) {
		return arguments.length ? (touchable = typeof _ === "function" ? _ : constant_default(!!_), zoom) : touchable;
	};
	zoom.extent = function(_) {
		return arguments.length ? (extent = typeof _ === "function" ? _ : constant_default([[+_[0][0], +_[0][1]], [+_[1][0], +_[1][1]]]), zoom) : extent;
	};
	zoom.scaleExtent = function(_) {
		return arguments.length ? (scaleExtent[0] = +_[0], scaleExtent[1] = +_[1], zoom) : [scaleExtent[0], scaleExtent[1]];
	};
	zoom.translateExtent = function(_) {
		return arguments.length ? (translateExtent[0][0] = +_[0][0], translateExtent[1][0] = +_[1][0], translateExtent[0][1] = +_[0][1], translateExtent[1][1] = +_[1][1], zoom) : [[translateExtent[0][0], translateExtent[0][1]], [translateExtent[1][0], translateExtent[1][1]]];
	};
	zoom.constrain = function(_) {
		return arguments.length ? (constrain = _, zoom) : constrain;
	};
	zoom.duration = function(_) {
		return arguments.length ? (duration = +_, zoom) : duration;
	};
	zoom.interpolate = function(_) {
		return arguments.length ? (interpolate = _, zoom) : interpolate;
	};
	zoom.on = function() {
		var value = listeners.on.apply(listeners, arguments);
		return value === listeners ? zoom : value;
	};
	zoom.clickDistance = function(_) {
		return arguments.length ? (clickDistance2 = (_ = +_) * _, zoom) : Math.sqrt(clickDistance2);
	};
	zoom.tapDistance = function(_) {
		return arguments.length ? (tapDistance = +_, zoom) : tapDistance;
	};
	return zoom;
}
//#endregion
//#region ../../node_modules/.pnpm/@reactflow+core@11.11.4_@types+react@18.3.31_immer@10.2.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@reactflow/core/dist/esm/index.mjs
const StoreContext = (0, react.createContext)(null);
const Provider$1 = StoreContext.Provider;
const errorMessages = {
	error001: () => "[React Flow]: Seems like you have not used zustand provider as an ancestor. Help: https://reactflow.dev/error#001",
	error002: () => "It looks like you've created a new nodeTypes or edgeTypes object. If this wasn't on purpose please define the nodeTypes/edgeTypes outside of the component or memoize them.",
	error003: (nodeType) => `Node type "${nodeType}" not found. Using fallback type "default".`,
	error004: () => "The React Flow parent container needs a width and a height to render the graph.",
	error005: () => "Only child nodes can use a parent extent.",
	error006: () => "Can't create edge. An edge needs a source and a target.",
	error007: (id) => `The old edge with id=${id} does not exist.`,
	error009: (type) => `Marker type "${type}" doesn't exist.`,
	error008: (sourceHandle, edge) => `Couldn't create edge for ${!sourceHandle ? "source" : "target"} handle id: "${!sourceHandle ? edge.sourceHandle : edge.targetHandle}", edge id: ${edge.id}.`,
	error010: () => "Handle: No node id found. Make sure to only use a Handle inside a custom Node.",
	error011: (edgeType) => `Edge type "${edgeType}" not found. Using fallback type "default".`,
	error012: (id) => `Node with id "${id}" does not exist, it may have been removed. This can happen when a node is deleted before the "onNodeClick" handler is called.`
};
const zustandErrorMessage = errorMessages["error001"]();
function useStore(selector, equalityFn) {
	const store = (0, react.useContext)(StoreContext);
	if (store === null) throw new Error(zustandErrorMessage);
	return useStoreWithEqualityFn(store, selector, equalityFn);
}
const useStoreApi = () => {
	const store = (0, react.useContext)(StoreContext);
	if (store === null) throw new Error(zustandErrorMessage);
	return (0, react.useMemo)(() => ({
		getState: store.getState,
		setState: store.setState,
		subscribe: store.subscribe,
		destroy: store.destroy
	}), [store]);
};
const selector$g = (s) => s.userSelectionActive ? "none" : "all";
function Panel({ position, children, className, style, ...rest }) {
	const pointerEvents = useStore(selector$g);
	const positionClasses = `${position}`.split("-");
	return react.default.createElement("div", {
		className: cc([
			"react-flow__panel",
			className,
			...positionClasses
		]),
		style: {
			...style,
			pointerEvents
		},
		...rest
	}, children);
}
function Attribution({ proOptions, position = "bottom-right" }) {
	if (proOptions?.hideAttribution) return null;
	return react.default.createElement(Panel, {
		position,
		className: "react-flow__attribution",
		"data-message": "Please only hide this attribution when you are subscribed to React Flow Pro: https://reactflow.dev/pro"
	}, react.default.createElement("a", {
		href: "https://reactflow.dev",
		target: "_blank",
		rel: "noopener noreferrer",
		"aria-label": "React Flow attribution"
	}, "React Flow"));
}
const EdgeText = ({ x, y, label, labelStyle = {}, labelShowBg = true, labelBgStyle = {}, labelBgPadding = [2, 4], labelBgBorderRadius = 2, children, className, ...rest }) => {
	const edgeRef = (0, react.useRef)(null);
	const [edgeTextBbox, setEdgeTextBbox] = (0, react.useState)({
		x: 0,
		y: 0,
		width: 0,
		height: 0
	});
	const edgeTextClasses = cc(["react-flow__edge-textwrapper", className]);
	(0, react.useEffect)(() => {
		if (edgeRef.current) {
			const textBbox = edgeRef.current.getBBox();
			setEdgeTextBbox({
				x: textBbox.x,
				y: textBbox.y,
				width: textBbox.width,
				height: textBbox.height
			});
		}
	}, [label]);
	if (typeof label === "undefined" || !label) return null;
	return react.default.createElement("g", {
		transform: `translate(${x - edgeTextBbox.width / 2} ${y - edgeTextBbox.height / 2})`,
		className: edgeTextClasses,
		visibility: edgeTextBbox.width ? "visible" : "hidden",
		...rest
	}, labelShowBg && react.default.createElement("rect", {
		width: edgeTextBbox.width + 2 * labelBgPadding[0],
		x: -labelBgPadding[0],
		y: -labelBgPadding[1],
		height: edgeTextBbox.height + 2 * labelBgPadding[1],
		className: "react-flow__edge-textbg",
		style: labelBgStyle,
		rx: labelBgBorderRadius,
		ry: labelBgBorderRadius
	}), react.default.createElement("text", {
		className: "react-flow__edge-text",
		y: edgeTextBbox.height / 2,
		dy: "0.3em",
		ref: edgeRef,
		style: labelStyle
	}, label), children);
};
var EdgeText$1 = (0, react.memo)(EdgeText);
const getDimensions = (node) => ({
	width: node.offsetWidth,
	height: node.offsetHeight
});
const clamp = (val, min = 0, max = 1) => Math.min(Math.max(val, min), max);
const clampPosition = (position = {
	x: 0,
	y: 0
}, extent) => ({
	x: clamp(position.x, extent[0][0], extent[1][0]),
	y: clamp(position.y, extent[0][1], extent[1][1])
});
const calcAutoPanVelocity = (value, min, max) => {
	if (value < min) return clamp(Math.abs(value - min), 1, 50) / 50;
	else if (value > max) return -clamp(Math.abs(value - max), 1, 50) / 50;
	return 0;
};
const calcAutoPan = (pos, bounds) => {
	return [calcAutoPanVelocity(pos.x, 35, bounds.width - 35) * 20, calcAutoPanVelocity(pos.y, 35, bounds.height - 35) * 20];
};
const getHostForElement = (element) => element.getRootNode?.() || window?.document;
const getBoundsOfBoxes = (box1, box2) => ({
	x: Math.min(box1.x, box2.x),
	y: Math.min(box1.y, box2.y),
	x2: Math.max(box1.x2, box2.x2),
	y2: Math.max(box1.y2, box2.y2)
});
const rectToBox = ({ x, y, width, height }) => ({
	x,
	y,
	x2: x + width,
	y2: y + height
});
const boxToRect = ({ x, y, x2, y2 }) => ({
	x,
	y,
	width: x2 - x,
	height: y2 - y
});
const nodeToRect = (node) => ({
	...node.positionAbsolute || {
		x: 0,
		y: 0
	},
	width: node.width || 0,
	height: node.height || 0
});
const getBoundsOfRects = (rect1, rect2) => boxToRect(getBoundsOfBoxes(rectToBox(rect1), rectToBox(rect2)));
const getOverlappingArea = (rectA, rectB) => {
	const xOverlap = Math.max(0, Math.min(rectA.x + rectA.width, rectB.x + rectB.width) - Math.max(rectA.x, rectB.x));
	const yOverlap = Math.max(0, Math.min(rectA.y + rectA.height, rectB.y + rectB.height) - Math.max(rectA.y, rectB.y));
	return Math.ceil(xOverlap * yOverlap);
};
const isRectObject = (obj) => isNumeric(obj.width) && isNumeric(obj.height) && isNumeric(obj.x) && isNumeric(obj.y);
const isNumeric = (n) => !isNaN(n) && isFinite(n);
const internalsSymbol = Symbol.for("internals");
const elementSelectionKeys = [
	"Enter",
	" ",
	"Escape"
];
const devWarn = (id, message) => {};
const isReactKeyboardEvent = (event) => "nativeEvent" in event;
function isInputDOMNode(event) {
	const target = (isReactKeyboardEvent(event) ? event.nativeEvent : event).composedPath?.()?.[0] || event.target;
	return [
		"INPUT",
		"SELECT",
		"TEXTAREA"
	].includes(target?.nodeName) || target?.hasAttribute("contenteditable") || !!target?.closest(".nokey");
}
const isMouseEvent = (event) => "clientX" in event;
const getEventPosition = (event, bounds) => {
	const isMouseTriggered = isMouseEvent(event);
	const evtX = isMouseTriggered ? event.clientX : event.touches?.[0].clientX;
	const evtY = isMouseTriggered ? event.clientY : event.touches?.[0].clientY;
	return {
		x: evtX - (bounds?.left ?? 0),
		y: evtY - (bounds?.top ?? 0)
	};
};
const isMacOs = () => typeof navigator !== "undefined" && navigator?.userAgent?.indexOf("Mac") >= 0;
const BaseEdge = ({ id, path, labelX, labelY, label, labelStyle, labelShowBg, labelBgStyle, labelBgPadding, labelBgBorderRadius, style, markerEnd, markerStart, interactionWidth = 20 }) => {
	return react.default.createElement(react.default.Fragment, null, react.default.createElement("path", {
		id,
		style,
		d: path,
		fill: "none",
		className: "react-flow__edge-path",
		markerEnd,
		markerStart
	}), interactionWidth && react.default.createElement("path", {
		d: path,
		fill: "none",
		strokeOpacity: 0,
		strokeWidth: interactionWidth,
		className: "react-flow__edge-interaction"
	}), label && isNumeric(labelX) && isNumeric(labelY) ? react.default.createElement(EdgeText$1, {
		x: labelX,
		y: labelY,
		label,
		labelStyle,
		labelShowBg,
		labelBgStyle,
		labelBgPadding,
		labelBgBorderRadius
	}) : null);
};
BaseEdge.displayName = "BaseEdge";
function getMouseHandler$1(id, getState, handler) {
	return handler === void 0 ? handler : (event) => {
		const edge = getState().edges.find((e) => e.id === id);
		if (edge) handler(event, { ...edge });
	};
}
function getEdgeCenter({ sourceX, sourceY, targetX, targetY }) {
	const xOffset = Math.abs(targetX - sourceX) / 2;
	const centerX = targetX < sourceX ? targetX + xOffset : targetX - xOffset;
	const yOffset = Math.abs(targetY - sourceY) / 2;
	return [
		centerX,
		targetY < sourceY ? targetY + yOffset : targetY - yOffset,
		xOffset,
		yOffset
	];
}
function getBezierEdgeCenter({ sourceX, sourceY, targetX, targetY, sourceControlX, sourceControlY, targetControlX, targetControlY }) {
	const centerX = sourceX * .125 + sourceControlX * .375 + targetControlX * .375 + targetX * .125;
	const centerY = sourceY * .125 + sourceControlY * .375 + targetControlY * .375 + targetY * .125;
	return [
		centerX,
		centerY,
		Math.abs(centerX - sourceX),
		Math.abs(centerY - sourceY)
	];
}
var ConnectionMode;
(function(ConnectionMode) {
	ConnectionMode["Strict"] = "strict";
	ConnectionMode["Loose"] = "loose";
})(ConnectionMode || (ConnectionMode = {}));
var PanOnScrollMode;
(function(PanOnScrollMode) {
	PanOnScrollMode["Free"] = "free";
	PanOnScrollMode["Vertical"] = "vertical";
	PanOnScrollMode["Horizontal"] = "horizontal";
})(PanOnScrollMode || (PanOnScrollMode = {}));
var SelectionMode;
(function(SelectionMode) {
	SelectionMode["Partial"] = "partial";
	SelectionMode["Full"] = "full";
})(SelectionMode || (SelectionMode = {}));
var ConnectionLineType;
(function(ConnectionLineType) {
	ConnectionLineType["Bezier"] = "default";
	ConnectionLineType["Straight"] = "straight";
	ConnectionLineType["Step"] = "step";
	ConnectionLineType["SmoothStep"] = "smoothstep";
	ConnectionLineType["SimpleBezier"] = "simplebezier";
})(ConnectionLineType || (ConnectionLineType = {}));
var MarkerType;
(function(MarkerType) {
	MarkerType["Arrow"] = "arrow";
	MarkerType["ArrowClosed"] = "arrowclosed";
})(MarkerType || (MarkerType = {}));
var Position;
(function(Position) {
	Position["Left"] = "left";
	Position["Top"] = "top";
	Position["Right"] = "right";
	Position["Bottom"] = "bottom";
})(Position || (Position = {}));
function getControl({ pos, x1, y1, x2, y2 }) {
	if (pos === Position.Left || pos === Position.Right) return [.5 * (x1 + x2), y1];
	return [x1, .5 * (y1 + y2)];
}
function getSimpleBezierPath({ sourceX, sourceY, sourcePosition = Position.Bottom, targetX, targetY, targetPosition = Position.Top }) {
	const [sourceControlX, sourceControlY] = getControl({
		pos: sourcePosition,
		x1: sourceX,
		y1: sourceY,
		x2: targetX,
		y2: targetY
	});
	const [targetControlX, targetControlY] = getControl({
		pos: targetPosition,
		x1: targetX,
		y1: targetY,
		x2: sourceX,
		y2: sourceY
	});
	const [labelX, labelY, offsetX, offsetY] = getBezierEdgeCenter({
		sourceX,
		sourceY,
		targetX,
		targetY,
		sourceControlX,
		sourceControlY,
		targetControlX,
		targetControlY
	});
	return [
		`M${sourceX},${sourceY} C${sourceControlX},${sourceControlY} ${targetControlX},${targetControlY} ${targetX},${targetY}`,
		labelX,
		labelY,
		offsetX,
		offsetY
	];
}
const SimpleBezierEdge = (0, react.memo)(({ sourceX, sourceY, targetX, targetY, sourcePosition = Position.Bottom, targetPosition = Position.Top, label, labelStyle, labelShowBg, labelBgStyle, labelBgPadding, labelBgBorderRadius, style, markerEnd, markerStart, interactionWidth }) => {
	const [path, labelX, labelY] = getSimpleBezierPath({
		sourceX,
		sourceY,
		sourcePosition,
		targetX,
		targetY,
		targetPosition
	});
	return react.default.createElement(BaseEdge, {
		path,
		labelX,
		labelY,
		label,
		labelStyle,
		labelShowBg,
		labelBgStyle,
		labelBgPadding,
		labelBgBorderRadius,
		style,
		markerEnd,
		markerStart,
		interactionWidth
	});
});
SimpleBezierEdge.displayName = "SimpleBezierEdge";
const handleDirections = {
	[Position.Left]: {
		x: -1,
		y: 0
	},
	[Position.Right]: {
		x: 1,
		y: 0
	},
	[Position.Top]: {
		x: 0,
		y: -1
	},
	[Position.Bottom]: {
		x: 0,
		y: 1
	}
};
const getDirection = ({ source, sourcePosition = Position.Bottom, target }) => {
	if (sourcePosition === Position.Left || sourcePosition === Position.Right) return source.x < target.x ? {
		x: 1,
		y: 0
	} : {
		x: -1,
		y: 0
	};
	return source.y < target.y ? {
		x: 0,
		y: 1
	} : {
		x: 0,
		y: -1
	};
};
const distance = (a, b) => Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
function getPoints({ source, sourcePosition = Position.Bottom, target, targetPosition = Position.Top, center, offset }) {
	const sourceDir = handleDirections[sourcePosition];
	const targetDir = handleDirections[targetPosition];
	const sourceGapped = {
		x: source.x + sourceDir.x * offset,
		y: source.y + sourceDir.y * offset
	};
	const targetGapped = {
		x: target.x + targetDir.x * offset,
		y: target.y + targetDir.y * offset
	};
	const dir = getDirection({
		source: sourceGapped,
		sourcePosition,
		target: targetGapped
	});
	const dirAccessor = dir.x !== 0 ? "x" : "y";
	const currDir = dir[dirAccessor];
	let points = [];
	let centerX, centerY;
	const sourceGapOffset = {
		x: 0,
		y: 0
	};
	const targetGapOffset = {
		x: 0,
		y: 0
	};
	const [defaultCenterX, defaultCenterY, defaultOffsetX, defaultOffsetY] = getEdgeCenter({
		sourceX: source.x,
		sourceY: source.y,
		targetX: target.x,
		targetY: target.y
	});
	if (sourceDir[dirAccessor] * targetDir[dirAccessor] === -1) {
		centerX = center.x ?? defaultCenterX;
		centerY = center.y ?? defaultCenterY;
		const verticalSplit = [{
			x: centerX,
			y: sourceGapped.y
		}, {
			x: centerX,
			y: targetGapped.y
		}];
		const horizontalSplit = [{
			x: sourceGapped.x,
			y: centerY
		}, {
			x: targetGapped.x,
			y: centerY
		}];
		if (sourceDir[dirAccessor] === currDir) points = dirAccessor === "x" ? verticalSplit : horizontalSplit;
		else points = dirAccessor === "x" ? horizontalSplit : verticalSplit;
	} else {
		const sourceTarget = [{
			x: sourceGapped.x,
			y: targetGapped.y
		}];
		const targetSource = [{
			x: targetGapped.x,
			y: sourceGapped.y
		}];
		if (dirAccessor === "x") points = sourceDir.x === currDir ? targetSource : sourceTarget;
		else points = sourceDir.y === currDir ? sourceTarget : targetSource;
		if (sourcePosition === targetPosition) {
			const diff = Math.abs(source[dirAccessor] - target[dirAccessor]);
			if (diff <= offset) {
				const gapOffset = Math.min(offset - 1, offset - diff);
				if (sourceDir[dirAccessor] === currDir) sourceGapOffset[dirAccessor] = (sourceGapped[dirAccessor] > source[dirAccessor] ? -1 : 1) * gapOffset;
				else targetGapOffset[dirAccessor] = (targetGapped[dirAccessor] > target[dirAccessor] ? -1 : 1) * gapOffset;
			}
		}
		if (sourcePosition !== targetPosition) {
			const dirAccessorOpposite = dirAccessor === "x" ? "y" : "x";
			const isSameDir = sourceDir[dirAccessor] === targetDir[dirAccessorOpposite];
			const sourceGtTargetOppo = sourceGapped[dirAccessorOpposite] > targetGapped[dirAccessorOpposite];
			const sourceLtTargetOppo = sourceGapped[dirAccessorOpposite] < targetGapped[dirAccessorOpposite];
			if (sourceDir[dirAccessor] === 1 && (!isSameDir && sourceGtTargetOppo || isSameDir && sourceLtTargetOppo) || sourceDir[dirAccessor] !== 1 && (!isSameDir && sourceLtTargetOppo || isSameDir && sourceGtTargetOppo)) points = dirAccessor === "x" ? sourceTarget : targetSource;
		}
		const sourceGapPoint = {
			x: sourceGapped.x + sourceGapOffset.x,
			y: sourceGapped.y + sourceGapOffset.y
		};
		const targetGapPoint = {
			x: targetGapped.x + targetGapOffset.x,
			y: targetGapped.y + targetGapOffset.y
		};
		if (Math.max(Math.abs(sourceGapPoint.x - points[0].x), Math.abs(targetGapPoint.x - points[0].x)) >= Math.max(Math.abs(sourceGapPoint.y - points[0].y), Math.abs(targetGapPoint.y - points[0].y))) {
			centerX = (sourceGapPoint.x + targetGapPoint.x) / 2;
			centerY = points[0].y;
		} else {
			centerX = points[0].x;
			centerY = (sourceGapPoint.y + targetGapPoint.y) / 2;
		}
	}
	return [
		[
			source,
			{
				x: sourceGapped.x + sourceGapOffset.x,
				y: sourceGapped.y + sourceGapOffset.y
			},
			...points,
			{
				x: targetGapped.x + targetGapOffset.x,
				y: targetGapped.y + targetGapOffset.y
			},
			target
		],
		centerX,
		centerY,
		defaultOffsetX,
		defaultOffsetY
	];
}
function getBend(a, b, c, size) {
	const bendSize = Math.min(distance(a, b) / 2, distance(b, c) / 2, size);
	const { x, y } = b;
	if (a.x === x && x === c.x || a.y === y && y === c.y) return `L${x} ${y}`;
	if (a.y === y) {
		const xDir = a.x < c.x ? -1 : 1;
		const yDir = a.y < c.y ? 1 : -1;
		return `L ${x + bendSize * xDir},${y}Q ${x},${y} ${x},${y + bendSize * yDir}`;
	}
	const xDir = a.x < c.x ? 1 : -1;
	return `L ${x},${y + bendSize * (a.y < c.y ? -1 : 1)}Q ${x},${y} ${x + bendSize * xDir},${y}`;
}
function getSmoothStepPath({ sourceX, sourceY, sourcePosition = Position.Bottom, targetX, targetY, targetPosition = Position.Top, borderRadius = 5, centerX, centerY, offset = 20 }) {
	const [points, labelX, labelY, offsetX, offsetY] = getPoints({
		source: {
			x: sourceX,
			y: sourceY
		},
		sourcePosition,
		target: {
			x: targetX,
			y: targetY
		},
		targetPosition,
		center: {
			x: centerX,
			y: centerY
		},
		offset
	});
	return [
		points.reduce((res, p, i) => {
			let segment = "";
			if (i > 0 && i < points.length - 1) segment = getBend(points[i - 1], p, points[i + 1], borderRadius);
			else segment = `${i === 0 ? "M" : "L"}${p.x} ${p.y}`;
			res += segment;
			return res;
		}, ""),
		labelX,
		labelY,
		offsetX,
		offsetY
	];
}
const SmoothStepEdge = (0, react.memo)(({ sourceX, sourceY, targetX, targetY, label, labelStyle, labelShowBg, labelBgStyle, labelBgPadding, labelBgBorderRadius, style, sourcePosition = Position.Bottom, targetPosition = Position.Top, markerEnd, markerStart, pathOptions, interactionWidth }) => {
	const [path, labelX, labelY] = getSmoothStepPath({
		sourceX,
		sourceY,
		sourcePosition,
		targetX,
		targetY,
		targetPosition,
		borderRadius: pathOptions?.borderRadius,
		offset: pathOptions?.offset
	});
	return react.default.createElement(BaseEdge, {
		path,
		labelX,
		labelY,
		label,
		labelStyle,
		labelShowBg,
		labelBgStyle,
		labelBgPadding,
		labelBgBorderRadius,
		style,
		markerEnd,
		markerStart,
		interactionWidth
	});
});
SmoothStepEdge.displayName = "SmoothStepEdge";
const StepEdge = (0, react.memo)((props) => react.default.createElement(SmoothStepEdge, {
	...props,
	pathOptions: (0, react.useMemo)(() => ({
		borderRadius: 0,
		offset: props.pathOptions?.offset
	}), [props.pathOptions?.offset])
}));
StepEdge.displayName = "StepEdge";
function getStraightPath({ sourceX, sourceY, targetX, targetY }) {
	const [labelX, labelY, offsetX, offsetY] = getEdgeCenter({
		sourceX,
		sourceY,
		targetX,
		targetY
	});
	return [
		`M ${sourceX},${sourceY}L ${targetX},${targetY}`,
		labelX,
		labelY,
		offsetX,
		offsetY
	];
}
const StraightEdge = (0, react.memo)(({ sourceX, sourceY, targetX, targetY, label, labelStyle, labelShowBg, labelBgStyle, labelBgPadding, labelBgBorderRadius, style, markerEnd, markerStart, interactionWidth }) => {
	const [path, labelX, labelY] = getStraightPath({
		sourceX,
		sourceY,
		targetX,
		targetY
	});
	return react.default.createElement(BaseEdge, {
		path,
		labelX,
		labelY,
		label,
		labelStyle,
		labelShowBg,
		labelBgStyle,
		labelBgPadding,
		labelBgBorderRadius,
		style,
		markerEnd,
		markerStart,
		interactionWidth
	});
});
StraightEdge.displayName = "StraightEdge";
function calculateControlOffset(distance, curvature) {
	if (distance >= 0) return .5 * distance;
	return curvature * 25 * Math.sqrt(-distance);
}
function getControlWithCurvature({ pos, x1, y1, x2, y2, c }) {
	switch (pos) {
		case Position.Left: return [x1 - calculateControlOffset(x1 - x2, c), y1];
		case Position.Right: return [x1 + calculateControlOffset(x2 - x1, c), y1];
		case Position.Top: return [x1, y1 - calculateControlOffset(y1 - y2, c)];
		case Position.Bottom: return [x1, y1 + calculateControlOffset(y2 - y1, c)];
	}
}
function getBezierPath({ sourceX, sourceY, sourcePosition = Position.Bottom, targetX, targetY, targetPosition = Position.Top, curvature = .25 }) {
	const [sourceControlX, sourceControlY] = getControlWithCurvature({
		pos: sourcePosition,
		x1: sourceX,
		y1: sourceY,
		x2: targetX,
		y2: targetY,
		c: curvature
	});
	const [targetControlX, targetControlY] = getControlWithCurvature({
		pos: targetPosition,
		x1: targetX,
		y1: targetY,
		x2: sourceX,
		y2: sourceY,
		c: curvature
	});
	const [labelX, labelY, offsetX, offsetY] = getBezierEdgeCenter({
		sourceX,
		sourceY,
		targetX,
		targetY,
		sourceControlX,
		sourceControlY,
		targetControlX,
		targetControlY
	});
	return [
		`M${sourceX},${sourceY} C${sourceControlX},${sourceControlY} ${targetControlX},${targetControlY} ${targetX},${targetY}`,
		labelX,
		labelY,
		offsetX,
		offsetY
	];
}
const BezierEdge = (0, react.memo)(({ sourceX, sourceY, targetX, targetY, sourcePosition = Position.Bottom, targetPosition = Position.Top, label, labelStyle, labelShowBg, labelBgStyle, labelBgPadding, labelBgBorderRadius, style, markerEnd, markerStart, pathOptions, interactionWidth }) => {
	const [path, labelX, labelY] = getBezierPath({
		sourceX,
		sourceY,
		sourcePosition,
		targetX,
		targetY,
		targetPosition,
		curvature: pathOptions?.curvature
	});
	return react.default.createElement(BaseEdge, {
		path,
		labelX,
		labelY,
		label,
		labelStyle,
		labelShowBg,
		labelBgStyle,
		labelBgPadding,
		labelBgBorderRadius,
		style,
		markerEnd,
		markerStart,
		interactionWidth
	});
});
BezierEdge.displayName = "BezierEdge";
const NodeIdContext = (0, react.createContext)(null);
const Provider = NodeIdContext.Provider;
NodeIdContext.Consumer;
const useNodeId = () => {
	return (0, react.useContext)(NodeIdContext);
};
const isEdge = (element) => "id" in element && "source" in element && "target" in element;
const getEdgeId = ({ source, sourceHandle, target, targetHandle }) => `reactflow__edge-${source}${sourceHandle || ""}-${target}${targetHandle || ""}`;
const getMarkerId = (marker, rfId) => {
	if (typeof marker === "undefined") return "";
	if (typeof marker === "string") return marker;
	return `${rfId ? `${rfId}__` : ""}${Object.keys(marker).sort().map((key) => `${key}=${marker[key]}`).join("&")}`;
};
const connectionExists = (edge, edges) => {
	return edges.some((el) => el.source === edge.source && el.target === edge.target && (el.sourceHandle === edge.sourceHandle || !el.sourceHandle && !edge.sourceHandle) && (el.targetHandle === edge.targetHandle || !el.targetHandle && !edge.targetHandle));
};
const addEdge = (edgeParams, edges) => {
	if (!edgeParams.source || !edgeParams.target) {
		errorMessages["error006"]();
		return edges;
	}
	let edge;
	if (isEdge(edgeParams)) edge = { ...edgeParams };
	else edge = {
		...edgeParams,
		id: getEdgeId(edgeParams)
	};
	if (connectionExists(edge, edges)) return edges;
	return edges.concat(edge);
};
const pointToRendererPoint = ({ x, y }, [tx, ty, tScale], snapToGrid, [snapX, snapY]) => {
	const position = {
		x: (x - tx) / tScale,
		y: (y - ty) / tScale
	};
	if (snapToGrid) return {
		x: snapX * Math.round(position.x / snapX),
		y: snapY * Math.round(position.y / snapY)
	};
	return position;
};
const rendererPointToPoint = ({ x, y }, [tx, ty, tScale]) => {
	return {
		x: x * tScale + tx,
		y: y * tScale + ty
	};
};
const getNodePositionWithOrigin = (node, nodeOrigin = [0, 0]) => {
	if (!node) return {
		x: 0,
		y: 0,
		positionAbsolute: {
			x: 0,
			y: 0
		}
	};
	const offsetX = (node.width ?? 0) * nodeOrigin[0];
	const offsetY = (node.height ?? 0) * nodeOrigin[1];
	const position = {
		x: node.position.x - offsetX,
		y: node.position.y - offsetY
	};
	return {
		...position,
		positionAbsolute: node.positionAbsolute ? {
			x: node.positionAbsolute.x - offsetX,
			y: node.positionAbsolute.y - offsetY
		} : position
	};
};
const getNodesBounds = (nodes, nodeOrigin = [0, 0]) => {
	if (nodes.length === 0) return {
		x: 0,
		y: 0,
		width: 0,
		height: 0
	};
	const box = nodes.reduce((currBox, node) => {
		const { x, y } = getNodePositionWithOrigin(node, nodeOrigin).positionAbsolute;
		return getBoundsOfBoxes(currBox, rectToBox({
			x,
			y,
			width: node.width || 0,
			height: node.height || 0
		}));
	}, {
		x: Infinity,
		y: Infinity,
		x2: -Infinity,
		y2: -Infinity
	});
	return boxToRect(box);
};
const getNodesInside = (nodeInternals, rect, [tx, ty, tScale] = [
	0,
	0,
	1
], partially = false, excludeNonSelectableNodes = false, nodeOrigin = [0, 0]) => {
	const paneRect = {
		x: (rect.x - tx) / tScale,
		y: (rect.y - ty) / tScale,
		width: rect.width / tScale,
		height: rect.height / tScale
	};
	const visibleNodes = [];
	nodeInternals.forEach((node) => {
		const { width, height, selectable = true, hidden = false } = node;
		if (excludeNonSelectableNodes && !selectable || hidden) return false;
		const { positionAbsolute } = getNodePositionWithOrigin(node, nodeOrigin);
		const nodeRect = {
			x: positionAbsolute.x,
			y: positionAbsolute.y,
			width: width || 0,
			height: height || 0
		};
		const overlappingArea = getOverlappingArea(paneRect, nodeRect);
		const notInitialized = typeof width === "undefined" || typeof height === "undefined" || width === null || height === null;
		const partiallyVisible = partially && overlappingArea > 0;
		const area = (width || 0) * (height || 0);
		if (notInitialized || partiallyVisible || overlappingArea >= area || node.dragging) visibleNodes.push(node);
	});
	return visibleNodes;
};
const getConnectedEdges = (nodes, edges) => {
	const nodeIds = nodes.map((node) => node.id);
	return edges.filter((edge) => nodeIds.includes(edge.source) || nodeIds.includes(edge.target));
};
const getViewportForBounds = (bounds, width, height, minZoom, maxZoom, padding = .1) => {
	const xZoom = width / (bounds.width * (1 + padding));
	const yZoom = height / (bounds.height * (1 + padding));
	const clampedZoom = clamp(Math.min(xZoom, yZoom), minZoom, maxZoom);
	const boundsCenterX = bounds.x + bounds.width / 2;
	const boundsCenterY = bounds.y + bounds.height / 2;
	return {
		x: width / 2 - boundsCenterX * clampedZoom,
		y: height / 2 - boundsCenterY * clampedZoom,
		zoom: clampedZoom
	};
};
const getD3Transition = (selection, duration = 0) => {
	return selection.transition().duration(duration);
};
function getHandles(node, handleBounds, type, currentHandle) {
	return (handleBounds[type] || []).reduce((res, h) => {
		if (`${node.id}-${h.id}-${type}` !== currentHandle) res.push({
			id: h.id || null,
			type,
			nodeId: node.id,
			x: (node.positionAbsolute?.x ?? 0) + h.x + h.width / 2,
			y: (node.positionAbsolute?.y ?? 0) + h.y + h.height / 2
		});
		return res;
	}, []);
}
function getClosestHandle(event, doc, pos, connectionRadius, handles, validator) {
	const { x, y } = getEventPosition(event);
	const handleBelow = doc.elementsFromPoint(x, y).find((el) => el.classList.contains("react-flow__handle"));
	if (handleBelow) {
		const handleNodeId = handleBelow.getAttribute("data-nodeid");
		if (handleNodeId) {
			const handleType = getHandleType(void 0, handleBelow);
			const handleId = handleBelow.getAttribute("data-handleid");
			const validHandleResult = validator({
				nodeId: handleNodeId,
				id: handleId,
				type: handleType
			});
			if (validHandleResult) {
				const handle = handles.find((h) => h.nodeId === handleNodeId && h.type === handleType && h.id === handleId);
				return {
					handle: {
						id: handleId,
						type: handleType,
						nodeId: handleNodeId,
						x: handle?.x || pos.x,
						y: handle?.y || pos.y
					},
					validHandleResult
				};
			}
		}
	}
	let closestHandles = [];
	let minDistance = Infinity;
	handles.forEach((handle) => {
		const distance = Math.sqrt((handle.x - pos.x) ** 2 + (handle.y - pos.y) ** 2);
		if (distance <= connectionRadius) {
			const validHandleResult = validator(handle);
			if (distance <= minDistance) {
				if (distance < minDistance) closestHandles = [{
					handle,
					validHandleResult
				}];
				else if (distance === minDistance) closestHandles.push({
					handle,
					validHandleResult
				});
				minDistance = distance;
			}
		}
	});
	if (!closestHandles.length) return {
		handle: null,
		validHandleResult: defaultResult()
	};
	if (closestHandles.length === 1) return closestHandles[0];
	const hasValidHandle = closestHandles.some(({ validHandleResult }) => validHandleResult.isValid);
	const hasTargetHandle = closestHandles.some(({ handle }) => handle.type === "target");
	return closestHandles.find(({ handle, validHandleResult }) => hasTargetHandle ? handle.type === "target" : hasValidHandle ? validHandleResult.isValid : true) || closestHandles[0];
}
const nullConnection = {
	source: null,
	target: null,
	sourceHandle: null,
	targetHandle: null
};
const defaultResult = () => ({
	handleDomNode: null,
	isValid: false,
	connection: nullConnection,
	endHandle: null
});
function isValidHandle(handle, connectionMode, fromNodeId, fromHandleId, fromType, isValidConnection, doc) {
	const isTarget = fromType === "target";
	const handleToCheck = doc.querySelector(`.react-flow__handle[data-id="${handle?.nodeId}-${handle?.id}-${handle?.type}"]`);
	const result = {
		...defaultResult(),
		handleDomNode: handleToCheck
	};
	if (handleToCheck) {
		const handleType = getHandleType(void 0, handleToCheck);
		const handleNodeId = handleToCheck.getAttribute("data-nodeid");
		const handleId = handleToCheck.getAttribute("data-handleid");
		const connectable = handleToCheck.classList.contains("connectable");
		const connectableEnd = handleToCheck.classList.contains("connectableend");
		const connection = {
			source: isTarget ? handleNodeId : fromNodeId,
			sourceHandle: isTarget ? handleId : fromHandleId,
			target: isTarget ? fromNodeId : handleNodeId,
			targetHandle: isTarget ? fromHandleId : handleId
		};
		result.connection = connection;
		if (connectable && connectableEnd && (connectionMode === ConnectionMode.Strict ? isTarget && handleType === "source" || !isTarget && handleType === "target" : handleNodeId !== fromNodeId || handleId !== fromHandleId)) {
			result.endHandle = {
				nodeId: handleNodeId,
				handleId,
				type: handleType
			};
			result.isValid = isValidConnection(connection);
		}
	}
	return result;
}
function getHandleLookup({ nodes, nodeId, handleId, handleType }) {
	return nodes.reduce((res, node) => {
		if (node[internalsSymbol]) {
			const { handleBounds } = node[internalsSymbol];
			let sourceHandles = [];
			let targetHandles = [];
			if (handleBounds) {
				sourceHandles = getHandles(node, handleBounds, "source", `${nodeId}-${handleId}-${handleType}`);
				targetHandles = getHandles(node, handleBounds, "target", `${nodeId}-${handleId}-${handleType}`);
			}
			res.push(...sourceHandles, ...targetHandles);
		}
		return res;
	}, []);
}
function getHandleType(edgeUpdaterType, handleDomNode) {
	if (edgeUpdaterType) return edgeUpdaterType;
	else if (handleDomNode?.classList.contains("target")) return "target";
	else if (handleDomNode?.classList.contains("source")) return "source";
	return null;
}
function resetRecentHandle(handleDomNode) {
	handleDomNode?.classList.remove("valid", "connecting", "react-flow__handle-valid", "react-flow__handle-connecting");
}
function getConnectionStatus(isInsideConnectionRadius, isHandleValid) {
	let connectionStatus = null;
	if (isHandleValid) connectionStatus = "valid";
	else if (isInsideConnectionRadius && !isHandleValid) connectionStatus = "invalid";
	return connectionStatus;
}
function handlePointerDown({ event, handleId, nodeId, onConnect, isTarget, getState, setState, isValidConnection, edgeUpdaterType, onReconnectEnd }) {
	const doc = getHostForElement(event.target);
	const { connectionMode, domNode, autoPanOnConnect, connectionRadius, onConnectStart, panBy, getNodes, cancelConnection } = getState();
	let autoPanId = 0;
	let closestHandle;
	const { x, y } = getEventPosition(event);
	const clickedHandle = doc?.elementFromPoint(x, y);
	const handleType = getHandleType(edgeUpdaterType, clickedHandle);
	const containerBounds = domNode?.getBoundingClientRect();
	if (!containerBounds || !handleType) return;
	let prevActiveHandle;
	let connectionPosition = getEventPosition(event, containerBounds);
	let autoPanStarted = false;
	let connection = null;
	let isValid = false;
	let handleDomNode = null;
	const handleLookup = getHandleLookup({
		nodes: getNodes(),
		nodeId,
		handleId,
		handleType
	});
	const autoPan = () => {
		if (!autoPanOnConnect) return;
		const [xMovement, yMovement] = calcAutoPan(connectionPosition, containerBounds);
		panBy({
			x: xMovement,
			y: yMovement
		});
		autoPanId = requestAnimationFrame(autoPan);
	};
	setState({
		connectionPosition,
		connectionStatus: null,
		connectionNodeId: nodeId,
		connectionHandleId: handleId,
		connectionHandleType: handleType,
		connectionStartHandle: {
			nodeId,
			handleId,
			type: handleType
		},
		connectionEndHandle: null
	});
	onConnectStart?.(event, {
		nodeId,
		handleId,
		handleType
	});
	function onPointerMove(event) {
		const { transform } = getState();
		connectionPosition = getEventPosition(event, containerBounds);
		const { handle, validHandleResult } = getClosestHandle(event, doc, pointToRendererPoint(connectionPosition, transform, false, [1, 1]), connectionRadius, handleLookup, (handle) => isValidHandle(handle, connectionMode, nodeId, handleId, isTarget ? "target" : "source", isValidConnection, doc));
		closestHandle = handle;
		if (!autoPanStarted) {
			autoPan();
			autoPanStarted = true;
		}
		handleDomNode = validHandleResult.handleDomNode;
		connection = validHandleResult.connection;
		isValid = validHandleResult.isValid;
		setState({
			connectionPosition: closestHandle && isValid ? rendererPointToPoint({
				x: closestHandle.x,
				y: closestHandle.y
			}, transform) : connectionPosition,
			connectionStatus: getConnectionStatus(!!closestHandle, isValid),
			connectionEndHandle: validHandleResult.endHandle
		});
		if (!closestHandle && !isValid && !handleDomNode) return resetRecentHandle(prevActiveHandle);
		if (connection.source !== connection.target && handleDomNode) {
			resetRecentHandle(prevActiveHandle);
			prevActiveHandle = handleDomNode;
			handleDomNode.classList.add("connecting", "react-flow__handle-connecting");
			handleDomNode.classList.toggle("valid", isValid);
			handleDomNode.classList.toggle("react-flow__handle-valid", isValid);
		}
	}
	function onPointerUp(event) {
		if ((closestHandle || handleDomNode) && connection && isValid) onConnect?.(connection);
		getState().onConnectEnd?.(event);
		if (edgeUpdaterType) onReconnectEnd?.(event);
		resetRecentHandle(prevActiveHandle);
		cancelConnection();
		cancelAnimationFrame(autoPanId);
		autoPanStarted = false;
		isValid = false;
		connection = null;
		handleDomNode = null;
		doc.removeEventListener("mousemove", onPointerMove);
		doc.removeEventListener("mouseup", onPointerUp);
		doc.removeEventListener("touchmove", onPointerMove);
		doc.removeEventListener("touchend", onPointerUp);
	}
	doc.addEventListener("mousemove", onPointerMove);
	doc.addEventListener("mouseup", onPointerUp);
	doc.addEventListener("touchmove", onPointerMove);
	doc.addEventListener("touchend", onPointerUp);
}
const alwaysValid = () => true;
const selector$f = (s) => ({
	connectionStartHandle: s.connectionStartHandle,
	connectOnClick: s.connectOnClick,
	noPanClassName: s.noPanClassName
});
const connectingSelector = (nodeId, handleId, type) => (state) => {
	const { connectionStartHandle: startHandle, connectionEndHandle: endHandle, connectionClickStartHandle: clickHandle } = state;
	return {
		connecting: startHandle?.nodeId === nodeId && startHandle?.handleId === handleId && startHandle?.type === type || endHandle?.nodeId === nodeId && endHandle?.handleId === handleId && endHandle?.type === type,
		clickConnecting: clickHandle?.nodeId === nodeId && clickHandle?.handleId === handleId && clickHandle?.type === type
	};
};
const Handle = (0, react.forwardRef)(({ type = "source", position = Position.Top, isValidConnection, isConnectable = true, isConnectableStart = true, isConnectableEnd = true, id, onConnect, children, className, onMouseDown, onTouchStart, ...rest }, ref) => {
	const handleId = id || null;
	const isTarget = type === "target";
	const store = useStoreApi();
	const nodeId = useNodeId();
	const { connectOnClick, noPanClassName } = useStore(selector$f, shallow$1);
	const { connecting, clickConnecting } = useStore(connectingSelector(nodeId, handleId, type), shallow$1);
	if (!nodeId) store.getState().onError?.("010", errorMessages["error010"]());
	const onConnectExtended = (params) => {
		const { defaultEdgeOptions, onConnect: onConnectAction, hasDefaultEdges } = store.getState();
		const edgeParams = {
			...defaultEdgeOptions,
			...params
		};
		if (hasDefaultEdges) {
			const { edges, setEdges } = store.getState();
			setEdges(addEdge(edgeParams, edges));
		}
		onConnectAction?.(edgeParams);
		onConnect?.(edgeParams);
	};
	const onPointerDown = (event) => {
		if (!nodeId) return;
		const isMouseTriggered = isMouseEvent(event);
		if (isConnectableStart && (isMouseTriggered && event.button === 0 || !isMouseTriggered)) handlePointerDown({
			event,
			handleId,
			nodeId,
			onConnect: onConnectExtended,
			isTarget,
			getState: store.getState,
			setState: store.setState,
			isValidConnection: isValidConnection || store.getState().isValidConnection || alwaysValid
		});
		if (isMouseTriggered) onMouseDown?.(event);
		else onTouchStart?.(event);
	};
	const onClick = (event) => {
		const { onClickConnectStart, onClickConnectEnd, connectionClickStartHandle, connectionMode, isValidConnection: isValidConnectionStore } = store.getState();
		if (!nodeId || !connectionClickStartHandle && !isConnectableStart) return;
		if (!connectionClickStartHandle) {
			onClickConnectStart?.(event, {
				nodeId,
				handleId,
				handleType: type
			});
			store.setState({ connectionClickStartHandle: {
				nodeId,
				type,
				handleId
			} });
			return;
		}
		const doc = getHostForElement(event.target);
		const isValidConnectionHandler = isValidConnection || isValidConnectionStore || alwaysValid;
		const { connection, isValid } = isValidHandle({
			nodeId,
			id: handleId,
			type
		}, connectionMode, connectionClickStartHandle.nodeId, connectionClickStartHandle.handleId || null, connectionClickStartHandle.type, isValidConnectionHandler, doc);
		if (isValid) onConnectExtended(connection);
		onClickConnectEnd?.(event);
		store.setState({ connectionClickStartHandle: null });
	};
	return react.default.createElement("div", {
		"data-handleid": handleId,
		"data-nodeid": nodeId,
		"data-handlepos": position,
		"data-id": `${nodeId}-${handleId}-${type}`,
		className: cc([
			"react-flow__handle",
			`react-flow__handle-${position}`,
			"nodrag",
			noPanClassName,
			className,
			{
				source: !isTarget,
				target: isTarget,
				connectable: isConnectable,
				connectablestart: isConnectableStart,
				connectableend: isConnectableEnd,
				connecting: clickConnecting,
				connectionindicator: isConnectable && (isConnectableStart && !connecting || isConnectableEnd && connecting)
			}
		]),
		onMouseDown: onPointerDown,
		onTouchStart: onPointerDown,
		onClick: connectOnClick ? onClick : void 0,
		ref,
		...rest
	}, children);
});
Handle.displayName = "Handle";
var Handle$1 = (0, react.memo)(Handle);
const DefaultNode = ({ data, isConnectable, targetPosition = Position.Top, sourcePosition = Position.Bottom }) => {
	return react.default.createElement(react.default.Fragment, null, react.default.createElement(Handle$1, {
		type: "target",
		position: targetPosition,
		isConnectable
	}), data?.label, react.default.createElement(Handle$1, {
		type: "source",
		position: sourcePosition,
		isConnectable
	}));
};
DefaultNode.displayName = "DefaultNode";
var DefaultNode$1 = (0, react.memo)(DefaultNode);
const InputNode = ({ data, isConnectable, sourcePosition = Position.Bottom }) => react.default.createElement(react.default.Fragment, null, data?.label, react.default.createElement(Handle$1, {
	type: "source",
	position: sourcePosition,
	isConnectable
}));
InputNode.displayName = "InputNode";
var InputNode$1 = (0, react.memo)(InputNode);
const OutputNode = ({ data, isConnectable, targetPosition = Position.Top }) => react.default.createElement(react.default.Fragment, null, react.default.createElement(Handle$1, {
	type: "target",
	position: targetPosition,
	isConnectable
}), data?.label);
OutputNode.displayName = "OutputNode";
var OutputNode$1 = (0, react.memo)(OutputNode);
const GroupNode = () => null;
GroupNode.displayName = "GroupNode";
const selector$e = (s) => ({
	selectedNodes: s.getNodes().filter((n) => n.selected),
	selectedEdges: s.edges.filter((e) => e.selected).map((e) => ({ ...e }))
});
const selectId = (obj) => obj.id;
function areEqual(a, b) {
	return shallow$1(a.selectedNodes.map(selectId), b.selectedNodes.map(selectId)) && shallow$1(a.selectedEdges.map(selectId), b.selectedEdges.map(selectId));
}
const SelectionListener = (0, react.memo)(({ onSelectionChange }) => {
	const store = useStoreApi();
	const { selectedNodes, selectedEdges } = useStore(selector$e, areEqual);
	(0, react.useEffect)(() => {
		const params = {
			nodes: selectedNodes,
			edges: selectedEdges
		};
		onSelectionChange?.(params);
		store.getState().onSelectionChange.forEach((fn) => fn(params));
	}, [
		selectedNodes,
		selectedEdges,
		onSelectionChange
	]);
	return null;
});
SelectionListener.displayName = "SelectionListener";
const changeSelector = (s) => !!s.onSelectionChange;
function Wrapper$1({ onSelectionChange }) {
	const storeHasSelectionChange = useStore(changeSelector);
	if (onSelectionChange || storeHasSelectionChange) return react.default.createElement(SelectionListener, { onSelectionChange });
	return null;
}
const selector$d = (s) => ({
	setNodes: s.setNodes,
	setEdges: s.setEdges,
	setDefaultNodesAndEdges: s.setDefaultNodesAndEdges,
	setMinZoom: s.setMinZoom,
	setMaxZoom: s.setMaxZoom,
	setTranslateExtent: s.setTranslateExtent,
	setNodeExtent: s.setNodeExtent,
	reset: s.reset
});
function useStoreUpdater(value, setStoreState) {
	(0, react.useEffect)(() => {
		if (typeof value !== "undefined") setStoreState(value);
	}, [value]);
}
function useDirectStoreUpdater(key, value, setState) {
	(0, react.useEffect)(() => {
		if (typeof value !== "undefined") setState({ [key]: value });
	}, [value]);
}
const StoreUpdater = ({ nodes, edges, defaultNodes, defaultEdges, onConnect, onConnectStart, onConnectEnd, onClickConnectStart, onClickConnectEnd, nodesDraggable, nodesConnectable, nodesFocusable, edgesFocusable, edgesUpdatable, elevateNodesOnSelect, minZoom, maxZoom, nodeExtent, onNodesChange, onEdgesChange, elementsSelectable, connectionMode, snapGrid, snapToGrid, translateExtent, connectOnClick, defaultEdgeOptions, fitView, fitViewOptions, onNodesDelete, onEdgesDelete, onNodeDrag, onNodeDragStart, onNodeDragStop, onSelectionDrag, onSelectionDragStart, onSelectionDragStop, noPanClassName, nodeOrigin, rfId, autoPanOnConnect, autoPanOnNodeDrag, onError, connectionRadius, isValidConnection, nodeDragThreshold }) => {
	const { setNodes, setEdges, setDefaultNodesAndEdges, setMinZoom, setMaxZoom, setTranslateExtent, setNodeExtent, reset } = useStore(selector$d, shallow$1);
	const store = useStoreApi();
	(0, react.useEffect)(() => {
		const edgesWithDefaults = defaultEdges?.map((e) => ({
			...e,
			...defaultEdgeOptions
		}));
		setDefaultNodesAndEdges(defaultNodes, edgesWithDefaults);
		return () => {
			reset();
		};
	}, []);
	useDirectStoreUpdater("defaultEdgeOptions", defaultEdgeOptions, store.setState);
	useDirectStoreUpdater("connectionMode", connectionMode, store.setState);
	useDirectStoreUpdater("onConnect", onConnect, store.setState);
	useDirectStoreUpdater("onConnectStart", onConnectStart, store.setState);
	useDirectStoreUpdater("onConnectEnd", onConnectEnd, store.setState);
	useDirectStoreUpdater("onClickConnectStart", onClickConnectStart, store.setState);
	useDirectStoreUpdater("onClickConnectEnd", onClickConnectEnd, store.setState);
	useDirectStoreUpdater("nodesDraggable", nodesDraggable, store.setState);
	useDirectStoreUpdater("nodesConnectable", nodesConnectable, store.setState);
	useDirectStoreUpdater("nodesFocusable", nodesFocusable, store.setState);
	useDirectStoreUpdater("edgesFocusable", edgesFocusable, store.setState);
	useDirectStoreUpdater("edgesUpdatable", edgesUpdatable, store.setState);
	useDirectStoreUpdater("elementsSelectable", elementsSelectable, store.setState);
	useDirectStoreUpdater("elevateNodesOnSelect", elevateNodesOnSelect, store.setState);
	useDirectStoreUpdater("snapToGrid", snapToGrid, store.setState);
	useDirectStoreUpdater("snapGrid", snapGrid, store.setState);
	useDirectStoreUpdater("onNodesChange", onNodesChange, store.setState);
	useDirectStoreUpdater("onEdgesChange", onEdgesChange, store.setState);
	useDirectStoreUpdater("connectOnClick", connectOnClick, store.setState);
	useDirectStoreUpdater("fitViewOnInit", fitView, store.setState);
	useDirectStoreUpdater("fitViewOnInitOptions", fitViewOptions, store.setState);
	useDirectStoreUpdater("onNodesDelete", onNodesDelete, store.setState);
	useDirectStoreUpdater("onEdgesDelete", onEdgesDelete, store.setState);
	useDirectStoreUpdater("onNodeDrag", onNodeDrag, store.setState);
	useDirectStoreUpdater("onNodeDragStart", onNodeDragStart, store.setState);
	useDirectStoreUpdater("onNodeDragStop", onNodeDragStop, store.setState);
	useDirectStoreUpdater("onSelectionDrag", onSelectionDrag, store.setState);
	useDirectStoreUpdater("onSelectionDragStart", onSelectionDragStart, store.setState);
	useDirectStoreUpdater("onSelectionDragStop", onSelectionDragStop, store.setState);
	useDirectStoreUpdater("noPanClassName", noPanClassName, store.setState);
	useDirectStoreUpdater("nodeOrigin", nodeOrigin, store.setState);
	useDirectStoreUpdater("rfId", rfId, store.setState);
	useDirectStoreUpdater("autoPanOnConnect", autoPanOnConnect, store.setState);
	useDirectStoreUpdater("autoPanOnNodeDrag", autoPanOnNodeDrag, store.setState);
	useDirectStoreUpdater("onError", onError, store.setState);
	useDirectStoreUpdater("connectionRadius", connectionRadius, store.setState);
	useDirectStoreUpdater("isValidConnection", isValidConnection, store.setState);
	useDirectStoreUpdater("nodeDragThreshold", nodeDragThreshold, store.setState);
	useStoreUpdater(nodes, setNodes);
	useStoreUpdater(edges, setEdges);
	useStoreUpdater(minZoom, setMinZoom);
	useStoreUpdater(maxZoom, setMaxZoom);
	useStoreUpdater(translateExtent, setTranslateExtent);
	useStoreUpdater(nodeExtent, setNodeExtent);
	return null;
};
const style = { display: "none" };
const ariaLiveStyle = {
	position: "absolute",
	width: 1,
	height: 1,
	margin: -1,
	border: 0,
	padding: 0,
	overflow: "hidden",
	clip: "rect(0px, 0px, 0px, 0px)",
	clipPath: "inset(100%)"
};
const ARIA_NODE_DESC_KEY = "react-flow__node-desc";
const ARIA_EDGE_DESC_KEY = "react-flow__edge-desc";
const ARIA_LIVE_MESSAGE = "react-flow__aria-live";
const selector$c = (s) => s.ariaLiveMessage;
function AriaLiveMessage({ rfId }) {
	const ariaLiveMessage = useStore(selector$c);
	return react.default.createElement("div", {
		id: `${ARIA_LIVE_MESSAGE}-${rfId}`,
		"aria-live": "assertive",
		"aria-atomic": "true",
		style: ariaLiveStyle
	}, ariaLiveMessage);
}
function A11yDescriptions({ rfId, disableKeyboardA11y }) {
	return react.default.createElement(react.default.Fragment, null, react.default.createElement("div", {
		id: `${ARIA_NODE_DESC_KEY}-${rfId}`,
		style
	}, "Press enter or space to select a node.", !disableKeyboardA11y && "You can then use the arrow keys to move the node around.", " Press delete to remove it and escape to cancel.", " "), react.default.createElement("div", {
		id: `${ARIA_EDGE_DESC_KEY}-${rfId}`,
		style
	}, "Press enter or space to select an edge. You can then press delete to remove it or escape to cancel."), !disableKeyboardA11y && react.default.createElement(AriaLiveMessage, { rfId }));
}
var useKeyPress = (keyCode = null, options = { actInsideInputWithModifier: true }) => {
	const [keyPressed, setKeyPressed] = (0, react.useState)(false);
	const modifierPressed = (0, react.useRef)(false);
	const pressedKeys = (0, react.useRef)(/* @__PURE__ */ new Set([]));
	const [keyCodes, keysToWatch] = (0, react.useMemo)(() => {
		if (keyCode !== null) {
			const keys = (Array.isArray(keyCode) ? keyCode : [keyCode]).filter((kc) => typeof kc === "string").map((kc) => kc.split("+"));
			return [keys, keys.reduce((res, item) => res.concat(...item), [])];
		}
		return [[], []];
	}, [keyCode]);
	(0, react.useEffect)(() => {
		const doc = typeof document !== "undefined" ? document : null;
		const target = options?.target || doc;
		if (keyCode !== null) {
			const downHandler = (event) => {
				modifierPressed.current = event.ctrlKey || event.metaKey || event.shiftKey;
				if ((!modifierPressed.current || modifierPressed.current && !options.actInsideInputWithModifier) && isInputDOMNode(event)) return false;
				const keyOrCode = useKeyOrCode(event.code, keysToWatch);
				pressedKeys.current.add(event[keyOrCode]);
				if (isMatchingKey(keyCodes, pressedKeys.current, false)) {
					event.preventDefault();
					setKeyPressed(true);
				}
			};
			const upHandler = (event) => {
				if ((!modifierPressed.current || modifierPressed.current && !options.actInsideInputWithModifier) && isInputDOMNode(event)) return false;
				const keyOrCode = useKeyOrCode(event.code, keysToWatch);
				if (isMatchingKey(keyCodes, pressedKeys.current, true)) {
					setKeyPressed(false);
					pressedKeys.current.clear();
				} else pressedKeys.current.delete(event[keyOrCode]);
				if (event.key === "Meta") pressedKeys.current.clear();
				modifierPressed.current = false;
			};
			const resetHandler = () => {
				pressedKeys.current.clear();
				setKeyPressed(false);
			};
			target?.addEventListener("keydown", downHandler);
			target?.addEventListener("keyup", upHandler);
			window.addEventListener("blur", resetHandler);
			return () => {
				target?.removeEventListener("keydown", downHandler);
				target?.removeEventListener("keyup", upHandler);
				window.removeEventListener("blur", resetHandler);
			};
		}
	}, [keyCode, setKeyPressed]);
	return keyPressed;
};
function isMatchingKey(keyCodes, pressedKeys, isUp) {
	return keyCodes.filter((keys) => isUp || keys.length === pressedKeys.size).some((keys) => keys.every((k) => pressedKeys.has(k)));
}
function useKeyOrCode(eventCode, keysToWatch) {
	return keysToWatch.includes(eventCode) ? "code" : "key";
}
function calculateXYZPosition(node, nodeInternals, result, nodeOrigin) {
	const parentId = node.parentNode || node.parentId;
	if (!parentId) return result;
	const parentNode = nodeInternals.get(parentId);
	const parentNodePosition = getNodePositionWithOrigin(parentNode, nodeOrigin);
	return calculateXYZPosition(parentNode, nodeInternals, {
		x: (result.x ?? 0) + parentNodePosition.x,
		y: (result.y ?? 0) + parentNodePosition.y,
		z: (parentNode[internalsSymbol]?.z ?? 0) > (result.z ?? 0) ? parentNode[internalsSymbol]?.z ?? 0 : result.z ?? 0
	}, nodeOrigin);
}
function updateAbsoluteNodePositions(nodeInternals, nodeOrigin, parentNodes) {
	nodeInternals.forEach((node) => {
		const parentId = node.parentNode || node.parentId;
		if (parentId && !nodeInternals.has(parentId)) throw new Error(`Parent node ${parentId} not found`);
		if (parentId || parentNodes?.[node.id]) {
			const { x, y, z } = calculateXYZPosition(node, nodeInternals, {
				...node.position,
				z: node[internalsSymbol]?.z ?? 0
			}, nodeOrigin);
			node.positionAbsolute = {
				x,
				y
			};
			node[internalsSymbol].z = z;
			if (parentNodes?.[node.id]) node[internalsSymbol].isParent = true;
		}
	});
}
function createNodeInternals(nodes, nodeInternals, nodeOrigin, elevateNodesOnSelect) {
	const nextNodeInternals = /* @__PURE__ */ new Map();
	const parentNodes = {};
	const selectedNodeZ = elevateNodesOnSelect ? 1e3 : 0;
	nodes.forEach((node) => {
		const z = (isNumeric(node.zIndex) ? node.zIndex : 0) + (node.selected ? selectedNodeZ : 0);
		const currInternals = nodeInternals.get(node.id);
		const internals = {
			...node,
			positionAbsolute: {
				x: node.position.x,
				y: node.position.y
			}
		};
		const parentId = node.parentNode || node.parentId;
		if (parentId) parentNodes[parentId] = true;
		const resetHandleBounds = currInternals?.type && currInternals?.type !== node.type;
		Object.defineProperty(internals, internalsSymbol, {
			enumerable: false,
			value: {
				handleBounds: resetHandleBounds ? void 0 : currInternals?.[internalsSymbol]?.handleBounds,
				z
			}
		});
		nextNodeInternals.set(node.id, internals);
	});
	updateAbsoluteNodePositions(nextNodeInternals, nodeOrigin, parentNodes);
	return nextNodeInternals;
}
function fitView(get, options = {}) {
	const { getNodes, width, height, minZoom, maxZoom, d3Zoom, d3Selection, fitViewOnInitDone, fitViewOnInit, nodeOrigin } = get();
	const isInitialFitView = options.initial && !fitViewOnInitDone && fitViewOnInit;
	if (d3Zoom && d3Selection && (isInitialFitView || !options.initial)) {
		const nodes = getNodes().filter((n) => {
			const isVisible = options.includeHiddenNodes ? n.width && n.height : !n.hidden;
			if (options.nodes?.length) return isVisible && options.nodes.some((optionNode) => optionNode.id === n.id);
			return isVisible;
		});
		const nodesInitialized = nodes.every((n) => n.width && n.height);
		if (nodes.length > 0 && nodesInitialized) {
			const bounds = getNodesBounds(nodes, nodeOrigin);
			const { x, y, zoom } = getViewportForBounds(bounds, width, height, options.minZoom ?? minZoom, options.maxZoom ?? maxZoom, options.padding ?? .1);
			const nextTransform = identity.translate(x, y).scale(zoom);
			if (typeof options.duration === "number" && options.duration > 0) d3Zoom.transform(getD3Transition(d3Selection, options.duration), nextTransform);
			else d3Zoom.transform(d3Selection, nextTransform);
			return true;
		}
	}
	return false;
}
function handleControlledNodeSelectionChange(nodeChanges, nodeInternals) {
	nodeChanges.forEach((change) => {
		const node = nodeInternals.get(change.id);
		if (node) nodeInternals.set(node.id, {
			...node,
			[internalsSymbol]: node[internalsSymbol],
			selected: change.selected
		});
	});
	return new Map(nodeInternals);
}
function handleControlledEdgeSelectionChange(edgeChanges, edges) {
	return edges.map((e) => {
		const change = edgeChanges.find((change) => change.id === e.id);
		if (change) e.selected = change.selected;
		return e;
	});
}
function updateNodesAndEdgesSelections({ changedNodes, changedEdges, get, set }) {
	const { nodeInternals, edges, onNodesChange, onEdgesChange, hasDefaultNodes, hasDefaultEdges } = get();
	if (changedNodes?.length) {
		if (hasDefaultNodes) set({ nodeInternals: handleControlledNodeSelectionChange(changedNodes, nodeInternals) });
		onNodesChange?.(changedNodes);
	}
	if (changedEdges?.length) {
		if (hasDefaultEdges) set({ edges: handleControlledEdgeSelectionChange(changedEdges, edges) });
		onEdgesChange?.(changedEdges);
	}
}
const noop = () => {};
const initialViewportHelper = {
	zoomIn: noop,
	zoomOut: noop,
	zoomTo: noop,
	getZoom: () => 1,
	setViewport: noop,
	getViewport: () => ({
		x: 0,
		y: 0,
		zoom: 1
	}),
	fitView: () => false,
	setCenter: noop,
	fitBounds: noop,
	project: (position) => position,
	screenToFlowPosition: (position) => position,
	flowToScreenPosition: (position) => position,
	viewportInitialized: false
};
const selector$b = (s) => ({
	d3Zoom: s.d3Zoom,
	d3Selection: s.d3Selection
});
const useViewportHelper = () => {
	const store = useStoreApi();
	const { d3Zoom, d3Selection } = useStore(selector$b, shallow$1);
	return (0, react.useMemo)(() => {
		if (d3Selection && d3Zoom) return {
			zoomIn: (options) => d3Zoom.scaleBy(getD3Transition(d3Selection, options?.duration), 1.2),
			zoomOut: (options) => d3Zoom.scaleBy(getD3Transition(d3Selection, options?.duration), 1 / 1.2),
			zoomTo: (zoomLevel, options) => d3Zoom.scaleTo(getD3Transition(d3Selection, options?.duration), zoomLevel),
			getZoom: () => store.getState().transform[2],
			setViewport: (transform, options) => {
				const [x, y, zoom] = store.getState().transform;
				const nextTransform = identity.translate(transform.x ?? x, transform.y ?? y).scale(transform.zoom ?? zoom);
				d3Zoom.transform(getD3Transition(d3Selection, options?.duration), nextTransform);
			},
			getViewport: () => {
				const [x, y, zoom] = store.getState().transform;
				return {
					x,
					y,
					zoom
				};
			},
			fitView: (options) => fitView(store.getState, options),
			setCenter: (x, y, options) => {
				const { width, height, maxZoom } = store.getState();
				const nextZoom = typeof options?.zoom !== "undefined" ? options.zoom : maxZoom;
				const centerX = width / 2 - x * nextZoom;
				const centerY = height / 2 - y * nextZoom;
				const transform = identity.translate(centerX, centerY).scale(nextZoom);
				d3Zoom.transform(getD3Transition(d3Selection, options?.duration), transform);
			},
			fitBounds: (bounds, options) => {
				const { width, height, minZoom, maxZoom } = store.getState();
				const { x, y, zoom } = getViewportForBounds(bounds, width, height, minZoom, maxZoom, options?.padding ?? .1);
				const transform = identity.translate(x, y).scale(zoom);
				d3Zoom.transform(getD3Transition(d3Selection, options?.duration), transform);
			},
			project: (position) => {
				const { transform, snapToGrid, snapGrid } = store.getState();
				console.warn("[DEPRECATED] `project` is deprecated. Instead use `screenToFlowPosition`. There is no need to subtract the react flow bounds anymore! https://reactflow.dev/api-reference/types/react-flow-instance#screen-to-flow-position");
				return pointToRendererPoint(position, transform, snapToGrid, snapGrid);
			},
			screenToFlowPosition: (position) => {
				const { transform, snapToGrid, snapGrid, domNode } = store.getState();
				if (!domNode) return position;
				const { x: domX, y: domY } = domNode.getBoundingClientRect();
				const relativePosition = {
					x: position.x - domX,
					y: position.y - domY
				};
				return pointToRendererPoint(relativePosition, transform, snapToGrid, snapGrid);
			},
			flowToScreenPosition: (position) => {
				const { transform, domNode } = store.getState();
				if (!domNode) return position;
				const { x: domX, y: domY } = domNode.getBoundingClientRect();
				const rendererPosition = rendererPointToPoint(position, transform);
				return {
					x: rendererPosition.x + domX,
					y: rendererPosition.y + domY
				};
			},
			viewportInitialized: true
		};
		return initialViewportHelper;
	}, [d3Zoom, d3Selection]);
};
function useReactFlow() {
	const viewportHelper = useViewportHelper();
	const store = useStoreApi();
	const getNodes = (0, react.useCallback)(() => {
		return store.getState().getNodes().map((n) => ({ ...n }));
	}, []);
	const getNode = (0, react.useCallback)((id) => {
		return store.getState().nodeInternals.get(id);
	}, []);
	const getEdges = (0, react.useCallback)(() => {
		const { edges = [] } = store.getState();
		return edges.map((e) => ({ ...e }));
	}, []);
	const getEdge = (0, react.useCallback)((id) => {
		const { edges = [] } = store.getState();
		return edges.find((e) => e.id === id);
	}, []);
	const setNodes = (0, react.useCallback)((payload) => {
		const { getNodes, setNodes, hasDefaultNodes, onNodesChange } = store.getState();
		const nodes = getNodes();
		const nextNodes = typeof payload === "function" ? payload(nodes) : payload;
		if (hasDefaultNodes) setNodes(nextNodes);
		else if (onNodesChange) onNodesChange(nextNodes.length === 0 ? nodes.map((node) => ({
			type: "remove",
			id: node.id
		})) : nextNodes.map((node) => ({
			item: node,
			type: "reset"
		})));
	}, []);
	const setEdges = (0, react.useCallback)((payload) => {
		const { edges = [], setEdges, hasDefaultEdges, onEdgesChange } = store.getState();
		const nextEdges = typeof payload === "function" ? payload(edges) : payload;
		if (hasDefaultEdges) setEdges(nextEdges);
		else if (onEdgesChange) onEdgesChange(nextEdges.length === 0 ? edges.map((edge) => ({
			type: "remove",
			id: edge.id
		})) : nextEdges.map((edge) => ({
			item: edge,
			type: "reset"
		})));
	}, []);
	const addNodes = (0, react.useCallback)((payload) => {
		const nodes = Array.isArray(payload) ? payload : [payload];
		const { getNodes, setNodes, hasDefaultNodes, onNodesChange } = store.getState();
		if (hasDefaultNodes) setNodes([...getNodes(), ...nodes]);
		else if (onNodesChange) onNodesChange(nodes.map((node) => ({
			item: node,
			type: "add"
		})));
	}, []);
	const addEdges = (0, react.useCallback)((payload) => {
		const nextEdges = Array.isArray(payload) ? payload : [payload];
		const { edges = [], setEdges, hasDefaultEdges, onEdgesChange } = store.getState();
		if (hasDefaultEdges) setEdges([...edges, ...nextEdges]);
		else if (onEdgesChange) onEdgesChange(nextEdges.map((edge) => ({
			item: edge,
			type: "add"
		})));
	}, []);
	const toObject = (0, react.useCallback)(() => {
		const { getNodes, edges = [], transform } = store.getState();
		const [x, y, zoom] = transform;
		return {
			nodes: getNodes().map((n) => ({ ...n })),
			edges: edges.map((e) => ({ ...e })),
			viewport: {
				x,
				y,
				zoom
			}
		};
	}, []);
	const deleteElements = (0, react.useCallback)(({ nodes: nodesDeleted, edges: edgesDeleted }) => {
		const { nodeInternals, getNodes, edges, hasDefaultNodes, hasDefaultEdges, onNodesDelete, onEdgesDelete, onNodesChange, onEdgesChange } = store.getState();
		const nodeIds = (nodesDeleted || []).map((node) => node.id);
		const edgeIds = (edgesDeleted || []).map((edge) => edge.id);
		const nodesToRemove = getNodes().reduce((res, node) => {
			const parentId = node.parentNode || node.parentId;
			const parentHit = !nodeIds.includes(node.id) && parentId && res.find((n) => n.id === parentId);
			if ((typeof node.deletable === "boolean" ? node.deletable : true) && (nodeIds.includes(node.id) || parentHit)) res.push(node);
			return res;
		}, []);
		const deletableEdges = edges.filter((e) => typeof e.deletable === "boolean" ? e.deletable : true);
		const initialHitEdges = deletableEdges.filter((e) => edgeIds.includes(e.id));
		if (nodesToRemove || initialHitEdges) {
			const connectedEdges = getConnectedEdges(nodesToRemove, deletableEdges);
			const edgesToRemove = [...initialHitEdges, ...connectedEdges];
			const edgeIdsToRemove = edgesToRemove.reduce((res, edge) => {
				if (!res.includes(edge.id)) res.push(edge.id);
				return res;
			}, []);
			if (hasDefaultEdges || hasDefaultNodes) {
				if (hasDefaultEdges) store.setState({ edges: edges.filter((e) => !edgeIdsToRemove.includes(e.id)) });
				if (hasDefaultNodes) {
					nodesToRemove.forEach((node) => {
						nodeInternals.delete(node.id);
					});
					store.setState({ nodeInternals: new Map(nodeInternals) });
				}
			}
			if (edgeIdsToRemove.length > 0) {
				onEdgesDelete?.(edgesToRemove);
				if (onEdgesChange) onEdgesChange(edgeIdsToRemove.map((id) => ({
					id,
					type: "remove"
				})));
			}
			if (nodesToRemove.length > 0) {
				onNodesDelete?.(nodesToRemove);
				if (onNodesChange) onNodesChange(nodesToRemove.map((n) => ({
					id: n.id,
					type: "remove"
				})));
			}
		}
	}, []);
	const getNodeRect = (0, react.useCallback)((nodeOrRect) => {
		const isRect = isRectObject(nodeOrRect);
		const node = isRect ? null : store.getState().nodeInternals.get(nodeOrRect.id);
		if (!isRect && !node) return [
			null,
			null,
			isRect
		];
		return [
			isRect ? nodeOrRect : nodeToRect(node),
			node,
			isRect
		];
	}, []);
	const getIntersectingNodes = (0, react.useCallback)((nodeOrRect, partially = true, nodes) => {
		const [nodeRect, node, isRect] = getNodeRect(nodeOrRect);
		if (!nodeRect) return [];
		return (nodes || store.getState().getNodes()).filter((n) => {
			if (!isRect && (n.id === node.id || !n.positionAbsolute)) return false;
			const currNodeRect = nodeToRect(n);
			const overlappingArea = getOverlappingArea(currNodeRect, nodeRect);
			return partially && overlappingArea > 0 || overlappingArea >= nodeRect.width * nodeRect.height;
		});
	}, []);
	const isNodeIntersecting = (0, react.useCallback)((nodeOrRect, area, partially = true) => {
		const [nodeRect] = getNodeRect(nodeOrRect);
		if (!nodeRect) return false;
		const overlappingArea = getOverlappingArea(nodeRect, area);
		return partially && overlappingArea > 0 || overlappingArea >= nodeRect.width * nodeRect.height;
	}, []);
	return (0, react.useMemo)(() => {
		return {
			...viewportHelper,
			getNodes,
			getNode,
			getEdges,
			getEdge,
			setNodes,
			setEdges,
			addNodes,
			addEdges,
			toObject,
			deleteElements,
			getIntersectingNodes,
			isNodeIntersecting
		};
	}, [
		viewportHelper,
		getNodes,
		getNode,
		getEdges,
		getEdge,
		setNodes,
		setEdges,
		addNodes,
		addEdges,
		toObject,
		deleteElements,
		getIntersectingNodes,
		isNodeIntersecting
	]);
}
const deleteKeyOptions = { actInsideInputWithModifier: false };
var useGlobalKeyHandler = ({ deleteKeyCode, multiSelectionKeyCode }) => {
	const store = useStoreApi();
	const { deleteElements } = useReactFlow();
	const deleteKeyPressed = useKeyPress(deleteKeyCode, deleteKeyOptions);
	const multiSelectionKeyPressed = useKeyPress(multiSelectionKeyCode);
	(0, react.useEffect)(() => {
		if (deleteKeyPressed) {
			const { edges, getNodes } = store.getState();
			const selectedNodes = getNodes().filter((node) => node.selected);
			const selectedEdges = edges.filter((edge) => edge.selected);
			deleteElements({
				nodes: selectedNodes,
				edges: selectedEdges
			});
			store.setState({ nodesSelectionActive: false });
		}
	}, [deleteKeyPressed]);
	(0, react.useEffect)(() => {
		store.setState({ multiSelectionActive: multiSelectionKeyPressed });
	}, [multiSelectionKeyPressed]);
};
function useResizeHandler(rendererNode) {
	const store = useStoreApi();
	(0, react.useEffect)(() => {
		let resizeObserver;
		const updateDimensions = () => {
			if (!rendererNode.current) return;
			const size = getDimensions(rendererNode.current);
			if (size.height === 0 || size.width === 0) store.getState().onError?.("004", errorMessages["error004"]());
			store.setState({
				width: size.width || 500,
				height: size.height || 500
			});
		};
		updateDimensions();
		window.addEventListener("resize", updateDimensions);
		if (rendererNode.current) {
			resizeObserver = new ResizeObserver(() => updateDimensions());
			resizeObserver.observe(rendererNode.current);
		}
		return () => {
			window.removeEventListener("resize", updateDimensions);
			if (resizeObserver && rendererNode.current) resizeObserver.unobserve(rendererNode.current);
		};
	}, []);
}
const containerStyle = {
	position: "absolute",
	width: "100%",
	height: "100%",
	top: 0,
	left: 0
};
const viewChanged = (prevViewport, eventTransform) => prevViewport.x !== eventTransform.x || prevViewport.y !== eventTransform.y || prevViewport.zoom !== eventTransform.k;
const eventToFlowTransform = (eventTransform) => ({
	x: eventTransform.x,
	y: eventTransform.y,
	zoom: eventTransform.k
});
const isWrappedWithClass = (event, className) => event.target.closest(`.${className}`);
const isRightClickPan = (panOnDrag, usedButton) => usedButton === 2 && Array.isArray(panOnDrag) && panOnDrag.includes(2);
const wheelDelta = (event) => {
	const factor = event.ctrlKey && isMacOs() ? 10 : 1;
	return -event.deltaY * (event.deltaMode === 1 ? .05 : event.deltaMode ? 1 : .002) * factor;
};
const selector$a = (s) => ({
	d3Zoom: s.d3Zoom,
	d3Selection: s.d3Selection,
	d3ZoomHandler: s.d3ZoomHandler,
	userSelectionActive: s.userSelectionActive
});
const ZoomPane = ({ onMove, onMoveStart, onMoveEnd, onPaneContextMenu, zoomOnScroll = true, zoomOnPinch = true, panOnScroll = false, panOnScrollSpeed = .5, panOnScrollMode = PanOnScrollMode.Free, zoomOnDoubleClick = true, elementsSelectable, panOnDrag = true, defaultViewport, translateExtent, minZoom, maxZoom, zoomActivationKeyCode, preventScrolling = true, children, noWheelClassName, noPanClassName }) => {
	const timerId = (0, react.useRef)();
	const store = useStoreApi();
	const isZoomingOrPanning = (0, react.useRef)(false);
	const zoomedWithRightMouseButton = (0, react.useRef)(false);
	const zoomPane = (0, react.useRef)(null);
	const prevTransform = (0, react.useRef)({
		x: 0,
		y: 0,
		zoom: 0
	});
	const { d3Zoom, d3Selection, d3ZoomHandler, userSelectionActive } = useStore(selector$a, shallow$1);
	const zoomActivationKeyPressed = useKeyPress(zoomActivationKeyCode);
	const mouseButton = (0, react.useRef)(0);
	const isPanScrolling = (0, react.useRef)(false);
	const panScrollTimeout = (0, react.useRef)();
	useResizeHandler(zoomPane);
	(0, react.useEffect)(() => {
		if (zoomPane.current) {
			const bbox = zoomPane.current.getBoundingClientRect();
			const d3ZoomInstance = zoom_default().scaleExtent([minZoom, maxZoom]).translateExtent(translateExtent);
			const selection = select_default$1(zoomPane.current).call(d3ZoomInstance);
			const updatedTransform = identity.translate(defaultViewport.x, defaultViewport.y).scale(clamp(defaultViewport.zoom, minZoom, maxZoom));
			const extent = [[0, 0], [bbox.width, bbox.height]];
			const constrainedTransform = d3ZoomInstance.constrain()(updatedTransform, extent, translateExtent);
			d3ZoomInstance.transform(selection, constrainedTransform);
			d3ZoomInstance.wheelDelta(wheelDelta);
			store.setState({
				d3Zoom: d3ZoomInstance,
				d3Selection: selection,
				d3ZoomHandler: selection.on("wheel.zoom"),
				transform: [
					constrainedTransform.x,
					constrainedTransform.y,
					constrainedTransform.k
				],
				domNode: zoomPane.current.closest(".react-flow")
			});
		}
	}, []);
	(0, react.useEffect)(() => {
		if (d3Selection && d3Zoom) {
			if (panOnScroll && !zoomActivationKeyPressed && !userSelectionActive) d3Selection.on("wheel.zoom", (event) => {
				if (isWrappedWithClass(event, noWheelClassName)) return false;
				event.preventDefault();
				event.stopImmediatePropagation();
				const currentZoom = d3Selection.property("__zoom").k || 1;
				if (event.ctrlKey && zoomOnPinch) {
					const point = pointer_default(event);
					const pinchDelta = wheelDelta(event);
					const zoom = currentZoom * Math.pow(2, pinchDelta);
					d3Zoom.scaleTo(d3Selection, zoom, point, event);
					return;
				}
				const deltaNormalize = event.deltaMode === 1 ? 20 : 1;
				let deltaX = panOnScrollMode === PanOnScrollMode.Vertical ? 0 : event.deltaX * deltaNormalize;
				let deltaY = panOnScrollMode === PanOnScrollMode.Horizontal ? 0 : event.deltaY * deltaNormalize;
				if (!isMacOs() && event.shiftKey && panOnScrollMode !== PanOnScrollMode.Vertical) {
					deltaX = event.deltaY * deltaNormalize;
					deltaY = 0;
				}
				d3Zoom.translateBy(d3Selection, -(deltaX / currentZoom) * panOnScrollSpeed, -(deltaY / currentZoom) * panOnScrollSpeed, { internal: true });
				const nextViewport = eventToFlowTransform(d3Selection.property("__zoom"));
				const { onViewportChangeStart, onViewportChange, onViewportChangeEnd } = store.getState();
				clearTimeout(panScrollTimeout.current);
				if (!isPanScrolling.current) {
					isPanScrolling.current = true;
					onMoveStart?.(event, nextViewport);
					onViewportChangeStart?.(nextViewport);
				}
				if (isPanScrolling.current) {
					onMove?.(event, nextViewport);
					onViewportChange?.(nextViewport);
					panScrollTimeout.current = setTimeout(() => {
						onMoveEnd?.(event, nextViewport);
						onViewportChangeEnd?.(nextViewport);
						isPanScrolling.current = false;
					}, 150);
				}
			}, { passive: false });
			else if (typeof d3ZoomHandler !== "undefined") d3Selection.on("wheel.zoom", function(event, d) {
				if (!preventScrolling && event.type === "wheel" && !event.ctrlKey || isWrappedWithClass(event, noWheelClassName)) return null;
				event.preventDefault();
				d3ZoomHandler.call(this, event, d);
			}, { passive: false });
		}
	}, [
		userSelectionActive,
		panOnScroll,
		panOnScrollMode,
		d3Selection,
		d3Zoom,
		d3ZoomHandler,
		zoomActivationKeyPressed,
		zoomOnPinch,
		preventScrolling,
		noWheelClassName,
		onMoveStart,
		onMove,
		onMoveEnd
	]);
	(0, react.useEffect)(() => {
		if (d3Zoom) d3Zoom.on("start", (event) => {
			if (!event.sourceEvent || event.sourceEvent.internal) return null;
			mouseButton.current = event.sourceEvent?.button;
			const { onViewportChangeStart } = store.getState();
			const flowTransform = eventToFlowTransform(event.transform);
			isZoomingOrPanning.current = true;
			prevTransform.current = flowTransform;
			if (event.sourceEvent?.type === "mousedown") store.setState({ paneDragging: true });
			onViewportChangeStart?.(flowTransform);
			onMoveStart?.(event.sourceEvent, flowTransform);
		});
	}, [d3Zoom, onMoveStart]);
	(0, react.useEffect)(() => {
		if (d3Zoom) {
			if (userSelectionActive && !isZoomingOrPanning.current) d3Zoom.on("zoom", null);
			else if (!userSelectionActive) d3Zoom.on("zoom", (event) => {
				const { onViewportChange } = store.getState();
				store.setState({ transform: [
					event.transform.x,
					event.transform.y,
					event.transform.k
				] });
				zoomedWithRightMouseButton.current = !!(onPaneContextMenu && isRightClickPan(panOnDrag, mouseButton.current ?? 0));
				if ((onMove || onViewportChange) && !event.sourceEvent?.internal) {
					const flowTransform = eventToFlowTransform(event.transform);
					onViewportChange?.(flowTransform);
					onMove?.(event.sourceEvent, flowTransform);
				}
			});
		}
	}, [
		userSelectionActive,
		d3Zoom,
		onMove,
		panOnDrag,
		onPaneContextMenu
	]);
	(0, react.useEffect)(() => {
		if (d3Zoom) d3Zoom.on("end", (event) => {
			if (!event.sourceEvent || event.sourceEvent.internal) return null;
			const { onViewportChangeEnd } = store.getState();
			isZoomingOrPanning.current = false;
			store.setState({ paneDragging: false });
			if (onPaneContextMenu && isRightClickPan(panOnDrag, mouseButton.current ?? 0) && !zoomedWithRightMouseButton.current) onPaneContextMenu(event.sourceEvent);
			zoomedWithRightMouseButton.current = false;
			if ((onMoveEnd || onViewportChangeEnd) && viewChanged(prevTransform.current, event.transform)) {
				const flowTransform = eventToFlowTransform(event.transform);
				prevTransform.current = flowTransform;
				clearTimeout(timerId.current);
				timerId.current = setTimeout(() => {
					onViewportChangeEnd?.(flowTransform);
					onMoveEnd?.(event.sourceEvent, flowTransform);
				}, panOnScroll ? 150 : 0);
			}
		});
	}, [
		d3Zoom,
		panOnScroll,
		panOnDrag,
		onMoveEnd,
		onPaneContextMenu
	]);
	(0, react.useEffect)(() => {
		if (d3Zoom) d3Zoom.filter((event) => {
			const zoomScroll = zoomActivationKeyPressed || zoomOnScroll;
			const pinchZoom = zoomOnPinch && event.ctrlKey;
			if ((panOnDrag === true || Array.isArray(panOnDrag) && panOnDrag.includes(1)) && event.button === 1 && event.type === "mousedown" && (isWrappedWithClass(event, "react-flow__node") || isWrappedWithClass(event, "react-flow__edge"))) return true;
			if (!panOnDrag && !zoomScroll && !panOnScroll && !zoomOnDoubleClick && !zoomOnPinch) return false;
			if (userSelectionActive) return false;
			if (!zoomOnDoubleClick && event.type === "dblclick") return false;
			if (isWrappedWithClass(event, noWheelClassName) && event.type === "wheel") return false;
			if (isWrappedWithClass(event, noPanClassName) && (event.type !== "wheel" || panOnScroll && event.type === "wheel" && !zoomActivationKeyPressed)) return false;
			if (!zoomOnPinch && event.ctrlKey && event.type === "wheel") return false;
			if (!zoomScroll && !panOnScroll && !pinchZoom && event.type === "wheel") return false;
			if (!panOnDrag && (event.type === "mousedown" || event.type === "touchstart")) return false;
			if (Array.isArray(panOnDrag) && !panOnDrag.includes(event.button) && event.type === "mousedown") return false;
			const buttonAllowed = Array.isArray(panOnDrag) && panOnDrag.includes(event.button) || !event.button || event.button <= 1;
			return (!event.ctrlKey || event.type === "wheel") && buttonAllowed;
		});
	}, [
		userSelectionActive,
		d3Zoom,
		zoomOnScroll,
		zoomOnPinch,
		panOnScroll,
		zoomOnDoubleClick,
		panOnDrag,
		elementsSelectable,
		zoomActivationKeyPressed
	]);
	return react.default.createElement("div", {
		className: "react-flow__renderer",
		ref: zoomPane,
		style: containerStyle
	}, children);
};
const selector$9 = (s) => ({
	userSelectionActive: s.userSelectionActive,
	userSelectionRect: s.userSelectionRect
});
function UserSelection() {
	const { userSelectionActive, userSelectionRect } = useStore(selector$9, shallow$1);
	if (!(userSelectionActive && userSelectionRect)) return null;
	return react.default.createElement("div", {
		className: "react-flow__selection react-flow__container",
		style: {
			width: userSelectionRect.width,
			height: userSelectionRect.height,
			transform: `translate(${userSelectionRect.x}px, ${userSelectionRect.y}px)`
		}
	});
}
function handleParentExpand(res, updateItem) {
	const parentId = updateItem.parentNode || updateItem.parentId;
	const parent = res.find((e) => e.id === parentId);
	if (parent) {
		const extendWidth = updateItem.position.x + updateItem.width - parent.width;
		const extendHeight = updateItem.position.y + updateItem.height - parent.height;
		if (extendWidth > 0 || extendHeight > 0 || updateItem.position.x < 0 || updateItem.position.y < 0) {
			parent.style = { ...parent.style };
			parent.style.width = parent.style.width ?? parent.width;
			parent.style.height = parent.style.height ?? parent.height;
			if (extendWidth > 0) parent.style.width += extendWidth;
			if (extendHeight > 0) parent.style.height += extendHeight;
			if (updateItem.position.x < 0) {
				const xDiff = Math.abs(updateItem.position.x);
				parent.position.x = parent.position.x - xDiff;
				parent.style.width += xDiff;
				updateItem.position.x = 0;
			}
			if (updateItem.position.y < 0) {
				const yDiff = Math.abs(updateItem.position.y);
				parent.position.y = parent.position.y - yDiff;
				parent.style.height += yDiff;
				updateItem.position.y = 0;
			}
			parent.width = parent.style.width;
			parent.height = parent.style.height;
		}
	}
}
function applyChanges(changes, elements) {
	if (changes.some((c) => c.type === "reset")) return changes.filter((c) => c.type === "reset").map((c) => c.item);
	const initElements = changes.filter((c) => c.type === "add").map((c) => c.item);
	return elements.reduce((res, item) => {
		const currentChanges = changes.filter((c) => c.id === item.id);
		if (currentChanges.length === 0) {
			res.push(item);
			return res;
		}
		const updateItem = { ...item };
		for (const currentChange of currentChanges) if (currentChange) switch (currentChange.type) {
			case "select":
				updateItem.selected = currentChange.selected;
				break;
			case "position":
				if (typeof currentChange.position !== "undefined") updateItem.position = currentChange.position;
				if (typeof currentChange.positionAbsolute !== "undefined") updateItem.positionAbsolute = currentChange.positionAbsolute;
				if (typeof currentChange.dragging !== "undefined") updateItem.dragging = currentChange.dragging;
				if (updateItem.expandParent) handleParentExpand(res, updateItem);
				break;
			case "dimensions":
				if (typeof currentChange.dimensions !== "undefined") {
					updateItem.width = currentChange.dimensions.width;
					updateItem.height = currentChange.dimensions.height;
				}
				if (typeof currentChange.updateStyle !== "undefined") updateItem.style = {
					...updateItem.style || {},
					...currentChange.dimensions
				};
				if (typeof currentChange.resizing === "boolean") updateItem.resizing = currentChange.resizing;
				if (updateItem.expandParent) handleParentExpand(res, updateItem);
				break;
			case "remove": return res;
		}
		res.push(updateItem);
		return res;
	}, initElements);
}
function applyNodeChanges(changes, nodes) {
	return applyChanges(changes, nodes);
}
const createSelectionChange = (id, selected) => ({
	id,
	type: "select",
	selected
});
function getSelectionChanges(items, selectedIds) {
	return items.reduce((res, item) => {
		const willBeSelected = selectedIds.includes(item.id);
		if (!item.selected && willBeSelected) {
			item.selected = true;
			res.push(createSelectionChange(item.id, true));
		} else if (item.selected && !willBeSelected) {
			item.selected = false;
			res.push(createSelectionChange(item.id, false));
		}
		return res;
	}, []);
}
/**
* The user selection rectangle gets displayed when a user drags the mouse while pressing shift
*/
const wrapHandler = (handler, containerRef) => {
	return (event) => {
		if (event.target !== containerRef.current) return;
		handler?.(event);
	};
};
const selector$8 = (s) => ({
	userSelectionActive: s.userSelectionActive,
	elementsSelectable: s.elementsSelectable,
	dragging: s.paneDragging
});
const Pane = (0, react.memo)(({ isSelecting, selectionMode = SelectionMode.Full, panOnDrag, onSelectionStart, onSelectionEnd, onPaneClick, onPaneContextMenu, onPaneScroll, onPaneMouseEnter, onPaneMouseMove, onPaneMouseLeave, children }) => {
	const container = (0, react.useRef)(null);
	const store = useStoreApi();
	const prevSelectedNodesCount = (0, react.useRef)(0);
	const prevSelectedEdgesCount = (0, react.useRef)(0);
	const containerBounds = (0, react.useRef)();
	const { userSelectionActive, elementsSelectable, dragging } = useStore(selector$8, shallow$1);
	const resetUserSelection = () => {
		store.setState({
			userSelectionActive: false,
			userSelectionRect: null
		});
		prevSelectedNodesCount.current = 0;
		prevSelectedEdgesCount.current = 0;
	};
	const onClick = (event) => {
		onPaneClick?.(event);
		store.getState().resetSelectedElements();
		store.setState({ nodesSelectionActive: false });
	};
	const onContextMenu = (event) => {
		if (Array.isArray(panOnDrag) && panOnDrag?.includes(2)) {
			event.preventDefault();
			return;
		}
		onPaneContextMenu?.(event);
	};
	const onWheel = onPaneScroll ? (event) => onPaneScroll(event) : void 0;
	const onMouseDown = (event) => {
		const { resetSelectedElements, domNode } = store.getState();
		containerBounds.current = domNode?.getBoundingClientRect();
		if (!elementsSelectable || !isSelecting || event.button !== 0 || event.target !== container.current || !containerBounds.current) return;
		const { x, y } = getEventPosition(event, containerBounds.current);
		resetSelectedElements();
		store.setState({ userSelectionRect: {
			width: 0,
			height: 0,
			startX: x,
			startY: y,
			x,
			y
		} });
		onSelectionStart?.(event);
	};
	const onMouseMove = (event) => {
		const { userSelectionRect, nodeInternals, edges, transform, onNodesChange, onEdgesChange, nodeOrigin, getNodes } = store.getState();
		if (!isSelecting || !containerBounds.current || !userSelectionRect) return;
		store.setState({
			userSelectionActive: true,
			nodesSelectionActive: false
		});
		const mousePos = getEventPosition(event, containerBounds.current);
		const startX = userSelectionRect.startX ?? 0;
		const startY = userSelectionRect.startY ?? 0;
		const nextUserSelectRect = {
			...userSelectionRect,
			x: mousePos.x < startX ? mousePos.x : startX,
			y: mousePos.y < startY ? mousePos.y : startY,
			width: Math.abs(mousePos.x - startX),
			height: Math.abs(mousePos.y - startY)
		};
		const nodes = getNodes();
		const selectedNodes = getNodesInside(nodeInternals, nextUserSelectRect, transform, selectionMode === SelectionMode.Partial, true, nodeOrigin);
		const selectedEdgeIds = getConnectedEdges(selectedNodes, edges).map((e) => e.id);
		const selectedNodeIds = selectedNodes.map((n) => n.id);
		if (prevSelectedNodesCount.current !== selectedNodeIds.length) {
			prevSelectedNodesCount.current = selectedNodeIds.length;
			const changes = getSelectionChanges(nodes, selectedNodeIds);
			if (changes.length) onNodesChange?.(changes);
		}
		if (prevSelectedEdgesCount.current !== selectedEdgeIds.length) {
			prevSelectedEdgesCount.current = selectedEdgeIds.length;
			const changes = getSelectionChanges(edges, selectedEdgeIds);
			if (changes.length) onEdgesChange?.(changes);
		}
		store.setState({ userSelectionRect: nextUserSelectRect });
	};
	const onMouseUp = (event) => {
		if (event.button !== 0) return;
		const { userSelectionRect } = store.getState();
		if (!userSelectionActive && userSelectionRect && event.target === container.current) onClick?.(event);
		store.setState({ nodesSelectionActive: prevSelectedNodesCount.current > 0 });
		resetUserSelection();
		onSelectionEnd?.(event);
	};
	const onMouseLeave = (event) => {
		if (userSelectionActive) {
			store.setState({ nodesSelectionActive: prevSelectedNodesCount.current > 0 });
			onSelectionEnd?.(event);
		}
		resetUserSelection();
	};
	const hasActiveSelection = elementsSelectable && (isSelecting || userSelectionActive);
	return react.default.createElement("div", {
		className: cc(["react-flow__pane", {
			dragging,
			selection: isSelecting
		}]),
		onClick: hasActiveSelection ? void 0 : wrapHandler(onClick, container),
		onContextMenu: wrapHandler(onContextMenu, container),
		onWheel: wrapHandler(onWheel, container),
		onMouseEnter: hasActiveSelection ? void 0 : onPaneMouseEnter,
		onMouseDown: hasActiveSelection ? onMouseDown : void 0,
		onMouseMove: hasActiveSelection ? onMouseMove : onPaneMouseMove,
		onMouseUp: hasActiveSelection ? onMouseUp : void 0,
		onMouseLeave: hasActiveSelection ? onMouseLeave : onPaneMouseLeave,
		ref: container,
		style: containerStyle
	}, children, react.default.createElement(UserSelection, null));
});
Pane.displayName = "Pane";
function isParentSelected(node, nodeInternals) {
	const parentId = node.parentNode || node.parentId;
	if (!parentId) return false;
	const parentNode = nodeInternals.get(parentId);
	if (!parentNode) return false;
	if (parentNode.selected) return true;
	return isParentSelected(parentNode, nodeInternals);
}
function hasSelector(target, selector, nodeRef) {
	let current = target;
	do {
		if (current?.matches(selector)) return true;
		if (current === nodeRef.current) return false;
		current = current.parentElement;
	} while (current);
	return false;
}
function getDragItems(nodeInternals, nodesDraggable, mousePos, nodeId) {
	return Array.from(nodeInternals.values()).filter((n) => (n.selected || n.id === nodeId) && (!n.parentNode || n.parentId || !isParentSelected(n, nodeInternals)) && (n.draggable || nodesDraggable && typeof n.draggable === "undefined")).map((n) => ({
		id: n.id,
		position: n.position || {
			x: 0,
			y: 0
		},
		positionAbsolute: n.positionAbsolute || {
			x: 0,
			y: 0
		},
		distance: {
			x: mousePos.x - (n.positionAbsolute?.x ?? 0),
			y: mousePos.y - (n.positionAbsolute?.y ?? 0)
		},
		delta: {
			x: 0,
			y: 0
		},
		extent: n.extent,
		parentNode: n.parentNode || n.parentId,
		parentId: n.parentNode || n.parentId,
		width: n.width,
		height: n.height,
		expandParent: n.expandParent
	}));
}
function clampNodeExtent(node, extent) {
	if (!extent || extent === "parent") return extent;
	return [extent[0], [extent[1][0] - (node.width || 0), extent[1][1] - (node.height || 0)]];
}
function calcNextPosition(node, nextPosition, nodeInternals, nodeExtent, nodeOrigin = [0, 0], onError) {
	const clampedNodeExtent = clampNodeExtent(node, node.extent || nodeExtent);
	let currentExtent = clampedNodeExtent;
	const parentId = node.parentNode || node.parentId;
	if (node.extent === "parent" && !node.expandParent) {
		if (parentId && node.width && node.height) {
			const parent = nodeInternals.get(parentId);
			const { x: parentX, y: parentY } = getNodePositionWithOrigin(parent, nodeOrigin).positionAbsolute;
			currentExtent = parent && isNumeric(parentX) && isNumeric(parentY) && isNumeric(parent.width) && isNumeric(parent.height) ? [[parentX + node.width * nodeOrigin[0], parentY + node.height * nodeOrigin[1]], [parentX + parent.width - node.width + node.width * nodeOrigin[0], parentY + parent.height - node.height + node.height * nodeOrigin[1]]] : currentExtent;
		} else {
			onError?.("005", errorMessages["error005"]());
			currentExtent = clampedNodeExtent;
		}
	} else if (node.extent && parentId && node.extent !== "parent") {
		const parent = nodeInternals.get(parentId);
		const { x: parentX, y: parentY } = getNodePositionWithOrigin(parent, nodeOrigin).positionAbsolute;
		currentExtent = [[node.extent[0][0] + parentX, node.extent[0][1] + parentY], [node.extent[1][0] + parentX, node.extent[1][1] + parentY]];
	}
	let parentPosition = {
		x: 0,
		y: 0
	};
	if (parentId) {
		const parentNode = nodeInternals.get(parentId);
		parentPosition = getNodePositionWithOrigin(parentNode, nodeOrigin).positionAbsolute;
	}
	const positionAbsolute = currentExtent && currentExtent !== "parent" ? clampPosition(nextPosition, currentExtent) : nextPosition;
	return {
		position: {
			x: positionAbsolute.x - parentPosition.x,
			y: positionAbsolute.y - parentPosition.y
		},
		positionAbsolute
	};
}
function getEventHandlerParams({ nodeId, dragItems, nodeInternals }) {
	const extentedDragItems = dragItems.map((n) => {
		return {
			...nodeInternals.get(n.id),
			position: n.position,
			positionAbsolute: n.positionAbsolute
		};
	});
	return [nodeId ? extentedDragItems.find((n) => n.id === nodeId) : extentedDragItems[0], extentedDragItems];
}
const getHandleBounds = (selector, nodeElement, zoom, nodeOrigin) => {
	const handles = nodeElement.querySelectorAll(selector);
	if (!handles || !handles.length) return null;
	const handlesArray = Array.from(handles);
	const nodeBounds = nodeElement.getBoundingClientRect();
	const nodeOffset = {
		x: nodeBounds.width * nodeOrigin[0],
		y: nodeBounds.height * nodeOrigin[1]
	};
	return handlesArray.map((handle) => {
		const handleBounds = handle.getBoundingClientRect();
		return {
			id: handle.getAttribute("data-handleid"),
			position: handle.getAttribute("data-handlepos"),
			x: (handleBounds.left - nodeBounds.left - nodeOffset.x) / zoom,
			y: (handleBounds.top - nodeBounds.top - nodeOffset.y) / zoom,
			...getDimensions(handle)
		};
	});
};
function getMouseHandler(id, getState, handler) {
	return handler === void 0 ? handler : (event) => {
		const node = getState().nodeInternals.get(id);
		if (node) handler(event, { ...node });
	};
}
function handleNodeClick({ id, store, unselect = false, nodeRef }) {
	const { addSelectedNodes, unselectNodesAndEdges, multiSelectionActive, nodeInternals, onError } = store.getState();
	const node = nodeInternals.get(id);
	if (!node) {
		onError?.("012", errorMessages["error012"](id));
		return;
	}
	store.setState({ nodesSelectionActive: false });
	if (!node.selected) addSelectedNodes([id]);
	else if (unselect || node.selected && multiSelectionActive) {
		unselectNodesAndEdges({
			nodes: [node],
			edges: []
		});
		requestAnimationFrame(() => nodeRef?.current?.blur());
	}
}
function useGetPointerPosition() {
	const store = useStoreApi();
	return (0, react.useCallback)(({ sourceEvent }) => {
		const { transform, snapGrid, snapToGrid } = store.getState();
		const x = sourceEvent.touches ? sourceEvent.touches[0].clientX : sourceEvent.clientX;
		const y = sourceEvent.touches ? sourceEvent.touches[0].clientY : sourceEvent.clientY;
		const pointerPos = {
			x: (x - transform[0]) / transform[2],
			y: (y - transform[1]) / transform[2]
		};
		return {
			xSnapped: snapToGrid ? snapGrid[0] * Math.round(pointerPos.x / snapGrid[0]) : pointerPos.x,
			ySnapped: snapToGrid ? snapGrid[1] * Math.round(pointerPos.y / snapGrid[1]) : pointerPos.y,
			...pointerPos
		};
	}, []);
}
function wrapSelectionDragFunc(selectionFunc) {
	return (event, _, nodes) => selectionFunc?.(event, nodes);
}
function useDrag({ nodeRef, disabled = false, noDragClassName, handleSelector, nodeId, isSelectable, selectNodesOnDrag }) {
	const store = useStoreApi();
	const [dragging, setDragging] = (0, react.useState)(false);
	const dragItems = (0, react.useRef)([]);
	const lastPos = (0, react.useRef)({
		x: null,
		y: null
	});
	const autoPanId = (0, react.useRef)(0);
	const containerBounds = (0, react.useRef)(null);
	const mousePosition = (0, react.useRef)({
		x: 0,
		y: 0
	});
	const dragEvent = (0, react.useRef)(null);
	const autoPanStarted = (0, react.useRef)(false);
	const dragStarted = (0, react.useRef)(false);
	const abortDrag = (0, react.useRef)(false);
	const getPointerPosition = useGetPointerPosition();
	(0, react.useEffect)(() => {
		if (nodeRef?.current) {
			const selection = select_default$1(nodeRef.current);
			const updateNodes = ({ x, y }) => {
				const { nodeInternals, onNodeDrag, onSelectionDrag, updateNodePositions, nodeExtent, snapGrid, snapToGrid, nodeOrigin, onError } = store.getState();
				lastPos.current = {
					x,
					y
				};
				let hasChange = false;
				let nodesBox = {
					x: 0,
					y: 0,
					x2: 0,
					y2: 0
				};
				if (dragItems.current.length > 1 && nodeExtent) {
					const rect = getNodesBounds(dragItems.current, nodeOrigin);
					nodesBox = rectToBox(rect);
				}
				dragItems.current = dragItems.current.map((n) => {
					const nextPosition = {
						x: x - n.distance.x,
						y: y - n.distance.y
					};
					if (snapToGrid) {
						nextPosition.x = snapGrid[0] * Math.round(nextPosition.x / snapGrid[0]);
						nextPosition.y = snapGrid[1] * Math.round(nextPosition.y / snapGrid[1]);
					}
					const adjustedNodeExtent = [[nodeExtent[0][0], nodeExtent[0][1]], [nodeExtent[1][0], nodeExtent[1][1]]];
					if (dragItems.current.length > 1 && nodeExtent && !n.extent) {
						adjustedNodeExtent[0][0] = n.positionAbsolute.x - nodesBox.x + nodeExtent[0][0];
						adjustedNodeExtent[1][0] = n.positionAbsolute.x + (n.width ?? 0) - nodesBox.x2 + nodeExtent[1][0];
						adjustedNodeExtent[0][1] = n.positionAbsolute.y - nodesBox.y + nodeExtent[0][1];
						adjustedNodeExtent[1][1] = n.positionAbsolute.y + (n.height ?? 0) - nodesBox.y2 + nodeExtent[1][1];
					}
					const updatedPos = calcNextPosition(n, nextPosition, nodeInternals, adjustedNodeExtent, nodeOrigin, onError);
					hasChange = hasChange || n.position.x !== updatedPos.position.x || n.position.y !== updatedPos.position.y;
					n.position = updatedPos.position;
					n.positionAbsolute = updatedPos.positionAbsolute;
					return n;
				});
				if (!hasChange) return;
				updateNodePositions(dragItems.current, true, true);
				setDragging(true);
				const onDrag = nodeId ? onNodeDrag : wrapSelectionDragFunc(onSelectionDrag);
				if (onDrag && dragEvent.current) {
					const [currentNode, nodes] = getEventHandlerParams({
						nodeId,
						dragItems: dragItems.current,
						nodeInternals
					});
					onDrag(dragEvent.current, currentNode, nodes);
				}
			};
			const autoPan = () => {
				if (!containerBounds.current) return;
				const [xMovement, yMovement] = calcAutoPan(mousePosition.current, containerBounds.current);
				if (xMovement !== 0 || yMovement !== 0) {
					const { transform, panBy } = store.getState();
					lastPos.current.x = (lastPos.current.x ?? 0) - xMovement / transform[2];
					lastPos.current.y = (lastPos.current.y ?? 0) - yMovement / transform[2];
					if (panBy({
						x: xMovement,
						y: yMovement
					})) updateNodes(lastPos.current);
				}
				autoPanId.current = requestAnimationFrame(autoPan);
			};
			const startDrag = (event) => {
				const { nodeInternals, multiSelectionActive, nodesDraggable, unselectNodesAndEdges, onNodeDragStart, onSelectionDragStart } = store.getState();
				dragStarted.current = true;
				const onStart = nodeId ? onNodeDragStart : wrapSelectionDragFunc(onSelectionDragStart);
				if ((!selectNodesOnDrag || !isSelectable) && !multiSelectionActive && nodeId) {
					if (!nodeInternals.get(nodeId)?.selected) unselectNodesAndEdges();
				}
				if (nodeId && isSelectable && selectNodesOnDrag) handleNodeClick({
					id: nodeId,
					store,
					nodeRef
				});
				const pointerPos = getPointerPosition(event);
				lastPos.current = pointerPos;
				dragItems.current = getDragItems(nodeInternals, nodesDraggable, pointerPos, nodeId);
				if (onStart && dragItems.current) {
					const [currentNode, nodes] = getEventHandlerParams({
						nodeId,
						dragItems: dragItems.current,
						nodeInternals
					});
					onStart(event.sourceEvent, currentNode, nodes);
				}
			};
			if (disabled) selection.on(".drag", null);
			else {
				const dragHandler = drag_default().on("start", (event) => {
					const { domNode, nodeDragThreshold } = store.getState();
					if (nodeDragThreshold === 0) startDrag(event);
					abortDrag.current = false;
					const pointerPos = getPointerPosition(event);
					lastPos.current = pointerPos;
					containerBounds.current = domNode?.getBoundingClientRect() || null;
					mousePosition.current = getEventPosition(event.sourceEvent, containerBounds.current);
				}).on("drag", (event) => {
					const pointerPos = getPointerPosition(event);
					const { autoPanOnNodeDrag, nodeDragThreshold } = store.getState();
					if (event.sourceEvent.type === "touchmove" && event.sourceEvent.touches.length > 1) abortDrag.current = true;
					if (abortDrag.current) return;
					if (!autoPanStarted.current && dragStarted.current && autoPanOnNodeDrag) {
						autoPanStarted.current = true;
						autoPan();
					}
					if (!dragStarted.current) {
						const x = pointerPos.xSnapped - (lastPos?.current?.x ?? 0);
						const y = pointerPos.ySnapped - (lastPos?.current?.y ?? 0);
						if (Math.sqrt(x * x + y * y) > nodeDragThreshold) startDrag(event);
					}
					if ((lastPos.current.x !== pointerPos.xSnapped || lastPos.current.y !== pointerPos.ySnapped) && dragItems.current && dragStarted.current) {
						dragEvent.current = event.sourceEvent;
						mousePosition.current = getEventPosition(event.sourceEvent, containerBounds.current);
						updateNodes(pointerPos);
					}
				}).on("end", (event) => {
					if (!dragStarted.current || abortDrag.current) return;
					setDragging(false);
					autoPanStarted.current = false;
					dragStarted.current = false;
					cancelAnimationFrame(autoPanId.current);
					if (dragItems.current) {
						const { updateNodePositions, nodeInternals, onNodeDragStop, onSelectionDragStop } = store.getState();
						const onStop = nodeId ? onNodeDragStop : wrapSelectionDragFunc(onSelectionDragStop);
						updateNodePositions(dragItems.current, false, false);
						if (onStop) {
							const [currentNode, nodes] = getEventHandlerParams({
								nodeId,
								dragItems: dragItems.current,
								nodeInternals
							});
							onStop(event.sourceEvent, currentNode, nodes);
						}
					}
				}).filter((event) => {
					const target = event.target;
					return !event.button && (!noDragClassName || !hasSelector(target, `.${noDragClassName}`, nodeRef)) && (!handleSelector || hasSelector(target, handleSelector, nodeRef));
				});
				selection.call(dragHandler);
				return () => {
					selection.on(".drag", null);
				};
			}
		}
	}, [
		nodeRef,
		disabled,
		noDragClassName,
		handleSelector,
		isSelectable,
		store,
		nodeId,
		selectNodesOnDrag,
		getPointerPosition
	]);
	return dragging;
}
function useUpdateNodePositions() {
	const store = useStoreApi();
	return (0, react.useCallback)((params) => {
		const { nodeInternals, nodeExtent, updateNodePositions, getNodes, snapToGrid, snapGrid, onError, nodesDraggable } = store.getState();
		const selectedNodes = getNodes().filter((n) => n.selected && (n.draggable || nodesDraggable && typeof n.draggable === "undefined"));
		const xVelo = snapToGrid ? snapGrid[0] : 5;
		const yVelo = snapToGrid ? snapGrid[1] : 5;
		const factor = params.isShiftPressed ? 4 : 1;
		const positionDiffX = params.x * xVelo * factor;
		const positionDiffY = params.y * yVelo * factor;
		updateNodePositions(selectedNodes.map((n) => {
			if (n.positionAbsolute) {
				const nextPosition = {
					x: n.positionAbsolute.x + positionDiffX,
					y: n.positionAbsolute.y + positionDiffY
				};
				if (snapToGrid) {
					nextPosition.x = snapGrid[0] * Math.round(nextPosition.x / snapGrid[0]);
					nextPosition.y = snapGrid[1] * Math.round(nextPosition.y / snapGrid[1]);
				}
				const { positionAbsolute, position } = calcNextPosition(n, nextPosition, nodeInternals, nodeExtent, void 0, onError);
				n.position = position;
				n.positionAbsolute = positionAbsolute;
			}
			return n;
		}), true, false);
	}, []);
}
const arrowKeyDiffs = {
	ArrowUp: {
		x: 0,
		y: -1
	},
	ArrowDown: {
		x: 0,
		y: 1
	},
	ArrowLeft: {
		x: -1,
		y: 0
	},
	ArrowRight: {
		x: 1,
		y: 0
	}
};
var wrapNode = (NodeComponent) => {
	const NodeWrapper = ({ id, type, data, xPos, yPos, xPosOrigin, yPosOrigin, selected, onClick, onMouseEnter, onMouseMove, onMouseLeave, onContextMenu, onDoubleClick, style, className, isDraggable, isSelectable, isConnectable, isFocusable, selectNodesOnDrag, sourcePosition, targetPosition, hidden, resizeObserver, dragHandle, zIndex, isParent, noDragClassName, noPanClassName, initialized, disableKeyboardA11y, ariaLabel, rfId, hasHandleBounds }) => {
		const store = useStoreApi();
		const nodeRef = (0, react.useRef)(null);
		const prevNodeRef = (0, react.useRef)(null);
		const prevSourcePosition = (0, react.useRef)(sourcePosition);
		const prevTargetPosition = (0, react.useRef)(targetPosition);
		const prevType = (0, react.useRef)(type);
		const hasPointerEvents = isSelectable || isDraggable || onClick || onMouseEnter || onMouseMove || onMouseLeave;
		const updatePositions = useUpdateNodePositions();
		const onMouseEnterHandler = getMouseHandler(id, store.getState, onMouseEnter);
		const onMouseMoveHandler = getMouseHandler(id, store.getState, onMouseMove);
		const onMouseLeaveHandler = getMouseHandler(id, store.getState, onMouseLeave);
		const onContextMenuHandler = getMouseHandler(id, store.getState, onContextMenu);
		const onDoubleClickHandler = getMouseHandler(id, store.getState, onDoubleClick);
		const onSelectNodeHandler = (event) => {
			const { nodeDragThreshold } = store.getState();
			if (isSelectable && (!selectNodesOnDrag || !isDraggable || nodeDragThreshold > 0)) handleNodeClick({
				id,
				store,
				nodeRef
			});
			if (onClick) {
				const node = store.getState().nodeInternals.get(id);
				if (node) onClick(event, { ...node });
			}
		};
		const onKeyDown = (event) => {
			if (isInputDOMNode(event)) return;
			if (disableKeyboardA11y) return;
			if (elementSelectionKeys.includes(event.key) && isSelectable) {
				const unselect = event.key === "Escape";
				handleNodeClick({
					id,
					store,
					unselect,
					nodeRef
				});
			} else if (isDraggable && selected && Object.prototype.hasOwnProperty.call(arrowKeyDiffs, event.key)) {
				store.setState({ ariaLiveMessage: `Moved selected node ${event.key.replace("Arrow", "").toLowerCase()}. New position, x: ${~~xPos}, y: ${~~yPos}` });
				updatePositions({
					x: arrowKeyDiffs[event.key].x,
					y: arrowKeyDiffs[event.key].y,
					isShiftPressed: event.shiftKey
				});
			}
		};
		(0, react.useEffect)(() => {
			return () => {
				if (prevNodeRef.current) {
					resizeObserver?.unobserve(prevNodeRef.current);
					prevNodeRef.current = null;
				}
			};
		}, []);
		(0, react.useEffect)(() => {
			if (nodeRef.current && !hidden) {
				const currNode = nodeRef.current;
				if (!initialized || !hasHandleBounds || prevNodeRef.current !== currNode) {
					if (prevNodeRef.current) resizeObserver?.unobserve(prevNodeRef.current);
					resizeObserver?.observe(currNode);
					prevNodeRef.current = currNode;
				}
			}
		}, [
			hidden,
			initialized,
			hasHandleBounds
		]);
		(0, react.useEffect)(() => {
			const typeChanged = prevType.current !== type;
			const sourcePosChanged = prevSourcePosition.current !== sourcePosition;
			const targetPosChanged = prevTargetPosition.current !== targetPosition;
			if (nodeRef.current && (typeChanged || sourcePosChanged || targetPosChanged)) {
				if (typeChanged) prevType.current = type;
				if (sourcePosChanged) prevSourcePosition.current = sourcePosition;
				if (targetPosChanged) prevTargetPosition.current = targetPosition;
				store.getState().updateNodeDimensions([{
					id,
					nodeElement: nodeRef.current,
					forceUpdate: true
				}]);
			}
		}, [
			id,
			type,
			sourcePosition,
			targetPosition
		]);
		const dragging = useDrag({
			nodeRef,
			disabled: hidden || !isDraggable,
			noDragClassName,
			handleSelector: dragHandle,
			nodeId: id,
			isSelectable,
			selectNodesOnDrag
		});
		if (hidden) return null;
		return react.default.createElement("div", {
			className: cc([
				"react-flow__node",
				`react-flow__node-${type}`,
				{ [noPanClassName]: isDraggable },
				className,
				{
					selected,
					selectable: isSelectable,
					parent: isParent,
					dragging
				}
			]),
			ref: nodeRef,
			style: {
				zIndex,
				transform: `translate(${xPosOrigin}px,${yPosOrigin}px)`,
				pointerEvents: hasPointerEvents ? "all" : "none",
				visibility: initialized ? "visible" : "hidden",
				...style
			},
			"data-id": id,
			"data-testid": `rf__node-${id}`,
			onMouseEnter: onMouseEnterHandler,
			onMouseMove: onMouseMoveHandler,
			onMouseLeave: onMouseLeaveHandler,
			onContextMenu: onContextMenuHandler,
			onClick: onSelectNodeHandler,
			onDoubleClick: onDoubleClickHandler,
			onKeyDown: isFocusable ? onKeyDown : void 0,
			tabIndex: isFocusable ? 0 : void 0,
			role: isFocusable ? "button" : void 0,
			"aria-describedby": disableKeyboardA11y ? void 0 : `${ARIA_NODE_DESC_KEY}-${rfId}`,
			"aria-label": ariaLabel
		}, react.default.createElement(Provider, { value: id }, react.default.createElement(NodeComponent, {
			id,
			data,
			type,
			xPos,
			yPos,
			selected,
			isConnectable,
			sourcePosition,
			targetPosition,
			dragging,
			dragHandle,
			zIndex
		})));
	};
	NodeWrapper.displayName = "NodeWrapper";
	return (0, react.memo)(NodeWrapper);
};
/**
* The nodes selection rectangle gets displayed when a user
* made a selection with on or several nodes
*/
const selector$7 = (s) => {
	const selectedNodes = s.getNodes().filter((n) => n.selected);
	return {
		...getNodesBounds(selectedNodes, s.nodeOrigin),
		transformString: `translate(${s.transform[0]}px,${s.transform[1]}px) scale(${s.transform[2]})`,
		userSelectionActive: s.userSelectionActive
	};
};
function NodesSelection({ onSelectionContextMenu, noPanClassName, disableKeyboardA11y }) {
	const store = useStoreApi();
	const { width, height, x: left, y: top, transformString, userSelectionActive } = useStore(selector$7, shallow$1);
	const updatePositions = useUpdateNodePositions();
	const nodeRef = (0, react.useRef)(null);
	(0, react.useEffect)(() => {
		if (!disableKeyboardA11y) nodeRef.current?.focus({ preventScroll: true });
	}, [disableKeyboardA11y]);
	useDrag({ nodeRef });
	if (userSelectionActive || !width || !height) return null;
	const onContextMenu = onSelectionContextMenu ? (event) => {
		onSelectionContextMenu(event, store.getState().getNodes().filter((n) => n.selected));
	} : void 0;
	const onKeyDown = (event) => {
		if (Object.prototype.hasOwnProperty.call(arrowKeyDiffs, event.key)) updatePositions({
			x: arrowKeyDiffs[event.key].x,
			y: arrowKeyDiffs[event.key].y,
			isShiftPressed: event.shiftKey
		});
	};
	return react.default.createElement("div", {
		className: cc([
			"react-flow__nodesselection",
			"react-flow__container",
			noPanClassName
		]),
		style: { transform: transformString }
	}, react.default.createElement("div", {
		ref: nodeRef,
		className: "react-flow__nodesselection-rect",
		onContextMenu,
		tabIndex: disableKeyboardA11y ? void 0 : -1,
		onKeyDown: disableKeyboardA11y ? void 0 : onKeyDown,
		style: {
			width,
			height,
			top,
			left
		}
	}));
}
var NodesSelection$1 = (0, react.memo)(NodesSelection);
const selector$6 = (s) => s.nodesSelectionActive;
const FlowRenderer = ({ children, onPaneClick, onPaneMouseEnter, onPaneMouseMove, onPaneMouseLeave, onPaneContextMenu, onPaneScroll, deleteKeyCode, onMove, onMoveStart, onMoveEnd, selectionKeyCode, selectionOnDrag, selectionMode, onSelectionStart, onSelectionEnd, multiSelectionKeyCode, panActivationKeyCode, zoomActivationKeyCode, elementsSelectable, zoomOnScroll, zoomOnPinch, panOnScroll: _panOnScroll, panOnScrollSpeed, panOnScrollMode, zoomOnDoubleClick, panOnDrag: _panOnDrag, defaultViewport, translateExtent, minZoom, maxZoom, preventScrolling, onSelectionContextMenu, noWheelClassName, noPanClassName, disableKeyboardA11y }) => {
	const nodesSelectionActive = useStore(selector$6);
	const selectionKeyPressed = useKeyPress(selectionKeyCode);
	const panActivationKeyPressed = useKeyPress(panActivationKeyCode);
	const panOnDrag = panActivationKeyPressed || _panOnDrag;
	const panOnScroll = panActivationKeyPressed || _panOnScroll;
	const isSelecting = selectionKeyPressed || selectionOnDrag && panOnDrag !== true;
	useGlobalKeyHandler({
		deleteKeyCode,
		multiSelectionKeyCode
	});
	return react.default.createElement(ZoomPane, {
		onMove,
		onMoveStart,
		onMoveEnd,
		onPaneContextMenu,
		elementsSelectable,
		zoomOnScroll,
		zoomOnPinch,
		panOnScroll,
		panOnScrollSpeed,
		panOnScrollMode,
		zoomOnDoubleClick,
		panOnDrag: !selectionKeyPressed && panOnDrag,
		defaultViewport,
		translateExtent,
		minZoom,
		maxZoom,
		zoomActivationKeyCode,
		preventScrolling,
		noWheelClassName,
		noPanClassName
	}, react.default.createElement(Pane, {
		onSelectionStart,
		onSelectionEnd,
		onPaneClick,
		onPaneMouseEnter,
		onPaneMouseMove,
		onPaneMouseLeave,
		onPaneContextMenu,
		onPaneScroll,
		panOnDrag,
		isSelecting: !!isSelecting,
		selectionMode
	}, children, nodesSelectionActive && react.default.createElement(NodesSelection$1, {
		onSelectionContextMenu,
		noPanClassName,
		disableKeyboardA11y
	})));
};
FlowRenderer.displayName = "FlowRenderer";
var FlowRenderer$1 = (0, react.memo)(FlowRenderer);
function useVisibleNodes(onlyRenderVisible) {
	return useStore((0, react.useCallback)((s) => onlyRenderVisible ? getNodesInside(s.nodeInternals, {
		x: 0,
		y: 0,
		width: s.width,
		height: s.height
	}, s.transform, true) : s.getNodes(), [onlyRenderVisible]));
}
function createNodeTypes(nodeTypes) {
	const standardTypes = {
		input: wrapNode(nodeTypes.input || InputNode$1),
		default: wrapNode(nodeTypes.default || DefaultNode$1),
		output: wrapNode(nodeTypes.output || OutputNode$1),
		group: wrapNode(nodeTypes.group || GroupNode)
	};
	const specialTypes = Object.keys(nodeTypes).filter((k) => ![
		"input",
		"default",
		"output",
		"group"
	].includes(k)).reduce((res, key) => {
		res[key] = wrapNode(nodeTypes[key] || DefaultNode$1);
		return res;
	}, {});
	return {
		...standardTypes,
		...specialTypes
	};
}
const getPositionWithOrigin = ({ x, y, width, height, origin }) => {
	if (!width || !height) return {
		x,
		y
	};
	if (origin[0] < 0 || origin[1] < 0 || origin[0] > 1 || origin[1] > 1) return {
		x,
		y
	};
	return {
		x: x - width * origin[0],
		y: y - height * origin[1]
	};
};
const selector$5 = (s) => ({
	nodesDraggable: s.nodesDraggable,
	nodesConnectable: s.nodesConnectable,
	nodesFocusable: s.nodesFocusable,
	elementsSelectable: s.elementsSelectable,
	updateNodeDimensions: s.updateNodeDimensions,
	onError: s.onError
});
const NodeRenderer = (props) => {
	const { nodesDraggable, nodesConnectable, nodesFocusable, elementsSelectable, updateNodeDimensions, onError } = useStore(selector$5, shallow$1);
	const nodes = useVisibleNodes(props.onlyRenderVisibleElements);
	const resizeObserverRef = (0, react.useRef)();
	const resizeObserver = (0, react.useMemo)(() => {
		if (typeof ResizeObserver === "undefined") return null;
		const observer = new ResizeObserver((entries) => {
			const updates = entries.map((entry) => ({
				id: entry.target.getAttribute("data-id"),
				nodeElement: entry.target,
				forceUpdate: true
			}));
			updateNodeDimensions(updates);
		});
		resizeObserverRef.current = observer;
		return observer;
	}, []);
	(0, react.useEffect)(() => {
		return () => {
			resizeObserverRef?.current?.disconnect();
		};
	}, []);
	return react.default.createElement("div", {
		className: "react-flow__nodes",
		style: containerStyle
	}, nodes.map((node) => {
		let nodeType = node.type || "default";
		if (!props.nodeTypes[nodeType]) {
			onError?.("003", errorMessages["error003"](nodeType));
			nodeType = "default";
		}
		const NodeComponent = props.nodeTypes[nodeType] || props.nodeTypes.default;
		const isDraggable = !!(node.draggable || nodesDraggable && typeof node.draggable === "undefined");
		const isSelectable = !!(node.selectable || elementsSelectable && typeof node.selectable === "undefined");
		const isConnectable = !!(node.connectable || nodesConnectable && typeof node.connectable === "undefined");
		const isFocusable = !!(node.focusable || nodesFocusable && typeof node.focusable === "undefined");
		const clampedPosition = props.nodeExtent ? clampPosition(node.positionAbsolute, props.nodeExtent) : node.positionAbsolute;
		const posX = clampedPosition?.x ?? 0;
		const posY = clampedPosition?.y ?? 0;
		const posOrigin = getPositionWithOrigin({
			x: posX,
			y: posY,
			width: node.width ?? 0,
			height: node.height ?? 0,
			origin: props.nodeOrigin
		});
		return react.default.createElement(NodeComponent, {
			key: node.id,
			id: node.id,
			className: node.className,
			style: node.style,
			type: nodeType,
			data: node.data,
			sourcePosition: node.sourcePosition || Position.Bottom,
			targetPosition: node.targetPosition || Position.Top,
			hidden: node.hidden,
			xPos: posX,
			yPos: posY,
			xPosOrigin: posOrigin.x,
			yPosOrigin: posOrigin.y,
			selectNodesOnDrag: props.selectNodesOnDrag,
			onClick: props.onNodeClick,
			onMouseEnter: props.onNodeMouseEnter,
			onMouseMove: props.onNodeMouseMove,
			onMouseLeave: props.onNodeMouseLeave,
			onContextMenu: props.onNodeContextMenu,
			onDoubleClick: props.onNodeDoubleClick,
			selected: !!node.selected,
			isDraggable,
			isSelectable,
			isConnectable,
			isFocusable,
			resizeObserver,
			dragHandle: node.dragHandle,
			zIndex: node[internalsSymbol]?.z ?? 0,
			isParent: !!node[internalsSymbol]?.isParent,
			noDragClassName: props.noDragClassName,
			noPanClassName: props.noPanClassName,
			initialized: !!node.width && !!node.height,
			rfId: props.rfId,
			disableKeyboardA11y: props.disableKeyboardA11y,
			ariaLabel: node.ariaLabel,
			hasHandleBounds: !!node[internalsSymbol]?.handleBounds
		});
	}));
};
NodeRenderer.displayName = "NodeRenderer";
var NodeRenderer$1 = (0, react.memo)(NodeRenderer);
const shiftX = (x, shift, position) => {
	if (position === Position.Left) return x - shift;
	if (position === Position.Right) return x + shift;
	return x;
};
const shiftY = (y, shift, position) => {
	if (position === Position.Top) return y - shift;
	if (position === Position.Bottom) return y + shift;
	return y;
};
const EdgeUpdaterClassName = "react-flow__edgeupdater";
const EdgeAnchor = ({ position, centerX, centerY, radius = 10, onMouseDown, onMouseEnter, onMouseOut, type }) => react.default.createElement("circle", {
	onMouseDown,
	onMouseEnter,
	onMouseOut,
	className: cc([EdgeUpdaterClassName, `${EdgeUpdaterClassName}-${type}`]),
	cx: shiftX(centerX, radius, position),
	cy: shiftY(centerY, radius, position),
	r: radius,
	stroke: "transparent",
	fill: "transparent"
});
const alwaysValidConnection = () => true;
var wrapEdge = (EdgeComponent) => {
	const EdgeWrapper = ({ id, className, type, data, onClick, onEdgeDoubleClick, selected, animated, label, labelStyle, labelShowBg, labelBgStyle, labelBgPadding, labelBgBorderRadius, style, source, target, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, elementsSelectable, hidden, sourceHandleId, targetHandleId, onContextMenu, onMouseEnter, onMouseMove, onMouseLeave, reconnectRadius, onReconnect, onReconnectStart, onReconnectEnd, markerEnd, markerStart, rfId, ariaLabel, isFocusable, isReconnectable, pathOptions, interactionWidth, disableKeyboardA11y }) => {
		const edgeRef = (0, react.useRef)(null);
		const [updateHover, setUpdateHover] = (0, react.useState)(false);
		const [updating, setUpdating] = (0, react.useState)(false);
		const store = useStoreApi();
		const markerStartUrl = (0, react.useMemo)(() => `url('#${getMarkerId(markerStart, rfId)}')`, [markerStart, rfId]);
		const markerEndUrl = (0, react.useMemo)(() => `url('#${getMarkerId(markerEnd, rfId)}')`, [markerEnd, rfId]);
		if (hidden) return null;
		const onEdgeClick = (event) => {
			const { edges, addSelectedEdges, unselectNodesAndEdges, multiSelectionActive } = store.getState();
			const edge = edges.find((e) => e.id === id);
			if (!edge) return;
			if (elementsSelectable) {
				store.setState({ nodesSelectionActive: false });
				if (edge.selected && multiSelectionActive) {
					unselectNodesAndEdges({
						nodes: [],
						edges: [edge]
					});
					edgeRef.current?.blur();
				} else addSelectedEdges([id]);
			}
			if (onClick) onClick(event, edge);
		};
		const onEdgeDoubleClickHandler = getMouseHandler$1(id, store.getState, onEdgeDoubleClick);
		const onEdgeContextMenu = getMouseHandler$1(id, store.getState, onContextMenu);
		const onEdgeMouseEnter = getMouseHandler$1(id, store.getState, onMouseEnter);
		const onEdgeMouseMove = getMouseHandler$1(id, store.getState, onMouseMove);
		const onEdgeMouseLeave = getMouseHandler$1(id, store.getState, onMouseLeave);
		const handleEdgeUpdater = (event, isSourceHandle) => {
			if (event.button !== 0) return;
			const { edges, isValidConnection: isValidConnectionStore } = store.getState();
			const nodeId = isSourceHandle ? target : source;
			const handleId = (isSourceHandle ? targetHandleId : sourceHandleId) || null;
			const handleType = isSourceHandle ? "target" : "source";
			const isValidConnection = isValidConnectionStore || alwaysValidConnection;
			const isTarget = isSourceHandle;
			const edge = edges.find((e) => e.id === id);
			setUpdating(true);
			onReconnectStart?.(event, edge, handleType);
			const _onReconnectEnd = (evt) => {
				setUpdating(false);
				onReconnectEnd?.(evt, edge, handleType);
			};
			const onConnectEdge = (connection) => onReconnect?.(edge, connection);
			handlePointerDown({
				event,
				handleId,
				nodeId,
				onConnect: onConnectEdge,
				isTarget,
				getState: store.getState,
				setState: store.setState,
				isValidConnection,
				edgeUpdaterType: handleType,
				onReconnectEnd: _onReconnectEnd
			});
		};
		const onEdgeUpdaterSourceMouseDown = (event) => handleEdgeUpdater(event, true);
		const onEdgeUpdaterTargetMouseDown = (event) => handleEdgeUpdater(event, false);
		const onEdgeUpdaterMouseEnter = () => setUpdateHover(true);
		const onEdgeUpdaterMouseOut = () => setUpdateHover(false);
		const inactive = !elementsSelectable && !onClick;
		const onKeyDown = (event) => {
			if (!disableKeyboardA11y && elementSelectionKeys.includes(event.key) && elementsSelectable) {
				const { unselectNodesAndEdges, addSelectedEdges, edges } = store.getState();
				if (event.key === "Escape") {
					edgeRef.current?.blur();
					unselectNodesAndEdges({ edges: [edges.find((e) => e.id === id)] });
				} else addSelectedEdges([id]);
			}
		};
		return react.default.createElement("g", {
			className: cc([
				"react-flow__edge",
				`react-flow__edge-${type}`,
				className,
				{
					selected,
					animated,
					inactive,
					updating: updateHover
				}
			]),
			onClick: onEdgeClick,
			onDoubleClick: onEdgeDoubleClickHandler,
			onContextMenu: onEdgeContextMenu,
			onMouseEnter: onEdgeMouseEnter,
			onMouseMove: onEdgeMouseMove,
			onMouseLeave: onEdgeMouseLeave,
			onKeyDown: isFocusable ? onKeyDown : void 0,
			tabIndex: isFocusable ? 0 : void 0,
			role: isFocusable ? "button" : "img",
			"data-testid": `rf__edge-${id}`,
			"aria-label": ariaLabel === null ? void 0 : ariaLabel ? ariaLabel : `Edge from ${source} to ${target}`,
			"aria-describedby": isFocusable ? `${ARIA_EDGE_DESC_KEY}-${rfId}` : void 0,
			ref: edgeRef
		}, !updating && react.default.createElement(EdgeComponent, {
			id,
			source,
			target,
			selected,
			animated,
			label,
			labelStyle,
			labelShowBg,
			labelBgStyle,
			labelBgPadding,
			labelBgBorderRadius,
			data,
			style,
			sourceX,
			sourceY,
			targetX,
			targetY,
			sourcePosition,
			targetPosition,
			sourceHandleId,
			targetHandleId,
			markerStart: markerStartUrl,
			markerEnd: markerEndUrl,
			pathOptions,
			interactionWidth
		}), isReconnectable && react.default.createElement(react.default.Fragment, null, (isReconnectable === "source" || isReconnectable === true) && react.default.createElement(EdgeAnchor, {
			position: sourcePosition,
			centerX: sourceX,
			centerY: sourceY,
			radius: reconnectRadius,
			onMouseDown: onEdgeUpdaterSourceMouseDown,
			onMouseEnter: onEdgeUpdaterMouseEnter,
			onMouseOut: onEdgeUpdaterMouseOut,
			type: "source"
		}), (isReconnectable === "target" || isReconnectable === true) && react.default.createElement(EdgeAnchor, {
			position: targetPosition,
			centerX: targetX,
			centerY: targetY,
			radius: reconnectRadius,
			onMouseDown: onEdgeUpdaterTargetMouseDown,
			onMouseEnter: onEdgeUpdaterMouseEnter,
			onMouseOut: onEdgeUpdaterMouseOut,
			type: "target"
		})));
	};
	EdgeWrapper.displayName = "EdgeWrapper";
	return (0, react.memo)(EdgeWrapper);
};
function createEdgeTypes(edgeTypes) {
	const standardTypes = {
		default: wrapEdge(edgeTypes.default || BezierEdge),
		straight: wrapEdge(edgeTypes.bezier || StraightEdge),
		step: wrapEdge(edgeTypes.step || StepEdge),
		smoothstep: wrapEdge(edgeTypes.step || SmoothStepEdge),
		simplebezier: wrapEdge(edgeTypes.simplebezier || SimpleBezierEdge)
	};
	const specialTypes = Object.keys(edgeTypes).filter((k) => !["default", "bezier"].includes(k)).reduce((res, key) => {
		res[key] = wrapEdge(edgeTypes[key] || BezierEdge);
		return res;
	}, {});
	return {
		...standardTypes,
		...specialTypes
	};
}
function getHandlePosition(position, nodeRect, handle = null) {
	const x = (handle?.x || 0) + nodeRect.x;
	const y = (handle?.y || 0) + nodeRect.y;
	const width = handle?.width || nodeRect.width;
	const height = handle?.height || nodeRect.height;
	switch (position) {
		case Position.Top: return {
			x: x + width / 2,
			y
		};
		case Position.Right: return {
			x: x + width,
			y: y + height / 2
		};
		case Position.Bottom: return {
			x: x + width / 2,
			y: y + height
		};
		case Position.Left: return {
			x,
			y: y + height / 2
		};
	}
}
function getHandle(bounds, handleId) {
	if (!bounds) return null;
	if (bounds.length === 1 || !handleId) return bounds[0];
	else if (handleId) return bounds.find((d) => d.id === handleId) || null;
	return null;
}
const getEdgePositions = (sourceNodeRect, sourceHandle, sourcePosition, targetNodeRect, targetHandle, targetPosition) => {
	const sourceHandlePos = getHandlePosition(sourcePosition, sourceNodeRect, sourceHandle);
	const targetHandlePos = getHandlePosition(targetPosition, targetNodeRect, targetHandle);
	return {
		sourceX: sourceHandlePos.x,
		sourceY: sourceHandlePos.y,
		targetX: targetHandlePos.x,
		targetY: targetHandlePos.y
	};
};
function isEdgeVisible({ sourcePos, targetPos, sourceWidth, sourceHeight, targetWidth, targetHeight, width, height, transform }) {
	const edgeBox = {
		x: Math.min(sourcePos.x, targetPos.x),
		y: Math.min(sourcePos.y, targetPos.y),
		x2: Math.max(sourcePos.x + sourceWidth, targetPos.x + targetWidth),
		y2: Math.max(sourcePos.y + sourceHeight, targetPos.y + targetHeight)
	};
	if (edgeBox.x === edgeBox.x2) edgeBox.x2 += 1;
	if (edgeBox.y === edgeBox.y2) edgeBox.y2 += 1;
	const viewBox = rectToBox({
		x: (0 - transform[0]) / transform[2],
		y: (0 - transform[1]) / transform[2],
		width: width / transform[2],
		height: height / transform[2]
	});
	const xOverlap = Math.max(0, Math.min(viewBox.x2, edgeBox.x2) - Math.max(viewBox.x, edgeBox.x));
	const yOverlap = Math.max(0, Math.min(viewBox.y2, edgeBox.y2) - Math.max(viewBox.y, edgeBox.y));
	return Math.ceil(xOverlap * yOverlap) > 0;
}
function getNodeData(node) {
	const handleBounds = node?.[internalsSymbol]?.handleBounds || null;
	const isValid = handleBounds && node?.width && node?.height && typeof node?.positionAbsolute?.x !== "undefined" && typeof node?.positionAbsolute?.y !== "undefined";
	return [
		{
			x: node?.positionAbsolute?.x || 0,
			y: node?.positionAbsolute?.y || 0,
			width: node?.width || 0,
			height: node?.height || 0
		},
		handleBounds,
		!!isValid
	];
}
const defaultEdgeTree = [{
	level: 0,
	isMaxLevel: true,
	edges: []
}];
function groupEdgesByZLevel(edges, nodeInternals, elevateEdgesOnSelect = false) {
	let maxLevel = -1;
	const levelLookup = edges.reduce((tree, edge) => {
		const hasZIndex = isNumeric(edge.zIndex);
		let z = hasZIndex ? edge.zIndex : 0;
		if (elevateEdgesOnSelect) {
			const targetNode = nodeInternals.get(edge.target);
			const sourceNode = nodeInternals.get(edge.source);
			const edgeOrConnectedNodeSelected = edge.selected || targetNode?.selected || sourceNode?.selected;
			const selectedZIndex = Math.max(sourceNode?.[internalsSymbol]?.z || 0, targetNode?.[internalsSymbol]?.z || 0, 1e3);
			z = (hasZIndex ? edge.zIndex : 0) + (edgeOrConnectedNodeSelected ? selectedZIndex : 0);
		}
		if (tree[z]) tree[z].push(edge);
		else tree[z] = [edge];
		maxLevel = z > maxLevel ? z : maxLevel;
		return tree;
	}, {});
	const edgeTree = Object.entries(levelLookup).map(([key, edges]) => {
		const level = +key;
		return {
			edges,
			level,
			isMaxLevel: level === maxLevel
		};
	});
	if (edgeTree.length === 0) return defaultEdgeTree;
	return edgeTree;
}
function useVisibleEdges(onlyRenderVisible, nodeInternals, elevateEdgesOnSelect) {
	return groupEdgesByZLevel(useStore((0, react.useCallback)((s) => {
		if (!onlyRenderVisible) return s.edges;
		return s.edges.filter((e) => {
			const sourceNode = nodeInternals.get(e.source);
			const targetNode = nodeInternals.get(e.target);
			return sourceNode?.width && sourceNode?.height && targetNode?.width && targetNode?.height && isEdgeVisible({
				sourcePos: sourceNode.positionAbsolute || {
					x: 0,
					y: 0
				},
				targetPos: targetNode.positionAbsolute || {
					x: 0,
					y: 0
				},
				sourceWidth: sourceNode.width,
				sourceHeight: sourceNode.height,
				targetWidth: targetNode.width,
				targetHeight: targetNode.height,
				width: s.width,
				height: s.height,
				transform: s.transform
			});
		});
	}, [onlyRenderVisible, nodeInternals])), nodeInternals, elevateEdgesOnSelect);
}
const ArrowSymbol = ({ color = "none", strokeWidth = 1 }) => {
	return react.default.createElement("polyline", {
		style: {
			stroke: color,
			strokeWidth
		},
		strokeLinecap: "round",
		strokeLinejoin: "round",
		fill: "none",
		points: "-5,-4 0,0 -5,4"
	});
};
const ArrowClosedSymbol = ({ color = "none", strokeWidth = 1 }) => {
	return react.default.createElement("polyline", {
		style: {
			stroke: color,
			fill: color,
			strokeWidth
		},
		strokeLinecap: "round",
		strokeLinejoin: "round",
		points: "-5,-4 0,0 -5,4 -5,-4"
	});
};
const MarkerSymbols = {
	[MarkerType.Arrow]: ArrowSymbol,
	[MarkerType.ArrowClosed]: ArrowClosedSymbol
};
function useMarkerSymbol(type) {
	const store = useStoreApi();
	return (0, react.useMemo)(() => {
		if (!Object.prototype.hasOwnProperty.call(MarkerSymbols, type)) {
			store.getState().onError?.("009", errorMessages["error009"](type));
			return null;
		}
		return MarkerSymbols[type];
	}, [type]);
}
const Marker = ({ id, type, color, width = 12.5, height = 12.5, markerUnits = "strokeWidth", strokeWidth, orient = "auto-start-reverse" }) => {
	const Symbol = useMarkerSymbol(type);
	if (!Symbol) return null;
	return react.default.createElement("marker", {
		className: "react-flow__arrowhead",
		id,
		markerWidth: `${width}`,
		markerHeight: `${height}`,
		viewBox: "-10 -10 20 20",
		markerUnits,
		orient,
		refX: "0",
		refY: "0"
	}, react.default.createElement(Symbol, {
		color,
		strokeWidth
	}));
};
const markerSelector = ({ defaultColor, rfId }) => (s) => {
	const ids = [];
	return s.edges.reduce((markers, edge) => {
		[edge.markerStart, edge.markerEnd].forEach((marker) => {
			if (marker && typeof marker === "object") {
				const markerId = getMarkerId(marker, rfId);
				if (!ids.includes(markerId)) {
					markers.push({
						id: markerId,
						color: marker.color || defaultColor,
						...marker
					});
					ids.push(markerId);
				}
			}
		});
		return markers;
	}, []).sort((a, b) => a.id.localeCompare(b.id));
};
const MarkerDefinitions = ({ defaultColor, rfId }) => {
	const markers = useStore((0, react.useCallback)(markerSelector({
		defaultColor,
		rfId
	}), [defaultColor, rfId]), (a, b) => !(a.length !== b.length || a.some((m, i) => m.id !== b[i].id)));
	return react.default.createElement("defs", null, markers.map((marker) => react.default.createElement(Marker, {
		id: marker.id,
		key: marker.id,
		type: marker.type,
		color: marker.color,
		width: marker.width,
		height: marker.height,
		markerUnits: marker.markerUnits,
		strokeWidth: marker.strokeWidth,
		orient: marker.orient
	})));
};
MarkerDefinitions.displayName = "MarkerDefinitions";
var MarkerDefinitions$1 = (0, react.memo)(MarkerDefinitions);
const selector$4 = (s) => ({
	nodesConnectable: s.nodesConnectable,
	edgesFocusable: s.edgesFocusable,
	edgesUpdatable: s.edgesUpdatable,
	elementsSelectable: s.elementsSelectable,
	width: s.width,
	height: s.height,
	connectionMode: s.connectionMode,
	nodeInternals: s.nodeInternals,
	onError: s.onError
});
const EdgeRenderer = ({ defaultMarkerColor, onlyRenderVisibleElements, elevateEdgesOnSelect, rfId, edgeTypes, noPanClassName, onEdgeContextMenu, onEdgeMouseEnter, onEdgeMouseMove, onEdgeMouseLeave, onEdgeClick, onEdgeDoubleClick, onReconnect, onReconnectStart, onReconnectEnd, reconnectRadius, children, disableKeyboardA11y }) => {
	const { edgesFocusable, edgesUpdatable, elementsSelectable, width, height, connectionMode, nodeInternals, onError } = useStore(selector$4, shallow$1);
	const edgeTree = useVisibleEdges(onlyRenderVisibleElements, nodeInternals, elevateEdgesOnSelect);
	if (!width) return null;
	return react.default.createElement(react.default.Fragment, null, edgeTree.map(({ level, edges, isMaxLevel }) => react.default.createElement("svg", {
		key: level,
		style: { zIndex: level },
		width,
		height,
		className: "react-flow__edges react-flow__container"
	}, isMaxLevel && react.default.createElement(MarkerDefinitions$1, {
		defaultColor: defaultMarkerColor,
		rfId
	}), react.default.createElement("g", null, edges.map((edge) => {
		const [sourceNodeRect, sourceHandleBounds, sourceIsValid] = getNodeData(nodeInternals.get(edge.source));
		const [targetNodeRect, targetHandleBounds, targetIsValid] = getNodeData(nodeInternals.get(edge.target));
		if (!sourceIsValid || !targetIsValid) return null;
		let edgeType = edge.type || "default";
		if (!edgeTypes[edgeType]) {
			onError?.("011", errorMessages["error011"](edgeType));
			edgeType = "default";
		}
		const EdgeComponent = edgeTypes[edgeType] || edgeTypes.default;
		const targetNodeHandles = connectionMode === ConnectionMode.Strict ? targetHandleBounds.target : (targetHandleBounds.target ?? []).concat(targetHandleBounds.source ?? []);
		const sourceHandle = getHandle(sourceHandleBounds.source, edge.sourceHandle);
		const targetHandle = getHandle(targetNodeHandles, edge.targetHandle);
		const sourcePosition = sourceHandle?.position || Position.Bottom;
		const targetPosition = targetHandle?.position || Position.Top;
		const isFocusable = !!(edge.focusable || edgesFocusable && typeof edge.focusable === "undefined");
		const edgeReconnectable = edge.reconnectable || edge.updatable;
		const isReconnectable = typeof onReconnect !== "undefined" && (edgeReconnectable || edgesUpdatable && typeof edgeReconnectable === "undefined");
		if (!sourceHandle || !targetHandle) {
			onError?.("008", errorMessages["error008"](sourceHandle, edge));
			return null;
		}
		const { sourceX, sourceY, targetX, targetY } = getEdgePositions(sourceNodeRect, sourceHandle, sourcePosition, targetNodeRect, targetHandle, targetPosition);
		return react.default.createElement(EdgeComponent, {
			key: edge.id,
			id: edge.id,
			className: cc([edge.className, noPanClassName]),
			type: edgeType,
			data: edge.data,
			selected: !!edge.selected,
			animated: !!edge.animated,
			hidden: !!edge.hidden,
			label: edge.label,
			labelStyle: edge.labelStyle,
			labelShowBg: edge.labelShowBg,
			labelBgStyle: edge.labelBgStyle,
			labelBgPadding: edge.labelBgPadding,
			labelBgBorderRadius: edge.labelBgBorderRadius,
			style: edge.style,
			source: edge.source,
			target: edge.target,
			sourceHandleId: edge.sourceHandle,
			targetHandleId: edge.targetHandle,
			markerEnd: edge.markerEnd,
			markerStart: edge.markerStart,
			sourceX,
			sourceY,
			targetX,
			targetY,
			sourcePosition,
			targetPosition,
			elementsSelectable,
			onContextMenu: onEdgeContextMenu,
			onMouseEnter: onEdgeMouseEnter,
			onMouseMove: onEdgeMouseMove,
			onMouseLeave: onEdgeMouseLeave,
			onClick: onEdgeClick,
			onEdgeDoubleClick,
			onReconnect,
			onReconnectStart,
			onReconnectEnd,
			reconnectRadius,
			rfId,
			ariaLabel: edge.ariaLabel,
			isFocusable,
			isReconnectable,
			pathOptions: "pathOptions" in edge ? edge.pathOptions : void 0,
			interactionWidth: edge.interactionWidth,
			disableKeyboardA11y
		});
	})))), children);
};
EdgeRenderer.displayName = "EdgeRenderer";
var EdgeRenderer$1 = (0, react.memo)(EdgeRenderer);
const selector$3 = (s) => `translate(${s.transform[0]}px,${s.transform[1]}px) scale(${s.transform[2]})`;
function Viewport({ children }) {
	const transform = useStore(selector$3);
	return react.default.createElement("div", {
		className: "react-flow__viewport react-flow__container",
		style: { transform }
	}, children);
}
function useOnInitHandler(onInit) {
	const rfInstance = useReactFlow();
	const isInitialized = (0, react.useRef)(false);
	(0, react.useEffect)(() => {
		if (!isInitialized.current && rfInstance.viewportInitialized && onInit) {
			setTimeout(() => onInit(rfInstance), 1);
			isInitialized.current = true;
		}
	}, [onInit, rfInstance.viewportInitialized]);
}
const oppositePosition = {
	[Position.Left]: Position.Right,
	[Position.Right]: Position.Left,
	[Position.Top]: Position.Bottom,
	[Position.Bottom]: Position.Top
};
const ConnectionLine = ({ nodeId, handleType, style, type = ConnectionLineType.Bezier, CustomComponent, connectionStatus }) => {
	const { fromNode, handleId, toX, toY, connectionMode } = useStore((0, react.useCallback)((s) => ({
		fromNode: s.nodeInternals.get(nodeId),
		handleId: s.connectionHandleId,
		toX: (s.connectionPosition.x - s.transform[0]) / s.transform[2],
		toY: (s.connectionPosition.y - s.transform[1]) / s.transform[2],
		connectionMode: s.connectionMode
	}), [nodeId]), shallow$1);
	const fromHandleBounds = fromNode?.[internalsSymbol]?.handleBounds;
	let handleBounds = fromHandleBounds?.[handleType];
	if (connectionMode === ConnectionMode.Loose) handleBounds = handleBounds ? handleBounds : fromHandleBounds?.[handleType === "source" ? "target" : "source"];
	if (!fromNode || !handleBounds) return null;
	const fromHandle = handleId ? handleBounds.find((d) => d.id === handleId) : handleBounds[0];
	const fromHandleX = fromHandle ? fromHandle.x + fromHandle.width / 2 : (fromNode.width ?? 0) / 2;
	const fromHandleY = fromHandle ? fromHandle.y + fromHandle.height / 2 : fromNode.height ?? 0;
	const fromX = (fromNode.positionAbsolute?.x ?? 0) + fromHandleX;
	const fromY = (fromNode.positionAbsolute?.y ?? 0) + fromHandleY;
	const fromPosition = fromHandle?.position;
	const toPosition = fromPosition ? oppositePosition[fromPosition] : null;
	if (!fromPosition || !toPosition) return null;
	if (CustomComponent) return react.default.createElement(CustomComponent, {
		connectionLineType: type,
		connectionLineStyle: style,
		fromNode,
		fromHandle,
		fromX,
		fromY,
		toX,
		toY,
		fromPosition,
		toPosition,
		connectionStatus
	});
	let dAttr = "";
	const pathParams = {
		sourceX: fromX,
		sourceY: fromY,
		sourcePosition: fromPosition,
		targetX: toX,
		targetY: toY,
		targetPosition: toPosition
	};
	if (type === ConnectionLineType.Bezier) [dAttr] = getBezierPath(pathParams);
	else if (type === ConnectionLineType.Step) [dAttr] = getSmoothStepPath({
		...pathParams,
		borderRadius: 0
	});
	else if (type === ConnectionLineType.SmoothStep) [dAttr] = getSmoothStepPath(pathParams);
	else if (type === ConnectionLineType.SimpleBezier) [dAttr] = getSimpleBezierPath(pathParams);
	else dAttr = `M${fromX},${fromY} ${toX},${toY}`;
	return react.default.createElement("path", {
		d: dAttr,
		fill: "none",
		className: "react-flow__connection-path",
		style
	});
};
ConnectionLine.displayName = "ConnectionLine";
const selector$2$1 = (s) => ({
	nodeId: s.connectionNodeId,
	handleType: s.connectionHandleType,
	nodesConnectable: s.nodesConnectable,
	connectionStatus: s.connectionStatus,
	width: s.width,
	height: s.height
});
function ConnectionLineWrapper({ containerStyle, style, type, component }) {
	const { nodeId, handleType, nodesConnectable, width, height, connectionStatus } = useStore(selector$2$1, shallow$1);
	if (!!!(nodeId && handleType && width && nodesConnectable)) return null;
	return react.default.createElement("svg", {
		style: containerStyle,
		width,
		height,
		className: "react-flow__edges react-flow__connectionline react-flow__container"
	}, react.default.createElement("g", { className: cc(["react-flow__connection", connectionStatus]) }, react.default.createElement(ConnectionLine, {
		nodeId,
		handleType,
		style,
		type,
		CustomComponent: component,
		connectionStatus
	})));
}
function useNodeOrEdgeTypes(nodeOrEdgeTypes, createTypes) {
	(0, react.useRef)(null);
	useStoreApi();
	return (0, react.useMemo)(() => {
		return createTypes(nodeOrEdgeTypes);
	}, [nodeOrEdgeTypes]);
}
const GraphView = ({ nodeTypes, edgeTypes, onMove, onMoveStart, onMoveEnd, onInit, onNodeClick, onEdgeClick, onNodeDoubleClick, onEdgeDoubleClick, onNodeMouseEnter, onNodeMouseMove, onNodeMouseLeave, onNodeContextMenu, onSelectionContextMenu, onSelectionStart, onSelectionEnd, connectionLineType, connectionLineStyle, connectionLineComponent, connectionLineContainerStyle, selectionKeyCode, selectionOnDrag, selectionMode, multiSelectionKeyCode, panActivationKeyCode, zoomActivationKeyCode, deleteKeyCode, onlyRenderVisibleElements, elementsSelectable, selectNodesOnDrag, defaultViewport, translateExtent, minZoom, maxZoom, preventScrolling, defaultMarkerColor, zoomOnScroll, zoomOnPinch, panOnScroll, panOnScrollSpeed, panOnScrollMode, zoomOnDoubleClick, panOnDrag, onPaneClick, onPaneMouseEnter, onPaneMouseMove, onPaneMouseLeave, onPaneScroll, onPaneContextMenu, onEdgeContextMenu, onEdgeMouseEnter, onEdgeMouseMove, onEdgeMouseLeave, onReconnect, onReconnectStart, onReconnectEnd, reconnectRadius, noDragClassName, noWheelClassName, noPanClassName, elevateEdgesOnSelect, disableKeyboardA11y, nodeOrigin, nodeExtent, rfId }) => {
	const nodeTypesWrapped = useNodeOrEdgeTypes(nodeTypes, createNodeTypes);
	const edgeTypesWrapped = useNodeOrEdgeTypes(edgeTypes, createEdgeTypes);
	useOnInitHandler(onInit);
	return react.default.createElement(FlowRenderer$1, {
		onPaneClick,
		onPaneMouseEnter,
		onPaneMouseMove,
		onPaneMouseLeave,
		onPaneContextMenu,
		onPaneScroll,
		deleteKeyCode,
		selectionKeyCode,
		selectionOnDrag,
		selectionMode,
		onSelectionStart,
		onSelectionEnd,
		multiSelectionKeyCode,
		panActivationKeyCode,
		zoomActivationKeyCode,
		elementsSelectable,
		onMove,
		onMoveStart,
		onMoveEnd,
		zoomOnScroll,
		zoomOnPinch,
		zoomOnDoubleClick,
		panOnScroll,
		panOnScrollSpeed,
		panOnScrollMode,
		panOnDrag,
		defaultViewport,
		translateExtent,
		minZoom,
		maxZoom,
		onSelectionContextMenu,
		preventScrolling,
		noDragClassName,
		noWheelClassName,
		noPanClassName,
		disableKeyboardA11y
	}, react.default.createElement(Viewport, null, react.default.createElement(EdgeRenderer$1, {
		edgeTypes: edgeTypesWrapped,
		onEdgeClick,
		onEdgeDoubleClick,
		onlyRenderVisibleElements,
		onEdgeContextMenu,
		onEdgeMouseEnter,
		onEdgeMouseMove,
		onEdgeMouseLeave,
		onReconnect,
		onReconnectStart,
		onReconnectEnd,
		reconnectRadius,
		defaultMarkerColor,
		noPanClassName,
		elevateEdgesOnSelect: !!elevateEdgesOnSelect,
		disableKeyboardA11y,
		rfId
	}, react.default.createElement(ConnectionLineWrapper, {
		style: connectionLineStyle,
		type: connectionLineType,
		component: connectionLineComponent,
		containerStyle: connectionLineContainerStyle
	})), react.default.createElement("div", { className: "react-flow__edgelabel-renderer" }), react.default.createElement(NodeRenderer$1, {
		nodeTypes: nodeTypesWrapped,
		onNodeClick,
		onNodeDoubleClick,
		onNodeMouseEnter,
		onNodeMouseMove,
		onNodeMouseLeave,
		onNodeContextMenu,
		selectNodesOnDrag,
		onlyRenderVisibleElements,
		noPanClassName,
		noDragClassName,
		disableKeyboardA11y,
		nodeOrigin,
		nodeExtent,
		rfId
	})));
};
GraphView.displayName = "GraphView";
var GraphView$1 = (0, react.memo)(GraphView);
const infiniteExtent = [[Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY], [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]];
const initialState = {
	rfId: "1",
	width: 0,
	height: 0,
	transform: [
		0,
		0,
		1
	],
	nodeInternals: /* @__PURE__ */ new Map(),
	edges: [],
	onNodesChange: null,
	onEdgesChange: null,
	hasDefaultNodes: false,
	hasDefaultEdges: false,
	d3Zoom: null,
	d3Selection: null,
	d3ZoomHandler: void 0,
	minZoom: .5,
	maxZoom: 2,
	translateExtent: infiniteExtent,
	nodeExtent: infiniteExtent,
	nodesSelectionActive: false,
	userSelectionActive: false,
	userSelectionRect: null,
	connectionNodeId: null,
	connectionHandleId: null,
	connectionHandleType: "source",
	connectionPosition: {
		x: 0,
		y: 0
	},
	connectionStatus: null,
	connectionMode: ConnectionMode.Strict,
	domNode: null,
	paneDragging: false,
	noPanClassName: "nopan",
	nodeOrigin: [0, 0],
	nodeDragThreshold: 0,
	snapGrid: [15, 15],
	snapToGrid: false,
	nodesDraggable: true,
	nodesConnectable: true,
	nodesFocusable: true,
	edgesFocusable: true,
	edgesUpdatable: true,
	elementsSelectable: true,
	elevateNodesOnSelect: true,
	fitViewOnInit: false,
	fitViewOnInitDone: false,
	fitViewOnInitOptions: void 0,
	onSelectionChange: [],
	multiSelectionActive: false,
	connectionStartHandle: null,
	connectionEndHandle: null,
	connectionClickStartHandle: null,
	connectOnClick: true,
	ariaLiveMessage: "",
	autoPanOnConnect: true,
	autoPanOnNodeDrag: true,
	connectionRadius: 20,
	onError: devWarn,
	isValidConnection: void 0
};
const createRFStore = () => createWithEqualityFn((set, get) => ({
	...initialState,
	setNodes: (nodes) => {
		const { nodeInternals, nodeOrigin, elevateNodesOnSelect } = get();
		set({ nodeInternals: createNodeInternals(nodes, nodeInternals, nodeOrigin, elevateNodesOnSelect) });
	},
	getNodes: () => {
		return Array.from(get().nodeInternals.values());
	},
	setEdges: (edges) => {
		const { defaultEdgeOptions = {} } = get();
		set({ edges: edges.map((e) => ({
			...defaultEdgeOptions,
			...e
		})) });
	},
	setDefaultNodesAndEdges: (nodes, edges) => {
		const hasDefaultNodes = typeof nodes !== "undefined";
		const hasDefaultEdges = typeof edges !== "undefined";
		set({
			nodeInternals: hasDefaultNodes ? createNodeInternals(nodes, /* @__PURE__ */ new Map(), get().nodeOrigin, get().elevateNodesOnSelect) : /* @__PURE__ */ new Map(),
			edges: hasDefaultEdges ? edges : [],
			hasDefaultNodes,
			hasDefaultEdges
		});
	},
	updateNodeDimensions: (updates) => {
		const { onNodesChange, nodeInternals, fitViewOnInit, fitViewOnInitDone, fitViewOnInitOptions, domNode, nodeOrigin } = get();
		const viewportNode = domNode?.querySelector(".react-flow__viewport");
		if (!viewportNode) return;
		const style = window.getComputedStyle(viewportNode);
		const { m22: zoom } = new window.DOMMatrixReadOnly(style.transform);
		const changes = updates.reduce((res, update) => {
			const node = nodeInternals.get(update.id);
			if (node?.hidden) nodeInternals.set(node.id, {
				...node,
				[internalsSymbol]: {
					...node[internalsSymbol],
					handleBounds: void 0
				}
			});
			else if (node) {
				const dimensions = getDimensions(update.nodeElement);
				if (!!(dimensions.width && dimensions.height && (node.width !== dimensions.width || node.height !== dimensions.height || update.forceUpdate))) {
					nodeInternals.set(node.id, {
						...node,
						[internalsSymbol]: {
							...node[internalsSymbol],
							handleBounds: {
								source: getHandleBounds(".source", update.nodeElement, zoom, nodeOrigin),
								target: getHandleBounds(".target", update.nodeElement, zoom, nodeOrigin)
							}
						},
						...dimensions
					});
					res.push({
						id: node.id,
						type: "dimensions",
						dimensions
					});
				}
			}
			return res;
		}, []);
		updateAbsoluteNodePositions(nodeInternals, nodeOrigin);
		const nextFitViewOnInitDone = fitViewOnInitDone || fitViewOnInit && !fitViewOnInitDone && fitView(get, {
			initial: true,
			...fitViewOnInitOptions
		});
		set({
			nodeInternals: new Map(nodeInternals),
			fitViewOnInitDone: nextFitViewOnInitDone
		});
		if (changes?.length > 0) onNodesChange?.(changes);
	},
	updateNodePositions: (nodeDragItems, positionChanged = true, dragging = false) => {
		const { triggerNodeChanges } = get();
		triggerNodeChanges(nodeDragItems.map((node) => {
			const change = {
				id: node.id,
				type: "position",
				dragging
			};
			if (positionChanged) {
				change.positionAbsolute = node.positionAbsolute;
				change.position = node.position;
			}
			return change;
		}));
	},
	triggerNodeChanges: (changes) => {
		const { onNodesChange, nodeInternals, hasDefaultNodes, nodeOrigin, getNodes, elevateNodesOnSelect } = get();
		if (changes?.length) {
			if (hasDefaultNodes) set({ nodeInternals: createNodeInternals(applyNodeChanges(changes, getNodes()), nodeInternals, nodeOrigin, elevateNodesOnSelect) });
			onNodesChange?.(changes);
		}
	},
	addSelectedNodes: (selectedNodeIds) => {
		const { multiSelectionActive, edges, getNodes } = get();
		let changedNodes;
		let changedEdges = null;
		if (multiSelectionActive) changedNodes = selectedNodeIds.map((nodeId) => createSelectionChange(nodeId, true));
		else {
			changedNodes = getSelectionChanges(getNodes(), selectedNodeIds);
			changedEdges = getSelectionChanges(edges, []);
		}
		updateNodesAndEdgesSelections({
			changedNodes,
			changedEdges,
			get,
			set
		});
	},
	addSelectedEdges: (selectedEdgeIds) => {
		const { multiSelectionActive, edges, getNodes } = get();
		let changedEdges;
		let changedNodes = null;
		if (multiSelectionActive) changedEdges = selectedEdgeIds.map((edgeId) => createSelectionChange(edgeId, true));
		else {
			changedEdges = getSelectionChanges(edges, selectedEdgeIds);
			changedNodes = getSelectionChanges(getNodes(), []);
		}
		updateNodesAndEdgesSelections({
			changedNodes,
			changedEdges,
			get,
			set
		});
	},
	unselectNodesAndEdges: ({ nodes, edges } = {}) => {
		const { edges: storeEdges, getNodes } = get();
		const nodesToUnselect = nodes ? nodes : getNodes();
		const edgesToUnselect = edges ? edges : storeEdges;
		updateNodesAndEdgesSelections({
			changedNodes: nodesToUnselect.map((n) => {
				n.selected = false;
				return createSelectionChange(n.id, false);
			}),
			changedEdges: edgesToUnselect.map((edge) => createSelectionChange(edge.id, false)),
			get,
			set
		});
	},
	setMinZoom: (minZoom) => {
		const { d3Zoom, maxZoom } = get();
		d3Zoom?.scaleExtent([minZoom, maxZoom]);
		set({ minZoom });
	},
	setMaxZoom: (maxZoom) => {
		const { d3Zoom, minZoom } = get();
		d3Zoom?.scaleExtent([minZoom, maxZoom]);
		set({ maxZoom });
	},
	setTranslateExtent: (translateExtent) => {
		get().d3Zoom?.translateExtent(translateExtent);
		set({ translateExtent });
	},
	resetSelectedElements: () => {
		const { edges, getNodes } = get();
		updateNodesAndEdgesSelections({
			changedNodes: getNodes().filter((e) => e.selected).map((n) => createSelectionChange(n.id, false)),
			changedEdges: edges.filter((e) => e.selected).map((e) => createSelectionChange(e.id, false)),
			get,
			set
		});
	},
	setNodeExtent: (nodeExtent) => {
		const { nodeInternals } = get();
		nodeInternals.forEach((node) => {
			node.positionAbsolute = clampPosition(node.position, nodeExtent);
		});
		set({
			nodeExtent,
			nodeInternals: new Map(nodeInternals)
		});
	},
	panBy: (delta) => {
		const { transform, width, height, d3Zoom, d3Selection, translateExtent } = get();
		if (!d3Zoom || !d3Selection || !delta.x && !delta.y) return false;
		const nextTransform = identity.translate(transform[0] + delta.x, transform[1] + delta.y).scale(transform[2]);
		const extent = [[0, 0], [width, height]];
		const constrainedTransform = d3Zoom?.constrain()(nextTransform, extent, translateExtent);
		d3Zoom.transform(d3Selection, constrainedTransform);
		return transform[0] !== constrainedTransform.x || transform[1] !== constrainedTransform.y || transform[2] !== constrainedTransform.k;
	},
	cancelConnection: () => set({
		connectionNodeId: initialState.connectionNodeId,
		connectionHandleId: initialState.connectionHandleId,
		connectionHandleType: initialState.connectionHandleType,
		connectionStatus: initialState.connectionStatus,
		connectionStartHandle: initialState.connectionStartHandle,
		connectionEndHandle: initialState.connectionEndHandle
	}),
	reset: () => set({ ...initialState })
}), Object.is);
const ReactFlowProvider = ({ children }) => {
	const storeRef = (0, react.useRef)(null);
	if (!storeRef.current) storeRef.current = createRFStore();
	return react.default.createElement(Provider$1, { value: storeRef.current }, children);
};
ReactFlowProvider.displayName = "ReactFlowProvider";
const Wrapper = ({ children }) => {
	if ((0, react.useContext)(StoreContext)) return react.default.createElement(react.default.Fragment, null, children);
	return react.default.createElement(ReactFlowProvider, null, children);
};
Wrapper.displayName = "ReactFlowWrapper";
const defaultNodeTypes = {
	input: InputNode$1,
	default: DefaultNode$1,
	output: OutputNode$1,
	group: GroupNode
};
const defaultEdgeTypes = {
	default: BezierEdge,
	straight: StraightEdge,
	step: StepEdge,
	smoothstep: SmoothStepEdge,
	simplebezier: SimpleBezierEdge
};
const initNodeOrigin = [0, 0];
const initSnapGrid = [15, 15];
const initDefaultViewport = {
	x: 0,
	y: 0,
	zoom: 1
};
const wrapperStyle = {
	width: "100%",
	height: "100%",
	overflow: "hidden",
	position: "relative",
	zIndex: 0
};
const ReactFlow = (0, react.forwardRef)(({ nodes, edges, defaultNodes, defaultEdges, className, nodeTypes = defaultNodeTypes, edgeTypes = defaultEdgeTypes, onNodeClick, onEdgeClick, onInit, onMove, onMoveStart, onMoveEnd, onConnect, onConnectStart, onConnectEnd, onClickConnectStart, onClickConnectEnd, onNodeMouseEnter, onNodeMouseMove, onNodeMouseLeave, onNodeContextMenu, onNodeDoubleClick, onNodeDragStart, onNodeDrag, onNodeDragStop, onNodesDelete, onEdgesDelete, onSelectionChange, onSelectionDragStart, onSelectionDrag, onSelectionDragStop, onSelectionContextMenu, onSelectionStart, onSelectionEnd, connectionMode = ConnectionMode.Strict, connectionLineType = ConnectionLineType.Bezier, connectionLineStyle, connectionLineComponent, connectionLineContainerStyle, deleteKeyCode = "Backspace", selectionKeyCode = "Shift", selectionOnDrag = false, selectionMode = SelectionMode.Full, panActivationKeyCode = "Space", multiSelectionKeyCode = isMacOs() ? "Meta" : "Control", zoomActivationKeyCode = isMacOs() ? "Meta" : "Control", snapToGrid = false, snapGrid = initSnapGrid, onlyRenderVisibleElements = false, selectNodesOnDrag = true, nodesDraggable, nodesConnectable, nodesFocusable, nodeOrigin = initNodeOrigin, edgesFocusable, edgesUpdatable, elementsSelectable, defaultViewport = initDefaultViewport, minZoom = .5, maxZoom = 2, translateExtent = infiniteExtent, preventScrolling = true, nodeExtent, defaultMarkerColor = "#b1b1b7", zoomOnScroll = true, zoomOnPinch = true, panOnScroll = false, panOnScrollSpeed = .5, panOnScrollMode = PanOnScrollMode.Free, zoomOnDoubleClick = true, panOnDrag = true, onPaneClick, onPaneMouseEnter, onPaneMouseMove, onPaneMouseLeave, onPaneScroll, onPaneContextMenu, children, onEdgeContextMenu, onEdgeDoubleClick, onEdgeMouseEnter, onEdgeMouseMove, onEdgeMouseLeave, onEdgeUpdate, onEdgeUpdateStart, onEdgeUpdateEnd, onReconnect, onReconnectStart, onReconnectEnd, reconnectRadius = 10, edgeUpdaterRadius = 10, onNodesChange, onEdgesChange, noDragClassName = "nodrag", noWheelClassName = "nowheel", noPanClassName = "nopan", fitView = false, fitViewOptions, connectOnClick = true, attributionPosition, proOptions, defaultEdgeOptions, elevateNodesOnSelect = true, elevateEdgesOnSelect = false, disableKeyboardA11y = false, autoPanOnConnect = true, autoPanOnNodeDrag = true, connectionRadius = 20, isValidConnection, onError, style, id, nodeDragThreshold, ...rest }, ref) => {
	const rfId = id || "1";
	return react.default.createElement("div", {
		...rest,
		style: {
			...style,
			...wrapperStyle
		},
		ref,
		className: cc(["react-flow", className]),
		"data-testid": "rf__wrapper",
		id
	}, react.default.createElement(Wrapper, null, react.default.createElement(GraphView$1, {
		onInit,
		onMove,
		onMoveStart,
		onMoveEnd,
		onNodeClick,
		onEdgeClick,
		onNodeMouseEnter,
		onNodeMouseMove,
		onNodeMouseLeave,
		onNodeContextMenu,
		onNodeDoubleClick,
		nodeTypes,
		edgeTypes,
		connectionLineType,
		connectionLineStyle,
		connectionLineComponent,
		connectionLineContainerStyle,
		selectionKeyCode,
		selectionOnDrag,
		selectionMode,
		deleteKeyCode,
		multiSelectionKeyCode,
		panActivationKeyCode,
		zoomActivationKeyCode,
		onlyRenderVisibleElements,
		selectNodesOnDrag,
		defaultViewport,
		translateExtent,
		minZoom,
		maxZoom,
		preventScrolling,
		zoomOnScroll,
		zoomOnPinch,
		zoomOnDoubleClick,
		panOnScroll,
		panOnScrollSpeed,
		panOnScrollMode,
		panOnDrag,
		onPaneClick,
		onPaneMouseEnter,
		onPaneMouseMove,
		onPaneMouseLeave,
		onPaneScroll,
		onPaneContextMenu,
		onSelectionContextMenu,
		onSelectionStart,
		onSelectionEnd,
		onEdgeContextMenu,
		onEdgeDoubleClick,
		onEdgeMouseEnter,
		onEdgeMouseMove,
		onEdgeMouseLeave,
		onReconnect: onReconnect ?? onEdgeUpdate,
		onReconnectStart: onReconnectStart ?? onEdgeUpdateStart,
		onReconnectEnd: onReconnectEnd ?? onEdgeUpdateEnd,
		reconnectRadius: reconnectRadius ?? edgeUpdaterRadius,
		defaultMarkerColor,
		noDragClassName,
		noWheelClassName,
		noPanClassName,
		elevateEdgesOnSelect,
		rfId,
		disableKeyboardA11y,
		nodeOrigin,
		nodeExtent
	}), react.default.createElement(StoreUpdater, {
		nodes,
		edges,
		defaultNodes,
		defaultEdges,
		onConnect,
		onConnectStart,
		onConnectEnd,
		onClickConnectStart,
		onClickConnectEnd,
		nodesDraggable,
		nodesConnectable,
		nodesFocusable,
		edgesFocusable,
		edgesUpdatable,
		elementsSelectable,
		elevateNodesOnSelect,
		minZoom,
		maxZoom,
		nodeExtent,
		onNodesChange,
		onEdgesChange,
		snapToGrid,
		snapGrid,
		connectionMode,
		translateExtent,
		connectOnClick,
		defaultEdgeOptions,
		fitView,
		fitViewOptions,
		onNodesDelete,
		onEdgesDelete,
		onNodeDragStart,
		onNodeDrag,
		onNodeDragStop,
		onSelectionDrag,
		onSelectionDragStart,
		onSelectionDragStop,
		noPanClassName,
		nodeOrigin,
		rfId,
		autoPanOnConnect,
		autoPanOnNodeDrag,
		onError,
		connectionRadius,
		isValidConnection,
		nodeDragThreshold
	}), react.default.createElement(Wrapper$1, { onSelectionChange }), children, react.default.createElement(Attribution, {
		proOptions,
		position: attributionPosition
	}), react.default.createElement(A11yDescriptions, {
		rfId,
		disableKeyboardA11y
	})));
});
ReactFlow.displayName = "ReactFlow";
//#endregion
//#region ../../node_modules/.pnpm/@reactflow+minimap@11.7.14_@types+react@18.3.31_immer@10.2.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@reactflow/minimap/dist/esm/index.mjs
const MiniMapNode = ({ id, x, y, width, height, style, color, strokeColor, strokeWidth, className, borderRadius, shapeRendering, onClick, selected }) => {
	const { background, backgroundColor } = style || {};
	const fill = color || background || backgroundColor;
	return react.default.createElement("rect", {
		className: cc([
			"react-flow__minimap-node",
			{ selected },
			className
		]),
		x,
		y,
		rx: borderRadius,
		ry: borderRadius,
		width,
		height,
		fill,
		stroke: strokeColor,
		strokeWidth,
		shapeRendering,
		onClick: onClick ? (event) => onClick(event, id) : void 0
	});
};
MiniMapNode.displayName = "MiniMapNode";
var MiniMapNode$1 = (0, react.memo)(MiniMapNode);
const selector$1$1 = (s) => s.nodeOrigin;
const selectorNodes = (s) => s.getNodes().filter((node) => !node.hidden && node.width && node.height);
const getAttrFunction = (func) => func instanceof Function ? func : () => func;
function MiniMapNodes({ nodeStrokeColor = "transparent", nodeColor = "#e2e2e2", nodeClassName = "", nodeBorderRadius = 5, nodeStrokeWidth = 2, nodeComponent: NodeComponent = MiniMapNode$1, onClick }) {
	const nodes = useStore(selectorNodes, shallow$1);
	const nodeOrigin = useStore(selector$1$1);
	const nodeColorFunc = getAttrFunction(nodeColor);
	const nodeStrokeColorFunc = getAttrFunction(nodeStrokeColor);
	const nodeClassNameFunc = getAttrFunction(nodeClassName);
	const shapeRendering = typeof window === "undefined" || !!window.chrome ? "crispEdges" : "geometricPrecision";
	return react.default.createElement(react.default.Fragment, null, nodes.map((node) => {
		const { x, y } = getNodePositionWithOrigin(node, nodeOrigin).positionAbsolute;
		return react.default.createElement(NodeComponent, {
			key: node.id,
			x,
			y,
			width: node.width,
			height: node.height,
			style: node.style,
			selected: node.selected,
			className: nodeClassNameFunc(node),
			color: nodeColorFunc(node),
			borderRadius: nodeBorderRadius,
			strokeColor: nodeStrokeColorFunc(node),
			strokeWidth: nodeStrokeWidth,
			shapeRendering,
			onClick,
			id: node.id
		});
	}));
}
var MiniMapNodes$1 = (0, react.memo)(MiniMapNodes);
const defaultWidth = 200;
const defaultHeight = 150;
const selector$2 = (s) => {
	const nodes = s.getNodes();
	const viewBB = {
		x: -s.transform[0] / s.transform[2],
		y: -s.transform[1] / s.transform[2],
		width: s.width / s.transform[2],
		height: s.height / s.transform[2]
	};
	return {
		viewBB,
		boundingRect: nodes.length > 0 ? getBoundsOfRects(getNodesBounds(nodes, s.nodeOrigin), viewBB) : viewBB,
		rfId: s.rfId
	};
};
const ARIA_LABEL_KEY = "react-flow__minimap-desc";
function MiniMap({ style, className, nodeStrokeColor = "transparent", nodeColor = "#e2e2e2", nodeClassName = "", nodeBorderRadius = 5, nodeStrokeWidth = 2, nodeComponent, maskColor = "rgb(240, 240, 240, 0.6)", maskStrokeColor = "none", maskStrokeWidth = 1, position = "bottom-right", onClick, onNodeClick, pannable = false, zoomable = false, ariaLabel = "React Flow mini map", inversePan = false, zoomStep = 10, offsetScale = 5 }) {
	const store = useStoreApi();
	const svg = (0, react.useRef)(null);
	const { boundingRect, viewBB, rfId } = useStore(selector$2, shallow$1);
	const elementWidth = style?.width ?? defaultWidth;
	const elementHeight = style?.height ?? defaultHeight;
	const scaledWidth = boundingRect.width / elementWidth;
	const scaledHeight = boundingRect.height / elementHeight;
	const viewScale = Math.max(scaledWidth, scaledHeight);
	const viewWidth = viewScale * elementWidth;
	const viewHeight = viewScale * elementHeight;
	const offset = offsetScale * viewScale;
	const x = boundingRect.x - (viewWidth - boundingRect.width) / 2 - offset;
	const y = boundingRect.y - (viewHeight - boundingRect.height) / 2 - offset;
	const width = viewWidth + offset * 2;
	const height = viewHeight + offset * 2;
	const labelledBy = `${ARIA_LABEL_KEY}-${rfId}`;
	const viewScaleRef = (0, react.useRef)(0);
	viewScaleRef.current = viewScale;
	(0, react.useEffect)(() => {
		if (svg.current) {
			const selection = select_default$1(svg.current);
			const zoomHandler = (event) => {
				const { transform, d3Selection, d3Zoom } = store.getState();
				if (event.sourceEvent.type !== "wheel" || !d3Selection || !d3Zoom) return;
				const pinchDelta = -event.sourceEvent.deltaY * (event.sourceEvent.deltaMode === 1 ? .05 : event.sourceEvent.deltaMode ? 1 : .002) * zoomStep;
				const zoom = transform[2] * Math.pow(2, pinchDelta);
				d3Zoom.scaleTo(d3Selection, zoom);
			};
			const panHandler = (event) => {
				const { transform, d3Selection, d3Zoom, translateExtent, width, height } = store.getState();
				if (event.sourceEvent.type !== "mousemove" || !d3Selection || !d3Zoom) return;
				const moveScale = viewScaleRef.current * Math.max(1, transform[2]) * (inversePan ? -1 : 1);
				const position = {
					x: transform[0] - event.sourceEvent.movementX * moveScale,
					y: transform[1] - event.sourceEvent.movementY * moveScale
				};
				const extent = [[0, 0], [width, height]];
				const nextTransform = identity.translate(position.x, position.y).scale(transform[2]);
				const constrainedTransform = d3Zoom.constrain()(nextTransform, extent, translateExtent);
				d3Zoom.transform(d3Selection, constrainedTransform);
			};
			const zoomAndPanHandler = zoom_default().on("zoom", pannable ? panHandler : null).on("zoom.wheel", zoomable ? zoomHandler : null);
			selection.call(zoomAndPanHandler);
			return () => {
				selection.on("zoom", null);
			};
		}
	}, [
		pannable,
		zoomable,
		inversePan,
		zoomStep
	]);
	const onSvgClick = onClick ? (event) => {
		const rfCoord = pointer_default(event);
		onClick(event, {
			x: rfCoord[0],
			y: rfCoord[1]
		});
	} : void 0;
	const onSvgNodeClick = onNodeClick ? (event, nodeId) => {
		onNodeClick(event, store.getState().nodeInternals.get(nodeId));
	} : void 0;
	return react.default.createElement(Panel, {
		position,
		style,
		className: cc(["react-flow__minimap", className]),
		"data-testid": "rf__minimap"
	}, react.default.createElement("svg", {
		width: elementWidth,
		height: elementHeight,
		viewBox: `${x} ${y} ${width} ${height}`,
		role: "img",
		"aria-labelledby": labelledBy,
		ref: svg,
		onClick: onSvgClick
	}, ariaLabel && react.default.createElement("title", { id: labelledBy }, ariaLabel), react.default.createElement(MiniMapNodes$1, {
		onClick: onSvgNodeClick,
		nodeColor,
		nodeStrokeColor,
		nodeBorderRadius,
		nodeClassName,
		nodeStrokeWidth,
		nodeComponent
	}), react.default.createElement("path", {
		className: "react-flow__minimap-mask",
		d: `M${x - offset},${y - offset}h${width + offset * 2}v${height + offset * 2}h${-width - offset * 2}z
        M${viewBB.x},${viewBB.y}h${viewBB.width}v${viewBB.height}h${-viewBB.width}z`,
		fill: maskColor,
		fillRule: "evenodd",
		stroke: maskStrokeColor,
		strokeWidth: maskStrokeWidth,
		pointerEvents: "none"
	})));
}
MiniMap.displayName = "MiniMap";
var MiniMap$1 = (0, react.memo)(MiniMap);
//#endregion
//#region ../../node_modules/.pnpm/@reactflow+controls@11.2.14_@types+react@18.3.31_immer@10.2.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@reactflow/controls/dist/esm/index.mjs
function PlusIcon() {
	return react.default.createElement("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 32 32"
	}, react.default.createElement("path", { d: "M32 18.133H18.133V32h-4.266V18.133H0v-4.266h13.867V0h4.266v13.867H32z" }));
}
function MinusIcon() {
	return react.default.createElement("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 32 5"
	}, react.default.createElement("path", { d: "M0 0h32v4.2H0z" }));
}
function FitViewIcon() {
	return react.default.createElement("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 32 30"
	}, react.default.createElement("path", { d: "M3.692 4.63c0-.53.4-.938.939-.938h5.215V0H4.708C2.13 0 0 2.054 0 4.63v5.216h3.692V4.631zM27.354 0h-5.2v3.692h5.17c.53 0 .984.4.984.939v5.215H32V4.631A4.624 4.624 0 0027.354 0zm.954 24.83c0 .532-.4.94-.939.94h-5.215v3.768h5.215c2.577 0 4.631-2.13 4.631-4.707v-5.139h-3.692v5.139zm-23.677.94c-.531 0-.939-.4-.939-.94v-5.138H0v5.139c0 2.577 2.13 4.707 4.708 4.707h5.138V25.77H4.631z" }));
}
function LockIcon() {
	return react.default.createElement("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 25 32"
	}, react.default.createElement("path", { d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0 8 0 4.571 3.429 4.571 7.619v3.048H3.048A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047zm4.724-13.866H7.467V7.619c0-2.59 2.133-4.724 4.723-4.724 2.591 0 4.724 2.133 4.724 4.724v3.048z" }));
}
function UnlockIcon() {
	return react.default.createElement("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 25 32"
	}, react.default.createElement("path", { d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0c-4.114 1.828-1.37 2.133.305 2.438 1.676.305 4.42 2.59 4.42 5.181v3.048H3.047A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047z" }));
}
const ControlButton = ({ children, className, ...rest }) => react.default.createElement("button", {
	type: "button",
	className: cc(["react-flow__controls-button", className]),
	...rest
}, children);
ControlButton.displayName = "ControlButton";
const selector$1 = (s) => ({
	isInteractive: s.nodesDraggable || s.nodesConnectable || s.elementsSelectable,
	minZoomReached: s.transform[2] <= s.minZoom,
	maxZoomReached: s.transform[2] >= s.maxZoom
});
const Controls = ({ style, showZoom = true, showFitView = true, showInteractive = true, fitViewOptions, onZoomIn, onZoomOut, onFitView, onInteractiveChange, className, children, position = "bottom-left" }) => {
	const store = useStoreApi();
	const [isVisible, setIsVisible] = (0, react.useState)(false);
	const { isInteractive, minZoomReached, maxZoomReached } = useStore(selector$1, shallow$1);
	const { zoomIn, zoomOut, fitView } = useReactFlow();
	(0, react.useEffect)(() => {
		setIsVisible(true);
	}, []);
	if (!isVisible) return null;
	const onZoomInHandler = () => {
		zoomIn();
		onZoomIn?.();
	};
	const onZoomOutHandler = () => {
		zoomOut();
		onZoomOut?.();
	};
	const onFitViewHandler = () => {
		fitView(fitViewOptions);
		onFitView?.();
	};
	const onToggleInteractivity = () => {
		store.setState({
			nodesDraggable: !isInteractive,
			nodesConnectable: !isInteractive,
			elementsSelectable: !isInteractive
		});
		onInteractiveChange?.(!isInteractive);
	};
	return react.default.createElement(Panel, {
		className: cc(["react-flow__controls", className]),
		position,
		style,
		"data-testid": "rf__controls"
	}, showZoom && react.default.createElement(react.default.Fragment, null, react.default.createElement(ControlButton, {
		onClick: onZoomInHandler,
		className: "react-flow__controls-zoomin",
		title: "zoom in",
		"aria-label": "zoom in",
		disabled: maxZoomReached
	}, react.default.createElement(PlusIcon, null)), react.default.createElement(ControlButton, {
		onClick: onZoomOutHandler,
		className: "react-flow__controls-zoomout",
		title: "zoom out",
		"aria-label": "zoom out",
		disabled: minZoomReached
	}, react.default.createElement(MinusIcon, null))), showFitView && react.default.createElement(ControlButton, {
		className: "react-flow__controls-fitview",
		onClick: onFitViewHandler,
		title: "fit view",
		"aria-label": "fit view"
	}, react.default.createElement(FitViewIcon, null)), showInteractive && react.default.createElement(ControlButton, {
		className: "react-flow__controls-interactive",
		onClick: onToggleInteractivity,
		title: "toggle interactivity",
		"aria-label": "toggle interactivity"
	}, isInteractive ? react.default.createElement(UnlockIcon, null) : react.default.createElement(LockIcon, null)), children);
};
Controls.displayName = "Controls";
var Controls$1 = (0, react.memo)(Controls);
//#endregion
//#region ../../node_modules/.pnpm/@reactflow+background@11.3.14_@types+react@18.3.31_immer@10.2.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@reactflow/background/dist/esm/index.mjs
var BackgroundVariant;
(function(BackgroundVariant) {
	BackgroundVariant["Lines"] = "lines";
	BackgroundVariant["Dots"] = "dots";
	BackgroundVariant["Cross"] = "cross";
})(BackgroundVariant || (BackgroundVariant = {}));
function LinePattern({ color, dimensions, lineWidth }) {
	return react.default.createElement("path", {
		stroke: color,
		strokeWidth: lineWidth,
		d: `M${dimensions[0] / 2} 0 V${dimensions[1]} M0 ${dimensions[1] / 2} H${dimensions[0]}`
	});
}
function DotPattern({ color, radius }) {
	return react.default.createElement("circle", {
		cx: radius,
		cy: radius,
		r: radius,
		fill: color
	});
}
const defaultColor = {
	[BackgroundVariant.Dots]: "#91919a",
	[BackgroundVariant.Lines]: "#eee",
	[BackgroundVariant.Cross]: "#e2e2e2"
};
const defaultSize = {
	[BackgroundVariant.Dots]: 1,
	[BackgroundVariant.Lines]: 1,
	[BackgroundVariant.Cross]: 6
};
const selector = (s) => ({
	transform: s.transform,
	patternId: `pattern-${s.rfId}`
});
function Background({ id, variant = BackgroundVariant.Dots, gap = 20, size, lineWidth = 1, offset = 2, color, style, className }) {
	const ref = (0, react.useRef)(null);
	const { transform, patternId } = useStore(selector, shallow$1);
	const patternColor = color || defaultColor[variant];
	const patternSize = size || defaultSize[variant];
	const isDots = variant === BackgroundVariant.Dots;
	const isCross = variant === BackgroundVariant.Cross;
	const gapXY = Array.isArray(gap) ? gap : [gap, gap];
	const scaledGap = [gapXY[0] * transform[2] || 1, gapXY[1] * transform[2] || 1];
	const scaledSize = patternSize * transform[2];
	const patternDimensions = isCross ? [scaledSize, scaledSize] : scaledGap;
	const patternOffset = isDots ? [scaledSize / offset, scaledSize / offset] : [patternDimensions[0] / offset, patternDimensions[1] / offset];
	return react.default.createElement("svg", {
		className: cc(["react-flow__background", className]),
		style: {
			...style,
			position: "absolute",
			width: "100%",
			height: "100%",
			top: 0,
			left: 0
		},
		ref,
		"data-testid": "rf__background"
	}, react.default.createElement("pattern", {
		id: patternId + id,
		x: transform[0] % scaledGap[0],
		y: transform[1] % scaledGap[1],
		width: scaledGap[0],
		height: scaledGap[1],
		patternUnits: "userSpaceOnUse",
		patternTransform: `translate(-${patternOffset[0]},-${patternOffset[1]})`
	}, isDots ? react.default.createElement(DotPattern, {
		color: patternColor,
		radius: scaledSize / offset
	}) : react.default.createElement(LinePattern, {
		dimensions: patternDimensions,
		color: patternColor,
		lineWidth
	})), react.default.createElement("rect", {
		x: "0",
		y: "0",
		width: "100%",
		height: "100%",
		fill: `url(#${patternId + id})`
	}));
}
Background.displayName = "Background";
var Background$1 = (0, react.memo)(Background);
//#endregion
//#region src/client/status.ts
/** Chinese labels for node status, shown on the card and in the legend. */
const STATUS_LABEL = {
	pending: "等待中",
	ready: "就绪",
	running: "执行中",
	expanded: "已展开",
	done: "已完成",
	failed: "失败",
	skipped: "已跳过"
};
/** Statuses that mean "this node will not run again". */
const TERMINAL = ["done", "skipped"];
/** Rough progress fraction for the header meter. */
function progressOf(statuses) {
	if (statuses.length === 0) return 0;
	return statuses.filter((status) => TERMINAL.includes(status)).length / statuses.length;
}
//#endregion
//#region \0dsh-css:/Users/jiahaoqian/proj/DSH-Plugs/plugins/dsh-flow/src/client/FlowCanvas.module.css.mjs
const css = "._6XW97a_3f2b7d_wrap{box-sizing:border-box;background:var(--dsw-alias-bg-base);height:100%;min-height:0;color:var(--dsw-alias-label-primary);flex-direction:column;gap:10px;padding:16px 18px;display:flex}._6XW97a_3f2b7d_header{flex-direction:column;flex:none;gap:8px;display:flex}._6XW97a_3f2b7d_titleRow{align-items:center;gap:10px;display:flex}._6XW97a_3f2b7d_title{color:var(--dsw-alias-label-primary);margin:0;font-size:15px;font-weight:600}._6XW97a_3f2b7d_badge{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-secondary);border-radius:999px;padding:1px 8px;font-size:11px;line-height:18px}._6XW97a_3f2b7d_badge[data-status=running]{border-color:var(--dsw-alias-state-business-primary);color:var(--dsw-alias-state-business-primary)}._6XW97a_3f2b7d_badge[data-status=settled]{border-color:var(--dsw-alias-state-success-primary);color:var(--dsw-alias-state-success-primary)}._6XW97a_3f2b7d_modeToggle{border:1px solid var(--dsw-alias-border-l3);color:var(--dsw-alias-label-secondary);cursor:pointer;background:0 0;border-radius:6px;margin-left:auto;padding:2px 9px;font-size:11px;line-height:18px}._6XW97a_3f2b7d_modeToggle:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}._6XW97a_3f2b7d_emptyActions{gap:8px;margin-top:4px;display:flex}._6XW97a_3f2b7d_meter{background:var(--dsw-alias-bg-skeleton);border-radius:2px;height:3px;overflow:hidden}._6XW97a_3f2b7d_meterFill{background:var(--dsw-alias-state-success-primary);height:100%;transition:width .2s ease-out}._6XW97a_3f2b7d_concurrencyRow{align-items:center;gap:8px;display:flex}._6XW97a_3f2b7d_concurrencyLabel{color:var(--dsw-alias-label-secondary);font-size:11px}._6XW97a_3f2b7d_concurrencyInput{border:1px solid var(--dsw-alias-border-secondary);background:var(--dsw-alias-bg-base);width:52px;color:var(--dsw-alias-label-primary);border-radius:6px;padding:2px 6px;font-size:11px}._6XW97a_3f2b7d_concurrencyHint{color:var(--dsw-alias-label-caption);font-size:11px}._6XW97a_3f2b7d_legend{color:var(--dsw-alias-label-tertiary);flex-wrap:wrap;gap:12px;font-size:11px;display:flex}._6XW97a_3f2b7d_legendItem{align-items:center;gap:5px;display:inline-flex}._6XW97a_3f2b7d_confirmBar{border:1px solid var(--dsw-alias-state-business-tertiary);background:var(--dsw-alias-interactive-bg-hover);border-radius:8px;align-items:center;gap:12px;padding:8px 10px;display:flex}._6XW97a_3f2b7d_confirmText{color:var(--dsw-alias-label-primary);flex:auto;margin:0;font-size:12px;line-height:1.5}._6XW97a_3f2b7d_statusDot{background:var(--dsw-alias-label-caption);border-radius:50%;flex:none;width:8px;height:8px}._6XW97a_3f2b7d_statusDot[data-status=pending]{background:var(--dsw-alias-label-caption)}._6XW97a_3f2b7d_statusDot[data-status=ready]{background:var(--dsw-alias-state-warn-primary)}._6XW97a_3f2b7d_statusDot[data-status=running]{background:var(--dsw-alias-state-business-primary);animation:1.2s ease-in-out infinite _6XW97a_3f2b7d_flowPulse}._6XW97a_3f2b7d_statusDot[data-status=expanded]{background:var(--dsw-alias-state-business-primary)}._6XW97a_3f2b7d_statusDot[data-status=done]{background:var(--dsw-alias-state-success-primary)}._6XW97a_3f2b7d_statusDot[data-status=failed]{background:var(--dsw-alias-state-error-primary)}._6XW97a_3f2b7d_statusDot[data-status=skipped]{background:var(--dsw-alias-label-dimmed)}@keyframes _6XW97a_3f2b7d_flowPulse{0%,to{opacity:1}50%{opacity:.35}}._6XW97a_3f2b7d_degraded,._6XW97a_3f2b7d_error{border:1px solid var(--dsw-alias-state-warn-secondary);background:var(--dsw-alias-state-warn-tertiary);color:var(--dsw-alias-state-warn-label);border-radius:6px;margin:0;padding:7px 10px;font-size:12px}._6XW97a_3f2b7d_error{border-color:var(--dsw-alias-state-error-secondary);color:var(--dsw-alias-state-error-primary);background:0 0}._6XW97a_3f2b7d_body{flex:auto;gap:12px;min-height:0;display:flex}._6XW97a_3f2b7d_canvas{border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1);border-radius:8px;flex:auto;min-width:0;overflow:hidden}._6XW97a_3f2b7d_graph{width:100%;height:100%}._6XW97a_3f2b7d_graphCompact .react-flow__node.selected:before{display:none}._6XW97a_3f2b7d_dots{color:var(--dsw-alias-border-l2)}._6XW97a_3f2b7d_minimap{background:var(--dsw-alias-bg-layer-2);border:1px solid var(--dsw-alias-border-l1);border-radius:6px}._6XW97a_3f2b7d_node{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-3);width:240px;color:var(--dsw-alias-label-primary);cursor:pointer;border-radius:8px;flex-direction:column;gap:5px;padding:9px 11px;font-size:12px;transition:border-color .12s ease-out,box-shadow .12s ease-out;display:flex}._6XW97a_3f2b7d_node:hover{border-color:var(--dsw-alias-border-l4)}._6XW97a_3f2b7d_node[data-selected=true]{border-color:var(--dsw-alias-state-business-primary);box-shadow:0 0 0 2px var(--dsw-alias-state-business-tertiary)}._6XW97a_3f2b7d_node[data-status=running]{border-color:var(--dsw-alias-state-business-primary)}._6XW97a_3f2b7d_node[data-status=expanded]{border-color:var(--dsw-alias-state-business-secondary);border-style:dashed}._6XW97a_3f2b7d_node[data-status=done]{border-color:var(--dsw-alias-state-success-secondary)}._6XW97a_3f2b7d_node[data-status=failed]{border-color:var(--dsw-alias-state-error-secondary)}._6XW97a_3f2b7d_node[data-status=skipped]{opacity:.6}._6XW97a_3f2b7d_nodeHead{align-items:center;gap:6px;display:flex}._6XW97a_3f2b7d_nodeTitle{text-overflow:ellipsis;white-space:nowrap;flex:auto;min-width:0;font-weight:600;overflow:hidden}._6XW97a_3f2b7d_nodeStatus{color:var(--dsw-alias-label-tertiary);flex:none;font-size:10px}._6XW97a_3f2b7d_nodeId{color:var(--dsw-alias-label-caption);font-size:10px;font-family:var(--dsw-font-family-mono,ui-monospace, SFMono-Regular, Menlo, monospace)}._6XW97a_3f2b7d_scopeBadge{text-overflow:ellipsis;white-space:nowrap;background:var(--dsw-alias-bg-overlay);max-width:100%;color:var(--dsw-alias-label-secondary);border-radius:999px;align-self:flex-start;padding:0 6px;font-size:10px;line-height:16px;overflow:hidden}._6XW97a_3f2b7d_scopeBadge[data-scope=scoped]{color:var(--dsw-alias-state-success-primary,var(--dsw-alias-label-secondary))}._6XW97a_3f2b7d_scopeBadge[data-scope=exclusive]{color:var(--dsw-alias-state-warning-primary,var(--dsw-alias-label-secondary))}._6XW97a_3f2b7d_attempts{background:var(--dsw-alias-bg-overlay);color:var(--dsw-alias-label-secondary);border-radius:999px;align-self:flex-start;padding:0 6px;font-size:10px;line-height:16px}._6XW97a_3f2b7d_diagnostic,._6XW97a_3f2b7d_summary,._6XW97a_3f2b7d_note,._6XW97a_3f2b7d_running{color:var(--dsw-alias-label-secondary);-webkit-line-clamp:3;-webkit-box-orient:vertical;margin:0;font-size:11px;line-height:1.5;display:-webkit-box;overflow:hidden}._6XW97a_3f2b7d_diagnostic{color:var(--dsw-alias-state-error-primary)}._6XW97a_3f2b7d_note{-webkit-line-clamp:2;color:var(--dsw-alias-label-tertiary)}._6XW97a_3f2b7d_running{color:var(--dsw-alias-state-business-primary);-webkit-line-clamp:1;align-items:center;gap:6px;display:flex}._6XW97a_3f2b7d_spinner{border:1.5px solid var(--dsw-alias-state-business-tertiary);border-top-color:var(--dsw-alias-state-business-primary);border-radius:50%;flex:none;width:9px;height:9px;animation:.7s linear infinite _6XW97a_3f2b7d_flowSpin}@keyframes _6XW97a_3f2b7d_flowSpin{to{transform:rotate(360deg)}}._6XW97a_3f2b7d_handle{border:1px solid var(--dsw-alias-border-l3);background:var(--dsw-alias-bg-layer-3);width:7px;height:7px}._6XW97a_3f2b7d_edgeIdle .react-flow__edge-path,._6XW97a_3f2b7d_edgeDone .react-flow__edge-path,._6XW97a_3f2b7d_edgeRunning .react-flow__edge-path,._6XW97a_3f2b7d_edgeFailed .react-flow__edge-path,._6XW97a_3f2b7d_edgeSkipped .react-flow__edge-path{stroke-width:1.5px}._6XW97a_3f2b7d_edgeIdle .react-flow__edge-path{stroke:var(--dsw-alias-border-l4)}._6XW97a_3f2b7d_edgeDone .react-flow__edge-path{stroke:var(--dsw-alias-state-success-secondary)}._6XW97a_3f2b7d_edgeRunning .react-flow__edge-path{stroke:var(--dsw-alias-state-business-primary)}._6XW97a_3f2b7d_edgeFailed .react-flow__edge-path{stroke:var(--dsw-alias-state-error-secondary)}._6XW97a_3f2b7d_edgeSkipped .react-flow__edge-path{stroke:var(--dsw-alias-border-l3);stroke-dasharray:3 3}._6XW97a_3f2b7d_detail{border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-2);border-radius:8px;flex-direction:column;flex:0 0 320px;gap:12px;min-width:0;padding:12px 14px;display:flex;overflow-y:auto}._6XW97a_3f2b7d_detailHead{align-items:flex-start;gap:8px;display:flex}._6XW97a_3f2b7d_detailTitle{flex:auto;margin:0;font-size:13px;font-weight:600;line-height:1.4}._6XW97a_3f2b7d_close{color:var(--dsw-alias-label-tertiary);cursor:pointer;background:0 0;border:none;flex:none;padding:0 2px;font-size:18px;line-height:1}._6XW97a_3f2b7d_close:hover{color:var(--dsw-alias-label-primary)}._6XW97a_3f2b7d_meta{flex-direction:column;gap:5px;margin:0;font-size:11px;display:flex}._6XW97a_3f2b7d_meta>div{gap:8px;display:flex}._6XW97a_3f2b7d_meta dt{color:var(--dsw-alias-label-tertiary);flex:0 0 62px}._6XW97a_3f2b7d_meta dd{word-break:break-all;min-width:0;color:var(--dsw-alias-label-secondary);margin:0}._6XW97a_3f2b7d_detailSection h4{color:var(--dsw-alias-label-tertiary);margin:0 0 5px;font-size:11px;font-weight:600}._6XW97a_3f2b7d_brief{background:var(--dsw-alias-markdown-code-block);white-space:pre-wrap;word-break:break-word;max-height:190px;font-size:11px;line-height:1.55;font-family:var(--dsw-font-family-mono,ui-monospace, SFMono-Regular, Menlo, monospace);border-radius:6px;margin:0;padding:8px 9px;overflow-y:auto}._6XW97a_3f2b7d_actions{gap:8px;display:flex}._6XW97a_3f2b7d_hint{color:var(--dsw-alias-label-caption);margin:0;font-size:10px;line-height:1.6}._6XW97a_3f2b7d_empty{text-align:center;height:100%;color:var(--dsw-alias-label-secondary);flex-direction:column;justify-content:center;align-items:center;gap:10px;padding:24px;display:flex}._6XW97a_3f2b7d_emptyTitle{color:var(--dsw-alias-label-primary);margin:0;font-size:17px;font-weight:600}._6XW97a_3f2b7d_emptyText{max-width:460px;margin:0;font-size:12px;line-height:1.7}._6XW97a_3f2b7d_empty code,._6XW97a_3f2b7d_hint code{background:var(--dsw-alias-markdown-inline-code);font-family:var(--dsw-font-family-mono,ui-monospace, SFMono-Regular, Menlo, monospace);border-radius:3px;padding:0 4px}";
const tagId = "@just-genius/dsh-flow/FlowCanvas.module.css-3f2b7d";
if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
	const tag = document.createElement("style");
	tag.dataset.plugin = "@just-genius/dsh-flow";
	tag.dataset.pluginCss = tagId;
	tag.textContent = css;
	document.head.appendChild(tag);
}
var FlowCanvas_module_css_default = {
	"title": "_6XW97a_3f2b7d_title",
	"badge": "_6XW97a_3f2b7d_badge",
	"dots": "_6XW97a_3f2b7d_dots",
	"emptyTitle": "_6XW97a_3f2b7d_emptyTitle",
	"statusDot": "_6XW97a_3f2b7d_statusDot",
	"graphCompact": "_6XW97a_3f2b7d_graphCompact",
	"wrap": "_6XW97a_3f2b7d_wrap",
	"detailSection": "_6XW97a_3f2b7d_detailSection",
	"canvas": "_6XW97a_3f2b7d_canvas",
	"brief": "_6XW97a_3f2b7d_brief",
	"empty": "_6XW97a_3f2b7d_empty",
	"flowSpin": "_6XW97a_3f2b7d_flowSpin",
	"concurrencyHint": "_6XW97a_3f2b7d_concurrencyHint",
	"summary": "_6XW97a_3f2b7d_summary",
	"nodeHead": "_6XW97a_3f2b7d_nodeHead",
	"handle": "_6XW97a_3f2b7d_handle",
	"edgeSkipped": "_6XW97a_3f2b7d_edgeSkipped",
	"modeToggle": "_6XW97a_3f2b7d_modeToggle",
	"attempts": "_6XW97a_3f2b7d_attempts",
	"spinner": "_6XW97a_3f2b7d_spinner",
	"meter": "_6XW97a_3f2b7d_meter",
	"flowPulse": "_6XW97a_3f2b7d_flowPulse",
	"graph": "_6XW97a_3f2b7d_graph",
	"diagnostic": "_6XW97a_3f2b7d_diagnostic",
	"edgeDone": "_6XW97a_3f2b7d_edgeDone",
	"confirmBar": "_6XW97a_3f2b7d_confirmBar",
	"concurrencyRow": "_6XW97a_3f2b7d_concurrencyRow",
	"error": "_6XW97a_3f2b7d_error",
	"detailHead": "_6XW97a_3f2b7d_detailHead",
	"nodeId": "_6XW97a_3f2b7d_nodeId",
	"nodeTitle": "_6XW97a_3f2b7d_nodeTitle",
	"emptyText": "_6XW97a_3f2b7d_emptyText",
	"emptyActions": "_6XW97a_3f2b7d_emptyActions",
	"edgeFailed": "_6XW97a_3f2b7d_edgeFailed",
	"meta": "_6XW97a_3f2b7d_meta",
	"detail": "_6XW97a_3f2b7d_detail",
	"edgeRunning": "_6XW97a_3f2b7d_edgeRunning",
	"titleRow": "_6XW97a_3f2b7d_titleRow",
	"legend": "_6XW97a_3f2b7d_legend",
	"concurrencyLabel": "_6XW97a_3f2b7d_concurrencyLabel",
	"nodeStatus": "_6XW97a_3f2b7d_nodeStatus",
	"note": "_6XW97a_3f2b7d_note",
	"meterFill": "_6XW97a_3f2b7d_meterFill",
	"confirmText": "_6XW97a_3f2b7d_confirmText",
	"edgeIdle": "_6XW97a_3f2b7d_edgeIdle",
	"body": "_6XW97a_3f2b7d_body",
	"hint": "_6XW97a_3f2b7d_hint",
	"legendItem": "_6XW97a_3f2b7d_legendItem",
	"degraded": "_6XW97a_3f2b7d_degraded",
	"detailTitle": "_6XW97a_3f2b7d_detailTitle",
	"actions": "_6XW97a_3f2b7d_actions",
	"concurrencyInput": "_6XW97a_3f2b7d_concurrencyInput",
	"minimap": "_6XW97a_3f2b7d_minimap",
	"running": "_6XW97a_3f2b7d_running",
	"header": "_6XW97a_3f2b7d_header",
	"node": "_6XW97a_3f2b7d_node",
	"scopeBadge": "_6XW97a_3f2b7d_scopeBadge",
	"close": "_6XW97a_3f2b7d_close"
};
//#endregion
//#region src/client/NodeCard.tsx
/**
* One graph node.
*
* Status is carried by a data attribute, not by inline styles or hardcoded
* colours, so every visual state resolves through the `--dsw-*` theme and both
* light and dark stay correct.
*/
function NodeCard({ node, selected }) {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: FlowCanvas_module_css_default.node,
		"data-status": node.status,
		"data-selected": selected ? "true" : "false",
		children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("header", {
				className: FlowCanvas_module_css_default.nodeHead,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: FlowCanvas_module_css_default.statusDot,
						"data-status": node.status,
						"aria-hidden": "true"
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: FlowCanvas_module_css_default.nodeTitle,
						title: node.title,
						children: node.title
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: FlowCanvas_module_css_default.nodeStatus,
						children: STATUS_LABEL[node.status]
					})
				]
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("code", {
				className: FlowCanvas_module_css_default.nodeId,
				children: node.parentId !== void 0 ? `${node.parentId} / ${node.id}` : node.id
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(ScopeBadge, { node }),
			node.attempts > 1 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
				className: FlowCanvas_module_css_default.attempts,
				children: ["attempt ", node.attempts]
			}),
			node.status === "failed" && node.diagnostic !== null && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
				className: FlowCanvas_module_css_default.diagnostic,
				title: node.diagnostic,
				children: node.diagnostic
			}),
			node.status === "done" && node.summary !== null && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
				className: FlowCanvas_module_css_default.summary,
				children: node.summary
			}),
			node.status === "expanded" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
				className: FlowCanvas_module_css_default.running,
				children: "已拆成子任务，等待验收后继续"
			}),
			node.status === "running" && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", {
				className: FlowCanvas_module_css_default.running,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: FlowCanvas_module_css_default.spinner,
					"aria-hidden": "true"
				}), node.childId === null ? "starting child…" : "child agent working"]
			}),
			node.status === "running" && node.notes.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
				className: FlowCanvas_module_css_default.note,
				title: node.notes[node.notes.length - 1].text,
				children: node.notes[node.notes.length - 1].text
			})
		]
	});
}
/**
* Write-scope badge.
*
* The scheduler's whole parallelism story is decided by this declaration, so
* the canvas has to show it: a Leader (or user) staring at a plan that runs one
* step at a time needs to see at a glance that the nodes never declared a
* scope, rather than assuming the scheduler is slow.
*/
function ScopeBadge({ node }) {
	switch (node.scopeKind) {
		case "readonly": return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
			className: FlowCanvas_module_css_default.scopeBadge,
			"data-scope": "readonly",
			children: "只读 · 可并行"
		});
		case "scoped": return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
			className: FlowCanvas_module_css_default.scopeBadge,
			"data-scope": "scoped",
			title: (node.writeScope ?? []).join("\n"),
			children: [
				"写作用域 ",
				node.writeScope?.join(", "),
				" · 可并行"
			]
		});
		default: return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
			className: FlowCanvas_module_css_default.scopeBadge,
			"data-scope": "exclusive",
			title: "未声明 writeScope：运行期间独占，其它写操作会被推迟",
			children: "独占 · 单独运行"
		});
	}
}
/** Edge colour follows the upstream node's status. */
function edgeClassFor(status) {
	switch (status) {
		case "done": return FlowCanvas_module_css_default.edgeDone;
		case "running": return FlowCanvas_module_css_default.edgeRunning;
		case "expanded": return FlowCanvas_module_css_default.edgeRunning;
		case "failed": return FlowCanvas_module_css_default.edgeFailed;
		case "skipped": return FlowCanvas_module_css_default.edgeSkipped;
		default: return FlowCanvas_module_css_default.edgeIdle;
	}
}
//#endregion
//#region src/client/layout.ts
const COLUMN_WIDTH = 300;
const ROW_HEIGHT = 140;
const ORIGIN_X = 24;
const ORIGIN_Y = 24;
/**
* Assign each node a column by its longest dependency path, then stack nodes
* within a column in plan order.
*/
function layoutNodes(nodes) {
	const depths = computeDepths(nodes);
	const rowOf = /* @__PURE__ */ new Map();
	const rowCursor = /* @__PURE__ */ new Map();
	const placed = [];
	for (const node of nodes) {
		const depth = depths.get(node.id) ?? 0;
		const row = rowCursor.get(depth) ?? 0;
		rowCursor.set(depth, row + 1);
		rowOf.set(node.id, row);
		placed.push({
			node,
			x: ORIGIN_X + depth * COLUMN_WIDTH,
			y: ORIGIN_Y + row * ROW_HEIGHT
		});
	}
	return placed;
}
/** Longest-path depth per node id. Acyclic by construction (validated on plan). */
function computeDepths(nodes) {
	const byId = new Map(nodes.map((node) => [node.id, node]));
	const depths = /* @__PURE__ */ new Map();
	const resolve = (id, guard) => {
		const cached = depths.get(id);
		if (cached !== void 0) return cached;
		if (guard.has(id)) return 0;
		guard.add(id);
		let depth = 0;
		const node = byId.get(id);
		const inbound = [...node?.deps ?? [], ...node?.parentId !== void 0 ? [node.parentId] : []];
		for (const dep of inbound) depth = Math.max(depth, resolve(dep, guard) + 1);
		guard.delete(id);
		depths.set(id, depth);
		return depth;
	};
	for (const node of nodes) resolve(node.id, /* @__PURE__ */ new Set());
	return depths;
}
//#endregion
//#region src/client/toFlowElements.ts
/**
* Turn a Flow plan into React Flow nodes and edges.
*
* Layout and parent-edge rules stay here so the full tab and a later
* mini-window share one conversion — not two copies of the DAG walk.
*/
/**
* Convert a plan view using the same layout and parent-edge rules as
* the original Flow tab.
*/
function toFlowElements(plan, options = {}) {
	const selectable = options.selectable ?? true;
	const draggable = options.draggable ?? true;
	const selectedId = options.selectedId ?? null;
	return {
		nodes: layoutNodes(plan.nodes).map(({ node, x, y }) => ({
			id: node.id,
			type: "card",
			position: {
				x,
				y
			},
			data: { node },
			draggable,
			selectable,
			selected: selectable && selectedId === node.id
		})),
		edges: edgesFor(plan.nodes)
	};
}
/** Dep edges, plus a parent edge when parent is not already a dep. */
function edgesFor(nodes) {
	const statusOf = new Map(nodes.map((node) => [node.id, node.status]));
	const out = [];
	for (const node of nodes) {
		for (const dep of node.deps) out.push(edgeOf(dep, node.id, statusOf.get(dep) ?? "pending", false));
		if (node.parentId !== void 0 && !node.deps.includes(node.parentId)) {
			const parentStatus = statusOf.get(node.parentId) ?? "pending";
			out.push(edgeOf(node.parentId, node.id, parentStatus, true));
		}
	}
	return out;
}
function edgeOf(source, target, status, parentLink) {
	const running = status === "running";
	const expanded = status === "expanded";
	return {
		id: parentLink ? `${source}=>${target}` : `${source}->${target}`,
		source,
		target,
		className: edgeClassFor(status),
		animated: parentLink ? running || expanded : running,
		markerEnd: {
			type: MarkerType.ArrowClosed,
			width: 16,
			height: 16
		}
	};
}
//#endregion
//#region src/client/FlowGraph.tsx
function CardNode({ data, selected }) {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Handle$1, {
			type: "target",
			position: Position.Left,
			className: FlowCanvas_module_css_default.handle
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)(NodeCard, {
			node: data.node,
			selected: selected === true
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Handle$1, {
			type: "source",
			position: Position.Right,
			className: FlowCanvas_module_css_default.handle
		})
	] });
}
const NODE_TYPES = { card: CardNode };
const FULL_FIT = {
	padding: .2,
	maxZoom: 1
};
const COMPACT_FIT = {
	padding: .35,
	maxZoom: .75
};
const COMPACT_ZOOM = .7;
/**
* Shared React Flow renderer.
*
* Owns plan→elements conversion, the card node type, and chrome that
* differs between the full tab and a compact overlay.
*/
function FlowGraph(props) {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ReactFlowProvider, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(FlowGraphInner, { ...props }) });
}
function FlowGraphInner({ plan = null, nodes: nodesProp, edges: edgesProp, variant = "full", selectedId = null, focusNodeId = null, interactive, onNodeClick, onPaneClick, className }) {
	const compact = variant === "compact";
	const canInteract = interactive ?? !compact;
	const showSelection = canInteract && !compact;
	const base = (0, react.useMemo)(() => {
		if (nodesProp !== void 0 && edgesProp !== void 0) return {
			nodes: nodesProp,
			edges: edgesProp
		};
		if (plan !== null) return toFlowElements(plan);
		return {
			nodes: [],
			edges: []
		};
	}, [
		nodesProp,
		edgesProp,
		plan
	]);
	const nodes = (0, react.useMemo)(() => base.nodes.map((node) => ({
		...node,
		selected: showSelection && node.id === selectedId,
		selectable: showSelection,
		draggable: canInteract
	})), [
		base.nodes,
		selectedId,
		showSelection,
		canInteract
	]);
	const fitViewOptions = compact ? COMPACT_FIT : FULL_FIT;
	const rootClass = [
		FlowCanvas_module_css_default.graph,
		compact ? FlowCanvas_module_css_default.graphCompact : "",
		className ?? ""
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(ReactFlow, {
		className: rootClass,
		nodes,
		edges: base.edges,
		nodeTypes: NODE_TYPES,
		onNodeClick,
		onPaneClick,
		fitView: true,
		fitViewOptions,
		defaultViewport: compact ? {
			x: 0,
			y: 0,
			zoom: COMPACT_ZOOM
		} : void 0,
		minZoom: .2,
		maxZoom: compact ? 1 : 1.6,
		nodesDraggable: canInteract,
		nodesConnectable: false,
		elementsSelectable: showSelection,
		panOnDrag: canInteract,
		zoomOnScroll: canInteract,
		zoomOnPinch: canInteract,
		zoomOnDoubleClick: canInteract,
		proOptions: { hideAttribution: true },
		children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Background$1, {
				variant: BackgroundVariant.Dots,
				gap: 18,
				size: 1,
				className: FlowCanvas_module_css_default.dots
			}),
			!compact && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Controls$1, { showInteractive: false }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(MiniMap$1, {
				pannable: true,
				zoomable: true,
				className: FlowCanvas_module_css_default.minimap
			})] }),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(FocusSync, {
				nodeId: focusNodeId,
				x: nodes.find((node) => node.id === focusNodeId)?.position.x,
				y: nodes.find((node) => node.id === focusNodeId)?.position.y,
				zoom: compact ? COMPACT_ZOOM : 1,
				fitWhenIdle: compact
			})
		]
	});
}
/** Recenter when `focusNodeId` changes or that node first appears. */
function FocusSync({ nodeId, x, y, zoom, fitWhenIdle }) {
	const { getNode, setCenter, fitView } = useReactFlow();
	(0, react.useEffect)(() => {
		if (nodeId !== null && x !== void 0 && y !== void 0) {
			const measured = getNode(nodeId);
			const width = measured?.width ?? 240;
			const height = measured?.height ?? 80;
			setCenter(x + width / 2, y + height / 2, {
				zoom,
				duration: 280
			});
			return;
		}
		if (fitWhenIdle) fitView({
			...COMPACT_FIT,
			duration: 280
		});
	}, [
		nodeId,
		x,
		y,
		zoom,
		fitWhenIdle,
		getNode,
		setCenter,
		fitView
	]);
	return null;
}
//#endregion
//#region src/client/useFlowState.ts
/** Poll cadence. The graph changes on child settlements, not on keystrokes. */
const POLL_MS = 1200;
const EMPTY = {
	plan: null,
	mode: false,
	modePending: null,
	degraded: false,
	degradedReason: null
};
/**
* Poll the host-only flow projection.
*
* Polling rather than pushing is deliberate: the host half would otherwise need
* a per-session push channel, while the browser already polls this shape for
* other plugins' state. The last good snapshot is kept on a failed tick so a
* transient error never blanks the canvas.
*/
function useFlowState(sessionId) {
	const [state, setState] = (0, react.useState)(EMPTY);
	const aliveRef = (0, react.useRef)(true);
	(0, react.useEffect)(() => {
		aliveRef.current = true;
		let timer;
		const pull = async () => {
			try {
				const value = await getResult(`${STATE_PATH}?sessionId=${encodeURIComponent(sessionId)}`);
				if (aliveRef.current) setState(value);
			} catch {}
		};
		pull();
		timer = window.setInterval(() => {
			pull();
		}, POLL_MS);
		return () => {
			aliveRef.current = false;
			if (timer !== void 0) window.clearInterval(timer);
		};
	}, [sessionId]);
	return state;
}
//#endregion
//#region src/client/FlowCanvas.tsx
/**
* The Flow tab.
*
* Read-mostly by design: the Leader reshapes the graph through `flow.patch`, so
* the canvas offers only the local actions that do not fight the model for
* ownership of the topology — retry a failed node, skip it, stop a live one.
*/
function FlowCanvas({ sessionId }) {
	const state = useFlowState(sessionId);
	const [selectedId, setSelectedId] = (0, react.useState)(null);
	const [error, setError] = (0, react.useState)(null);
	const plan = state.plan;
	const act = (0, react.useCallback)(async (action) => {
		setError(null);
		try {
			const result = await postResult(`${ACTION_PATH}?sessionId=${encodeURIComponent(sessionId)}`, action);
			if (!result.ok && result.message !== null) setError(result.message);
		} catch (cause) {
			setError(cause instanceof Error ? cause.message : String(cause));
		}
	}, [sessionId]);
	const setMode = (0, react.useCallback)(async (on) => {
		setError(null);
		try {
			await postResult(`${MODE_PATH}?sessionId=${encodeURIComponent(sessionId)}`, { on });
		} catch (cause) {
			setError(cause instanceof Error ? cause.message : String(cause));
		}
	}, [sessionId]);
	const setConcurrency = (0, react.useCallback)(async (concurrency) => {
		setError(null);
		try {
			await postResult(`${ACTION_PATH}?sessionId=${encodeURIComponent(sessionId)}`, {
				kind: "setConcurrency",
				concurrency
			});
		} catch (cause) {
			setError(cause instanceof Error ? cause.message : String(cause));
		}
	}, [sessionId]);
	if (!state.mode) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(OffState, {
		pending: state.modePending,
		degraded: state.degraded,
		reason: state.degradedReason,
		onEnable: () => void setMode(true)
	});
	if (plan === null) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(EmptyState, {
		degraded: state.degraded,
		reason: state.degradedReason,
		onDisable: () => void setMode(false)
	});
	const selected = plan.nodes.find((node) => node.id === selectedId) ?? null;
	const progress = progressOf(plan.nodes.map((node) => node.status));
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: FlowCanvas_module_css_default.wrap,
		children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("header", {
				className: FlowCanvas_module_css_default.header,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: FlowCanvas_module_css_default.titleRow,
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h2", {
								className: FlowCanvas_module_css_default.title,
								children: plan.title
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: FlowCanvas_module_css_default.badge,
								"data-status": plan.status,
								children: plan.status === "settled" ? "全部结束" : plan.status === "running" ? "执行中" : "待执行"
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								className: FlowCanvas_module_css_default.modeToggle,
								onClick: () => void setMode(false),
								children: "退出 Flow 模式"
							})
						]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: FlowCanvas_module_css_default.meter,
						role: "presentation",
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: FlowCanvas_module_css_default.meterFill,
							style: { width: `${Math.round(progress * 100)}%` }
						})
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: FlowCanvas_module_css_default.concurrencyRow,
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("label", {
								className: FlowCanvas_module_css_default.concurrencyLabel,
								htmlFor: "dsh-flow-concurrency",
								children: "并发上限"
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
								id: "dsh-flow-concurrency",
								className: FlowCanvas_module_css_default.concurrencyInput,
								type: "number",
								min: 1,
								max: 8,
								value: plan.concurrency,
								onChange: (event) => {
									const next = Number.parseInt(event.target.value, 10);
									if (Number.isFinite(next)) setConcurrency(next);
								}
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: FlowCanvas_module_css_default.concurrencyHint,
								title: "上限不等于实际并行度：未声明 writeScope 的节点仍会独占运行",
								children: "实际并行度还受 writeScope 约束"
							})
						]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: FlowCanvas_module_css_default.legend,
						children: [
							"pending",
							"running",
							"expanded",
							"done",
							"failed",
							"skipped"
						].map((status) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
							className: FlowCanvas_module_css_default.legendItem,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: FlowCanvas_module_css_default.statusDot,
								"data-status": status,
								"aria-hidden": "true"
							}), STATUS_LABEL[status]]
						}, status))
					}),
					waitingForConfirm(plan) && plan.confirm !== null && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: FlowCanvas_module_css_default.confirmBar,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
							className: FlowCanvas_module_css_default.confirmText,
							children: plan.confirm.question
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Button, {
							onClick: () => void act({ kind: "next" }),
							children: "通过并继续"
						})]
					})
				]
			}),
			state.degraded && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", {
				className: FlowCanvas_module_css_default.degraded,
				children: [
					"编排器降级：",
					state.degradedReason ?? "未知原因",
					"。图可以显示，但不会派发子 Agent。"
				]
			}),
			error !== null && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
				className: FlowCanvas_module_css_default.error,
				children: error
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: FlowCanvas_module_css_default.body,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: FlowCanvas_module_css_default.canvas,
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(FlowGraph, {
						plan,
						variant: "full",
						selectedId,
						onNodeClick: (_event, node) => setSelectedId(node.id),
						onPaneClick: () => setSelectedId(null)
					})
				}), selected !== null && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(DetailPane, {
					node: selected,
					confirm: plan.confirm,
					onAct: act,
					onClose: () => setSelectedId(null)
				})]
			})
		]
	});
}
/** Side panel for the selected node: the full brief, result, and local actions. */
function DetailPane({ node, confirm, onAct, onClose }) {
	const canRetry = node.status === "failed" || node.status === "skipped" || node.status === "done";
	const canSkip = node.status !== "done" && node.status !== "skipped";
	const canCancel = node.status === "running";
	const showConfirm = confirm !== null && (confirm.nodeId === null || confirm.nodeId === node.id);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("aside", {
		className: FlowCanvas_module_css_default.detail,
		children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("header", {
				className: FlowCanvas_module_css_default.detailHead,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", {
					className: FlowCanvas_module_css_default.detailTitle,
					children: node.title
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
					type: "button",
					className: FlowCanvas_module_css_default.close,
					onClick: onClose,
					"aria-label": "关闭",
					children: "×"
				})]
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("dl", {
				className: FlowCanvas_module_css_default.meta,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("dt", { children: "节点" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("dd", { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("code", { children: node.id }) })] }),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("dt", { children: "状态" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("dd", { children: STATUS_LABEL[node.status] })] }),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("dt", { children: "依赖" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("dd", { children: node.deps.length === 0 ? "无" : node.deps.join("、") })] }),
					node.parentId !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("dt", { children: "父节点" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("dd", { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("code", { children: node.parentId }) })] }),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("dt", { children: "尝试次数" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("dd", { children: node.attempts })] }),
					node.childId !== null && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("dt", { children: "子 Agent" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("dd", { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("code", { children: node.childId }) })] })
				]
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
				className: FlowCanvas_module_css_default.detailSection,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h4", { children: "任务简报" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("pre", {
					className: FlowCanvas_module_css_default.brief,
					children: node.prompt
				})]
			}),
			node.notes.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
				className: FlowCanvas_module_css_default.detailSection,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h4", { children: "进展记录" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("pre", {
					className: FlowCanvas_module_css_default.brief,
					children: node.notes.map((note) => `[${timeOf(note.at)}] ${note.text}`).join("\n")
				})]
			}),
			node.summary !== null && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
				className: FlowCanvas_module_css_default.detailSection,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h4", { children: "产出摘要" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("pre", {
					className: FlowCanvas_module_css_default.brief,
					children: node.summary
				})]
			}),
			node.diagnostic !== null && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
				className: FlowCanvas_module_css_default.detailSection,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h4", { children: "失败原因" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("pre", {
					className: FlowCanvas_module_css_default.brief,
					children: node.diagnostic
				})]
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: FlowCanvas_module_css_default.actions,
				children: [
					showConfirm && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Button, {
						onClick: () => void onAct({ kind: "next" }),
						children: "通过并继续"
					}),
					canRetry && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Button, {
						onClick: () => void onAct({
							kind: "retry",
							nodeId: node.id
						}),
						children: "重试"
					}),
					canSkip && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Button, {
						onClick: () => void onAct({
							kind: "skip",
							nodeId: node.id
						}),
						children: "跳过"
					}),
					canCancel && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Button, {
						onClick: () => void onAct({
							kind: "cancel",
							nodeId: node.id
						}),
						children: "停止"
					})
				]
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", {
				className: FlowCanvas_module_css_default.hint,
				children: [
					"只有 Leader 或子代理请求确认时才会暂停。平时 Leader 验收后自己继续。 改拓扑请用 ",
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("code", { children: "flow.patch" }),
					"。"
				]
			})
		]
	});
}
/** HH:MM:SS for a note timestamp; falls back to the raw string if unparseable. */
function timeOf(iso) {
	const date = new Date(iso);
	if (Number.isNaN(date.getTime())) return iso;
	return date.toLocaleTimeString("zh-CN", { hour12: false });
}
/** Mode off: the tab explains itself and offers the one switch that matters. */
function OffState({ pending, degraded, reason, onEnable }) {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: FlowCanvas_module_css_default.empty,
		children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h2", {
				className: FlowCanvas_module_css_default.emptyTitle,
				children: "Flow"
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
				className: FlowCanvas_module_css_default.emptyText,
				children: "Flow 模式未开启。开启后，主 Agent 只负责规划：它把任务拆成一张依赖图， 每个节点交给一个子 Agent 执行，并可以根据执行结果调整这张图。"
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
				className: FlowCanvas_module_css_default.emptyText,
				children: "开启期间 Leader 的执行类工具会被禁用 —— 它只能规划、审查和改图。"
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: FlowCanvas_module_css_default.emptyActions,
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Button, {
					onClick: onEnable,
					children: pending === true ? "开启中…" : "开启 Flow 模式"
				})
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", {
				className: FlowCanvas_module_css_default.hint,
				children: [
					"也可以直接在对话框输入 ",
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("code", { children: "/flow" }),
					"；退出用 ",
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("code", { children: "/flow off" }),
					"。"
				]
			}),
			degraded && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", {
				className: FlowCanvas_module_css_default.degraded,
				children: [
					"编排器降级：",
					reason ?? "未知原因",
					"。图可以显示，但不会派发子 Agent。"
				]
			})
		]
	});
}
/** Mode on but no plan yet. */
function EmptyState({ degraded, reason, onDisable }) {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: FlowCanvas_module_css_default.empty,
		children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h2", {
				className: FlowCanvas_module_css_default.emptyTitle,
				children: "Flow 模式已开启"
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", {
				className: FlowCanvas_module_css_default.emptyText,
				children: [
					"还没有工作流。给主 Agent 一个需要多步完成的任务，它会调用 ",
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("code", { children: "flow.plan" }),
					"生成依赖图，每个节点交给一个子 Agent 执行。"
				]
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
				className: FlowCanvas_module_css_default.emptyText,
				children: "执行过程中 Leader 会根据子 Agent 的结果调整这张图：重试、跳过、插入补救步骤。"
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: FlowCanvas_module_css_default.emptyActions,
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Button, {
					onClick: onDisable,
					children: "退出 Flow 模式"
				})
			}),
			degraded && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", {
				className: FlowCanvas_module_css_default.degraded,
				children: [
					"编排器降级：",
					reason ?? "未知原因",
					"。图可以显示，但不会派发子 Agent。"
				]
			})
		]
	});
}
//#endregion
//#region src/client/index.tsx
const inject = [CLIENT_SERVICES.slots];
function apply(ctx) {
	ctx.slots.inject("conversation.view", () => ctx.slots.register({
		name: "conversation.view",
		id: "flow",
		order: 20,
		label: "Flow"
	}, FlowCanvas));
}
//#endregion
exports.apply = apply;
exports.inject = inject;

return module.exports; } });