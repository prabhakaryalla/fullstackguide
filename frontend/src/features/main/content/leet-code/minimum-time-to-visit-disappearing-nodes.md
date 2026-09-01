# 3112. Minimum Time to Visit Disappearing Nodes

**Difficulty:** Medium
**Category:** Array, Graph, Shortest Path, Heap (Priority Queue)

## Problem

You are given an undirected weighted graph with `n` nodes described by `edges` (`edges[i] = [u, v, length]`), and an array `disappear`, where node `i` becomes permanently inaccessible starting at time `disappear[i]`. Starting from node `0` at time `0`, return an array where entry `i` is the minimum time to first reach node `i` before it disappears, or `-1` if it's unreachable in time.

## Approach

This is Dijkstra's algorithm with an extra relaxation constraint: when considering an edge from `u` to `v`, the candidate arrival time `dist[u] + weight` is only valid if it's strictly less than `disappear[v]` (arriving exactly at or after the disappearance time doesn't count). Otherwise, the algorithm proceeds exactly like standard Dijkstra with a min-heap keyed by arrival time.

## C# Solution

```csharp
public class Solution {
    public int[] MinimumTime(int n, int[][] edges, int[] disappear) {
        var graph = new List<(int to, int w)>[n];
        for (int i = 0; i < n; i++)
            graph[i] = new List<(int, int)>();

        foreach (var edge in edges) {
            graph[edge[0]].Add((edge[1], edge[2]));
            graph[edge[1]].Add((edge[0], edge[2]));
        }

        return Dijkstra(graph, 0, disappear);
    }

    private int[] Dijkstra(List<(int to, int w)>[] graph, int src, int[] disappear) {
        int n = graph.Length;
        int[] dist = new int[n];
        Array.Fill(dist, int.MaxValue);
        dist[src] = 0;

        var minHeap = new PriorityQueue<int, int>();
        minHeap.Enqueue(src, 0);

        while (minHeap.Count > 0) {
            minHeap.TryDequeue(out int u, out int d);
            if (d > dist[u])
                continue;
            foreach (var (v, w) in graph[u]) {
                if (d + w < disappear[v] && d + w < dist[v]) {
                    dist[v] = d + w;
                    minHeap.Enqueue(v, dist[v]);
                }
            }
        }

        for (int i = 0; i < n; i++)
            if (dist[i] == int.MaxValue)
                dist[i] = -1;

        return dist;
    }
}
```

## Complexity

- Time: O((V + E) log V) — standard Dijkstra complexity with a binary heap.
- Space: O(V + E) — the adjacency list and distance array.
