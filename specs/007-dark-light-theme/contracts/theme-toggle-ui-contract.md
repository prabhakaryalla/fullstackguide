# UI Contract: Dark/Light Theme Toggle

## Purpose

Define the externally observable behavior for replacing the Settings button
with a single Dark/Light theme-toggle control, and for how the resulting
theme mode is applied and persisted across the application.

---

## 1. Control replacement contract

| Location | Before | After |
|----------|--------|-------|
| Top navigation bar, trailing action slot (`LandingNavigationBar`) | Settings icon button (`SettingsAction`) | Theme toggle icon button (`ThemeToggleAction`) |

Rules:
- The Settings button MUST NOT be present anywhere in the application after
  this feature ships.
- The theme toggle button MUST occupy the exact same position previously
  occupied by the Settings button, on every in-scope route (all routes share
  `LandingNavigationBar` via `AppShell`).
- Exactly one button element MUST be rendered for the control at any given
  time (no duplicate/hidden second button element).

---

## 2. Toggle behavior contract

- **Given** the active theme is Light, **when** the user activates the
  toggle button, **then** the active theme becomes Dark.
- **Given** the active theme is Dark, **when** the user activates the toggle
  button, **then** the active theme becomes Light.
- The button's icon and accessible name always represent the theme that will
  be applied *next* (the destination), never the current theme.
- Activation MUST work identically via pointer click and via keyboard
  (`Enter`/`Space` while focused).

---

## 3. Application-wide effect contract

- Changing the theme mode MUST restyle every currently rendered page and
  component (via the shared `ThemeProvider`), not just the navigation bar.
- Navigating to a different route after toggling MUST preserve the selected
  theme; no route or page MAY reset the theme independently.

---

## 4. Default & persistence contract

- **First visit, no persisted preference**: initial theme MUST match the
  browser/OS `prefers-color-scheme` setting; if that cannot be detected,
  initial theme MUST be Light.
- **After an explicit toggle**: the selected mode MUST be persisted (e.g.,
  `localStorage`) so that reloading the page or returning in a future visit
  restores the same mode without requiring the user to toggle again.
- **Invalid/corrupted persisted value**: MUST be treated as if no persisted
  value existed (fall back to system preference, then Light), and MUST NOT
  throw an error visible to the user.

---

## 5. Accessibility contract

- The toggle button MUST remain reachable via `Tab`/`Shift+Tab` keyboard
  navigation in the same order the Settings button previously occupied.
- The toggle button MUST expose a visible focus indicator matching the
  pattern used by the previous Settings button.
- The toggle button's accessible name MUST describe both the action and the
  destination state (e.g., "Switch to dark theme" / "Switch to light
  theme"), not a generic label like "Theme".
- The control MUST have no automated accessibility violations (axe) in
  either theme mode.

---

## 6. Out-of-scope contract

- No additional themes beyond Dark and Light are introduced.
- No per-page or per-component theme overrides are introduced.
- No user-account-level (server-side) theme sync is introduced; persistence
  is local to the browser/device.
- No Settings-related functionality is reintroduced under a different
  control.
