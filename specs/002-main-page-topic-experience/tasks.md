---
description: "Task list for Main Page Topic Experience implementation"
---

# Tasks: Main Page Topic Experience

**Input**: Design documents from `/specs/002-main-page-topic-experience/`

**Stack**: TypeScript 5.x · React 18.x · MUI · HashRouter · react-markdown · remark-gfm · mermaid.js · Vitest + React Testing Library

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
│   │   └── router/           → HashRouter + route definitions
│   └── features/
│       ├── landing/
│       │   └── pages/        → LandingPage (menu click → navigate to main page)
│       └── main/
│           ├── components/   → TopicCard, TopicList, TopicSearch, MermaidBlock
│           ├── content/      → Markdown files organized by menu slug
│           │   ├── azure/
│           │   ├── dotnet/
│           │   └── csharp/
│           ├── data/         → Static topic JSON configs per menu
│           ├── hooks/        → useTopicSearch
│           ├── model/        → TypeScript types
│           └── pages/        → MainPage, TopicInfoPage
└── tests/
    └── main/                 → Vitest + RTL test files
```

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Install dependencies and scaffold the feature folder structure

- [X] T001 Install `react-markdown`, `remark-gfm`, and `mermaid` npm packages
- [X] T002 [P] Create the `features/main/` folder structure

**Checkpoint**: `npm run build` succeeds with new packages; folder structure matches plan.md layout

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Types, static data, content files, and router config required by all user stories

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T003 Define `Topic` and `TopicConfig` TypeScript interfaces
- [X] T004 [P] Create `frontend/src/features/main/data/azure-topics.json`
- [X] T005 [P] Create `frontend/src/features/main/data/dotnet-topics.json`
- [X] T006 [P] Create `frontend/src/features/main/data/csharp-topics.json`
- [X] T007 [P] Create sample Markdown content files
- [X] T008 Extend `frontend/src/app/router/AppRouter.tsx` with `/:menuSlug` and `/:menuSlug/:topicSlug` routes
- [X] T009 Update `frontend/src/features/landing/pages/LandingPage.tsx` menu click handler

**Checkpoint**: Foundation ready — `AppRouter` compiles; navigating to `#/azure` in dev server shows a blank page (not 404); landing menu clicks trigger route change

---

## Phase 3: User Story 1 — Open Main Page from a Menu Selection (Priority: P1) 🎯 MVP

**Goal**: Clicking any top navigation menu item navigates to that menu's dedicated main page, which loads the topic tile grid from static JSON config and shows all topics by default.

**Independent Test**: Click "Azure" in the landing navigation and confirm the route changes to `#/azure`, the page shows a tile grid with all Azure topics from `azure-topics.json`, and the "No topics available" message appears when `topics` is set to `[]` in the config.

### Implementation for User Story 1

- [X] T010 [P] [US1] Create `TopicCard` component in `frontend/src/features/main/components/TopicCard.tsx`
- [X] T011 [US1] Create `TopicList` component in `frontend/src/features/main/components/TopicList.tsx`
- [X] T012 [US1] Create `MainPage` in `frontend/src/features/main/pages/MainPage.tsx`
- [X] T013 [P] [US1] Write Vitest + RTL tests for `MainPage` in `frontend/tests/main/MainPage.test.tsx`
- [X] T014 [P] [US1] Write Vitest + RTL tests for `TopicList` in `frontend/tests/main/TopicList.test.tsx`

**Checkpoint**: User Story 1 fully functional — clicking any landing menu navigates to the main page and displays topic tiles; empty state displays correctly

---

## Phase 4: User Story 2 — Filter Topics by Search Text (Priority: P1)

**Goal**: Typing in the search bar on the main page filters the topic tile grid to topics whose title contains the typed text (case-insensitive substring match); clearing the search restores all topics.

**Independent Test**: On the Azure main page, type `"event"` and confirm only tiles with "event" in the title remain visible. Type `"EVENT"` and confirm the same results. Type `"xyz123"` and confirm the empty-result message appears. Clear the input and confirm all tiles are restored.

### Implementation for User Story 2

