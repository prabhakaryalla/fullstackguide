# Feature Specification: Topic Bookmarks

**Feature Branch**: `[011-topic-bookmarks]`

**Created**: 2026-09-30

**Status**: Draft

**Input**: User description: "As a product owner, I want users to be able to bookmark topics and see all their bookmarked topics in one place, so users can quickly return to material they flagged as important without hunting through menus."

## Clarifications

### Session 2026-09-30

- Q: Where is bookmark state stored? → A: Per-browser only (`localStorage`), consistent with feature 010's progress tracking — no account/sync.
- Q: Can a topic be both bookmarked and marked complete at the same time? → A: Yes, the two are independent states; bookmarking does not affect completion tracking or vice versa.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Bookmark a Topic (Priority: P1)

As a user studying for an interview, I want to bookmark a topic while
reading it, so that I can find it again quickly later without remembering
which menu it was under.

**Why this priority**: Bookmarking is the foundational action the rest of
this feature depends on; a visible, toggleable bookmark control is useful
standalone even before an aggregated bookmarks view exists.

**Independent Test**: Open any topic page, activate the bookmark control,
confirm it switches to the bookmarked state and persists after a reload.

**Acceptance Scenarios**:

1. **Given** a user is viewing a topic page that is not bookmarked, **When**
   they activate the bookmark control, **Then** the control switches to the
   bookmarked state.
2. **Given** a bookmarked topic, **When** the user activates the control
   again, **Then** the topic returns to the not-bookmarked state (reversible).
3. **Given** a user has bookmarked a topic, **When** they reload the browser
   or revisit later in the same browser, **Then** the topic still shows as
   bookmarked.
4. **Given** a user is viewing a menu's topic list, **When** they activate a
   topic card's bookmark control, **Then** only that topic's bookmark state
   changes — the card list does not navigate to the topic.

---

### User Story 2 - View All Bookmarked Topics (Priority: P1)

As a user studying for an interview, I want a single page listing every
topic I've bookmarked across all menu areas, so that I can jump straight
back into the material I flagged as important.

**Why this priority**: The aggregated view is the primary payoff of
bookmarking — without it, bookmarking would have no way to be acted upon
beyond the single page it was set on.

**Independent Test**: Bookmark topics from two different menu areas, open
the bookmarks page, and confirm both appear, each navigating to its own
topic's content when selected.

**Acceptance Scenarios**:

1. **Given** a user has bookmarked topics from more than one menu area,
   **When** they open the bookmarks page, **Then** every bookmarked topic is
   listed, regardless of menu area.
2. **Given** the bookmarks page is open, **When** the user selects a listed
   topic, **Then** the application navigates to that topic's content page.
3. **Given** a user has no bookmarks, **When** they open the bookmarks page,
   **Then** a clear empty-state message is shown instead of an empty list.
4. **Given** a user removes a bookmark from the bookmarks page itself,
   **When** the removal completes, **Then** that topic disappears from the
   list immediately without a page reload.

### Edge Cases

- What happens when a bookmarked topic's slug no longer exists (renamed or
  removed content)? It MUST be silently excluded from the bookmarks list and
  MUST NOT cause an error, mirroring feature 010's stale-slug handling.
- What happens when a user bookmarks the same topic from both its content
  page and its menu topic-list card? Both controls reflect the same
  underlying state and stay in sync without extra action.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Every topic content page MUST display a bookmark control
  reflecting the topic's current bookmarked state.
- **FR-002**: Every topic card in a menu topic list MUST display a bookmark
  control that does not trigger navigation to the topic when activated.
- **FR-003**: Activating a bookmark control MUST toggle that topic's
  bookmarked state and MUST be reversible.
- **FR-004**: Bookmarked state MUST persist across reloads and future visits
  in the same browser (no account required).
- **FR-005**: A dedicated bookmarks page MUST list every currently bookmarked
  topic across all menu areas, reachable from the top navigation on every
  route.
- **FR-006**: The bookmarks page MUST show a clear empty-state message when
  there are no bookmarks.
- **FR-007**: Selecting a topic on the bookmarks page MUST navigate to that
  topic's content page.
- **FR-008**: Removing a bookmark from the bookmarks page MUST update the
  list immediately, without requiring a reload.
- **FR-009**: A bookmark record referencing a topic slug that no longer
  exists in current topic data MUST be excluded from the bookmarks list and
  MUST NOT cause an error.
- **FR-010**: Bookmark controls MUST be fully keyboard-operable and expose
  accessible pressed-state (for example, `aria-pressed`).

### Key Entities

- **Bookmark Record**: A local record associating a topic's menu id + slug
  with a bookmarked flag, stored client-side only, independent of the
  Topic Completion Record from feature 010.

## Success Criteria *(mandatory)*

- **SC-001**: A user can bookmark or unbookmark a topic in one action, with
  the change reflected immediately.
- **SC-002**: Bookmarked state set by a user is still accurate after closing
  and reopening the browser, 100% of the time, within the same browser.
- **SC-003**: The bookmarks page always reflects exactly the set of
  currently-existing topics the user has bookmarked, with no manual refresh
  needed.
- **SC-004**: Users can reach the bookmarks page from any page within one
  interaction with the top navigation.

## Assumptions

- Bookmarking is per-browser (`localStorage`), with no account/cross-device
  sync, consistent with feature 010.
- No bookmark folders/tags/notes are in scope — a bookmark is a simple
  boolean flag per topic.
