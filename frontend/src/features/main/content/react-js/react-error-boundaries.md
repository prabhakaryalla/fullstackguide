# React Error Boundaries

An error thrown anywhere during rendering can crash the entire React app — showing a blank white screen — unless something catches it. Error Boundaries are React's mechanism for catching those errors locally and rendering a fallback UI instead of taking down the whole app.

## Short Answer

An Error Boundary is a class component implementing `static getDerivedStateFromError()` and/or `componentDidCatch()`. It catches errors thrown during rendering, in lifecycle methods, and in constructors of its entire child subtree — but it does **not** catch errors in event handlers, async code, or server-side rendering.

## Implementing an Error Boundary

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    // Called during the render phase — update state to trigger a fallback render
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // Called during the commit phase — safe place for logging/side effects
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>
    }
    return this.props.children
  }
}
```

```jsx
function BuggyComponent() {
  throw new Error('I crashed!')
}

function App() {
  return (
    <ErrorBoundary>
      <BuggyComponent />
    </ErrorBoundary>
  )
}
```

```archify
diagrams/react-error-boundary.html
```

- `getDerivedStateFromError` — a **static** method used purely to compute new state for the fallback render; it must not have side effects (no logging/API calls here).
- `componentDidCatch` — receives the error and React's component stack trace (`errorInfo`); this is the right place for logging to an error-reporting service.

## What Error Boundaries Catch — and What They Don't

| Catches | Does Not Catch |
|---|---|
| Errors during rendering | Errors in event handlers (`onClick`, etc.) |
| Errors in lifecycle methods (`componentDidMount`, etc.) | Errors in async code (`setTimeout`, `fetch` callbacks, Promises) |
| Errors in constructors of the subtree | Errors during server-side rendering |
| | Errors thrown inside the error boundary itself |

```jsx
function EventErrorComponent() {
  const handleClick = () => {
    throw new Error('Error in event handler!') // NOT caught by any error boundary
  }
  return <button onClick={handleClick}>Click me</button>
}
```

- Errors here must be handled manually with `try/catch` inside the handler itself:

```jsx
const handleClick = () => {
  try {
    riskyOperation()
  } catch (error) {
    // handle locally — log, show a toast, etc.
  }
}
```

## Why Only Class Components (Currently)

- Error boundaries rely on `getDerivedStateFromError`/`componentDidCatch`, which are class-component lifecycle methods with no functional/hooks equivalent yet.
- `useEffect` runs **after** rendering completes, so it cannot intercept an error thrown *during* the render itself — this is a fundamental limitation, not just a missing hook.
- The practical workaround: write one small class-based `ErrorBoundary` component (as shown above) and reuse it to wrap functional components throughout the app — you rarely need more than one boundary implementation.

## Granular Error Boundaries

```jsx
function Dashboard() {
  return (
    <div>
      <ErrorBoundary><Widget1 /></ErrorBoundary>
      <ErrorBoundary><Widget2 /></ErrorBoundary>
      <ErrorBoundary><Widget3 /></ErrorBoundary>
    </div>
  )
}
```

- Wrapping individual widgets (rather than one boundary around the whole app) means a crash in one widget only takes down that widget's fallback UI — the rest of the dashboard keeps working normally.

## Common Mistake

Assuming one `ErrorBoundary` at the very root of the app is "good enough." A single root-level boundary means **any** rendering error anywhere in the app replaces the entire UI with the fallback — usually too coarse-grained for a good user experience; place boundaries around independent, self-contained sections instead.

## Summary

Error Boundaries are class components that catch rendering-phase errors in their child subtree via `getDerivedStateFromError` (compute fallback state) and `componentDidCatch` (logging), preventing a single component's crash from taking down the entire application. They cannot catch event handler or async errors — those still need local `try/catch` — and there's currently no hooks-based equivalent, since the mechanism depends on class lifecycle methods that run during the render phase itself.
