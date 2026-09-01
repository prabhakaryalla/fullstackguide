# 2245. Maximum Trailing Zeros in a Cornered Path

**Difficulty:** Medium
**Category:** Array, Matrix, Prefix Sum

## Problem

You are given a 2D integer array `grid`. A cornered path is a path that starts from a cell, moves in one direction, then turns 90 degrees and continues. Return the maximum number of trailing zeros in the product of a cornered path.

### Example

```
Input: grid = [[23,17,15,3,20],[8,1,20,27,11],[9,4,6,2,21],[40,9,1,10,6],[22,7,4,5,3]]
Output: 3
```

## Approach

Trailing zeros come from pairs of factors 2 and 5. For each cell, precompute prefix counts of factors 2 and 5 from all four directions (up, down, left, right). For each cell as a corner, try all four possible L-shaped paths and compute min(count2, count5) for each path.

## C# Solution

```csharp
public class Solution
{
    public int MaxTrailingZeros(int[][] grid)
    {
        int m = grid.Length, n = grid[0].Length;
        var twos = new int[m, n];
        var fives = new int[m, n];
        
        for (int i = 0; i < m; i++)
        {
            for (int j = 0; j < n; j++)
            {
                int val = grid[i][j];
                while (val % 2 == 0) { twos[i, j]++; val /= 2; }
                val = grid[i][j];
                while (val % 5 == 0) { fives[i, j]++; val /= 5; }
            }
        }
        
        var prefixT = new int[m, n, 4];
        var prefixF = new int[m, n, 4];
        
        for (int i = 0; i < m; i++)
        {
            for (int j = 0; j < n; j++)
            {
                prefixT[i, j, 0] = twos[i, j] + (j > 0 ? prefixT[i, j - 1, 0] : 0);
                prefixF[i, j, 0] = fives[i, j] + (j > 0 ? prefixF[i, j - 1, 0] : 0);
                prefixT[i, j, 1] = twos[i, j] + (i > 0 ? prefixT[i - 1, j, 1] : 0);
                prefixF[i, j, 1] = fives[i, j] + (i > 0 ? prefixF[i - 1, j, 1] : 0);
            }
        }
        
        for (int i = m - 1; i >= 0; i--)
        {
            for (int j = n - 1; j >= 0; j--)
            {
                prefixT[i, j, 2] = twos[i, j] + (j < n - 1 ? prefixT[i, j + 1, 2] : 0);
                prefixF[i, j, 2] = fives[i, j] + (j < n - 1 ? prefixF[i, j + 1, 2] : 0);
                prefixT[i, j, 3] = twos[i, j] + (i < m - 1 ? prefixT[i + 1, j, 3] : 0);
                prefixF[i, j, 3] = fives[i, j] + (i < m - 1 ? prefixF[i + 1, j, 3] : 0);
            }
        }
        
        int maxZeros = 0;
        for (int i = 0; i < m; i++)
        {
            for (int j = 0; j < n; j++)
            {
                for (int d1 = 0; d1 < 4; d1++)
                {
                    for (int d2 = 0; d2 < 4; d2++)
                    {
                        if (Math.Abs(d1 - d2) != 1 && Math.Abs(d1 - d2) != 3) continue;
                        int t = prefixT[i, j, d1] + prefixT[i, j, d2] - twos[i, j];
                        int f = prefixF[i, j, d1] + prefixF[i, j, d2] - fives[i, j];
                        maxZeros = Math.Max(maxZeros, Math.Min(t, f));
                    }
                }
            }
        }
        
        return maxZeros;
    }
}
```

## Complexity

- **Time:** O(m * n)
- **Space:** O(m * n)
