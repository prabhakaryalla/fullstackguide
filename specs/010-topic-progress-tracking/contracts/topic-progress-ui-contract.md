# UI Contract: Topic Progress Tracking

Describes the observable behavior of the "Mark as complete" control, the
per-menu progress indicator, the completed-topic visual indicator, and the
scoped reset flow. See [data-model.md](../data-model.md) for the underlying
state model and [research.md](../research.md) for implementation decisions.

## "Mark as complete" control (topic content page)

Rendered on `TopicInfoPage`, near the existing Previous/Next navigation
controls.

1. **Default (not completed) state** — On first visit to a topic never
   marked complete, the control renders in its "not completed" visual state
   with an accessible name such as "Mark as complete" and `aria-pressed="false"`.
2. **Activating the control** — Selecting the control (click, Enter, or
   Space when focused) toggles the topic's state: it now renders "Completed"
   with `aria-pressed="true"` and an accessible name such as "Mark as not
   complete".
3. **Activating again** — Selecting the control a second time reverts it to
   the "not completed" state (#1); the action is fully reversible (FR-002).
4. **Persistence** — Reloading the browser or revisiting the same topic
   later in the same browser shows the same state the user last set
   (FR-003).
5. **Scope** — Marking one topic complete/not-complete MUST NOT change the
   displayed state of any other topic's control.
6. **Keyboard operability** — The control is reachable via Tab and
   activatable via Enter/Space, with its pressed state exposed via
   `aria-pressed` (or an equivalent accessible toggle pattern) for assistive
   technology (FR-010).

## Per-menu progress indicator (menu topic-list page)

Rendered on `MainPage`, alongside the existing topic-count chip.

1. **Some completed** — Shows a completed/total count (for example, "18/60
   completed") reflecting only topics currently present in that menu
   (FR-004).
2. **Zero completed** — Shows the total with zero completed (for example,
   "0/60 completed"), never a blank or error state.
3. **All completed** — Shows the full total as completed (for example,
   "60/60 completed").
4. **Live total** — If the underlying topic list for a menu changes (topics
   added/removed), the displayed total always reflects the current topic
   list, not a value captured at an earlier time.
5. **Per-topic visual distinction** — In the topic list below the progress
   indicator, each completed topic is visually distinguishable (for
   example, a check indicator) from not-yet-completed topics (FR-005).

## Reset progress (menu topic-list page)

1. **Trigger** — A labeled "Reset progress" control is available on the
   menu topic-list page.
2. **Confirmation required** — Activating it opens a confirmation dialog
   naming the current menu and the number of topics that will be affected;
   no progress is changed until the user confirms (FR-007).
3. **Confirm** — Confirming clears completion state for every topic in the
   current menu only; the progress indicator immediately reflects "0/total
   completed" and previously-distinguished completed topics in the list
   return to their not-completed appearance.
4. **Cancel** — Dismissing the dialog without confirming leaves all
   progress unchanged.
5. **Scope** — Resetting one menu's progress MUST NOT change the progress
   indicator or per-topic state of any other menu (FR-006, SC-005).
6. **Keyboard operability** — The reset control and the dialog's
   confirm/cancel actions are reachable via Tab and activatable via
   Enter/Space; the dialog traps focus while open and returns focus to the
   triggering control on close.

## Out of scope

- No account-based sync of completion state across devices/browsers — state
  is local to one browser only (spec Clarifications, Assumptions).
- No automatic/passive completion inference (scroll position, dwell time) —
  completion is only ever set by the explicit toggle control (spec
  Clarifications).
- No quiz/assessment-based verification of understanding — "completed"
  reflects the user's own self-reported study status only (spec
  Assumptions).
- No global "reset everything across all menus" control — reset is scoped
  per menu area only (see [research.md](../research.md) Decision 6).
