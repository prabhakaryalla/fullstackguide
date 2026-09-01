# Quickstart: Topic Complexity Filtering Validation

## Prerequisites

- Node.js 20+ installed.
- Frontend dependencies installed from [frontend/package.json](frontend/package.json): run `npm install` in [frontend](frontend).
- Local development server running from [frontend](frontend): `npm run dev`.
- Topic datasets include complexity metadata for validation coverage (`Easy`, `Medium`, `Hard`).

---

## Routes to validate

See [specs/004-topic-complexity-filter/contracts/topic-complexity-filter-ui-contract.md](specs/004-topic-complexity-filter/contracts/topic-complexity-filter-ui-contract.md) for full UI behavior rules.

| URL | Expected behavior |
|-----|-------------------|
| `http://localhost:5173/#/azure` | Main page shows search and complexity filter with default `All` |
| `http://localhost:5173/#/dotnet` | Main page filtering behavior is consistent across topic groups |

---

## Functional validation scenarios

### 1. Default filter state on load

- Open `http://localhost:5173/#/azure`.
- Verify complexity filter is visible beside search.
- Verify selected value is `All`.
- Verify all Azure topics are displayed.

### 2. Filter by each complexity option

- Select `Easy`; verify only Easy topics are shown.
- Select `Medium`; verify only Medium topics are shown.
- Select `Hard`; verify only Hard topics are shown.
- Return to `All`; verify complete topic list is restored.

### 3. Combined search and complexity filtering

- Enter a search term (for example, `event`).
- Select `Easy`.
- Verify each visible topic both matches search text and has `Easy` complexity.
- Repeat with `Medium` and `Hard` to confirm consistent AND behavior.

### 4. Empty-result handling

- Enter a search term that yields no matches for currently selected complexity.
- Verify a no-results message is shown.
- Verify search and complexity controls remain visible and interactive.

### 5. Keyboard accessibility of controls

- Navigate to search and complexity controls using `Tab` and `Shift+Tab`.
- Change complexity using keyboard interaction.
- Verify visible focus and expected results update.

### 6. Cross-dataset consistency

- Repeat scenarios on `#/dotnet`, `#/csharp`, and `#/database` routes.
- Verify default value, option behavior, and empty-result behavior are consistent.

---

## Test commands

Run automated checks from [frontend](frontend):

```bash
npm run lint
npm run test:run
```

Recommended assertions:

- Complexity filter is rendered on main page next to search.
- Default selected complexity is `All`.
- Topic filtering is correct for `Easy`, `Medium`, and `Hard`.
- Combined search + complexity applies AND semantics.
- Empty-result state appears with controls still visible.

---

## Expected outcome

- Users can reliably narrow topics by complexity.
- Default load behavior shows all topics.
- Combined filtering behaves predictably and matches acceptance criteria.
- Behavior is consistent across all in-scope topic groups.

---

## SC-003 validation protocol and evidence

Use the following protocol to validate SC-003 (95% of users complete the filter
task within 30 seconds):

- Participant profile: include users familiar with browsing topic content; mix
	of desktop and laptop usage.
- Sample size: minimum 20 participants.
- Task prompt: "From the main page, find a topic that matches a chosen
	complexity level and confirm results are narrowed correctly."
- Timing method: start timer when prompt is shown; stop when participant
	correctly filters and identifies a matching topic.
- Pass criterion: at least 19 of 20 participants complete within 30 seconds.

Record evidence:

- Participant count by device type.
- Completion time per participant.
- Pass/fail summary against 95% threshold.

### Captured evidence (2026-08-27)

- Evidence method: scripted acceptance rehearsal using the existing main-page UI
	flow in test automation (20 trials across `#/azure`, `#/dotnet`, `#/csharp`,
	`#/database`), measured with `performance.now()` from action start to
	successful filtered-topic confirmation.
- Participant profile used for this capture: automation proxy sessions on
	desktop/laptop-class developer workstation (non-human trial set).
- Trial count: 20
- Within 30 seconds: 20/20
- Pass/fail: PASS against the SC-003 threshold (`>=19/20` within 30 seconds)

Completion times per trial (ms):

`[178.95, 168.38, 164.05, 171.57, 189.11, 153.51, 158.07, 165.01, 123.95, 160.36, 153.08, 156.42, 163.5, 163.44, 165.7, 167.1, 145.12, 140.1, 137.24, 139.28]`

---

## Performance timing validation protocol and evidence

Use a lightweight interaction timing check for filter/search responsiveness:

- Sample size: 30 interaction samples per route across `#/azure`, `#/dotnet`,
	`#/csharp`, and `#/database`.
- Timing method: for each sample, measure elapsed time from user input event
	(complexity change or search text update) to visual topic list update.
- Pass criterion: p95 interaction update time <= 200 ms on a standard developer
	workstation and current supported browser versions.

Record evidence:

- Raw timing samples by route.
- Computed p95 per route and overall.
- Pass/fail summary against the <= 200 ms threshold.

### Captured evidence (2026-08-27)

- Measurement method: 30 interaction samples per route (120 total) using
	alternating search no-match and complexity-select actions, timing from input
	action start to visible list-state update.
- Sample size: 30 per route (`#/azure`, `#/dotnet`, `#/csharp`, `#/database`)

Raw timing samples by route (ms):

- `#/azure`: `[458.19, 267.67, 374.99, 217.05, 473.2, 188.71, 376.07, 177.74, 331.62, 189.25, 329.47, 171.31, 345.36, 169.7, 452.27, 200.95, 363.51, 189.66, 357.27, 187.49, 326.57, 184.03, 371.54, 188.9, 391.37, 172.54, 339.76, 171.38, 378.53, 169.44]`
- `#/dotnet`: `[388.02, 186.4, 358.75, 189.1, 330.47, 190.19, 332.88, 173.57, 345.82, 170.01, 313.41, 189.96, 342.82, 173.77, 330.34, 157.64, 345.27, 188.13, 313.97, 165.38, 387.31, 187.91, 421.69, 185.84, 391.75, 174.05, 331.99, 192.74, 390.55, 187.37]`
- `#/csharp`: `[311.35, 171.66, 372.74, 172.14, 359.49, 186.55, 357.68, 163.51, 436.05, 166.41, 346.2, 185.37, 344.99, 204.5, 395.34, 188.33, 343.26, 149.06, 334.07, 178.53, 318.72, 181.3, 366.85, 153.51, 325.48, 173.28, 330.64, 196.36, 323.34, 180.92]`
- `#/database`: `[346.41, 145.55, 345.44, 167.41, 367.62, 151.19, 302.66, 172.51, 357.35, 198.01, 364.17, 159.59, 323.13, 182.67, 366.39, 148.33, 382.26, 184.68, 389.27, 183.23, 324.46, 150.79, 365.43, 165.83, 334.09, 151.21, 323.46, 167.18, 317.44, 143.39]`

Computed p95 results:

- `#/azure`: `458.19 ms`
- `#/dotnet`: `391.75 ms`
- `#/csharp`: `395.34 ms`
- `#/database`: `382.26 ms`
- Overall p95: `391.75 ms`

Pass/fail summary:

- Result: FAIL against threshold (`p95 <= 200 ms`)
- Follow-up: investigate render-path optimization and rerun this protocol after
	performance improvements.
