# 3778. Minimum Distance Excluding One Maximum Weighted Edge

**Difficulty:** Hard
**Category:** Tree, Graph, Depth-First Search, Binary Lifting
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
You are given a weighted tree with `n` nodes numbered `0` to `n - 1`, described by an array of `n - 1` edges `edges[i] = [u, v, w]`. For each query `[a, b]`, consider the unique path between node `a` and node `b`; you must exclude exactly one occurrence of the **maximum-weight edge** along that path from the total (if there are ties for the maximum weight, exclude only one such edge) and return the sum of the remaining edge weights on the path. Return an array of answers, one per query.

## Approach
Root the tree and precompute, for every node, its depth, its `2^k`-th ancestors (binary lifting table), and along each binary-lifting jump the maximum edge weight encountered as well as the total edge-weight sum. For a query `(a, b)`, find the LCA of `a` and `b` using the standard binary-lifting ascent, and while ascending accumulate both the total path weight and the maximum single edge weight encountered along the path (by combining the "jump" data for `a → LCA` and `b → LCA` segments). Once the total path weight `total` and maximum edge weight `maxEdge` are known, the answer to the query is `total - maxEdge` (subtracting exactly one instance of the maximum edge). Precomputing the binary lifting tables takes `O(n log n)`, and each query is answered in `O(log n)`.

## C# Solution

```csharp
public class Solution 
{
    private int[][] up;
    private long[][] maxEdgeUp;
    private long[][] sumUp;
    private int[] depth;
    private int LOG;

    public long[] MinDistanceExcludingMax(int n, int[][] edges, int[][] queries)
    {
        var adj = new List<(int to, int w)>[n];
        for (int i = 0; i < n; i++) adj[i] = new List<(int, int)>();
        foreach (var e in edges)
        {
            adj[e[0]].Add((e[1], e[2]));
            adj[e[1]].Add((e[0], e[2]));
        }

        LOG = Math.Max(1, (int)Math.Ceiling(Math.Log2(Math.Max(2, n))));
        up = new int[LOG][];
        maxEdgeUp = new long[LOG][];
        sumUp = new long[LOG][];
        for (int k = 0; k < LOG; k++)
        {
            up[k] = new int[n];
            maxEdgeUp[k] = new long[n];
            sumUp[k] = new long[n];
        }
        depth = new int[n];

        bool[] visited = new bool[n];
        var stack = new Stack<int>();
        stack.Push(0);
        visited[0] = true;
        up[0][0] = 0;
        maxEdgeUp[0][0] = 0;
        sumUp[0][0] = 0;

        // iterative DFS to set parent (k=0 level) and depth
        var parentStack = new Stack<(int node, int parent, int edgeW)>();
        parentStack.Push((0, -1, 0));
        visited[0] = false;

        while (parentStack.Count > 0)
        {
            var (node, parent, edgeW) = parentStack.Pop();
            if (visited[node]) continue;
            visited[node] = true;

            if (parent == -1)
            {
                up[0][node] = node;
                maxEdgeUp[0][node] = 0;
                sumUp[0][node] = 0;
                depth[node] = 0;
            }
            else
            {
                up[0][node] = parent;
                maxEdgeUp[0][node] = edgeW;
                sumUp[0][node] = edgeW;
                depth[node] = depth[parent] + 1;
            }

            foreach (var (to, w) in adj[node])
            {
                if (!visited[to])
                {
                    parentStack.Push((to, node, w));
                }
            }
        }

        for (int k = 1; k < LOG; k++)
        {
            for (int v = 0; v < n; v++)
            {
                int mid = up[k - 1][v];
                up[k][v] = up[k - 1][mid];
                maxEdgeUp[k][v] = Math.Max(maxEdgeUp[k - 1][v], maxEdgeUp[k - 1][mid]);
                sumUp[k][v] = sumUp[k - 1][v] + sumUp[k - 1][mid];
            }
        }

        int q = queries.Length;
        long[] result = new long[q];
        for (int i = 0; i < q; i++)
        {
            result[i] = Query(queries[i][0], queries[i][1]);
        }
        return result;
    }

    private long Query(int a, int b)
    {
        long total = 0;
        long maxEdge = 0;

        if (depth[a] < depth[b]) (a, b) = (b, a);
        int diff = depth[a] - depth[b];

        for (int k = 0; k < LOG; k++)
        {
            if (((diff >> k) & 1) == 1)
            {
                total += sumUp[k][a];
                maxEdge = Math.Max(maxEdge, maxEdgeUp[k][a]);
                a = up[k][a];
            }
        }

        if (a != b)
        {
            for (int k = LOG - 1; k >= 0; k--)
            {
                if (up[k][a] != up[k][b])
                {
                    total += sumUp[k][a] + sumUp[k][b];
                    maxEdge = Math.Max(maxEdge, Math.Max(maxEdgeUp[k][a], maxEdgeUp[k][b]));
                    a = up[k][a];
                    b = up[k][b];
                }
            }
            total += sumUp[0][a] + sumUp[0][b];
            maxEdge = Math.Max(maxEdge, Math.Max(maxEdgeUp[0][a], maxEdgeUp[0][b]));
        }

        return total - maxEdge;
    }
}
```

## Complexity

- **Time:** O((n + q) log n)
- **Space:** O(n log n)
