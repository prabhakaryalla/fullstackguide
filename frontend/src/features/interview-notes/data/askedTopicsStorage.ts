import type { AskedTopicsState } from '../model/types'

export const ASKED_TOPICS_STORAGE_KEY = 'fullstack-guide.asked-topics.v1'

export function readAskedTopicsState(): AskedTopicsState {
  try {
    const raw = window.localStorage.getItem(ASKED_TOPICS_STORAGE_KEY)
    if (!raw) {
      return {}
    }
    const parsed: unknown = JSON.parse(raw)
    if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return {}
    }
    return parsed as AskedTopicsState
  } catch {
    return {}
  }
}

export function writeAskedTopicsState(state: AskedTopicsState): void {
  try {
    window.localStorage.setItem(ASKED_TOPICS_STORAGE_KEY, JSON.stringify(state))
  } catch {
    // Persisting asked-topic tracking is best-effort; storage may be disabled/full.
  }
}
