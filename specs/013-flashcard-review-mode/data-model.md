# Data Model: Flashcard Quick-Review Mode

## Entity: FlashcardSessionState *(new, in-memory, not persisted)*

Owned by `useFlashcardSession` in
`frontend/src/features/flashcards/hooks/useFlashcardSession.ts`.

```ts
interface FlashcardSessionState {
  topics: Topic[]           // the filtered list, re-derived from the URL (Decision 2)
  currentIndex: number      // 0-based; === topics.length means "session complete"
  revealed: boolean         // whether the current card's answer is shown
}
```

| Field | Description |
|-------|--------------|
| `topics` | Passed in from `FlashcardSessionPage` (already derived via `getMenuTopicSource` + `useTopicSearch`) — the hook does not re-filter |
| `currentIndex` | Starts at `0`; `Next` increments (capped at `topics.length`, which represents "session complete"); `Previous` decrements (floored at `0`) |
| `revealed` | Starts `false` for every card; reset to `false` on every `Next`/`Previous` transition (FR-006); set `true` by the reveal action |

**State transitions**:
1. **Reveal**: `revealed` → `true`. No effect on `currentIndex`.
2. **Next**: `currentIndex` → `min(currentIndex + 1, topics.length)`;
   `revealed` → `false`.
3. **Previous**: `currentIndex` → `max(currentIndex - 1, 0)`; `revealed` →
   `false`.
4. **Rate "Got it"**: caller (the page) marks the topic complete via the
   existing progress Context (guarded idempotent, Decision 5), then the
   hook performs the same transition as **Next**.
5. **Rate "Still learning"**: no progress-state change; the hook performs
   the same transition as **Next**.

**Derived value**: `isComplete = currentIndex >= topics.length` — drives the
"session complete" view (FR-007).

---

## Entity: Flashcard Eligibility *(new, static data)*

`frontend/src/features/flashcards/data/flashcardEligibleMenus.ts`.

```ts
const FLASHCARD_ELIGIBLE_MENU_IDS: readonly string[] = [
  'csharp-programs',
  'javascript-programs',
  'sql-programs',
]

function isFlashcardEligibleMenu(menuId: string): boolean
```

No new entity is stored — this is a static allow-list checked by both
`MainPage` (entry point visibility) and `FlashcardSessionPage` (defensive
route guard).

---

## Reused, unmodified entities

- **`Topic`** (`features/main/model/types.ts`) — unchanged; sessions are
  built entirely from existing `Topic[]` arrays.
- **Topic Completion Record** (feature 010, `features/progress`) — "Got it"
  writes through to this existing entity via the existing
  `TopicProgressContextValue.toggleCompletion`/`isCompleted`; no schema
  change.

## Relationships

```text
MainPage (searchQuery, complexity)
   │ navigate with ?q=&complexity= (Decision 2)
   ▼
FlashcardSessionPage
   │ getMenuTopicSource(menuSlug) + useTopicSearch(topics, q, complexity)  — identical derivation to MainPage
   ▼
useFlashcardSession(topics) ──▶ FlashcardSessionState { topics, currentIndex, revealed }
   │                                                        │
   │ current topic                                          │ revealed?
   ▼                                                        ▼
loadTopicMarkdown(topic) ──▶ raw markdown ──▶ TopicMarkdownContent (shared, Decision 3/4)
   │
   ▼ "Got it" only, guarded idempotent (Decision 5)
useTopicProgress().toggleCompletion(menuId, topic.slug)  — existing feature 010 Context
```
