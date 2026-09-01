# Research: Topic Next/Previous Navigation

## Decision 1: Determine adjacency from existing topic order per menu

- **Decision**: Use each menu dataset's existing `topics` array order as the
  canonical sequence for Previous/Next navigation.
- **Rationale**: Topic ordering already defines the browsing flow and avoids
  introducing a second ordering source that could drift.
- **Alternatives considered**: Alphabetical ordering by title was rejected
  because it may conflict with curated learning progression.

## Decision 2: Keep navigation strictly within active menu category

- **Decision**: Previous/Next actions move only to adjacent topics in the
  currently selected menu category and never cross into another category.
- **Rationale**: This matches feature requirements and preserves user context
  while learning within one topic stream.
- **Alternatives considered**: Cross-category wrap or global next-topic flow
  was rejected because it breaks user expectation for category-local browsing.

## Decision 3: Use disabled boundary controls rather than hiding by default

- **Decision**: At first/last (or only) topic boundaries, render Previous/Next
  controls in disabled state by default.
- **Rationale**: Disabled controls preserve layout stability and make navigation
  limits visible to users, improving discoverability and reducing confusion.
- **Alternatives considered**: Hiding controls at boundaries was rejected as
  default because it can cause layout shifts and make endpoint status unclear.

## Decision 4: Preserve current unavailable-content behavior

- **Decision**: If topic content is unavailable, keep existing unavailable state
  messaging and prevent next/previous navigation actions from firing.
- **Rationale**: The page should fail safely without introducing invalid route
  transitions when topic metadata/content cannot be resolved.
- **Alternatives considered**: Redirecting automatically to category root was
  rejected because it can mask content issues and disrupt debugging/QA.

## Decision 5: Ensure keyboard accessibility and clear state signaling

- **Decision**: Previous/Next controls must be keyboard reachable, expose clear
  labels, and visually distinguish enabled versus disabled states.
- **Rationale**: This satisfies accessibility baseline requirements and the
  feature's user-friendly styling expectation.
- **Alternatives considered**: Icon-only controls without clear text labels
  were rejected due to reduced clarity and accessibility risk.

## Decision 6: Extend tests around navigation and boundary behavior

- **Decision**: Add automated tests for forward/backward navigation, first/last
  boundary disabled states, and category-constrained routing.
- **Rationale**: Navigation logic is user-facing and susceptible to regressions
  when topic datasets change.
- **Alternatives considered**: Manual-only validation was rejected because edge
  and boundary combinations are better covered by repeatable tests.