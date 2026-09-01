# 2319. Check if Matrix Is X-Matrix

**Difficulty:** Easy
**Category:** Array, Matrix

## Problem

A square matrix is said to be an X-Matrix if both of the following conditions hold:

1. All the elements in the diagonals of the matrix are non-zero.
2. All other elements are 0.

Given a 2D integer array `grid` of size `n x n` representing a square matrix, return `true` if `grid` is an X-Matrix. Otherwise, return `false`.

### Example

```
Input: grid = [[2,0,0,1],[0,3,1,0],[0,5,2,0],[4,0,0,2]]
Output: true
Explanation: All diagonal elements are non-zero and all others are zero.
```

## Approach

For each cell `(i, j)`, check if it's on a diagonal (i.e., `i == j` or `i + j == n - 1`). If on diagonal, it must be non-zero. If not on diagonal, it must be zero.

## C# Solution

```csharp
public class Solution
{
    public bool CheckXMatrix(int[][] grid)
    {
        int n = grid.Length;
        
        for (int i = 0; i < n; i++)
        {
            for (int j = 0; j < n; j++)
            {
                bool onDiagonal = (i == j) || (i + j == n - 1);
                
                if (onDiagonal && grid[i][j] == 0)
                    return false;
                    
                if (!onDiagonal && grid[i][j] != 0)
                    return false;
            }
        }
        
        return true;
    }
}
```

## Complexity

- **Time:** O(n^2)
- **Space:** O(1)
