# HOCs vs Render Props vs Custom Hooks

React has gone through several generations of "how do I share stateful logic between components" — Higher-Order Components, then Render Props, and finally Hooks. Understanding why each replaced the last is a common senior-level interview topic, since all three patterns still show up in real, older codebases.

## Short Answer

All three solve the same problem — reusing stateful logic without duplicating it — but differ in *how* that logic is delivered to a component. HOCs wrap a component in another component that injects props. Render Props pass a function as a prop that receives the shared state and returns JSX. Hooks let you extract logic into a plain function, called directly inside a component, with no wrapping or nesting at all.

## Higher-Order Components (HOCs)

```tsx
function withMousePosition(WrappedComponent) {
  return function EnhancedComponent(props) {
    const [position, setPosition] = useState({ x: 0, y: 0 })

    useEffect(() => {
      const handler = (e) => setPosition({ x: e.clientX, y: e.clientY })
      window.addEventListener('mousemove', handler)
      return () => window.removeEventListener('mousemove', handler)
    }, [])

    return <WrappedComponent {...props} mousePosition={position} />
  }
}

const MouseAwareComponent = withMousePosition(MyComponent)
```

- A function that takes a component and returns a new, "enhanced" component — the shared logic lives in the wrapper, injected as extra props.
- **Downsides:** prop name collisions between multiple HOCs wrapping the same component are hard to track down; deeply nested `withA(withB(withC(MyComponent)))` chains create "wrapper hell" in React DevTools, making the component tree hard to read; and it's not always obvious, just from reading `MyComponent`, which props come from a HOC versus from its actual parent.

## Render Props

```tsx
function MousePosition({ render }) {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handler = (e) => setPosition({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  return render(position)
}

<MousePosition render={(position) => <div>{position.x}, {position.y}</div>} />
```

- Instead of injecting props via a wrapper component, the shared logic component calls a function prop (`render`, or sometimes `children` as a function) with the current state, letting the caller decide what JSX to produce from it.
- **Downsides:** deeply nested render props (`<A>{a => <B>{b => <C>{c => ...}}</B>}</A>`) create the same kind of unreadable nesting HOCs do, just expressed as JSX indentation instead of component wrapping — informally called "callback hell" for JSX.

## Custom Hooks: The Modern Replacement

```tsx
function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handler = (e) => setPosition({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  return position
}

function MyComponent() {
  const position = useMousePosition() // no wrapping, no nesting, no injected/renamed props
  return <div>{position.x}, {position.y}</div>
}
```

- The exact same shared logic, extracted into a plain function — called directly, at the top of the component that needs it, with a normal variable assignment.
- No wrapper components in the tree (nothing shows up in React DevTools except `MyComponent` itself), no prop name collisions (you choose the local variable name yourself), and multiple hooks compose trivially by just calling several of them in the same component — no nesting at all, unlike stacking multiple HOCs or render props.

## Why Hooks Won

Hooks solve the exact same reuse problem as HOCs and Render Props, but without introducing extra components into the tree, without indirection through injected/renamed props, and without any nesting — logic composition becomes as simple as calling multiple functions in sequence. This is why hooks became the default recommendation the moment they were introduced, and why HOCs/Render Props are now mostly seen in older codebases or specific library APIs (e.g. some routing libraries' legacy render-prop-based components) rather than in new code.

## Common Mistake

Assuming HOCs and Render Props are "wrong" or deprecated. They're not broken — they still work exactly as before — they're simply superseded by a strictly more ergonomic pattern for the vast majority of use cases. Recognizing them in an existing codebase (and being able to explain *why* a team might migrate one to a custom hook) is the actual interview-relevant skill, since plenty of real-world code still uses them.

## Summary

HOCs share logic by wrapping components and injecting props; Render Props share logic by passing a function that receives shared state and returns JSX; Hooks share logic as plain, directly-called functions with no wrapping or nesting at all. All three solve the same underlying reuse problem — hooks just solve it with the least indirection and the best composability, which is why they're the default choice in modern React code.
