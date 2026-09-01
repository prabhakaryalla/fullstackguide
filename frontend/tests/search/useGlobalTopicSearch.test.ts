import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useGlobalTopicSearch } from '../../src/features/search/hooks/useGlobalTopicSearch'
import type { SearchableTopic } from '../../src/features/search/model/types'

const topics: SearchableTopic[] = [
  { topic: { id: '1', slug: 'azure-event-hubs', title: 'Azure Event Hubs', markdownPath: 'azure/azure-event-hubs.md', complexity: 'Medium' }, menuId: 'azure', menuLabel: 'Azure' },
  { topic: { id: '2', slug: 'csharp-records', title: 'C# Records', markdownPath: 'csharp/csharp-records.md', complexity: 'Easy' }, menuId: 'csharp', menuLabel: 'C#' },
  { topic: { id: '3', slug: 'dotnet-di', title: '.NET Dependency Injection', markdownPath: 'dotnet/dotnet-di.md', complexity: 'Medium' }, menuId: 'dotnet', menuLabel: '.NET' },
]

describe('useGlobalTopicSearch', () => {
  it('returns all topics when query is empty', () => {
    const { result } = renderHook(() => useGlobalTopicSearch(topics, ''))
    expect(result.current).toHaveLength(3)
  })

  it('returns all topics when query is whitespace only', () => {
    const { result } = renderHook(() => useGlobalTopicSearch(topics, '   '))
    expect(result.current).toHaveLength(3)
  })

  it('matches case-insensitively across menu areas', () => {
    const { result } = renderHook(() => useGlobalTopicSearch(topics, 'AZURE'))
    expect(result.current).toHaveLength(1)
    expect(result.current[0].menuId).toBe('azure')
  })

  it('matches partial substrings regardless of menu area', () => {
    const { result } = renderHook(() => useGlobalTopicSearch(topics, 'c#'))
    expect(result.current).toHaveLength(1)
    expect(result.current[0].menuId).toBe('csharp')
  })

  it('returns an empty array when no topic matches', () => {
    const { result } = renderHook(() => useGlobalTopicSearch(topics, 'xyz123'))
    expect(result.current).toHaveLength(0)
  })
})
