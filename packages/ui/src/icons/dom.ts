import { DSH_ICON_SVGS } from './svg-data.ts'

export type DshDomIconName = keyof typeof DSH_ICON_SVGS

/** Canonical DSH SVG glyphs for plain DOM surfaces, without the React runtime. */
export function createDshIcon(name: DshDomIconName, size = 16): SVGSVGElement {
  const svg = new DOMParser().parseFromString(DSH_ICON_SVGS[name], 'image/svg+xml').documentElement as unknown as SVGSVGElement
  svg.setAttribute('width', String(size))
  svg.setAttribute('height', String(size))
  svg.setAttribute('aria-hidden', 'true')
  svg.setAttribute('focusable', 'false')
  svg.style.pointerEvents = 'none'
  svg.style.flexShrink = '0'
  return svg
}
