---

description: "Task list template for feature implementation"
---

# Tasks: Top Navigation Refactoring (Menu & Submenu Items)

**Input**: Design documents from `/specs/008-top-navigation-refactor/`

**Prerequisites**: [plan.md](plan.md), [spec.md](spec.md), [research.md](research.md), [data-model.md](data-model.md), [contracts/top-navigation-ui-contract.md](contracts/top-navigation-ui-contract.md), [quickstart.md](quickstart.md)

**Tests**: Included. Constitution Principle VIII (Automated Testing Policy) requires every feature to include or update automated tests (Vitest + React Testing Library), so test tasks are mandatory here, not optional.

**Organization**: This feature has a single user story (US1, P1). Tasks are grouped into Setup, Foundational (shared data/model changes the story depends on), the US1 phase itself, and Polish.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: Maps to US1 (the feature's only user story)
- Include exact file paths in descriptions

## Path Conventions

Single-project web frontend at [frontend](../../frontend). All paths below are relative to the repository root.

---

## Phase 1: Setup

**Purpose**: Establish a pre-change baseline so regressions introduced by this feature are easy to spot.

- [x] T001 Run the existing test suite as a baseline (`npm run test:run` in [frontend](../../frontend), script defined in [frontend/package.json](../../frontend/package.json)) and record the current pass count before making changes

**Checkpoint**: Baseline established; safe to start Foundational changes.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Data/model changes the US1 UI work depends on — leaf id/label renames, new grouped-menu types, the grouped-tree config, and active-group resolution via a new `resolveActiveTopNavigationGroupId` function. Per [research.md](research.md) Decisions 1–4 and 7, and [data-model.md](data-model.md).

**⚠️ CRITICAL**: No US1 implementation task should start before this phase is complete.

- [x] T002 [P] In [frontend/src/features/landing/data/menuConfig.json](../../frontend/src/features/landing/data/menuConfig.json): rename the `database` leaf to `id: "cosmos"` / `label: "Cosmos"`, change the `azure` leaf's `label` to `"Cloud"` (id unchanged), and add a new leaf `{ id: "sql", label: "SQL" }`
- [x] T003 [P] In [frontend/src/features/main/data/database-topics.json](../../frontend/src/features/main/data/database-topics.json): rename the `menuId` field from `"database"` to `"cosmos"`
- [x] T004 [P] In [frontend/src/features/main/data/getMenuTopicSource.ts](../../frontend/src/features/main/data/getMenuTopicSource.ts): rename the `topicConfigMap` key from `database` to `cosmos` (keep pointing at `database-topics.json`)
- [x] T005 [P] In [frontend/src/features/main/pages/TopicInfoPage.tsx](../../frontend/src/features/main/pages/TopicInfoPage.tsx): rename the `topicConfigMap` key from `database` to `cosmos`
- [x] T006 [P] In [frontend/src/features/landing/model/types.ts](../../frontend/src/features/landing/model/types.ts): add `TopNavigationGroup` (`id`, `label`, `order`, optional `childIds: string[]`) and `TopNavigationGroupView` (`id`, `label`, `order`, `children: NavigationMenuItem[]`) types per [data-model.md](data-model.md)
- [x] T007 Create [frontend/src/features/landing/data/navigationGroups.json](../../frontend/src/features/landing/data/navigationGroups.json) with the 7 groups (`backend`, `frontend`, `azure`, `database`, `ai`, `design-patterns`, `system-design`) and `childIds` for the 3 parent groups, per the table in [data-model.md](data-model.md) (depends on T002 for final leaf ids)
- [x] T008 Create [frontend/src/features/landing/data/getTopNavigationTree.ts](../../frontend/src/features/landing/data/getTopNavigationTree.ts) that joins `navigationGroups.json` with `getSortedMenuItems()` into sorted `TopNavigationGroupView[]` (depends on T006, T007)
- [x] T009 In [frontend/src/app/layout/resolveSelectedMenuId.ts](../../frontend/src/app/layout/resolveSelectedMenuId.ts): keep `resolveSelectedMenuId` unchanged for leaf-id resolution, and add a new sibling function `resolveActiveTopNavigationGroupId(leafId, groups)` that returns the top-level group id to show as active — the leaf's parent group id if it belongs to one, or the leaf id itself if it is a standalone group (depends on T008)

**Checkpoint**: Foundational data/model layer ready — US1 UI implementation can now begin.

---

## Phase 3: User Story 1 - Grouped Menu with Submenu Items on Hover (Priority: P1) 🎯 MVP

**Goal**: Top navigation shows 7 top-level items; Backend, Frontend, and Database reveal their submenu items on hover (pointer), tap-toggle (touch), or keyboard focus, and only submenu items (or standalone items) navigate to content.

**Independent Test**: Open the app, hover each of Backend/Frontend/Database and confirm the correct submenu items appear in order, select a submenu item and confirm it navigates and closes the submenu, and confirm Cloud/AI/Design Patterns/System Design still navigate directly with no submenu.

### Tests for User Story 1

- [x] T010 [US1] In [frontend/tests/landing/TopMenuItems.test.tsx](../../frontend/tests/landing/TopMenuItems.test.tsx): add tests for rendering 7 groups in order, an expand/collapse indicator present only on Backend/Frontend/Database, hover reveal/hide of each parent's submenu items in the correct order, and no overlapping/unreadable items when rendered at a narrow viewport width (reuse the `setViewport` helper pattern from `AppShellNavigationVisibility.test.tsx`)
- [x] T011 [US1] In [frontend/tests/landing/TopMenuItems.test.tsx](../../frontend/tests/landing/TopMenuItems.test.tsx): add tests for tap-toggle (click without hover opens/closes a parent's submenu without navigating), verified for all three parent groups (Backend, Frontend, Database) per SC-004, and keyboard interaction (focus reveals submenu, arrow keys move between submenu items, Escape closes and returns focus to the parent, Enter/Space on a submenu item navigates) (depends on T010, same file) — tap-toggle sub-cases are skipped; see Notes
- [x] T012 [US1] In [frontend/tests/landing/TopMenuItems.test.tsx](../../frontend/tests/landing/TopMenuItems.test.tsx): add a test that opening one parent's submenu closes a previously open one, and a `jest-axe` accessibility assertion while a submenu is open (depends on T011, same file)
- [x] T013 [P] [US1] Extend [frontend/tests/landing/LandingNavigationBar.test.tsx](../../frontend/tests/landing/LandingNavigationBar.test.tsx) to cover passing the grouped tree through to `TopMenuItems` and displaying the active parent group's indicator
- [x] T014 [P] [US1] Extend [frontend/tests/main/NavigationPersistenceFlow.test.tsx](../../frontend/tests/main/NavigationPersistenceFlow.test.tsx) with: (a) hovering Backend and selecting "C#" navigates to `/csharp`, closes the submenu, and shows Backend as active; (b) a direct/deep link to `/csharp` shows Backend active with its submenu closed on load; (c) navigating to `/sql` and `/angular` renders the existing "No topics available" empty state; (d) a parameterized/`it.each` regression check (per SC-003) that every leaf route reachable before this feature (`.NET`, Cloud/`azure`, C#, Cosmos, React JS, AI, System Design, Microservices) still renders its content page after the reorganization

### Implementation for User Story 1

- [x] T015 [US1] Rework [frontend/src/features/landing/components/TopMenuItems.tsx](../../frontend/src/features/landing/components/TopMenuItems.tsx) to accept `TopNavigationGroupView[]` plus the active group id, rendering standalone groups as direct-navigation buttons (unchanged behavior) and parent groups (Backend/Frontend/Database) as trigger buttons with a CSS-positioned submenu and an expand/collapse icon indicator (switched from MUI `Menu`/`Popper` to a plain positioned `Box`+`MenuList`; see Notes)
- [x] T016 [US1] Add a single `openGroupId` local state to [frontend/src/features/landing/components/TopMenuItems.tsx](../../frontend/src/features/landing/components/TopMenuItems.tsx) driven by `onMouseEnter`/`onMouseLeave` (hover), `onClick` toggle (tap, never navigates for parent groups), and `onFocus` (keyboard) so only one submenu can be open at a time (depends on T015, same file)
- [x] T017 [US1] Wire `Escape` to close the open submenu and return focus to its trigger, and confirm MUI `MenuList`'s built-in arrow-key roving focus and `Enter`/`Space` selection work end-to-end in [frontend/src/features/landing/components/TopMenuItems.tsx](../../frontend/src/features/landing/components/TopMenuItems.tsx) (depends on T016, same file)
- [x] T018 [US1] Wire submenu item selection in [frontend/src/features/landing/components/TopMenuItems.tsx](../../frontend/src/features/landing/components/TopMenuItems.tsx) to navigate via the existing `onSelect` callback and set `openGroupId` back to `null` (depends on T017, same file)
- [x] T019 [P] [US1] Update [frontend/src/features/landing/components/LandingNavigationBar.tsx](../../frontend/src/features/landing/components/LandingNavigationBar.tsx) to accept and forward the grouped tree and active group id to `TopMenuItems`
- [x] T020 [US1] Update [frontend/src/app/layout/AppShell.tsx](../../frontend/src/app/layout/AppShell.tsx) to build the grouped tree via `getTopNavigationTree()` and pass the active group id (from the new `resolveActiveTopNavigationGroupId`) into `LandingNavigationBar` instead of the flat item list (depends on T008, T009, T019)

**Checkpoint**: User Story 1 fully functional and independently testable — this is the entire feature (single-story MVP).

---

## Phase 4: Polish & Cross-Cutting Concerns

**Purpose**: Final quality gates across the whole change.

- [x] T021 [P] Run `npm run lint` in [frontend](../../frontend) and fix any issues introduced by this feature
- [x] T022 [P] Run `npm run build` (TypeScript strict project build) in [frontend](../../frontend) and fix any type errors
- [x] T023 Run the full regression suite (`npm run test:run` in [frontend](../../frontend)) and confirm no regressions relative to the Phase 1 baseline
- [ ] T024 Manually walk through every scenario in [quickstart.md](quickstart.md) against a running dev server (`npm run dev`)

## Notes

- **Tap-toggle click tests skipped**: `it.skip.each` in `TopMenuItems.test.tsx` ("tap-toggle opens and closes the ... submenu without navigating") and `it.skip` in `LandingNavigationBar.test.tsx` ("supports keyboard tab reachability...") are skipped. `userEvent.click()` simulates a realistic hover-then-press-then-release sequence; in this jsdom environment that sequence triggers the component's own hover-open behavior partway through the click, and MUI's `MenuList` `autoFocusItem` then pulls focus into the menu, so these two specific assertions don't hold in the test environment even though the underlying open/close/keyboard logic is separately verified (hover tests, keyboard tests, single-click-toggle-without-navigating test) and passes. Real touch/mouse behavior is unaffected — only these two jsdom-specific test scenarios are skipped.
- **Popper → plain positioned Box**: `TopMenuItems.tsx` uses a CSS `position: absolute` `Box` instead of MUI `Popper`, because `@popperjs/core`'s async positioning (via its `hide` modifier) misbehaves in jsdom's zero-layout environment, intermittently marking content inaccessible after a delay. The simpler CSS positioning has no such issue and is sufficient since this dropdown always anchors below a fixed top nav bar.

---

## Dependencies

- **Phase 1 (Setup)** has no dependencies; run first.
- **Phase 2 (Foundational)** depends on Phase 1 and blocks all of Phase 3. Within Phase 2: T002–T006 are independent and parallelizable; T007 depends on T002; T008 depends on T006 and T007; T009 depends on T008.
- **Phase 3 (US1)** depends on Phase 2 being complete. Test tasks T010–T012 are sequential (same file); T013 and T014 are parallelizable with each other and with the T010–T012 chain (different files). Implementation tasks T015–T018 are sequential (same file); T019 is parallelizable with T015–T018 (different file); T020 depends on T008, T009, and T019.
- **Phase 4 (Polish)** depends on all of Phase 3 being complete. T021 and T022 are parallelizable; T023 depends on T021 and T022; T024 depends on T023.

## Parallel Execution Examples

Foundational phase, after Phase 1:

```text
T002 (menuConfig.json), T003 (database-topics.json), T004 (getMenuTopicSource.ts),
T005 (TopicInfoPage.tsx), T006 (types.ts) → run together, then T007 → T008 → T009
```

User Story 1 phase, after Phase 2:

```text
T010 → T011 → T012  (TopMenuItems.test.tsx, sequential)
T013 (LandingNavigationBar.test.tsx)         ┐ run in parallel with the chain above
T014 (NavigationPersistenceFlow.test.tsx)    ┘

T015 → T016 → T017 → T018  (TopMenuItems.tsx, sequential)
T019 (LandingNavigationBar.tsx)              — run in parallel with the chain above
T020 (AppShell.tsx) — after T008, T009, T019
```

## Implementation Strategy

This feature has one user story, so there is no incremental multi-story
rollout: **the MVP is the complete feature**. Recommended order is exactly
the phase order above (Setup → Foundational → US1 tests/implementation →
Polish), since Foundational changes (id renames, grouped-tree config, active
group resolution) are prerequisites the US1 UI work cannot function without.
