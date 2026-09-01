# 980. Unique Paths III

**Difficulty:** Hard
**Category:** Array, Backtracking, Bitmask, Matrix

## Problem

Given a grid where `1` marks the start, `2` marks the end, `0` marks walkable squares, and `-1` marks obstacles, return the number of distinct paths from start to end that walk over *every* non-obstacle square exactly once.

### Example

```
Input: grid = [[1,0,0,0],[0,0,0,0],[0,0,2,-1]]
Output: 2
```

## Approach

Count the total number of empty squares that must be visited, then backtrack from the start: at each step, mark the current square visited (temporarily set to an obstacle), recurse into all 4 neighbors, and undo the mark afterward. Whenever the end square is reached, it's a valid path only if the exact required number of empty squares remain unvisited (i.e. all of them were visited along the way).

## C# Solution

```csharp
public class Solution
{
    private int paths;

    public int UniquePathsIII(int[][] grid)
    {
        int rows = grid.Length, cols = grid[0].Length;
        int startR = 0, startC = 0, empty = 0;

        for (int r = 0; r < rows; r++)
        {
            for (int c = 0; c < cols; c++)
            {
                if (grid[r][c] == 1) { startR = r; startC = c; }
                if (grid[r][c] == 0) empty++;
            }
        }

        paths = 0;
        Dfs(grid, startR, startC, empty);
        return paths;
    }

    private void Dfs(int[][] grid, int r, int c, int remaining)
    {
        int rows = grid.Length, cols = grid[0].Length;
        if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] == -1) return;

        if (grid[r][c] == 2)
        {
            if (remaining == 0) paths++;
            return;
        }

        int original = grid[r][c];
        grid[r][c] = -1;

        Dfs(grid, r + 1, c, remaining - 1);
        Dfs(grid, r - 1, c, remaining - 1);
        Dfs(grid, r, c + 1, remaining - 1);
        Dfs(grid, r, c - 1, remaining - 1);

        grid[r][c] = original;
    }
}
```

## Complexity

- **Time:** `O(3^k)` for `k` empty squares, worst case.
- **Space:** `O(rows * cols)` recursion depth.
