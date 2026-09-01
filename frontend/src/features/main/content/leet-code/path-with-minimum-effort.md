# 1631. Path With Minimum Effort

**Difficulty:** Medium
**Category:** Array, Binary Search, Depth-First Search, Breadth-First Search, Union Find, Heap (Priority Queue), Matrix

## Problem

Given a `heights` matrix, find a path from the top-left to the bottom-right cell that minimizes the maximum absolute difference in heights between two consecutive cells along the path.

### Example

```
Input: heights = [[1,2,2],[3,8,2],[5,3,5]]
Output: 2
```

## Approach

Run a Dijkstra-style search where the "distance" to a cell is the smallest possible maximum-effort along any path reaching it. Use a min-heap keyed by that effort; when relaxing a neighbor, the new candidate effort is `max(currentEffort, |heightDiff|)`, and it is only propagated if it improves the neighbor's best known effort.

## C# Solution

```csharp
public class Solution
{
    public int MinimumEffortPath(int[][] heights)
    {
        int rows = heights.Length;
        int cols = heights[0].Length;
        int[,] effort = new int[rows, cols];

        for (int i = 0; i < rows; i++)
        {
            for (int j = 0; j < cols; j++)
            {
                effort[i, j] = int.MaxValue;
            }
        }

        effort[0, 0] = 0;
        var pq = new PriorityQueue<(int Row, int Col), int>();
        pq.Enqueue((0, 0), 0);
        int[] dr = { -1, 1, 0, 0 };
        int[] dc = { 0, 0, -1, 1 };

        while (pq.Count > 0)
        {
            var (row, col) = pq.Dequeue();
            int currentEffort = effort[row, col];

            if (row == rows - 1 && col == cols - 1)
            {
                return currentEffort;
            }

            for (int d = 0; d < 4; d++)
            {
                int nr = row + dr[d];
                int nc = col + dc[d];

                if (nr < 0 || nr >= rows || nc < 0 || nc >= cols)
                {
                    continue;
                }

                int diff = Math.Abs(heights[nr][nc] - heights[row][col]);
                int candidate = Math.Max(currentEffort, diff);

                if (candidate < effort[nr, nc])
                {
                    effort[nr, nc] = candidate;
                    pq.Enqueue((nr, nc), candidate);
                }
            }
        }

        return 0;
    }
}
```

## Complexity

- **Time:** `O(rows * cols * log(rows * cols))`.
- **Space:** `O(rows * cols)`.
