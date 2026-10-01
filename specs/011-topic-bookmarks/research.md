# Research: Topic Bookmarks

## Decision 1: Reuse feature 010's Context + versioned localStorage pattern verbatim

Same shape (`Record<"menuId/slug", true>`), same read/write guard helpers,
same "derive at render, never store counts" approach. No new pattern needed;
consistency with an already-reviewed precedent reduces risk.

## Decision 2: The bookmark star on `TopicCard` must stop click propagation

`TopicCard`'s entire surface is a `CardActionArea` that navigates on click
(FR-002 requires the bookmark control NOT to navigate). The star `IconButton`
calls `event.stopPropagation()` in its `onClick` before toggling, so a click
on the star never reaches the parent `CardActionArea`'s navigation handler.

## Decision 3: A new page + a new top-navigation icon action, not a nav menu item

Bookmarks aren't a menu/topic area, so it doesn't belong in `TopMenuItems`.
A dedicated `IconButton` (like `ThemeToggleAction`) next to the theme toggle
on desktop, and a `ListItemButton` entry in the mobile drawer, both
navigating to `/bookmarks`, keeps discovery consistent with existing
navigation patterns without overloading the menu list.

## Decision 4: Bookmarks list reuses `getAllSearchableTopics()` from feature 009

Rather than writing a second "flatten all menus' topics" function, the
bookmarks page filters the existing `features/search/data/getAllSearchableTopics.ts`
output down to bookmarked entries — avoiding duplicate flattening logic
across two features.
