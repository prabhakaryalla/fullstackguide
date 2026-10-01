# SSR and Hydration Mismatches

Server-Side Rendering sends the browser fully-formed HTML instead of an empty shell, but React still needs to "hydrate" that HTML — attaching event handlers and reconciling it with what client-side rendering would have produced. When the server and client render different output for the same component, hydration fails, and React has to decide what to do about the mismatch.

## Short Answer

SSR renders a component to an HTML string on the server, which the browser displays immediately (fast first paint, good for SEO). React then **hydrates** that HTML on the client — walking the existing DOM and attaching event listeners/internal fiber state to it, rather than throwing it away and re-rendering from scratch. If the client's render output doesn't match what the server actually sent, React logs a hydration mismatch warning and, in most cases, discards the mismatched DOM and re-renders it client-side — losing the fast-first-paint benefit for that part of the tree, and potentially causing a visible flash of different content.

## Why Hydration Exists

```
Server: renders <Component /> → HTML string → sent to browser → displayed immediately
Client: React "hydrates" that same HTML → attaches event handlers, becomes fully interactive
```

Without hydration, the client would have to re-render everything from scratch and swap it in, discarding the server's HTML entirely — defeating the whole point of SSR (fast, already-visible content). Hydration's entire value proposition depends on the client's render output matching the server's exactly, so React can reuse the existing DOM nodes instead of replacing them.

## Common Causes of Hydration Mismatches

**1. Browser-only APIs used during render**

```tsx
function Greeting() {
  // window doesn't exist on the server - this either throws during SSR,
  // or (if guarded) produces different output server vs client
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  return <div>{isMobile ? 'Mobile view' : 'Desktop view'}</div>
}
```

The server has no `window`, so it can't know the real viewport width — whatever it guesses (or defaults to) will likely disagree with what the client determines once actually running in a browser.

**2. Non-deterministic values computed during render**

```tsx
function Timestamp() {
  return <div>{new Date().toISOString()}</div> // server's "now" and client's "now" are milliseconds apart
}

function RandomId() {
  return <div id={Math.random()}>...</div> // different random value each time this runs
}
```

Anything that depends on the current time, `Math.random()`, or other non-deterministic sources will almost certainly produce different output between the server render and the client's hydration render.

**3. Environment-dependent formatting**

```tsx
// Server and client can have different locale/timezone configuration,
// producing different formatted output for the exact same underlying Date value
<div>{date.toLocaleString()}</div>
```

## The Fix: Defer Client-Only Rendering Until After Hydration

```tsx
function Greeting() {
  const [isMobile, setIsMobile] = useState(false) // matches server's default on first render

  useEffect(() => {
    setIsMobile(window.innerWidth < 768) // only runs on the client, AFTER hydration completes
  }, [])

  return <div>{isMobile ? 'Mobile view' : 'Desktop view'}</div>
}
```

- On the very first render (both server and the client's initial hydration pass), `isMobile` is `false` on both sides — output matches, hydration succeeds cleanly.
- The `useEffect` then runs (client-only, after hydration), updates the state, and triggers a normal client-side re-render to the correct value. There's a brief moment where the initial guess might be visually wrong, but hydration itself doesn't fail or discard DOM nodes.

## Common Mistake

Wrapping a mismatch-prone value in `typeof window !== 'undefined'` checks directly during render, assuming that "fixes" the problem. It doesn't — the server still renders one branch (since `window` is always undefined there) and the client, on its *very first* hydration render, is still rendering to match that same server output, so a naive conditional like this doesn't actually resolve anything until a *subsequent* render — which is exactly what `useEffect` + state achieves properly.

## Summary

Hydration only works cleanly when the client's initial render output exactly matches what the server sent. Common causes of mismatch are browser-only APIs, non-deterministic values (time, randomness), and locale/timezone-dependent formatting evaluated during render. The fix is to render a server-safe default on the first pass, then update to the real client-only value inside a `useEffect` (which only ever runs on the client, after hydration has already succeeded), rather than trying to branch on `window` availability directly during render.
