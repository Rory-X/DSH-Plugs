export const SETTINGS_NAMESPACE = 'dsh-codex' as const
export const SETTINGS_PATH = '/dsh-codex/settings'

export type TerminalShell = 'auto' | 'bash' | 'zsh'

/** When the pinned user bubble is shown: only while a turn is running, or always. */
export type StickyUserBubbleMode = 'running' | 'always'

export interface DshCodexConfig {
  navigatorEnabled: boolean
  conversationCollapseEnabled: boolean
  stickyUserBubbleEnabled: boolean
  stickyUserBubbleMode: StickyUserBubbleMode
  /** Drain the history window until the session has no older pages. */
  fullSessionLoadEnabled: boolean
  /** Cap on in-window user messages while full-session load is on (inclusive). */
  fullSessionLoadLimit: number
  terminalEnabled: boolean
  gitGraphEnabled: boolean
  filesEnabled: boolean
  fileLinksInPanel: boolean
  sideChatEnabled: boolean
  terminalShell: TerminalShell
  terminalScrollback: number
  terminalFontSize: number
  panelDefaultWidth: number
  panelMaxWidth: number
  panelLauncherWidth: number
  panelRememberTabs: boolean
}

export type CodexConfigField = keyof DshCodexConfig

/** Inclusive bounds for the collapsed floating launcher card. */
export const PANEL_LAUNCHER_WIDTH_MIN = 140
export const PANEL_LAUNCHER_WIDTH_MAX = 400

/** Inclusive bounds for full-session-load's user-message cap. */
export const FULL_SESSION_LOAD_LIMIT_MIN = 5
export const FULL_SESSION_LOAD_LIMIT_MAX = 200
export const FULL_SESSION_LOAD_LIMIT_PRESETS = [10, 15, 25, 50] as const

export const DEFAULT_CONFIG: DshCodexConfig = {
  navigatorEnabled: true,
  conversationCollapseEnabled: true,
  stickyUserBubbleEnabled: false,
  stickyUserBubbleMode: 'running',
  fullSessionLoadEnabled: false,
  fullSessionLoadLimit: 25,
  terminalEnabled: true,
  gitGraphEnabled: true,
  filesEnabled: true,
  fileLinksInPanel: true,
  sideChatEnabled: true,
  terminalShell: 'auto',
  terminalScrollback: 5000,
  terminalFontSize: 12,
  panelDefaultWidth: 360,
  panelMaxWidth: 720,
  panelLauncherWidth: 220,
  panelRememberTabs: true,
}

export const CODEX_CONFIG_FIELDS: readonly CodexConfigField[] = [
  'navigatorEnabled',
  'conversationCollapseEnabled',
  'stickyUserBubbleEnabled',
  'stickyUserBubbleMode',
  'fullSessionLoadEnabled',
  'fullSessionLoadLimit',
  'terminalEnabled',
  'gitGraphEnabled',
  'filesEnabled',
  'fileLinksInPanel',
  'sideChatEnabled',
  'terminalShell',
  'terminalScrollback',
  'terminalFontSize',
  'panelDefaultWidth',
  'panelMaxWidth',
  'panelLauncherWidth',
  'panelRememberTabs',
]

export function clampPanelLauncherWidth(value: number): number {
  if (!Number.isFinite(value)) return DEFAULT_CONFIG.panelLauncherWidth
  return Math.min(
    PANEL_LAUNCHER_WIDTH_MAX,
    Math.max(PANEL_LAUNCHER_WIDTH_MIN, Math.round(value)),
  )
}

export function clampFullSessionLoadLimit(value: number): number {
  if (!Number.isFinite(value)) return DEFAULT_CONFIG.fullSessionLoadLimit
  return Math.min(
    FULL_SESSION_LOAD_LIMIT_MAX,
    Math.max(FULL_SESSION_LOAD_LIMIT_MIN, Math.round(value)),
  )
}

function clampInt(
  value: unknown,
  min: number,
  max: number,
  fallback: number,
): number {
  if (typeof value !== 'number' || !Number.isFinite(value)) return fallback
  return Math.min(max, Math.max(min, Math.round(value)))
}

/**
 * Narrow a wire or storage blob to a complete Codex section. Missing newer
 * fields inherit {@link DEFAULT_CONFIG} so older documents still load.
 */
