# 2428. Maximum Sum of an Hourglass

**Difficulty:** Medium
**Category:** Array, Matrix, Prefix Sum

## Problem

You are given an `m x n` integer matrix `grid`.

We define an hourglass as a part of the matrix with the following form:

```
a b c
  d
e f g
```

Return the maximum sum of the elements of an hourglass.

Note: An hourglass cannot be rotated and must be entirely contained within the matrix.

### Example

```
Input: grid = [[6,2,1,3],[4,2,1,5],[9,2,8,7],[4,1,2,9]]
Output: 30
Explanation: The cells highlighted form the hourglass with sum 30:
6 2 1
  2
9 2 8
```

## Approach

Iterate through all possible top-left corners of hourglasses (positions where both row and column indices allow for a complete hourglass). For each valid position, calculate the sum of the 7 cells forming the hourglass and track the maximum.

## C# Solution

```csharp
public class Solution
{
    public int MaxSum(int[][] grid)
    {
        int rows = grid.Length;
        int cols = grid[0].Length;
        int maxSum = int.MinValue;
        
        for (int i = 0; i <= rows - 3; i++)
        {
            for (int j = 0; j <= cols - 3; j++)
            {
                int sum = grid[i][j] + grid[i][j + 1] + grid[i][j + 2] +
                         grid[i + 1][j + 1] +
                         grid[i + 2][j] + grid[i + 2][j + 1] + grid[i + 2][j + 2];
                
                maxSum = Math.Max(maxSum, sum);
            }
        }
        
        return maxSum;
    }
}
```

## Complexity

- **Time:** O(m * n) where m and n are the dimensions of the grid
- **Space:** O(1)
