# Parallel.Invoke Timing

Same idea as before — 3 services taking 1, 2, and 3 minutes — but this time the work is CPU-heavy (crunching numbers), not "waiting" (like a timer or network call). Does `Parallel.Invoke` behave like `Task.WhenAll`? Mostly yes for timing, but it has its own hidden catch.

## The Setup

```csharp
void Service1() { /* 1 minute of heavy CPU work, e.g. a big loop */ }
void Service2() { /* 2 minutes of heavy CPU work */ }
void Service3() { /* 3 minutes of heavy CPU work */ }
```

## Question 1: Parallel.Invoke

```csharp
Parallel.Invoke(Service1, Service2, Service3);
```

**Total time:** `~3 minutes` (assuming the machine has at least 3 free CPU cores)

`Parallel.Invoke` hands each method to its own thread-pool worker and runs them all at once — same "wait for the slowest one, not the sum" idea as `Task.WhenAll` + `Task.Run`.

## The Catch: It Blocks the Calling Thread

```csharp
Console.WriteLine("Before");
Parallel.Invoke(Service1, Service2, Service3); // does NOT return until all 3 are done
Console.WriteLine("After"); // only prints once every service has finished
```

Unlike `Task.WhenAll`, `Parallel.Invoke` isn't something you `await` — it doesn't even return a `Task`. It's a **blocking** call: the thread that calls it just sits there, doing nothing else, for the full 3 minutes. If you call this inside an `async` method, you don't get any of the "free up the thread" benefit you'd get from `await Task.WhenAll(...)` — you've frozen a thread for the whole run.

## Gotcha: Parallel.For Doesn't Run in Order

```csharp
Parallel.For(0, 5, i => Console.WriteLine(i));
```

**Output:** *not* guaranteed to be `0 1 2 3 4` — it could print as `2 0 3 1 4` or any other order.

A normal `for` loop always runs in order. `Parallel.For` splits the work across several threads, and whichever thread finishes its slice first prints first — the order you see is unpredictable. If you need results in a specific order, collect them into an indexed array/list instead of relying on print order.

## Gotcha: The Number of CPU Cores Limits You

`Parallel.Invoke`/`Parallel.For` default to using roughly one worker per CPU core (`Environment.ProcessorCount`). If the machine only has 2 cores free, 3 CPU-heavy actions can't all truly run "at the same instant" — one waits its turn for a core to free up, so the total time can be more than the slowest single action. You can see/control this via `ParallelOptions.MaxDegreeOfParallelism`.

## Common Mistake

Using `Parallel.Invoke`/`Parallel.ForEach` for work that's really about *waiting* (like calling 3 weather APIs), not *crunching numbers*. These APIs are built for CPU-bound work — each action ties up a real thread for its entire duration. For waiting-type work, plain `await Task.WhenAll(...)` (no `Task.Run`) is strictly better, since it needs zero dedicated threads while waiting — see the [Task.WhenAll timing question](./csharp-sequential-await-vs-taskwhenall-timing.md) for that comparison.

## Summary

| | `await Task.WhenAll(Task.Run(...))` | `Parallel.Invoke` |
|---|---|---|
| Frees up the calling thread? | Yes (awaitable) | No — blocks it until all finish |
| Best for | CPU work you also want to `await` around | Pure CPU-bound work, fire-and-wait |
| Guarantees run order? | N/A | No — `Parallel.For` order is unpredictable |
| Limited by | Free thread-pool threads | CPU core count / `MaxDegreeOfParallelism` |

**Rule of thumb:** reach for `Parallel.Invoke`/`Parallel.For` only for heavy CPU-bound work where you're fine blocking the calling thread until it's all done. For anything you want to `await` (mixed with other async code), or for I/O-bound work like API calls, use `Task.WhenAll` instead.
