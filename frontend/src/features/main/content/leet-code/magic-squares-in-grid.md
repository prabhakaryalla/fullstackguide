# 840. Magic Squares In Grid

**Difficulty:** Medium
**Category:** Array, Matrix

## Problem

Given a `grid`, return the number of 3x3 contiguous subgrids that are "magic squares" — containing each of the numbers `1` through `9` exactly once, with every row, column, and both diagonals summing to the same value.

### Example

```
Input: grid = [[4,3,8,4],[9,5,1,9],[2,7,6,2]]
Output: 1
```

## Approach

For every possible top-left corner of a 3x3 subgrid, check the magic-square property directly: verify all 9 values are distinct and within `1-9`, then compute all three row sums, three column sums, and both diagonal sums, confirming they all equal the same target value (using the first row's sum as the reference).

## C# Solution

```csharp
public class Solution
{
    public int NumMagicSquaresInside(int[][] grid)
    {
        int rows = grid.Length, cols = grid[0].Length;
        int count = 0;

        for (int r = 0; r + 2 < rows; r++)
        {
            for (int c = 0; c + 2 < cols; c++)
            {
                if (IsMagic(grid, r, c))
                    count++;
            }
        }

        return count;
    }

    private bool IsMagic(int[][] grid, int r, int c)
    {
        var seen = new bool[10];

        for (int i = 0; i < 3; i++)
        {
            for (int j = 0; j < 3; j++)
            {
                int val = grid[r + i][c + j];
                if (val < 1 || val > 9 || seen[val]) return false;
                seen[val] = true;
            }
        }

        int[] rowSums = new int[3];
        int[] colSums = new int[3];
        int diag1 = 0, diag2 = 0;

        for (int i = 0; i < 3; i++)
        {
            for (int j = 0; j < 3; j++)
            {
                rowSums[i] += grid[r + i][c + j];
                colSums[j] += grid[r + i][c + j];
            }

            diag1 += grid[r + i][c + i];
            diag2 += grid[r + i][c + 2 - i];
        }

        int target = rowSums[0];

        for (int i = 1; i < 3; i++)
        {
            if (rowSums[i] != target || colSums[i - 1] != target) return false;
        }

        if (colSums[2] != target) return false;

        return diag1 == target && diag2 == target;
    }
}
```

## Complexity

- **Time:** `O(rows * cols)`.
- **Space:** `O(1)` extra.
