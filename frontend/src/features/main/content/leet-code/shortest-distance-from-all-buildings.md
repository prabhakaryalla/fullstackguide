# 317. Shortest Distance from All Buildings

**Difficulty:** Hard
**Category:** Array, Breadth-First Search, Matrix
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given an `m x n` grid where `0` marks empty land, `1` marks a building, and `2` marks an obstacle, return the shortest total travel distance for a house to be built on an empty land cell that can reach all buildings via 4-directional moves. Return `-1` if no such cell exists.

### Example

```
Input: grid = [[1,0,2,0,1],[0,0,0,0,0],[0,0,1,0,0]]
Output: 7
```

### Constraints

- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 50`

## Approach

For each building, run a breadth-first search outward, accumulating the distance from that building to every reachable empty cell and counting how many buildings can reach each cell. After processing all buildings, the answer is the minimum accumulated distance among empty cells that were reached by every single building (guaranteeing full connectivity).

## C# Solution

```csharp
public class Solution
{
    public int ShortestDistance(int[][] grid)
    {
        int rows = grid.Length, cols = grid[0].Length;
        var totalDistance = new int[rows, cols];
        var reachCount = new int[rows, cols];
        int buildingCount = 0;

        int[][] directions = { new[] { 1, 0 }, new[] { -1, 0 }, new[] { 0, 1 }, new[] { 0, -1 } };

        for (int r = 0; r < rows; r++)
        {
            for (int c = 0; c < cols; c++)
            {
                if (grid[r][c] != 1) continue;

                buildingCount++;
                var visited = new bool[rows, cols];
                var queue = new Queue<(int Row, int Col, int Dist)>();
                queue.Enqueue((r, c, 0));
                visited[r, c] = true;

                while (queue.Count > 0)
                {
                    var (row, col, dist) = queue.Dequeue();

                    foreach (var dir in directions)
                    {
                        int nr = row + dir[0], nc = col + dir[1];
                        if (nr < 0 || nr >= rows || nc < 0 || nc >= cols || visited[nr, nc]) continue;
                        if (grid[nr][nc] != 0) continue;

                        visited[nr, nc] = true;
                        totalDistance[nr, nc] += dist + 1;
                        reachCount[nr, nc]++;
                        queue.Enqueue((nr, nc, dist + 1));
                    }
                }
            }
        }

        int best = -1;
        for (int r = 0; r < rows; r++)
        {
            for (int c = 0; c < cols; c++)
            {
                if (grid[r][c] == 0 && reachCount[r, c] == buildingCount)
                {
                    if (best == -1 || totalDistance[r, c] < best)
                        best = totalDistance[r, c];
                }
            }
        }

        return best;
    }
}
```

## Complexity

- **Time:** `O(buildings * rows * cols)`.
- **Space:** `O(rows * cols)` for the distance and reach-count grids.
