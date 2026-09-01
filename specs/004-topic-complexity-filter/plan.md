# Implementation Plan: Topic Complexity Filtering

**Branch**: `004-topic-complexity-filter` | **Date**: 2026-08-27 | **Spec**: `specs/004-topic-complexity-filter/spec.md`

**Input**: Feature specification from `specs/004-topic-complexity-filter/spec.md`

## Summary

Add a complexity filter to the main topic experience so users can narrow topics
by `Easy`, `Medium`, or `Hard`, with `All` as the default. Ensure filtering
combines with the existing search query using AND behavior, preserves empty
state feedback, and applies consistently across all topic datasets.

## Technical Context

**Language/Version**: TypeScript 5.x, React 18.x

**Primary Dependencies**: React Router (HashRouter), Material UI (MUI), Vitest,
React Testing Library

**Storage**: Static JSON topic datasets bundled at build time

**Testing**: Vitest + React Testing Library

**Target Platform**: Modern browsers (latest two versions of Chrome, Edge,
Firefox, Safari) on desktop and mobile

**Project Type**: Frontend web application (static hosting compatible, GitHub
Pages)

**Performance Goals**: Filter and search interaction updates visible topic
results within one render cycle without perceptible UI lag for current topic
catalog sizes

**Constraints**: HashRouter-compatible static deployment only; no server-side
logic; preserve existing search behavior while adding complexity filtering;
maintain WCAG 2.1 AA keyboard/focus accessibility

**Scale/Scope**: One main-page enhancement across all current topic groups
(Azure, .NET, C#, Database) with updates to topic metadata and tests

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Principle I (Static Hosting First)**: PASS. Uses existing static JSON and
  client-side filtering only; no runtime server dependencies.
- **Principle II (React Architecture and Purity)**: PASS. Filtered topic list
  remains a derived render value from route data, search query, and complexity
  selection.
- **Principle III (State Management Discipline)**: PASS. Adds one local UI
  state value for selected complexity, avoids duplicate persisted state.
- **Principle IV (Feature-First Organization)**: PASS. Changes remain within
  `features/main` and its tests.
- **Principle V (UI System Consistency)**: PASS. Complexity filter control will
  use MUI-aligned components and existing layout styling patterns.
- **Principle VI (Accessibility Baseline)**: PASS. Filter control must be
  keyboard reachable, labeled, and focus-visible alongside search.
- **Principle VII (Quality Gates and Static Analysis)**: PASS by design intent.
  Type checks, lint, and formatting remain required for delivery.
- **Principle VIII (Automated Testing Policy)**: PASS by design intent.
  Existing main-page tests will be extended for complexity-only and
  search-plus-complexity behavior.
- **Principle IX (Security and Configuration Hygiene)**: PASS. No secrets or
  sensitive data introduced; metadata remains public learning content.
- **Principle X (Performance and Browser Support)**: PASS. Filtering operates on
  in-memory arrays with simple deterministic predicates; no extra network
  overhead.
- **Principle XI (Governance as Binding Gate)**: PASS. No constitutional
  exception needed.

Post-design re-check: PASS. Research, data model, contract, and quickstart
artifacts remain aligned with all constitutional principles.

## Project Structure

### Documentation (this feature)

```text
specs/004-topic-complexity-filter/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── topic-complexity-filter-ui-contract.md
└── tasks.md              # Created later by /speckit-tasks
```

### Source Code (frontend)

```text
frontend/
├── src/
│   └── features/
│       └── main/
│           ├── components/
│           │   ├── TopicSearch.tsx
│           │   └── TopicList.tsx
│           ├── data/
│           │   ├── azure-topics.json
│           │   ├── csharp-topics.json
│           │   ├── database-topics.json
│           │   └── dotnet-topics.json
│           ├── hooks/
│           │   └── useTopicSearch.ts
│           ├── model/
│           │   └── types.ts
│           └── pages/
│               └── MainPage.tsx
└── tests/
    └── main/
        ├── MainPage.test.tsx
        ├── TopicSearch.test.tsx
        ├── TopicList.test.tsx
        └── useTopicSearch.test.ts
```

**Structure Decision**: Use the existing feature-first frontend structure in
`frontend/src/features/main` and extend current topic/search modules rather
than introducing new cross-feature abstractions.

## Complexity Tracking

No constitution violations. This section is intentionally blank.
