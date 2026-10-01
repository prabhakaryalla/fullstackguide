# TypeScript Fundamentals in React

TypeScript adds compile-time type checking to React components, catching prop mismatches, invalid state shapes, and typos before they become runtime bugs.

## Short Answer

The core things to type in a React + TypeScript app: component props, state, event handlers, refs, and children — each has a standard pattern.

## 1. Typing Props

```tsx
interface ButtonProps {
  label: string
  onClick: () => void
  disabled?: boolean
}

function Button({ label, onClick, disabled = false }: ButtonProps) {
  return <button onClick={onClick} disabled={disabled}>{label}</button>
}
```

- Use an `interface` (or `type`) to describe the exact shape of props; optional props use `?`.
- Avoid `React.FC<Props>` in modern code — it implicitly adds `children` and has awkward generic support; a plain typed function is simpler and clearer.

## 2. Typing State

```tsx
const [count, setCount] = useState(0) // inferred as number

const [user, setUser] = useState<User | null>(null) // explicit generic needed when initial value doesn't reveal the full type
```

- When the initial value doesn't fully describe the type (like `null` before data loads), pass the type explicitly via the generic parameter.

## 3. Typing Children

```tsx
interface CardProps {
  children: React.ReactNode // accepts anything renderable: elements, strings, arrays, null
}

function Card({ children }: CardProps) {
  return <div className="card">{children}</div>
}
```

## 4. Typing Event Handlers

```tsx
function SearchBox() {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} />
    </form>
  )
}
```

- React provides specific event types (`React.ChangeEvent`, `React.MouseEvent`, `React.FormEvent`) parameterized by the target element type.

## 5. Typing Refs

```tsx
const inputRef = useRef<HTMLInputElement>(null)

useEffect(() => {
  inputRef.current?.focus() // optional chaining, since ref.current starts as null
}, [])

return <input ref={inputRef} />
```

## 6. Typing Custom Hooks

```tsx
function useToggle(initial = false): [boolean, () => void] {
  const [value, setValue] = useState(initial)
  const toggle = () => setValue((v) => !v)
  return [value, toggle]
}
```

- Explicitly type the return tuple so consumers get correct positional types (`[boolean, () => void]`), not a widened union.

## 7. Generic Components

```tsx
interface ListProps<T> {
  items: T[]
  renderItem: (item: T) => React.ReactNode
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return <ul>{items.map((item, i) => <li key={i}>{renderItem(item)}</li>)}</ul>
}

<List items={products} renderItem={(p) => <span>{p.name}</span>} /> // T inferred as Product
```

- Generics let a single reusable component (like a `List` or `Table`) stay fully type-safe for whatever data type it's given.

## 8. Discriminated Unions for Variant Props

```tsx
type AlertProps =
  | { variant: 'success'; message: string }
  | { variant: 'error'; message: string; errorCode: number }

function Alert(props: AlertProps) {
  if (props.variant === 'error') {
    return <div>Error {props.errorCode}: {props.message}</div> // errorCode is safely accessible here
  }
  return <div>{props.message}</div>
}
```

- TypeScript narrows the type inside each branch based on the discriminant (`variant`), preventing invalid prop combinations from compiling.

## Real-World Example

A form component types its state with an interface matching the exact fields the API expects, types its `onChange` handlers with `React.ChangeEvent<HTMLInputElement>`, and uses a discriminated union for its validation result (`{ valid: true } | { valid: false; errors: string[] }`) — so accessing `.errors` without first checking `valid === false` is a compile error, not a runtime crash.

## Summary

TypeScript in React comes down to a handful of recurring patterns: typed props/state, React's built-in event types, `useRef` generics, typed custom hook returns, and discriminated unions for variant-based props — together they turn a large class of runtime bugs into compile-time errors.
