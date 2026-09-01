# 2858. Minimum Edge Reversals So Every Node Is Reachable

**Difficulty:** Hard
**Category:** Depth-First Search, Breadth-First Search, Graph

## Problem

You are given a directed graph of `n` nodes (0-indexed) that forms a tree if the edge directions are ignored, described by `edges` where `edges[i] = [u, v]` means a directed edge from `u` to `v`. For every node `i`, compute the minimum number of edges that must be reversed so that every other node is reachable from `i`. Return an array `answer` of length `n` with these values.

### Example

Input: n = 4, edges = [[2,0],[2,1],[1,3]]
Output: [3,1,0,2]
Explanation: From node 2, both outgoing edges already point away from it (to 0 and 1), and reaching node 3 requires the edge [1,3] which already points the right way, so answer[2] = 0. Reaching everything from node 0 requires reversing all 3 edges, giving answer[0] = 3.

## Approach

Build an undirected adjacency structure where each original edge `u -> v` is stored twice: as `(v, cost 0)` from `u` (traversing in the original direction) and as `(u, cost 1)` from `v` (traversing against the original direction, requiring one reversal). First, run a BFS from node 0, summing the edge costs used to reach every node — this total is exactly `answer[0]`, the number of reversals needed to reach every node from the root. Then use a rerooting technique: process nodes in the same BFS order, and for each node `v` with parent `u` and the edge cost `c` used to go from `u` to `v`, compute `answer[v] = answer[u] - c + (1 - c)`, since moving the "source" from `u` to `v` flips the direction requirement on that single edge while all other edges' contributions stay the same.

## C# Solution

```csharp
public class Solution 
{
    public int[] MinEdgeReversals(int n, int[][] edges) 
    {
        var adj = new List<(int to, int cost)>[n];
        for (int i = 0; i < n; i++) adj[i] = new List<(int, int)>();

        foreach (var e in edges) 
        {
            int u = e[0], v = e[1];
            adj[u].Add((v, 0));
            adj[v].Add((u, 1));
        }

        var score = new int[n];
        var visited = new bool[n];
        var parent = new int[n];
        var parentCost = new int[n];
        var order = new List<int>();

        var queue = new Queue<int>();
        queue.Enqueue(0);
        visited[0] = true;

        while (queue.Count > 0) 
        {
            int u = queue.Dequeue();
            order.Add(u);
            foreach (var (v, cost) in adj[u]) 
            {
                if (visited[v]) continue;
                visited[v] = true;
                parent[v] = u;
                parentCost[v] = cost;
                score[0] += cost;
                queue.Enqueue(v);
            }
        }

        foreach (int v in order) 
        {
            if (v == 0) continue;
            int u = parent[v];
            int cost = parentCost[v];
            score[v] = score[u] - cost + (1 - cost);
        }

        return score;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
