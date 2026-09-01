# Data Model: Topic Complexity Filtering

## Entity: Topic

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique topic identifier within its menu dataset |
| `slug` | `string` | URL-safe identifier used in topic route segments |
| `title` | `string` | User-facing topic title |
| `markdownPath` | `string` | Relative path to topic content file |
| `complexity` | `'Easy' \| 'Medium' \| 'Hard' \| 'Unknown'` | Complexity classification used for filtering |

**Validation rules**:
- `id`, `slug`, `title`, and `markdownPath` are required.
- `complexity` SHOULD be one of `Easy`, `Medium`, or `Hard` for fully curated records.
- If `complexity` is missing in source data, normalize to `Unknown` at load time.
- `slug` remains unique within each topic dataset.

---

## Entity: ComplexityFilterSelection

| Field | Type | Description |
|-------|------|-------------|
| `selectedComplexity` | `'All' \| 'Easy' \| 'Medium' \| 'Hard'` | Active complexity filter chosen by the user |
| `defaultValue` | `'All'` | Initial selection on first main-page load |

**Validation rules**:
- `selectedComplexity` MUST initialize to `All` on first page load.
- `selectedComplexity` MUST always be a supported option.

**State transitions**:
1. **Initial load**: `selectedComplexity = 'All'`.
2. **User selection**: updates to one of `Easy`, `Medium`, `Hard`.
3. **User reset**: returns to `All`.

---

## Entity: TopicSearchAndFilterState

| Field | Type | Description |
|-------|------|-------------|
| `searchQuery` | `string` | User-entered topic search text |
| `selectedComplexity` | `'All' \| 'Easy' \| 'Medium' \| 'Hard'` | Active complexity selection |
| `allTopics` | `Topic[]` | Source topic list for active menu |
| `visibleTopics` | `Topic[]` | Derived list that satisfies active filters |

**Derivation rules**:
- `visibleTopics` is derived from `allTopics` by applying both filters:
  - Search predicate: topic title contains `searchQuery` (case-insensitive).
  - Complexity predicate:
    - if `selectedComplexity = 'All'`, include all complexity values,
    - otherwise include only topics where `topic.complexity = selectedComplexity`.
- Final inclusion uses AND semantics when both predicates are active.

**State transitions**:
1. **No query + All**: all topics visible.
2. **Query only + All**: topics filtered by query.
3. **No query + specific complexity**: topics filtered by complexity only.
4. **Query + specific complexity**: topics filtered by both query and complexity.
5. **No matches**: `visibleTopics = []`; empty-results state shown.

---

## Entity: MainPageFilterView

| Field | Type | Description |
|-------|------|-------------|
| `isSearchVisible` | `boolean` | Search input is present on main page |
| `isComplexityFilterVisible` | `boolean` | Complexity filter control is present next to search |
| `emptyResultMessageVisible` | `boolean` | Whether no-results guidance is displayed |

**View rules**:
- `isSearchVisible` and `isComplexityFilterVisible` are both `true` on main page.
- `emptyResultMessageVisible` is `true` only when `visibleTopics.length = 0`.
- Controls remain visible while empty-results are shown so users can recover.
