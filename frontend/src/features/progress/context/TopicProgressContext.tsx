import { createContext, useCallback, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { ProgressState, TopicProgressContextValue } from '../model/types'
import { readProgressState, writeProgressState } from '../data/progressStorage'

export const TopicProgressContext = createContext<TopicProgressContextValue | undefined>(undefined)

function completionKey(menuId: string, slug: string): string {
  return `${menuId}/${slug}`
}

interface TopicProgressProviderProps {
  children: ReactNode
}

export default function TopicProgressProvider({ children }: TopicProgressProviderProps) {
  const [state, setState] = useState<ProgressState>(readProgressState)

  const isCompleted = useCallback(
    (menuId: string, slug: string) => Boolean(state[completionKey(menuId, slug)]),
    [state],
  )

  const toggleCompletion = useCallback((menuId: string, slug: string) => {
    setState((previous) => {
      const key = completionKey(menuId, slug)
      let next: ProgressState
      if (previous[key]) {
        next = Object.fromEntries(Object.entries(previous).filter(([entryKey]) => entryKey !== key)) as ProgressState
      } else {
        next = { ...previous, [key]: true }
      }
      writeProgressState(next)
      return next
    })
  }, [])

  const resetMenuProgress = useCallback((menuId: string) => {
    setState((previous) => {
      const prefix = `${menuId}/`
      const next: ProgressState = {}
      for (const key of Object.keys(previous)) {
        if (!key.startsWith(prefix)) {
          next[key] = true
        }
      }
      writeProgressState(next)
      return next
    })
  }, [])

  const value = useMemo(
    () => ({ isCompleted, toggleCompletion, resetMenuProgress }),
    [isCompleted, toggleCompletion, resetMenuProgress],
  )

  return <TopicProgressContext.Provider value={value}>{children}</TopicProgressContext.Provider>
}
