# 1020. Number of Enclaves

**Difficulty:** Medium
**Category:** Array, Depth-First Search, Breadth-First Search, Union Find, Matrix

## Problem

Given an `m x n` binary matrix `grid` where `1` represents land and `0` represents water, a move consists of walking in one of the four cardinal directions between land cells. Return the number of land cells from which you cannot walk off the boundary of the grid in any number of moves.

### Example

```
Input: grid = [[0,0,0,0],[1,0,1,0],[0,1,1,0],[0,0,0,0]]
Output: 3
```

## Approach

Any land cell connected (directly or through other land cells) to the grid's boundary can walk off the edge, so it doesn't count as enclosed. Flood-fill from every boundary cell that is land, sinking (`1 -> 0`) every reachable land cell. What remains marked `1` afterward is exactly the enclosed land, so count it.

## C# Solution

```csharp
public class Solution
{
    public int NumEnclaves(int[][] grid)
    {
        int rows = grid.Length, cols = grid[0].Length;

        void Flood(int r, int c)
        {
            if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] != 1) return;
            grid[r][c] = 0;
            Flood(r + 1, c);
            Flood(r - 1, c);
            Flood(r, c + 1);
            Flood(r, c - 1);
        }

        for (int r = 0; r < rows; r++)
        {
            Flood(r, 0);
            Flood(r, cols - 1);
        }

        for (int c = 0; c < cols; c++)
        {
            Flood(0, c);
            Flood(rows - 1, c);
        }

        int count = 0;
        for (int r = 0; r < rows; r++)
            for (int c = 0; c < cols; c++)
                if (grid[r][c] == 1) count++;

        return count;
    }
}
```

## Complexity

- **Time:** `O(rows * cols)` — each cell is visited a constant number of times.
- **Space:** `O(rows * cols)` recursion stack in the worst case.
