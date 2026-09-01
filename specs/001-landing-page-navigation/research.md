# Research: Landing Page Top Navigation

## Decision 1: Use React + TypeScript with MUI for UI implementation

- Decision: Implement the landing page using React and TypeScript with Material UI components.
- Rationale: This aligns with the project constitution requiring React architecture and MUI consistency while supporting accessible, maintainable UI patterns.
- Alternatives considered: Plain HTML/CSS/JS was rejected because it conflicts with constitutional direction for React + MUI standardization.

## Decision 2: Use HashRouter-compatible, static-hosting-safe navigation behavior

- Decision: Keep navigation interactions as in-page state transitions while preserving HashRouter compatibility for GitHub Pages.
- Rationale: Static hosting constraints prohibit server rewrites; HashRouter ensures deployability while menu clicks provide immediate feedback.
- Alternatives considered: BrowserRouter with server rewrite assumptions was rejected due GitHub Pages constraints.

## Decision 3: Dynamic menu names from configuration data

- Decision: Load first-level menu names from a static JSON configuration module/file at runtime/build time.
- Rationale: Satisfies the requirement that menu names are dynamic and decouples display labels from UI logic.
- Alternatives considered: Hard-coded menu labels in component code were rejected because they are not dynamically configurable.

## Decision 4: Distinct settings action in top navigation

- Decision: Render settings as a separate end-aligned action with distinct visual treatment from topic menu items.
- Rationale: Meets FR-006 and Story 3 by preserving clear semantic distinction and consistent placement.
- Alternatives considered: Treating settings as another topic menu item was rejected because it reduces clarity and violates separation intent.

## Decision 5: Coming Soon placeholder as contextual state

- Decision: Render a reusable Coming Soon panel that updates selected menu context on click.
- Rationale: Satisfies FR-005 and FR-009 with one-step visible feedback without introducing out-of-scope topic detail pages.
- Alternatives considered: Separate per-menu placeholder routes/pages were rejected as unnecessary complexity for current scope.

## Decision 6: Accessibility and edge-case behavior

- Decision: Support keyboard navigation, visible focus states, long-label wrapping/truncation strategy, empty-menu state, and temporary-unavailable state.
- Rationale: Directly addresses edge cases and WCAG baseline obligations in the constitution.
- Alternatives considered: No explicit fallback behavior was rejected due usability and reliability risk.
