import { describe, it, expect, vi } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useAllTagsWithCounts } from '../../src/features/tags/hooks/useAllTagsWithCounts'

vi.mock('../../src/features/tags/data/getTopicTagsIndex', () => ({
  getTopicTagsIndex: () =>
    Promise.resolve(
      new Map([
        ['a', ['caching']],
        ['b', ['caching', 'databases']],
        ['c', []],
      ]),
    ),
}))

vi.mock('../../src/features/tags/data/tagDefinitions', () => ({
  TAG_DEFINITIONS: [
    { id: 'caching', label: 'Caching', keywords: ['cache'] },
    { id: 'databases', label: 'Databases', keywords: ['database'] },
    { id: 'security', label: 'Security', keywords: ['security'] },
  ],
}))

describe('useAllTagsWithCounts', () => {
  it('resolves every defined tag with its correct topic count, including zero', async () => {
    const { result } = renderHook(() => useAllTagsWithCounts())

    expect(result.current.status).toBe('loading')

    await waitFor(() => expect(result.current.status).toBe('ready'))
    expect(result.current.tags).toEqual([
      { id: 'caching', label: 'Caching', count: 2 },
      { id: 'databases', label: 'Databases', count: 1 },
      { id: 'security', label: 'Security', count: 0 },
    ])
  })
})
