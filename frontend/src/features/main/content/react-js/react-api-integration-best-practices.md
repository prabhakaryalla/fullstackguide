# How to Handle API Integration

Calling an API from a React app involves more than a `fetch` call in a `useEffect` — real applications need consistent loading/error handling, caching, cancellation, and a clear separation between data-fetching logic and UI.

## Short Answer

- Centralize API calls in a dedicated layer (service/client functions), not scattered `fetch` calls inside components.
- Use a data-fetching library (TanStack Query/SWR) for caching, retries, and request deduplication instead of hand-rolled `useEffect` fetches.
- Always handle three states explicitly: loading, error, and success.
- Cancel in-flight requests when a component unmounts or inputs change (avoid race conditions / "setting state on an unmounted component").

## 1. Centralize the API Layer

```tsx
// api/productsApi.ts
export async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`/api/products/${id}`)
  if (!res.ok) throw new Error(`Failed to fetch product ${id}`)
  return res.json()
}
```

- Components call `getProduct(id)`, not raw `fetch` — keeps URL construction, headers, and error handling in one place, and makes it easy to swap the underlying HTTP client.

## 2. Use a Data-Fetching Library

```tsx
import { useQuery } from '@tanstack/react-query'

function ProductDetails({ id }: { id: string }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProduct(id),
  })

  if (isLoading) return <Spinner />
  if (error) return <ErrorMessage error={error} />
  return <ProductCard product={data!} />
}
```

Benefits over manual `useEffect` + `useState`:

- Automatic caching and deduplication (two components requesting the same data share one request).
- Built-in retry/backoff and refetch-on-focus behavior.
- Cancels stale requests automatically when the query key changes.

## 3. Handle Loading, Error, and Success States Explicitly

```archify
diagrams/react-api-state-machine.html
```

- Never assume the happy path — always render a distinct UI for errors (with a retry option) and loading (skeleton/spinner) states.

## 4. Cancel Requests to Avoid Race Conditions

```tsx
useEffect(() => {
  const controller = new AbortController()

  fetch(`/api/search?q=${query}`, { signal: controller.signal })
    .then((res) => res.json())
    .then(setResults)
    .catch((err) => {
      if (err.name !== 'AbortError') setError(err)
    })

  return () => controller.abort() // cancel if `query` changes again or component unmounts
}, [query])
```

Without cancellation, a slow earlier request can resolve **after** a newer one and overwrite fresher data with stale results.

## 5. Type the API Response

```tsx
interface Product {
  id: string
  name: string
  price: number
}

async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`/api/products/${id}`)
  return res.json() as Promise<Product>
}
```

- TypeScript catches mismatches between what the API returns and what components expect at compile time, rather than at runtime.

## 6. Centralize Error Handling and Auth

- Use a shared `fetch`/`axios` wrapper to attach auth tokens and handle common error codes (401 → redirect to login, 500 → generic error toast) in one place instead of repeating logic per call.

```tsx
const apiClient = axios.create({ baseURL: '/api' })
apiClient.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${getToken()}`
  return config
})
apiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) redirectToLogin()
    return Promise.reject(err)
  },
)
```

## Real-World Example

A product search page uses TanStack Query with a debounced search term as the query key — typing triggers a new query only after the user pauses, previous in-flight requests are automatically cancelled by the library, results are cached so navigating back shows instant data, and a shared Axios instance handles auth token attachment and 401 redirects globally.

## Summary

Solid API integration means separating fetch logic from components, explicitly handling loading/error/success states, avoiding race conditions with cancellation, and leaning on a data-fetching library for caching and deduplication rather than reinventing it with ad hoc `useEffect` calls.
