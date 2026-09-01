# Implementation Plan: Main Page Topic Experience

**Branch**: `002-main-page-topic-experience` | **Date**: 2026-08-26 | **Spec**: `specs/002-main-page-topic-experience/spec.md`

**Input**: Feature specification from `specs/002-main-page-topic-experience/spec.md`

## Summary

Extend the existing Fullstack Guide application with a menu-specific main page
that displays a searchable tile list of topics and navigates to a topic
information page that renders content from bundled Markdown files. Topics are
declared in static JSON config files (one per menu), content Markdown files are
organized under per-menu content folders, and all navigation is implemented as
HashRouter routes compatible with GitHub Pages static hosting.

## Technical Context

**Language/Version**: TypeScript 5.x, React 18.x

**Primary Dependencies**: React Router (HashRouter), Material UI (MUI),
`react-markdown`, `remark-gfm`, `mermaid.js`

**Storage**: Static JSON topic config files bundled at build time (one per
menu, e.g., `azure-topics.json`); Markdown content files imported via Vite's
`import.meta.glob` from per-menu content folders

**Testing**: Vitest + React Testing Library

**Target Platform**: Modern browsers — latest two versions of Chrome, Edge,
Firefox, and Safari; desktop and mobile

**Project Type**: Frontend web application (static hosting compatible, GitHub
Pages)

**Performance Goals**: Topic search filtering updates the visible tile list
within one interaction step (no debounce required at initial scale); Markdown
content renders within 2 s on local development preview

**Constraints**: No server-side logic; all assets must be statically bundled;
HashRouter for GitHub Pages; Markdown files and JSON configs are part of the
app source tree; WCAG 2.1 AA accessibility required

**Scale/Scope**: Three initial menus (`.NET`, `Azure`, `C#`) each with a
small number of topics; one main page per menu; one topic information page per
topic; content organized by menu folder

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Principle I (Static Hosting First)**: PASS. All data (JSON configs,
  Markdown files) is bundled at build time via Vite; HashRouter routes
  `#/:menuSlug` and `#/:menuSlug/:topicSlug` require no server rewrites.
- **Principle II (React Purity)**: PASS. Topic filtering is derived state
  computed during render from search query and topic list; no side-effectful
  render logic.
- **Principle III (State Management Discipline)**: PASS. Search query is local
  component state; selected menu context is derived from the route param; no
  global state needed.
- **Principle IV (Feature-First Organization)**: PASS. All new source files are
  grouped under `frontend/src/features/main/`; no ad hoc folder patterns.
- **Principle V (MUI Consistency)**: PASS. Topic tiles use MUI `Card`; search
  bar uses MUI `TextField`; layout uses MUI `Box` and `Grid` with theme tokens.
- **Principle VI (Accessibility Baseline)**: PASS. Search input has accessible
  label; topic cards are keyboard operable and have visible focus states; topic
  info page has semantic heading hierarchy.
- **Principle VII (Static Analysis)**: PASS by design intent. TypeScript
  strict, ESLint, and Prettier compliance required in implementation.
- **Principle VIII (Automated Testing)**: PASS by design intent. Vitest + RTL
  tests required for search filtering, route navigation, and empty/error states.
- **Principle IX (Security Hygiene)**: PASS. No secrets; static JSON and
  Markdown content only; no `dangerouslySetInnerHTML`.
- **Principle X (Performance/Browser Support)**: PASS. Filtering is a simple
  `Array.filter` + `String.toLowerCase().includes()`; no unnecessary effects or
  excessive re-renders.
- **Principle XI (Governance)**: PASS. No deviations requested.

Post-design re-check: PASS. No constitutional gate violations identified.

## Project Structure

### Documentation (this feature)

```text
specs/002-main-page-topic-experience/
├── plan.md              ← this file
├── research.md          ← Phase 0 output
├── data-model.md        ← Phase 1 output
├── quickstart.md        ← Phase 1 output
├── contracts/
│   └── main-page-ui-contract.md   ← Phase 1 output
└── tasks.md             ← Phase 2 output (/speckit-tasks — NOT created here)
```

### Source Code (frontend)

```text
frontend/
├── src/
│   ├── app/
│   │   └── router/
│   │       └── AppRouter.tsx          ← extend with main page and topic info routes
│   └── features/
│       └── main/
│           ├── components/
│           │   ├── TopicSearch.tsx     ← search bar component
│           │   ├── TopicList.tsx       ← tile grid of filtered topics
│           │   ├── TopicCard.tsx       ← single MUI Card tile for a topic
│           │   └── MermaidBlock.tsx    ← renders a Mermaid diagram code block
│           ├── data/
│           │   ├── azure-topics.json  ← topic config for Azure menu
│           │   ├── dotnet-topics.json ← topic config for .NET menu
│           │   └── csharp-topics.json ← topic config for C# menu
│           ├── content/
│           │   ├── azure/
│           │   │   └── azure-event-hubs.md
│           │   ├── dotnet/
│           │   └── csharp/
│           ├── hooks/
│           │   └── useTopicSearch.ts  ← filtering hook (case-insensitive substring)
│           ├── model/
│           │   └── types.ts           ← Topic, TopicConfig TypeScript types
│           └── pages/
│               ├── MainPage.tsx       ← search + tile list page for a menu
│               └── TopicInfoPage.tsx  ← markdown rendering page for a topic
└── tests/
    └── main/
        ├── MainPage.test.tsx
        ├── TopicInfoPage.test.tsx
        ├── TopicSearch.test.tsx
        ├── TopicList.test.tsx
        └── useTopicSearch.test.ts
```

**Structure Decision**: Feature-first layout under `features/main/`. Content
Markdown files reside in `features/main/content/<menuSlug>/` matching the JSON
`markdownPath` field (e.g., `"azure/azure-event-hubs.md"`). Vite's
`import.meta.glob` is used to lazily resolve Markdown file contents at runtime
without a build step for each topic.

## Complexity Tracking

No constitution violations. This section is intentionally blank.
