# Facade Design Pattern

Facade provides a single, simplified interface in front of a complex subsystem of classes — the client talks to one simple entry point instead of learning and coordinating many interdependent internal classes.

## Short Answer

Facade doesn't add new functionality — it wraps existing, more complex subsystems behind a higher-level interface, hiding the internal complexity and dependencies from the client. It's a structural pattern, evolved from the French word for "frontage/face" — a simple face over a complex building.

## The Problem Without a Facade

```csharp
// Client must know about and correctly sequence three separate subsystems
var inventory = new InventoryService();
var payment = new PaymentService();
var shipping = new ShippingService();
var notification = new NotificationService();

if (inventory.CheckStock(orderId))
{
    var paymentResult = payment.Charge(orderId);
    if (paymentResult.Success)
    {
        shipping.ScheduleDelivery(orderId);
        notification.SendConfirmation(orderId);
    }
}
```

- The client (e.g., a controller) needs to know about four subsystems, their correct call order, and how to react to each one's result — this couples the client tightly to internal implementation details that may change.

## With a Facade

```csharp
public class OrderFacade
{
    private readonly InventoryService _inventory = new();
    private readonly PaymentService _payment = new();
    private readonly ShippingService _shipping = new();
    private readonly NotificationService _notification = new();

    public bool PlaceOrder(int orderId)
    {
        if (!_inventory.CheckStock(orderId)) return false;

        var paymentResult = _payment.Charge(orderId);
        if (!paymentResult.Success) return false;

        _shipping.ScheduleDelivery(orderId);
        _notification.SendConfirmation(orderId);
        return true;
    }
}
```

```csharp
// Client code is now trivially simple
var orderFacade = new OrderFacade();
bool success = orderFacade.PlaceOrder(orderId);
```

```archify
diagrams/facade-pattern.html
```

- The client now depends on one simple method (`PlaceOrder`), and the facade owns the coordination logic and correct sequencing across subsystems.
- The subsystems themselves are untouched and can still be used directly by other code that needs finer-grained control — Facade doesn't prevent direct access, it just offers a simpler path for common cases.

## Choose Facade When

- You want to provide a simple interface to a complex, evolving subsystem.
- There are many interdependencies between the client and the subsystem's internal classes.
- You want to layer subsystems, giving each layer a simple entry point rather than exposing every internal class.

## Facade vs Adapter vs Decorator (Common Confusion)

| Pattern | Purpose |
|---|---|
| **Facade** | Simplifies access to a complex subsystem with a unified, higher-level interface |
| **Adapter** | Converts one interface into another the client expects (compatibility) |
| **Decorator** | Adds new behavior/responsibilities to an object dynamically, without changing its interface |

- Facade is about **simplification**; Adapter is about **compatibility**; Decorator is about **extension**. They solve different problems even though all three "wrap" something.

## Real-World Example

A checkout API endpoint calls a single `CheckoutFacade.CompleteOrder(cart)` method, which internally coordinates inventory reservation, payment processing, tax calculation, shipping label generation, and email confirmation — the controller stays a thin, readable one-liner, while the facade absorbs the complexity of correctly sequencing and error-handling across five different subsystems.

## Summary

Facade wraps a complex set of interdependent subsystem classes behind one simplified, higher-level interface — reducing coupling between client code and subsystem internals, and making common workflows easy to call correctly without requiring every caller to understand the subsystem's internal coordination logic.
