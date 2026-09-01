# 2133. Check if Every Row and Column Contains All Numbers

**Difficulty:** Easy
**Category:** Array, Hash Table, Matrix

## Problem

An `n x n` matrix is valid if every row and every column contains all the integers from `1` to `n` (inclusive). Given an `n x n` integer matrix, return `true` if the matrix is valid, otherwise return `false`.

### Example

```
Input: matrix = [[1,2,3],[3,1,2],[2,3,1]]
Output: true
Explanation: Each row and column contains the numbers 1, 2, and 3 exactly once.
```

## Approach

For each row and each column, verify that it contains all numbers from 1 to n. We can use a hash set to track which numbers we've seen, or use a frequency array. For each row/column, check that all numbers 1 through n appear exactly once.

## C# Solution

```csharp
public class Solution
{
    public bool CheckValid(int[][] matrix)
    {
        int n = matrix.Length;
        
        // Check rows
        for (int i = 0; i < n; i++)
        {
            var seen = new HashSet<int>();
            for (int j = 0; j < n; j++)
            {
                if (matrix[i][j] < 1 || matrix[i][j] > n || !seen.Add(matrix[i][j]))
                    return false;
            }
        }
        
        // Check columns
        for (int j = 0; j < n; j++)
        {
            var seen = new HashSet<int>();
            for (int i = 0; i < n; i++)
            {
                if (!seen.Add(matrix[i][j]))
                    return false;
            }
        }
        
        return true;
    }
}
```

## Complexity

- **Time:** O(n²) to check all rows and columns
- **Space:** O(n) for the hash set
