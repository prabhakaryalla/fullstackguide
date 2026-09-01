# 877. Stone Game

**Difficulty:** Medium
**Category:** Array, Math, Dynamic Programming, Game Theory

## Problem

Alice and Bob take turns removing a pile from either end of a row of stone `piles` (Alice first), each keeping the stones from the pile they take, both playing optimally to maximize their own total. Given an even number of piles with distinct total stone counts, return `true` if Alice wins.

### Example

```
Input: piles = [5,3,4,5]
Output: true
```

## Approach

Use interval DP where `dp[i][j]` represents the maximum score difference (current player's score minus opponent's) achievable over the subarray `piles[i..j]`. At each interval, the current player chooses either the leftmost or rightmost pile, then plays optimally against the opponent's best response on the remaining subarray — so `dp[i][j] = max(piles[i] - dp[i+1][j], piles[j] - dp[i][j-1])`. Alice wins if the score difference over the entire array is positive.

## C# Solution

```csharp
public class Solution
{
    public bool StoneGame(int[] piles)
    {
        int n = piles.Length;
        var dp = new int[n, n];

        for (int i = 0; i < n; i++)
            dp[i, i] = piles[i];

        for (int len = 2; len <= n; len++)
        {
            for (int i = 0; i + len - 1 < n; i++)
            {
                int j = i + len - 1;
                dp[i, j] = Math.Max(piles[i] - dp[i + 1, j], piles[j] - dp[i, j - 1]);
            }
        }

        return dp[0, n - 1] > 0;
    }
}
```

## Complexity

- **Time:** `O(n^2)`.
- **Space:** `O(n^2)` for the DP table.
