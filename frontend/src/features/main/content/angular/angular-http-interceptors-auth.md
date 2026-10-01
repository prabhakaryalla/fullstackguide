# Angular HTTP Interceptors for Authentication

An HTTP interceptor sits between Angular's `HttpClient` and the network, letting you transform every outgoing request and incoming response in one place — the standard mechanism for attaching auth tokens and handling 401 responses globally.

## Short Answer

Register a functional interceptor that adds the `Authorization: Bearer <token>` header to outgoing requests, and catches `401 Unauthorized` responses to trigger a token refresh or redirect to login — without repeating that logic in every service/component that calls the API.

## Attaching the Access Token

```typescript
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService)
  const token = authService.getAccessToken()

  const authReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req

  return next(authReq)
}
```

```typescript
// app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withInterceptors([authInterceptor]))],
}
```

- Every `HttpClient` call automatically carries the token — no need to manually set headers in each service method.

## Handling 401s and Triggering Refresh

```typescript
export const authErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService)
  const router = inject(Router)

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        return authService.refreshToken().pipe(
          switchMap((newToken) => {
            const retriedReq = req.clone({ setHeaders: { Authorization: `Bearer ${newToken}` } })
            return next(retriedReq)
          }),
          catchError(() => {
            authService.logout()
            router.navigate(['/login'])
            return throwError(() => error)
          }),
        )
      }
      return throwError(() => error)
    }),
  )
}
```

## Sequence: Interceptor-Driven Token Refresh

```archify
diagrams/angular-interceptor-refresh.html
```

## Avoiding a Refresh Storm

If multiple requests fail with 401 simultaneously, naively calling `refreshToken()` for each one causes redundant refresh calls. Share a single in-flight refresh:

```typescript
private refreshInProgress$: Observable<string> | null = null

refreshToken(): Observable<string> {
  if (!this.refreshInProgress$) {
    this.refreshInProgress$ = this.http.post<{ accessToken: string }>('/api/auth/refresh', {}).pipe(
      map((res) => res.accessToken),
      tap(() => (this.refreshInProgress$ = null)),
      shareReplay(1),
    )
  }
  return this.refreshInProgress$
}
```

## Common Mistake

Adding the `Authorization` header to **every** outgoing request unconditionally — including calls to third-party/public APIs that shouldn't receive your app's token. Scope the interceptor to only attach tokens for requests matching your own API's base URL.

## Real-World Example

An Angular e-commerce app's interceptor attaches the access token to all calls to `/api/*`, but skips it for calls to a public product-image CDN. When a call returns 401, the error interceptor transparently refreshes the token and retries the original request once — the component that triggered the call never even knows a refresh happened.

## Summary

HTTP interceptors centralize cross-cutting auth concerns: attaching tokens to outgoing requests and reacting to authentication failures (401) with a token refresh-and-retry flow, keeping this logic out of individual components and services.
