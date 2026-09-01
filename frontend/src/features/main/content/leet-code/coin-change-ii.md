# 518. Coin Change II

**Difficulty:** Medium
**Category:** Array, Dynamic Programming

## Problem

Given an integer `amount` and an array `coins` of coin denominations, return the number of combinations that make up that amount, using an unlimited supply of each coin denomination.

### Example

```
Input: amount = 5, coins = [1,2,5]
Output: 4
```

### Constraints

- `1 <= coins.length <= 300`
- `1 <= coins[i] <= 5000`
- All values of `coins` are unique.
- `0 <= amount <= 5000`

## Approach

Use an unbounded knapsack counting DP where `dp[i]` is the number of ways to form amount `i`. Process coins one at a time, iterating the amount forward (not backward, since each coin may be reused): this ordering ensures that combinations, not permutations, are counted — because for each coin, all its usages are considered together before moving to the next coin.

## C# Solution

```csharp
public class Solution
{
    public int Change(int amount, int[] coins)
    {
        var dp = new int[amount + 1];
        dp[0] = 1;

        foreach (var coin in coins)
        {
            for (int i = coin; i <= amount; i++)
                dp[i] += dp[i - coin];
        }

        return dp[amount];
    }
}
```

## Complexity

- **Time:** `O(amount * coins.Length)`.
- **Space:** `O(amount)` for the DP array.
