import { createDshIcon } from '@just-genius/dsh-plugin-ui/icons-dom'
import type { PetPanelPreferenceStore } from '../shared/panel-preferences.ts'

const CSS = `
.whale-panel-dock {
  position: absolute; display: grid; place-items: center; box-sizing: border-box;
  width: 48px; height: 20px; margin: 0; padding: 0; border: 0; border-radius: 10px;
  background: transparent; color: #e5edf8; cursor: pointer; pointer-events: auto;
  touch-action: manipulation; -webkit-app-region: no-drag; z-index: 15;
}
.whale-panel-dock::before {
  content: ''; position: absolute; inset: 7px 6px; box-sizing: border-box; border-radius: 10px;
  border: 1px solid rgba(239,246,255,.38);
  background: linear-gradient(180deg, rgba(241,248,255,.28), rgba(137,161,191,.10));
  box-shadow: inset 0 1px 0 rgba(255,255,255,.22), 0 1px 4px rgba(8,15,27,.18);
  backdrop-filter: blur(10px) saturate(1.25); -webkit-backdrop-filter: blur(10px) saturate(1.25);
  transition: inset .16s ease, background .16s ease, border-color .16s ease;
  pointer-events: none;
}
.whale-panel-dock > svg {
  position: relative; display: block; width: 12px; height: 12px; flex: none;
  opacity: 0; transform: translateY(-1px); pointer-events: none;
  filter: drop-shadow(0 1px 1px rgba(0,0,0,.45)); transition: opacity .16s ease, transform .16s ease;
}
.whale-panel-dock[aria-expanded="true"] > svg { transform: translateY(1px) rotate(180deg); }
.whale-panel-dock:hover::before, .whale-panel-dock:focus-visible::before {
  inset: 1px 7px; background: rgba(65,84,109,.32); border-color: rgba(239,246,255,.5);
}
.whale-panel-dock:hover > svg, .whale-panel-dock:focus-visible > svg { opacity: 1; transform: none; }
.whale-panel-dock[aria-expanded="true"]:hover > svg,
.whale-panel-dock[aria-expanded="true"]:focus-visible > svg { transform: rotate(180deg); }
.whale-panel-dock[aria-expanded="false"][data-status="waiting"]::before { border-color: rgba(237,195,112,.75); }
.whale-panel-dock:focus-visible { outline: 2px solid #9ecefa; outline-offset: 2px; }
@media (prefers-reduced-motion: reduce) {
  .whale-panel-dock::before, .whale-panel-dock > svg { transition: none; }
}
`

export function createPetPanelDock(preferences: PetPanelPreferenceStore, controls: string) {
  const style = document.createElement('style')
  style.textContent = CSS
  document.head.append(style)
  const element = document.createElement('button')
  element.type = 'button'
  element.className = 'whale-panel-dock'
  element.setAttribute('aria-controls', controls)
  element.append(createDshIcon('IconChevronDownOutline14', 12))
  const render = () => {
    const expanded = preferences.getSnapshot().controlsExpanded
    const label = expanded ? '隐藏按钮和面板' : '显示按钮和会话'
    element.setAttribute('aria-expanded', String(expanded))
    element.setAttribute('aria-label', label)
    element.title = label
  }
  const toggle = () => preferences.toggle('controlsExpanded')
  element.addEventListener('click', toggle)
  const unsubscribe = preferences.subscribe(render)
  render()
  return {
    element,
    dispose() {
      unsubscribe()
      element.removeEventListener('click', toggle)
      element.remove()
      style.remove()
    },
  }
}
