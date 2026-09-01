# 1102. Path With Maximum Minimum Value

**Difficulty:** Medium
**Category:** Array, Binary Search, Union Find, Heap (Priority Queue), Matrix

> **Note:** This problem is part of LeetCode's premium subscription.

## Problem

Given an `m x n` integer matrix `grid`, find a path from the top-left cell to the bottom-right cell (moving up/down/left/right) that maximizes the minimum value along the path, and return that maximized minimum value (the path's "score").

### Example

```
Input: grid = [[5,4,5],[1,2,6],[7,4,6]]
Output: 4
```

## Approach

This is a "widest path" problem, solved like Dijkstra's algorithm but with a max-heap instead of a min-heap. Starting from `(0, 0)`, always expand the frontier cell with the largest value first. Track the smallest value seen among all popped cells — since the max-heap always greedily grabs the best available option, the first time the destination is popped, the running minimum is the maximum possible bottleneck value.

## C# Solution

```csharp
public class Solution
{
    public int MaximumMinimumPath(int[][] grid)
    {
        int rows = grid.Length, cols = grid[0].Length;
        var visited = new bool[rows, cols];
        var pq = new PriorityQueue<(int r, int c), int>(Comparer<int>.Create((a, b) => b.CompareTo(a)));
        pq.Enqueue((0, 0), grid[0][0]);
        visited[0, 0] = true;
        int answer = grid[0][0];
        int[] dr = { -1, 1, 0, 0 };
        int[] dc = { 0, 0, -1, 1 };

        while (pq.Count > 0)
        {
            pq.TryDequeue(out var cell, out int value);
            answer = Math.Min(answer, value);
            if (cell.r == rows - 1 && cell.c == cols - 1) return answer;

            for (int d = 0; d < 4; d++)
            {
                int nr = cell.r + dr[d], nc = cell.c + dc[d];
                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr, nc])
                {
                    visited[nr, nc] = true;
                    pq.Enqueue((nr, nc), grid[nr][nc]);
                }
            }
        }

        return answer;
    }
}
```

## Complexity

- **Time:** `O(R·C·log(R·C))`.
- **Space:** `O(R·C)`.
