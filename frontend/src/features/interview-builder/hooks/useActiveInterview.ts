import { useContext } from 'react'
import { ActiveInterviewContext } from '../context/ActiveInterviewContext'
import type { ActiveInterviewContextValue } from '../model/types'

export function useActiveInterview(): ActiveInterviewContextValue {
  const context = useContext(ActiveInterviewContext)
  if (!context) {
    throw new Error('useActiveInterview must be used within an ActiveInterviewProvider')
  }
  return context
}
