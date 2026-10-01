# Observer Pattern

The Observer pattern lets one object (the "subject") notify a dynamic list of interested other objects ("observers") whenever something changes — without the subject needing to know anything concrete about who's listening or how many there are.

## Short Answer

A **Subject** maintains a list of **Observers** and notifies all of them (typically by calling a common method they all implement) whenever its own state changes. Observers can subscribe/unsubscribe at any time, and the subject only depends on a common observer interface — never on any specific observer implementation.

## Implementing Observer

```csharp
public interface IOrderObserver
{
    void OnOrderPlaced(Order order);
}

public class OrderService
{
    private readonly List<IOrderObserver> _observers = new();

    public void Subscribe(IOrderObserver observer) => _observers.Add(observer);
    public void Unsubscribe(IOrderObserver observer) => _observers.Remove(observer);

    public void PlaceOrder(Order order)
    {
        // ... save the order ...
        foreach (var observer in _observers)
        {
            observer.OnOrderPlaced(order); // notify every subscriber, whoever they are
        }
    }
}

public class EmailNotifier : IOrderObserver
{
    public void OnOrderPlaced(Order order) => SendConfirmationEmail(order);
}

public class InventoryUpdater : IOrderObserver
{
    public void OnOrderPlaced(Order order) => DecrementStock(order);
}

var orderService = new OrderService();
orderService.Subscribe(new EmailNotifier());
orderService.Subscribe(new InventoryUpdater());
orderService.PlaceOrder(newOrder); // both observers react, OrderService knows nothing about either concretely
```

- `OrderService` has zero knowledge of `EmailNotifier` or `InventoryUpdater` specifically — it only knows "some list of `IOrderObserver`s," which can grow or shrink at runtime without any change to `OrderService` itself.
- This is the same underlying idea behind .NET's built-in `event`/`delegate` mechanism — events are essentially a language-level implementation of the Observer pattern.

## Push vs Pull Observers

```csharp
// Push: the subject sends the full data the observer needs
void OnOrderPlaced(Order order);

// Pull: the subject just signals "something changed," observer asks for what it needs
void OnChanged(IOrderQuery source); // observer calls source.GetLatestOrder() itself
```

- **Push** is simpler and more common — the subject decides what data to send.
- **Pull** is useful when different observers need different subsets of data, or when sending the full payload to every observer would be wasteful — the observer decides what it actually needs.

## When to Use It

- Multiple, independent parts of a system need to react to the same event, and you don't want the event source tightly coupled to every specific reactor.
- The set of "things that react" is expected to change over time (new observer types added later) without needing to modify the subject.

## Common Mistake

Letting observers throw exceptions that aren't isolated from each other — if one observer's callback throws, and the loop notifying observers isn't wrapped in per-observer error handling, one failing observer can prevent every subsequent observer in the list from being notified at all, which is rarely the intended behavior.

## Summary

Observer decouples a subject from the (possibly changing) set of things that need to react to its state changes, communicating only through a shared observer interface. It's the conceptual basis for event/pub-sub systems at every scale, from a single class's `event` in C# up to a full message-broker-based architecture.
