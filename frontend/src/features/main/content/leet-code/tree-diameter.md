# 1245. Tree Diameter

**Difficulty:** Medium
**Category:** Tree, Depth-First Search, Breadth-First Search, Graph
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given the `edges` of an unweighted, undirected tree with `n` nodes, return the diameter of the tree — the number of edges on the longest path between any two nodes.

### Example

```
Input: edges = [[0,1],[0,2]]
Output: 2
```

## Approach

Use the classic two-BFS trick for tree diameters: run a breadth-first search from any node to find the farthest node `u` from it. Then run a second BFS from `u` to find its farthest node `v`; the distance between `u` and `v` is guaranteed to be the tree's diameter, regardless of which node the first BFS started from.

## C# Solution

```csharp
public class Solution
{
    public int TreeDiameter(int[][] edges)
    {
        int n = edges.Length + 1;
        var adj = new List<int>[n];
        for (int i = 0; i < n; i++) adj[i] = new List<int>();

        foreach (var edge in edges)
        {
            adj[edge[0]].Add(edge[1]);
            adj[edge[1]].Add(edge[0]);
        }

        var (farthestNode, _) = Bfs(0, adj, n);
        var (_, diameter) = Bfs(farthestNode, adj, n);

        return diameter;
    }

    private (int Node, int Distance) Bfs(int start, List<int>[] adj, int n)
    {
        var dist = new int[n];
        Array.Fill(dist, -1);
        dist[start] = 0;

        var queue = new Queue<int>();
        queue.Enqueue(start);

        int farthestNode = start, maxDist = 0;

        while (queue.Count > 0)
        {
            int node = queue.Dequeue();
            foreach (int next in adj[node])
            {
                if (dist[next] == -1)
                {
                    dist[next] = dist[node] + 1;
                    if (dist[next] > maxDist)
                    {
                        maxDist = dist[next];
                        farthestNode = next;
                    }
                    queue.Enqueue(next);
                }
            }
        }

        return (farthestNode, maxDist);
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)`.
