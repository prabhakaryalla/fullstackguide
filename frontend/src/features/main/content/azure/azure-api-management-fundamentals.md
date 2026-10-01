# Azure API Management (APIM)

Azure API Management sits in front of your backend APIs — whether they're Azure Functions, App Services, or something entirely outside Azure — providing a single, governed front door with policies for security, throttling, transformation, and versioning, without touching your backend code.

## Short Answer

APIM lets you import or define APIs, then apply **policies** (XML-based rules evaluated on the inbound/outbound pipeline) for concerns like rate limiting, authentication, request/response transformation, and caching — all enforced at the gateway, in front of whatever backend actually implements the API. It also provides a **Developer Portal** where API consumers can discover, try out, and self-service subscribe to your APIs.

## The Policy Pipeline

```xml
<policies>
  <inbound>
    <rate-limit calls="100" renewal-period="60" /> <!-- throttle before hitting the backend -->
    <validate-jwt header-name="Authorization" failed-validation-httpcode="401">
      <openid-config url="https://login.microsoftonline.com/{tenant}/v2.0/.well-known/openid-configuration" />
    </validate-jwt>
    <set-header name="X-Forwarded-For" exists-action="override">
      <value>@(context.Request.IpAddress)</value>
    </set-header>
  </inbound>
  <backend>
    <forward-request />
  </backend>
  <outbound>
    <set-header name="X-Powered-By" exists-action="delete" /> <!-- strip backend fingerprinting from responses -->
  </outbound>
</policies>
```

- Policies run in four possible sections — **inbound** (before the backend is called), **backend** (controlling how the backend is actually invoked), **outbound** (before the response returns to the caller), and **on-error** (if anything in the pipeline fails).
- This is exactly where cross-cutting concerns belong architecturally: rate limiting, JWT validation, header manipulation, and response shaping all happen at the gateway — the backend API itself stays focused purely on business logic, with zero awareness of these concerns.

## Rate Limiting and Throttling

```xml
<rate-limit-by-key calls="20" renewal-period="60"
    counter-key="@(context.Subscription.Id)" />
```

- `rate-limit` applies globally per API/operation; `rate-limit-by-key` lets you throttle per an arbitrary key (per subscription, per client IP, per user claim) — enabling different rate limits for different tiers of API consumers from the exact same underlying API and backend.

## Response Caching

```xml
<cache-lookup vary-by-header="Accept" downstream-caching-type="none" />
... (backend call happens only on cache miss) ...
<cache-store duration="300" />
```

- APIM can cache backend responses at the gateway, similarly to how API Gateway does in AWS — repeated identical requests are served from cache without invoking the backend at all, reducing both latency and backend load.

## Versioning and Revisions

```
API Version 1: /v1/orders   (existing consumers keep using this)
API Version 2: /v2/orders   (new breaking-change version, existing consumers unaffected)

Revision: a non-breaking change to an existing version (e.g. a bug fix), tracked
          separately so you can roll back a specific revision if it causes issues.
```

- **Versions** are for breaking changes — consumers explicitly choose which version to call, and old versions keep working unchanged while new consumers adopt the new one.
- **Revisions** are for non-breaking changes to an existing version — useful for making (and being able to roll back) small changes without forcing every consumer to migrate to a new version.

## Common Mistake

Implementing rate limiting, JWT validation, or response transformation logic separately inside every individual backend API instead of centralizing it in APIM's policy pipeline — this duplicates cross-cutting logic across every backend, makes it inconsistent between services, and loses APIM's actual value proposition: enforcing these concerns once, centrally, in front of any number of backends.

## Summary

APIM provides a policy-driven gateway in front of your backend APIs, enforcing rate limiting, authentication, caching, and request/response transformation centrally — without any of that logic needing to live in the backend itself. Versions handle breaking API changes explicitly; revisions handle safe, rollback-able non-breaking changes to an existing version.
