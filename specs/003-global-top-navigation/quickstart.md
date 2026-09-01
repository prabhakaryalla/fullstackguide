# Quickstart: Global Top Navigation Visibility Validation

## Prerequisites

- Node.js 20+ installed.
- Frontend dependencies installed from [frontend/package.json](frontend/package.json):
  run `npm install` in [frontend](frontend).
- Development server available from [frontend](frontend): `npm run dev`.
- Existing landing and main feature routes are present.

---

## Routes to validate

See [specs/003-global-top-navigation/contracts/top-navigation-ui-contract.md](specs/003-global-top-navigation/contracts/top-navigation-ui-contract.md) for full contract details.

| URL | Expected behavior |
|-----|-------------------|
| `http://localhost:5173/#/` | Landing page shows top navigation |
| `http://localhost:5173/#/azure` | Main page shows top navigation |
| `http://localhost:5173/#/azure/azure-event-hubs` | Topic Info page shows top navigation |
| `http://localhost:5173/#/unknown-route` | Fallback page shows top navigation |

---

## Functional validation scenarios

### 1. Initial landing visibility and fixed scroll behavior

- Open `http://localhost:5173/#/`.
- Verify top navigation is visible with title, menu items, and settings action.
- Scroll to the bottom of the landing page.
- Verify top navigation remains fixed and visible on one desktop viewport and
  one mobile viewport.

### 2. Navigation persistence from Landing to Main

- On landing, select a top menu (for example Azure).
- Verify route changes to `#/azure`.
- Verify top navigation remains visible immediately after transition.

### 3. Navigation persistence from Main to Topic Info

- On `#/azure`, select a topic tile.
- Verify route changes to `#/azure/<topicSlug>`.
- Verify top navigation remains visible while topic content loads and after
  content is rendered.

### 4. Refresh behavior on deep links

- Refresh browser on `#/azure`.
- Refresh browser on `#/azure/<topicSlug>`.
- Verify top navigation is visible after each refresh.

### 5. Fallback route behavior

- Navigate to `#/this-route-does-not-exist`.
- Verify fallback content is shown.
- Verify top navigation remains visible and usable.

### 6. Scroll persistence across all in-scope routes

- Open each route in this order: `#/`, `#/azure`, `#/azure/azure-event-hubs`,
  `#/unknown-route`.
- On each route, scroll from top to bottom.
- Verify top navigation remains fixed in a consistent viewport position and
  does not disappear.

### 7. Empty and unavailable content behavior

- Open a route that results in no topics or unavailable topic content.
- Verify page-level message appears for the content condition.
- Verify top navigation remains visible and keyboard reachable.

### 8. Back/forward navigation behavior

- Navigate Landing -> Main -> Topic Info.
- Use browser back and forward controls.
- Verify top navigation remains visible on each step.

---

## Accessibility validation checks

- Navigate with keyboard only (`Tab`, `Shift+Tab`, `Enter`, `Space`).
- Verify top navigation controls are reachable on each in-scope page.
- Verify focus indicator is visible for navigation actions.

---

## Test commands

Run automated tests from [frontend](frontend):

```bash
npm run test
```

Recommended assertions:

- Router-level rendering keeps top navigation visible for `/`,
  `/:menuSlug`, `/:menuSlug/:topicSlug`, and wildcard routes.
- Existing menu click and topic navigation behavior remains unchanged.
- Fallback and content-unavailable states still include top navigation.
- For each in-scope route, verify top navigation remains fixed and visible
  after scrolling to the bottom.
- For each in-scope route, capture a route render start timestamp and verify
  top navigation is visible within 1000 ms.
- Record pass/fail timing evidence for Landing, Main, Topic Info, and fallback
  routes in the validation notes.

---

## Expected outcome

- Top navigation is always visible on all in-scope pages.
- Route transitions, refreshes, and fallback states do not hide navigation.
- Existing route semantics and menu behaviors remain unchanged.

---

## Validation notes

- Record the latest test and lint/format outcomes for this branch execution.
- Record timing evidence proving top navigation meets the 1000 ms visibility
  target on Landing, Main, Topic Info, and fallback routes.
- Record scroll-evidence notes proving fixed visibility from top to bottom on
  each in-scope route.
- For SC-004, use a structured validation sample of at least 20 participants
  across desktop and mobile and capture:
  - participant count by device class,
  - prompt used for navigation discoverability,
  - percentage reporting "always find top navigation" without assistance,
  - pass/fail result against 95% threshold.
- For SC-005, apply the project defect severity rubric and capture:
  - all usability defects related to navigation visibility/usability,
  - severity assigned for each defect,
  - open critical defect count at release readiness review,
  - pass/fail result against "0 open critical defects" target.
- Confirm the quality gate commands complete successfully:

```bash
npm run lint
npm run test:run
npm run format -- --check .
```
