# 2959. Number of Possible Sets of Closing Branches

**Difficulty:** Hard
**Category:** Graph, Bit Manipulation, Enumeration, Shortest Path

## Problem

You are given `n` branches numbered from 0 to n-1, and a 2D array `roads` where `roads[i] = [ui, vi, wi]` indicates a road between branches with distance. You want to close some branches (including all roads connected to them) such that the maximum distance between any two remaining branches is at most `maxDistance`.

Return the number of possible sets of branches to close (including closing no branches).

### Example

```
Input: n = 3, maxDistance = 5, roads = [[0,1,2],[1,2,10],[0,2,10]]
Output: 5
Explanation: We can close: {}, {2}, {0,2}, {1,2}, {0,1,2}
```

## Approach

Use bitmask enumeration to try all 2^n possible subsets of branches. For each subset, construct a graph with only the remaining (open) branches and use Floyd-Warshall to compute shortest paths. Check if all pairwise distances are at most `maxDistance`.

## C# Solution

```csharp
public class Solution
{
    public int NumberOfSets(int n, int maxDistance, int[][] roads)
    {
        int count = 0;

        for (int mask = 0; mask < (1 << n); mask++)
        {
            var dist = new int[n, n];

            // Initialize distances
            for (int i = 0; i < n; i++)
            {
                for (int j = 0; j < n; j++)
                {
                    dist[i, j] = (i == j) ? 0 : int.MaxValue / 2;
                }
            }

            // Add roads between open branches
            foreach (var road in roads)
            {
                int u = road[0], v = road[1], w = road[2];
                if (((mask >> u) & 1) == 1 && ((mask >> v) & 1) == 1)
                {
                    dist[u, v] = Math.Min(dist[u, v], w);
                    dist[v, u] = Math.Min(dist[v, u], w);
                }
            }

            // Floyd-Warshall
            for (int k = 0; k < n; k++)
            {
                if (((mask >> k) & 1) == 0) continue;
                for (int i = 0; i < n; i++)
                {
                    if (((mask >> i) & 1) == 0) continue;
                    for (int j = 0; j < n; j++)
                    {
                        if (((mask >> j) & 1) == 0) continue;
                        dist[i, j] = Math.Min(dist[i, j], dist[i, k] + dist[k, j]);
                    }
                }
            }

            // Check if valid
            bool valid = true;
            for (int i = 0; i < n && valid; i++)
            {
                if (((mask >> i) & 1) == 0) continue;
                for (int j = i + 1; j < n && valid; j++)
                {
                    if (((mask >> j) & 1) == 0) continue;
                    if (dist[i, j] > maxDistance)
                    {
                        valid = false;
                    }
                }
            }

            if (valid) count++;
        }

        return count;
    }
}
```

## Complexity

- **Time:** O(2^n * n^3)
- **Space:** O(n²)
