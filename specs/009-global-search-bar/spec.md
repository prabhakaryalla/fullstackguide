# Feature Specification: Global Search Bar

**Feature Branch**: `[009-global-search-bar]`

**Created**: 2026-08-31

**Status**: Draft

**Input**: User description: "User Story 9, priority P1. As a user to this application, i should be able to see Global Search bar in the top Navigation. Business Rules: In the Top Navigation Global Search bar should be displayed after title and before the menus. When user types and enters in the global search bar it should redirect to new page search page. Acceptance Criteria: Scenario 1: When user visits the website he should be able to see the Global Search bar in the Top Navigation. Top Navigation should contain Global Search Bar. The search bar should be displayed in between the title and Menus. Scenario 2: When User Searches using Global Search bar. When user enter and click on search or click enter, it should redirect to new page search page. Scenario 3: New Search Component. The search page should contain a search bar at the top and below it should contains list of topics which matches the keyword. This is irrespective of any topic. When user is navigated to the search page, the text which is displayed in Global search should be shown inside the search page search bar. When user user navigated to the search page, the text in the global search bar should be removed and only search icon should be displayed."

## Clarifications

### Session 2026-08-31

- Q: Should the search results page limit how many matching topics are shown at once, or always display every match in one list? → A: Show all matching topics in one list, no pagination or limit.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Global Search from the Top Navigation (Priority: P1)

As an application user, I want to see and use a global search bar in the top
navigation, so that I can quickly find any topic across the entire site
without first choosing a menu area.

**Why this priority**: Search is a primary discovery mechanism once the topic
catalog grows beyond what users can browse menu-by-menu. Making it available
from every page in the top navigation delivers immediate, site-wide value and
is independently usable without any other feature.

**Independent Test**: Can be fully tested by opening the application, locating
the search bar between the title and the menu items in the top navigation,
typing a keyword, and confirming the results page shows matching topics.

**Acceptance Scenarios**:

1. **Given** a user opens the application, **When** the top navigation loads,
   **Then** a Global Search bar is visible, positioned after the title
   ("Fullstack Guide") and before the menu items (Backend, Frontend, Cloud,
   etc.).
2. **Given** the Global Search bar is visible, **When** the user types a
   keyword and presses Enter (or selects the search icon/button), **Then** the
   application navigates to a dedicated search results page.
3. **Given** the user is on any page of the application, **When** they look at
   the top navigation, **Then** the Global Search bar is available in the same
   position, regardless of which menu area or topic they are currently
   viewing.

---

### User Story 2 - View Matching Topics on the Search Results Page (Priority: P1)

As an application user, I want the search results page to show every topic
that matches my keyword regardless of which menu it belongs to, so that I
don't have to know in advance which menu area contains the topic I'm looking
for.

**Why this priority**: Returning relevant results across all menu areas is the
core value proposition of a global (cross-menu) search; without it, the
feature would be no different from the existing per-menu search.

