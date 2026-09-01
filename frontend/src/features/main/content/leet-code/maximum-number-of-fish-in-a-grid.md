# 2658. Maximum Number of Fish in a Grid

**Difficulty:** Medium
**Category:** Array, Depth-First Search, Breadth-First Search, Matrix, Union Find

## Problem

You are given a 0-indexed 2D matrix `grid` of size `m x n`, where `(r, c)` represents:

- A land cell if `grid[r][c] = 0`, or
- A water cell containing `grid[r][c]` fish, if `grid[r][c] > 0`.

A fisher can start at any water cell and collect all the fish in a connected component of water cells (cells that are adjacent horizontally or vertically). 

Return the maximum number of fish the fisher can collect by starting at any water cell.

### Example

```
Input: grid = [[0,2,1,0],[4,0,0,3],[1,0,0,4],[0,3,2,0]]
Output: 7
Explanation: Starting at (1,0) and collecting fish from connected water cells: 4 + 1 = 5, or starting at (3,1) and collecting: 3 + 2 = 5, or starting at (2,3) and (1,3): 4 + 3 = 7.

Input: grid = [[1,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,1]]
Output: 1
```

## Approach

Use DFS or BFS to explore each connected component of water cells. For each unvisited water cell, perform a traversal to collect all fish in that connected component. Track the maximum sum across all components.

## C# Solution

```csharp
public class Solution
{
    public int FindMaxFish(int[][] grid)
    {
        int m = grid.Length;
        int n = grid[0].Length;
        bool[,] visited = new bool[m, n];
        int maxFish = 0;
        
        for (int i = 0; i < m; i++)
        {
            for (int j = 0; j < n; j++)
            {
                if (grid[i][j] > 0 && !visited[i, j])
                {
                    int fish = DFS(grid, visited, i, j, m, n);
                    maxFish = Math.Max(maxFish, fish);
                }
            }
        }
        
        return maxFish;
    }
    
    private int DFS(int[][] grid, bool[,] visited, int row, int col, int m, int n)
    {
        if (row < 0 || row >= m || col < 0 || col >= n || visited[row, col] || grid[row][col] == 0)
        {
            return 0;
        }
        
        visited[row, col] = true;
        int fish = grid[row][col];
        
        fish += DFS(grid, visited, row + 1, col, m, n);
        fish += DFS(grid, visited, row - 1, col, m, n);
        fish += DFS(grid, visited, row, col + 1, m, n);
        fish += DFS(grid, visited, row, col - 1, m, n);
        
        return fish;
    }
}
```

## Complexity

- **Time:** O(m * n) where m and n are the dimensions of the grid
- **Space:** O(m * n) for the visited array and recursion stack
