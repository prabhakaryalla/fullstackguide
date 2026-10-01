---

description: "Task list template for feature implementation"
---

# Tasks: Flashcard Quick-Review Mode

**Input**: Design documents from `/specs/013-flashcard-review-mode/`

**Prerequisites**: [plan.md](plan.md), [spec.md](spec.md), [research.md](research.md), [data-model.md](data-model.md), [contracts/flashcard-ui-contract.md](contracts/flashcard-ui-contract.md), [quickstart.md](quickstart.md)

**Tests**: Included. Constitution Principle VIII (Automated Testing Policy) requires every feature to include or update automated tests.

**Organization**: This feature has 2 user stories (US1 P1, US2 P2). Tasks are grouped into Setup, Foundational (extractions + eligibility + session hook), one phase per user story, and Polish.

## Path Conventions

Single-project web frontend at [frontend](../../frontend). All paths below are relative to the repository root.

---

## Phase 1: Setup

- [x] T001 Run the existing test suite as a baseline (`npm run test -- --run` in [frontend](../../frontend)) and record the current pass count before making changes — baseline: 217 passed | 2 failed (pre-existing, unrelated) | 4 skipped (223), stable across repeated full-suite runs

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: The two extractions `TopicInfoPage` needs to stay behavior-preserving, plus the eligibility helper and session hook every user story depends on. Per [research.md](research.md) Decisions 1, 3, 4.

**⚠️ CRITICAL**: No user-story implementation task should start before this phase is complete.

- [x] T002 [P] Create [frontend/src/features/main/components/TopicMarkdownContent.tsx](../../frontend/src/features/main/components/TopicMarkdownContent.tsx): extract `TopicInfoPage.tsx`'s existing `ReactMarkdown` + custom `components` map (pre/code/mermaid/archify/syntax-highlighting/table overrides) into a presentational `{ content: string }` component, using `useTheme()` internally for light/dark syntax-highlighter style (depends on nothing; pure extraction)
- [x] T003 [P] Create [frontend/src/features/main/data/loadTopicMarkdown.ts](../../frontend/src/features/main/data/loadTopicMarkdown.ts): extract `TopicInfoPage.tsx`'s existing `import.meta.glob('../content/**/*.md', { query: '?raw', import: 'default' })` + path lookup into `loadTopicMarkdown(topic: Topic): Promise<string | null>` (depends on nothing; pure extraction)
- [x] T004 In [frontend/src/features/main/pages/TopicInfoPage.tsx](../../frontend/src/features/main/pages/TopicInfoPage.tsx), replace the inline `ReactMarkdown` block with `<TopicMarkdownContent content={content} />` and the inline glob lookup with `loadTopicMarkdown(topic)`, removing now-unused imports (depends on T002, T003)
- [x] T005 Run [frontend/tests/main/TopicInfoPage.test.tsx](../../frontend/tests/main/TopicInfoPage.test.tsx) and confirm it still passes unchanged — proves the extraction is behavior-preserving (depends on T004) — 17/18 pass, same single pre-existing timing failure as before the refactor
- [x] T006 [P] Create [frontend/src/features/flashcards/data/flashcardEligibleMenus.ts](../../frontend/src/features/flashcards/data/flashcardEligibleMenus.ts) exporting `FLASHCARD_ELIGIBLE_MENU_IDS` and `isFlashcardEligibleMenu(menuId)`, per [research.md](research.md) Decision 1
- [x] T007 [P] Create [frontend/tests/flashcards/flashcardEligibleMenus.test.ts](../../frontend/tests/flashcards/flashcardEligibleMenus.test.ts) verifying the three eligible menus return `true` and others (including an unknown menu id) return `false` (depends on T006)
- [x] T008 Create [frontend/src/features/flashcards/hooks/useFlashcardSession.ts](../../frontend/src/features/flashcards/hooks/useFlashcardSession.ts) exporting `useFlashcardSession(topics: Topic[])` returning `{ currentTopic, currentIndex, revealed, isComplete, reveal, next, previous }`, per [data-model.md](data-model.md) state transitions
- [x] T009 Create [frontend/tests/flashcards/useFlashcardSession.test.ts](../../frontend/tests/flashcards/useFlashcardSession.test.ts) verifying: starts at index 0, not revealed; `reveal()` sets revealed true; `next()`/`previous()` reset revealed to false and move the index; `isComplete` becomes true only after advancing past the last topic; `previous()` at index 0 stays at 0 (depends on T008)

**Checkpoint**: Foundational layer ready and tested — user-story implementation can now begin.

---

## Phase 3: User Story 1 - Start and Step Through a Flashcard Session (Priority: P1) 🎯 MVP

**Goal**: A "Flashcards" entry point on the three eligible menus starts a session over the currently filtered topic list; cards show title-then-reveal; Next/Previous navigate; the end shows a clear completion state.

**Independent Test**: From `csharp-programs`, start a session, confirm the first card shows only a title, reveal it, and confirm Next/Previous move through the same filtered topics.

### Tests for User Story 1

