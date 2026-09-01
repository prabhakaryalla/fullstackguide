# Tasks: Dark/Light Theme Toggle

**Input**: Design documents from `specs/007-dark-light-theme/`

**Prerequisites**: `plan.md` (required), `spec.md` (required), `research.md`, `data-model.md`, `contracts/theme-toggle-ui-contract.md`, `quickstart.md`

**Tests**: Included because the specification defines explicit acceptance scenarios and constitution Principle VIII requires behavior-focused automated test coverage.

**Organization**: This feature has a single user story (P1), so Phase 2 delivers the entire feature as the MVP.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no unmet dependencies)
- **[Story]**: User story label for story-phase tasks only (`[US1]`)
- Every task includes an exact file path

## Path Conventions

- Web app paths used in this feature:
  - `frontend/src/...`
  - `frontend/tests/...`
  - `specs/007-dark-light-theme/...`

## Phase 1: Foundational (Blocking Prerequisites)

**Purpose**: Core theme-mode state, persistence, theme objects, and the test helpers built on top of them — all required before user story work begins.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [X] T001 Create `ThemeModeContext` + `ThemeModeProvider` exposing `{ mode, toggleMode }`, detecting `prefers-color-scheme` for first-time visitors (fallback Light), and persisting explicit user selection under a versioned `localStorage` key with safe-parse fallback in `frontend/src/theme/ThemeModeContext.tsx`
- [X] T002 [P] Create `useThemeMode` hook consuming `ThemeModeContext` (throws a clear error if used outside the provider) in `frontend/src/theme/useThemeMode.ts`
- [X] T003 [P] Extend `theme/theme.ts` with a `getAppTheme(mode)` factory producing Light and Dark MUI theme objects that share existing palette/typography tokens in `frontend/src/theme/theme.ts`
- [X] T004 Wire `AppProviders.tsx` to render `ThemeModeProvider` around `ThemeProvider`/`CssBaseline`, driving the active MUI theme from `useThemeMode()` in `frontend/src/app/providers/AppProviders.tsx` (depends on T001, T003)
- [X] T005 [P] Add foundational unit tests for `ThemeModeProvider`/`useThemeMode`: system-preference detection (dark/light/unsupported), persisted-value read/write, and invalid-storage fallback in `frontend/tests/theme/ThemeModeContext.test.tsx` (depends on T001, T002)
- [X] T006 [P] Create shared `renderWithThemeMode` test helper that wraps children in `ThemeModeProvider` (with mockable `localStorage` and `window.matchMedia`) for direct component-level tests in `frontend/tests/testUtils/renderWithThemeMode.tsx` (depends on T001)
- [X] T007 [P] Update route-level render helper to wrap rendered routes in `ThemeModeProvider` in `frontend/tests/main/renderWithRouter.tsx` (depends on T001)

**Checkpoint**: Theme-mode state, persistence, theme objects, and test helpers are stable and story work can begin.

---

## Phase 2: User Story 1 - Toggle Between Dark and Light Theme (Priority: P1) 🎯 MVP

**Goal**: Users can toggle the entire website between Dark and Light themes via a single button that replaces the Settings button, with the mode persisted across reloads and defaulted from OS/browser preference on first visit.

**Independent Test**: Load the app, confirm the Settings button is gone and a single theme toggle button occupies its place, click it to confirm the whole site switches theme and the icon/label now points to the opposite mode, reload to confirm persistence, and repeat via keyboard (Tab + Enter/Space).

### Tests for User Story 1

- [X] T008 [P] [US1] Create `ThemeToggleAction` unit tests: renders exactly one button, shows the icon/aria-label for the *next* mode, and clicking toggles the mode via `ThemeModeContext` in `frontend/tests/landing/ThemeToggleAction.test.tsx`
- [X] T009 [P] [US1] Add keyboard activation (Enter/Space) and jest-axe no-violations tests for `ThemeToggleAction` in both modes in `frontend/tests/landing/ThemeToggleAction.test.tsx`
- [X] T010 [US1] Update `LandingNavigationBar.test.tsx` to wrap renders with `ThemeModeProvider` and replace Settings-button assertions with theme-toggle-button assertions in `frontend/tests/landing/LandingNavigationBar.test.tsx`
- [X] T011 [US1] Update the fallback-route assertion from a Settings button to a theme toggle button in `frontend/tests/main/NavigationPersistenceFlow.test.tsx`
- [X] T012 [US1] Add a cross-page consistency test: toggle the theme, navigate to another route, and verify the same mode remains applied with no unstyled sections in `frontend/tests/main/NavigationPersistenceFlow.test.tsx`

### Implementation for User Story 1

