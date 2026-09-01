# 1786. Number of Restricted Paths From First to Last Node

**Difficulty:** Medium
**Category:** Graph, Dynamic Programming, Shortest Path, Heap

## Problem

Given a weighted undirected graph with `n` nodes and `edges`, a path from node `1` to node `n` is "restricted" if the distance from every intermediate node to node `n` strictly decreases along the path. Return the number of restricted paths from node `1` to node `n`, modulo `10^9 + 7`.

### Example

```
Input: n = 5, edges = [[1,2,3],[1,3,3],[2,3,1],[1,4,2],[5,2,2],[3,5,1],[5,4,10]]
Output: 3
```

## Approach

Run Dijkstra's algorithm from node `n` to get the shortest distance of every node to `n`. Then compute, with memoized DFS starting at node `1`, the number of ways to reach node `n` by only moving to neighbors with a strictly smaller distance-to-`n` — this guarantees the "restricted" property and also guarantees no cycles, so plain memoization suffices.

## C# Solution

```csharp
public class Solution
{
    private const long Mod = 1_000_000_007;

    public int CountRestrictedPaths(int n, int[][] edges)
    {
        var adj = new List<(int to, int w)>[n + 1];
        for (int i = 1; i <= n; i++) adj[i] = new List<(int, int)>();
        foreach (var e in edges)
        {
            adj[e[0]].Add((e[1], e[2]));
            adj[e[1]].Add((e[0], e[2]));
        }

        long[] dist = new long[n + 1];
        Array.Fill(dist, long.MaxValue);
        dist[n] = 0;

        var pq = new PriorityQueue<int, long>();
        pq.Enqueue(n, 0);
        bool[] visited = new bool[n + 1];

        while (pq.Count > 0)
        {
            int u = pq.Dequeue();
            if (visited[u]) continue;
            visited[u] = true;

            foreach (var (v, w) in adj[u])
            {
                if (dist[u] + w < dist[v])
                {
                    dist[v] = dist[u] + w;
                    pq.Enqueue(v, dist[v]);
                }
            }
        }

        long[] memo = new long[n + 1];
        Array.Fill(memo, -1);
        memo[n] = 1;

        long Dfs(int u)
        {
            if (memo[u] != -1) return memo[u];

            long ways = 0;
            foreach (var (v, w) in adj[u])
                if (dist[v] < dist[u]) ways = (ways + Dfs(v)) % Mod;

            memo[u] = ways;
            return ways;
        }

        return (int)Dfs(1);
    }
}
```

## Complexity

- **Time:** `O(E log V)` for Dijkstra plus `O(V + E)` for the memoized DFS.
- **Space:** `O(V + E)`.
