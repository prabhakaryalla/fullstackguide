# 827. Making A Large Island

**Difficulty:** Hard
**Category:** Array, Union Find, Depth-First Search, Matrix

## Problem

Given an `n x n` binary grid, you may change at most one `0` to a `1`. Return the size of the largest possible island of connected `1`s (4-directionally) after doing so.

### Example

```
Input: grid = [[1,0],[0,1]]
Output: 3
```

## Approach

First, label every existing island with a unique id via flood fill, recording each island's size. Then, for every `0` cell, look at its up-to-4 neighbors, collect the distinct island ids touching it (using a set to avoid double-counting an island touched from multiple directions), and sum their sizes plus one (for the flipped cell itself) to get the island size if that cell were flipped. Track the maximum across all `0` cells, also considering the case where the grid is already entirely `1`s (handled by initializing the best answer to the largest existing island size).

## C# Solution

```csharp
public class Solution
{
    public int LargestIsland(int[][] grid)
    {
        int n = grid.Length;
        var islandId = new int[n, n];
        var islandSize = new Dictionary<int, int>();
        int id = 2;

        for (int r = 0; r < n; r++)
        {
            for (int c = 0; c < n; c++)
            {
                if (grid[r][c] == 1 && islandId[r, c] == 0)
                {
                    int size = FloodFill(grid, r, c, id, islandId);
                    islandSize[id] = size;
                    id++;
                }
            }
        }

        int best = islandSize.Values.DefaultIfEmpty(0).Max();

        int[][] directions = { new[] { 1, 0 }, new[] { -1, 0 }, new[] { 0, 1 }, new[] { 0, -1 } };

        for (int r = 0; r < n; r++)
        {
            for (int c = 0; c < n; c++)
            {
                if (grid[r][c] == 0)
                {
                    var seenIds = new HashSet<int>();

                    foreach (var dir in directions)
                    {
                        int nr = r + dir[0], nc = c + dir[1];
                        if (nr >= 0 && nr < n && nc >= 0 && nc < n && islandId[nr, nc] != 0)
                            seenIds.Add(islandId[nr, nc]);
                    }

                    int total = 1;
                    foreach (var seenId in seenIds)
                        total += islandSize[seenId];

                    best = Math.Max(best, total);
                }
            }
        }

        return best;
    }

    private int FloodFill(int[][] grid, int startR, int startC, int id, int[,] islandId)
    {
        int n = grid.Length;
        int size = 0;
        var stack = new Stack<(int, int)>();
        stack.Push((startR, startC));
        islandId[startR, startC] = id;

        int[][] directions = { new[] { 1, 0 }, new[] { -1, 0 }, new[] { 0, 1 }, new[] { 0, -1 } };

        while (stack.Count > 0)
        {
            var (r, c) = stack.Pop();
            size++;

            foreach (var dir in directions)
            {
                int nr = r + dir[0], nc = c + dir[1];
                if (nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] == 1 && islandId[nr, nc] == 0)
                {
                    islandId[nr, nc] = id;
                    stack.Push((nr, nc));
                }
            }
        }

        return size;
    }
}
```

## Complexity

- **Time:** `O(n^2)`.
- **Space:** `O(n^2)` for the island id grid.
