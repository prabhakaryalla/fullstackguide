# 1377. Frog Position After T Seconds

**Difficulty:** Hard
**Category:** Tree, Depth-First Search, Breadth-First Search, Graph, Math

## Problem

Given an undirected tree rooted at vertex `1`, a frog starts at vertex `1` and each second jumps to a uniformly random unvisited neighboring vertex (staying put forever once it reaches a vertex with no unvisited neighbors). Return the probability the frog is on vertex `target` after exactly `t` seconds.

### Example

```
Input: n = 7, edges = [[1,2],[1,3],[1,7],[2,4],[2,6],[3,5]], t = 2, target = 4
Output: 0.16666666666666666
```

## Approach

Build an adjacency list from the edges, then run a depth-first search from vertex `1`, tracking the accumulated probability (multiplying by `1 / number of unvisited children` at each hop) and elapsed time. Reaching `target` exactly at second `t`, or reaching it earlier at a leaf where the frog would then stay forever, both count as success; anything else contributes `0`.

## C# Solution

```csharp
public class Solution
{
    public double FrogPosition(int n, int[][] edges, int t, int target)
    {
        var adj = new List<int>[n + 1];
        for (int i = 1; i <= n; i++) adj[i] = new List<int>();

        foreach (var e in edges)
        {
            adj[e[0]].Add(e[1]);
            adj[e[1]].Add(e[0]);
        }

        var visited = new bool[n + 1];
        visited[1] = true;

        return Dfs(1, t, target, adj, visited);
    }

    private double Dfs(int node, int timeLeft, int target, List<int>[] adj, bool[] visited)
    {
        var children = adj[node].Where(c => !visited[c]).ToList();

        if (node == target)
        {
            return (timeLeft == 0 || children.Count == 0) ? 1.0 : 0.0;
        }

        if (timeLeft == 0 || children.Count == 0) return 0.0;

        double prob = 0;
        foreach (int child in children)
        {
            visited[child] = true;
            prob += Dfs(child, timeLeft - 1, target, adj, visited) / children.Count;
        }

        return prob;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the adjacency list and recursion stack.
