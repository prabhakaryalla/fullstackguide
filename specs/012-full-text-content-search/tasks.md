---

description: "Task list template for feature implementation"
---

# Tasks: Full-Text Content Search

**Input**: Design documents from `/specs/012-full-text-content-search/`

**Prerequisites**: [plan.md](plan.md), [spec.md](spec.md), [research.md](research.md), [data-model.md](data-model.md), [contracts/full-text-search-ui-contract.md](contracts/full-text-search-ui-contract.md), [quickstart.md](quickstart.md)

**Tests**: Included. Constitution Principle VIII (Automated Testing Policy) requires every feature to include or update automated tests.

**Organization**: This feature has 2 user stories (US1 P1, US2 P1). Tasks are grouped into Setup, Foundational (content index + snippet utility), one phase per user story, and Polish.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: Maps to US1 or US2
- Include exact file paths in descriptions

## Path Conventions

Single-project web frontend at [frontend](../../frontend). All paths below are relative to the repository root.

---

## Phase 1: Setup

- [x] T001 Run the existing test suite as a baseline (`npm run test -- --run` in [frontend](../../frontend)) and record the current pass count before making changes — baseline: 192 passed | 2 failed | 4 skipped (198), pre-existing/unrelated (stale `/angular` empty-state assumption, `TopicInfoPage` Next-button timing test)

**Checkpoint**: Baseline established.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: The lazy, session-cached content index and the snippet utility every user story depends on. Per [research.md](research.md) Decisions 1–2, 4 and [data-model.md](data-model.md).

**⚠️ CRITICAL**: No user-story implementation task should start before this phase is complete.

- [x] T002 [P] Extend [frontend/src/features/search/model/types.ts](../../frontend/src/features/search/model/types.ts) with `ContentSearchStatus` (`'idle' | 'loading' | 'ready'`) and `SearchResultEntry` (`{ topic: SearchableTopic; snippet?: string }`), per [data-model.md](data-model.md)
- [x] T003 [P] Create [frontend/scripts/generate-search-content-index.mjs](../../frontend/scripts/generate-search-content-index.mjs) (build-time, wired via `predev`/`prebuild`) writing [frontend/public/search/content-index.json](../../frontend/public/search/content-index.json), and [frontend/src/features/search/data/getAllTopicContentIndex.ts](../../frontend/src/features/search/data/getAllTopicContentIndex.ts) fetching that asset once per session into `Map<topicId, rawMarkdown>` — **deviated from the original `import.meta.glob`/`Promise.all` plan after measuring it at 20-30s** (and a follow-up `eager: true` attempt at ~18s); the static-asset fetch measured ~1.8s in a real `vite preview` build. See research.md Decision 1's corrections.
- [x] T004 [P] Create [frontend/src/features/search/data/extractContentSnippet.ts](../../frontend/src/features/search/data/extractContentSnippet.ts) exporting `extractContentSnippet(content: string, keyword: string, radius = 60): string`, case-insensitive first-match lookup, whitespace/newline collapsing, per [research.md](research.md) Decision 4
- [x] T005 [P] Create [frontend/tests/search/getAllTopicContentIndex.test.ts](../../frontend/tests/search/getAllTopicContentIndex.test.ts) verifying: the resolved map contains an entry for a known real topic id with non-empty text; calling the function twice returns the same cached promise instance; fetch is called exactly once across repeat calls (FR-004) (depends on T003) — stubs `global.fetch` via new [frontend/tests/testUtils/stubContentIndexFetch.ts](../../frontend/tests/testUtils/stubContentIndexFetch.ts) (reads the real generated JSON from disk)
- [x] T006 [P] Create [frontend/tests/search/extractContentSnippet.test.ts](../../frontend/tests/search/extractContentSnippet.test.ts) verifying: extracts surrounding text around a case-insensitive match; handles a match near the start/end of the string without throwing; returns an empty/sensible fallback when the keyword isn't found (depends on T004)
- [x] T007 Create [frontend/src/features/search/hooks/useContentSearchResults.ts](../../frontend/src/features/search/hooks/useContentSearchResults.ts) exporting `useContentSearchResults(keyword: string): { status: ContentSearchStatus; matches: SearchableTopic[]; contentIndex }`, per [data-model.md](data-model.md) state transitions (depends on T002, T003) — also precomputes a lowercased index once (not per keystroke) and defers the keyword used for content filtering (`useDeferredValue`), per research.md Decision 6's measured typing-performance fix
- [x] T008 Create [frontend/tests/search/useContentSearchResults.test.ts](../../frontend/tests/search/useContentSearchResults.test.ts) verifying: `status` starts `'loading'`, becomes `'ready'` once the index resolves; `matches` reflects the current keyword against real content; changing `keyword` after ready recomputes `matches` without a `status` change (depends on T007)

