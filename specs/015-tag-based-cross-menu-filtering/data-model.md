# Data Model: Tag-Based Cross-Menu Filtering

## Entity: TagDefinition *(new, static, hardcoded)*

`frontend/src/features/tags/data/tagDefinitions.ts`.

```ts
interface TagDefinition {
  id: string        // stable, URL-safe (e.g. "caching")
  label: string      // display name (e.g. "Caching")
  keywords: string[] // single significant words only (Decision 4), e.g. ["cache","caching","redis","memcached","eviction"]
}

const TAG_DEFINITIONS: readonly TagDefinition[]
```

No topic-specific data lives here — this is a fixed, product-curated list
(~18 entries), never generated or edited at runtime.

---

## Entity: TopicTagsIndex *(new, in-memory, session-cached, not persisted)*

Built by `getTopicTagsIndex()` in
`frontend/src/features/tags/data/getTopicTagsIndex.ts`.

```ts
type TopicTagsIndex = Map<string, string[]> // topic.id -> matched tag ids
```

| Aspect | Rule |
|--------|------|
| Population | For every `SearchableTopic` from `getAllSearchableTopics()`, look up its word set via `getRelatedTopicsKeywordIndex()` (feature 014), then collect every `TagDefinition.id` whose `keywords` intersects that word set at all |
| Caching | Module-level `let tagIndexPromise: Promise<TopicTagsIndex> \| null` — first call awaits `getRelatedTopicsKeywordIndex()` then builds the map once; subsequent calls (same session) return the same promise |
| Topics with no matching tag | Present in the map with an empty array (not omitted) — simplifies `.get(id) ?? []` call sites |

---

## Entity: TopicTagsState / TagTopicsState / AllTagsState *(new, hook-local state)*

Three small hooks, all following the same `{status: 'loading' \| 'ready', ...}` shape already established by `useContentSearchResults`/`useRelatedTopics`.

```ts
// frontend/src/features/tags/hooks/useTopicTags.ts
interface TopicTagsState {
  status: 'loading' | 'ready'
  tagIds: string[] // this topic's matched tag ids, once ready
}

// frontend/src/features/tags/hooks/useTopicsByTag.ts
interface TagTopicsState {
  status: 'loading' | 'ready'
  topics: SearchableTopic[] // every topic (any menu) carrying this tag, once ready
}

// frontend/src/features/tags/hooks/useAllTagsWithCounts.ts
interface TagWithCount {
  id: string
  label: string
  count: number // current number of topics carrying this tag
}
interface AllTagsState {
  status: 'loading' | 'ready'
  tags: TagWithCount[]
}
```

**State transitions** (identical shape for all three): `status` starts
`'loading'`, awaits `getTopicTagsIndex()` (cached after the first resolve
in a session), then becomes `'ready'` with the derived value computed via
`useMemo`.

---

## Reused, unmodified entities

- **`SearchableTopic`** (feature 009) — unchanged; a tag's topic list is
  exactly this existing shape.
- **`getRelatedTopicsKeywordIndex()`** (feature 014) — unchanged, only
  additively imported.
- **`Topic`** (`features/main/model/types.ts`) — unchanged; `TopicCard`
  gains an optional `tags?: string[]` display prop, not a new field on the
  entity itself.

## Relationships

```text
getRelatedTopicsKeywordIndex()  ──▶ Map<topicId, Set<word>>
                                          │
TAG_DEFINITIONS (static)  ────────────────┤
                                          ▼
                              getTopicTagsIndex() ──▶ Map<topicId, tagId[]>
                                          │
              ┌───────────────────────────┼───────────────────────────┐
              ▼                           ▼                           ▼
      useTopicTags(topic)      useTopicsByTag(tagId)         useAllTagsWithCounts()
      (TopicCard/TopicInfoPage)  (TagTopicsPage)               (TagsIndexPage)
```

No existing entity (`Topic`, `SearchableTopic`, `TopicConfig`) is modified.
