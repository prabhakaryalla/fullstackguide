# Controlled vs Uncontrolled Components in React

Form inputs in React can either have their value fully managed by React state (controlled) or managed by the DOM itself, read only when needed via a ref (uncontrolled) — the choice affects validation, real-time UI feedback, and how much boilerplate each field needs.

## Short Answer

A **controlled** component's value is driven entirely by React state — every keystroke updates state via `onChange`, and the input's `value` is always set from that state. An **uncontrolled** component lets the DOM manage its own internal value; React only reads it on demand via a `ref`, closer to traditional HTML form behavior.

## Controlled Component

```jsx
function NameForm() {
  const [name, setName] = useState('')

  const handleChange = (e) => setName(e.target.value.toUpperCase()) // transform on every keystroke

  return (
    <form>
      <input value={name} onChange={handleChange} />
      <p>Uppercase preview: {name}</p>
    </form>
  )
}
```

```archify
diagrams/react-controlled-input.html
```

- React state is the **single source of truth** — the input never has a value React doesn't already know about.
- Enables real-time validation, formatting (like the uppercase transform above), conditionally disabling a submit button, and character counters, all trivially.

## Uncontrolled Component

```jsx
function NameForm() {
  const inputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`Submitted name: ${inputRef.current.value}`) // read the DOM's current value only when needed
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" ref={inputRef} defaultValue="" />
      <button type="submit">Submit</button>
    </form>
  )
}
```

- The DOM manages the input's value internally (like plain HTML) — React doesn't track every keystroke via state; it only reaches in via the `ref` when the value is actually needed (e.g., on submit).
- `defaultValue` (not `value`) sets the *initial* value only — after that, the DOM owns it.

## Comparison

| | Controlled | Uncontrolled |
|---|---|---|
| Source of truth | React state | The DOM itself |
| Real-time validation/formatting | Easy (state updates every keystroke) | Harder (must read the ref to check) |
| Re-renders on every keystroke | Yes | No |
| Boilerplate per field | More (state + handler per field) | Less (just a ref) |
| Good fit for | Forms needing live feedback, conditional logic | Simple forms, file inputs, third-party DOM libraries |

## File Inputs Are Always Uncontrolled

```jsx
function FileUpload() {
  const fileInputRef = useRef(null)

  const handleSubmit = () => {
    const file = fileInputRef.current.files[0]
    console.log(file)
  }

  return <input type="file" ref={fileInputRef} onChange={handleSubmit} />
}
```

- `<input type="file">`'s value is read-only in the DOM for security reasons (JavaScript cannot programmatically set what file is "selected") — so file inputs must always be uncontrolled, accessed via a ref.

## Why Most Guidance Recommends Controlled Components

- A single source of truth (React state) makes the current form value explicit and easy to reason about, test, and drive other UI from (e.g., a live preview elsewhere on the page).
- Uncontrolled components can drift out of sync with anything else in the UI that assumes it knows the current value, since React itself doesn't track it.

## When Uncontrolled Still Makes Sense

- Simple, one-off forms where you only need the value on submit, and no live validation/formatting is needed — avoids unnecessary re-renders on every keystroke.
- Integrating with non-React DOM libraries that expect to manage an input's value themselves.
- File inputs (no choice in the matter, as shown above).

## Summary

Controlled components keep React state as the single source of truth for form values, re-rendering on every change — ideal for live validation, formatting, and UI that reacts to input value in real time. Uncontrolled components let the DOM manage its own state, with React reaching in only via a `ref` when a value is actually needed — simpler for basic forms, and required for file inputs.
