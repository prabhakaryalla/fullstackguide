# 2247. Maximum Cost of Trip With K Highways

**Difficulty:** Hard
**Category:** Dynamic Programming, Graph
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

There are `n` cities and `m` highways connecting them. You are given integers `n`, `k`, and a 2D array `highways` where `highways[i] = [xi, yi, tolli]` indicates a highway between cities `xi` and `yi` with a toll `tolli`. You want to go on a trip that visits exactly `k` different cities. Return the maximum cost of such a trip, or -1 if impossible.

### Example

```
Input: n = 5, k = 3, highways = [[0,1,3],[0,2,4],[1,2,2],[1,3,5],[2,3,1],[3,4,6]]
Output: 11
Explanation: Trip 0->1->3->4 costs 3+5+6=14, but trip 1->3->4 with k=3 costs 5+6=11
```

## Approach

Use dynamic programming with bitmask to track visited cities. dp[mask][city] represents the maximum cost to reach `city` having visited the cities represented by `mask`. Build the graph and iterate through all possible paths.

## C# Solution

```csharp
public class Solution
{
    public int MaximumCost(int n, int[][] highways, int k)
    {
        if (k > n) return -1;
        
        var graph = new List<(int, int)>[n];
        for (int i = 0; i < n; i++)
        {
            graph[i] = new List<(int, int)>();
        }
        
        foreach (var highway in highways)
        {
            graph[highway[0]].Add((highway[1], highway[2]));
            graph[highway[1]].Add((highway[0], highway[2]));
        }
        
        var dp = new int[1 << n, n];
        for (int i = 0; i < (1 << n); i++)
        {
            for (int j = 0; j < n; j++)
            {
                dp[i, j] = -1;
            }
        }
        
        for (int i = 0; i < n; i++)
        {
            dp[1 << i, i] = 0;
        }
        
        int maxCost = -1;
        
        for (int mask = 0; mask < (1 << n); mask++)
        {
            int count = 0;
            for (int i = 0; i < n; i++)
            {
                if ((mask & (1 << i)) != 0) count++;
            }
            
            if (count > k) continue;
            
            for (int u = 0; u < n; u++)
            {
                if ((mask & (1 << u)) == 0 || dp[mask, u] == -1) continue;
                
                if (count == k)
                {
                    maxCost = Math.Max(maxCost, dp[mask, u]);
                }
                
                foreach (var (v, toll) in graph[u])
                {
                    if ((mask & (1 << v)) != 0) continue;
                    int newMask = mask | (1 << v);
                    dp[newMask, v] = Math.Max(dp[newMask, v], dp[mask, u] + toll);
                }
            }
        }
        
        return maxCost;
    }
}
```

## Complexity

- **Time:** O(2^n * n * m)
- **Space:** O(2^n * n)
