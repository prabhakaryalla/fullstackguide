# 1466. Reorder Routes to Make All Paths Lead to the City Zero

**Difficulty:** Medium
**Category:** Depth-First Search, Breadth-First Search, Graph

## Problem

There are `n` cities connected by `n - 1` directed roads, forming a tree if edge directions are ignored, given as `connections[i] = [a, b]` (a road from `a` to `b`). Return the minimum number of roads that must be reversed so that every city can reach city `0`.

### Example

```
Input: n = 6, connections = [[0,1],[1,3],[2,3],[4,0],[4,5]]
Output: 3
```

## Approach

Build an undirected adjacency list where each edge remembers its original direction. Perform a depth-first search starting from city `0`, traveling outward along the tree (ignoring true direction). Whenever the traversal moves from a city to a neighbor along an edge whose original direction also points that way (away from `0`), that road currently points the wrong way for reaching `0` and must be reversed — count it. Sum these counts across the whole tree.

## C# Solution

```csharp
public class Solution
{
    public int MinReorder(int n, int[][] connections)
    {
        var adj = new List<(int To, int NeedsReverse)>[n];
        for (int i = 0; i < n; i++) adj[i] = new List<(int, int)>();

        foreach (var c in connections)
        {
            adj[c[0]].Add((c[1], 1)); // original direction: away from c[0] toward c[1]
            adj[c[1]].Add((c[0], 0)); // traversing this way already points toward the root
        }

        var visited = new bool[n];
        return Dfs(0, adj, visited);
    }

    private int Dfs(int node, List<(int To, int NeedsReverse)>[] adj, bool[] visited)
    {
        visited[node] = true;
        int count = 0;

        foreach (var (to, needsReverse) in adj[node])
        {
            if (visited[to]) continue;
            count += needsReverse;
            count += Dfs(to, adj, visited);
        }

        return count;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the adjacency list and recursion stack.
