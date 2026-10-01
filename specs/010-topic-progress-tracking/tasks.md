---

description: "Task list template for feature implementation"
---

# Tasks: Topic Progress Tracking

**Input**: Design documents from `/specs/010-topic-progress-tracking/`

**Prerequisites**: [plan.md](plan.md), [spec.md](spec.md), [research.md](research.md), [data-model.md](data-model.md), [contracts/topic-progress-ui-contract.md](contracts/topic-progress-ui-contract.md), [quickstart.md](quickstart.md)

**Tests**: Included. Constitution Principle VIII (Automated Testing Policy) requires every feature to include or update automated tests (Vitest + React Testing Library), so test tasks are mandatory here, not optional.

**Organization**: This feature has 3 user stories (US1 P1, US2 P1, US3 P3). Tasks are grouped into Setup, Foundational (shared progress storage/Context data layer), one phase per user story, and Polish.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: Maps to US1, US2, or US3
- Include exact file paths in descriptions

## Path Conventions

Single-project web frontend at [frontend](../../frontend). All paths below are relative to the repository root.

---

## Phase 1: Setup

**Purpose**: Establish a pre-change baseline so regressions introduced by this feature are easy to spot.

- [x] T001 Run the existing test suite as a baseline (`npm run test -- --run` in [frontend](../../frontend)) and record the current pass count before making changes — baseline: 5 failed | 143 passed | 4 skipped (152), all 5 failures pre-existing (`IntersectionObserver` polyfill, Previous/Next timing test), unrelated to this feature

**Checkpoint**: Baseline established; safe to start Foundational changes.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: The completion-state storage and Context layer every user story depends on — `ProgressState`, the versioned localStorage read/write helpers, `TopicProgressProvider`, and the consuming hooks. Per [research.md](research.md) Decisions 1–3 and [data-model.md](data-model.md).

**⚠️ CRITICAL**: No user-story implementation task should start before this phase is complete.

