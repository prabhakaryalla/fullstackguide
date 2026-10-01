import { createContext, useCallback, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { LastCompletedInterviewContextValue, LastCompletedInterviewState } from '../model/types'
import { readLastCompletedInterviewState, writeLastCompletedInterviewState } from '../data/lastCompletedInterviewStorage'

export const LastCompletedInterviewContext = createContext<LastCompletedInterviewContextValue | undefined>(undefined)

interface LastCompletedInterviewProviderProps {
  children: ReactNode
}

export default function LastCompletedInterviewProvider({ children }: LastCompletedInterviewProviderProps) {
  const [lastCompletedInterview, setLastCompletedInterviewState] = useState<LastCompletedInterviewState | null>(
    readLastCompletedInterviewState,
  )

  const setLastCompletedInterview = useCallback((next: Omit<LastCompletedInterviewState, 'completedAt'>) => {
    const state: LastCompletedInterviewState = { ...next, completedAt: Date.now() }
    setLastCompletedInterviewState(state)
    writeLastCompletedInterviewState(state)
  }, [])

  const clearLastCompletedInterview = useCallback(() => {
    setLastCompletedInterviewState(null)
    writeLastCompletedInterviewState(null)
  }, [])

  const value = useMemo(
    () => ({ lastCompletedInterview, setLastCompletedInterview, clearLastCompletedInterview }),
    [lastCompletedInterview, setLastCompletedInterview, clearLastCompletedInterview],
  )

  return <LastCompletedInterviewContext.Provider value={value}>{children}</LastCompletedInterviewContext.Provider>
}
