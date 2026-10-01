import { describe, it, expect, vi } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useRelatedTopics } from '../../src/features/related-topics/hooks/useRelatedTopics'
import type { Topic } from '../../src/features/main/model/types'

const topicA: Topic = { id: 'a', slug: 'a', title: 'Topic A', markdownPath: 'x/a.md' }
const topicB: Topic = { id: 'b', slug: 'b', title: 'Topic B', markdownPath: 'x/b.md' }
const topicC: Topic = { id: 'c', slug: 'c', title: 'Topic C', markdownPath: 'y/c.md' }
const topicD: Topic = { id: 'd', slug: 'd', title: 'Topic D', markdownPath: 'y/d.md' }

vi.mock('../../src/features/related-topics/data/getRelatedTopicsKeywordIndex', () => ({
  getRelatedTopicsKeywordIndex: () =>
    Promise.resolve(
      new Map([
        ['a', new Set(['cache', 'invalidation', 'redis'])],
        ['b', new Set(['cache', 'invalidation'])],
        ['c', new Set(['cache'])],
        ['d', new Set(['unrelated', 'topic'])],
      ]),
    ),
}))

vi.mock('../../src/features/search/data/getAllSearchableTopics', () => ({
  getAllSearchableTopics: () => [
    { topic: topicA, menuId: 'x', menuLabel: 'X' },
    { topic: topicB, menuId: 'x', menuLabel: 'X' },
    { topic: topicC, menuId: 'y', menuLabel: 'Y' },
    { topic: topicD, menuId: 'y', menuLabel: 'Y' },
  ],
}))

describe('useRelatedTopics', () => {
  it('starts loading, becomes ready, and ranks by keyword overlap descending', async () => {
    const { result } = renderHook(() => useRelatedTopics(topicA))

    expect(result.current.status).toBe('loading')

    await waitFor(() => expect(result.current.status).toBe('ready'))

    const ids = result.current.relatedTopics.map((entry) => entry.topic.id)
    expect(ids).toEqual(['b', 'c'])
  })

  it('never includes the current topic itself', async () => {
    const { result } = renderHook(() => useRelatedTopics(topicA))
    await waitFor(() => expect(result.current.status).toBe('ready'))

    expect(result.current.relatedTopics.some((entry) => entry.topic.id === 'a')).toBe(false)
  })

  it('excludes topics with zero keyword overlap', async () => {
    const { result } = renderHook(() => useRelatedTopics(topicA))
    await waitFor(() => expect(result.current.status).toBe('ready'))

    expect(result.current.relatedTopics.some((entry) => entry.topic.id === 'd')).toBe(false)
  })

  it('returns an empty array once ready for a topic with no keyword overlap with anything', async () => {
    const { result } = renderHook(() => useRelatedTopics(topicD))
    await waitFor(() => expect(result.current.status).toBe('ready'))

    expect(result.current.relatedTopics).toEqual([])
  })
})
