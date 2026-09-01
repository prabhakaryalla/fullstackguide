import type { Topic } from '../../main/model/types'

// A topic joined with its owning menu, for cross-menu global search results.
export interface SearchableTopic {
  topic: Topic
  menuId: string
  menuLabel: string
}