- [x] T002 [P] Create [frontend/src/features/progress/model/types.ts](../../frontend/src/features/progress/model/types.ts) with `ProgressState` (`Record<string, true>`), `TopicProgressContextValue` (`isCompleted`, `toggleCompletion`, `resetMenuProgress`), and `MenuProgressSummary` (`{ completed: number; total: number }`), per [data-model.md](data-model.md)
- [x] T003 [P] Create [frontend/src/features/progress/data/progressStorage.ts](../../frontend/src/features/progress/data/progressStorage.ts) exporting `PROGRESS_STORAGE_KEY = 'fullstack-guide.topic-progress.v1'`, `readProgressState(): ProgressState` (safe `JSON.parse` + plain-object guard behind `try/catch`, mirroring `readPersistedMode` in [frontend/src/theme/ThemeModeContext.tsx](../../frontend/src/theme/ThemeModeContext.tsx)), and `writeProgressState(state: ProgressState): void` (best-effort `try/catch` write), per [research.md](research.md) Decision 2 (depends on T002)
- [x] T004 [P] Create [frontend/tests/progress/progressStorage.test.ts](../../frontend/tests/progress/progressStorage.test.ts) verifying: malformed/missing localStorage value returns `{}`; a valid round-trip write-then-read returns the same state; a non-object JSON value (array/number/string) is rejected and falls back to `{}` (depends on T003)
- [x] T005 Create [frontend/src/features/progress/context/TopicProgressContext.tsx](../../frontend/src/features/progress/context/TopicProgressContext.tsx) exporting `TopicProgressContext` and `TopicProgressProvider`: lazy-initializes state from `readProgressState()`, and exposes `toggleCompletion(menuId, slug)` (add/remove the `` `${menuId}/${slug}` `` key, then `writeProgressState`) and `resetMenuProgress(menuId)` (delete every key with prefix `` `${menuId}/` ``, then `writeProgressState`), per [data-model.md](data-model.md) state transitions (depends on T002, T003)
- [x] T006 [P] Create [frontend/src/features/progress/hooks/useTopicProgress.ts](../../frontend/src/features/progress/hooks/useTopicProgress.ts) exporting `useTopicProgress()`, reading `TopicProgressContext` via `useContext` and throwing a clear error if used outside `TopicProgressProvider` (depends on T005)
- [x] T007 [P] Create [frontend/src/features/progress/hooks/useMenuProgressSummary.ts](../../frontend/src/features/progress/hooks/useMenuProgressSummary.ts) exporting `useMenuProgressSummary(menuId: string, topics: Topic[]): MenuProgressSummary`, memoized via `useMemo`, computing `completed`/`total` per [data-model.md](data-model.md) Derivation rule (depends on T002, T006)
- [x] T008 Create [frontend/tests/progress/TopicProgressContext.test.tsx](../../frontend/tests/progress/TopicProgressContext.test.tsx) verifying: `toggleCompletion` flips a topic's `isCompleted` result and is reversible; state persists across a provider remount (simulating reload) via the same localStorage key; `resetMenuProgress(menuId)` clears only that menu's keys, leaving other menus' completions intact; a completion recorded for a slug not present in a `topics` array passed to `useMenuProgressSummary` is excluded from `completed`/`total` (stale-slug handling, FR-009) (depends on T005, T006, T007)
- [x] T009 In [frontend/src/app/providers/AppProviders.tsx](../../frontend/src/app/providers/AppProviders.tsx), mount `TopicProgressProvider` alongside the existing `ThemeModeProvider` so every routed page renders under it (also updated [frontend/tests/main/renderWithRouter.tsx](../../frontend/tests/main/renderWithRouter.tsx)'s shared test render helper to wrap with `TopicProgressProvider`, since `MainPage`/`TopicInfoPage` tests use it) (depends on T005)

**Checkpoint**: Foundational progress-state layer ready and tested — user-story implementation can now begin.

---

## Phase 3: User Story 1 - Mark a Topic as Complete (Priority: P1) 🎯 MVP

**Goal**: A "Mark as complete" control on every topic content page toggles and persists that topic's completion state, independently of any other topic.

**Independent Test**: Open any topic page, activate the "Mark as complete" control, confirm its state changes to "Completed" and persists after a page reload.

### Tests for User Story 1

- [x] T010 [US1] Extend [frontend/tests/main/TopicInfoPage.test.tsx](../../frontend/tests/main/TopicInfoPage.test.tsx) verifying: the "Mark as complete" control renders with an accessible name and `aria-pressed="false"` by default; activating it flips to `aria-pressed="true"` and an updated accessible name; activating again reverts it (FR-001, FR-002, FR-010); the control is reachable via Tab and activatable via Enter/Space

### Implementation for User Story 1

- [x] T011 [US1] In [frontend/src/features/main/pages/TopicInfoPage.tsx](../../frontend/src/features/main/pages/TopicInfoPage.tsx), import `useTopicProgress` from `../../progress/hooks/useTopicProgress`, and render a labeled MUI toggle control (e.g. `ToggleButton`/`IconButton` with `aria-pressed`) near the existing Previous/Next Fab controls, wired to `isCompleted(menuSlug, topicSlug)` / `toggleCompletion(menuSlug, topicSlug)` (depends on T006) — rendered just after the Fabs in DOM order (not before) to avoid shifting the existing Previous/Next Tab-order tests

**Checkpoint**: User Story 1 fully functional and independently testable — marking a topic complete works and persists, per-topic.

---

## Phase 4: User Story 2 - See Progress Per Menu Area (Priority: P1)

**Goal**: Each menu's topic-list page shows a completed/total progress indicator and visually distinguishes completed topics in the list.

**Independent Test**: Mark a known number of topics complete within one menu area, navigate to that menu's topic list, and confirm the displayed completed/total count matches and completed topics are visually distinguishable.

### Tests for User Story 2

- [x] T012 [US2] Extend [frontend/tests/main/MainPage.test.tsx](../../frontend/tests/main/MainPage.test.tsx) verifying: with zero completions the progress indicator shows `0/<total>` (not blank/error); after marking topics complete (via the progress context/localStorage directly in the test setup) the indicator shows the correct `<completed>/<total>`; completed topics render with a distinguishing indicator in the list and not-completed ones do not (FR-004, FR-005)
- [x] T013 [P] [US2] Extend [frontend/tests/main/TopicList.test.tsx](../../frontend/tests/main/TopicList.test.tsx) verifying `TopicList` forwards an `isTopicCompleted` lookup result down to each rendered `TopicCard` as its `completed` prop

### Implementation for User Story 2

- [x] T014 [P] [US2] In [frontend/src/features/main/components/TopicCard.tsx](../../frontend/src/features/main/components/TopicCard.tsx), add an optional `completed?: boolean` prop rendering a small check indicator (e.g. `CheckCircleRoundedIcon`) alongside the existing complexity `Chip` when `true`, with no visual change when `false`/omitted, per [research.md](research.md) Decision 4
- [x] T015 [US2] In [frontend/src/features/main/components/TopicList.tsx](../../frontend/src/features/main/components/TopicList.tsx), add an optional `isTopicCompleted?: (topic: Topic) => boolean` prop and pass `isTopicCompleted?.(topic)` as `TopicCard`'s `completed` prop for each rendered row (depends on T014)
- [x] T016 [US2] In [frontend/src/features/main/pages/MainPage.tsx](../../frontend/src/features/main/pages/MainPage.tsx), import `useMenuProgressSummary` and `useTopicProgress`, render a progress `Chip` (e.g. "18/60 completed") next to the existing topic-count `Chip`, and pass `isTopicCompleted={(topic) => isCompleted(menuSlug, topic.slug)}` to `TopicList` (depends on T007, T015)

**Checkpoint**: User Story 2 fully functional and independently testable — per-menu progress counts and completed-topic indicators are correct and live (reflect current topic data).

---

## Phase 5: User Story 3 - Reset Progress (Priority: P3)

**Goal**: A confirmed, menu-scoped reset control clears tracked progress for one menu area without affecting any other menu.

**Independent Test**: Complete several topics, use the reset control, and confirm the affected menu's topics return to fully not-completed while unrelated menus are unaffected.

### Tests for User Story 3

- [x] T017 [US3] Extend [frontend/tests/main/MainPage.test.tsx](../../frontend/tests/main/MainPage.test.tsx) verifying: activating "Reset progress" opens a confirmation dialog naming the current menu; dismissing (cancel) leaves progress unchanged; confirming clears completion state and updates the progress indicator to `0/<total>` (FR-006, FR-007)

### Implementation for User Story 3

- [x] T018 [US3] Create [frontend/src/features/main/components/ResetProgressDialog.tsx](../../frontend/src/features/main/components/ResetProgressDialog.tsx): an MUI `Dialog` accepting `menuLabel`, `completedCount`, `open`, `onCancel`, `onConfirm` props, naming the menu and count, with labeled Cancel/Confirm actions (depends on T002)
- [x] T019 [US3] In [frontend/src/features/main/pages/MainPage.tsx](../../frontend/src/features/main/pages/MainPage.tsx), add a "Reset progress" button that opens `ResetProgressDialog`, wiring its confirm action to `resetMenuProgress(menuSlug)` from `useTopicProgress()` (depends on T016, T018)

**Checkpoint**: User Story 3 fully functional and independently testable — scoped reset with confirmation works correctly across all three user stories.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final quality gates across the whole change.

- [x] T020 [P] Run `npm run lint` in [frontend](../../frontend) and fix any issues introduced by this feature — found and fixed one `@typescript-eslint/no-dynamic-delete` error in `TopicProgressContext.tsx` (replaced `delete next[key]` with an `Object.entries`/`filter` rebuild); now 0 errors/warnings
- [x] T021 [P] Run `npm run build` (TypeScript strict project build) in [frontend](../../frontend) and fix any type errors — builds cleanly (only pre-existing chunk-size warnings)
- [x] T022 Run the full regression suite (`npm run test -- --run` in [frontend](../../frontend)) and confirm no regressions relative to the Phase 1 baseline — 161 passed | 5 failed | 4 skipped (170); the 5 failures are the same pre-existing baseline failures (IntersectionObserver polyfill, Previous/Next timing test), 18 new tests added, all passing
- [x] T023 Manually walk through every scenario in [quickstart.md](quickstart.md) against a running dev server (`npm run dev`) — verified live via browser: toggling "Mark as complete" on `/#/azure/azure-event-hubs` flips to "Completed" with `aria-pressed`/accessible-name updates; navigating to `/#/azure` shows "1/44 completed" chip, "Reset progress" button, and the completed topic's card renders the check indicator

---

## Dependencies

- **Phase 1 (Setup)** has no dependencies; run first.
- **Phase 2 (Foundational)** depends on Phase 1 and blocks all user-story phases. Within Phase 2: T002 first; T003 depends on T002; T004 depends on T003; T005 depends on T002 and T003; T006 depends on T005; T007 depends on T002 and T006; T008 depends on T005–T007; T009 depends on T005.
- **Phase 3 (US1)** depends on Phase 2 being complete. T010 and T011 both touch `TopicInfoPage.tsx`/its test — implement T011 to satisfy T010's assertions (write T010 first, then T011, per TDD ordering within this phase).
- **Phase 4 (US2)** depends on Phase 2 being complete; independent of Phase 3's completion (different files: `MainPage.tsx`/`TopicCard.tsx`/`TopicList.tsx` vs `TopicInfoPage.tsx`), so it could run in parallel with Phase 3 if split across two people. T012 and T013 are parallelizable (different test files). Implementation: T014 first (T015 depends on it); T016 depends on T007 and T015.
- **Phase 5 (US3)** depends on Phase 4 being complete (extends `MainPage.tsx` and reuses its progress chip/summary wiring). T018 is independent (new file); T019 depends on T016 and T018.
- **Phase 6 (Polish)** depends on all of Phases 3–5 being complete. T020 and T021 are parallelizable; T022 depends on T020 and T021; T023 depends on T022.

## Parallel Execution Examples

Foundational phase, after Phase 1:

```text
T002 (types.ts) → T003 (progressStorage.ts) → T004 (progressStorage.test.ts)
                → T005 (TopicProgressContext.tsx) → T006 (useTopicProgress.ts) → T007 (useMenuProgressSummary.ts)
                                                   → T008 (TopicProgressContext.test.tsx)
T009 (AppProviders.tsx) runs after T005, in parallel with T006–T008
```

User Story 1 phase, after Phase 2:

```text
T010 (TopicInfoPage.test.tsx) → T011 (TopicInfoPage.tsx)
```

User Story 2 phase, after Phase 2 (can run in parallel with Phase 3):

```text
T012 (MainPage.test.tsx) and T013 (TopicList.test.tsx) → run together

T014 (TopicCard.tsx) → T015 (TopicList.tsx) → T016 (MainPage.tsx)
```

User Story 3 phase, after Phase 4:

```text
T017 (MainPage.test.tsx)         ┐
T018 (ResetProgressDialog.tsx)   ┘ run in parallel

T019 (MainPage.tsx) depends on both
```

## Implementation Strategy

**MVP = User Story 1 only** (Phase 1 → Phase 2 → Phase 3): delivers a
working, persisted "Mark as complete" toggle per topic, independently
demoable even before any aggregated progress view (US2) or reset control
(US3) exist. Recommended incremental order:

1. Setup + Foundational (Phases 1–2) — required for everything.
2. User Story 1 (Phase 3) — MVP: per-topic toggle that persists.
3. User Story 2 (Phase 4) — the payoff view: per-menu completed/total count
   and visually distinguished completed topics; independent of Phase 3, so
   it can also run in parallel if split across two people.
4. User Story 3 (Phase 5) — scoped, confirmed reset; layered on top of
   Phase 4's progress chip/summary wiring in `MainPage`.
5. Polish (Phase 6).
