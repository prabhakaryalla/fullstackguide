# Implementation Plan: Global Search Bar

**Branch**: `009-global-search-bar` | **Date**: 2026-08-31 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/009-global-search-bar/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command; its definition describes the execution workflow.

## Summary

Add a Global Search bar to the shared top navigation (positioned between the
title and the menu items, on every route) that, on submit, navigates to a new
`/search` route carrying the keyword as a `q` query parameter. The search
results page shows every topic across all menu areas whose title matches the
keyword (case-insensitive, unbounded — no pagination), pre-filled from and
kept in sync with the query parameter, and reuses the existing
`TopicList`/`TopicCard` components to render matches. While the user is on
the search results page, the Global Search bar itself collapses to a
search-icon-only control to avoid showing two duplicate, out-of-sync search
inputs at once.

## Technical Context

**Language/Version**: TypeScript 5.x (strict mode) with React 19

**Primary Dependencies**: MUI v7 (`@mui/material`, `@mui/icons-material`),
`react-router-dom` v7 (HashRouter-based `AppRouter`, `useSearchParams`,
`useLocation`)

**Storage**: N/A — search reads existing static, build-time topic JSON
(`*-topics.json` via `getTopicConfigMap()`); the only new "storage" is the
`q` query parameter on the `/search` URL itself, which is not persisted
beyond that URL

**Testing**: Vitest + React Testing Library + `@testing-library/user-event`,
matching existing suites under `frontend/tests/`

**Target Platform**: Browser SPA hosted on GitHub Pages (HashRouter); latest
Chrome, Edge, Firefox, Safari

**Project Type**: Single-project web frontend (existing `frontend/` app;
no backend involved)

**Performance Goals**: Filtering the full in-memory topic catalog (~90 static
topics across all menus) on every keystroke is a synchronous, memoized
(`useMemo`) local computation with no network/async work; no added perceived
latency expected

**Constraints**: Must remain GitHub Pages/HashRouter-compatible (Principle I);
no new runtime dependencies beyond the existing MUI/`react-router-dom` stack;
must meet WCAG 2.1 AA keyboard and accessible-name requirements
(Principle VI); no new client persistence beyond the `q` URL query parameter
(Principle IX)

**Scale/Scope**: 1 new route (`/search`), 1 new top-navigation control
(Global Search bar), ~90 existing topics searched across 8 menu areas; no
data-volume concerns (Clarifications: results list is unbounded, no
pagination)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Check | Result |
|-----------|-------|--------|
| I. Static Hosting First | New `/search` route added inside the existing `AppShell` route under `HashRouter`; no server rewrites; keyword carried via client-side query parameter only | PASS |
| II. React Architecture and Purity | Results/collapse state derived from `useLocation`/`useSearchParams`; one small, justified Effect resets a manual re-expand override on route change (external-system sync); no render-time mutation | PASS |
| III. State Management Discipline | Local component state only (`GlobalSearchBar`'s input value + manual-expand flag, `SearchResultsPage`'s keyword); no new Context; keyword flows through the URL, not global state | PASS |
| IV. Feature-First Organization | New `features/search` feature is additive; only wiring touches to `features/landing` (Global Search bar + nav bar layout) and `app/router` (new route); `features/main`'s existing data/components are reused read-only, unmodified | PASS |
| V. UI System Consistency (MUI) | Global Search bar and results page built with MUI `TextField`/`InputAdornment`/`IconButton`, matching the existing `TopicSearch.tsx` visual language; results list reuses existing `TopicList`/`TopicCard` | PASS |
| VI. Accessibility Baseline | Search input has an accessible label; collapsed icon button has an accessible name; Enter submits; Tab reaches every control; matches existing `TopicSearch` accessibility pattern | PASS |
| VII. Quality Gates | New TS types (`SearchableTopic`) added under strict mode; no lint/type exceptions planned | PASS |
| VIII. Automated Testing Policy | New `GlobalSearchBar.test.tsx` and `SearchResultsPage.test.tsx`; extend `NavigationPersistenceFlow.test.tsx` for the end-to-end global-search → results → topic flow | PASS |
| IX. Security and Configuration Hygiene | User-entered keyword is only ever rendered through React (auto-escaped) and stored solely in the `q` URL query parameter; no secrets; no new localStorage/sessionStorage usage | PASS |
| X. Performance and Browser Support | Filtering ~90 static topics client-side is trivial and memoized; no new Effects beyond the one justified route-sync Effect; supported browsers unchanged | PASS |
| XI. Constitution Governance | No amendment needed; plan follows existing binding principles | PASS |

No violations — Complexity Tracking section is not needed.

## Project Structure

### Documentation (this feature)

```text
specs/009-global-search-bar/
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
│   │   └── router/
│   │       └── AppRouter.tsx                  # Add `<Route path="/search" element={<SearchResultsPage />} />` inside AppShell
│   └── features/
│       ├── landing/
│       │   └── components/
│       │       ├── GlobalSearchBar.tsx         # NEW: expandable/collapsible search input + icon
│       │       └── LandingNavigationBar.tsx    # Renders GlobalSearchBar between title and TopMenuItems
│       ├── main/                               # Untouched: TopicList/TopicCard reused read-only; getMenuTopicSource reused read-only
│       └── search/                             # NEW feature
│           ├── data/
│           │   └── getAllSearchableTopics.ts   # Flattens getTopicConfigMap() + getSortedMenuItems() into SearchableTopic[]
│           ├── hooks/
│           │   └── useGlobalTopicSearch.ts     # Case-insensitive title-substring filter over SearchableTopic[]
│           ├── model/
│           │   └── types.ts                   # SearchableTopic type
│           └── pages/
│               └── SearchResultsPage.tsx       # Reads/writes `q` query param; renders TopicList of matches or empty state
└── tests/
    ├── landing/
    │   └── GlobalSearchBar.test.tsx            # NEW: expand/collapse, submit, empty-submit, keyboard
    ├── search/
    │   └── SearchResultsPage.test.tsx          # NEW: cross-menu matches, empty state, in-place edit, reload persistence
    └── main/
        └── NavigationPersistenceFlow.test.tsx  # Extended: global search → results → topic content, shell stays visible
```

**Structure Decision**: Single-project web frontend (existing `frontend/`
app). The new `features/search` feature (Constitution Principle IV) owns all
cross-menu search logic and the results page; the only touches to existing
features are additive (a new component in `features/landing` plus one new
route in `app/router`). `features/main`'s existing topic data functions and
`TopicList`/`TopicCard` components are reused unmodified, so no other feature
(topic pages, per-menu search, tile overview, top navigation refactor) is put
at risk by this addition.

## Complexity Tracking

*No violations — this section is not applicable.*
