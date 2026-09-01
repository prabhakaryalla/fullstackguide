# 981. Time Based Key-Value Store

**Difficulty:** Medium
**Category:** Hash Table, String, Binary Search, Design

## Problem

Design a time-based key-value store `TimeMap` supporting `Set(key, value, timestamp)` (timestamps for a given key are strictly increasing) and `Get(key, timestamp)`, which returns the value set for `key` at the largest recorded timestamp `<= timestamp`, or `""` if none exists.

### Example

```
Set("foo", "bar", 1)
Get("foo", 1) -> "bar"
Get("foo", 3) -> "bar"
Set("foo", "bar2", 4)
Get("foo", 4) -> "bar2"
Get("foo", 5) -> "bar2"
```

## Approach

Store each key's `(timestamp, value)` pairs in a list, appended in increasing timestamp order (matching insertion order). A `Get` query becomes a binary search for the rightmost timestamp `<= timestamp` in that key's list.

## C# Solution

```csharp
public class TimeMap
{
    private readonly Dictionary<string, List<(int timestamp, string value)>> store = new();

    public void Set(string key, string value, int timestamp)
    {
        if (!store.ContainsKey(key)) store[key] = new List<(int, string)>();
        store[key].Add((timestamp, value));
    }

    public string Get(string key, int timestamp)
    {
        if (!store.TryGetValue(key, out var list)) return "";

        int lo = 0, hi = list.Count - 1, result = -1;

        while (lo <= hi)
        {
            int mid = (lo + hi) / 2;
            if (list[mid].timestamp <= timestamp) { result = mid; lo = mid + 1; }
            else hi = mid - 1;
        }

        return result == -1 ? "" : list[result].value;
    }
}
```

## Complexity

- **Time:** `O(1)` per `Set`, `O(log n)` per `Get`.
- **Space:** `O(n)`.
