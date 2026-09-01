# 562. Longest Line of Consecutive One in Matrix

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Matrix
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given an `m x n` binary matrix `mat`, return the length of the longest line of consecutive `1`s in the matrix, where the line can be horizontal, vertical, diagonal, or anti-diagonal.

### Example

```
Input: mat = [[0,1,1,0],[0,1,1,0],[0,0,0,1]]
Output: 3
```

### Constraints

- `1 <= m, n <= 10^4`
- `1 <= m * n <= 10^4`

## Approach

Maintain four separate DP grids, one for each direction (horizontal, vertical, diagonal, anti-diagonal). For every `1` cell, each grid's value is one more than the corresponding value at the appropriate preceding neighbor in that direction (or `1` if there's no such neighbor or it's out of bounds), extending a run of consecutive ones along that specific direction. Track the maximum value across all four grids as the answer.

## C# Solution

```csharp
public class Solution
{
    public int LongestLine(int[][] mat)
    {
        int rows = mat.Length, cols = mat[0].Length;
        var horizontal = new int[rows, cols];
        var vertical = new int[rows, cols];
        var diagonal = new int[rows, cols];
        var antiDiagonal = new int[rows, cols];
        int longest = 0;

        for (int r = 0; r < rows; r++)
        {
            for (int c = 0; c < cols; c++)
            {
                if (mat[r][c] == 0) continue;

                horizontal[r, c] = (c > 0 ? horizontal[r, c - 1] : 0) + 1;
                vertical[r, c] = (r > 0 ? vertical[r - 1, c] : 0) + 1;
                diagonal[r, c] = (r > 0 && c > 0 ? diagonal[r - 1, c - 1] : 0) + 1;
                antiDiagonal[r, c] = (r > 0 && c < cols - 1 ? antiDiagonal[r - 1, c + 1] : 0) + 1;

                longest = Math.Max(longest, Math.Max(horizontal[r, c], vertical[r, c]));
                longest = Math.Max(longest, Math.Max(diagonal[r, c], antiDiagonal[r, c]));
            }
        }

        return longest;
    }
}
```

## Complexity

- **Time:** `O(rows * cols)`.
- **Space:** `O(rows * cols)` for the four DP grids.
