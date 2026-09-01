# Access Token and Refresh Token in C# Security Flows

Access token and refresh token are both used in OAuth/OpenID flows, but they serve different purposes.

## Quick Difference

- Access token: used to call protected APIs.
- Refresh token: used to get a new access token when old one expires.

## Side-by-Side Comparison

| Area | Access Token | Refresh Token |
|:---|:---|:---|
| Purpose | API authorization | Token renewal |
| Sent to | Resource API | Authorization server token endpoint |
| Lifetime | Short (minutes) | Longer (days/weeks depending on policy) |
| Exposure risk | High impact if leaked | Very high impact if leaked |
| Typical storage | Short-lived in memory/session | Strongly protected secure storage |

## Why Two Tokens?

Short-lived access tokens reduce blast radius if compromised.

Refresh tokens allow seamless re-authentication without forcing user login every few minutes.

## Typical Flow

1. User signs in and app receives access token + refresh token.
2. App calls APIs with access token.
3. Access token expires.
4. App sends refresh token to token endpoint.
5. Server issues new access token (and sometimes rotated refresh token).

## Example Token Refresh Request

```text
POST https://authorization-server.com/token
Content-Type: application/x-www-form-urlencoded

grant_type=refresh_token&
client_id=your_client_id&
refresh_token=refresh_token_value
```

## Example API Call with Access Token

```http
GET /orders
Authorization: Bearer access_token_here
```

## Security Best Practices

- Keep access tokens short-lived.
- Protect refresh tokens carefully (secure storage, never expose in URLs).
- Use refresh token rotation when provider supports it.
- Revoke tokens on logout or suspected compromise.
- Use HTTPS everywhere.

## Common Mistakes

- Sending refresh token to resource API.
- Treating refresh token as long-lived API credential.
- Storing refresh token insecurely in browser local storage for sensitive apps.

## C#-Oriented Practical Tip

In server-side .NET apps, keep refresh tokens encrypted at rest.
In SPA/mobile flows, follow provider guidance for secure client-side storage and token rotation support.

## Real-World Analogy

Access token is a short-term entry pass for a building.

Refresh token is a special renewal card used only at reception to get a new entry pass when the old one expires.
