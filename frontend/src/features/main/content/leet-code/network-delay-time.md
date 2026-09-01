# 743. Network Delay Time

**Difficulty:** Medium
**Category:** Depth-First Search, Breadth-First Search, Graph, Heap, Shortest Path

## Problem

Given a network of `n` nodes and a list of directed weighted edges `times = [[u, v, w]]`, return the minimum time it takes for a signal sent from node `k` to reach every node, or `-1` if some node is unreachable.

### Example

```
Input: times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2
Output: 2
```

## Approach

This is a single-source shortest path problem on a weighted directed graph, solved with Dijkstra's algorithm. Build an adjacency list, initialize all distances to infinity except the source (`k`, distance `0`), and use a min-heap to always process the closest known unvisited node next, relaxing distances to its neighbors. The answer is the maximum distance across all nodes once the algorithm completes (or `-1` if any node remains unreachable).

## C# Solution

```csharp
public class Solution
{
    public int NetworkDelayTime(int[][] times, int n, int k)
    {
        var graph = new List<(int Node, int Weight)>[n + 1];
        for (int i = 0; i <= n; i++)
            graph[i] = new List<(int, int)>();

        foreach (var time in times)
            graph[time[0]].Add((time[1], time[2]));

        var distances = new int[n + 1];
        Array.Fill(distances, int.MaxValue);
        distances[k] = 0;

        var heap = new PriorityQueue<int, int>();
        heap.Enqueue(k, 0);

        while (heap.Count > 0)
        {
            heap.TryDequeue(out var node, out var dist);
            if (dist > distances[node]) continue;

            foreach (var (neighbor, weight) in graph[node])
            {
                int newDist = dist + weight;
                if (newDist < distances[neighbor])
                {
                    distances[neighbor] = newDist;
                    heap.Enqueue(neighbor, newDist);
                }
            }
        }

        int maxDist = 0;
        for (int i = 1; i <= n; i++)
        {
            if (distances[i] == int.MaxValue) return -1;
            maxDist = Math.Max(maxDist, distances[i]);
        }

        return maxDist;
    }
}
```

## Complexity

- **Time:** `O((V + E) log V)`.
- **Space:** `O(V + E)` for the graph and heap.
