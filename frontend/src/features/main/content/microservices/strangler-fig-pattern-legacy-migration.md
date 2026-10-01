# Strangler Fig Pattern for Legacy Migration

Named after a fig vine that gradually grows around a host tree until it can survive on its own, the Strangler Fig pattern migrates a legacy system piece by piece behind a stable façade — instead of a risky "rewrite everything, then cut over all at once" big-bang migration.

## Short Answer

Put a routing façade (a reverse proxy or API Gateway) in front of the legacy system. Build new functionality as new services behind that façade, and route matching requests to the new implementation while everything not yet migrated keeps flowing to the legacy system unchanged. Over time, more and more traffic shifts to new services, until the legacy system handles nothing at all and can be safely retired.

## Why Not Just Rewrite It?

A full rewrite ("big bang" migration) has a well-known, repeated failure mode: it takes far longer than estimated, the business can't pause feature work on the old system for years while the rewrite catches up, and the eventual cutover is a single, high-risk, all-or-nothing event — if the new system has a critical gap, there's no partial rollback, just a full-system outage. Strangler Fig avoids all of this by never having a single risky cutover at all.

## How It Works in Practice

```archify
diagrams/strangler-fig-routing-facade.html
```

```csharp
// The routing façade - decides per-request which system handles it
app.MapReverseProxy(proxyPipeline =>
{
    proxyPipeline.Use(async (context, next) =>
    {
        var path = context.Request.Path;

        if (path.StartsWithSegments("/api/orders")) // already migrated
        {
            context.Request.Headers["X-Route-To"] = "new-orders-service";
        }
        else // not yet migrated - keep going to the legacy monolith
        {
            context.Request.Headers["X-Route-To"] = "legacy-monolith";
        }

        await next();
    });
});
```

1. **Identify a seam** — a bounded piece of functionality (e.g. the `Orders` module) that's relatively self-contained within the legacy system.
2. **Build it as a new service**, following modern architecture practices, with its own data store if the domain boundary allows it.
3. **Route matching requests to the new service** via the façade, while everything else still goes to the legacy system.
4. **Verify in production** — often with a period of running both in parallel (shadow traffic, or a percentage-based rollout) to build confidence before fully committing.
5. **Repeat** for the next module, until the legacy system has nothing left to do.
6. **Decommission the legacy system** — only once it's genuinely handling zero traffic, not before.

## The Hard Part: Data

The trickiest aspect is rarely the routing — it's data. If `Orders` moves to a new service with its own database, but the legacy monolith's `Customers` module still needs order data (e.g. to show "recent orders" on a customer's profile), you need an explicit strategy: the legacy system calls the new service's API, or the new service publishes events the legacy system consumes, or (temporarily) both systems read from a shared database during the transition. This data-ownership question needs a clear answer *before* migrating a module, not as an afterthought once it's already split.

## Common Mistake

Treating the façade as a purely temporary hack and under-investing in it. In practice, the façade often ends up being kept long-term as the system's actual API Gateway — building it properly from the start (good routing, observability, the ability to run new and old in parallel safely) pays off well beyond the migration itself.

## Summary

The Strangler Fig pattern migrates a legacy system incrementally, module by module, behind a routing façade — new functionality is built and proven in production one seam at a time, with the legacy system shrinking gradually rather than being replaced in one high-risk cutover. The data-ownership question for each migrated module is usually the hardest part, not the routing itself.
