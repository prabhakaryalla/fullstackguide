# 3585. Find Weighted Median Node in Tree

**Difficulty:** Hard
**Category:** Tree, Graph, LCA, Binary Search

## Problem
You are given a tree with `n` nodes (numbered `0` to `n - 1`) rooted implicitly, described by a list of weighted `edges`, plus a list of `queries`, where `queries[i] = [u, v]`. For each query, consider the path between `u` and `v`; define the **weighted median node** of the path as the first node `m` along the path (starting from `u`) such that the cumulative edge weight from `u` to `m` is at least half of the total path weight (using a ceiling so ties resolve toward the earlier node). Return an array with the weighted median node for every query.

## Approach
Build parent/depth information with a BFS from an arbitrary root. For each query, find the LCA of `u` and `v` by walking both nodes up until they meet, recording the nodes and edge weights visited along the way. Concatenate the `u → lca` path with the reversed `lca → v` path to get the full path with cumulative weights, then scan for the first prefix sum that reaches at least half the total weight.

## C# Solution

```csharp
public class Solution 
{
    public int[] WeightedMedianNode(int n, int[][] edges, int[][] queries)
    {
        var adj = new List<(int to, int w)>[n];
        for (int i = 0; i < n; i++) adj[i] = new List<(int, int)>();
        foreach (var e in edges)
        {
            adj[e[0]].Add((e[1], e[2]));
            adj[e[1]].Add((e[0], e[2]));
        }

        int[] parent = new int[n];
        int[] parentWeight = new int[n];
        int[] depth = new int[n];
        Array.Fill(parent, -1);

        var queue = new Queue<int>();
        var visited = new bool[n];
        queue.Enqueue(0);
        visited[0] = true;
        while (queue.Count > 0)
        {
            int u = queue.Dequeue();
            foreach (var (v, w) in adj[u])
            {
                if (!visited[v])
                {
                    visited[v] = true;
                    parent[v] = u;
                    parentWeight[v] = w;
                    depth[v] = depth[u] + 1;
                    queue.Enqueue(v);
                }
            }
        }

        int Lca(int x, int y)
        {
            while (depth[x] > depth[y]) x = parent[x];
            while (depth[y] > depth[x]) y = parent[y];
            while (x != y) { x = parent[x]; y = parent[y]; }
            return x;
        }

        int m = queries.Length;
        var result = new int[m];

        for (int qi = 0; qi < m; qi++)
        {
            int u = queries[qi][0];
            int v = queries[qi][1];
            int lca = Lca(u, v);

            var uSide = new List<int> { u };
            var uSideW = new List<int>();
            int a = u;
            while (a != lca)
            {
                uSideW.Add(parentWeight[a]);
                a = parent[a];
                uSide.Add(a);
            }

            var vSide = new List<int> { v };
            var vSideW = new List<int>();
            int b = v;
            while (b != lca)
            {
                vSideW.Add(parentWeight[b]);
                b = parent[b];
                vSide.Add(b);
            }

            var pathNodes = new List<int>(uSide);
            for (int idx = vSide.Count - 2; idx >= 0; idx--) pathNodes.Add(vSide[idx]);

            var cumulative = new List<long> { 0 };
            long acc = 0;
            for (int idx = 0; idx < uSideW.Count; idx++)
            {
                acc += uSideW[idx];
                cumulative.Add(acc);
            }
            for (int idx = vSideW.Count - 1; idx >= 0; idx--)
            {
                acc += vSideW[idx];
                cumulative.Add(acc);
            }

            long total = cumulative[cumulative.Count - 1];
            long target = (total + 1) / 2;

            int medianNode = pathNodes[0];
            for (int idx = 0; idx < cumulative.Count; idx++)
            {
                if (cumulative[idx] >= target)
                {
                    medianNode = pathNodes[idx];
                    break;
                }
            }

            result[qi] = medianNode;
        }

        return result;
    }
}
```

## Complexity

- **Time:** O(n) preprocessing plus O(n) per query in the worst case (path length), i.e. O(n · q) overall.
- **Space:** O(n)
