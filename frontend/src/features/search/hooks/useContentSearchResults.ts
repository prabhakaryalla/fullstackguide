import { useDeferredValue, useEffect, useMemo, useState } from 'react'
import { getAllTopicContentIndex } from '../data/getAllTopicContentIndex'
import { getAllSearchableTopics } from '../data/getAllSearchableTopics'
import type { ContentSearchStatus, SearchableTopic } from '../model/types'

interface ContentSearchResults {
  status: ContentSearchStatus
  matches: SearchableTopic[]
  contentIndex: Map<string, string> | null
}

export function useContentSearchResults(keyword: string): ContentSearchResults {
  const [status, setStatus] = useState<ContentSearchStatus>('loading')
  const [contentIndex, setContentIndex] = useState<Map<string, string> | null>(null)
  // Deferred so fast typing (title search, the input itself) never blocks on the heavier
  // content-match recompute over the full corpus.
  const deferredKeyword = useDeferredValue(keyword)

  useEffect(() => {
    let active = true

    getAllTopicContentIndex()
      .then((index) => {
        if (!active) {
          return
        }
        setContentIndex(index)
        setStatus('ready')
      })
      .catch(() => {
        // Content search is a progressive enhancement over title search — if the
        // content-index asset fails to load (offline, hosting hiccup), fall back to
        // title-only results instead of leaving the page stuck on "loading".
        if (active) {
          setStatus('ready')
        }
      })

    return () => {
      active = false
    }
  }, [])

  // Lowercased once per resolved index (not per keystroke) — repeatedly lowercasing ~8.8MB of
  // raw text on every keystroke measurably slowed typing under load; only re-derive when the
  // index itself changes.
  const lowercasedContentIndex = useMemo(() => {
    if (!contentIndex) {
      return null
    }
    const lowered = new Map<string, string>()
    for (const [topicId, text] of contentIndex) {
      lowered.set(topicId, text.toLowerCase())
    }
    return lowered
  }, [contentIndex])

  const matches = useMemo(() => {
    const trimmed = deferredKeyword.trim().toLowerCase()
    if (!lowercasedContentIndex || !trimmed) {
      return []
    }
    return getAllSearchableTopics().filter((entry) => {
      const text = lowercasedContentIndex.get(entry.topic.id)
      return Boolean(text && text.includes(trimmed))
    })
  }, [lowercasedContentIndex, deferredKeyword])

  return { status, matches, contentIndex }
}
