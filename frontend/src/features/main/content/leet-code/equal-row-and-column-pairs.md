# 2352. Equal Row and Column Pairs

**Difficulty:** Medium
**Category:** Array, Hash Table, Matrix, Simulation

## Problem

Given a 0-indexed `n x n` integer matrix `grid`, return the number of pairs `(r_i, c_j)` such that row `r_i` and column `c_j` are equal.

A row and column pair is considered equal if they contain the same elements in the same order (i.e., an equal array).

### Example

```
Input: grid = [[3,2,1],[1,7,6],[2,7,7]]
Output: 1
Explanation: Only row 2 equals column 1: [2,7,7]
```

## Approach

Convert each row to a string/tuple representation and store in a dictionary with counts. For each column, convert to the same representation and check if it exists in the dictionary, adding its count to the result.

## C# Solution

```csharp
public class Solution
{
    public int EqualPairs(int[][] grid)
    {
        int n = grid.Length;
        var rowMap = new Dictionary<string, int>();
        
        for (int i = 0; i < n; i++)
        {
            string rowKey = string.Join(",", grid[i]);
            if (!rowMap.ContainsKey(rowKey))
                rowMap[rowKey] = 0;
            rowMap[rowKey]++;
        }
        
        int count = 0;
        
        for (int j = 0; j < n; j++)
        {
            var col = new int[n];
            for (int i = 0; i < n; i++)
            {
                col[i] = grid[i][j];
            }
            string colKey = string.Join(",", col);
            
            if (rowMap.ContainsKey(colKey))
                count += rowMap[colKey];
        }
        
        return count;
    }
}
```

## Complexity

- **Time:** O(n^2)
- **Space:** O(n^2)
