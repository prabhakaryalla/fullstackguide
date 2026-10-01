import { useMemo } from 'react'
import { getAllSearchableTopics } from '../../search/data/getAllSearchableTopics'
import type { SearchableTopic } from '../../search/model/types'
import { useBookmarks } from './useBookmarks'

export function useAllBookmarkedTopics(): SearchableTopic[] {
  const { isBookmarked } = useBookmarks()

  return useMemo(
    () => getAllSearchableTopics().filter((entry) => isBookmarked(entry.menuId, entry.topic.slug)),
    [isBookmarked],
  )
}
