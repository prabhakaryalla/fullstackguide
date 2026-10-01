import { describe, it, expect, vi } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useTopicTags } from '../../src/features/tags/hooks/useTopicTags'

vi.mock('../../src/features/tags/data/getTopicTagsIndex', () => ({
  getTopicTagsIndex: () =>
    Promise.resolve(
      new Map([
        ['a', ['caching', 'databases']],
        ['b', []],
      ]),
    ),
}))

describe('useTopicTags', () => {
  it('starts loading, then becomes ready with the matched tag ids', async () => {
    const { result } = renderHook(() => useTopicTags('a'))

    expect(result.current.status).toBe('loading')

    await waitFor(() => expect(result.current.status).toBe('ready'))
    expect(result.current.tagIds).toEqual(['caching', 'databases'])
  })

  it('resolves an empty array for a topic with no matching tags', async () => {
    const { result } = renderHook(() => useTopicTags('b'))
    await waitFor(() => expect(result.current.status).toBe('ready'))

    expect(result.current.tagIds).toEqual([])
  })

  it('resolves an empty array for an id absent from the index', async () => {
    const { result } = renderHook(() => useTopicTags('unknown'))
    await waitFor(() => expect(result.current.status).toBe('ready'))

    expect(result.current.tagIds).toEqual([])
  })
})
