# Research: Main Page Topic Experience

## Decision 1: Use react-markdown + remark-gfm + mermaid.js for content rendering

- **Decision**: Render Markdown topic content with `react-markdown` and the
  `remark-gfm` plugin. Render Mermaid diagram code blocks via a custom
  `MermaidBlock` component that calls `mermaid.render()` on mount.
- **Rationale**: `react-markdown` is the most widely-used React Markdown
  renderer, has active maintenance, and integrates cleanly with remark plugins.
  `remark-gfm` enables GitHub-Flavoured Markdown (tables, strikethrough,
  task-lists). `mermaid.js` covers the most common architecture diagram types
  (flowchart, sequence, C4, class diagrams). No `dangerouslySetInnerHTML` is
  required because `react-markdown` renders via a React virtual DOM tree.
- **Alternatives considered**: `@uiw/react-md-editor` rejected (includes
  editing UI not needed here; heavier bundle). `marked` rejected (DOM string
  output requires `dangerouslySetInnerHTML`, violating Principle IX). No diagram
  support rejected (FR-009 explicitly requires Mermaid rendering).

## Decision 2: Static JSON config files per menu for topic-to-markdown mapping

- **Decision**: Declare topics in one JSON config file per menu (e.g.,
  `azure-topics.json`) bundled as static assets. Each topic entry includes
  `id`, `slug`, `title`, and `markdownPath` (relative to the `content/` folder).
- **Rationale**: Satisfies FR-007 clarification (static JSON at build time),
  keeps topic metadata decoupled from component logic, and makes adding new
  topics a data-only change requiring no component edits. Vite tree-shakes
  unused imports, so unused menus carry no runtime cost.
- **Alternatives considered**: Deriving topics from filesystem scan at build
  time via Vite plugin rejected (adds build complexity, harder to control
  display ordering and slugs). Single global topics JSON rejected (harder to
  scope filtering to the selected menu context; larger initial parse).

## Decision 3: HashRouter routes #/:menuSlug and #/:menuSlug/:topicSlug

- **Decision**: Extend `AppRouter` with two new routes:
  - `/:menuSlug` → `MainPage`
  - `/:menuSlug/:topicSlug` → `TopicInfoPage`
  - Landing route `/` remains unchanged.
- **Rationale**: Separate routes per menu and per topic satisfy FR-001 and
  FR-006 (deep-linking, back/forward navigation). HashRouter is required by
  Constitution §I for GitHub Pages compatibility.
- **Alternatives considered**: Inline drawer/panel on the main page rejected
  (no deep-linkable topic URL; clarification Q2 resolved to separate route).
  Query-param approach (`?menu=azure&topic=event-hubs`) rejected (less readable,
  less standard for page-level navigation in React Router).

## Decision 4: Vite import.meta.glob for lazy Markdown file imports

- **Decision**: Use `import.meta.glob('../content/**/*.md', { query: '?raw', import: 'default' })`
  in `TopicInfoPage` to lazily load the correct Markdown file at runtime based
  on the `markdownPath` from the topic config.
- **Rationale**: Vite's glob import is the idiomatic static-site pattern for
  bundling a collection of content files without a server; `?raw` returns the
  file content as a string compatible with `react-markdown`; lazy loading avoids
  importing all Markdown files upfront.
- **Alternatives considered**: Inline `import()` with a dynamic path string
  rejected (Vite cannot statically analyse fully dynamic path strings and will
  not bundle the files). Fetching Markdown via `fetch()` from the public folder
  rejected (requires an extra network round-trip; breaks offline static preview
  without a local server).

## Decision 5: Topic tiles as MUI Card components in a responsive Grid

- **Decision**: Render each topic as a clickable MUI `Card` inside a MUI
  `Grid` (responsive columns: 1 on xs, 2 on sm, 3 on md+).
- **Rationale**: MUI `Card` provides accessible, keyboard-operable interactive
  tiles with built-in elevation and hover semantics. MUI `Grid` handles
  responsive layout without custom CSS, consistent with Principle V.
- **Alternatives considered**: MUI `List` with `ListItem` rejected (linear
  list layout is less scannable than tiles for topic discovery). Custom CSS grid
  rejected (violates MUI consistency principle).

## Decision 6: Case-insensitive substring match on topic title for search

- **Decision**: Implement filtering as
  `topic.title.toLowerCase().includes(query.toLowerCase())` with no external
  library. Apply via a `useTopicSearch` hook that takes the full topic list and
  search query string and returns the filtered array.
- **Rationale**: Clarification Q4 resolved to case-insensitive substring match
  on title only. A custom hook keeps filtering logic independently testable and
  decoupled from UI state. No library needed for this level of matching.
- **Alternatives considered**: `fuse.js` fuzzy matching rejected (more complex,
  harder to test deterministically, not required by spec).

## Decision 7: Markdown content folder structure organized by menu slug

- **Decision**: Place Markdown files at
  `frontend/src/features/main/content/<menuSlug>/<filename>.md`. The
  `markdownPath` field in JSON config stores the path relative to `content/`
  (e.g., `"azure/azure-event-hubs.md"`). Example:
  - `content/azure/azure-event-hubs.md` → Azure Event Hubs topic
  - `content/dotnet/dotnet-dependency-injection.md` → .NET DI topic
- **Rationale**: Clear folder structure per menu makes content ownership obvious
  and matches the user's stated example. Glob pattern `content/**/*.md` captures
  all menus without per-menu changes to the loader.
- **Alternatives considered**: Flat `content/` folder with prefixed filenames
  rejected (harder to browse, does not scale with many topics).

## Decision 8: Graceful degradation for unsupported diagram syntax and missing markdown

- **Decision**: Unsupported diagram fences (non-Mermaid) are rendered as a
  styled code block with a `"Diagram syntax not supported"` caption.
  Missing or unparseable Markdown files show an inline `"Content unavailable"`
  message without crashing (`try/catch` around the glob lookup and Mermaid
  render).
- **Rationale**: FR-009 requires non-Mermaid syntax to not crash; FR-012
  requires an inline message for missing Markdown. Graceful degradation keeps
  the page usable for all topics even when some content is incomplete.
- **Alternatives considered**: Redirecting to error page rejected (disruptive;
  loses the route context). Silent empty render rejected (leaves user without
  feedback).
