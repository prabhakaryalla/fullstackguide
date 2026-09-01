# 2846. Minimum Edge Weight Equilibrium Queries in a Tree

**Difficulty:** Hard
**Category:** Array, Tree, Depth-First Search, Breadth-First Search, Binary Search

## Problem

You are given a tree with `n` nodes described by `edges`, where `edges[i] = [u, v, w]` connects `u` and `v` with a weight `w` (`1 <= w <= 26`). You are also given a list of `queries`, where `queries[i] = [u, v]`. For each query, find the minimum number of edges whose weight must be changed so that every edge along the unique path between `u` and `v` has the same weight. Return an array with the answer for each query.

### Example

Consider a small tree where the path between the queried nodes has edge weights [1, 2, 1]. Changing the single edge with weight 2 to 1 makes all edges on the path equal, so the answer for that query is 1 (the path length of 3 minus the maximum weight frequency of 2).

## Approach

Root the tree at node 0. For every node, maintain a cumulative array `count[node][w]` (`w` from 1 to 26) representing how many edges with weight `w` lie on the path from the root to that node — computed once via a single traversal, copying the parent's array and incrementing the edge's weight bucket. Precompute binary-lifting ancestor tables to answer LCA queries in `O(log n)`. For a query `(u, v)`: find `lca`, compute the path length as `depth[u] + depth[v] - 2*depth[lca]`, and for each weight `w`, compute how many edges of that weight lie on the path via `count[u][w] + count[v][w] - 2*count[lca][w]`. The answer is the path length minus the maximum such frequency across all 26 weights.

## C# Solution

```csharp
public class Solution 
{
    public int[] MinOperationsQueries(int n, int[][] edges, int[][] queries) 
    {
        var adj = new List<(int to, int w)>[n];
        for (int i = 0; i < n; i++) adj[i] = new List<(int, int)>();
        foreach (var e in edges) 
        {
            adj[e[0]].Add((e[1], e[2]));
            adj[e[1]].Add((e[0], e[2]));
        }

        int log = 1;
        while ((1 << log) < n) log++;
        log++;

        var up = new int[log, n];
        var depth = new int[n];
        var count = new int[n][];
        for (int i = 0; i < n; i++) count[i] = new int[27];

        var visited = new bool[n];
        var parent = new int[n];
        var parentWeight = new int[n];
        var order = new List<int>();

        var stack = new Stack<int>();
        stack.Push(0);
        visited[0] = true;

        while (stack.Count > 0) 
        {
            int u = stack.Pop();
            order.Add(u);
            foreach (var (v, w) in adj[u]) 
            {
                if (visited[v]) continue;
                visited[v] = true;
                parent[v] = u;
                parentWeight[v] = w;
                depth[v] = depth[u] + 1;
                stack.Push(v);
            }
        }

        foreach (int v in order) 
        {
            if (v == 0) continue;
            Array.Copy(count[parent[v]], count[v], 27);
            count[v][parentWeight[v]]++;
            up[0, v] = parent[v];
        }

        for (int k = 1; k < log; k++) 
        {
            for (int v = 0; v < n; v++) 
            {
                up[k, v] = up[k - 1, up[k - 1, v]];
            }
        }

        int Lca(int u, int v) 
        {
            if (depth[u] < depth[v]) (u, v) = (v, u);
            int diff = depth[u] - depth[v];
            for (int k = 0; k < log; k++) 
            {
                if (((diff >> k) & 1) == 1) u = up[k, u];
            }
            if (u == v) return u;

            for (int k = log - 1; k >= 0; k--) 
            {
                if (up[k, u] != up[k, v]) 
                {
                    u = up[k, u];
                    v = up[k, v];
                }
            }
            return up[0, u];
        }

        int qLen = queries.Length;
        var result = new int[qLen];

        for (int i = 0; i < qLen; i++) 
        {
            int u = queries[i][0], v = queries[i][1];
            int lca = Lca(u, v);
            int pathLength = depth[u] + depth[v] - 2 * depth[lca];

            int maxFreq = 0;
            for (int w = 1; w <= 26; w++) 
            {
                int freq = count[u][w] + count[v][w] - 2 * count[lca][w];
                maxFreq = Math.Max(maxFreq, freq);
            }

            result[i] = pathLength - maxFreq;
        }

        return result;
    }
}
```

## Complexity

- **Time:** O((n + q) log n + q · 26)
- **Space:** O(n log n + n · 26)
