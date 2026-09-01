# 3123. Find Edges in Shortest Paths

**Difficulty:** Hard
**Category:** Array, Graph, Shortest Path, Heap (Priority Queue)

## Problem

You are given an undirected weighted graph with `n` nodes described by `edges` (`edges[i] = [u, v, w]`). Return a boolean array where entry `i` is `true` if `edges[i]` lies on **at least one** shortest path between node `0` and node `n - 1`.

## Approach

Run Dijkstra's algorithm twice: once from node `0` (giving `from0[x]` = shortest distance from `0` to every node `x`), and once from node `n - 1` (giving `from1[x]`). An edge `(u, v, w)` lies on some shortest `0`-to-`(n-1)` path exactly when traversing it fits perfectly into the shortest distance budget in either direction: `from0[u] + w + from1[v] == from0[n-1]` (using the edge from `u` to `v`) or `from0[v] + w + from1[u] == from0[n-1]` (using it from `v` to `u`).

## C# Solution

```csharp
public class Solution {
    private const int Max = 1_000_000_000;

    public bool[] FindAnswer(int n, int[][] edges) {
        var graph = new List<(int to, int w)>[n];
        for (int i = 0; i < n; i++)
            graph[i] = new List<(int, int)>();
        foreach (var edge in edges) {
            graph[edge[0]].Add((edge[1], edge[2]));
            graph[edge[1]].Add((edge[0], edge[2]));
        }

        int[] from0 = Dijkstra(graph, 0);
        int[] from1 = Dijkstra(graph, n - 1);

        bool[] ans = new bool[edges.Length];
        for (int i = 0; i < edges.Length; i++) {
            int u = edges[i][0], v = edges[i][1], w = edges[i][2];
            ans[i] = from0[u] + w + from1[v] == from0[n - 1] ||
                     from0[v] + w + from1[u] == from0[n - 1];
        }

        return ans;
    }

    private int[] Dijkstra(List<(int to, int w)>[] graph, int src) {
        int n = graph.Length;
        int[] dist = new int[n];
        Array.Fill(dist, Max);
        dist[src] = 0;

        var minHeap = new PriorityQueue<int, int>();
        minHeap.Enqueue(src, 0);

        while (minHeap.Count > 0) {
            minHeap.TryDequeue(out int u, out int d);
            if (d > dist[u])
                continue;
            foreach (var (v, w) in graph[u]) {
                if (d + w < dist[v]) {
                    dist[v] = d + w;
                    minHeap.Enqueue(v, dist[v]);
                }
            }
        }

        return dist;
    }
}
```

## Complexity

- Time: O((V + E) log V) — two Dijkstra runs.
- Space: O(V + E) — the adjacency list and distance arrays.
