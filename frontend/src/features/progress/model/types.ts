// Persisted set of completed topics, keyed by `${menuId}/${slug}` — presence means completed.
export type ProgressState = Record<string, true>

export interface TopicProgressContextValue {
  isCompleted: (menuId: string, slug: string) => boolean
  toggleCompletion: (menuId: string, slug: string) => void
  resetMenuProgress: (menuId: string) => void
}

export interface MenuProgressSummary {
  completed: number
  total: number
}
