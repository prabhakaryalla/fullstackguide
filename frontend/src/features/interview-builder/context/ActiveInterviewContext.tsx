import { createContext, useCallback, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { ActiveInterviewContextValue, ActiveInterviewState } from '../model/types'
import { readActiveInterviewState, writeActiveInterviewState } from '../data/activeInterviewStorage'

export const ActiveInterviewContext = createContext<ActiveInterviewContextValue | undefined>(undefined)

interface ActiveInterviewProviderProps {
  children: ReactNode
}

export default function ActiveInterviewProvider({ children }: ActiveInterviewProviderProps) {
  const [activeInterview, setActiveInterviewState] = useState<ActiveInterviewState | null>(readActiveInterviewState)

  const setActiveInterview = useCallback((next: Omit<ActiveInterviewState, 'updatedAt'>) => {
    const state: ActiveInterviewState = { ...next, updatedAt: Date.now() }
    setActiveInterviewState(state)
    writeActiveInterviewState(state)
  }, [])

  const clearActiveInterview = useCallback(() => {
    setActiveInterviewState(null)
    writeActiveInterviewState(null)
  }, [])

  const value = useMemo(
    () => ({ activeInterview, setActiveInterview, clearActiveInterview }),
    [activeInterview, setActiveInterview, clearActiveInterview],
  )

  return <ActiveInterviewContext.Provider value={value}>{children}</ActiveInterviewContext.Provider>
}
