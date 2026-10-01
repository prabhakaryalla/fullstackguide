# Research: Full-Text Content Search

## Decision 1: Reuse the existing per-topic `import.meta.glob('../content/**/*.md', { query: '?raw', import: 'default' })` pattern, applied once across all menus, instead of a build-time index

- **Decision**: Add `getAllTopicContentIndex()` in `frontend/src/features/search/data/getAllTopicContentIndex.ts`
  that uses the same `import.meta.glob` raw-string pattern already proven in
  `frontend/src/features/main/pages/TopicInfoPage.tsx`, but resolves every
  matched module (not just one) via `Promise.all`, returning a
  `Map<topicId, string>` of raw markdown body text keyed by topic id.
- **Rationale**: This is the only markdown-loading mechanism that already
  exists in the codebase, is proven to work with Vite's static-analysis
  requirement for `import.meta.glob` (a literal path pattern), and requires
  no new build tooling, Node scripts, or search-index generation step —
  consistent with the "don't over-engineer" implementation discipline and
  Constitution Principle I (static hosting only, no server-side build step
  beyond the existing Vite build).
- **Alternatives considered**: A build-time precomputed search index (for
  example, a Vite plugin emitting a single JSON manifest of lowercased body
  text) would reduce the number of runtime module fetches (currently ~4,200
  markdown files across all menus, largest being `leet-code` at ~3,780
  files) but adds real build-pipeline complexity and a new artifact to keep
  in sync; rejected for this feature's scope since the existing lazy-import
  approach, loaded once per session (Decision 2), is simple and sufficiently
  fast in practice — this can be revisited later if load time proves to be a
  real problem, but is not assumed upfront.

