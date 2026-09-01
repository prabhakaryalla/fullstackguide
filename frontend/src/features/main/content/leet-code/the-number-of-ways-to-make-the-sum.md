# 3183. The Number of Ways to Make the Sum

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Math

## Problem
You have an unlimited supply of coins with values 1, 2, and 6, plus two special "combo" coins worth 4 (equivalent to using two 2s in one move) and 8 (equivalent to using two 4s or four 2s in one move) that can each be used at most once. Count the number of distinct ways (as ordered sequences of coin picks) to make a total sum equal to `n`, modulo `10^9 + 7`.

## Approach
First, compute `dp[i]`, the number of ordered ways to make sum `i` using only the base unlimited coins of value 1, 2, and 6 (a standard unbounded coin-change counting DP, processed coin by coin to preserve a consistent counting convention). Then, since the special coins of value 4 and 8 can each be used at most once (and are equivalent in value to combinations of the base coins, but represent additional distinct "ways" when used as the special single coin), the final answer combines: the ways without using either special coin (`dp[n]`), the ways using the value-4 special coin instead of reaching that portion via base coins (`dp[n - 4]`), and the ways using the value-8 special coin (`dp[n - 8]`), each added when the corresponding remainder is non-negative.

## C# Solution
```csharp
public class Solution {
    public int NumberOfWays(int n) {
        const int kMod = 1_000_000_007;
        int[] dp = new int[n + 1];
        dp[0] = 1;

        foreach (int coin in new int[] { 1, 2, 6 })
            for (int i = coin; i <= n; i++)
                dp[i] = (int)((dp[i] + (long)dp[i - coin]) % kMod);

        long ans = dp[n];
        if (n - 4 >= 0)
            ans = (ans + dp[n - 4]) % kMod;
        if (n - 8 >= 0)
            ans = (ans + dp[n - 8]) % kMod;

        return (int)ans;
    }
}
```

## Complexity
- Time: O(n)
- Space: O(n)
