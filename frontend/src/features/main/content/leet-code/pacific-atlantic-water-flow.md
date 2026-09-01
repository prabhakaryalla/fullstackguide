# 417. Pacific Atlantic Water Flow

**Difficulty:** Medium
**Category:** Array, Depth-First Search, Breadth-First Search, Matrix

## Problem

Given an `m x n` matrix `heights` representing the height of each cell, where the Pacific Ocean touches the left and top edges and the Atlantic Ocean touches the right and bottom edges, return a list of grid coordinates where water can flow to both oceans. Water flows from a cell to an adjacent one with an equal or lower height.

### Example

```
Input: heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]
Output: [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]
```

### Constraints

- `m == heights.length`
- `n == heights[r].length`
- `1 <= m, n <= 200`
- `0 <= heights[r][c] <= 10^5`

## Approach

Instead of checking every cell's downhill path to both oceans, flow backward (uphill) from each ocean's border cells using depth-first search, marking every cell reachable from that ocean. A cell that is marked reachable from both the Pacific-border search and the Atlantic-border search can flow to both oceans.

## C# Solution

```csharp
public class Solution
{
    private static readonly int[][] Directions = { new[] { 1, 0 }, new[] { -1, 0 }, new[] { 0, 1 }, new[] { 0, -1 } };

    public IList<IList<int>> PacificAtlantic(int[][] heights)
    {
        int rows = heights.Length, cols = heights[0].Length;
        var pacific = new bool[rows, cols];
        var atlantic = new bool[rows, cols];

        for (int c = 0; c < cols; c++)
        {
            Dfs(heights, 0, c, pacific);
            Dfs(heights, rows - 1, c, atlantic);
        }

        for (int r = 0; r < rows; r++)
        {
            Dfs(heights, r, 0, pacific);
            Dfs(heights, r, cols - 1, atlantic);
        }

        var result = new List<IList<int>>();
        for (int r = 0; r < rows; r++)
        {
            for (int c = 0; c < cols; c++)
            {
                if (pacific[r, c] && atlantic[r, c])
                    result.Add(new List<int> { r, c });
            }
        }

        return result;
    }

    private void Dfs(int[][] heights, int r, int c, bool[,] visited)
    {
        visited[r, c] = true;
        int rows = heights.Length, cols = heights[0].Length;

        foreach (var dir in Directions)
        {
            int nr = r + dir[0], nc = c + dir[1];
            if (nr < 0 || nr >= rows || nc < 0 || nc >= cols || visited[nr, nc]) continue;
            if (heights[nr][nc] < heights[r][c]) continue;

            Dfs(heights, nr, nc, visited);
        }
    }
}
```

## Complexity

- **Time:** `O(rows * cols)`.
- **Space:** `O(rows * cols)` for the visited grids and recursion stack.
