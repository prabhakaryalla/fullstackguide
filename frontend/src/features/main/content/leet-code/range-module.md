# 715. Range Module

**Difficulty:** Hard
**Category:** Design, Segment Tree, Ordered Set

## Problem

Design a data structure that tracks ranges of numbers, supporting `AddRange(left, right)` (tracks the half-open interval `[left, right)`), `QueryRange(left, right)` (returns whether every real number in `[left, right)` is currently tracked), and `RemoveRange(left, right)` (stops tracking the interval `[left, right)`).

### Example

```
Input:
["RangeModule", "addRange", "removeRange", "queryRange", "queryRange", "queryRange"]
[[], [10, 20], [14, 16], [10, 14], [13, 15], [16, 17]]
Output:
[null, null, null, true, false, true]
```

## Approach

Maintain a sorted list of disjoint, non-adjacent tracked intervals. `AddRange` merges the new interval with any existing intervals it overlaps or touches, replacing them with a single combined interval while keeping the list sorted. `RemoveRange` splits any interval that overlaps the removed range, keeping only the portions outside `[left, right)`. `QueryRange` simply checks whether any single tracked interval fully contains the queried range.

## C# Solution

```csharp
public class RangeModule
{
    private readonly List<(int Start, int End)> ranges = new();

    public void AddRange(int left, int right)
    {
        var newRanges = new List<(int, int)>();
        int i = 0;
        int n = ranges.Count;

        while (i < n && ranges[i].End < left)
        {
            newRanges.Add(ranges[i]);
            i++;
        }

        while (i < n && ranges[i].Start <= right)
        {
            left = Math.Min(left, ranges[i].Start);
            right = Math.Max(right, ranges[i].End);
            i++;
        }

        newRanges.Add((left, right));

        while (i < n)
        {
            newRanges.Add(ranges[i]);
            i++;
        }

        ranges.Clear();
        ranges.AddRange(newRanges);
    }

    public bool QueryRange(int left, int right)
    {
        foreach (var (start, end) in ranges)
        {
            if (start <= left && right <= end)
                return true;
        }

        return false;
    }

    public void RemoveRange(int left, int right)
    {
        var newRanges = new List<(int, int)>();

        foreach (var (start, end) in ranges)
        {
            if (end <= left || start >= right)
            {
                newRanges.Add((start, end));
            }
            else
            {
                if (start < left) newRanges.Add((start, left));
                if (end > right) newRanges.Add((right, end));
            }
        }

        ranges.Clear();
        ranges.AddRange(newRanges);
    }
}
```

## Complexity

- **Time:** `O(n)` per operation, where `n` is the number of tracked intervals.
- **Space:** `O(n)` for the interval list.