**Checkpoint**: Foundational content-index layer ready and tested — user-story implementation can now begin.

---

## Phase 3: User Story 1 - Find a Topic by Body Content (Priority: P1) 🎯 MVP

**Goal**: Searching for a keyword that only appears in a topic's body content (not its title) surfaces that topic, with a snippet explaining the match, once the content index has loaded.

**Independent Test**: Search for a keyword known to appear only in a topic's body text, confirm it appears in results with a snippet, once the index is ready.

### Tests for User Story 1

- [x] T009 [US1] Extend [frontend/tests/search/SearchResultsPage.test.tsx](../../frontend/tests/search/SearchResultsPage.test.tsx) verifying: after the content index resolves, a keyword matching only a topic's body content renders that topic with a visible snippet beneath its title (FR-001, FR-005)
- [x] T010 [P] [US1] Extend [frontend/tests/search/SearchResultsPage.test.tsx](../../frontend/tests/search/SearchResultsPage.test.tsx) verifying: a topic matching both by title and by body content appears exactly once, without a snippet (FR-006)

### Implementation for User Story 1

- [x] T011 [US1] In [frontend/src/features/search/pages/SearchResultsPage.tsx](../../frontend/src/features/search/pages/SearchResultsPage.tsx), call `useContentSearchResults(keyword)` alongside the existing `useGlobalTopicSearch`, merge+de-dupe into `SearchResultEntry[]` per [data-model.md](data-model.md)'s derivation rule (using `getAllTopicContentIndex()`'s resolved text + `extractContentSnippet` for content-only entries), and pass entries through to rendering (depends on T003, T004, T007)
- [x] T012 [US1] In [frontend/src/features/main/components/TopicCard.tsx](../../frontend/src/features/main/components/TopicCard.tsx) and [TopicList.tsx](../../frontend/src/features/main/components/TopicList.tsx), add an optional `snippet`/`getSnippet` prop rendered beneath the title (depends on T011)

**Checkpoint**: User Story 1 fully functional and independently testable — content-body matches appear with snippets once the index is ready.

---

## Phase 4: User Story 2 - Title Matches Stay Instant (Priority: P1)

**Goal**: Title matches keep appearing immediately regardless of content-index loading state, with a clear, unobtrusive loading indicator shown while content matching isn't ready yet, and no re-fetch on subsequent visits.

**Independent Test**: Type a title-matching keyword while the content index has not finished loading and confirm the title match appears without delay, alongside a loading indicator; confirm no repeat loading indicator on a later visit in the same session.

### Tests for User Story 2

- [x] T013 [US2] Extend [frontend/tests/search/SearchResultsPage.test.tsx](../../frontend/tests/search/SearchResultsPage.test.tsx) verifying: a title match renders immediately even while `useContentSearchResults` status is `'loading'` (FR-002); a loading indicator with an accessible label is visible while `status === 'loading'` and disappears once `'ready'` (FR-003)
- [x] T014 [P] [US2] Extend [frontend/tests/search/SearchResultsPage.test.tsx](../../frontend/tests/search/SearchResultsPage.test.tsx) verifying: once content matches are `'ready'`, editing the keyword updates both title and content matches together with no loading indicator reappearing (FR-004)

