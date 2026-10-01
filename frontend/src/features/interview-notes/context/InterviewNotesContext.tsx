import { createContext, useCallback, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { AskedTopicsState, InterviewNoteEntry, InterviewNotesContextValue, InterviewNotesState } from '../model/types'
import { readInterviewNotesState, writeInterviewNotesState } from '../data/interviewNotesStorage'
import { readAskedTopicsState, writeAskedTopicsState } from '../data/askedTopicsStorage'

export const InterviewNotesContext = createContext<InterviewNotesContextValue | undefined>(undefined)

const EMPTY_ENTRY: InterviewNoteEntry = { rating: 0, note: '' }

function noteKey(runId: string, menuId: string, slug: string): string {
  return `${runId}/${menuId}/${slug}`
}

function askedKey(menuId: string, slug: string): string {
  return `${menuId}/${slug}`
}

interface InterviewNotesProviderProps {
  children: ReactNode
}

export default function InterviewNotesProvider({ children }: InterviewNotesProviderProps) {
  const [state, setState] = useState<InterviewNotesState>(readInterviewNotesState)
  const [askedState, setAskedState] = useState<AskedTopicsState>(readAskedTopicsState)

  const getNote = useCallback(
    (runId: string, menuId: string, slug: string) => state[noteKey(runId, menuId, slug)] ?? EMPTY_ENTRY,
    [state],
  )

  const updateEntry = useCallback((runId: string, menuId: string, slug: string, patch: Partial<InterviewNoteEntry>) => {
    setState((previous) => {
      const key = noteKey(runId, menuId, slug)
      const current = previous[key] ?? EMPTY_ENTRY
      const next = { ...previous, [key]: { ...current, ...patch } }
      writeInterviewNotesState(next)
      return next
    })
  }, [])

  const setRating = useCallback(
    (runId: string, menuId: string, slug: string, rating: number) => updateEntry(runId, menuId, slug, { rating }),
    [updateEntry],
  )

  const setNoteText = useCallback(
    (runId: string, menuId: string, slug: string, note: string) => updateEntry(runId, menuId, slug, { note }),
    [updateEntry],
  )

  const setSkipped = useCallback(
    (runId: string, menuId: string, slug: string, skipped: boolean) => updateEntry(runId, menuId, slug, { skipped }),
    [updateEntry],
  )

  const getLastAskedAt = useCallback(
    (menuId: string, slug: string) => askedState[askedKey(menuId, slug)],
    [askedState],
  )

  const markAsked = useCallback((topics: { menuId: string; slug: string }[]) => {
    if (topics.length === 0) {
      return
    }
    setAskedState((previous) => {
      const now = Date.now()
      const next = { ...previous }
      for (const { menuId, slug } of topics) {
        next[askedKey(menuId, slug)] = now
      }
      writeAskedTopicsState(next)
      return next
    })
  }, [])

  const value = useMemo(
    () => ({ getNote, setRating, setNoteText, setSkipped, getLastAskedAt, markAsked }),
    [getNote, setRating, setNoteText, setSkipped, getLastAskedAt, markAsked],
  )

  return <InterviewNotesContext.Provider value={value}>{children}</InterviewNotesContext.Provider>
}
