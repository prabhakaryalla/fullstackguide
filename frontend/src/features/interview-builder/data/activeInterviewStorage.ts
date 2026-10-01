import type { ActiveInterviewState } from '../model/types'

export const ACTIVE_INTERVIEW_STORAGE_KEY = 'fullstack-guide.active-interview.v1'

export function readActiveInterviewState(): ActiveInterviewState | null {
  try {
    const raw = window.localStorage.getItem(ACTIVE_INTERVIEW_STORAGE_KEY)
    if (!raw) {
      return null
    }
    const parsed: unknown = JSON.parse(raw)
    if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return null
    }
    const candidate = parsed as Partial<ActiveInterviewState>
    if (
      typeof candidate.search !== 'string' ||
      typeof candidate.currentIndex !== 'number' ||
      typeof candidate.totalQuestions !== 'number' ||
      typeof candidate.updatedAt !== 'number'
    ) {
      return null
    }
    return candidate as ActiveInterviewState
  } catch {
    return null
  }
}

export function writeActiveInterviewState(state: ActiveInterviewState | null): void {
  try {
    if (state === null) {
      window.localStorage.removeItem(ACTIVE_INTERVIEW_STORAGE_KEY)
      return
    }
    window.localStorage.setItem(ACTIVE_INTERVIEW_STORAGE_KEY, JSON.stringify(state))
  } catch {
    // Persisting the resume pointer is best-effort; storage may be disabled/full.
  }
}
