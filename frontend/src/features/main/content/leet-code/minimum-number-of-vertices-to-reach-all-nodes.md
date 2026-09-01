# 1557. Minimum Number of Vertices to Reach All Nodes

**Difficulty:** Medium
**Category:** Graph

## Problem

Given a directed acyclic graph of `n` nodes and a list of directed `edges`, find the smallest set of vertices from which every node in the graph is reachable.

### Example

```
Input: n = 6, edges = [[0,1],[0,2],[2,5],[3,4],[4,2]]
Output: [0,3]
```

## Approach

In a DAG, a node can only be excluded from the answer set if some other node has a direct edge into it (meaning it's already reachable from elsewhere). Therefore, the required set of "source" vertices is exactly the set of nodes with an in-degree of `0` — count the in-degree of every node from the edge list, and collect every node whose in-degree remains `0`.

## C# Solution

```csharp
public class Solution
{
    public IList<int> FindSmallestSetOfVertices(int n, IList<IList<int>> edges)
    {
        bool[] hasIncomingEdge = new bool[n];

        foreach (IList<int> edge in edges)
        {
            hasIncomingEdge[edge[1]] = true;
        }

        var result = new List<int>();
        for (int i = 0; i < n; i++)
        {
            if (!hasIncomingEdge[i])
            {
                result.Add(i);
            }
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n + e)` — one pass over the edges plus one pass over the nodes.
- **Space:** `O(n)` for the in-degree tracking array.
