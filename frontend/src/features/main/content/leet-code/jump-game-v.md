# 1340. Jump Game V

**Difficulty:** Hard
**Category:** Array, Dynamic Programming, Sorting

## Problem

Given an array `arr` and an integer `d`, from index `i` you may jump to `i + k` or `i - k` for `1 <= k <= d`, provided the jump doesn't cross any index with a value `>= arr[i]` and stays in bounds. Return the maximum number of indices visitable starting from any index.

### Example

```
Input: arr = [6,4,14,6,8,13,9,7,10,6,12], d = 2
Output: 4
```

## Approach

Process indices in ascending order of their value, since an index can only jump to indices with strictly smaller values. For each index, compute `dp[i]` (the longest visitable chain starting there) by looking up to `d` steps left and right, stopping the scan in a direction as soon as a taller or equal-height barrier is hit, and taking `1 + max(dp[j])` over the reachable, already-processed neighbors.

## C# Solution

```csharp
public class Solution
{
    public int MaxJumps(int[] arr, int d)
    {
        int n = arr.Length;
        var order = Enumerable.Range(0, n).OrderBy(i => arr[i]).ToArray();
        var dp = new int[n];

        foreach (int i in order)
        {
            int best = 1;

            for (int dir = -1; dir <= 1; dir += 2)
            {
                for (int k = 1; k <= d; k++)
                {
                    int j = i + dir * k;
                    if (j < 0 || j >= n || arr[j] >= arr[i]) break;
                    best = Math.Max(best, 1 + dp[j]);
                }
            }

            dp[i] = best;
        }

        return dp.Max();
    }
}
```

## Complexity

- **Time:** `O(n * d)`.
- **Space:** `O(n)` for the DP array and ordering.