- [X] T013 [US1] Create `ThemeToggleAction` component using `useThemeMode()`, swapping `DarkModeIcon`/`LightModeIcon` (`@mui/icons-material`) and the accessible label based on the *next* mode, preserving the existing focus-visible outline styling in `frontend/src/features/landing/components/ThemeToggleAction.tsx`
- [X] T014 [US1] Remove the obsolete `SettingsAction` component and its test file: delete `frontend/src/features/landing/components/SettingsAction.tsx` and `frontend/tests/landing/SettingsAction.test.tsx`
- [X] T015 [US1] Replace the `SettingsAction` import/usage with `ThemeToggleAction` at the same call site in `frontend/src/features/landing/components/LandingNavigationBar.tsx`
- [X] T016 [US1] Remove the now-unused `settingsActionLabel` field from navigation model types in `frontend/src/features/landing/model/types.ts`

**Checkpoint**: User Story 1 (the entire feature) is independently functional and testable — this is the full MVP.

---

## Phase 3: Polish & Cross-Cutting Concerns

**Purpose**: Final validation evidence and quality gates.

- [X] T017 [P] Walk through and record outcomes for each scenario in `specs/007-dark-light-theme/quickstart.md`
- [X] T018 [P] Add a requirement traceability mapping for FR-001 through FR-009 in `specs/007-dark-light-theme/tasks.md`
- [X] T019 Run lint, type-check, and the full frontend test suite (`npm run lint`, `npm run build`, `npm run test -- --run`) and resolve any issues
- [X] T020 Capture SC-001 through SC-004 validation evidence (manual OS-preference + keyboard checks plus automated test results) in `specs/007-dark-light-theme/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Foundational)**: no external dependencies; creates `ThemeModeProvider`/`useThemeMode`/theme objects first, then the test helpers built on top of them; blocks story work
- **Phase 2 (US1)**: depends on Phase 1 completion
- **Phase 3 (Polish)**: depends on Phase 2 completion

### User Story Dependencies

- **US1 (P1)**: the only user story; can start immediately after Foundational phase completes

### Within User Story 1

- Write tests first (T008-T012) and confirm they fail before implementation.
- Create the new component (T013), remove the old one (T014), rewire the navigation bar (T015), then clean up model types (T016).
- Re-run tests before moving to polish.

## Parallel Opportunities

- **Foundational**: T002 and T003 can run in parallel with each other once T001's context shape is agreed; T005 can run in parallel once T001/T002 land; T006 and T007 both depend on T001 and can run in parallel with each other.
- **US1 Tests**: T008 and T009 can run in parallel (same file, independent `describe` blocks written together is acceptable since both are additive to a new file).
- **Polish**: T017 and T018 can run in parallel; T019-T020 then run sequentially as evidence is collected.

## Parallel Example: User Story 1

```bash
# Parallel test-authoring tasks
Task: T008 frontend/tests/landing/ThemeToggleAction.test.tsx
Task: T009 frontend/tests/landing/ThemeToggleAction.test.tsx

# Sequential implementation tasks (shared files)
Task: T013 frontend/src/features/landing/components/ThemeToggleAction.tsx
Task: T014 delete frontend/src/features/landing/components/SettingsAction.tsx
Task: T015 frontend/src/features/landing/components/LandingNavigationBar.tsx
```

## Implementation Strategy

### MVP First (User Story 1 only)

1. Complete Phase 1: Foundational (CRITICAL - blocks story work).
2. Complete Phase 2: User Story 1.
3. **STOP and VALIDATE**: Run the quickstart scenarios end-to-end.
4. Deploy/demo — this single story is the entire feature.

### Incremental Delivery

1. Deliver theme-mode state, persistence, and Light/Dark theme objects (Foundational).
2. Deliver the toggle control replacing Settings and wire it into the shared navigation bar (US1).
3. Finalize validation evidence and documentation (Polish).

### Parallel Team Strategy

1. Developer A: foundational context/hook/theme-factory/test-helpers (T001-T007).
2. Developer B: US1 tests (T008-T012).
3. Developer C: US1 component/removal/wiring (T013-T016).
4. Rejoin for polish and validation evidence capture (T017-T020).

## Notes

### Requirement Traceability Snapshot (T018)

- FR-001: T013, T015
- FR-002: T003
- FR-003: T008, T013
- FR-004, FR-005: T001, T008, T013
- FR-006: T004, T012
- FR-007: T001, T005, T012
- FR-008: T001, T005
- FR-009: T009, T013

- All tasks use the required checklist format: checkbox + task ID + optional `[P]` + optional `[US1]` + action + file path.
- Story labels are used only for user-story tasks.
- Keep implementation aligned with static-hosting, accessibility, security/config hygiene, and automated-test constitution constraints.
