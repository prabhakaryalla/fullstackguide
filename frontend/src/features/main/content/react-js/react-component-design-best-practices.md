# Component Design Best Practices

Good component design keeps a React codebase easy to change: each component has one clear job, a small predictable API (props), and doesn't quietly depend on things far away in the tree.

## Short Answer

- Keep components small and focused on a single responsibility.
- Prefer composition over configuration (children/slots instead of many boolean props).
- Separate presentational (UI) components from container (data/logic) components.
- Design a minimal, intention-revealing prop API.
- Keep state as close as possible to where it's used ("colocation").

## 1. Single Responsibility

```tsx
// Too much in one component: fetching, formatting, and rendering
function UserProfile({ userId }: { userId: string }) {
  const { data } = useQuery(['user', userId], () => getUser(userId))
  const formattedDate = new Date(data?.joinedAt ?? '').toLocaleDateString()
  return <div>{data?.name} joined on {formattedDate}</div>
}

// Split: data-fetching container + presentational component
function UserProfileContainer({ userId }: { userId: string }) {
  const { data } = useQuery(['user', userId], () => getUser(userId))
  if (!data) return <Spinner />
  return <UserProfileCard user={data} />
}

function UserProfileCard({ user }: { user: User }) {
  return <div>{user.name} joined on {formatDate(user.joinedAt)}</div>
}
```

## 2. Composition Over Configuration

```tsx
// Configuration-heavy — grows unmanageable as more variants are needed
<Card title="Profile" showFooter footerText="Edit" showIcon iconType="user" />

// Composition — flexible, and each piece is independently readable
<Card>
  <Card.Header><UserIcon /> Profile</Card.Header>
  <Card.Body>...</Card.Body>
  <Card.Footer><Button>Edit</Button></Card.Footer>
</Card>
```

- Composition (children, render props, compound components) scales better than an ever-growing list of boolean/config props.

## 3. Presentational vs Container Components

```archify
diagrams/react-container-presentational.html
```

- Presentational components are easy to test and reuse (Storybook-friendly) because they don't know where their data comes from.
- Container components own data-fetching/state and pass plain data down as props.

## 4. Design a Minimal, Clear Prop API

```tsx
// Unclear — what do these booleans even combine to mean?
<Button primary large disabled loading />

// Clearer — explicit variants
<Button variant="primary" size="large" state="loading" />
```

- Avoid props that only make sense in combination with other props — model them as a single, well-typed option instead.
- Use TypeScript unions to make invalid combinations unrepresentable:

```tsx
type ButtonProps =
  | { variant: 'primary' | 'secondary'; size?: 'small' | 'large' }
```

## 5. Colocate State

- Keep state in the component that actually needs it, not lifted to a distant ancestor "just in case." Lift it only when a sibling or parent genuinely needs to share it.

## 6. Keep Components Pure Where Possible

- A component's output should depend only on its props/state — avoid reading/writing external mutable variables directly during render, which makes behavior unpredictable and hard to test.

## 7. Naming and File Structure

- Name components by what they render, not how they're implemented (`ProductCard`, not `ProductComponentV2`).
- Group related files by feature (component + its styles + its tests) rather than by type (`components/`, `styles/`, `tests/` folders scattered globally) — makes a feature's code easy to find and delete together.

## Real-World Example

A `ProductsPage` container fetches product data and manages filter state, then passes plain props down to a purely presentational `ProductGrid`, which composes `ProductCard` components — each `ProductCard` only knows how to render a single product and fire an `onAddToCart` callback, making it trivially reusable on other pages (search results, related products) and easy to test in isolation.

## Summary

Well-designed components are small, single-purpose, and composable, with a prop API that reveals intent rather than requiring the caller to memorize boolean combinations. Separating data/logic (containers) from rendering (presentational components) keeps both easier to test, reuse, and reason about as the app grows.
