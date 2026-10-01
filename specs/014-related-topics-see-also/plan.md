# Implementation Plan: Related Topics ("See Also")

**Branch**: `014-related-topics-see-also` | **Date**: 2026-09-30 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/014-related-topics-see-also/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command; its definition describes the execution workflow.

## Summary

Add a "Related Topics" section below every topic page's main content,
showing up to 5 other topics (from any menu area) that share the most
significant keywords with the current topic. Built entirely on feature
012's existing shared content index (`getAllTopicContentIndex`) — no new
content, tags, or manual curation. A new `features/related-topics` module
derives a session-cached `Map<topicId, Set<significantWord>>` once, scores
candidates by keyword-set intersection size, and exposes a
`useRelatedTopics(topic)` hook with its own independent loading state so
the topic page's main content is never delayed by the shared index's
~1.8s first-load cost.

## Technical Context

**Language/Version**: TypeScript 5.x (strict mode) with React 19

**Primary Dependencies**: MUI v7; no new runtime dependencies

**Storage**: None new — reuses feature 012's existing static
`public/search/content-index.json` asset and its session-cached fetch;
the derived keyword index is a second, similarly session-cached in-memory
value, never persisted

**Testing**: Vitest + React Testing Library

**Target Platform**: Browser SPA hosted on GitHub Pages (HashRouter); latest
Chrome, Edge, Firefox, Safari

**Project Type**: Single-project web frontend (existing `frontend/` app)

**Performance Goals**: The shared content-index fetch is unchanged from
feature 012 (~1.8s, once per session, already lazy). Deriving the keyword
index from it is a single additional pass over the same in-memory data,
done once and cached; per-topic-view scoring is a bounded set-intersection
over already-derived, typically small per-topic word sets — not a
per-keystroke or per-render cost

**Constraints**: Must never block or delay `TopicInfoPage`'s existing main
content rendering (Decision 6); must not introduce a new runtime
dependency for keyword extraction (Decision 4); relatedness scoring must
remain simple/deterministic/testable (Decision 3)

**Scale/Scope**: 1 new small feature folder (`features/related-topics`),
1 new section component rendered from the existing `TopicInfoPage`, no new
routes, no new persisted storage

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Check | Result |
|-----------|-------|--------|
| I. Static Hosting First | Reuses the existing static `content-index.json` asset; no server dependency; no new routes | PASS |
| II. React Architecture and Purity | `useRelatedTopics` mirrors `useContentSearchResults`'s existing, already-justified async-effect + derived-`useMemo` pattern; no render-time mutation | PASS |
| III. State Management Discipline | No new Context — `useRelatedTopics` is a local hook per `TopicInfoPage` render; the keyword index is a module-level cache (data layer), not component state | PASS |
| IV. Feature-First Organization | New `features/related-topics` feature depends on `features/search`'s existing exported data functions, consistent with the flashcards feature's precedent of depending on `features/main`'s extracted exports | PASS |
| V. UI System Consistency (MUI) | Section uses MUI `Typography`/`Stack`/`Chip`/`CircularProgress`, consistent with the existing loading-indicator pattern from `SearchResultsPage` | PASS |
| VI. Accessibility Baseline | Related topic entries are labeled, keyboard-operable links/buttons; loading and no-results states are plain readable text | PASS |
| VII. Quality Gates | New types/functions added under strict mode | PASS |
| VIII. Automated Testing Policy | New tests for `extractSignificantWords`, `getRelatedTopicsKeywordIndex`, `useRelatedTopics`, and `RelatedTopicsSection`/`TopicInfoPage` integration | PASS |
| IX. Security and Configuration Hygiene | No new persisted client storage; reuses the existing static asset; topic titles/labels rendered through React (auto-escaped) | PASS |
| X. Performance and Browser Support | Keyword index derived once, session-cached; main content load path completely unchanged/unaffected | PASS |
| XI. Constitution Governance | No amendment needed | PASS |

No violations — Complexity Tracking section is not needed.

## Project Structure

### Documentation (this feature)

```text
specs/014-related-topics-see-also/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
└── tasks.md
```

### Source Code (repository root)

```text
frontend/
├── src/
│   └── features/
│       ├── related-topics/                          # NEW feature
│       │   ├── data/
│       │   │   ├── extractSignificantWords.ts        # pure: text -> Set<significant word>
│       │   │   └── getRelatedTopicsKeywordIndex.ts    # session-cached: awaits getAllTopicContentIndex(), derives Map<topicId, Set<word>>
│       │   ├── hooks/
│       │   │   └── useRelatedTopics.ts                # { status, relatedTopics: SearchableTopic[] } for a given topic
│       │   └── components/
│       │       └── RelatedTopicsSection.tsx           # renders loading / list / no-results states
│       └── main/
│           └── pages/
│               └── TopicInfoPage.tsx                  # Render <RelatedTopicsSection topic={topic} menuSlug={menuSlug} /> below main content
└── tests/
    └── related-topics/
        ├── extractSignificantWords.test.ts
        ├── getRelatedTopicsKeywordIndex.test.ts
        ├── useRelatedTopics.test.ts
        └── RelatedTopicsSection.test.tsx
```

**Structure Decision**: Single-project web frontend. All new logic lives in
a new `features/related-topics` feature, depending only on `features/search`'s
already-exported `getAllTopicContentIndex`/`getAllSearchableTopics` (no
changes needed to `features/search` itself). `TopicInfoPage.tsx` gains one
new, additive rendered component below its existing content; its own
main-content loading logic is untouched.

## Complexity Tracking

*No violations — this section is not applicable.*
