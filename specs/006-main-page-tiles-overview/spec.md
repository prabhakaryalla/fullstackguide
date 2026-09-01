# Feature Specification: Main Page Tiles Overview

**Feature Branch**: `[006-main-page-tiles-overview]`

**Created**: 2026-08-30

**Status**: Draft

**Input**: User description: "Create a specification for a Main Page feature using User Story 6 (P1) with clickable menu tiles, topic complexity statistics, and navigation to topic list pages."

## Clarifications

### Session 2026-08-30

- Q: Which single extra insight must every menu tile show beyond topic counts to satisfy FR-011? → A: Dominant complexity level.
- Q: When a menu tile shows zero topics, what should happen if the user activates that tile? → A: Navigate to that menu page and show an empty topic list state.
- Q: If a menu has missing complexity labels on some topics, how should the tile show hard/medium/easy counts? → A: Exclude missing from hard/medium/easy and show Unknown count.

## User Scenarios & Testing *(mandatory)*

### User Story 6 - Browse Learning Menus From Main Page (Priority: P1)

As a user of this application, I want the main page to open with clear menu tiles so I can quickly understand available learning areas and open the topic list for a selected menu.

**Why this priority**: The main page is the first step of the user journey. If users cannot discover categories and click into a topic list quickly, the application fails its primary browsing purpose.

**Independent Test**: Can be fully tested by opening the website root URL, verifying all menu tiles and tile details are visible, then clicking any tile to confirm navigation to the matching topic list page.

**Acceptance Scenarios**:

1. **Given** a user opens the website root URL, **When** the application loads, **Then** the main page is displayed with all configured menu tiles and supporting details.
2. **Given** a user views a tile on the main page, **When** the tile is shown, **Then** it includes user-friendly statistics for that menu including total topics, hard topic count, medium topic count, and easy topic count.
3. **Given** a user views a tile on the main page, **When** the tile is shown, **Then** it includes the dominant complexity level for that menu.
4. **Given** a user selects any menu tile, **When** the tile is activated, **Then** the user is navigated to the topic list page for that selected menu.
5. **Given** a user uses keyboard navigation, **When** focus reaches a tile and the tile is activated, **Then** navigation behavior matches pointer activation.
6. **Given** a user selects a tile for a menu with zero topics, **When** the tile is activated, **Then** the user is navigated to that menu page and sees an empty topic list state.
7. **Given** some topics in a menu are missing complexity labels, **When** tile statistics are shown, **Then** hard, medium, and easy counts exclude those topics and an Unknown count is displayed.

---

### Edge Cases

- What happens when a menu has zero topics: the tile remains visible, shows zero values for all topic statistics, and still navigates to the menu page where an empty topic list state is shown.
- What happens when a menu has no complexity breakdown available: the tile still shows total topics and displays Unknown count for topics missing complexity labels.
- What happens when there are many menus: the page still presents all tiles in a scannable layout without hiding any configured menu.
- What happens when a user activates a tile multiple times quickly: navigation resolves to the same selected topic list page without sending users to an unrelated menu.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display the main page when a user visits the website root URL.
- **FR-002**: System MUST display a tile for each configured menu category on the main page.
- **FR-003**: Each menu tile MUST be user friendly and clearly readable, including a visible menu name.
- **FR-004**: Each menu tile MUST display total topic count for that menu.
- **FR-005**: Each menu tile MUST display hard topic count for that menu.
- **FR-006**: Each menu tile MUST display medium topic count for that menu.
- **FR-007**: Each menu tile MUST display easy topic count for that menu.
- **FR-008**: Users MUST be able to activate a menu tile to navigate to the corresponding topic list page.
- **FR-009**: Tile activation MUST preserve category mapping accuracy so users always land on the topic list page for the tile they selected.
- **FR-010**: System MUST support both pointer and keyboard activation for interactive menu tiles.
- **FR-011**: System MUST display the dominant complexity level on each tile as the additional decision-support insight beyond raw counts.
- **FR-012**: For menus with zero topics, tile activation MUST still navigate users to the corresponding menu page and present an explicit empty topic list state.
- **FR-013**: Each menu tile MUST display unknown topic count when topic complexity labels are missing.
- **FR-014**: Hard, medium, and easy counts MUST include only topics with matching explicit complexity labels and MUST exclude topics counted as unknown.

### Key Entities *(include if feature involves data)*

- **Menu Tile**: A main page card representing one menu category, containing title, statistics, and activation behavior.
- **Menu Statistics**: Per-menu summary values including total topics and complexity breakdown counts.
- **Tile Navigation Target**: The destination topic list page associated with a selected menu tile.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In acceptance testing, 100% of visits to the website root URL display the main page with all configured menu tiles.
- **SC-002**: In acceptance testing, 100% of displayed tiles show total, hard, medium, easy, and unknown topic counts with no double counting when labels are missing.
- **SC-003**: In acceptance testing, 100% of tile activations, including zero-topic menus, navigate to the correct corresponding topic list page.
- **SC-004**: At least 90% of users can identify a menu they want to open within 10 seconds using tile information only.
- **SC-005**: At least 90% of users can open a target topic list page from the main page in one interaction.

## Assumptions

- Menu categories and topic metadata already exist and are available at page render time.
- The main page route is already part of the existing application entry flow.
- The complexity model continues to use easy, medium, and hard as the primary user-facing levels.
- The additional tile insight is informational only and does not change navigation behavior.
- Authentication, personalization, and role-based menu visibility are out of scope for this feature.
