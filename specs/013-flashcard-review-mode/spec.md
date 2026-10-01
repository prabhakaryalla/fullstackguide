# Feature Specification: Flashcard Quick-Review Mode

**Feature Branch**: `[013-flashcard-review-mode]`

**Created**: 2026-09-30

**Status**: Draft

**Input**: User description: "As a product owner, I want users to be able to quickly self-test on the short Q&A-style interview topics (C# programs, JavaScript programs, SQL programs) using a flashcard-style review mode, so users can rehearse recall instead of only reading pages top to bottom."

## Clarifications

### Session 2026-09-30

- Q: Which menus should offer flashcard mode? → A: Only the three existing "output-prediction interview Q&A style" menus (`csharp-programs`, `javascript-programs`, `sql-programs`) — these are already short, self-contained Q&A documents (per this repo's existing content convention), unlike long conceptual topics (for example, Azure/System Design pages) or the very large `leet-code` menu, which are a poor fit for a "front/back" card format. This mirrors this codebase's existing precedent of treating these three menus as a distinct category (they're also the ones excluded from other structural changes elsewhere in this app for the same "different content shape" reason).
- Q: What is the back of the card — a further split of each document's internal sub-questions, or the whole topic? → A: The whole topic's existing rendered content (reusing the same markdown rendering already used on the topic detail page) is the back of the card; the topic title is the front. Splitting each document's internal "Question 1/2/3" sections into separate cards was considered but rejected — internal heading text/format is not perfectly consistent across all existing documents, and treating each existing topic as one card is simple, robust, and needs no new content-parsing logic.
- Q: Does self-rating a card affect anything else in the app? → A: Yes — rating a card "Got it" during a session marks that topic complete using the existing topic-progress feature (010); rating "Still learning" does not change existing completion state (never un-marks a topic that was already completed).
- Q: Which topics are included in a review session — every topic in the menu, or whatever the user currently has filtered/searched on the menu's topic list? → A: Whatever is currently visible on the menu's topic list (respecting the existing complexity filter and search box), so a user can choose to review, for example, only "Hard" topics.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Start and Step Through a Flashcard Session (Priority: P1)

As a user reviewing C#/JavaScript/SQL "programs" topics, I want to start a
flashcard session over my currently filtered topic list, see one question
at a time, reveal the answer on demand, and move to the next/previous card,
so that I can rehearse recall quickly instead of reading full pages
top-to-bottom.

**Why this priority**: This is the entire value proposition of the
feature; without a working session (start, flip, navigate), there is
nothing to test or refine further.

**Independent Test**: From a `csharp-programs` menu topic list, start a
flashcard session, confirm the first card shows only a title, reveal the
answer, and confirm Next/Previous move through the same topics that were
visible on the topic list.

**Acceptance Scenarios**:

1. **Given** a user is viewing the topic list for `csharp-programs`,
   `javascript-programs`, or `sql-programs`, **When** they select a
   "Flashcards" entry point, **Then** a flashcard session starts over
   exactly the topics currently visible in that topic list (respecting any
   active search keyword and complexity filter).
2. **Given** a flashcard session has started, **When** the first card is
   shown, **Then** only the topic's title is visible (its full content is
   hidden) with a control to reveal the answer.
3. **Given** a card's answer is hidden, **When** the user activates the
   reveal control, **Then** the topic's full existing content renders on
   the same card (identical rendering to the existing topic detail page,
   including code blocks and diagrams).
4. **Given** a card (revealed or not), **When** the user selects Next,
   **Then** the session advances to the next topic in the filtered list,
   with its answer hidden again.
5. **Given** the user is on any card after the first, **When** they select
   Previous, **Then** the session moves back one topic, with its answer
   hidden again (a previously revealed card's answer is re-hidden when
   revisited, not remembered as shown).
6. **Given** the user is on the last card, **When** they reach the end,
   **Then** a clear "session complete" state is shown instead of an empty
   or broken card, with a way to return to the topic list.
7. **Given** a user's currently filtered topic list is empty (for example,
   a search with no matches), **When** they attempt to start a session,
   **Then** the "Flashcards" entry point is unavailable/disabled rather
   than starting a broken, empty session.

---

### User Story 2 - Self-Rate a Card and Update Progress (Priority: P2)

As a user reviewing flashcards, I want to mark a card "Got it" or "Still
learning" after checking the answer, so that topics I already know are
reflected in my existing progress tracking without extra steps.

**Why this priority**: This is a valuable enhancement that connects the
session to the app's existing progress feature, but the session is fully
usable and independently valuable without it (User Story 1 alone already
delivers the core "quick review" experience).

**Independent Test**: Reveal a card's answer, select "Got it", leave the
session, and confirm that topic now shows as completed on the menu topic
list (existing progress-tracking indicator from feature 010); confirm
selecting "Still learning" on a different, not-yet-completed card leaves
it not completed.

