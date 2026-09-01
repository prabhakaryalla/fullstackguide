import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useTopicSearch } from '../../src/features/main/hooks/useTopicSearch'
import type { Topic } from '../../src/features/main/model/types'

const topics: Topic[] = [
  { id: '1', slug: 'azure-event-hubs', title: 'Azure Event Hubs', markdownPath: 'azure/azure-event-hubs.md', complexity: 'Medium' },
  { id: '2', slug: 'azure-service-bus', title: 'Azure Service Bus', markdownPath: 'azure/azure-service-bus.md', complexity: 'Hard' },
  { id: '3', slug: 'azure-functions', title: 'Azure Functions', markdownPath: 'azure/azure-functions.md', complexity: 'Easy' },
  { id: '4', slug: 'azure-legacy-topic', title: 'Azure Legacy Topic', markdownPath: 'azure/legacy.md' },
]

describe('useTopicSearch', () => {
  it('returns all topics when query is empty', () => {
    const { result } = renderHook(() => useTopicSearch(topics, '', 'All'))
    expect(result.current).toHaveLength(4)
  })

  it('returns all topics when query is whitespace only', () => {
    const { result } = renderHook(() => useTopicSearch(topics, '   ', 'All'))
    expect(result.current).toHaveLength(4)
  })

  it('filters to matching topics', () => {
    const { result } = renderHook(() => useTopicSearch(topics, 'event', 'All'))
    expect(result.current).toHaveLength(1)
    expect(result.current[0].title).toBe('Azure Event Hubs')
  })

  it('applies case-insensitive matching', () => {
    const { result } = renderHook(() => useTopicSearch(topics, 'EVENT', 'All'))
    expect(result.current).toHaveLength(1)
    expect(result.current[0].title).toBe('Azure Event Hubs')
  })

  it('matches partial substrings', () => {
    const { result } = renderHook(() => useTopicSearch(topics, 'az', 'All'))
    expect(result.current).toHaveLength(4)
  })

  it('returns empty array when no topic matches', () => {
    const { result } = renderHook(() => useTopicSearch(topics, 'xyz123', 'All'))
    expect(result.current).toHaveLength(0)
  })

  it('filters topics by selected complexity', () => {
    const { result } = renderHook(() => useTopicSearch(topics, '', 'Easy'))
    expect(result.current).toHaveLength(1)
    expect(result.current[0].title).toBe('Azure Functions')
  })

  it('combines search and complexity filters with AND semantics', () => {
    const { result } = renderHook(() => useTopicSearch(topics, 'azure', 'Medium'))
    expect(result.current).toHaveLength(1)
    expect(result.current[0].title).toBe('Azure Event Hubs')
  })

  it('normalizes missing complexity to Unknown and excludes it from specific complexity filters', () => {
    const unknownOnly = renderHook(() => useTopicSearch(topics, 'legacy', 'Easy'))
    expect(unknownOnly.result.current).toHaveLength(0)

    const allIncludesUnknown = renderHook(() => useTopicSearch(topics, 'legacy', 'All'))
    expect(allIncludesUnknown.result.current).toHaveLength(1)
    expect(allIncludesUnknown.result.current[0].title).toBe('Azure Legacy Topic')
  })

  it('keeps Unknown topics available when All is selected', () => {
    const { result } = renderHook(() => useTopicSearch(topics, '', 'All'))
    expect(result.current.some((topic) => topic.title === 'Azure Legacy Topic')).toBe(true)
  })

  it('returns empty array when no topic matches selected complexity', () => {
    const { result } = renderHook(() => useTopicSearch(topics, 'functions', 'Hard'))
    expect(result.current).toHaveLength(0)
  })
})
