# Implementation Plan: Topic Progress Tracking

**Branch**: `010-topic-progress-tracking` | **Date**: 2026-09-30 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/010-topic-progress-tracking/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command; its definition describes the execution workflow.

## Summary

Add browser-local "mark as complete" tracking for topics. A new
`features/progress` module owns a React Context (`TopicProgressProvider`,
mounted alongside `ThemeModeProvider` in `AppProviders`) backed by a single
versioned `localStorage` key, storing only the set of completed
`menuId/slug` pairs. `TopicInfoPage` gets a "Mark as complete" toggle button
next to the existing Previous/Next Fab controls. `MainPage` gets a
completed/total progress chip (next to the existing topic-count chip) plus
a "Reset progress" action scoped to the current menu, and `TopicCard` gets
an optional completed-state visual indicator consumed via `TopicList`. All
counts are derived at render time from the current topic list intersected
with the persisted completion set, so renamed/removed topics never inflate
or break a menu's progress count.

## Technical Context

**Language/Version**: TypeScript 5.x (strict mode) with React 19

**Primary Dependencies**: MUI v7 (`@mui/material`, `@mui/icons-material`);
no new runtime dependencies

**Storage**: Browser `localStorage`, one versioned key
(`fullstack-guide.topic-progress.v1`), following the same read/parse/guard
pattern already used by `THEME_MODE_STORAGE_KEY` in
`src/theme/ThemeModeContext.tsx`. Value shape: a JSON object mapping
`"<menuId>/<slug>"` → `true` for completed topics only (absence = not
completed); no other browser storage or network calls involved.

**Testing**: Vitest + React Testing Library + `@testing-library/user-event`,
matching existing suites under `frontend/tests/`

**Target Platform**: Browser SPA hosted on GitHub Pages (HashRouter); latest
Chrome, Edge, Firefox, Safari

**Project Type**: Single-project web frontend (existing `frontend/` app;
no backend involved)

**Performance Goals**: Toggling/reading completion state is a synchronous
in-memory `Set`/object lookup plus one `localStorage.setItem` per toggle;
deriving a menu's completed/total count is a single pass over that menu's
existing (already in-memory) topic array — negligible cost even for the
largest menu (~100+ topics)

**Constraints**: Must remain GitHub Pages/HashRouter-compatible (Principle
I); no account/sign-in/network dependency (spec Clarifications); new
`localStorage` usage MUST follow the explicit key/version + safe
parsing/validation convention (Principle IX); MUST meet WCAG 2.1 AA
keyboard/accessible-name requirements for the new toggle and reset controls
(Principle VI)

**Scale/Scope**: 1 new cross-cutting Context/provider, 1 new toggle control
on `TopicInfoPage`, 1 new progress chip + reset action on `MainPage`, 1
optional visual indicator on `TopicCard`/`TopicList`; covers all existing
menu areas and their existing topics with no new content model

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Check | Result |
|-----------|-------|--------|
| I. Static Hosting First | No new routes or server dependency; all state is client-side `localStorage` read/written from within the existing HashRouter SPA | PASS |
| II. React Architecture and Purity | Completion state lives in Context state (`useState` + `useCallback`), updated only via explicit user toggle/reset handlers; derived progress counts computed during render via `useMemo`, not stored redundantly; no render-time mutation | PASS |
| III. State Management Discipline | Uses Context specifically because completion state is a genuine cross-cutting concern needed by both `TopicInfoPage` (toggle) and `MainPage`/`TopicCard` (display) without a shared parent to lift state to — matches Principle III's stated exception for Context | PASS |
| IV. Feature-First Organization | New `features/progress` feature owns the context, storage helpers, and hooks; only additive touches to `features/main` (progress chip/reset in `MainPage`, optional completed indicator prop in `TopicCard`/`TopicList`, toggle button in `TopicInfoPage`) and `app/providers` (mount the new provider) | PASS |
| V. UI System Consistency (MUI) | Toggle uses MUI `ToggleButton`/`Chip` with `CheckCircle` icon consistent with existing `Chip`-based complexity badges; reset uses MUI `Dialog` for the required confirmation step | PASS |
| VI. Accessibility Baseline | Toggle button exposes `aria-pressed` + accessible name ("Mark as complete" / "Mark as not complete"); reset control is a labeled button opening a focus-trapped confirm dialog; progress chip text is plain readable text, not color-only | PASS |
| VII. Quality Gates | New `ProgressState`/`TopicProgressContextValue` types added under strict mode; no lint/type exceptions planned | PASS |
| VIII. Automated Testing Policy | New `TopicProgressContext.test.tsx` (toggle, persistence, stale-slug exclusion, scoped reset) and extensions to `TopicInfoPage`/`MainPage` tests for the new controls | PASS |
| IX. Security and Configuration Hygiene | Single versioned `localStorage` key, JSON-parsed behind a try/catch with shape validation before use (mirrors `readPersistedMode` in `ThemeModeContext.tsx`); no secrets; no new remote storage | PASS |
| X. Performance and Browser Support | Derived counts computed with `useMemo` over already-loaded topic arrays; toggle/reset are simple synchronous state updates; no new Effects beyond the existing persistence pattern; supported browsers unchanged | PASS |
| XI. Constitution Governance | No amendment needed; plan follows existing binding principles | PASS |

