# Feature Specification: Tag-Based Cross-Menu Filtering

**Feature Branch**: `[015-tag-based-cross-menu-filtering]`

**Created**: 2026-09-30

**Status**: Draft

**Input**: User description: "As a product owner, I want topics to carry cross-cutting tags (like Caching, Security, Concurrency, Distributed Systems) that work across menu areas, so users can browse every topic related to a concept regardless of which menu (Azure, AWS, System Design, C#, etc.) it happens to live in — complementing the existing per-menu complexity filter."

## Clarifications

### Session 2026-09-30

- Q: Are tags manually curated per topic, or derived automatically? → A: Automatic — a small, fixed, curated set of cross-cutting tags (for example, Caching, Security, Concurrency) is defined once, each with a handful of trigger keywords; a topic is automatically associated with a tag when its content contains that tag's vocabulary. This reuses the existing content-based infrastructure from features 012/014 rather than requiring manual tagging of ~4,200 topics.
- Q: Is tag browsing scoped to one menu, or cross-menu? → A: Cross-menu by design — the entire point of this feature is letting a user see every topic tagged, for example, "Caching," across Azure, AWS, System Design, C#, etc. in one place, which the existing per-menu complexity filter cannot do.
- Q: Where do users discover tags in the first place? → A: A dedicated "Browse by Tags" page, reachable from the top navigation on every page (mirroring the existing Bookmarks entry point), lists every tag with how many topics carry it.
- Q: Do individual topic pages and topic list cards show their own tags? → A: Yes — every topic content page shows its own tags as selectable chips (selecting one jumps to that tag's cross-menu topic list); topic list cards show the same tags as plain, non-selectable indicators (consistent with how the existing complexity badge is shown there today) to avoid nested interactive controls inside an already-clickable card.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Browse All Topics for a Tag, Across Every Menu (Priority: P1)

As a user studying a cross-cutting concept (for example, caching), I want
to open a "Caching" tag and see every topic across every menu area that
relates to it, so that I don't have to already know which menus happen to
cover it.

**Why this priority**: This cross-menu browsing capability is the entire
point of the feature; without it, tags would be no different from the
existing per-menu complexity filter.

**Independent Test**: Open the "Browse by Tags" page, select a tag known to
apply to topics in more than one menu area, and confirm topics from more
than one menu area appear in the resulting list.

**Acceptance Scenarios**:

1. **Given** a user selects the "Browse by Tags" entry point from the top
   navigation, **When** the page loads, **Then** every defined tag is
   listed along with how many topics currently carry it.
2. **Given** the tags list is showing, **When** the user selects a tag,
   **Then** every topic across every menu area that carries that tag is
   listed, each showing its title and its owning menu area.
3. **Given** a tag's topic list is showing, **When** the user selects a
   topic, **Then** the application navigates to that topic's own content
   page.
4. **Given** a tag has zero currently-matching topics, **When** its topic
   list is opened, **Then** a clear "No topics found for this tag" message
   is shown instead of an empty list.
5. **Given** the underlying tag data is still being computed, **When** the
   user is on the tags list or a tag's topic list, **Then** a clear loading
   indicator is shown instead of an empty or broken page.

---

### User Story 2 - See a Topic's Own Tags on Its Content Page (Priority: P2)

As a user reading a topic page, I want to see which cross-cutting tags
apply to it and jump straight to everything else with that same tag, so
that I can pivot from "reading this one topic" to "exploring this whole
concept" in one action.

**Why this priority**: This is a valuable, low-effort discovery path that
builds directly on User Story 1's tag topic list, but the feature is
already fully usable via the dedicated "Browse by Tags" page without it.

**Independent Test**: Open a topic known to carry at least one tag, select
that tag from the topic page, and confirm it navigates to that tag's
cross-menu topic list (from User Story 1).

**Acceptance Scenarios**:

1. **Given** a user is viewing a topic page whose content matches one or
   more tags, **When** the page renders, **Then** those tags are shown as
   individually selectable chips.
2. **Given** a topic page's tag chip, **When** the user selects it,
   **Then** the application navigates to that tag's cross-menu topic list.
3. **Given** a topic whose content matches no defined tag, **When** its
   page renders, **Then** no tag chips are shown (not an error or
   placeholder) — the rest of the page is unaffected.

---

### User Story 3 - See Tags at a Glance in a Menu's Topic List (Priority: P3)

As a user browsing a menu's topic list, I want to see each topic's tags at
a glance alongside its existing complexity badge, so that I can spot
relevant topics without opening each one.

**Why this priority**: This is a nice-to-have scanning aid; the core
cross-menu browsing value (User Story 1) and the topic-page pivot (User
Story 2) do not depend on it.

**Independent Test**: Open any menu's topic list and confirm topic cards
that match at least one tag show that tag as a plain, non-selectable
indicator, consistent with the existing complexity badge.

**Acceptance Scenarios**:

1. **Given** a user is viewing a menu's topic list, **When** a topic card
   matches one or more tags, **Then** those tags are shown on the card as
   plain, non-selectable indicators (selecting a tag from a card is not
   supported — the card itself remains clickable to open the topic).
2. **Given** a topic card matches no tags, **When** it renders, **Then**
   no tag indicators are shown on that card (not an error or placeholder).

### Edge Cases

- What happens the first time a user opens the "Browse by Tags" page or
  any topic page in a session, before the shared tag data has ever been
  computed? A loading indicator is shown in the relevant section only —
  consistent with the existing search (012) and related-topics (014)
  features' first-load behavior; nothing else on the page is delayed.
- What happens if new topic content is added or changed later? Tags are
  always derived live from current topic content at computation time, not
  stored — there is nothing to go stale or need re-tagging.
- What happens for a tag whose trigger vocabulary matches an enormous
  number of topics (for example, an algorithms-related tag matching most
  of the very large `leet-code` menu)? The tag's topic list still shows
  every match; the existing topic-list large-list handling (progressive
  "Load More" rendering) already covers large result counts.
- What happens if a topic matches several tags at once? All of them are
  shown; there is no limit on how many tags a single topic can carry.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: A fixed, curated set of cross-cutting tags MUST exist, each
  automatically associated with topics based on their content — no manual
  per-topic tagging is required or supported.
- **FR-002**: A "Browse by Tags" page MUST be reachable from the top
  navigation on every page.
- **FR-003**: The "Browse by Tags" page MUST list every defined tag along
  with the current count of topics carrying it.
- **FR-004**: Selecting a tag MUST show every topic, across every menu
  area, currently associated with that tag.
- **FR-005**: Each topic shown in a tag's topic list MUST display its title
  and its owning menu area's label.
- **FR-006**: Selecting a topic from a tag's topic list MUST navigate to
  that topic's own content page.
- **FR-007**: A tag with zero currently-matching topics MUST show a clear
  "No topics found for this tag" message rather than an empty list.
- **FR-008**: Every topic content page MUST display that topic's own tags
  (if any) as individually selectable chips; selecting one MUST navigate
  to that tag's cross-menu topic list (User Story 2).
- **FR-009**: A topic with no matching tags MUST show no tag chips on its
  content page — not an error or placeholder.
- **FR-010**: Every menu's topic list page MUST display each topic card's
  tags (if any) as plain, non-selectable indicators, without altering the
  card's existing click-to-open behavior (User Story 3).
- **FR-011**: The "Browse by Tags" page and any tag's topic list MUST show
  a clear loading indicator while the underlying tag data is being
  computed, without blocking or delaying any other part of the
  application.

### Key Entities

- **Tag Definition**: A fixed, curated entry (id + display label + trigger
  keyword vocabulary) — not user-editable, not stored per-topic.
- **Topic-Tag Association**: A derived, non-persisted association between
  a topic and zero or more Tag Definitions, computed automatically from
  that topic's existing content at view/computation time.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: For at least one tag, its cross-menu topic list includes
  topics from more than one menu area.
- **SC-002**: Users can reach the "Browse by Tags" page from any page
  within one interaction with the top navigation.
- **SC-003**: Every topic's own tags (if any) are reachable from its
  content page in one action (selecting a tag chip).
- **SC-004**: No page's primary content is delayed by tag computation —
  every tag-related loading state is scoped to its own section only.

## Assumptions

- Tags are a small, fixed, curated vocabulary (roughly 15-20 cross-cutting
  concepts) defined once by the product team as part of this feature — not
  an open/user-defined tagging system.
- Tag association is a heuristic derived from existing topic content
  (reusing features 012/014's existing content/keyword infrastructure), not
  a guarantee of perfect precision; occasional missed or loosely-applied
  tags are acceptable.
- No tag-based filtering is added to the existing per-menu topic list page
  itself (that remains complexity/search-filtered as today); tags are
  browsed via the new dedicated cross-menu pages and shown as indicators
  elsewhere, per the Clarifications above.
- No manual tag editing, hiding, or user feedback ("wrong tag") mechanism
  is in scope for this iteration.
