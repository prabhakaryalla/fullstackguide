# Implementation Plan: Tag-Based Cross-Menu Filtering

**Branch**: `015-tag-based-cross-menu-filtering` | **Date**: 2026-09-30 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/015-tag-based-cross-menu-filtering/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command; its definition describes the execution workflow.

## Summary

Add a small, curated set of ~18 cross-cutting tags (Caching, Security,
Concurrency, etc.), automatically associated with topics by matching each
tag's single-word trigger keywords against feature 014's existing
per-topic significant-word index (itself built on feature 012's content
index) — no manual tagging, no new expensive text processing. A new
"Browse by Tags" page (`/tags`) lists every tag with its topic count; each
tag has its own cross-menu topic list page (`/tags/:tagId`), reusing the
existing `TopicList`/menu-label pattern from the search feature. Topic
detail pages show their own tags as clickable chips (pivoting into the tag
page); menu topic-list cards show the same tags as plain, non-interactive
indicators.

## Technical Context

**Language/Version**: TypeScript 5.x (strict mode) with React 19

**Primary Dependencies**: MUI v7; no new runtime dependencies

**Storage**: None new — reuses feature 012's static content-index asset and
feature 014's derived keyword index (both already session-cached); the new
tag index is a third similarly session-cached in-memory derived value,
never persisted

**Testing**: Vitest + React Testing Library

**Target Platform**: Browser SPA hosted on GitHub Pages (HashRouter); latest
Chrome, Edge, Firefox, Safari

**Project Type**: Single-project web frontend (existing `frontend/` app)

**Performance Goals**: Tag matching is `O(tags × keywords)` `Set.has()`
checks per topic against an already-derived, already-cached word set — no
new text scanning; expected to be fast (well under the ~1.8s one-time cost
already paid for the underlying content index, which this feature does not
add to)

**Constraints**: Tag definitions must use single significant words only
(Decision 4) so the existing feature 014 index can be reused verbatim;
card-level tag indicators must remain non-interactive (Decision 5); no
page's primary content may be delayed by tag computation (mirrors features
012/014's established independent-loading-state pattern)

**Scale/Scope**: 1 new small feature folder (`features/tags`), 2 new
routes, 1 new top-nav icon + drawer entry, additive changes to
`TopicCard`/`TopicList` (optional tags prop) and `TopicInfoPage` (tag chips)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Check | Result |
|-----------|-------|--------|
| I. Static Hosting First | Two new routes inside the existing `AppShell`/`HashRouter`; no server dependency; reuses the existing static content-index asset | PASS |
| II. React Architecture and Purity | `useTopicTags`/`useTopicsByTag`/`useAllTagsWithCounts` mirror the existing async-effect + derived-`useMemo` pattern from `useContentSearchResults`/`useRelatedTopics`; no render-time mutation | PASS |
| III. State Management Discipline | No new Context — hooks are local per component; the tag index is a module-level data-layer cache, not component/app state | PASS |
| IV. Feature-First Organization | New `features/tags` feature depends on `features/related-topics`'s existing exported `getRelatedTopicsKeywordIndex`, consistent with the established cross-feature-dependency precedent (013 → main, 014 → search, now 015 → related-topics) | PASS |
| V. UI System Consistency (MUI) | Tag pages reuse existing `TopicList`/`Chip`/`CircularProgress` patterns; nav icon mirrors `BookmarksNavAction` exactly | PASS |
| VI. Accessibility Baseline | Tag chips (detail page, tags index) are labeled, keyboard-operable; card-level indicators are plain readable text/Chip (non-interactive, no false affordance) | PASS |
| VII. Quality Gates | New types/functions added under strict mode | PASS |
| VIII. Automated Testing Policy | New tests for `tagDefinitions`/`getTopicTagsIndex`/`useTopicTags`/`useTopicsByTag`/`useAllTagsWithCounts`/`TagsIndexPage`/`TagTopicsPage`/`TagChipList`, plus extended `TopicInfoPage`/`TopicCard`/`TopicList`/`LandingNavigationBar`/`MobileNavigationDrawer` tests | PASS |
| IX. Security and Configuration Hygiene | No new persisted client storage; tag labels/topic titles rendered through React (auto-escaped) | PASS |
| X. Performance and Browser Support | Tag index derived once per session from already-cached data; no new heavy computation; card-level rendering unaffected until tags are ready (chips simply appear once available) | PASS |
| XI. Constitution Governance | No amendment needed | PASS |

No violations — Complexity Tracking section is not needed.

## Project Structure

### Documentation (this feature)

```text
specs/015-tag-based-cross-menu-filtering/
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
│   ├── app/router/AppRouter.tsx                       # Add /tags and /tags/:tagId routes (lazy-loaded)
│   └── features/
│       ├── tags/                                       # NEW feature
│       │   ├── data/
│       │   │   ├── tagDefinitions.ts                    # TAG_DEFINITIONS: {id,label,keywords}[] (Decisions 2,4)
│       │   │   └── getTopicTagsIndex.ts                  # session-cached Map<topicId, tagId[]>, built on getRelatedTopicsKeywordIndex()
│       │   ├── hooks/
│       │   │   ├── useTopicTags.ts                       # { status, tagIds } for one topic (card/detail display)
│       │   │   ├── useTopicsByTag.ts                     # { status, topics: SearchableTopic[] } for one tag's cross-menu list
│       │   │   └── useAllTagsWithCounts.ts               # { status, tags: {id,label,count}[] } for the tags index page
│       │   ├── components/
│       │   │   └── TagChipList.tsx                       # renders tag chips; optional onTagClick (interactive vs plain)
│       │   └── pages/
│       │       ├── TagsIndexPage.tsx                     # route /tags
│       │       └── TagTopicsPage.tsx                     # route /tags/:tagId
│       ├── landing/components/
│       │   ├── TagsNavAction.tsx                          # NEW: icon button mirroring BookmarksNavAction, navigates to /tags
│       │   ├── LandingNavigationBar.tsx                   # Render <TagsNavAction /> next to <BookmarksNavAction /> (desktop + mobile)
│       │   └── MobileNavigationDrawer.tsx                 # Add a "Browse by Tags" entry next to "My Bookmarks"
│       └── main/
│           ├── components/
│           │   ├── TopicCard.tsx                          # Add optional `tags?: string[]` prop → plain Chip row (Decision 5)
│           │   └── TopicList.tsx                          # Add optional `getTags?: (topic) => string[] | undefined` pass-through
│           └── pages/
│               ├── MainPage.tsx                           # Pass getTags to TopicList (User Story 3)
│               └── TopicInfoPage.tsx                      # Render <TagChipList> (interactive) near the top of the page (User Story 2)
└── tests/
    └── tags/
        ├── tagDefinitions.test.ts
        ├── getTopicTagsIndex.test.ts
        ├── useTopicTags.test.ts
        ├── useTopicsByTag.test.ts
        ├── useAllTagsWithCounts.test.ts
        ├── TagChipList.test.tsx
        ├── TagsIndexPage.test.tsx
        └── TagTopicsPage.test.tsx
```

**Structure Decision**: Single-project web frontend. All new logic lives in
a new `features/tags` feature, depending only on `features/related-topics`'s
already-exported `getRelatedTopicsKeywordIndex` (no changes needed there).
Touches to existing files are additive: two new routes, one new nav icon +
drawer entry, one new optional prop each on `TopicCard`/`TopicList`, and one
new rendered component on `TopicInfoPage`/`MainPage`.

## Complexity Tracking

*No violations — this section is not applicable.*
