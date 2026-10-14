import { readFile, writeFile } from 'node:fs/promises'
import ts from 'typescript'

// Reuse the canonical DSH glyphs without adding React to standalone overlays.
const names = new Set([
  'IconSideChatColor16', 'IconDataOutline16', 'IconRightUpOutline16', 'IconOpenInWindowOutline16',
  'IconChevronDownOutline14', 'IconCloseOutline16', 'IconTreeCorner8x10',
  'IconSparkle16', 'IconLikeOutline16', 'IconPlayOutline16', 'IconUserOutline16',
])
const source = ts.createSourceFile('icons.tsx', await readFile(new URL('../src/icons/index.tsx', import.meta.url), 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;')
const attributeName = name => ['viewBox', 'preserveAspectRatio', 'gradientUnits', 'gradientTransform'].includes(name)
  ? name : name.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)
const tags = new Set(['svg', 'g', 'path', 'rect', 'circle', 'ellipse', 'line', 'polyline', 'polygon', 'defs', 'clipPath', 'linearGradient', 'stop'])

function serialize(node, root = false) {
  if (ts.isParenthesizedExpression(node)) return serialize(node.expression, root)
  if (ts.isJsxText(node) || ts.isJsxExpression(node) && !node.expression) return ''
  if (!ts.isJsxElement(node) && !ts.isJsxSelfClosingElement(node)) throw new Error('Expected static SVG markup')
  const opening = ts.isJsxElement(node) ? node.openingElement : node
  const tag = opening.tagName.getText(source)
  if (!tags.has(tag)) throw new Error(`Unsupported SVG element: ${tag}`)
  const attrs = {}
  for (const attr of opening.attributes.properties) {
    if (!ts.isJsxAttribute(attr)) throw new Error('SVG spreads are not supported')
    const name = attr.name.getText(source)
    // Root sizing and flex placement belong to createDshIcon and its container.
    if (name === 'className' || root && ['width', 'height', 'style'].includes(name)) continue
    const value = attr.initializer
    if (value && ts.isStringLiteral(value)) attrs[attributeName(name)] = value.text
    else if (value && ts.isJsxExpression(value) && value.expression && ts.isNumericLiteral(value.expression)) attrs[attributeName(name)] = value.expression.text
    else throw new Error(`Dynamic SVG attribute: ${name}`)
  }
  if (root) {
    const dimensions = attrs.viewBox?.split(/\s+/)
    if (dimensions?.length !== 4) throw new Error('Icon is missing its viewBox')
    attrs.width = dimensions[2]
    attrs.height = dimensions[3]
    attrs.xmlns = 'http://www.w3.org/2000/svg'
  }
  const attributes = Object.entries(attrs).map(([name, value]) => ` ${name}="${escape(value)}"`).join('')
  const children = ts.isJsxElement(node) ? node.children.map(child => serialize(child)).join('') : ''
  return `<${tag}${attributes}>${children}</${tag}>`
}

const icons = {}
for (const statement of source.statements) {
  if (!ts.isVariableStatement(statement)) continue
  for (const declaration of statement.declarationList.declarations) {
    if (!ts.isIdentifier(declaration.name) || !names.has(declaration.name.text)) continue
    if (!declaration.initializer || !ts.isArrowFunction(declaration.initializer)) throw new Error('Expected icon factory')
    icons[declaration.name.text] = serialize(declaration.initializer.body, true)
  }
}
if (Object.keys(icons).length !== names.size) throw new Error('A requested DSH icon was not found')
await writeFile(new URL('../src/icons/svg-data.ts', import.meta.url), `// Generated from icons/index.tsx by scripts/generate-icon-svgs.mjs.\nexport const DSH_ICON_SVGS = ${JSON.stringify(icons, null, 2)} as const\n`)
