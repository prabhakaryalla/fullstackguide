# Research: Flashcard Quick-Review Mode

## Decision 1: Flashcard eligibility is a single shared constant, not a per-component menu-id check

- **Decision**: Add `frontend/src/features/flashcards/data/flashcardEligibleMenus.ts`
  exporting `FLASHCARD_ELIGIBLE_MENU_IDS = ['csharp-programs', 'javascript-programs', 'sql-programs']`
  and `isFlashcardEligibleMenu(menuId: string): boolean`, imported by both
  `MainPage` (to show/hide the entry point) and `FlashcardSessionPage` (to
  guard the route itself).
- **Rationale**: The eligible-menu list needs to be checked in two places
  (the entry point on `MainPage`, and a defensive guard on the session page
  itself in case of a typed/shared URL); a single source of truth avoids
  the two checks drifting apart if the eligible set ever changes.
- **Alternatives considered**: A per-topic-config flag (for example, a new
  `flashcardEligible: true` field in each `*-topics.json`) was considered
  but rejected as unnecessary indirection — eligibility is a per-menu
  property already fully captured by this codebase's existing menu-id
  categorization (the same three menus are already treated as a distinct
  category elsewhere, per repo convention), not a per-topic one.

## Decision 2: The session's topic list is re-derived from the URL (menu + `q` + `complexity`), not passed via router state

- **Decision**: The "Flashcards" entry point on `MainPage` navigates to
  `/${menuSlug}/flashcards`, carrying the current `searchQuery`/`complexity`
  as `q`/`complexity` query parameters (omitted when at their defaults,
  mirroring `SearchResultsPage`'s existing `q` param convention).
  `FlashcardSessionPage` independently calls the exact same
  `getMenuTopicSource(menuSlug)` + `useTopicSearch(topics, q, complexity)`
  already used by `MainPage`, reproducing an identical filtered list with
  zero duplicated filtering logic.
- **Rationale**: `useTopicSearch` is already a pure function of
  `(topics, query, complexity)`; re-deriving from the URL avoids inventing
  a new session-state persistence mechanism, makes the session URL
  reloadable/shareable (satisfying the spec's reload edge case — "session
  re-derives from the current URL and restarts from the first card"), and
  needs no new Context or router state.
- **Alternatives considered**: Passing the filtered topic list via
  `navigate(path, { state })` was rejected — router state does not survive
  a full reload, which the spec's edge case explicitly allows to simply
  restart (meaning URL-based re-derivation is both simpler AND already
  spec-compliant, with no downside).

## Decision 3: Extract a shared `TopicMarkdownContent` renderer, reused by `TopicInfoPage` and the new flashcard "reveal"

- **Decision**: Move `TopicInfoPage.tsx`'s existing inline `ReactMarkdown`
  + custom `components` map (pre/code/mermaid/archify/syntax-highlighting/
  table overrides, ~90 lines) into a new
  `frontend/src/features/main/components/TopicMarkdownContent.tsx`
  presentational component (`{ content: string }` in, identical rendering
  out), used by both `TopicInfoPage` (unchanged rendering, refactored call
  site) and the new `FlashcardSessionPage` (revealed card content).
- **Rationale**: Per the spec's Clarifications, the card's back MUST use
  "the same rendering already used on the topic detail page" — with a
  second real, concrete consumer now needing byte-identical behavior
  (mermaid, archify embeds, syntax highlighting, tables), extracting this
  is justified (not speculative) per this codebase's own precedent of only
  extracting shared code once a second genuine consumer exists.
- **Alternatives considered**: Duplicating the ~90-line renderer into the
  new flashcard page was rejected — unlike feature 009/012's small
  duplicated predicates (a couple of lines each), this renderer is
  substantial and must stay pixel-identical across both call sites as the
  app evolves (new fence languages, new table styling, etc.); duplication
  here would be a real, ongoing maintenance risk, not a one-off.

## Decision 4: Extract a shared `loadTopicMarkdown(topic)` loader, reused by `TopicInfoPage` and the flashcard session

- **Decision**: Move `TopicInfoPage.tsx`'s existing
  `import.meta.glob('../content/**/*.md', { query: '?raw', import: 'default' })`
  + path-lookup into a new
  `frontend/src/features/main/data/loadTopicMarkdown.ts` exporting
  `loadTopicMarkdown(topic: Topic): Promise<string | null>`, used by both
  `TopicInfoPage` (refactored, same lazy per-topic behavior) and
  `FlashcardSessionPage` (loading each card's content as the user
  navigates).
- **Rationale**: Both pages need "the raw markdown for exactly one given
  topic, loaded lazily" — the identical mechanism `TopicInfoPage` already
  uses. This is a different concern from feature 012's
  `getAllTopicContentIndex` (which needs ALL topics' content at once, via a
  build-time static asset, per that feature's own measured performance
  correction) — the two remain intentionally separate.
- **Alternatives considered**: Reusing feature 012's
  `getAllTopicContentIndex()` (fetches the whole ~9.5MB corpus once) was
  considered, but rejected for this feature — that index is optimized for
  "search across everything at once," not "show one topic's content right
  now," and would force a session start to wait on an unrelated, much
  larger fetch for no benefit.

## Decision 5: "Got it" writes through to the existing Topic Completion Record, guarded to be idempotent

- **Decision**: `FlashcardSessionPage`'s "Got it" action calls
  `toggleCompletion(menuId, slug)` from the existing `useTopicProgress()`
  hook (feature 010) **only if `!isCompleted(menuId, slug)`** — never
  blindly toggling. "Still learning" calls nothing.
- **Rationale**: `toggleCompletion` flips a boolean; calling it
  unconditionally on an already-completed topic would un-complete it,
  violating the spec's explicit idempotency requirement ("rating 'Got it'
  again on an already-completed topic has no additional effect") and
  FR-009's "must not change... in either direction" for "Still learning".
  Guarding with a read-before-write check is the minimal fix and needs no
  changes to feature 010's existing context API.
- **Alternatives considered**: Adding a new `markCompleted` (idempotent,
  set-only) method to `TopicProgressContextValue` was considered, but
  rejected as an unnecessary API change to a shipped, tested feature for a
  need fully satisfiable by a one-line guard at the call site.
