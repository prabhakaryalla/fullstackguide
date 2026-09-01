import { useMemo } from 'react'
import type { SearchableTopic } from '../model/types'

export function useGlobalTopicSearch(topics: SearchableTopic[], query: string): SearchableTopic[] {
  return useMemo(() => {
    const lower = query.trim().toLowerCase()
    if (!lower) return topics
    return topics.filter((entry) => entry.topic.title.toLowerCase().includes(lower))
  }, [topics, query])
}
