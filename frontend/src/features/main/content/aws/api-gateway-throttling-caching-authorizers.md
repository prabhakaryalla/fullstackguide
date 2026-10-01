# API Gateway: Throttling, Caching, and Authorizers

Amazon API Gateway sits in front of your backend (Lambda, HTTP endpoints, or other AWS services) and handles cross-cutting API concerns — request throttling, response caching, and authentication/authorization — so your backend code doesn't have to implement any of it itself.

## Short Answer

**Throttling** protects your backend from being overwhelmed by capping the request rate (and burst capacity) allowed per API, method, or client. **Caching** stores backend responses at the API Gateway layer for a configured TTL, so repeated identical requests are served without hitting your backend at all. **Authorizers** validate and authenticate incoming requests (via a token, IAM credentials, or a custom Lambda function) before the request is ever allowed to reach your backend.

## Throttling

```
Account-level default: 10,000 requests/second, burst of 5,000
Per-API/stage override: 1,000 requests/second, burst of 500
Per-API-key override: 100 requests/second, burst of 50 (for a specific customer's key)
```

- Uses a **token bucket** algorithm: a "steady-state rate" (sustained requests/second) plus a "burst" capacity (a short-term allowance above the steady rate, for brief spikes) — requests exceeding both are rejected with an HTTP `429 Too Many Requests`.
- Can be configured at multiple levels (account default, per-API, per-method, even per-API-key for individual customers on a usage plan) — letting you protect your backend globally while still giving specific high-value clients a higher individual limit.
- This protects your backend (Lambda concurrency limits, database connection limits) from being overwhelmed by a traffic spike — without throttling at the gateway, that spike would hit your backend directly.

## Caching

```
Cache enabled on stage: "prod"
Cache TTL: 300 seconds

GET /products/42
  First request  → cache MISS → backend invoked → response cached
  Next request (within 300s) → cache HIT → served directly, backend never invoked
```

- Reduces both latency (no backend round trip on a cache hit) and backend load (repeated identical requests never reach Lambda/your servers at all).
- Cache keys can include query string parameters and headers — configuring this correctly matters, the same way it does for CloudFront: too broad a cache key fragments the cache and reduces hit rate, too narrow risks serving the wrong cached response for a different request variant.
- API Gateway caching has an ongoing hourly cost based on the cache size selected — it's a deliberate cost/performance trade-off, not free by default.

## Authorizers

```
Lambda Authorizer (custom logic):
  Request → API Gateway → invokes your Authorizer Lambda with the request's token/headers
    → Authorizer validates the token, returns an IAM policy (Allow/Deny) + optional context
    → API Gateway allows or denies the request based on that returned policy

Cognito User Pool Authorizer:
  Request → API Gateway validates the JWT directly against a configured Cognito User Pool
    → no custom Lambda code needed for standard Cognito-issued tokens

IAM Authorization:
  Request must be SigV4-signed with valid AWS credentials that have execute-api permission
```

- A **Lambda Authorizer** gives you full custom control over how a request is authenticated (validate a custom JWT, check an API key against a database, integrate with a third-party auth provider) — at the cost of writing and maintaining that Lambda function yourself.
- A **Cognito Authorizer** handles the common case (validating a JWT issued by AWS Cognito) with zero custom code — the right choice when Cognito is already your identity provider.
- **IAM Authorization** requires callers to sign requests with AWS credentials (SigV4) — appropriate for internal, AWS-to-AWS service calls, not for external, public-facing clients.
- Authorization happens **before** your backend is ever invoked — an unauthorized request never reaches your Lambda function or backend server at all, saving both cost and unnecessary backend load.

## Common Mistake

Enabling caching on an endpoint that returns user-specific or frequently-changing data without properly scoping the cache key (e.g. by user ID or auth token) — this can cause one user's cached response to be served to a completely different user, a serious correctness (and potentially security) bug, not just a performance quirk.

## Summary

API Gateway's throttling protects your backend from traffic spikes via a token-bucket rate limit; caching reduces latency and backend load for repeatable responses (with careful cache-key configuration); and authorizers (Lambda, Cognito, or IAM) validate requests before they ever reach your backend code, keeping authentication/authorization logic centralized at the gateway rather than duplicated across every backend endpoint.
