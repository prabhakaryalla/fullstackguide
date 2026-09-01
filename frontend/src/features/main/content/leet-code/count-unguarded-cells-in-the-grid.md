# 2257. Count Unguarded Cells in the Grid

**Difficulty:** Medium
**Category:** Array, Matrix, Simulation

## Problem

You are given an `m x n` grid. Some cells contain guards and some contain walls. Guards can see in all four cardinal directions (up, down, left, right) until they reach a wall or the edge of the grid. Return the number of unoccupied cells that are not guarded.

### Example

```
Input: m = 4, n = 6, guards = [[0,0],[1,1],[2,3]], walls = [[0,1],[2,2],[1,4]]
Output: 7
```

## Approach

Mark guard and wall positions. For each guard, simulate line-of-sight in all four directions, marking cells as guarded until hitting a wall or boundary. Count cells that are neither guards, walls, nor guarded.

## C# Solution

```csharp
public class Solution
{
    public int CountUnguarded(int m, int n, int[][] guards, int[][] walls)
    {
        var grid = new int[m, n];
        
        foreach (var wall in walls)
        {
            grid[wall[0], wall[1]] = 2;
        }
        
        foreach (var guard in guards)
        {
            grid[guard[0], guard[1]] = 3;
        }
        
        int[][] dirs = { new int[] { 0, 1 }, new int[] { 0, -1 }, new int[] { 1, 0 }, new int[] { -1, 0 } };
        
        foreach (var guard in guards)
        {
            foreach (var dir in dirs)
            {
                int r = guard[0] + dir[0];
                int c = guard[1] + dir[1];
                while (r >= 0 && r < m && c >= 0 && c < n && grid[r, c] != 2 && grid[r, c] != 3)
                {
                    grid[r, c] = 1;
                    r += dir[0];
                    c += dir[1];
                }
            }
        }
        
        int count = 0;
        for (int i = 0; i < m; i++)
        {
            for (int j = 0; j < n; j++)
            {
                if (grid[i, j] == 0) count++;
            }
        }
        
        return count;
    }
}
```

## Complexity

- **Time:** O(m * n * (m + n))
- **Space:** O(m * n)
