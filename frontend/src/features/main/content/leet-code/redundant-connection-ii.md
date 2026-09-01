# 685. Redundant Connection II

**Difficulty:** Hard
**Category:** Depth-First Search, Union Find, Graph

## Problem

Given a rooted tree of `n` nodes represented as directed `edges`, with one extra edge added (so some node might have two parents, or a cycle might exist), return the edge that can be removed so the remaining edges form a valid rooted tree with all nodes reachable from the root.

### Example

```
Input: edges = [[1,2],[1,3],[2,3]]
Output: [2,3]
```

## Approach

First scan for a node with two incoming edges (two parents) — if found, remember both candidate edges, since removing one of them might fix the structure. Then run Union-Find over all edges except a tentatively-skipped conflicting edge: if a cycle is detected without the two-parent conflict having occurred, the current edge causing the cycle is the answer. If a two-parent conflict was recorded and no cycle is found while skipping its second occurrence, the first of the two conflicting edges is the answer; otherwise, the second one is.

## C# Solution

```csharp
public class Solution
{
    private int[] parent;

    public int[] FindRedundantDirectedConnection(int[][] edges)
    {
        int n = edges.Length;
        var candidate1 = new int[0];
        var candidate2 = new int[0];
        var parentOf = new int[n + 1];

        int conflictEdgeIndex = -1;

        for (int i = 0; i < edges.Length; i++)
        {
            int child = edges[i][1];
            if (parentOf[child] != 0)
            {
                candidate1 = new[] { parentOf[child], child };
                candidate2 = edges[i];
                conflictEdgeIndex = i;
            }
            else
            {
                parentOf[child] = edges[i][0];
            }
        }

        parent = new int[n + 1];
        for (int i = 0; i <= n; i++)
            parent[i] = i;

        for (int i = 0; i < edges.Length; i++)
        {
            if (i == conflictEdgeIndex) continue;

            int u = edges[i][0], v = edges[i][1];
            int rootU = Find(u), rootV = Find(v);

            if (rootU == rootV)
            {
                return candidate1.Length > 0 ? candidate1 : edges[i];
            }

            parent[rootV] = rootU;
        }

        return candidate2;
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

- **Time:** `O(n * α(n))`.
- **Space:** `O(n)` for the parent tracking arrays.
