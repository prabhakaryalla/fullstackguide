# Quickstart: Main Page Tiles Overview Validation

## Prerequisites

- Node.js 20+ installed.
- Dependencies installed from [frontend/package.json](frontend/package.json): run `npm install` in [frontend](frontend).
- Local dev server starts from [frontend](frontend) using `npm run dev`.

---

## Routes to validate

| URL | Expected behavior |
|-----|-------------------|
| `http://localhost:5173/#/` | Main page loads with one tile per configured menu |
| `http://localhost:5173/#/azure` | Azure topic list page loads when Azure tile is activated |
| `http://localhost:5173/#/csharp` | Empty topic-list state appears for zero-topic menu (if fixture/menu has zero topics) |
| `http://localhost:5173/#/dotnet` | Topic list page for `.NET` opens from root tile activation |

See [specs/006-main-page-tiles-overview/contracts/main-page-tiles-ui-contract.md](specs/006-main-page-tiles-overview/contracts/main-page-tiles-ui-contract.md) for full UI behavior requirements.

---

## Functional validation scenarios

### 1. Root page tile rendering

- Open root URL.
- Verify main page is displayed (not coming-soon placeholder).
- Verify all configured menus are represented by tiles.

### 2. Tile statistics visibility

- Verify each tile displays total, easy, medium, hard, and unknown counts.
- Verify each tile shows dominant complexity insight.
- Verify count consistency:
  - easy + medium + hard + unknown = total.

### 3. Tile navigation behavior

- Click a tile for a menu with topics.
- Verify navigation to matching `/:menuSlug` route.
- Verify topic list page content belongs to selected menu.

### 4. Zero-topic tile behavior

- Activate a tile with zero topics.
- Verify navigation still occurs to selected menu route.
- Verify empty topic-list message is shown.

### 5. Keyboard accessibility behavior

- Use Tab/Shift+Tab to focus tiles.
- Activate focused tile via keyboard.
- Verify route outcome matches pointer activation.

---

## Test commands

Run from [frontend](frontend):

```bash
npm run lint
npm run test:run -- tests/main/MainPage.test.tsx
```

Recommended assertions:
- Root route shows main-page tiles.
- Each tile shows required counts and dominant complexity insight.
- Tile activation routes to correct menu.
- Zero-topic menu tile routes and displays empty state.
- Keyboard and pointer activation parity holds.

### Captured validation evidence (2026-08-30)

- Focused test command executed:
  - `npx vitest run tests/main/MainPage.test.tsx --reporter verbose --pool=forks --maxWorkers=1`
- Result summary:
  - `17/17` tests passed in `tests/main/MainPage.test.tsx`.
- Quality gate commands executed:
  - `npm run lint` (pass)
  - `npm run build` (pass)

SC-001 to SC-003 evidence:

- SC-001 covered by passing test: `renders menu tiles on root route and does not render coming-soon placeholder`.
- SC-002 covered by passing tests: `renders required counts and dominant complexity insight for tiles` and `computes unknown-count and excludes unknown from easy/medium/hard counts`.
- SC-003 covered by passing tests: `navigates to matching menu route when a tile is clicked` and `navigates configured zero-topic tile and shows empty topic state`.

SC-004 and SC-005 evidence (automation proxy):

- SC-004 proxy: route selection and activation tasks completed within single-interaction tests with stable outcomes across root tiles.
- SC-005 proxy: keyboard activation parity test plus visible focus handling assertions demonstrate accessible actionable controls.
- Additional recommendation: conduct moderated user sessions (minimum 20) to collect human timing and usability signal before release sign-off.

---

## Expected outcome

- Users immediately see menu choices when visiting the website.
- Tile statistics help users choose a learning area quickly.
- Activation consistently opens the correct topic list page across pointer and keyboard interactions.
