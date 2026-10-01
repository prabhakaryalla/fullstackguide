import type { AdhocQuestionsState } from '../model/types'

export const ADHOC_QUESTIONS_STORAGE_KEY = 'fullstack-guide.adhoc-questions.v1'

export function readAdhocQuestionsState(): AdhocQuestionsState {
  try {
    const raw = window.localStorage.getItem(ADHOC_QUESTIONS_STORAGE_KEY)
    if (!raw) {
      return {}
    }
    const parsed: unknown = JSON.parse(raw)
    if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return {}
    }
    return parsed as AdhocQuestionsState
  } catch {
    return {}
  }
}

export function writeAdhocQuestionsState(state: AdhocQuestionsState): void {
  try {
    window.localStorage.setItem(ADHOC_QUESTIONS_STORAGE_KEY, JSON.stringify(state))
  } catch {
    // Persisting ad-hoc questions is best-effort; storage may be disabled/full.
  }
}
