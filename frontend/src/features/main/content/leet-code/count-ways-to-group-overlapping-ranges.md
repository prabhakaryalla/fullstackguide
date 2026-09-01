# 2580. Count Ways to Group Overlapping Ranges

**Difficulty:** Medium
**Category:** Array, Sorting

## Problem

You are given a 2D integer array `ranges` where `ranges[i] = [start_i, end_i]` denotes that all integers between `start_i` and `end_i` (inclusive) are contained in the `i`th range.

You are to split `ranges` into two groups (possibly empty) such that:
- Each range belongs to exactly one group
- Any two overlapping ranges must be in the same group

Two ranges are overlapping if there exists at least one integer that is in both ranges.

Return the total number of ways to split `ranges` into two groups. Since the answer may be very large, return it modulo `10^9 + 7`.

### Example

```
Input: ranges = [[6,10],[5,15]]
Output: 2
Explanation: The two ranges overlap, so they must be in the same group.
Ways: {[6,10],[5,15], []} or {[], [6,10],[5,15]}

Input: ranges = [[1,3],[10,20],[2,5],[4,8]]
Output: 4
Explanation: After sorting and merging: [[1,8],[10,20]]
These 2 groups can be distributed in 2^2 = 4 ways
```

## Approach

1. Sort ranges by start time
2. Merge overlapping ranges to find the number of independent groups
3. If there are `k` independent groups, the answer is `2^k` (each group can go to either of the two sets)

Ranges `[a,b]` and `[c,d]` overlap if `max(a,c) <= min(b,d)`.

## C# Solution

```csharp
public class Solution
{
    public int CountWays(int[][] ranges)
    {
        const int MOD = 1_000_000_007;
        
        Array.Sort(ranges, (a, b) => a[0].CompareTo(b[0]));
        
        int groups = 1;
        int currentEnd = ranges[0][1];
        
        for (int i = 1; i < ranges.Length; i++)
        {
            if (ranges[i][0] > currentEnd)
            {
                groups++;
                currentEnd = ranges[i][1];
            }
            else
            {
                currentEnd = Math.Max(currentEnd, ranges[i][1]);
            }
        }
        
        long result = 1;
        for (int i = 0; i < groups; i++)
        {
            result = (result * 2) % MOD;
        }
        
        return (int)result;
    }
}
```

## Complexity

- **Time:** O(n log n) for sorting
- **Space:** O(1) excluding sort space
