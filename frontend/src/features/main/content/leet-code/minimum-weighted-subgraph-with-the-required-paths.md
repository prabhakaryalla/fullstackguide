# 2203. Minimum Weighted Subgraph With the Required Paths

**Difficulty:** Hard
**Category:** Graph, Shortest Path

## Problem

You are given an integer `n` denoting the number of nodes in a weighted directed graph. Nodes are numbered from `0` to `n - 1`. You are also given a 2D integer array `edges` where `edges[i] = [fromi, toi, weighti]` denotes a directed edge from node `fromi` to node `toi` with weight `weighti`.

Lastly, you are given three distinct integers `src1`, `src2`, and `dest`.

Return the minimum weight of a subgraph that contains paths from `src1` to `dest` and from `src2` to `dest`. If no such subgraph exists, return -1.

A subgraph is a graph whose vertices and edges are subsets of the original graph. The weight of a subgraph is the sum of weights of its edges.

### Example

```
Input: n = 6, edges = [[0,2,2],[0,5,6],[1,0,3],[1,4,5],[2,1,1],[2,3,3],[2,3,4],[3,4,2],[4,5,1]], src1 = 0, src2 = 1, dest = 5
Output: 9
Explanation: One optimal path uses edges 0->2 (weight 2), 2->3 (weight 3), 3->4 (weight 2), 4->5 (weight 1) and 1->0 (weight 3).
Total weight = 2 + 3 + 2 + 1 + 3 = 11, but paths share some edges.
```

## Approach

The key insight is that the optimal subgraph will have paths from src1 and src2 that merge at some intermediate node and then share the path to dest.

Algorithm:
1. Run Dijkstra from src1 to get shortest distances to all nodes
2. Run Dijkstra from src2 to get shortest distances to all nodes
3. Run Dijkstra on the reversed graph from dest to get shortest distances from all nodes to dest
4. For each node i, calculate: dist[src1][i] + dist[src2][i] + distReverse[i][dest]
5. Return the minimum sum

## C# Solution

```csharp
public class Solution
{
    public long MinimumWeight(int n, int[][] edges, int src1, int src2, int dest)
    {
        List<(int, long)>[] graph = new List<(int, long)>[n];
        List<(int, long)>[] reverseGraph = new List<(int, long)>[n];
        
        for (int i = 0; i < n; i++)
        {
            graph[i] = new List<(int, long)>();
            reverseGraph[i] = new List<(int, long)>();
        }
        
        foreach (var edge in edges)
        {
            graph[edge[0]].Add((edge[1], edge[2]));
            reverseGraph[edge[1]].Add((edge[0], edge[2]));
        }
        
        long[] distFrom1 = Dijkstra(graph, n, src1);
        long[] distFrom2 = Dijkstra(graph, n, src2);
        long[] distToDest = Dijkstra(reverseGraph, n, dest);
        
        long result = long.MaxValue;
        
        for (int i = 0; i < n; i++)
        {
            if (distFrom1[i] != long.MaxValue && distFrom2[i] != long.MaxValue && distToDest[i] != long.MaxValue)
            {
                result = Math.Min(result, distFrom1[i] + distFrom2[i] + distToDest[i]);
            }
        }
        
        return result == long.MaxValue ? -1 : result;
    }
    
    private long[] Dijkstra(List<(int, long)>[] graph, int n, int start)
    {
        long[] dist = new long[n];
        Array.Fill(dist, long.MaxValue);
        dist[start] = 0;
        
        PriorityQueue<(long dist, int node), long> pq = new PriorityQueue<(long, int), long>();
        pq.Enqueue((0, start), 0);
        
        while (pq.Count > 0)
        {
            var (d, u) = pq.Dequeue();
            
            if (d > dist[u]) continue;
            
            foreach (var (v, w) in graph[u])
            {
                if (dist[u] + w < dist[v])
                {
                    dist[v] = dist[u] + w;
                    pq.Enqueue((dist[v], v), dist[v]);
                }
            }
        }
        
        return dist;
    }
}
```

## Complexity

- **Time:** O((V + E) * log V), for three Dijkstra runs
- **Space:** O(V + E), for graphs and distance arrays
