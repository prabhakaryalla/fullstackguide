# UI Contract: Related Topics ("See Also")

See [data-model.md](../data-model.md) for the state model and
[research.md](../research.md) for implementation decisions.

## Related Topics section (topic content page)

1. **Always present** — every topic content page shows a "Related Topics"
   heading below the main content, regardless of loading state.
2. **Loading state** — while `useRelatedTopics(topic).status === 'loading'`,
   a small, labeled loading indicator (for example, "Finding related
   topics…") is shown in place of the list; the main topic content above it
   is fully rendered and interactive already, unaffected.
3. **Populated state** — once ready with at least one match, up to 5
   related topic entries are shown, each displaying the related topic's
   title and its owning menu's label (for example, "Azure" or "System
   Design"), so a cross-menu suggestion is clearly identifiable as coming
   from a different area.
4. **Selecting an entry** — activating a related topic entry navigates to
   that topic's own content page (`/${menuId}/${slug}`).
5. **No-results state** — if ready with zero matches, a clear "No related
   topics found" message is shown instead of an empty list.
6. **Never self-referential** — the current topic itself never appears in
   its own related topics list, in any state.
7. **Keyboard operability** — every related topic entry is reachable via
   Tab and activatable via Enter/Space.

## Out of scope

- No manual "not relevant"/hide feedback on individual suggestions.
- No personalization based on the viewing user's bookmarks/progress.
- No explanation of *why* two topics are related (no shown keyword list).
