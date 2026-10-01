# Token Storage in Angular: Local Storage vs Session Storage vs Cookies

Where you store a JWT after login affects both security (XSS/CSRF exposure) and behavior (does the session survive a tab close, a new tab, a browser restart?). This choice matters more than most Angular developers initially assume.

## Short Answer

| Storage | Survives Tab Close | Shared Across Tabs | Vulnerable To | Sent Automatically on Requests |
|---|---|---|---|---|
| `localStorage` | Yes | Yes | XSS (readable by any JS on the page) | No (must attach manually via interceptor) |
| `sessionStorage` | No (cleared on tab close) | No (per-tab) | XSS | No (must attach manually) |
| HttpOnly Cookie | Depends on expiry | Yes | CSRF (mitigated with SameSite/CSRF tokens) | Yes (browser attaches automatically) |

## localStorage

```typescript
localStorage.setItem('access_token', token)
const token = localStorage.getItem('access_token')
```

- Persists across browser restarts and is shared across all tabs — convenient for "stay logged in" behavior.
- **Risk**: any JavaScript running on the page (including injected via an XSS vulnerability) can read it. If your app has any XSS hole, tokens in `localStorage` are directly stealable.

## sessionStorage

```typescript
sessionStorage.setItem('access_token', token)
```

- Scoped to a single tab and cleared when that tab closes — reduces the window of exposure compared to `localStorage`, but still readable by any script on the page (same XSS risk).
- Not shared across tabs — opening a new tab means logging in again, which can be a UX downside.

## HttpOnly Cookies

- The most secure option **against XSS**: an `HttpOnly` cookie cannot be read by JavaScript at all — only the browser can attach it to requests automatically.
- Requires the backend to set the cookie (`Set-Cookie: token=...; HttpOnly; Secure; SameSite=Strict`) rather than the Angular app storing it explicitly.
- Introduces **CSRF risk** instead (since the browser sends cookies automatically to matching domains) — mitigated with `SameSite=Strict/Lax` and/or an anti-CSRF token pattern.

```archify
diagrams/angular-token-storage.html
```

## Practical Recommendation

- For most SPAs: store the short-lived **access token** in memory (a service field, not persisted storage) — it's lost on refresh but that's fine since a refresh token flow re-obtains it.
- Store the **refresh token** in an `HttpOnly`, `Secure`, `SameSite=Strict` cookie set by the backend — this way, no JavaScript (including malicious injected scripts) can ever read it.
- Avoid `localStorage` for tokens if the app has any risk of rendering untrusted content (rich text, user-generated HTML) — that's exactly where XSS gets in.

```typescript
@Injectable({ providedIn: 'root' })
export class AuthService {
  private accessToken: string | null = null // in-memory only, not persisted storage

  setAccessToken(token: string) {
    this.accessToken = token
  }

  getAccessToken(): string | null {
    return this.accessToken
  }
}
```

## Real-World Example

A banking Angular app keeps the access token only in an in-memory service field (cleared on refresh, forcing a silent re-auth via the refresh-token cookie), while the long-lived refresh token lives in an `HttpOnly` cookie the Angular app never touches directly — protecting the session even if an XSS vulnerability were somehow introduced.

## Summary

`localStorage`/`sessionStorage` are convenient but fully exposed to XSS since any script can read them; `HttpOnly` cookies protect against XSS but need CSRF mitigations. The safer pattern for sensitive apps is: access token in memory only, refresh token in an `HttpOnly` cookie — trading some implementation complexity for meaningfully reduced token-theft risk.
