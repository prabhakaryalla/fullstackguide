# ASP.NET Core Middleware Pipeline: Use, Run, and Map

ASP.NET Core handles every HTTP request through a pipeline of middleware components, each able to inspect/modify the request, pass control to the next component, and inspect/modify the response on the way back out.

## Short Answer

- **`Run`** — adds a *terminal* middleware; it doesn't call anything after it, ending the pipeline.
- **`Use`** — adds middleware that can run code both before and after calling `next()`, continuing the pipeline.
- **`Map`/`MapWhen`** — branches the pipeline based on the request path or a custom predicate, building a separate sub-pipeline for matching requests.
- Middleware order is significant — components execute in the exact order they're registered.

## Run — Terminal Middleware

```csharp
app.Run(async context =>
{
    await context.Response.WriteAsync("Hello World!");
});
```

- `Run` accepts a `RequestDelegate` and never calls anything further — any middleware registered after a `Run` call is unreachable.

## Use — Pipeline Middleware

```csharp
app.Use(async (context, next) =>
{
    await context.Response.WriteAsync("Middleware 1 - Incoming\n");
    await next(); // passes control to the next middleware
    await context.Response.WriteAsync("Middleware 1 - Outgoing\n");
});

app.Use(async (context, next) =>
{
    await context.Response.WriteAsync("Middleware 2 - Incoming\n");
    await next();
    await context.Response.WriteAsync("Middleware 2 - Outgoing\n");
});

app.Run(async context => await context.Response.WriteAsync("Terminal handler\n"));
```

**Output:**

```
Middleware 1 - Incoming
Middleware 2 - Incoming
Terminal handler
Middleware 2 - Outgoing
Middleware 1 - Outgoing
```

```archify
diagrams/dotnet-middleware-pipeline.html
```

- This nested, "onion-like" execution order (incoming requests flow inward, responses flow back outward) is the defining characteristic of the middleware pipeline.

## Map — Branching by Path

```csharp
app.Map("/admin", adminApp =>
{
    adminApp.Run(async context => await context.Response.WriteAsync("Admin area"));
});

app.Run(async context => await context.Response.WriteAsync("Main app"));
```

- Any request to `/admin` (or `/admin/*`) is routed into the separate branch defined by the lambda — that branch has its own independent middleware pipeline.
- Maps can be **nested**: `app.Map("/level1", l1 => l1.Map("/level2", l2 => { ... }))` handles `/level1/level2`.

## MapWhen — Branching by Predicate

```csharp
app.MapWhen(
    context => context.Request.Query.ContainsKey("debug"),
    debugApp => debugApp.Run(async context => await context.Response.WriteAsync("Debug mode"))
);
```

- Unlike `Map` (path-based only), `MapWhen` branches on any condition you can express as `Func<HttpContext, bool>` — useful for feature flags, A/B testing, or header-based routing.

## Custom Middleware

```csharp
public class RequestTimingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<RequestTimingMiddleware> _logger;

    public RequestTimingMiddleware(RequestDelegate next, ILogger<RequestTimingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var sw = System.Diagnostics.Stopwatch.StartNew();
        await _next(context); // call the next middleware in the pipeline
        sw.Stop();
        _logger.LogInformation("{Path} took {Elapsed}ms", context.Request.Path, sw.ElapsedMilliseconds);
    }
}

public static class RequestTimingMiddlewareExtensions
{
    public static IApplicationBuilder UseRequestTiming(this IApplicationBuilder builder) =>
        builder.UseMiddleware<RequestTimingMiddleware>();
}
```

```csharp
app.UseRequestTiming(); // registered like any built-in middleware
```

- A custom middleware class needs a constructor accepting `RequestDelegate next` and an `InvokeAsync`/`Invoke` method — the extension method pattern (`UseXyz()`) keeps registration consistent with built-in middleware.

## Why Order Matters

```csharp
app.UseAuthentication(); // must come before UseAuthorization
app.UseAuthorization();
app.UseStaticFiles();    // typically placed early, before routing/auth for public assets
```

- Registering `UseAuthorization()` before `UseAuthentication()` means authorization checks run before the user's identity has even been established — a common, hard-to-diagnose bug.

## Summary

`Run` terminates the pipeline; `Use` continues it, allowing code to execute both before and after downstream middleware; `Map`/`MapWhen` branch the pipeline into separate sub-pipelines based on path or a custom condition. Because middleware executes in registration order and wraps "in and back out," getting the order right (especially around authentication/authorization) is critical to correct request handling.
