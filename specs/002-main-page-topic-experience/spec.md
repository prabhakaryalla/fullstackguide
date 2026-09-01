# Feature Specification: Main Page Topic Experience

**Feature Branch**: `002-main-page-topic-experience`

**Created**: 2026-08-26

**Status**: Draft

## Clarifications

### Session 2026-08-26

- Q: How are topics and their markdown file mappings loaded into the application? → A: Static JSON file(s) bundled with the app at build time (e.g., `topics.json` per menu)
- Q: Should the topic information page be a separate navigable route, or open as an inline panel or drawer? → A: Separate route per topic (e.g., `#/<menu-slug>/<topic-slug>`), full page navigation
- Q: Which markdown rendering library should be used, and which diagram syntax must the application support? → A: `react-markdown` + `remark-gfm` + `mermaid.js` (Mermaid diagram syntax)
- Q: How should topic search matching work? → A: Case-insensitive substring match on topic title only
- Q: What should the application display when a menu has zero topics, or a topic's markdown file is missing or unparseable? → A: Distinct inline message for each case (empty list: "No topics available"; missing/unparseable markdown: "Content unavailable")
- Analysis remediation (2026-08-26): FR-009 SHOULD upgraded to MUST (I1); SC-002 scoped to US2 delivery (C1); SC-003 "95%" replaced with mechanically testable "every interaction / one keystroke" (A1)

**Input**: User description: "/speckit.specify Create a specification for a Main Page feature where selecting a top menu opens a main page with searchable topics and markdown-based topic information."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Open Main Page from a Menu Selection (Priority: P1)

As a user of this application, when I click any top navigation menu item, I
want to land on that menu's main page so I can browse related topics.

**Why this priority**: This is the core continuation of the landing navigation
flow and is required before users can discover or read any topic content.

**Independent Test**: Can be tested by selecting a top menu item (for example,
Azure) and confirming the corresponding main page is displayed with search and
topic list sections.

**Acceptance Scenarios**:

1. **Given** the landing top navigation is visible, **When** a user clicks a
   menu item such as Azure, **Then** the system displays that menu's main page.
2. **Given** the menu main page is displayed, **When** the page loads,
   **Then** a search bar is visible and ready for input.
3. **Given** the menu main page is displayed, **When** no search text is
   entered, **Then** all topics for that selected menu are shown by default.

---

### User Story 2 - Filter Topics by Search Text (Priority: P1)

As a user, I want to type into the search bar and filter topics so I can find
relevant content quickly.

**Why this priority**: Topic filtering directly impacts findability and reduces
navigation friction when topic lists grow.

**Independent Test**: Can be tested by entering various search terms and
verifying only matching topics for the selected menu are shown.

**Acceptance Scenarios**:

1. **Given** a menu main page with topics is displayed, **When** the user types
   search text, **Then** the topic list filters to matching topics.
2. **Given** filtered results are shown, **When** the user clears the search
   text, **Then** the full topic list for that menu is restored.
3. **Given** a user enters search text with no matches, **When** filtering is
   applied, **Then** the system shows an empty-result state without breaking the
   page layout.

---

### User Story 3 - View Topic Information from Markdown (Priority: P1)

As a user, I want to select a topic and navigate to its information page so I
can read content sourced from markdown files, including architecture diagrams.

**Why this priority**: Delivering topic information is the primary user value of
the main-page browsing flow.

**Independent Test**: Can be tested by opening any topic from a selected menu
and verifying markdown content, including diagrams, renders successfully.

**Acceptance Scenarios**:

1. **Given** a menu main page topic list is displayed, **When** a user clicks a
   topic item, **Then** the user is navigated to the topic information page.
2. **Given** a topic information page is opened, **When** markdown source exists
   for that topic, **Then** the content is rendered correctly from the source
   markdown file.
3. **Given** markdown content includes architecture diagrams, **When** the page
   renders, **Then** diagrams are displayed without rendering failures.

### Edge Cases

