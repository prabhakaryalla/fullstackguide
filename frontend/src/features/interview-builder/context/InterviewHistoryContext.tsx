import { createContext, useCallback, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { InterviewHistoryContextValue, InterviewHistoryEntry, InterviewHistoryState } from '../model/types'
import { readInterviewHistoryState, writeInterviewHistoryState } from '../data/interviewHistoryStorage'

export const InterviewHistoryContext = createContext<InterviewHistoryContextValue | undefined>(undefined)

interface InterviewHistoryProviderProps {
  children: ReactNode
}

export default function InterviewHistoryProvider({ children }: InterviewHistoryProviderProps) {
  const [state, setState] = useState<InterviewHistoryState>(readInterviewHistoryState)

  const addHistoryEntry = useCallback((entry: Omit<InterviewHistoryEntry, 'completedAt'>) => {
    setState((previous) => {
      const next = { ...previous, [entry.runId]: { ...entry, completedAt: Date.now() } }
      writeInterviewHistoryState(next)
      return next
    })
  }, [])

  const removeHistoryEntry = useCallback((runId: string) => {
    setState((previous) => {
      if (!(runId in previous)) {
        return previous
      }
      const next = { ...previous }
      delete next[runId]
      writeInterviewHistoryState(next)
      return next
    })
  }, [])

  const clearHistory = useCallback(() => {
    setState({})
    writeInterviewHistoryState({})
  }, [])

  // Exposed pre-sorted newest-first — every consumer (history page, future
  // widgets) wants that order, so it isn't re-derived in more than one place.
  const history = useMemo(() => Object.values(state).sort((a, b) => b.completedAt - a.completedAt), [state])

  const value = useMemo(
    () => ({ history, addHistoryEntry, removeHistoryEntry, clearHistory }),
    [history, addHistoryEntry, removeHistoryEntry, clearHistory],
  )

  return <InterviewHistoryContext.Provider value={value}>{children}</InterviewHistoryContext.Provider>
}
