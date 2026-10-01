# Quickstart: Full-Text Content Search Validation

## Prerequisites

- Node.js 20+ installed.
- Frontend dependencies installed from [frontend/package.json](../../frontend/package.json):
  run `npm install` in [frontend](../../frontend).
- Development server available from [frontend](../../frontend): `npm run dev`.

See [contracts/full-text-search-ui-contract.md](contracts/full-text-search-ui-contract.md)
for the full behavioral contract and [data-model.md](data-model.md) for the
underlying state model referenced below.

---

## Functional validation scenarios

### 1. Title matches remain instant

- Open `http://localhost:5173/#/search?q=azure`.
- Verify title matches (for example, "Azure Event Hubs") appear immediately,
  even before any loading indicator for content matches resolves.

### 2. Content-only match appears once the index loads

- Pick a keyword you know appears only in a topic's body text (for example,
  a distinctive phrase from a topic's explanation, not its title).
- Search for it and verify: the loading indicator appears briefly, then the
  topic appears in the results with a short plain-text snippet beneath its
  title showing the matched context.

### 3. No duplicate rows for title+content matches

- Search for a keyword that matches both a topic's title and its own body
  content.
- Verify that topic appears exactly once in the results (no snippet shown,
  since it's already a title match).

### 4. Session caching — no repeat loading indicator

- After scenario 2/3 above, navigate away from `/search` (for example, to
  a menu page) and back to `/search` with a new keyword.
- Verify the loading indicator does NOT reappear — content matches for the
  new keyword appear immediately alongside title matches.

### 5. No-results state still works

- Search for a keyword that matches nothing, once the content index has
  loaded (wait for scenario 2's loading indicator to finish first).
- Verify the existing "no results" empty state is shown.

### 6. Large-match-count keyword doesn't break the page

- Search for a very common short keyword (for example, a single common
  letter or short word) that is likely to match many `leet-code` topics.
- Verify the page remains responsive and the existing large-list
  batching/"Load More" behavior (from `TopicList`) still works.

---

## Automated test entry points

- `frontend/tests/search/getAllTopicContentIndex.test.ts` (new)
- `frontend/tests/search/extractContentSnippet.test.ts` (new)
- `frontend/tests/search/useContentSearchResults.test.ts` (new)
- [frontend/tests/search/SearchResultsPage.test.tsx](../../frontend/tests/search/SearchResultsPage.test.tsx) (extended)

Run the full suite with `npm run test -- --run` from [frontend](../../frontend).
