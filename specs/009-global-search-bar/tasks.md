---

description: "Task list template for feature implementation"
---

# Tasks: Global Search Bar

**Input**: Design documents from `/specs/009-global-search-bar/`

**Prerequisites**: [plan.md](plan.md), [spec.md](spec.md), [research.md](research.md), [data-model.md](data-model.md), [contracts/global-search-ui-contract.md](contracts/global-search-ui-contract.md), [quickstart.md](quickstart.md)

**Tests**: Included. Constitution Principle VIII (Automated Testing Policy) requires every feature to include or update automated tests (Vitest + React Testing Library), so test tasks are mandatory here, not optional.

**Organization**: This feature has 3 user stories (US1 P1, US2 P1, US3 P2). Tasks are grouped into Setup, Foundational (shared cross-menu search data layer), one phase per user story, and Polish.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: Maps to US1, US2, or US3
- Include exact file paths in descriptions

## Path Conventions

Single-project web frontend at [frontend](../../frontend). All paths below are relative to the repository root.

---

## Phase 1: Setup

**Purpose**: Establish a pre-change baseline so regressions introduced by this feature are easy to spot.

- [x] T001 Run the existing test suite as a baseline (`npm run test -- --run` in [frontend](../../frontend)) and record the current pass count before making changes

**Checkpoint**: Baseline established; safe to start Foundational changes.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: The cross-menu search data layer every user story depends on — the `SearchableTopic` type, the flattening function over all menus' topics, and the matching hook. Per [research.md](research.md) Decisions 1, 5 and [data-model.md](data-model.md).

**⚠️ CRITICAL**: No user-story implementation task should start before this phase is complete.

- [x] T002 [P] Create [frontend/src/features/search/model/types.ts](../../frontend/src/features/search/model/types.ts) with the `SearchableTopic` interface (`topic: Topic`, `menuId: string`, `menuLabel: string`), importing `Topic` from `../../main/model/types`, per [data-model.md](data-model.md)
- [x] T003 [P] Create [frontend/src/features/search/data/getAllSearchableTopics.ts](../../frontend/src/features/search/data/getAllSearchableTopics.ts) that flattens `getTopicConfigMap()` (from `../../main/data/getMenuTopicSource`) joined with `getSortedMenuItems()` (from `../../landing/data/getSortedMenuItems`) into `SearchableTopic[]`, resolving each topic's `menuLabel` from the matching `NavigationMenuItem` (falling back to `menuId` if no label is found), per [data-model.md](data-model.md) Derivation rule (depends on T002)
- [x] T004 [P] Create [frontend/src/features/search/hooks/useGlobalTopicSearch.ts](../../frontend/src/features/search/hooks/useGlobalTopicSearch.ts) exporting `useGlobalTopicSearch(topics: SearchableTopic[], query: string): SearchableTopic[]`, memoized, filtering to entries whose `topic.title` contains the trimmed, case-insensitive `query` (empty/whitespace query returns all topics), per [research.md](research.md) Decision 5 and FR-012 (depends on T002)
- [x] T005 [P] Create [frontend/tests/search/getAllSearchableTopics.test.ts](../../frontend/tests/search/getAllSearchableTopics.test.ts) verifying the flattened list includes topics from multiple menu areas with the correct `menuId`/`menuLabel` pairing, and that its length equals the sum of every menu's topic count (no topics dropped or capped) (depends on T003)
- [x] T006 [P] Create [frontend/tests/search/useGlobalTopicSearch.test.ts](../../frontend/tests/search/useGlobalTopicSearch.test.ts) verifying case-insensitive substring matching across menu areas, an empty query returning all topics, and a no-match query returning an empty array (depends on T004)

**Checkpoint**: Foundational search data layer ready and tested — user-story implementation can now begin.

---

## Phase 3: User Story 1 - Global Search from the Top Navigation (Priority: P1) 🎯 MVP

**Goal**: A Global Search bar is visible in the top navigation (between the title and the menu items) on every route; submitting a non-empty keyword navigates to a `/search` results page that shows matching topics.

**Independent Test**: Open the app, locate the search bar between the title and the menu items in the top navigation, type a keyword, submit it, and confirm the results page loads pre-filled with that keyword and shows matching topics.

