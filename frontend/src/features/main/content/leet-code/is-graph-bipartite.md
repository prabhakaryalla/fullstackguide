# 785. Is Graph Bipartite?

**Difficulty:** Medium
**Category:** Depth-First Search, Breadth-First Search, Union Find, Graph

## Problem

Given an undirected graph as an adjacency list `graph`, return `true` if the graph is bipartite — its nodes can be split into two sets such that every edge connects a node in one set to a node in the other.

### Example

```
Input: graph = [[1,2,3],[0,2],[0,1,3],[0,2]]
Output: false
```

## Approach

Attempt to 2-color the graph using BFS, since the graph may be disconnected. For every uncolored node, assign it a color and BFS through its component, coloring each newly visited neighbor with the opposite color of the current node. If a neighbor is already colored the same as the current node, the graph is not bipartite.

## C# Solution

```csharp
public class Solution
{
    public bool IsBipartite(int[][] graph)
    {
        int n = graph.Length;
        var colors = new int[n];

        for (int i = 0; i < n; i++)
        {
            if (colors[i] != 0) continue;

            colors[i] = 1;
            var queue = new Queue<int>();
            queue.Enqueue(i);

            while (queue.Count > 0)
            {
                var node = queue.Dequeue();

                foreach (var neighbor in graph[node])
                {
                    if (colors[neighbor] == 0)
                    {
                        colors[neighbor] = -colors[node];
                        queue.Enqueue(neighbor);
                    }
                    else if (colors[neighbor] == colors[node])
                    {
                        return false;
                    }
                }
            }
        }

        return true;
    }
}
```

## Complexity

- **Time:** `O(V + E)`.
- **Space:** `O(V)` for the colors array and queue.
