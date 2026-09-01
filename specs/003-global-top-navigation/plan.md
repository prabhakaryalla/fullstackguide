# Implementation Plan: Global Top Navigation Visibility

**Branch**: `003-global-top-navigation` | **Date**: 2026-08-27 | **Spec**: `specs/003-global-top-navigation/spec.md`

**Input**: Feature specification from `specs/003-global-top-navigation/spec.md`

## Summary

Make top navigation persist across all user-facing pages in scope (Landing,
Main, Topic Info, and route fallback) by moving top navigation composition to a
shared app-level layout that wraps routed page content. Preserve existing menu
items and navigation semantics while ensuring the bar remains visible and fixed
in viewport position during route transitions, full-page scrolling, page
refreshes, and empty/error states.

## Technical Context

**Language/Version**: TypeScript 5.x, React 18.x

**Primary Dependencies**: React Router (HashRouter), Material UI (MUI), existing
landing navigation components

**Storage**: Static JSON menu/topic files bundled at build time; no new
persistence introduced

**Testing**: Vitest + React Testing Library

**Target Platform**: Modern browsers (latest two versions of Chrome, Edge,
Firefox, Safari) on desktop and mobile

**Project Type**: Frontend web application (static hosting compatible, GitHub
Pages)

**Performance Goals**: Top navigation appears with first paint of each in-scope
page and remains visible in a fixed viewport position during route transitions
and top-to-bottom scrolling without introducing perceptible layout jank

**Constraints**: HashRouter-compatible routing only; no server-side rendering or
server rewrites; no changes to existing menu taxonomy or destination semantics;
WCAG 2.1 AA accessibility baseline remains mandatory

**Scale/Scope**: One shared navigation layout applied to current in-scope pages
(Landing, Main, Topic Info, wildcard fallback) with behavior preserved for
existing menu and topic flows

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Principle I (Static Hosting First)**: PASS. Design keeps HashRouter and
  static bundle behavior; no server runtime requirements are introduced.
- **Principle II (React Architecture and Purity)**: PASS. Shared layout uses
  props and route params only; no side effects for derived rendering decisions.
- **Principle III (State Management Discipline)**: PASS. Navigation selection
  state remains local/derived from route, avoiding global duplicate state.
- **Principle IV (Feature-First Organization)**: PASS. New shared layout and
  supporting logic stay within existing app and feature boundaries.
- **Principle V (UI System Consistency)**: PASS. Existing MUI-aligned
  navigation components are reused; no parallel styling system introduced.
- **Principle VI (Accessibility Baseline)**: PASS. Persistent navigation remains
  keyboard operable and consistently discoverable across pages.
- **Principle VII (Quality Gates and Static Analysis)**: PASS by design intent.
  TypeScript strict mode and lint checks remain required in implementation.
- **Principle VIII (Automated Testing Policy)**: PASS by design intent. Route
  visibility behavior will be covered with unit/integration tests.
- **Principle IX (Security and Configuration Hygiene)**: PASS. No secrets,
  client-exposed sensitive data, or unsafe content rendering changes.
- **Principle X (Performance and Browser Support)**: PASS. Shared layout avoids
  unnecessary effects and supports existing browser compatibility targets.
- **Principle XI (Governance as Binding Gate)**: PASS. No constitutional
  deviations requested.

Post-design re-check: PASS. Phase 1 artifacts align with all constitutional
principles.

## Project Structure

### Documentation (this feature)

```text
specs/003-global-top-navigation/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── top-navigation-ui-contract.md
└── tasks.md              # Created later by /speckit-tasks
```

### Source Code (frontend)

```text
frontend/
├── src/
│   ├── app/
│   │   ├── router/
│   │   │   └── AppRouter.tsx
│   │   └── layout/
│   │       └── AppShell.tsx                 # New shared layout host
│   └── features/
│       ├── landing/
│       │   ├── components/
│       │   │   └── LandingNavigationBar.tsx
│       │   ├── data/
│       │   │   └── menuConfig.json
│       │   └── pages/
│       │       └── LandingPage.tsx
│       └── main/
│           └── pages/
│               ├── MainPage.tsx
│               └── TopicInfoPage.tsx
└── tests/
    ├── landing/
    │   └── LandingNavigationBar.test.tsx
    └── main/
        ├── MainPage.test.tsx
        └── TopicInfoPage.test.tsx
```

**Structure Decision**: Use a web-application frontend structure with a shared
app-level layout (`app/layout/AppShell.tsx`) so top navigation is rendered once
and remains visible across routed content pages.

## Complexity Tracking

No constitution violations. This section is intentionally blank.
