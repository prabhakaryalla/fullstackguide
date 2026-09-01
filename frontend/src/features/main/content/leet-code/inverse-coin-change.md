# 3592. Inverse Coin Change

**Difficulty:** Medium
**Category:** Dynamic Programming, Array

## Problem
The classic coin change problem asks for the minimum number of coins (from a given set of denominations `coins`) needed to form a target amount. This is the inverse: given `coins` and an integer `k`, find the **smallest amount** whose minimum-coin representation uses **exactly** `k` coins. Return `-1` if no such amount exists.

## Approach
Compute the standard unbounded-knapsack "minimum coins to form amount" DP (`dp[amount]` = fewest coins needed, `int.MaxValue` if unreachable) for all amounts up to a safe upper bound. Using `k` copies of the largest denomination always reaches an amount solvable in at most `k` coins, so it is enough to search amounts up to `k * maxCoin`. Scan amounts from smallest to largest and return the first one whose minimum-coin count equals exactly `k`.

## C# Solution

```csharp
public class Solution 
{
    public int InverseCoinChange(int[] coins, int k)
    {
        if (k == 0) return 0;

        int maxCoin = 0;
        foreach (var c in coins) maxCoin = Math.Max(maxCoin, c);

        long bound = (long)k * maxCoin;
        if (bound > 200000) bound = 200000; // practical cap for this reference implementation
        int upperBound = (int)bound;

        var dp = new int[upperBound + 1];
        Array.Fill(dp, int.MaxValue);
        dp[0] = 0;

        for (int amount = 1; amount <= upperBound; amount++)
        {
            foreach (var c in coins)
            {
                if (c <= amount && dp[amount - c] != int.MaxValue)
                {
                    dp[amount] = Math.Min(dp[amount], dp[amount - c] + 1);
                }
            }
        }

        for (int amount = 1; amount <= upperBound; amount++)
        {
            if (dp[amount] == k) return amount;
        }

        return -1;
    }
}
```

## Complexity

- **Time:** O(bound · coins.Length), where `bound = k * maxCoin`.
- **Space:** O(bound)