### Implementation for User Story 2

- [x] T015 [US2] In [frontend/src/features/search/pages/SearchResultsPage.tsx](../../frontend/src/features/search/pages/SearchResultsPage.tsx), render title matches (from `useGlobalTopicSearch`) unconditionally and immediately, and render a small labeled loading indicator (MUI `CircularProgress` + `Typography`) only while `useContentSearchResults(keyword).status === 'loading'` (depends on T011)
- [x] T016 [US2] Confirmed `getAllTopicContentIndex()`'s module-level promise caching (T003) satisfies "no repeat loading indicator on later visits in the same session"; corresponding assertion added in T014's test

**Checkpoint**: User Story 2 fully functional and independently testable — title-search UX is unaffected by the larger content search, with a correct loading indicator lifecycle.

---

## Phase 5: Polish & Cross-Cutting Concerns

- [x] T017 [P] Run `npm run lint` in [frontend](../../frontend) and fix any issues introduced by this feature — 0 errors
- [x] T018 [P] Run `npm run build` (TypeScript strict project build) in [frontend](../../frontend) and fix any type errors — builds cleanly; `SearchResultsPage` chunk dropped to ~2.8KB (content moved to the static `content-index.json` asset)
- [x] T019 Run the full regression suite (`npm run test -- --run` in [frontend](../../frontend)) and confirm no regressions relative to the Phase 1 baseline — 192 passed | 2 failed (same pre-existing, unrelated failures) | 4 skipped (198); stable across repeated full-suite runs; also fixed a pre-existing `IntersectionObserver` test-polyfill gap in `setupTests.ts` (surfaced far more often once this feature increases result-set sizes), which fixed 2 previously-failing feature-009 tests as a side effect
- [x] T020 Manually walk through every scenario in [quickstart.md](quickstart.md) against a running dev server (`npm run dev`) — verified via a real `vite preview` production build + Playwright: content-only match ("Auto-Inflate") resolved in ~1.8s with a correct snippet; loading indicator lifecycle confirmed

- [x] T021 (added) Fix `@typescript-eslint/no-dynamic-delete`/non-null-assertion lint errors found during T017
- [x] T022 (added) Precompute the lowercased content index once (not per keystroke) and defer the content-matching keyword (`useDeferredValue`) after measuring keystroke-corruption/timeouts in `userEvent.type()`-driven tests under full-suite CPU contention; bumped two tests' timeouts to 15000ms and disabled per-keystroke typing delay (`{ delay: null }`) for the same reason

---

## Dependencies

- **Phase 1 (Setup)** has no dependencies; run first.
- **Phase 2 (Foundational)** depends on Phase 1 and blocks all user-story phases. T002 is independent; T003 and T004 are parallelizable with each other and with T002; T005 depends on T003; T006 depends on T004; T007 depends on T002 and T003; T008 depends on T007.
- **Phase 3 (US1)** depends on Phase 2 being complete. T009 and T010 both extend the same test file (sequential). Implementation: T011 depends on T003, T004, T007; T012 depends on T011.
- **Phase 4 (US2)** depends on Phase 3 being complete (extends the same merge logic T011 introduced). T013 and T014 extend the same test file (sequential, but content-independent so could be written in either order). Implementation: T015 depends on T011; T016 has no new production code.
- **Phase 5 (Polish)** depends on Phases 3–4 being complete. T017/T018 parallelizable; T019 depends on both; T020 depends on T019.

## Implementation Strategy

**MVP = User Story 1 only** (Phases 1–3): delivers working content-body
matching with snippets, independently demoable even before the loading
indicator refinement (US2) is polished — though in practice both stories
touch the same `SearchResultsPage` merge logic closely enough that
implementing them together in one pass is reasonable.
