# .NET Minimal APIs

Minimal APIs provide a lightweight approach to building HTTP APIs in .NET — endpoints are declared directly against `WebApplication` without the ceremony of a full MVC controller class, `[ApiController]` attributes, or a separate routing/action-method split.

## Short Answer

- Minimal APIs trade some of MVC's built-in conventions (model binding attributes, filters, automatic `[ApiController]` validation) for less boilerplate — a good fit for small APIs, microservices, and Functions-style HTTP endpoints.
- Dependency injection, validation, and middleware all still work the same way as in a full MVC app — minimal APIs are a different **routing/authoring style**, not a different runtime pipeline.
- Choose full MVC controllers when you have many related endpoints that benefit from shared conventions (filters, `[ApiController]` automatic 400 responses, versioning infrastructure) — choose Minimal APIs for small, focused services or when you want the leanest possible startup/hosting footprint.

## Basic Example

```csharp
var app = WebApplication.Create(args);

app.MapGet("/hello", () => "Hello, World!");

app.Run();
```

## Route Parameters

```csharp
app.MapGet("/items/{id}", (int id) => Results.Ok(new { Id = id }));
```

## Dependency Injection in Minimal APIs

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddScoped<IOrderService, OrderService>();
var app = builder.Build();

// Dependencies are resolved as extra parameters — no constructor needed
app.MapGet("/orders/{id}", (int id, IOrderService orders) => orders.GetById(id));
```

## Validation and Error Handling

Minimal APIs don't get MVC's automatic `[ApiController]` model-validation-to-400 behavior for free — validate explicitly:

```csharp
app.MapPost("/orders", (CreateOrderRequest request, IValidator<CreateOrderRequest> validator) =>
{
    var result = validator.Validate(request);
    if (!result.IsValid)
        return Results.ValidationProblem(result.ToDictionary());

    // ... create the order
    return Results.Created($"/orders/{newId}", newOrder);
});
```

## Grouped and Versioned Endpoints

```csharp
var orders = app.MapGroup("/api/v1/orders").WithTags("Orders");

orders.MapGet("/{id}", (int id, IOrderService svc) => svc.GetById(id));
orders.MapPost("/", (CreateOrderRequest req, IOrderService svc) => svc.Create(req));
```

- `MapGroup` lets you apply a shared route prefix, plus shared metadata/filters/authorization to a whole set of related endpoints — the minimal-API equivalent of grouping related actions under one MVC controller.

## Middleware Ordering

Middleware registration (`app.UseAuthentication()`, `app.UseAuthorization()`, custom `app.Use(...)`) works identically to a full MVC app — minimal APIs run on the same ASP.NET Core middleware pipeline, just with a leaner endpoint-declaration syntax on top of it.

## Minimal APIs vs. MVC Controllers

| | Minimal APIs | MVC Controllers |
|---|---|---|
| Boilerplate | Least — endpoints declared inline | More — controller class, action methods |
| Automatic model validation | No (validate explicitly) | Yes, via `[ApiController]` |
| Filters/conventions | Supported but less mature | Rich, mature filter pipeline |
| Best for | Small APIs, microservices, simple CRUD | Larger APIs needing shared conventions across many endpoints |

## Interview Answer

Minimal APIs are a leaner way to declare HTTP endpoints directly on `WebApplication` without a full MVC controller class — they run on the exact same ASP.NET Core pipeline (same DI, same middleware), so the difference is authoring style, not architecture. The main tradeoff is that MVC's `[ApiController]` automatic model validation and richer filter pipeline aren't there by default, so validation needs to be explicit. I'd reach for Minimal APIs for small, focused services and full MVC controllers when an API has many endpoints that benefit from shared conventions.

## Summary

Minimal APIs reduce ceremony for declaring HTTP endpoints while running on the same DI container and middleware pipeline as full MVC — the tradeoffs are explicit validation (no automatic `[ApiController]` behavior) and a less mature filter/convention system, made up for by `MapGroup` for shared route prefixes/metadata across related endpoints. Choose based on API size and whether you need MVC's richer conventions, not because one is "faster" than the other at runtime.

