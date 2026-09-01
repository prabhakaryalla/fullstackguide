# Feature Specification: Topic Complexity Filtering

**Feature Branch**: `[004-topic-complexity-filter]`

**Created**: 2026-08-27

**Status**: Draft

**Input**: User description: "user should be able to filter the topic based on the complexity"

## User Scenarios & Testing *(mandatory)*

### User Story 4 - Filter Topics by Complexity (Priority: P1)

As a user, I want to filter topics by complexity so I can focus on content that matches my current skill level while still being able to combine this with text search.

**Why this priority**: Complexity-based filtering directly improves discoverability and learning efficiency on the core topic-browsing experience.

**Independent Test**: Can be fully tested by opening the main page, selecting each complexity option, and verifying that only matching topics are shown (including combined search + complexity filtering).

**Acceptance Scenarios**:

1. **Given** the main page is loaded, **When** the user views the topic controls, **Then** a complexity filter is visible beside the search input and defaults to `All`.
2. **Given** a topic list with mixed complexity values, **When** the user selects `Easy`, **Then** only topics marked `Easy` are displayed.
3. **Given** a topic list with mixed complexity values, **When** the user selects `Medium` or `Hard`, **Then** only topics matching the selected complexity are displayed.
4. **Given** the user has entered a search term and selected a complexity, **When** filtering is applied, **Then** the results include only topics that satisfy both the search term and selected complexity.
5. **Given** the user has selected a complexity in one menu route, **When** the user navigates to another menu route or refreshes the page, **Then** the complexity filter is re-initialized to `All` for that route.
6. **Given** keyboard-only navigation on the main page, **When** the user tabs to the complexity filter and changes selection, **Then** focus remains visible and topic results update correctly.

---

### Edge Cases

- What happens when no topics match the selected complexity: the system shows a persistent no-results message that states no topics match current filters and remains until filters are changed.
- What happens when no topics match both search and complexity: the system shows no results and keeps the active filters visible so users can adjust them.
- What happens when a topic has no assigned complexity value: it is treated as `Unknown` and excluded from `Easy`, `Medium`, and `Hard` filtered views.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide a topic complexity filter in the same control group as the topic search control; on desktop widths (`>=1024px`) both controls appear on one row with search first, and on smaller widths (`<1024px`) controls may wrap to two rows while preserving order (search before complexity filter).
- **FR-002**: System MUST present complexity filter options including `All`, `Easy`, `Medium`, and `Hard`.
- **FR-003**: System MUST initialize the complexity filter to `All` on initial main-page load, on browser refresh of any main-page route, and when navigating to a different menu route.
- **FR-004**: System MUST display all topics when the complexity filter is set to `All`.
- **FR-005**: System MUST display only topics with the matching complexity when the user selects `Easy`, `Medium`, or `Hard`.
- **FR-006**: System MUST apply search criteria and complexity criteria together so only topics satisfying both are shown.
- **FR-007**: Topic records MUST include a complexity classification value for filtering.
- **FR-008**: System MUST provide a clear no-results state when filtering returns zero matching topics.
- **FR-009**: System MUST provide an accessible label for the complexity filter and support keyboard operation for selection changes with visible focus states.
- **FR-010**: System MUST show a no-results message when visible topic count is zero; the message MUST indicate that no topics match current filters and MUST remain visible until search text or complexity selection changes.

### Key Entities *(include if feature involves data)*

- **Topic**: Represents a learning topic shown in the catalog, including title, descriptive metadata, and a complexity classification.
- **Complexity Filter Selection**: Represents the user-selected complexity state (`All`, `Easy`, `Medium`, `Hard`) used to constrain visible topics.
- **Search Query**: Represents the user-entered text criteria that is combined with complexity filtering to produce final results.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of displayed topics match the selected complexity value whenever complexity is not `All`.
- **SC-002**: 100% of displayed topics satisfy both active search text and selected complexity when both filters are used.
- **SC-003**: At least 95% of users in acceptance testing can apply a complexity filter and find matching topics within 30 seconds.
- **SC-004**: In test runs covering all complexity options, filtering state is correctly initialized to `All` on first page load in 100% of runs.
- **SC-005**: In accessibility validation, 100% of tested main-page filter interactions are keyboard operable with visible focus and an announced control label.

## Assumptions

- Existing topic content is in scope for enrichment with a complexity value where missing.
- Complexity values are limited to `Easy`, `Medium`, and `Hard` for this release.
- Access control differences by user type are out of scope; all users receive the same filtering behavior.
- Persisting filter preferences across sessions is out of scope for this story unless defined in a separate feature.
