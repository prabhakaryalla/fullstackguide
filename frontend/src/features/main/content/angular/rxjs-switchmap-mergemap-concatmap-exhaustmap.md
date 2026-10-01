# RxJS Operators: switchMap vs mergeMap vs concatMap vs exhaustMap

All four "flattening" operators take an outer observable's emissions and map each one to an inner observable — the difference is entirely about what happens when a new outer emission arrives while a previous inner observable is still active.

## Short Answer

- **switchMap** — cancels the previous inner observable and switches to the new one. Use for "only the latest matters" (search-as-you-type, route param changes).
- **mergeMap** — runs all inner observables concurrently, in parallel, with no cancellation. Use when every request must complete, independent of order (parallel uploads).
- **concatMap** — queues inner observables and runs them strictly one at a time, in order. Use when order matters and requests must not overlap (sequential save operations).
- **exhaustMap** — ignores new outer emissions entirely while an inner observable is still active. Use to prevent duplicate submissions (a submit button that shouldn't double-fire while a request is in flight).

## switchMap: Cancel and Switch

```typescript
searchInput.valueChanges.pipe(
  switchMap(query => this.http.get(`/api/search?q=${query}`))
).subscribe(results => this.results = results)
```

- If the user types "a", then "ab" before "a"'s request finishes, `switchMap` **cancels** the "a" request entirely and only the "ab" request's result is ever emitted.
- This is exactly the right behavior for search-as-you-type: an outdated, in-flight search result for a query the user has already changed away from should never overwrite the current results.

## mergeMap: Run Everything Concurrently

```typescript
fileUploads$.pipe(
  mergeMap(file => this.http.post('/api/upload', file))
).subscribe(result => console.log('Uploaded:', result))
```

- Every inner observable runs to completion, concurrently, with no cancellation — if 5 files are queued for upload, all 5 uploads happen in parallel, and all 5 results eventually emit (in whatever order they actually complete, not necessarily the order they started).
- The wrong choice when order matters or when starting too many concurrent operations could overwhelm a backend — `mergeMap` has an optional concurrency-limit parameter for exactly that case.

## concatMap: Strictly Sequential, In Order

```typescript
saveRequests$.pipe(
  concatMap(change => this.http.post('/api/save', change))
).subscribe(result => console.log('Saved:', result))
```

- Each inner observable only starts once the *previous* one has fully completed — guaranteeing both strict ordering and that only one request is ever in flight at a time.
- The right choice when operations must not overlap and must happen in the exact order they were triggered (e.g. sequential auto-save requests, where saving "version 2" before "version 1" has finished would risk data loss or an inconsistent final state).

## exhaustMap: Ignore New Emissions While Busy

```typescript
submitButton.click.pipe(
  exhaustMap(() => this.http.post('/api/submit', formData))
).subscribe(result => console.log('Submitted:', result))
```

- While a submission is in flight, any further clicks are **completely ignored** — not queued (like `concatMap`), not cancelled-and-replaced (like `switchMap`), just dropped entirely until the current inner observable completes.
- The right choice for "prevent double-submit" scenarios — a user rapidly clicking a submit button should trigger exactly one request, with every extra click while that request is pending simply having no effect.

## Choosing the Right One

| Scenario | Right Operator | Why |
|---|---|---|
| Search-as-you-type | `switchMap` | Only the latest query's result matters; stale ones should be cancelled |
| Parallel file uploads | `mergeMap` | Every upload must complete; order/overlap doesn't matter |
| Sequential auto-save | `concatMap` | Order matters, and saves must never overlap |
| Prevent double form submission | `exhaustMap` | Extra clicks while a request is in flight should be ignored entirely |

## Common Mistake

Defaulting to `mergeMap` for everything (since it's often the first one people learn) without considering whether concurrent, unordered execution is actually correct for the use case — using `mergeMap` for a search box means old, slow requests can "win the race" and overwrite newer results with stale data, exactly the bug `switchMap` exists to prevent.

## Summary

All four operators flatten an outer observable's emissions into inner observables — they differ purely in **concurrency and cancellation behavior**: `switchMap` cancels-and-replaces, `mergeMap` runs everything in parallel, `concatMap` runs everything strictly in order one at a time, and `exhaustMap` ignores new emissions while busy. Picking the wrong one produces code that "mostly works" but fails under exactly the conditions (fast typing, rapid clicking, out-of-order responses) that expose the mismatch.
