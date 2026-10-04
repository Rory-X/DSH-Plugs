
import { Context as ClientContext } from "@deepseek-ai/cordis";
import "@deepseek-ai/dsh-api-remotes/client";
import "@deepseek-ai/dsh-api-session-controller/client";
import "@deepseek-ai/dsh-api-workspace-controller/client";
import "@deepseek-ai/dsh-client-connection/client";
import "@deepseek-ai/dsh-client-locale/client";
import "@deepseek-ai/dsh-client-ui-renderer/client";
import "@deepseek-ai/dsh-client-ui-session/client";
import "@deepseek-ai/dsh-client-ui-workspace/client";
import "@deepseek-ai/dsh-client-ui-conversation/client";
import "@deepseek-ai/dsh-client-ui-input-trigger/client";
import "@deepseek-ai/dsh-client-ui-layout/client";
import "@deepseek-ai/dsh-client-ui-model-selection/client";
import "@deepseek-ai/dsh-client-ui-settings/client";
import "@deepseek-ai/dsh-client-ui-settings-plugins/client";
import "@deepseek-ai/dsh-client-ui-slots";
import "@deepseek-ai/dsh-session/types";
import "@deepseek-ai/dsh-client-store";
//#region ../../packages/runtime/lib/client.d.ts
/** Values accepted by the DSH right-Sidebar navigation contract. */
type SidebarRightNavigationParams = Readonly<Record<string, unknown>> | undefined;
/** Where a new right-Sidebar tab should land. */
interface SidebarRightPlacement {
  paneId?: string;
  replaceTab?: string;
  revealIfOpened?: boolean;
}
/** Options for opening a resource address in the right Sidebar. */
interface SidebarRightOpenResourceOptions extends SidebarRightPlacement {
  kind?: string;
  params?: SidebarRightNavigationParams;
}
/** Options for opening a page tab in the right Sidebar. */
interface SidebarRightOpenTabOptions extends SidebarRightPlacement {
  params?: SidebarRightNavigationParams;
}
/** One tab record exposed by the right-Sidebar controller. */
interface SidebarRightTabRecord {
  id: string;
  kind: string;
  contentId: string;
  title: string;
}
/** Public navigation and presentation face provided by DSH 0.1.5+. */
interface SidebarRightService {
  openResource(address: string, options?: SidebarRightOpenResourceOptions): void;
  openTab(kind: string, options?: SidebarRightOpenTabOptions): void;
  close(tabId: string): void;
  active(): SidebarRightTabRecord | undefined;
  isExpanded(): boolean;
  toggleExpanded(): void;
  focus(tabId: string): void;
  split(paneId?: string): string | undefined;
  float(tabId: string, rect?: {
    x: number;
    y: number;
    width: number;
    height: number;
  }): void;
  dock(paneId: string): void;
}
/** A guide-page capsule contributed by a right-Sidebar tab type. */
interface SidebarRightGuideEntry {
  order: number;
  title: () => string;
  /** Kept structural so plugins need not import the official primitives package. */
  icon?: unknown;
}
/** Static definition registered before a right-Sidebar tab body. */
interface SidebarRightTabDefinition {
  id: string;
  kind: string;
  patterns?: readonly string[];
  priority?: 'extension' | 'builtin' | 'fallback';
  canOpen?: (address: string) => boolean;
  title: (address: string) => string;
  guide?: readonly SidebarRightGuideEntry[];
}
/** Tab-type registry provided by DSH's official right Sidebar. */
interface SidebarRightTabsService {
  register(definition: SidebarRightTabDefinition): () => void;
}
/** Plugin-owned client services bridged into the official Cordis Context. */
interface PluginClientContext {
  /** DSH 0.1.5+ official right-Sidebar navigation face. */
  sidebarRight: SidebarRightService;
  /** DSH 0.1.5+ official right-Sidebar tab registry. */
  sidebarRightTabs: SidebarRightTabsService;
}
/** Plugin-owned locale namespaces bridged into the official slot registry. */
interface PluginLocaleNamespaceMap {}
/**
 * The view the sidebar Plugins page asks a configuration entry for (DSH
 * 0.1.6+): `summary` for the one-liner under the title, `page` for the form
 * with its own save control. Mirrors the official
 * `dsh-client-ui-plugin-manager` slot contract; drop these declarations when
 * the workspace's official type deps move to a version that ships them.
 */
interface PluginConfigViewProps {
  readonly view: 'summary' | 'page';
}
/**
 * Plugin-owned slots bridged into the official slot registry, plus the
 * official Plugins-page configuration slots our bundles register into:
 * `plugins.bundle.config` is keyed by the bundle's package name and rendered
 * on the bundle's own page (`view: 'page'` only); `plugins.row.config` is
 * keyed by `<package name>#<row id>`; `plugins.item` is the Official-group
 * card list the host-plane configuration pages occupy.
 */
interface PluginSlotMap {
  'plugins.item': {
    kind: 'list';
    scope: 'root';
    owner: PluginConfigViewProps;
  };
  'plugins.bundle.config': {
    kind: 'keyed';
    scope: 'root';
    owner: PluginConfigViewProps;
  };
  'plugins.row.config': {
    kind: 'keyed';
    scope: 'root';
    owner: PluginConfigViewProps;
  };
}
/** Plugin-owned conversation node payloads bridged into the chat renderer. */
interface PluginChatNodeDataMap {}
declare module '@deepseek-ai/cordis' {
  interface Context extends PluginClientContext {}
}
declare module '@deepseek-ai/dsh-client-ui-slots' {
  interface LocaleNamespaceMap extends PluginLocaleNamespaceMap {}
  interface SlotMap extends PluginSlotMap {}
}
declare module '@deepseek-ai/dsh-client-ui-conversation/client' {
  interface ChatNodeDataMap extends PluginChatNodeDataMap {}
}
//#endregion
//#region src/client/index.d.ts
declare const inject: readonly ["slots"];
declare function apply(ctx: ClientContext): void;
//#endregion
export { apply, inject };
