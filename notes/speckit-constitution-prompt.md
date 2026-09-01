# GitHub Spec Kit /speckit.constitution Prompt

Recommended /speckit.constitution prompt

/speckit.constitution
Project: .NET Full Stack Guides web application (React on GitHub Pages).

Create or update the project constitution with these long-term, non-negotiable rules:

1. Static hosting first (GitHub Pages)
- The app MUST remain fully deployable as a static site.
- Routing MUST be compatible with GitHub Pages using HashRouter.
- Build and asset configuration MUST work under repository subpaths.
- No feature may assume server-side rewrites or runtime server logic.

2. React architecture and purity
- Components and Hooks MUST follow React purity rules: same inputs, same output, and no mutation of external state during render.
- Data flow MUST remain one-way (parent to child), with state lifted to the nearest common owner when shared.
- Effects are escape hatches only and MUST be used only for external synchronization, not for deriving render data.

3. State management discipline
- Local component state and props lifting are the default state strategy.
- Context SHOULD be used only for cross-cutting concerns where prop drilling is a clear maintenance problem.
- Redundant, duplicate, or contradictory state MUST be avoided; derive values during render whenever possible.

4. Feature-first code organization
- Source code MUST be organized feature-first, with clear module boundaries.
- Shared utilities, UI primitives, and hooks MUST be reusable and not tightly coupled to feature internals.
- New features MUST preserve existing architectural boundaries rather than introducing ad hoc folder patterns.

5. UI system consistency
- Material UI (MUI) is the default UI technology and MUST be used consistently for core components.
- Styling and spacing SHOULD align with a centralized theme and design tokens.
- Custom visual patterns MAY be introduced only when they integrate cleanly with the shared design language.

6. Accessibility baseline
- Every user-facing feature MUST meet WCAG 2.1 AA baseline requirements.
- Keyboard operability, focus visibility, semantic markup, and contrast compliance are mandatory acceptance criteria.

7. Quality gates and static analysis
- TypeScript strictness (no type errors) is mandatory.
- ESLint and Prettier compliance is mandatory.
- Pull requests MUST pass all configured quality checks before merge.

8. Automated testing policy
- Every feature MUST include or update automated tests.
- Vitest with React Testing Library is the required baseline testing stack.
- Tests MUST validate user-visible behavior and critical logic paths, not only snapshots.

9. Security and configuration hygiene
- Secrets MUST never be committed to frontend source, build artifacts, or client-exposed config.
- Only public, environment-specific endpoint configuration may be exposed to the client.
- Client persistence (localStorage/sessionStorage/indexedDB) MUST use explicit key/version conventions and safe parsing/validation.

10. Performance and browser support
- Features MUST avoid unnecessary rerenders and unnecessary Effects.
- Expensive derived computations SHOULD be memoized only when measured or justified.
- The application MUST support latest Chrome, Edge, Firefox, and Safari (last two versions).

11. Constitution governance
- These principles are binding constraints for all future specs, plans, tasks, and implementation.
- Any change to these rules requires an explicit constitution amendment with rationale.
- Ambiguity should default to stricter interpretation of quality, accessibility, security, and maintainability.

Also include explicit normative wording (MUST, SHOULD, MAY), clear compliance expectations, and governance versioning in the generated constitution.

## Why each rule is included

1. Static hosting first
Prevents future features from breaking GitHub Pages deployment assumptions.

2. React architecture and purity
Aligns with official React guidance and reduces hard-to-debug rendering issues.

3. State management discipline
Keeps state minimal, predictable, and maintainable over time.

4. Feature-first code organization
Supports scale and team velocity by making ownership and boundaries clear.

5. UI system consistency
Avoids fragmented UI patterns and keeps the product cohesive with MUI.

6. Accessibility baseline
Makes accessibility a default engineering quality bar, not an afterthought.

7. Quality gates and static analysis
Enforces baseline correctness and code health on every change.

8. Automated testing policy
Protects behavior during iteration and enables safe refactoring.

9. Security and configuration hygiene
Reduces accidental secret exposure and hardens client-side persistence behavior.

10. Performance and browser support
Preserves usability across devices and avoids gradual performance regressions.

11. Constitution governance
Ensures these rules actually govern future work rather than becoming documentation only.
