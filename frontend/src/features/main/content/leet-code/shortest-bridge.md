# 934. Shortest Bridge

**Difficulty:** Medium
**Category:** Array, Breadth-First Search, Depth-First Search, Matrix

## Problem

Given a binary matrix `grid` containing exactly two islands (groups of `1`s connected 4-directionally), return the minimum number of `0`s that must be flipped to `1` to connect the two islands.

### Example

```
Input: grid = [[0,1],[1,0]]
Output: 1
```

## Approach

Find the first island with a DFS, marking every one of its cells and pushing them into a queue as BFS sources. Then run a multi-source BFS layer by layer, expanding into adjacent water cells; the first time the BFS reaches a `1` that belongs to the second island, the number of layers expanded is the answer.

## C# Solution

```csharp
public class Solution
{
    private static readonly (int, int)[] Directions = { (0, 1), (0, -1), (1, 0), (-1, 0) };

    public int ShortestBridge(int[][] grid)
    {
        int n = grid.Length;
        var queue = new Queue<(int, int)>();
        bool found = false;

        for (int i = 0; i < n && !found; i++)
        {
            for (int j = 0; j < n && !found; j++)
            {
                if (grid[i][j] == 1)
                {
                    Dfs(grid, i, j, queue);
                    found = true;
                }
            }
        }

        int steps = 0;

        while (queue.Count > 0)
        {
            int size = queue.Count;

            for (int k = 0; k < size; k++)
            {
                var (r, c) = queue.Dequeue();

                foreach (var (dr, dc) in Directions)
                {
                    int nr = r + dr, nc = c + dc;
                    if (nr < 0 || nr >= n || nc < 0 || nc >= n || grid[nr][nc] == 2) continue;
                    if (grid[nr][nc] == 1) return steps;

                    grid[nr][nc] = 2;
                    queue.Enqueue((nr, nc));
                }
            }

            steps++;
        }

        return -1;
    }

    private void Dfs(int[][] grid, int r, int c, Queue<(int, int)> queue)
    {
        int n = grid.Length;
        if (r < 0 || r >= n || c < 0 || c >= n || grid[r][c] != 1) return;

        grid[r][c] = 2;
        queue.Enqueue((r, c));

        Dfs(grid, r + 1, c, queue);
        Dfs(grid, r - 1, c, queue);
        Dfs(grid, r, c + 1, queue);
        Dfs(grid, r, c - 1, queue);
    }
}
```

## Complexity

- **Time:** `O(n^2)`.
- **Space:** `O(n^2)`.
