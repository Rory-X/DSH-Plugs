import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client'
import type { SettingsScope } from '@deepseek-ai/dsh-client-runtime/client'
import type {} from '@deepseek-ai/dsh-client-ui-conversation/client'
import type { DshCodexConfig } from '../../../shared/config'
import type { CodexFeature } from '../../core/feature-manager'
import { NavigatorRail } from './navigator-rail'

interface SessionLoadFace {
  binding(id: string): { session: { loadOlder(): Promise<void> } } | undefined
}

interface ConnectionFace {
  connection?: { api?: unknown }
}

export function createNavigatorFeature(ctx: ClientContext, scope: SettingsScope<DshCodexConfig>): CodexFeature {
  return {
    id: 'navigator',
    activate() {
      // Header stays mounted across history prepends. turnTail remounts on every
      // loadOlder page, and the old claim/unclaim race left the rail with no owner.
      const dispose = ctx.slots.inject('conversation.session.header.actions', () =>
        ctx.slots.register(
          {
            name: 'conversation.session.header.actions',
            id: 'codex-navigator-rail',
            order: 99,
            inject: () => ({
              scope,
              api: (ctx as unknown as ConnectionFace).connection?.api,
              loadOlder: (sessionId: string) => {
                const sessions = ctx.sessions as unknown as SessionLoadFace
                return sessions.binding(sessionId)?.session.loadOlder()
              },
            }),
          },
          NavigatorRail as never,
        ),
      )
      return dispose
    },
  }
}
