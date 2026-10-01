import { useContext } from 'react'
import { CompletedInterviewsContext } from '../context/CompletedInterviewsContext'
import type { CompletedInterviewsContextValue } from '../model/types'

export function useCompletedInterviews(): CompletedInterviewsContextValue {
  const context = useContext(CompletedInterviewsContext)
  if (!context) {
    throw new Error('useCompletedInterviews must be used within a CompletedInterviewsProvider')
  }
  return context
}