- What happens when a selected menu has zero topics configured? Resolved: display inline "No topics available" message.
- How does filtering behave for mixed-case search text and partial matches? Resolved: case-insensitive substring match on topic title.
- What happens when the markdown file for a selected topic is missing or cannot
  be parsed? Resolved: display inline "Content unavailable" message on the topic information page.
- How does the topic page respond when markdown contains unsupported diagram
  syntax?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST navigate users to a menu-specific main page when any
  top navigation menu item is selected. The main page MUST be accessible via a
  dedicated HashRouter route (e.g., `#/<menu-slug>`).
- **FR-002**: System MUST display a search bar on the menu-specific main page.
- **FR-003**: System MUST display all topics related to the selected menu by
  default when no search text is entered.
- **FR-004**: System MUST filter visible topics based on user-entered search
  text using a case-insensitive substring match against each topic's title only.
- **FR-005**: System MUST allow users to select any visible topic from the
  filtered or unfiltered topic list.
- **FR-006**: System MUST navigate to a topic information page when a topic is
  selected. Each topic information page MUST be accessible via a dedicated
  HashRouter route (e.g., `#/<menu-slug>/<topic-slug>`), supporting browser
  back/forward navigation and direct deep-linking.
- **FR-007**: System MUST source topic information content from markdown files
  placed in the application source. Topic-to-markdown mappings MUST be declared
  in static JSON configuration file(s) (e.g., `topics.json` per menu) bundled
  with the application at build time.
- **FR-008**: System MUST render markdown content using `react-markdown` with
  the `remark-gfm` plugin, without layout or runtime failures for GFM-supported
  markdown syntax.
- **FR-009**: System MUST render Mermaid architecture diagrams contained in
  markdown using `mermaid.js`. Diagram syntaxes outside of Mermaid are out of
  scope and MUST NOT cause a page crash; they MUST degrade gracefully (e.g.,
  display a fallback message).
- **FR-010**: System MUST preserve page usability when no topics match the
  current search text, displaying an inline empty-result message without
  breaking page layout.
- **FR-011**: System MUST display an inline "No topics available" message when
  a selected menu has zero topics configured in its Topic Config.
- **FR-012**: System MUST display an inline "Content unavailable" message on the
  topic information page when the associated markdown file is missing or cannot
  be parsed, without crashing or leaving an empty view.

### Key Entities *(include if feature involves data)*

- **Main Page**: A menu-specific page shown after top menu selection containing
  search and topic discovery controls.
- **Selected Menu Context**: The active top-level menu (for example, Azure)
  used to scope topic retrieval and display.
- **Topic**: A selectable learning item within a selected menu context that
  leads to a topic information page.
- **Topic List**: The visible collection of topics for the selected menu,
  filtered by search text when present.
- **Search Query**: User-entered text used to narrow visible topics.
- **Topic Information Page**: A destination view that displays rendered content
  for a selected topic.
- **Markdown Topic Source**: The markdown file artifact associated with a topic,
  used as the canonical content source.
- **Topic Config**: A static JSON file bundled at build time that declares the
  list of topics for a given menu, including each topic's identifier, display
  name, and relative markdown file path.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of top-menu selections open the corresponding menu-specific
  main page.
- **SC-002**: 100% of menu-specific main pages display a search bar and default
  topic list on initial load. This criterion is satisfied at User Story 2
  completion (search wired); the topic list alone satisfies User Story 1.
- **SC-003**: Every search interaction MUST return correctly filtered topics
  within one keystroke event. Filtering MUST apply a case-insensitive substring
  match on topic title; for example, typing `"az"` MUST match a topic titled
  `"Azure"`.
- **SC-004**: 100% of topic selections navigate to a topic information page
  without dead-end navigation.
- **SC-005**: 100% of valid markdown topic files render readable content, and
  supported architecture diagrams render without runtime errors.

## Assumptions

- Top navigation menu selection behavior already exists from the landing-page
  feature.
- Topic-to-markdown mapping metadata is available or can be derived at runtime.
- Diagram rendering support is limited to Mermaid syntax (`mermaid.js`); all
  other diagram syntaxes are out of scope and must degrade gracefully.
- Search is scoped to topics under the currently selected menu context only.
