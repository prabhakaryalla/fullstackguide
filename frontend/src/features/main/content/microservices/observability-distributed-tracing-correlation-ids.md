# Observability: Distributed Tracing, Correlation IDs, and Structured Logging

In a monolith, a stack trace tells you almost everything. In a microservices system, a single user request can fan out across a dozen services — without deliberate observability, "why did this request fail" becomes nearly unanswerable.

## Short Answer

Observability in a distributed system rests on three pillars: **structured logs** (machine-parseable, not free-text), **correlation IDs** (one ID that follows a request across every service it touches), and **distributed tracing** (a timeline showing every hop a request made, and how long each one took). In .NET, this is typically implemented with `ILogger` + structured logging (Serilog/`Microsoft.Extensions.Logging`), `Activity`/`ActivitySource` for tracing, and OpenTelemetry to export both to a backend (Jaeger, Application Insights, Grafana Tempo).

## Structured Logging

```csharp
// Bad: free-text logging - hard to search, filter, or aggregate
_logger.LogInformation($"Order {orderId} for customer {customerId} failed: {error}");

// Good: structured logging - each value is a queryable field, not buried in a string
_logger.LogInformation("Order {OrderId} for customer {CustomerId} failed: {Error}",
    orderId, customerId, error);
```

- Structured logging keeps `OrderId`/`CustomerId`/`Error` as separate, indexed fields in your logging backend (Seq, Elasticsearch, Application Insights) — you can query "show me every failure for `CustomerId=42`" instead of grep-ing raw text.
- This alone doesn't solve cross-service visibility — it just makes each individual service's logs genuinely searchable.

## Correlation IDs

```csharp
public class CorrelationIdMiddleware
{
    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        var correlationId = context.Request.Headers.TryGetValue("X-Correlation-Id", out var existing)
            ? existing.ToString()
            : Guid.NewGuid().ToString(); // generate one if this is the first hop

        context.Response.Headers["X-Correlation-Id"] = correlationId;

        using (_logger.BeginScope(new Dictionary<string, object> { ["CorrelationId"] = correlationId }))
        {
            // every log line written during this request now automatically includes CorrelationId
            await next(context);
        }
    }
}

// When calling a downstream service, forward the same ID
httpClient.DefaultRequestHeaders.Add("X-Correlation-Id", correlationId);
```

- A correlation ID is generated (or received) at the very first hop of a request, then forwarded on every downstream call it triggers — every service the request touches logs with that same ID.
- This turns "search every service's logs for `CorrelationId=abc-123`" into a complete, chronological picture of one user's request across the entire system — without it, you're manually correlating timestamps across a dozen unrelated log streams.

## Distributed Tracing

```csharp
private static readonly ActivitySource _activitySource = new("OrdersService");

public async Task<Order> PlaceOrderAsync(PlaceOrderRequest request)
{
    using var activity = _activitySource.StartActivity("PlaceOrder"); // starts a traced "span"
    activity?.SetTag("customer.id", request.CustomerId);

    await _paymentClient.ChargeAsync(request); // this call's own span becomes a CHILD of "PlaceOrder"
    return await _orderRepository.CreateAsync(request);
}
```

- A **trace** represents one end-to-end request; a **span** represents one unit of work within it (a service call, a DB query). Spans nest, forming a tree that shows exactly which calls happened, in what order, and how long each took.
- OpenTelemetry auto-instruments common .NET libraries (`HttpClient`, `EF Core`, ASP.NET Core requests) to create spans automatically, and propagates the trace context (a `traceparent` header) across HTTP calls so spans from different services link into one trace, not several disconnected ones.
- This is what actually answers "which of the 8 services this request touched was the slow one" — a correlation ID alone tells you *that* a request touched 8 services; tracing tells you *where the time went*.

## How the Three Fit Together

| Pillar | Answers |
|---|---|
| Structured logs | "What exactly happened, in detail, in this one service?" |
| Correlation ID | "Which log lines, across every service, belong to this one request?" |
| Distributed trace | "What was the timeline/latency breakdown of this request across every service it touched?" |

## Common Mistake

Adding correlation IDs to logs but never actually forwarding them to downstream service calls — silently breaking the chain at the first hop. Just as common: instrumenting tracing in one service and assuming it "just works" without confirming the trace context (`traceparent` header) is actually propagated by every HTTP client and message broker in the call path.

## Summary

Structured logging makes individual service logs queryable; correlation IDs stitch together every service's logs for one request; distributed tracing adds the timing/dependency picture on top of that. All three are complementary, not substitutes for each other — a mature .NET microservices system typically uses OpenTelemetry to wire up all three consistently across every service, exporting to a shared observability backend.
