# 284. Peeking Iterator

**Difficulty:** Medium
**Category:** Array, Design, Iterator

## Problem

Design an iterator that supports the `Peek` operation on an existing iterator, in addition to the standard `HasNext` and `Next` operations, where `Peek` returns the next element without advancing the iterator.

### Example

```
PeekingIterator([1,2,3])
Next() -> 1, Peek() -> 2, Next() -> 2, Next() -> 3, HasNext() -> false
```

## Approach

Wrap the underlying iterator and cache one look-ahead value. On construction (or whenever the cache is empty and more elements exist), pre-fetch the next value from the underlying iterator into the cache. `Peek()` simply returns the cached value without touching the underlying iterator. `Next()` returns the cached value and then refills the cache from the underlying iterator if more elements remain.

## C# Solution

```csharp
public class PeekingIterator : IEnumerator<int>
{
    private readonly IEnumerator<int> iterator;
    private bool hasCached;
    private int cached;

    public PeekingIterator(IEnumerator<int> iterator)
    {
        this.iterator = iterator;
        Advance();
    }

    private void Advance()
    {
        hasCached = iterator.MoveNext();
        if (hasCached) cached = iterator.Current;
    }

    public int Peek()
    {
        return cached;
    }

    public int Next()
    {
        int value = cached;
        Advance();
        return value;
    }

    public bool HasNext()
    {
        return hasCached;
    }
}
```

## Complexity

- **Time:** `O(1)` per operation.
- **Space:** `O(1)` extra — one cached value.
