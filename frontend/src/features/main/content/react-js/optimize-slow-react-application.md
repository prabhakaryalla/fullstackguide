# How to Optimize a Slow React Application

Diagnosing a slow React app isn't guesswork — it's a systematic process: profile first to find where time is actually spent, then apply the targeted fix for that specific bottleneck (rendering, bundle size, or data fetching).

## Short Answer

1. Profile with React DevTools Profiler and browser performance tools before changing anything.
2. Fix rendering issues (unnecessary re-renders, expensive computations) with `memo`/`useMemo`/`useCallback` and better component boundaries.
3. Fix bundle-size/load issues with code splitting, lazy loading, and tree-shaking unused dependencies.
4. Fix data-fetching issues with caching, pagination, and avoiding waterfalls.
5. Virtualize long lists instead of rendering thousands of DOM nodes.

## 1. Profile Before Optimizing

```archify
diagrams/react-diagnose-slow-app.html
```

- The React DevTools **Profiler** tab records which components rendered, how long each took, and why (props/state/context change).
- The browser's **Performance** tab shows script execution, layout, and paint time — useful for spotting long tasks blocking the main thread.

## 2. Rendering Fixes

- Wrap expensive/pure components in `React.memo`.
- Memoize expensive derived values with `useMemo`; stabilize callbacks passed to memoized children with `useCallback`.
- Move fast-changing state down into the smallest component that needs it (see "Prevent Unnecessary Re-renders" topic).
- Avoid creating new object/array/function literals inline as props to memoized children.

## 3. Bundle Size Fixes

```tsx
const ReportsPage = lazy(() => import('./ReportsPage')) // don't ship it until needed
```

- Route-based code splitting (`React.lazy` + `Suspense`) so users only download what they visit.
- Analyze the bundle (`vite-bundle-visualizer`, `source-map-explorer`) to find unexpectedly large dependencies.
- Replace heavy libraries with lighter alternatives where the full feature set isn't needed (e.g., a large date library for one date-formatting call).

## 4. Virtualize Long Lists

Rendering thousands of DOM nodes at once is a common slow-down — render only what's visible in the viewport:

```tsx
import { FixedSizeList } from 'react-window'

<FixedSizeList height={600} itemCount={items.length} itemSize={48} width="100%">
  {({ index, style }) => <div style={style}>{items[index].name}</div>}
</FixedSizeList>
```

## 5. Data Fetching Fixes

```archify
diagrams/react-fetch-waterfall.html
```

- Avoid **fetch waterfalls** — start independent requests in parallel instead of one component waiting on another before it even starts fetching.
- Cache and dedupe requests with a data-fetching library (React Query/TanStack Query, SWR) instead of manual `useEffect` fetches scattered across components.
- Paginate or lazy-load large datasets instead of fetching everything upfront.
- Debounce search/filter inputs so you're not firing a request per keystroke.

## 6. Avoid Blocking the Main Thread

- Break up expensive synchronous computations (large sorts/filters/transformations) or move them to a Web Worker if they block interactivity.
- Use `startTransition`/`useDeferredValue` (React 18+) to mark non-urgent updates (like filtering a large list) as lower priority than urgent ones (like typing in the input itself).

```tsx
const deferredQuery = useDeferredValue(query)
const results = useMemo(() => filterLargeList(deferredQuery), [deferredQuery])
```

## Real-World Example

A dashboard rendering a 5,000-row table felt sluggish while typing in a filter box. Profiling showed the entire table re-rendering on every keystroke. The fix: virtualize the table with `react-window`, wrap rows in `React.memo`, and use `useDeferredValue` for the filter text — typing became instant while the filtered table updated shortly after.

## Summary

Optimizing a slow React app starts with profiling to identify the actual bottleneck — rendering, bundle size, or data fetching — then applying the matching fix: memoization and better component boundaries for renders, code splitting for bundle size, virtualization for long lists, and caching/parallelization for data fetching.
