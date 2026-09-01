---
description: "Task list for Landing Page Top Navigation implementation"
---

# Tasks: Landing Page Top Navigation

**Input**: Design documents from `/specs/001-landing-page-navigation/`

**Stack**: TypeScript 5.x · React 18.x · MUI · HashRouter · Vitest + React Testing Library

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no shared dependencies)
- **[Story]**: Which user story this task belongs to ([US1], [US2], [US3])
- Exact file paths are included in every description

## Path Conventions

```
frontend/
├── src/
│   ├── app/
│   │   ├── router/        → HashRouter + route definitions
│   │   └── providers/     → ThemeProvider, app wrappers
│   ├── features/
│   │   └── landing/
│   │       ├── components/ → UI components
│   │       ├── pages/      → Route-level page components
│   │       ├── data/       → Static menu config JSON
│   │       └── model/      → TypeScript types
│   ├── theme/             → MUI theme configuration
│   └── main.tsx           → App entry point
└── tests/
    └── landing/           → Vitest + RTL test files
```

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Scaffold the frontend project and configure quality tooling

- [X] T001 Scaffold React + TypeScript Vite project under `frontend/` with MUI, React Router, and dev tooling dependencies
- [X] T002 Configure HashRouter entry point in `frontend/src/main.tsx` and create `frontend/src/app/router/AppRouter.tsx` with initial route skeleton
- [X] T003 [P] Configure TypeScript strict mode in `frontend/tsconfig.json` with zero-error enforcement
- [X] T004 [P] Configure ESLint and Prettier for the `frontend/` workspace
- [X] T005 [P] Configure Vitest and React Testing Library in `frontend/vite.config.ts` and `frontend/src/setupTests.ts`

**Checkpoint**: Frontend project builds and dev server starts; linting and test runner execute without errors

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core shared infrastructure required before any user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T006 Create MUI theme with centralized color, typography, and spacing tokens at `frontend/src/theme/theme.ts`
- [X] T007 [P] Create AppProviders wrapper composing MUI ThemeProvider and HashRouter in `frontend/src/app/providers/AppProviders.tsx`
- [X] T008 [P] Create static menu configuration file with default .NET, Azure, and C# items at `frontend/src/features/landing/data/menuConfig.json`

**Checkpoint**: Foundation ready — user story implementation can now begin in parallel

---

## Phase 3: User Story 1 — View Top Navigation on Landing (Priority: P1) 🎯 MVP

**Goal**: Render a landing page with a top navigation bar showing title "Fullstack Guide", dynamically sourced topic menu items, and a settings action at the far end.

**Independent Test**: Open the application in a browser and verify the top navigation bar is visible with the correct title, all configured menu items rendered in order, and the settings action present at the far end.

### Implementation for User Story 1

- [X] T009 [P] [US1] Define `NavigationMenuItem`, `LandingNavigationBar`, and `MenuConfig` TypeScript types in `frontend/src/features/landing/model/types.ts`
- [X] T010 [P] [US1] Create `TopMenuItems` component that renders MUI buttons/tabs from `MenuConfig` items in order at `frontend/src/features/landing/components/TopMenuItems.tsx`
- [X] T011 [P] [US1] Create `SettingsAction` component rendering a MUI icon button with accessible aria-label at `frontend/src/features/landing/components/SettingsAction.tsx`
- [X] T012 [US1] Create `LandingNavigationBar` using MUI AppBar composing title text, `TopMenuItems`, and `SettingsAction` in `frontend/src/features/landing/components/LandingNavigationBar.tsx` (depends on T010, T011)
- [X] T013 [US1] Create `LandingPage` composing `LandingNavigationBar` above a main content area in `frontend/src/features/landing/pages/LandingPage.tsx` (depends on T012)
- [X] T014 [US1] Register `LandingPage` as the default route in `frontend/src/app/router/AppRouter.tsx` (depends on T013)

**Checkpoint**: User Story 1 is fully functional — the landing page renders the top navigation with title, menus, and settings on first load

---

## Phase 4: User Story 2 — Navigate from Top Menu to Placeholder Content (Priority: P2)

