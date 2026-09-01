# 2536. Increment Submatrices by One

**Difficulty:** Medium
**Category:** Array, Matrix, Prefix Sum

## Problem

You are given a positive integer `n`, indicating an `n x n` (0-indexed) grid initially filled with zeros. You are also given a 2D array `queries` where `queries[i] = [row1_i, col1_i, row2_i, col2_i]`.

For the `i-th` query, increment all cells in the submatrix from `(row1_i, col1_i)` to `(row2_i, col2_i)` by 1.

Return the matrix after all queries.

### Example

```
Input: n = 3, queries = [[1,1,2,2],[0,0,1,1]]
Output: [[1,1,0],[1,2,1],[0,1,1]]
```

## Approach

Use a difference array technique. For each query, mark the boundaries: add 1 at top-left, subtract 1 at positions just outside the rectangle. Then compute the 2D prefix sum to get the final matrix.

## C# Solution

```csharp
public class Solution
{
    public int[][] RangeAddQueries(int n, int[][] queries)
    {
        int[][] diff = new int[n + 1][];
        for (int i = 0; i <= n; i++)
        {
            diff[i] = new int[n + 1];
        }
        
        foreach (var query in queries)
        {
            int r1 = query[0], c1 = query[1];
            int r2 = query[2], c2 = query[3];
            
            diff[r1][c1]++;
            diff[r1][c2 + 1]--;
            diff[r2 + 1][c1]--;
            diff[r2 + 1][c2 + 1]++;
        }
        
        int[][] result = new int[n][];
        for (int i = 0; i < n; i++)
        {
            result[i] = new int[n];
        }
        
        for (int i = 0; i < n; i++)
        {
            for (int j = 0; j < n; j++)
            {
                result[i][j] = diff[i][j];
                if (i > 0) result[i][j] += result[i - 1][j];
                if (j > 0) result[i][j] += result[i][j - 1];
                if (i > 0 && j > 0) result[i][j] -= result[i - 1][j - 1];
            }
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(q + n²) where q is the number of queries
- **Space:** O(n²) for the result matrix
