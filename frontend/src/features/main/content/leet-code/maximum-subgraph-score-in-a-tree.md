# 3772. Maximum Subgraph Score in a Tree

**Difficulty:** Hard
**Category:** Array, Dynamic Programming, Tree, Depth-First Search

## Problem

Given an undirected tree of `n` nodes (`edges`) and a binary array `good` (1 = good node, 0 = bad), the score of a connected subgraph is `(# good nodes) - (# bad nodes)`. For each node, find the maximum score among all connected subgraphs containing it. Return an array of these maximums.

### Example

Input: `n = 5, edges = [[1,0],[1,2],[1,3],[3,4]], good = [0,1,0,1,1]`
Output: `[2,3,2,3,3]`

## Approach

Let `value[i] = 1` if good else `-1`. Compute `down[u] = value[u] + sum(max(0, down[c]))` over children `c` via a post-order traversal (best subtree hanging below `u`). Then reroot: for each child `c` of `u`, `up[c] = value[u] + max(0, up[u]) + (S[u] - max(0, down[c]))`, where `S[u]` is the sum of `max(0, down[c'])` over all children of `u`. The answer for each node is `down[u] + max(0, up[u])`.

## C# Solution

```csharp
public class Solution 
{
    public int[] MaxSubgraphScore(int n, int[][] edges, int[] good) 
    {
        var adj = new List<int>[n];
        for (int i = 0; i < n; i++) adj[i] = new List<int>();
        foreach (var e in edges)
        {
            adj[e[0]].Add(e[1]);
            adj[e[1]].Add(e[0]);
        }

        var parent = new int[n];
        var order = new int[n];
        Array.Fill(parent, -1);
        int head = 0, tail = 0;
        order[tail++] = 0;
        var visited = new bool[n];
        visited[0] = true;
        while (head < tail)
        {
            int u = order[head++];
            foreach (int v in adj[u])
            {
                if (!visited[v])
                {
                    visited[v] = true;
                    parent[v] = u;
                    order[tail++] = v;
                }
            }
        }

        var value = new int[n];
        for (int i = 0; i < n; i++) value[i] = good[i] == 1 ? 1 : -1;

        var down = new int[n];
        var S = new int[n];
        for (int idx = n - 1; idx >= 0; idx--)
        {
            int u = order[idx];
            down[u] = value[u] + S[u];
            if (parent[u] != -1) S[parent[u]] += Math.Max(0, down[u]);
        }

        var up = new int[n];
        up[0] = 0;
        for (int idx = 0; idx < n; idx++)
        {
            int u = order[idx];
            foreach (int c in adj[u])
            {
                if (c == parent[u]) continue;
                up[c] = value[u] + Math.Max(0, up[u]) + (S[u] - Math.Max(0, down[c]));
            }
        }

        var ans = new int[n];
        for (int i = 0; i < n; i++) ans[i] = down[i] + Math.Max(0, up[i]);
        return ans;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
