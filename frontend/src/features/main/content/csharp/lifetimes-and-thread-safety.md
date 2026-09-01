# How Lifetimes Affect Thread Safety of Services

In dependency injection, service lifetime directly affects how many threads may access the same instance.

## Core Idea

- Singleton: shared across the whole app, often accessed by many threads
- Scoped: shared within one request/scope
- Transient: new instance per resolve

Because of this, thread-safety expectations differ by lifetime.

## Lifetime vs Thread-Safety Risk

| Lifetime | Sharing Level | Thread-Safety Expectation |
|:---|:---|:---|
| Singleton | Global shared instance | Must be thread-safe if mutable state exists |
| Scoped | Shared per request/scope | Usually lower cross-thread risk, but still can be concurrent |
| Transient | Mostly isolated instances | Lower shared-state risk; internal static/shared state still matters |

## Singleton and Thread Safety

Singleton instances can be used by many requests at the same time.

If singleton has mutable state, protect it.

```csharp
public class CounterService
{
    private int _count;

    public int Increment()
    {
        return Interlocked.Increment(ref _count);
    }
}
```

Without synchronization, concurrent updates can cause race conditions.

## Scoped Services and Concurrency

Scoped services are usually request-bound, but a request may run parallel work.

```csharp
public class RequestBuffer
{
    private readonly List<string> _items = new();

    public void Add(string item)
    {
        _items.Add(item); // not thread-safe if accessed concurrently
    }
}
```

Even scoped services may need thread-safety if used across parallel tasks in the same scope.

## Transient Services

Transient reduces shared-instance risk because each resolve gets a new object.

But thread safety is still needed when:

- Service uses static fields
- Service accesses shared external resources
- Same transient instance is manually shared across tasks

## Common Pitfalls

- Mutable state in singleton without locks or atomic operations
- Assuming scoped always means single-threaded
- Ignoring thread-safety for shared caches or static helpers

## Practical Guidelines

- Prefer stateless singleton services when possible.
- If state is required, use lock, Interlocked, or concurrent collections.
- Keep scoped services simple and avoid parallel mutation unless synchronized.
- Do not rely on lifetime alone as a thread-safety guarantee.

## Real-World Analogy

- Singleton is like one shared whiteboard for the whole office. Everyone can write on it, so rules are required.
- Scoped is like one whiteboard per meeting room. Safer, but still risky if many people write at once.
- Transient is like a personal notepad. Usually safer because one person uses one copy.
