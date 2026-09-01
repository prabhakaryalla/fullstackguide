# 635. Design Log Storage System

**Difficulty:** Medium
**Category:** Design, String, Ordered Set
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Design a log storage system that stores logs with a unique id and a timestamp in the format `"Year:Month:Day:Hour:Minute:Second"`. Implement `Put(id, timestamp)` and `Retrieve(start, end, granularity)`, which returns the ids of all logs whose timestamp falls within `[start, end]` when compared at the given granularity (e.g., `"Day"` ignores hour/minute/second differences).

### Example

```
Input:
["LogSystem", "put", "put", "put", "retrieve", "retrieve"]
[[], [1, "2017:01:01:23:59:59"], [2, "2017:01:01:22:59:59"], [3, "2016:01:01:00:00:00"], ["2016:01:01:01:01:01", "2017:01:01:23:00:00", "Year"], ["2016:01:01:01:01:01", "2017:01:01:23:00:00", "Hour"]]
Output:
[null, null, null, null, [3, 2, 1], [2, 1]]
```

## Approach

Store all logs as a simple list of `(id, timestamp)` pairs. For `Retrieve`, truncate both the query's `start`/`end` bounds and every stored timestamp to the length corresponding to the requested granularity (e.g., 4 characters for `"Year"`, 19 for `"Second"`), then compare the truncated strings lexicographically — since the fixed-width, zero-padded timestamp format sorts identically whether compared as strings or as actual dates.

## C# Solution

```csharp
public class LogSystem
{
    private readonly List<(int Id, string Timestamp)> logs = new();
    private static readonly string[] GranularityFormats =
    {
        "Year", "Month", "Day", "Hour", "Minute", "Second"
    };
    private static readonly int[] GranularityLengths = { 4, 7, 10, 13, 16, 19 };

    public void Put(int id, string timestamp)
    {
        logs.Add((id, timestamp));
    }

    public IList<int> Retrieve(string start, string end, string granularity)
    {
        int index = Array.IndexOf(GranularityFormats, granularity);
        int length = GranularityLengths[index];

        var startPrefix = start.Substring(0, length);
        var endPrefix = end.Substring(0, length);

        var result = new List<int>();
        foreach (var (id, timestamp) in logs)
        {
            var prefix = timestamp.Substring(0, length);
            if (string.CompareOrdinal(prefix, startPrefix) >= 0 && string.CompareOrdinal(prefix, endPrefix) <= 0)
                result.Add(id);
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(1)` per `Put`, `O(n)` per `Retrieve`.
- **Space:** `O(n)` for the stored logs.
