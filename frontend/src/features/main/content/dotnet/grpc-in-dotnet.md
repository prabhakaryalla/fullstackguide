# gRPC in .NET

gRPC is a high-performance RPC (Remote Procedure Call) framework built on HTTP/2 and Protocol Buffers — .NET has first-class support for it, and it's the standard choice for internal, service-to-service communication where REST's JSON-over-HTTP/1.1 overhead becomes a real bottleneck.

## Short Answer

gRPC defines service contracts in a `.proto` file (using Protocol Buffers, a compact binary serialization format), then generates strongly-typed client and server code directly from that contract — .NET's `Grpc.AspNetCore` package wires this into ASP.NET Core, running over HTTP/2 for multiplexed, low-overhead communication. It supports four call types: simple request/response (unary), and three streaming variants (client, server, and bidirectional streaming).

## Defining a Contract

```protobuf
syntax = "proto3";

service OrderService {
  rpc GetOrder (GetOrderRequest) returns (OrderReply);
  rpc StreamOrderUpdates (GetOrderRequest) returns (stream OrderReply); // server streaming
}

message GetOrderRequest { int32 id = 1; }
message OrderReply { int32 id = 1; double total = 2; string status = 3; }
```

- The `.proto` file is the single source of truth for the contract — both client and server code are generated from it at build time, so a mismatch between what a client sends and what a server expects becomes a compile-time problem, not a runtime surprise.
- Field numbers (`= 1`, `= 2`) are part of the binary wire format — renaming a field is safe, but reusing or changing an existing field's number breaks compatibility with anything still using the old numbering.

## Implementing the Server

```csharp
public class OrderGrpcService : OrderService.OrderServiceBase
{
    public override async Task<OrderReply> GetOrder(GetOrderRequest request, ServerCallContext context)
    {
        var order = await _orderRepository.GetByIdAsync(request.Id);
        return new OrderReply { Id = order.Id, Total = (double)order.Total, Status = order.Status.ToString() };
    }
}

// Program.cs
builder.Services.AddGrpc();
app.MapGrpcService<OrderGrpcService>();
```

## Consuming the Client

```csharp
var channel = GrpcChannel.ForAddress("https://localhost:5001");
var client = new OrderService.OrderServiceClient(channel);

var reply = await client.GetOrderAsync(new GetOrderRequest { Id = 42 });
Console.WriteLine($"Order {reply.Id}: {reply.Status}, ${reply.Total}");
```

- The generated `OrderServiceClient` gives you a fully strongly-typed method (`GetOrderAsync`) matching the `.proto` contract exactly — no manual URL construction, no manual JSON serialization/deserialization, and compile-time checking of the request/response shapes.

## Why gRPC Over REST for Internal Services

| | REST + JSON | gRPC + Protobuf |
|---|---|---|
| Payload size | Larger (text-based JSON) | Smaller (compact binary encoding) |
| Contract enforcement | Convention/documentation only, unless using OpenAPI tooling | Compile-time, generated from `.proto` |
| Streaming | Awkward (SSE, WebSockets as separate mechanisms) | Native support (client/server/bidirectional streaming) |
| Browser support | Universal | Requires gRPC-Web + a proxy for direct browser use |
| Best fit | Public APIs, third-party consumers, browser clients | Internal, service-to-service communication |

- gRPC's smaller payloads and native streaming make it noticeably more efficient for high-volume internal traffic, but it's a poor fit for public APIs meant to be called directly by arbitrary HTTP clients or browsers without extra tooling.

## Common Mistake

Adopting gRPC for a public-facing API consumed by third-party developers or browser clients directly — losing REST's universal tooling support, human-readability, and simple browser compatibility for a performance benefit that mostly matters for high-volume internal traffic, not typical external API consumption patterns.

## Summary

gRPC uses Protocol Buffers and HTTP/2 to provide a compact, strongly-typed, contract-first RPC mechanism with native streaming support — .NET generates both client and server code directly from a shared `.proto` file. It's the right choice for internal, service-to-service communication where payload size and throughput genuinely matter, but REST remains the better default for public APIs and browser-facing clients.
