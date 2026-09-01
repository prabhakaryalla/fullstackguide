# Quickstart: Landing Page Top Navigation Validation

## Prerequisites

- Node.js 20+ available.
- Frontend project scaffolded with React + TypeScript + MUI.
- Dependencies installed and app runnable locally.

## Run application

1. From the frontend workspace, install dependencies.
2. Start local development server.
3. Open the landing page route in browser.

## Functional validation scenarios

1. Landing top navigation
- Verify top navigation is visible on first render.
- Verify title is exactly Fullstack Guide.
- Verify settings action is visible at far end of nav.

2. Dynamic menu rendering
- Verify menu names are loaded from configuration and displayed in order.
- Verify baseline menus include .NET, Azure, and C# for default config.

3. Menu interaction and Coming Soon state
- Select each menu and verify Coming Soon content updates to selected menu context.
- Switch between menus and verify updates occur in one interaction step.
- Click same menu repeatedly and verify no errors or visual breakage.

4. Edge-case behavior
- Set menu config items to empty and verify explicit no-menu-configured state.
- Simulate unavailable menu config and verify explicit unavailable-state message.
- Verify settings action remains visible in both edge states.

5. Accessibility checks
- Navigate menu controls and settings using keyboard only.
- Verify visible focus states and semantic landmarks.

## Test validation

1. Run unit and component tests for landing navigation behavior.
2. Confirm tests cover:
- dynamic menu rendering
- default selection
- selection updates
- empty and unavailable states
- settings action visibility and differentiation

## Expected outcome

- All scenarios in spec acceptance criteria pass.
- No dead-end interactions occur for top-level menu selection.
- Landing page remains user-friendly and stylish while honoring accessibility and static-hosting constraints.
