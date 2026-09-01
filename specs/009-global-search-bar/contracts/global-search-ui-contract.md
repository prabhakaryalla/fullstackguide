# UI Contract: Global Search Bar

Describes the observable behavior of the Global Search bar and the search
results page, for use by tests and manual validation. See
[data-model.md](../data-model.md) for the underlying state model and
[research.md](../research.md) for implementation decisions.

## Global Search bar (top navigation)

Rendered inside the top navigation (`role="banner"`), positioned after the
title button ("Fullstack Guide") and before the menu navigation
(`aria-label="Topic navigation"`), on every route.

1. **Default (expanded) state** — On any route other than `/search`, the
   Global Search bar renders as a labeled text input (accessible name, e.g.
   "Search topics") plus a search icon/button; it starts empty on first
   render.
2. **Submit with a non-empty keyword** — Pressing Enter in the input, or
   activating the search icon/button, while the (trimmed) input is
   non-empty, navigates to `/search?q=<keyword>` and clears the input.
3. **Submit with an empty/whitespace-only keyword** — Pressing Enter or
   activating the search icon/button MUST NOT navigate, and the input's
   current value is left unchanged.
4. **Collapsed state on the search results page** — While the current route
   is `/search`, the Global Search bar renders only a search icon/button
   (labeled, e.g. "Open global search"); no text input and no leftover
   keyword are visible, even if a keyword was just submitted.
5. **Re-expand from collapsed** — Selecting the collapsed search icon while
   on `/search` reveals the text input again (starts empty), so the user can
   start a new global search without leaving the page.
6. **Submitting again while on `/search`** — Submitting a new non-empty
   keyword from the re-expanded input (per #5) navigates to
   `/search?q=<new keyword>` (replacing the current results) and the Global
   Search bar returns to its collapsed icon-only state.
7. **Leaving the search results page** — Navigating away from `/search` to
   any other route returns the Global Search bar to its default expanded,
   empty-input state (#1).
8. **Keyboard operability** — The input is reachable via Tab, accepts typed
   text, and Enter submits exactly like activating the search icon/button;
   the icon/button itself is a focusable, activatable control with an
   accessible name.

## Search results page (`/search`)

1. **Route** — `/search`, rendered inside the same shared top-navigation
   shell as every other page (`AppShell`), reachable only via the Global
   Search bar's submit action (no link to it exists elsewhere in the app).
2. **Initial keyword** — On load, the page's own search bar is pre-filled
   with the `q` query parameter's value (the keyword just submitted from the
   Global Search bar, or whatever `q` value is present on a direct/ reloaded
   URL).
3. **Results list** — Below the page's own search bar, every topic from
   every menu area whose title contains the current keyword
   (case-insensitive, substring match) is listed, with no pagination or
   maximum count; menu area is not used to filter or exclude any match.
4. **Empty state** — If no topic's title matches the current keyword (for
   example, keyword is empty after the user clears the page's own search
   bar, or it matches nothing), a clear "no results" message is shown instead
   of an empty list.
5. **Editing the keyword in place** — Typing in the page's own search bar
   updates the results list to match the new keyword immediately (no submit
   button needed on this page) and keeps the `q` query parameter in sync
   (replacing, not pushing, browser history) so a reload preserves the
   latest keyword.
6. **Selecting a result** — Choosing any topic in the results list navigates
   to that topic's content page (`/${menuId}/${topicSlug}`), identical to
   selecting a topic from a per-menu topic list.
7. **Reload behavior** — Reloading the browser while on `/search?q=<keyword>`
   restores the same keyword and the same results, with the Global Search bar
   in its collapsed icon-only state (per Global Search bar rule #4).

## Out of scope

- No search history, recent searches, or autocomplete/typeahead suggestions
  while typing in the Global Search bar.
- No complexity filter or menu-area filter on the search results page —
  only title-keyword matching, across all menus.
- No visual indication, on the results list itself, of which menu area each
  result belongs to (see [research.md](../research.md) Decision 6).
