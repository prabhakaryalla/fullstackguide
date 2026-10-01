import { describe, it, expect } from 'vitest'
import { extractSignificantWords } from '../../src/features/related-topics/data/extractSignificantWords'

describe('extractSignificantWords', () => {
  it('lowercases and splits on punctuation/whitespace', () => {
    const words = extractSignificantWords('Azure Event-Hubs, Consumer.Groups!')
    expect(words.has('azure')).toBe(true)
    expect(words.has('event')).toBe(true)
    expect(words.has('hubs')).toBe(true)
    expect(words.has('consumer')).toBe(true)
    expect(words.has('groups')).toBe(true)
  })

  it('drops words shorter than 4 characters', () => {
    const words = extractSignificantWords('a an is to be at on in of')
    expect(words.size).toBe(0)
  })

  it('drops common stopwords', () => {
    const words = extractSignificantWords('this that with from which their there have been')
    expect(words.size).toBe(0)
  })

  it('collapses repeated words into a single set entry', () => {
    const words = extractSignificantWords('cache cache cache invalidation')
    expect(words.size).toBe(2)
    expect(words.has('cache')).toBe(true)
    expect(words.has('invalidation')).toBe(true)
  })

  it('returns an empty set for empty input', () => {
    expect(extractSignificantWords('').size).toBe(0)
  })
})
