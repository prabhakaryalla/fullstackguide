# localStorage vs sessionStorage vs Cookies

The browser gives you three main ways to persist data client-side, and they differ in lifespan, scope, and whether the server automatically sees them — choosing the wrong one is a common source of bugs (e.g., data vanishing unexpectedly, or unnecessary data sent on every request).

## Short Answer

`localStorage` persists indefinitely and is shared across all tabs; `sessionStorage` persists only for one tab and is cleared when that tab closes; cookies persist based on their own expiration and are automatically sent to the server with every matching HTTP request (unlike the other two, which are JS/client-only unless manually sent).

## Comparison

| | localStorage | sessionStorage | Cookies |
|---|---|---|---|
| Lifespan | Until explicitly cleared | Until the tab closes | Set via `Expires`/`Max-Age`, or session-only |
| Scope | Shared across all tabs (same origin) | Isolated per tab | Shared across tabs, sent to matching domain/path |
| Sent to server automatically | No | No | Yes, on every matching request |
| Typical size limit | ~5–10MB | ~5–10MB | ~4KB |
| Access | JavaScript only | JavaScript only | JavaScript (unless `HttpOnly`) + automatically by browser |

## localStorage

```js
localStorage.setItem('theme', 'dark')
localStorage.getItem('theme')    // "dark"
localStorage.removeItem('theme')
localStorage.clear()             // removes everything
```

- Best for data that should persist across browser restarts and be available in every tab: user preferences, cached non-sensitive data, "remember this choice" flags.

## sessionStorage

```js
sessionStorage.setItem('draftId', 'abc123')
sessionStorage.getItem('draftId')
```

- Scoped to a single tab — opening a new tab (even to the same site) starts with empty `sessionStorage`. Useful for data that shouldn't leak across tabs or survive a full browser restart, like a multi-step form's in-progress state.

## Cookies

```js
document.cookie = 'language=en'
document.cookie = 'currency=IN; Max-Age=3600' // expires in 1 hour
console.log(document.cookie) // "language=en; currency=IN"

document.cookie = 'currency=; Max-Age=0' // delete the currency cookie
```

- Cookies are the only one of the three that the **server** can also set (`Set-Cookie` response header) and automatically receives back on subsequent requests to a matching domain/path — this is why cookies (not local/session storage) are used for server-side session identifiers.

### Persistent vs Session Cookies

- **Persistent cookies** — have an explicit `Expires`/`Max-Age`, surviving browser restarts until that date or manual deletion.
- **Session cookies** — no expiration set; cleared automatically when the browser (not just the tab) closes.

### HttpOnly and Security

```
Set-Cookie: sessionId=abc123; HttpOnly; Secure; SameSite=Strict
```

- `HttpOnly` — makes the cookie invisible to JavaScript (`document.cookie` can't read it) — the primary defense against a cookie being stolen via XSS.
- `Secure` — only sent over HTTPS.
- `SameSite` — controls whether the cookie is sent on cross-site requests, mitigating CSRF.

```archify
diagrams/js-cookies-readability.html
```

## Choosing the Right One

- **Need the server to see it automatically on every request?** → Cookie.
- **Need it to survive browser restarts and be shared across tabs, but never sent to the server?** → `localStorage`.
- **Need it scoped to just the current tab/session, and gone afterward?** → `sessionStorage`.

## Common Mistake

Storing sensitive tokens (like a JWT access token) in `localStorage` for convenience — since it's readable by any JavaScript on the page, an XSS vulnerability anywhere in the app exposes it directly. For sensitive session tokens, an `HttpOnly` cookie (immune to JS-based theft) is the safer default.

## Summary

`localStorage` is for durable, cross-tab, JS-only data; `sessionStorage` is the same but scoped to one tab and cleared on close; cookies are the only option the server can set and automatically receive back, making them essential for session management — with `HttpOnly`/`Secure`/`SameSite` flags providing meaningful protection cookies alone can offer against XSS and CSRF.
