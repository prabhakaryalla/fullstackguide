# 2642. Design Graph With Shortest Path Calculator

**Difficulty:** Hard
**Category:** Graph, Design, Shortest Path

## Problem

Design a graph class that supports adding edges and computing shortest paths.

Implement the `Graph` class:
- `Graph(int n, int[][] edges)`: Initializes the graph with `n` nodes and given edges
- `void addEdge(int[] edge)`: Adds an edge to the graph
- `int shortestPath(int node1, int node2)`: Returns the minimum cost of a path from `node1` to `node2`. If no path exists, return -1.

### Example

```
Input: ["Graph", "shortestPath", "shortestPath", "addEdge", "shortestPath"]
[[4, [[0,2,5],[0,1,2],[1,2,1],[3,0,3]]], [3,2], [0,3], [[1,3,4]], [0,3]]
Output: [null, 6, -1, null, 6]
```

## Approach

Store the graph as an adjacency list. Use Dijkstra's algorithm to find the shortest path between two nodes. When edges are added, simply append them to the adjacency list.

## C# Solution

```csharp
public class Graph
{
    private List<(int, int)>[] graph;
    private int n;
    
    public Graph(int n, int[][] edges)
    {
        this.n = n;
        graph = new List<(int, int)>[n];
        
        for (int i = 0; i < n; i++)
            graph[i] = new List<(int, int)>();
        
        foreach (var edge in edges)
            AddEdge(edge);
    }
    
    public void AddEdge(int[] edge)
    {
        graph[edge[0]].Add((edge[1], edge[2]));
    }
    
    public int ShortestPath(int node1, int node2)
    {
        var pq = new PriorityQueue<(int, int), int>();
        var dist = new int[n];
        Array.Fill(dist, int.MaxValue);
        
        pq.Enqueue((node1, 0), 0);
        dist[node1] = 0;
        
        while (pq.Count > 0)
        {
            var (node, cost) = pq.Dequeue();
            
            if (node == node2)
                return cost;
            
            if (cost > dist[node])
                continue;
            
            foreach (var (neighbor, edgeCost) in graph[node])
            {
                int newCost = cost + edgeCost;
                if (newCost < dist[neighbor])
                {
                    dist[neighbor] = newCost;
                    pq.Enqueue((neighbor, newCost), newCost);
                }
            }
        }
        
        return -1;
    }
}
```

## Complexity

- **AddEdge - Time:** O(1)
- **ShortestPath - Time:** O((V + E) log V) using Dijkstra's algorithm
- **Space:** O(V + E) for the graph
