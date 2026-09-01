# 3650. Minimum Cost Path with Edge Reversals

**Difficulty:** Medium
**Category:** Graph, Shortest Path, Heap

## Problem

Given `n` nodes and a list of directed weighted `edges`, you may traverse an edge in its given direction at its listed cost, or traverse it in reverse at twice its cost. Return the minimum cost to travel from node `0` to node `n-1`, or `-1` if impossible.

### Example

Edge `[0,1,5]` allows going `0→1` for cost 5, or `1→0` for cost 10.

## Approach

Build a graph where each edge contributes a forward edge at its original weight and a reverse edge at double the weight, then run Dijkstra's algorithm from node 0 to node `n-1`.

## C# Solution

```csharp
public class Solution 
{
    public int MinCost(int n, int[][] edges) 
    {
        var adj = new List<(int to, long cost)>[n];
        for (int i = 0; i < n; i++) adj[i] = new List<(int, long)>();

        foreach (var e in edges) 
        {
            int u = e[0], v = e[1], w = e[2];
            adj[u].Add((v, w));
            adj[v].Add((u, 2L * w));
        }

        var dist = new long[n];
        Array.Fill(dist, long.MaxValue);
        dist[0] = 0;

        var pq = new PriorityQueue<int, long>();
        pq.Enqueue(0, 0);

        while (pq.Count > 0) 
        {
            pq.TryDequeue(out int u, out long d);
            if (d > dist[u]) continue;
            foreach (var (v, w) in adj[u]) 
            {
                long nd = d + w;
                if (nd < dist[v]) 
                {
                    dist[v] = nd;
                    pq.Enqueue(v, nd);
                }
            }
        }

        return dist[n - 1] == long.MaxValue ? -1 : (int)dist[n - 1];
    }
}
```

## Complexity

- **Time:** O((n + e) log n)
- **Space:** O(n + e)
