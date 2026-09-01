# Quickstart: Global Search Bar Validation

## Prerequisites

- Node.js 20+ installed.
- Frontend dependencies installed from [frontend/package.json](../../frontend/package.json):
  run `npm install` in [frontend](../../frontend).
- Development server available from [frontend](../../frontend): `npm run dev`.

See [contracts/global-search-ui-contract.md](contracts/global-search-ui-contract.md)
for the full behavioral contract and [data-model.md](data-model.md) for the
underlying state model referenced below.

---

## Routes to validate

| URL | Expected behavior |
|-----|--------------------|
| `http://localhost:5173/#/` | Top navigation shows the Global Search bar (expanded, empty) between the title and the menu items |
| `http://localhost:5173/#/azure` | Global Search bar still visible in the same position on a menu topic-list page |
| `http://localhost:5173/#/azure/azure-event-hubs` | Global Search bar still visible in the same position on a topic content page |
| `http://localhost:5173/#/search?q=azure` | Search results page: pre-filled with "azure"; Global Search bar collapsed to icon-only |
| `http://localhost:5173/#/search?q=zzzznotopic` | Search results page shows the "no results" empty state |

---

## Functional validation scenarios

### 1. Global Search bar is visible everywhere

- Open `http://localhost:5173/#/`.
- Verify the Global Search bar renders between the title ("Fullstack Guide")
  and the menu navigation (Backend, Frontend, Cloud, …).
- Navigate to a menu page (`#/azure`) and a topic page
  (`#/azure/azure-event-hubs`); verify the Global Search bar remains visible
  in the same position on both.

### 2. Submitting a keyword navigates to the search results page

- From `#/`, type a keyword that matches topics from more than one menu (for
  example, a term shared by an Azure topic and a C# topic) into the Global
  Search bar and press Enter.
- Verify the URL changes to `#/search?q=<keyword>`.
- Verify the search results page's own search bar is pre-filled with the same
  keyword.
- Verify matching topics from more than one menu area appear in the results
  list.

### 3. Empty/whitespace submit does nothing

- Focus the Global Search bar, leave it empty (or type only spaces), and
  press Enter.
- Verify no navigation occurs and the input's value is unchanged.

### 4. Global Search bar collapses on the search results page

- After scenario 2, verify the Global Search bar in the top navigation now
  shows only a search icon (no leftover keyword text visible).
- Select that icon; verify the input reappears (empty) so a new keyword can
  be typed.
- Submit a new keyword from this reopened input; verify the results list
  updates to the new keyword's matches and the Global Search bar collapses
  back to icon-only.

### 5. Leaving the search results page restores the expanded bar

- From the search results page, select any menu item in the top navigation
  (for example, "Backend" → "C#").
- Verify the Global Search bar returns to its normal expanded, empty state.

### 6. Editing the keyword on the search results page

- On the search results page, clear the pre-filled keyword and type a
  different one directly into the page's own search bar.
- Verify the results list updates to match the new keyword without needing a
  separate submit action.
- Reload the browser; verify the same (edited) keyword and results persist.

### 7. No-results empty state

- Submit a keyword that matches no topic title (for example, "zzzznotopic").
- Verify a clear "no results" message is shown instead of an empty list.

### 8. Selecting a result navigates to its content

- From any non-empty results list, select a topic.
- Verify the application navigates to that topic's content page
  (`/${menuId}/${topicSlug}`).

### 9. Keyboard operability

- Tab to the Global Search bar's input from the title button.
- Type a keyword and press Enter (not click) to submit; verify it navigates
  the same as clicking the search icon would.
- On the search results page, Tab to the collapsed search icon and activate
  it with Enter/Space; verify it expands the input.

---

## Automated test entry points

- `frontend/tests/landing/GlobalSearchBar.test.tsx` (new)
- `frontend/tests/search/SearchResultsPage.test.tsx` (new)
- [frontend/tests/main/NavigationPersistenceFlow.test.tsx](../../frontend/tests/main/NavigationPersistenceFlow.test.tsx) (extended: global search → results → topic content, end-to-end through the shared shell)

Run the full suite with `npm run test -- --run` from [frontend](../../frontend).
