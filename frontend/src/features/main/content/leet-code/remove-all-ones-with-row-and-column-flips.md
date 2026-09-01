# 2128. Remove All Ones With Row and Column Flips

**Difficulty:** Medium
**Category:** Array, Matrix, Math
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a binary matrix, you can flip any row or column (change all 0s to 1s and vice versa). Return `true` if you can remove all 1s (make entire matrix 0s).

### Example

```
Input: grid = [[0,1,0],[1,0,1],[0,1,0]]
Output: true
```

## Approach

For each row, check if it matches the first row either exactly or as its complement. All rows must follow one of these two patterns for a solution to exist.

## C# Solution

```csharp
public class Solution
{
    public bool RemoveOnes(int[][] grid)
    {
        int m = grid.Length, n = grid[0].Length;
        
        for (int i = 1; i < m; i++)
        {
            bool same = true, complement = true;
            for (int j = 0; j < n; j++)
            {
                if (grid[i][j] != grid[0][j]) same = false;
                if (grid[i][j] == grid[0][j]) complement = false;
            }
            if (!same && !complement) return false;
        }
        
        return true;
    }
}
```

## Complexity

- **Time:** O(m * n)
- **Space:** O(1)
