# 3402. Minimum Operations to Make Columns Strictly Increasing

**Difficulty:** Easy
**Category:** Array, Matrix, Greedy

## Problem

You are given a **0-indexed** `m x n` grid of integers. In one operation, you can increase the value of any cell by `1`.

Return the **minimum** number of operations needed to make all columns of the grid **strictly increasing** (each value in a column must be strictly greater than the value directly above it).

### Example

`grid = [[3,2],[1,3],[3,4]]`

- Column 0: `[3,1,3]`. `1 <= 3` so bump to `4` (cost 3); next `3 <= 4` so bump to `5` (cost 2). Total cost for column 0: `5`.
- Column 1: `[2,3,4]` is already strictly increasing. Cost: `0`.

Total operations: `5`.

## Approach

Each column is independent. Walk down each column while tracking the previous (possibly increased) value. Whenever the current cell is not strictly greater than the previous value, raise it to `previous + 1` and add the difference to the answer.

## C# Solution

```csharp
public class Solution 
{
    public int MinimumOperations(int[][] grid) 
    {
        int m = grid.Length, n = grid[0].Length;
        int operations = 0;
        for (int col = 0; col < n; col++) 
        {
            int prev = grid[0][col];
            for (int row = 1; row < m; row++) 
            {
                if (grid[row][col] <= prev) 
                {
                    operations += prev + 1 - grid[row][col];
                    prev = prev + 1;
                } 
                else 
                {
                    prev = grid[row][col];
                }
            }
        }
        return operations;
    }
}
```

## Complexity

- **Time:** O(m * n)
- **Space:** O(1) extra space
