# Data Model: Topic Progress Tracking

## Entity: ProgressState *(new, persisted)*

The persisted shape stored under `PROGRESS_STORAGE_KEY =
'fullstack-guide.topic-progress.v1'` in `localStorage`, managed by
`frontend/src/features/progress/data/progressStorage.ts`.

```ts
type ProgressState = Record<string, true>
```

| Aspect | Rule |
|--------|------|
| Key format | `` `${menuId}/${slug}` `` — a completed topic's composite key (for example, `"azure/azure-event-hubs"`) |
| Value | Always literal `true`; a key's mere presence means "completed". There is no `false` value — toggling off deletes the key |
| Read | `readProgressState()`: `JSON.parse` inside `try/catch`; result MUST be a plain object (not array/null/primitive) or the function returns `{}` |
| Write | `writeProgressState(state)`: `JSON.stringify` inside `try/catch`, best-effort (storage may be disabled/full — failures are silently ignored, matching the existing `ThemeModeContext` pattern) |

**Validation rules**:
- `menuId` and `slug` MUST NOT contain the `/` separator character
  themselves (existing menu ids and topic slugs in this codebase are
  kebab-case identifiers with no `/`, so this holds for all current data).
- A key referencing a `menuId`/`slug` pair that no longer exists in the
  current topic data is not an error — it is simply excluded from every
  derived `MenuProgressSummary` (see below) and is only ever removed
  explicitly via `resetMenuProgress`.

---

## Entity: TopicProgressContextValue *(new, in-memory, Context)*

Exposed by `TopicProgressContext` / consumed via `useTopicProgress()` in
`frontend/src/features/progress/context/TopicProgressContext.tsx`.

| Field | Type | Description |
|-------|------|-------------|
| `isCompleted` | `(menuId: string, slug: string) => boolean` | Looks up `` `${menuId}/${slug}` `` in the current in-memory state |
| `toggleCompletion` | `(menuId: string, slug: string) => void` | Flips the key's presence (adds if absent, deletes if present); updates in-memory state and persists via `writeProgressState` |
| `resetMenuProgress` | `(menuId: string) => void` | Deletes every key whose prefix is `` `${menuId}/` `` from state; persists the result |

**State transitions**:
1. **Provider mounts**: initial state = `readProgressState()` (lazy
   `useState` initializer, same pattern as `getInitialMode()` in
   `ThemeModeContext.tsx`).
2. **`toggleCompletion(menuId, slug)`**: if `` `${menuId}/${slug}` `` is
   present, remove it (topic becomes not-completed); otherwise add it with
   value `true` (topic becomes completed). Reversible per FR-002.
3. **`resetMenuProgress(menuId)`**: removes all keys starting with
   `` `${menuId}/` ``; keys for every other `menuId` are untouched (FR-006,
   SC-005).
4. Every transition above calls `writeProgressState` with the new state
   immediately after updating in-memory state, so persistence (FR-003) never
   lags behind what is rendered.

---

## Entity: MenuProgressSummary *(new, derived, not persisted)*

Computed by `useMenuProgressSummary(menuId, topics)` in
`frontend/src/features/progress/hooks/useMenuProgressSummary.ts`, memoized
per `(menuId, topics, progressState)` change.

| Field | Type | Description |
|-------|------|-------------|
| `completed` | `number` | Count of `topics` entries where `isCompleted(menuId, topic.slug)` is `true` |
| `total` | `number` | `topics.length` — the current, live topic count for the menu (never a stale/cached total) |

**Derivation rule**: `completed = topics.filter((t) => isCompleted(menuId,
t.slug)).length`. Because `topics` always comes from the current
`getMenuTopicSource(menuId)` call (existing, unmodified function), a
completion record for a slug no longer present in `topics` is automatically
excluded — satisfying the Edge Case requirement that stale records never
inflate or error a menu's progress display (FR-009).

---

## Relationships

```text
localStorage["fullstack-guide.topic-progress.v1"]
        │  readProgressState() / writeProgressState()
        ▼
TopicProgressProvider (in-memory ProgressState)
        │  useTopicProgress()
        ├────────────────────────────┬───────────────────────────────┐
        ▼                            ▼                                ▼
TopicInfoPage                   MainPage                        TopicCard (via TopicList)
 toggleCompletion(menuSlug,       useMenuProgressSummary(menuSlug,    completed prop
   topicSlug)                       getMenuTopicSource(menuSlug))     (derived from
 isCompleted(menuSlug,             resetMenuProgress(menuSlug)         isCompleted per row,
   topicSlug) → toggle             (via ResetProgressDialog)           passed down by MainPage)
   button's pressed state
```

No existing entity (`Topic`, `TopicConfig`, `MenuTileSummary`, etc.) is
modified. `MenuProgressSummary` and `ProgressState` are purely additive and
read the existing `Topic[]` arrays without changing their shape.
