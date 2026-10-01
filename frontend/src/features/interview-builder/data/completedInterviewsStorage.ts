import type { CompletedInterviewsState } from '../model/types'

export const COMPLETED_INTERVIEWS_STORAGE_KEY = 'fullstack-guide.completed-interviews.v1'

export function buildSessionCompletionKey(items: string, customIds: string[]): string {
  return `${items}|${[...customIds].sort().join(',')}`
}

// Completion must be tracked per RUN, not just per question-set content —
// otherwise regenerating an identical combination (common when a filter's
// available pool is tiny, e.g. only 2 Medium questions exist) would
// immediately show a brand-new, never-conducted run as "already completed"
// just because some earlier, unrelated run happened to land on the same set.
export function buildRunCompletionKey(runId: string, items: string, customIds: string[]): string {
  return `${runId}::${buildSessionCompletionKey(items, customIds)}`
}

export function readCompletedInterviewsState(): CompletedInterviewsState {
  try {
    const raw = window.localStorage.getItem(COMPLETED_INTERVIEWS_STORAGE_KEY)
    if (!raw) {
      return {}
    }
    const parsed: unknown = JSON.parse(raw)
    if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return {}
    }
    return parsed as CompletedInterviewsState
  } catch {
    return {}
  }
}

export function writeCompletedInterviewsState(state: CompletedInterviewsState): void {
  try {
    window.localStorage.setItem(COMPLETED_INTERVIEWS_STORAGE_KEY, JSON.stringify(state))
  } catch {
    // Persisting completion status is best-effort; storage may be disabled/full.
  }
}
