# Data Model: Main Page Tiles Overview

## Entity: MenuTile

| Field | Type | Description |
|-------|------|-------------|
| `menuId` | `string` | Stable menu identifier used for routing |
| `menuLabel` | `string` | User-visible menu title on tile |
| `navigationTarget` | `string` | Route target for topic list page |
| `stats` | `MenuStatistics` | Computed metrics displayed on tile |
| `dominantComplexity` | `string` | Summary insight derived from known complexities |

**Validation rules**:
- `menuId` MUST map to exactly one tile in a page render.
- `navigationTarget` MUST route to `/:menuSlug` using the same menu id.
- Tile MUST remain interactive even when `stats.totalTopics = 0`.

---

## Entity: MenuStatistics

| Field | Type | Description |
|-------|------|-------------|
| `totalTopics` | `number` | Count of all topics in the menu |
| `easyTopics` | `number` | Count of topics marked easy |
| `mediumTopics` | `number` | Count of topics marked medium |
| `hardTopics` | `number` | Count of topics marked hard |
| `unknownTopics` | `number` | Count of topics with missing/unknown complexity |

**Validation rules**:
- All counts MUST be non-negative integers.
- `easyTopics + mediumTopics + hardTopics + unknownTopics = totalTopics`.
- Unknown topics MUST NOT be double counted in easy/medium/hard.

---

## Entity: DominantComplexityInsight

| Field | Type | Description |
|-------|------|-------------|
| `label` | `string` | User-facing insight text shown on tile |
| `sourceCounts` | `easy, medium, hard` | Known-complexity counts used for derivation |

**Derivation rules**:
- If all known counts are zero and unknown > 0, label is `Unknown`.
- If one known count is strictly highest, label reflects that level.
- If multiple known counts tie for highest and are non-zero, label is `Mixed`.

---

## Entity: MainPageViewState

| Field | Type | Description |
|-------|------|-------------|
| `tiles` | `MenuTile[]` | Rendered tile list on main page |
| `isEmptyConfig` | `boolean` | Indicates menu config has no items |
| `statusMessage` | `string \| null` | User guidance for unusual states |

**View rules**:
- Root route render MUST show one tile for each configured menu item.
- Empty-config fallback MUST be explicit and non-crashing.
- Keyboard activation and pointer activation MUST produce identical navigation outcomes.
