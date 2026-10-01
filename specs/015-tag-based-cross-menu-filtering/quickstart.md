# Quickstart: Tag-Based Cross-Menu Filtering Validation

## Prerequisites

- Node.js 20+; `npm install` in [frontend](../../frontend); `npm run dev`.
- Do NOT run the dev server and the test suite at the same time — see repo
  memory notes on CPU contention causing false test failures.

## Functional validation scenarios

### 1. Discover tags from the top navigation

- On any page, verify a "Browse by Tags" icon is visible in the top
  navigation; select it and confirm it navigates to `/tags`.

### 2. Tags index page shows counts

- On `/tags`, verify every defined tag is listed with a topic count once
  loading finishes.

### 3. Cross-menu topic list for a tag

- Select a tag known to apply broadly (for example, "Cloud & Infrastructure"
  or "Caching"); verify the resulting list includes topics from more than
  one menu area, each showing its menu label.

### 4. Selecting a topic navigates correctly

- From a tag's topic list, select any topic; verify it opens that topic's
  own content page.

### 5. Topic page shows its own tags

- Open a topic known to match at least one tag; verify tag chips appear
  near the top of the page and are keyboard-operable.
- Select a tag chip; verify it navigates to that tag's `/tags/:tagId` page.

### 6. Topic with no tags shows none

- Open a topic unlikely to match any tag's vocabulary; verify no tag chips
  appear and the rest of the page renders normally.

### 7. Menu topic list shows non-interactive tag indicators

- Open any menu's topic list; verify topic cards matching at least one tag
  show it as a plain indicator, and clicking anywhere on the card still
  opens the topic (not the tag).

### 8. No-results and unknown-tag states

- Manually visit `/tags/unknown-tag-id`; verify a clear "Tag not found"
  state (not a blank page).

## Automated test entry points

- `frontend/tests/tags/tagDefinitions.test.ts`
- `frontend/tests/tags/getTopicTagsIndex.test.ts`
- `frontend/tests/tags/useTopicTags.test.ts`
- `frontend/tests/tags/useTopicsByTag.test.ts`
- `frontend/tests/tags/useAllTagsWithCounts.test.ts`
- `frontend/tests/tags/TagChipList.test.tsx`
- `frontend/tests/tags/TagsIndexPage.test.tsx`
- `frontend/tests/tags/TagTopicsPage.test.tsx`
- `frontend/tests/main/TopicInfoPage.test.tsx` (extended)
- `frontend/tests/main/TopicList.test.tsx` (extended)
- `frontend/tests/main/MainPage.test.tsx` (extended)
- `frontend/tests/landing/LandingNavigationBar.test.tsx` (extended)

Run the full suite with `npm run test -- --run` from [frontend](../../frontend).
