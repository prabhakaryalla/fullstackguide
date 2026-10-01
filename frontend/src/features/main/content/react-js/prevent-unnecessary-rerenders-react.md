# How to Prevent Unnecessary Re-renders

React re-renders a component whenever its state changes, its parent re-renders, or its context value changes. Most of the time this is fine — but in large trees or expensive components, avoidable re-renders hurt performance.

## Short Answer

- Memoize components with `React.memo` so they skip re-rendering when props haven't changed.
- Keep prop references stable with `useMemo`/`useCallback` (otherwise `React.memo` doesn't help).
- Keep state as local as possible — lift it up only as far as it needs to go.
- Split large components so unrelated state doesn't force unrelated UI to re-render.
- Use the key prop correctly in lists to avoid unnecessary remounts.

## 1. React.memo for Components

```tsx
const ProductRow = React.memo(function ProductRow({ product }: { product: Product }) {
  return <tr><td>{product.name}</td><td>{product.price}</td></tr>
})
```

- Skips re-rendering if props are shallowly equal to the previous render.
- Only helps if the **props themselves** don't change unnecessarily — see below.

## 2. Stabilize Prop References

```tsx
// Without useCallback: `onSelect` is a new function every render, defeating React.memo
<ProductRow product={p} onSelect={() => setSelected(p.id)} />

// With useCallback: stable reference across renders
const handleSelect = useCallback((id: string) => setSelected(id), [])
<ProductRow product={p} onSelect={handleSelect} />
```

Same idea applies to objects/arrays passed as props — a new inline `{}` or `[]` literal creates a new reference every render.

## 3. Keep State as Local as Possible

```archify
diagrams/react-state-colocation.html
```

- If only `SearchBox` needs `searchText`, keep that state inside `SearchBox` instead of a shared ancestor — otherwise every keystroke re-renders the whole subtree under the ancestor.

## 4. Split Components Around Independent State

```tsx
// One component, two concerns — any state change re-renders both the list and the counter
function Dashboard() {
  const [items, setItems] = useState<Item[]>([])
  const [tickCount, setTickCount] = useState(0)
  // ...
}

// Split — ticking no longer re-renders the (potentially large) item list
function Dashboard() {
  return (
    <>
      <ItemList />
      <TickCounter />
    </>
  )
}
```

## 5. Correct List Keys

```tsx
// Bad — index as key causes remounts/re-renders when the list reorders
{items.map((item, index) => <Row key={index} item={item} />)}

// Good — stable identity key
{items.map((item) => <Row key={item.id} item={item} />)}
```

Using array index as a key can cause React to misidentify which DOM node maps to which item after a reorder/insert/delete, leading to extra re-renders and even state bugs in child components.

## 6. Selector-Based State (for Context/Global Stores)

If using Context for broader state, split it into smaller contexts, or use a state library with selectors (Zustand, Redux with `useSelector`) so a component only re-renders when the specific slice it reads changes — not on every store update.

## Profiling Before Optimizing

Use React DevTools Profiler to confirm which components actually re-render and why, before applying `memo`/`useCallback` everywhere — premature memoization adds complexity without measurable benefit.

## Real-World Example

A dashboard with a live-updating "last synced" timestamp in the header was causing the entire page (including a heavy data table) to re-render every second. Moving the timestamp into its own small component, and wrapping the data table in `React.memo` with stable props, isolated the re-render to just the timestamp.

## Summary

Unnecessary re-renders usually come from unstable prop references, state placed too high in the tree, or list rendering without stable keys. `React.memo` + `useCallback`/`useMemo` + keeping state as local as possible are the core tools — but always profile first to confirm where the actual re-render cost is coming from.
