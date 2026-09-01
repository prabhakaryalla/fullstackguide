# Difference Between Task.WaitAll and Task.WhenAll in C#

Task.WaitAll and Task.WhenAll both wait for multiple tasks, but they do it differently.

## Quick Difference

- Task.WaitAll blocks the current thread.
- Task.WhenAll does not block; it returns a task you can await.

## Simple Comparison

| Area | Task.WaitAll | Task.WhenAll |
|:---|:---|:---|
| Style | Synchronous blocking | Asynchronous non-blocking |
| Thread impact | Blocks calling thread | Frees calling thread while waiting |
| Best for | Legacy sync code (rare) | Modern async code |
| Return type | void | Task / Task<T[]> |

## Example with Task.WaitAll

```csharp
Task t1 = Task.Delay(500);
Task t2 = Task.Delay(700);

Task.WaitAll(t1, t2); // blocks current thread
Console.WriteLine("Both done");
```

This is simple, but blocking can hurt scalability and UI responsiveness.

## Example with Task.WhenAll

```csharp
Task t1 = Task.Delay(500);
Task t2 = Task.Delay(700);

await Task.WhenAll(t1, t2); // non-blocking wait
Console.WriteLine("Both done");
```

This is the preferred style for async applications.

## Result Collection

When tasks return values, WhenAll can gather all results:

```csharp
Task<int> a = Task.FromResult(10);
Task<int> b = Task.FromResult(20);

int[] values = await Task.WhenAll(a, b);
int total = values.Sum();
```

## Exception Behavior

Both can surface multiple failures, but usage differs:

- WaitAll throws on blocking call.
- WhenAll faults the returned task; exception appears when awaited.

In async methods, await Task.WhenAll is cleaner and safer.

## Rule of Thumb

- In async code, prefer Task.WhenAll.
- Avoid Task.WaitAll in UI/server request paths because blocking wastes threads.

## Real-World Analogy

Task.WaitAll is like standing at a counter and refusing to do anything else until all orders are ready.

Task.WhenAll is like taking a ticket number and doing other work until all orders are complete.
