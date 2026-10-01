# useMemo vs useCallback

Both hooks exist to avoid unnecessary recomputation between renders, but they memoize different things: `useMemo` memoizes a **value**, `useCallback` memoizes a **function reference**.

## Short Answer

- `useMemo(fn, deps)` — caches the **return value** of `fn`, recomputing only when `deps` change.
- `useCallback(fn, deps)` — caches the **function itself** (its reference), returning the same function identity across renders until `deps` change.
- `useCallback(fn, deps)` is equivalent to `useMemo(() => fn, deps)`.

## useMemo — Memoizing a Value

```tsx
const filteredItems = useMemo(() => {
  return items.filter((item) => item.category === selectedCategory)
}, [items, selectedCategory])
```

- Without `useMemo`, this filter would re-run on **every** render, even if `items`/`selectedCategory` haven't changed.
- Use it for expensive computations (sorting, filtering large lists, derived calculations).

## useCallback — Memoizing a Function

```tsx
const handleAddItem = useCallback((item: Item) => {
  setItems((prev) => [...prev, item])
}, [])
```

- Without `useCallback`, a new function is created every render — even if its logic never changes.
- This matters most when the function is passed as a prop to a child wrapped in `React.memo`: a new function reference causes the child to re-render even though nothing meaningful changed.

## When the Difference Actually Matters

```archify
diagrams/react-usecallback-necessity.html
```

```tsx
const ExpensiveChild = React.memo(function ExpensiveChild({ onAdd }: { onAdd: (item: Item) => void }) {
  // only re-renders when `onAdd` reference changes
  return <button onClick={() => onAdd({ id: 1 })}>Add</button>
})

function Parent() {
  const [items, setItems] = useState<Item[]>([])
  const handleAdd = useCallback((item: Item) => setItems((prev) => [...prev, item]), [])

  return <ExpensiveChild onAdd={handleAdd} />
}
```

## Common Mistake: Overusing Both

Wrapping every value and function in `useMemo`/`useCallback` adds overhead (comparison cost, memory) without benefit if:

- The computation is cheap (a simple string concat doesn't need `useMemo`).
- The function isn't passed to a memoized child or used as an effect dependency.

Rule of thumb: reach for these hooks when you have a **measurable** performance problem or a **memoized child component**/dependency-array correctness need — not by default on every function/value.

## Real-World Example

A dashboard renders a large, memoized `ChartComponent` that takes a `data` array and an `onPointClick` callback. `useMemo` avoids recalculating aggregated chart data on every keystroke in an unrelated filter input; `useCallback` keeps `onPointClick`'s identity stable so `ChartComponent` (wrapped in `React.memo`) doesn't re-render unnecessarily.

## Summary

`useMemo` avoids recomputing expensive **values**; `useCallback` avoids recreating **function references**. Both exist primarily to prevent wasted renders in memoized children or unstable effect dependencies — not as a blanket performance rule for every value or function.
