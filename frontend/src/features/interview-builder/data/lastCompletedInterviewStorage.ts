import type { LastCompletedInterviewState } from '../model/types'

export const LAST_COMPLETED_INTERVIEW_STORAGE_KEY = 'fullstack-guide.last-completed-interview.v1'

export function readLastCompletedInterviewState(): LastCompletedInterviewState | null {
  try {
    const raw = window.localStorage.getItem(LAST_COMPLETED_INTERVIEW_STORAGE_KEY)
    if (!raw) {
      return null
    }
    const parsed: unknown = JSON.parse(raw)
    if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return null
    }
    const candidate = parsed as Partial<LastCompletedInterviewState>
    if (
      typeof candidate.search !== 'string' ||
      typeof candidate.totalQuestions !== 'number' ||
      typeof candidate.completedAt !== 'number'
    ) {
      return null
    }
    return candidate as LastCompletedInterviewState
  } catch {
    return null
  }
}

export function writeLastCompletedInterviewState(state: LastCompletedInterviewState | null): void {
  try {
    if (state === null) {
      window.localStorage.removeItem(LAST_COMPLETED_INTERVIEW_STORAGE_KEY)
      return
    }
    window.localStorage.setItem(LAST_COMPLETED_INTERVIEW_STORAGE_KEY, JSON.stringify(state))
  } catch {
    // Persisting this pointer is best-effort; storage may be disabled/full.
  }
}
