# 3787. Find Diameter Endpoints of a Tree

**Difficulty:** Hard
**Category:** Tree, Graph, Depth-First Search, Breadth-First Search
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
You are given an undirected tree with `n` nodes numbered `0` to `n - 1`, described by an array of `n - 1` edges. The **diameter** of the tree is the length (number of edges) of the longest path between any two nodes. Return the two node labels `[u, v]` that form (one of) the longest such path — the two endpoints of a diameter of the tree. If multiple valid pairs exist, return any one of them.

## Approach
Use the classic two-pass BFS/DFS technique for tree diameters. First, run a BFS (or DFS) from an arbitrary starting node (e.g., node `0`) to find the farthest node `x` from it — this node is guaranteed to be one endpoint of some diameter of the tree (a well-known property of trees). Then run a second BFS/DFS starting from `x` to find the farthest node `y` from `x`; the pair `(x, y)` is guaranteed to be a diameter endpoint pair. Both BFS passes run in `O(n)` time using an adjacency list.

## C# Solution

```csharp
public class Solution 
{
    public int[] FindDiameterEndpoints(int n, int[][] edges)
    {
        var adj = new List<int>[n];
        for (int i = 0; i < n; i++) adj[i] = new List<int>();
        foreach (var e in edges)
        {
            adj[e[0]].Add(e[1]);
            adj[e[1]].Add(e[0]);
        }

        int x = Bfs(0, adj, n).farthestNode;
        var (y, _) = Bfs(x, adj, n);

        return new int[] { x, y };
    }

    private (int farthestNode, int maxDist) Bfs(int start, List<int>[] adj, int n)
    {
        int[] dist = new int[n];
        for (int i = 0; i < n; i++) dist[i] = -1;
        dist[start] = 0;

        var queue = new Queue<int>();
        queue.Enqueue(start);

        int farthestNode = start;
        int maxDist = 0;

        while (queue.Count > 0)
        {
            int node = queue.Dequeue();
            if (dist[node] > maxDist)
            {
                maxDist = dist[node];
                farthestNode = node;
            }

            foreach (int next in adj[node])
            {
                if (dist[next] == -1)
                {
                    dist[next] = dist[node] + 1;
                    queue.Enqueue(next);
                }
            }
        }

        return (farthestNode, maxDist);
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
