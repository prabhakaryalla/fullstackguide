import type { BookmarkState } from '../model/types'

export const BOOKMARK_STORAGE_KEY = 'fullstack-guide.topic-bookmarks.v1'

export function readBookmarkState(): BookmarkState {
  try {
    const raw = window.localStorage.getItem(BOOKMARK_STORAGE_KEY)
    if (!raw) {
      return {}
    }
    const parsed: unknown = JSON.parse(raw)
    if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return {}
    }
    return parsed as BookmarkState
  } catch {
    return {}
  }
}

export function writeBookmarkState(state: BookmarkState): void {
  try {
    window.localStorage.setItem(BOOKMARK_STORAGE_KEY, JSON.stringify(state))
  } catch {
    // Persisting bookmarks is best-effort; storage may be disabled/full
  }
}
