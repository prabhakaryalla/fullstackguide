# 407. Trapping Rain Water II

**Difficulty:** Hard
**Category:** Array, Heap (Priority Queue), Matrix, Breadth-First Search

## Problem

Given an `m x n` integer matrix `heightMap` representing the height of each unit cell in a 2D elevation map, return the volume of water it can trap after raining.

### Example

```
Input: heightMap = [[1,4,3,1,3,2],[3,2,1,3,2,4],[2,3,3,2,3,1]]
Output: 4
```

### Constraints

- `m == heightMap.length`
- `n == heightMap[i].length`
- `1 <= m, n <= 200`
- `0 <= heightMap[i][j] <= 2 * 10^4`

## Approach

Generalize the classic two-pointer trapping-rain-water technique to 2D using a min-heap: seed the heap with all border cells (water can never be trapped above the border). Repeatedly pop the lowest-height cell, and for each unvisited neighbor, trap water equal to the difference if the neighbor is lower, then push the neighbor with an effective height of at least the current cell's height (representing the water barrier so far).

## C# Solution

```csharp
public class Solution
{
    public int TrapRainWater(int[][] heightMap)
    {
        int rows = heightMap.Length, cols = heightMap[0].Length;
        if (rows < 3 || cols < 3) return 0;

        var visited = new bool[rows, cols];
        var heap = new PriorityQueue<(int Row, int Col, int Height), int>();

        for (int r = 0; r < rows; r++)
        {
            for (int c = 0; c < cols; c++)
            {
                if (r == 0 || r == rows - 1 || c == 0 || c == cols - 1)
                {
                    heap.Enqueue((r, c, heightMap[r][c]), heightMap[r][c]);
                    visited[r, c] = true;
                }
            }
        }

        int[][] directions = { new[] { 1, 0 }, new[] { -1, 0 }, new[] { 0, 1 }, new[] { 0, -1 } };
        int water = 0;

        while (heap.Count > 0)
        {
            var (row, col, height) = heap.Dequeue();

            foreach (var dir in directions)
            {
                int nr = row + dir[0], nc = col + dir[1];
                if (nr < 0 || nr >= rows || nc < 0 || nc >= cols || visited[nr, nc]) continue;

                water += Math.Max(0, height - heightMap[nr][nc]);
                heap.Enqueue((nr, nc, Math.Max(height, heightMap[nr][nc])), Math.Max(height, heightMap[nr][nc]));
                visited[nr, nc] = true;
            }
        }

        return water;
    }
}
```

## Complexity

- **Time:** `O(rows * cols * log(rows * cols))`.
- **Space:** `O(rows * cols)` for the heap and visited grid.
