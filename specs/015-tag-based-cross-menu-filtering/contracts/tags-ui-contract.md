# UI Contract: Tag-Based Cross-Menu Filtering

See [data-model.md](../data-model.md) for the state model and
[research.md](../research.md) for implementation decisions.

## Top navigation entry point

1. A labeled "Browse by Tags" icon/button is visible in the top navigation
   on every page (desktop and mobile), mirroring the existing Bookmarks
   entry point's placement and behavior.
2. Selecting it navigates to `/tags`.
3. The mobile navigation drawer also lists a "Browse by Tags" entry
   alongside "My Bookmarks".

## Tags index page (`/tags`)

1. **Loading state** — while tag data is being computed, a clear loading
   indicator is shown instead of an empty/broken list.
2. **Populated state** — every defined tag is listed with its current
   topic count (for example, "Caching (12)").
3. **Selecting a tag** navigates to `/tags/:tagId`.

## Tag topic list page (`/tags/:tagId`)

1. **Loading state** — a clear loading indicator is shown while computing.
2. **Populated state** — every topic (from any menu area) carrying this
   tag is listed, each showing its title and owning menu label (same
   presentation as the existing global search results list).
3. **No matches** — a clear "No topics found for this tag" message is
   shown instead of an empty list.
4. **Selecting a topic** navigates to that topic's own content page.
5. **Unknown tag id** (for example, a stale/mistyped URL) shows a clear
   "Tag not found" state rather than a blank/broken page.

## Topic content page — own tags

1. If the current topic matches one or more tags, they are shown as
   individually selectable chips near the top of the page.
2. Selecting a tag chip navigates to `/tags/:tagId` for that tag.
3. If the topic matches no tags, no tag chips are shown at all — the rest
   of the page is unaffected.
4. Tag chips are reachable via Tab and activatable via Enter/Space.

## Menu topic-list cards — tag indicators

1. If a topic card matches one or more tags, they are shown as plain,
   non-interactive indicators on the card (visually similar to the
   existing complexity badge), without affecting the card's existing
   click-to-open behavior.
2. If a topic card matches no tags, no tag indicators are shown.
3. Tag indicators on a card are never independently focusable/clickable —
   selecting anywhere on the card opens the topic itself, unchanged from
   today.

## Out of scope

- No tag-based filter control added to the existing per-menu topic list
  page itself.
- No manual tag editing/curation UI.
- No "why was this tagged" explanation shown anywhere.
