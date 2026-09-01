# UI Contract: Topic Complexity Filter on Main Page

## Purpose

Define the externally observable behavior for complexity-based topic filtering on the main page, including interaction with search.

---

## 1. Filter visibility and default contract

| Area | Requirement |
|------|-------------|
| Main page controls | A complexity filter control must be visible beside the topic search control |
| Default state | Complexity filter must default to `All` on initial main-page load |
| Available options | Filter must include `All`, `Easy`, `Medium`, and `Hard` |

Rules:
- The complexity filter is available whenever topics are shown on the main page.
- Default `All` state must show the full topic list for the active menu.

---

## 2. Complexity filtering behavior contract

| Selected filter | Expected visible topics |
|-----------------|-------------------------|
| `All` | All topics for the active menu |
| `Easy` | Only topics with `complexity = Easy` |
| `Medium` | Only topics with `complexity = Medium` |
| `Hard` | Only topics with `complexity = Hard` |

Rules:
- Topics must never be shown under a complexity they do not match.
- Topics with missing/unknown complexity are excluded from `Easy`, `Medium`, and `Hard` views.

---

## 3. Combined search + complexity contract

When both search and complexity are active:
- Visible topics must satisfy both conditions:
  - topic title matches search query (case-insensitive), and
  - topic complexity matches selected complexity unless selected value is `All`.

Examples:
- Search `event` + `Easy` returns only topics that are both Easy and title-matching `event`.
- Search with no matching items for selected complexity returns zero results.

---

## 4. Empty-results behavior contract

- If no topics match the active filter state, an empty-results message must be shown.
- Search and complexity controls must remain visible and usable in empty-results state.
- Empty-results state must not break route, layout, or keyboard navigation.

---

## 5. Accessibility contract

- Complexity filter must be keyboard reachable in normal tab order.
- Filter control must have a clear accessible label.
- Focus indicator for filter and search controls must remain visible.

---

## 6. Out-of-scope contract

- No personalization or persistence of filter choice across sessions.
- No additional complexity levels beyond `Easy`, `Medium`, and `Hard`.
- No changes to topic route structure or topic content rendering behavior.
