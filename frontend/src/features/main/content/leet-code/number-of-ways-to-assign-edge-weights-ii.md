# 3559. Number of Ways to Assign Edge Weights II

**Difficulty:** Hard
**Category:** Array, Math, Dynamic Programming, Bit Manipulation, Tree, Depth-First Search

## Problem
There is an undirected tree with `n` nodes labeled `1` to `n`, rooted at node `1`, represented by a 2D array `edges`. Each edge must be assigned a weight of `1` or `2`; the cost of a path is the sum of the edge weights on it.

You are given a 2D array `queries` where `queries[i] = [u, v]`. For each query, determine the number of ways to assign weights to the edges **on the path between `u` and `v`** so that the path's total cost is odd (edges not on the path are disregarded). Return an array `answer` where `answer[i]` is the result for `queries[i]`, each modulo `10^9 + 7`.

## Approach
As in Part I, only the **number of edges** on the path (its length `len`) matters — the parity of the cost depends only on how many of those `len` edges are weighted `1`, and exactly `2^(len-1)` of the `2^len` assignments give an odd count of `1`s, for `len >= 1`. If `len == 0` (i.e. `u == v`), no assignment can make an empty sum odd, so the answer is `0`.

To answer each query in `O(log n)`, precompute:
1. Depths of every node via BFS/DFS from the root.
2. A binary-lifting table `up[node][k]` for `O(log n)` LCA queries.

Then `len = depth[u] + depth[v] - 2 * depth[lca(u, v)]`, and the answer is `0` if `len == 0`, otherwise `2^(len - 1) mod (10^9 + 7)` (precomputing powers of two up to `n` lets each query be answered in `O(log n)` total, including the LCA lookup).

## C# Solution

```csharp
public class Solution {
    private const int MOD = 1_000_000_007;

    public int[] AssignEdgeWeights(int[][] edges, int[][] queries) {
        int n = edges.Length + 1;
        List<int>[] adj = new List<int>[n + 1];
        for (int i = 1; i <= n; i++) adj[i] = new List<int>();
        foreach (var e in edges) {
            adj[e[0]].Add(e[1]);
            adj[e[1]].Add(e[0]);
        }

        int LOG = Math.Max(1, (int)Math.Ceiling(Math.Log2(Math.Max(2, n + 1))) + 1);
        int[,] up = new int[n + 1, LOG];
        int[] depth = new int[n + 1];
        bool[] visited = new bool[n + 1];

        var queue = new Queue<int>();
        queue.Enqueue(1);
        visited[1] = true;
        up[1, 0] = 1;

        while (queue.Count > 0) {
            int u = queue.Dequeue();
            foreach (int v in adj[u]) {
                if (!visited[v]) {
                    visited[v] = true;
                    depth[v] = depth[u] + 1;
                    up[v, 0] = u;
                    queue.Enqueue(v);
                }
            }
        }

        for (int k = 1; k < LOG; k++) {
            for (int v = 1; v <= n; v++) {
                up[v, k] = up[up[v, k - 1], k - 1];
            }
        }

        int Lca(int u, int v) {
            if (depth[u] < depth[v]) (u, v) = (v, u);
            int diff = depth[u] - depth[v];
            for (int k = 0; k < LOG; k++) {
                if (((diff >> k) & 1) == 1) u = up[u, k];
            }
            if (u == v) return u;
            for (int k = LOG - 1; k >= 0; k--) {
                if (up[u, k] != up[v, k]) {
                    u = up[u, k];
                    v = up[v, k];
                }
            }
            return up[u, 0];
        }

        long[] pow2 = new long[n + 1];
        pow2[0] = 1;
        for (int i = 1; i <= n; i++) pow2[i] = pow2[i - 1] * 2 % MOD;

        int m = queries.Length;
        int[] answer = new int[m];
        for (int i = 0; i < m; i++) {
            int u = queries[i][0], v = queries[i][1];
            int lca = Lca(u, v);
            int len = depth[u] + depth[v] - 2 * depth[lca];
            answer[i] = len == 0 ? 0 : (int)pow2[len - 1];
        }

        return answer;
    }
}
```

## Complexity

- **Time:** O((n + q) log n) for building the binary lifting table and answering all queries.
- **Space:** O(n log n) for the lifting table.
