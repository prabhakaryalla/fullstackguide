# Quickstart: Topic Bookmarks Validation

1. Open a topic page, activate the bookmark star — verify it fills in and
   `aria-pressed="true"`; reload — verify it's still bookmarked.
2. Open that menu's topic list — verify the same topic's card shows a filled
   bookmark star; click it there — verify it unbookmarks (card does not
   navigate).
3. Bookmark topics in two different menus; open `/bookmarks` (via the top
   navigation bookmark icon) — verify both appear.
4. Remove a bookmark from `/bookmarks` — verify it disappears from the list
   immediately.
5. With zero bookmarks, open `/bookmarks` — verify the empty-state message.

Automated tests: `frontend/tests/bookmarks/BookmarkContext.test.tsx`,
`frontend/tests/bookmarks/BookmarksPage.test.tsx`, extended `TopicCard`
coverage in `tests/main/TopicList.test.tsx`, extended
`tests/main/TopicInfoPage.test.tsx`.
