# Data Model: Landing Page Top Navigation

## Entity: LandingNavigationBar

- title: string
- menuItems: NavigationMenuItem[]
- settingsActionLabel: string

Validation rules:
- title is required and defaults to Fullstack Guide.
- settingsActionLabel is required and remains visually differentiated from topic menus.

## Entity: NavigationMenuItem

- id: string
- label: string
- order: number

Validation rules:
- id is required and unique among top-level menu items.
- label is required, trimmed, and non-empty.
- order is required and determines stable render order.

## Entity: MenuConfig

- items: NavigationMenuItem[]

Validation rules:
- items must be an array.
- empty array is valid and triggers a no-menu-configured empty state.

## Entity: ComingSoonViewState

- selectedMenuId: string | null
- selectedMenuLabel: string | null
- heading: string
- description: string

State transitions:
1. Initial load:
- If at least one item exists, first item by order is selected and Coming Soon content is contextualized to that menu.
- If no items exist, selectedMenuId and selectedMenuLabel remain null and empty-state content is shown.

2. Menu selection:
- On click/keyboard activation of a menu, selectedMenuId and selectedMenuLabel update immediately.
- Coming Soon heading/description recompute in the same interaction step.

3. Menu config unavailable:
- If config load fails, render an unavailable-state message while retaining title and settings action visibility.
