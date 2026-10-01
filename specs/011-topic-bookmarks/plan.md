# Implementation Plan: Topic Bookmarks

**Branch**: `011-topic-bookmarks` | **Date**: 2026-09-30 | **Spec**: [spec.md](spec.md)

## Summary

Add a `features/bookmarks` module mirroring feature 010's progress-tracking
architecture: a `BookmarkProvider` Context backed by one versioned
`localStorage` key (`fullstack-guide.topic-bookmarks.v1`, shape
`Record<"<menuId>/<slug>", true>`), mounted in `AppProviders` alongside
`TopicProgressProvider`. A bookmark toggle (star icon) is added to
`TopicCard` (with click-propagation stopped so it doesn't trigger card
navigation) and to `TopicInfoPage` (next to the mark-as-complete control). A
new `/bookmarks` route lists every bookmarked topic across menus, reusing
`TopicList`/`TopicCard`, reachable via a new icon button in the top
navigation (desktop `LandingNavigationBar` and the mobile drawer).

## Technical Context

Same as feature 010: TypeScript 5.x/React 19, MUI v7, no new dependencies,
`localStorage` only, Vitest + RTL, GitHub Pages/HashRouter SPA.

## Constitution Check

| Principle | Result |
|-----------|--------|
| I. Static Hosting First | New `/bookmarks` route inside existing `AppShell`; no server dependency | PASS |
| II. React Purity | Context state updated only via explicit toggle handlers; derived list computed in `useMemo` | PASS |
| III. State Management | Context justified — cross-cutting concern shared by `TopicCard`, `TopicInfoPage`, and the new bookmarks page | PASS |
| IV. Feature-First Org | New `features/bookmarks`; additive touches only to `TopicCard`, `TopicList` (already has an extension point pattern from 010), `TopicInfoPage`, `LandingNavigationBar`, `MobileNavigationDrawer`, `AppRouter`, `AppProviders` | PASS |
| V. UI Consistency (MUI) | `IconButton`/`ToggleButton` with `BookmarkIcon`/`BookmarkBorderIcon`, consistent with existing icon-action patterns (`ThemeToggleAction`) | PASS |
| VI. Accessibility | `aria-pressed` + accessible name on every bookmark control; bookmarks page keyboard-operable | PASS |
| VII. Quality Gates | Strict TS; no lint exceptions | PASS |
| VIII. Testing | New `BookmarkContext.test.tsx`, `BookmarksPage.test.tsx`; extended `TopicCard`/`TopicInfoPage`/nav tests | PASS |
| IX. Security/Config | Versioned key, safe parse/guard (same helper pattern as `progressStorage.ts`) | PASS |
| X. Performance | Trivial in-memory filtering of already-loaded topic arrays | PASS |
| XI. Governance | No amendment needed | PASS |

## Project Structure

```text
frontend/src/features/bookmarks/
├── model/types.ts                 # BookmarkState, BookmarkContextValue
├── data/bookmarkStorage.ts         # PROGRESS_STORAGE_KEY-style read/write helpers
├── context/BookmarkContext.tsx     # BookmarkProvider: toggleBookmark, isBookmarked
├── hooks/useBookmarks.ts           # useBookmarks() context accessor
├── hooks/useAllBookmarkedTopics.ts # Flattens getTopicConfigMap() + bookmark set → SearchableTopic-like list
└── pages/BookmarksPage.tsx         # /bookmarks route

Touched (additive):
frontend/src/app/providers/AppProviders.tsx        # mount BookmarkProvider
frontend/src/app/router/AppRouter.tsx              # add /bookmarks route
frontend/src/features/main/components/TopicCard.tsx        # bookmark star toggle
frontend/src/features/main/pages/TopicInfoPage.tsx          # bookmark toggle near mark-complete
frontend/src/features/landing/components/LandingNavigationBar.tsx   # bookmarks nav icon (desktop)
frontend/src/features/landing/components/MobileNavigationDrawer.tsx # bookmarks nav entry (mobile)
```

**Structure Decision**: Mirrors feature 010's proven pattern exactly (Context
+ versioned localStorage + derived-at-render summaries), so no new
architectural decisions are required — see [research.md](research.md) for
the few bookmark-specific deltas (star toggle needs click-propagation
stopped since it lives inside a clickable `TopicCard`).
