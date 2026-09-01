# UI Contract: Top Navigation Menu & Submenu Items

Describes the observable behavior of the top navigation bar after this
feature, for use by tests and manual validation. See
[data-model.md](../data-model.md) for the underlying entities and
[research.md](../research.md) for implementation decisions.

## Rendered structure

The top navigation bar (`role="navigation"` / `aria-label="Topic navigation"`)
renders exactly 7 top-level controls, in this order:

| # | Label | Has submenu | Submenu items (in order) |
|---|-------|-------------|---------------------------|
| 1 | Backend | Yes | C#, .NET, Microservices |
| 2 | Frontend | Yes | React JS, Angular |
| 3 | Cloud | No | — |
| 4 | Database | Yes | SQL, Cosmos |
| 5 | AI | No | — |
| 6 | Design Patterns | No | — |
| 7 | System Design | No | — |

> Note: FR-005 fixes the Database submenu order as SQL, then Cosmos.

## Behavioral contract

1. **Standalone item selection** — Clicking/tapping/activating (Enter/Space)
   "Cloud", "AI", "Design Patterns", or "System Design" navigates directly to
   that item's content page, unchanged from current single-level behavior.
2. **Parent item is not independently navigable** — Clicking, tapping, or
   pressing Enter/Space directly on "Backend", "Frontend", or "Database"
   MUST NOT navigate anywhere; it only opens/closes that item's submenu.
3. **Hover reveal (pointer devices)** — Moving the pointer onto "Backend",
   "Frontend", or "Database" MUST display its submenu items. Moving the
   pointer off both the parent item and its submenu MUST hide the submenu.
4. **Tap toggle (touch devices)** — Tapping a parent item with a closed
   submenu opens it; tapping the same parent item again, or tapping outside
   the navigation bar, closes it.
5. **Keyboard reveal and navigation** — Moving keyboard focus to a parent
   item reveals its submenu. Arrow keys move focus between the submenu's
   items. Escape closes the submenu and returns focus to the parent item.
   Enter/Space on a focused submenu item navigates to its content.
6. **Single open submenu** — At most one parent item's submenu is open at any
   time; opening a different parent item's submenu closes any previously open
   one.
7. **Selecting a submenu item** — Choosing any submenu item (C#, .NET,
   Microservices, React JS, Angular, SQL, Cosmos) navigates to that item's
   content and closes the open submenu.
8. **Active indicator on load / deep link** — When the current page belongs
   to a submenu item, the corresponding parent item (not the submenu itself)
   shows the same active/selected visual indication used for standalone
   items today. The submenu itself stays closed until the user interacts
   with the parent (hover, tap, or focus).
9. **Content reachability** — Every leaf item reachable from top navigation
   before this feature (`.NET`, `Azure`/Cloud, `C#`, `Database`/Cosmos,
   `React JS`, `AI`, `System Design`, `Microservices`) remains reachable
   after reorganization; "SQL" is a new leaf item that renders the existing
   "No topics available" empty state until content is added.
10. **Visual affordance** — Parent items with submenus (Backend, Frontend,
    Database) display a distinct visual indicator (for example, an
    expand/collapse chevron) that standalone items do not have.

## Out of scope

- "DSA" is not part of this contract (deferred per Clarifications /
  Assumptions).
- No new content pages are created for "SQL"; it reuses the existing
  empty-topics presentation.
