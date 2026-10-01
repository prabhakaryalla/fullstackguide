# React Refs: createRef, forwardRef, and Callback Refs

Refs give you an escape hatch to directly access a DOM node or component instance — useful for the handful of cases React's declarative model doesn't cover well, like focusing an input or measuring an element's size.

## Short Answer

`useRef`/`createRef` create a ref object you attach to a DOM element via the `ref` attribute; `forwardRef` lets a custom component pass a ref through to one of its own internal DOM elements; callback refs are a function-based alternative that runs exactly when the ref is attached/detached, useful for more dynamic scenarios.

## When to Use Refs (and When Not To)

- **Use refs for**: focusing an input, measuring an element's size/position, integrating a non-React DOM library (e.g., a chart library), triggering imperative animations, managing media playback (`video.play()`).
- **Avoid refs for**: anything that can be expressed declaratively through props/state — reaching for a ref to "read and manually update" the DOM instead of letting React re-render usually indicates fighting the framework rather than working with it.

## createRef / useRef

```jsx
// Class component
class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.inputRef = React.createRef()
  }

  componentDidMount() {
    this.inputRef.current.focus() // .current holds the actual DOM node
  }

  render() {
    return <input ref={this.inputRef} />
  }
}
```

```jsx
// Function component (modern equivalent)
function SearchBar() {
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  return <input ref={inputRef} />
}
```

- `ref.current` starts as `null` and is populated with the actual DOM node once React commits it — this is why refs are typically read inside `useEffect`/`componentDidMount`, not during render itself (the DOM node doesn't exist yet during render).

## forwardRef — Passing a Ref Through a Custom Component

```jsx
// Without forwardRef, a ref placed on <CustomButton> would NOT reach the underlying <button>
const CustomButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="CustomButton">
    {props.children}
  </button>
))

function App() {
  const buttonRef = useRef(null)

  useEffect(() => {
    buttonRef.current.focus() // works, because CustomButton forwarded the ref down to the real <button>
  }, [])

  return <CustomButton ref={buttonRef}>Click Me</CustomButton>
}
```

```archify
diagrams/react-forwardref.html
```

- By default, function components **cannot** receive a `ref` prop directly (refs aren't passed through like normal props) — `forwardRef` is the explicit mechanism that opts a component into accepting and forwarding one to an inner DOM node or child component.

## Callback Refs

```jsx
class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.setInputRef = (element) => {
      this.inputElement = element // called with the DOM node when mounted, `null` when unmounted
    }
  }

  focusInput = () => this.inputElement && this.inputElement.focus()

  render() {
    return <input ref={this.setInputRef} onFocus={this.focusInput} />
  }
}
```

- Instead of a ref *object*, you pass a **function** — React calls it with the DOM node right after mounting, and calls it again with `null` right before unmounting.
- Useful when you need to run logic exactly at attach/detach time (e.g., registering/unregistering with a third-party library), rather than just reading `.current` later.

## Callback Refs vs findDOMNode()

- `findDOMNode()` is a legacy API for retrieving the DOM node of a class component instance — it's deprecated in React's newer rendering modes (like Concurrent Mode/StrictMode double-invoking) because it doesn't play well with components that don't render exactly one DOM node.
- Callback refs (or `useRef`/`forwardRef`) are the modern, supported replacement — always prefer them over `findDOMNode()`.

## Common Mistake

Reading `ref.current` during the render phase (directly in the component body) instead of inside `useEffect`/a lifecycle method. During the initial render, the DOM node the ref points to doesn't exist yet — `ref.current` is still `null` at that point.

## Summary

`useRef`/`createRef` give direct, imperative access to a DOM node or class instance, read after mounting (typically inside `useEffect`). `forwardRef` is required to let a ref placed on a custom function component reach through to an actual DOM element or nested component. Callback refs offer a function-based alternative that fires precisely at attach/detach time — the modern, recommended replacement for the deprecated `findDOMNode()` API.
