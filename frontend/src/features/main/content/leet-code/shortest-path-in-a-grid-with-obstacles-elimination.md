# 1293. Shortest Path in a Grid with Obstacles Elimination

**Difficulty:** Hard
**Category:** Array, Breadth-First Search, Matrix

## Problem

Given an `m x n` grid where `1` marks an obstacle and `0` marks free space, and an integer `k` representing the number of obstacles you're allowed to eliminate, return the minimum number of steps to travel from the top-left to the bottom-right cell, or `-1` if it isn't possible even after eliminating up to `k` obstacles.

### Example

```
Input: grid = [[0,0,0],[1,1,0],[0,0,0],[0,1,1],[0,0,0]], k = 1
Output: 6
```

## Approach

Run a BFS whose state is `(row, col, remainingEliminations)` rather than just `(row, col)`, since arriving at the same cell with a different number of eliminations left represents a genuinely different situation. Moving into an obstacle consumes one elimination; moving into free space doesn't. Track visited `(row, col, remaining)` triples to avoid revisiting equivalent states, and return the step count as soon as the bottom-right cell is reached — BFS guarantees this is the minimum. Capping `k` at `rows + cols - 2` (the shortest possible path length) keeps the state space bounded.

## C# Solution

```csharp
public class Solution
{
    public int ShortestPath(int[][] grid, int k)
    {
        int rows = grid.Length, cols = grid[0].Length;
        if (rows == 1 && cols == 1) return 0;

        k = Math.Min(k, rows + cols - 2);

        var visited = new bool[rows, cols, k + 1];
        visited[0, 0, k] = true;

        var queue = new Queue<(int R, int C, int K, int Steps)>();
        queue.Enqueue((0, 0, k, 0));

        int[] dr = { -1, 1, 0, 0 };
        int[] dc = { 0, 0, -1, 1 };

        while (queue.Count > 0)
        {
            var (r, c, remaining, steps) = queue.Dequeue();

            for (int d = 0; d < 4; d++)
            {
                int nr = r + dr[d], nc = c + dc[d];
                if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;

                int nk = remaining - grid[nr][nc];
                if (nk < 0 || visited[nr, nc, nk]) continue;

                if (nr == rows - 1 && nc == cols - 1) return steps + 1;

                visited[nr, nc, nk] = true;
                queue.Enqueue((nr, nc, nk, steps + 1));
            }
        }

        return -1;
    }
}
```

## Complexity

- **Time:** `O(rows * cols * k)`.
- **Space:** `O(rows * cols * k)`.
