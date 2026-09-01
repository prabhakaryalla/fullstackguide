# 1192. Critical Connections in a Network

**Difficulty:** Hard
**Category:** Depth-First Search, Graph, Biconnected Component

## Problem

Given `n` servers connected by bidirectional `connections`, a "critical connection" is an edge whose removal would disconnect the network into two or more pieces (a bridge). Return all critical connections.

### Example

```
Input: n = 4, connections = [[0,1],[1,2],[2,0],[1,3]]
Output: [[1,3]]
```

## Approach

This is Tarjan's bridge-finding algorithm. Perform a DFS tracking each node's discovery time and its "low-link" value (the earliest discovery time reachable from that node's subtree via at most one back-edge). After exploring a child, propagate the child's low-link up; if the child's low-link is strictly greater than the current node's discovery time, the edge to that child cannot be part of any cycle and is therefore a bridge.

## C# Solution

```csharp
public class Solution
{
    private List<int>[] adj;
    private int[] disc, low;
    private int timer;
    private IList<IList<int>> bridges;

    public IList<IList<int>> CriticalConnections(int n, IList<IList<int>> connections)
    {
        adj = new List<int>[n];
        for (int i = 0; i < n; i++) adj[i] = new List<int>();

        foreach (var c in connections)
        {
            adj[c[0]].Add(c[1]);
            adj[c[1]].Add(c[0]);
        }

        disc = new int[n];
        low = new int[n];
        Array.Fill(disc, -1);
        bridges = new List<IList<int>>();

        Dfs(0, -1);

        return bridges;
    }

    private void Dfs(int node, int parent)
    {
        disc[node] = low[node] = timer++;

        foreach (int neighbor in adj[node])
        {
            if (neighbor == parent) continue;

            if (disc[neighbor] == -1)
            {
                Dfs(neighbor, node);
                low[node] = Math.Min(low[node], low[neighbor]);

                if (low[neighbor] > disc[node])
                {
                    bridges.Add(new List<int> { node, neighbor });
                }
            }
            else
            {
                low[node] = Math.Min(low[node], disc[neighbor]);
            }
        }
    }
}
```

## Complexity

- **Time:** `O(V + E)`.
- **Space:** `O(V + E)`.
