# useLayoutEffect vs useEffect

Both hooks run a side effect after a render, but `useEffect` runs *after* the browser has painted the screen, while `useLayoutEffect` runs *before* the paint — a timing difference that matters specifically when your effect needs to measure or mutate the DOM before the user sees anything.

## Short Answer

- `useEffect` — fires asynchronously, after the browser has already painted the updated DOM to the screen. The default, correct choice for the vast majority of side effects (data fetching, subscriptions, logging).
- `useLayoutEffect` — fires synchronously, after DOM mutations but *before* the browser paints. Use it only when an effect needs to read layout (size/position) and then synchronously make a DOM change, to avoid a visible flicker.

## The Timing Difference

```tsx
useEffect(() => {
  console.log('useEffect: runs AFTER the browser has painted')
}, [])

useLayoutEffect(() => {
  console.log('useLayoutEffect: runs BEFORE the browser paints')
}, [])
```

- Both run after React has committed changes to the DOM — the difference is entirely about whether the browser gets a chance to paint that DOM to the screen *before* or *after* your effect runs.
- `useLayoutEffect` blocks the browser from painting until it finishes — that's the whole point (it lets you make a DOM adjustment the user never sees a flicker of), but it also means slow work inside `useLayoutEffect` directly delays how soon anything appears on screen.

## Where useEffect Causes a Visible Flicker

```tsx
function Tooltip({ targetRef }) {
  const [position, setPosition] = useState({ top: 0, left: 0 })

  useEffect(() => {
    const rect = targetRef.current.getBoundingClientRect()
    setPosition({ top: rect.bottom, left: rect.left }) // measuring AFTER paint
  }, [])

  return <div style={{ position: 'absolute', ...position }}>Tooltip content</div>
}
```

With `useEffect`, the tooltip first paints at its default `{ top: 0, left: 0 }` position, then — after the browser has already shown that frame — the effect runs, repositions it, and triggers a second render/paint. The user briefly sees the tooltip flash in the wrong spot before it snaps into place.

## The Fix: useLayoutEffect

```tsx
function Tooltip({ targetRef }) {
  const [position, setPosition] = useState({ top: 0, left: 0 })

  useLayoutEffect(() => {
    const rect = targetRef.current.getBoundingClientRect()
    setPosition({ top: rect.bottom, left: rect.left }) // measure and adjust BEFORE paint
  }, [])

  return <div style={{ position: 'absolute', ...position }}>Tooltip content</div>
}
```

Because `useLayoutEffect` runs before the browser paints, the repositioning happens invisibly — the user only ever sees the tooltip already in its correct final position, with no flash of the wrong layout.

## Common Mistake

Defaulting to `useLayoutEffect` "just in case," or because a warning/blog post made it sound safer. Since it blocks painting until it completes, using it for anything slow (data fetching, expensive computation) makes the UI feel measurably less responsive — `useEffect` is the correct default, and `useLayoutEffect` should be reserved specifically for synchronous DOM measurement-and-adjustment to avoid visible flicker.

## Server-Side Rendering Caveat

`useLayoutEffect` produces a console warning when used in a server-rendered component, because there's no DOM/layout to measure during SSR — if a component using it needs to render on the server, either guard it to only run on the client, or use a small `useIsomorphicLayoutEffect` helper that falls back to `useEffect` during SSR.

## Summary

`useEffect` is the default: it never blocks painting, so use it for the overwhelming majority of side effects. `useLayoutEffect` is a narrow-purpose escape hatch for the specific case of measuring the DOM and synchronously adjusting layout before the user ever sees the unadjusted frame — reach for it only when `useEffect` causes a visible flicker, not as a general-purpose alternative.
