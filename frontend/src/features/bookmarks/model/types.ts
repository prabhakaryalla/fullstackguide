// Persisted set of bookmarked topics, keyed by `${menuId}/${slug}` — presence means bookmarked.
export type BookmarkState = Record<string, true>

export interface BookmarkContextValue {
  isBookmarked: (menuId: string, slug: string) => boolean
  toggleBookmark: (menuId: string, slug: string) => void
}
