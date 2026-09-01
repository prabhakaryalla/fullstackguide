# 1765. Map of Highest Peak

**Difficulty:** Medium
**Category:** Array, Breadth-First Search, Matrix

## Problem

Given a grid `isWater` where `1` marks a water cell and `0` marks a land cell, assign a non-negative height to every cell such that all water cells have height `0`, every cell's height differs from its orthogonal neighbors by at most `1`, and the maximum possible height is achieved somewhere. Return any valid height assignment.

### Example

```
Input: isWater = [[0,1],[0,0]]
Output: [[1,0],[2,1]]
```

## Approach

Run a multi-source breadth-first search starting from all water cells simultaneously (height `0`). Each BFS layer expands to unvisited orthogonal neighbors, assigning them a height one greater than the current cell — this naturally produces the maximum valid height at every land cell (its distance to the nearest water cell).

## C# Solution

```csharp
public class Solution
{
    public int[][] HighestPeak(int[][] isWater)
    {
        int m = isWater.Length, n = isWater[0].Length;
        int[][] height = new int[m][];
        for (int i = 0; i < m; i++)
        {
            height[i] = new int[n];
            Array.Fill(height[i], -1);
        }

        var queue = new Queue<(int r, int c)>();
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (isWater[i][j] == 1)
                {
                    height[i][j] = 0;
                    queue.Enqueue((i, j));
                }

        int[] dr = { -1, 1, 0, 0 };
        int[] dc = { 0, 0, -1, 1 };

        while (queue.Count > 0)
        {
            var (r, c) = queue.Dequeue();
            for (int d = 0; d < 4; d++)
            {
                int nr = r + dr[d], nc = c + dc[d];
                if (nr < 0 || nr >= m || nc < 0 || nc >= n || height[nr][nc] != -1) continue;

                height[nr][nc] = height[r][c] + 1;
                queue.Enqueue((nr, nc));
            }
        }

        return height;
    }
}
```

## Complexity

- **Time:** `O(m * n)`.
- **Space:** `O(m * n)`.
