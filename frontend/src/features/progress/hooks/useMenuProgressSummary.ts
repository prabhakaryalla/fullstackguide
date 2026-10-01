import { useMemo } from 'react'
import type { Topic } from '../../main/model/types'
import type { MenuProgressSummary } from '../model/types'
import { useTopicProgress } from './useTopicProgress'

export function useMenuProgressSummary(menuId: string, topics: Topic[]): MenuProgressSummary {
  const { isCompleted } = useTopicProgress()

  return useMemo(() => {
    const completed = topics.filter((topic) => isCompleted(menuId, topic.slug)).length
    return { completed, total: topics.length }
  }, [isCompleted, menuId, topics])
}
