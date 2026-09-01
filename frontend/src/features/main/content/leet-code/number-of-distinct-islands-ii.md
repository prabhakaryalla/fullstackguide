# 711. Number of Distinct Islands II

**Difficulty:** Hard
**Category:** Array, Hash Table, Math, Depth-First Search, Breadth-First Search, Matrix
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a binary grid, return the number of distinct islands, where two islands are considered the same if one can be translated, rotated, or reflected to exactly match the other.

### Example

```
Input: grid = [[1,1,0,0,0],[1,0,0,0,0],[0,0,0,0,1],[0,0,0,1,1]]
Output: 1
```

## Approach

For each island, collect the coordinates of its cells via depth-first search. To compare islands under any of the 8 symmetries of a square (identity, 3 rotations, and their mirror reflections), apply all 8 coordinate transformations to the cell set, normalize each transformed set by shifting it so its minimum row and column are zero, then sort the points to get a canonical string per transformation. The lexicographically smallest of these 8 canonical strings is used as the island's overall signature — two islands that are congruent under any symmetry will always produce the same minimal signature, since the same set of 8 transformations is applied to each. Counting distinct signatures gives the answer.

## C# Solution

```csharp
public class Solution
{
    public int NumDistinctIslands2(int[][] grid)
    {
        int rows = grid.Length, cols = grid[0].Length;
        var visited = new bool[rows, cols];
        var shapes = new HashSet<string>();

        for (int r = 0; r < rows; r++)
        {
            for (int c = 0; c < cols; c++)
            {
                if (grid[r][c] == 1 && !visited[r, c])
                {
                    var cells = new List<(int, int)>();
                    Dfs(grid, visited, r, c, cells);
                    shapes.Add(Canonicalize(cells));
                }
            }
        }

        return shapes.Count;
    }

    private void Dfs(int[][] grid, bool[,] visited, int r, int c, List<(int, int)> cells)
    {
        int rows = grid.Length, cols = grid[0].Length;
        if (r < 0 || r >= rows || c < 0 || c >= cols || visited[r, c] || grid[r][c] == 0) return;

        visited[r, c] = true;
        cells.Add((r, c));

        Dfs(grid, visited, r + 1, c, cells);
        Dfs(grid, visited, r - 1, c, cells);
        Dfs(grid, visited, r, c + 1, cells);
        Dfs(grid, visited, r, c - 1, cells);
    }

    private string Canonicalize(List<(int, int)> cells)
    {
        var transforms = new List<List<(int, int)>>();

        for (int t = 0; t < 8; t++)
        {
            var transformed = cells.Select(cell => Transform(cell, t)).ToList();
            int minR = transformed.Min(p => p.Item1);
            int minC = transformed.Min(p => p.Item2);

            var normalized = transformed
                .Select(p => (p.Item1 - minR, p.Item2 - minC))
                .OrderBy(p => p.Item1)
                .ThenBy(p => p.Item2)
                .ToList();

            transforms.Add(normalized);
        }

        return transforms
            .Select(shape => string.Join(";", shape.Select(p => $"{p.Item1},{p.Item2}")))
            .OrderBy(s => s, StringComparer.Ordinal)
            .First();
    }

    private (int, int) Transform((int Row, int Col) cell, int t)
    {
        int r = cell.Row, c = cell.Col;

        return t switch
        {
            0 => (r, c),
            1 => (r, -c),
            2 => (-r, c),
            3 => (-r, -c),
            4 => (c, r),
            5 => (c, -r),
            6 => (-c, r),
            7 => (-c, -r),
            _ => (r, c)
        };
    }
}
```

## Complexity

- **Time:** `O(cells * log(cells))` per island, for sorting during normalization.
- **Space:** `O(cells)` for the cell coordinates and canonical signatures.