export function parseCodexConfig(value: unknown): DshCodexConfig | undefined {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return undefined
  }
  const candidate = value as Partial<DshCodexConfig>
  if (typeof candidate.navigatorEnabled !== 'boolean') return undefined
  if (typeof candidate.terminalEnabled !== 'boolean') return undefined
  if (
    candidate.terminalShell !== 'auto'
    && candidate.terminalShell !== 'bash'
    && candidate.terminalShell !== 'zsh'
  ) {
    return undefined
  }
  if (typeof candidate.panelRememberTabs !== 'boolean') return undefined
  return {
    navigatorEnabled: candidate.navigatorEnabled,
    conversationCollapseEnabled: typeof candidate.conversationCollapseEnabled === 'boolean'
      ? candidate.conversationCollapseEnabled
      : DEFAULT_CONFIG.conversationCollapseEnabled,
    stickyUserBubbleEnabled: typeof candidate.stickyUserBubbleEnabled === 'boolean'
      ? candidate.stickyUserBubbleEnabled
      : DEFAULT_CONFIG.stickyUserBubbleEnabled,
    stickyUserBubbleMode: candidate.stickyUserBubbleMode === 'always'
      || candidate.stickyUserBubbleMode === 'running'
      ? candidate.stickyUserBubbleMode
      : DEFAULT_CONFIG.stickyUserBubbleMode,
    fullSessionLoadEnabled: typeof candidate.fullSessionLoadEnabled === 'boolean'
      ? candidate.fullSessionLoadEnabled
      : DEFAULT_CONFIG.fullSessionLoadEnabled,
    fullSessionLoadLimit: clampFullSessionLoadLimit(
      typeof candidate.fullSessionLoadLimit === 'number'
        ? candidate.fullSessionLoadLimit
        : DEFAULT_CONFIG.fullSessionLoadLimit,
    ),
    terminalEnabled: candidate.terminalEnabled,
    gitGraphEnabled: typeof candidate.gitGraphEnabled === 'boolean'
      ? candidate.gitGraphEnabled
      : DEFAULT_CONFIG.gitGraphEnabled,
    filesEnabled: typeof candidate.filesEnabled === 'boolean'
      ? candidate.filesEnabled
      : DEFAULT_CONFIG.filesEnabled,
    fileLinksInPanel: typeof candidate.fileLinksInPanel === 'boolean'
      ? candidate.fileLinksInPanel
      : DEFAULT_CONFIG.fileLinksInPanel,
    sideChatEnabled: typeof candidate.sideChatEnabled === 'boolean'
      ? candidate.sideChatEnabled
      : DEFAULT_CONFIG.sideChatEnabled,
    terminalShell: candidate.terminalShell,
    terminalScrollback: clampInt(
      candidate.terminalScrollback,
      500,
      20_000,
      DEFAULT_CONFIG.terminalScrollback,
    ),
    terminalFontSize: clampInt(
      candidate.terminalFontSize,
      10,
      24,
      DEFAULT_CONFIG.terminalFontSize,
    ),
    panelDefaultWidth: clampInt(
      candidate.panelDefaultWidth,
      300,
      720,
      DEFAULT_CONFIG.panelDefaultWidth,
    ),
    panelMaxWidth: clampInt(
      candidate.panelMaxWidth,
      300,
      720,
      DEFAULT_CONFIG.panelMaxWidth,
    ),
    panelLauncherWidth: clampPanelLauncherWidth(
      typeof candidate.panelLauncherWidth === 'number'
        ? candidate.panelLauncherWidth
        : DEFAULT_CONFIG.panelLauncherWidth,
    ),
    panelRememberTabs: candidate.panelRememberTabs,
  }
}

/**
 * Pick the fields present on a PATCH body after validating them against the
 * same rules as {@link parseCodexConfig}.
 */
export function parseCodexPatch(
  value: unknown,
): Partial<DshCodexConfig> | undefined {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return undefined
  }
  const parsed = parseCodexConfig({ ...DEFAULT_CONFIG, ...value })
  if (parsed === undefined) return undefined
  const candidate = value as Record<string, unknown>
  const patch: Partial<DshCodexConfig> = {}
  for (const field of CODEX_CONFIG_FIELDS) {
    if (field in candidate) {
      ;(patch as Record<string, unknown>)[field] = parsed[field]
    }
  }
  return Object.keys(patch).length === 0 ? undefined : patch
}

/** Fields that differ from schema defaults — the durable user layer. */
export function diffsFromDefaults(
  value: DshCodexConfig,
): Partial<DshCodexConfig> {
  const next: Partial<DshCodexConfig> = {}
  for (const field of CODEX_CONFIG_FIELDS) {
    if (!Object.is(value[field], DEFAULT_CONFIG[field])) {
      ;(next as Record<string, unknown>)[field] = value[field]
    }
  }
  return next
}
