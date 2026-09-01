# 882. Reachable Nodes In Subdivided Graph

**Difficulty:** Hard
**Category:** Graph, Heap, Dijkstra's Algorithm

## Problem

Given an undirected graph where each edge `[u, v, cnt]` is subdivided into `cnt` intermediate nodes, and a budget of `maxMoves` steps starting from node `0`, return the number of distinct nodes (original and subdivided) reachable within that budget.

### Example

```
Input: edges = [[0,1,10],[0,2,1],[1,2,2]], maxMoves = 6, n = 3
Output: 13
```

## Approach

Run Dijkstra's algorithm on the original nodes only, treating each edge's weight as `cnt + 1` (its length after subdivision). Count how many original nodes have a shortest distance within `maxMoves`. Then, for each edge, determine how many of its subdivided intermediate nodes are reachable from either endpoint: from each endpoint, at most `maxMoves - distance` steps can be spent walking into the edge's subdivided nodes, so sum the reachable counts from both ends (capped at the edge's total subdivided node count, since reaching from both ends can't exceed the edge's actual length).

## C# Solution

```csharp
public class Solution
{
    public int ReachableNodes(int[][] edges, int maxMoves, int n)
    {
        var graph = new Dictionary<int, Dictionary<int, int>>();
        for (int i = 0; i < n; i++) graph[i] = new Dictionary<int, int>();

        foreach (var edge in edges)
        {
            graph[edge[0]][edge[1]] = edge[2];
            graph[edge[1]][edge[0]] = edge[2];
        }

        var dist = new int[n];
        Array.Fill(dist, int.MaxValue);
        dist[0] = 0;

        var heap = new PriorityQueue<int, int>();
        heap.Enqueue(0, 0);

        var visited = new bool[n];

        while (heap.Count > 0)
        {
            heap.TryDequeue(out var node, out var d);
            if (visited[node]) continue;
            visited[node] = true;

            foreach (var (neighbor, weight) in graph[node])
            {
                int newDist = d + weight + 1;
                if (newDist < dist[neighbor])
                {
                    dist[neighbor] = newDist;
                    heap.Enqueue(neighbor, newDist);
                }
            }
        }

        int reachableNodes = 0;
        foreach (var d in dist)
        {
            if (d <= maxMoves) reachableNodes++;
        }

        int usedOnEdges = 0;

        foreach (var edge in edges)
        {
            int u = edge[0], v = edge[1], weight = edge[2];

            int fromU = dist[u] <= maxMoves ? Math.Max(0, maxMoves - dist[u]) : 0;
            int fromV = dist[v] <= maxMoves ? Math.Max(0, maxMoves - dist[v]) : 0;

            usedOnEdges += Math.Min(weight, fromU + fromV);
        }

        return reachableNodes + usedOnEdges;
    }
}
```

## Complexity

- **Time:** `O(E log V)`.
- **Space:** `O(V + E)` for the graph and distances.
