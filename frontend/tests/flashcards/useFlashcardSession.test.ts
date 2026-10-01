import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useFlashcardSession } from '../../src/features/flashcards/hooks/useFlashcardSession'
import type { Topic } from '../../src/features/main/model/types'

const topics: Topic[] = [
  { id: '1', slug: 'a', title: 'Topic A', markdownPath: 'x/a.md' },
  { id: '2', slug: 'b', title: 'Topic B', markdownPath: 'x/b.md' },
  { id: '3', slug: 'c', title: 'Topic C', markdownPath: 'x/c.md' },
]

describe('useFlashcardSession', () => {
  it('starts at the first topic, not revealed, not complete', () => {
    const { result } = renderHook(() => useFlashcardSession(topics))
    expect(result.current.currentIndex).toBe(0)
    expect(result.current.currentTopic).toBe(topics[0])
    expect(result.current.revealed).toBe(false)
    expect(result.current.isComplete).toBe(false)
  })

  it('reveal() sets revealed to true without changing the index', () => {
    const { result } = renderHook(() => useFlashcardSession(topics))
    act(() => result.current.reveal())
    expect(result.current.revealed).toBe(true)
    expect(result.current.currentIndex).toBe(0)
  })

  it('next() advances the index and resets revealed to false', () => {
    const { result } = renderHook(() => useFlashcardSession(topics))
    act(() => result.current.reveal())
    act(() => result.current.next())
    expect(result.current.currentIndex).toBe(1)
    expect(result.current.currentTopic).toBe(topics[1])
    expect(result.current.revealed).toBe(false)
  })

  it('previous() moves back and resets revealed to false, floored at 0', () => {
    const { result } = renderHook(() => useFlashcardSession(topics))
    act(() => result.current.next())
    act(() => result.current.reveal())
    act(() => result.current.previous())
    expect(result.current.currentIndex).toBe(0)
    expect(result.current.revealed).toBe(false)

    act(() => result.current.previous())
    expect(result.current.currentIndex).toBe(0)
  })

  it('isComplete becomes true only after advancing past the last topic', () => {
    const { result } = renderHook(() => useFlashcardSession(topics))
    act(() => result.current.next())
    act(() => result.current.next())
    expect(result.current.isComplete).toBe(false)
    expect(result.current.currentTopic).toBe(topics[2])

    act(() => result.current.next())
    expect(result.current.isComplete).toBe(true)
    expect(result.current.currentTopic).toBeUndefined()
  })
})
