# Difference Between Parallel.For and Task.Run in C#

Parallel.For and Task.Run both use thread-pool resources, but they are designed for different workloads.

## Quick Difference

- Parallel.For is for data parallelism over a range or collection.
- Task.Run is for scheduling one unit of work asynchronously.

## Core Comparison

| Area | Parallel.For | Task.Run |
|:---|:---|:---|
| Primary goal | Split loop iterations across workers | Queue one async work item |
| Best for | CPU-bound loop processing | Offloading a specific operation |
| Return type | ParallelLoopResult | Task / Task<T> |
| Async/await friendliness | Not for async delegates | Native async/await integration |
| Degree control | ParallelOptions.MaxDegreeOfParallelism | Indirect via scheduler / composition |

## Parallel.For Example (CPU-bound loop)

```csharp
int[] numbers = Enumerable.Range(1, 1_000_000).ToArray();
long total = 0;
object gate = new object();

Parallel.For(0, numbers.Length,
    () => 0L,
    (i, _, local) => local + numbers[i],
    local =>
    {
        lock (gate)
        {
            total += local;
        }
    });
```

Use this when many independent iterations can run in parallel.

## Task.Run Example (single background work item)

```csharp
public async Task<byte[]> GenerateReportAsync()
{
    return await Task.Run(() => BuildLargeReport());
}
```

Use this when you need to schedule one heavy CPU task and await completion.

## Important Async Note

Do not use async lambdas directly inside Parallel.For expecting await behavior.

```csharp
// Avoid this pattern
Parallel.For(0, 100, async i => await ProcessAsync(i));
```

Parallel.For does not await asynchronous delegates correctly.

If work is asynchronous I/O, prefer Task.WhenAll.

```csharp
var tasks = Enumerable.Range(0, 100).Select(ProcessAsync);
await Task.WhenAll(tasks);
```

## When to Use Which

Use Parallel.For when:

- Work is CPU-bound.
- Iterations are independent.
- You want built-in loop partitioning and parallel control.

Use Task.Run when:

- You have one or few explicit background operations.
- You want natural await composition.
- You need Task-based exception and cancellation flow.

## Real-World Analogy

Parallel.For is like splitting a warehouse inventory count across many workers, each handling a section at the same time.

Task.Run is like handing one specific urgent package to a worker and waiting for that single task to finish.
