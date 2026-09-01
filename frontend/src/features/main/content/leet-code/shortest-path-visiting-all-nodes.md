# 847. Shortest Path Visiting All Nodes

**Difficulty:** Hard
**Category:** Bit Manipulation, Breadth-First Search, Graph

## Problem

Given an undirected connected graph as an adjacency list `graph`, return the length of the shortest path that visits every node at least once (you may start at any node and revisit nodes/edges).

### Example

```
Input: graph = [[1,2,3],[0],[0],[0]]
Output: 4
```

## Approach

Use BFS over an expanded state space of `(currentNode, visitedMask)`, where `visitedMask` is a bitmask of nodes visited so far. Start BFS simultaneously from every node with only itself marked visited. At each step, move to a neighbor and update the mask by setting that neighbor's bit. The first time a state reaches the mask with all bits set, its BFS depth is the shortest path length.

## C# Solution

```csharp
public class Solution
{
    public int ShortestPathLength(int[][] graph)
    {
        int n = graph.Length;
        int finalMask = (1 << n) - 1;

        var visited = new bool[n, finalMask + 1];
        var queue = new Queue<(int Node, int Mask, int Dist)>();

        for (int i = 0; i < n; i++)
        {
            queue.Enqueue((i, 1 << i, 0));
            visited[i, 1 << i] = true;
        }

        while (queue.Count > 0)
        {
            var (node, mask, dist) = queue.Dequeue();

            if (mask == finalMask) return dist;

            foreach (var neighbor in graph[node])
            {
                int newMask = mask | (1 << neighbor);

                if (!visited[neighbor, newMask])
                {
                    visited[neighbor, newMask] = true;
                    queue.Enqueue((neighbor, newMask, dist + 1));
                }
            }
        }

        return -1;
    }
}
```

## Complexity

- **Time:** `O(n^2 * 2^n)`.
- **Space:** `O(n * 2^n)` for the visited states and queue.
