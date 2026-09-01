# 2777. Date Range Generator

**Difficulty:** Medium
**Category:** Closure
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
Implement a generator function `dateRangeGenerator(start, end, step)` that lazily yields date values from `start` to `end` (inclusive), advancing by `step` days each time.

### Example
```
Input: start = 2024-01-01, end = 2024-01-04, step = 2
Output: yields 2024-01-01, then 2024-01-03
```

## Approach
Adapted to C# using an iterator method (`yield return`) over `DateTime`, which provides the same lazy, pull-based generation semantics as a JavaScript generator function.

## C# Solution

```csharp
public class Solution
{
    public static IEnumerable<DateTime> DateRangeGenerator(DateTime start, DateTime end, int step)
    {
        for (var date = start; date <= end; date = date.AddDays(step))
        {
            yield return date;
        }
    }
}
```

## Complexity

- **Time:** O((end - start) / step) total across the full enumeration; O(1) per yielded value.
- **Space:** O(1), since values are generated lazily.
