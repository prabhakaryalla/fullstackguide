# Research: Global Search Bar

## Decision 1: New `features/search` feature owns cross-menu search; `features/landing` and `features/main` stay read-only dependencies

- **Decision**: Introduce a new `frontend/src/features/search/` feature
  (data, hooks, model, pages) that depends on the existing
  `getTopicConfigMap()` (`features/main/data/getMenuTopicSource.ts`) and
  `getSortedMenuItems()` (`features/landing/data/getSortedMenuItems.ts`) to
  build a flattened, cross-menu list of searchable topics. Neither dependency
  is modified.
- **Rationale**: Both functions already return everything needed (all topics
  per menu id; menu id → label mapping) without any shape changes, so the new
  feature can be purely additive — satisfying Constitution Principle IV
  (Feature-First Organization) by keeping this feature's blast radius inside
  a new `features/search` folder plus one small, additive wiring change in
  `features/landing` (the Global Search bar itself) and `app/router`
  (the new route).
- **Alternatives considered**: Adding cross-menu search logic directly inside
  `features/main` was rejected because search is a distinct, independently
  testable capability (per the spec's independent-test criteria for each user
  story), not a per-menu concern; folding it into `features/main` would blur
  that boundary for no benefit.

## Decision 2: The Global Search bar lives in `features/landing`, rendered between title and menu items in `LandingNavigationBar`

- **Decision**: A new `GlobalSearchBar.tsx` component is added to
  `features/landing/components/`, and `LandingNavigationBar.tsx` renders it
  between the existing title button ("Fullstack Guide") and `TopMenuItems`,
  matching FR-001's required position.
- **Rationale**: `LandingNavigationBar` already owns the top navigation's
  layout (title, menu items, theme toggle) inside `features/landing`; adding
  the search bar there keeps all top-navigation-bar concerns in one feature,
  consistent with how `ThemeToggleAction` is already placed.
- **Alternatives considered**: Placing the Global Search bar in
  `app/layout/AppShell.tsx` directly was rejected because `AppShell` only
  wires routed pages to `LandingNavigationBar`; it does not otherwise own
  top-navigation-bar markup, and duplicating that ownership would fragment
  the existing pattern.

## Decision 3: A single, non-history-spamming query parameter (`q`) on a new `/search` route carries the keyword

- **Decision**: Add `<Route path="/search" element={<SearchResultsPage />} />`
  inside the existing `AppShell` route (so the shared top navigation renders
  on it, per FR-001/FR-009). The keyword is carried as `?q=<value>` and read
  with `useSearchParams()`. The results page's own search bar updates the `q`
  parameter via `setSearchParams({ q: value }, { replace: true })` on every
  edit, so a reload keeps the current keyword (per the spec's Edge Cases)
  without flooding browser history with one entry per keystroke.
- **Rationale**: A URL query parameter is the simplest mechanism that
  satisfies "keyword persists on reload" and "keyword is shareable" without
  introducing any new client persistence (localStorage/sessionStorage) or
  global state/Context, staying aligned with Constitution Principle III
  (State Management Discipline) and Principle IX (no new ad hoc client
  persistence).
- **Alternatives considered**: Passing the keyword via router state
  (`navigate(path, { state })`) was rejected because router state does not
  survive a full page reload, which the spec's Edge Cases explicitly require.

## Decision 4: The Global Search bar's collapsed/expanded state is derived from the route, with one small, justified Effect to reset a manual re-expand override

- **Decision**: `GlobalSearchBar` computes `isOnSearchPage` from
  `useLocation().pathname === '/search'`. When `isOnSearchPage` is true it
  renders a search-icon-only `IconButton` (FR-009) unless a local
  `manuallyExpanded` boolean is `true` (set by clicking that icon, FR-010).
  A single `useEffect` resets **both** `manuallyExpanded` to `false` **and**
  `value` to `''` whenever `pathname` changes away from `/search`, so that
  (a) returning to `/search` later (for example, via the browser Back
  button, not just a fresh submit) always starts collapsed again (FR-009 is
  unconditional while on the search page), and (b) any keyword typed into a
  re-expanded-but-not-submitted bar never leaks onto the next page,
  satisfying FR-011's "empty text input" requirement even when the user
  navigates away without submitting. Submitting a keyword (from either
  state) also resets `manuallyExpanded` to `false` and clears the bar's own
  text value, independently of the route-change effect.
- **Rationale**: Collapse/expand is fundamentally a reaction to browser
  navigation, an external system relative to the component, which
  Constitution Principle II explicitly allows Effects for ("synchronization
  with external systems"); every other transition (submit, icon click) is a
  plain event handler, not an Effect, keeping the state model minimal.
- **Alternatives considered**: Storing `manuallyExpanded` in Context or
  lifting it into `AppShell` was rejected — it is presentation-only state
  local to one component with no other consumer, so Context would violate
  Principle III's guidance to prefer local state.

## Decision 5: Keyword matching duplicates the existing simple substring predicate rather than refactoring `useTopicSearch`

- **Decision**: A new `useGlobalTopicSearch` hook in `features/search/hooks/`
  implements the same case-insensitive `title.toLowerCase().includes(...)`
  predicate already used by `features/main/hooks/useTopicSearch.ts`, applied
  across the flattened cross-menu list instead of refactoring/extracting a
  shared utility.
- **Rationale**: The predicate is two lines of trivial logic. Extracting it
  into a shared utility would require touching the already-shipped,
  independently tested `useTopicSearch.ts` (and its test suite) for a
  feature (009) that only needs to read matching topics, not change existing
  per-menu search behavior — an unnecessary risk for a one-line duplication.
- **Alternatives considered**: Extracting `matchesTitleKeyword(title, query)`
  into a new shared module (for example, under a cross-feature `shared/`
  folder) was considered but rejected for this feature's scope; if a third
  consumer of this predicate appears later, extraction can be revisited then.

## Decision 6: The search results list reuses the existing `TopicList`/`TopicCard` presentational components

- **Decision**: `SearchResultsPage` renders its matches with the existing
  `features/main/components/TopicList.tsx` and `TopicCard.tsx` (passed the
  flattened `Topic[]` and an `onTopicClick` that navigates to
  `/${menuId}/${topic.slug}`), instead of building new card/list components.
- **Rationale**: `TopicList`/`TopicCard` already render a topic's title and
  complexity badge accessibly and consistently with the rest of the app
  (Constitution Principle V); reusing them for a new list of (possibly
  cross-menu) topics requires no changes to either component, since both are
  presentational and only need a `Topic[]` plus a click handler.
- **Alternatives considered**: Building a dedicated search-result row that
  also surfaces the owning menu label per item was considered (it could help
  disambiguate results from different menus) but is out of scope: the spec's
  Functional Requirements only require the title-matching list itself, and
  the existing `TopicCard` does not currently support an optional
  menu-label subtitle. This can be proposed as a future enhancement rather
  than added speculatively here.
