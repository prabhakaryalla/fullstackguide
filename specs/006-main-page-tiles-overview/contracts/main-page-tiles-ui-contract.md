# UI Contract: Main Page Menu Tiles

## Purpose

Define externally observable behavior for the root main page menu tiles,
statistics, and navigation outcomes.

---

## 1. Entry and visibility contract

| Area | Requirement |
|------|-------------|
| Root route (`#/`) | Main page is displayed on website entry |
| Tile presence | A tile is shown for each configured menu category |
| Tile readability | Tile title and stats are legible and clearly grouped |

Rules:
- Root page MUST not default to a coming-soon placeholder when menu data exists.
- Missing topic data for a menu MUST NOT remove that menu tile from view.

---

## 2. Tile statistics contract

Each tile displays these values:
- Total topics
- Hard topics
- Medium topics
- Easy topics
- Unknown topics (when complexity metadata is missing)
- Dominant complexity insight

Rules:
- Unknown count is included whenever complexity labels are missing.
- Hard/Medium/Easy counts exclude unknown topics.
- Displayed totals must remain internally consistent.
- Dominant complexity uses known counts (`Easy`, `Medium`, `Hard`) and resolves
	ties as `Mixed`; if only unknown data exists, dominant complexity is
	`Unknown`.

---

## 3. Navigation contract

| Tile state | Activation outcome |
|------------|--------------------|
| Menu with topics | Navigates to matching menu topic-list route |
| Menu with zero topics | Navigates to matching menu route and shows empty topic list state |
| Rapid repeated activation | User remains within selected menu route; no cross-menu navigation |

Rules:
- Route destination for any tile is `/:menuSlug` with the tile's `menuId`.
- Category mapping accuracy is mandatory.
- Zero-topic menu tiles remain actionable and must still navigate to their
	corresponding menu route.

---

## 4. Accessibility contract

- Tiles are keyboard reachable in a logical tab sequence.
- Keyboard activation and pointer activation produce identical route outcomes.
- Focus indicators are visible for keyboard users.
- Interactive semantics are exposed to assistive technologies.

---

## 5. Error and empty-state contract

- If menu configuration is empty, user sees explicit no-menu messaging.
- If a menu has no topics, user sees explicit empty topic-list messaging after navigation.
- If complexity metadata is partially missing, stats remain visible with unknown count.

---

## 6. Out-of-scope contract

- No personalization of tile order by user profile.
- No cross-menu topic-level navigation from tiles.
- No server-side data persistence or analytics side effects as part of tile activation.
