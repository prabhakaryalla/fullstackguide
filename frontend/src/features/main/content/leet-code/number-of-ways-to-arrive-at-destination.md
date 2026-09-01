# 1976. Number of Ways to Arrive at Destination

**Difficulty:** Medium
**Category:** Graph, Topological Sort, Dynamic Programming, Shortest Path

## Problem

Given `n` intersections connected by bidirectional roads `roads[i] = [ui, vi, timei]`, return the number of distinct shortest-time paths from intersection `0` to intersection `n-1`, modulo `10^9 + 7`.

### Example

```
Input: n = 7, roads = [[0,6,7],[0,1,2],[1,2,3],[1,3,3],[6,3,3],[3,5,1],[6,5,1],[2,5,1],[0,4,5],[4,6,2]]
Output: 4
Explanation: There are 4 different shortest paths from 0 to 6, each of total time 7.
```

### Constraints

- `1 <= n <= 200`
- `n - 1 <= roads.length <= n * (n - 1) / 2`
- `roads[i].length == 3`
- `0 <= ui, vi <= n - 1`
- `1 <= timei <= 10^9`

## Approach

Run Dijkstra's algorithm from node `0` to compute `dist[i]`, the shortest time to reach every node, and simultaneously `ways[i]`, the number of shortest paths to node `i` modulo `10^9 + 7`. When relaxing an edge `(u, v, w)`: if `dist[u] + w < dist[v]`, update `dist[v]` and set `ways[v] = ways[u]`; if `dist[u] + w == dist[v]`, add `ways[u]` to `ways[v]` (another shortest path of equal length found). The answer is `ways[n-1]`.

## C# Solution

```csharp
public class Solution
{
    private const int Mod = 1_000_000_007;

    public int CountPaths(int n, int[][] roads)
    {
        var adj = new List<(int to, long weight)>[n];
        for (int i = 0; i < n; i++) adj[i] = new List<(int, long)>();
        foreach (var r in roads)
        {
            adj[r[0]].Add((r[1], r[2]));
            adj[r[1]].Add((r[0], r[2]));
        }

        long[] dist = new long[n];
        Array.Fill(dist, long.MaxValue);
        long[] ways = new long[n];
        dist[0] = 0;
        ways[0] = 1;

        var pq = new PriorityQueue<int, long>();
        pq.Enqueue(0, 0);
        var visited = new bool[n];

        while (pq.Count > 0)
        {
            int u = pq.Dequeue();
            if (visited[u]) continue;
            visited[u] = true;

            foreach (var (v, w) in adj[u])
            {
                long newDist = dist[u] + w;
                if (newDist < dist[v])
                {
                    dist[v] = newDist;
                    ways[v] = ways[u];
                    pq.Enqueue(v, newDist);
                }
                else if (newDist == dist[v])
                {
                    ways[v] = (ways[v] + ways[u]) % Mod;
                }
            }
        }

        return (int)(ways[n - 1] % Mod);
    }
}
```

## Complexity

- **Time:** `O(E log V)` — standard Dijkstra using a priority queue.
- **Space:** `O(V + E)` for the adjacency list and distance/ways arrays.
