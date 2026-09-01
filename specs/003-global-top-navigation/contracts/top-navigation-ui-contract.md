# UI Contract: Global Top Navigation Visibility

## Purpose

Define the externally observable behavior that guarantees top navigation is
visible and usable across all in-scope pages.

---

## 1. Route visibility contract

| Route | Page | Top Navigation Requirement |
|-------|------|----------------------------|
| `#/` | Landing | Must be visible on page load and remain fixed while scrolling |
| `#/:menuSlug` | Main | Must remain visible and fixed during and after route entry |
| `#/:menuSlug/:topicSlug` | Topic Info | Must remain visible and fixed while topic content renders |
| `#/*` (fallback) | Fallback | Must be visible and fixed with fallback content |

Rules:
- Top navigation visibility is mandatory on every in-scope route above.
- Visibility must hold for direct URL entry, in-app navigation, and browser
  refresh.
- Visibility must not depend on successful topic/content lookup.
- Top navigation must remain fixed in a consistent viewport position from
  top-of-page to bottom-of-page scrolling.

---

## 2. Navigation composition contract

- Top navigation includes:
  - Application title.
  - Existing top-level menu items from menu configuration.
  - Existing settings action.
- This feature does not add, remove, or rename menu items.
- Existing menu destinations remain unchanged.

---

## 3. Selection behavior contract

- Active menu highlight is derived from current route context.
- For `#/:menuSlug` and `#/:menuSlug/:topicSlug`, selected menu corresponds to
  `menuSlug` when known.
- For Landing and fallback routes, no invalid highlight is shown.

---

## 4. Interaction continuity contract

- When users navigate between in-scope pages, top navigation remains visible
  without requiring additional user action.
- When users scroll any in-scope page, top navigation remains fixed and usable
  without requiring a return to page top.
- When content is empty or unavailable, top navigation remains visible and
  usable.
- Browser back/forward actions must preserve top navigation visibility.

---

## 5. Accessibility contract

- Top navigation remains keyboard reachable on every in-scope page.
- Focus indicator remains visible for top navigation interactive controls.
- Navigation semantics are consistent across pages so users can reliably locate
  controls.

---

## 6. Out-of-scope contract

- No new authorization behavior is introduced.
- No new menu hierarchy levels are introduced.
- No changes are made to topic rendering semantics beyond maintaining
  navigation visibility.
