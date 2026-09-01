# 2732. Find a Good Subset of the Matrix

**Difficulty:** Hard
**Category:** Array, Hash Table, Matrix

## Problem

You are given an m x n binary matrix `grid`. A good subset is a subset of rows where for every column, at most one row in the subset has a 1 in that column.

Return any good subset of rows that has the maximum number of rows. If there are multiple solutions, return any of them. If there is no good subset, return an empty array.

### Example

```
Input: grid = [[0,1,1,0],[0,0,0,1],[1,1,1,1]]
Output: [0,1]
Explanation: Rows 0 and 1 form a good subset: columns have at most one 1.

Input: grid = [[0,0,0],[1,1,1]]
Output: [0]
Explanation: Row 0 is the only row with all zeros, which forms a good subset.
```

## Approach

Key observations:
1. If there's a row with all zeros, it can be paired with any other row
2. If no row has all zeros, check if any two rows can form a good subset (bitwise AND is 0)
3. The maximum good subset size is at most 2 (except for the all-zeros case)

Algorithm:
1. Check for a row with all zeros
2. If found, return that row with any other row
3. Otherwise, try all pairs of rows to find two rows where no column has 1 in both rows

## C# Solution

```csharp
public class Solution 
{
    public IList<int> GoodSubsetofBinaryMatrix(int[][] grid) 
    {
        int m = grid.Length;
        int n = grid[0].Length;
        
        var rowValues = new Dictionary<int, int>();
        
        for (int i = 0; i < m; i++)
        {
            int val = 0;
            for (int j = 0; j < n; j++)
            {
                val = val * 2 + grid[i][j];
            }
            
            if (val == 0)
            {
                return new List<int> { i };
            }
            
            rowValues[val] = i;
        }
        
        foreach (var kvp1 in rowValues)
        {
            foreach (var kvp2 in rowValues)
            {
                if (kvp1.Key < kvp2.Key && (kvp1.Key & kvp2.Key) == 0)
                {
                    return new List<int> { Math.Min(kvp1.Value, kvp2.Value), Math.Max(kvp1.Value, kvp2.Value) };
                }
            }
        }
        
        return new List<int>();
    }
}
```

## Complexity

- **Time:** O(m * n + m²) where m is number of rows and n is number of columns
- **Space:** O(m) for storing row values
