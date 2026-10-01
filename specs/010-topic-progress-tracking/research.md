# Research: Topic Progress Tracking

## Decision 1: New `features/progress` feature owns completion state via a Context provider mounted in `AppProviders`

- **Decision**: Introduce a new `frontend/src/features/progress/` feature
  (model, data, context, hooks) exposing a `TopicProgressProvider` mounted in
  [frontend/src/app/providers/AppProviders.tsx](../../frontend/src/app/providers/AppProviders.tsx)
  alongside the existing `ThemeModeProvider`, rather than lifting state into
  a shared ancestor page component.
- **Rationale**: Completion state must be read and written by two unrelated
  pages — `TopicInfoPage` (toggle) and `MainPage`/`TopicCard` (progress chip,
  completed indicator) — that do not share a closer common owner than the
  app root, and prop-drilling through `AppShell`/`AppRouter` would leak a
  progress-specific concern into unrelated routing/layout code. This matches
  Constitution Principle III's explicit Context exception ("cross-cutting
  concerns where prop drilling is a clear maintenance problem") and mirrors
  the existing precedent of `ThemeModeProvider`.
- **Alternatives considered**: Storing progress in a `useState` inside
  `AppShell` and passing it down via props was rejected — `AppShell` does not
  otherwise own topic/progress domain data, and it would have to thread the
  API through every routed page unconditionally.

## Decision 2: Persisted key shape mirrors the existing `ThemeModeContext` localStorage convention

- **Decision**: Store a single JSON object under one versioned key
  `fullstack-guide.topic-progress.v1`, shaped as
  `Record<"<menuId>/<slug>", true>` — only completed pairs are present as
  keys; absence means not completed. Reads go through a `readPersistedState()`
  helper that `JSON.parse`s inside a `try/catch`, then validates the parsed
  value is a plain object before use, falling back to `{}` on any failure
  (malformed JSON, wrong type, storage disabled).
- **Rationale**: This directly mirrors `readPersistedMode()` /
  `THEME_MODE_STORAGE_KEY` in
  [frontend/src/theme/ThemeModeContext.tsx](../../frontend/src/theme/ThemeModeContext.tsx),
  satisfying Constitution Principle IX's "explicit key/version conventions
  and safe parsing/validation" requirement with a pattern already proven in
  this codebase. Using `menuId/slug` as the key (rather than a nested
  `Record<menuId, Record<slug, true>>`) keeps reads/writes/deletes O(1) single
  key operations and keeps the persisted JSON minimal (only ever grows with
  completions, not with every topic that exists).
- **Alternatives considered**: A nested `Record<menuId, Record<slug, true>>`
  shape was considered for readability, but was rejected because a
  menu-scoped reset (User Story 3) becomes a single-key delete either way, and
  the flat shape avoids ever having to prune empty nested objects.

## Decision 3: Progress counts and completion badges are derived at render time, never separately stored

- **Decision**: A `useMenuProgressSummary(menuId, topics)` hook computes
  `{ completed, total }` on every render (memoized with `useMemo`) by
  filtering the menu's current `topics` array against the persisted
  completion set — it never trusts or stores a separately-tracked "total"
  count.
- **Rationale**: This is the direct mechanism that satisfies FR-004 and the
  spec's Edge Cases for topics added/removed/renamed after being tracked: a
  completion record for a slug that longer exists in the current
  `getMenuTopicSource(menuId)` output simply never matches during the
  filter, so it silently drops out of the numerator without needing any
  explicit cleanup, error handling, or migration step (FR-009). It also
  satisfies Constitution Principle II (no redundant/duplicate state — derive
  during render).
- **Alternatives considered**: Storing a running `completedCount` per menu
  directly in localStorage (incremented/decremented on toggle) was rejected
  — it would drift out of sync whenever topic content changes (exactly the
  stale-slug scenario the spec calls out), requiring extra reconciliation
  logic for no benefit over a cheap render-time filter of an already
  in-memory array.

## Decision 4: `TopicCard`/`TopicList` gain an optional, presentational completed-state prop instead of consuming the progress Context directly

- **Decision**: `TopicCard` accepts a new optional `completed?: boolean`
  prop (rendering a small check indicator when `true`); `TopicList` accepts
  an optional `isTopicCompleted?: (topic: Topic) => boolean` lookup and
  passes the resolved boolean down per row. Neither component imports
  `useTopicProgress` itself. `MainPage` (the only current caller with a
  Context provider above it) supplies the lookup.
- **Rationale**: `TopicList`/`TopicCard` are shared, presentational
  components also reused by `SearchResultsPage` (feature 009), which has no
  requirement to show completion state. Keeping them Context-agnostic and
  accepting a plain prop keeps them reusable and testable in isolation
  (render with/without the prop), consistent with Constitution Principle IV
  (shared UI primitives must not be tightly coupled to one feature's
  internals).
- **Alternatives considered**: Having `TopicCard` call `useTopicProgress()`
  directly was rejected — it would force every consumer (including
  `SearchResultsPage`, and any future consumer) to render under
  `TopicProgressProvider` even when they don't need completion state, and
  would make `TopicCard` harder to unit test in isolation.

## Decision 5: The "Mark as complete" control lives on `TopicInfoPage`, next to the existing Previous/Next Fab controls

- **Decision**: Add a labeled MUI `ToggleButton` (or equivalent toggle
  `IconButton` with `aria-pressed`) on `TopicInfoPage`, positioned near the
  existing Previous/Next `Fab` navigation controls, calling
  `toggleCompletion(menuSlug, topicSlug)` from `useTopicProgress()`.
- **Rationale**: `TopicInfoPage` is the single place a user reads a topic's
  content, making it the natural place to mark it studied; placing it next
  to the existing navigation Fabs keeps all "acting on this topic" controls
  visually grouped, consistent with the existing layout rather than
  introducing a new control region.
- **Alternatives considered**: Placing the toggle inline in the page's
  heading area (next to the title) was considered but deprioritized in favor
  of grouping with the other topic-level action controls (Previous/Next);
  either location satisfies the functional requirements, so this is a
  presentation-only choice with no architectural impact.

## Decision 6: Scoped reset requires a confirmation `Dialog`, listing the exact menu affected

- **Decision**: `MainPage` renders a "Reset progress" action (button) that
  opens a new `ResetProgressDialog` (MUI `Dialog`) naming the current menu
  and its completed count; confirming calls
  `resetMenuProgress(menuSlug)`, which deletes every persisted key whose
  prefix is `${menuSlug}/` (regardless of whether that slug still exists in
  the current topic list, so it also clears any stale entries for that menu
  as a side effect).
- **Rationale**: FR-007 requires explicit confirmation before this
  destructive, non-undoable action; a prefix-based delete is the simplest
  correct implementation of "scoped to a single menu area" (FR-006) given the
  flat `menuId/slug` key shape from Decision 2.
- **Alternatives considered**: A single global "reset everything" action
  (clearing the entire localStorage key) was considered but rejected as the
  primary control — the spec's User Story 3 explicitly scopes reset to "one
  menu area or entirely" with per-menu as the concrete acceptance scenario;
  a global reset is not required by any Functional Requirement and is left
  out of scope to avoid an even more destructive, unscoped control.
