# UI Contract: Full-Text Content Search

Describes the observable behavior added to the search results page
(`/search`, feature 009) by content-body matching. See
[data-model.md](../data-model.md) for the underlying state model and
[research.md](../research.md) for implementation decisions.

## Title matches (unchanged from feature 009)

1. Typing a keyword that matches one or more topic titles shows those
   results immediately, exactly as before — this feature does not change
   or delay that behavior in any way (FR-002, User Story 2).

## Content-body matches (new)

1. **Loading state** — On the first visit to `/search` in a browser
   session, while the content index has not yet finished loading, a small,
   unobtrusive, labeled loading indicator (for example, "Loading more
   results…") is shown near the results list, alongside any already-visible
   title matches. It is not a full-page blocking spinner and does not hide
   title matches.
2. **Content match appears** — Once the content index finishes loading, any
   topic whose body content contains the current keyword (case-insensitive)
   that is NOT already shown as a title match appears in the results list,
   with a short plain-text snippet beneath its title showing surrounding
   matched text.
3. **No duplicate rows** — A topic that matches both by title and by body
   content appears exactly once, in its title-match form (no snippet), never
   twice (FR-006).
4. **Session caching** — Navigating away from `/search` and back again
   within the same browser session does not re-show the loading indicator
   (the content index is already cached, per FR-004) — content matches
   appear immediately alongside title matches on the second and later
   visits.
5. **Keyword changes while ready** — Once the content index has loaded,
   editing the keyword updates both title and content matches together,
   with no additional loading indicator.
6. **No results** — If neither title nor content matching produces any
   result once the content index is ready, the existing "no results"
   empty state (feature 009) is shown.
7. **Unbounded results** — No pagination or maximum result count is applied
   to the merged list (FR-009), consistent with feature 009.

## Out of scope

- No change to the Global Search bar in the top navigation — it still only
  carries the keyword to `/search` via the `q` query parameter.
- No search result ranking/relevance ordering — matches are shown in the
  same unordered fashion as feature 009, now simply with more of them.
- No highlighting of the matched keyword within the snippet text (plain
  text only, no partial bolding/marking).
