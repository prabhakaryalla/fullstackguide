# 1579. Remove Max Number of Edges to Keep Graph Fully Traversable

**Difficulty:** Hard
**Category:** Graph, Union Find

## Problem

Alice and Bob want to independently be able to traverse the entire graph. Edges come in three types: type 1 (Alice only), type 2 (Bob only), and type 3 (both). Return the maximum number of edges that can be removed while keeping the graph fully traversable by both Alice and Bob, or `-1` if it's impossible for either to fully traverse the graph.

### Example

```
Input: n = 4, edges = [[3,1,2],[3,2,3],[1,1,3],[1,2,4],[1,1,2],[2,3,4]]
Output: 2
```

## Approach

Greedily add type-3 (shared) edges first, using two separate Union-Find structures (one representing Alice's connectivity, one representing Bob's) — since a shared edge helps both, add it to both structures whenever it connects two previously-disconnected components in either. Any type-3 edge that doesn't merge new components in *either* structure is redundant and can be removed. Then process type-1 edges using only Alice's structure, and type-2 edges using only Bob's structure, in the same way. Count every edge that was *not* needed (i.e., connected already-connected components) as removable. At the end, if either Alice's or Bob's structure doesn't have exactly one connected component covering all `n` nodes, return `-1`.

## C# Solution

```csharp
public class Solution
{
    public int MaxNumEdgesToRemove(int n, int[][] edges)
    {
        var alice = new UnionFind(n);
        var bob = new UnionFind(n);
        int usedEdges = 0;

        foreach (int[] edge in edges)
        {
            if (edge[0] == 3)
            {
                bool a = alice.Union(edge[1], edge[2]);
                bool b = bob.Union(edge[1], edge[2]);
                if (a || b)
                {
                    usedEdges++;
                }
            }
        }

        foreach (int[] edge in edges)
        {
            if (edge[0] == 1 && alice.Union(edge[1], edge[2]))
            {
                usedEdges++;
            }
            else if (edge[0] == 2 && bob.Union(edge[1], edge[2]))
            {
                usedEdges++;
            }
        }

        if (!alice.IsFullyConnected() || !bob.IsFullyConnected())
        {
            return -1;
        }

        return edges.Length - usedEdges;
    }

    private class UnionFind
    {
        private readonly int[] parent;
        private int components;

        public UnionFind(int n)
        {
            parent = new int[n + 1];
            for (int i = 1; i <= n; i++)
            {
                parent[i] = i;
            }
            components = n;
        }

        public int Find(int x)
        {
            if (parent[x] != x)
            {
                parent[x] = Find(parent[x]);
            }
            return parent[x];
        }

        public bool Union(int a, int b)
        {
            int rootA = Find(a);
            int rootB = Find(b);
            if (rootA == rootB)
            {
                return false;
            }
            parent[rootA] = rootB;
            components--;
            return true;
        }

        public bool IsFullyConnected() => components == 1;
    }
}
```

## Complexity

- **Time:** `O(e * alpha(n))` — near-constant amortized Union-Find operations per edge.
- **Space:** `O(n)` for each Union-Find structure.
