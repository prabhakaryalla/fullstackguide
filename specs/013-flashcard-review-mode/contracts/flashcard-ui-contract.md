# UI Contract: Flashcard Quick-Review Mode

See [data-model.md](../data-model.md) for the session state model and
[research.md](../research.md) for implementation decisions.

## Entry point (menu topic-list page)

1. **Visible only for eligible menus** — a labeled "Flashcards" control
   appears on the topic list page only for `csharp-programs`,
   `javascript-programs`, and `sql-programs`; it does not render at all for
   any other menu.
2. **Disabled when the filtered list is empty** — if the current
   search/complexity filter produces zero visible topics, the control is
   disabled (not hidden), so it's discoverable but cannot start a broken
   session.
3. **Carries the current filter** — activating it navigates to
   `/${menuSlug}/flashcards`, carrying the current search keyword and
   complexity filter as query parameters when they're not at their default
   values.

## Flashcard session page (`/:menuSlug/flashcards`)

1. **Ineligible/unknown menu guard** — visiting this route directly for a
   menu outside the eligible set (or an unknown menu) shows an
   unavailable state, not a broken card.
2. **Card front** — each card shows only the topic's title; its content is
   hidden, with a labeled "Show Answer" control.
3. **Reveal** — activating "Show Answer" renders the topic's full existing
   markdown content (identical to the topic detail page: code blocks,
   mermaid diagrams, Archify embeds, tables) in place, plus two labeled
   rating controls: "Got it" and "Still learning".
4. **Next / Previous** — labeled controls move forward/back through the
   session's topics, in the same order as the filtered list; the newly
   shown card always starts with its content hidden again, regardless of
   whether it was previously revealed in this same session.
5. **Rating** — selecting "Got it" marks that topic complete via the
   existing progress feature and advances to the next card; selecting
   "Still learning" leaves completion state unchanged and advances to the
   next card. Both are only available once a card is revealed.
6. **Session complete** — advancing past the last card shows a clear
   "You've reviewed every card" (or equivalent) state, with a labeled
   control to return to the menu's topic list — not a blank/broken card.
7. **Exit** — a labeled control is available at all times to leave the
   session and return to the menu's topic list.
8. **Keyboard operability** — every control (Show Answer, Next, Previous,
   Got it, Still learning, Exit) is reachable via Tab and activatable via
   Enter/Space.

## Out of scope

- No shuffle/random order — session order always matches the filtered
  topic list's existing order.
- No session-position persistence across reloads — reloading restarts at
  the first card (the URL's filter parameters are the only thing that
  survives a reload).
- No spaced-repetition scheduling or multi-session history.
