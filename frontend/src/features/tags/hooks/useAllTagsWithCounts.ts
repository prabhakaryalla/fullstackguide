import { useEffect, useMemo, useState } from 'react'
import { getTopicTagsIndex } from '../data/getTopicTagsIndex'
import { TAG_DEFINITIONS } from '../data/tagDefinitions'

interface TagWithCount {
  id: string
  label: string
  count: number
}

interface AllTagsState {
  status: 'loading' | 'ready'
  tags: TagWithCount[]
}

export function useAllTagsWithCounts(): AllTagsState {
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

  const tags = useMemo(() => {
    if (!tagsIndex) {
      return []
    }

    const counts = new Map<string, number>()
    for (const tagIds of tagsIndex.values()) {
      for (const tagId of tagIds) {
        counts.set(tagId, (counts.get(tagId) ?? 0) + 1)
      }
    }

    return TAG_DEFINITIONS.map((tag) => ({ id: tag.id, label: tag.label, count: counts.get(tag.id) ?? 0 }))
  }, [tagsIndex])

  return { status, tags }
}