**Independent Test**: Can be fully tested by submitting a keyword that matches
topics from more than one menu area (for example, a term that appears in both
an Azure topic and a C# topic) and confirming both appear in the results list.

**Acceptance Scenarios**:

1. **Given** a user submits a search keyword, **When** the search results page
   loads, **Then** a search bar is shown at the top of the page, pre-filled
   with the keyword the user typed in the Global Search bar.
2. **Given** the search results page has loaded, **When** the keyword matches
   topics from multiple different menu areas, **Then** all matching topics are
   listed below the search bar, irrespective of which menu they belong to.
3. **Given** the user is on the search results page, **When** they select a
   topic from the results list, **Then** the application navigates to that
   topic's content page.
4. **Given** the user is on the search results page, **When** they edit the
   keyword in the page's own search bar, **Then** the results list updates to
   reflect the new keyword.
5. **Given** a user submits a keyword that matches no topics, **When** the
   search results page loads, **Then** a clear "no results" message is shown
   instead of an empty list.

---

### User Story 3 - Global Search Bar Collapses on the Search Results Page (Priority: P2)

As an application user, I want the top navigation's Global Search bar to
collapse down to just a search icon while I'm already on the search results
page, so that I'm not shown two duplicate, out-of-sync text search inputs at
once.

**Why this priority**: This is a refinement of the search experience that
avoids visual duplication and user confusion; it depends on User Stories 1 and
2 already being in place, so it is secondary to delivering the core search
flow.

**Independent Test**: Can be fully tested by performing a global search, then
observing that the top navigation's search area now shows only a search icon
(no text input, no leftover keyword), while the full search input remains
usable on the search results page itself.

**Acceptance Scenarios**:

1. **Given** a user has just navigated to the search results page from the
   Global Search bar, **When** the search results page finishes loading,
   **Then** the Global Search bar in the top navigation no longer shows the
   typed keyword and displays only a search icon.
2. **Given** the Global Search bar is collapsed to an icon on the search
   results page, **When** the user selects the icon, **Then** the Global
   Search bar expands back into a text input so the user can start a new
   global search.
3. **Given** the user navigates away from the search results page to any other
   page, **When** the new page loads, **Then** the Global Search bar returns to
   its normal expanded state (empty text input with search icon).

---

### Edge Cases

- What happens when the user presses Enter or selects search with an empty or
  whitespace-only keyword? The application does not navigate to the search
  results page and the Global Search bar remains as-is.
- What happens when the keyword contains only special characters or produces
  no matches? The search results page loads normally and shows the "no
  results" message from User Story 2.
- What happens when a user reloads the browser while on the search results
  page? The keyword persists (carried via the page URL) and the same results
  are shown, with the Global Search bar in its collapsed icon-only state.
- What happens when the user submits a new keyword from the Global Search bar
  while already viewing the search results page? The results page updates to
  the new keyword's matches; the Global Search bar remains collapsed to an
  icon.
- How does the search behave for very short keywords (for example, a single
  character)? The same matching rules apply; all topics whose title contains
  the keyword (case-insensitive) are returned and all matches are shown in a
  single, unbounded list — no pagination or result cap is applied.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The top navigation MUST display a Global Search bar positioned
  after the application title and before the menu items, on every page of the
  application.
- **FR-002**: The Global Search bar MUST accept free-text keyword input from
  the user.
- **FR-003**: The system MUST navigate the user to a dedicated search results
  page when the user presses Enter in the Global Search bar or activates its
  search control, provided the keyword is not empty or whitespace-only.
- **FR-004**: The search results page MUST display its own search bar at the
  top of the page, pre-filled with the keyword that was submitted from the
  Global Search bar.
- **FR-005**: The search results page MUST display, below its search bar, the
  full list of topics whose title matches the keyword, drawn from all menu
  areas (not limited to any single menu), with no pagination or maximum
  result count applied.
- **FR-006**: The search results page MUST update its results list whenever
  the keyword in its own search bar changes.
- **FR-007**: The search results page MUST show a clear empty-state message
  when no topics match the current keyword.
- **FR-008**: Selecting a topic in the search results list MUST navigate the
  user to that topic's content page.
- **FR-009**: While the user is on the search results page, the Global Search
  bar in the top navigation MUST be collapsed to show only a search icon,
  with no leftover keyword text visible.
- **FR-010**: Selecting the collapsed search icon in the top navigation MUST
  expand the Global Search bar back into a usable text input.
- **FR-011**: When the user navigates away from the search results page to any
  other page, the Global Search bar MUST return to its normal expanded state
  (empty text input with search icon) rather than remain collapsed.
- **FR-012**: Keyword matching MUST be case-insensitive and MUST match
  keywords that appear anywhere within a topic's title.
- **FR-013**: The Global Search bar and the search results page MUST remain
  fully operable via keyboard (tab to focus, type, Enter to submit) and MUST
  expose an accessible name for their search inputs and icons.

### Key Entities

- **Search Query**: The free-text keyword a user submits, carried from the
  Global Search bar to the search results page (for example, via the page
  URL), and re-used to pre-fill the results page's own search bar.
- **Topic** *(existing entity)*: A content item with a title, complexity, and
  parent menu area; the search results list reuses this existing entity across
  all menu areas rather than introducing a new one.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can locate the Global Search bar in the top navigation
  within 3 seconds of landing on any page, without scrolling.
- **SC-002**: Users can go from typing a keyword to viewing matching topics
  from across all menu areas in a single action (Enter or search icon
  selection), with no intermediate steps required.
- **SC-003**: 100% of topics whose title contains the searched keyword
  (case-insensitive) appear in the search results, regardless of which menu
  area they belong to.
- **SC-004**: Users searching for a keyword with no matching topics
  immediately understand there are no results, without misinterpreting an
  empty screen as a loading or broken state.

## Assumptions

- Search matching is performed against topic titles only (mirroring the
  existing per-menu topic search behavior already in the application), not
  against full markdown content body text.
- The search results page is a new, dedicated route (for example,
  `/search`) that is reachable from any page via the Global Search bar and
  carries the keyword as a URL query parameter so it survives page reloads and
  is shareable.
- The Global Search bar is available application-wide, on the landing page,
  menu topic-list pages, and individual topic content pages alike, since it
  lives in the shared top navigation rendered on every route.
- No search history, recent searches, or autocomplete suggestions are in scope
  for this feature; only literal keyword-to-title matching is required.
- Existing topic data (title, slug, menu area, complexity) already available
  in the application's topic configuration is sufficient to power search; no
  new backend/service or data source is required.
