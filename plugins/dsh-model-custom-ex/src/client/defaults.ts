import type { IApiClient, SettingsNamespaceView } from '@deepseek-ai/dsh-api-remotes/client'
import { DEFAULTS_NAMESPACE, pickProviderDefaults } from '../shared.ts'

/** Read one provider's defaults from the page's settings snapshot. */
export function defaultsFromNamespace(
  namespace: SettingsNamespaceView | undefined,
  provider: string,
): Record<string, string> {
  const root = namespace?.value
  if (typeof root !== 'object' || root === null || Array.isArray(root)) return {}
  const defaults = (root as { defaults?: Record<string, Record<string, string>> }).defaults
  return pickProviderDefaults(defaults, provider)
}

/** Persist one provider's defaults, or drop the row when the map is empty. */
export async function writeProviderDefaults(
  api: Pick<IApiClient, 'settings'>,
  provider: string,
  next: Record<string, string>,
  expectedRevision: number,
): Promise<{ ok: true; revision: number } | { ok: false; message: string }> {
  const response = await api.settings.mutate({
    ns: DEFAULTS_NAMESPACE,
    expectedRevision,
    ops: Object.keys(next).length === 0
      ? [{ op: 'unset', path: ['defaults', provider] }]
      : [{ op: 'set', path: ['defaults', provider], value: next }],
  })
  if (!response.result.ok) {
    return { ok: false, message: response.result.error.message }
  }
  return { ok: true, revision: response.result.value.revision }
}