No violations — Complexity Tracking section is not needed.

## Project Structure

### Documentation (this feature)

```text
specs/010-topic-progress-tracking/
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
│   │   └── providers/
│   │       └── AppProviders.tsx                # Mount TopicProgressProvider alongside ThemeModeProvider
│   └── features/
│       ├── progress/                           # NEW feature
│       │   ├── model/
│       │   │   └── types.ts                    # ProgressState, TopicProgressContextValue, MenuProgressSummary
│       │   ├── data/
│       │   │   └── progressStorage.ts           # PROGRESS_STORAGE_KEY read/parse/guard + safe write helpers
│       │   ├── context/
│       │   │   └── TopicProgressContext.tsx     # Provider: state + toggleCompletion/resetMenuProgress
│       │   └── hooks/
│       │       ├── useTopicProgress.ts          # Consumes context; isCompleted(menuId, slug), toggleCompletion
│       │       └── useMenuProgressSummary.ts    # Derives {completed, total} for a menu's current topic array
│       └── main/
│           ├── components/
│           │   ├── TopicCard.tsx                # Add optional `completed` prop → small check indicator
│           │   ├── TopicList.tsx                # Pass-through `isTopicCompleted` lookup prop to TopicCard
│           │   └── ResetProgressDialog.tsx       # NEW: MUI Dialog confirming scoped reset
│           └── pages/
│               ├── MainPage.tsx                 # Progress chip ("N/Total completed") + reset action, scoped to menuSlug
│               └── TopicInfoPage.tsx             # "Mark as complete" ToggleButton near Previous/Next Fabs
└── tests/
    ├── progress/
    │   └── TopicProgressContext.test.tsx        # NEW: toggle, persistence round-trip, stale-slug exclusion, scoped reset
    └── main/
        ├── MainPage.test.tsx                     # Extended: progress chip counts, reset confirm flow
        └── TopicInfoPage.test.tsx                # Extended: mark-complete toggle persists and is keyboard-operable
```

**Structure Decision**: Single-project web frontend (existing `frontend/`
app). The new `features/progress` feature (Constitution Principle IV) owns
all completion-state storage and derivation logic behind a small Context +
hooks API; only additive touches are made to `features/main`'s existing
components/pages (a new prop on `TopicCard`/`TopicList`, a new chip/dialog
on `MainPage`, a new toggle on `TopicInfoPage`) and to `AppProviders` (one
new provider mounted alongside the existing `ThemeModeProvider`). No
existing feature's files are restructured, and complexity filtering (004),
next/previous navigation (005), and search (009) are unaffected since none
of them read or depend on completion state.

## Complexity Tracking

*No violations — this section is not applicable.*
