export const PET_PANEL_PREFERENCES_KEY = 'whale-girl:panels'

export interface PetPanelPreferences {
  controlsExpanded: boolean
  sessionsExpanded: boolean
  statsExpanded: boolean
}

const DEFAULT_PREFERENCES: Readonly<PetPanelPreferences> = Object.freeze({
  controlsExpanded: true,
  sessionsExpanded: false,
  statsExpanded: false,
})

export function readPetPanelPreferences(raw: string | null): PetPanelPreferences {
  try {
    const value: unknown = JSON.parse(raw ?? 'null')
    if (value === null || typeof value !== 'object' || Array.isArray(value)) return { ...DEFAULT_PREFERENCES }
    const saved = value as Record<string, unknown>
    return {
      controlsExpanded: typeof saved.controlsExpanded === 'boolean' ? saved.controlsExpanded : true,
      sessionsExpanded: typeof saved.sessionsExpanded === 'boolean' ? saved.sessionsExpanded : false,
      statsExpanded: typeof saved.statsExpanded === 'boolean' ? saved.statsExpanded : false,
    }
  } catch {
    return { ...DEFAULT_PREFERENCES }
  }
}

/** Hiding the dock masks panels without discarding their individual choices. */
export function petPanelVisibility(preferences: Readonly<PetPanelPreferences>) {
  return {
    controls: preferences.controlsExpanded,
    sessions: preferences.controlsExpanded && preferences.sessionsExpanded,
    stats: preferences.controlsExpanded && preferences.statsExpanded,
  }
}

interface PreferenceStorage {
  getItem(key: string): string | null
  setItem(key: string, value: string): void
}

/** Presentation preferences are independent of live pet/session snapshots. */
export function createPetPanelPreferences(storage: () => PreferenceStorage) {
  const read = () => {
    try { return readPetPanelPreferences(storage().getItem(PET_PANEL_PREFERENCES_KEY)) }
    catch { return { ...DEFAULT_PREFERENCES } }
  }
  let current = read()
  const listeners = new Set<() => void>()
  const notify = () => { for (const listener of listeners) listener() }
  const set = (panel: keyof PetPanelPreferences, expanded: boolean) => {
    const next = { ...current, [panel]: expanded }
    if (panel === 'controlsExpanded' && expanded) next.sessionsExpanded = true
    if (next.controlsExpanded === current.controlsExpanded && next.sessionsExpanded === current.sessionsExpanded && next.statsExpanded === current.statsExpanded) return
    current = next
    try { storage().setItem(PET_PANEL_PREFERENCES_KEY, JSON.stringify(current)) }
    catch { /* Keep the current choice even when persistent storage is unavailable. */ }
    notify()
  }
  return {
    getSnapshot: (): Readonly<PetPanelPreferences> => current,
    set,
    toggle: (panel: keyof PetPanelPreferences) => set(panel, !current[panel]),
    reload() {
      const next = read()
      if (next.controlsExpanded === current.controlsExpanded && next.sessionsExpanded === current.sessionsExpanded && next.statsExpanded === current.statsExpanded) return
      current = next
      notify()
    },
    subscribe(listener: () => void) {
      listeners.add(listener)
      return () => { listeners.delete(listener) }
    },
  }
}

export type PetPanelPreferenceStore = ReturnType<typeof createPetPanelPreferences>
