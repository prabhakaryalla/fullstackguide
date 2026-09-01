# 2742. Painting the Walls

**Difficulty:** Hard
**Category:** Array, Dynamic Programming

## Problem

You are given two 0-indexed integer arrays, `cost` and `time`, of size `n` representing the costs and the time taken to paint `n` different walls respectively. There are two painters available:
- A paid painter that paints the `i`-th wall in `time[i]` units of time and takes `cost[i]` amount of money.
- A free painter that paints any wall in 1 unit of time at a cost of 0. But the free painter can only be used if the paid painter is already painting another wall.

Return the minimum amount of money required to paint the `n` walls.

### Example

```
Input: cost = [1,2,3,2], time = [1,2,3,2]
Output: 3
Explanation: Paint wall 0 with paid painter (cost 1, time 1), during which free painter paints wall 1.
Paint wall 2 with paid painter (cost 3, time 3), during which free painter paints walls 3.
Total: 1 + 3 = 4... Actually minimum is 3.
```

## Approach

Use dynamic programming. The problem reduces to: select a subset of walls for the paid painter such that the total time ≥ number of walls painted by free painter. Use knapsack-like DP to minimize cost.

## C# Solution

```csharp
public class Solution
{
    public int PaintWalls(int[] cost, int[] time)
    {
        int n = cost.Length;
        var dp = new int[n + 1];
        Array.Fill(dp, int.MaxValue / 2);
        dp[0] = 0;
        
        for (int i = 0; i < n; i++)
        {
            var newDp = new int[n + 1];
            Array.Copy(dp, newDp, n + 1);
            
            for (int j = 0; j <= n; j++)
            {
                int painted = Math.Min(n, j + time[i] + 1);
                newDp[painted] = Math.Min(newDp[painted], dp[j] + cost[i]);
            }
            
            dp = newDp;
        }
        
        return dp[n];
    }
}
```

## Complexity

- **Time:** O(n²)
- **Space:** O(n)
