# Data Model: Topic Next/Previous Navigation

## Entity: Topic

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique topic identifier within a menu dataset |
| `slug` | `string` | URL-safe identifier used in topic route segments |
| `title` | `string` | User-facing topic title |
| `markdownPath` | `string` | Relative path to markdown content file |

**Validation rules**:
- `id`, `slug`, `title`, and `markdownPath` are required.
- `slug` MUST be unique within a menu dataset.

---

## Entity: TopicSequence

| Field | Type | Description |
|-------|------|-------------|
| `menuSlug` | `string` | Active menu category identifier |
| `topics` | `Topic[]` | Ordered topic collection for the menu category |
| `currentIndex` | `number` | Zero-based position of current topic in `topics` |
| `previousTopicSlug` | `string \| null` | Adjacent previous topic slug, null at first topic |
| `nextTopicSlug` | `string \| null` | Adjacent next topic slug, null at last topic |

**Validation rules**:
- `currentIndex` MUST be `>= 0` and `< topics.length` for a valid topic route.
- `previousTopicSlug` is `null` when `currentIndex = 0`.
- `nextTopicSlug` is `null` when `currentIndex = topics.length - 1`.

**State transitions**:
1. **Route load**: derive `currentIndex` from `topicSlug` lookup in `topics`.
2. **Next action**: if `nextTopicSlug` exists, route updates to that slug.
3. **Previous action**: if `previousTopicSlug` exists, route updates to that
   slug.
4. **Boundary action**: if adjacent slug is `null`, no route change occurs.

---

## Entity: NavigationControlState

| Field | Type | Description |
|-------|------|-------------|
| `previousEnabled` | `boolean` | `true` when previous topic exists |
| `nextEnabled` | `boolean` | `true` when next topic exists |
| `showControls` | `boolean` | `true` when menu and current topic resolve successfully |

**Derivation rules**:
- `previousEnabled = previousTopicSlug !== null`.
- `nextEnabled = nextTopicSlug !== null`.
- `showControls = true` only when the current route resolves to a valid menu
  and topic record.

---

## Entity: TopicInfoViewState

| Field | Type | Description |
|-------|------|-------------|
| `status` | `'loading' \| 'ready' \| 'unavailable'` | Content loading state for Topic Info page |
| `content` | `string \| null` | Loaded markdown content for current topic |
| `navigationState` | `NavigationControlState` | Previous/Next control behavior for current topic |

**View rules**:
- `status = 'ready'` displays markdown content and navigation controls.
- `status = 'loading'` shows loading feedback while content is fetched.
- `status = 'unavailable'` shows unavailable messaging; navigation controls are
  non-actionable.