import { describe, expect, it } from 'vitest'
import { elapsedLabel, previewText, readSessionStripContext, readSessionViews, sessionStripLayout, sessionStripOverview } from '../src/shared/session-strip'
import type { SessionView } from '../src/shared/sessions'

const row = (id: string, fields: Partial<SessionView> = {}): SessionView => ({ id, title: id, since: 100, startedAt: 1000, activity: 'thinking', running: true, ...fields })

describe('multi-session strip', () => {
  it('prioritizes pending interactions without stealing a manually selected session', () => {
    const views = [row('a'), row('b', { updatedAt: 9000 }), row('c')]
    const context = { pending: [{ id: 'c', kind: 'approval' as const }] }
    const overview = sessionStripOverview(views, context, 'b', 10000)
    expect(overview.rows.map(item => item.id)).toEqual(['c', 'a', 'b'])
    expect(overview.selected?.id).toBe('b')
    expect(overview).toMatchObject({ activeCount: 3, waitingCount: 1, rootCount: 3 })
    expect(sessionStripOverview(views, context, undefined, 10000).selected?.id).toBe('c')
  })

  it('keeps other active sessions visible and advances after a completion expires', () => {
    const views = [row('a', { running: false, activity: 'done', completedAt: 2000 }), row('b')]
    expect(sessionStripOverview(views, { pending: [] }, 'a', 2500).selected?.id).toBe('a')
    const after = sessionStripOverview(views, { pending: [] }, 'a', 11000)
    expect(after.rows.map(item => item.id)).toEqual(['b'])
    expect(after.selected?.id).toBe('b')
  })

  it('groups active children under an idle parent without double-counting the parent', () => {
    const views = [row('parent', { running: false, activity: 'done' }),
      row('child', { origin: 'subagent', parentId: 'parent' }),
      row('grandchild', { origin: 'subagent', parentId: 'child' }),
      row('fork', { parentId: 'parent' })]
    const overview = sessionStripOverview(views, { pending: [] }, undefined, 2000)
    expect(overview.rows.find(item => item.id === 'parent')).toMatchObject({ childCount: 2, status: 'running' })
    expect(overview.rows.find(item => item.id === 'grandchild')).toMatchObject({ depth: 2, ancestors: ['parent', 'child'] })
    expect(overview.rows.find(item => item.id === 'fork')?.parentId).toBeUndefined()
    expect(overview).toMatchObject({ activeCount: 3, rootCount: 2, childActiveCount: 2 })
  })

  it('ignores old idle conversations and accepts legacy active snapshots', () => {
    expect(sessionStripOverview([row('old', { activity: 'done', running: false })], { pending: [] }, undefined, 2000).rows).toEqual([])
    expect(readSessionViews([{ id: 'a', title: '旧运行时', activity: 'thinking', since: 100 }])?.[0].running).toBe(true)
    expect(readSessionViews({})).toBeNull()
    expect(readSessionStripContext({ pending: [{ id: 'a', kind: 'unknown' }, { id: 'b', kind: 'question' }] })?.pending).toEqual([{ id: 'b', kind: 'question' }])
  })

  it('formats readable summaries and elapsed time without a fake percentage', () => {
    expect(previewText('**正在验证**\n[修复结果](https://example.com)')).toBe('正在验证 修复结果')
    expect(previewText('abcdef', 4)).toBe('…def')
    expect(elapsedLabel(1000, 62000)).toBe('1:01')
    expect(elapsedLabel(1000, 3662000)).toBe('1:01:01')
    expect(elapsedLabel(2000, 1000)).toBe('0:00')
  })

  it('brings a group with a waiting child forward without double-counting that wait', () => {
    const views = [row('older', { startedAt: 100 }), row('parent', { startedAt: 200 }),
      row('child', { origin: 'subagent', parentId: 'parent', startedAt: 300 })]
    const overview = sessionStripOverview(views, { pending: [{ id: 'child', kind: 'question' }] }, undefined, 2000)
    expect(overview.rows.map(item => item.id)).toEqual(['parent', 'child', 'older'])
    expect(overview.rows[0].label).toBe('子任务等待处理')
    expect(overview.selected?.id).toBe('child')
    expect(overview.waitingCount).toBe(1)
  })
})

describe('pet-anchored strip layout', () => {
  const area = { x: 0, y: 0, width: 1920, height: 1080 }
  it('shows the horizontal strip without shifting the pet in the center of a display', () => {
    const layout = sessionStripLayout({ x: 700, y: 300 }, area, true, 2, false, false, true)
    expect(layout.bounds).toEqual({ x: 700, y: 300, width: 512, height: 252 })
    expect(layout.petX).toBe(0)
    expect(layout.petY).toBe(0)
  })
  it('opens toward the left near the right edge', () => {
    const layout = sessionStripLayout({ x: 1630, y: 300 }, area, true, 3, false)
    expect(layout.bounds.x + layout.petX).toBe(1630)
    expect(layout.panelX).toBe(8)
    expect(layout.bounds.x + layout.bounds.width).toBeLessThanOrEqual(1920)
  })
  it('opens the scrollable list upward near the bottom and keeps the grab anchor', () => {
    const layout = sessionStripLayout({ x: 700, y: 850 }, area, true, 20, true)
    expect(layout.bounds.y + layout.petY).toBe(850)
    expect(layout.listY).toBe(8)
    expect(layout.listHeight).toBe(280)
    expect(layout.bounds.y + layout.bounds.height).toBeLessThanOrEqual(1080)
  })
  it('keeps stats clear of an upward-opening list and leaves room for buttons below the dock', () => {
    const layout = sessionStripLayout({ x: 700, y: 810 }, area, true, 20, true, true, true)
    expect(layout.bounds.y + layout.petY).toBe(810)
    expect(layout.petY + 10).toBeGreaterThanOrEqual(layout.listY + layout.listHeight + 8)
    expect(layout.petY + 222 + 25).toBeLessThanOrEqual(layout.bounds.height)
    expect(layout.bounds.y + layout.bounds.height).toBeLessThanOrEqual(1080)
  })
  it('collapses back to the small widget and supports a monitor left of the primary display', () => {
    const other = { x: -1920, y: -200, width: 1920, height: 1080 }
    const expanded = sessionStripLayout({ x: -600, y: 500 }, other, true, 3, true)
    const collapsed = sessionStripLayout({ x: expanded.bounds.x + expanded.petX, y: expanded.bounds.y + expanded.petY }, other, false, 0, false)
    expect(collapsed.bounds).toEqual({ x: -600, y: 500, width: 176, height: 220 })
  })
  it('keeps hidden sessions compact even with an expanded list and new running work', () => {
    const collapsed = sessionStripLayout({ x: 700, y: 300 }, area, false, 50, true, false)
    expect(collapsed.bounds).toEqual({ x: 700, y: 300, width: 176, height: 220 })
    expect(collapsed.listHeight).toBe(0)
  })
  it('opens stats independently toward the left and restores the compact anchor on collapse', () => {
    const anchor = { x: 1744, y: 850 }
    const stats = sessionStripLayout(anchor, area, false, 3, false, true)
    expect(stats.bounds.width).toBe(290)
    expect(stats.bounds.x + stats.petX).toBe(anchor.x)
    expect(stats.panelX).toBe(8)
    expect(stats.bounds.x + stats.bounds.width).toBeLessThanOrEqual(area.width)
    const compact = sessionStripLayout({ x: stats.bounds.x + stats.petX, y: stats.bounds.y + stats.petY }, area, false, 3, false, false)
    expect(compact.bounds).toEqual({ ...anchor, width: 176, height: 220 })
  })
})
