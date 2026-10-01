import { useContext } from 'react'
import { AdhocQuestionsContext } from '../context/AdhocQuestionsContext'
import type { AdhocQuestionsContextValue } from '../model/types'

export function useAdhocQuestions(): AdhocQuestionsContextValue {
  const context = useContext(AdhocQuestionsContext)
  if (!context) {
    throw new Error('useAdhocQuestions must be used within an AdhocQuestionsProvider')
  }
  return context
}
