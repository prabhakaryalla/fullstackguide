# 2608. Shortest Cycle in a Graph

**Difficulty:** Hard
**Category:** Graph, Breadth-First Search

## Problem

There is a bi-directional graph with `n` vertices, where each vertex is labeled from 0 to `n - 1`. The edges in the graph are represented by a 2D integer array `edges`, where each `edges[i] = [ui, vi]` denotes an edge between vertex `ui` and vertex `vi`. Every vertex pair is connected by at most one edge, and no vertex has an edge to itself.

Return the length of the shortest cycle in the graph. If no cycle exists, return -1.

### Example

```
Input: n = 7, edges = [[0,1],[1,2],[2,0],[3,4],[4,5],[5,6],[6,3]]
Output: 3
Explanation: 
Cycle 0->1->2->0 has length 3
Cycle 3->4->5->6->3 has length 4
Shortest is 3
```

## Approach

For each node, run a BFS to find the shortest path back to itself. During BFS, track the parent to avoid going back immediately. If we encounter an already-visited node that isn't the parent, we've found a cycle. The cycle length is the sum of distances from the start to both nodes plus 1.

## C# Solution

```csharp
public class Solution
{
    public int FindShortestCycle(int n, int[][] edges)
    {
        var graph = new List<int>[n];
        for (int i = 0; i < n; i++)
        {
            graph[i] = new List<int>();
        }
        
        foreach (var edge in edges)
        {
            graph[edge[0]].Add(edge[1]);
            graph[edge[1]].Add(edge[0]);
        }
        
        int minCycle = int.MaxValue;
        
        for (int start = 0; start < n; start++)
        {
            var dist = new int[n];
            var parent = new int[n];
            Array.Fill(dist, -1);
            Array.Fill(parent, -1);
            
            var queue = new Queue<int>();
            queue.Enqueue(start);
            dist[start] = 0;
            
            while (queue.Count > 0)
            {
                int node = queue.Dequeue();
                
                foreach (int neighbor in graph[node])
                {
                    if (dist[neighbor] == -1)
                    {
                        dist[neighbor] = dist[node] + 1;
                        parent[neighbor] = node;
                        queue.Enqueue(neighbor);
                    }
                    else if (parent[node] != neighbor)
                    {
                        int cycleLen = dist[node] + dist[neighbor] + 1;
                        minCycle = Math.Min(minCycle, cycleLen);
                    }
                }
            }
        }
        
        return minCycle == int.MaxValue ? -1 : minCycle;
    }
}
```

## Complexity

- **Time:** O(n * (n + m)) where m is the number of edges
- **Space:** O(n + m)
