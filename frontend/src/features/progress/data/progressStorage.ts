import type { ProgressState } from '../model/types'

export const PROGRESS_STORAGE_KEY = 'fullstack-guide.topic-progress.v1'

export function readProgressState(): ProgressState {
  try {
    const raw = window.localStorage.getItem(PROGRESS_STORAGE_KEY)
    if (!raw) {
      return {}
    }
    const parsed: unknown = JSON.parse(raw)
    if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return {}
    }
    return parsed as ProgressState
  } catch {
    return {}
  }
}

export function writeProgressState(state: ProgressState): void {
  try {
    window.localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(state))
  } catch {
    // Persisting progress is best-effort; storage may be disabled/full
  }
}
