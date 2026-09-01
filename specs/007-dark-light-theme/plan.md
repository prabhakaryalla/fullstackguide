# Implementation Plan: Dark/Light Theme Toggle

**Branch**: `007-dark-light-theme` | **Date**: 2026-08-30 | **Spec**: `specs/007-dark-light-theme/spec.md`

**Input**: Feature specification from `specs/007-dark-light-theme/spec.md`

## Summary

Replace the top navigation bar's Settings button with a single theme-toggle
button that switches the entire application between Dark and Light MUI
themes. Initial theme for first-time visitors follows the browser/OS
`prefers-color-scheme` setting (falling back to Light), and any explicit user
selection is persisted to `localStorage` so it survives reloads and future
visits.

## Technical Context

**Language/Version**: TypeScript 5.x, React 18.x

**Primary Dependencies**: Material UI (`ThemeProvider`, `createTheme`,
`useMediaQuery`), React Context API, Vitest, React Testing Library, jest-axe

**Storage**: Browser `localStorage` for persisted theme-mode preference; no
server-side persistence

**Testing**: Vitest + React Testing Library (+ jest-axe for accessibility
assertions)

**Target Platform**: Modern desktop and mobile browsers (latest two versions of
Chrome, Edge, Firefox, Safari)

**Project Type**: Frontend web application (static hosting compatible)

**Performance Goals**: Theme switch fully applied (all pages/components
restyled) in <= 1 second after the toggle button is clicked, per SC-001

**Constraints**: HashRouter-only routing, no server rewrites, single shared
top navigation bar (`LandingNavigationBar`) used across all routes, WCAG 2.1
AA keyboard/focus/contrast compliance, no secrets or sensitive data in
persisted preference

**Scale/Scope**: One global theme-mode toggle affecting the entire app shell
(`AppProviders`) and replacing the existing `SettingsAction` control; no
additional theme customization (colors, third theme, etc.)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Principle I (Static Hosting First)**: PASS. Theme mode is resolved and
  applied entirely client-side (React Context + `localStorage`); no server
  rewrites or runtime server logic are introduced.
- **Principle II (React Architecture and Purity)**: PASS. Theme mode is held
  in a single Context provider; rendering derives the active MUI theme
  object from that state without mutating external state during render.
- **Principle III (State Management Discipline)**: PASS. A single new
  cross-cutting Context (`ThemeModeProvider`) is justified because theme mode
  must be readable/writable from the navigation bar while affecting the
  entire app shell — a case where prop drilling would be a clear burden.
- **Principle IV (Feature-First Organization)**: PASS. The toggle component
  replaces `SettingsAction` inside `features/landing/components`; the shared
  theme mode context/hook lives under the existing `theme/` module, keeping
  boundaries intact.
- **Principle V (UI System Consistency)**: PASS. Both Dark and Light themes
  are produced via MUI `createTheme`, reusing existing palette/typography
  tokens from `theme/theme.ts` rather than introducing custom styling.
- **Principle VI (Accessibility Baseline)**: PASS. Toggle button remains
  keyboard operable with a visible focus indicator and an accessible name
  describing the action and target state (FR-009).
- **Principle VII (Quality Gates and Static Analysis)**: PASS by planned
  enforcement through existing lint/type/test gates; no new suppressions
  introduced.
- **Principle VIII (Automated Testing Policy)**: PASS. Feature includes
  Vitest + React Testing Library coverage for toggle behavior, persistence,
  default-detection, and accessibility (jest-axe), replacing/extending the
  existing `SettingsAction.test.tsx`.
- **Principle IX (Security and Configuration Hygiene)**: PASS. Only a
  non-sensitive theme-mode string is persisted, under an explicit versioned
  `localStorage` key with safe parsing/fallback to default on invalid data.
- **Principle X (Performance and Browser Support)**: PASS. Theme switching
  reuses MUI's existing re-render path (no extra unnecessary Effects) and
  targets the same last-two-versions browser support matrix.
- **Principle XI (Governance as Binding Gate)**: PASS. No constitutional
  exceptions are required.

Post-design re-check: PASS. Data model, contract, and quickstart artifacts in
Phase 1 stay within a single Context + persisted-string design with no new
constitutional exceptions.

## Project Structure

### Documentation (this feature)

```text
specs/007-dark-light-theme/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── theme-toggle-ui-contract.md
└── tasks.md              # Created later by /speckit-tasks
```

### Source Code (repository root)

```text
frontend/
├── src/
│   ├── app/
│   │   └── providers/
│   │       └── AppProviders.tsx
│   ├── theme/
│   │   ├── theme.ts
│   │   ├── ThemeModeContext.tsx
│   │   └── useThemeMode.ts
│   └── features/
│       └── landing/
│           └── components/
│               ├── LandingNavigationBar.tsx
│               └── ThemeToggleAction.tsx
└── tests/
    └── landing/
        └── ThemeToggleAction.test.tsx
```

**Structure Decision**: Keep the existing frontend feature-first structure.
Add the theme-mode Context/hook to the existing `theme/` module (shared,
cross-cutting concern per Principle III), replace `SettingsAction` with a new
`ThemeToggleAction` component in `features/landing/components` at the same
call site in `LandingNavigationBar.tsx`, and wrap `AppProviders.tsx` with the
new `ThemeModeProvider` so the whole app shell re-themes consistently.

## Complexity Tracking

No constitution violations. This section is intentionally blank.
