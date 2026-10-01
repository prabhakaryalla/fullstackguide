# Code Splitting and Lazy Loading

By default, a bundler ships your entire app as one (or a few) JavaScript bundles — users download code for pages/features they may never visit. Code splitting breaks the bundle into smaller chunks that load **on demand**.

## Short Answer

- **Code splitting** — breaking the app bundle into smaller chunks instead of one large file.
- **Lazy loading** — loading a chunk only when it's actually needed (e.g., when a route is visited).
- In React, this is done with `React.lazy` + dynamic `import()`, combined with `<Suspense>` to show a fallback while the chunk loads.

## Route-Based Code Splitting

The most common and highest-impact place to split — most users never visit every route in one session.

```tsx
import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

const Dashboard = lazy(() => import('./pages/Dashboard'))
const Settings = lazy(() => import('./pages/Settings'))

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Suspense>
  )
}
```

```archify
diagrams/react-code-splitting-routes.html
```

## Component-Level Lazy Loading

Useful for heavy components that aren't needed immediately (modals, charts, rich text editors):

```tsx
const HeavyChartModal = lazy(() => import('./HeavyChartModal'))

function Dashboard() {
  const [showChart, setShowChart] = useState(false)
  return (
    <>
      <button onClick={() => setShowChart(true)}>Show Chart</button>
      {showChart && (
        <Suspense fallback={<Spinner />}>
          <HeavyChartModal />
        </Suspense>
      )}
    </>
  )
}
```

- The charting library's JS only downloads when the user actually opens the modal.

## How the Browser/Bundler Loads Chunks

```archify
diagrams/react-code-splitting-component.html
```

## Preloading for Better UX

To avoid a loading flicker on predictable navigation, preload a chunk before it's strictly needed (e.g., on hover over a nav link):

```tsx
function NavLink() {
  return (
    <a
      href="/settings"
      onMouseEnter={() => import('./pages/Settings')} // starts fetching early
    >
      Settings
    </a>
  )
}
```

## Common Mistakes

- Splitting too aggressively (every tiny component) — adds network round-trips and overhead without real benefit.
- Forgetting `<Suspense>` around a `lazy` component — causes a runtime error when the chunk hasn't loaded yet.
- Not handling load failures (e.g., a chunk fails to fetch after a deploy) — wrap lazy routes in an error boundary to show a retry/reload prompt.

## Real-World Example

A large admin portal has 30+ pages, but a given user typically visits 2-3 per session. Route-based code splitting keeps the initial bundle small (fast first load), while each page's code downloads only when navigated to — cutting initial load time significantly compared to one monolithic bundle.

## Summary

Code splitting breaks a large bundle into smaller, independently loadable chunks; lazy loading defers fetching those chunks until they're actually needed. In React, `React.lazy` + `<Suspense>` (usually paired with route-based splitting) is the standard way to keep initial load fast without sacrificing functionality.