**Goal**: Clicking any top navigation menu item immediately updates a Coming Soon view to reflect the selected menu context, with an empty-state fallback.

**Independent Test**: Click each visible top-level menu item and confirm the Coming Soon panel updates to the selected menu label in a single interaction step. Switch between menus and click the same menu repeatedly with no errors or visual breakage.

### Implementation for User Story 2

- [X] T015 [P] [US2] Add `ComingSoonViewState` type to `frontend/src/features/landing/model/types.ts` and create `ComingSoonView` component showing contextual heading and description for the selected menu in `frontend/src/features/landing/components/ComingSoonView.tsx`
- [X] T016 [US2] Add `selectedMenuId` / `selectedMenuLabel` useState hooks and default-first-item selection logic to `frontend/src/features/landing/pages/LandingPage.tsx` (depends on T015)
- [X] T017 [US2] Wire `TopMenuItems` `onClick` handler to update selection state and render `ComingSoonView` with selected menu context in `frontend/src/features/landing/pages/LandingPage.tsx` (depends on T016)
- [X] T018 [US2] Add empty-state (no menu items configured) conditional rendering to `frontend/src/features/landing/components/ComingSoonView.tsx` (depends on T015)

**Checkpoint**: User Story 2 is fully functional — menu clicks update the Coming Soon view immediately; empty state displays correctly

---

## Phase 5: User Story 3 — Access Settings from Top Navigation (Priority: P3)

**Goal**: The settings action is always visible at the far end of the top navigation and is visually and semantically distinct from topic menu items in all states.

**Independent Test**: View the top navigation in default and empty-menu states and confirm the settings action is present and visually distinct from topic menus. Navigate using keyboard only and verify focus is reachable on the settings action.

### Implementation for User Story 3

- [X] T019 [US3] Apply MUI `Box` end-alignment (`marginLeft: 'auto'`) and distinct visual styling to `SettingsAction` in `frontend/src/features/landing/components/SettingsAction.tsx` to separate it from topic menu items
- [X] T020 [US3] Confirm `LandingNavigationBar` renders `SettingsAction` unconditionally regardless of empty-menu config state in `frontend/src/features/landing/components/LandingNavigationBar.tsx`

**Checkpoint**: User Story 3 is fully functional — settings action is persistently visible, end-aligned, and visually distinct across all states

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Accessibility, automated tests, and final validation across all user stories

- [X] T021 [P] Add keyboard operability (`onKeyDown` Enter/Space handlers) and visible focus indicator styles (`outline` via MUI `sx`) to `TopMenuItems` at `frontend/src/features/landing/components/TopMenuItems.tsx`
- [X] T022 [P] Add keyboard operability and visible focus styles to `SettingsAction` at `frontend/src/features/landing/components/SettingsAction.tsx`
- [X] T023 [P] Add semantic HTML landmark elements (`<header>`, `<nav>`, `<main>`) to `LandingNavigationBar` and `LandingPage` in `frontend/src/features/landing/components/LandingNavigationBar.tsx` and `frontend/src/features/landing/pages/LandingPage.tsx`
- [X] T024 [P] Write Vitest + RTL tests for `LandingNavigationBar` rendering title text, menu items in order, and settings action in `frontend/tests/landing/LandingNavigationBar.test.tsx`
- [X] T025 [P] Write Vitest + RTL tests for `TopMenuItems` dynamic rendering from config, default selection, and click interaction in `frontend/tests/landing/TopMenuItems.test.tsx`
- [X] T026 [P] Write Vitest + RTL tests for `ComingSoonView` selection transitions and empty-state rendering in `frontend/tests/landing/ComingSoonView.test.tsx`
- [X] T027 [P] Write Vitest + RTL tests for `SettingsAction` visibility and semantic aria-label in `frontend/tests/landing/SettingsAction.test.tsx`
- [X] T028 [P] Add jest-axe to each RTL test suite and assert `toHaveNoViolations()` to enforce WCAG 2.1 AA contrast and role compliance in `frontend/tests/landing/*.test.tsx`
- [X] T029 Run `tsc --noEmit` and `eslint --max-warnings 0` quality gates, then run quickstart.md validation scenarios (functional, edge-case, and accessibility checks) against the complete implementation

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 completion — **blocks all user stories**
- **US1 (Phase 3)**: Depends on Phase 2 — no dependency on US2 or US3
- **US2 (Phase 4)**: Depends on Phase 2 and US1 (T013/T014) for the page composition
- **US3 (Phase 5)**: Depends on Phase 2 and US1 (T011/T012) for SettingsAction refinement
- **Polish (Phase 6)**: Depends on all user story phases being complete