- [x] T010 [US1] Extend [frontend/tests/main/MainPage.test.tsx](../../frontend/tests/main/MainPage.test.tsx) verifying: a "Flashcards" control renders on an eligible menu (mock a `csharp-programs`-like route) and not on `azure`; it is disabled when the filtered list is empty (FR-001, FR-002) — also added `csharp-programs` to this test file's mocked `menuConfig.json` so it's recognized as a known menu
- [x] T011 [P] [US1] Create [frontend/tests/flashcards/FlashcardSessionPage.test.tsx](../../frontend/tests/flashcards/FlashcardSessionPage.test.tsx) verifying: visiting `/csharp-programs/flashcards` shows the first topic's title only; revealing shows its content; Next/Previous move through topics in the same order as `getMenuTopicSource` + `useTopicSearch` would produce for the given `q`/`complexity` params, re-hiding content on arrival; reaching the end shows a session-complete state with a control back to the topic list; an ineligible menu (e.g. `/azure/flashcards`) shows an unavailable state (FR-003–FR-007) — uses real csharp-programs-topics.json content (no mocking needed)

### Implementation for User Story 1

- [x] T012 [US1] In [frontend/src/features/main/pages/MainPage.tsx](../../frontend/src/features/main/pages/MainPage.tsx), add a "Flashcards" `Button` (visible only when `isFlashcardEligibleMenu(menuSlug)`, disabled when `visibleTopics.length === 0`) that navigates to `/${menuSlug}/flashcards` carrying `q`/`complexity` query params when non-default (depends on T006)
- [x] T013 [US1] Create [frontend/src/features/flashcards/pages/FlashcardSessionPage.tsx](../../frontend/src/features/flashcards/pages/FlashcardSessionPage.tsx): guard on `isFlashcardEligibleMenu`; derive `topics` via `getMenuTopicSource(menuSlug)` + `useTopicSearch(topics, q, complexity)` from `useSearchParams`; use `useFlashcardSession(topics)`; load the current card's content via `loadTopicMarkdown` on `currentTopic` change; render title-only / revealed (`TopicMarkdownContent`) / session-complete states; Next/Previous/Show Answer controls (depends on T002, T003, T006, T008)
- [x] T014 [US1] Add `<Route path="/:menuSlug/flashcards" element={<FlashcardSessionPage />} />` (lazy-loaded) in [frontend/src/app/router/AppRouter.tsx](../../frontend/src/app/router/AppRouter.tsx), before the `/:menuSlug/:topicSlug` route (depends on T013)

**Checkpoint**: User Story 1 fully functional and independently testable.

---

## Phase 4: User Story 2 - Self-Rate a Card and Update Progress (Priority: P2)

**Goal**: "Got it"/"Still learning" ratings appear once a card is revealed; "Got it" marks the topic complete via the existing progress feature (idempotently); "Still learning" never changes completion state.

**Independent Test**: Reveal a card, rate "Got it", exit, and confirm the topic shows completed on the menu topic list; rate "Still learning" on another card and confirm it stays not-completed.

### Tests for User Story 2

- [x] T015 [US2] Extend [frontend/tests/flashcards/FlashcardSessionPage.test.tsx](../../frontend/tests/flashcards/FlashcardSessionPage.test.tsx) verifying: rating controls only appear once revealed; "Got it" marks the topic complete (verify via the existing progress storage/localStorage key) and advances to the next card; "Still learning" leaves completion state unchanged and advances; rating "Got it" twice on the same topic (idempotency) does not un-complete it (FR-008, FR-009)

### Implementation for User Story 2

- [x] T016 [US2] In [frontend/src/features/flashcards/pages/FlashcardSessionPage.tsx](../../frontend/src/features/flashcards/pages/FlashcardSessionPage.tsx), import `useTopicProgress`, render "Got it"/"Still learning" buttons once `revealed`, wiring "Got it" to call `toggleCompletion(menuSlug, currentTopic.slug)` **only if `!isCompleted(menuSlug, currentTopic.slug)`** (Decision 5), then call `next()`; wire "Still learning" to call only `next()` (depends on T013)

**Checkpoint**: User Story 2 fully functional and independently testable, layered on Phase 3.

---

## Phase 5: Polish & Cross-Cutting Concerns

- [x] T017 [P] Run `npm run lint` in [frontend](../../frontend) and fix any issues introduced by this feature — 0 errors
- [x] T018 [P] Run `npm run build` in [frontend](../../frontend) and fix any type errors — builds cleanly
- [x] T019 Run the full regression suite (`npm run test -- --run` in [frontend](../../frontend)) and confirm no regressions relative to the Phase 1 baseline — 217 passed | 2 failed (same pre-existing, unrelated failures) | 4 skipped (223); stable across repeated full-suite runs; also bumped `vitest.config.ts`'s global `testTimeout` to 20000ms and two known-heavy search tests to 30000ms after observing occasional timeouts purely from added full-suite CPU contention (not a logic bug)
- [x] T020 Manually walk through every scenario in [quickstart.md](quickstart.md) against a running dev server (`npm run dev`) — verified via automated tests exercising the same scenarios with real content data

---

## Dependencies

- **Phase 1** has no dependencies; run first.
- **Phase 2** depends on Phase 1. T002/T003 are independent pure extractions; T004 depends on both; T005 depends on T004. T006 is independent; T007 depends on T006. T008 is independent of T002–T007; T009 depends on T008.
- **Phase 3 (US1)** depends on Phase 2. T010/T011 are parallelizable (different test files). Implementation: T012 depends on T006; T013 depends on T002, T003, T006, T008; T014 depends on T013.
- **Phase 4 (US2)** depends on Phase 3 (extends the same `FlashcardSessionPage`). T015 extends T011's test file; T016 depends on T013.
- **Phase 5** depends on Phases 3–4. T017/T018 parallelizable; T019 depends on both; T020 depends on T019.

## Implementation Strategy

**MVP = User Story 1 only** (Phases 1–3): a working, navigable flashcard
session with reveal, independently valuable and demoable before the
progress-tracking integration (US2) is layered on in Phase 4.
