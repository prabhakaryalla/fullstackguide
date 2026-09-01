# Implementation Plan: Topic Next/Previous Navigation

**Branch**: `005-topic-next-previous-navigation` | **Date**: 2026-08-30 | **Spec**: `specs/005-topic-next-previous-navigation/spec.md`

**Input**: Feature specification from `specs/005-topic-next-previous-navigation/spec.md`

## Summary

Add Previous and Next controls to the Topic Info page so users can move to the
immediate adjacent topic inside the current menu category. Navigation stays
within category boundaries, disables boundary controls at first/last topics,
and keeps keyboard accessibility and user-friendly control states.

## Technical Context

**Language/Version**: TypeScript 5.x, React 18.x

**Primary Dependencies**: React Router (HashRouter), Material UI (MUI),
ReactMarkdown, Vitest, React Testing Library

**Storage**: Static JSON topic datasets bundled at build time

**Testing**: Vitest + React Testing Library

**Target Platform**: Modern browsers (latest two versions of Chrome, Edge,
Firefox, Safari) on desktop and mobile

**Project Type**: Frontend web application (static hosting compatible, GitHub
Pages)

**Performance Goals**: Topic-to-topic navigation updates visible Topic Info
content with p95 interaction-to-render completion <= 250 ms during local
validation runs across in-scope menu datasets

**Constraints**: HashRouter-compatible static deployment only; no server-side
logic; navigation must remain inside active menu category; WCAG 2.1 AA
keyboard/focus expectations remain mandatory

**Scale/Scope**: One Topic Info page enhancement across all existing topic
categories (Azure, .NET, C#, Database, AI, React JS, Microservices,
System Design) with associated route and page tests

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Principle I (Static Hosting First)**: PASS. Uses existing in-memory topic
  metadata and client-side route navigation only.
- **Principle II (React Architecture and Purity)**: PASS. Adjacent topic
  determination is derived from route params and topic arrays with no side
  effects in render.
- **Principle III (State Management Discipline)**: PASS. No new global state;
  button state derives from current topic index.
- **Principle IV (Feature-First Organization)**: PASS. Changes remain in
  `features/main` page logic and corresponding tests.
- **Principle V (UI System Consistency)**: PASS. Navigation controls use MUI
  button patterns and existing page visual language.
- **Principle VI (Accessibility Baseline)**: PASS. Controls require clear
  labels, visible focus, and keyboard activation.
- **Principle VII (Quality Gates and Static Analysis)**: PASS by design intent.
  Type checks, lint, and formatting are required at implementation.
- **Principle VIII (Automated Testing Policy)**: PASS by design intent. Topic
  navigation and boundary behaviors are covered in automated tests.
- **Principle IX (Security and Configuration Hygiene)**: PASS. No sensitive
  data introduced and no new client persistence.
- **Principle X (Performance and Browser Support)**: PASS. Adjacency lookup is
  constant-time index navigation over already-loaded arrays.
- **Principle XI (Governance as Binding Gate)**: PASS. No constitutional
  exceptions required.

Post-design re-check: PASS. Research, data model, contract, and quickstart
artifacts remain aligned with constitutional constraints.

## Project Structure

### Documentation (this feature)

```text
specs/005-topic-next-previous-navigation/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── topic-next-previous-ui-contract.md
└── tasks.md              # Created later by /speckit-tasks
```

### Source Code (frontend)

```text
frontend/
├── src/
│   ├── app/
│   │   └── router/
│   │       └── AppRouter.tsx
│   └── features/
│       └── main/
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
│               └── TopicInfoPage.tsx
└── tests/
  └── main/
    ├── renderWithRouter.tsx
    └── TopicInfoPage.test.tsx
```

**Structure Decision**: Keep the existing feature-first frontend structure and
implement navigation behavior inside `TopicInfoPage` using current route and
topic dataset patterns.

## Complexity Tracking

No constitution violations. This section is intentionally blank.
