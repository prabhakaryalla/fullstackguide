# 3417. Zigzag Grid Traversal With Skip

**Difficulty:** Easy
**Category:** Array, Matrix, Simulation

## Problem

You are given an `m x n` integer grid. Traverse the grid in a **zigzag** pattern: rows at an even index are traversed left to right, and rows at an odd index are traversed right to left, continuing seamlessly as one long path through the whole grid.

While traversing, **skip every other cell** (keep the 1st, 3rd, 5th, ... cells encountered along this continuous zigzag path, using a single running counter that does not reset between rows).

Return the list of collected values, in the order they were visited.

### Example

`grid = [[1,2,3],[4,5,6],[7,8,9]]`

Zigzag order: `1,2,3,6,5,4,7,8,9`. Taking every other one starting from the first: `1,3,5,7,9`.

## Approach

Simulate the zigzag traversal directly with a single global counter that increases by 1 for every cell visited, regardless of row. Whenever the counter is even (0-indexed), collect the cell's value; then advance the counter. Track direction per row (left-to-right for even row index, right-to-left for odd row index).

## C# Solution

```csharp
public class Solution 
{
    public IList<int> ZigzagTraversal(int[][] grid) 
    {
        int m = grid.Length, n = grid[0].Length;
        var result = new List<int>();
        int globalIndex = 0;

        for (int row = 0; row < m; row++) 
        {
            if (row % 2 == 0) 
            {
                for (int col = 0; col < n; col++) 
                {
                    if (globalIndex % 2 == 0) 
                    {
                        result.Add(grid[row][col]);
                    }
                    globalIndex++;
                }
            } 
            else 
            {
                for (int col = n - 1; col >= 0; col--) 
                {
                    if (globalIndex % 2 == 0) 
                    {
                        result.Add(grid[row][col]);
                    }
                    globalIndex++;
                }
            }
        }
        return result;
    }
}
```

## Complexity

- **Time:** O(m * n)
- **Space:** O(m * n) for the output
