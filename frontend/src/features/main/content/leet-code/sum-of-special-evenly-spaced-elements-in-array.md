# 1714. Sum Of Special Evenly-Spaced Elements In Array

**Difficulty:** Hard
**Category:** Array, Math, Dynamic Programming

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a 0-indexed array `nums` and queries `[xi, yi]`, for each query compute `nums[xi] + nums[xi + yi] + nums[xi + 2*yi] + ...` for all valid indices, modulo `10^9 + 7`.

### Example

```
Input: nums = [0,1,2,3,4,5,6,7,8,9], queries = [[0,3],[5,4]]
Output: [12,4]
```

## Approach

This is a classic sqrt-decomposition trick. For every step size `y` up to `sqrt(n)`, precompute a suffix-style DP array `dp[y][i] = nums[i] + dp[y][i + y]`, giving O(1) answers for small steps. For step sizes larger than `sqrt(n)`, a direct loop only visits at most `sqrt(n)` elements, so it can be computed on the fly.

## C# Solution

```csharp
public class Solution
{
    public IList<int> Solve(int[] nums, int[][] queries)
    {
        const int Mod = 1_000_000_007;
        int n = nums.Length;
        int sqrtN = (int)Math.Sqrt(n) + 1;

        var dp = new int[sqrtN + 1][];
        for (int y = 1; y <= sqrtN; y++)
        {
            dp[y] = new int[n];
            for (int i = n - 1; i >= 0; i--)
            {
                dp[y][i] = nums[i];
                if (i + y < n) dp[y][i] = (int)((dp[y][i] + (long)dp[y][i + y]) % Mod);
            }
        }

        var result = new List<int>();
        foreach (var q in queries)
        {
            int x = q[0], y = q[1];
            if (y <= sqrtN)
            {
                result.Add(dp[y][x]);
            }
            else
            {
                long sum = 0;
                for (int i = x; i < n; i += y) sum = (sum + nums[i]) % Mod;
                result.Add((int)sum);
            }
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n * sqrt(n) + q * sqrt(n))`.
- **Space:** `O(n * sqrt(n))` for the precomputed tables.
