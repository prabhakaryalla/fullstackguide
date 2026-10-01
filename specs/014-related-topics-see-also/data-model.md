# Data Model: Related Topics ("See Also")

## Entity: RelatedTopicsKeywordIndex *(new, in-memory, session-cached, not persisted)*

Built by `getRelatedTopicsKeywordIndex()` in
`frontend/src/features/related-topics/data/getRelatedTopicsKeywordIndex.ts`.

```ts
type RelatedTopicsKeywordIndex = Map<string, Set<string>> // topic.id -> significant lowercase words
```

| Aspect | Rule |
|--------|------|
| Population | For every `SearchableTopic` from `getAllSearchableTopics()`, derive its word set via `extractSignificantWords(topic.title + ' ' + (contentIndex.get(topic.id) ?? ''))` |
| Caching | Module-level `let keywordIndexPromise: Promise<RelatedTopicsKeywordIndex> \| null` — first call awaits `getAllTopicContentIndex()` then builds the map once; every subsequent call (same session) returns the same promise |
| Failure handling | A topic missing from the content index (per feature 012's own failure handling) still gets a word set derived from its title alone, never causing an error |

---

## Entity: extractSignificantWords *(new, pure function, no state)*

`frontend/src/features/related-topics/data/extractSignificantWords.ts`.

```ts
function extractSignificantWords(text: string): Set<string>
```

| Rule | Detail |
|------|--------|
| Case | Lowercased before splitting |
| Tokenization | Split on any run of non-alphanumeric characters |
| Minimum length | Words shorter than 4 characters are dropped |
| Stopwords | A small hardcoded list of common English filler words is dropped |
| Output | A `Set<string>` (duplicates naturally collapsed) |

---

## Entity: RelatedTopicsState *(new, hook-local state)*

Returned by `useRelatedTopics(topic: Topic)` in
`frontend/src/features/related-topics/hooks/useRelatedTopics.ts`.

```ts
type RelatedTopicsStatus = 'loading' | 'ready'

interface RelatedTopicsState {
  status: RelatedTopicsStatus
  relatedTopics: SearchableTopic[] // already sorted, already excludes the current topic, already capped
}
```

**Derivation rule** (once `status === 'ready'`):
```
currentWords = keywordIndex.get(currentTopic.id) ?? new Set()
candidates = getAllSearchableTopics()
  .filter(entry => entry.topic.id !== currentTopic.id)
  .map(entry => ({ entry, score: intersectionSize(currentWords, keywordIndex.get(entry.topic.id) ?? new Set()) }))
  .filter(({ score }) => score > 0)
  .sort((a, b) => b.score - a.score)
  .slice(0, 5)
  .map(({ entry }) => entry)
```

**State transitions**:
1. **Hook mounts / `topic.id` changes**: `status` is `'loading'` until
   `getRelatedTopicsKeywordIndex()` resolves (instant on the 2nd+ topic
   page visited in a session, since it's cached).
2. **Keyword index resolves**: `status` becomes `'ready'`; `relatedTopics`
   computed via `useMemo` keyed on `[topic.id, keywordIndex]`.

---

## Reused, unmodified entities

- **`SearchableTopic`** (feature 009, `features/search/model/types.ts`) —
  unchanged; related-topic entries are exactly this existing shape (topic +
  menuId + menuLabel), so `menuLabel` display (FR-005) needs no new field.
- **`getAllTopicContentIndex()`** / **`getAllSearchableTopics()`** (feature
  012/009) — unchanged, only additively imported by the new feature.

## Relationships

```text
getAllTopicContentIndex()  ──┐
                              ├─▶ getRelatedTopicsKeywordIndex() ─▶ Map<topicId, Set<word>>
getAllSearchableTopics()   ──┘                                            │
                                                                            │ keyed on topic.id
                                                                            ▼
                                                            useRelatedTopics(currentTopic)
                                                                            │
                                                                            ▼
                                                            RelatedTopicsSection (list / loading / no-results)
                                                                            │
                                                                            ▼ on select
                                                              navigate(`/${menuId}/${slug}`)
```

No existing entity (`Topic`, `SearchableTopic`, `TopicConfig`) is modified.
