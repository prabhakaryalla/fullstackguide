# 3108. Minimum Cost Walk in Weighted Graph

**Difficulty:** Hard
**Category:** Array, Union Find, Bit Manipulation, Graph

## Problem

You are given an undirected weighted graph with `n` nodes described by `edges` (`edges[i] = [u, v, w]`), where you may traverse any edge any number of times (even revisiting the same edge repeatedly) during a single walk. The "cost" of a walk is the bitwise AND of the weights of every edge traversed (with repeats counted each time). Given a list of `(u, v)` queries, return for each the minimum possible cost of any walk from `u` to `v`, or `-1` if they're not connected.

## Approach

Within a single connected component, you can always revisit any edge as many times as you like, so the achievable walk cost between any two nodes in the same component is simply the AND of **every** edge weight in that component (since repeatedly traversing extra edges can only AND in more bits being cleared, and you're free to detour through any edge in the component before reaching the destination). So: union all edges together, and for each component track the running AND of all its edge weights using a Union-Find where each set's payload is the accumulated AND. To answer a query, check if `u` and `v` share the same root; if so, return that component's accumulated AND weight, otherwise `-1`. (If `u == v`, the cost is `0` since an empty walk suffices.)

## C# Solution

```csharp
public class Solution {
    public int[] MinimumCost(int n, int[][] edges, int[][] query) {
        var uf = new UnionFind(n);
        foreach (var edge in edges)
            uf.UnionByRank(edge[0], edge[1], edge[2]);

        int[] ans = new int[query.Length];
        for (int i = 0; i < query.Length; i++)
            ans[i] = uf.GetMinCost(query[i][0], query[i][1]);
        return ans;
    }

    private class UnionFind {
        private readonly int[] id;
        private readonly int[] rank;
        private readonly int[] weight;

        public UnionFind(int n) {
            id = new int[n];
            rank = new int[n];
            weight = new int[n];
            for (int i = 0; i < n; i++) {
                id[i] = i;
                weight[i] = (1 << 17) - 1; // smallest number of form 2^x - 1 exceeding 1e5
            }
        }

        public void UnionByRank(int u, int v, int w) {
            int i = Find(u);
            int j = Find(v);
            int newWeight = weight[i] & weight[j] & w;
            weight[i] = newWeight;
            weight[j] = newWeight;
            if (i == j) return;

            if (rank[i] < rank[j]) {
                id[i] = j;
            } else if (rank[i] > rank[j]) {
                id[j] = i;
            } else {
                id[i] = j;
                rank[j]++;
            }
        }

        public int GetMinCost(int u, int v) {
            if (u == v) return 0;
            int i = Find(u);
            int j = Find(v);
            return i == j ? weight[i] : -1;
        }

        private int Find(int u) => id[u] == u ? u : (id[u] = Find(id[u]));
    }
}
```

## Complexity

- Time: O((n + q) * alpha(n)) — near-constant amortized Union-Find operations for the edges and queries.
- Space: O(n) — the Union-Find arrays.
