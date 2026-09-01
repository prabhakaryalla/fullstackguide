# 2510. Check if There is a Path With Equal Number of 0's And 1's

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Matrix

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

You are given a binary matrix `grid` of size `m x n`. You start at the top-left cell and want to reach the bottom-right cell. You can only move right or down.

Return `true` if there exists a path such that the number of 0's equals the number of 1's on the path.

### Example

```
Input: grid = [[0,1,0,0],[0,1,0,1],[1,0,1,0]]
Output: true
Explanation: One valid path has 5 zeros and 5 ones
```

## Approach

Use dynamic programming with a balance state:
- Track the difference (count of 1's - count of 0's) at each cell
- Use a set or boolean array to mark reachable balance values
- A path with equal 0's and 1's has balance = 0
- The path length is m + n - 1, which must be even for equal counts

## C# Solution

```csharp
public class Solution
{
    public bool IsThereAPath(int[][] grid)
    {
        int m = grid.Length;
        int n = grid[0].Length;
        
        if ((m + n - 1) % 2 == 1) return false;
        
        var dp = new HashSet<int>[m, n];
        dp[0, 0] = new HashSet<int>();
        dp[0, 0].Add(grid[0][0] == 1 ? 1 : -1);
        
        for (int i = 0; i < m; i++)
        {
            for (int j = 0; j < n; j++)
            {
                if (i == 0 && j == 0) continue;
                
                dp[i, j] = new HashSet<int>();
                int delta = grid[i][j] == 1 ? 1 : -1;
                
                if (i > 0 && dp[i - 1, j] != null)
                {
                    foreach (int bal in dp[i - 1, j])
                    {
                        dp[i, j].Add(bal + delta);
                    }
                }
                
                if (j > 0 && dp[i, j - 1] != null)
                {
                    foreach (int bal in dp[i, j - 1])
                    {
                        dp[i, j].Add(bal + delta);
                    }
                }
            }
        }
        
        return dp[m - 1, n - 1].Contains(0);
    }
}
```

## Complexity

- **Time:** O(m × n × (m + n)) in worst case
- **Space:** O(m × n × (m + n)) for the DP sets
