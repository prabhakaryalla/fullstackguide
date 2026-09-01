# Research: Global Top Navigation Visibility

## Decision 1: Use a shared app shell to host top navigation across routes

- **Decision**: Introduce a shared application shell layout that renders top
  navigation once and wraps all in-scope route content.
- **Rationale**: This guarantees persistent visibility on Landing, Main,
  Topic Info, and fallback routes while avoiding duplicated navigation logic in
  each page component.
- **Alternatives considered**: Keeping separate navigation in each page was
  rejected because duplicated composition increases drift risk and makes
  cross-page visibility regressions likely.

## Decision 2: Derive active navigation selection from route context

- **Decision**: Compute currently selected top menu item from route path and
  update selected state through route navigation.
- **Rationale**: Route-derived selection ensures refresh-safe behavior and
  consistent highlighting after direct deep links (`#/:menuSlug` and
  `#/:menuSlug/:topicSlug`) without introducing global state.
- **Alternatives considered**: Persisting selected menu in local storage was
  rejected as unnecessary for this visibility-focused feature and adds state
  complexity.

## Decision 3: Keep existing menu taxonomy and destinations unchanged

- **Decision**: Reuse existing menu configuration (`menuConfig.json`) and keep
  current destination semantics (Landing to Main, Main to Topic Info).
- **Rationale**: The specification scope is visibility only. Preserving current
  menu structure prevents scope creep and avoids accidental behavioral changes.
- **Alternatives considered**: Adding or renaming menu items was rejected as
  out of scope and not required for acceptance.

## Decision 4: Ensure fallback and empty/error views still render with navigation

- **Decision**: Route fallback views and content-unavailable states remain
  inside the shared shell so top navigation remains visible even when page
  content cannot be resolved.
- **Rationale**: This directly satisfies FR-007 and reduces dead-end user
  experiences during invalid routes or missing content scenarios.
- **Alternatives considered**: Rendering standalone error pages outside the
  app shell was rejected because it breaks navigation continuity.

## Decision 5: Keep top navigation fixed during full-page scrolling

- **Decision**: Keep top navigation anchored in a consistent viewport position
  while users scroll from top to bottom on every in-scope route.
- **Rationale**: This directly satisfies the fixed visibility requirement and
  prevents users from losing orientation on long-content pages.
- **Alternatives considered**: Non-fixed navigation that only renders at page
  top was rejected because it fails the user story for bottom-of-page scrolling.

## Decision 6: Validate persistence with route-level component tests

- **Decision**: Add or extend RTL tests to assert top navigation visibility on
  Landing, Main, Topic Info, and wildcard routes.
- **Rationale**: Visibility requirements are route-driven; route-level tests
  provide direct verification for acceptance criteria and prevent regressions.
- **Alternatives considered**: Relying only on manual checks was rejected
  because repeated route combinations are better guarded by automation.
