# Resilience Patterns: Circuit Breaker, Retry, and Bulkhead (Polly)

In a distributed system, remote calls fail — networks drop, downstream services slow down or crash. Resilience patterns like Retry, Circuit Breaker, and Bulkhead, implemented in .NET via the Polly library, keep one failing dependency from cascading into a full outage.

## Short Answer

**Retry** re-attempts a failed call (for transient faults). **Circuit Breaker** stops calling a dependency entirely for a while once it's clearly unhealthy, so you fail fast instead of piling up timeouts. **Bulkhead** limits how many concurrent calls can be in flight to a dependency, so one slow dependency can't exhaust all your threads/connections and take down unrelated calls too. In .NET, [Polly](https://github.com/App-vNext/Polly) implements all three (and more) as composable policies.

## Retry

```csharp
var retryPolicy = Policy
    .Handle<HttpRequestException>()
    .WaitAndRetryAsync(3, attempt => TimeSpan.FromSeconds(Math.Pow(2, attempt))); // exponential backoff: 2s, 4s, 8s

await retryPolicy.ExecuteAsync(() => httpClient.GetAsync("https://payments-api/charge"));
```

- Only retry **transient** faults (timeouts, 5xx responses, connection resets) — retrying a `400 Bad Request` just wastes time and hammers a dependency with a request that will never succeed.
- Use exponential backoff (not a fixed delay) so retries spread out rather than all hitting the dependency again at the same instant — critical when many callers are retrying the same downed dependency simultaneously (the "thundering herd" problem).
- Retry non-idempotent operations (like a payment charge) carefully — see [Idempotency Keys for Safe API Retries](../dotnet/idempotency-key-pattern-apis.md) for how to make retries of a "create" operation safe.

## Circuit Breaker

```csharp
var circuitBreaker = Policy
    .Handle<HttpRequestException>()
    .CircuitBreakerAsync(
        exceptionsAllowedBeforeBreaking: 5,
        durationOfBreak: TimeSpan.FromSeconds(30));

await circuitBreaker.ExecuteAsync(() => httpClient.GetAsync("https://payments-api/charge"));
```

- After 5 consecutive failures, the circuit "opens" — for the next 30 seconds, calls fail immediately (a fast `BrokenCircuitException`) without even attempting the network call.
- This protects **your own service**: without it, every incoming request would independently wait out a full timeout against a dependency that's already known to be down, exhausting your thread pool/connections in sympathy with the outage.
- After the break duration, the circuit goes "half-open" — it allows one trial call through; success closes the circuit again, failure re-opens it.

## Bulkhead Isolation

```csharp
var bulkhead = Policy.BulkheadAsync(maxParallelization: 10, maxQueuingActions: 20);

await bulkhead.ExecuteAsync(() => httpClient.GetAsync("https://slow-reporting-service/export"));
```

- Caps concurrent calls to a specific dependency at 10, queuing up to 20 more before rejecting further calls outright.
- Named after ship bulkheads: if one compartment (dependency) floods, the bulkhead keeps it from sinking the whole ship. Without this, a slow `reporting-service` call could consume every available thread/connection in your app, starving unrelated calls to a healthy `payments-service`.

## Composing Policies Together

```csharp
var resiliencePolicy = Policy.WrapAsync(retryPolicy, circuitBreaker, bulkhead);
await resiliencePolicy.ExecuteAsync(() => httpClient.GetAsync("https://payments-api/charge"));
```

Policies are designed to be layered: retry the call, but let the circuit breaker stop retries entirely once the dependency is clearly down, all while a bulkhead caps how many of these calls can be in flight at once.

## Common Mistake

Adding Retry without a Circuit Breaker. Blind retries against an already-down dependency just delay the inevitable failure while making the outage *worse* — every retrying caller keeps hammering a service that needs time to recover, and consuming resources on your side waiting for those retries. Retry and Circuit Breaker are meant to be used together, not as alternatives.

## Summary

Retry handles brief, transient blips. Circuit Breaker stops a persistently failing dependency from being called at all for a cool-down period, protecting your own service from cascading resource exhaustion. Bulkhead limits blast radius so a slow/failing dependency can't starve calls to unrelated, healthy dependencies. In .NET, Polly (or the built-in `Microsoft.Extensions.Http.Resilience` package on newer versions) implements all three as composable, reusable policies.
