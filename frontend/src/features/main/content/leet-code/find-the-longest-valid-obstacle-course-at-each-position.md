# 1964. Find the Longest Valid Obstacle Course at Each Position

**Difficulty:** Hard
**Category:** Array, Binary Search, Binary Indexed Tree

## Problem

Given an array `obstacles`, for each index `i` find the length of the longest subsequence ending at `i` (using only earlier or equal indices, in order) that is non-decreasing. Return an array `ans` where `ans[i]` is that length for each `i`.

### Example

```
Input: obstacles = [1,2,3,2]
Output: [1,2,3,3]
Explanation: ans[3]=3 using subsequence [1,2,2].
```

### Constraints

- `n == obstacles.length`
- `1 <= n <= 10^5`
- `1 <= obstacles[i] <= 10^7`

## Approach

Maintain a "tails" array like in patience sorting for longest non-decreasing subsequence: `tails[k]` holds the smallest possible tail value of a non-decreasing subsequence of length `k+1` seen so far. For each new value, use binary search (upper bound, since non-decreasing allows equal values to extend) to find the first position in `tails` strictly greater than the value — replace it there (or append if none found); the 1-indexed position found is `ans[i]`.

## C# Solution

```csharp
public class Solution
{
    public int[] LongestObstacleCourseAtEachPosition(int[] obstacles)
    {
        int n = obstacles.Length;
        int[] ans = new int[n];
        var tails = new List<int>();

        for (int i = 0; i < n; i++)
        {
            int pos = UpperBound(tails, obstacles[i]);
            if (pos == tails.Count)
            {
                tails.Add(obstacles[i]);
            }
            else
            {
                tails[pos] = obstacles[i];
            }
            ans[i] = pos + 1;
        }

        return ans;
    }

    private int UpperBound(List<int> tails, int value)
    {
        int lo = 0, hi = tails.Count;
        while (lo < hi)
        {
            int mid = lo + (hi - lo) / 2;
            if (tails[mid] <= value) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    }
}
```

## Complexity

- **Time:** `O(n log n)` — a binary search per element.
- **Space:** `O(n)` for the tails array and output.
