# 1872. Stone Game VIII

**Difficulty:** Hard
**Category:** Array, Dynamic Programming, Prefix Sum, Game Theory

## Problem

Alice and Bob alternate turns (Alice first) on an array `stones`. On each turn, a player chooses `x > 1` and takes the first `x` stones, scoring the sum of those stones — but every valid move must leave at least one stone for the game to (optionally) continue. Both play optimally to maximize their own total score minus the opponent's. Return the final score difference (Alice's score minus Bob's).

### Example

```
Input: stones = [-1,2,-3,4,-5]
Output: 5
```

## Approach

Build prefix sums of `stones`. Define `dp[i]` as the best achievable score difference for the player to move, considering only prefix boundaries up to index `i` as candidate "take the first `i+1` stones" moves. Processing indices from right to left, `dp[i] = max(dp[i+1], prefix[i] - dp[i+1])`: either skip taking exactly `i+1` stones now (defer to a larger take captured by `dp[i+1]`), or take the first `i+1` stones (scoring `prefix[i]`) and let the opponent optimally continue from there (subtracting their best achievable `dp[i+1]`). The answer is `dp[1]` since the first valid move must take at least 2 stones.

## C# Solution

```csharp
public class Solution
{
    public int StoneGameVIII(int[] stones)
    {
        int n = stones.Length;
        var prefix = new long[n];
        prefix[0] = stones[0];
        for (int i = 1; i < n; i++) prefix[i] = prefix[i - 1] + stones[i];

        long dp = prefix[n - 1];
        for (int i = n - 2; i >= 1; i--)
        {
            dp = Math.Max(dp, prefix[i] - dp);
        }

        return (int)dp;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the prefix sums.
