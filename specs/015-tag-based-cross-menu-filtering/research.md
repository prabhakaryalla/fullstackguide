# Research: Tag-Based Cross-Menu Filtering

## Decision 1: Tags are derived by matching a curated keyword dictionary against feature 014's existing per-topic keyword `Set` — no new content pass

- **Decision**: A new `frontend/src/features/tags/data/getTopicTagsIndex.ts`
  awaits the existing `getRelatedTopicsKeywordIndex()` (feature 014 —
  `Map<topicId, Set<significantWord>>`, itself built on feature 012's
  content index), then for each topic checks each `TagDefinition`'s trigger
  keywords via `Set.has()` against that topic's already-derived
  significant-word set. A topic gets a tag if any one of that tag's
  keywords is present.
- **Rationale**: This is the third feature in a row to build on the shared
  content index (012 → 014 → 015); reusing feature 014's already-derived,
  already-cached per-topic word `Set` means tag matching is a cheap `O(1)`
  membership check per keyword (not a fresh substring scan of raw text per
  tag per topic), and requires zero new expensive text processing.
- **Alternatives considered**: Scanning each topic's raw content directly
  for multi-word tag phrases (for example, "race condition," "circuit
  breaker") via `.includes()` was considered, since some natural tag
  vocabulary is more precise as a phrase than a single word. Rejected for
  this iteration in favor of keeping every trigger keyword a single
  significant word, so the entire feature can reuse feature 014's existing
  `Set<string>` index verbatim with no new tokenization pass — see Decision
  4 for how tag definitions were written to fit this constraint.

## Decision 2: Tags are a small, hardcoded `TagDefinition[]` — not user-editable, not stored per topic

- **Decision**: `frontend/src/features/tags/data/tagDefinitions.ts` exports
  a fixed array of roughly 18 tags
  (`{ id: string; label: string; keywords: string[] }`), covering common
  cross-cutting software engineering concepts already well-represented in
  this app's content (Caching, Security, Authentication, Concurrency,
  Distributed Systems, Databases, Networking, Messaging, Scalability,
  Testing, Design Patterns, Cloud & Infrastructure, Algorithms, Data
  Structures, APIs, Microservices, Storage, Monitoring, Error Handling).
- **Rationale**: Per the spec's Clarifications, manually tagging ~4,200
  existing topics is infeasible and explicitly out of scope; a small,
  product-curated dictionary matched automatically is the only approach
  that works uniformly across the entire existing corpus with zero content
  authoring, consistent with features 012/014's precedent of automatic,
  content-derived features over manual curation.
- **Alternatives considered**: Deriving tags dynamically from frequent
  significant words across the corpus (an unsupervised "top keywords"
  approach) was considered but rejected — it would produce noisy,
  non-human-friendly tag labels (raw words rather than curated concepts)
  and unpredictable results as content changes, whereas a curated list
  gives stable, recognizable tag names users can reason about.

## Decision 3: One more session-cached derived layer — `getTopicTagsIndex()` — following the exact same module-level-promise pattern as features 012/014

- **Decision**: `getTopicTagsIndex(): Promise<Map<string, string[]>>`
  (topic id → matched tag ids) is memoized in a module-level variable,
  computed once per session on first use, exactly like
  `getAllTopicContentIndex()` and `getRelatedTopicsKeywordIndex()` before
  it.
- **Rationale**: Consistent, proven pattern in this codebase for "expensive
  to compute once, cheap to reuse many times across a session" derived
  data; a fourth ad hoc caching mechanism would add inconsistency for no
  benefit.
- **Alternatives considered**: None seriously — this is a settled pattern
  in this codebase by this point.

## Decision 4: Trigger keywords are written as single significant words (matching feature 014's tokenizer), not multi-word phrases

- **Decision**: Every `TagDefinition.keywords` entry is a single lowercase
  word of 4+ characters (for example, `"cache"`, `"mutex"`, `"kubernetes"`,
  `"idempotent"`), chosen so it survives `extractSignificantWords`'s
  tokenization (split on non-alphanumeric, ≥4 chars, not a stopword) and
  can be checked via a direct `Set.has()` against feature 014's index.
- **Rationale**: Directly enables Decision 1 (reuse the existing index
  verbatim); also keeps the tag dictionary itself simple, readable, and
  easy to unit test (`expect(tagIndex.get(id)).toContain('cache-tag-id')`
  style assertions) without needing a separate phrase-matching code path.
- **Alternatives considered**: Multi-word phrases (rejected per Decision 1
  — see that decision's alternatives).

## Decision 5: Topic cards show tags as plain, non-interactive chips; only the topic detail page's tags are clickable

- **Decision**: `TopicCard` gains an optional `tags?: string[]` prop
  (display-only `Chip`s, no `onClick`), following the exact precedent of
  its existing `completed`/`bookmarked` display props. The new
  `TopicInfoPage`'s tag chips (rendered via a shared
  `frontend/src/features/tags/components/TagChipList.tsx`, used with
  `onTagClick` provided) are the only interactive tag entry point outside
  the dedicated tag pages.
- **Rationale**: `TopicCard` already special-cases exactly one interactive
  child (`onToggleBookmark`'s `IconButton`, rendered as a sibling of
  `CardActionArea` specifically to avoid invalid nested `<button>`
  markup). Making every tag chip on every card independently clickable
  would multiply that same nested-interactive-control problem by however
  many tags a card has, for uncertain value — per the spec's own
  Clarification, card-level tags are explicitly plain indicators; the
  detail page (no nesting constraint) is the interactive pivot point.
- **Alternatives considered**: Making card-level tag chips clickable via
  the same sibling-of-CardActionArea technique as the bookmark button was
  considered, but rejected as unnecessary complexity for a "nice to have"
  (User Story 3, P3) — the detail page and the dedicated Browse-by-Tags
  page already fully satisfy the feature's core browsing value (User
  Story 1, P1).

## Decision 6: New `/tags` and `/tags/:tagId` routes, plus a `TagsNavAction` icon mirroring the existing `BookmarksNavAction`

- **Decision**: Two new routes are added to `AppRouter.tsx`:
  `/tags` (`TagsIndexPage`, lists every tag + count) and `/tags/:tagId`
  (`TagTopicsPage`, cross-menu topic list for one tag) — both lazy-loaded
  like every other page route. A new `TagsNavAction.tsx` component,
  structurally identical to the existing `BookmarksNavAction.tsx`, is
  added next to it in both the desktop and mobile top-navigation branches
  of `LandingNavigationBar.tsx`, plus a matching entry in
  `MobileNavigationDrawer.tsx`.
- **Rationale**: `/tags/:tagId` mirrors `SearchResultsPage`'s established
  shape (cross-menu `TopicList` with a menu-label chip per entry) and
  `/bookmarks`'s established shape (a dedicated page reachable via a
  top-nav icon) — reusing two already-proven UI patterns rather than
  inventing a third. Directly satisfies FR-002/SC-002 ("reachable from the
  top navigation... within one interaction").
- **Alternatives considered**: A single `/tags?tag=id` route (query
  param, mirroring `/search?q=`) was considered instead of
  `/tags/:tagId`, but a path segment was chosen since a tag id is a fixed,
  enumerable identifier (not free-text like a search keyword), making a
  clean, shareable/bookmarkable URL per tag more natural (consistent with
  how `/bookmarks` itself is a plain path, not a query-parameterized one).
