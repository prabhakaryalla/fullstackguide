---

description: "Task list template for feature implementation"
---

# Tasks: Tag-Based Cross-Menu Filtering

**Input**: Design documents from `/specs/015-tag-based-cross-menu-filtering/`

**Prerequisites**: [plan.md](plan.md), [spec.md](spec.md), [research.md](research.md), [data-model.md](data-model.md), [contracts/tags-ui-contract.md](contracts/tags-ui-contract.md), [quickstart.md](quickstart.md)

**Tests**: Included. Constitution Principle VIII (Automated Testing Policy) requires every feature to include or update automated tests.

**Organization**: 3 user stories (US1 P1, US2 P2, US3 P3). Tasks are grouped into Setup, Foundational (tag definitions + index + hooks), one phase per user story, and Polish.

## Path Conventions

Single-project web frontend at [frontend](../../frontend). All paths below are relative to the repository root.

---

## Phase 1: Setup

- [x] T001 Run the existing test suite as a baseline (`npm run test -- --run` in [frontend](../../frontend), no dev/preview server running concurrently) and record the current pass count

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: The curated tag dictionary, the derived tag index, and the three data hooks every user story depends on. Per [research.md](research.md) Decisions 1–4.

- [x] T002 [P] Create [frontend/src/features/tags/data/tagDefinitions.ts](../../frontend/src/features/tags/data/tagDefinitions.ts) exporting `TAG_DEFINITIONS: TagDefinition[]` (~18 entries: id, label, single-word-only keywords per Decision 4)
- [x] T003 [P] Create [frontend/tests/tags/tagDefinitions.test.ts](../../frontend/tests/tags/tagDefinitions.test.ts) verifying: every tag has a unique id; every keyword is a single lowercase word ≥4 characters (guards Decision 4's constraint so a future edit can't silently break index reuse)
- [x] T004 Create [frontend/src/features/tags/data/getTopicTagsIndex.ts](../../frontend/src/features/tags/data/getTopicTagsIndex.ts) exporting `getTopicTagsIndex(): Promise<Map<string, string[]>>` — module-level cached promise; awaits `getRelatedTopicsKeywordIndex()` (from `features/related-topics/data/getRelatedTopicsKeywordIndex`), derives one entry per `getAllSearchableTopics()` result by checking each `TAG_DEFINITIONS` entry's keywords against that topic's word set, per [research.md](research.md) Decisions 1, 3 (depends on T002)
- [x] T005 Create [frontend/tests/tags/getTopicTagsIndex.test.ts](../../frontend/tests/tags/getTopicTagsIndex.test.ts) verifying: a known real topic gets a plausible tag id in its list; returns the same cached promise instance on repeat calls; every topic (even one matching zero tags) has an entry (empty array, not omitted) (depends on T004)
- [x] T006 [P] Create [frontend/src/features/tags/hooks/useTopicTags.ts](../../frontend/src/features/tags/hooks/useTopicTags.ts) exporting `useTopicTags(topicId: string): { status: 'loading' | 'ready'; tagIds: string[] }` (depends on T004)
- [x] T007 [P] Create [frontend/src/features/tags/hooks/useTopicsByTag.ts](../../frontend/src/features/tags/hooks/useTopicsByTag.ts) exporting `useTopicsByTag(tagId: string): { status: 'loading' | 'ready'; topics: SearchableTopic[] }` (depends on T004)
- [x] T008 [P] Create [frontend/src/features/tags/hooks/useAllTagsWithCounts.ts](../../frontend/src/features/tags/hooks/useAllTagsWithCounts.ts) exporting `useAllTagsWithCounts(): { status: 'loading' | 'ready'; tags: { id: string; label: string; count: number }[] }` (depends on T002, T004)
- [x] T009 [P] Create [frontend/tests/tags/useTopicTags.test.ts](../../frontend/tests/tags/useTopicTags.test.ts), [frontend/tests/tags/useTopicsByTag.test.ts](../../frontend/tests/tags/useTopicsByTag.test.ts), and [frontend/tests/tags/useAllTagsWithCounts.test.ts](../../frontend/tests/tags/useAllTagsWithCounts.test.ts) — each verifying the `'loading'` → `'ready'` transition and correct derived output against a mocked `getTopicTagsIndex`/`getAllSearchableTopics` (depends on T006, T007, T008)

**Checkpoint**: Foundational tag data layer ready and tested.

---

