# REST vs gRPC vs GraphQL

All three are ways to expose an API, but they optimize for different things: REST for simplicity and universal compatibility, gRPC for performance and strict contracts between internal services, and GraphQL for letting clients precisely shape the data they get back in one round trip.

## Short Answer

Use **REST** as the default for public-facing APIs and anything that needs broad, simple compatibility (browsers, third parties, caching via HTTP semantics). Use **gRPC** for internal, service-to-service communication where performance and strongly-typed contracts matter more than human readability. Use **GraphQL** when clients (especially varied clients like web + mobile) have very different data needs from the same underlying data, and over/under-fetching with REST has become a real problem.

## REST

```csharp
[HttpGet("/api/orders/{id}")]
public async Task<OrderDto> Get(int id) => await _orderService.GetOrderAsync(id);
```

```
GET /api/orders/42
{ "id": 42, "customerId": 7, "total": 199.99, "items": [ ... ], "shippingAddress": { ... } }
```

- Simple, human-readable, works everywhere (browsers, curl, every HTTP client library ever written) — no special tooling needed to call it.
- Naturally maps onto HTTP semantics: GET is cacheable and safe, PUT is idempotent, status codes convey outcome (404, 409, etc.) — see [HTTP idempotent/safe methods](../dotnet/http-idempotent-safe-methods-status-codes.md).
- **Over-fetching**: the client gets the *entire* `OrderDto` even if it only needed `total`. **Under-fetching**: a mobile screen needing order + customer name + shipment status might need 3 separate REST calls (unless you build a bespoke aggregating endpoint — see [API Gateway / BFF](./api-gateway-bff-pattern.md)).

## gRPC

```protobuf
service OrderService {
  rpc GetOrder (GetOrderRequest) returns (OrderReply);
}
message GetOrderRequest { int32 id = 1; }
message OrderReply { int32 id = 1; double total = 2; }
```

```csharp
public class OrderGrpcService : OrderService.OrderServiceBase
{
    public override async Task<OrderReply> GetOrder(GetOrderRequest request, ServerCallContext context)
    {
        var order = await _orderService.GetOrderAsync(request.Id);
        return new OrderReply { Id = order.Id, Total = order.Total };
    }
}
```

- Uses Protocol Buffers (binary, strongly-typed schema) over HTTP/2 — significantly smaller payloads and lower latency than JSON-over-HTTP/1.1, especially valuable for high-volume, internal service-to-service traffic.
- The `.proto` file is a strict, code-generated contract shared between client and server — changes to the contract are explicit and versioned, reducing "the API silently changed shape" bugs common with loosely-typed JSON.
- Not browser-friendly without a proxy (gRPC-Web) — it's the wrong choice for a public API consumed directly by arbitrary third-party HTTP clients, or where human-readability (debugging with curl) matters.
- Supports streaming natively (client-streaming, server-streaming, bidirectional) — something REST has no first-class equivalent for.

## GraphQL

```graphql
query {
  order(id: 42) {
    total
    customer { name }
  }
}
```

```csharp
public class OrderType : ObjectType<Order>
{
    protected override void Configure(IObjectTypeDescriptor<Order> descriptor)
    {
        descriptor.Field(o => o.Total);
        descriptor.Field(o => o.Customer).ResolveWith<CustomerResolver>(r => r.GetCustomer(default!));
    }
}
```

- The client specifies exactly which fields it wants, across related objects, in **one** request — directly solving REST's over/under-fetching problem without needing a bespoke BFF endpoint for every client variation.
- A single, strongly-typed schema describes the entire graph of queryable data — great for a system serving many different client shapes (web dashboard vs mobile app vs partner integration) against the same underlying domain.
- The trade-offs: caching is much harder than REST's built-in HTTP caching (a GraphQL endpoint is typically one `POST /graphql`, so URL-based HTTP caching doesn't apply); a poorly-designed schema can let a client request an accidentally very expensive nested query (needs query cost analysis/depth limiting); and the tooling/learning curve is heavier than plain REST.

## A Practical Decision Table

| Need | Best Fit |
|---|---|
| Public API, third-party integrations, simple CRUD | REST |
| Internal service-to-service calls, performance-critical, streaming | gRPC |
| Multiple very different client shapes over the same data, avoiding over/under-fetching | GraphQL |
| Simplicity and universal tooling compatibility matter most | REST |

## Common Mistake

Picking gRPC or GraphQL because they're technically impressive, not because a REST API is actually causing a measured problem. REST remains the right default for most APIs — reach for gRPC when internal performance/contract-strictness is a proven bottleneck, and GraphQL when over/under-fetching across varied clients is a proven, recurring pain point.

## Summary

REST optimizes for simplicity and universal compatibility. gRPC optimizes for performance and strict typed contracts, best suited to internal service-to-service traffic. GraphQL optimizes for flexible, client-shaped queries against one data graph, best suited to systems serving several very different client types from the same domain. None of the three is a strict upgrade over the others — each trades away something the others provide.
