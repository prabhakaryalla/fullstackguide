import type { InterviewNotesState } from '../model/types'

// v2: entries are now keyed `${runId}/${menuId}/${slug}` (previously just
// `${menuId}/${slug}`) and no longer carry `lastAskedAt` — see askedTopicsStorage.ts.
export const INTERVIEW_NOTES_STORAGE_KEY = 'fullstack-guide.interview-run-notes.v1'

export function readInterviewNotesState(): InterviewNotesState {
  try {
    const raw = window.localStorage.getItem(INTERVIEW_NOTES_STORAGE_KEY)
    if (!raw) {
      return {}
    }
    const parsed: unknown = JSON.parse(raw)
    if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return {}
    }
    return parsed as InterviewNotesState
  } catch {
    return {}
  }
}

export function writeInterviewNotesState(state: InterviewNotesState): void {
  try {
    window.localStorage.setItem(INTERVIEW_NOTES_STORAGE_KEY, JSON.stringify(state))
  } catch {
    // Persisting notes is best-effort; storage may be disabled/full.
  }
}
