import type { CandidateInfoState } from '../model/types'

export const CANDIDATE_INFO_STORAGE_KEY = 'fullstack-guide.candidate-info.v1'

export function readCandidateInfoState(): CandidateInfoState {
  try {
    const raw = window.localStorage.getItem(CANDIDATE_INFO_STORAGE_KEY)
    if (!raw) {
      return {}
    }
    const parsed: unknown = JSON.parse(raw)
    if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return {}
    }
    return parsed as CandidateInfoState
  } catch {
    return {}
  }
}

export function writeCandidateInfoState(state: CandidateInfoState): void {
  try {
    window.localStorage.setItem(CANDIDATE_INFO_STORAGE_KEY, JSON.stringify(state))
  } catch {
    // Persisting candidate details is best-effort; storage may be disabled/full.
  }
}
