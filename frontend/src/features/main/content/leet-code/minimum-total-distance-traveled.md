# 2463. Minimum Total Distance Traveled

**Difficulty:** Hard
**Category:** Array, Dynamic Programming, Sorting

## Problem

You are given two arrays `robot` and `factory`. Each robot needs to be repaired at exactly one factory. Each factory has a limit on how many robots it can repair.

- `robot[i]` is the position of the ith robot
- `factory[j] = [position_j, limit_j]` indicates factory j's position and repair limit

The cost for a robot at position `x` to be repaired at factory position `y` is `|x - y|`. Return the minimum total distance for all robots to be repaired.

### Example

```
Input: robot = [0,4,6], factory = [[2,2],[6,2]]
Output: 4
Explanation: Robot 0 to factory 0 (distance 2), Robot 1 to factory 0 (distance 2), Robot 2 to factory 1 (distance 0). Total = 4.
```

## Approach

Use dynamic programming after sorting both robots and factories by position. Define `dp[i][j]` as the minimum cost to assign the first `i` robots using the first `j` factories.

For each state, try assigning 0 to `limit[j]` robots to factory `j`, computing the cost for each assignment.

## C# Solution

```csharp
public class Solution
{
    public long MinimumTotalDistance(IList<int> robot, int[][] factory)
    {
        var robots = robot.OrderBy(x => x).ToList();
        var factories = factory.OrderBy(f => f[0]).ToList();
        
        int n = robots.Count;
        int m = factories.Count;
        
        long[][] dp = new long[n + 1][];
        for (int i = 0; i <= n; i++)
        {
            dp[i] = new long[m + 1];
            Array.Fill(dp[i], long.MaxValue / 2);
        }
        
        dp[0][0] = 0;
        
        for (int j = 1; j <= m; j++)
        {
            dp[0][j] = 0;
            
            for (int i = 1; i <= n; i++)
            {
                dp[i][j] = dp[i][j - 1]; // Don't use factory j
                
                long cost = 0;
                for (int k = 1; k <= Math.Min(i, factories[j - 1][1]); k++)
                {
                    cost += Math.Abs(robots[i - k] - factories[j - 1][0]);
                    dp[i][j] = Math.Min(dp[i][j], dp[i - k][j - 1] + cost);
                }
            }
        }
        
        return dp[n][m];
    }
}
```

## Complexity

- **Time:** O(n * m * L) where L is the maximum factory limit
- **Space:** O(n * m)
