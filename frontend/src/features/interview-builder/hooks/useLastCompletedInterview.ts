import { useContext } from 'react'
import { LastCompletedInterviewContext } from '../context/LastCompletedInterviewContext'
import type { LastCompletedInterviewContextValue } from '../model/types'

export function useLastCompletedInterview(): LastCompletedInterviewContextValue {
  const context = useContext(LastCompletedInterviewContext)
  if (!context) {
    throw new Error('useLastCompletedInterview must be used within a LastCompletedInterviewProvider')
  }
  return context
}
