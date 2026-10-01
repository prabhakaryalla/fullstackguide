---

description: "Task list template for feature implementation"
---

# Tasks: Related Topics ("See Also")

**Input**: Design documents from `/specs/014-related-topics-see-also/`

**Prerequisites**: [plan.md](plan.md), [spec.md](spec.md), [research.md](research.md), [data-model.md](data-model.md), [contracts/related-topics-ui-contract.md](contracts/related-topics-ui-contract.md), [quickstart.md](quickstart.md)

**Tests**: Included. Constitution Principle VIII (Automated Testing Policy) requires every feature to include or update automated tests.

**Organization**: This feature has 1 user story (US1 P1). Tasks are grouped into Setup, Foundational (keyword extraction + index + hook), User Story 1, and Polish.

## Path Conventions

Single-project web frontend at [frontend](../../frontend). All paths below are relative to the repository root.

---

## Phase 1: Setup

- [x] T001 Run the existing test suite as a baseline (`npm run test -- --run` in [frontend](../../frontend), with no dev/preview server running concurrently) and record the current pass count — baseline: 217 passed | 2 failed (pre-existing, unrelated) | 4 skipped (223)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: The keyword-extraction utility and session-cached keyword index every user story depends on. Per [research.md](research.md) Decisions 1, 2, 4.

- [x] T002 [P] Create [frontend/src/features/related-topics/data/extractSignificantWords.ts](../../frontend/src/features/related-topics/data/extractSignificantWords.ts) exporting `extractSignificantWords(text: string): Set<string>` — lowercase, split on non-alphanumeric runs, drop words shorter than 4 characters, drop a hardcoded stopword list, per [research.md](research.md) Decision 4
- [x] T003 [P] Create [frontend/tests/related-topics/extractSignificantWords.test.ts](../../frontend/tests/related-topics/extractSignificantWords.test.ts) verifying: lowercasing, punctuation/whitespace splitting, short-word filtering, stopword filtering, and that repeated words collapse into a single set entry (depends on T002)
- [x] T004 Create [frontend/src/features/related-topics/data/getRelatedTopicsKeywordIndex.ts](../../frontend/src/features/related-topics/data/getRelatedTopicsKeywordIndex.ts) exporting `getRelatedTopicsKeywordIndex(): Promise<Map<string, Set<string>>>` — module-level cached promise; awaits `getAllTopicContentIndex()` (from `features/search/data/getAllTopicContentIndex`) once, derives one entry per `getAllSearchableTopics()` result via `extractSignificantWords(title + ' ' + content)`, per [research.md](research.md) Decisions 1–2 (depends on T002)
- [x] T005 Create [frontend/tests/related-topics/getRelatedTopicsKeywordIndex.test.ts](../../frontend/tests/related-topics/getRelatedTopicsKeywordIndex.test.ts) verifying: resolves a non-empty word set for a known real topic; returns the same cached promise instance on repeat calls; a topic with no content-index entry still gets a word set derived from its title alone (depends on T004)
- [x] T006 Create [frontend/src/features/related-topics/hooks/useRelatedTopics.ts](../../frontend/src/features/related-topics/hooks/useRelatedTopics.ts) exporting `useRelatedTopics(topic: Topic): { status: 'loading' | 'ready'; relatedTopics: SearchableTopic[] }`, per [data-model.md](data-model.md) derivation rule (top 5, score > 0, excludes current topic, sorted descending) (depends on T004)
- [x] T007 Create [frontend/tests/related-topics/useRelatedTopics.test.ts](../../frontend/tests/related-topics/useRelatedTopics.test.ts) verifying: `status` starts `'loading'`, becomes `'ready'`; `relatedTopics` never includes the current topic id; results are capped at 5; a topic with no keyword overlap with anything returns an empty array once ready (depends on T006) — uses mocked keyword index/topic list for deterministic scoring assertions

**Checkpoint**: Foundational keyword-index layer ready and tested.

