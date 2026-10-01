import { useContext } from 'react'
import { BookmarkContext } from '../context/BookmarkContext'
import type { BookmarkContextValue } from '../model/types'

export function useBookmarks(): BookmarkContextValue {
  const context = useContext(BookmarkContext)
  if (!context) {
    throw new Error('useBookmarks must be used within a BookmarkProvider')
  }
  return context
}
