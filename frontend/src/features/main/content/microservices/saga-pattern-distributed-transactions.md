# Saga Pattern for Distributed Transactions

When a business operation spans multiple microservices, there's no single database transaction that can wrap it all — the Saga pattern replaces one atomic transaction with a sequence of local transactions, each paired with a compensating action to undo it if something later fails.

## Short Answer

A Saga breaks a distributed operation (e.g. "place an order") into a series of local transactions, one per service (`Orders`, `Payments`, `Inventory`), each of which commits independently. If a later step fails, the Saga runs **compensating transactions** to undo the effects of the steps that already succeeded — there's no distributed rollback, only explicit "undo" logic you write yourself.

## Why Two-Phase Commit Isn't the Answer Here

A classic two-phase commit (2PC) can keep multiple databases *within one transaction manager* consistent, but it doesn't work well across independently-owned microservices: it requires all participants to be available and responsive at commit time (a single slow/down service blocks everyone), doesn't play well with different database technologies per service, and creates tight coupling that defeats the point of splitting into services in the first place. Sagas trade strict atomicity for **eventual consistency** instead.

## Choreography vs Orchestration

**Choreography** — each service listens for events and reacts, with no central coordinator:

```csharp
// OrderService: publishes an event, has no idea who's listening
await eventBus.PublishAsync(new OrderPlaced(orderId, customerId, items));

// PaymentService: reacts independently
public async Task Handle(OrderPlaced e)
{
    var result = await ChargeCustomerAsync(e.CustomerId, e.Items);
    await eventBus.PublishAsync(result.Success
        ? new PaymentCompleted(e.OrderId)
        : new PaymentFailed(e.OrderId));
}

// InventoryService: also reacts independently to PaymentCompleted, reserves stock, etc.
```

- Simple for a small number of steps; every service is loosely coupled and only knows about events, not other services directly.
- Gets hard to reason about as the number of steps grows — there's no single place that shows the whole workflow, and debugging "why did this order get stuck" means tracing events across several independent services' logs.

**Orchestration** — a central coordinator explicitly drives each step:

```csharp
public class OrderSagaOrchestrator
{
    public async Task ExecuteAsync(PlaceOrderCommand command)
    {
        var orderId = await _orderService.CreateOrderAsync(command);
        try
        {
            await _paymentService.ChargeAsync(command.CustomerId, command.Total);
            await _inventoryService.ReserveStockAsync(command.Items);
            await _orderService.ConfirmOrderAsync(orderId);
        }
        catch (Exception)
        {
            // Run compensations in reverse order for whatever already succeeded
            await _paymentService.RefundAsync(command.CustomerId, command.Total);
            await _orderService.CancelOrderAsync(orderId);
            throw;
        }
    }
}
```

- One place shows the entire workflow and its failure/compensation logic — much easier to understand, test, and debug than choreography.
- Introduces a coordinator that knows about every participating service — slightly more coupling, but it's explicit and centralized rather than implicit and scattered.

## Designing Compensating Transactions

- Compensations must be **semantically** correct, not a literal database rollback — "cancel the reservation," "refund the payment," "release the inventory hold" — because by the time compensation runs, other systems/users may have already observed the original change.
- Every step (and its compensation) should be **idempotent** — a Saga coordinator that crashes and retries a step must not double-charge a customer or double-reserve stock. Combine with an [idempotency key](../dotnet/idempotency-key-pattern-apis.md) per step.
- Some steps genuinely can't be compensated (e.g. "email already sent") — for those, either move them to the very end of the Saga (after everything else has succeeded) or accept the side effect and compensate elsewhere (a follow-up "sorry, your order was cancelled" email).

## Common Mistake

Assuming a Saga gives you the same guarantees as an ACID transaction. It gives you **eventual consistency** — there's a real window where an order might show as "payment taken, inventory not yet reserved." Application code (and UI) needs to be designed around that window, not pretend it doesn't exist.

## Summary

Sagas replace one atomic cross-service transaction with a sequence of local transactions plus compensating actions. Choreography (event-driven, no coordinator) suits a few loosely-coupled steps; orchestration (a central coordinator) suits workflows complex enough that a single, explicit view of the process is worth the added coupling. Either way, every step needs a well-defined, idempotent compensation.
