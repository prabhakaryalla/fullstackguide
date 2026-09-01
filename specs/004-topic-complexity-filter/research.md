# Research: Topic Complexity Filtering

## Decision 1: Define a canonical topic complexity vocabulary

- **Decision**: Use `Easy`, `Medium`, and `Hard` as canonical topic complexity values, with `All` as the UI filter default value.
- **Rationale**: The feature specification and acceptance criteria explicitly reference these values, making them stable and testable for users and QA.
- **Alternatives considered**: Numeric levels (1-3) were rejected because they are less readable to users and require extra mapping logic.

## Decision 2: Combine search and complexity with AND semantics

- **Decision**: Apply complexity filtering and text search together so visible topics satisfy both conditions.
- **Rationale**: This directly satisfies the acceptance scenario requiring users to filter by topic text and complexity simultaneously.
- **Alternatives considered**: OR-style matching was rejected because it would surface unrelated topics and violate expected filter behavior.

## Decision 3: Place complexity filter adjacent to search on the main page

- **Decision**: Render the complexity filter in the same control area as the search input and show `All` by default on page load.
- **Rationale**: This aligns with the user story, keeps discovery simple, and minimizes navigation distance between related controls.
- **Alternatives considered**: Separate filter panels were rejected as unnecessary interaction overhead for a single high-value filter.

## Decision 4: Keep filtering client-side over existing topic datasets

- **Decision**: Extend existing topic JSON records with a `complexity` attribute and evaluate filters in memory at render time.
- **Rationale**: The app is statically hosted and already uses local topic data; client-side derivation is consistent with architecture and avoids introducing remote dependencies.
- **Alternatives considered**: Server-driven filtering was rejected because it conflicts with static hosting-first constraints and adds avoidable complexity.

## Decision 5: Define missing complexity handling for backward safety

- **Decision**: Treat topics missing a complexity value as `Unknown` in data normalization and exclude them from `Easy`/`Medium`/`Hard` selections while still including them in `All`.
- **Rationale**: This avoids runtime breaks during metadata transition and gives deterministic behavior for incomplete records.
- **Alternatives considered**: Defaulting missing values to `Easy` was rejected because it can misclassify content and reduce user trust.

## Decision 6: Expand automated tests around filter correctness and defaults

- **Decision**: Add test coverage for default `All` behavior, each complexity option, empty-result states, and combined search-plus-complexity filtering.
- **Rationale**: The feature is user-visible and regression-prone at integration points between search logic and topic rendering.
- **Alternatives considered**: Manual-only validation was rejected because cross-combination cases are better protected by repeatable automation.
