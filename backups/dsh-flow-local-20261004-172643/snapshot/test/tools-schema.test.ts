import { expect, test } from 'vitest'

import { defineTool } from '@just-genius/dsh-plugin-runtime/host'

import { NODE_SCHEMA } from '../src/tools.ts'

/**
 * Tool parameter schemas must compile under the real value-schema DSL.
 *
 * This is a boot-safety test, not a behaviour test. `defineTool()` throws when
 * an author schema uses an unsupported key, and this plugin builds its tools
 * inside `apply()` — so an unsupported schema crashes the whole DSH profile at
 * startup rather than failing one call. Shipping the wrong shape took the GUI
 * down once (an `items` object declaring `required`), which is why the schemas
 * are asserted here instead of only being exercised at runtime.
 *
 * The DSL compiles an array's `items` with `allowRequired: false`, so `required`
 * is illegal inside any object that is itself an array item. Requiredness is
 * described in prose and enforced in the argument parsers.
 *
 * `NODE_SCHEMA` is imported from the plugin source rather than duplicated here:
 * a copy in this file could not catch drift in the real one, and drift is
 * exactly what takes the profile down.
 */

/** Compile one parameter map exactly as `defineTool` would at boot. */
function compile(parameters: Record<string, unknown>) {
  return defineTool({
    name: 'schema.compile.check',
    description: 'Compiles a candidate parameter schema.',
    // Invalid maps are part of the suite: they must fail at runtime, not at tsc.
    parameters: parameters as never,
    output: { schema: { type: 'string' }, render: (_args, value) => [{ type: 'text', text: value }] },
    execute: async () => 'ok',
  })
}

test('flow.plan parameters compile', () => {
  expect(() => compile({
    title: { type: 'string' },
    nodes: { type: 'array', items: NODE_SCHEMA },
    concurrency: { type: 'integer' },
  })).not.toThrow()
})

test('the node schema carries writeScope, so a plan can declare its blast radius', () => {
  // Without this field the scheduler and the guard would have nothing to read,
  // and every plan would silently degrade to one step at a time.
  const properties = (NODE_SCHEMA as { properties: Record<string, unknown> }).properties
  expect(Object.keys(properties)).toContain('writeScope')
  expect(properties['writeScope']).toMatchObject({ type: 'array', items: { type: 'string' } })
})

test('flow.patch parameters compile', () => {
  expect(() => compile({
    ops: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          op: { type: 'string', enum: ['retry', 'skip', 'cancel', 'add', 'remove'] },
          nodeId: { type: 'string' },
          node: { type: 'json' },
        },
      },
    },
  })).not.toThrow()
})

test('flow.expand parameters compile', () => {
  expect(() => compile({
    parentId: { type: 'string' },
    nodes: { type: 'array', items: NODE_SCHEMA },
  })).not.toThrow()
})

test('flow.confirm parameters compile', () => {
  expect(() => compile({
    question: { type: 'string' },
    nodeId: { type: 'string' },
  })).not.toThrow()
})

test('flow.status parameters compile', () => {
  expect(() => compile({
    nodeId: { type: 'string', description: 'Optional focus.' },
  })).not.toThrow()
})

test('flow.report parameters compile', () => {
  expect(() => compile({
    note: { type: 'string', description: 'Required. One line of progress.' },
  })).not.toThrow()
})

test('parameterless tools compile', () => {
  expect(() => compile({})).not.toThrow()
})

test('a required block inside array items is rejected by the DSL', () => {
  // Documents the constraint rather than asserting our own preference: this is
  // exactly the shape that crashed profile boot.
  expect(() => compile({
    nodes: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: { id: { type: 'string' } },
        required: { id: true },
      },
    },
  })).toThrow(/required is not supported by the value schema DSL/)
})

test('an object missing additionalProperties is rejected by the DSL', () => {
  expect(() => compile({
    node: { type: 'object', properties: { id: { type: 'string' } } },
  })).toThrow(/additionalProperties/)
})
