# 3553. Minimum Weighted Subgraph With the Required Paths II

**Difficulty:** Hard
**Category:** Tree, Graph, Binary Search, Binary Lifting, Depth-First Search

## Problem
You are given an undirected weighted tree with `n` nodes numbered `0` to `n - 1`, represented by an array `edges` where `edges[i] = [ui, vi, wi]` denotes an edge between `ui` and `vi` with weight `wi`. You are also given an integer array `queries` where `queries[i] = [src1i, src2i, desti]`.

For each query, find the minimum total edge weight of a subgraph (a set of edges forming connected paths) such that both `src1i` and `src2i` can reach `desti` using only edges in the subgraph. The subgraph is the union of the path from `src1` to a meeting point on the tree path structure and the path from `src2` to that point, both continuing to `dest`. Since it is a tree, the answer for each query is the total weight of edges covered by the union of the path from `src1` to `dest` and the path from `src2` to `dest`.

Return an array `answer` where `answer[i]` is the answer for `queries[i]`.

## Approach
Since the graph is a tree, there is a unique path between any two nodes. The subgraph required for a query `(src1, src2, dest)` is the union of the tree path `src1 -> dest` and the tree path `src2 -> dest`. Using the identity:

`weight(union of two paths to dest) = weight(src1 -> dest) + weight(src2 -> dest) - weight(shared path)`

The shared path is the path from `dest` up to `LCA(src1, src2)` when both `src1` and `src2` are on the "far side" relative to `dest`... more precisely: root the tree at `dest`-independent root, and for each query compute distances using LCA with binary lifting:
- `dist(src1, dest) = depth[src1] + depth[dest] - 2*depth[LCA(src1, dest)]`
- Similarly for `dist(src2, dest)`.
- The overlapping portion of the two paths (from `dest` towards the common ancestor of `src1` and `src2` restricted to the direction of `dest`) is `dist(dest, LCA(src1, src2, dest_related))`.

A cleaner way: the union length equals `dist(src1, dest) + dist(src2, dest) - dist(m, dest)` where `m` is the meeting node where the two paths diverge — this meeting node is `LCA(src1, src2)` if `dest` lies "beyond" it, otherwise adjust. To handle this robustly, compute for three pairs the pairwise LCA distances and use:

`answer = (dist(src1,dest) + dist(src2,dest) + dist(src1,src2) - 2*max_pairwise_overlap) / ... `

The simplest correct formula for the union of two tree paths sharing an endpoint `dest`:
`union = dist(src1, dest) + dist(src2, dest) - dist(x, dest)`
where `x` is the LCA of `src1` and `src2` computed with respect to `dest` as root (i.e., root the tree at `dest` conceptually via the standard multi-root LCA trick: the meeting point is the node `m` that maximizes `depth(m)` among ancestors common to the `src1->dest` and `src2->dest` paths). This node `m` equals whichever of `LCA(src1,dest)`, `LCA(src2,dest)`, `LCA(src1,src2)` has the maximum depth (a classic technique for the "meeting point of three nodes in a tree").

We precompute Euler tour depths and binary lifting tables (`O(n log n)` preprocessing) so each LCA query is `O(log n)`, and answer each query in `O(log n)` using the three-LCA-max-depth trick.

## C# Solution

```csharp
public class Solution {
    public long[] MinimumWeight(int n, int[][] edges, int[][] queries) {
        List<(int to, long w)>[] adj = new List<(int, long)>[n];
        for (int i = 0; i < n; i++) adj[i] = new List<(int, long)>();
        foreach (var e in edges) {
            adj[e[0]].Add((e[1], e[2]));
            adj[e[1]].Add((e[0], e[2]));
        }

        int LOG = Math.Max(1, (int)Math.Ceiling(Math.Log2(Math.Max(2, n))) + 1);
        int[,] up = new int[n, LOG];
        int[] depth = new int[n];
        long[] distFromRoot = new long[n];
        bool[] visited = new bool[n];

        // BFS/DFS from node 0 (tree is connected)
        var stack = new Stack<int>();
        stack.Push(0);
        visited[0] = true;
        up[0, 0] = 0;
        depth[0] = 0;
        distFromRoot[0] = 0;
        while (stack.Count > 0) {
            int u = stack.Pop();
            foreach (var (v, w) in adj[u]) {
                if (!visited[v]) {
                    visited[v] = true;
                    up[v, 0] = u;
                    depth[v] = depth[u] + 1;
                    distFromRoot[v] = distFromRoot[u] + w;
                    stack.Push(v);
                }
            }
        }

        for (int j = 1; j < LOG; j++) {
            for (int v = 0; v < n; v++) {
                up[v, j] = up[up[v, j - 1], j - 1];
            }
        }

        int Lca(int u, int v) {
            if (depth[u] < depth[v]) (u, v) = (v, u);
            int diff = depth[u] - depth[v];
            for (int j = 0; j < LOG; j++) {
                if (((diff >> j) & 1) == 1) u = up[u, j];
            }
            if (u == v) return u;
            for (int j = LOG - 1; j >= 0; j--) {
                if (up[u, j] != up[v, j]) {
                    u = up[u, j];
                    v = up[v, j];
                }
            }
            return up[u, 0];
        }

        long Dist(int u, int v) {
            int l = Lca(u, v);
            return distFromRoot[u] + distFromRoot[v] - 2 * distFromRoot[l];
        }

        int m = queries.Length;
        long[] answer = new long[m];
        for (int i = 0; i < m; i++) {
            int s1 = queries[i][0], s2 = queries[i][1], dest = queries[i][2];
            int lca12 = Lca(s1, s2);
            int lca1d = Lca(s1, dest);
            int lca2d = Lca(s2, dest);
            // meeting point is the candidate with maximum depth
            int meet = lca12;
            if (depth[lca1d] > depth[meet]) meet = lca1d;
            if (depth[lca2d] > depth[meet]) meet = lca2d;

            long d1 = Dist(s1, dest);
            long d2 = Dist(s2, dest);
            long dMeet = Dist(meet, dest);
            answer[i] = d1 + d2 - dMeet;
        }

        return answer;
    }
}
```

## Complexity

- **Time:** O((n + q) log n) for preprocessing binary lifting tables and answering each query with O(log n) LCA computations.
- **Space:** O(n log n) for the binary lifting table.
