export interface DesktopOverlayMoveResult {
  x: number
  y: number
  hitEdge: boolean
}

export interface DesktopOverlayDragEvent {
  contributor: string
  id: string
  phase: 'start' | 'move' | 'end' | 'cancel'
  dragged: boolean
  bounds: { x: number; y: number; width: number; height: number }
}

export interface DesktopOverlayInfo {
  contributor: string
  id: string
  bounds: { x: number; y: number; width: number; height: number }
  workArea?: { x: number; y: number; width: number; height: number }
}

export interface DshDesktopOverlays {
  open(spec: {
    contributor: string
    id: string
    url: string
    bounds: { width: number; height: number; x?: number; y?: number }
    chrome?: {
      transparent?: boolean
      frame?: boolean
      alwaysOnTop?: boolean
      skipTaskbar?: boolean
      resizable?: boolean
      hasShadow?: boolean
      ignoreMouseEvents?: 'none' | 'all' | 'forward'
    }
  }): Promise<DesktopOverlayInfo>
  update?(id: string, spec: { bounds?: Partial<DesktopOverlayInfo['bounds']> }): Promise<DesktopOverlayInfo>
  move(id: string, spec: { dx: number; dy: number } | { x: number; y: number }): Promise<DesktopOverlayMoveResult>
  setDragRegions?(id: string, regions: Array<{ x: number; y: number; width: number; height: number }>): Promise<void>
  cancelDrag?(id: string): void
  onDrag?(listener: (event: DesktopOverlayDragEvent) => void): () => void
  postMessage?(id: string, payload: unknown, options?: { focusOwner?: boolean }): Promise<boolean>
  onMessage?(listener: (event: { contributor: string; id: string; payload: unknown }) => void): () => void
  setIgnoreMouseEvents(id: string, ignore: boolean, opts?: { forward?: boolean }): Promise<void>
  close(id: string): Promise<void>
  list(): Promise<DesktopOverlayInfo[]>
  onClosed(listener: (event: { contributor: string; id: string }) => void): () => void
}

export interface DshDesktop {
  overlays?: DshDesktopOverlays
}

export function bridge(): DshDesktop | undefined {
  return (window as unknown as { dshDesktop?: DshDesktop }).dshDesktop
}
