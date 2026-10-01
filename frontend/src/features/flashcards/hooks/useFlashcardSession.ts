import { useCallback, useState } from 'react'
import type { Topic } from '../../main/model/types'

interface FlashcardSession {
  currentTopic: Topic | undefined
  currentIndex: number
  revealed: boolean
  isComplete: boolean
  reveal: () => void
  hide: () => void
  next: () => void
  previous: () => void
  goTo: (index: number) => void
}

export function useFlashcardSession(topics: Topic[], initialIndex = 0): FlashcardSession {
  const [currentIndex, setCurrentIndex] = useState(() => Math.max(0, Math.min(initialIndex, topics.length)))
  const [revealed, setRevealed] = useState(false)

  const reveal = useCallback(() => setRevealed(true), [])
  const hide = useCallback(() => setRevealed(false), [])

  const next = useCallback(() => {
    setCurrentIndex((previous) => Math.min(previous + 1, topics.length))
    setRevealed(false)
  }, [topics.length])

  const previous = useCallback(() => {
    setCurrentIndex((previous) => Math.max(previous - 1, 0))
    setRevealed(false)
  }, [])

  const goTo = useCallback(
    (index: number) => {
      setCurrentIndex(Math.max(0, Math.min(index, topics.length)))
      setRevealed(false)
    },
    [topics.length],
  )

  return {
    currentTopic: topics[currentIndex],
    currentIndex,
    revealed,
    isComplete: currentIndex >= topics.length,
    reveal,
    hide,
    next,
    previous,
    goTo,
  }
}
