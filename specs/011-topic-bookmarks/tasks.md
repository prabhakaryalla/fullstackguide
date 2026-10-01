# Tasks: Topic Bookmarks

**Input**: [plan.md](plan.md), [spec.md](spec.md), [research.md](research.md), [data-model.md](data-model.md), [contracts/bookmarks-ui-contract.md](contracts/bookmarks-ui-contract.md), [quickstart.md](quickstart.md)

- [x] T001 Create `frontend/src/features/bookmarks/model/types.ts` (`BookmarkState`, `BookmarkContextValue`)
- [x] T002 Create `frontend/src/features/bookmarks/data/bookmarkStorage.ts` (`PROGRESS`-style read/write guard, key `fullstack-guide.topic-bookmarks.v1`)
- [x] T003 Create `frontend/src/features/bookmarks/context/BookmarkContext.tsx` (`BookmarkProvider`, `toggleBookmark`, `isBookmarked`)
- [x] T004 Create `frontend/src/features/bookmarks/hooks/useBookmarks.ts`
- [x] T005 Create `frontend/src/features/bookmarks/hooks/useAllBookmarkedTopics.ts` (filters `getAllSearchableTopics()`)
- [x] T006 Create `frontend/tests/bookmarks/BookmarkContext.test.tsx` (toggle, persistence, stale-slug exclusion)
- [x] T007 Mount `BookmarkProvider` in `frontend/src/app/providers/AppProviders.tsx`; update `frontend/tests/main/renderWithRouter.tsx`
- [x] T008 Add bookmark star `IconButton` to `frontend/src/features/main/components/TopicCard.tsx` (stopPropagation)
- [x] T009 Add bookmark toggle to `frontend/src/features/main/pages/TopicInfoPage.tsx`
- [x] T010 Create `frontend/src/features/bookmarks/pages/BookmarksPage.tsx` + add `/bookmarks` route in `frontend/src/app/router/AppRouter.tsx`
- [x] T011 Add bookmarks nav icon to `frontend/src/features/landing/components/LandingNavigationBar.tsx` and a drawer entry in `MobileNavigationDrawer.tsx`
- [x] T012 Create `frontend/tests/bookmarks/BookmarksPage.test.tsx`
- [x] T013 Extend `frontend/tests/main/TopicList.test.tsx`/`TopicInfoPage.test.tsx` for the new bookmark controls
- [x] T014 Run lint/build/full test suite; fix any regressions
