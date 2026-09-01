# 2852. Sum of Remoteness of All Cells

**Difficulty:** Medium
**Category:** Breadth-First Search, Union Find, Array, Matrix

## Problem

You are given a 0-indexed m x n matrix `grid` representing a land where `grid[i][j]` can be:
- `0` representing a lake cell
- A positive integer representing a land cell with its value

The remoteness of a land cell is defined as the sum of values of all land cells in the grid minus the sum of values of all land cells in the same connected component (using 4-directional connectivity, excluding lakes).

Return the sum of the remoteness of all land cells.

### Example

```
Input: grid = [[1,0,3],[4,0,2]]
Output: 16
Explanation:
Connected components:
- Component 1: cells with value 1 (top-left)
- Component 2: cells with value 3 (top-right)  
- Component 3: cells with values 4 and 2 (bottom row)
Total sum = 1 + 3 + 4 + 2 = 10

Remoteness calculations:
- Cell(1): 10 - 1 = 9
- Cell(3): 10 - 3 = 7
- Cell(4): 10 - (4+2) = 4
- Cell(2): 10 - (4+2) = 4
Sum = 9 + 7 + 4 + 4 = 24
```

## Approach

Use Union-Find (Disjoint Set Union) or BFS to identify connected components of land cells. For each component, calculate the sum of its values. The total sum of all land cells can be precomputed.

For each land cell with value `v` belonging to a component with sum `compSum`, its remoteness is `totalSum - compSum`. Sum this value across all land cells.

## C# Solution

```csharp
public class Solution
{
    public long SumRemoteness(int[][] grid)
    {
        int m = grid.Length, n = grid[0].Length;
        bool[,] visited = new bool[m, n];
        long totalSum = 0;
        var components = new List<(long sum, List<(int r, int c)> cells)>();
        
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (grid[i][j] > 0)
                    totalSum += grid[i][j];
        
        int[] dr = {-1, 1, 0, 0};
        int[] dc = {0, 0, -1, 1};
        
        for (int i = 0; i < m; i++)
        {
            for (int j = 0; j < n; j++)
            {
                if (grid[i][j] > 0 && !visited[i, j])
                {
                    var cells = new List<(int, int)>();
                    long compSum = 0;
                    var queue = new Queue<(int, int)>();
                    
                    queue.Enqueue((i, j));
                    visited[i, j] = true;
                    
                    while (queue.Count > 0)
                    {
                        var (r, c) = queue.Dequeue();
                        cells.Add((r, c));
                        compSum += grid[r][c];
                        
                        for (int d = 0; d < 4; d++)
                        {
                            int nr = r + dr[d], nc = c + dc[d];
                            if (nr >= 0 && nr < m && nc >= 0 && nc < n && 
                                !visited[nr, nc] && grid[nr][nc] > 0)
                            {
                                visited[nr, nc] = true;
                                queue.Enqueue((nr, nc));
                            }
                        }
                    }
                    
                    components.Add((compSum, cells));
                }
            }
        }
        
        long result = 0;
        foreach (var (compSum, cells) in components)
        {
            foreach (var (r, c) in cells)
            {
                result += totalSum - compSum;
            }
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** `O(m * n)` — visit each cell once during BFS.
- **Space:** `O(m * n)` for visited array and component storage.
