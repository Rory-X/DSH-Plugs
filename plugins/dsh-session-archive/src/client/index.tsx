import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client'
import type {} from '@deepseek-ai/dsh-client-locale/client'
import type {} from '@deepseek-ai/dsh-client-ui-settings/client'
import { ArchiveSection } from './ArchiveSection.tsx'
import type { ArchiveSectionInjected } from './ArchiveSection.tsx'
import { installArchiveSettingsIcon } from './archive-settings-icon.ts'
import { installSidebarArchiveNoConfirm } from './sidebar-archive.ts'
import { en, zh, type ArchiveKey } from './locales.ts'

declare module '@deepseek-ai/dsh-client-ui-slots' {
  interface LocaleNamespaceMap {
    'session.archive': ArchiveKey
  }
}

const NS = 'session.archive'

export const inject = ['slots', 'locale'] as const

export function apply(ctx: ClientContext): void {
  ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'dsh-session-archive: dictionaries')

  const t = ctx.locale.bind(NS) as ArchiveSectionInjected['t']

  ctx.slots.inject('settings.section', () => ctx.slots.register({
    name: 'settings.section',
    id: 'session-archive',
    order: 47,
    label: () => t('nav'),
    inject: () => ({ t }),
  }, ArchiveSection))
  ctx.effect(() => installArchiveSettingsIcon(() => t('nav')), 'dsh-session-archive: settings icon')
  ctx.effect(() => installSidebarArchiveNoConfirm(), 'dsh-session-archive: sidebar archive without confirm')
}
