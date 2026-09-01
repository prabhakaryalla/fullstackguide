# 286. Walls and Gates

**Difficulty:** Medium
**Category:** Array, Breadth-First Search, Matrix

## Problem

Given an `m x n` grid of rooms, where `-1` represents a wall, `0` represents a gate, and `INF` (`2147483647`) represents an empty room, fill each empty room with the distance to its nearest gate, in place. If a room cannot reach a gate, it should remain `INF`.

### Example

```
Input: rooms =
[[INF,-1,0,INF],
 [INF,INF,INF,-1],
 [INF,-1,INF,-1],
 [0,-1,INF,INF]]
Output:
[[3,-1,0,1],
 [2,2,1,-1],
 [1,-1,2,-1],
 [0,-1,3,4]]
```

## Approach

Instead of running a BFS/search from every empty room (expensive), run a multi-source BFS starting from *all* gates simultaneously. Enqueue every gate cell first, then expand outward level by level, assigning each newly reached empty room a distance one greater than the cell it came from. Because BFS explores in order of distance, the first time a room is reached is guaranteed to be via the nearest gate.

## C# Solution

```csharp
public class Solution
{
    public void WallsAndGates(int[][] rooms)
    {
        if (rooms.Length == 0) return;

        int m = rooms.Length, n = rooms[0].Length;
        var queue = new Queue<(int Row, int Col)>();

        for (int r = 0; r < m; r++)
        {
            for (int c = 0; c < n; c++)
            {
                if (rooms[r][c] == 0) queue.Enqueue((r, c));
            }
        }

        int[] dr = { -1, 1, 0, 0 };
        int[] dc = { 0, 0, -1, 1 };

        while (queue.Count > 0)
        {
            var (row, col) = queue.Dequeue();

            for (int d = 0; d < 4; d++)
            {
                int nr = row + dr[d], nc = col + dc[d];
                if (nr < 0 || nr >= m || nc < 0 || nc >= n || rooms[nr][nc] != int.MaxValue) continue;

                rooms[nr][nc] = rooms[row][col] + 1;
                queue.Enqueue((nr, nc));
            }
        }
    }
}
```

## Complexity

- **Time:** `O(m * n)` — each cell is enqueued and processed at most once.
- **Space:** `O(m * n)` — for the BFS queue in the worst case.
