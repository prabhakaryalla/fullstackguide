# 1059. All Paths from Source Lead to Destination

**Difficulty:** Medium
**Category:** Graph, Depth-First Search, Topological Sort

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a directed graph with `n` nodes and `edges`, along with a `source` and `destination` node, return `true` if every possible path starting at `source` eventually ends at `destination`, and no path leads to a dead end, a cycle, or another node with no outgoing edges other than `destination` itself.

### Example

```
Input: n = 4, edges = [[0,1],[0,3],[1,2],[2,1]], source = 0, destination = 3
Output: false
```

## Approach

Depth-first search from `source`, tracking each node's state as unvisited, currently-being-visited (on the recursion stack), or fully verified safe. A cycle is detected if DFS revisits a node still marked "currently visiting". A node with no outgoing edges is only acceptable if it **is** the destination (otherwise it's a dead end). Also, if `destination` itself has outgoing edges, then any edge leading into `destination` mid-path is invalid, since `destination` must be a true sink. Only mark a node fully safe once all of its neighbors have been proven safe.

## C# Solution

```csharp
public class Solution
{
    public bool LeadsToDestination(int n, int[][] edges, int source, int destination)
    {
        var graph = new List<int>[n];
        for (int i = 0; i < n; i++) graph[i] = new List<int>();
        foreach (var edge in edges) graph[edge[0]].Add(edge[1]);

        var state = new int[n]; // 0 = unvisited, 1 = visiting, 2 = verified safe

        return Dfs(source, destination, graph, state);
    }

    private bool Dfs(int node, int destination, List<int>[] graph, int[] state)
    {
        if (state[node] == 1) return false;
        if (state[node] == 2) return true;

        if (graph[node].Count == 0) return node == destination;

        state[node] = 1;

        foreach (var neighbor in graph[node])
        {
            if (neighbor == destination && graph[destination].Count > 0) return false;
            if (!Dfs(neighbor, destination, graph, state)) return false;
        }

        state[node] = 2;
        return true;
    }
}
```

## Complexity

- **Time:** `O(n + edges.Length)`.
- **Space:** `O(n + edges.Length)` for the graph and recursion stack.
