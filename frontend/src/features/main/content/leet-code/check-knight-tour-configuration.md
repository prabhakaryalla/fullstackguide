# 2596. Check Knight Tour Configuration

**Difficulty:** Medium
**Category:** Array, Matrix, Depth-First Search, Simulation

## Problem

There is a knight on an `n x n` chessboard. In a valid tour, the knight visits every cell on the board exactly once. You are given an `n x n` integer matrix `grid` consisting of distinct integers from 0 to `n * n - 1` where `grid[row][col]` indicates that the cell `(row, col)` is the `grid[row][col]`th cell that the knight visited.

Return `true` if `grid` represents a valid knight tour, otherwise return `false`.

### Example

```
Input: grid = [[0,11,16,5,20],[17,4,19,10,15],[12,1,8,21,6],[3,18,23,14,9],[24,13,2,7,22]]
Output: true
Explanation: The knight visits cells in order 0->1->2->...->24 with valid knight moves
```

## Approach

Start from the cell with value 0 and simulate the knight tour. For each step, find the cell with the next value and verify it's exactly one knight move away from the current cell. A knight moves in an "L" shape: 2 squares in one direction and 1 square perpendicular.

## C# Solution

```csharp
public class Solution
{
    public bool CheckValidGrid(int[][] grid)
    {
        int n = grid.Length;
        
        if (grid[0][0] != 0) return false;
        
        var positions = new (int row, int col)[n * n];
        
        for (int i = 0; i < n; i++)
        {
            for (int j = 0; j < n; j++)
            {
                positions[grid[i][j]] = (i, j);
            }
        }
        
        for (int i = 0; i < n * n - 1; i++)
        {
            var (r1, c1) = positions[i];
            var (r2, c2) = positions[i + 1];
            
            int dr = Math.Abs(r2 - r1);
            int dc = Math.Abs(c2 - c1);
            
            if (!((dr == 2 && dc == 1) || (dr == 1 && dc == 2)))
            {
                return false;
            }
        }
        
        return true;
    }
}
```

## Complexity

- **Time:** O(n²)
- **Space:** O(n²)
