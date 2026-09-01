# 3286. Find a Safe Walk Through a Grid

**Difficulty:** Medium
**Category:** Array, Graph, Breadth-First Search, Matrix, Heap (Priority Queue), Shortest Path

## Problem

You are given an `m x n` binary matrix `grid` where a value of `1` means the cell contains an enemy that deals `1` point of damage if you step on it, and an integer `health` representing your starting health. Starting at `(0, 0)` and moving to an adjacent cell (up, down, left, right) at each step, determine whether you can reach `(m - 1, n - 1)` while keeping your health strictly greater than `0` at all times (including after entering the starting and final cells). Return `true` if it's possible, otherwise `false`.

### Example

```
Input: grid = [[0,1,0,0,0],[0,1,0,1,0],[0,0,0,1,0]], health = 1
Output: true
```

## Approach

Model this as a shortest-path problem where the "cost" of moving into a cell equals its grid value (0 or 1), representing the damage taken. Use 0-1 BFS with a double-ended queue: push cells with 0 weight to the front and cells with 1 weight to the back, which processes cells in order of increasing total damage. Track the minimum total damage to reach every cell, starting with the damage of the starting cell itself. The walk is safe if the minimum damage to reach the destination is at most `health - 1` (so at least 1 health remains).

## C# Solution

```csharp
public class Solution 
{
    public bool FindSafeWalk(IList<IList<int>> grid, int health) 
    {
        int m = grid.Count;
        int n = grid[0].Count;
        int[,] dist = new int[m, n];

        for (int i = 0; i < m; i++) 
        {
            for (int j = 0; j < n; j++) 
            {
                dist[i, j] = int.MaxValue;
            }
        }

        dist[0, 0] = grid[0][0];
        var deque = new LinkedList<(int Row, int Col)>();
        deque.AddFirst((0, 0));

        int[] dr = { -1, 1, 0, 0 };
        int[] dc = { 0, 0, -1, 1 };

        while (deque.Count > 0) 
        {
            var (r, c) = deque.First.Value;
            deque.RemoveFirst();

            for (int dir = 0; dir < 4; dir++) 
            {
                int nr = r + dr[dir];
                int nc = c + dc[dir];
                if (nr < 0 || nr >= m || nc < 0 || nc >= n) continue;

                int weight = grid[nr][nc];
                int newDist = dist[r, c] + weight;

                if (newDist < dist[nr, nc]) 
                {
                    dist[nr, nc] = newDist;
                    if (weight == 0) deque.AddFirst((nr, nc));
                    else deque.AddLast((nr, nc));
                }
            }
        }

        return dist[m - 1, n - 1] <= health - 1;
    }
}
```

## Complexity

- **Time:** O(m * n)
- **Space:** O(m * n)
