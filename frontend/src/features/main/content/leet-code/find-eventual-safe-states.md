# 802. Find Eventual Safe States

**Difficulty:** Medium
**Category:** Depth-First Search, Graph, Topological Sort

## Problem

Given a directed graph as an adjacency list `graph`, a node is "safe" if every possible path starting from it eventually leads to a terminal node (no outgoing edges), meaning it can never be part of an infinite loop. Return all safe nodes in ascending order.

### Example

```
Input: graph = [[1,2],[2,3],[5],[0],[5],[],[]]
Output: [2,4,5,6]
```

## Approach

Use DFS with 3-state coloring per node: unvisited, currently-being-visited (on the recursion stack), or confirmed-safe. A node is safe only if every neighbor is safe; if DFS ever revisits a node still marked as "currently visiting," a cycle has been found, making the node (and everything reachable that depends on it) unsafe. Memoize results so each node's safety is only computed once.

## C# Solution

```csharp
public class Solution
{
    public IList<int> EventualSafeNodes(int[][] graph)
    {
        int n = graph.Length;
        var state = new int[n];

        var result = new List<int>();

        for (int i = 0; i < n; i++)
        {
            if (Dfs(graph, i, state))
                result.Add(i);
        }

        return result;
    }

    private bool Dfs(int[][] graph, int node, int[] state)
    {
        if (state[node] == 2) return true;
        if (state[node] == 3) return false;

        state[node] = 3;

        foreach (var neighbor in graph[node])
        {
            if (!Dfs(graph, neighbor, state))
                return false;
        }

        state[node] = 2;
        return true;
    }
}
```

## Complexity

- **Time:** `O(V + E)`.
- **Space:** `O(V)` for the state array and recursion stack.