### Tests for User Story 1

- [x] T007 [US1] Create [frontend/tests/landing/GlobalSearchBar.test.tsx](../../frontend/tests/landing/GlobalSearchBar.test.tsx) verifying: the search input renders with an accessible name; pressing Enter with a non-empty keyword navigates to `/search?q=<keyword>`; pressing Enter (or activating the search icon) with an empty/whitespace-only value does not navigate and leaves the input unchanged (FR-003); the input is reachable via Tab
- [x] T008 [P] [US1] Extend [frontend/tests/landing/LandingNavigationBar.test.tsx](../../frontend/tests/landing/LandingNavigationBar.test.tsx) to confirm the Global Search bar renders between the title button and the menu navigation
- [x] T009 [P] [US1] Create [frontend/tests/search/SearchResultsPage.test.tsx](../../frontend/tests/search/SearchResultsPage.test.tsx) with an initial test verifying that visiting `/search?q=<keyword>` pre-fills the page's own search bar with that keyword and renders at least one matching topic; also assert the page's own search bar has an accessible name and is reachable via Tab (FR-013)

### Implementation for User Story 1

- [x] T010 [US1] Create [frontend/src/features/search/pages/SearchResultsPage.tsx](../../frontend/src/features/search/pages/SearchResultsPage.tsx): read the initial `q` query parameter via `useSearchParams()`, hold it in local `keyword` state, compute `results` via `useGlobalTopicSearch(getAllSearchableTopics(), keyword)`, and render the existing [frontend/src/features/main/components/TopicList.tsx](../../frontend/src/features/main/components/TopicList.tsx) with `results.map((r) => r.topic)` and an `onTopicClick` that navigates to `/${menuId}/${slug}` (depends on T002, T003, T004)
- [x] T011 [US1] Add `<Route path="/search" element={<SearchResultsPage />} />` inside the existing `AppShell` route in [frontend/src/app/router/AppRouter.tsx](../../frontend/src/app/router/AppRouter.tsx), lazy-loaded like the other page routes (depends on T010)
- [x] T012 [US1] Create [frontend/src/features/landing/components/GlobalSearchBar.tsx](../../frontend/src/features/landing/components/GlobalSearchBar.tsx): an MUI `TextField`/`InputAdornment` with a search icon, local `value` state, `useNavigate()` from `react-router-dom`; submitting (Enter or icon activation) with a non-empty trimmed value navigates to `/search?q=<value>` and clears `value`; submitting an empty/whitespace-only value does nothing (FR-002, FR-003)
- [x] T013 [US1] Render `<GlobalSearchBar />` between the title `ButtonBase` and `<TopMenuItems />` in [frontend/src/features/landing/components/LandingNavigationBar.tsx](../../frontend/src/features/landing/components/LandingNavigationBar.tsx) (depends on T012)

**Checkpoint**: User Story 1 fully functional and independently testable — the Global Search bar is visible everywhere and submitting a keyword reaches a results page showing matches.

---

## Phase 4: User Story 2 - View Matching Topics on the Search Results Page (Priority: P1)

**Goal**: The search results page reliably shows every matching topic across all menu areas, updates live as the keyword is edited in place, shows a clear empty state for no matches, and lets the user select a result to open its content.

**Independent Test**: Submit a keyword that matches topics from more than one menu area and confirm both appear in the results list; edit the keyword directly on the results page and confirm the list updates; clear/replace it with a keyword that matches nothing and confirm the empty-state message appears; select a result and confirm it navigates to that topic's content.

### Tests for User Story 2

