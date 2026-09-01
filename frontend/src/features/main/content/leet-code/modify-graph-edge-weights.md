# 2699. Modify Graph Edge Weights

**Difficulty:** Hard
**Category:** Graph, Shortest Path, Heap (Priority Queue)

## Problem

You are given an undirected weighted connected graph containing `n` nodes labeled from `0` to `n - 1`, and an integer array `edges` where `edges[i] = [a_i, b_i, w_i]` indicates an edge between nodes `a_i` and `b_i` with weight `w_i`.

Some edges have a weight of `-1` which means the weight is unknown. You need to assign positive integer weights to these edges such that the shortest distance between nodes `source` and `destination` becomes equal to `target`.

Return the modified graph with all edge weights assigned. If there are multiple solutions, return any. If it is impossible, return an empty array.

### Example

```
Input: n = 5, edges = [[4,1,-1],[2,0,-1],[0,3,-1],[4,3,-1]], source = 0, destination = 1, target = 5
Output: [[4,1,1],[2,0,1],[0,3,3],[4,3,1]]
Explanation: Assign weights so the shortest path from 0 to 1 equals 5.

Input: n = 3, edges = [[0,1,-1],[0,2,5]], source = 0, destination = 2, target = 6
Output: []
Explanation: Cannot make shortest path equal to 6.
```

## Approach

First, compute shortest path using only known edges. If it's already less than target, return empty (impossible). Then iteratively assign weights to unknown edges and use Dijkstra's algorithm to ensure the shortest path equals target. Binary search or greedy assignment can optimize the weight selection.

## C# Solution

```csharp
public class Solution
{
    public int[][] ModifiedGraphEdges(int n, int[][] edges, int source, int destination, int target)
    {
        const int INF = 2000000000;
        
        var graph = new List<(int, int, int)>[n];
        for (int i = 0; i < n; i++)
        {
            graph[i] = new List<(int, int, int)>();
        }
        
        for (int i = 0; i < edges.Length; i++)
        {
            int u = edges[i][0], v = edges[i][1], w = edges[i][2];
            if (w != -1)
            {
                graph[u].Add((v, w, i));
                graph[v].Add((u, w, i));
            }
        }
        
        int dist = Dijkstra(graph, n, source, destination);
        if (dist < target)
        {
            return new int[0][];
        }
        
        if (dist == target)
        {
            for (int i = 0; i < edges.Length; i++)
            {
                if (edges[i][2] == -1)
                {
                    edges[i][2] = INF;
                }
            }
            return edges;
        }
        
        for (int i = 0; i < edges.Length; i++)
        {
            if (edges[i][2] == -1)
            {
                edges[i][2] = 1;
                int u = edges[i][0], v = edges[i][1];
                graph[u].Add((v, 1, i));
                graph[v].Add((u, 1, i));
                
                dist = Dijkstra(graph, n, source, destination);
                if (dist <= target)
                {
                    edges[i][2] += target - dist;
                    
                    for (int j = i + 1; j < edges.Length; j++)
                    {
                        if (edges[j][2] == -1)
                        {
                            edges[j][2] = INF;
                        }
                    }
                    return edges;
                }
            }
        }
        
        return new int[0][];
    }
    
    private int Dijkstra(List<(int, int, int)>[] graph, int n, int source, int destination)
    {
        var dist = new int[n];
        Array.Fill(dist, int.MaxValue);
        dist[source] = 0;
        
        var pq = new PriorityQueue<(int node, int d), int>();
        pq.Enqueue((source, 0), 0);
        
        while (pq.Count > 0)
        {
            var (u, d) = pq.Dequeue();
            
            if (d > dist[u]) continue;
            
            foreach (var (v, w, idx) in graph[u])
            {
                if (dist[u] + w < dist[v])
                {
                    dist[v] = dist[u] + w;
                    pq.Enqueue((v, dist[v]), dist[v]);
                }
            }
        }
        
        return dist[destination];
    }
}
```

## Complexity

- **Time:** O(E * (E + V) * log V) for repeated Dijkstra calls
- **Space:** O(V + E) for the graph representation
