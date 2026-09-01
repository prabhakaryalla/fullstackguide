# 3565. Sequential Grid Path Cover

**Difficulty:** Hard
**Category:** Array, Backtracking, Matrix

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
You are given an `m x n` grid where each cell contains one of the following:
- `0`: an empty, unlabeled cell.
- A positive integer `label`: a checkpoint that must be visited, with checkpoints visited in strictly increasing order of their label (1, 2, 3, ...).
- `-1`: a blocked cell that cannot be entered.

Find a path that starts at any non-blocked cell, moves between orthogonally adjacent non-blocked cells, visits **every** non-blocked cell in the grid exactly once (a Hamiltonian path), and visits all labeled checkpoint cells in strictly increasing order of their label.

Return a grid of the same dimensions where each non-blocked cell contains the 1-indexed step at which it was visited (blocked cells remain `-1`), or an empty grid if no such path exists.

### Example

```
Input: grid = [[1,0],[0,2]]
Output: [[1,2],[4,3]]
Explanation: Path visits (0,0)->(0,1)->(1,1)->(1,0), touching label 1 first and label 2 third, in order.
```

**Constraints:**
- `1 <= m, n <= 5`
- `grid[i][j]` is `-1`, `0`, or a positive integer; labels are distinct and form a contiguous range starting at 1 if present.

## Approach
Since the grid is small, use backtracking depth-first search. The path must start at the cell labeled `1` if any labels exist (otherwise any unlabeled cell may be the start). At each step, only move to an unvisited, non-blocked neighbor whose label is either `0` (unlabeled, always allowed) or exactly equal to the next expected label. Track the next expected label as the search progresses, and only accept a complete path once every non-blocked cell has been visited and every label has been consumed in order.

## C# Solution

```csharp
public class Solution 
{
    private int m, n, totalCells, maxLabel;
    private int[][] grid;
    private int[][] visitOrder;
    private bool[,] visited;
    private readonly int[] dr = { -1, 1, 0, 0 };
    private readonly int[] dc = { 0, 0, -1, 1 };

    public int[][] SequentialGridPathCover(int[][] grid) 
    {
        this.grid = grid;
        m = grid.Length;
        n = grid[0].Length;
        totalCells = 0;
        maxLabel = 0;

        for (int i = 0; i < m; i++)
        {
            for (int j = 0; j < n; j++)
            {
                if (grid[i][j] != -1) totalCells++;
                if (grid[i][j] > maxLabel) maxLabel = grid[i][j];
            }
        }

        visitOrder = new int[m][];
        for (int i = 0; i < m; i++)
        {
            visitOrder[i] = new int[n];
            for (int j = 0; j < n; j++) visitOrder[i][j] = grid[i][j] == -1 ? -1 : 0;
        }
        visited = new bool[m, n];

        for (int i = 0; i < m; i++)
        {
            for (int j = 0; j < n; j++)
            {
                if (grid[i][j] == -1) continue;
                if (maxLabel >= 1 && grid[i][j] != 1) continue;

                visited[i, j] = true;
                visitOrder[i][j] = 1;
                int nextLabel = grid[i][j] == 1 ? 2 : 1;

                if (Dfs(i, j, 1, nextLabel)) return visitOrder;

                visited[i, j] = false;
                visitOrder[i][j] = 0;
            }
        }

        return new int[0][];
    }

    private bool Dfs(int r, int c, int count, int nextLabel)
    {
        if (count == totalCells) return nextLabel == maxLabel + 1;

        for (int d = 0; d < 4; d++)
        {
            int nr = r + dr[d], nc = c + dc[d];
            if (nr < 0 || nr >= m || nc < 0 || nc >= n) continue;
            if (grid[nr][nc] == -1 || visited[nr, nc]) continue;

            int cellLabel = grid[nr][nc];
            if (cellLabel != 0 && cellLabel != nextLabel) continue;

            visited[nr, nc] = true;
            visitOrder[nr][nc] = count + 1;
            int newNextLabel = cellLabel == nextLabel ? nextLabel + 1 : nextLabel;

            if (Dfs(nr, nc, count + 1, newNextLabel)) return true;

            visited[nr, nc] = false;
            visitOrder[nr][nc] = 0;
        }

        return false;
    }
}
```

## Complexity

- **Time:** O(4^(m*n)) worst case, bounded by the small grid size via backtracking with pruning.
- **Space:** O(m * n), for the visited and visit-order grids and recursion stack.
