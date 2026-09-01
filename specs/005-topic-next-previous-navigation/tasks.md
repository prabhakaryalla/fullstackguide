# Tasks: Topic Next/Previous Navigation

**Input**: Design documents from `specs/005-topic-next-previous-navigation/`

**Prerequisites**: `plan.md` (required), `spec.md` (required), `research.md`, `data-model.md`, `contracts/topic-next-previous-ui-contract.md`, `quickstart.md`

**Tests**: Include automated tests because the feature defines explicit acceptance scenarios and project constitution requires test updates for user-visible behavior.

**Organization**: Tasks are grouped by user story so implementation and validation can be completed independently.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no unmet dependencies)
- **[Story]**: User story label for story-phase tasks only (`[US1]`)
- Every task includes an exact file path

## Path Conventions

- Web app paths used in this feature:
  - `frontend/src/...`
  - `frontend/tests/...`
  - `specs/005-topic-next-previous-navigation/...`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare shared route/test scaffolding and feature documentation anchors.

- [X] T001 Add navigation validation checkpoints for first, middle, last, and only-topic flows in `specs/005-topic-next-previous-navigation/quickstart.md`
- [X] T002 [P] Add explicit UI state expectations for enabled/disabled controls in `specs/005-topic-next-previous-navigation/contracts/topic-next-previous-ui-contract.md`
- [X] T003 [P] Add a reusable topic-detail route test harness function for next/previous navigation scenarios in `frontend/tests/main/renderWithRouter.tsx`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core navigation primitives required before user story implementation.

**⚠️ CRITICAL**: No user story implementation should start until this phase is complete.

- [X] T004 Add strongly typed navigation-state model for previous/next availability in `frontend/src/features/main/model/types.ts`
- [X] T005 Create topic-adjacency resolver utility for menu-scoped previous/next lookup in `frontend/src/features/main/data/resolveAdjacentTopicSlugs.ts`
- [X] T006 [P] Add resolver-only unit tests for adjacent slug computation at first, last, only, and missing-topic cases in `frontend/tests/main/TopicInfoPage.test.tsx`
- [X] T007 Integrate resolver imports and compile-safe usage points for topic-detail flow in `frontend/src/features/main/pages/TopicInfoPage.tsx`

**Checkpoint**: Navigation primitives are stable and story work can begin.

---

## Phase 3: User Story 1 - Navigate Between Topics (Priority: P1) 🎯 MVP

**Traceability Note**: `[US1]` tasks in this file implement `User Story 5` from `spec.md`.

**Goal**: Users can navigate to immediate previous/next topics within the same menu category, with clear boundary behavior and accessible controls.

**Independent Test**: Open a valid route `#/:menuSlug/:topicSlug`, verify Previous/Next controls render, verify Next and Previous move exactly one topic in the same menu, and verify first/last (and only-topic) boundaries disable the corresponding control.

### Tests for User Story 1

- [X] T008 [US1] Add page tests for rendering Previous/Next controls on valid topic routes in `frontend/tests/main/TopicInfoPage.test.tsx`
- [X] T009 [US1] Add page tests for Next action routing to immediate adjacent topic within the same menu in `frontend/tests/main/TopicInfoPage.test.tsx`
- [X] T010 [US1] Add page tests for Previous action routing to immediate adjacent topic within the same menu in `frontend/tests/main/TopicInfoPage.test.tsx`
- [X] T011 [US1] Add UI behavior tests that verify Previous/Next button disabled state at first, last, and only-topic positions in `frontend/tests/main/TopicInfoPage.test.tsx`
- [X] T012 [US1] Add keyboard interaction tests for actionable/non-actionable navigation controls in `frontend/tests/main/TopicInfoPage.test.tsx`

### Implementation for User Story 1

- [X] T013 [US1] Add Previous and Next buttons with clear labels to the Topic Info layout in `frontend/src/features/main/pages/TopicInfoPage.tsx`
- [X] T014 [US1] Compute current topic index and adjacent slugs using shared resolver in `frontend/src/features/main/pages/TopicInfoPage.tsx`
- [X] T015 [US1] Wire Next button click behavior to route to adjacent topic in same `menuSlug` in `frontend/src/features/main/pages/TopicInfoPage.tsx`
- [X] T016 [US1] Wire Previous button click behavior to route to adjacent topic in same `menuSlug` in `frontend/src/features/main/pages/TopicInfoPage.tsx`
- [X] T017 [US1] Apply boundary state handling so unavailable adjacent topics produce disabled controls without navigation in `frontend/src/features/main/pages/TopicInfoPage.tsx`
- [X] T018 [US1] Ensure unavailable-content state keeps navigation controls non-actionable and preserves route safety in `frontend/src/features/main/pages/TopicInfoPage.tsx`
- [X] T019 [US1] Apply user-friendly visual differentiation for enabled versus disabled navigation controls in `frontend/src/features/main/pages/TopicInfoPage.tsx`

