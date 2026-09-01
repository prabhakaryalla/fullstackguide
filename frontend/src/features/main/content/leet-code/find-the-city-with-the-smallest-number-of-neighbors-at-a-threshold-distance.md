# 1334. Find the City With the Smallest Number of Neighbors at a Threshold Distance

**Difficulty:** Medium
**Category:** Dynamic Programming, Graph, Shortest Path

## Problem

Given `n` cities connected by weighted edges and a `distanceThreshold`, return the city with the fewest number of other cities reachable within the threshold distance; if tied, return the city with the largest index.

### Example

```
Input: n = 4, edges = [[0,1,3],[1,2,1],[1,3,4],[2,3,1]], distanceThreshold = 4
Output: 3
```

## Approach

Compute all-pairs shortest paths with the Floyd-Warshall algorithm, since `n` is small. For each city, count how many other cities have a shortest distance within the threshold, then pick the city with the smallest count, using the larger index to break ties.

## C# Solution

```csharp
public class Solution
{
    public int FindTheCity(int n, int[][] edges, int distanceThreshold)
    {
        const int INF = int.MaxValue / 2;
        var dist = new int[n, n];
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++)
                dist[i, j] = i == j ? 0 : INF;

        foreach (var e in edges)
        {
            dist[e[0], e[1]] = Math.Min(dist[e[0], e[1]], e[2]);
            dist[e[1], e[0]] = Math.Min(dist[e[1], e[0]], e[2]);
        }

        for (int k = 0; k < n; k++)
            for (int i = 0; i < n; i++)
                for (int j = 0; j < n; j++)
                    if (dist[i, k] + dist[k, j] < dist[i, j])
                        dist[i, j] = dist[i, k] + dist[k, j];

        int best = -1, bestCount = int.MaxValue;
        for (int i = 0; i < n; i++)
        {
            int count = 0;
            for (int j = 0; j < n; j++)
            {
                if (i != j && dist[i, j] <= distanceThreshold) count++;
            }

            if (count <= bestCount)
            {
                bestCount = count;
                best = i;
            }
        }

        return best;
    }
}
```

## Complexity

- **Time:** `O(n^3)` for Floyd-Warshall.
- **Space:** `O(n^2)` for the distance matrix.
