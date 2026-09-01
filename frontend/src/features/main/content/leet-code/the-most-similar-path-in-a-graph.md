# 1548. The Most Similar Path in a Graph

**Difficulty:** Hard
**Category:** Graph, Dynamic Programming, Shortest Path

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a graph of `n` cities connected by `roads`, city names in `names`, and a `targetPath` list of names, find a path in the graph (visiting connected cities in sequence, allowing repeats) of the same length as `targetPath` that minimizes the number of positions where the visited city's name differs from the corresponding `targetPath` entry. Return any such path (as a list of city indices) achieving the minimum edit count.

### Example

```
Input: n = 5, roads = [[0,2],[0,3],[1,2],[1,3],[1,4],[2,4]],
       names = ["ATL","PEK","LAX","DXB","HND"],
       targetPath = ["ATL","DXB","HND","LAX"]
Output: [0,2,4,2]
```

## Approach

Use dynamic programming over `dp[i][v]`: the minimum edit cost for matching the first `i + 1` positions of `targetPath` while ending the path at city `v`. The cost added at step `i` for landing on city `v` is `0` if `names[v] == targetPath[i]` else `1`. Transition from `dp[i-1][u]` to `dp[i][v]` is only valid if there's a road between `u` and `v`. Track parent pointers to reconstruct the path once the minimum total cost is found at the last position, then backtrack.

## C# Solution

```csharp
public class Solution
{
    public IList<int> MostSimilar(int n, int[][] roads, string[] names, string[] targetPath)
    {
        var graph = new List<int>[n];
        for (int i = 0; i < n; i++)
        {
            graph[i] = new List<int>();
        }
        foreach (int[] road in roads)
        {
            graph[road[0]].Add(road[1]);
            graph[road[1]].Add(road[0]);
        }

        int m = targetPath.Length;
        int[,] dp = new int[m, n];
        int[,] parent = new int[m, n];

        for (int v = 0; v < n; v++)
        {
            dp[0, v] = names[v] == targetPath[0] ? 0 : 1;
        }

        for (int i = 1; i < m; i++)
        {
            for (int v = 0; v < n; v++)
            {
                dp[i, v] = int.MaxValue;
            }

            for (int u = 0; u < n; u++)
            {
                foreach (int v in graph[u])
                {
                    int cost = dp[i - 1, u] + (names[v] == targetPath[i] ? 0 : 1);
                    if (cost < dp[i, v])
                    {
                        dp[i, v] = cost;
                        parent[i, v] = u;
                    }
                }
            }
        }

        int bestEnd = 0;
        for (int v = 1; v < n; v++)
        {
            if (dp[m - 1, v] < dp[m - 1, bestEnd])
            {
                bestEnd = v;
            }
        }

        var path = new int[m];
        int current = bestEnd;
        for (int i = m - 1; i >= 0; i--)
        {
            path[i] = current;
            if (i > 0)
            {
                current = parent[i, current];
            }
        }

        return path;
    }
}
```

## Complexity

- **Time:** `O(m * E)` — for each of the `m` target positions, relax every edge once.
- **Space:** `O(m * n)` for the DP and parent tables.
