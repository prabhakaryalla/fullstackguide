# 2737. Find the Closest Marked Node

**Difficulty:** Medium
**Category:** Graph, Shortest Path, Heap (Priority Queue)
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

You are given a positive integer `n`, the number of nodes (0-indexed) of a directed weighted graph, and a 2D array `edges` where `edges[i] = [ui, vi, wi]` means there is a directed edge from `ui` to `vi` with a positive weight `wi`. You are also given a starting node `s` and an array `marked` of nodes. Find the minimum distance from `s` to any node in `marked`. If none of the marked nodes are reachable from `s`, return `-1`.

### Example

Input: n = 4, edges = [[0,1,1],[1,2,3],[2,3,2],[0,3,4]], s = 0, marked = [2,3]
Output: 4
Explanation: The distance from 0 to 2 is 4 (0→1→2), and the distance from 0 to 3 is 4 (direct edge). The minimum among the marked nodes is 4.

## Approach

Run Dijkstra's algorithm from `s` over the directed weighted graph to compute the shortest distance to every node. Then take the minimum distance among all nodes in `marked`. If every marked node has an infinite (unreachable) distance, return `-1`.

## C# Solution

```csharp
public class Solution 
{
    public int ClosestMarkedNode(int n, int[][] edges, int s, int[] marked) 
    {
        var graph = new List<(int to, int w)>[n];
        for (int i = 0; i < n; i++) graph[i] = new List<(int, int)>();
        foreach (var e in edges) graph[e[0]].Add((e[1], e[2]));

        var dist = new long[n];
        Array.Fill(dist, long.MaxValue);
        dist[s] = 0;

        var pq = new PriorityQueue<int, long>();
        pq.Enqueue(s, 0);

        while (pq.Count > 0) 
        {
            pq.TryDequeue(out int u, out long d);
            if (d > dist[u]) continue;
            foreach (var (v, w) in graph[u]) 
            {
                long nd = d + w;
                if (nd < dist[v]) 
                {
                    dist[v] = nd;
                    pq.Enqueue(v, nd);
                }
            }
        }

        long best = long.MaxValue;
        foreach (int m in marked) best = Math.Min(best, dist[m]);
        return best == long.MaxValue ? -1 : (int)best;
    }
}
```

## Complexity

- **Time:** O((n + m) log n) where m = edges.Length
- **Space:** O(n + m)
