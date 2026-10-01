import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { PROGRESS_STORAGE_KEY, readProgressState, writeProgressState } from '../../src/features/progress/data/progressStorage'

describe('progressStorage', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  afterEach(() => {
    window.localStorage.clear()
  })

  it('returns an empty object when no value is stored', () => {
    expect(readProgressState()).toEqual({})
  })

  it('returns an empty object when the stored value is malformed JSON', () => {
    window.localStorage.setItem(PROGRESS_STORAGE_KEY, '{not valid json')
    expect(readProgressState()).toEqual({})
  })

  it.each([
    ['an array', '["azure/foo"]'],
    ['a number', '42'],
    ['a string', '"azure/foo"'],
    ['null', 'null'],
  ])('returns an empty object when the stored value is %s', (_label, raw) => {
    window.localStorage.setItem(PROGRESS_STORAGE_KEY, raw)
    expect(readProgressState()).toEqual({})
  })

  it('round-trips a written state through a read', () => {
    const state = { 'azure/azure-event-hubs': true as const }
    writeProgressState(state)
    expect(readProgressState()).toEqual(state)
  })
})
