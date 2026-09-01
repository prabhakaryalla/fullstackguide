# 1368. Minimum Cost to Make at Least One Valid Path in a Grid

**Difficulty:** Hard
**Category:** Array, Breadth-First Search, Graph, Matrix, Heap (Priority Queue)

## Problem

Given a grid where each cell has a direction sign (pointing to one of its four neighbors), return the minimum cost to modify signs so there is a valid path from the top-left to the bottom-right, where following a cell's current sign costs `0` and changing it costs `1`.

### Example

```
Input: grid = [[1,1,1,1],[2,2,2,2],[1,1,1,1],[2,2,2,2]]
Output: 3
```

## Approach

Model this as a shortest-path problem where following the existing sign's direction is a `0`-weight edge and moving to any other neighbor is a `1`-weight edge, then apply a 0-1 BFS using a double-ended queue: push `0`-cost moves to the front and `1`-cost moves to the back, guaranteeing cells are finalized in true shortest-cost order.

## C# Solution

```csharp
public class Solution
{
    public int MinCost(int[][] grid)
    {
        int m = grid.Length, n = grid[0].Length;
        int[][] dirs = { new[] { 0, 1 }, new[] { 0, -1 }, new[] { 1, 0 }, new[] { -1, 0 } };

        var dist = new int[m, n];
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                dist[i, j] = int.MaxValue;

        dist[0, 0] = 0;
        var deque = new LinkedList<(int r, int c)>();
        deque.AddFirst((0, 0));

        while (deque.Count > 0)
        {
            var (r, c) = deque.First.Value;
            deque.RemoveFirst();

            for (int dir = 0; dir < 4; dir++)
            {
                int nr = r + dirs[dir][0], nc = c + dirs[dir][1];
                if (nr < 0 || nr >= m || nc < 0 || nc >= n) continue;

                int cost = grid[r][c] == dir + 1 ? 0 : 1;
                if (dist[r, c] + cost < dist[nr, nc])
                {
                    dist[nr, nc] = dist[r, c] + cost;
                    if (cost == 0) deque.AddFirst((nr, nc));
                    else deque.AddLast((nr, nc));
                }
            }
        }

        return dist[m - 1, n - 1];
    }
}
```

## Complexity

- **Time:** `O(m * n)`.
- **Space:** `O(m * n)` for the distance grid and deque.
