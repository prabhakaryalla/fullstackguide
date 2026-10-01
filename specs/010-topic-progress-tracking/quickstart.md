# Quickstart: Topic Progress Tracking Validation

## Prerequisites

- Node.js 20+ installed.
- Frontend dependencies installed from [frontend/package.json](../../frontend/package.json):
  run `npm install` in [frontend](../../frontend).
- Development server available from [frontend](../../frontend): `npm run dev`.

See [contracts/topic-progress-ui-contract.md](contracts/topic-progress-ui-contract.md)
for the full behavioral contract and [data-model.md](data-model.md) for the
underlying state model referenced below.

---

## Routes to validate

| URL | Expected behavior |
|-----|--------------------|
| `http://localhost:5173/#/azure/azure-event-hubs` | Topic page shows a "Mark as complete" control near the Previous/Next controls, starting in the not-completed state (unless already toggled previously in this browser) |
| `http://localhost:5173/#/azure` | Menu topic-list page shows a completed/total progress indicator and a "Reset progress" control, alongside the existing topic-count chip |

---

## Functional validation scenarios

### 1. Marking a topic complete persists

- Open `http://localhost:5173/#/azure/azure-event-hubs`.
- Activate the "Mark as complete" control; verify it switches to the
  "Completed" state immediately.
- Reload the browser at the same URL; verify the control still shows
  "Completed" (FR-003).

### 2. Marking complete is reversible and scoped to one topic

- With `azure-event-hubs` marked complete, open a different topic in the
  same menu (for example, `#/azure/azure-service-bus`); verify its control
  starts in the not-completed state (FR-002's toggle does not leak across
  topics).
- Return to `azure-event-hubs` and activate the control again; verify it
  reverts to not-completed.

### 3. Menu progress indicator reflects completions

- Mark 3 topics complete within the `azure` menu.
- Open `http://localhost:5173/#/azure`; verify the progress indicator shows
  `3/<total>` and that exactly those 3 topics are visually distinguished in
  the list (FR-004, FR-005).

### 4. Zero and full completion states

- On a menu with zero completions, verify the indicator shows `0/<total>`,
  not blank or an error (Edge Cases).
- (Optional, slower) Mark every topic in a small menu complete and verify
  the indicator shows `<total>/<total>`.

### 5. Scoped reset requires confirmation and does not affect other menus

- With completions tracked in both `azure` and `csharp` menus, open
  `#/azure` and activate "Reset progress".
- Verify a confirmation dialog appears naming the `azure` menu; dismiss it
  (cancel) and verify progress is unchanged.
- Activate "Reset progress" again and confirm; verify the `azure` progress
  indicator now shows `0/<total>` and its previously-completed topics no
  longer show the completed indicator.
- Open `#/csharp`; verify its progress indicator and completed topics are
  unaffected by the `azure` reset (FR-006, SC-005).

### 6. Stale slug handling (manual sanity check, not a full regression)

- This scenario is primarily covered by automated tests (renamed/removed
  topic slug), since it requires editing topic data; manual validation is
  optional.

### 7. Keyboard operability

- Tab to the "Mark as complete" control from the topic content area; verify
  Enter/Space toggles it and its pressed state is announced (`aria-pressed`).
- On a menu topic-list page, Tab to "Reset progress"; verify Enter/Space
  opens the confirmation dialog, and Tab/Enter can reach and activate both
  Cancel and Confirm inside it.

---

## Automated test entry points

- `frontend/tests/progress/TopicProgressContext.test.tsx` (new)
- [frontend/tests/main/TopicInfoPage.test.tsx](../../frontend/tests/main/TopicInfoPage.test.tsx) (extended: mark-complete toggle)
- [frontend/tests/main/MainPage.test.tsx](../../frontend/tests/main/MainPage.test.tsx) (extended: progress chip, reset confirm flow)

Run the full suite with `npm run test -- --run` from [frontend](../../frontend).
