# Props vs State

Props and state are both data that drive what a component renders, but they differ in **ownership** and **mutability**: props come from outside and are read-only; state is owned internally and can change.

## Short Answer

| | Props | State |
|---|---|---|
| Owned by | Parent component | The component itself |
| Mutability | Read-only (immutable from child's perspective) | Mutable via setter (`useState`/`setState`) |
| Purpose | Configure/customize a component from outside | Track data that changes over the component's lifetime |
| Triggers re-render | When parent passes new prop values | When the setter is called with a new value |

## Props — Passed From Parent

```tsx
function Greeting({ name }: { name: string }) {
  return <h1>Hello, {name}!</h1>
}

<Greeting name="Alex" /> // parent controls the value
```

- A component **cannot** modify its own props — if it needs to change, the parent must re-render with new props.
- Props flow **one direction**: parent → child.

## State — Owned Internally

```tsx
function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
```

- The component owns and controls its own state.
- Changing state triggers a re-render of that component (and its children).

## How They Interact

```archify
diagrams/react-lifting-state-up.html
```

A common pattern: state lives in a parent, and is passed down as props along with a callback the child can call to request a change ("lifting state up"):

```tsx
function Parent() {
  const [selected, setSelected] = useState<string | null>(null)
  return <List items={items} selected={selected} onSelect={setSelected} />
}

function List({ items, selected, onSelect }: ListProps) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id} onClick={() => onSelect(item.id)} style={{ fontWeight: item.id === selected ? 'bold' : 'normal' }}>
          {item.label}
        </li>
      ))}
    </ul>
  )
}
```

## Common Mistake

Copying a prop into state and treating the state copy as the source of truth:

```tsx
// Anti-pattern — the copy goes stale if `initialValue` prop changes later
function Input({ initialValue }: { initialValue: string }) {
  const [value, setValue] = useState(initialValue)
  // ...
}
```

This is only correct if `initialValue` is truly meant to seed the state once (e.g., a form default) — otherwise prefer deriving the value directly from props during render.

## Real-World Example

A `ProductCard` component receives `product` as a **prop** (it doesn't own or change the product data) but manages its own `isExpanded` **state** to toggle showing the full description — that UI toggle belongs to the card itself, not the parent.

## Summary

Props configure a component from the outside and are read-only from the component's perspective; state is data the component owns and can change over time. Most real UIs combine both: state lives where it's needed, and is passed down as props to render and coordinate child components.