## Phase 3: User Story 1 - Browse All Topics for a Tag, Across Every Menu (Priority: P1) 🎯 MVP

**Goal**: A "Browse by Tags" page lists every tag with its count; selecting one shows every matching topic across every menu; loading/no-results/unknown-tag states are all handled.

### Tests for User Story 1

- [x] T010 [US1] Create [frontend/tests/tags/TagsIndexPage.test.tsx](../../frontend/tests/tags/TagsIndexPage.test.tsx) verifying: shows a loading indicator, then every tag with its count once ready; selecting a tag navigates to `/tags/:tagId` (FR-002, FR-003)
- [x] T011 [P] [US1] Create [frontend/tests/tags/TagTopicsPage.test.tsx](../../frontend/tests/tags/TagTopicsPage.test.tsx) verifying: shows a loading indicator, then topics from more than one menu area (title + menu label) for a broadly-applicable tag; shows "No topics found for this tag" for a tag with zero matches; shows a "Tag not found" state for an unknown tag id; selecting a topic navigates to its content page (FR-004–FR-007, FR-011)

### Implementation for User Story 1

- [x] T012 [US1] Create [frontend/src/features/tags/pages/TagsIndexPage.tsx](../../frontend/src/features/tags/pages/TagsIndexPage.tsx): uses `useAllTagsWithCounts()`, renders loading indicator / a list of tag entries (label + count) navigating to `/tags/${id}` on select (depends on T008)
- [x] T013 [US1] Create [frontend/src/features/tags/pages/TagTopicsPage.tsx](../../frontend/src/features/tags/pages/TagTopicsPage.tsx): reads `tagId` from route params, guards against an unknown tag id (not present in `TAG_DEFINITIONS`) with a "Tag not found" state, otherwise uses `useTopicsByTag(tagId)` and renders the existing `TopicList` (topics + `onTopicClick` navigating via each entry's `menuId`), loading indicator, and "No topics found for this tag" empty state (depends on T002, T007)
- [x] T014 [US1] Add `<Route path="/tags" element={<TagsIndexPage />} />` and `<Route path="/tags/:tagId" element={<TagTopicsPage />} />` (both lazy-loaded) in [frontend/src/app/router/AppRouter.tsx](../../frontend/src/app/router/AppRouter.tsx) (depends on T012, T013)
- [x] T015 [US1] Create [frontend/src/features/landing/components/TagsNavAction.tsx](../../frontend/src/features/landing/components/TagsNavAction.tsx) (structurally mirroring `BookmarksNavAction.tsx`, navigates to `/tags`); render it next to `<BookmarksNavAction />` in both branches of [frontend/src/features/landing/components/LandingNavigationBar.tsx](../../frontend/src/features/landing/components/LandingNavigationBar.tsx), and add a matching entry in [frontend/src/features/landing/components/MobileNavigationDrawer.tsx](../../frontend/src/features/landing/components/MobileNavigationDrawer.tsx) (depends on T014)
- [x] T016 [US1] Extend [frontend/tests/landing/LandingNavigationBar.test.tsx](../../frontend/tests/landing/LandingNavigationBar.test.tsx) verifying the "Browse by Tags" control is present and navigates to `/tags` (FR-002, SC-002) (depends on T015)

**Checkpoint**: User Story 1 fully functional and independently testable — the entire cross-menu browsing value is delivered.

---

## Phase 4: User Story 2 - See a Topic's Own Tags on Its Content Page (Priority: P2)

**Goal**: Topic content pages show their own matched tags as selectable chips pivoting into User Story 1's tag topic list; topics with no matches show nothing.

### Tests for User Story 2

- [x] T017 [US2] Create [frontend/tests/tags/TagChipList.test.tsx](../../frontend/tests/tags/TagChipList.test.tsx) verifying: renders one chip per tag id with its label; when `onTagClick` is provided, chips are keyboard-operable buttons that invoke it with the tag id; when omitted, chips render as plain (non-interactive) indicators (Decision 5)
- [x] T018 [P] [US2] Extend [frontend/tests/main/TopicInfoPage.test.tsx](../../frontend/tests/main/TopicInfoPage.test.tsx) verifying: a topic matching at least one tag shows selectable tag chips that navigate to `/tags/:tagId`; a topic matching no tags shows none (FR-008, FR-009)

### Implementation for User Story 2

- [x] T019 [US2] Create [frontend/src/features/tags/components/TagChipList.tsx](../../frontend/src/features/tags/components/TagChipList.tsx): accepts `{ tagIds: string[]; onTagClick?: (tagId: string) => void }`, resolves labels from `TAG_DEFINITIONS`, renders nothing when `tagIds` is empty (depends on T002)
- [x] T020 [US2] In [frontend/src/features/main/pages/TopicInfoPage.tsx](../../frontend/src/features/main/pages/TopicInfoPage.tsx), use `useTopicTags(topic.id)` and render `<TagChipList tagIds={tagIds} onTagClick={(id) => navigate(`/tags/${id}`)} />` near the top of the page when `topic` is defined (depends on T006, T019)

**Checkpoint**: User Story 2 fully functional and independently testable, layered on Phase 3.

---

## Phase 5: User Story 3 - See Tags at a Glance in a Menu's Topic List (Priority: P3)

**Goal**: Menu topic-list cards show their tags as plain, non-interactive indicators, without breaking the card's existing click-to-open behavior.

### Tests for User Story 3

- [x] T021 [US3] Extend [frontend/tests/main/TopicList.test.tsx](../../frontend/tests/main/TopicList.test.tsx) verifying `TopicList` forwards a `getTags` lookup result down to each rendered `TopicCard` as its `tags` prop
- [x] T022 [P] [US3] Extend [frontend/tests/main/MainPage.test.tsx](../../frontend/tests/main/MainPage.test.tsx) verifying a topic card matching at least one tag shows a plain (non-interactive) tag indicator, and clicking the card still navigates to the topic (not a tag) (FR-010)

### Implementation for User Story 3

- [x] T023 [US3] In [frontend/src/features/main/components/TopicCard.tsx](../../frontend/src/features/main/components/TopicCard.tsx), add an optional `tags?: string[]` prop rendering a small, non-interactive `Chip` row (reusing `TagChipList` with no `onTagClick`) when non-empty (depends on T019)
- [x] T024 [US3] In [frontend/src/features/main/components/TopicList.tsx](../../frontend/src/features/main/components/TopicList.tsx), add an optional `getTags?: (topic: Topic) => string[] | undefined` prop and pass `getTags?.(topic)` as `TopicCard`'s `tags` prop (depends on T023)
- [x] T025 [US3] In [frontend/src/features/main/pages/MainPage.tsx](../../frontend/src/features/main/pages/MainPage.tsx), use `useTopicTags` per-topic (or a small local lookup built once from `getTopicTagsIndex()`) and pass `getTags={(topic) => tagsIndex.get(topic.id)}` to `TopicList` (depends on T004, T024)

**Checkpoint**: User Story 3 fully functional and independently testable, layered on Phases 3–4.

---

## Phase 6: Polish & Cross-Cutting Concerns

- [x] T026 [P] Run `npm run lint` in [frontend](../../frontend) and fix any issues introduced by this feature
- [x] T027 [P] Run `npm run build` in [frontend](../../frontend) and fix any type errors
- [x] T028 Run the full regression suite (`npm run test -- --run` in [frontend](../../frontend), no dev/preview server running concurrently) and confirm no regressions relative to the Phase 1 baseline
- [x] T029 Manually walk through every scenario in [quickstart.md](quickstart.md) against a running dev server (`npm run dev`)

---

## Dependencies

- **Phase 1** has no dependencies; run first.
- **Phase 2** depends on Phase 1. T002 independent; T003 depends on T002. T004 depends on T002; T005 depends on T004. T006/T007/T008 depend on T004 (T008 also on T002); T009 depends on T006–T008.
- **Phase 3 (US1)** depends on Phase 2. T010/T011 parallelizable. Implementation: T012 depends on T008; T013 depends on T002, T007; T014 depends on T012, T013; T015 depends on T014; T016 depends on T015.
- **Phase 4 (US2)** depends on Phase 3 being complete (adds to the same nav/route surface conceptually, though technically only needs Phase 2). T017/T018 parallelizable. Implementation: T019 depends on T002; T020 depends on T006, T019.
- **Phase 5 (US3)** depends on Phase 4 (reuses `TagChipList`). T021/T022 parallelizable. Implementation: T023 depends on T019; T024 depends on T023; T025 depends on T004, T024.
- **Phase 6** depends on Phases 3–5. T026/T027 parallelizable; T028 depends on both; T029 depends on T028.

## Implementation Strategy

**MVP = User Story 1 only** (Phases 1–3): the full cross-menu tag browsing
experience, independently valuable and demoable before the topic-page
pivot (US2) or card-level indicators (US3) are added.
