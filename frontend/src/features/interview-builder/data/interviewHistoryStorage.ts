import type { InterviewHistoryEntry, InterviewHistoryState } from '../model/types'

export const INTERVIEW_HISTORY_STORAGE_KEY = 'fullstack-guide.interview-history.v1'

// Safety cap so this can't grow unbounded across years of real use — oldest
// entries (by completedAt) are dropped first once the cap is exceeded.
const MAX_HISTORY_ENTRIES = 200

function isValidEntry(value: unknown): value is InterviewHistoryEntry {
  if (value === null || typeof value !== 'object') {
    return false
  }
  const candidate = value as Partial<InterviewHistoryEntry>
  return (
    typeof candidate.runId === 'string' &&
    typeof candidate.search === 'string' &&
    typeof candidate.candidateName === 'string' &&
    typeof candidate.totalQuestions === 'number' &&
    typeof candidate.completedAt === 'number'
  )
}

export function readInterviewHistoryState(): InterviewHistoryState {
  try {
    const raw = window.localStorage.getItem(INTERVIEW_HISTORY_STORAGE_KEY)
    if (!raw) {
      return {}
    }
    const parsed: unknown = JSON.parse(raw)
    if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return {}
    }
    const state: InterviewHistoryState = {}
    for (const [runId, entry] of Object.entries(parsed as Record<string, unknown>)) {
      if (isValidEntry(entry)) {
        state[runId] = entry
      }
    }
    return state
  } catch {
    return {}
  }
}

export function writeInterviewHistoryState(state: InterviewHistoryState): void {
  try {
    const entries = Object.values(state).sort((a, b) => b.completedAt - a.completedAt)
    const capped = entries.slice(0, MAX_HISTORY_ENTRIES)
    const next: InterviewHistoryState = {}
    for (const entry of capped) {
      next[entry.runId] = entry
    }
    window.localStorage.setItem(INTERVIEW_HISTORY_STORAGE_KEY, JSON.stringify(next))
  } catch {
    // Persisting history is best-effort; storage may be disabled/full.
  }
}
