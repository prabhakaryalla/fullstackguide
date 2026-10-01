import { useEffect, useMemo, useState } from 'react'
import { getTopicTagsIndex } from '../data/getTopicTagsIndex'
import { getAllSearchableTopics } from '../../search/data/getAllSearchableTopics'
import type { SearchableTopic } from '../../search/model/types'

interface TagTopicsState {
  status: 'loading' | 'ready'
  topics: SearchableTopic[]
}

export function useTopicsByTag(tagId: string): TagTopicsState {
  const [status, setStatus] = useState<'loading' | 'ready'>('loading')
  const [tagsIndex, setTagsIndex] = useState<Map<string, string[]> | null>(null)

  useEffect(() => {
    let active = true

    getTopicTagsIndex()
      .then((index) => {
        if (!active) {
          return
        }
        setTagsIndex(index)
        setStatus('ready')
      })
      .catch(() => {
        if (active) {
          setStatus('ready')
        }
      })

    return () => {
      active = false
    }
  }, [])

  const topics = useMemo(() => {
    if (!tagsIndex) {
      return []
    }
    return getAllSearchableTopics().filter((entry) => tagsIndex.get(entry.topic.id)?.includes(tagId))
  }, [tagsIndex, tagId])

  return { status, topics }
}
