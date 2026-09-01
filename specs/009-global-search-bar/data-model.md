# Data Model: Global Search Bar

## Entity: SearchableTopic *(new, derived, cross-menu)*

Produced by `getAllSearchableTopics()` in
`frontend/src/features/search/data/getAllSearchableTopics.ts`, by flattening
every menu's `Topic[]` (from `getTopicConfigMap()`) and joining each one with
its owning menu's id/label (from `getSortedMenuItems()`). Not persisted;
recomputed via a module-level constant or `useMemo` since the underlying JSON
is static build-time data (same pattern as `getMenuTopicSource`).

| Field | Type | Description |
|-------|------|-------------|
| `topic` | `Topic` *(existing type)* | The underlying topic, unchanged shape (`id`, `slug`, `title`, `markdownPath`, `complexity?`) |
| `menuId` | `string` | Id of the menu area the topic belongs to (matches `NavigationMenuItem.id` / route segment) |
| `menuLabel` | `string` | Display label of the owning menu, resolved via `getSortedMenuItems()` (falls back to `menuId` if no matching label is found) |

**Derivation rule**: For each `menuId` key in `getTopicConfigMap()`, map each
of its `topics` to one `SearchableTopic` with that `menuId` and its resolved
`menuLabel`. Order is not significant (the results list applies no explicit
sort beyond match order).

**Validation rules**:
- `topic.title` is required and non-empty (inherited from the existing
  `Topic` entity's existing content contract).
- `menuId` MUST correspond to a key present in `getTopicConfigMap()`.

---

## Entity: Search Query *(new, URL-carried, not a data model type)*

The free-text keyword the user types. Not defined as a TypeScript
interface — it is a single `string`, read from and written to the `q` query
parameter of the `/search` route via `useSearchParams()`.

| Aspect | Rule |
|--------|------|
| Source of truth | The `q` query parameter on `/search` (for example, `/#/search?q=azure`) |
| Empty/whitespace handling | A submit action (Enter or search icon) with an empty or whitespace-only value MUST NOT navigate (FR-003); once on `/search`, an empty `q` value is treated as "no keyword" and yields the empty-state message |
| Persistence | None beyond the URL itself — no localStorage/sessionStorage, no Context |

---

## Entity: GlobalSearchBarState *(new, local component state)*

Local state owned by `GlobalSearchBar` (not persisted, not in Context, per
Constitution Principle III).

| Field | Type | Description |
|-------|------|-------------|
| `value` | `string` | Current text typed into the Global Search bar; cleared on successful submit |
| `manuallyExpanded` | `boolean` | Whether the user has explicitly re-opened the input while on `/search` (FR-010); reset to `false` on route change away from `/search` and on submit |

**Derived value**: `isCollapsed = isOnSearchPage && !manuallyExpanded`, where
`isOnSearchPage = useLocation().pathname === '/search'`.

**State transitions**:
1. **Type in the input** (not on `/search`, or on `/search` with
   `manuallyExpanded === true`): `value` updates to the typed text; no
   navigation occurs.
2. **Submit with non-empty trimmed `value`** (Enter key or search
   icon/button activation): navigate to `/search?q=<value>`; then reset
   `value` to `''` and `manuallyExpanded` to `false`.
3. **Submit with empty/whitespace-only `value`**: no navigation; state is
   unchanged (FR-003 / Edge Cases).
4. **Select the collapsed search icon** (only possible when
   `isOnSearchPage` is `true`): set `manuallyExpanded` to `true`, revealing
   the text input in place.
5. **Route changes away from `/search`**: `manuallyExpanded` resets to
   `false` **and** `value` resets to `''` (single Effect keyed on
   `pathname`, see [research.md](research.md) Decision 4). Clearing `value`
   here — not only on submit — is required because a user can type into a
   re-expanded bar on `/search` and then navigate away without submitting
   (for example, by selecting a top-nav menu item); without this reset, that
   leftover text would otherwise reappear on the next page, violating
   FR-011's "empty text input" requirement.

---

## Entity: SearchResultsPageState *(new, local component state)*

Local state owned by `SearchResultsPage`.

| Field | Type | Description |
|-------|------|-------------|
| `keyword` | `string` | Editable keyword shown in the page's own search bar; initialized from the `q` query parameter on mount |

**Derived value**: `results: SearchableTopic[]` — computed via
`useGlobalTopicSearch(getAllSearchableTopics(), keyword)`, filtering to
entries whose `topic.title` contains `keyword` case-insensitively (FR-012).
No pagination or maximum count is applied (Clarifications, FR-005).

**State transitions**:
1. **Page loads with a `q` query parameter**: `keyword` initializes to that
   value; `results` computes immediately (no loading state needed — all data
   is already in memory).
2. **User edits the page's own search bar**: `keyword` updates; the `q` query
   parameter is replaced (not pushed) to match, via `setSearchParams({ q:
   keyword }, { replace: true })`; `results` recomputes (FR-006).
3. **`results` is empty**: the page renders the empty-state message instead
   of a list (FR-007).
4. **User selects a result**: navigate to `/${menuId}/${topic.slug}` (FR-008).

---

## Relationships

```text
getTopicConfigMap()  ──┐
                        ├─▶ getAllSearchableTopics() ─▶ SearchableTopic[] ─▶ useGlobalTopicSearch() ─▶ results
getSortedMenuItems() ──┘                                                           ▲
                                                                                    │
                                              SearchResultsPage.keyword ───────────┘
                                                       ▲
                                                       │ initializes from / syncs to
                                                  `q` query param on `/search`
                                                       ▲
                                                       │ set by submit
                                            GlobalSearchBar.value (on submit)
```

No new entity is written back to any existing data source; this feature only
reads `Topic` and `NavigationMenuItem` data that already exists.