- [X] T015 [US2] Create `useTopicSearch` hook in `frontend/src/features/main/hooks/useTopicSearch.ts`
- [X] T016 [US2] Create `TopicSearch` component in `frontend/src/features/main/components/TopicSearch.tsx`
- [X] T017 [US2] Wire `TopicSearch` and `useTopicSearch` into `MainPage`
- [X] T018 [P] [US2] Write Vitest tests for `useTopicSearch` hook in `frontend/tests/main/useTopicSearch.test.ts`
- [X] T019 [P] [US2] Write Vitest + RTL tests for `TopicSearch` component in `frontend/tests/main/TopicSearch.test.tsx`

**Checkpoint**: User Story 2 fully functional — search filters topic tiles in real time; empty-result state shows without layout breakage; clearing search restores all tiles

---

## Phase 5: User Story 3 — View Topic Information from Markdown (Priority: P1)

**Goal**: Selecting a topic navigates to its information page, which renders Markdown content (including Mermaid diagrams) from the bundled file; missing or unparseable files show "Content unavailable"; back navigation is available.

**Independent Test**: Click the "Azure Event Hubs" tile; confirm route is `#/azure/azure-event-hubs`; confirm Markdown content renders including headings, paragraphs, and a Mermaid diagram. Set a topic's `markdownPath` to a missing file and confirm "Content unavailable" appears without a crash.

### Implementation for User Story 3

- [X] T020 [US3] Create `MermaidBlock` component in `frontend/src/features/main/components/MermaidBlock.tsx`
- [X] T021 [US3] Create `TopicInfoPage` in `frontend/src/features/main/pages/TopicInfoPage.tsx`
- [X] T022 [P] [US3] Write Vitest + RTL tests for `TopicInfoPage` in `frontend/tests/main/TopicInfoPage.test.tsx`
- [X] T023 [P] [US3] Write Vitest + RTL tests for `MermaidBlock` in `frontend/tests/main/MermaidBlock.test.tsx`

**Checkpoint**: User Story 3 fully functional — topic info page renders Markdown and Mermaid diagrams; error state shows correctly; back navigation works

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Accessibility compliance, contrast, and end-to-end route validation

- [X] T024 [P] Audit keyboard operability across `MainPage` and `TopicInfoPage`
- [X] T025 [P] Verify WCAG 2.1 AA contrast compliance for tile card text and topic info page
- [X] T026 Run full route smoke test per `specs/002-main-page-topic-experience/quickstart.md`

**Checkpoint**: Feature complete — all acceptance criteria from spec.md pass; all tests green; WCAG AA met; deep-links and back/forward navigation work correctly

---

## Dependencies

```
Phase 1 (T001–T002)
    └─► Phase 2 (T003–T009)
            ├─► Phase 3 / US1 (T010–T014)  ← MVP — deliver first
            │       └─► Phase 4 / US2 (T015–T019)
            │               └─► Phase 5 / US3 (T020–T023)
            │                       └─► Phase 6 (T024–T026)
            └─► (T008, T009 block US1 route navigation)
```

Within Phase 3:
- T010 (TopicCard) can run in parallel with T011 prep — T011 depends on T010
- T012 (MainPage) depends on T011
- T013, T014 can run in parallel once T012 is complete

Within Phase 4:
- T015 (hook) and T016 (component) are independent — run in parallel
- T017 (wiring) depends on T015 + T016
- T018, T019 run in parallel once T015 / T016 are done

Within Phase 5:
- T020 (MermaidBlock) can start as soon as Phase 2 is done
- T021 (TopicInfoPage) depends on T020
- T022, T023 run in parallel once T021 / T020 are done

---

## Parallel Execution Example — User Story 1

```
Developer A            Developer B
─────────────          ─────────────
T010 TopicCard         T004 azure-topics.json
T011 TopicList         T005 dotnet-topics.json
                       T006 csharp-topics.json
                       T007 content Markdown files
─────────────          ─────────────
T012 MainPage (A+B merge)
─────────────────────────
T013 MainPage tests    T014 TopicList tests
```

---

## Implementation Strategy

**MVP scope (US1 only)**: Complete Phases 1–3 (T001–T014). This delivers a navigable main page with topic tiles loaded from static JSON. Search and Markdown rendering are not required for MVP.

**Increment 2 (US1 + US2)**: Add Phase 4 (T015–T019). Delivers real-time search filtering.

**Full delivery (all stories)**: Add Phase 5 (T020–T023) and Phase 6 (T024–T026). Delivers topic info pages with Markdown and Mermaid rendering, accessibility compliance, and complete smoke testing.
