# 1615. Maximal Network Rank

**Difficulty:** Medium
**Category:** Graph

## Problem

Given `n` cities and a list of bidirectional `roads`, the "network rank" of two different cities is the total number of roads directly connected to either city (a road connecting both counted only once). Return the maximal network rank over all pairs of cities.

### Example

```
Input: n = 4, roads = [[0,1],[0,3],[1,2],[1,3]]
Output: 4
```

## Approach

Compute each city's degree and store adjacency as a boolean matrix for O(1) "directly connected" checks. For every pair `(i, j)`, the rank is `degree[i] + degree[j]` minus one if the pair shares a direct road (to avoid double-counting that shared road). Track the maximum over all pairs.

## C# Solution

```csharp
public class Solution
{
    public int MaximalNetworkRank(int n, int[][] roads)
    {
        int[] degree = new int[n];
        bool[,] connected = new bool[n, n];

        foreach (var road in roads)
        {
            int a = road[0];
            int b = road[1];
            degree[a]++;
            degree[b]++;
            connected[a, b] = true;
            connected[b, a] = true;
        }

        int best = 0;

        for (int i = 0; i < n; i++)
        {
            for (int j = i + 1; j < n; j++)
            {
                int rank = degree[i] + degree[j] - (connected[i, j] ? 1 : 0);
                best = Math.Max(best, rank);
            }
        }

        return best;
    }
}
```

## Complexity

- **Time:** `O(n^2 + r)`, where `r` is the number of roads.
- **Space:** `O(n^2)` for the adjacency matrix.
