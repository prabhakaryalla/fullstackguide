# Tasks: Global Top Navigation Visibility

**Input**: Design documents from `specs/003-global-top-navigation/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are included because the specification and constitution require validation of user-visible behavior and acceptance scenarios.

**Organization**: Tasks are grouped by user story so each story can be implemented and tested independently.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Parallelizable task (different files, no dependency on incomplete tasks)
- **[Story]**: User story label for story-phase tasks (`[US1]`)
- Each task includes an exact file path

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare routing/test scaffolding and baseline quality execution.

- [ ] T001 Verify frontend scripts and test commands in `frontend/package.json`
- [ ] T002 [P] Create shared router test utility in `frontend/tests/main/renderWithRouter.tsx`
- [ ] T003 [P] Configure visibility and viewport helpers in `frontend/src/setupTests.ts`

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish shared app shell and route-to-navigation selection behavior required by all story tasks.

- [ ] T004 Implement shared app shell host for top navigation and routed content in `frontend/src/app/layout/AppShell.tsx`
- [ ] T005 [P] Implement route-to-selected-menu resolver in `frontend/src/app/layout/resolveSelectedMenuId.ts`
- [ ] T006 [P] Extract sorted menu item provider from landing config in `frontend/src/features/landing/data/getSortedMenuItems.ts`
- [ ] T007 Wire app routing through shared shell for all in-scope routes in `frontend/src/app/router/AppRouter.tsx`

**Checkpoint**: Shared shell routing is in place for Landing, Main, Topic Info, and fallback pages.

## Phase 3: User Story 1 - Fixed Top Navigation Across Pages (Priority: P1)

**Goal**: Keep top navigation visible and fixed while users navigate and scroll from top to bottom on all in-scope pages.

**Independent Test**: From routes `#/`, `#/:menuSlug`, `#/:menuSlug/:topicSlug`, and fallback, verify top navigation remains visible, keyboard-reachable, and fixed in viewport at all scroll positions including bottom-of-page.

### Tests for User Story 1

- [ ] T008 [P] [US1] Add shell route visibility tests for all in-scope routes in `frontend/tests/main/AppShellNavigationVisibility.test.tsx`
- [ ] T009 [P] [US1] Add route transition continuity tests in `frontend/tests/main/NavigationPersistenceFlow.test.tsx`
- [ ] T010 [P] [US1] Add unknown-route and missing-content visibility tests in `frontend/tests/main/NavigationPersistenceFlow.test.tsx`
- [ ] T011 [P] [US1] Add keyboard reachability assertions for persistent navigation in `frontend/tests/landing/LandingNavigationBar.test.tsx`
- [ ] T012 [P] [US1] Add focus-visible state assertions for top-navigation interactive controls in `frontend/tests/landing/LandingNavigationBar.test.tsx`
- [ ] T013 [P] [US1] Add semantic landmark and contrast compliance assertions for top navigation in `frontend/tests/landing/LandingNavigationBar.test.tsx`
- [ ] T014 [P] [US1] Add fixed-on-scroll viewport assertions for desktop and mobile in `frontend/tests/main/AppShellNavigationVisibility.test.tsx`
- [ ] T015 [P] [US1] Add visibility timing assertions for first paint threshold in `frontend/tests/main/AppShellNavigationVisibility.test.tsx`

### Implementation for User Story 1

- [ ] T016 [P] [US1] Update landing page composition to rely on shell-owned top navigation in `frontend/src/features/landing/pages/LandingPage.tsx`
- [ ] T017 [P] [US1] Adjust main page layout spacing to avoid overlap with fixed top navigation in `frontend/src/features/main/pages/MainPage.tsx`
- [ ] T018 [P] [US1] Ensure topic info page states remain shell-compatible with fixed navigation in `frontend/src/features/main/pages/TopicInfoPage.tsx`
- [ ] T019 [US1] Implement shell menu selection synchronization from route params in `frontend/src/app/layout/AppShell.tsx`
- [ ] T020 [US1] Ensure fallback route rendering remains inside shell and preserves fixed navigation in `frontend/src/app/router/AppRouter.tsx`
- [ ] T021 [P] [US1] Align top navigation props and ownership for shell integration in `frontend/src/features/landing/components/LandingNavigationBar.tsx`
- [ ] T022 [US1] Add layout offset safeguards so page content remains usable under fixed navigation in `frontend/src/App.css`

**Checkpoint**: User Story 1 is independently complete and testable.

## Phase 4: Polish & Cross-Cutting Concerns

**Purpose**: Final validation, documentation synchronization, and quality gate execution.

- [ ] T023 [P] Update quickstart validation steps for fixed-on-scroll and accessibility evidence in `specs/003-global-top-navigation/quickstart.md`
- [ ] T024 Define and document usability validation sampling method and pass/fail evidence template for SC-004 in `specs/003-global-top-navigation/quickstart.md`
- [ ] T025 Define and document critical usability defect severity rubric and release-readiness review criteria for SC-005 in `specs/003-global-top-navigation/quickstart.md`
- [ ] T026 Run lint, type, and formatting checks and capture follow-up notes in `specs/003-global-top-navigation/quickstart.md`

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies
- **Phase 2 (Foundational)**: Depends on completion of Phase 1
- **Phase 3 (US1)**: Depends on completion of Phase 2
- **Phase 4 (Polish)**: Depends on completion of Phase 3

### Story Dependencies

- **US1 (P1)**: Starts after foundational shell/routing tasks are complete
- No additional user stories exist in this feature

### Dependency Graph

- T001 -> T004
- T002, T003 -> T008
- T004 -> T007, T016, T019
- T005, T006 -> T019
- T007 -> T017, T018, T020
- T008, T009, T010, T011, T012, T013, T014, T015 -> T023
- T016, T017, T018, T019, T020, T021, T022 -> T023
- T023, T024, T025 -> T026

## Parallel Execution Opportunities

### Phase 1

- Run `T002` and `T003` in parallel after `T001`

### Phase 2

- Run `T005` and `T006` in parallel after `T004`

### User Story 1

- Run `T008`, `T009`, `T010`, `T011`, `T012`, `T013`, `T014`, and `T015` in parallel
- Run `T016`, `T017`, and `T018` in parallel after `T007`
- Run `T021` in parallel with `T019` and `T020`

### Polish

- Run `T023`, `T024`, and `T025` in parallel before `T026`

## Implementation Strategy

### MVP First (Recommended)

1. Complete Phase 1 and Phase 2
2. Complete Phase 3 (US1) to satisfy fixed top-navigation visibility requirements
3. Validate US1 independently using route, refresh, fallback, scroll, and accessibility tests

### Incremental Delivery

1. Foundation: shared shell + routing integration
2. Behavior: fixed visibility and selection synchronization
3. Validation: route continuity, scroll persistence, fallback, accessibility, and timing
4. Polish: SC-004/SC-005 evidence definition plus quality checks

## Format Validation Checklist

- All tasks use `- [ ]` checkbox format
- All tasks include sequential IDs (`T001` to `T026`)
- `[P]` used only for parallelizable tasks
- `[US1]` applied only to user-story phase tasks
- Every task references an exact file path
