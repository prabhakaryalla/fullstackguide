# ConcurrentDictionary GetOrAdd Runs the Factory More Than Once

`ConcurrentDictionary` is thread-safe for reads and writes — but the `valueFactory` you pass to `GetOrAdd` is *not* guaranteed to run only once, even for the exact same key. This surprises almost everyone the first time they hit it.

## The Question

```csharp
static int runCount = 0;
static readonly ConcurrentDictionary<string, string> dictionary = new();

static string BuildValue(string valueToReturn)
{
    return dictionary.GetOrAdd("key", _ =>
    {
        Interlocked.Increment(ref runCount);
        Thread.Sleep(100); // simulate work
        return valueToReturn;
    });
}

var task1 = Task.Run(() => Console.WriteLine(BuildValue("A")));
var task2 = Task.Run(() => Console.WriteLine(BuildValue("B")));
Task.WaitAll(task1, task2);
Console.WriteLine($"Run count: {runCount}");
```

**Output:** Either

```
A
A
Run count: 2
```

or

```
B
B
Run count: 2
```

Both calls always print the **same** value as each other — but `runCount` is `2`, not `1`.

## Why This Happens

- `ConcurrentDictionary` avoids taking a lock *while your factory delegate is running*, specifically so one slow or misbehaving delegate can't block every other thread using the dictionary.
- If two threads both call `GetOrAdd` for a key that doesn't exist yet, and neither has finished before the other starts, **both** threads run the factory delegate independently.
- Only one of the two results actually gets stored — whichever thread finishes and writes first "wins," and the other thread's result is discarded. Both callers still get back the same (winning) value, so the dictionary's own data is never corrupted.
- What's *not* guaranteed is how many times the factory itself executes. If it has side effects (like the `Interlocked.Increment` above, or anything with real-world side effects — writing a file, calling an API, incrementing a counter), those side effects can happen more than once.

## When It Actually Matters

If the factory is cheap and has no side effects (just computing and returning a value), running it twice is harmless — you still always get a consistent answer back. The problem only shows up when the factory does something expensive or stateful that must only happen once (e.g. building a middleware pipeline, opening a connection, an initialization routine).

## The Fix: Wrap the Value in Lazy&lt;T&gt;

```csharp
static readonly ConcurrentDictionary<string, Lazy<string>> lazyDictionary = new();

static string BuildValueLazy(string valueToReturn)
{
    var lazy = lazyDictionary.GetOrAdd("key", _ => new Lazy<string>(() =>
    {
        Interlocked.Increment(ref runCount);
        Thread.Sleep(100);
        return valueToReturn;
    }));

    return lazy.Value; // triggers the real work, exactly once, no matter how many threads call this
}
```

**Output now:** `Run count: 1`, guaranteed.

- The factory passed to `GetOrAdd` now only creates an *uninitialized* `Lazy<string>` wrapper — that's cheap and side-effect-free, so it's fine if it runs more than once (you just end up with a couple of unused `Lazy<>` wrapper objects that get discarded).
- The *actual* expensive work lives inside the `Lazy<>`'s own delegate, which only ever runs once no matter how many threads call `.Value` on it — `Lazy<T>` (by default) uses its own internal locking to guarantee that.
- The trade-off: while the winning thread is still running the `Lazy<>` initializer, any other thread calling `.Value` on that same `Lazy<>` instance blocks and waits for it — so you trade "factory might run twice" for "callers might briefly wait on each other."

## Common Mistake

Assuming that because `ConcurrentDictionary` is a thread-safe collection, everything you pass into it — including your own factory delegates — inherits that same guarantee. The collection's internal state is protected; your delegate's side effects are not, unless you explicitly add that protection yourself (with `Lazy<T>`, or your own locking).

## Summary

| Scenario | Factory guaranteed to run once? |
|---|---|
| `GetOrAdd(key, factory)` called concurrently for a missing key | **No** — may run more than once; only one result is stored |
| `GetOrAdd(key, factory)` where `factory` just builds a `Lazy<T>` wrapper, and callers use `.Value` | **Yes** — the expensive work inside `Lazy<T>` runs exactly once |

The same caveat applies to `AddOrUpdate`'s add/update factory delegates — they can also be invoked more than once per logical call under contention.
