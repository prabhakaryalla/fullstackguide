# CQRS (Command Query Responsibility Segregation) Pattern

CQRS splits an application's read and write paths into separate models: **commands** change state, **queries** read state — instead of one unified model/service handling both. This unlocks independent optimization and scaling of each side.

## Short Answer

- **Command** — an operation that changes data (`CreateOrder`, `UpdateInventory`) and typically returns little or nothing.
- **Query** — an operation that reads data (`GetOrderById`, `GetTopProducts`) and never changes state.
- CQRS keeps these fully separate — often with different models, and sometimes even different databases — rather than one service class handling both reads and writes through the same entity model.

## Without CQRS — the Traditional Approach

```csharp
public class OrderService
{
    public async Task<Order> GetOrderAsync(int id) => await _dbContext.Orders.FindAsync(id);
    public async Task CreateOrderAsync(CreateOrderRequest request) { /* ... */ }
}
```

- One service, one entity model, handles both reading and writing — simple, but the read side and write side can have very different needs (e.g., reads need denormalized, fast-to-query shapes; writes need strict validation and consistency).

## With CQRS

```archify
diagrams/cqrs-command-query-split.html
```

```csharp
// Command
public record CreateOrderCommand(int CustomerId, List<OrderItem> Items);

public class CreateOrderCommandHandler
{
    public async Task<int> Handle(CreateOrderCommand command)
    {
        var order = new Order(command.CustomerId, command.Items);
        _dbContext.Orders.Add(order);
        await _dbContext.SaveChangesAsync();
        return order.Id;
    }
}

// Query — can use a completely different, denormalized model/data source
public record GetOrderSummaryQuery(int OrderId);

public class GetOrderSummaryQueryHandler
{
    public async Task<OrderSummaryDto> Handle(GetOrderSummaryQuery query)
    {
        return await _readDbConnection.QueryFirstAsync<OrderSummaryDto>(
            "SELECT * FROM OrderSummaryView WHERE OrderId = @Id", new { Id = query.OrderId });
    }
}
```

## Using MediatR for CQRS in .NET

```csharp
public class OrdersController : ControllerBase
{
    private readonly IMediator _mediator;

    [HttpPost]
    public async Task<IActionResult> Create(CreateOrderCommand command)
    {
        var orderId = await _mediator.Send(command);
        return Ok(new { orderId });
    }

    [HttpGet("{id}/summary")]
    public async Task<IActionResult> GetSummary(int id)
    {
        var summary = await _mediator.Send(new GetOrderSummaryQuery(id));
        return Ok(summary);
    }
}
```

- MediatR routes each command/query to its dedicated handler, keeping the controller thin and each operation's logic isolated and independently testable.

## Full CQRS with Event Sourcing (Advanced)

```archify
diagrams/cqrs-event-sourcing-sequence.html
```

- In this fuller form, the read side is updated asynchronously via events, trading immediate consistency for read performance and scalability — the read model may lag slightly behind the write model (eventual consistency).

## When to Use CQRS

- Read and write workloads have very different scaling/performance needs (e.g., millions of reads vs. moderate writes).
- Complex domains where the write model's validation/business rules would over-complicate a shared read/write model.
- You're already using event sourcing or need an audit trail of every state change.

## When to Avoid It

- Simple CRUD applications — CQRS adds architectural complexity (separate models, possibly separate data stores, eventual consistency) that isn't justified without a real read/write asymmetry.

## Real-World Example

An e-commerce platform uses CQRS: `CreateOrderCommand`/`CancelOrderCommand` write to a normalized transactional database enforcing strict business rules, while a `GetOrderHistoryQuery` reads from a denormalized, pre-joined "order summary" table optimized for the customer-facing order history page — updated asynchronously whenever an order-related event fires, keeping the heavily-read history page fast without complicating the write-side validation logic.

## Summary

CQRS separates the responsibility of changing data (commands) from reading data (queries), allowing each side to be modeled, optimized, and scaled independently — at the cost of added architectural complexity and, in its fuller event-driven form, eventual consistency between the write and read models.
