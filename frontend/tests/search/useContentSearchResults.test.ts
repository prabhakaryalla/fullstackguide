import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useContentSearchResults } from '../../src/features/search/hooks/useContentSearchResults'
import { stubContentIndexFetch } from '../testUtils/stubContentIndexFetch'

beforeAll(() => {
  stubContentIndexFetch()
})

afterAll(() => {
  vi.unstubAllGlobals()
})

describe('useContentSearchResults', () => {
  it('starts loading, becomes ready, and matches a keyword known only in body content', async () => {
    const { result } = renderHook(() => useContentSearchResults('Auto-Inflate'))

    expect(result.current.status).toBe('loading')

    await waitFor(() => expect(result.current.status).toBe('ready'))

    const slugs = result.current.matches.map((entry) => entry.topic.slug)
    expect(slugs).toContain('azure-event-hubs')
  })

  it('recomputes matches when the keyword changes after ready, without changing status', async () => {
    const { result, rerender } = renderHook(({ keyword }) => useContentSearchResults(keyword), {
      initialProps: { keyword: 'Auto-Inflate' },
    })

    await waitFor(() => expect(result.current.status).toBe('ready'))
    expect(result.current.matches.length).toBeGreaterThan(0)

    rerender({ keyword: 'zzz-no-such-keyword-anywhere' })
    expect(result.current.status).toBe('ready')
    expect(result.current.matches).toEqual([])
  })
})
