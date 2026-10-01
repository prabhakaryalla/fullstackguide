import { useContext } from 'react'
import { InterviewHistoryContext } from '../context/InterviewHistoryContext'
import type { InterviewHistoryContextValue } from '../model/types'

export function useInterviewHistory(): InterviewHistoryContextValue {
  const context = useContext(InterviewHistoryContext)
  if (!context) {
    throw new Error('useInterviewHistory must be used within an InterviewHistoryProvider')
  }
  return context
}
