# Data Model: Dark/Light Theme Toggle

## Entity: ThemeModePreference

| Field | Type | Description |
|-------|------|--------------|
| `mode` | `'light' \| 'dark'` | The currently active theme mode applied across the application |
| `source` | `'user' \| 'system' \| 'default'` | How `mode` was determined: explicit user toggle, detected OS/browser preference, or fallback default |
| `persistedKey` | `string` | Explicit, versioned `localStorage` key used to store the user's explicit selection (e.g., `fullstack-guide.theme-mode.v1`) |

**Validation rules**:
- `mode` MUST be exactly one of `'light'` or `'dark'`; no other values are
  valid.
- `source` MUST be `'user'` whenever a persisted value exists and is valid;
  otherwise it MUST be `'system'` when an OS/browser preference was detected,
  or `'default'` when neither a persisted value nor a detectable system
  preference is available.
- Reading an invalid or unparseable persisted value MUST NOT throw; the
  system MUST treat it as if no persisted value existed (fall back to
  `'system'` then `'default'`).

**State transitions**:

```text
[no persisted value] --(detect system preference)--> mode = system pref (or 'light' default), source = 'system' | 'default'
        |
        | user clicks theme toggle
        v
mode = opposite(mode), source = 'user', persisted to localStorage
        |
        | user clicks theme toggle again
        v
mode = opposite(mode), source = 'user', persisted to localStorage
        |
        | page reload
        v
[persisted value found and valid] --> mode = persisted value, source = 'user'
```

- Every toggle click MUST flip `mode` to its opposite value; there are only
  two reachable states (`'light'`, `'dark'`), so no additional transition
  guards are required.
- Once `source` becomes `'user'`, subsequent reloads MUST continue reading
  from the persisted value (system preference is only consulted when no
  persisted value exists).

## Entity: ThemeToggleControl (UI-facing view of ThemeModePreference)

| Field | Type | Description |
|-------|------|--------------|
| `nextMode` | `'light' \| 'dark'` | The mode the control will switch to if activated (opposite of current `mode`) |
| `accessibleLabel` | `string` | Accessible name communicating the action and `nextMode`, e.g. "Switch to dark theme" |
| `icon` | `'DarkModeIcon' \| 'LightModeIcon'` | Icon shown, selected based on `nextMode` |

**Derivation rules**:
- `nextMode` is always the logical opposite of `ThemeModePreference.mode`.
- `icon` and `accessibleLabel` are derived solely from `nextMode`, never from
  `mode` directly, so the control always signals the *destination* theme
  (clarified behavior).
