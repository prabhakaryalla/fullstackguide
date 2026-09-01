# 2473. Minimum Cost to Buy Apples

**Difficulty:** Medium
**Category:** Array, Graph, Shortest Path
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

You are given a positive integer `n` representing cities numbered 1 to n, an array `roads` where `roads[i] = [a_i, b_i, cost_i]` represents a bidirectional road, an array `appleCost` where `appleCost[i]` is the cost to buy an apple at city `i`, and an integer `k`.

You can buy apples from any city and bring them to your starting city. The cost is the apple cost plus `k` times the distance traveled. Return an array where the ith element is the minimum cost to buy an apple starting from city `i`.

### Example

```
Input: n = 4, roads = [[1,2,4],[2,3,2],[2,4,5],[3,4,1],[1,3,4]], appleCost = [56,42,50,48], k = 2
Output: [54,42,48,51]
Explanation: For city 1, we can travel to city 2 (distance 4), buy apple (cost 42), total = 42 + 2*4 = 50, but buying locally costs 56, so minimum is 50.
```

## Approach

For each starting city, run Dijkstra's algorithm to find the shortest path to all other cities. For each destination, calculate `appleCost[dest] + k * distance` and take the minimum across all destinations (including staying at the starting city).

## C# Solution

```csharp
public class Solution
{
    public long[] MinCost(int n, int[][] roads, int[] appleCost, int k)
    {
        var graph = new List<(int, long)>[n + 1];
        for (int i = 0; i <= n; i++) graph[i] = new List<(int, long)>();
        
        foreach (var road in roads)
        {
            graph[road[0]].Add((road[1], road[2]));
            graph[road[1]].Add((road[0], road[2]));
        }
        
        long[] result = new long[n];
        
        for (int start = 1; start <= n; start++)
        {
            long[] dist = Dijkstra(start, graph, n);
            long minCost = appleCost[start - 1];
            
            for (int dest = 1; dest <= n; dest++)
            {
                if (dist[dest] < long.MaxValue)
                {
                    long cost = appleCost[dest - 1] + k * dist[dest];
                    minCost = Math.Min(minCost, cost);
                }
            }
            
            result[start - 1] = minCost;
        }
        
        return result;
    }
    
    private long[] Dijkstra(int start, List<(int, long)>[] graph, int n)
    {
        var dist = new long[n + 1];
        Array.Fill(dist, long.MaxValue);
        dist[start] = 0;
        
        var pq = new PriorityQueue<int, long>();
        pq.Enqueue(start, 0);
        
        while (pq.Count > 0)
        {
            int u = pq.Dequeue();
            
            foreach (var (v, w) in graph[u])
            {
                if (dist[u] + w < dist[v])
                {
                    dist[v] = dist[u] + w;
                    pq.Enqueue(v, dist[v]);
                }
            }
        }
        
        return dist;
    }
}
```

## Complexity

- **Time:** O(n * (E log V)) where E is edges and V is vertices
- **Space:** O(V + E) for the graph
