import type { Context } from '@deepseek-ai/cordis'
import type {} from '@deepseek-ai/dsh-llm'
import type {} from '@deepseek-ai/dsh-settings'
import Schema from '@deepseek-ai/schemastery'
import { settingsNamespace } from '@deepseek-ai/dsh-settings'
import {
  DEFAULTS_NAMESPACE, EMPTY_CONFIG, injectDefaultEffort,
  type ModelCustomExConfig,
} from './shared.ts'

export const name = 'dsh-model-custom-ex'
export const inject = ['settings', 'llm'] as const

const ConfigSchema: Schema<ModelCustomExConfig> = Schema.object({
  defaults: Schema.dict(Schema.dict(Schema.string())).default({}),
})

export function apply(ctx: Context): void {
  const scope = ctx.settings.register(
    settingsNamespace(DEFAULTS_NAMESPACE),
    ConfigSchema,
    { base: EMPTY_CONFIG },
  )

  const original = ctx.llm.resolveModelInfo.bind(ctx.llm)
  ctx.llm.resolveModelInfo = async (provider, model, signal) => {
    const info = await original(provider, model, signal)
    return injectDefaultEffort(info, (scope.get() as ModelCustomExConfig).defaults)
  }

  ctx.effect(() => () => {
    ctx.llm.resolveModelInfo = original
  }, 'dsh-model-custom-ex: restore resolveModelInfo')
}
