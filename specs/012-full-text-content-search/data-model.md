# Data Model: Full-Text Content Search

## Entity: TopicContentIndex *(new, in-memory, session-cached, not persisted)*

Built by `getAllTopicContentIndex()` in
`frontend/src/features/search/data/getAllTopicContentIndex.ts`.

```ts
type TopicContentIndex = Map<string, string> // topic.id -> raw markdown body text
```

| Aspect | Rule |
|--------|------|
| Population | For every `SearchableTopic` from `getAllSearchableTopics()`, resolve its raw markdown text via the same `import.meta.glob('../../main/content/**/*.md', { query: '?raw', import: 'default' })` pattern used by `TopicInfoPage`, keyed by `topic.markdownPath`, then store the result under `topic.id` |
| Caching | A module-level `let contentIndexPromise: Promise<TopicContentIndex> \| null` — first call triggers the `Promise.all` and stores it; every subsequent call (same session) returns the same promise instance (FR-004) |
| Failure handling | A single topic's content module failing to load MUST NOT fail the whole index — that topic is simply omitted from the map (falls back to title-only matching for it) |

---

## Entity: ContentSearchState *(new, hook-local state)*

Returned by `useContentSearchResults(keyword: string)` in
`frontend/src/features/search/hooks/useContentSearchResults.ts`.

```ts
type ContentSearchStatus = 'idle' | 'loading' | 'ready'

interface ContentSearchState {
  status: ContentSearchStatus
  matches: SearchableTopic[]
  contentIndex: Map<string, string> | null // exposed so the page can build snippets without a second fetch
}
```

| Field | Description |
|-------|-------------|
| `status` | `'idle'` before any search has been performed on this page instance; `'loading'` while `getAllTopicContentIndex()`'s promise is in flight; `'ready'` once resolved (stays `'ready'` for the rest of the component's lifetime, even as `keyword` changes) |
| `matches` | Once `status === 'ready'`, every `SearchableTopic` whose `TopicContentIndex` text contains the current (trimmed, lowercased) `keyword`; empty array while `status !== 'ready'` |

**State transitions**:
1. **Hook mounts** (search results page loads): `status` starts `'loading'`
   (calls `getAllTopicContentIndex()` immediately — the promise resolves
   instantly on the 2nd+ session visit since it's cached, per Decision 2).
2. **Content index promise resolves**: `status` becomes `'ready'`; `matches`
   computed via `useMemo` keyed on `[keyword, resolvedIndex]`.
3. **`keyword` changes while `status === 'ready'`**: `matches` recomputed
   synchronously (no re-fetch, no `status` change).

---

## Entity: SearchResultEntry *(new, page-level view model, not persisted)*

Assembled by `SearchResultsPage` by merging title matches
(`useGlobalTopicSearch`, unchanged) with content matches
(`useContentSearchResults`), de-duplicated by `topic.id`.

| Field | Type | Description |
|-------|------|-------------|
| `topic` | `SearchableTopic` *(existing type, unchanged)* | The matching topic + owning menu |
| `snippet` | `string \| undefined` | Present only for entries that matched via body content but NOT via title (FR-005/FR-006); computed via `extractContentSnippet(content, keyword)` |

**Derivation rule**:
```
titleMatchIds = Set(titleMatches.map(t => t.topic.id))
mergedEntries =
  titleMatches.map(t => ({ topic: t, snippet: undefined }))
  ++
  contentMatches
    .filter(t => !titleMatchIds.has(t.topic.id))   // FR-006: no duplicates
    .map(t => ({ topic: t, snippet: extractContentSnippet(indexText(t), keyword) }))
```

---

## Relationships

```text
getAllSearchableTopics()  ──┐
                             ├─▶ getAllTopicContentIndex() ─▶ Map<topicId, text> ─▶ useContentSearchResults(keyword) ─▶ { status, matches }
TopicInfoPage's glob        │                                                                                              │
pattern (reused, not        │                                                                                              ▼
shared code) ───────────────┘                                                                          SearchResultsPage merges with
                                                                                                          useGlobalTopicSearch(keyword)
                                                                                                          (title matches, unchanged, instant)
                                                                                                                     │
                                                                                                                     ▼
                                                                                                          SearchResultEntry[] (de-duped)
                                                                                                          rendered via TopicList + snippet
```

No existing entity (`Topic`, `SearchableTopic`, `TopicConfig`) is modified.
`TopicContentIndex`, `ContentSearchState`, and `SearchResultEntry` are
purely additive, in-memory-only view/data structures.
