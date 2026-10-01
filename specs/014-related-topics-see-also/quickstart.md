# Quickstart: Related Topics ("See Also") Validation

## Prerequisites

- Node.js 20+; `npm install` in [frontend](../../frontend); `npm run dev`.
- Do NOT run the dev server and the test suite at the same time on this
  machine — see repo memory notes on CPU contention causing false test
  failures.

## Functional validation scenarios

### 1. Related Topics section appears below main content

- Open any topic page (for example, `#/azure/azure-event-hubs`).
- Verify a "Related Topics" section renders below the main content,
  showing either a loading indicator or results — never missing entirely.

### 2. Main content is never delayed

- On the very first topic page opened in a fresh session (content index
  not yet cached), verify the main topic content (heading, body) renders
  immediately, while only the Related Topics section shows its own loading
  indicator.

### 3. Cross-menu suggestions appear

- Find a topic known to share distinctive vocabulary with a topic in a
  different menu (for example, a caching-related Azure topic and a
  caching-related System Design topic).
- Verify the related list can include a topic from a different menu, with
  that menu's label shown.

### 4. Selecting a related topic navigates correctly

- Select any related topic entry; verify the application navigates to that
  topic's own content page.

### 5. No-results state

- Find (or reason about) a topic with unusually short/generic content;
  verify a "No related topics found" message appears instead of an empty
  section, once computation finishes.

### 6. Session caching

- After visiting one topic page (paying the first-load cost), visit a
  second topic page; verify the Related Topics section appears without a
  loading delay.

### 7. Keyboard operability

- Tab to a related topic entry and activate it with Enter/Space; verify it
  navigates like a click would.

## Automated test entry points

- `frontend/tests/related-topics/extractSignificantWords.test.ts`
- `frontend/tests/related-topics/getRelatedTopicsKeywordIndex.test.ts`
- `frontend/tests/related-topics/useRelatedTopics.test.ts`
- `frontend/tests/related-topics/RelatedTopicsSection.test.tsx`
- `frontend/tests/main/TopicInfoPage.test.tsx` (extended)

Run the full suite with `npm run test -- --run` from [frontend](../../frontend).