---

## Phase 3: User Story 1 - See Related Topics on a Topic Page (Priority: P1) 🎯 MVP

**Goal**: Every topic page shows a Related Topics section below its main content, with its own independent loading state, cross-menu suggestions, a no-results message when appropriate, and working navigation.

**Independent Test**: Open a topic known to share vocabulary with a topic in a different menu and confirm it appears in the Related Topics list; confirm selecting it navigates correctly.

### Tests for User Story 1

- [x] T008 [US1] Create [frontend/tests/related-topics/RelatedTopicsSection.test.tsx](../../frontend/tests/related-topics/RelatedTopicsSection.test.tsx) verifying: shows a loading indicator while `status === 'loading'`; renders each related topic's title + menu label once ready; shows "No related topics found" when the list is empty and ready; selecting an entry calls the provided navigation callback with the correct menu/slug (FR-001–FR-007, FR-009)
- [x] T009 [P] [US1] Extend [frontend/tests/main/TopicInfoPage.test.tsx](../../frontend/tests/main/TopicInfoPage.test.tsx) verifying: the Related Topics section renders on a real topic page below the main content, without delaying the main content's own render (FR-004, SC-002) — also added the shared `stubContentIndexFetch()` to this test file since it now transitively depends on the content index

### Implementation for User Story 1

- [x] T010 [US1] Create [frontend/src/features/related-topics/components/RelatedTopicsSection.tsx](../../frontend/src/features/related-topics/components/RelatedTopicsSection.tsx): accepts `{ topic: Topic }`, calls `useRelatedTopics(topic)`, renders a "Related Topics" heading + loading indicator / list (title + menu label per entry, `useNavigate` to `/${menuId}/${slug}`) / "No related topics found" message per [contracts/related-topics-ui-contract.md](contracts/related-topics-ui-contract.md) (depends on T006)
- [x] T011 [US1] In [frontend/src/features/main/pages/TopicInfoPage.tsx](../../frontend/src/features/main/pages/TopicInfoPage.tsx), render `<RelatedTopicsSection topic={topic} />` below the existing `TopicMarkdownContent` (only when `topic` is defined), with no changes to the existing main-content loading state machine (depends on T010)

**Checkpoint**: User Story 1 fully functional and independently testable.

---

## Phase 4: Polish & Cross-Cutting Concerns

- [x] T012 [P] Run `npm run lint` in [frontend](../../frontend) and fix any issues introduced by this feature — 0 errors
- [x] T013 [P] Run `npm run build` in [frontend](../../frontend) and fix any type errors — builds cleanly
- [x] T014 Run the full regression suite (`npm run test -- --run` in [frontend](../../frontend), no dev/preview server running concurrently) and confirm no regressions relative to the Phase 1 baseline — 235 passed | 2 failed (same pre-existing, unrelated) | 4 skipped (241); 18 new tests all passing
- [x] T015 Manually walk through every scenario in [quickstart.md](quickstart.md) against a running dev server (`npm run dev`) — verified live: Azure Event Hubs surfaced 5 genuinely relevant cross-menu related topics (Azure Cosmos DB, Azure Service Bus, Azure Table Storage, System Design: Amazon E-Commerce, System Design: Netflix), main content rendered instantly while the section loaded independently

---

## Dependencies

- **Phase 1** has no dependencies; run first.
- **Phase 2** depends on Phase 1. T002 is independent; T003 depends on T002. T004 depends on T002; T005 depends on T004. T006 depends on T004; T007 depends on T006.
- **Phase 3 (US1)** depends on Phase 2. T008/T009 are parallelizable (different test files). Implementation: T010 depends on T006; T011 depends on T010.
- **Phase 4** depends on Phase 3. T012/T013 parallelizable; T014 depends on both; T015 depends on T014.

## Implementation Strategy

**MVP = the only user story** (Phases 1–3): a complete, working Related
Topics section. Phase 4 polish closes it out.
