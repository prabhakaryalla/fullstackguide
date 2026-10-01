# Feature Specification: Full-Text Content Search

**Feature Branch**: `[012-full-text-content-search]`

**Created**: 2026-09-30

**Status**: Draft

**Input**: User description: "As a product owner, I want the global search to match topic body content, not just titles, so that users can find the right topic even when their search keyword only appears in the explanation body, not the title."

## Clarifications

### Session 2026-09-30

- Q: Should content-body search block/delay title matches while the full content index loads? → A: No — title matches (existing, instant, in-memory) MUST appear immediately; content-body matches are merged in once the (larger, lazily-loaded) content index finishes loading, with a loading indicator shown in the meantime.
- Q: Should content-only matches (title doesn't match, only body does) show any extra context, or just the title like today? → A: Show a short plain-text snippet from the matched content beneath the title, so users understand why that topic appeared.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Find a Topic by Body Content (Priority: P1)

As a user studying for an interview, I want my search keyword to match
topics whose explanation text contains it — even if the keyword isn't in
the title — so that I don't miss relevant material just because I guessed
the wrong title wording.

**Why this priority**: This is the core value of the feature; without
content-body matching, search remains title-only and users continue to miss
relevant topics, which is the exact gap this feature exists to close.

**Independent Test**: Search for a keyword known to appear only in a
topic's body text (not its title), and confirm that topic appears in the
results.

**Acceptance Scenarios**:

1. **Given** a user searches for a keyword that appears in a topic's body
   content but not its title, **When** the content index has finished
   loading, **Then** that topic appears in the results.
2. **Given** a user searches for a keyword that matches both a topic's title
   and another topic's body content only, **When** results are shown,
   **Then** both topics appear in the results list.
3. **Given** a content-only match is shown, **When** the user views its
   result row, **Then** a short plain-text snippet from the matching
   content is shown beneath the title, distinct from title-only matches.

---

### User Story 2 - Title Matches Stay Instant (Priority: P1)

As a user, I want title matches to appear immediately when I type a
keyword, without waiting on a larger content search to finish, so that
search still feels fast for the common case.

**Why this priority**: Preserving the existing instant title-search
experience (feature 009) is essential — this feature must be additive, not
a regression to a slower search experience.

**Independent Test**: Type a keyword that matches a topic title while the
content index has not yet finished loading (or is disabled/slow), and
confirm the title match appears without delay.

**Acceptance Scenarios**:

1. **Given** a user opens the search results page and the content index has
   not yet finished loading, **When** they type a keyword that matches a
   topic title, **Then** that title match appears immediately.
2. **Given** the content index is still loading, **When** results are
   displayed, **Then** a clear, unobtrusive loading indicator communicates
   that additional (content-based) matches may still appear.
3. **Given** the content index finishes loading while the user is already
   viewing results, **When** it completes, **Then** any additional
   content-only matches are merged into the results list without the user
   needing to re-submit their search.

---

### Edge Cases

- What happens when a keyword matches nothing in either titles or body
  content? The existing "no results" empty state (feature 009) is shown,
  once the content index has finished loading (or immediately if it was
  already loaded from a prior search in the same session).
- What happens when a keyword is very short (for example, one or two
  characters) and matches body content in a very large number of topics?
  All matches are still shown (consistent with feature 009's "no pagination
  or cap" rule); the existing topic list's large-list handling (batched
  rendering / "Load More") already covers large result counts.
- What happens if the user navigates away from the search results page
  before the content index finishes loading, then returns later in the same
  session? The content index (once loaded) is cached for the session, so
  returning to the search page does not require re-loading it.
- What happens when a topic's body content contains the keyword multiple
  times? Only the first match's surrounding text is shown as the snippet;
  no requirement to show every occurrence.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The search results page MUST include topics whose body
  content contains the current keyword (case-insensitive), in addition to
  the existing title-match behavior from feature 009.
- **FR-002**: Title matches MUST continue to appear immediately, without
  waiting for content-body matching to be available.
- **FR-003**: While content-body matching data is still loading, the search
  results page MUST show a clear, unobtrusive loading indicator alongside
  any already-visible title matches.
- **FR-004**: Once content-body matching data has finished loading for the
  current browser session, it MUST NOT be reloaded again for subsequent
  searches in that same session.
- **FR-005**: A result that matches only via body content (not the title)
  MUST display a short plain-text snippet of the matching content beneath
  its title, so the user can see why it matched.
- **FR-006**: A result that matches via its title MUST NOT be duplicated in
  the list if it also happens to match via body content — each matching
  topic MUST appear exactly once.
- **FR-007**: Content-body matching MUST apply across every menu area's
  topics, consistent with the existing cross-menu scope of feature 009.
- **FR-008**: Body-content matching MUST be case-insensitive, mirroring the
  existing title-matching behavior.
- **FR-009**: The results list MUST NOT apply any pagination or maximum
  result count, consistent with feature 009.

### Key Entities

- **Content Search Index**: An in-memory, lazily-built, session-cached
  mapping from each topic to its raw body text, used only for body-content
  matching. Built once per browser session, the first time a user performs
  a search that requires it, and reused for the rest of that session.
- **Content Match Snippet**: A short plain-text excerpt surrounding the
  first occurrence of the keyword within a topic's body content, shown only
  for results that did not match by title.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A user searching for a keyword that exists only in a topic's
  body content finds that topic without needing to guess alternate titles.
- **SC-002**: Title matches are visible within the same near-instant time as
  today's title-only search (feature 009), regardless of content-index
  loading state.
- **SC-003**: The content index is fetched at most once per browser session,
  not once per keystroke or once per search.
- **SC-004**: Every result that matched only via body content shows a
  snippet explaining the match; every result that matched via title does
  not show a redundant snippet.

## Assumptions

- Body-content matching operates on each topic's raw markdown source text
  (not a rendered/stripped plain-text conversion); occasional markdown
  syntax characters appearing in a snippet are acceptable and not treated as
  a defect.
- This feature does not introduce search result ranking/relevance scoring
  beyond feature 009's existing behavior (unordered, all-matches-shown); a
  future ranking feature is out of scope here.
- The Global Search bar in the top navigation is unchanged by this feature —
  it continues to only carry the keyword to the search results page; all
  content-body matching behavior is scoped to the search results page
  itself.
- No new backend/service is introduced; the content index is built entirely
  client-side from the same static markdown content already bundled with
  the application.
