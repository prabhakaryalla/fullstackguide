# Feature Specification: Topic Progress Tracking

**Feature Branch**: `[010-topic-progress-tracking]`

**Created**: 2026-09-30

**Status**: Draft

**Input**: User description: "As a product owner, I want users to be able to mark topics as complete and see their progress per menu area, so that the application supports self-paced interview preparation instead of just being a content browser."

## Clarifications

### Session 2026-09-30

- Q: Should progress be stored per-browser only, or synced to an account? → A: Per-browser only (localStorage), no account/sync in this feature — matches the app's existing static, backend-less architecture.
- Q: Should marking complete happen automatically (e.g. after N seconds on a page) or only via explicit user action? → A: Explicit user action only (a toggle control), to avoid falsely marking topics complete when a user is just skimming.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Mark a Topic as Complete (Priority: P1)

As a user studying for an interview, I want to mark a topic page as complete
once I've read it, so that I can keep track of what I've already studied
without relying on memory.

**Why this priority**: This is the foundational action every other part of
this feature depends on — without a way to record completion, there is
nothing to show progress for. It delivers standalone value even before any
progress summary exists (a visible checkmark on a page a user has already
read is useful on its own).

**Independent Test**: Can be fully tested by opening any topic page,
activating the "Mark as complete" control, and confirming its state changes
to "Completed" and persists after a page reload.

**Acceptance Scenarios**:

1. **Given** a user is viewing a topic page they have not marked complete,
   **When** they activate the "Mark as complete" control, **Then** the
   control's state changes to reflect the topic is now completed.
2. **Given** a user is viewing a topic page they have already marked
   complete, **When** they activate the same control again, **Then** the
   topic returns to the not-completed state (the action is reversible).
3. **Given** a user has marked a topic complete, **When** they reload the
   browser or revisit the topic later in the same browser, **Then** the
   topic still shows as completed.
4. **Given** a user marks a topic complete, **When** no other user action
   occurs, **Then** no other topic's completion state changes.

---

### User Story 2 - See Progress Per Menu Area (Priority: P1)

