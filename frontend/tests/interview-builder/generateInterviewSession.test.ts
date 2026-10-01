import { describe, it, expect } from 'vitest'
import { countAvailableByComplexity, generateInterviewSession } from '../../src/features/interview-builder/data/generateInterviewSession'
import type { Topic } from '../../src/features/main/model/types'

function topic(id: string, complexity: Topic['complexity']): Topic {
  return { id, slug: id, title: id, markdownPath: `${id}.md`, complexity }
}

const topics: Topic[] = [
  topic('e1', 'Easy'),
  topic('e2', 'Easy'),
  topic('e3', 'Easy'),
  topic('m1', 'Medium'),
  topic('m2', 'Medium'),
  topic('h1', 'Hard'),
]

describe('countAvailableByComplexity', () => {
  it('tallies topics per complexity, ignoring Unknown/undefined', () => {
    const withUnknown = [...topics, topic('u1', 'Unknown'), { ...topic('u2', undefined) }]
    expect(countAvailableByComplexity(withUnknown)).toEqual({ Easy: 3, Medium: 2, Hard: 1 })
  })

  it('returns zeros for an empty topic list', () => {
    expect(countAvailableByComplexity([])).toEqual({ Easy: 0, Medium: 0, Hard: 0 })
  })
})

describe('generateInterviewSession', () => {
  it('selects exactly the requested count per complexity bucket', () => {
    const result = generateInterviewSession(topics, { Easy: 2, Medium: 1, Hard: 1 })
    expect(result).toHaveLength(4)
    expect(result.filter((t) => t.complexity === 'Easy')).toHaveLength(2)
    expect(result.filter((t) => t.complexity === 'Medium')).toHaveLength(1)
    expect(result.filter((t) => t.complexity === 'Hard')).toHaveLength(1)
  })

  it('clamps to however many are available when more are requested than exist', () => {
    const result = generateInterviewSession(topics, { Easy: 10, Medium: 0, Hard: 0 })
    expect(result).toHaveLength(3)
  })

  it('returns no duplicates and only picks from the provided pool', () => {
    const result = generateInterviewSession(topics, { Easy: 3, Medium: 2, Hard: 1 })
    const ids = result.map((t) => t.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const id of ids) {
      expect(topics.some((t) => t.id === id)).toBe(true)
    }
  })

  it('returns an empty array when all counts are zero', () => {
    expect(generateInterviewSession(topics, { Easy: 0, Medium: 0, Hard: 0 })).toEqual([])
  })

  it('is deterministic given an injected random function', () => {
    const constantRandom = () => 0
    const a = generateInterviewSession(topics, { Easy: 2, Medium: 1, Hard: 1 }, constantRandom)
    const b = generateInterviewSession(topics, { Easy: 2, Medium: 1, Hard: 1 }, constantRandom)
    expect(a.map((t) => t.id)).toEqual(b.map((t) => t.id))
  })
})
