# Research: Related Topics ("See Also")

## Decision 1: Reuse feature 012's `getAllTopicContentIndex()` as the only data source — no new content, no tags

- **Decision**: Related-topic computation is built entirely on top of the
  existing `frontend/src/features/search/data/getAllTopicContentIndex.ts`
  (a single static `public/search/content-index.json` asset, fetched once
  per session, already measured at ~1.8s in production — see feature 012's
  research.md). No new content field, tag, or manual curation is
  introduced.
- **Rationale**: This is the only mechanism in the codebase that already
  provides every topic's raw text at once; per implementation discipline
  (reuse over reinvention) and the "automatic, content-based" clarification,
  building a second content-loading mechanism would be pure duplication of
  an already-solved, already-measured problem (feature 012 explicitly
  rejected the naive per-file-glob approach for being 10-16x slower).
- **Alternatives considered**: A manual `relatedSlugs: string[]` field
  added to each topic's JSON was rejected — it would require hand-curating
  relationships across ~4,200 topics, contradicting the "no manual
  curation" clarification and this app's fully-static-data-driven content
  model.

## Decision 2: A derived, session-cached "keyword index" (title+content → significant word set), built once, not per topic view

- **Decision**: A new module-level memoized async function,
  `getRelatedTopicsKeywordIndex()` in
  `frontend/src/features/related-topics/data/getRelatedTopicsKeywordIndex.ts`,
  awaits `getAllTopicContentIndex()` once, then derives
  `Map<topicId, Set<string>>` — a set of lowercase, stopword-filtered,
  length-filtered significant words per topic (from title + body) — caching
  the result exactly like feature 012's own content-index promise (single
  in-flight/resolved promise, never rebuilt within a session).
- **Rationale**: Deriving this once and reusing it across every topic page
  visited in a session avoids repeating a non-trivial pass over ~4,200
  topics' text on every single page view — directly applying the lesson
  from feature 012's Decision 6 (precompute expensive derived data once,
  keyed on stable input, not on every render/navigation).
- **Alternatives considered**: Recomputing keyword sets fresh inside a
  `useMemo` scoped to each `TopicInfoPage` mount was considered, but
  rejected — navigating between topics fully re-renders/remounts enough of
  the tree that a component-local memo would very likely recompute the
  full-corpus keyword index repeatedly during a single browsing session,
  defeating the purpose of caching it at all.

## Decision 3: Relatedness score = size of keyword-set intersection; title words weighted by inclusion in both title and body

- **Decision**: For a given topic, candidates are scored by
  `intersectionSize(currentTopic.keywords, candidate.keywords)`, computed
  via `Set.has()` checks (not a full sort/hash join), then sorted
  descending and sliced to the top 5 with a score greater than 0. No TF-IDF,
  no embeddings, no external ranking library.
- **Rationale**: A simple set-intersection count is cheap (bounded by each
  topic's keyword-set size, typically small — tens to low hundreds of
  words), fully deterministic, and easy to reason about/test; it directly
  satisfies FR-002's "automatic" requirement without introducing a
  dependency or algorithm whose behavior is hard to validate by hand in
  tests. Per the spec's Assumptions, this is explicitly a heuristic, not a
  guarantee of true semantic relevance.
- **Alternatives considered**: A proper TF-IDF or cosine-similarity ranking
  was considered for higher-quality results, but rejected for this
  iteration as unnecessary complexity/dependency weight relative to the
  spec's bar ("at least one genuinely related topic... where such a match
  exists," not "best possible ranking") — can be revisited later if
  suggestion quality proves insufficient in practice.

## Decision 4: A small, hand-curated English stopword list + minimum word length, not an external NLP library

- **Decision**: `extractSignificantWords(text: string): Set<string>` in
  `frontend/src/features/related-topics/data/extractSignificantWords.ts`
  lowercases, splits on non-alphanumeric characters, filters out words
  shorter than 4 characters, and filters out a small hardcoded stopword
  list (~40-60 common English filler words: "the", "and", "this", "that",
  "with", "from", "which", etc.).
- **Rationale**: A hardcoded list is simple, dependency-free, fully
  testable, and sufficient for this heuristic's stated bar; consistent
  with this codebase's general preference for small, self-contained
  utilities over new runtime dependencies (mirrors feature 012's
  `extractContentSnippet` — a similarly-scoped, dependency-free string
  utility).
- **Alternatives considered**: Using an `stopword`/NLP npm package was
  considered but rejected as an unnecessary new runtime dependency for a
  problem fully solvable with a short, readable, hardcoded list.

## Decision 5: `features/related-topics` is a new, small feature depending on `features/search`'s existing exports — not folded into `features/search` or `features/main`

- **Decision**: All new code (keyword extraction, keyword index, the
  `useRelatedTopics` hook, the `RelatedTopicsSection` component) lives
  under a new `frontend/src/features/related-topics/` feature, importing
  `getAllTopicContentIndex` and `getAllSearchableTopics` from
  `features/search` (already the case for the flashcards feature reusing
  `features/main`'s extracted renderer/loader).
- **Rationale**: "Related topics" is a distinct capability from "search,"
  even though it depends on search's content index — keeping it as its own
  feature folder keeps `features/search`'s scope focused on the search
  page/results and avoids growing that feature with an unrelated UI
  concern, consistent with Constitution Principle IV (feature-first
  organization) and this codebase's established precedent of one feature
  depending on another's exported data/utility functions where genuinely
  shared.
- **Alternatives considered**: Adding this directly into `features/main`
  (since `TopicInfoPage` is the only consumer) was considered, but
  rejected — the computation is conceptually a "search/similarity"
  concern, not a topic-content-rendering concern, and keeping it separate
  makes the keyword-index logic independently testable without pulling in
  `TopicInfoPage`'s unrelated markdown-rendering machinery.

## Decision 6: The Related Topics section fetches the shared content index independently of the topic's own content load — no coupling, no blocking

- **Decision**: `TopicInfoPage` renders a new `<RelatedTopicsSection topic={topic} />`
  component unconditionally (once `topic` is known), which internally calls
  `useRelatedTopics(topic)` — a hook with its own `status`
  (`'loading' | 'ready'`) independent of `TopicInfoPage`'s own `status`
  state machine for the main content.
- **Rationale**: Directly satisfies FR-004 and Clarification 3 — the main
  content's existing loading behavior (unchanged from today) must never be
  coupled to the much larger, shared content-index fetch. This mirrors
  feature 012's Decision 3 (title matches instant, content matches merged
  in asynchronously via a separate status).
- **Alternatives considered**: Awaiting the related-topics index before
  rendering the main content at all was rejected outright — it would make
  every single topic page pay the ~1.8s shared-index cost on a user's very
  first page view of a session, a direct regression to the exact problem
  feature 012 was built to avoid for the search page.
