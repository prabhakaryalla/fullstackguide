import { describe, it, expect } from 'vitest'
import { extractContentSnippet } from '../../src/features/search/data/extractContentSnippet'

describe('extractContentSnippet', () => {
  it('extracts surrounding text around a case-insensitive match', () => {
    const content = 'The quick brown fox jumps over the lazy dog in the meadow.'
    const snippet = extractContentSnippet(content, 'FOX', 10)
    expect(snippet.toLowerCase()).toContain('fox')
  })

  it('handles a match near the start of the string without throwing', () => {
    const content = 'Keyword right at the very beginning of this content string.'
    expect(() => extractContentSnippet(content, 'Keyword', 20)).not.toThrow()
    expect(extractContentSnippet(content, 'Keyword', 20)).toContain('Keyword')
  })

  it('handles a match near the end of the string without throwing', () => {
    const content = 'This content string ends with the word keyword'
    expect(() => extractContentSnippet(content, 'keyword', 20)).not.toThrow()
    expect(extractContentSnippet(content, 'keyword', 20).toLowerCase()).toContain('keyword')
  })

  it('collapses internal whitespace and newlines', () => {
    const content = 'Line one\n\n   has a   target  \n right here.'
    const snippet = extractContentSnippet(content, 'target', 30)
    expect(snippet).not.toMatch(/\n/)
    expect(snippet).not.toMatch(/ {2,}/)
  })

  it('returns an empty string when the keyword is not found', () => {
    expect(extractContentSnippet('no match in here', 'zzz')).toBe('')
  })

  it('returns an empty string for an empty/whitespace-only keyword', () => {
    expect(extractContentSnippet('some content', '   ')).toBe('')
  })
})
