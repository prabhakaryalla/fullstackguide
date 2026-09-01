# 261. Graph Valid Tree

**Difficulty:** Medium
**Category:** Union Find, Graph, Breadth-First Search, Depth-First Search

## Problem

Given `n` nodes labeled `0` to `n - 1` and a list of undirected `edges`, determine if these edges form a valid tree (i.e., the graph is connected and contains no cycles).

### Example

```
Input: n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]
Output: true
```

### Constraints

- `1 <= n <= 2000`
- `0 <= edges.length <= 5000`

## Approach

A graph with `n` nodes is a valid tree if and only if it has exactly `n - 1` edges and is fully connected. Use Union-Find: for each edge, union its two endpoints; if they are already in the same component, a cycle exists and the graph cannot be a tree. After processing all edges, check that the edge count is exactly `n - 1` and that only one component remains.

## C# Solution

```csharp
public class Solution
{
    public bool ValidTree(int n, int[][] edges)
    {
        if (edges.Length != n - 1) return false;

        var parent = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;

        int Find(int x)
        {
            while (parent[x] != x)
            {
                parent[x] = parent[parent[x]];
                x = parent[x];
            }
            return x;
        }

        foreach (var edge in edges)
        {
            int rootA = Find(edge[0]);
            int rootB = Find(edge[1]);
            if (rootA == rootB) return false;
            parent[rootA] = rootB;
        }

        return true;
    }
}
```

## Complexity

- **Time:** `O(n * α(n))` — near-linear due to union-find with path compression.
- **Space:** `O(n)` — for the parent array.
