export const FLASHCARD_ELIGIBLE_MENU_IDS: readonly string[] = ['csharp-programs', 'javascript-programs', 'sql-programs']

export function isFlashcardEligibleMenu(menuId: string): boolean {
  return FLASHCARD_ELIGIBLE_MENU_IDS.includes(menuId)
}
