import type { Context } from '@deepseek-ai/cordis'
import type Schema from '@deepseek-ai/schemastery'
import { agentPresetProjectionDefinition } from '@deepseek-ai/dsh-agent-presets'
import type { SessionEvent, SessionHeader } from '@deepseek-ai/dsh-session'
import type { SettingsNamespace, SettingsSectionHooks } from '@deepseek-ai/dsh-settings'

/** Validated namespace retained for existing plugins; current providers also accept strings. */
export function settingsNamespace(value: string): SettingsNamespace {
  if (!/^[a-z][a-z0-9-]*$/.test(value)) throw new TypeError(`invalid settings namespace: ${value}`)
  return value as SettingsNamespace
}

/** Register optional settings through the provider that now owns this lifecycle. */
export function installSettingsSection<T>(
  ctx: Context,
  namespace: string,
  schema: Schema<T>,
  entry: T,
  hooks: SettingsSectionHooks<T>,
): void {
  ctx.inject(['settings'], scoped => {
    scoped.settings.installSection(ctx, settingsNamespace(namespace), schema, entry, hooks)
  })
}

export interface SessionEventSource {
  snapshotEvents?: () => readonly SessionEvent[]
  events?: unknown
}

/** Public Session log accessor, with compatibility for older hosts and fixtures. */
export function sessionEvents(session: SessionEventSource): readonly SessionEvent[] {
  if (typeof session.snapshotEvents === 'function') return session.snapshotEvents()
  return Array.isArray(session.events) ? session.events as readonly SessionEvent[] : []
}

/** Resolve the selected preset using its current official projection definition. */
export function resolveSessionPreset(session: { header: SessionHeader } & SessionEventSource): string | undefined {
  let preset = agentPresetProjectionDefinition.init(session.header)
  for (const event of sessionEvents(session)) preset = agentPresetProjectionDefinition.apply(preset, event)
  return preset ?? undefined
}
