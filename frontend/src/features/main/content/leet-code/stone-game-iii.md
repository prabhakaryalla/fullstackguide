# 1406. Stone Game III

**Difficulty:** Hard
**Category:** Array, Math, Dynamic Programming, Game Theory

## Problem

Alice and Bob take turns (Alice first) removing `1`, `2`, or `3` stones from the **front** of a row of piles, `stoneValue`, adding the removed piles' values to their own score. Both play optimally to maximize their own score. Return `"Alice"`, `"Bob"`, or `"Tie"` depending on who ends with the higher score (values may be negative).

### Example

```
Input: stoneValue = [1,2,3,-9]
Output: "Alice"
```

## Approach

Define `dp[i]` as the best possible score difference (current player's score minus the opponent's score) achievable from the subarray starting at index `i`. From position `i`, the current player can take `1`, `2`, or `3` piles; whichever they take becomes their gain, and the opponent then plays optimally on the rest, so the current player's net advantage is `takenSum - dp[i + k]`. Compute `dp` from right to left and read the sign of `dp[0]` to decide the winner.

## C# Solution

```csharp
public class Solution
{
    public string StoneGameIII(int[] stoneValue)
    {
        int n = stoneValue.Length;
        int[] dp = new int[n + 1];

        for (int i = n - 1; i >= 0; i--)
        {
            dp[i] = int.MinValue;
            int take = 0;

            for (int k = 0; k < 3 && i + k < n; k++)
            {
                take += stoneValue[i + k];
                dp[i] = Math.Max(dp[i], take - dp[i + k + 1]);
            }
        }

        if (dp[0] > 0) return "Alice";
        if (dp[0] < 0) return "Bob";
        return "Tie";
    }
}
```

## Complexity

- **Time:** `O(n)` since each position looks ahead at most 3 steps.
- **Space:** `O(n)` for the `dp` array.
