# 3558. Number of Ways to Assign Edge Weights I

**Difficulty:** Medium
**Category:** Math, Tree, Depth-First Search

## Problem
There is an undirected tree with `n` nodes labeled `1` to `n`, rooted at node `1`, represented by a 2D array `edges` of length `n - 1`. Initially every edge has weight `0`; you must assign each edge a weight of either `1` or `2`. The cost of the path between two nodes is the sum of the weights of the edges on that path.

Select any node `x` at the maximum depth in the tree (if several nodes tie for maximum depth, any one may be chosen — the answer is the same for all of them). Return the number of ways to assign weights to the edges on the path from node `1` to `x` such that the total cost is odd. Ignore edges not on that path. Return the answer modulo `10^9 + 7`.

## Approach
Let `d` be the maximum depth of the tree (the number of edges on the path from the root to the farthest node), found via a simple BFS/DFS from node 1.

The parity of the path's cost depends only on how many of the `d` edges are assigned weight `1` (since weight `2` never changes parity, and weight `1` flips it). We need the number of edges assigned `1` to be odd. Among the `2^d` total ways to assign `{1, 2}` to `d` edges, exactly half produce an odd count of `1`s (a standard binomial-coefficient symmetry: `C(d,1) + C(d,3) + ... = 2^(d-1)`), for any `d >= 1`.

So the answer is simply `2^(d - 1) mod (10^9 + 7)`, computed via fast exponentiation, where `d` is the maximum depth found by BFS.

## C# Solution

```csharp
public class Solution {
    private const int MOD = 1_000_000_007;

    public int AssignEdgeWeights(int[][] edges) {
        int n = edges.Length + 1;
        List<int>[] adj = new List<int>[n + 1];
        for (int i = 1; i <= n; i++) adj[i] = new List<int>();
        foreach (var e in edges) {
            adj[e[0]].Add(e[1]);
            adj[e[1]].Add(e[0]);
        }

        int[] depth = new int[n + 1];
        bool[] visited = new bool[n + 1];
        var queue = new Queue<int>();
        queue.Enqueue(1);
        visited[1] = true;
        int maxDepth = 0;

        while (queue.Count > 0) {
            int u = queue.Dequeue();
            maxDepth = Math.Max(maxDepth, depth[u]);
            foreach (int v in adj[u]) {
                if (!visited[v]) {
                    visited[v] = true;
                    depth[v] = depth[u] + 1;
                    queue.Enqueue(v);
                }
            }
        }

        return (int)Power(2, maxDepth - 1, MOD);
    }

    private long Power(long baseVal, long exp, long mod) {
        if (exp <= 0) return 1;
        long result = 1;
        baseVal %= mod;
        while (exp > 0) {
            if ((exp & 1) == 1) result = result * baseVal % mod;
            baseVal = baseVal * baseVal % mod;
            exp >>= 1;
        }
        return result;
    }
}
```

## Complexity

- **Time:** O(n) for the BFS plus O(log n) for the modular exponentiation.
- **Space:** O(n) for the adjacency list and auxiliary arrays.
