# Tasks: Main Page Tiles Overview

**Input**: Design documents from `specs/006-main-page-tiles-overview/`

**Prerequisites**: `plan.md` (required), `spec.md` (required), `research.md`, `data-model.md`, `contracts/main-page-tiles-ui-contract.md`, `quickstart.md`

**Tests**: Include automated tests because the specification defines explicit acceptance scenarios and constitution policy requires behavior-focused test coverage.

**Organization**: Tasks are grouped by user story so implementation and validation can be completed independently.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no unmet dependencies)
- **[Story]**: User story label for story-phase tasks only (`[US1]`)
- Every task includes an exact file path

## Path Conventions

- Web app paths used in this feature:
  - `frontend/src/...`
  - `frontend/tests/...`
  - `specs/006-main-page-tiles-overview/...`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare shared route test helpers and feature validation anchors.

- [X] T001 Add root-route validation scenarios for tile visibility, stats, and navigation in `specs/006-main-page-tiles-overview/quickstart.md`
- [X] T002 [P] Add explicit tile stats and activation outcomes for normal and zero-topic menus in `specs/006-main-page-tiles-overview/contracts/main-page-tiles-ui-contract.md`
- [X] T003 [P] Add reusable root/main-route render helper for menu tile tests in `frontend/tests/main/renderWithRouter.tsx`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared menu-tile data contracts and aggregation primitives required before story implementation.

**⚠️ CRITICAL**: No user story implementation should start until this phase is complete.

- [X] T004 Extend main feature model types with `MenuStatistics`, `MenuTileSummary`, and dominant complexity labels in `frontend/src/features/main/model/types.ts`
- [X] T005 Create shared menu topic-source resolver that maps configured menu IDs to topic arrays with safe empty fallbacks in `frontend/src/features/main/data/getMenuTopicSource.ts`
- [X] T006 Create tile-summary aggregation utility for total/easy/medium/hard/unknown counts and dominant complexity derivation in `frontend/src/features/main/data/getMenuTileSummaries.ts`
- [X] T007 [P] Add utility unit tests for stats aggregation, mixed-dominance handling, and unknown-count rules in `frontend/tests/main/MainPage.test.tsx`
- [X] T008 Integrate summary utility exports and compile-safe imports for route/page usage in `frontend/src/features/main/pages/MainPage.tsx`

**Checkpoint**: Shared menu-summary primitives are stable and story work can begin.

---

## Phase 3: User Story 1 - Browse Learning Menus From Main Page (Priority: P1) 🎯 MVP

**Goal**: Users visiting the root URL see user-friendly menu tiles with required statistics and can open the matching topic list page via pointer or keyboard.

**Independent Test**: Open `#/`, verify one tile per configured menu with required counts and dominant complexity insight, then activate tiles (including a zero-topic menu) and verify correct `/:menuSlug` navigation and empty-state handling.

### Tests for User Story 1

- [X] T009 [US1] Add route-level test that root URL renders menu tiles instead of coming-soon placeholder in `frontend/tests/main/MainPage.test.tsx`
- [X] T010 [US1] Add tile-content tests for required counts (total/easy/medium/hard/unknown) and dominant complexity labels in `frontend/tests/main/MainPage.test.tsx`
- [X] T011 [US1] Add tile activation test that pointer click navigates to matching `/:menuSlug` route for populated menu in `frontend/tests/main/MainPage.test.tsx`
- [X] T012 [US1] Add tile activation test that configured zero-topic menu still navigates and shows empty topic-list state in `frontend/tests/main/MainPage.test.tsx`
- [X] T013 [US1] Add keyboard activation parity test (Tab + Enter/Space) for menu tile navigation in `frontend/tests/main/MainPage.test.tsx`

### Implementation for User Story 1

- [X] T014 [US1] Create `MainMenuTilesPage` route component to render menu tiles and route activation handlers in `frontend/src/features/main/pages/MainMenuTilesPage.tsx`
- [X] T015 [P] [US1] Create reusable `MenuSummaryTile` component with accessible card/button semantics and visible focus treatment in `frontend/src/features/main/components/MenuSummaryTile.tsx`
- [X] T016 [P] [US1] Create `MenuSummaryTileGrid` layout component for responsive tile rendering and empty-config fallback messaging in `frontend/src/features/main/components/MenuSummaryTileGrid.tsx`
- [X] T017 [US1] Wire root route (`/`) to `MainMenuTilesPage` and preserve existing `/:menuSlug` and `/:menuSlug/:topicSlug` routes in `frontend/src/app/router/AppRouter.tsx`
- [X] T018 [US1] Update `MainPage` menu resolution logic to treat configured-but-empty menus as valid topic list pages instead of unavailable category errors in `frontend/src/features/main/pages/MainPage.tsx`
- [X] T019 [US1] Integrate shared summary utility into root page tile rendering so each tile shows required statistics and dominant complexity insight in `frontend/src/features/main/pages/MainMenuTilesPage.tsx`
- [X] T020 [US1] Ensure tile activation always routes to matching `/:menuSlug` and remains idempotent under rapid repeated activation in `frontend/src/features/main/pages/MainMenuTilesPage.tsx`

