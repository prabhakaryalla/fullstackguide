# Tasks: Topic Complexity Filtering

**Input**: Design documents from `specs/004-topic-complexity-filter/`

**Prerequisites**: `plan.md` (required), `spec.md` (required), `research.md`, `data-model.md`, `contracts/topic-complexity-filter-ui-contract.md`, `quickstart.md`

**Tests**: Include automated tests because this feature explicitly defines testable acceptance scenarios and project constitution requires test updates for user-visible behavior.

**Organization**: Tasks are grouped by user story so implementation and validation can be completed independently.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no unmet dependencies)
- **[Story]**: User story label for story-phase tasks only (`[US1]`)
- Every task includes an exact file path

## Path Conventions

- Web app paths used in this feature:
  - `frontend/src/...`
  - `frontend/tests/...`
  - `specs/004-topic-complexity-filter/...`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare feature assets and validation scaffolding.

- [X] T001 Add complexity metadata (`Easy`/`Medium`/`Hard`) to topic fixtures in `frontend/src/features/main/data/azure-topics.json`
- [X] T002 [P] Add complexity metadata (`Easy`/`Medium`/`Hard`) to topic fixtures in `frontend/src/features/main/data/dotnet-topics.json`
- [X] T003 [P] Add complexity metadata (`Easy`/`Medium`/`Hard`) to topic fixtures in `frontend/src/features/main/data/csharp-topics.json`
- [X] T004 [P] Add complexity metadata (`Easy`/`Medium`/`Hard`) to topic fixtures in `frontend/src/features/main/data/database-topics.json`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core model and filtering primitives that all story behavior depends on.

**⚠️ CRITICAL**: No user story implementation should start until this phase is complete.

- [X] T005 Extend topic type definitions with complexity domain values in `frontend/src/features/main/model/types.ts`
- [X] T006 Define shared complexity filter option constants and labels in `frontend/src/features/main/model/types.ts`
- [X] T007 Refactor filtering logic to support combined query + complexity predicates in `frontend/src/features/main/hooks/useTopicSearch.ts`
- [X] T008 Add normalization for missing complexity values to `Unknown` during topic preparation in `frontend/src/features/main/hooks/useTopicSearch.ts`

**Checkpoint**: Data and filter primitives are ready for UI integration.

---

## Phase 3: User Story 1 - Filter Topics by Complexity (Priority: P1) 🎯 MVP

**Traceability Note**: `[US1]` tasks in this file implement `User Story 4` from `spec.md`.

**Goal**: Users can view a complexity filter beside search, default to `All`, and see topics filtered by complexity and combined search criteria.

**Independent Test**: From any main page route (for example `#/azure`), confirm `All` is default, `Easy/Medium/Hard` show matching topics only, and search + complexity returns only intersection results.

### Tests for User Story 1

- [X] T009 [P] [US1] Add hook tests for default `All`, complexity-only filtering, and search+complexity AND semantics in `frontend/tests/main/useTopicSearch.test.ts`
- [X] T010 [P] [US1] Add component tests for complexity control rendering and keyboard-operable labeling in `frontend/tests/main/TopicSearch.test.tsx`
- [X] T011 [P] [US1] Add list tests ensuring only matching-complexity topics are rendered and empty-results behavior remains visible in `frontend/tests/main/TopicList.test.tsx`
- [X] T012 [US1] Add page-level flow tests for default state, complexity selection, and combined filtering on main routes in `frontend/tests/main/MainPage.test.tsx`

### Implementation for User Story 1

- [X] T013 [US1] Add complexity filter UI control beside search input in `frontend/src/features/main/components/TopicSearch.tsx`
- [X] T014 [US1] Update main page state and handlers for complexity selection with default `All` in `frontend/src/features/main/pages/MainPage.tsx`
- [X] T015 [US1] Integrate combined filtering output into topic rendering pipeline in `frontend/src/features/main/pages/MainPage.tsx`
- [X] T016 [US1] Update topic list empty-state messaging to cover no-match results from complexity and combined filters in `frontend/src/features/main/components/TopicList.tsx`
- [X] T017 [US1] Ensure unknown/missing complexity topics are excluded from specific complexity views and included under `All` in `frontend/src/features/main/hooks/useTopicSearch.ts`
- [X] T018 [US1] Preserve route behavior and existing topic navigation while applying new filter state in `frontend/src/features/main/pages/MainPage.tsx`

