import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest'
import { getRelatedTopicsKeywordIndex } from '../../src/features/related-topics/data/getRelatedTopicsKeywordIndex'
import { getAllSearchableTopics } from '../../src/features/search/data/getAllSearchableTopics'
import { stubContentIndexFetch } from '../testUtils/stubContentIndexFetch'

beforeAll(() => {
  stubContentIndexFetch()
})

afterAll(() => {
  vi.unstubAllGlobals()
})

describe('getRelatedTopicsKeywordIndex', () => {
  it('resolves a non-empty keyword set for a known real topic', async () => {
    const index = await getRelatedTopicsKeywordIndex()
    const azureTopic = getAllSearchableTopics().find((entry) => entry.topic.slug === 'azure-event-hubs')
    expect(azureTopic).toBeDefined()

    const words = index.get(azureTopic?.topic.id ?? '')
    expect(words).toBeDefined()
    expect(words?.size).toBeGreaterThan(0)
  })

  it('returns the same cached promise instance on repeat calls', () => {
    const first = getRelatedTopicsKeywordIndex()
    const second = getRelatedTopicsKeywordIndex()
    expect(first).toBe(second)
  })

  it('derives a word set from the title alone for every topic (never empty for a real topic)', async () => {
    const index = await getRelatedTopicsKeywordIndex()
    for (const { topic } of getAllSearchableTopics().slice(0, 20)) {
      expect(index.get(topic.id)?.size).toBeGreaterThan(0)
    }
  })
})