### User Story Dependencies

| Story | Depends on | Can start after |
|-------|-----------|-----------------|
| US1 (P1) | Phase 2 complete | T008 |
| US2 (P2) | Phase 2 + US1 page assembled | T014 |
| US3 (P3) | Phase 2 + US1 SettingsAction created | T011 |

### Within Each User Story

- Types/models before components (T009 before T010–T012)
- Leaf components before composites (T010, T011 before T012)
- Page assembly before routing (T013 before T014)
- State hooks before wiring handlers (T016 before T017)

### Parallel Opportunities

- **Phase 1**: T003, T004, T005 can all run in parallel after T001
- **Phase 2**: T007, T008 can run in parallel after T006
- **Phase 3**: T009, T010, T011 can run in parallel; T012 requires T010 + T011
- **Phase 4**: T015 can run in parallel with US3; T016 → T017 sequential; T018 runs in parallel from T015
- **Phase 6**: T021–T028 are all independent and can run fully in parallel

---

## Parallel Execution Example: User Story 1

```
T009 (types) ──────────────────────┐
T010 (TopMenuItems) ───────────────┼──► T012 (LandingNavigationBar) ──► T013 (LandingPage) ──► T014 (Route)
T011 (SettingsAction) ─────────────┘
```

## Parallel Execution Example: User Story 2

```
T015 (ComingSoonView) ──► T016 (state hooks) ──► T017 (click wiring)
                      └──► T018 (edge states)
```

## Parallel Execution Example: Polish Phase

```
T021 ─┐
T022 ─┤
T023 ─┤
T024 ─┼──► T029 (quickstart + quality gates, after all above complete)
T025 ─┤
T026 ─┤
T027 ─┤
T028 ─┘
```

---

## Implementation Strategy

**MVP Scope (Phase 1 + Phase 2 + Phase 3 only)**: Scaffold, configure, and deliver User Story 1. This produces a fully functional landing page with top navigation, dynamic menu items, and settings action — deployable as a static site on GitHub Pages.

**Incremental delivery**:
1. Complete Phase 3 (US1) for a reviewable static page
2. Add Phase 4 (US2) for interactive menu-to-content navigation
3. Add Phase 5 (US3) for styled, persistent settings action
4. Complete Phase 6 for accessibility, tests, and final validation

**Constitution gates** (must not be broken at any phase):
- HashRouter compatibility (Principle I)
- React purity and one-way data flow (Principles II, III)
- MUI consistency via theme tokens (Principle V)
- WCAG 2.1 AA keyboard and focus compliance (Principle VI)
- TypeScript strict + ESLint + Prettier passing (Principle VII)
- Automated test coverage for user-visible behavior (Principle VIII)

---

## Phase 7: Convergence

**Run**: 2026-08-26 | **Result**: 2 LOW findings — no CRITICAL/HIGH/MEDIUM gaps

- [ ] T030 Add `minWidth: 0`, `overflow: 'hidden'`, `textOverflow: 'ellipsis'`, and `whiteSpace: 'nowrap'` to `Button` `sx` in `frontend/src/features/landing/components/TopMenuItems.tsx` to prevent very long menu labels from pushing `SettingsAction` off-screen per spec.md Edge Cases (partial)
- [ ] T031 Remove unreferenced Vite scaffold files `frontend/src/App.tsx`, `frontend/src/App.css`, `frontend/src/index.css`, and `frontend/src/assets/` (hero.png, react.svg, vite.svg) which are not imported after `main.tsx` was rewritten — review and delete per plan: feature-first organisation / Constitution IV (unrequested)
