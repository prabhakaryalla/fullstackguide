# API Gateway and Backend-for-Frontend (BFF)

An API Gateway is the single entry point clients use to reach a system built from many microservices — and a Backend-for-Frontend takes that idea further, giving each type of client (web, mobile, third-party) its own tailored gateway instead of one shared one.

## Short Answer

Instead of every client calling `Orders`, `Payments`, and `Inventory` services directly, they call one API Gateway, which routes, aggregates, and enforces cross-cutting concerns (auth, rate limiting, logging) on their behalf. A BFF is a specialized gateway per client type — e.g. a `MobileBff` that returns a lean payload for a mobile app, and a `WebBff` that returns a richer payload for a desktop web UI — instead of forcing every client to consume one generic, one-size-fits-all API shape.

## What an API Gateway Solves

```csharp
// Without a gateway: the client calls 3 services directly, and needs to know about all of them
var order = await orderServiceClient.GetOrderAsync(orderId);
var payment = await paymentServiceClient.GetPaymentStatusAsync(orderId);
var shipment = await shippingServiceClient.GetShipmentStatusAsync(orderId);

// With a gateway: the client makes ONE call; the gateway aggregates internally
var orderDetails = await gatewayClient.GetOrderDetailsAsync(orderId); // combines all 3 behind the scenes
```

- **Request aggregation** — one client round-trip instead of several, especially valuable for mobile clients on high-latency networks.
- **Cross-cutting concerns centralized** — authentication, rate limiting, request logging, and TLS termination live in one place instead of being reimplemented in every downstream service.
- **Service topology hidden from clients** — services can be split, merged, or moved without every client needing to change; they only ever talk to the gateway's stable contract.
- **Protocol translation** — e.g. the gateway exposes REST/GraphQL externally while internal services communicate over gRPC.

## The Problem With One Shared Gateway

A single, generic gateway used by every client type tends to accumulate client-specific logic over time — "if the caller is the mobile app, strip out these fields," "if it's the web app, include this extra nested object" — turning the gateway itself into a tangled, hard-to-change bottleneck that every team has to coordinate through.

## Backend-for-Frontend (BFF): One Gateway Per Client Type

```csharp
// MobileBff — deliberately lean, mobile-optimized payload
public class MobileOrderController : ControllerBase
{
    [HttpGet("/mobile/orders/{id}")]
    public async Task<MobileOrderSummary> Get(int id) =>
        new MobileOrderSummary(await _orderService.GetOrderAsync(id)); // just id, status, total
}

// WebBff — richer payload for a desktop dashboard
public class WebOrderController : ControllerBase
{
    [HttpGet("/web/orders/{id}")]
    public async Task<WebOrderDetails> Get(int id) =>
        new WebOrderDetails(
            await _orderService.GetOrderAsync(id),
            await _customerService.GetCustomerAsync(id),
            await _analyticsService.GetOrderHistoryAsync(id)); // full detail, related data included
}
```

- Each BFF is owned and evolves independently, shaped entirely around what *that* client actually needs — a mobile team can change their BFF's payload without coordinating with the web team's.
- The trade-off is more services to deploy and operate — a BFF per client type is only worth it once client needs have genuinely diverged enough that a shared gateway is causing friction, not from day one on a new product.

## Common Mistake

Treating the API Gateway/BFF as a place to put business logic. It should route, aggregate, translate, and enforce cross-cutting policies — the actual business rules belong in the domain services behind it. A gateway that accumulates business logic becomes a new, harder-to-test monolith hiding behind a "just infrastructure" label.

## Summary

An API Gateway gives clients one stable entry point instead of exposing every internal service directly, centralizing auth, rate limiting, and aggregation. A BFF specializes that idea per client type once a shared gateway's one-size-fits-all shape starts causing real friction between client teams — but keep both free of actual business logic, which belongs in the services behind them.
