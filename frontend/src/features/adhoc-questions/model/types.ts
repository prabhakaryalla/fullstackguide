import type { TopicComplexity } from '../../main/model/types'

// An interviewer-authored question that isn't backed by any existing markdown
// content — created ad hoc, either while building a session or mid-interview.
export interface AdhocQuestion {
  id: string
  title: string
  detail: string
  complexity: TopicComplexity
  createdAt: number
}

export type AdhocQuestionsState = Record<string, AdhocQuestion>

export interface AddAdhocQuestionInput {
  title: string
  detail?: string
  complexity?: TopicComplexity
}

export interface AdhocQuestionsContextValue {
  questions: AdhocQuestion[]
  getQuestion: (id: string) => AdhocQuestion | undefined
  addQuestion: (input: AddAdhocQuestionInput) => AdhocQuestion
}
