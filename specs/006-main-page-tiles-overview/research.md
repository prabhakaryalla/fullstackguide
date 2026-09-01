# Research: Main Page Tiles Overview

## Decision 1: Render main page tiles at root route

- **Decision**: The root route (`#/`) will display the main menu-tiles page
  instead of a coming-soon placeholder experience.
- **Rationale**: The specification requires main page visibility on website
  entry and immediate tile discovery.
- **Alternatives considered**:
  - Keep coming-soon at root and expose tiles elsewhere: rejected because it
    violates FR-001 and delays the primary user journey.

## Decision 2: Use menu configuration as tile source of truth

- **Decision**: Build the tile list from `features/landing/data/menuConfig.json`
  so every configured menu category is represented.
- **Rationale**: Spec requires a tile per configured menu; menu config already
  defines category identity and display label.
- **Alternatives considered**:
  - Infer tiles only from topic datasets: rejected because categories without
    loaded datasets would disappear and violate FR-002.

## Decision 3: Aggregate statistics from topic datasets with safe fallbacks

- **Decision**: Compute tile stats by mapping menu ids to topic arrays and
  deriving counts: total, easy, medium, hard, unknown.
- **Rationale**: This meets FR-004 to FR-007 and clarified unknown handling
  without adding persistence.
- **Alternatives considered**:
  - Precompute counts in config file: rejected due to duplication/drift risk.
  - Hide unknown counts: rejected due to clarified requirement and auditability.

## Decision 4: Define dominant complexity via greatest known count

- **Decision**: Dominant complexity equals the highest of easy/medium/hard
  counts; ties resolve to `Mixed` label.
- **Rationale**: Satisfies FR-011 with predictable user-facing interpretation.
- **Alternatives considered**:
  - Use weighted scoring: rejected as harder to explain and validate.
  - Use first non-zero complexity: rejected because it can misrepresent data.

## Decision 5: Keep zero-topic tiles actionable

- **Decision**: A zero-topic tile remains clickable and routes to its menu page,
  which presents an empty topic-list state.
- **Rationale**: Aligns with clarification outcome and keeps interaction
  consistent across tiles.
- **Alternatives considered**:
  - Disable zero-topic tiles: rejected due to inconsistent behavior.
  - Hide zero-topic tiles: rejected because it obscures configured categories.

## Decision 6: Ensure keyboard parity and focus visibility

- **Decision**: Tile activation will use semantic interactive controls that are
  tab-reachable and activatable via keyboard with visible focus states.
- **Rationale**: Meets FR-010 and constitution accessibility principle.
- **Alternatives considered**:
  - Click-only containers: rejected because keyboard users would be blocked.

## Decision 7: Validate with route and tile-stat behavior tests

- **Decision**: Extend `tests/main/MainPage.test.tsx` to verify root rendering,
  per-tile stat content, keyboard activation, zero-topic routing, and unknown
  count behavior.
- **Rationale**: Supports constitution testing policy and success criteria.
- **Alternatives considered**:
  - Manual-only checks: rejected due to regression risk.
