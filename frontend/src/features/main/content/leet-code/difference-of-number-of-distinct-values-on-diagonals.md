# 2711. Difference of Number of Distinct Values on Diagonals

**Difficulty:** Medium
**Category:** Array, Matrix, Hash Table

## Problem

Given a 2D grid of integers, for each cell `(i, j)`, find the absolute difference between the number of distinct values in the top-left diagonal and the number of distinct values in the bottom-right diagonal.

### Example

```
Input: grid = [[1,2,3],[3,1,5],[3,2,1]]
Output: [[1,1,0],[1,0,1],[0,1,1]]
```

## Approach

For each cell `(i, j)`, collect all values on the top-left diagonal (moving towards `(0, 0)`) and bottom-right diagonal (moving towards `(m-1, n-1)`). Count distinct values in each direction using hash sets, then compute the absolute difference.

## C# Solution

```csharp
public class Solution
{
    public int[][] DifferenceOfDistinctValues(int[][] grid)
    {
        int m = grid.Length;
        int n = grid[0].Length;
        int[][] result = new int[m][];
        
        for (int i = 0; i < m; i++)
        {
            result[i] = new int[n];
            for (int j = 0; j < n; j++)
            {
                HashSet<int> topLeft = new HashSet<int>();
                HashSet<int> bottomRight = new HashSet<int>();
                
                int r = i - 1, c = j - 1;
                while (r >= 0 && c >= 0)
                {
                    topLeft.Add(grid[r][c]);
                    r--;
                    c--;
                }
                
                r = i + 1;
                c = j + 1;
                while (r < m && c < n)
                {
                    bottomRight.Add(grid[r][c]);
                    r++;
                    c++;
                }
                
                result[i][j] = Math.Abs(topLeft.Count - bottomRight.Count);
            }
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(m × n × min(m, n)) for checking all cells and their diagonals
- **Space:** O(min(m, n)) for the hash sets
