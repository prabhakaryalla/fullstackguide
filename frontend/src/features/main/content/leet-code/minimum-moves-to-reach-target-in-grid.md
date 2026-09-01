# 3609. Minimum Moves to Reach Target in Grid

**Difficulty:** Medium
**Category:** Breadth-First Search, Matrix, Graph

## Problem
You are given an `m x n` grid of integers. A value of `0` marks an empty cell, `1` marks a blocked cell, and any value `>= 2` marks a **portal** cell; all portal cells sharing the same value are linked, and stepping onto any one of them lets you instantly teleport to any other portal cell with the same value at no extra cost. Starting at `(0, 0)` and moving one step at a time in the four cardinal directions (up/down/left/right) into an in-bounds, non-blocked cell, return the minimum number of moves required to reach `(m - 1, n - 1)`. Return `-1` if it is impossible.

## Approach
Model this as a shortest-path problem on a graph where normal adjacent moves cost `1` and portal-to-portal teleports cost `0`, then solve with a **0-1 BFS** using a double-ended queue (deque) instead of a standard priority queue, since edge weights are only `0` or `1`.

Precompute, for every portal value, the list of cell coordinates sharing that value. During the search, when the current cell is popped and it is a portal, additionally push all its linked portal cells with the same distance (0-cost edge) to the front of the deque; regular 4-directional neighbors are pushed to the back with distance `+1`. Track the best known distance to each cell and skip stale deque entries. The answer is the recorded distance to `(m - 1, n - 1)`, or `-1` if it was never reached.

## C# Solution

```csharp
public class Solution 
{
    public int MinMoves(int[][] grid) 
    {
        int m = grid.Length, n = grid[0].Length;
        if (grid[0][0] == 1 || grid[m - 1][n - 1] == 1)
            return -1;

        var portalCells = new Dictionary<int, List<(int, int)>>();
        for (int i = 0; i < m; i++)
        {
            for (int j = 0; j < n; j++)
            {
                if (grid[i][j] >= 2)
                {
                    if (!portalCells.TryGetValue(grid[i][j], out var list))
                    {
                        list = new List<(int, int)>();
                        portalCells[grid[i][j]] = list;
                    }
                    list.Add((i, j));
                }
            }
        }

        int[,] dist = new int[m, n];
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                dist[i, j] = int.MaxValue;

        dist[0, 0] = 0;
        var deque = new LinkedList<(int r, int c)>();
        deque.AddFirst((0, 0));

        int[] dr = { -1, 1, 0, 0 };
        int[] dc = { 0, 0, -1, 1 };

        while (deque.Count > 0)
        {
            var (r, c) = deque.First.Value;
            deque.RemoveFirst();
            int d = dist[r, c];

            for (int dir = 0; dir < 4; dir++)
            {
                int nr = r + dr[dir], nc = c + dc[dir];
                if (nr < 0 || nr >= m || nc < 0 || nc >= n || grid[nr][nc] == 1)
                    continue;

                if (d + 1 < dist[nr, nc])
                {
                    dist[nr, nc] = d + 1;
                    deque.AddLast((nr, nc));
                }
            }

            if (grid[r][c] >= 2 && portalCells.TryGetValue(grid[r][c], out var linked))
            {
                foreach (var (pr, pc) in linked)
                {
                    if (d < dist[pr, pc])
                    {
                        dist[pr, pc] = d;
                        deque.AddFirst((pr, pc));
                    }
                }
            }
        }

        return dist[m - 1, n - 1] == int.MaxValue ? -1 : dist[m - 1, n - 1];
    }
}
```

## Complexity

- **Time:** O(m * n) amortized (each cell enqueued a bounded number of times)
- **Space:** O(m * n)
