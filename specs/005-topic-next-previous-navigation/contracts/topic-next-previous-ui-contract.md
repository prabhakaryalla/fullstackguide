# UI Contract: Topic Info Next/Previous Navigation

## Purpose

Define externally observable behavior for Previous and Next controls on the
Topic Info page.

---

## 1. Control visibility and placement contract

| Area | Requirement |
|------|-------------|
| Topic Info page | Previous and Next controls are shown in the page navigation area when a valid topic is loaded |
| Labeling | Controls use clear user-facing labels: `Previous` and `Next` |
| Style clarity | Interactive and non-interactive states are visually distinguishable |

Rules:
- Controls are part of topic navigation and remain associated with topic content.
- Control presentation must remain consistent across all menu categories.
- Disabled controls remain visible but are non-actionable and visually distinct
  from enabled controls (for example, reduced emphasis plus disabled semantics).

---

## 2. Navigation behavior contract

| Current position | Previous action | Next action |
|------------------|-----------------|-------------|
| First topic | Disabled (no route change) | Navigates to second topic |
| Middle topic | Navigates to immediate prior topic | Navigates to immediate next topic |
| Last topic | Navigates to immediate prior topic | Disabled (no route change) |
| Only topic | Disabled (no route change) | Disabled (no route change) |

Rules:
- Navigation follows the active menu category's defined topic sequence.
- Each action moves by exactly one adjacent topic.
- Navigation never jumps across categories.

---

## 3. Category scoping contract

- Given route `/:menuSlug/:topicSlug`, Previous/Next actions must retain the
  same `menuSlug`.
- The resolved destination slug must belong to the topic set for that same
  `menuSlug`.

---

## 4. Unavailable content and error-state contract

- If topic content is unavailable, the page shows unavailable messaging.
- In unavailable state, Previous/Next controls must not trigger navigation.
- Error/unavailable rendering must not change category route unexpectedly.
- If controls are rendered in unavailable state, both controls are disabled.

---

## 5. Accessibility contract

- Previous and Next controls are keyboard reachable in logical tab order.
- Disabled controls are exposed as non-actionable and cannot be activated.
- Focus visibility remains clear for keyboard users on actionable controls.

---

## 6. Out-of-scope contract

- No cross-category next/previous progression.
- No wrap-around behavior from last to first (or first to last).
- No personalization of navigation order by user profile.