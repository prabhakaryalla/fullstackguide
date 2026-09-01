# 436. Find Right Interval

**Difficulty:** Medium
**Category:** Array, Binary Search, Sorting

## Problem

Given an array of `intervals` where `intervals[i] = [starti, endi]`, for each interval find the index of the interval with the smallest `start` that is greater than or equal to that interval's `end`. Return an array of these indices, using `-1` where no such interval exists.

### Example

```
Input: intervals = [[3,4],[2,3],[1,2]]
Output: [-1,0,1]
```

### Constraints

- `1 <= intervals.length <= 2 * 10^4`
- `intervals[i].length == 2`
- `-10^6 <= starti <= endi <= 10^6`

## Approach

Sort the intervals by start value while remembering each interval's original index. For every interval, binary search this sorted-by-start array for the leftmost start value `>=` the current interval's end, which is exactly the "right interval" being sought.

## C# Solution

```csharp
public class Solution
{
    public int[] FindRightInterval(int[][] intervals)
    {
        int n = intervals.Length;
        var startIndexPairs = new (int Start, int Index)[n];
        for (int i = 0; i < n; i++)
            startIndexPairs[i] = (intervals[i][0], i);

        Array.Sort(startIndexPairs);

        var result = new int[n];
        for (int i = 0; i < n; i++)
        {
            int end = intervals[i][1];
            int index = LowerBound(startIndexPairs, end);
            result[i] = index == n ? -1 : startIndexPairs[index].Index;
        }

        return result;
    }

    private int LowerBound((int Start, int Index)[] pairs, int value)
    {
        int lo = 0, hi = pairs.Length;
        while (lo < hi)
        {
            int mid = lo + (hi - lo) / 2;
            if (pairs[mid].Start < value) lo = mid + 1;
            else hi = mid;
        }

        return lo;
    }
}
```

## Complexity

- **Time:** `O(n log n)`.
- **Space:** `O(n)` for the sorted pairs.
