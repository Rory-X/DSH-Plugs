// In-app restart prompt: DSH Modal over the shell, driven by
// window.dshDesktop.updates.onPrompt. Replaces Electron's native dialog.

import { useEffect, useState } from 'react'
import { Button, Modal } from '@deepseek-ai/dsh-client-ui-primitives'
import { injectStyles } from '@just-genius/dsh-plugin-ui'
import { bridge, type DesktopRestartChoice, type DesktopRestartPrompt } from './bridge'

const CSS = `
.dsh-du-restart-dialog{width:min(440px, calc(100vw - 48px))}
.dsh-du-restart-detail{margin:0;font-size:13px;line-height:1.6;color:var(--dsw-alias-label-secondary)}
.dsh-du-restart-footer{display:flex;justify-content:flex-end;gap:8px}
`

injectStyles('@just-genius/dsh-desktop-update', '@just-genius/dsh-desktop-update/restart-prompt.css', CSS)

export function RestartPrompt() {
  const [prompt, setPrompt] = useState<DesktopRestartPrompt | null>(null)

  useEffect(() => {
    const b = bridge()
    if (b?.updates.onPrompt === undefined) return
    const off = b.updates.onPrompt((next) => {
      b.updates.ackPrompt(next.id)
      setPrompt((current) => (current?.id === next.id ? current : next))
    })
    return off
  }, [])

  if (prompt === null) return null

  const respond = (choice: DesktopRestartChoice): void => {
    const id = prompt.id
    setPrompt(null)
    const b = bridge()
    if (b === undefined) return
    b.updates.respondPrompt(id, choice)
  }

  return (
    <Modal
      open
      title={prompt.title}
      description={prompt.message}
      closeLabel={prompt.later}
      onClose={() => { respond('later') }}
      className="dsh-du-restart-dialog"
      footer={(
        <div className="dsh-du-restart-footer">
          <Button variant="outline" type="button" onClick={() => { respond('later') }}>
            {prompt.later}
          </Button>
          <Button variant="primary" type="button" onClick={() => { respond('restart') }}>
            {prompt.restart}
          </Button>
        </div>
      )}
    >
      <p className="dsh-du-restart-detail">{prompt.detail}</p>
    </Modal>
  )
}
