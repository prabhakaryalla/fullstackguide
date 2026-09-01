# 322. Coin Change

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Breadth-First Search

## Problem

Given an integer array `coins` representing coin denominations and an integer `amount`, return the fewest number of coins needed to make up that amount. If it cannot be made up, return `-1`. You may assume an infinite supply of each coin.

### Example

```
Input: coins = [1,2,5], amount = 11
Output: 3
Explanation: 11 = 5 + 5 + 1
```

### Constraints

- `1 <= coins.length <= 12`
- `1 <= coins[i] <= 2^31 - 1`
- `0 <= amount <= 10^4`

## Approach

Use bottom-up dynamic programming where `dp[i]` is the minimum number of coins needed for amount `i`, initialized to a sentinel larger than any possible answer except `dp[0] = 0`. For each amount, try every coin that fits and take the best result from `dp[i - coin] + 1`.

## C# Solution

```csharp
public class Solution
{
    public int CoinChange(int[] coins, int amount)
    {
        var dp = new int[amount + 1];
        Array.Fill(dp, amount + 1);
        dp[0] = 0;

        for (int i = 1; i <= amount; i++)
        {
            foreach (var coin in coins)
            {
                if (coin <= i)
                    dp[i] = Math.Min(dp[i], dp[i - coin] + 1);
            }
        }

        return dp[amount] > amount ? -1 : dp[amount];
    }
}
```

## Complexity

- **Time:** `O(amount * coins.length)`.
- **Space:** `O(amount)` for the DP array.
