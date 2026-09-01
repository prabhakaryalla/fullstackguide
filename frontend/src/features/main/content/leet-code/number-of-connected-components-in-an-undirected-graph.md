# 323. Number of Connected Components in an Undirected Graph

**Difficulty:** Medium
**Category:** Union Find, Depth-First Search, Breadth-First Search, Graph
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given `n` nodes labeled `0` to `n - 1` and a list of undirected `edges`, return the number of connected components in the graph.

### Example

```
Input: n = 5, edges = [[0,1],[1,2],[3,4]]
Output: 2
```

### Constraints

- `1 <= n <= 2000`
- `1 <= edges.length <= 5000`

## Approach

Use a Union-Find (disjoint set) structure initialized with every node as its own component. For each edge, union its two endpoints; whenever a union actually merges two previously separate components, decrement a running component count starting at `n`.

## C# Solution

```csharp
public class Solution
{
    private int[] parent;

    public int CountComponents(int n, int[][] edges)
    {
        parent = new int[n];
        for (int i = 0; i < n; i++)
            parent[i] = i;

        int components = n;

        foreach (var edge in edges)
        {
            int root1 = Find(edge[0]);
            int root2 = Find(edge[1]);

            if (root1 != root2)
            {
                parent[root1] = root2;
                components--;
            }
        }

        return components;
    }

    private int Find(int x)
    {
        if (parent[x] != x)
            parent[x] = Find(parent[x]);

        return parent[x];
    }
}
```

## Complexity

- **Time:** `O(E * α(n))`, where `α` is the inverse Ackermann function.
- **Space:** `O(n)` for the parent array.
