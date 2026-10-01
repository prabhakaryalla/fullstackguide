# Implementing Refresh Token Flow in Angular

Access tokens are intentionally short-lived (minutes) to limit damage if stolen. A refresh token flow lets the app silently obtain a new access token without forcing the user to log in again every few minutes.

## Short Answer

Store a long-lived refresh token (ideally in an `HttpOnly` cookie set by the backend); when an API call fails with `401` due to an expired access token, call a refresh endpoint with the refresh token to get a new access token, retry the original request, and only redirect to login if the refresh itself fails.

## The Flow End-to-End

```archify
diagrams/angular-refresh-token.html
```

## Implementation with an HTTP Interceptor

```typescript
export const refreshTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService)
  const router = inject(Router)

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status !== 401 || req.url.includes('/auth/refresh')) {
        return throwError(() => error)
      }

      return authService.refreshAccessToken().pipe(
        switchMap((newAccessToken) => {
          authService.setAccessToken(newAccessToken)
          const retriedReq = req.clone({ setHeaders: { Authorization: `Bearer ${newAccessToken}` } })
          return next(retriedReq)
        }),
        catchError(() => {
          authService.clearSession()
          router.navigate(['/login'])
          return throwError(() => error)
        }),
      )
    }),
  )
}
```

```typescript
@Injectable({ providedIn: 'root' })
export class AuthService {
  private accessToken: string | null = null
  private refreshInFlight$: Observable<string> | null = null

  constructor(private http: HttpClient) {}

  refreshAccessToken(): Observable<string> {
    // Deduplicate concurrent refresh calls triggered by multiple failed requests at once
    if (!this.refreshInFlight$) {
      this.refreshInFlight$ = this.http
        .post<{ accessToken: string }>('/api/auth/refresh', {}, { withCredentials: true })
        .pipe(
          map((res) => res.accessToken),
          tap(() => (this.refreshInFlight$ = null)),
          shareReplay(1),
        )
    }
    return this.refreshInFlight$
  }
}
```

- `withCredentials: true` ensures the browser sends the `HttpOnly` refresh-token cookie with the refresh request.
- The excluding check on `req.url.includes('/auth/refresh')` prevents an infinite retry loop if the refresh call itself returns 401.

## Handling Silent Refresh on App Startup

```typescript
// app.component.ts or an app initializer
export function initializeAuth(authService: AuthService) {
  return () => authService.refreshAccessToken().pipe(catchError(() => of(null))).toPromise()
}
```

- On page reload, the in-memory access token is gone (see Token Storage topic) — attempting a silent refresh on startup using the refresh cookie restores the session without a visible login screen if the refresh token is still valid.

## Common Mistakes

- Not deduplicating simultaneous refresh calls when several requests 401 at the same time — causes a "refresh storm" and can invalidate tokens if the backend rotates refresh tokens on each use.
- Forgetting to exclude the refresh endpoint itself from the 401-retry interceptor logic, causing infinite loops.
- Storing the refresh token in `localStorage` instead of an `HttpOnly` cookie, exposing the longest-lived credential to XSS.

## Real-World Example

A SaaS dashboard keeps users logged in for weeks: the access token lives in memory and expires every 15 minutes; an interceptor transparently refreshes it using the `HttpOnly` refresh cookie whenever a request 401s, and a startup check silently re-authenticates on page reload — the user only sees a login screen if the refresh token itself has expired (e.g., after 30 days of inactivity) or was revoked.

## Summary

A refresh token flow trades a short-lived, easily-replaceable access token for a longer-lived refresh credential kept as safe as possible (`HttpOnly` cookie). An HTTP interceptor detects 401s, silently exchanges the refresh token for a new access token, retries the failed request, and only forces re-login when the refresh token itself is no longer valid.
