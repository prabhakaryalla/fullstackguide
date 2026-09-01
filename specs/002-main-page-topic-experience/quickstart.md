# Quickstart: Main Page Topic Experience Validation

## Prerequisites

- Node.js 20+ installed.
- Frontend project dependencies installed (`npm install` from `frontend/`).
- `react-markdown`, `remark-gfm`, and `mermaid` packages installed.
- At least one topic config JSON (e.g., `azure-topics.json`) and its
  corresponding Markdown file(s) present under `content/azure/`.
- Local development server running (`npm run dev` from `frontend/`).

---

## Routes to validate

See [contracts/main-page-ui-contract.md](contracts/main-page-ui-contract.md)
for the full route and data shape contract.

| URL                                      | Expected page            |
|------------------------------------------|--------------------------|
| `http://localhost:5173/#/azure`          | Azure main page          |
| `http://localhost:5173/#/dotnet`         | .NET main page           |
| `http://localhost:5173/#/azure/azure-event-hubs` | Azure Event Hubs topic info |

---

## Functional validation scenarios

### 1. Main page loads from menu navigation

- Click "Azure" in the top navigation bar on the landing page.
- Verify the route changes to `#/azure`.
- Verify a search bar is visible and focused or ready for input.
- Verify the topic tile grid displays all Azure topics from
  `azure-topics.json`.

### 2. Topic tiles render correctly

- Verify each topic displays its `title` inside an MUI Card tile.
- Verify tiles are arranged in a responsive grid (at least two columns on
  a typical desktop viewport).
- Verify tiles are keyboard-focusable and show a visible focus indicator.

### 3. Search filtering

- Type `"event"` in the search bar.
- Verify only topics with "event" in their title (case-insensitive) are shown.
- Type `"EVENT"` and verify the same results appear (case-insensitive match).
- Type `"xyz123"` (no match) and verify an empty-result inline message appears
  without any layout breakage.
- Clear the search bar and verify the full topic list is restored.

### 4. Topic navigation and topic info page

- Click the "Azure Event Hubs" tile.
- Verify the route changes to `#/azure/azure-event-hubs`.
- Verify the topic information page renders the Markdown content from
  `content/azure/azure-event-hubs.md`.
- Verify headings, paragraphs, tables, and code blocks render correctly.
- Press the browser back button and verify return to `#/azure`.

### 5. Mermaid diagram rendering

- Open a topic whose Markdown file contains a Mermaid code fence.
- Verify the diagram is rendered visually (not shown as raw text).
- Verify no runtime errors appear in the browser console.

### 6. Unsupported diagram syntax degradation

- Open a topic whose Markdown file contains a non-Mermaid diagram fence
  (e.g., ` ```plantuml `).
- Verify the page does not crash.
- Verify the block is rendered as a plain code block or shows a graceful
  fallback message.

### 7. Empty topic list state

- Temporarily set `topics: []` in `azure-topics.json` and reload
  `#/azure`.
- Verify an inline "No topics available" message is shown.
- Verify the search bar is still present (or hidden gracefully; page must
  not crash).

### 8. Missing Markdown file state

- Temporarily point a topic's `markdownPath` to a non-existent file and
  navigate to its topic info page.
- Verify an inline "Content unavailable" message is shown.
- Verify the back-navigation affordance is still visible and functional.

---

## Test validation

Run the automated test suite from the `frontend/` directory:

```bash
npm run test
```

Confirm tests cover:

- `useTopicSearch` hook: empty query, matching query, no-match query,
  case-insensitive match.
- `MainPage`: renders all topics by default; filters on input; shows
  empty-result state; navigates to topic info route on tile click.
- `TopicInfoPage`: renders Markdown content; shows "Content unavailable"
  when file is missing; renders Mermaid block for Mermaid fences.
- `TopicSearch`: accessible label present; input change triggers callback.
- `TopicList`: renders one card per topic; empty list shows empty-result
  message.

---

## Expected outcome

- All acceptance scenarios from the spec pass end-to-end.
- No dead-end navigation occurs for any valid menu or topic route.
- Markdown and Mermaid content renders without runtime errors.
- Empty and error states display informative inline messages without
  crashing.
- All new routes are deep-linkable and support browser back/forward
  navigation.
