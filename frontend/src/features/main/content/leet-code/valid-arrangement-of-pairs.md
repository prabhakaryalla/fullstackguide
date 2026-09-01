# 2097. Valid Arrangement of Pairs

**Difficulty:** Hard
**Category:** Graph, Eulerian Circuit, Depth-First Search

## Problem

Given a 0-indexed 2D array `pairs`, where `pairs[i] = [starti, endi]`, rearrange the pairs into a sequence such that `pairs[i][1] == pairs[i + 1][0]` for every consecutive pair in the new arrangement. Return any valid arrangement; it is guaranteed that one exists.

## Approach

Model each pair `[start, end]` as a directed edge `start -> end`. A valid arrangement of all pairs into a single chain is exactly an **Eulerian path** through this directed multigraph (a path that uses every edge exactly once).

Track each node's out-degree minus in-degree. If some node has `outDegree - inDegree == 1`, it must be the start of the Eulerian path (an Eulerian circuit would have all nodes balanced, but if one exists with an imbalance, that node is the unique valid starting point); otherwise, any node with outgoing edges can serve as the start (the path is a full circuit).

Use Hierholzer's algorithm: perform an iterative DFS from the chosen start node, always consuming an unused outgoing edge, backtracking (pushing the current node onto a result stack) once a node runs out of outgoing edges. The resulting stack, reversed, gives an edge sequence that traverses every edge exactly once; converting consecutive nodes in that sequence back into `[start, end]` pairs produces the valid arrangement.

## C# Solution

```csharp
public class Solution
{
    public int[][] ValidArrangement(int[][] pairs)
    {
        var adj = new Dictionary<int, List<int>>();
        var degree = new Dictionary<int, int>();

        foreach (var pair in pairs)
        {
            int u = pair[0], v = pair[1];
            if (!adj.TryGetValue(u, out var list))
            {
                list = new List<int>();
                adj[u] = list;
            }
            list.Add(v);

            degree[u] = degree.GetValueOrDefault(u) + 1;
            degree[v] = degree.GetValueOrDefault(v) - 1;
        }

        int start = pairs[0][0];
        foreach (var (node, d) in degree)
        {
            if (d == 1)
            {
                start = node;
                break;
            }
        }

        var nodeSequence = new List<int>();
        var stack = new Stack<int>();
        stack.Push(start);

        while (stack.Count > 0)
        {
            int node = stack.Peek();

            if (adj.TryGetValue(node, out var neighbors) && neighbors.Count > 0)
            {
                int next = neighbors[^1];
                neighbors.RemoveAt(neighbors.Count - 1);
                stack.Push(next);
            }
            else
            {
                nodeSequence.Add(node);
                stack.Pop();
            }
        }

        nodeSequence.Reverse();

        var result = new int[nodeSequence.Count - 1][];
        for (int i = 0; i < result.Length; i++)
            result[i] = new[] { nodeSequence[i], nodeSequence[i + 1] };

        return result;
    }
}
```

## Complexity

- **Time:** `O(V + E)`, where `E = pairs.Length`.
- **Space:** `O(V + E)` for the adjacency lists and result.
