# 2655. Find Maximal Uncovered Ranges

**Difficulty:** Medium
**Category:** Array, Sorting
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

You are given an integer `n` representing the range `[0, n - 1]`, and a 2D integer array `ranges` where `ranges[i] = [start_i, end_i]` represents all the integers from `start_i` to `end_i` (inclusive) that are covered.

Return the length of the maximum uncovered range within `[0, n - 1]`. An uncovered range is a maximal contiguous subrange that is not covered by any interval in `ranges`.

### Example

```
Input: n = 10, ranges = [[3,5],[7,8]]
Output: 3
Explanation: The ranges [0,2], [6,6], and [9,9] are uncovered. The longest uncovered range is [0,2] with length 3.

Input: n = 8, ranges = [[0,3],[6,7]]
Output: 2
Explanation: The ranges [4,5] is the longest uncovered range with length 2.
```

## Approach

Sort the ranges by their start position. Merge overlapping ranges. Then find the maximum gap between consecutive merged ranges or between the boundaries and the merged ranges.

## C# Solution

```csharp
public class Solution
{
    public int MaximumUncoveredLength(int n, int[][] ranges)
    {
        if (ranges.Length == 0)
        {
            return n;
        }
        
        Array.Sort(ranges, (a, b) => a[0].CompareTo(b[0]));
        
        var merged = new List<int[]>();
        merged.Add(ranges[0]);
        
        for (int i = 1; i < ranges.Length; i++)
        {
            var last = merged[merged.Count - 1];
            if (ranges[i][0] <= last[1] + 1)
            {
                last[1] = Math.Max(last[1], ranges[i][1]);
            }
            else
            {
                merged.Add(ranges[i]);
            }
        }
        
        int maxLen = merged[0][0];
        
        for (int i = 0; i < merged.Count - 1; i++)
        {
            int gap = merged[i + 1][0] - merged[i][1] - 1;
            maxLen = Math.Max(maxLen, gap);
        }
        
        maxLen = Math.Max(maxLen, n - 1 - merged[merged.Count - 1][1]);
        
        return maxLen;
    }
}
```

## Complexity

- **Time:** O(m log m) where m is the number of ranges
- **Space:** O(m) for storing merged ranges
