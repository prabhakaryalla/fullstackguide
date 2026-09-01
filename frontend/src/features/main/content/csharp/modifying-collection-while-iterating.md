# Modifying a Collection While Iterating with foreach

Adding or removing items from a collection during a `foreach` loop over it is a classic bug — the exact behavior depends on which collection type you're using.

## Quick Difference

- Most built-in collections (`List<T>`, `Dictionary<TKey,TValue>`, `HashSet<T>`) detect structural modification during enumeration and throw `InvalidOperationException` ("Collection was modified; enumeration operation may not execute").
- Some collections (like concurrent collections, e.g. `ConcurrentDictionary<TKey,TValue>`) are specifically designed to tolerate concurrent modification during enumeration without throwing, but may return a mix of old/new snapshot data instead.

## The Problem with List<T>

```csharp
var numbers = new List<int> { 1, 2, 3, 4, 5 };

foreach (var n in numbers)
{
    if (n % 2 == 0)
    {
        numbers.Remove(n); // throws InvalidOperationException on the next MoveNext()
    }
}
```

Key points:

- `List<T>` maintains an internal version counter, incremented on every structural change (add/remove, not just setting an existing index)
- the enumerator checks this counter on each `MoveNext()` call and throws if it changed since enumeration started
- this happens even if you only modify the collection once, partway through the loop

## Safe Alternatives

```csharp
var numbers = new List<int> { 1, 2, 3, 4, 5 };

// Option 1: iterate a snapshot copy
foreach (var n in numbers.ToList())
{
    if (n % 2 == 0) numbers.Remove(n);
}

// Option 2: use RemoveAll for bulk removal
numbers.RemoveAll(n => n % 2 == 0);

// Option 3: iterate backwards by index when removing by index
for (int i = numbers.Count - 1; i >= 0; i--)
{
    if (numbers[i] % 2 == 0) numbers.RemoveAt(i);
}
```

## Dictionary<TKey,TValue> Has the Same Trap

```csharp
var scores = new Dictionary<string, int> { ["a"] = 1, ["b"] = 2 };

foreach (var kvp in scores)
{
    scores["c"] = 3; // throws InvalidOperationException immediately on next iteration
}
```

Even just *adding* a key while enumerating (not just removing) throws for `Dictionary<TKey,TValue>`.

## ConcurrentDictionary Behaves Differently

```csharp
var scores = new ConcurrentDictionary<string, int>();
scores["a"] = 1;

foreach (var kvp in scores)
{
    scores["b"] = 2; // does NOT throw - concurrent collections tolerate this
}
// but the foreach may or may not observe "b", depending on timing - it's a weakly consistent snapshot
```

Key points:

- concurrent collections are explicitly designed for multithreaded add/remove during enumeration
- the tradeoff is that you get "eventually consistent" enumeration rather than a guaranteed snapshot or a hard failure

## Summary

- Never add or remove items from a `List<T>`/`Dictionary<TKey,TValue>`/`HashSet<T>` while directly `foreach`-ing over it — it throws `InvalidOperationException`.
- Iterate over a copy (`.ToList()`), use a built-in bulk method (`RemoveAll`), or iterate by index in reverse when removal is required mid-loop.
