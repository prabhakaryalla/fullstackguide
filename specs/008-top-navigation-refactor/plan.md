# Implementation Plan: Top Navigation Refactoring (Menu & Submenu Items)

**Branch**: `008-top-navigation-refactor` | **Date**: 2026-08-31 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/008-top-navigation-refactor/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command; its definition describes the execution workflow.

## Summary

Reorganize the flat top navigation menu into 7 top-level items (Backend,
Frontend, Cloud, Database, AI, Design Patterns, System Design), where Backend,
Frontend, and Database reveal grouped submenu items on hover (desktop),
tap-toggle (touch), or keyboard focus (accessibility), while the other items
keep navigating directly as they do today. The existing flat, route-driving
menu list (`getSortedMenuItems`) stays unchanged for content/routing features
(`features/main`); a new grouped view is introduced purely for top-navigation
rendering in `features/landing`, joined against the same underlying leaf
items so no existing content route becomes unreachable.

## Technical Context

**Language/Version**: TypeScript 5.x (strict mode) with React 19

**Primary Dependencies**: MUI v7 (`@mui/material`, `@mui/icons-material`),
`react-router-dom` v7 (HashRouter-based `AppRouter`)

**Storage**: N/A — menu structure is static, build-time JSON (`menuConfig.json`
plus a new `navigationGroups.json`); no runtime persistence needed

**Testing**: Vitest + React Testing Library + `@testing-library/user-event` +
`jest-axe`, matching existing suites under `frontend/tests/`

**Target Platform**: Browser SPA hosted on GitHub Pages (HashRouter); latest
Chrome, Edge, Firefox, Safari, plus touch-capable tablets/phones

**Project Type**: Single-project web frontend (existing `frontend/` app;
no backend involved)

**Performance Goals**: Submenu reveal/hide is a synchronous, computation-free
local state toggle with no network or async work involved, so no added
perceived latency is expected; no additional re-renders of unrelated routed
pages

**Constraints**: Must remain GitHub Pages/HashRouter-compatible (Principle I);
no new runtime dependencies beyond the existing MUI/React stack; must meet
WCAG 2.1 AA keyboard and focus-visibility requirements (Principle VI)

**Scale/Scope**: 7 top-level items; 3 parent items with 2–3 submenu items each
(7 submenu items total); no data-volume concerns

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Check | Result |
|-----------|-------|--------|
| I. Static Hosting First | No server routes/rewrites introduced; `AppRouter` keeps its existing `Routes`/`Route` structure under `HashRouter` | PASS |
| II. React Architecture and Purity | Submenu open/closed state is local component state derived from pointer/focus events; no render-time mutation; selection remains derived from route via `resolveSelectedMenuId` | PASS |
| III. State Management Discipline | Single `openGroupId` local state at the nav-bar level; no Context needed; no duplicate/derivable state added | PASS |
| IV. Feature-First Organization | Changes stay within `features/landing` (menu data/components) and `app/layout` (shell wiring); `features/main` (routing/content) is untouched | PASS |
| V. UI System Consistency (MUI) | Submenus implemented with MUI `Menu`/`MenuItem` (or `Popover`) and `@mui/icons-material` expand indicator, reusing theme tokens | PASS |
| VI. Accessibility Baseline | Keyboard focus reveals submenu, Escape closes and returns focus, arrow keys move between items (per Clarifications); MUI `Menu` provides much of this natively | PASS |
| VII. Quality Gates | No new lint/type exceptions planned; strict TS types added for new grouped-menu model | PASS |
| VIII. Automated Testing Policy | Extend `TopMenuItems.test.tsx`, `LandingNavigationBar.test.tsx`, `NavigationPersistenceFlow.test.tsx`; add a11y assertions for new submenu behavior | PASS |
| IX. Security and Configuration Hygiene | No secrets, no new client persistence; menu structure remains static public JSON | PASS |
| X. Performance and Browser Support | Submenu state is a single memoized selector/local state; no new Effects; supported browsers unchanged | PASS |
| XI. Constitution Governance | No amendment needed; plan follows existing binding principles | PASS |

No violations — Complexity Tracking section is not needed.

## Project Structure

### Documentation (this feature)

```text
specs/008-top-navigation-refactor/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md        # Phase 1 output (/speckit-plan command)
├── quickstart.md        # Phase 1 output (/speckit-plan command)
├── contracts/           # Phase 1 output (/speckit-plan command)
└── tasks.md             # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

### Source Code (repository root)

```text
frontend/
├── src/
│   ├── app/
│   │   └── layout/
│   │       ├── AppShell.tsx                 # Wires the grouped nav tree into LandingNavigationBar
│   │       └── resolveSelectedMenuId.ts      # Unchanged; gains new sibling `resolveActiveTopNavigationGroupId`
│   └── features/
│       ├── landing/
│       │   ├── data/
│       │   │   ├── menuConfig.json           # Flat leaf items (unchanged contract); "database"→"cosmos" id rename, "azure" label→"Cloud", new "sql" leaf
│       │   │   ├── getSortedMenuItems.ts      # Unchanged: still returns flat leaf list for features/main
│       │   │   ├── navigationGroups.json      # NEW: top-level nav grouping (parents + childIds)
│       │   │   └── getTopNavigationTree.ts    # NEW: joins navigationGroups.json with flat leaf items
│       │   ├── model/
│       │   │   └── types.ts                   # Add TopNavigationGroup / resolved view types
│       │   └── components/
│       │       ├── TopMenuItems.tsx            # Reworked to render groups + submenus (hover/tap/focus)
│       │       └── LandingNavigationBar.tsx    # Passes grouped tree through to TopMenuItems
│       └── main/                               # Untouched: routing/content (MainPage, TopicInfoPage, tiles)
└── tests/
    ├── landing/
    │   ├── TopMenuItems.test.tsx               # Extended: submenu reveal/close, keyboard, a11y
    │   └── LandingNavigationBar.test.tsx        # Extended: grouped rendering
    └── main/
        └── NavigationPersistenceFlow.test.tsx   # Extended: submenu selection persists nav + active state
```

**Structure Decision**: Single-project web frontend (existing `frontend/`
app). This feature stays entirely inside `features/landing` (navigation
rendering/data) and `app/layout` (shell wiring), per Constitution Principle IV
(Feature-First Organization). `features/main` (routing, content pages, tile
overview) is intentionally left untouched: it keeps consuming the existing
flat `getSortedMenuItems()` contract unchanged, so no other feature (topic
pages, search, tile overview) is put at risk by this refactor.

## Complexity Tracking

*No violations — this section is not applicable.*
