# useReducer vs useState

`useState` is enough for a single, independent value — but once state updates depend on multiple related pieces of data, or the "next state" depends on complex logic rather than a simple replacement, `useReducer` centralizes that logic in one place instead of scattering it across many `setX` calls.

## Short Answer

- `useState` — best for simple, independent values (a toggle, a text input, a counter) where updates are straightforward replacements.
- `useReducer` — best for state that has multiple sub-values that change together, or where the "how do we get from current state to next state" logic is complex enough to deserve its own function (a `reducer`), similar to Redux's core idea but scoped to one component.

## useState for Simple Cases

```tsx
const [count, setCount] = useState(0)
const [isOpen, setIsOpen] = useState(false)

<button onClick={() => setCount(count + 1)}>Count: {count}</button>
```

Each piece of state is independent, and each update is a direct replacement — there's no shared logic between them worth centralizing.

## useReducer for Related, Complex State

```tsx
type State = { status: 'idle' | 'loading' | 'success' | 'error'; data: Item[] | null; error: string | null }
type Action =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: Item[] }
  | { type: 'FETCH_ERROR'; payload: string }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'FETCH_START':
      return { status: 'loading', data: null, error: null }
    case 'FETCH_SUCCESS':
      return { status: 'success', data: action.payload, error: null }
    case 'FETCH_ERROR':
      return { status: 'error', data: null, error: action.payload }
    default:
      return state
  }
}

const [state, dispatch] = useReducer(reducer, { status: 'idle', data: null, error: null })

async function load() {
  dispatch({ type: 'FETCH_START' })
  try {
    const data = await fetchItems()
    dispatch({ type: 'FETCH_SUCCESS', payload: data })
  } catch (err) {
    dispatch({ type: 'FETCH_ERROR', payload: String(err) })
  }
}
```

- `status`, `data`, and `error` always change **together**, as a set — with `useState`, you'd need three separate setters and would have to remember to update all three consistently on every code path (easy to forget one and end up with an impossible combination, like `status: 'success'` with `error` still set from a previous failed attempt).
- The reducer function is a single, testable place that defines every valid state transition — you can unit test `reducer(state, action)` directly, with no component or rendering involved at all.

## Why This Scales Better as Logic Grows

```tsx
// With useState, this same logic gets scattered across the component:
const [status, setStatus] = useState('idle')
const [data, setData] = useState(null)
const [error, setError] = useState(null)

async function load() {
  setStatus('loading')
  setData(null)     // easy to forget this line in a future edit
  setError(null)     // or this one
  try {
    const result = await fetchItems()
    setStatus('success')
    setData(result)
  } catch (err) {
    setStatus('error')
    setError(String(err))
  }
}
```

As more transitions get added over time (retry, cancel, pagination), a `useState`-based approach means every new transition has to remember to touch every relevant setter correctly, in the right order, across an increasingly tangled component. A reducer keeps that complexity in one dedicated function instead of spread across the component body.

## Common Mistake

Reaching for `useReducer` for genuinely simple, independent state (like a single boolean toggle) "because it's more scalable." For state that truly is one independent value with a direct update, `useState` is simpler to read and equally correct — `useReducer`'s value shows up specifically when multiple values change together or transitions have real branching logic.

## Real-World Example

A multi-step form wizard: `currentStep`, `formData`, and `validationErrors` all need to change together on each transition (advancing a step should also validate the current step's data and clear/set errors accordingly). A `useReducer` with actions like `NEXT_STEP`, `PREV_STEP`, and `SET_FIELD` keeps every valid transition explicit and testable, instead of coordinating three separate `useState` setters by hand at every call site.

## Summary

`useState` is for simple, independent values with direct updates. `useReducer` is for state where multiple values change together, or the update logic itself is complex enough to warrant its own testable function — trading a small amount of upfront boilerplate for state transitions that are centralized, explicit, and much harder to get inconsistent as the component grows.
