# 2132. Stamping the Grid

**Difficulty:** Hard
**Category:** Array, Greedy, Matrix, Prefix Sum

## Problem

You are given an `m x n` binary grid where `1` represents an occupied cell and `0` represents an empty cell. You are also given integers `stampHeight` and `stampWidth` representing the dimensions of a stamp.

Return `true` if it is possible to cover all the empty cells using stamps without overlapping any occupied cells, otherwise return `false`. Stamps can overlap each other.

### Example

```
Input: grid = [[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0]], stampHeight = 4, stampWidth = 3
Output: true
Explanation: We can place one stamp covering columns 1-3 and rows 0-3.
```

## Approach

This problem requires checking if we can stamp all empty cells. We use a 2D difference array technique:
1. Find all valid positions where a stamp can be placed (top-left corner)
2. Use 2D prefix sums to check if a position is valid (no occupied cells in stamp area)
3. Use 2D difference array to mark which cells are covered by stamps
4. Verify all empty cells are covered

The key insight is using 2D prefix sums to efficiently check rectangles and difference arrays to efficiently mark coverage.

## C# Solution

```csharp
public class Solution
{
    public bool PossibleToStamp(int[][] grid, int stampHeight, int stampWidth)
    {
        int m = grid.Length, n = grid[0].Length;
        
        // Build 2D prefix sum
        int[][] prefix = new int[m + 1][];
        for (int i = 0; i <= m; i++)
            prefix[i] = new int[n + 1];
        
        for (int i = 1; i <= m; i++)
        {
            for (int j = 1; j <= n; j++)
            {
                prefix[i][j] = grid[i - 1][j - 1] + prefix[i - 1][j] + 
                               prefix[i][j - 1] - prefix[i - 1][j - 1];
            }
        }
        
        // Mark valid stamp positions using difference array
        int[][] diff = new int[m + 2][];
        for (int i = 0; i < m + 2; i++)
            diff[i] = new int[n + 2];
        
        for (int i = 0; i + stampHeight <= m; i++)
        {
            for (int j = 0; j + stampWidth <= n; j++)
            {
                // Check if this stamp position is valid (all zeros)
                int sum = prefix[i + stampHeight][j + stampWidth] - 
                          prefix[i][j + stampWidth] - 
                          prefix[i + stampHeight][j] + 
                          prefix[i][j];
                
                if (sum == 0)
                {
                    // Mark this stamp area in difference array
                    diff[i + 1][j + 1]++;
                    diff[i + 1][j + stampWidth + 1]--;
                    diff[i + stampHeight + 1][j + 1]--;
                    diff[i + stampHeight + 1][j + stampWidth + 1]++;
                }
            }
        }
        
        // Convert difference array to actual coverage count
        for (int i = 1; i <= m; i++)
        {
            for (int j = 1; j <= n; j++)
            {
                diff[i][j] += diff[i - 1][j] + diff[i][j - 1] - diff[i - 1][j - 1];
                // Check if empty cell is covered
                if (grid[i - 1][j - 1] == 0 && diff[i][j] == 0)
                    return false;
            }
        }
        
        return true;
    }
}
```

## Complexity

- **Time:** O(m * n) for building prefix sums and checking coverage
- **Space:** O(m * n) for prefix and difference arrays
