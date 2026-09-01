# 1591. Strange Printer II

**Difficulty:** Hard
**Category:** Array, Graph, Topological Sort, Matrix

## Problem

Given an `m x n` grid of colors, a strange printer prints one color at a time by choosing any rectangular area and filling every cell in it with a single color, possibly overwriting previous colors (later prints cover earlier ones only if not obscured). Return `true` if the given grid's final appearance could have been produced this way.

### Example

```
Input: targetGrid = [[1,1,1,1],[1,2,2,1],[1,2,2,1],[1,1,1,1]]
Output: true
```

## Approach

For each color, compute the bounding rectangle (min/max row and column) of all its cells. A color can be considered "printed last" among the remaining unprocessed colors if every cell within its bounding rectangle is either that color itself or a color already removed (already accounted for as printed even later). Repeatedly scan for and remove such colors (this is effectively a topological "peeling" process); if a full pass finds no removable color while colors remain, the configuration is invalid.

## C# Solution

```csharp
public class Solution
{
    public bool IsPrintable(int[][] targetGrid)
    {
        int rows = targetGrid.Length;
        int cols = targetGrid[0].Length;
        var minRow = new Dictionary<int, int>();
        var maxRow = new Dictionary<int, int>();
        var minCol = new Dictionary<int, int>();
        var maxCol = new Dictionary<int, int>();

        for (int r = 0; r < rows; r++)
        {
            for (int c = 0; c < cols; c++)
            {
                int color = targetGrid[r][c];
                if (!minRow.ContainsKey(color))
                {
                    minRow[color] = r;
                    maxRow[color] = r;
                    minCol[color] = c;
                    maxCol[color] = c;
                }
                else
                {
                    minRow[color] = Math.Min(minRow[color], r);
                    maxRow[color] = Math.Max(maxRow[color], r);
                    minCol[color] = Math.Min(minCol[color], c);
                    maxCol[color] = Math.Max(maxCol[color], c);
                }
            }
        }

        var removed = new HashSet<int>();
        var colors = new List<int>(minRow.Keys);

        while (colors.Count > 0)
        {
            bool removedAny = false;
            var stillRemaining = new List<int>();

            foreach (int color in colors)
            {
                bool canRemove = true;

                for (int r = minRow[color]; r <= maxRow[color] && canRemove; r++)
                {
                    for (int c = minCol[color]; c <= maxCol[color] && canRemove; c++)
                    {
                        int cellColor = targetGrid[r][c];
                        if (cellColor != color && !removed.Contains(cellColor))
                        {
                            canRemove = false;
                        }
                    }
                }

                if (canRemove)
                {
                    removed.Add(color);
                    removedAny = true;
                }
                else
                {
                    stillRemaining.Add(color);
                }
            }

            if (!removedAny)
            {
                return false;
            }

            colors = stillRemaining;
        }

        return true;
    }
}
```

## Complexity

- **Time:** `O(colors * rows * cols)` in the worst case — each pass rescans bounding rectangles.
- **Space:** `O(colors)` for the bounding-rectangle maps.
