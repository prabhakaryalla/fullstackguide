import { createContext, useCallback, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { AddAdhocQuestionInput, AdhocQuestion, AdhocQuestionsContextValue, AdhocQuestionsState } from '../model/types'
import { readAdhocQuestionsState, writeAdhocQuestionsState } from '../data/adhocQuestionsStorage'

export const AdhocQuestionsContext = createContext<AdhocQuestionsContextValue | undefined>(undefined)

interface AdhocQuestionsProviderProps {
  children: ReactNode
}

let nextIdCounter = 0

function generateId(): string {
  nextIdCounter += 1
  return `adhoc-${Date.now()}-${nextIdCounter}`
}

export default function AdhocQuestionsProvider({ children }: AdhocQuestionsProviderProps) {
  const [state, setState] = useState<AdhocQuestionsState>(readAdhocQuestionsState)

  const getQuestion = useCallback((id: string) => state[id], [state])

  const addQuestion = useCallback((input: AddAdhocQuestionInput): AdhocQuestion => {
    const question: AdhocQuestion = {
      id: generateId(),
      title: input.title.trim(),
      detail: input.detail?.trim() ?? '',
      complexity: input.complexity ?? 'Unknown',
      createdAt: Date.now(),
    }
    setState((previous) => {
      const next = { ...previous, [question.id]: question }
      writeAdhocQuestionsState(next)
      return next
    })
    return question
  }, [])

  const questions = useMemo(
    () => Object.values(state).sort((a, b) => b.createdAt - a.createdAt),
    [state],
  )

  const value = useMemo(() => ({ questions, getQuestion, addQuestion }), [questions, getQuestion, addQuestion])

  return <AdhocQuestionsContext.Provider value={value}>{children}</AdhocQuestionsContext.Provider>
}
