# 352. Data Stream as Disjoint Intervals

**Difficulty:** Hard
**Category:** Design, Binary Search, Sorted Container

## Problem

Given a data stream of non-negative integers, summarize the numbers seen so far as a list of disjoint intervals. Implement the `SummaryRanges` class with `AddNum(value)` to add a number to the stream, and `GetIntervals()` to return the current disjoint interval list, sorted by start value.

### Example

```
Input:
["SummaryRanges", "addNum", "getIntervals", "addNum", "getIntervals", "addNum", "getIntervals"]
[[], [1], [], [3], [], [7], []]
Output:
[null, null, [[1,1]], null, [[1,1],[3,3]], null, [[1,1],[3,3],[7,7]]]
```

### Constraints

- `0 <= value <= 10^4`
- At most `3 * 10^4` calls will be made to `AddNum` and `GetIntervals`.

## Approach

Maintain a sorted list of `[start, end]` intervals. For each new value, binary search for the first interval whose start is `>=` the value. If the value already falls inside the previous interval, do nothing; otherwise, check whether it can merge with the interval immediately before and/or after it, merging or inserting a new single-value interval as needed.

## C# Solution

```csharp
public class SummaryRanges
{
    private readonly List<int[]> intervals = new();

    public void AddNum(int value)
    {
        int index = LowerBound(value);

        if (index > 0 && intervals[index - 1][1] >= value)
            return; // Already covered by the previous interval.

        bool mergeLeft = index > 0 && intervals[index - 1][1] + 1 == value;
        bool mergeRight = index < intervals.Count && intervals[index][0] - 1 == value;

        if (mergeLeft && mergeRight)
        {
            intervals[index - 1][1] = intervals[index][1];
            intervals.RemoveAt(index);
        }
        else if (mergeLeft)
        {
            intervals[index - 1][1] = value;
        }
        else if (mergeRight)
        {
            intervals[index][0] = value;
        }
        else
        {
            intervals.Insert(index, new[] { value, value });
        }
    }

    public int[][] GetIntervals() => intervals.ToArray();

    private int LowerBound(int value)
    {
        int lo = 0, hi = intervals.Count;
        while (lo < hi)
        {
            int mid = lo + (hi - lo) / 2;
            if (intervals[mid][0] < value) lo = mid + 1;
            else hi = mid;
        }

        return lo;
    }
}
```

## Complexity

- **Time:** `O(log n)` for the binary search plus `O(n)` worst-case for the list insertion/removal per `AddNum` call; `O(n)` for `GetIntervals`.
- **Space:** `O(n)` for the interval list.
