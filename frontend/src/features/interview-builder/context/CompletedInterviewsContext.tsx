import { createContext, useCallback, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { CompletedInterviewsContextValue, CompletedInterviewsState } from '../model/types'
import { readCompletedInterviewsState, writeCompletedInterviewsState } from '../data/completedInterviewsStorage'

export const CompletedInterviewsContext = createContext<CompletedInterviewsContextValue | undefined>(undefined)

interface CompletedInterviewsProviderProps {
  children: ReactNode
}

export default function CompletedInterviewsProvider({ children }: CompletedInterviewsProviderProps) {
  const [state, setState] = useState<CompletedInterviewsState>(readCompletedInterviewsState)

  const isCompleted = useCallback((sessionKey: string) => Boolean(state[sessionKey]), [state])

  const markCompleted = useCallback((sessionKey: string) => {
    setState((previous) => {
      const next = { ...previous, [sessionKey]: Date.now() }
      writeCompletedInterviewsState(next)
      return next
    })
  }, [])

  const value = useMemo(() => ({ isCompleted, markCompleted }), [isCompleted, markCompleted])

  return <CompletedInterviewsContext.Provider value={value}>{children}</CompletedInterviewsContext.Provider>
}
