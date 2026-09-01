# 2209. Minimum White Tiles After Covering With Carpets

**Difficulty:** Hard
**Category:** String, Dynamic Programming, Prefix Sum

## Problem

You are given a 0-indexed binary string `floor` representing the floor of a hallway. `floor[i]` is `'1'` if the i-th tile is white and `'0'` if black.

You are also given `numCarpets` and `carpetLen`. You have `numCarpets` carpets, each of length `carpetLen`. Carpets can overlap.

Return the minimum number of white tiles still visible after covering the floor with carpets.

### Example

```
Input: floor = "10110101", numCarpets = 2, carpetLen = 2
Output: 2
Explanation: Place carpets at positions [0,1] and [3,4] to cover tiles.
White tiles at positions 5 and 7 remain visible.
```

## Approach

Use dynamic programming:
- `dp[i][j]` = minimum white tiles visible in first i positions using j carpets
- For each position, we can either:
  1. Not place a carpet: `dp[i][j] = dp[i-1][j] + (floor[i-1] == '1' ? 1 : 0)`
  2. Place a carpet ending at position i: `dp[i][j] = dp[max(0, i-carpetLen)][j-1]`

Use prefix sum to optimize counting white tiles.

## C# Solution

```csharp
public class Solution
{
    public int MinimumWhiteTiles(string floor, int numCarpets, int carpetLen)
    {
        int n = floor.Length;
        
        // If we have enough carpets to cover everything
        if (numCarpets * carpetLen >= n)
        {
            return 0;
        }
        
        // Prefix sum of white tiles
        int[] white = new int[n + 1];
        for (int i = 0; i < n; i++)
        {
            white[i + 1] = white[i] + (floor[i] == '1' ? 1 : 0);
        }
        
        // dp[i][j] = min white tiles in first i positions using j carpets
        int[][] dp = new int[n + 1][];
        for (int i = 0; i <= n; i++)
        {
            dp[i] = new int[numCarpets + 1];
            Array.Fill(dp[i], int.MaxValue / 2);
        }
        
        dp[0][0] = 0;
        
        for (int i = 1; i <= n; i++)
        {
            for (int j = 0; j <= numCarpets; j++)
            {
                // Don't place carpet at position i
                dp[i][j] = Math.Min(dp[i][j], dp[i - 1][j] + (floor[i - 1] == '1' ? 1 : 0));
                
                // Place a carpet covering position i
                if (j > 0)
                {
                    int start = Math.Max(0, i - carpetLen);
                    dp[i][j] = Math.Min(dp[i][j], dp[start][j - 1]);
                }
            }
        }
        
        return dp[n][numCarpets];
    }
}
```

## Complexity

- **Time:** O(n * numCarpets)
- **Space:** O(n * numCarpets)
