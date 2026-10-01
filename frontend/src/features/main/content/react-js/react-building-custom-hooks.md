# Building Custom Hooks in React

A custom hook is just a regular JavaScript function, named starting with `use`, that calls other hooks internally — it's React's mechanism for extracting and reusing stateful logic across components without changing the component tree (unlike older patterns like HOCs or render props).

## Short Answer

Identify a piece of stateful logic or side effect duplicated across components, extract it into a function prefixed with `use`, call whatever built-in hooks it needs internally (`useState`, `useEffect`, etc.), and return whatever the consuming components need — values, setters, or handler functions.

## A Simple Custom Hook: useToggle

```jsx
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue)
  const toggle = useCallback(() => setValue((v) => !v), [])
  return [value, toggle]
}
```

```jsx
function Accordion() {
  const [isOpen, toggleOpen] = useToggle(false)
  return (
    <div>
      <button onClick={toggleOpen}>{isOpen ? 'Collapse' : 'Expand'}</button>
      {isOpen && <p>Accordion content</p>}
    </div>
  )
}
```

- Any component needing open/closed toggle behavior can reuse `useToggle` instead of re-implementing the same `useState` + toggle function every time.

## A More Complete Example: useFetch

```jsx
function useFetch(url) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setLoading(true)

    fetch(url)
      .then((res) => res.json())
      .then((json) => { if (!cancelled) setData(json) })
      .catch((err) => { if (!cancelled) setError(err) })
      .finally(() => { if (!cancelled) setLoading(false) })

    return () => { cancelled = true } // avoid setting state after unmount
  }, [url])

  return { data, error, loading }
}
```

```jsx
function UserProfile({ userId }) {
  const { data: user, error, loading } = useFetch(`/api/users/${userId}`)

  if (loading) return <Spinner />
  if (error) return <ErrorMessage error={error} />
  return <div>{user.name}</div>
}
```

```archify
diagrams/react-custom-hook-reuse.html
```

## A Real-World Example: useFormInput

```jsx
function useFormInput(initialValue, validate) {
  const [value, setValue] = useState(initialValue)
  const [touched, setTouched] = useState(false)
  const error = touched ? validate(value) : null

  return {
    value,
    onChange: (e) => setValue(e.target.value),
    onBlur: () => setTouched(true),
    error,
  }
}
```

```jsx
function EmailField() {
  const email = useFormInput('', (v) => (v.includes('@') ? null : 'Invalid email'))
  return (
    <div>
      <input value={email.value} onChange={email.onChange} onBlur={email.onBlur} />
      {email.touched && email.error && <span>{email.error}</span>}
    </div>
  )
}
```

- Encapsulates value, touched/validation state, and event handlers into one reusable unit — every form field in the app can adopt consistent validation behavior with a single hook call.

## Rules That Apply to Custom Hooks Too

- **Only call hooks at the top level** — never inside loops, conditions, or nested functions (including inside your custom hook's own body).
- **Only call hooks from React function components or other custom hooks** — never from a plain utility function.
- These rules exist because React relies on hooks being called in the **same order** on every render to correctly match up state between renders — a custom hook is no exception, since it's just calling built-in hooks internally.

## When to Extract a Custom Hook

- The same `useState` + `useEffect` combination (or similar) appears in multiple components.
- A piece of logic is complex enough that pulling it out of the component body improves readability, even if it's currently only used once.
- You want to unit-test a piece of stateful logic in isolation, without needing to render a full component (custom hooks can be tested directly with tools like `@testing-library/react-hooks`/`renderHook`).

## Summary

Custom hooks are plain functions prefixed with `use` that call other hooks to encapsulate reusable stateful logic — from a simple toggle to a full data-fetching pattern with loading/error state. They follow the exact same Rules of Hooks as built-in hooks (top-level calls only, called only from React function components or other hooks), and are the modern, composition-friendly replacement for older reuse patterns like higher-order components and render props.
