# JWT, OAuth 2.0 and OpenID Connect in Angular Apps

Angular apps almost universally use JWTs as the token format, and OAuth 2.0/OpenID Connect as the protocols that define how those tokens are obtained. Understanding the three together clarifies what Angular is actually doing during "login."

## Short Answer

- **JWT (JSON Web Token)** — a compact, signed token format (`header.payload.signature`) that carries claims (user id, roles, expiry) — Angular decodes it client-side to read claims, but never verifies the signature (that's the server's job).
- **OAuth 2.0** — an authorization framework defining how a client obtains an access token (e.g., Authorization Code flow) without ever handling the user's password.
- **OpenID Connect (OIDC)** — an identity layer on top of OAuth 2.0 that adds an `id_token` (who the user is) alongside the OAuth `access_token` (what the client can call).

## Anatomy of a JWT

```
header.payload.signature
```

```typescript
// Decoding (not verifying!) a JWT client-side to read claims
function decodeJwt(token: string): Record<string, unknown> {
  const payload = token.split('.')[1]
  return JSON.parse(atob(payload))
}

const claims = decodeJwt(accessToken)
console.log(claims['roles'], claims['exp'])
```

- Angular only **reads** claims for UX purposes (showing user name, hiding admin UI) — it must never treat a decoded JWT as verified proof of identity; only the API/auth server that validates the signature can trust it.

## OAuth 2.0 Authorization Code Flow (with PKCE) — the Angular-relevant flow

```archify
diagrams/angular-oauth-pkce.html
```

- SPAs (including Angular) use **Authorization Code + PKCE**, not the legacy Implicit flow — PKCE avoids exposing tokens in the URL and protects against authorization code interception, without requiring a client secret (which can't be kept safe in browser JS anyway).

## OIDC's Two Tokens

| Token | Purpose | Used For |
|---|---|---|
| `id_token` | Proves who the user is | Reading user profile info (name, email) |
| `access_token` | Grants access to a specific API | Sent as `Authorization: Bearer <token>` on API calls |

Angular typically uses the `id_token` to populate the logged-in user's profile display, and attaches the `access_token` to outgoing API requests via an HTTP interceptor.

## Practical Angular Setup

Most Angular apps don't hand-roll OAuth/OIDC — they use a library (`angular-oauth2-oidc`, or `@azure/msal-angular` for Entra ID) that implements the Authorization Code + PKCE flow and exposes simple APIs:

```typescript
this.oauthService.configure(authConfig)
this.oauthService.loadDiscoveryDocumentAndTryLogin()
this.oauthService.initCodeFlow() // starts login redirect
```

## Real-World Example

A line-of-business Angular app integrates with Microsoft Entra ID via `@azure/msal-angular`: MSAL handles the Authorization Code + PKCE redirect flow, stores the resulting `id_token`/`access_token`, and an HTTP interceptor automatically attaches the `access_token` to calls to the company's protected API — the app code never touches raw passwords or manually constructs OAuth requests.

## Summary

JWT is the token *format*; OAuth 2.0 defines how a client *obtains* tokens; OIDC adds an identity layer for *who the user is*. Angular SPAs use the Authorization Code + PKCE flow (usually via a library) to get an `id_token` for identity and an `access_token` to call protected APIs.
