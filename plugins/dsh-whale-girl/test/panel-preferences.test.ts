import { describe, expect, it } from 'vitest'
import { createPetPanelPreferences, petPanelVisibility, PET_PANEL_PREFERENCES_KEY, readPetPanelPreferences } from '../src/shared/panel-preferences'

describe('pet panel preferences', () => {
  it('starts compact and ignores malformed saved fields without losing valid choices', () => {
    expect(readPetPanelPreferences(null)).toEqual({ controlsExpanded: true, sessionsExpanded: false, statsExpanded: false })
    expect(readPetPanelPreferences('{broken')).toEqual({ controlsExpanded: true, sessionsExpanded: false, statsExpanded: false })
    expect(readPetPanelPreferences('[true, true]')).toEqual({ controlsExpanded: true, sessionsExpanded: false, statsExpanded: false })
    expect(readPetPanelPreferences('{"sessionsExpanded":"false","statsExpanded":true}'))
      .toEqual({ controlsExpanded: true, sessionsExpanded: false, statsExpanded: true })
  })

  it('restores each panel independently after remounting the pet', () => {
    const saved = new Map<string, string>()
    const storage = { getItem: (key: string) => saved.get(key) ?? null, setItem: (key: string, value: string) => { saved.set(key, value) } }
    const preferences = createPetPanelPreferences(() => storage)
    preferences.toggle('statsExpanded')
    preferences.toggle('sessionsExpanded')
    preferences.set('sessionsExpanded', false)
    expect(createPetPanelPreferences(() => storage).getSnapshot()).toEqual({ controlsExpanded: true, sessionsExpanded: false, statsExpanded: true })
  })

  it('keeps manual controls working when browser storage access or writes fail', () => {
    for (const storage of [
      () => { throw new Error('storage unavailable') },
      () => ({ getItem: () => null, setItem: () => { throw new Error('quota exceeded') } }),
    ]) {
      const preferences = createPetPanelPreferences(storage)
      preferences.toggle('sessionsExpanded')
      preferences.toggle('statsExpanded')
      preferences.toggle('sessionsExpanded')
      expect(preferences.getSnapshot()).toEqual({ controlsExpanded: true, sessionsExpanded: false, statsExpanded: true })
    }
  })

  it('adopts another window’s choice and handles clearing preferences', () => {
    const saved = new Map<string, string>()
    const storage = { getItem: (key: string) => saved.get(key) ?? null, setItem: (key: string, value: string) => { saved.set(key, value) } }
    const page = createPetPanelPreferences(() => storage)
    const overlay = createPetPanelPreferences(() => storage)
    const changes: unknown[] = []
    const unsubscribe = page.subscribe(() => changes.push(page.getSnapshot()))
    overlay.toggle('statsExpanded')
    overlay.set('controlsExpanded', false)
    page.reload()
    expect(page.getSnapshot().statsExpanded).toBe(true)
    expect(petPanelVisibility(page.getSnapshot())).toEqual({ controls: false, sessions: false, stats: false })
    saved.delete(PET_PANEL_PREFERENCES_KEY)
    page.reload()
    expect(page.getSnapshot()).toEqual({ controlsExpanded: true, sessionsExpanded: false, statsExpanded: false })
    unsubscribe()
    page.toggle('sessionsExpanded')
    expect(changes).toHaveLength(2)
  })

  it('remembers the hidden dock and restores controls plus sessions in a single update', () => {
    const saved = new Map<string, string>()
    const storage = { getItem: (key: string) => saved.get(key) ?? null, setItem: (key: string, value: string) => { saved.set(key, value) } }
    const preferences = createPetPanelPreferences(() => storage)
    preferences.set('statsExpanded', true)
    preferences.set('controlsExpanded', false)
    const restored = createPetPanelPreferences(() => storage)
    expect(restored.getSnapshot()).toEqual({ controlsExpanded: false, sessionsExpanded: false, statsExpanded: true })
    expect(petPanelVisibility(restored.getSnapshot())).toEqual({ controls: false, sessions: false, stats: false })
    const changes: unknown[] = []
    restored.subscribe(() => changes.push(petPanelVisibility(restored.getSnapshot())))
    restored.set('controlsExpanded', true)
    expect(changes).toEqual([{ controls: true, sessions: true, stats: true }])
  })

  it('keeps stats folded when revealing controls after hiding a visible conversation', () => {
    const preferences = createPetPanelPreferences(() => ({ getItem: () => null, setItem: () => {} }))
    preferences.set('sessionsExpanded', true)
    preferences.toggle('controlsExpanded')
    expect(petPanelVisibility(preferences.getSnapshot())).toEqual({ controls: false, sessions: false, stats: false })
    preferences.toggle('controlsExpanded')
    expect(petPanelVisibility(preferences.getSnapshot())).toEqual({ controls: true, sessions: true, stats: false })
  })
})
