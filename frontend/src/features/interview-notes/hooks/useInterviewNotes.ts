import { useContext } from 'react'
import { InterviewNotesContext } from '../context/InterviewNotesContext'
import type { InterviewNotesContextValue } from '../model/types'

export function useInterviewNotes(): InterviewNotesContextValue {
  const context = useContext(InterviewNotesContext)
  if (!context) {
    throw new Error('useInterviewNotes must be used within an InterviewNotesProvider')
  }
  return context
}
