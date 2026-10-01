# Implementation Plan: Full-Text Content Search

**Branch**: `012-full-text-content-search` | **Date**: 2026-09-30 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/012-full-text-content-search/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command; its definition describes the execution workflow.

## Summary

Extend the existing cross-menu search results page (feature 009) so a
keyword also matches each topic's raw markdown body content, not just its
title. Title matches keep rendering instantly and synchronously (unchanged
`useGlobalTopicSearch`). A new, separate hook lazily builds an in-memory
content index — every topic's raw markdown text, loaded once per browser
session via the same `import.meta.glob('...md', { query: '?raw' })` pattern
already used by `TopicInfoPage` — and merges in content-only matches once
that index resolves, showing a small loading indicator in the meantime.
Content-only matches (title didn't match) render a short plain-text snippet
under the title so the user can see why the topic appeared.

## Technical Context

**Language/Version**: TypeScript 5.x (strict mode) with React 19

**Primary Dependencies**: MUI v7 (`@mui/material`); no new runtime
dependencies

**Storage**: None persisted — an in-memory, module-level cached `Promise`
holding a `Map<topicId, string>` of raw markdown text, built once per
browser session (not `localStorage`/`sessionStorage`, per research.md
Decision 2's quota/size reasoning)

**Testing**: Vitest + React Testing Library + `@testing-library/user-event`,
matching existing suites under `frontend/tests/`

**Target Platform**: Browser SPA hosted on GitHub Pages (HashRouter); latest
Chrome, Edge, Firefox, Safari

**Project Type**: Single-project web frontend (existing `frontend/` app;
no backend involved)

**Performance Goals**: Title-match filtering remains synchronous and
unchanged (feature 009). The content index load is a one-time, lazy
`Promise.all` across ~4,200 statically-globbed markdown modules (~8.8MB raw
text total, largest menu `leet-code` at ~3,780 files), triggered only when
a user visits the search page and only fetched once per session; content
matching itself (substring filter over the resolved `Map`) is a cheap,
memoized, synchronous pass once the index is ready

**Constraints**: Must remain GitHub Pages/HashRouter-compatible (no new
routes); no new runtime dependencies; must not delay or block title-match
rendering (User Story 2); must not re-fetch the content index more than
once per session (FR-004); snippets rendered as plain text only (no HTML
injection risk, React auto-escapes)

**Scale/Scope**: 1 new data module (content index), 2 new hooks
(content-search results + a merge/de-dupe step), 1 new snippet utility, 1
updated page (`SearchResultsPage`) to merge+render both match types and a
loading indicator; no changes to `GlobalSearchBar`, no new routes

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Check | Result |
|-----------|-------|--------|
| I. Static Hosting First | No new routes/server dependency; content index is built entirely client-side from already-bundled static markdown via the existing Vite `import.meta.glob` mechanism | PASS |
| II. React Architecture and Purity | Content-index loading is a single justified Effect (external async resource fetch) inside a dedicated hook; title-match filtering stays a pure, synchronous `useMemo`; no render-time mutation | PASS |
| III. State Management Discipline | Content-index promise cached as a module-level singleton (not Context) since it has exactly one consumer (`SearchResultsPage`, via its hooks) — no cross-cutting sharing need, so Context would be unjustified per Principle III | PASS |
| IV. Feature-First Organization | All new code lives under `features/search/`; no changes to `features/main`'s content-loading code (research.md Decision 5) | PASS |
| V. UI System Consistency (MUI) | Loading indicator uses MUI `LinearProgress`/`CircularProgress` + `Typography`, consistent with existing `CircularProgress` usage in `TopicInfoPage`; snippet rendered via `Typography variant="body2"` | PASS |
| VI. Accessibility Baseline | Loading indicator has an accessible label (e.g. `aria-label="Loading more results"`); snippet text is plain, readable text with sufficient contrast via theme tokens; no new interactive controls introduced | PASS |
| VII. Quality Gates | New `ContentSearchStatus`/`ContentMatch` types added under strict mode; no lint/type exceptions planned | PASS |
| VIII. Automated Testing Policy | New tests for `getAllTopicContentIndex`, `extractContentSnippet`, `useContentSearchResults`, and extended `SearchResultsPage.test.tsx` covering merge/loading/snippet/de-dupe behavior | PASS |
| IX. Security and Configuration Hygiene | Snippet text is rendered through React (auto-escaped); no new persisted client storage; no secrets involved | PASS |
| X. Performance and Browser Support | Content index fetch is lazy (only on first search-page visit) and cached per session (not per keystroke, not on app boot), directly avoiding unnecessary work; title-match path is completely unaffected | PASS |
| XI. Constitution Governance | No amendment needed; plan follows existing binding principles | PASS |

No violations — Complexity Tracking section is not needed.

## Project Structure

### Documentation (this feature)

```text
specs/012-full-text-content-search/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md        # Phase 1 output (/speckit-plan command)
├── quickstart.md         # Phase 1 output (/speckit-plan command)
├── contracts/            # Phase 1 output (/speckit-plan command)
└── tasks.md              # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

### Source Code (repository root)

```text
frontend/
├── scripts/
│   └── generate-search-content-index.mjs   # NEW: build-time script, writes public/search/content-index.json
├── package.json                            # Extend: predev/prebuild run the generator script
├── public/
│   └── search/
│       └── content-index.json              # NEW: generated static asset (~9.5MB, markdownPath -> raw text), committed like public/diagrams/*.html
├── src/
│   ├── setupTests.ts                       # Extend: add a minimal IntersectionObserver test polyfill (mirrors the existing ResizeObserver one)
│   └── features/
│       └── search/
│           ├── data/
│           │   ├── getAllTopicContentIndex.ts   # NEW: fetches public/search/content-index.json once per session -> Map<topicId, rawMarkdown>
│           │   └── extractContentSnippet.ts     # NEW: pure substring-and-trim snippet utility
│           ├── hooks/
│           │   ├── useGlobalTopicSearch.ts       # UNCHANGED: existing synchronous title-match filter
│           │   └── useContentSearchResults.ts    # NEW: { status, matches, contentIndex } — precomputed-lowercase + useDeferredValue for typing performance
│           ├── model/
│           │   └── types.ts                      # Extend: add ContentSearchStatus, SearchResultEntry (topic+menu+optional snippet)
│           └── pages/
│               └── SearchResultsPage.tsx         # Merge title + content matches, de-dupe by topic id, render loading indicator + snippets
└── tests/
    ├── testUtils/
    │   └── stubContentIndexFetch.ts          # NEW: stubs global fetch with the real generated JSON (read from disk) for tests
    └── search/
        ├── getAllTopicContentIndex.test.ts       # NEW: builds correct id→text map, single fetch per session
        ├── extractContentSnippet.test.ts         # NEW: snippet extraction edge cases (start/end of string, no match, case-insensitivity)
        ├── useContentSearchResults.test.ts       # NEW: loading→ready transitions, filtering
        └── SearchResultsPage.test.tsx            # Extended: instant title match while content loads, merged+de-duped results, snippet rendering, loading indicator
```

**Structure Decision**: Single-project web frontend (existing `frontend/`
app). Per research.md Decision 1's measured correction, this feature also
introduces the project's first build-time generator script
(`scripts/generate-search-content-index.mjs`, wired via `predev`/
`prebuild`) producing one committed static asset
(`public/search/content-index.json`) — everything else is additive within
`features/search` (Constitution Principle IV); `features/main`'s
content-loading code (`TopicInfoPage.tsx`) and `GlobalSearchBar`/top
navigation are completely untouched. `SearchResultsPage.tsx` is the only
existing feature page modified. `src/setupTests.ts` also gained a small
`IntersectionObserver` test polyfill (mirroring the existing
`ResizeObserver` one) — a pre-existing test-environment gap that this
feature's larger result sets surfaced far more often; fixing it also
resolved two previously-failing, unrelated feature-009 tests as a side
effect.

## Complexity Tracking

*One accepted deviation, with measured justification — see research.md
Decision 1. A build-time generator script was not part of the original
plan; it was added only after two lazy runtime approaches were directly
measured (Playwright, real production `vite preview` builds) at 18-30
seconds, versus ~1.8 seconds for the static-asset approach. No other
violations.*
