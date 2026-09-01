# Data Model: Top Navigation Refactoring (Menu & Submenu Items)

## Entity: NavigationMenuItem *(existing, unchanged contract)*

Defined in `frontend/src/features/landing/model/types.ts`. Represents a
navigable leaf topic area; consumed unchanged by `features/main`
(`MainPage`, `TopicInfoPage`, `MainMenuTilesPage`) and by the new grouped
navigation view.

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Stable identifier used as the route segment (`/:menuSlug`) |
| `label` | `string` | User-facing text (page title, tile label, submenu text) |
| `order` | `number` | Display order among sibling leaf items |

**Validation rules** (unchanged):
- `id` is required, unique across all leaf items, and route-safe.
- `label` is required and non-empty.
- `order` is required; unique among items sharing the same parent context.

**Data changes for this feature** (values only, shape unchanged):
- `database` → renamed to `id: "cosmos"`, `label: "Cosmos"`.
- `azure` → `label` changes to `"Cloud"` (`id` unchanged).
- New leaf added: `id: "sql"`, `label: "SQL"` (no topic content yet; resolves
  to the existing empty-topics state, same as `angular`/`design-patterns`).

---

## Entity: TopNavigationGroup *(new)*

Defined in `frontend/src/features/landing/model/types.ts`, sourced from a new
`navigationGroups.json`. Represents one top-level entry in the top navigation
bar.

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Stable identifier for the group. For a standalone group (no submenu), MUST equal an existing `NavigationMenuItem.id`. For a parent group (has submenu), is a new id not shared with any `NavigationMenuItem` |
| `label` | `string` | Text shown in the top navigation bar |
| `order` | `number` | Display order among top-level groups |
| `childIds` | `string[]` (optional) | Ordered list of `NavigationMenuItem.id` values belonging to this group's submenu. Omitted or empty for a standalone group |

**Validation rules**:
- `id` is required and unique among groups.
- `label` is required and non-empty.
- `order` is required and unique for deterministic rendering.
- When `childIds` is present and non-empty, this group is a **parent group**:
  it MUST NOT be independently navigable (FR-009), and every value in
  `childIds` MUST match an existing `NavigationMenuItem.id`.
- When `childIds` is absent or empty, this group is a **standalone group**:
  its `id` MUST match an existing `NavigationMenuItem.id`, and selecting it
  navigates directly to that item's content (unchanged current behavior).
- No `NavigationMenuItem.id` may appear in more than one group's `childIds`.

**Feature configuration** (see [research.md](research.md) Decisions 2–4):

| Group id | Label | Type | Children (id → label) |
|----------|-------|------|------------------------|
| `backend` | Backend | Parent | `csharp` → C#, `dotnet` → .NET, `microservices` → Microservices |
| `frontend` | Frontend | Parent | `react-js` → React JS, `angular` → Angular |
| `azure` | Cloud | Standalone | — |
| `database` | Database | Parent | `cosmos` → Cosmos, `sql` → SQL |
| `ai` | AI | Standalone | — |
| `design-patterns` | Design Patterns | Standalone | — |
| `system-design` | System Design | Standalone | — |

---

## Entity: TopNavigationGroupView *(derived, render-only)*

Produced by `getTopNavigationTree()`, joining `TopNavigationGroup` with the
flat `NavigationMenuItem[]` list. Not persisted; recomputed via `useMemo`.

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Same as source `TopNavigationGroup.id` |
| `label` | `string` | Same as source `TopNavigationGroup.label` |
| `order` | `number` | Same as source `TopNavigationGroup.order` |
| `children` | `NavigationMenuItem[]` | Resolved child items (empty array for standalone groups), sorted by their own `order` |

**Derivation rule**: `children` is built by mapping each `childIds` entry to
its matching `NavigationMenuItem` from the flat list; a `childIds` value with
no matching leaf item is dropped (defensive, should not occur if config is
valid).

---

## Entity: SubmenuInteractionState *(new, local component state)*

Local state owned by the top navigation bar component (not persisted, not in
Context, per Constitution Principle III).

| Field | Type | Description |
|-------|------|-------------|
| `openGroupId` | `string \| null` | Id of the parent group whose submenu is currently open; `null` when no submenu is open |

**State transitions**:
1. **Hover start** (pointer devices): entering a parent group's trigger or its
   open submenu sets `openGroupId` to that group's id.
2. **Hover end**: leaving both the trigger and the submenu sets `openGroupId`
   to `null`.
3. **Tap/click toggle** (touch/no-hover): clicking a parent group's trigger
   sets `openGroupId` to that group's id if it was closed, or `null` if it was
   already open for that group.
4. **Focus** (keyboard): focusing a parent group's trigger sets `openGroupId`
   to that group's id.
5. **Escape**: while a submenu is open, pressing Escape sets `openGroupId` to
   `null` and returns focus to the trigger.
6. **Select submenu item**: choosing a `NavigationMenuItem` inside an open
   submenu navigates to its route and sets `openGroupId` to `null`.
7. **Switch groups**: hovering/tapping/focusing a different parent group sets
   `openGroupId` directly to the new group's id (previous submenu implicitly
   closes — only one `openGroupId` can be set at a time).
8. **Page load / route change**: `openGroupId` initializes to `null`
   regardless of the current route (submenu stays closed on load per the
   Clarifications "deep-link / page-load behavior" answer); only the active
   group's visual indicator (see below) reflects the current route.

---

## Derived value: Active top navigation group

Computed each render from `location.pathname` and the grouped tree (pure
function, not stored state):

- Resolve the current leaf id from the route (existing
  `resolveSelectedMenuId` logic, applied to the flat `NavigationMenuItem[]`).
- Look up which `TopNavigationGroup` owns that leaf id: the group itself if
  standalone, or the parent group whose `childIds` contains it.
- The resolved group id is passed to the top navigation bar as the
  active/selected group, used purely for visual indication (FR-013); it does
  **not** affect `SubmenuInteractionState.openGroupId`. Computed by the new
  `resolveActiveTopNavigationGroupId` function (see [research.md](research.md)
  Decision 7), kept separate from the unchanged `resolveSelectedMenuId`.
