# 2850. Minimum Moves to Spread Stones Over Grid

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Breadth-First Search

## Problem

You are given a 0-indexed 2D integer matrix grid of size 3 x 3, representing the number of stones in each cell. The grid contains exactly 9 stones, and there can be multiple stones in a single cell.

In one move, you can move a single stone from its current cell to one of its adjacent cells (sharing an edge).

Return the minimum number of moves required to place exactly one stone in each cell.

### Example

```
Input: grid = [[1,1,0],[1,1,1],[1,2,1]]
Output: 3
Explanation: Move stones to distribute them evenly, one per cell
```

## Approach

Since the grid is only 3x3, we can use brute force with permutations or BFS.

One approach is to:
1. Find all cells with excess stones (stones > 1)
2. Find all cells with deficit (stones = 0)
3. Try all possible ways to match excess cells to deficit cells
4. For each matching, compute Manhattan distance
5. Return the minimum total distance

For a 3x3 grid, there are at most 9! permutations, but many optimizations can be applied. A simpler approach is to use BFS or DFS to try all assignment possibilities.

Alternatively, we can use the Hungarian algorithm or min-cost matching, but for 3x3, brute force is sufficient.

## C# Solution

```csharp
public class Solution
{
    public int MinimumMoves(int[][] grid)
    {
        List<(int, int)> excess = new List<(int, int)>();
        List<(int, int)> deficit = new List<(int, int)>();
        
        for (int i = 0; i < 3; i++)
        {
            for (int j = 0; j < 3; j++)
            {
                if (grid[i][j] > 1)
                {
                    for (int k = 1; k < grid[i][j]; k++)
                    {
                        excess.Add((i, j));
                    }
                }
                else if (grid[i][j] == 0)
                {
                    deficit.Add((i, j));
                }
            }
        }
        
        if (deficit.Count == 0)
            return 0;
        
        return MinMoves(excess, deficit, 0);
    }
    
    private int MinMoves(List<(int, int)> excess, List<(int, int)> deficit, int index)
    {
        if (index == deficit.Count)
            return 0;
        
        int minCost = int.MaxValue;
        var (dr, dc) = deficit[index];
        
        for (int i = 0; i < excess.Count; i++)
        {
            var (er, ec) = excess[i];
            int cost = Math.Abs(dr - er) + Math.Abs(dc - ec);
            
            excess.RemoveAt(i);
            int totalCost = cost + MinMoves(excess, deficit, index + 1);
            minCost = Math.Min(minCost, totalCost);
            excess.Insert(i, (er, ec));
        }
        
        return minCost;
    }
}
```

## Complexity

- **Time:** O(k! * k) where k is the number of stones to move (at most 8)
- **Space:** O(k) for recursion stack and lists
