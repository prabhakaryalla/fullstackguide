# 2373. Largest Local Values in a Matrix

**Difficulty:** Easy
**Category:** Array, Matrix

## Problem

You are given an `n x n` integer matrix `grid`.

Generate an integer matrix `maxLocal` of size `(n - 2) x (n - 2)` such that:

`maxLocal[i][j]` is equal to the largest value of the `3 x 3` matrix in `grid` centered around row `i + 1` and column `j + 1`.

In other words, we want to find the largest value in every contiguous `3 x 3` matrix in `grid`.

Return the generated matrix.

### Example

```
Input: grid = [[9,9,8,1],[5,6,2,6],[8,2,6,4],[6,2,2,2]]
Output: [[9,9],[8,6]]
```

## Approach

For each position `(i, j)` in the output matrix, find the maximum of the 3x3 submatrix starting at `(i, j)` in the input grid.

## C# Solution

```csharp
public class Solution
{
    public int[][] LargestLocal(int[][] grid)
    {
        int n = grid.Length;
        var maxLocal = new int[n - 2][];
        
        for (int i = 0; i < n - 2; i++)
        {
            maxLocal[i] = new int[n - 2];
            for (int j = 0; j < n - 2; j++)
            {
                int max = 0;
                for (int r = i; r < i + 3; r++)
                {
                    for (int c = j; c < j + 3; c++)
                    {
                        max = Math.Max(max, grid[r][c]);
                    }
                }
                maxLocal[i][j] = max;
            }
        }
        
        return maxLocal;
    }
}
```

## Complexity

- **Time:** O(n^2)
- **Space:** O(1) excluding output
