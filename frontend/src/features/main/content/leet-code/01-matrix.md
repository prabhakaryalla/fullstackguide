# 542. 01 Matrix

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Breadth-First Search, Matrix

## Problem

Given an `m x n` binary matrix `mat`, return the distance of the nearest `0` for each cell, where the distance between two adjacent cells is `1`.

### Example

```
Input: mat = [[0,0,0],[0,1,0],[1,1,1]]
Output: [[0,0,0],[0,1,0],[1,2,1]]
```

### Constraints

- `m == mat.length`
- `n == mat[i].length`
- `1 <= m, n <= 10^4`
- `1 <= m * n <= 10^4`

## Approach

Run a multi-source breadth-first search starting simultaneously from every `0` cell (all at distance 0), expanding outward level by level to every `1` cell. Since BFS explores in increasing order of distance, the first time a cell is reached is guaranteed to be its shortest distance to any `0`.

## C# Solution

```csharp
public class Solution
{
    public int[][] UpdateMatrix(int[][] mat)
    {
        int rows = mat.Length, cols = mat[0].Length;
        var distances = new int[rows][];
        for (int i = 0; i < rows; i++)
            distances[i] = new int[cols];

        var queue = new Queue<(int Row, int Col)>();

        for (int r = 0; r < rows; r++)
        {
            for (int c = 0; c < cols; c++)
            {
                if (mat[r][c] == 0)
                    queue.Enqueue((r, c));
                else
                    distances[r][c] = -1;
            }
        }

        int[][] directions = { new[] { 1, 0 }, new[] { -1, 0 }, new[] { 0, 1 }, new[] { 0, -1 } };

        while (queue.Count > 0)
        {
            var (row, col) = queue.Dequeue();

            foreach (var dir in directions)
            {
                int nr = row + dir[0], nc = col + dir[1];
                if (nr < 0 || nr >= rows || nc < 0 || nc >= cols || distances[nr][nc] != -1) continue;

                distances[nr][nc] = distances[row][col] + 1;
                queue.Enqueue((nr, nc));
            }
        }

        return distances;
    }
}
```

## Complexity

- **Time:** `O(rows * cols)`.
- **Space:** `O(rows * cols)` for the queue and distances grid.
