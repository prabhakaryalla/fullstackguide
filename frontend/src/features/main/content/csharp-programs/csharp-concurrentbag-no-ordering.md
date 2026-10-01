# ConcurrentBag Has No Guaranteed Order

`ConcurrentBag<T>` is thread-safe, but unlike `ConcurrentQueue<T>` (FIFO) or `ConcurrentStack<T>` (LIFO), it makes **no promise at all** about the order items come back out — and the reason why is the interesting part.

## The Question

```csharp
var bag = new ConcurrentBag<int>();

Parallel.For(0, 5, i => bag.Add(i));

while (bag.TryTake(out var item))
{
    Console.Write(item + " ");
}
// Output?
```

**Output:** Some permutation of `0 1 2 3 4` — not necessarily in that order, and not reliably reversed either. It can differ from run to run.

## Why This Happens

- `ConcurrentBag<T>` keeps a **separate local list of items per thread** internally, to avoid threads contending on a single shared list for every `Add`/`TryTake`.
- When a thread calls `Add`, the item goes onto *that thread's own* local list — not a single shared queue everyone appends to in order.
- When a thread calls `TryTake`, it first tries to take from its *own* local list (LIFO order, cheaply); only if that's empty does it "steal" an item from another thread's local list.
- Since `Parallel.For` spreads the 5 `Add` calls across however many worker threads are available, the items end up scattered across several per-thread lists — there's no single global sequence to preserve in the first place.

## Where This Actually Bites People

```csharp
var results = new ConcurrentBag<string>();

Parallel.ForEach(files, file => results.Add(Process(file)));

// Assuming results[0] corresponds to files[0] is WRONG -
// ConcurrentBag doesn't track input order at all.
File.WriteAllLines("output.txt", results); // lines can be in any order
```

A common mistake is using `ConcurrentBag` to collect results from a parallel operation and then assuming the output order matches the input order. It never does. If order matters, use a structure that tracks it explicitly — e.g. a `ConcurrentDictionary<int, T>` keyed by original index, or `Parallel.For` writing into a pre-sized array by index.

## Common Mistake

Reaching for `ConcurrentBag<T>` as a generic "thread-safe list" replacement. It's specifically optimized for the case where the **same thread** that adds an item is likely to be the one that later takes it back out (a producer-consumer pattern per thread) — not as a general order-preserving collection. If you need FIFO order, use `ConcurrentQueue<T>`; if you need to preserve input-to-output correspondence, key your results explicitly.

## Summary

`ConcurrentBag<T>` trades away ordering guarantees for lower contention: each thread mostly works with its own local list, only "stealing" from other threads when its own is empty. That's great for throughput in producer-consumer scenarios, but it means you should never assume any particular order — FIFO, LIFO, or otherwise — when reading items back out.
