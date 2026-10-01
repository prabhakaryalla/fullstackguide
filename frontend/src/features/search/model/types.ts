import type { Topic } from '../../main/model/types'

// A topic joined with its owning menu, for cross-menu global search results.
export interface SearchableTopic {
  topic: Topic
  menuId: string
  menuLabel: string
}

export type ContentSearchStatus = 'idle' | 'loading' | 'ready'

// A merged, de-duplicated search result row — snippet is present only for
// entries that matched via body content but not via title.
export interface SearchResultEntry {
  topic: SearchableTopic
  snippet?: string
}
