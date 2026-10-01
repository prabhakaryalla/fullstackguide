# Feature Specification: Related Topics ("See Also")

**Feature Branch**: `[014-related-topics-see-also]`

**Created**: 2026-09-30

**Status**: Draft

**Input**: User description: "As a product owner, I want each topic page to suggest a handful of other genuinely related topics — even across different menu areas — so that users discover connected material (for example, caching topics that span Azure, AWS, and System Design) without needing to already know it exists."

## Clarifications

### Session 2026-09-30

- Q: How is "related" determined — manual curation, tags, or something automatic? → A: Automatic, content-based similarity — reuse the existing full-text search content index (feature 012) to compare each topic's significant keywords against every other topic's, with no manual tagging/curation required. This keeps the feature working uniformly across all ~4,200 existing topics with zero new content authoring.
- Q: Is "related" scoped to the same menu, or cross-menu? → A: Cross-menu by design — a topic's related suggestions may come from any menu area, since the whole point is surfacing connections a user wouldn't otherwise discover (for example, an Azure topic surfacing a related AWS or System Design topic).
- Q: What happens while the (large, shared) content index is still loading? → A: The topic's own main content is completely unaffected — it loads and renders exactly as it already does today. The Related Topics section appears below the main content and shows its own small loading indicator until ready, mirroring the existing search results page's loading pattern (feature 012).
- Q: What if a topic has no meaningfully related topics? → A: The section shows a clear "No related topics found" message instead of disappearing entirely or showing an empty box.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - See Related Topics on a Topic Page (Priority: P1)

As a user reading a topic page, I want to see a short list of other genuinely
related topics below the main content — including topics from other menu
areas — so that I can discover connected material I didn't know to look for.

**Why this priority**: This is the entire feature; without a working,
reasonably relevant suggestion list, there is nothing else to build on.

**Independent Test**: Open a topic known to share distinctive vocabulary
with a topic in a different menu area, and confirm that other topic appears
in the "Related Topics" list.

**Acceptance Scenarios**:

1. **Given** a user is viewing a topic page, **When** the page's main
   content has finished loading, **Then** a "Related Topics" section is
   visible below the main content (independent of whether related topics
   have finished computing yet).
2. **Given** the Related Topics section is still computing, **When** the
   user views the page, **Then** a small, clearly labeled loading
   indicator is shown in that section only — the main topic content is
   never delayed or blocked by this.
3. **Given** related topics have been found, **When** they are displayed,
   **Then** each entry shows the related topic's title and its owning menu
   area, and it MAY come from a different menu area than the current topic.
4. **Given** a user selects a related topic entry, **When** the selection
   completes, **Then** the application navigates to that topic's own
   content page.
5. **Given** a topic has no meaningfully related topics (no shared
   significant keywords with any other topic), **When** the section
   finishes computing, **Then** a clear "No related topics found" message
   is shown instead of an empty section.
6. **Given** the current topic itself, **When** related topics are
   computed, **Then** the current topic never appears in its own related
   topics list.

### Edge Cases

- What happens the first time a user opens any topic page in a session,
  before the shared content index has ever been fetched? The main topic
  content still appears immediately (unaffected); the Related Topics
  section shows its loading indicator until the shared index resolves,
  consistent with the existing search feature's first-load behavior.
- What happens on the second and later topic pages visited in the same
  session? The shared content index and the derived keyword comparisons
  are already available/cached, so the Related Topics section appears
  without a loading delay.
- What happens if a related topic's slug is later renamed or removed from
  the content it was computed against? Since related topics are always
  derived from the current, live topic data at computation time (not
  stored), this cannot produce a stale/broken link.
- What happens for a topic whose content is very short or highly generic
  (common words only)? It may still surface related topics based on
  whatever shared distinctive vocabulary exists; if truly none is found,
  the "No related topics found" message applies (Clarifications).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Every topic content page MUST display a "Related Topics"
  section below its main content.
- **FR-002**: Related topics MUST be determined automatically from shared
  significant content, without requiring any manual tagging or curation
  per topic.
- **FR-003**: Related topics MUST be allowed to come from any menu area,
  not only the current topic's own menu.
- **FR-004**: The Related Topics section MUST show its own independent
  loading indicator while related topics are being computed, and MUST NOT
  delay or block the page's main content from loading and rendering.
- **FR-005**: Each related topic entry MUST show that topic's title and
  its owning menu area's label.
- **FR-006**: Selecting a related topic entry MUST navigate to that
  topic's own content page.
- **FR-007**: The current topic MUST never appear in its own related
  topics list.
- **FR-008**: The number of related topics shown MUST be small and bounded
  (a handful, not an unbounded list).
- **FR-009**: When no meaningfully related topics are found for a topic,
  the section MUST show a clear "No related topics found" message rather
  than an empty or missing section.

### Key Entities

- **Related Topic Suggestion**: A derived, non-persisted association
  between the current topic and another topic, computed at view time from
  shared significant keywords between their content; carries no stored
  state of its own.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can find at least one genuinely related topic (sharing
  clearly distinctive vocabulary with the current topic) without using
  search, for topics where such a match exists.
- **SC-002**: The main topic content's load time is unaffected by whether
  or how long related-topic computation takes.
- **SC-003**: 100% of related topic suggestions shown are for topics other
  than the one currently being viewed.
- **SC-004**: Every topic page shows either a populated Related Topics
  list or a clear no-results message — never an indefinitely empty or
  perpetually loading section once the underlying data is available.

## Assumptions

- This feature reuses the existing full-text search content index (feature
  012) as its only data source — no new content authoring, tagging, or
  manual curation is introduced.
- Relatedness is based on shared significant keywords (common short/filler
  words excluded) between topics' titles and body content; this is a
  heuristic, not a guarantee of true semantic relevance — occasional
  loosely-related or missed suggestions are acceptable.
- No user personalization (for example, favoring a user's bookmarked menus)
  is in scope for this iteration.
- No manual override, hiding, or feedback ("not relevant") mechanism for
  suggestions is in scope for this iteration.
