# HTTP Idempotent & Safe Methods, and Status Code Reference

Two properties — **safety** and **idempotency** — determine how HTTP methods are expected to behave, and misunderstanding them leads to bugs like duplicate charges on retry or caches serving stale data.

## Short Answer

- **Safe** — the method causes no side effects (doesn't change server state); safe methods are read-only.
- **Idempotent** — making the same request multiple times has the same effect as making it once; repeating it doesn't change the outcome further.
- All safe methods are idempotent, but not all idempotent methods are safe (e.g., `DELETE` changes state but is still idempotent).

## The Method Table

| Method | Idempotent | Safe | Typical Use |
|---|---|---|---|
| `GET` | Yes | Yes | Retrieve a resource |
| `HEAD` | Yes | Yes | Retrieve headers only, no body |
| `OPTIONS` | Yes | Yes | Discover allowed methods/capabilities |
| `PUT` | Yes | No | Create or fully replace a resource |
| `DELETE` | Yes | No | Delete a resource |
| `POST` | No | No | Create a resource, or a non-idempotent action |
| `PATCH` | No | No | Partially update a resource |

## GET — Idempotent and Safe

```http
GET /books/42
```

- Must never alter server state — calling it once or a hundred times returns the same data (assuming nothing else changed it) and causes no side effects.

## PUT — Idempotent, Not Safe

```http
PUT /students/42
{ "name": "Michael Scarn", "college": "Stanford", "major": "computer science", "gpa": "3.9" }
```

- `PUT` requires the **full representation** of the resource — not just the field being changed. Repeating the exact same `PUT` request any number of times results in the same final state.
- Allowing partial `PUT` updates breaks idempotency: two racing partial `PUT`s (one for `gpa`, one for `major`) can retry and interleave in a way that leaves the resource in an inconsistent state depending on network timing — this is exactly why `PUT` must always include every field.

## POST — Not Idempotent

```http
POST /students
{ "name": "Michael Scarn", "college": "Stanford", "major": "computer science" }
```

- Each call is expected to create a **new** resource — calling it twice creates two students, not one, which is why it's non-idempotent by definition.
- `POST` is allowed to perform **partial** updates when used against a specific resource (`POST /students/42 { "gpa": "3.9" }`), unlike `PUT`.

## DELETE — Idempotent, Not Safe

```http
DELETE /students/42
```

- The **state** of the resource on the server is the same after the 1st or the 100th call (deleted) — idempotency is about server state, not the HTTP response code returned.
- It's valid to return `200 OK` on the first successful delete and `404 Not Found` on subsequent calls (since the resource no longer exists) — this does **not** violate idempotency, because the resource's state (deleted) doesn't change further after the first call.

## PATCH — Not Idempotent

```http
PATCH /students/42
{ "gpa": "3.85" }
```

- Designed for **partial** updates and, depending on the patch semantics used (e.g., "increment this field"), can produce a different result each time it's applied — hence not guaranteed idempotent, unlike `PUT`.

```archify
diagrams/dotnet-http-method-safety.html
```

## HTTP Status Code Categories

| Range | Category |
|---|---|
| 100–199 | Informational |
| 200–299 | Success |
| 300–399 | Redirection |
| 400–499 | Client Error |
| 500–599 | Server Error |

## Frequently Used Status Codes

| Code | Meaning |
|---|---|
| `200 OK` | Request succeeded |
| `201 Created` | Request succeeded and a new resource was created |
| `202 Accepted` | Request received but not yet completed (long-running/batch operations) |
| `204 No Content` | Success, no response body (e.g., after a `DELETE`) |
| `301 Moved Permanently` | Resource's URL changed permanently — cacheable |
| `304 Not Modified` | Client's cached version is still valid (used with `ETag`/`If-None-Match`) |
| `400 Bad Request` | Malformed request syntax |
| `401 Unauthorized` | Authentication required or failed |
| `403 Forbidden` | Authenticated, but not permitted to access this resource |
| `404 Not Found` | Resource doesn't exist |
| `405 Method Not Allowed` | The HTTP method isn't supported for this resource |
| `500 Internal Server Error` | Unexpected server-side failure |

## Common Mistake

Assuming `401` and `403` are interchangeable. `401 Unauthorized` means the client isn't authenticated (or credentials are invalid) — the server doesn't know who you are. `403 Forbidden` means the client **is** authenticated, but doesn't have permission for this specific resource/action.

## Summary

Safe methods (`GET`, `HEAD`, `OPTIONS`) never change server state; idempotent methods (`GET`, `HEAD`, `OPTIONS`, `PUT`, `DELETE`) can be retried any number of times without further changing the outcome. `POST` and `PATCH` are neither, which is why clients must be more careful about retries with those methods (e.g., using idempotency keys). Status codes are grouped by intent (2xx success, 4xx client error, 5xx server error), and picking the precise code (`401` vs `403`, `200` vs `201` vs `204`) meaningfully communicates outcome to API consumers.