As a user studying for an interview, I want to see how many topics I've
completed out of the total for a given menu area (for example, "18/60
completed" for C#), so that I can gauge how much material I have left and
stay motivated.

**Why this priority**: Aggregated progress is the primary payoff of tracking
individual completions — it turns a list of checkmarks into an at-a-glance
sense of overall study progress, which is the core value proposition of this
feature.

**Independent Test**: Can be fully tested by marking a known number of
topics complete within one menu area, then navigating to that menu's topic
list and confirming the displayed completed/total count matches.

**Acceptance Scenarios**:

1. **Given** a user has completed some topics within a menu area, **When**
   they view that menu's topic list page, **Then** a progress indicator
   shows the number of completed topics out of the total topics in that
   menu.
2. **Given** a user has completed zero topics in a menu area, **When** they
   view that menu's topic list page, **Then** the progress indicator shows
   0 completed out of the total, not an error or blank state.
3. **Given** a user has completed every topic in a menu area, **When** they
   view that menu's topic list page, **Then** the progress indicator shows
   the total as fully completed (for example, "60/60").
4. **Given** a user is viewing a menu's topic list, **When** individual
   topics are listed, **Then** each completed topic is visually
   distinguishable from not-yet-completed topics.

---

### User Story 3 - Reset Progress (Priority: P3)

As a user studying for an interview, I want to clear my tracked progress
(for one menu area or entirely), so that I can start a fresh study pass
without being blocked by stale completion marks from a previous attempt.

**Why this priority**: This is a supporting/recovery action rather than core
day-to-day value; most users will not need it often, but its absence would
trap users who want to restart their tracking with no way out except
clearing all browser storage.

**Independent Test**: Can be fully tested by completing several topics,
using the reset control, and confirming the affected topics/menu(s) return
to a fully not-completed state while unrelated menus are unaffected (for a
scoped reset).

**Acceptance Scenarios**:

1. **Given** a user has completed topics in a specific menu area, **When**
   they use that menu's reset progress control, **Then** all topics in that
   menu area return to not-completed, and topics in other menu areas are
   unaffected.
2. **Given** a user triggers a reset action, **When** the action would
   remove existing progress, **Then** the user is asked to confirm before
   the reset is applied.

---

### Edge Cases

- What happens when new topics are added to a menu after a user has already
  tracked some progress? The total count in the progress indicator MUST
  reflect the current topic list (including new topics as not-completed),
  not a stale total captured at an earlier time.
- What happens when a topic is removed or renamed (slug changes) after being
  marked complete? The orphaned completion record for a no-longer-existing
  slug MUST NOT cause errors and MUST NOT be counted toward any menu's
  progress total.
- What happens when a user clears their browser storage/cache? All tracked
  progress is lost; this is expected behavior for browser-local, backend-less
  storage and does not require a warning at every visit, though this
  limitation should be discoverable (for example, via the reset
  confirmation copy or nearby help text).
- What happens if a user has the application open in two browser tabs and
  marks the same topic complete/not-complete in both? The last write wins;
  no cross-tab conflict resolution beyond standard `localStorage` last-write
  behavior is required.
- What happens on a private/incognito browsing session? Progress is tracked
  for the duration of that session only, consistent with normal
  `localStorage` behavior in private sessions.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Every topic content page MUST display a "Mark as complete"
  control that reflects the topic's current completion state.
- **FR-002**: Activating the control MUST toggle the topic's completion
  state between completed and not-completed; the action MUST be reversible.
- **FR-003**: Completion state MUST persist across page reloads and future
  visits within the same browser.
- **FR-004**: Each menu area's topic list page MUST display a completed/total
  count reflecting only topics that currently exist in that menu.
- **FR-005**: Each menu area's topic list MUST visually distinguish completed
  topics from not-yet-completed topics.
- **FR-006**: The system MUST provide a way to reset tracked progress scoped
  to a single menu area, without affecting progress recorded for other menu
  areas.
- **FR-007**: The system MUST ask for explicit confirmation before applying
  a progress reset, since the action is destructive and not undoable.
- **FR-008**: Completion tracking MUST NOT require any account, sign-in, or
  network request; all state is stored locally in the user's browser.
- **FR-009**: Completion records referencing a topic slug that no longer
  exists in the current topic data MUST be excluded from progress counts and
  MUST NOT cause the topic list or progress indicator to error.
- **FR-010**: The "Mark as complete" control and the progress indicators
  MUST be fully operable via keyboard and MUST expose accessible names/state
  (for example, via `aria-pressed` or equivalent) for assistive technology.

### Key Entities

- **Topic Completion Record**: A local record associating a topic's unique
  identifier (slug) and its parent menu area with a completed/not-completed
  state. Stored client-side only (browser storage), keyed and versioned per
  existing client-persistence conventions, with no server-side counterpart.
- **Menu Progress Summary**: A derived (not separately stored) value — the
  count of completed Topic Completion Records whose slug currently exists in
  a given menu area, out of that menu area's current total topic count.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A user can mark a topic complete or not-complete in a single
  action (one control activation), with the change reflected immediately
  on screen.
- **SC-002**: Completion state set by a user is still accurate after
  closing and reopening the browser, 100% of the time, within the same
  browser profile.
- **SC-003**: A menu's displayed completed/total progress count exactly
  matches the number of currently-existing topics in that menu the user has
  marked complete, with no manual recalculation needed by the user.
- **SC-004**: Users can identify, within 3 seconds of opening a menu's topic
  list, which topics they have already completed, via visual distinction
  alone (no need to open each topic).
- **SC-005**: A scoped progress reset affects only the intended menu area;
  100% of other menus' progress remains unchanged after the reset.

## Assumptions

- Progress tracking is per-browser (via `localStorage`), consistent with
  this application's existing static, backend-less architecture; no
  cross-device sync or account system is introduced by this feature.
- "Topic" refers to the same existing topic entity already used by menu
  topic lists and topic content pages (identified by slug within a menu
  area); no new content model is required.
- Marking complete is an explicit, user-initiated action only; the system
  does not infer completion from reading time, scroll position, or other
  passive signals.
- This feature does not introduce quiz/test-based verification of
  understanding — "complete" reflects that the user has chosen to mark the
  topic as studied, not that they passed any assessment.
- Existing topic complexity filtering (feature 004) and next/previous
  navigation (feature 005) are unaffected by this feature; progress tracking
  is additive and does not change how topics are filtered or ordered.