- [x] T014 [US2] Extend [frontend/tests/search/SearchResultsPage.test.tsx](../../frontend/tests/search/SearchResultsPage.test.tsx) with a keyword that matches topics from at least two different menu areas, asserting both appear in the results list regardless of menu; also assert with a broad keyword matching a large number of topics that every match renders with none hidden/truncated (FR-005's "no pagination or maximum result count")
- [x] T015 [US2] Extend [frontend/tests/search/SearchResultsPage.test.tsx](../../frontend/tests/search/SearchResultsPage.test.tsx) with: editing the page's own search bar updates the results list without a separate submit action (FR-006); the `q` query parameter reflects the edited keyword (reload persistence)
- [x] T016 [US2] Extend [frontend/tests/search/SearchResultsPage.test.tsx](../../frontend/tests/search/SearchResultsPage.test.tsx) with a keyword matching no topic title, asserting the empty-state message renders instead of a list (FR-007)
- [x] T017 [US2] Extend [frontend/tests/search/SearchResultsPage.test.tsx](../../frontend/tests/search/SearchResultsPage.test.tsx) with selecting a result navigating to `/${menuId}/${topicSlug}` (FR-008)

### Implementation for User Story 2

- [x] T018 [US2] In [frontend/src/features/search/pages/SearchResultsPage.tsx](../../frontend/src/features/search/pages/SearchResultsPage.tsx), wire the page's own search `TextField`'s `onChange` to update `keyword` and call `setSearchParams({ q: keyword }, { replace: true })` so edits stay in sync with the URL without adding history entries (depends on T010)
- [x] T019 [US2] In [frontend/src/features/search/pages/SearchResultsPage.tsx](../../frontend/src/features/search/pages/SearchResultsPage.tsx), render a clear empty-state message (matching the existing `emptyMessage` pattern used by `TopicList`) when `results.length === 0` (depends on T010)

**Checkpoint**: User Story 2 fully functional and independently testable — cross-menu matching, in-place editing, empty state, and result selection all work on top of User Story 1's page/route.

---

## Phase 5: User Story 3 - Global Search Bar Collapses on the Search Results Page (Priority: P2)

**Goal**: While on the search results page, the Global Search bar collapses to a search-icon-only control (no leftover keyword text); selecting the icon re-expands it in place; leaving the results page restores the normal expanded, empty state.

**Independent Test**: Perform a global search, then confirm the top navigation's search area shows only a search icon (no text input, no leftover keyword); select the icon and confirm the input reappears empty; navigate away and confirm the bar returns to its normal expanded state.

### Tests for User Story 3

- [x] T020 [US3] Extend [frontend/tests/landing/GlobalSearchBar.test.tsx](../../frontend/tests/landing/GlobalSearchBar.test.tsx) with: rendering on `/search` shows only a labeled search icon button, no text input and no leftover keyword (FR-009); selecting that icon reveals an empty text input (FR-010); submitting a new keyword from that reopened input navigates to `/search?q=<new keyword>` and the bar collapses back to icon-only
- [x] T021 [P] [US3] Extend [frontend/tests/main/NavigationPersistenceFlow.test.tsx](../../frontend/tests/main/NavigationPersistenceFlow.test.tsx) with an end-to-end flow: submit a global search from the landing page, confirm the results page renders with the Global Search bar collapsed, select a result, confirm it opens the topic's content, then navigate to a different menu and confirm the Global Search bar is expanded and empty again (FR-011)

### Implementation for User Story 3

- [x] T022 [US3] In [frontend/src/features/landing/components/GlobalSearchBar.tsx](../../frontend/src/features/landing/components/GlobalSearchBar.tsx), add `useLocation()` to derive `isOnSearchPage = pathname === '/search'` and a local `manuallyExpanded` boolean; render the icon-only collapsed control when `isOnSearchPage && !manuallyExpanded`, otherwise render the expanded input (depends on T012, T013)
- [x] T023 [US3] In [frontend/src/features/landing/components/GlobalSearchBar.tsx](../../frontend/src/features/landing/components/GlobalSearchBar.tsx), wire the collapsed icon's `onClick` to set `manuallyExpanded` to `true`, and reset `manuallyExpanded` to `false` (plus clear `value`) on every successful submit, per [research.md](research.md) Decision 4 (depends on T022)
- [x] T024 [US3] In [frontend/src/features/landing/components/GlobalSearchBar.tsx](../../frontend/src/features/landing/components/GlobalSearchBar.tsx), add the single justified `useEffect` keyed on `pathname` that resets **both** `manuallyExpanded` to `false` **and** `value` to `''` whenever the route changes away from `/search` — clearing `value` here (not just on submit) prevents a typed-but-unsubmitted keyword from leaking onto the next page (FR-011) — per [research.md](../009-global-search-bar/research.md) Decision 4 and Constitution Principle II (depends on T022)

**Checkpoint**: User Story 3 fully functional and independently testable — the Global Search bar's collapse/expand behavior is correct in every scenario from the spec.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final quality gates across the whole change.

- [x] T025 [P] Run `npm run lint` in [frontend](../../frontend) and fix any issues introduced by this feature
- [x] T026 [P] Run `npm run build` (TypeScript strict project build) in [frontend](../../frontend) and fix any type errors
- [x] T027 Run the full regression suite (`npm run test -- --run` in [frontend](../../frontend)) and confirm no regressions relative to the Phase 1 baseline
- [x] T028 Manually walk through every scenario in [quickstart.md](quickstart.md) against a running dev server (`npm run dev`)

---

## Dependencies

- **Phase 1 (Setup)** has no dependencies; run first.
- **Phase 2 (Foundational)** depends on Phase 1 and blocks all user-story phases. Within Phase 2: T002 first; T003 and T004 both depend on T002 and are parallelizable with each other; T005 depends on T003; T006 depends on T004.
- **Phase 3 (US1)** depends on Phase 2 being complete. T007 is independent (new file); T008 and T009 are parallelizable with T007 and with each other (different files). Implementation: T010 depends on T002–T004; T011 depends on T010; T012 is independent (new file, parallelizable with T010/T011); T013 depends on T012.
- **Phase 4 (US2)** depends on Phase 3 being complete (extends the page/route it created). T014–T017 all extend the same test file, so they run sequentially. T018 and T019 both edit `SearchResultsPage.tsx`, so they run sequentially, after T010.
- **Phase 5 (US3)** depends on Phase 3 being complete (extends `GlobalSearchBar.tsx`); it does not depend on Phase 4. T020 is sequential with T007 (same file); T021 is parallelizable with T020 (different file). Implementation T022 → T023 → T024 are sequential (same file).
- **Phase 6 (Polish)** depends on all of Phases 3–5 being complete. T025 and T026 are parallelizable; T027 depends on T025 and T026; T028 depends on T027.

## Parallel Execution Examples

Foundational phase, after Phase 1:

```text
T002 (types.ts) → T003 (getAllSearchableTopics.ts) and T004 (useGlobalTopicSearch.ts) run together
  → T005 (getAllSearchableTopics.test.ts) and T006 (useGlobalTopicSearch.test.ts) run together
```

User Story 1 phase, after Phase 2:

```text
T007 (GlobalSearchBar.test.tsx), T008 (LandingNavigationBar.test.tsx), T009 (SearchResultsPage.test.tsx) → run together

T010 (SearchResultsPage.tsx) → T011 (AppRouter.tsx)     ┐
T012 (GlobalSearchBar.tsx) → T013 (LandingNavigationBar.tsx) ┘ run in parallel with the chain above
```

User Story 2 phase, after Phase 3:

```text
T014 → T015 → T016 → T017  (SearchResultsPage.test.tsx, sequential)
T018 → T019                (SearchResultsPage.tsx, sequential)
```

User Story 3 phase, after Phase 3 (independent of Phase 4):

```text
T020 (GlobalSearchBar.test.tsx)              ┐
T021 (NavigationPersistenceFlow.test.tsx)    ┘ run together

T022 → T023 → T024  (GlobalSearchBar.tsx, sequential)
```

## Implementation Strategy

**MVP = User Story 1 only** (Phase 1 → Phase 2 → Phase 3): delivers a visible,
working Global Search bar that reaches a results page showing matches, which
is independently demoable even before the deeper cross-menu-editing behavior
(US2) or the collapse refinement (US3) exist. Recommended incremental order:

1. Setup + Foundational (Phases 1–2) — required for everything.
2. User Story 1 (Phase 3) — MVP: bar + navigation + a working results page.
3. User Story 2 (Phase 4) — deepen the results page's correctness (cross-menu
   matches, in-place editing, empty state, selection).
4. User Story 3 (Phase 5) — layer the collapse/expand refinement onto the
   bar; independent of Phase 4, so it could also be done in parallel with it
   if split across two people.
5. Polish (Phase 6).
