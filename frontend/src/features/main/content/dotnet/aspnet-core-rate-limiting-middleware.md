# ASP.NET Core Rate Limiting Middleware

Since .NET 7, ASP.NET Core ships built-in rate limiting middleware — no third-party package needed — to protect an API from being overwhelmed by too many requests from a single client, or too much total concurrent load.

## Short Answer

`Microsoft.AspNetCore.RateLimiting` provides four built-in strategies — **Fixed Window**, **Sliding Window**, **Token Bucket**, and **Concurrency** limiters — registered as named policies and applied to endpoints (or globally) via `[EnableRateLimiting("policyName")]`. Which one to pick depends on whether you're protecting against burst traffic, smoothing out request rate over time, or capping concurrent in-flight work.

## Fixed Window

```csharp
builder.Services.AddRateLimiter(options =>
{
    options.AddFixedWindowLimiter("fixed", opt =>
    {
        opt.Window = TimeSpan.FromMinutes(1);
        opt.PermitLimit = 100; // 100 requests per client per 1-minute window
        opt.QueueLimit = 10;   // up to 10 more requests wait instead of being rejected outright
    });
});
```

- Simple to reason about: "100 requests per minute." The catch: requests can burst right at window boundaries — 100 requests in the last second of one window, then another 100 in the first second of the next, means 200 requests in ~1 second even though the limit is "100/minute."

## Sliding Window

```csharp
options.AddSlidingWindowLimiter("sliding", opt =>
{
    opt.Window = TimeSpan.FromMinutes(1);
    opt.SegmentsPerWindow = 6; // splits the window into 6x 10-second segments for smoother counting
    opt.PermitLimit = 100;
});
```

- Smooths out the fixed-window boundary-burst problem by tracking request counts across smaller segments within the window, giving a fairer approximation of "100 per rolling minute" instead of "100 per fixed clock-aligned minute."

## Token Bucket

```csharp
options.AddTokenBucketLimiter("token-bucket", opt =>
{
    opt.TokenLimit = 50;                                  // bucket holds up to 50 tokens
    opt.TokensPerPeriod = 10;                              // refills 10 tokens...
    opt.ReplenishmentPeriod = TimeSpan.FromSeconds(10);     // ...every 10 seconds
});
```

- Allows short bursts (up to the full bucket size) while still enforcing a steady long-term average rate — good for APIs where occasional bursts are legitimate (a user quickly clicking "refresh" a few times) but sustained hammering isn't.

## Concurrency Limiter

```csharp
options.AddConcurrencyLimiter("concurrency", opt =>
{
    opt.PermitLimit = 10; // only 10 requests to this endpoint can be in flight at once
    opt.QueueLimit = 20;
});
```

- Unlike the others (which count requests over time), this caps how many requests can be *simultaneously executing* — ideal for protecting an endpoint that does expensive, slow work (a report generator, a heavy export) from being overwhelmed by concurrent load, regardless of how that load is spread over time.

## Applying a Policy

```csharp
app.UseRateLimiter();

app.MapGet("/api/orders", GetOrders)
   .RequireRateLimiting("sliding");

app.MapPost("/api/reports/export", ExportReport)
   .RequireRateLimiting("concurrency");
```

- Different endpoints can (and usually should) use different policies — a cheap read endpoint tolerates a generous window limiter, while an expensive export endpoint needs a tight concurrency limiter regardless of request rate.

## Partitioning by Client, Not Globally

```csharp
options.AddPolicy("per-user", context =>
    RateLimitPartition.GetSlidingWindowLimiter(
        partitionKey: context.User.Identity?.Name ?? context.Connection.RemoteIpAddress?.ToString() ?? "anonymous",
        factory: _ => new SlidingWindowRateLimiterOptions { Window = TimeSpan.FromMinutes(1), PermitLimit = 100, SegmentsPerWindow = 6 }));
```

A global limit shared across every caller means one aggressive client can exhaust the whole app's quota for everyone else. Partitioning by user ID (or IP for anonymous traffic) gives each caller their own independent bucket — the far more common real-world requirement.

## Common Mistake

Applying a single global rate limit to an entire API and assuming that's "rate limiting done." Without partitioning per client, one misbehaving caller (or a shared NAT/proxy IP with many legitimate users behind it) can consume the entire budget and lock out everyone else.

## Summary

ASP.NET Core's built-in rate limiter offers four strategies: Fixed Window (simple, boundary-burst-prone), Sliding Window (smoother), Token Bucket (allows controlled bursts), and Concurrency (caps simultaneous in-flight work rather than rate over time). Always partition limits per client (user/IP), not globally, or one caller can starve every other legitimate user of the same shared quota.
