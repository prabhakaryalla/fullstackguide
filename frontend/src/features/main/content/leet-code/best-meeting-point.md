# 296. Best Meeting Point

**Difficulty:** Hard
**Category:** Array, Math, Sorting, Matrix

## Problem

Given an `m x n` binary grid where each `1` marks a friend's home, return the minimum total travel distance (sum of Manhattan distances) for all friends to meet at a single point on the grid.

### Example

```
Input: grid = [[1,0,0,0,1],[0,0,0,0,0],[0,0,1,0,0]]
Output: 6
```

## Approach

Because Manhattan distance separates into independent row and column components, the problem decomposes into two 1D problems: find the optimal meeting row and optimal meeting column independently, then sum their costs. For each dimension, collect the sorted coordinates of all friends; the point that minimizes total absolute distance is the median. Sum `|coord - median|` across all friends for both rows and columns.

## C# Solution

```csharp
public class Solution
{
    public int MinTotalDistance(int[][] grid)
    {
        var rows = new List<int>();
        var cols = new List<int>();

        for (int r = 0; r < grid.Length; r++)
        {
            for (int c = 0; c < grid[0].Length; c++)
            {
                if (grid[r][c] == 1)
                {
                    rows.Add(r);
                    cols.Add(c);
                }
            }
        }

        cols.Sort();

        return MinDistance1D(rows) + MinDistance1D(cols);
    }

    private int MinDistance1D(List<int> coords)
    {
        int total = 0;
        int median = coords[coords.Count / 2];
        foreach (var coord in coords) total += Math.Abs(coord - median);
        return total;
    }
}
```

## Complexity

- **Time:** `O(m * n)` — scanning the grid, plus `O(k log k)` for sorting column coordinates (rows are already collected in sorted order).
- **Space:** `O(k)` — where `k` is the number of friends.
