# UI Contract: Landing Page Top Navigation

## Purpose

Define the externally observable UI behavior and data shape for the Landing Page top navigation feature.

## 1. Top navigation contract

The landing page MUST render:
- A top navigation bar on initial load.
- Title text exactly as Fullstack Guide.
- Dynamically sourced first-level menu items.
- A settings action placed at the far end of navigation.

## 2. Dynamic menu data contract

Source:
- Landing feature menu configuration file/module.

Required shape:

```json
{
  "items": [
    { "id": "dotnet", "label": ".NET", "order": 1 },
    { "id": "azure", "label": "Azure", "order": 2 },
    { "id": "csharp", "label": "C#", "order": 3 }
  ]
}
```

Rules:
- items must be an array.
- id must be unique.
- label must be non-empty.
- order determines display sequence.

## 3. Interaction contract

- First valid menu item is selected by default on initial load.
- Selecting any menu item updates the Coming Soon view immediately.
- Re-selecting the same menu item is allowed and must not break UI state.
- Settings action remains visible regardless of menu selection state.

## 4. Empty/error state contract

- If items array is empty, show an explicit empty-state message.
- If menu configuration cannot be loaded, show an explicit unavailable-state message.
- In both states, title and settings action remain visible.

## 5. Accessibility contract

- Navigation controls are keyboard operable.
- Focus indicators are visible on menu and settings controls.
- Landmark structure is semantic (header/nav/main).
- Contrast and readable text sizing are maintained for primary interactions.
