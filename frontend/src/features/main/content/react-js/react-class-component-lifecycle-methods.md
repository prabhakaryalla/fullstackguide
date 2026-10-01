# React Class Component Lifecycle Methods

Before Hooks, class components were the only way to add state and side effects to a component, coordinated through a well-defined set of lifecycle methods spanning three phases: Mounting, Updating, and Unmounting.

## Short Answer

Every class component moves through Mounting (first render), Updating (re-renders from new props/state), and Unmounting (removal) — each phase has specific lifecycle methods that fire at precise points, letting you run setup, react to changes, and clean up respectively.

## The Three Phases

```archify
diagrams/react-class-lifecycle.html
```

## Mounting Phase

```jsx
class UserProfile extends React.Component {
  constructor(props) {
    super(props) // 1. Initialize state, bind methods
    this.state = { user: null }
  }

  static getDerivedStateFromProps(props, state) {
    // 2. Rarely needed — derive state from props right before every render
    return null
  }

  render() {
    // 3. Return the JSX to render
    return <div>{this.state.user?.name ?? 'Loading...'}</div>
  }

  componentDidMount() {
    // 4. Runs once, after the component is in the DOM — the standard place for data fetching
    fetchUser(this.props.userId).then((user) => this.setState({ user }))
  }
}
```

| Method | Purpose |
|---|---|
| `constructor()` | Initialize state, bind event handler methods |
| `static getDerivedStateFromProps()` | Rare — sync state from props before every render (mount and update) |
| `render()` | Pure function of props/state — returns JSX, no side effects allowed here |
| `componentDidMount()` | Runs once after the initial render — fetch data, set up subscriptions/timers |

## Updating Phase

```jsx
class UserProfile extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    // Return false to skip re-rendering entirely — a manual performance optimization
    return nextProps.userId !== this.props.userId
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    // Capture something from the DOM right before it's updated (e.g., scroll position)
    return this.listRef.current.scrollHeight
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // Runs after re-render commits — react to prop/state changes, use the snapshot if needed
    if (prevProps.userId !== this.props.userId) {
      fetchUser(this.props.userId).then((user) => this.setState({ user }))
    }
  }
}
```

| Method | Purpose |
|---|---|
| `static getDerivedStateFromProps()` | Also runs on every update, not just mount |
| `shouldComponentUpdate()` | Return `false` to skip an unnecessary re-render (performance) |
| `render()` | Runs again with new props/state |
| `getSnapshotBeforeUpdate()` | Capture DOM info right before it changes (e.g., scroll position before adding new items) |
| `componentDidUpdate()` | React to the completed update — commonly used to re-fetch data when a specific prop changes |

## Unmounting Phase

```jsx
class UserProfile extends React.Component {
  componentDidMount() {
    this.timerId = setInterval(() => this.refreshStatus(), 5000)
  }

  componentWillUnmount() {
    // The ONLY unmounting lifecycle method — clean up anything started in componentDidMount
    clearInterval(this.timerId)
  }
}
```

| Method | Purpose |
|---|---|
| `componentWillUnmount()` | Cancel timers/subscriptions, abort in-flight requests, remove manually-added event listeners |

- Forgetting `componentWillUnmount()` cleanup is a classic source of "Can't perform a React state update on an unmounted component" warnings and memory leaks.

## Mapping to Hooks (Function Components)

| Class Lifecycle | Hooks Equivalent |
|---|---|
| `componentDidMount` | `useEffect(() => { ... }, [])` |
| `componentDidUpdate` | `useEffect(() => { ... }, [dependency])` |
| `componentWillUnmount` | The cleanup function returned from `useEffect` |
| `shouldComponentUpdate` | `React.memo()` (for props) |

```jsx
useEffect(() => {
  const timerId = setInterval(refreshStatus, 5000) // like componentDidMount
  return () => clearInterval(timerId)              // like componentWillUnmount
}, []) // empty array = runs once, like componentDidMount
```

## Common Mistake

Fetching data directly in `render()` instead of `componentDidMount()`/`componentDidUpdate()`. `render()` must be a pure function of props/state — triggering side effects (API calls, subscriptions) there can cause infinite render loops and violates React's rendering model entirely.

## Summary

Class components move through Mounting (`constructor` → `render` → `componentDidMount`), Updating (`shouldComponentUpdate` → `render` → `getSnapshotBeforeUpdate` → `componentDidUpdate`), and Unmounting (`componentWillUnmount`) — each phase's methods map cleanly onto `useEffect`'s different configurations in function components, which is why understanding the class lifecycle also clarifies exactly what `useEffect`'s dependency array and cleanup function are doing under the hood.
