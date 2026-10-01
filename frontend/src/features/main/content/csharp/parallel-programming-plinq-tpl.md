# Parallel Programming: Parallel.For, TPL, and PLINQ

C# offers several tools for running CPU-bound work across multiple cores simultaneously. `Parallel.For`, the Task Parallel Library (TPL), and PLINQ all achieve parallelism, but at different levels of abstraction and for different shapes of work.

## Short Answer

- **`Parallel.For`/`Parallel.ForEach`** — run loop iterations concurrently across available cores.
- **Task Parallel Library (TPL)** — the general-purpose `Task`-based API (`Task.Run`, `Task.WhenAll`) for running independent units of work concurrently.
- **PLINQ (`.AsParallel()`)** — parallelizes LINQ query operators automatically across cores.
- All three are for **CPU-bound** work — don't reach for them to handle I/O waiting (that's what `async`/`await` is for).

## Parallel.For / Parallel.ForEach

```csharp
Parallel.For(0, 100, i =>
{
    ProcessItem(i); // CPU-bound work, each iteration independent
});

Parallel.ForEach(orders, order =>
{
    RecalculateTotal(order);
});
```

- Best when you have a large, independent, CPU-bound loop and want the runtime to automatically partition iterations across available cores.

## Task Parallel Library (TPL)

```csharp
var tasks = new[]
{
    Task.Run(() => ComputeReportA()),
    Task.Run(() => ComputeReportB()),
    Task.Run(() => ComputeReportC()),
};

await Task.WhenAll(tasks); // wait for all independent CPU-bound tasks to finish
```

- More flexible than `Parallel.For` — useful when you have a fixed, small set of independent, heterogeneous operations (not a large uniform loop) that can run concurrently.

## PLINQ

```csharp
var expensiveResults = largeDataSet
    .AsParallel()
    .Where(item => IsExpensiveToCheck(item))
    .Select(item => Transform(item))
    .ToList();
```

- Turns an existing LINQ query into a parallelized one with minimal code change — the runtime partitions the source collection and processes chunks on multiple threads.
- Best for CPU-bound transformations/filters over large in-memory collections; overhead can outweigh benefits for small collections or very cheap per-item work.

```archify
diagrams/plinq-sequential-vs-parallel.html
```

## Async vs Parallel — The Key Interview Distinction

| | Async | Parallel |
|---|---|---|
| Blocking behavior | Non-blocking (frees the thread while waiting) | Actively uses multiple threads/cores simultaneously |
| Bound by | I/O (network, disk, DB) | CPU |
| Goal | Scalability/responsiveness (serve more requests with fewer threads) | Raw throughput/performance (finish CPU work faster) |
| Typical API | `async`/`await`, `Task` | `Parallel.For`, PLINQ, `Task.WhenAll` for CPU work |

- **Async** is about not wasting a thread while waiting for something external.
- **Parallel** is about using more than one core at the same time to finish CPU work faster.
- They're not mutually exclusive — you can `await` a set of tasks that each internally use `Parallel.For`, but conceptually they solve different problems and this distinction is one of the most frequently asked interview questions.

## Common Mistake

Using `Parallel.For` for work that's actually I/O-bound (e.g., calling an API inside the loop body). This blocks a thread-pool thread per iteration doing nothing but waiting — `Task.WhenAll` with `async` calls is the correct tool for concurrent I/O-bound work, not `Parallel.For`.

## Real-World Example

A reporting service needs to (a) fetch data from three independent APIs and (b) then run a CPU-heavy statistical calculation over the combined dataset. Step (a) uses `Task.WhenAll` with `async` HTTP calls (I/O-bound, non-blocking); step (b) uses PLINQ or `Parallel.For` over the in-memory dataset (CPU-bound, uses multiple cores) — using the right tool for each half of the pipeline.

## Summary

`Parallel.For`, TPL, and PLINQ are all about spreading CPU-bound work across multiple cores to finish it faster — a fundamentally different goal from `async`/`await`, which frees threads during I/O waits to improve scalability. Recognizing whether a workload is CPU-bound or I/O-bound determines whether parallelism or async is the right tool.
