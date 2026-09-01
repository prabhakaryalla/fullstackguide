# 1730. Shortest Path to Get Food

**Difficulty:** Medium
**Category:** Array, Breadth-First Search, Matrix

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a grid where `'*'` is your starting position, `'#'` is an obstacle, `'O'` is free space, and `'X'` is food, return the length of the shortest path from your position to any food cell, or `-1` if none is reachable.

### Example

```
Input: grid = ["X*O","O#O","OOO"]
Output: 3
```

## Approach

Run a standard breadth-first search from the starting cell, expanding to the four orthogonal neighbors while skipping obstacles and previously visited cells. The first food cell dequeued gives the shortest distance.

## C# Solution

```csharp
public class Solution
{
    public int GetFood(char[][] grid)
    {
        int m = grid.Length, n = grid[0].Length;
        int sr = -1, sc = -1;

        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (grid[i][j] == '*') { sr = i; sc = j; }

        int[] dr = { -1, 1, 0, 0 };
        int[] dc = { 0, 0, -1, 1 };

        var visited = new bool[m, n];
        visited[sr, sc] = true;
        var queue = new Queue<(int r, int c, int dist)>();
        queue.Enqueue((sr, sc, 0));

        while (queue.Count > 0)
        {
            var (r, c, dist) = queue.Dequeue();
            if (grid[r][c] == 'X') return dist;

            for (int d = 0; d < 4; d++)
            {
                int nr = r + dr[d], nc = c + dc[d];
                if (nr < 0 || nr >= m || nc < 0 || nc >= n || visited[nr, nc] || grid[nr][nc] == '#')
                    continue;

                visited[nr, nc] = true;
                queue.Enqueue((nr, nc, dist + 1));
            }
        }

        return -1;
    }
}
```

## Complexity

- **Time:** `O(m * n)`.
- **Space:** `O(m * n)`.