**Checkpoint**: User Story 1 is independently functional and testable.

---

## Phase 4: Polish & Cross-Cutting Concerns

**Purpose**: Final quality checks, traceability, and acceptance validation evidence.

- [X] T020 [P] Update feature quickstart with concrete test route examples that match implemented topic slugs in `specs/005-topic-next-previous-navigation/quickstart.md`
- [X] T021 [P] Verify requirement traceability for FR-001 through FR-009 against implemented tasks in `specs/005-topic-next-previous-navigation/tasks.md`
- [X] T022 Run lint and automated tests for topic navigation changes using commands from `specs/005-topic-next-previous-navigation/quickstart.md`
- [X] T023 Run TypeScript type-check and resolve all errors for navigation changes using frontend type-check command in `frontend/package.json`
- [X] T024 Capture and summarize SC-001 to SC-003 validation evidence in `specs/005-topic-next-previous-navigation/quickstart.md`
- [X] T025 Capture and summarize SC-004 and SC-005 usability/accessibility validation evidence in `specs/005-topic-next-previous-navigation/quickstart.md`

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

- Write tests first (T008-T012) and confirm they fail before implementation.
- Implement layout and navigation logic (T013-T019).
- Re-run tests and quality checks before polish completion.

## Parallel Opportunities

- **Setup**: T002 and T003 can run in parallel with T001.
- **Foundational**: T006 can run in parallel after T005 starts; T004 and T005 can be coordinated in parallel if type naming is agreed first.
- **US1 Tests**: T008-T012 are sequenced in one test file to reduce merge conflicts and keep assertions cohesive.
- **Polish**: T020 and T021 can run in parallel; T022-T025 then run sequentially as validation evidence is collected.

## Parallel Example: User Story 1

```bash
# Parallel setup/foundational tasks
Task: T002 specs/005-topic-next-previous-navigation/contracts/topic-next-previous-ui-contract.md
Task: T003 frontend/tests/main/renderWithRouter.tsx

# Parallel polish tasks
Task: T020 specs/005-topic-next-previous-navigation/quickstart.md
Task: T021 specs/005-topic-next-previous-navigation/tasks.md
```

## Implementation Strategy

### MVP First (User Story 1 only)

1. Complete Phase 1 and Phase 2.
2. Complete US1 tests and implementation (Phase 3).
3. Validate acceptance scenarios and quality gates.
4. Stop and demo/deploy MVP behavior.

### Incremental Delivery

1. Deliver foundational adjacency resolution and state typing.
2. Deliver visible Previous/Next controls and forward/back navigation.
3. Deliver boundary safeguards, unavailable-state behavior, and accessibility refinements.
4. Finalize documentation and acceptance evidence.

### Parallel Team Strategy

1. Developer A: foundational type/utility tasks (T004-T007).
2. Developer B: story tests (T008-T012).
3. Developer C: story implementation (T013-T019) after foundational tasks complete.
4. Rejoin for polish and validation evidence (T020-T025).

## Notes

### Requirement Traceability Snapshot (T021)

- FR-001, FR-007: T013, T019
- FR-002: T015, T009
- FR-003: T016, T010
- FR-004: T014, T015, T016
- FR-005, FR-006: T017, T011
- FR-008: T012
- FR-009: T014, T018

- All tasks use required checklist format: checkbox + task ID + optional `[P]` + optional `[US1]` + action + file path.
- Story labels are used only for user-story tasks.
- Keep implementation aligned with static-hosting, accessibility, and test-coverage constitution constraints.

---

## Phase 5: Convergence

- [X] T026 Eliminate React act warning emitted by keyboard-navigation test in `frontend/tests/main/TopicInfoPage.test.tsx` to satisfy stable automated test behavior per Constitution VIII (partial)