**Checkpoint**: User Story 1 is independently functional and testable.

---

## Phase 4: Polish & Cross-Cutting Concerns

**Purpose**: Final quality, documentation alignment, and regression safety across the feature.

- [X] T019 [P] Update quick validation notes and expected checks for completed implementation in `specs/004-topic-complexity-filter/quickstart.md`
- [X] T020 Run lint and test quality gates for complexity filtering updates via commands documented in `specs/004-topic-complexity-filter/quickstart.md`
- [X] T021 [P] Verify spec-to-implementation traceability for FR-001 through FR-010 in `specs/004-topic-complexity-filter/tasks.md`
- [X] T022 Define SC-003 validation protocol (participant profile, sample size, timing method, and pass/fail threshold) in `specs/004-topic-complexity-filter/quickstart.md`
- [X] T023 Capture and summarize SC-003 validation evidence against the 95% within-30-seconds target in `specs/004-topic-complexity-filter/quickstart.md`
- [X] T024 Define lightweight interaction timing validation protocol (sample size, timing method, and pass/fail threshold) in `specs/004-topic-complexity-filter/quickstart.md`
- [X] T025 Capture and summarize measured filter/search update timings against the defined threshold in `specs/004-topic-complexity-filter/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: no dependencies
- **Phase 2 (Foundational)**: depends on Phase 1 completion; blocks story work
- **Phase 3 (US1)**: depends on Phase 2 completion
- **Phase 4 (Polish)**: depends on Phase 3 completion

### User Story Dependencies

- **US1 (P1)**: can start immediately after Foundational phase; no dependency on other stories

### Within User Story 1

- Write tests first (T009-T012) and confirm they fail for missing feature behavior.
- Implement UI/state/filter logic (T013-T018).
- Re-run tests and quality gates before polish completion.

## Parallel Opportunities

- **Setup**: T002, T003, and T004 can run in parallel after T001 starts data-shape convention.
- **Foundational**: T005 and T006 can run in parallel; T007 and T008 follow after typing/constants are in place.
- **US1 Tests**: T009, T010, and T011 can run in parallel; T012 follows once shared expectations are established.
- **Polish**: T019, T021, T022, and T024 can run in parallel; T020, T023, and T025 run after implementation changes are complete.

## Parallel Example: User Story 1

```bash
# Parallel test authoring tasks
Task: T009 frontend/tests/main/useTopicSearch.test.ts
Task: T010 frontend/tests/main/TopicSearch.test.tsx
Task: T011 frontend/tests/main/TopicList.test.tsx

# Parallel polish tasks
Task: T019 specs/004-topic-complexity-filter/quickstart.md
Task: T021 specs/004-topic-complexity-filter/tasks.md
Task: T022 specs/004-topic-complexity-filter/quickstart.md
Task: T024 specs/004-topic-complexity-filter/quickstart.md
```

## Implementation Strategy

### MVP First (User Story 1 only)

1. Complete Phase 1 and Phase 2.
2. Complete US1 tests and implementation (Phase 3).
3. Validate acceptance scenarios and quality gates.
4. Stop and demo/deploy MVP behavior.

### Incremental Delivery

1. Finish foundational filter model and logic.
2. Deliver visible filter control and complexity-only behavior.
3. Deliver combined search + complexity behavior and empty-state refinements.
4. Finalize documentation and gate verification.

### Team Parallel Strategy

1. Developer A: data + model updates (T001-T006).
2. Developer B: filter hook logic (T007-T008, T017).
3. Developer C: tests and page/UI integration (T009-T016, T018).
4. Rejoin for polish and gate run (T019-T025).

## Notes

- All tasks use required checklist format: checkbox + task ID + optional `[P]` + optional `[US1]` + action + file path.
- Story labels are used only for user-story tasks.
- Keep implementation aligned with static-hosting and accessibility constitution constraints.

## Phase 5: Convergence

- [X] T026 Update main filter control-group responsive breakpoint so search and complexity render on one row for widths >=1024px per FR-001 (contradicts)

## Phase 6: Convergence

- [X] T027 Capture and summarize SC-003 participant completion evidence in quickstart (counts, per-participant completion times, pass/fail against 95% within 30 seconds) per SC-003 (missing)
- [X] T028 Capture and summarize filter/search interaction timing evidence in quickstart (raw samples by route, p95 by route and overall, pass/fail against <=200 ms) per plan: Performance Goals (missing)
