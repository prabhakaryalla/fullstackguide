import { useEffect, useState } from 'react'
import { getTopicTagsIndex } from '../data/getTopicTagsIndex'

interface TopicTagsState {
  status: 'loading' | 'ready'
  tagIds: string[]
}

export function useTopicTags(topicId: string): TopicTagsState {
  const [status, setStatus] = useState<'loading' | 'ready'>('loading')
  const [tagIds, setTagIds] = useState<string[]>([])

  useEffect(() => {
    let active = true
    setStatus('loading')
    setTagIds([])

    getTopicTagsIndex()
      .then((index) => {
        if (!active) {
          return
        }
        setTagIds(index.get(topicId) ?? [])
        setStatus('ready')
      })
      .catch(() => {
        // Tags are a progressive enhancement — if the underlying content index
        // fails to load, fall back to no tags, not an error.
        if (active) {
          setStatus('ready')
        }
      })

    return () => {
      active = false
    }
  }, [topicId])

  return { status, tagIds }
}
