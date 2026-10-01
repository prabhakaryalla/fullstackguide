import { describe, it, expect } from 'vitest'
import { isFlashcardEligibleMenu } from '../../src/features/flashcards/data/flashcardEligibleMenus'

describe('isFlashcardEligibleMenu', () => {
  it.each(['csharp-programs', 'javascript-programs', 'sql-programs'])('returns true for %s', (menuId) => {
    expect(isFlashcardEligibleMenu(menuId)).toBe(true)
  })

  it.each(['azure', 'csharp', 'leet-code', 'unknown-menu'])('returns false for %s', (menuId) => {
    expect(isFlashcardEligibleMenu(menuId)).toBe(false)
  })
})
