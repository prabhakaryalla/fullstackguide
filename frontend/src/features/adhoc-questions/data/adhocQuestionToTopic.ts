import type { AdhocQuestion } from '../model/types'
import type { Topic } from '../../main/model/types'

// The pseudo-menu id ad-hoc questions are grouped under everywhere a real
// menuId is otherwise expected (session/print/run pages, topicMenuMap, etc.).
export const ADHOC_MENU_ID = 'custom'
export const ADHOC_MENU_LABEL = 'Custom Questions'

// Ad-hoc questions carry no markdown file — `slug` doubles as `id` and
// `markdownPath` is deliberately empty (loaders must special-case ADHOC_MENU_ID
// instead of trying to resolve it).
export function adhocQuestionToTopic(question: AdhocQuestion): Topic {
  return {
    id: question.id,
    slug: question.id,
    title: question.title,
    markdownPath: '',
    complexity: question.complexity,
  }
}
