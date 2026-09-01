# Implementation Plan: Main Page Tiles Overview

**Branch**: `006-main-page-tiles-overview` | **Date**: 2026-08-30 | **Spec**: `specs/006-main-page-tiles-overview/spec.md`

**Input**: Feature specification from `specs/006-main-page-tiles-overview/spec.md`

## Summary

Replace the current root-level coming-soon experience with a production-ready
main page that displays clickable menu tiles. Each tile presents key menu
statistics (total, hard, medium, easy, unknown counts) plus dominant complexity
insight and routes users to the correct topic-list page, including empty-state
menus.

## Technical Context

**Language/Version**: TypeScript 5.x, React 18.x

**Primary Dependencies**: React Router (HashRouter), Material UI (MUI), Vitest,
React Testing Library

**Storage**: Static JSON topic datasets bundled at build time; no server-side
persistence

**Testing**: Vitest + React Testing Library

**Target Platform**: Modern desktop and mobile browsers (latest two versions of
Chrome, Edge, Firefox, Safari)

**Project Type**: Frontend web application (static hosting compatible)

**Performance Goals**: Root page first meaningful tile paint in <= 1.5 seconds
for in-scope menu datasets during local validation; tile-to-topic-list
navigation update in <= 250 ms p95 interaction-to-render

**Constraints**: HashRouter-only routing, no server rewrites, navigation must
preserve exact menu mapping, WCAG 2.1 AA keyboard/focus compliance

**Scale/Scope**: One root main-page experience spanning all configured menus in
`menuConfig.json`, including menus with empty or partial metadata

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Principle I (Static Hosting First)**: PASS. Design uses static route/data
  resolution with no backend assumptions.
- **Principle II (React Architecture and Purity)**: PASS. Tile summaries are
  derived from route/menu/topic metadata and rendered as pure UI state.
- **Principle III (State Management Discipline)**: PASS. No new global store is
  required; local derived state is sufficient.
- **Principle IV (Feature-First Organization)**: PASS. Work remains in
  `features/landing`, `features/main`, and app router touch-points with
  corresponding tests.
- **Principle V (UI System Consistency)**: PASS. MUI card/grid/button patterns
  remain the baseline for tile presentation.
- **Principle VI (Accessibility Baseline)**: PASS. Keyboard activation and
  focus visibility are explicit requirements.
- **Principle VII (Quality Gates and Static Analysis)**: PASS by planned
  enforcement through lint/type/test gates.
- **Principle VIII (Automated Testing Policy)**: PASS. Feature includes root
  rendering, tile stats, and navigation tests.
- **Principle IX (Security and Configuration Hygiene)**: PASS. No secrets or
  sensitive runtime data introduced.
- **Principle X (Performance and Browser Support)**: PASS. Derived summaries are
  bounded by static dataset size and browser support matrix stays unchanged.
- **Principle XI (Governance as Binding Gate)**: PASS. No constitutional
  exceptions needed.

Post-design re-check: PASS. Planned artifacts and contracts remain aligned with
all MUST constraints.

## Project Structure

### Documentation (this feature)

```text
specs/006-main-page-tiles-overview/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── main-page-tiles-ui-contract.md
└── tasks.md              # Created later by /speckit-tasks
```

### Source Code (repository root)

```text
frontend/
├── src/
│   ├── app/
│   │   └── router/
│   │       └── AppRouter.tsx
│   └── features/
│       ├── landing/
│       │   ├── components/
│       │   │   └── ComingSoonView.tsx
│       │   ├── data/
│       │   │   └── menuConfig.json
│       │   └── pages/
│       │       └── LandingPage.tsx
│       └── main/
│           ├── components/
│           │   ├── TopicCard.tsx
│           │   └── TopicList.tsx
│           ├── data/
│           │   ├── ai-topics.json
│           │   ├── azure-topics.json
│           │   ├── csharp-topics.json
│           │   ├── database-topics.json
│           │   ├── dotnet-topics.json
│           │   ├── microservices-topics.json
│           │   ├── react-js-topics.json
│           │   └── system-design-topics.json
│           ├── model/
│           │   └── types.ts
│           └── pages/
│               └── MainPage.tsx
└── tests/
    └── main/
        └── MainPage.test.tsx
```

**Structure Decision**: Keep the existing frontend feature-first structure,
evolve root-route page behavior, and implement menu-tile summaries through
shared topic datasets without introducing a new app layer.

## Complexity Tracking

No constitution violations. This section is intentionally blank.
