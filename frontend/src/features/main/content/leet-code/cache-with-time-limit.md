# 2622. Cache With Time Limit

**Difficulty:** Medium
**Category:** Closures, Hash Table

## Problem
Implement a cache class with time-based expiration:
- `set(key, value, duration)` stores `value` under `key`, which expires after `duration` milliseconds from the moment `set` is called. Returns `true` if an unexpired value already existed for that key at the time of the call, `false` otherwise.
- `get(key)` returns the current value for `key` if it exists and has not yet expired, or `-1` otherwise.
- `count()` returns the number of keys that currently have an unexpired value.

## Approach
Adapted to C#: store each entry with its absolute expiry timestamp (in milliseconds). To keep the cache testable without real wall-clock delays, the current time is obtained through an injectable `Func<long>` (defaulting to `DateTimeOffset.UtcNow`). Every operation compares the entry's expiry against "now" to decide whether it is still active.

## C# Solution

```csharp
public class TimeLimitedCache
{
    private class Entry
    {
        public int Value;
        public long ExpiresAt;
    }

    private readonly Dictionary<int, Entry> cache = new();
    private readonly Func<long> nowMillis;

    public TimeLimitedCache(Func<long> nowMillis = null)
    {
        this.nowMillis = nowMillis ?? (() => DateTimeOffset.UtcNow.ToUnixTimeMilliseconds());
    }

    public bool Set(int key, int value, int durationMs)
    {
        long now = nowMillis();
        bool existedAndActive = cache.TryGetValue(key, out var existing) && existing.ExpiresAt > now;

        cache[key] = new Entry { Value = value, ExpiresAt = now + durationMs };

        return existedAndActive;
    }

    public int Get(int key)
    {
        long now = nowMillis();

        if (cache.TryGetValue(key, out var entry) && entry.ExpiresAt > now)
        {
            return entry.Value;
        }

        return -1;
    }

    public int Count()
    {
        long now = nowMillis();
        int count = 0;

        foreach (var entry in cache.Values)
        {
            if (entry.ExpiresAt > now)
            {
                count++;
            }
        }

        return count;
    }
}
```

## Complexity

- **Time:** O(1) average for `Set`/`Get`; O(n) for `Count`.
- **Space:** O(n) for the stored entries.
