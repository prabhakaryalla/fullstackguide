import { useEffect, useMemo, useState } from 'react'
import { getRelatedTopicsKeywordIndex } from '../data/getRelatedTopicsKeywordIndex'
import { getAllSearchableTopics } from '../../search/data/getAllSearchableTopics'
import type { SearchableTopic } from '../../search/model/types'
import type { Topic } from '../../main/model/types'

const MAX_RELATED_TOPICS = 5

interface RelatedTopicsState {
  status: 'loading' | 'ready'
  relatedTopics: SearchableTopic[]
}

function intersectionSize(a: Set<string>, b: Set<string>): number {
  let count = 0
  for (const word of a) {
    if (b.has(word)) {
      count += 1
    }
  }
  return count
}

export function useRelatedTopics(topic: Topic): RelatedTopicsState {
  const [status, setStatus] = useState<'loading' | 'ready'>('loading')
  const [keywordIndex, setKeywordIndex] = useState<Map<string, Set<string>> | null>(null)

  useEffect(() => {
    let active = true

    getRelatedTopicsKeywordIndex()
      .then((index) => {
        if (!active) {
          return
        }
        setKeywordIndex(index)
        setStatus('ready')
      })
      .catch(() => {
        // Related topics are a progressive enhancement — if the underlying content
        // index fails to load, fall back to an empty (no-results) list, not an error.
        if (active) {
          setStatus('ready')
        }
      })

    return () => {
      active = false
    }
  }, [])

  const relatedTopics = useMemo(() => {
    if (!keywordIndex) {
      return []
    }

    const currentWords = keywordIndex.get(topic.id) ?? new Set<string>()

    return getAllSearchableTopics()
      .filter((entry) => entry.topic.id !== topic.id)
      .map((entry) => ({ entry, score: intersectionSize(currentWords, keywordIndex.get(entry.topic.id) ?? new Set()) }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, MAX_RELATED_TOPICS)
      .map(({ entry }) => entry)
  }, [keywordIndex, topic.id])

  return { status, relatedTopics }
}
