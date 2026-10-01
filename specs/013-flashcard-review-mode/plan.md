# Implementation Plan: Flashcard Quick-Review Mode

**Branch**: `013-flashcard-review-mode` | **Date**: 2026-09-30 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/013-flashcard-review-mode/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command; its definition describes the execution workflow.

## Summary

Add a "Flashcards" entry point on the `csharp-programs`, `javascript-programs`,
and `sql-programs` menu topic-list pages (only). Selecting it navigates to a
new `/:menuSlug/flashcards` route carrying the current search/complexity
filter as query parameters, which independently re-derives the identical
filtered topic list (reusing `getMenuTopicSource` + `useTopicSearch`
unchanged). The session shows one topic at a time — title first, with a
reveal control that renders the topic's existing markdown content (via a
newly-extracted shared `TopicMarkdownContent` renderer, also used by
`TopicInfoPage`) — plus Next/Previous and "Got it"/"Still learning" rating,
where "Got it" marks the topic complete via the existing feature-010
progress Context (guarded to be idempotent).

## Technical Context

**Language/Version**: TypeScript 5.x (strict mode) with React 19

**Primary Dependencies**: MUI v7; `react-markdown` + `remark-gfm` +
`react-syntax-highlighter` (all already used by `TopicInfoPage`, now via
the extracted shared renderer); no new runtime dependencies

**Storage**: None new — reuses feature 010's existing `localStorage`-backed
topic-progress Context for "Got it" ratings; the session itself
(current index, revealed state) is transient `useState`, re-derivable from
the URL, not persisted

**Testing**: Vitest + React Testing Library + `@testing-library/user-event`

**Target Platform**: Browser SPA hosted on GitHub Pages (HashRouter); latest
Chrome, Edge, Firefox, Safari

**Project Type**: Single-project web frontend (existing `frontend/` app)

**Performance Goals**: Each card's content is loaded lazily, one topic at a
time (via the extracted `loadTopicMarkdown`, identical cost to today's
`TopicInfoPage` per-topic load) — no bulk/whole-corpus loading, unlike
feature 012's search index

**Constraints**: Must remain GitHub Pages/HashRouter-compatible (new route
only, no server dependency); the eligible-menu list must be a single shared
source of truth (Decision 1); "Got it" must never un-complete an
already-completed topic (Decision 5); reveal rendering must be identical to
the existing topic detail page (Decision 3)

**Scale/Scope**: 1 new route, 1 new feature folder (`features/flashcards`),
1 extracted shared renderer + 1 extracted shared content loader (both used
by the pre-existing `TopicInfoPage`, refactored not rewritten), 1 new entry
point control on `MainPage`

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Check | Result |
|-----------|-------|--------|
| I. Static Hosting First | New `/:menuSlug/flashcards` route added inside the existing `AppShell`/`HashRouter`; no server dependency; filters carried via client-side query params only | PASS |
| II. React Architecture and Purity | Session state (`currentIndex`, `revealed`) is local `useState`; content-loading Effect mirrors `TopicInfoPage`'s existing, already-justified pattern (external resource fetch); no render-time mutation | PASS |
| III. State Management Discipline | No new Context — session state is local to `FlashcardSessionPage`; reuses existing `TopicProgressContext` (already justified as cross-cutting in feature 010) rather than introducing a new one | PASS |
| IV. Feature-First Organization | New `features/flashcards/` feature owns the session page/hook/eligibility data; the two extractions (`TopicMarkdownContent`, `loadTopicMarkdown`) live in `features/main` since `TopicInfoPage` (an existing `features/main` page) is their other consumer — not owned by the new feature | PASS |
| V. UI System Consistency (MUI) | Card uses MUI `Card`/`Paper`, reveal/rating use `Button`/`ButtonGroup`, consistent with existing `ResetProgressDialog`/`TopicCard` patterns | PASS |
| VI. Accessibility Baseline | Reveal, Next, Previous, rating, and Exit controls are labeled buttons, reachable via Tab, operable via Enter/Space (FR-010) | PASS |
| VII. Quality Gates | New types/functions added under strict mode; refactor of `TopicInfoPage.tsx` re-verified against its existing test suite | PASS |
| VIII. Automated Testing Policy | New tests for the eligibility helper, the session hook, and `FlashcardSessionPage`; `TopicInfoPage.test.tsx` re-run unchanged (behavior-preserving refactor) to confirm no regression | PASS |
| IX. Security and Configuration Hygiene | No new persisted client storage introduced (reuses feature 010's existing versioned key); markdown content rendered through the same existing, already-safe pipeline | PASS |
| X. Performance and Browser Support | Per-card lazy loading (one topic at a time) — no bulk fetch; session re-derivation from URL is a cheap synchronous filter over an already in-memory topic array | PASS |
| XI. Constitution Governance | No amendment needed | PASS |

No violations — Complexity Tracking section is not needed.

## Project Structure

### Documentation (this feature)

```text
specs/013-flashcard-review-mode/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
└── tasks.md
```

### Source Code (repository root)

```text
frontend/
├── src/
│   ├── app/router/AppRouter.tsx                     # Add `<Route path="/:menuSlug/flashcards" element={<FlashcardSessionPage />} />`, lazy-loaded, before `/:menuSlug/:topicSlug`
│   └── features/
│       ├── main/
│       │   ├── components/
│       │   │   └── TopicMarkdownContent.tsx          # EXTRACTED from TopicInfoPage.tsx (Decision 3) — shared markdown+mermaid+archify+table renderer
│       │   ├── data/
│       │   │   └── loadTopicMarkdown.ts               # EXTRACTED from TopicInfoPage.tsx (Decision 4) — per-topic lazy raw-markdown loader
│       │   └── pages/
│       │       ├── TopicInfoPage.tsx                  # Refactored to use TopicMarkdownContent + loadTopicMarkdown (behavior-preserving)
│       │       └── MainPage.tsx                       # Add "Flashcards" entry point (eligible menus only, disabled when filtered list is empty)
│       └── flashcards/                                 # NEW feature
│           ├── data/
│           │   └── flashcardEligibleMenus.ts           # FLASHCARD_ELIGIBLE_MENU_IDS + isFlashcardEligibleMenu()
│           ├── hooks/
│           │   └── useFlashcardSession.ts               # currentIndex/revealed state + next/previous/rate(Got it | Still learning)
│           └── pages/
│               └── FlashcardSessionPage.tsx             # Re-derives filtered topics from URL; renders card, reveal, rating, session-complete state
└── tests/
    ├── main/
    │   └── TopicInfoPage.test.tsx                       # Re-run unchanged; confirms the extraction is behavior-preserving
    └── flashcards/
        ├── flashcardEligibleMenus.test.ts                # NEW
        ├── useFlashcardSession.test.ts                    # NEW
        └── FlashcardSessionPage.test.tsx                  # NEW
```

**Structure Decision**: Single-project web frontend. The two extractions
(`TopicMarkdownContent`, `loadTopicMarkdown`) live in `features/main`
because `TopicInfoPage` — an existing `features/main` page — is their other
real consumer (Constitution Principle IV: shared primitives live where
they're actually shared, not inside the feature that merely reuses them).
The new `features/flashcards` feature owns everything else. `MainPage.tsx`
gains one additive entry point; `TopicInfoPage.tsx`'s visible behavior is
unchanged (refactor only, re-verified by its existing test suite).

## Complexity Tracking

*No violations — this section is not applicable.*
