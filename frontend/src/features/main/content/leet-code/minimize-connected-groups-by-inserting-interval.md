# 3323. Minimize Connected Groups by Inserting Interval

**Difficulty:** Medium
**Category:** Array, Two Pointers, Sorting, Sliding Window
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
You are given a 2D array `intervals` representing disjoint, sorted, merged "connected groups", and an integer `k`, the length of a new interval you may place anywhere on the number line. Placing the new interval merges it with any existing groups it overlaps or touches. Return the minimum possible number of connected groups remaining after optimally placing the new interval.

### Example

Input: `intervals = [[1,3],[5,7],[9,12]], k = 3`

Output: `2`

Explanation: Placing the new length-3 interval at `[3,6]` merges `[1,3]` and `[5,7]` into one group, leaving `[1,7]` and `[9,12]` — 2 groups total.

## Approach
Since the new interval can start anywhere, bridging a contiguous run of existing groups `intervals[left..right]` into a single group is possible exactly when `intervals[right][1] - intervals[left][0] <= k` (i.e., an interval of length `k` can be positioned to fully span from the start of the first group to the end of the last). Use a two-pointer sliding window over the sorted, disjoint intervals to find the largest such run, which reduces the group count by `(right - left)`. The answer is the original number of groups minus this maximum possible reduction.

## C# Solution

```csharp
public class Solution 
{
    public int MinConnectedGroups(int[][] intervals, int k) 
    {
        int n = intervals.Length;
        Array.Sort(intervals, (a, b) => a[0].CompareTo(b[0]));

        int maxMerge = 0;
        int left = 0;
        for (int right = 0; right < n; right++) 
        {
            while (intervals[right][1] - intervals[left][0] > k) left++;
            maxMerge = Math.Max(maxMerge, right - left);
        }

        return n - maxMerge;
    }
}
```

## Complexity

- **Time:** O(n log n) for the sort, O(n) for the sliding window
- **Space:** O(1) extra (excluding the sort)
