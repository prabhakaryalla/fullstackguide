# Quickstart: Top Navigation Refactoring Validation

## Prerequisites

- Node.js 20+ installed.
- Frontend dependencies installed from [frontend/package.json](../../frontend/package.json):
  run `npm install` in [frontend](../../frontend).
- Development server available from [frontend](../../frontend): `npm run dev`.

See [contracts/top-navigation-ui-contract.md](contracts/top-navigation-ui-contract.md)
for the full behavioral contract and [data-model.md](data-model.md) for the
grouped-menu structure referenced below.

---

## Routes to validate

| URL | Expected behavior |
|-----|--------------------|
| `http://localhost:5173/#/` | Top navigation shows 7 items: Backend, Frontend, Cloud, Database, AI, Design Patterns, System Design |
| `http://localhost:5173/#/csharp` | Reached via Backend → C#; Backend shows active indicator, submenu closed on load |
| `http://localhost:5173/#/cosmos/azure-cosmos-db` | Reached via Database → Cosmos; Database shows active indicator |
| `http://localhost:5173/#/sql` | Reached via Database → SQL; shows existing "No topics available" empty state |
| `http://localhost:5173/#/angular` | Reached via Frontend → Angular; shows existing "No topics available" empty state |
| `http://localhost:5173/#/azure` | Reached directly via "Cloud" (no submenu) |

---

## Functional validation scenarios

### 1. Top-level rendering

- Open `http://localhost:5173/#/`.
- Verify exactly 7 top-level items render, in order: Backend, Frontend,
  Cloud, Database, AI, Design Patterns, System Design.
- Verify Backend, Frontend, and Database show an expand/collapse indicator;
  the other four do not.

### 2. Hover reveal (desktop/pointer)

- Hover over "Backend". Verify submenu items C#, .NET, Microservices appear
  in that order.
- Move the pointer away without selecting an item. Verify the submenu closes
  and the route does not change.
- Repeat for "Frontend" (React JS, Angular) and "Database" (SQL, Cosmos).

### 3. Parent item is not directly navigable

- Click directly on the "Backend" label (not a submenu item).
- Verify no navigation occurs and the submenu toggles open/closed instead.

### 4. Submenu item selection

- Hover "Backend", then select "C#".
- Verify the route changes to `#/csharp` and the submenu closes.
- Verify "Backend" now shows the active/selected indicator.

### 5. Touch tap-toggle

- Simulate a touch tap (click without hover) on "Database".
- Verify its submenu opens (SQL, Cosmos visible).
- Tap "Database" again. Verify the submenu closes without navigating.

### 6. Keyboard interaction

- Tab to "Frontend". Verify its submenu opens on focus.
- Press ArrowDown/ArrowUp to move between "React JS" and "Angular".
- Press Escape. Verify the submenu closes and focus returns to "Frontend".
- Tab to "Frontend" again, arrow to "Angular", press Enter. Verify navigation
  to `#/angular` and that it renders the existing empty-topics state.

### 7. Deep link / refresh behavior

- Refresh the browser directly on `#/csharp`.
- Verify "Backend" shows the active indicator and its submenu is closed
  (not auto-expanded).

### 8. Content reachability regression check

- Confirm every previously reachable topic (.NET, Azure/Cloud content, C#,
  the Azure Cosmos DB topic now under Cosmos, React JS, AI, System Design,
  Microservices) is still reachable through the reorganized top navigation.

---

## Automated test entry points

- [frontend/tests/landing/TopMenuItems.test.tsx](../../frontend/tests/landing/TopMenuItems.test.tsx)
- [frontend/tests/landing/LandingNavigationBar.test.tsx](../../frontend/tests/landing/LandingNavigationBar.test.tsx)
- [frontend/tests/main/NavigationPersistenceFlow.test.tsx](../../frontend/tests/main/NavigationPersistenceFlow.test.tsx)

Run the full suite with `npm run test:run` from [frontend](../../frontend).
