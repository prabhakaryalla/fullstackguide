# 2639. Find the Width of Columns of a Grid

**Difficulty:** Easy
**Category:** Array, String

## Problem

You are given a 2D integer array `grid` of size `m x n`. You need to calculate the width of each column, where the width of a column is the maximum length of its integers when represented as strings.

Return an integer array where each element represents the width of the corresponding column.

### Example

```
Input: grid = [[1],[22],[333]]
Output: [3]
Explanation: In the 0th column, 333 is the longest number with 3 digits.
```

## Approach

For each column, iterate through all rows and convert each number to a string. Track the maximum length encountered. The key insight is that negative numbers need an extra character for the minus sign.

## C# Solution

```csharp
public class Solution
{
    public int[] FindColumnWidth(int[][] grid)
    {
        int m = grid.Length;
        int n = grid[0].Length;
        int[] result = new int[n];
        
        for (int col = 0; col < n; col++)
        {
            int maxWidth = 0;
            for (int row = 0; row < m; row++)
            {
                int width = grid[row][col].ToString().Length;
                maxWidth = Math.Max(maxWidth, width);
            }
            result[col] = maxWidth;
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(m × n) where m is number of rows and n is number of columns
- **Space:** O(1) excluding the output array
