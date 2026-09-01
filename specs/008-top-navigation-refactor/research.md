# Research: Top Navigation Refactoring (Menu & Submenu Items)

## Decision 1: Keep the flat leaf-item list as the routing/content contract; add a separate grouped tree for navigation rendering

- **Decision**: `getSortedMenuItems()` (`features/landing/data/getSortedMenuItems.ts`)
  keeps returning the same flat `NavigationMenuItem[]` it returns today, and
  `features/main` (MainPage, TopicInfoPage, MainMenuTilesPage,
  `getMenuTileSummaries`) keeps consuming it unchanged. A new
  `navigationGroups.json` + `getTopNavigationTree()` join the flat list into a
  grouped tree used only by the top navigation bar (`TopMenuItems`,
  `LandingNavigationBar`, `AppShell`).
- **Rationale**: `getSortedMenuItems()` is a shared dependency of three other
  features (topic listing, topic content, and the 006 tile-overview feature).
  Changing its shape to a nested structure would force every consumer to
  filter/flatten it back out, spreading this refactor beyond top navigation
  and violating Constitution Principle IV (Feature-First Organization). A
  separate, additive grouped view keeps this feature's blast radius inside
  `features/landing` and `app/layout`.
- **Alternatives considered**: Nesting `children` directly onto
  `NavigationMenuItem` and updating every consumer to flatten it was rejected
  because it touches unrelated features (tile overview, topic pages) for no
  functional benefit and increases regression risk.

## Decision 2: Rename the "database" leaf id to "cosmos"; free "database" for the new parent group

- **Decision**: The existing single-leaf "database" menu item (currently
  holding the "Azure Cosmos DB" topic) is renamed to leaf id `cosmos` /
  label "Cosmos". The now-unused id `database` becomes the new parent group's
  id (label "Database", `childIds: ["cosmos", "sql"]`).
- **Rationale**: Avoids any ambiguity between a parent group and a same-named
  child, and keeps the parent id semantically aligned with its label. The
  route for the existing Cosmos DB content moves from `/database/azure-cosmos-db`
  to `/cosmos/azure-cosmos-db`; FR-014 requires the content stay *reachable*
  from top navigation, not that the URL stays byte-identical, so this is a
  safe, low-effort rename (only `database-topics.json`'s `menuId`,
  `getMenuTopicSource.ts`, `TopicInfoPage.tsx`'s lookup map, and
  `menuConfig.json` need the id swapped).
- **Alternatives considered**: Reusing "database" for both the parent group
  and the Cosmos leaf was rejected as confusing to read/maintain even though
  it would technically work (parent id is never used for routing).

## Decision 3: "Cloud" is a label-only rename of the existing "azure" leaf item

- **Decision**: The existing `azure` leaf item's `label` changes to "Cloud"
  in `menuConfig.json`; its `id` (`azure`), route (`/azure/...`), content
  files (`content/azure/*.md`), and `azure-topics.json` stay unchanged. It
  remains a standalone, directly-navigable top-level item with no submenu.
- **Rationale**: Minimizes churn — no content files, imports, or routes need
  to move — while still satisfying the requirement that the top navigation
  displays "Cloud" as a menu label. `MainPage`/`TopicInfoPage` already display
  a menu's `label` (not its `id`) as the page title, so this rename is fully
  supported by the existing architecture.
- **Alternatives considered**: Renaming the `id` to `cloud` and moving
  `content/azure/*` to `content/cloud/*` was rejected as unnecessary file
  churn with no user-facing benefit beyond the label change already required.

## Decision 4: New "sql" leaf and pre-existing "angular" leaf reuse the existing empty-topics state

- **Decision**: `sql` is added as a new leaf item in `menuConfig.json`
  (`{ id: 'sql', label: 'SQL', order: … }`) with no corresponding
  `topicConfigMap` entry, exactly like the already-existing `angular` and
  `design-patterns` leaves. `getMenuTopicSource()`'s existing
  `topicConfigMap[menuId]?.topics ?? []` fallback means visiting `/sql` or
  `/angular` renders `MainPage`'s existing "No topics available" empty state.
- **Rationale**: This is the application's established placeholder pattern
  for a menu with no content yet (already exercised by `angular` and
  `design-patterns` today, and covered by `NavigationPersistenceFlow.test.tsx`'s
  "unknown menu slug and empty topic states" scenario). Reusing it satisfies
  FR-015 without introducing a new UI pattern or component.
