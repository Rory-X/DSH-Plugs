import { useState, useSyncExternalStore } from 'react'
import { Button, SettingsSection, StatusText } from '@just-genius/dsh-plugin-ui'
import { NOTIFICATION_TEST_TAG } from './tag'
import { waitForTestNotification, type NotificationPermissions } from './permissions'
import type { NotificationKey } from './locales'

export interface NotificationSettingsInjected {
  permissions: NotificationPermissions
  t: (key: NotificationKey) => string
}

export function NotificationSettings({ permissions, t }: NotificationSettingsInjected) {
  const state = useSyncExternalStore(permissions.subscribe, permissions.getSnapshot)
  const [busy, setBusy] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fail = (cause: unknown) => {
    const message = cause instanceof Error ? cause.message : String(cause)
    setError(message === 'rate-limited' ? t('rateLimited') : message === 'limit' ? t('activeLimit') : message === 'failed' ? t('failed') : message)
  }
  const test = async () => {
    setBusy(true); setSent(false); setError(null)
    try {
      const permission = await permissions.requestPermission()
      if (permission === 'denied' || (permission !== 'granted' && state.transport === 'browser')) throw new Error(t('denied'))
      await waitForTestNotification(() => new window.Notification(t('testTitle'), { body: t('testBody'), tag: NOTIFICATION_TEST_TAG }))
      setSent(true)
      await permissions.refresh()
    } catch (cause) { fail(cause) } finally { setBusy(false) }
  }
  const status = !state.supported ? 'unsupported' : state.checking ? 'checking'
    : state.setting === 'Unknown' ? 'unknown' : state.permission === 'granted' ? 'granted'
      : state.permission === 'denied' ? 'denied' : 'pending'
  return (
    <SettingsSection busy={busy || state.checking}>
      <h2>{t('nav')}</h2>
      <p>{t('description')}</p>
      <p>{t(state.transport === 'desktop' ? 'desktop' : 'browser')}</p>
      <StatusText>{t(status)}</StatusText>
      {state.transport === 'browser' && state.permission === 'denied' ? <p>{t('browserHint')}</p> : null}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 16 }}>
        <Button size="sm" variant="outline" disabled={busy || state.checking || !state.supported}
          onClick={() => { void permissions.requestPermission().catch(fail) }}>
          {t(state.transport === 'browser' && state.permission !== 'granted' ? 'enable' : 'refresh')}
        </Button>
        <Button size="sm" disabled={busy || state.checking || !state.supported} onClick={() => { void test() }}>
          {t(busy ? 'testing' : 'test')}
        </Button>
        {permissions.openSettings === undefined ? null : (
          <Button size="sm" variant="outline" onClick={() => { void permissions.openSettings!().catch(fail) }}>{t('settings')}</Button>
        )}
      </div>
      {sent ? <StatusText>{t('testSent')}</StatusText> : null}
      {error === null ? null : <p role="alert">{error}</p>}
    </SettingsSection>
  )
}
