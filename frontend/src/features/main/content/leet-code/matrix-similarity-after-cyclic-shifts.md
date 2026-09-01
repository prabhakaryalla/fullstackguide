# 2946. Matrix Similarity After Cyclic Shifts

**Difficulty:** Easy
**Category:** Array, Matrix, Simulation

## Problem

You are given an `m x n` matrix. A matrix is considered similar if after cyclically shifting each row (odd rows right, even rows left) by one position, the matrix remains the same. Return true if the matrix is similar.

### Example

```
Input: mat = [[1,2,1,2],[5,5,5,5],[6,3,6,3]]
Output: true
Explanation: After shifting, the matrix remains the same.
```

## Approach

Simulate the cyclic shifts and compare with the original matrix. For even-indexed rows (0-indexed), shift left. For odd-indexed rows, shift right. Check if the result equals the original.

## C# Solution

```csharp
public class Solution 
{
    public bool AreSimilar(int[][] mat, int k) 
    {
        int m = mat.Length;
        int n = mat[0].Length;
        k %= n;
        
        if (k == 0) return true;
        
        for (int i = 0; i < m; i++) 
        {
            for (int j = 0; j < n; j++) 
            {
                int newCol;
                if (i % 2 == 0) 
                {
                    newCol = (j - k + n) % n;
                } 
                else 
                {
                    newCol = (j + k) % n;
                }
                
                if (mat[i][j] != mat[i][newCol]) 
                {
                    return false;
                }
            }
        }
        
        return true;
    }
}
```

## Complexity

- **Time:** O(m * n)
- **Space:** O(1)
