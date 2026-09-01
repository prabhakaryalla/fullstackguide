# 807. Max Increase to Keep City Skyline

**Difficulty:** Medium
**Category:** Array, Matrix

## Problem

Given an `n x n` grid of building heights, you may raise the height of any building, as long as the "skyline" viewed from all four cardinal directions (the maximum height in each row and each column) stays unchanged. Return the maximum total sum of height increases possible.

### Example

```
Input: grid = [[3,0,8,4],[2,4,5,7],[9,2,6,3],[0,3,1,0]]
Output: 35
```

## Approach

Compute the maximum height in every row and every column. Each building's height can be raised up to the smaller of its row's maximum and its column's maximum (raising it further would increase that row's or column's skyline). Sum the differences between this cap and each building's current height across the whole grid.

## C# Solution

```csharp
public class Solution
{
    public int MaxIncreaseKeepingSkyline(int[][] grid)
    {
        int n = grid.Length;
        var rowMax = new int[n];
        var colMax = new int[n];

        for (int r = 0; r < n; r++)
        {
            for (int c = 0; c < n; c++)
            {
                rowMax[r] = Math.Max(rowMax[r], grid[r][c]);
                colMax[c] = Math.Max(colMax[c], grid[r][c]);
            }
        }

        int totalIncrease = 0;

        for (int r = 0; r < n; r++)
        {
            for (int c = 0; c < n; c++)
            {
                totalIncrease += Math.Min(rowMax[r], colMax[c]) - grid[r][c];
            }
        }

        return totalIncrease;
    }
}
```

## Complexity

- **Time:** `O(n^2)`.
- **Space:** `O(n)` for the row/column maximum arrays.
