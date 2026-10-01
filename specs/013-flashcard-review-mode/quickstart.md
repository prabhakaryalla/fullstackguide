# Quickstart: Flashcard Quick-Review Mode Validation

## Prerequisites

- Node.js 20+; `npm install` in [frontend](../../frontend); `npm run dev`.

See [contracts/flashcard-ui-contract.md](contracts/flashcard-ui-contract.md)
and [data-model.md](data-model.md).

## Functional validation scenarios

### 1. Entry point only on eligible menus

- Open `#/csharp-programs` — verify a "Flashcards" control is visible.
- Open `#/azure` — verify no "Flashcards" control appears anywhere.

### 2. Disabled when filtered list is empty

- On `#/csharp-programs`, type a search keyword that matches nothing.
- Verify the "Flashcards" control becomes disabled (not hidden).

### 3. Session respects the active filter

- On `#/csharp-programs`, set the complexity filter to "Medium".
- Activate "Flashcards"; verify the session's first card belongs to the
  Medium-filtered set, and stepping through Next never shows a non-Medium
  topic.

### 4. Reveal renders identical content to the topic detail page

- Reveal a card; verify code blocks/diagrams render the same as visiting
  that topic's own detail page directly.

### 5. Next/Previous re-hide content

- Reveal a card, select Next, then Previous — verify the card you return to
  shows its title only (not still revealed).

### 6. Rating integrates with existing progress tracking

- Reveal a card, select "Got it"; exit the session; verify that topic now
  shows the existing completed indicator on the menu topic list.
- Reveal a different, already-completed card and select "Still learning";
  verify it remains marked completed (unchanged).

### 7. Session complete state

- Step Next through every card; verify a clear completion state appears
  (not a blank card), with a control back to the topic list.

### 8. Keyboard operability

- Tab through Show Answer / Next / Previous / Got it / Still learning /
  Exit; verify each is reachable and activatable via Enter/Space.

## Automated test entry points

- `frontend/tests/flashcards/flashcardEligibleMenus.test.ts`
- `frontend/tests/flashcards/useFlashcardSession.test.ts`
- `frontend/tests/flashcards/FlashcardSessionPage.test.tsx`
- `frontend/tests/main/TopicInfoPage.test.tsx` (re-run to confirm the
  `TopicMarkdownContent`/`loadTopicMarkdown` extraction is behavior-preserving)

Run the full suite with `npm run test -- --run` from [frontend](../../frontend).
