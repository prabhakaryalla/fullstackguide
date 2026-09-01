# 3279. Maximum Total Area Occupied by Pistons

**Difficulty:** Hard
**Category:** Array, Binary Search, Dynamic Programming, Sorting

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
You are given three integer arrays `left`, `right`, and `height`, each of length `n`, describing `n` cylindrical pistons. The `i`-th piston occupies the horizontal interval `[left[i], right[i])` and has height `height[i]`; the area it occupies while active is `(right[i] - left[i]) * height[i]`. At most one piston may be active over any horizontal position at a time, so the set of active pistons must have pairwise non-overlapping intervals. Return the maximum possible total area occupied by choosing a subset of non-overlapping pistons.

### Example

```
Input: left = [0,1,2], right = [2,3,4], height = [3,2,2]
Output: 10
Explanation: Choosing pistons 0 ([0,2), area 6) and 2 ([2,4), area 4) does not overlap, giving a total area of 10, which is optimal.
```

## Approach
This is the classic weighted interval scheduling problem. Sort the pistons by their `right` endpoint. Process them in that order while maintaining `dp[i]` = the best total area achievable using only the first `i` sorted pistons. For each piston, binary search for the latest earlier piston whose `right` endpoint is `<=` this piston's `left` endpoint (its non-overlapping predecessor), and choose the better of skipping the current piston or including it (its own area plus the best result up to its predecessor).

## C# Solution

```csharp
public class Solution 
{
    public long MaxTotalArea(int[] left, int[] right, int[] height) 
    {
        int n = left.Length;
        var pistons = new (int left, int right, long area)[n];

        for (int i = 0; i < n; i++) 
        {
            pistons[i] = (left[i], right[i], (long)(right[i] - left[i]) * height[i]);
        }

        Array.Sort(pistons, (a, b) => a.right.CompareTo(b.right));

        int[] rightEnds = new int[n];
        for (int i = 0; i < n; i++) 
        {
            rightEnds[i] = pistons[i].right;
        }

        long[] dp = new long[n + 1];

        for (int i = 1; i <= n; i++) 
        {
            var current = pistons[i - 1];
            int predecessor = FindLastNonOverlapping(rightEnds, i - 1, current.left);
            long includeArea = current.area + (predecessor == -1 ? 0 : dp[predecessor + 1]);
            dp[i] = Math.Max(dp[i - 1], includeArea);
        }

        return dp[n];
    }

    // Binary search for the rightmost index in rightEnds[0..count-1] whose value <= target.
    private int FindLastNonOverlapping(int[] rightEnds, int count, int target) 
    {
        int lo = 0, hi = count - 1, result = -1;

        while (lo <= hi) 
        {
            int mid = lo + (hi - lo) / 2;
            if (rightEnds[mid] <= target) 
            {
                result = mid;
                lo = mid + 1;
            } 
            else 
            {
                hi = mid - 1;
            }
        }

        return result;
    }
}
```

## Complexity

- **Time:** O(n log n) for sorting and the per-piston binary search.
- **Space:** O(n) for the DP array and sorted pistons.
