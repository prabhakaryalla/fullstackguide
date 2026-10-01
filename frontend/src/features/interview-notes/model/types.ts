// Persisted interviewer rating + note, keyed by `${runId}/${menuId}/${slug}` —
// scoped per Live Interview run so a later session touching the same topic
// (e.g. a different candidate) never shows a previous candidate's rating/note.
export interface InterviewNoteEntry {
  rating: number // 0 = unrated, otherwise 1-5
  note: string
  skipped?: boolean // deliberately not asked this run — distinct from "asked but unrated"
}

export type InterviewNotesState = Record<string, InterviewNoteEntry>

// Separate from the above and deliberately NOT run-scoped: "was this topic
// asked in ANY session" needs to stay global for "exclude previously asked
// questions" to keep working across different candidates/sessions.
export type AskedTopicsState = Record<string, number>

export interface InterviewNotesContextValue {
  getNote: (runId: string, menuId: string, slug: string) => InterviewNoteEntry
  setRating: (runId: string, menuId: string, slug: string, rating: number) => void
  setNoteText: (runId: string, menuId: string, slug: string, text: string) => void
  setSkipped: (runId: string, menuId: string, slug: string, skipped: boolean) => void
  getLastAskedAt: (menuId: string, slug: string) => number | undefined
  markAsked: (topics: { menuId: string; slug: string }[]) => void
}
