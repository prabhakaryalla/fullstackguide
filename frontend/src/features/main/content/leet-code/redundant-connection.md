# 684. Redundant Connection

**Difficulty:** Medium
**Category:** Depth-First Search, Union Find, Graph

## Problem

Given a graph that started as a tree with `n` nodes and had one extra edge added (creating exactly one cycle), represented as an array of `edges`, return the edge that can be removed to restore the tree, choosing the last such edge in the input if multiple qualify.

### Example

```
Input: edges = [[1,2],[1,3],[2,3]]
Output: [2,3]
```

## Approach

Process edges in order using a Union-Find structure. For each edge, check whether its two endpoints already belong to the same connected component (via `Find`); if so, this edge is the one creating the cycle and can be safely returned as the redundant connection. Otherwise, union the two components and continue.

## C# Solution

```csharp
public class Solution
{
    private int[] parent;

    public int[] FindRedundantConnection(int[][] edges)
    {
        int n = edges.Length;
        parent = new int[n + 1];
        for (int i = 0; i <= n; i++)
            parent[i] = i;

        foreach (var edge in edges)
        {
            int root1 = Find(edge[0]);
            int root2 = Find(edge[1]);

            if (root1 == root2) return edge;

            parent[root1] = root2;
        }

        return Array.Empty<int>();
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

- **Time:** `O(n * α(n))`, where `α` is the inverse Ackermann function.
- **Space:** `O(n)` for the parent array.
