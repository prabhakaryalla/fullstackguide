# useState vs useEffect

`useState` manages a piece of data that changes over time; `useEffect` runs code in response to those changes (or after render). They're often used together but solve different problems.

## Short Answer

- `useState` — stores and updates component state, triggers a re-render when changed.
- `useEffect` — runs a **side effect** after render (data fetching, subscriptions, DOM manipulation, timers), optionally re-running when dependencies change.

## useState

```tsx
const [count, setCount] = useState(0)

<button onClick={() => setCount(count + 1)}>Count: {count}</button>
```

- Calling the setter schedules a re-render with the new value.
- State updates are asynchronous/batched — don't rely on `count` being updated immediately after calling `setCount`.

## useEffect

```tsx
useEffect(() => {
  document.title = `Count: ${count}`
}, [count]) // re-runs only when `count` changes
```

- Runs **after** the DOM has been updated/painted.
- The dependency array controls when it re-runs: `[]` = once on mount, no array = every render, `[count]` = only when `count` changes.
- Return a cleanup function for anything that needs teardown (subscriptions, timers, event listeners):

```tsx
useEffect(() => {
  const id = setInterval(() => setCount((c) => c + 1), 1000)
  return () => clearInterval(id) // cleanup on unmount or before next effect run
}, [])
```

## How They Work Together

```archify
diagrams/react-usestate-useeffect.html
```

## Common Mistake

Using `useEffect` just to derive a value from state/props that could be computed directly during render:

```tsx
// Unnecessary — causes an extra render
const [fullName, setFullName] = useState('')
useEffect(() => {
  setFullName(`${firstName} ${lastName}`)
}, [firstName, lastName])

// Better — compute directly during render
const fullName = `${firstName} ${lastName}`
```

## Real-World Example

A search page: `useState` holds the search query and results list; `useEffect` watches the query and fires an API call (debounced) whenever it changes, updating the results state when the response arrives.

## Summary

`useState` is about **what data changes**; `useEffect` is about **reacting to that change with a side effect**. Use `useState` for anything the UI needs to remember, and `useEffect` only for things that must happen outside of pure rendering (I/O, subscriptions, manual DOM work).
