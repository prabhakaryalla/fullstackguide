# 3693. Climbing Stairs II

**Difficulty:** Medium
**Category:** Array, Dynamic Programming

## Problem

You are climbing a staircase with `n + 1` steps, numbered from `0` to `n`.

You are given a 1-indexed integer array `costs` of length `n`, where `costs[i]` is the cost of step `i`.

From step `i`, you can jump only to step `i + 1`, `i + 2`, or `i + 3`. The cost of jumping from step `i` to step `j` is `costs[j] + (j - i)^2`.

You start from step `0` with `cost = 0`. Return the minimum total cost to reach step `n`.

### Example

```
Input: n = 4, costs = [1,2,3,4]
Output: 13
Explanation: Path 0 -> 1 -> 2 -> 4 costs 2 + 3 + 8 = 13.
```

### Constraints

- `1 <= n == costs.length <= 10^5`
- `1 <= costs[i] <= 10^4`

## Approach

Use dynamic programming where `dp[j]` is the minimum cost to reach step `j`, with `dp[0] = 0`. For each step `j` from `1` to `n`, look back at the (up to) three steps `j - 1`, `j - 2`, and `j - 3` that could jump directly to `j`, and take the minimum of `dp[i] + costs[j] + (j - i)^2` over those. The answer is `dp[n]`.

## C# Solution

```csharp
public class Solution
{
    public int ClimbStairs(int n, int[] costs)
    {
        long[] dp = new long[n + 1];

        for (int i = 1; i <= n; i++)
        {
            dp[i] = long.MaxValue;

            for (int step = 1; step <= 3 && step <= i; step++)
            {
                int prev = i - step;
                if (dp[prev] == long.MaxValue) continue;

                long jumpCost = costs[i - 1] + (long)step * step;
                dp[i] = Math.Min(dp[i], dp[prev] + jumpCost);
            }
        }

        return (int)dp[n];
    }
}
```

## Complexity

- **Time:** `O(n)` — each step only looks back at a constant number of predecessors.
- **Space:** `O(n)` for the DP array.
