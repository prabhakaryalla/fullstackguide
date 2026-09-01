# 2282. Number of People That Can Be Seen in a Grid

**Difficulty:** Medium  
**Category:** Array, Stack, Matrix, Monotonic Stack

## Problem

You are given an `m x n` 0-indexed 2D array of positive integers `heights` where `heights[i][j]` is the height of the person standing at position `(i, j)`.

A person standing at position `(row1, col1)` can see a person at position `(row2, col2)` if:

- They are in the same row or column (i.e., either `row1 == row2` or `col1 == col2`)
- Everyone strictly between them is strictly shorter than both of them

Return the number of people that can be seen by the person standing at position `(i, j)` for all positions in the grid.

### Example

```
Input: heights = [[3,1,4,2,5]]
Output: [[2,1,2,1,0]]
Explanation: Person at (0,0) can see persons at (0,1) and (0,2).
```

## Approach

For each cell, check in all four directions (up, down, left, right) using a monotonic stack approach or direct counting. Count visible people in each direction until blocked by someone equal or taller.

## C# Solution

```csharp
public class Solution
{
    public int[][] SeePeople(int[][] heights)
    {
        int m = heights.Length, n = heights[0].Length;
        int[][] result = new int[m][];
        
        for (int i = 0; i < m; i++)
        {
            result[i] = new int[n];
        }
        
        for (int i = 0; i < m; i++)
        {
            for (int j = 0; j < n; j++)
            {
                result[i][j] = CountVisible(heights, i, j);
            }
        }
        
        return result;
    }
    
    private int CountVisible(int[][] heights, int row, int col)
    {
        int count = 0;
        int m = heights.Length, n = heights[0].Length;
        
        int[][] dirs = new int[][] { new int[] {0,1}, new int[] {1,0}, new int[] {0,-1}, new int[] {-1,0} };
        
        foreach (var dir in dirs)
        {
            int maxSeen = 0;
            int r = row + dir[0], c = col + dir[1];
            
            while (r >= 0 && r < m && c >= 0 && c < n)
            {
                if (heights[r][c] > maxSeen)
                {
                    count++;
                    maxSeen = heights[r][c];
                    
                    if (heights[r][c] >= heights[row][col])
                    {
                        break;
                    }
                }
                
                r += dir[0];
                c += dir[1];
            }
        }
        
        return count;
    }
}
```

## Complexity

- **Time:** O(m * n * (m + n)) for checking all directions from each cell
- **Space:** O(m * n) for the result array
