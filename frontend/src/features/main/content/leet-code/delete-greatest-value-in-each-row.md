# 2500. Delete Greatest Value in Each Row

**Difficulty:** Easy
**Category:** Array, Matrix, Sorting

## Problem

You are given an `m x n` matrix `grid` consisting of positive integers.

Perform the following operation until `grid` becomes empty:
- Delete the element with the greatest value from each row. If multiple such elements exist, delete any of them.
- Add the maximum of deleted elements to the answer.

Return the sum of all such maximal elements.

### Example

```
Input: grid = [[1,2,4],[3,3,1]]
Output: 8
Explanation: 
Operation 1: Remove 4 from row 1 and 3 from row 2, add max(4,3) = 4
Operation 2: Remove 2 from row 1 and 3 from row 2, add max(2,3) = 3  
Operation 3: Remove 1 from row 1 and 1 from row 2, add max(1,1) = 1
Total: 4 + 3 + 1 = 8
```

## Approach

Sort each row in ascending order. Then, for each column from right to left (or equivalently, iterate through positions), take the maximum element at that position across all rows and add it to the result.

The key insight is that after sorting, the rightmost element in each row is the largest, then the second rightmost, and so on.

## C# Solution

```csharp
public class Solution
{
    public int DeleteGreatestValue(int[][] grid)
    {
        int m = grid.Length;
        int n = grid[0].Length;
        
        for (int i = 0; i < m; i++)
        {
            Array.Sort(grid[i]);
        }
        
        int result = 0;
        for (int j = 0; j < n; j++)
        {
            int maxInCol = 0;
            for (int i = 0; i < m; i++)
            {
                maxInCol = Math.Max(maxInCol, grid[i][j]);
            }
            result += maxInCol;
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(m × n log n) for sorting all rows
- **Space:** O(1) if we ignore the space used by the sorting algorithm
