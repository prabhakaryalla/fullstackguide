import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest'
import { getTopicTagsIndex } from '../../src/features/tags/data/getTopicTagsIndex'
import { getAllSearchableTopics } from '../../src/features/search/data/getAllSearchableTopics'
import { stubContentIndexFetch } from '../testUtils/stubContentIndexFetch'

beforeAll(() => {
  stubContentIndexFetch()
})

afterAll(() => {
  vi.unstubAllGlobals()
})

describe('getTopicTagsIndex', () => {
  it('assigns a plausible tag to a known real topic', async () => {
    const index = await getTopicTagsIndex()
    const singletonTopic = getAllSearchableTopics().find(
      (entry) => entry.topic.slug === 'singleton-pattern-implementation',
    )
    expect(singletonTopic).toBeDefined()

    const tagIds = index.get(singletonTopic?.topic.id ?? '')
    expect(tagIds).toContain('design-patterns')
  })

  it('returns the same cached promise instance on repeat calls', () => {
    const first = getTopicTagsIndex()
    const second = getTopicTagsIndex()
    expect(first).toBe(second)
  })

  it('has an entry (possibly empty array, never omitted) for every topic', async () => {
    const index = await getTopicTagsIndex()
    for (const { topic } of getAllSearchableTopics().slice(0, 20)) {
      expect(index.has(topic.id)).toBe(true)
      expect(Array.isArray(index.get(topic.id))).toBe(true)
    }
  })
})
