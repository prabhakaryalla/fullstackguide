# 1706. Where Will the Ball Fall

**Difficulty:** Medium
**Category:** Array, Matrix, Simulation

## Problem

A 2D grid of size `m x n` represents a box; each cell has a diagonal board: `1` redirects a ball to the cell to its lower-right, `-1` redirects it to the lower-left. A ball dropped into column `i` may get stuck at a "V" shape formed by two facing diagonals, or fall out the bottom. For each starting column, return the column it ends in, or `-1` if it gets stuck.

### Example

```
Input: grid = [[1,1,1,-1,-1],[1,1,1,-1,-1],[-1,-1,-1,1,1],[1,1,1,1,-1],[-1,-1,-1,-1,-1]]
Output: [1,-1,-1,-1,-1]
```

## Approach

Simulate each ball independently row by row. At each row, compute the next column using the current cell's direction; if the next column is out of bounds or the adjacent cell's direction disagrees (forming a V), the ball is stuck.

## C# Solution

```csharp
public class Solution
{
    public int[] FindBall(int[][] grid)
    {
        int m = grid.Length, n = grid[0].Length;
        int[] result = new int[n];

        for (int start = 0; start < n; start++)
        {
            int col = start;
            bool stuck = false;

            for (int row = 0; row < m; row++)
            {
                int dir = grid[row][col];
                int nextCol = col + dir;
                if (nextCol < 0 || nextCol >= n || grid[row][nextCol] != dir)
                {
                    stuck = true;
                    break;
                }
                col = nextCol;
            }

            result[start] = stuck ? -1 : col;
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(m * n)`.
- **Space:** `O(n)` for the output (excluding it).
