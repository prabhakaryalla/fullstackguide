# Static Fields and "Warm" Instance Reuse in Azure Functions

Azure Functions look stateless from the outside — but under the hood, the same process (and the same static fields) can be reused across many separate invocations, and not knowing this causes a genuinely common class of production bugs.

## The Trap

```csharp
public static class OrderCounterFunction
{
    private static int _requestCount = 0; // looks "per invocation" - it is NOT

    [FunctionName("CountRequests")]
    public static IActionResult Run(
        [HttpTrigger(AuthorizationLevel.Function, "get")] HttpRequest req, ILogger log)
    {
        _requestCount++;
        log.LogInformation($"This instance has handled {_requestCount} requests");
        return new OkObjectResult(_requestCount);
    }
}
```

**What most people expect:** each HTTP call is a fresh, independent invocation, so `_requestCount` should always be `1`.

**What actually happens:** as long as the same underlying instance keeps getting reused ("warm"), `_requestCount` keeps incrementing across calls — `1`, `2`, `3`, ... — because `static` fields belong to the process, not to a single invocation.

## Why This Happens

- Azure Functions doesn't spin up a brand-new process for every single invocation — for performance, the same worker process (and everything static in it) is reused for the next invocation whenever possible, and only replaced with a genuinely new instance during a cold start or when scaling out to a new instance.
- A `static` field in .NET is scoped to the process/AppDomain, not to any single method call — so it persists across every invocation handled by that same warm instance, exactly like a `static` field in any long-running application would.
- This is completely invisible in local testing with a single request at a time — the bug only becomes obvious once real traffic causes the same instance to handle many sequential (or even concurrent) requests.

## Where This Is Actually the Right Tool

```csharp
private static readonly HttpClient _httpClient = new HttpClient(); // deliberately reused across invocations

[FunctionName("CallExternalApi")]
public static async Task<IActionResult> Run(
    [HttpTrigger(AuthorizationLevel.Function, "get")] HttpRequest req)
{
    var response = await _httpClient.GetAsync("https://example.com/api");
    return new OkObjectResult(await response.Content.ReadAsStringAsync());
}
```

Reusing a `static HttpClient` (or a database connection pool, or an expensive-to-construct SDK client) across warm invocations is a genuinely **recommended** pattern — it's the exact same reasoning as `IHttpClientFactory` in ASP.NET Core: avoiding the cost of re-creating an expensive resource on every single call. The trap isn't "static fields are bad" — it's specifically **mutable, per-request state** stored in a static field, which silently leaks across what should be independent invocations.

## Common Mistake

Assuming Azure Functions guarantees full isolation between every single invocation, the way a brand-new process would. It doesn't — warm instance reuse is a deliberate performance optimization, and any mutable static state needs to be treated exactly as carefully as a static field in a long-running web application, because that's effectively what a warm Function instance is.

## Summary

Static fields in an Azure Function persist across every invocation handled by the same warm instance — a real, useful optimization for expensive, reusable, *immutable* resources (an `HttpClient`, a connection pool), but a subtle bug source the moment mutable, per-request state (a counter, a cache that should reset per call) is stored the same way. Never assume "this only runs once per request" for anything stored in a static field.
