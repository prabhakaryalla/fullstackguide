# React 18 Concurrent Rendering: useTransition, startTransition, and useDeferredValue

Before React 18, every state update was rendered with the same priority — a slow render triggered by typing in a search box could make the input itself feel laggy. Concurrent rendering lets you mark certain updates as lower priority, so urgent updates (like keystrokes) stay responsive while non-urgent updates (like re-filtering a large list) render when the browser has spare time.

## Short Answer

- `useTransition` — gives you a `startTransition` function scoped to the current component, plus an `isPending` flag you can render a loading indicator from.
- `startTransition` (the standalone import) — the same mechanism, without the `isPending` flag, for marking an update as low priority from outside a component (or when you don't need the pending state).
- `useDeferredValue` — takes a value and returns a version of it that "lags behind" during urgent updates, letting you defer re-rendering something expensive that depends on fast-changing input.

All three exist for the same underlying reason: not every state update deserves equal priority, and React 18 gives you a way to say so explicitly.

## The Problem Without Concurrent Rendering

```tsx
function SearchPage() {
  const [query, setQuery] = useState('')

  return (
    <>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <ExpensiveResultsList query={query} /> {/* re-renders on every keystroke */}
    </>
  )
}
```

If `ExpensiveResultsList` takes even 100ms to re-render (a large filtered/sorted list), every keystroke feels sluggish — the input's own re-render is stuck behind the expensive list's re-render, both happening at the same priority in the same update.

## useTransition

```tsx
function SearchPage() {
  const [query, setQuery] = useState('')
  const [isPending, startTransition] = useTransition()

  function handleChange(e) {
    setQuery(e.target.value) // urgent - the input must feel instant
  }

  function handleFilterButtonClick(newFilter) {
    startTransition(() => {
      setFilter(newFilter) // marked as low priority - can be interrupted by more urgent updates
    })
  }

  return (
    <>
      <input value={query} onChange={handleChange} />
      {isPending && <span>Updating results...</span>}
      <ExpensiveResultsList query={query} />
    </>
  )
}
```

- Updates wrapped in `startTransition` are interruptible — if a more urgent update (another keystroke) comes in while the transition is still rendering, React can pause/abandon the in-progress low-priority render and handle the urgent one first.
- `isPending` lets you show a subtle "updating..." indicator instead of the UI appearing to freeze, without manually tracking a separate loading flag.

## useDeferredValue

```tsx
function SearchPage() {
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)

  return (
    <>
      <input value={query} onChange={(e) => setQuery(e.target.value)} /> {/* stays instantly responsive */}
      <ExpensiveResultsList query={deferredQuery} /> {/* "lags behind" briefly during fast typing */}
    </>
  )
}
```

- `deferredQuery` updates to match `query`, but React is allowed to delay that update (and the expensive re-render it triggers) while more urgent updates (further keystrokes) are still coming in.
- This is the right tool when you don't own the state update itself (e.g. `query` comes from a parent, or you can't easily wrap the `setQuery` call in `startTransition`) — `useDeferredValue` lets the *consumer* of a fast-changing value opt into deferred rendering, without needing control over where that value is set.

## useTransition vs useDeferredValue: Which One?

| | `useTransition` | `useDeferredValue` |
|---|---|---|
| You control the state update itself | ✅ Wrap the `setState` call directly | Not required |
| You only have a value, not the setter (e.g. it's a prop) | ❌ | ✅ Defer the value itself |
| Need a pending/loading indicator | ✅ `isPending` provided | ❌ Compare `value !== deferredValue` yourself if needed |

## Common Mistake

Assuming these hooks make an expensive render *faster*. They don't — the underlying render still takes the same amount of work. What they change is *scheduling*: urgent updates (typing, clicking) get priority, and expensive, non-urgent updates happen when the browser has spare capacity, without blocking those urgent interactions. If a render is fundamentally too slow, you still need actual optimization (memoization, virtualization) alongside concurrent rendering, not instead of it.

## Summary

`useTransition`/`startTransition` mark a state update as low-priority and interruptible, ideal when you control the update and want an optional pending indicator. `useDeferredValue` defers a value's effect on expensive rendering without needing control over how that value changes. Both exist to keep urgent, interactive updates (typing, clicking) feeling instant while expensive re-renders happen in the background, on the browser's own schedule.
