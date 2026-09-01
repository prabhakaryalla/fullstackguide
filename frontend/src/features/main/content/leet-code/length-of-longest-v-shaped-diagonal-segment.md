# 3459. Length of Longest V-Shaped Diagonal Segment

**Difficulty:** Hard
**Category:** Array, Dynamic Programming, Matrix

## Problem
You are given a 2D grid of integers containing only `0`, `1`, and `2`. A "V-shaped diagonal segment" starts at some cell and moves diagonally in one of four directions, alternating strictly between the values `1` and `2` (starting with `1`), and is allowed to make at most one 90-degree turn (clockwise) during its traversal, continuing to alternate correctly after the turn. Return the length of the longest such V-shaped diagonal segment found anywhere in the grid.

## Approach
Use memoized DFS/DP over states `(row, col, direction, expectedValue, turnsUsed)`. From each starting cell containing `1`, attempt to extend diagonally in each of the 4 directions, alternating the expected value between 1 and 2 as you move. At each step, in addition to continuing straight, you may also take one clockwise turn (changing direction to the next diagonal direction in clockwise order) if you haven't turned yet, continuing to alternate values. Memoize on `(row, col, direction, turnsUsed)` since the expected value is determined by the parity of the path length so far relative to the start. Take the maximum length over all starting cells and directions.

## C# Solution

```csharp
public class Solution 
{
    private int[][] grid;
    private int rows, cols;
    private int[,,,] memo; // [row, col, dir, turnUsed] -> best length continuing from here (expected value implied by caller)
    private static readonly int[] dr = { -1, -1, 1, 1 };
    private static readonly int[] dc = { -1, 1, 1, -1 };

    public int LenOfVDiagonal(int[][] grid) 
    {
        this.grid = grid;
        rows = grid.Length;
        cols = grid[0].Length;
        memo = new int[rows, cols, 4, 2];
        for (int r = 0; r < rows; r++)
            for (int c = 0; c < cols; c++)
                for (int d = 0; d < 4; d++)
                    for (int t = 0; t < 2; t++)
                        memo[r, c, d, t] = -1;

        int best = 0;

        for (int r = 0; r < rows; r++)
        {
            for (int c = 0; c < cols; c++)
            {
                if (grid[r][c] == 1)
                {
                    for (int d = 0; d < 4; d++)
                    {
                        int length = 1 + Dfs(r + dr[d], c + dc[d], d, 2, 0);
                        best = System.Math.Max(best, length);
                    }
                }
            }
        }

        return best;
    }

    private int Dfs(int r, int c, int dir, int expected, int turnUsed)
    {
        if (r < 0 || r >= rows || c < 0 || c >= cols) return 0;
        if (grid[r][c] != expected) return 0;

        if (memo[r, c, dir, turnUsed] != -1) return memo[r, c, dir, turnUsed];

        int nextExpected = expected == 1 ? 2 : 1;

        // continue straight
        int best = Dfs(r + dr[dir], c + dc[dir], dir, nextExpected, turnUsed);

        // try one clockwise turn if not used yet
        if (turnUsed == 0)
        {
            int turnDir = (dir + 1) % 4;
            int turned = Dfs(r + dr[turnDir], c + dc[turnDir], turnDir, nextExpected, 1);
            best = System.Math.Max(best, turned);
        }

        int result = 1 + best;
        memo[r, c, dir, turnUsed] = result;
        return result;
    }
}
```

## Complexity

- **Time:** O(rows * cols * 4) due to memoized states
- **Space:** O(rows * cols * 4 * 2) for the memoization table
