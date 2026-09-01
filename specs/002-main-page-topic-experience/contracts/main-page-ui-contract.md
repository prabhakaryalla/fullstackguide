# UI Contract: Main Page Topic Experience

## Purpose

Define the externally observable UI behavior, route structure, and data shapes
for the Main Page Topic Experience feature.

---

## 1. Route contract

| Route                          | Component        | Description                              |
|--------------------------------|------------------|------------------------------------------|
| `#/:menuSlug`                  | `MainPage`       | Menu-specific topic search and tile list |
| `#/:menuSlug/:topicSlug`       | `TopicInfoPage`  | Markdown-rendered topic content page     |

- Both routes MUST be registered in `AppRouter` under the existing `HashRouter`.
- `:menuSlug` MUST match the `id` field of a menu item in `menuConfig.json`
  (e.g., `azure`, `dotnet`, `csharp`).
- `:topicSlug` MUST match the `slug` field of a topic in the corresponding
  `<menuSlug>-topics.json`.
- Deep-linking to any valid `#/:menuSlug` or `#/:menuSlug/:topicSlug` URL MUST
  render the correct page without a full reload.

---

## 2. Topic config data contract

One JSON file per menu, located at:
`frontend/src/features/main/data/<menuSlug>-topics.json`

Required shape:

```json
{
  "menuId": "azure",
  "topics": [
    {
      "id": "azure-event-hubs",
      "slug": "azure-event-hubs",
      "title": "Azure Event Hubs",
      "markdownPath": "azure/azure-event-hubs.md"
    }
  ]
}
```

Rules:
- `menuId` must match a valid menu `id` in `menuConfig.json`.
- `topics` must be an array (empty array is valid).
- Each topic `id` must be unique within the file.
- Each topic `slug` must be unique, lowercase, and URL-safe.
- `title` must be non-empty.
- `markdownPath` must be a relative path of the form `<menuSlug>/<filename>.md`
  pointing to a file under `frontend/src/features/main/content/`.

---

## 3. Main page interaction contract

- The main page MUST display a search bar and a topic tile grid on initial load.
- When no search text is entered, ALL topics from the menu config MUST be shown.
- Topic tiles MUST be rendered as MUI `Card` components in a responsive grid
  (1 column on xs, 2 on sm, 3+ on md).
- Each tile MUST show the topic `title`.
- Clicking or keyboard-activating a tile MUST navigate to
  `#/:menuSlug/:topicSlug`.
- Navigation MUST update the browser history (supports back/forward).

---

## 4. Search behavior contract

- Search input MUST have an accessible label.
- Filtering MUST apply a **case-insensitive substring match** on `title` only.
- Example: query `"az"` MUST match topic titled `"Azure Event Hubs"`.
- Filtering MUST update the visible tiles synchronously on each keystroke.
- Clearing the search input MUST restore the full topic list.
- If no topics match, an inline empty-result message MUST be displayed without
  layout breakage (FR-010).

---

## 5. Topic information page contract

- The page MUST render the Markdown content from the file at
  `content/<markdownPath>` using `react-markdown` + `remark-gfm`.
- Mermaid code fences (` ```mermaid `) MUST be rendered using `mermaid.js`
  via a `MermaidBlock` component.
- Non-Mermaid diagram fences MUST NOT crash the page; they MUST degrade
  gracefully (e.g., rendered as a plain code block with a caption).
- A "back" navigation affordance (e.g., MUI `Button` or breadcrumb) MUST be
  present, navigating back to `#/:menuSlug`.

---

## 6. Empty and error state contract

| Scenario                              | Required UI Response                          |
|---------------------------------------|-----------------------------------------------|
| Menu has zero topics in config        | Inline "No topics available" message (FR-011) |
| Search returns no matches             | Inline empty-result message (FR-010)          |
| Topic Markdown file missing/unparseable | Inline "Content unavailable" message (FR-012) |
| Non-Mermaid diagram syntax in Markdown | Graceful degradation, no crash (FR-009)       |

All error states MUST preserve page layout and navigation affordances.

---

## 7. Accessibility contract

- Search input has a visible, programmatically associated label.
- Topic tiles are keyboard-focusable and activatable via `Enter` or `Space`.
- Focus indicators are visible on all interactive elements.
- Topic information page has a semantic heading hierarchy (`h1` for topic
  title, subsequent headings from Markdown content).
- WCAG 2.1 AA contrast requirements are met for all text and interactive
  elements.
