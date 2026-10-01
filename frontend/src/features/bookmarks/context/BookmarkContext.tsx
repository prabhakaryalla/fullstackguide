import { createContext, useCallback, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { BookmarkContextValue, BookmarkState } from '../model/types'
import { readBookmarkState, writeBookmarkState } from '../data/bookmarkStorage'

export const BookmarkContext = createContext<BookmarkContextValue | undefined>(undefined)

function bookmarkKey(menuId: string, slug: string): string {
  return `${menuId}/${slug}`
}

interface BookmarkProviderProps {
  children: ReactNode
}

export default function BookmarkProvider({ children }: BookmarkProviderProps) {
  const [state, setState] = useState<BookmarkState>(readBookmarkState)

  const isBookmarked = useCallback(
    (menuId: string, slug: string) => Boolean(state[bookmarkKey(menuId, slug)]),
    [state],
  )

  const toggleBookmark = useCallback((menuId: string, slug: string) => {
    setState((previous) => {
      const key = bookmarkKey(menuId, slug)
      const next = Object.fromEntries(Object.entries(previous).filter(([k]) => k !== key))
      if (!previous[key]) {
        next[key] = true
      }
      writeBookmarkState(next)
      return next
    })
  }, [])

  const value = useMemo(() => ({ isBookmarked, toggleBookmark }), [isBookmarked, toggleBookmark])

  return <BookmarkContext.Provider value={value}>{children}</BookmarkContext.Provider>
}
