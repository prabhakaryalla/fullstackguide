import { useContext } from 'react'
import { TopicProgressContext } from '../context/TopicProgressContext'
import type { TopicProgressContextValue } from '../model/types'

export function useTopicProgress(): TopicProgressContextValue {
  const context = useContext(TopicProgressContext)
  if (!context) {
    throw new Error('useTopicProgress must be used within a TopicProgressProvider')
  }
  return context
}
