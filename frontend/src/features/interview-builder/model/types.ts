export type InterviewComplexityKey = 'Easy' | 'Medium' | 'Hard'

export const INTERVIEW_COMPLEXITY_KEYS: readonly InterviewComplexityKey[] = ['Easy', 'Medium', 'Hard']

export type ComplexityCounts = Record<InterviewComplexityKey, number>

// A pointer back to whichever Live Interview run is currently in progress, so
// the interviewer can wander off to browse other topics and still find their
// way back — the run page itself is the source of truth for `search`
// (already includes `at`, the current question position).
export interface ActiveInterviewState {
  search: string
  currentIndex: number
  totalQuestions: number
  updatedAt: number
}

export interface ActiveInterviewContextValue {
  activeInterview: ActiveInterviewState | null
  setActiveInterview: (state: Omit<ActiveInterviewState, 'updatedAt'>) => void
  clearActiveInterview: () => void
}

// Keyed by a session's content (its resolved `items` + sorted `custom` ids,
// not the volatile `at` position), so the Session Review page can tell
// whether THIS exact question set was ever actually conducted, regardless of
// which browser tab/visit completed it.
export type CompletedInterviewsState = Record<string, number>

export interface CompletedInterviewsContextValue {
  isCompleted: (sessionKey: string) => boolean
  markCompleted: (sessionKey: string) => void
}

// Points at whichever interview run finished most recently, so the
// interviewer can find their way back to review/print it later (e.g. after
// closing the tab) without needing the original URL — overwritten every time
// a (possibly different) interview completes, so it only ever tracks the one.
export interface LastCompletedInterviewState {
  search: string
  totalQuestions: number
  completedAt: number
}

export interface LastCompletedInterviewContextValue {
  lastCompletedInterview: LastCompletedInterviewState | null
  setLastCompletedInterview: (state: Omit<LastCompletedInterviewState, 'completedAt'>) => void
  clearLastCompletedInterview: () => void
}

// Freeform candidate details, captured before/while conducting a Live
// Interview run and shown again on the printed question sheet — scoped per
// `runId` (like interview notes) so a retake or a different candidate's
// session never shows a previous candidate's details.
export interface CandidateInfo {
  name: string
  yearsOfExperience: string
  skills: string
  notes: string
}

export type CandidateInfoState = Record<string, CandidateInfo>

export interface CandidateInfoContextValue {
  getCandidateInfo: (runId: string) => CandidateInfo
  updateCandidateInfo: (runId: string, patch: Partial<CandidateInfo>) => void
}

// A durable record of one completed Live Interview run, written once the run
// finishes — unlike LastCompletedInterviewState (which only ever tracks the
// single most recent one), this accumulates so a past candidate's session can
// still be found/reviewed/printed after a later, different interview completes.
export interface InterviewHistoryEntry {
  runId: string
  search: string
  candidateName: string
  totalQuestions: number
  completedAt: number
}

// Keyed by runId so re-completing the same run (e.g. after editing/retaking)
// upserts in place instead of accumulating duplicate entries.
export type InterviewHistoryState = Record<string, InterviewHistoryEntry>

export interface InterviewHistoryContextValue {
  history: InterviewHistoryEntry[]
  addHistoryEntry: (entry: Omit<InterviewHistoryEntry, 'completedAt'>) => void
  removeHistoryEntry: (runId: string) => void
  clearHistory: () => void
}
