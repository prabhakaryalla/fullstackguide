# 1351. Count Negative Numbers in a Sorted Matrix

**Difficulty:** Easy
**Category:** Array, Binary Search, Matrix

## Problem

Given an `m x n` matrix sorted in non-increasing order both row-wise and column-wise, return the number of negative numbers in the matrix.

### Example

```
Input: grid = [[4,3,2,-1],[3,2,1,-1],[1,1,-1,-2],[-1,-1,-2,-3]]
Output: 8
```

## Approach

Start at the bottom-left corner. If the current value is negative, every entry to its right in that row is also negative (since rows are non-increasing), so add the count for the rest of the row and move up one row; otherwise move right one column. This "staircase" walk visits at most `m + n` cells.

## C# Solution

```csharp
public class Solution
{
    public int CountNegatives(int[][] grid)
    {
        int m = grid.Length, n = grid[0].Length;
        int row = m - 1, col = 0, count = 0;

        while (row >= 0 && col < n)
        {
            if (grid[row][col] < 0)
            {
                count += n - col;
                row--;
            }
            else
            {
                col++;
            }
        }

        return count;
    }
}
```

## Complexity

- **Time:** `O(m + n)`.
- **Space:** `O(1)`.
