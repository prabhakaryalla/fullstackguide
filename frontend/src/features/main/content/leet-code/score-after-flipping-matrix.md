# 861. Score After Flipping Matrix

**Difficulty:** Medium
**Category:** Array, Greedy, Bit Manipulation, Matrix

## Problem

Given a binary matrix `grid`, you may choose any row or column and flip every value in it (`0` becomes `1` and vice versa), any number of times. Afterward, each row is read as a binary number, and the total score is the sum of all row values. Return the highest possible score.

### Example

```
Input: grid = [[0,0,1,1],[1,0,1,0],[1,1,0,0]]
Output: 39
```

## Approach

Since the leading bit of every row contributes the most to its value, first flip any row whose first element is `0`, ensuring every row starts with `1` (this is always beneficial and doesn't affect other rows). After that, for each remaining column, flipping it turns some `0`s into `1`s and vice versa; the best choice is whichever orientation yields more `1`s in that column (since flipping is independent per column and doesn't affect other columns' bit positions). Sum each column's resulting count of `1`s (or its complement, whichever is larger) weighted by its positional value (a power of 2 based on distance from the leftmost column).

## C# Solution

```csharp
public class Solution
{
    public int MatrixScore(int[][] grid)
    {
        int rows = grid.Length, cols = grid[0].Length;

        for (int r = 0; r < rows; r++)
        {
            if (grid[r][0] == 0)
            {
                for (int c = 0; c < cols; c++)
                    grid[r][c] ^= 1;
            }
        }

        int total = 0;

        for (int c = 0; c < cols; c++)
        {
            int onesCount = 0;
            for (int r = 0; r < rows; r++)
                onesCount += grid[r][c];

            int columnValue = Math.Max(onesCount, rows - onesCount);
            total += columnValue * (1 << (cols - 1 - c));
        }

        return total;
    }
}
```

## Complexity

- **Time:** `O(rows * cols)`.
- **Space:** `O(1)` extra.