**Checkpoint**: User Story 1 is independently functional and testable.

---

## Phase 4: Polish & Cross-Cutting Concerns

**Purpose**: Final traceability, quality gates, and acceptance evidence capture.

- [X] T021 [P] Update quickstart with concrete route examples aligned to implemented menu IDs and zero-topic behavior in `specs/006-main-page-tiles-overview/quickstart.md`
- [X] T022 [P] Add requirement traceability mapping for FR-001 through FR-014 in `specs/006-main-page-tiles-overview/tasks.md`
- [X] T023 Run lint and focused main-page tests for this feature (`npm run lint` and `npm run test:run -- tests/main/MainPage.test.tsx`) and capture outcomes in `specs/006-main-page-tiles-overview/quickstart.md`
- [X] T024 Run TypeScript build/type-check (`npm run build`) and resolve all issues for changed files in `frontend/package.json` scope
- [X] T025 Capture SC-001 to SC-003 validation evidence from automated and route-level checks in `specs/006-main-page-tiles-overview/quickstart.md`
- [X] T026 Capture SC-004 and SC-005 usability/accessibility evidence summary (automation proxy + manual protocol guidance) in `specs/006-main-page-tiles-overview/quickstart.md`

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

- Write tests first (T009-T013) and confirm they fail before implementation.
- Build root-page components and route wiring (T014-T017).
- Integrate tile data flow and navigation behavior (T018-T020).
- Re-run tests and quality checks before polish completion.

## Parallel Opportunities

- **Setup**: T002 and T003 can run in parallel with T001.
- **Foundational**: T007 can run in parallel after T006 starts; T004 and T005 can be coordinated in parallel if type names are agreed first.
- **US1 Implementation**: T015 and T016 can run in parallel once T014 interface contracts are defined.
- **Polish**: T021 and T022 can run in parallel; T023-T026 then run sequentially as evidence is collected.

## Parallel Example: User Story 1

```bash
# Parallel component implementation tasks
Task: T015 frontend/src/features/main/components/MenuSummaryTile.tsx
Task: T016 frontend/src/features/main/components/MenuSummaryTileGrid.tsx

# Parallel documentation tasks
Task: T021 specs/006-main-page-tiles-overview/quickstart.md
Task: T022 specs/006-main-page-tiles-overview/tasks.md
```

## Implementation Strategy

### MVP First (User Story 1 only)

1. Complete Phase 1 and Phase 2.
2. Complete US1 tests and implementation (Phase 3).
3. Validate acceptance scenarios and quality gates.
4. Stop and demo/deploy MVP behavior.

### Incremental Delivery

1. Deliver shared menu statistics and dominant-complexity derivation primitives.
2. Deliver root route tile UI and activation/navigation behavior.
3. Deliver zero-topic and unknown-complexity edge-case handling.
4. Finalize validation evidence and documentation.

### Parallel Team Strategy

1. Developer A: foundational type and aggregation utilities (T004-T008).
2. Developer B: US1 tests (T009-T013).
3. Developer C: US1 component and routing implementation (T014-T020).
4. Rejoin for polish and validation evidence capture (T021-T026).

## Notes

### Requirement Traceability Snapshot (T022)

- FR-001, FR-002: T009, T014, T017
- FR-003: T010, T015, T016
- FR-004, FR-005, FR-006, FR-007: T006, T010, T019
- FR-008, FR-009: T011, T017, T020
- FR-010: T013, T015
- FR-011: T006, T010, T019
- FR-012: T012, T018, T020
- FR-013, FR-014: T006, T007, T010

- All tasks use required checklist format: checkbox + task ID + optional `[P]` + optional `[US1]` + action + file path.
- Story labels are used only for user-story tasks.
- Keep implementation aligned with static-hosting, accessibility, and automated test constitution constraints.
