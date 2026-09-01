# Research: Dark/Light Theme Toggle

No `NEEDS CLARIFICATION` items remain in the Technical Context (both open
questions were resolved during `/speckit-clarify`). This document records the
technical decisions needed to implement the feature.

## 1. State management for theme mode

- **Decision**: Introduce a single React Context (`ThemeModeContext`) plus a
  `useThemeMode()` hook exposing `{ mode, toggleMode }`, provided once at the
  app shell level (`AppProviders.tsx`).
- **Rationale**: Theme mode is a cross-cutting concern read by the theme
  provider and written by a single navigation-bar control — exactly the case
  Principle III allows Context for. A single boolean/string of state does not
  justify a state library (Redux/Zustand).
- **Alternatives considered**:
  - Prop drilling `mode`/`setMode` through the router and page tree — rejected,
    would require every page to forward a prop it doesn't otherwise need.
  - Redux/Zustand store — rejected, adds a dependency and boilerplate for a
    single piece of state with one writer.

## 2. Producing Dark and Light MUI themes

- **Decision**: Extend `theme/theme.ts` to export a `getAppTheme(mode)`
  factory (or two `createTheme` calls sharing common tokens) that sets MUI's
  `palette.mode` to `'light'` or `'dark'` while reusing existing
  primary/secondary colors and typography.
- **Rationale**: Keeps a single source of truth for design tokens (Principle
  V) and lets MUI's `palette.mode` drive built-in component color adaptation
  (e.g., `CssBaseline`, surfaces) rather than hand-rolling dark styles.
- **Alternatives considered**:
  - Two fully independent, hand-authored theme objects — rejected, duplicates
    tokens and risks drift between Dark and Light.
  - CSS-only `prefers-color-scheme` media queries with no JS toggle — rejected,
    cannot satisfy the explicit user-toggle requirement (FR-004/FR-005).

## 3. Detecting first-time visitor default

- **Decision**: On first load with no persisted preference, read
  `window.matchMedia('(prefers-color-scheme: dark)').matches`; if `true`, use
  Dark, otherwise use Light (including when `matchMedia` is unsupported).
- **Rationale**: Matches the clarified requirement (detect OS/browser
  preference, fall back to Light) and is the standard browser API for this
  purpose.
- **Alternatives considered**:
  - Always default to Light — rejected per clarification answer.
  - Server-side detection via headers — rejected, app is a static SPA with no
    server-side rendering (Principle I).

## 4. Persistence mechanism

- **Decision**: Persist the user's explicit theme selection in `localStorage`
  under a single explicit, versioned key (e.g., `fullstack-guide.theme-mode.v1`)
  storing the literal string `'light'` or `'dark'`, read back through a
  safe-parse helper that falls back to system/default detection on missing or
  invalid values.
- **Rationale**: Satisfies Principle IX's explicit key/version + safe parsing
  requirement and FR-007 (persist across reloads/future visits) without
  introducing a backend dependency (Principle I).
- **Alternatives considered**:
  - `sessionStorage` — rejected, does not persist across future visits/new
    tabs as required by FR-007/SC-003.
  - Cookies — rejected, unnecessary since no server reads this value.

## 5. Replacing the Settings control

- **Decision**: Replace `SettingsAction.tsx` with `ThemeToggleAction.tsx` at
  the same call site in `LandingNavigationBar.tsx`, reusing the existing
  `IconButton` + focus-visible styling pattern, swapping
  `DarkModeIcon`/`LightModeIcon` (`@mui/icons-material`) based on current
  mode, with an `aria-label` naming the action and the theme it switches to.
- **Rationale**: Minimizes UI/structural churn, keeps a single button element
  per the clarified toggle-structure decision, and preserves existing
  accessibility/focus behavior (Principle VI).
- **Alternatives considered**:
  - Two separate button elements conditionally rendered — rejected per
    clarification answer.
  - Placing the toggle elsewhere in the layout — rejected, business rule
    explicitly requires replacing the Settings button in place.