**CRITICAL correction (measured, not theoretical)**: the lazy `Promise.all`
approach above was implemented first and directly measured — it took
20-30+ seconds to resolve, both against the Vite dev server (per-file
on-demand transform) AND against a real production build served via
`vite preview` (~4,200 separate chunk fetches, one per matched `.md` file).
This is not acceptable UX and is not just a dev-mode artifact. An `eager:
true` glob (inlining every matched file's raw string into the importing
module's own chunk at build time) was tried next — but **this also
measured ~18s in a real `vite preview` build**, because Rollup's chunking
still keeps each `.md?raw` file as its own shared chunk (it's also imported
elsewhere, by `TopicInfoPage`'s own per-topic lazy loader), so the browser
still had to fetch ~4,200 small dependent chunks as static `import`
dependencies before the eager module could finish evaluating — `eager`
only changed *how* the import was written, not how many network requests
the browser needed.

**SECOND correction, final approach**: a small Node script,
`frontend/scripts/generate-search-content-index.mjs`, now walks every
markdown file under `src/features/main/content/**/*.md` at build/dev time
and writes ONE static JSON asset, `public/search/content-index.json`
(~9.5MB), mapping each file's relative path (matching `Topic.markdownPath`)
to its raw text — wired via `predev`/`prebuild` npm lifecycle scripts. At
runtime, `getAllTopicContentIndex()` does a single
`fetch('${BASE_URL}search/content-index.json')`, avoiding the shared-chunk
problem entirely since it's a plain static asset, not a JS module graph
Rollup can re-split. Measured in a real production `vite preview` build:
**~1.8 seconds** — a 10-16x improvement over both prior attempts, and the
only one that meets FR-003's "unobtrusive loading indicator" bar rather
than looking broken. This is the project's first custom build script;
justified by this measured evidence — Constitution Principle I's "no
server-side build step" concern is about avoiding a runtime server
dependency, not about refusing a static file-generation step, and the
generated JSON is committed to `public/` exactly like this repo's existing
269 committed Archify diagram HTML artifacts (no CI/deploy changes needed;
GitHub Pages just serves one more static file).

## Decision 2: Content index is a single fetched static asset, cached in a module-level singleton promise

- **Decision**: `getAllTopicContentIndex()` fetches
  `public/search/content-index.json` only the first time it is called,
  memoizes that in-flight/resolved promise in a module-level variable, and
  returns the same promise on every subsequent call within the same page
  session (no re-fetch on repeat visits to `/search`, per FR-004).
- **Rationale**: Fetching ~9.5MB is real one-time network and parse cost;
  doing it eagerly on app boot would hurt every user regardless of whether
  they ever search, violating Constitution Principle X (avoid unnecessary
  work). Doing it once, on first actual use, and caching it for the rest of
  the session directly satisfies FR-003/FR-004 and keeps the cost paid only
  by users who use the search page.
- **Alternatives considered**: Re-fetching per keystroke/search was
  rejected outright (wasteful, and the underlying files never change during
  a session, so there is nothing to gain from re-fetching). Persisting the
  index in `sessionStorage`/`localStorage` across full page reloads was
  considered but rejected — ~9.5MB of raw text is too large for practical
  `localStorage` quota limits, and a fresh fetch on each real page load
  (browser HTTP cache still helps here) is an acceptable, simpler tradeoff.



## Decision 3: Title matches render synchronously and instantly; content matches merge in asynchronously via a loading flag, not a blocking spinner

- **Decision**: `useGlobalTopicSearch` keeps its existing synchronous,
  title-only filtering (feature 009, unchanged) as the immediately-rendered
  base result set. A new `useContentSearchResults(keyword)` hook separately
  tracks `{ status: 'idle' | 'loading' | 'ready', matches: SearchableTopic[] }`
  by awaiting `getAllTopicContentIndex()` and filtering by keyword once
  ready. `SearchResultsPage` merges title matches (always present) with
  content matches (present once `status === 'ready'`), de-duplicating by
  topic id (FR-006), and shows a small inline loading indicator (not a
  full-page spinner) while `status === 'loading'`.
- **Rationale**: This directly satisfies FR-002/User Story 2's requirement
  that title matches are never delayed by the larger content fetch, while
  still meeting FR-001/FR-003 for content matches appearing once ready —
  splitting the two concerns into two hooks keeps each one simple and
  independently testable, consistent with the existing `useGlobalTopicSearch`
  hook's single responsibility.
- **Alternatives considered**: A single unified hook that always waits for
  the content index before returning any results was rejected — it would
  regress feature 009's near-instant title-search UX for every search,
  violating User Story 2 entirely.

## Decision 4: Snippet extraction is a small, pure string utility — no markdown parsing/stripping

- **Decision**: `extractContentSnippet(content: string, keyword: string, radius = 60): string`
  in `frontend/src/features/search/data/extractContentSnippet.ts` finds the
  first case-insensitive index of the keyword in the raw markdown string,
  slices out `radius` characters on each side, collapses internal
  whitespace/newlines to single spaces, and trims — returned as plain text,
  rendered via a normal `Typography` (React auto-escapes it, so no HTML
  injection risk even though the source is raw markdown).
- **Rationale**: Per the spec's Assumptions, occasional raw markdown syntax
  in a snippet (like a stray `#` or `` ` ``) is explicitly acceptable, so a
  full markdown-to-plain-text conversion (which would need a real parser and
  add meaningful complexity/cost for a small cosmetic gain) is unnecessary —
  a pure substring-and-trim function is enough to give useful context
  cheaply and predictably.
- **Alternatives considered**: Reusing `react-markdown`'s parser to strip
  syntax before slicing was rejected as unnecessary weight/complexity for a
  short snippet whose only job is "give the user a hint why this matched."

## Decision 5: Content-body matching happens entirely within `features/search`; no changes to `features/main`'s content-loading code

- **Decision**: The new `getAllTopicContentIndex.ts` and
  `scripts/generate-search-content-index.mjs` are additive to
  `features/search`/`scripts/`; `TopicInfoPage.tsx`'s own per-topic
  `import.meta.glob` lazy loader is completely untouched.
- **Rationale**: `TopicInfoPage.tsx` loads exactly one topic's content
  keyed off route params, from within the app bundle; the search feature
  needs *all* topics' content at once, keyed off `markdownPath`, served as
  a static asset — different enough mechanisms (and, per Decision 1's
  correction, deliberately NOT sharing the same Vite module graph) that
  sharing code between them would be counterproductive here, not just
  unnecessary.
- **Alternatives considered**: Extracting a shared `loadAllMarkdownContent()`
  utility was considered but rejected outright once Decision 1's
  measurements showed that reusing `TopicInfoPage`'s own glob was the
  actual root cause of the shared-chunk slowdown.

## Decision 6: Content-match filtering is precomputed-lowercase + `useDeferredValue`, not naive per-keystroke `.toLowerCase()`

- **Decision**: `useContentSearchResults` lowercases the entire resolved
  content index exactly once (memoized on the index reference, not on
  `keyword`), and wraps the `keyword` fed into content-match filtering in
  `useDeferredValue` so fast typing is never blocked by the heavier
  full-corpus scan.
- **Rationale — measured, not theoretical**: An earlier version recomputed
  `text.toLowerCase()` over the full ~9.5MB corpus on every keystroke and
  used the raw (non-deferred) keyword directly. Under the full parallel
  test suite (24 files, real CPU contention), this reliably caused
  `userEvent.type()`-driven tests to time out or have keystrokes dropped/
  duplicated (for example, typing "cosmos" landing as "osmoscosmos"),
  because the expensive synchronous recompute on every keystroke starved
  the event loop enough to corrupt realistic per-character typing
  simulation. Precomputing the lowercase map once, plus deferring the
  keyword used for the heavy filter (mirroring `MainPage.tsx`'s existing
  `useDeferredValue(searchQuery)` pattern for its own per-menu search),
  resolved this while keeping `useGlobalTopicSearch`'s (title) path
  completely instant and undeferred.
- **Test-environment note**: Even after these fixes, a couple of tests that
  type into the search box after the content index has resolved were given
  a longer per-test timeout (15000ms) and `userEvent.setup({ delay: null })`
  (no artificial per-keystroke delay) — legitimate, standard practice for
  tests exercising a large real data fixture under CI-like parallel-worker
  contention, not a sign of remaining app-level bugs (verified stable
  across repeated full-suite runs).

