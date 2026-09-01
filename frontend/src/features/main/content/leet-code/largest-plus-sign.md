# 764. Largest Plus Sign

**Difficulty:** Medium
**Category:** Array, Dynamic Programming

## Problem

Given an integer `n` and a list of `mines` (cells with a `0`), consider an `n x n` grid filled with `1`s except at the mine cells. Return the order (arm length) of the largest axis-aligned plus sign of `1`s centered at any cell, where a plus sign of order `k` has arms of length `k-1` extending in all 4 directions from its center, entirely made of `1`s.

### Example

```
Input: n = 5, mines = [[4,2]]
Output: 2
```

## Approach

For each cell, the largest plus sign centered there is limited by the shortest of the four consecutive runs of `1`s extending left, right, up, and down from it (including itself). Compute these four directional run-lengths with four separate linear scans (one per direction across every row or column), taking the minimum across all four scans for each cell, and track the overall maximum.

## C# Solution

```csharp
public class Solution
{
    public int OrderOfLargestPlusSign(int n, int[][] mines)
    {
        var dp = new int[n][];
        for (int i = 0; i < n; i++)
        {
            dp[i] = new int[n];
            Array.Fill(dp[i], n);
        }

        var mineSet = new HashSet<(int, int)>();
        foreach (var mine in mines)
            mineSet.Add((mine[0], mine[1]));

        for (int r = 0; r < n; r++)
        {
            int count = 0;
            for (int c = 0; c < n; c++)
            {
                count = mineSet.Contains((r, c)) ? 0 : count + 1;
                dp[r][c] = Math.Min(dp[r][c], count);
            }

            count = 0;
            for (int c = n - 1; c >= 0; c--)
            {
                count = mineSet.Contains((r, c)) ? 0 : count + 1;
                dp[r][c] = Math.Min(dp[r][c], count);
            }
        }

        int result = 0;

        for (int c = 0; c < n; c++)
        {
            int count = 0;
            for (int r = 0; r < n; r++)
            {
                count = mineSet.Contains((r, c)) ? 0 : count + 1;
                dp[r][c] = Math.Min(dp[r][c], count);
            }

            count = 0;
            for (int r = n - 1; r >= 0; r--)
            {
                count = mineSet.Contains((r, c)) ? 0 : count + 1;
                dp[r][c] = Math.Min(dp[r][c], count);
                result = Math.Max(result, dp[r][c]);
            }
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n^2)`.
- **Space:** `O(n^2)` for the DP grid.
