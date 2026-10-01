# Data Model: Topic Bookmarks

## Entity: BookmarkState *(persisted)*

`Record<string, true>` under `localStorage` key
`fullstack-guide.topic-bookmarks.v1`, keyed by `` `${menuId}/${slug}` ``.
Identical read/write/guard rules as feature 010's `ProgressState`.

## Entity: BookmarkContextValue *(in-memory, Context)*

| Field | Type | Description |
|-------|------|--------------|
| `isBookmarked` | `(menuId, slug) => boolean` | Lookup |
| `toggleBookmark` | `(menuId, slug) => void` | Add/remove the key, reversible |

## Entity: BookmarkedTopic *(derived, not persisted)*

Produced by filtering `getAllSearchableTopics()` (feature 009) down to
entries where `isBookmarked(menuId, topic.slug)` is `true`. Same shape as
`SearchableTopic` (`{ topic, menuId, menuLabel }`). Excludes stale slugs
automatically since it's derived from currently-existing topics.
