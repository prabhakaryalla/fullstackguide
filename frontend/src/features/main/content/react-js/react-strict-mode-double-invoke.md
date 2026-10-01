# React Strict Mode: Why Effects and Renders Double-Invoke

Wrapping part of a tree in `<React.StrictMode>` makes function components render twice and effects mount/unmount/mount again — in development only — specifically to surface bugs caused by code that isn't actually as pure or side-effect-safe as it assumes.

## Short Answer

Strict Mode intentionally double-invokes component function bodies and, since React 18, mounts effects, immediately cleans them up, then mounts them again — all in development builds only, with zero effect on production. This is not a performance regression or a bug in React; it's a deliberate stress test that surfaces bugs that would otherwise only appear later, unpredictably, in production (e.g. under React's concurrent features, or after a future React version starts reusing component state across remounts).

## What Actually Double-Invokes

```tsx
function Counter() {
  console.log('render') // logs TWICE per actual render, in development, under StrictMode

  useEffect(() => {
    console.log('effect mount') // mount → cleanup → mount again, in development, under StrictMode
    return () => console.log('effect cleanup')
  }, [])

  return <div>...</div>
}

<React.StrictMode>
  <Counter />
</React.StrictMode>
```

**Development console output on initial mount:**

```
render
render
effect mount
effect cleanup
effect mount
```

- Component function bodies run twice per render so React can detect logic that isn't a pure function of props/state (e.g. mutating a variable outside the component, or relying on execution order side effects during render).
- Effects run their setup, immediately their cleanup, then setup again, so React can catch effects whose cleanup function doesn't properly undo everything the setup function did — a bug that would otherwise only surface later, e.g. when a component unmounts and remounts due to a key change, tab restore, or a future React feature that pauses/resumes trees.

## Why This Exists: Catching Silent Bugs Early

```tsx
useEffect(() => {
  const subscription = eventBus.subscribe(handleEvent);
  // BUG: forgot to return () => subscription.unsubscribe()
}, [])
```

Without Strict Mode, this leak might not be obvious for a long time — the component simply never re-mounts in your testing, so the missing cleanup never gets exercised. Strict Mode's mount → cleanup → mount cycle forces this exact scenario immediately: if cleanup is missing or wrong, you'll see two active subscriptions instead of one, right away, in development.

## Fixing the Underlying Bug, Not the Symptom

```tsx
useEffect(() => {
  const subscription = eventBus.subscribe(handleEvent);
  return () => subscription.unsubscribe(); // correctly undoes what setup did
}, [])
```

The correct response to seeing double-invocation is almost always to fix the effect so it's properly idempotent (cleanup fully undoes setup) — not to try to detect/suppress the double-invocation itself. A `useRef` flag to "skip the second run" just hides the underlying bug rather than fixing it, and defeats the entire purpose of Strict Mode.

## Common Mistake

Treating double-invocation as a bug in React and writing workarounds (a `didRun` ref, a module-level guard) to suppress it. This masks exactly the class of bug Strict Mode exists to surface — the fix belongs in making the effect properly clean up after itself, not in preventing Strict Mode from running it twice.

## Real-World Example

A component that opens a WebSocket connection in `useEffect` without closing it in the cleanup function works fine without Strict Mode (since the component rarely remounts during casual testing) — but in production, under real usage patterns (fast navigation, tab switching with state preservation, a parent list re-keying its children), the same missing cleanup silently leaks a growing number of open connections over time. Strict Mode catches this exact bug on day one of development instead of during a production incident months later.

## Summary

Strict Mode's double-render and double-effect behavior in development is deliberate: it stress-tests components for hidden impurities and improperly cleaned-up effects that would otherwise only surface unpredictably later. It has zero effect on production builds — if double-invocation reveals a bug, the fix is always to make the affected code properly idempotent, never to suppress the double-invocation itself.
