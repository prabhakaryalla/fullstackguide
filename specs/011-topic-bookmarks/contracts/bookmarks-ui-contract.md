# UI Contract: Topic Bookmarks

## Bookmark control (topic card and topic content page)

1. Renders a star icon button; unbookmarked = outline star, bookmarked =
   filled star; `aria-pressed` reflects state; accessible name toggles
   between "Bookmark this topic" / "Remove bookmark".
2. On a `TopicCard`, clicking the star does not navigate to the topic.
3. Reversible; persists across reload.

## Bookmarks page (`/bookmarks`)

1. Lists every bookmarked topic across all menus (title + menu label +
   complexity), reusing `TopicList`/`TopicCard`.
2. Empty state message when there are no bookmarks.
3. Selecting a topic navigates to its content page.
4. Un-bookmarking from this page removes it from the list immediately.

## Out of scope

- No bookmark folders, tags, or notes.
- No cross-device sync.
