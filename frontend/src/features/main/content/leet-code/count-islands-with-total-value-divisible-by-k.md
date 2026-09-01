# 3619. Count Islands With Total Value Divisible by K

**Difficulty:** Medium
**Category:** Array, Depth-First Search, Breadth-First Search, Union Find, Matrix

## Problem
You are given an `m x n` matrix `grid` and a positive integer `k`. An island is a group of positive integers (land cells) that are 4-directionally connected. The total value of an island is the sum of the values of all its cells.

Return the number of islands whose total value is divisible by `k`.

### Example
Input: `grid = [[3,0,3,0],[0,3,0,3],[3,0,3,0]], k = 3`
Output: `6`
Explanation: The grid contains six islands, each consisting of a single cell with value 3, and every one of them is divisible by 3.

Constraints:
- `1 <= m, n <= 1000`
- `1 <= m * n <= 10^5`
- `0 <= grid[i][j] <= 10^6`
- `1 <= k <= 10^6`

## Approach
Flood-fill (BFS/DFS) each connected group of positive cells exactly once, accumulating the sum of its values, and increment a counter whenever that sum is divisible by `k`.

## C# Solution

```csharp
public class Solution {
    public int CountIslands(int[][] grid, int k) {
        int m = grid.Length, n = grid[0].Length;
        bool[,] visited = new bool[m, n];
        int result = 0;
        int[] dr = { -1, 1, 0, 0 };
        int[] dc = { 0, 0, -1, 1 };

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] <= 0 || visited[i, j]) continue;

                long sum = 0;
                var queue = new Queue<(int, int)>();
                queue.Enqueue((i, j));
                visited[i, j] = true;

                while (queue.Count > 0) {
                    var (r, c) = queue.Dequeue();
                    sum += grid[r][c];

                    for (int d = 0; d < 4; d++) {
                        int nr = r + dr[d], nc = c + dc[d];
                        if (nr >= 0 && nr < m && nc >= 0 && nc < n &&
                            !visited[nr, nc] && grid[nr][nc] > 0) {
                            visited[nr, nc] = true;
                            queue.Enqueue((nr, nc));
                        }
                    }
                }

                if (sum % k == 0) {
                    result++;
                }
            }
        }

        return result;
    }
}
```

## Complexity

- **Time:** O(m * n)
- **Space:** O(m * n)
