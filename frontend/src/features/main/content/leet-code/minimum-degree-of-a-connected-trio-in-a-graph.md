# 1761. Minimum Degree of a Connected Trio in a Graph

**Difficulty:** Hard
**Category:** Graph

## Problem

Given an undirected graph with `n` nodes and `edges`, a connected trio is a set of three nodes where every pair is connected by an edge. The degree of a trio is the number of edges connecting any of the three nodes to a node outside the trio. Return the minimum degree of a connected trio in the graph, or `-1` if none exists.

### Example

```
Input: n = 6, edges = [[1,2],[1,3],[3,2],[4,1],[5,2],[3,6]]
Output: 3
```

## Approach

Precompute the degree of every node and an adjacency matrix for O(1) edge lookups. For every edge `(u, v)`, scan all other nodes `w` and check whether `w` is connected to both `u` and `v`, forming a trio. The trio's degree is `degree[u] + degree[v] + degree[w] - 6` (each of the three internal edges is counted twice across the three nodes' degrees).

## C# Solution

```csharp
public class Solution
{
    public int MinTrioDegree(int n, int[][] edges)
    {
        bool[,] connected = new bool[n + 1, n + 1];
        int[] degree = new int[n + 1];

        foreach (var e in edges)
        {
            connected[e[0], e[1]] = true;
            connected[e[1], e[0]] = true;
            degree[e[0]]++;
            degree[e[1]]++;
        }

        int best = int.MaxValue;
        foreach (var e in edges)
        {
            int u = e[0], v = e[1];
            for (int w = 1; w <= n; w++)
            {
                if (w == u || w == v) continue;
                if (connected[u, w] && connected[v, w])
                    best = Math.Min(best, degree[u] + degree[v] + degree[w] - 6);
            }
        }

        return best == int.MaxValue ? -1 : best;
    }
}
```

## Complexity

- **Time:** `O(E * n)`.
- **Space:** `O(n^2)` for the adjacency matrix.
