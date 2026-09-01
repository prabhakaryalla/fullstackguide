# Quickstart: Dark/Light Theme Toggle Validation

## Prerequisites

- Node.js 20+ installed.
- Dependencies installed from [frontend/package.json](frontend/package.json): run `npm install` in [frontend](frontend).
- Local dev server starts from [frontend](frontend) using `npm run dev`.

See [specs/007-dark-light-theme/contracts/theme-toggle-ui-contract.md](specs/007-dark-light-theme/contracts/theme-toggle-ui-contract.md) for full UI behavior requirements and [specs/007-dark-light-theme/data-model.md](specs/007-dark-light-theme/data-model.md) for the underlying preference model.

---

## Routes to validate

| URL | Expected behavior |
|-----|-------------------|
| `http://localhost:5173/#/` | Theme toggle button appears in place of the Settings button in the top navigation bar |
| `http://localhost:5173/#/<any-menu>` | Toggling theme on this route restyles the whole page and persists when navigating elsewhere |

---

## Functional validation scenarios

### 1. Control replacement

- Load the app and inspect the top navigation bar.
- Verify no Settings icon button is present.
- Verify a single theme toggle button occupies that position.

### 2. Light → Dark toggle

- With the app in Light theme, click the toggle button.
- Verify the entire page (background, text, components) switches to Dark
  theme.
- Verify the button's icon/accessible name now indicates it will switch back
  to Light.

### 3. Dark → Light toggle

- With the app in Dark theme, click the toggle button.
- Verify the entire page switches back to Light theme.
- Verify the button's icon/accessible name now indicates it will switch to
  Dark.

### 4. Persistence across reload

- Toggle to Dark theme, then reload the page.
- Verify the app loads directly in Dark theme (no flash of the opposite
  theme's persisted state being lost).
- Repeat toggling to Light and reloading; verify Light persists.

### 5. First-time visitor default (system preference)

- Clear site data / `localStorage` for the app.
- Set the OS/browser to prefer dark color scheme, then load the app.
- Verify the app defaults to Dark theme.
- Repeat with the OS/browser set to prefer light (or unset); verify the app
  defaults to Light theme.

### 6. Cross-page consistency

- Toggle the theme on one route, then navigate to another in-scope route.
- Verify the newly loaded route reflects the same theme mode without any
  unstyled or mismatched sections.

### 7. Keyboard accessibility

- Use `Tab` to focus the theme toggle button.
- Activate it with `Enter` and then `Space`.
- Verify both keys toggle the theme identically to a pointer click, and the
  focus indicator remains visible throughout.

---

## Test commands

Run the theme toggle test suite:

```powershell
npm run test -- --run tests/landing/ThemeToggleAction.test.tsx
```

Run the full frontend test suite:

```powershell
npm run test -- --run
```

---

## Validation Evidence (captured 2026-08-30)

### Automated scenario coverage (T017)

| Scenario | Automated coverage | Result |
|----------|--------------------|--------|
| 1. Control replacement | `tests/landing/LandingNavigationBar.test.tsx` — "renders the theme toggle button in place of the settings button" | ✅ Pass |
| 2. Light → Dark toggle | `tests/landing/ThemeToggleAction.test.tsx` — "toggles to dark theme on click..." | ✅ Pass |
| 3. Dark → Light toggle | `tests/landing/ThemeToggleAction.test.tsx` — "toggles back to light theme on a second click" | ✅ Pass |
| 4. Persistence across reload | `tests/theme/ThemeModeContext.test.tsx` — "persists the mode to localStorage after toggling" / "reads a valid persisted preference..." | ✅ Pass |
| 5. First-time visitor default (system preference) | `tests/theme/ThemeModeContext.test.tsx` — "defaults to dark/light mode when the OS/browser prefers..." / "defaults to light mode when matchMedia is unsupported" | ✅ Pass |
| 6. Cross-page consistency | `tests/main/NavigationPersistenceFlow.test.tsx` — "keeps the toggled theme mode applied after navigating to a different route" | ✅ Pass |
| 7. Keyboard accessibility | `tests/landing/ThemeToggleAction.test.tsx` — "toggles the theme when activated via keyboard Enter/Space"; `LandingNavigationBar.test.tsx` — "supports keyboard tab reachability..." | ✅ Pass |

### Success Criteria evidence (T020)

- **SC-001** (theme switch reflected in <1s): Toggle handler is a synchronous `setState` + `localStorage.setItem` call with no network/async work; automated tests observe the new theme state immediately after `user.click()`/`user.keyboard()` resolves (well under 1s). No dedicated timing test was added since the mechanism is inherently synchronous.
- **SC-002** (100% of pages reflect selected theme): `ThemeModeProvider` wraps the entire app shell in `AppProviders.tsx`, and `NavigationPersistenceFlow.test.tsx`'s cross-page test confirms the toggled mode's label remains correct after navigating from `/` to `/azure`.
- **SC-003** (persisted across visits): Verified via `ThemeModeContext.test.tsx`'s persistence and invalid-value-fallback tests, using the real `window.localStorage` in jsdom.
- **SC-004** (keyboard parity): Verified via `ThemeToggleAction.test.tsx`'s Enter/Space activation tests and `LandingNavigationBar.test.tsx`'s tab-reachability/focus-visible test.

### Quality gates (T019)

- `npm run lint` — 0 errors/warnings.
- `npm run build` (`tsc -b && vite build`) — 0 type errors, build succeeded.
- `npm run test:run` — 13 test files, 100 tests, all passing (includes 7 new `ThemeModeContext` tests, 8 new `ThemeToggleAction` tests, and updated `LandingNavigationBar`/`NavigationPersistenceFlow`/`AppShellNavigationVisibility` suites).

