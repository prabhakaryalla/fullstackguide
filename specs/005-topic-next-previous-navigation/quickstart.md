# Quickstart: Topic Next/Previous Navigation Validation

## Prerequisites

- Node.js 20+ installed.
- Frontend dependencies installed from [frontend/package.json](frontend/package.json): run `npm install` in [frontend](frontend).
- Local development server running from [frontend](frontend): `npm run dev`.
- Topic datasets include at least one menu with 3+ topics for first/middle/last validation.

---

## Routes to validate

See [specs/005-topic-next-previous-navigation/contracts/topic-next-previous-ui-contract.md](specs/005-topic-next-previous-navigation/contracts/topic-next-previous-ui-contract.md) for full UI behavior rules.

| URL | Expected behavior |
|-----|-------------------|
| `http://localhost:5173/#/azure/azure-event-hubs` | Topic Info page shows Back, Previous, and Next controls (state depends on sequence position) |
| `http://localhost:5173/#/azure/azure-service-bus` | Middle-topic navigation allows both Previous and Next |
| `http://localhost:5173/#/dotnet/dotnet-common-cryptography-methods` | Last-topic navigation disables Next |

---

## Functional validation scenarios

### 1. Controls are visible on valid topic pages

- Open a valid topic route in a menu with multiple topics.
- Verify Previous and Next controls are visible with clear labels.

### 2. Next navigation to adjacent topic

- From a non-last topic, select `Next`.
- Verify route updates to the immediate next topic slug in the same menu.
- Verify displayed content matches the next topic.

### 3. Previous navigation to adjacent topic

- From a non-first topic, select `Previous`.
- Verify route updates to the immediate previous topic slug in the same menu.
- Verify displayed content matches the previous topic.

### 4. Boundary control behavior

- Navigate to first topic in a menu; verify `Previous` is disabled.
- Navigate to last topic in a menu; verify `Next` is disabled.
- For a single-topic menu, verify both controls are disabled.

### 4a. Navigation checkpoint matrix

Use this matrix to validate each boundary state explicitly:

| Position | Example route | Previous | Next |
|----------|---------------|----------|------|
| First | `#/azure/azure-event-hubs` | Disabled | Enabled |
| Middle | `#/azure/azure-service-bus` | Enabled | Enabled |
| Last | `#/dotnet/dotnet-common-cryptography-methods` | Enabled | Disabled |
| Only | Route using a test fixture menu with one topic | Disabled | Disabled |

### 5. Category boundary enforcement

- While using Previous/Next, verify `menuSlug` segment stays unchanged.
- Verify navigation never routes to a topic in another category.

### 6. Keyboard accessibility

- Use `Tab`/`Shift+Tab` to focus controls.
- Activate enabled controls with keyboard.
- Verify disabled controls are not actionable.

---

## Test commands

Run automated checks from [frontend](frontend):

```bash
npm run lint
npm run test:run
```

Recommended assertions:

- Previous/Next controls render on valid Topic Info pages.
- Next and Previous actions move exactly one topic within the same category.
- Boundary controls are disabled at first/last/only topic positions.
- Keyboard activation works for enabled controls and is blocked for disabled controls.

---

## SC-004 and SC-005 validation protocol

Use the following protocol to validate usability and accessibility outcomes.

### SC-004 protocol (adjacent-topic navigation speed)

- Participant profile: users familiar with browsing technical topic content.
- Sample size: minimum 20 participants.
- Task prompt: "Open a topic and move to the next related topic using page navigation controls."
- Timing method: start timer when prompt is shown; stop when user reaches the correct adjacent topic.
- Pass criterion: at least 18 of 20 participants complete within 10 seconds.

### SC-005 protocol (control state clarity)

- Evaluation method: moderated usability observation on first, middle, last, and only-topic states.
- Sample size: minimum 20 evaluated sessions.
- Checkpoints per session:
	- user correctly identifies which control is actionable,
	- user correctly identifies which control is disabled,
	- keyboard focus indicator remains visible on actionable controls.
- Pass criterion: at least 19 of 20 sessions correctly identify actionable vs disabled states.

Record evidence:

- Participant/session count.
- Per-attempt completion times for SC-004.
- Session-level pass/fail for SC-005 checkpoints.
- Final pass/fail summary against both thresholds.

Evidence template:

- SC-004 completion timings (20 runs): `[t1, t2, ..., t20]`
- SC-004 pass/fail result: `X/20 within 10 seconds`
- SC-005 checkpoint pass/fail (20 sessions):
	- actionable control identified: `X/20`
	- disabled control identified: `X/20`
	- visible focus present: `X/20`
- SC-005 pass/fail result: `X/20 sessions fully passing`

### Captured evidence (2026-08-30)

- Evidence method: automated proxy acceptance using focused Topic Info navigation
	tests in `frontend/tests/main/TopicInfoPage.test.tsx`.
- Command executed: `npm run test:run -- tests/main/TopicInfoPage.test.tsx`
- Result summary: `13/13` tests passed.

SC-001 to SC-003 evidence:

- SC-001 covered by passing test: `navigates to the next adjacent topic in same menu`.
- SC-002 covered by passing test: `navigates to the previous adjacent topic in same menu`.
- SC-003 covered by passing tests: `disables Previous on first topic` and
	`disables Next on last topic`.

SC-004 and SC-005 evidence (automation proxy):

- SC-004 proxy: keyboard and click-based adjacent navigation completed in
	sub-second test interactions during automated runs (all relevant navigation
	tests passing).
- SC-005 proxy: passing assertions verify visible disabled states and keyboard
	activation behavior for actionable controls.
- Additional recommendation: run moderated manual sessions using the protocol
	above to collect human-user evidence before formal release sign-off.

---

## Expected outcome

- Users can move through related topics quickly without returning to topic list.
- Topic navigation remains predictable, category-scoped, and boundary-safe.
- Control states are understandable and accessible.