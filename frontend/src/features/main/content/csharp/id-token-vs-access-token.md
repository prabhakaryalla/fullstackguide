# What Is ID Token and How It Differs from an Access Token

In OpenID Connect and OAuth 2.0, ID token and access token are different tokens with different purposes.

## Short Answer

- ID token proves who the user is (authentication).
- Access token grants permission to call an API (authorization).

## Key Differences

| Area | ID Token | Access Token |
|:---|:---|:---|
| Main purpose | Authentication | Authorization |
| Intended audience | Client application | Resource API |
| Used by | Frontend/client app | Backend API/resource server |
| Typical content | User identity claims | Scopes/permissions and token metadata |
| Should be sent to API | Usually no | Yes, in Authorization header |

## What Is an ID Token?

ID token is issued by the identity provider after user login.

It usually contains claims like:

- sub (user id)
- name
- email
- iss, aud, exp

Client validates the token and uses claims to identify signed-in user.

## What Is an Access Token?

Access token is meant for APIs.

It tells the API:

- who requested access
- which scopes/permissions were granted
- whether token is still valid

API validates it before returning protected data.

## Example Usage

### Client receives both tokens

```text
id_token=eyJ... (identity token)
access_token=eyJ... (API token)
```

### API call uses access token

```http
GET /orders
Authorization: Bearer access_token_here
```

ID token is not the API credential.

## Common Mistake

Using ID token to call backend APIs.

Why wrong:

- API may reject it because audience is client app, not API.
- Even if accepted by mistake, security boundaries are weakened.

## Validation Focus

For ID token (client side):

- Validate issuer, audience, expiry, nonce (when applicable).

For access token (API side):

- Validate issuer, audience, expiry, signature, scopes/roles.

## Rule of Thumb

- Need user sign-in identity in app: use ID token.
- Need API access: use access token.
- Keep token purpose strict and separate.

## Real-World Analogy

ID token is like an employee ID card that proves who you are.

Access token is like a door access badge that grants entry to specific rooms.

Knowing who you are does not automatically grant access to every room.
