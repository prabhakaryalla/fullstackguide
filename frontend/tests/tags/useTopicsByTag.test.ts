import { describe, it, expect, vi } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useTopicsByTag } from '../../src/features/tags/hooks/useTopicsByTag'
import type { Topic } from '../../src/features/main/model/types'

const topicA: Topic = { id: 'a', slug: 'a', title: 'Topic A', markdownPath: 'x/a.md' }
const topicB: Topic = { id: 'b', slug: 'b', title: 'Topic B', markdownPath: 'x/b.md' }
const topicC: Topic = { id: 'c', slug: 'c', title: 'Topic C', markdownPath: 'y/c.md' }

vi.mock('../../src/features/tags/data/getTopicTagsIndex', () => ({
  getTopicTagsIndex: () =>
    Promise.resolve(
      new Map([
        ['a', ['caching']],
        ['b', ['caching', 'databases']],
        ['c', ['databases']],
      ]),
    ),
}))

vi.mock('../../src/features/search/data/getAllSearchableTopics', () => ({
  getAllSearchableTopics: () => [
    { topic: topicA, menuId: 'x', menuLabel: 'X' },
    { topic: topicB, menuId: 'x', menuLabel: 'X' },
    { topic: topicC, menuId: 'y', menuLabel: 'Y' },
  ],
}))

describe('useTopicsByTag', () => {
  it('resolves every topic across menus that carries the given tag', async () => {
    const { result } = renderHook(() => useTopicsByTag('caching'))

    expect(result.current.status).toBe('loading')

    await waitFor(() => expect(result.current.status).toBe('ready'))
    expect(result.current.topics.map((entry) => entry.topic.id)).toEqual(['a', 'b'])
  })

  it('resolves an empty list for a tag with no matches', async () => {
    const { result } = renderHook(() => useTopicsByTag('security'))
    await waitFor(() => expect(result.current.status).toBe('ready'))

    expect(result.current.topics).toEqual([])
  })
})
