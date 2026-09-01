# 2297. Non-overlapping Intervals II

**Difficulty:** Medium
**Category:** Array, Greedy, Sorting
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

You are given a 2D integer array `intervals` where `intervals[i] = [starti, endi]` represents all the integers from `starti` to `endi` inclusively.

You are allowed to remove one interval from `intervals`. Return the minimum number of additional intervals you must remove to make the rest of the intervals non-overlapping.

An interval `[a, b]` is considered non-overlapping with another interval `[c, d]` if `b < c` or `d < a`.

### Example

```
Input: intervals = [[1,2],[2,3],[3,4],[1,3]]
Output: 0
Explanation: If we remove [1,3], the remaining intervals are non-overlapping.
After removing one interval as allowed, we don't need to remove any additional intervals.
```

## Approach

Use a greedy approach similar to the classic interval scheduling problem:

1. Try removing each interval one at a time
2. For the remaining intervals after each removal, find the minimum number of intervals to remove to make them non-overlapping
3. Return the minimum across all trials

To find minimum removals for a set of intervals:
- Sort by end time
- Greedily select intervals that don't overlap
- Count how many are removed

## C# Solution

```csharp
public class Solution
{
    public int MinRemoval(int[][] intervals)
    {
        int n = intervals.Length;
        int minRemovals = int.MaxValue;
        
        for (int skip = 0; skip < n; skip++)
        {
            var remaining = new List<int[]>();
            for (int i = 0; i < n; i++)
            {
                if (i != skip)
                {
                    remaining.Add(intervals[i]);
                }
            }
            
            int removals = CountRemovalsNeeded(remaining.ToArray());
            minRemovals = Math.Min(minRemovals, removals);
        }
        
        return minRemovals;
    }
    
    private int CountRemovalsNeeded(int[][] intervals)
    {
        if (intervals.Length == 0) return 0;
        
        Array.Sort(intervals, (a, b) => a[1].CompareTo(b[1]));
        
        int count = 0;
        int lastEnd = intervals[0][1];
        
        for (int i = 1; i < intervals.Length; i++)
        {
            if (intervals[i][0] < lastEnd)
            {
                count++;
            }
            else
            {
                lastEnd = intervals[i][1];
            }
        }
        
        return count;
    }
}
```

## Complexity

- **Time:** O(n^2 log n) where n is the number of intervals
- **Space:** O(n) for storing remaining intervals
