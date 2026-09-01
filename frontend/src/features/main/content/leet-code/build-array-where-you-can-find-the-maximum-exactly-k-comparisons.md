# 1420. Build Array Where You Can Find The Maximum Exactly K Comparisons

**Difficulty:** Hard
**Category:** Dynamic Programming

## Problem

Build an array of `n` positive integers, each between `1` and `m`, such that the "search cost" — the number of times a new running maximum is set while scanning left to right — equals exactly `k`. Return the number of such arrays, modulo `10^9 + 7`.

### Example

```
Input: n = 2, m = 3, k = 1
Output: 6
```

## Approach

Define `dp[len][maxVal][cost]` as the number of ways to build an array of length `len` whose maximum value is `maxVal` and whose search cost is `cost`. Two transitions extend an array of length `len - 1`:

1. Append any value from `1` to `maxVal` (not exceeding the current maximum) — the search cost is unchanged, contributing `maxVal` ways for each existing state.
2. Append a brand-new maximum value `maxVal`, coming from any previous state whose maximum was strictly smaller and whose cost was `cost - 1`.

A running prefix sum over smaller previous maxima makes the second transition efficient. The final answer sums `dp[n][j][k]` over all `j` from `1` to `m`.

## C# Solution

```csharp
public class Solution
{
    public int NumOfArrays(int n, int m, int k)
    {
        const int MOD = 1_000_000_007;

        long[,] dp = new long[m + 1, k + 1];
        for (int j = 1; j <= m; j++) dp[j, 1] = 1;

        for (int len = 2; len <= n; len++)
        {
            long[,] next = new long[m + 1, k + 1];

            for (int cost = 1; cost <= k; cost++)
            {
                long prefixSum = 0;
                for (int j = 1; j <= m; j++)
                {
                    next[j, cost] = (next[j, cost] + dp[j, cost] * j) % MOD;
                    next[j, cost] = (next[j, cost] + prefixSum) % MOD;
                    prefixSum = (prefixSum + dp[j, cost - 1]) % MOD;
                }
            }

            dp = next;
        }

        long result = 0;
        for (int j = 1; j <= m; j++) result = (result + dp[j, k]) % MOD;

        return (int)result;
    }
}
```

## Complexity

- **Time:** `O(n * m * k)`.
- **Space:** `O(m * k)` for the DP table.