- **Alternatives considered**: Building a distinct "coming soon" component
  (as the spec's Assumptions section speculated) was rejected because the app
  already has an equivalent empty-state experience for exactly this situation;
  adding a second pattern would create inconsistency without added value.

## Decision 5: Submenus are implemented with MUI `Menu`, opened via hover/tap/focus instead of a single click

- **Decision**: Each parent group (Backend, Frontend, Database) renders a
  trigger `Button` plus an MUI `Menu` anchored to it. The `Menu`'s open state
  is controlled by: `onMouseEnter`/`onMouseLeave` (desktop hover, FR-006),
  `onClick` toggle (touch tap, FR-007/FR-009 — click never navigates for a
  parent with children), and `onFocus` (keyboard reveal, FR-011). `Escape`
  closes the menu and returns focus to the trigger; MUI `Menu` already
  provides arrow-key navigation between `MenuItem`s and traps focus while open.
- **Rationale**: MUI `Menu`/`MenuItem` already implement the WAI-ARIA menu
  keyboard pattern (arrow keys, `Escape`, roving focus), directly satisfying
  Constitution Principle VI (Accessibility Baseline) and Principle V (MUI
  consistency) with minimal custom code. Only the open/close *triggers* need
  custom wiring; the interaction semantics inside an open menu are built in.
- **Alternatives considered**: A fully custom `Popper`-based dropdown was
  rejected because it would require re-implementing keyboard roving focus and
  `Escape` handling that MUI `Menu` already provides, increasing accessibility
  risk for no behavioral gain.

## Decision 6: A single `openGroupId` state value drives all submenu visibility

- **Decision**: `TopMenuItems` (or its container) holds one
  `openGroupId: string | null` state value. Opening any parent group's
  submenu sets `openGroupId` to that group's id, which implicitly closes any
  other open submenu (FR-010), satisfying "only one submenu open at a time"
  with no extra bookkeeping.
- **Rationale**: Matches Constitution Principle III (State Management
  Discipline) — one minimal piece of local state, no Context, no duplicated
  per-item state.
- **Alternatives considered**: Per-group boolean state (one flag per parent)
  was rejected because it requires manually closing siblings and can drift
  out of sync, whereas a single id value makes "only one open" structurally
  guaranteed.

## Decision 7: Active-state resolution walks the grouped tree to find the owning top-level group

- **Decision**: `resolveSelectedMenuId` keeps its existing signature and
  behavior unchanged (leaf-id resolution only). A new sibling function,
  `resolveActiveTopNavigationGroupId(leafId, groups)`, is added in the same
  file; it takes the current route's leaf id (e.g. `csharp`) and the grouped
  tree, and returns the top-level group id that should show as active — the
  leaf's parent group id if it belongs to one (e.g. `backend`), or the leaf
  id itself if it is a standalone group (e.g. `azure`/"Cloud"). The submenu
  itself stays closed on
  load per the Clarifications answer; only the parent's active indicator is
  shown.
- **Rationale**: Directly implements FR-013 and the "deep-link / page-load
  behavior" clarification without needing new global state — it is a pure
  function of `location.pathname` plus the static grouped tree, mirroring the
  existing `resolveSelectedMenuId` pattern.
- **Alternatives considered**: Storing "active group" in component state set
  on navigation was rejected as redundant derived state (Constitution
  Principle III) when it can be computed directly from the route on each
  render.

## Decision 8: Automated tests simulate touch via existing RTL/user-event APIs

- **Decision**: Keyboard behavior is tested with `userEvent` focus + key
  presses (`Tab`, `Escape`, arrow keys); hover behavior is tested with
  `userEvent.hover`/`unhover`; tap-toggle behavior is tested with
  `userEvent.click` on the parent trigger (jsdom has no native pointer-type
  distinction, so click is used as the touch-tap proxy, consistent with how
  the rest of the suite already tests interactions). `jest-axe` assertions
  are added for the open-submenu state, matching the existing pattern in
  `TopMenuItems.test.tsx`.
- **Rationale**: Keeps tests within the existing Vitest + RTL + jest-axe stack
  (Constitution Principle VIII) without adding new test tooling.
- **Alternatives considered**: A real-browser/E2E tool for true touch-event
  simulation was rejected as disproportionate for a static SPA's navigation
  component and inconsistent with the project's existing test stack.
