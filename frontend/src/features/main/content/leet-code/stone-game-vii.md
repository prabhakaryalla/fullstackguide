# 1690. Stone Game VII

**Difficulty:** Medium
**Category:** Array, Math, Dynamic Programming, Game Theory

## Problem

Given `stones`, two players alternately remove either the leftmost or rightmost stone, scoring the sum of the *remaining* stones after their removal. Both play optimally to maximize the difference between their own total score and the opponent's. Return the difference between the winner's and loser's scores.

### Example

```
Input: stones = [5,3,1,4,2]
Output: 6
```

## Approach

Use interval DP: `dp[i][j]` is the best score difference (current player minus opponent) achievable from the subarray `stones[i..j]`. The current player either removes the left end (scoring `sum(i+1, j)`, leaving the opponent with `dp[i+1][j]` relative advantage which becomes a disadvantage from this player's perspective) or the right end (scoring `sum(i, j-1)`); take whichever option maximizes `score - dp[nextState]`. Precompute prefix sums for O(1) range-sum queries.

## C# Solution

```csharp
public class Solution
{
    public int StoneGameVII(int[] stones)
    {
        int n = stones.Length;
        int[] prefix = new int[n + 1];

        for (int i = 0; i < n; i++)
        {
            prefix[i + 1] = prefix[i] + stones[i];
        }

        int[,] dp = new int[n, n];

        for (int length = 2; length <= n; length++)
        {
            for (int i = 0; i + length - 1 < n; i++)
            {
                int j = i + length - 1;
                int sumRange = prefix[j + 1] - prefix[i];
                int removeLeft = (sumRange - stones[i]) - dp[i + 1, j];
                int removeRight = (sumRange - stones[j]) - dp[i, j - 1];
                dp[i, j] = Math.Max(removeLeft, removeRight);
            }
        }

        return dp[0, n - 1];
    }
}
```

## Complexity

- **Time:** `O(n^2)`.
- **Space:** `O(n^2)`.
