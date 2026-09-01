# 1514. Path with Maximum Probability

**Difficulty:** Medium
**Category:** Array, Graph, Shortest Path, Heap (Priority Queue)

## Problem

Given an undirected weighted graph of `n` nodes with edges `edges[i] = [a, b]` and success probabilities `succProb[i]` for each edge, find the path from node `start` to node `end` with the maximum probability of success, and return that probability. Return `0` if no path exists.

### Example

```
Input: n = 3, edges = [[0,1],[1,2],[0,2]], succProb = [0.5,0.5,0.2], start = 0, end = 2
Output: 0.25
```

## Approach

This is a variant of Dijkstra's algorithm, maximizing the product of probabilities instead of minimizing a sum. Use a max-priority queue keyed by the best probability found so far to reach each node, relaxing neighbors by multiplying edge probabilities.

## C# Solution

```csharp
public class Solution
{
    public double MaxProbability(int n, int[][] edges, double[] succProb, int start, int end)
    {
        var graph = new List<(int To, double Prob)>[n];
        for (int i = 0; i < n; i++)
        {
            graph[i] = new List<(int, double)>();
        }

        for (int i = 0; i < edges.Length; i++)
        {
            int a = edges[i][0];
            int b = edges[i][1];
            graph[a].Add((b, succProb[i]));
            graph[b].Add((a, succProb[i]));
        }

        double[] best = new double[n];
        best[start] = 1.0;

        var queue = new PriorityQueue<int, double>();
        queue.Enqueue(start, -1.0);

        while (queue.Count > 0)
        {
            int node = queue.Dequeue();

            foreach ((int to, double prob) in graph[node])
            {
                double candidate = best[node] * prob;
                if (candidate > best[to])
                {
                    best[to] = candidate;
                    queue.Enqueue(to, -candidate);
                }
            }
        }

        return best[end];
    }
}
```

## Complexity

- **Time:** `O(E log V)` — Dijkstra-style relaxation using a priority queue.
- **Space:** `O(V + E)` for the adjacency list and probability array.
