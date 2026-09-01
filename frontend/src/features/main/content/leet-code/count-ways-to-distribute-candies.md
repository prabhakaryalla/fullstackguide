# 1692. Count Ways to Distribute Candies

**Difficulty:** Hard
**Category:** Dynamic Programming

## Problem

Given `n` distinct candies distributed among exactly `k` bags (every bag must receive at least one candy, and bags are unlabeled), return the number of distinct ways to distribute them, modulo `10^9 + 7`.

### Example

```
Input: n = 3, k = 2
Output: 3
```

## Approach

This is the classic Stirling numbers of the second kind recurrence. Let `dp[i][j]` be the number of ways to distribute the first `i` candies into exactly `j` non-empty unlabeled groups. Candy `i` either starts a brand-new group (`dp[i-1][j-1]`) or joins one of the `j` already-existing groups (`j * dp[i-1][j]`).

## C# Solution

```csharp
public class Solution
{
    private const int Mod = 1_000_000_007;

    public int WaysToDistribute(int n, int k)
    {
        long[,] dp = new long[n + 1, k + 1];
        dp[0, 0] = 1;

        for (int i = 1; i <= n; i++)
        {
            for (int j = 1; j <= k; j++)
            {
                dp[i, j] = (dp[i - 1, j - 1] + (long)j * dp[i - 1, j]) % Mod;
            }
        }

        return (int)dp[n, k];
    }
}
```

## Complexity

- **Time:** `O(n * k)`.
- **Space:** `O(n * k)`.
