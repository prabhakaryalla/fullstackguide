# 2814. Minimum Time Takes to Reach Destination Without Drowning

**Difficulty:** Hard
**Category:** Array, Breadth-First Search, Matrix
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

You are given an `m × n` matrix `land` representing a grid where:
- `'S'` represents your starting position
- `'D'` represents the destination
- `'.'` represents empty land
- `'*'` represents water that will expand

Water expands to all adjacent empty cells every minute. You can move to adjacent cells (up, down, left, right) and each move takes 1 minute.

Return the minimum time to reach the destination without drowning, or `-1` if impossible.

### Example

```
Input: land = [["D",".","*"],[".",".","."],[".",".","S"]]
Output: 3
Explanation: Move from S upward twice then left once to reach D before water floods the path.
```

## Approach

Use two separate BFS traversals:

1. First BFS: Calculate when water reaches each cell (multi-source BFS from all water cells)
2. Second BFS: Find shortest path from S to D, only visiting cells before water arrives

For each cell in the path-finding BFS, check if we can reach it before water does.

## C# Solution

```csharp
public class Solution
{
    public int MinimumSeconds(IList<IList<char>> land)
    {
        int m = land.Count;
        int n = land[0].Count;
        var waterTime = new int[m][];
        for (int i = 0; i < m; i++)
        {
            waterTime[i] = new int[n];
            Array.Fill(waterTime[i], int.MaxValue);
        }
        
        int startR = -1, startC = -1, destR = -1, destC = -1;
        var waterQueue = new Queue<(int, int, int)>();
        
        for (int i = 0; i < m; i++)
        {
            for (int j = 0; j < n; j++)
            {
                if (land[i][j] == 'S')
                {
                    startR = i;
                    startC = j;
                }
                else if (land[i][j] == 'D')
                {
                    destR = i;
                    destC = j;
                }
                else if (land[i][j] == '*')
                {
                    waterQueue.Enqueue((i, j, 0));
                    waterTime[i][j] = 0;
                }
            }
        }
        
        int[][] dirs = { new[] { 0, 1 }, new[] { 1, 0 }, new[] { 0, -1 }, new[] { -1, 0 } };
        
        while (waterQueue.Count > 0)
        {
            var (r, c, t) = waterQueue.Dequeue();
            foreach (var dir in dirs)
            {
                int nr = r + dir[0];
                int nc = c + dir[1];
                if (nr >= 0 && nr < m && nc >= 0 && nc < n && 
                    land[nr][nc] != 'D' && land[nr][nc] != 'X' &&
                    waterTime[nr][nc] > t + 1)
                {
                    waterTime[nr][nc] = t + 1;
                    waterQueue.Enqueue((nr, nc, t + 1));
                }
            }
        }
        
        var queue = new Queue<(int, int, int)>();
        queue.Enqueue((startR, startC, 0));
        var visited = new bool[m, n];
        visited[startR, startC] = true;
        
        while (queue.Count > 0)
        {
            var (r, c, t) = queue.Dequeue();
            
            if (r == destR && c == destC)
            {
                return t;
            }
            
            foreach (var dir in dirs)
            {
                int nr = r + dir[0];
                int nc = c + dir[1];
                if (nr >= 0 && nr < m && nc >= 0 && nc < n && !visited[nr, nc] &&
                    land[nr][nc] != 'X' && t + 1 < waterTime[nr][nc])
                {
                    visited[nr, nc] = true;
                    queue.Enqueue((nr, nc, t + 1));
                }
            }
        }
        
        return -1;
    }
}
```

## Complexity

- **Time:** O(m × n) for both BFS traversals
- **Space:** O(m × n) for tracking water arrival times and visited cells
