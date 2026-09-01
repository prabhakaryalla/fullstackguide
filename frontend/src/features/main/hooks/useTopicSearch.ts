import { useMemo } from 'react'
import type { ComplexityFilter, Topic, TopicComplexity } from '../model/types'

function normalizeComplexity(value: TopicComplexity | undefined): TopicComplexity {
  return value ?? 'Unknown'
}

export function useTopicSearch(topics: Topic[], query: string, complexity: ComplexityFilter = 'All'): Topic[] {
  return useMemo(() => {
    const lower = query.trim().toLowerCase()
    const hasQuery = lower.length > 0
    const needsComplexityFilter = complexity !== 'All'

    if (!hasQuery && !needsComplexityFilter) {
      return topics
    }

    const filtered: Topic[] = []
    for (const topic of topics) {
      const topicComplexity = normalizeComplexity(topic.complexity)
      if (needsComplexityFilter && topicComplexity !== complexity) {
        continue
      }

      if (hasQuery && !topic.title.toLowerCase().includes(lower)) {
        continue
      }

      filtered.push(topic)
    }

    return filtered
  }, [topics, query, complexity])
}
