# 879. Profitable Schemes

**Difficulty:** Hard
**Category:** Array, Dynamic Programming

## Problem

Given `n` available members, a minimum required `minProfit`, and parallel arrays `group` and `profit` describing crimes (each requiring some members and yielding some profit), return the number of distinct subsets of crimes that use at most `n` members in total and yield at least `minProfit` total profit, modulo `10^9 + 7`.

### Example

```
Input: n = 5, minProfit = 3, group = [2,2], profit = [2,3]
Output: 2
```

## Approach

Use a 0/1 knapsack-style DP over two dimensions: members used and profit achieved (capped at `minProfit`, since any profit at or above that threshold is equivalent for counting purposes). `dp[usedMembers][cappedProfit]` counts the number of subsets achieving that exact state. For each crime, iterate members-used and profit in decreasing order (to ensure each crime is only used once per subset) and add its contribution to the appropriate new state. The final answer sums `dp[usedMembers][minProfit]` over every possible member count from `0` to `n`.

## C# Solution

```csharp
public class Solution
{
    public int ProfitableSchemes(int n, int minProfit, int[] group, int[] profit)
    {
        const int MOD = 1_000_000_007;
        int m = group.Length;

        var dp = new long[n + 1, minProfit + 1];
        dp[0, 0] = 1;

        for (int i = 0; i < m; i++)
        {
            int members = group[i];
            int gain = profit[i];

            for (int used = n; used >= members; used--)
            {
                for (int p = minProfit; p >= 0; p--)
                {
                    int newProfit = Math.Min(minProfit, p + gain);
                    dp[used, newProfit] = (dp[used, newProfit] + dp[used - members, p]) % MOD;
                }
            }
        }

        long total = 0;
        for (int used = 0; used <= n; used++)
            total = (total + dp[used, minProfit]) % MOD;

        return (int)total;
    }
}
```

## Complexity

- **Time:** `O(m * n * minProfit)`.
- **Space:** `O(n * minProfit)` for the DP table.
