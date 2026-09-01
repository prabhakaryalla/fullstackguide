# Data Model: Main Page Topic Experience

## Entity: Topic

| Field        | Type     | Description                                              |
|--------------|----------|----------------------------------------------------------|
| `id`         | `string` | Unique identifier for the topic within its menu          |
| `slug`       | `string` | URL-safe identifier used in the route path segment       |
| `title`      | `string` | Display name shown in the topic tile and info page       |
| `markdownPath` | `string` | Path to the Markdown file relative to `content/` folder |

**Validation rules**:
- `id` is required, unique within its `TopicConfig`.
- `slug` is required, URL-safe (lowercase, hyphens only), unique within its
  `TopicConfig`.
- `title` is required, trimmed, non-empty.
- `markdownPath` is required; format is `<menuSlug>/<filename>.md`.

---

## Entity: TopicConfig

| Field     | Type      | Description                                          |
|-----------|-----------|------------------------------------------------------|
| `menuId`  | `string`  | Matches the menu `id` from the landing `menuConfig`  |
| `topics`  | `Topic[]` | Ordered list of topics for this menu                 |

**Validation rules**:
- `menuId` is required and must match a valid menu `id` in the landing
  `menuConfig.json`.
- `topics` must be an array; an empty array is valid and triggers the
  "No topics available" empty state (FR-011).
- `topics` ordering in the JSON determines display order in the tile grid.

**Example** (`azure-topics.json`):

```json
{
  "menuId": "azure",
  "topics": [
    {
      "id": "azure-event-hubs",
      "slug": "azure-event-hubs",
      "title": "Azure Event Hubs",
      "markdownPath": "azure/azure-event-hubs.md"
    },
    {
      "id": "azure-service-bus",
      "slug": "azure-service-bus",
      "title": "Azure Service Bus",
      "markdownPath": "azure/azure-service-bus.md"
    }
  ]
}
```

---

## Entity: SearchQuery

| Field           | Type       | Description                                              |
|-----------------|------------|----------------------------------------------------------|
| `text`          | `string`   | Raw user-entered search string                           |
| `filteredTopics` | `Topic[]` | Topics whose `title` contains `text` (case-insensitive) |

**Filtering rule**: `topic.title.toLowerCase().includes(query.toLowerCase())`

**State transitions**:
1. **Initial / empty query**: `filteredTopics` equals full `topics` array from
   config.
2. **Query entered**: `filteredTopics` recomputed synchronously on each
   keystroke.
3. **Query cleared**: Reverts to full `topics` array (FR-003, FR-004).
4. **No match**: `filteredTopics` is an empty array; UI shows empty-result
   message (FR-010).

---

## Entity: MainPageViewState

| Field          | Type      | Description                                       |
|----------------|-----------|---------------------------------------------------|
| `menuSlug`     | `string`  | Active menu slug from the route param (`:menuSlug`) |
| `topics`       | `Topic[]` | All topics for the active menu from JSON config   |
| `searchQuery`  | `string`  | Current value of the search input                 |
| `visibleTopics` | `Topic[]` | Derived: `topics` filtered by `searchQuery`       |

**State transitions**:
1. **Route load**: `menuSlug` is read from route params; matching
   `<menuSlug>-topics.json` is imported; `topics` is populated.
2. **Config not found**: If no config matches `menuSlug`, `topics` is `[]` and
   the "No topics available" message is shown (FR-011).
3. **Search input**: `searchQuery` updates; `visibleTopics` recomputes.
4. **Topic selected**: Navigate to `#/:menuSlug/:topicSlug` (FR-006).

---

## Entity: TopicInfoPageViewState

| Field          | Type               | Description                                          |
|----------------|--------------------|------------------------------------------------------|
| `menuSlug`     | `string`           | From route param `:menuSlug`                         |
| `topicSlug`    | `string`           | From route param `:topicSlug`                        |
| `topic`        | `Topic \| null`    | Resolved from config by `topicSlug`; null if missing |
| `markdownContent` | `string \| null` | Raw Markdown string; null if file missing/unparseable |
| `status`       | `'loading' \| 'ready' \| 'unavailable'` | Loading state for async glob import |

**State transitions**:
1. **Route load**: `status = 'loading'`; topic resolved from config by slug;
   Markdown file lazily imported via `import.meta.glob`.
2. **Content ready**: `markdownContent` set; `status = 'ready'`.
3. **File missing or parse error**: `markdownContent = null`; `status =
   'unavailable'`; "Content unavailable" inline message shown (FR-012).

---

## Content Folder Structure

```text
frontend/src/features/main/content/
├── azure/
│   ├── azure-event-hubs.md
│   └── azure-service-bus.md
├── dotnet/
│   └── dotnet-dependency-injection.md
└── csharp/
    └── csharp-records.md
```

The `markdownPath` field in each `Topic` maps directly to this structure
(e.g., `"azure/azure-event-hubs.md"` → `content/azure/azure-event-hubs.md`).
