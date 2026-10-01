import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest'
import { getAllTopicContentIndex } from '../../src/features/search/data/getAllTopicContentIndex'
import { getAllSearchableTopics } from '../../src/features/search/data/getAllSearchableTopics'
import { stubContentIndexFetch } from '../testUtils/stubContentIndexFetch'

beforeAll(() => {
  stubContentIndexFetch()
})

afterAll(() => {
  vi.unstubAllGlobals()
})

describe('getAllTopicContentIndex', () => {
  it('resolves a non-empty raw markdown string for a known real topic', async () => {
    const index = await getAllTopicContentIndex()
    const azureTopic = getAllSearchableTopics().find((entry) => entry.topic.slug === 'azure-event-hubs')
    expect(azureTopic).toBeDefined()

    const text = index.get(azureTopic?.topic.id ?? '')
    expect(text).toBeTruthy()
    expect(text?.length).toBeGreaterThan(0)
  })

  it('returns the same cached promise instance on repeat calls', () => {
    const first = getAllTopicContentIndex()
    const second = getAllTopicContentIndex()
    expect(first).toBe(second)
  })

  it('fetches the content index exactly once even across repeat calls', async () => {
    await getAllTopicContentIndex()
    await getAllTopicContentIndex()
    expect(fetch).toHaveBeenCalledTimes(1)
  })
})
