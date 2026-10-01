import { describe, it, expect } from 'vitest'
import { TAG_DEFINITIONS } from '../../src/features/tags/data/tagDefinitions'

describe('TAG_DEFINITIONS', () => {
  it('has unique ids', () => {
    const ids = TAG_DEFINITIONS.map((tag) => tag.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('has a non-empty label for every tag', () => {
    for (const tag of TAG_DEFINITIONS) {
      expect(tag.label.length).toBeGreaterThan(0)
    }
  })

  it('has at least one keyword for every tag', () => {
    for (const tag of TAG_DEFINITIONS) {
      expect(tag.keywords.length).toBeGreaterThan(0)
    }
  })

  it('only uses single lowercase words of 4+ characters as keywords (required to reuse the shared significant-word index)', () => {
    for (const tag of TAG_DEFINITIONS) {
      for (const keyword of tag.keywords) {
        expect(keyword).toMatch(/^[a-z]+$/)
        expect(keyword.length).toBeGreaterThanOrEqual(4)
      }
    }
  })
})
