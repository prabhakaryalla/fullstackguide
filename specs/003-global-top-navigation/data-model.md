# Data Model: Global Top Navigation Visibility

## Entity: TopNavigation

| Field | Type | Description |
|-------|------|-------------|
| `title` | `string` | Display title shown in the top bar |
| `menuItems` | `NavigationMenuItem[]` | Ordered list of first-level menu entries |
| `settingsActionVisible` | `boolean` | Indicates settings affordance is rendered |
| `selectedMenuId` | `string \| null` | Active menu based on current route context |
| `isViewportFixed` | `boolean` | Indicates navigation remains anchored while page scrolls |

**Validation rules**:
- `title` is required and non-empty.
- `menuItems` must be present and sorted by configured order.
- `selectedMenuId` must match a known `menuItems.id` when route maps to a menu;
  otherwise it is `null`.
- `settingsActionVisible` is always `true` for in-scope pages.
- `isViewportFixed` is always `true` for in-scope pages.

---

## Entity: NavigationMenuItem

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Stable menu identifier used in route segments |
| `label` | `string` | User-facing menu text |
| `order` | `number` | Display order in top navigation |

**Validation rules**:
- `id` is required, unique, and route-safe.
- `label` is required and non-empty.
- `order` is required and unique for deterministic rendering order.

---

## Entity: NavigationVisibilityState

| Field | Type | Description |
|-------|------|-------------|
| `routePath` | `string` | Current route path from the router |
| `isTopNavigationVisible` | `boolean` | Whether top navigation is currently rendered |
| `isTopNavigationFixed` | `boolean` | Whether top navigation remains fixed in viewport while scrolling |
| `contentState` | `'ready' \| 'empty' \| 'unavailable'` | Current state of page body content |

**Visibility rules**:
- `isTopNavigationVisible` MUST be `true` for Landing (`/`), Main
  (`/:menuSlug`), Topic Info (`/:menuSlug/:topicSlug`), and fallback routes.
- `isTopNavigationVisible` remains `true` regardless of `contentState`.
- `isTopNavigationFixed` MUST be `true` for all in-scope routes and scroll
   positions.

**State transitions**:
1. **Initial load**: route resolves, app shell mounts, top navigation visible.
2. **Route transition**: page content changes by route, top navigation remains
   visible.
3. **Direct refresh/deep link**: app resolves route and renders top navigation
   in initial paint path.
4. **Content unavailable/empty**: page body renders fallback message while top
   navigation remains visible.

---

## Entity: InScopePage

| Field | Type | Description |
|-------|------|-------------|
| `name` | `'Landing' \| 'Main' \| 'TopicInfo' \| 'Fallback'` | Page classification for visibility rules |
| `routePattern` | `string` | Route pattern associated with page |

**Route mapping**:
- `Landing` -> `/`
- `Main` -> `/:menuSlug`
- `TopicInfo` -> `/:menuSlug/:topicSlug`
- `Fallback` -> `*`