**Acceptance Scenarios**:

1. **Given** a card's answer is revealed, **When** the user selects
   "Got it", **Then** that topic is marked complete using the existing
   topic-progress feature, and the session advances to the next card.
2. **Given** a card's answer is revealed, **When** the user selects
   "Still learning", **Then** that topic's completion state is left
   unchanged (not marked complete, and not un-marked if it already was),
   and the session advances to the next card.
3. **Given** a user ends a session partway through, **When** they return to
   the menu's topic list, **Then** any topics rated "Got it" during the
   session are visibly marked completed (per feature 010's existing
   completed-topic indicator).

### Edge Cases

- What happens if a user reloads the browser while mid-session? The
  session re-derives from the current URL (menu + active filters) and
  restarts from the first card; card-by-card position is not required to
  survive a reload.
- What happens when a topic in the current filtered list no longer exists
  by the time the session runs (renamed/removed content)? It is simply
  excluded, mirroring how the topic list itself already excludes anything
  not present in current topic data — no error state.
- What happens if a user opens the same menu's Flashcards after already
  rating some cards "Got it" in an earlier session? Already-completed
  topics still appear in the session (completion state doesn't remove a
  topic from view) and can be re-rated; ratings are idempotent (rating
  "Got it" again on an already-completed topic has no additional effect).
- What happens on a menu not in scope (for example, `azure` or
  `leet-code`)? No "Flashcards" entry point is shown at all.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: A "Flashcards" entry point MUST be available on the topic
  list page for the `csharp-programs`, `javascript-programs`, and
  `sql-programs` menus only, and MUST NOT appear for any other menu.
- **FR-002**: The entry point MUST be disabled (or hidden) when the
  current topic list (after any active search/complexity filter) is empty.
- **FR-003**: Starting a session MUST use exactly the topics currently
  visible in the topic list, respecting the active search keyword and
  complexity filter at the time of starting.
- **FR-004**: Each card MUST initially show only the topic's title, with
  its full content hidden.
- **FR-005**: A reveal control MUST show the topic's full existing content
  on the same card, using the same rendering already used on the topic
  detail page.
- **FR-006**: Next/Previous controls MUST move through the session's
  topics in the same order as the filtered topic list, and MUST re-hide
  the content of the newly shown card regardless of whether it was
  previously revealed.
- **FR-007**: Reaching the end of the session MUST show a clear
  "session complete" state (not a blank/broken card) with a way to return
  to the menu's topic list.
- **FR-008**: While an answer is revealed, the user MUST be able to rate
  the card "Got it" or "Still learning"; selecting either MUST advance to
  the next card.
- **FR-009**: Selecting "Got it" MUST mark that topic complete via the
  existing topic-progress feature (010); selecting "Still learning" MUST
  NOT change that topic's existing completion state in either direction.
- **FR-010**: All session controls (reveal, next, previous, rate, exit)
  MUST be fully keyboard-operable with accessible names.

### Key Entities

- **Flashcard Session**: An in-memory, non-persisted sequence derived from
  the current menu + active filters — a list of topics and a current
  index, plus a per-card "revealed" boolean. Not stored anywhere; fully
  re-derivable from the URL, so a reload simply restarts it.
- **Card Rating**: An ephemeral user action ("Got it" / "Still learning")
  that, for "Got it" only, writes through to the existing Topic Completion
  Record (feature 010) — no new persisted entity is introduced.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A user can go from a menu's topic list to reviewing the
  first flashcard in one action (selecting "Flashcards").
- **SC-002**: A user can review every topic currently visible in their
  filtered topic list via Next, ending in a clear completion state, with
  no topic skipped or duplicated.
- **SC-003**: Rating a card "Got it" is reflected in the existing
  progress indicator on the menu's topic list the next time it's viewed,
  with no separate save step required.
- **SC-004**: The "Flashcards" entry point never appears for menus outside
  the three in scope, and never leads to a broken/empty session.

## Assumptions

- Flashcard mode is scoped to `csharp-programs`, `javascript-programs`, and
  `sql-programs` only, per the Clarifications above; broader menus can be
  considered later as a separate enhancement if requested.
- No shuffle/randomized order, spaced-repetition scheduling, or session
  persistence across reloads is in scope for this iteration — session
  order always matches the current filtered topic list's existing order,
  and a reload simply restarts at the first card.
- No new bookmark- or search-specific integration is introduced; a future
  iteration could add a "flashcards over my bookmarks" mode, but that is
  out of scope here.
- The card's revealed content reuses the existing topic-content rendering
  pipeline (markdown, code highlighting, diagrams) unchanged — no new
  rendering logic is introduced by this feature.
