# 2508. Add Edges to Make Degrees of All Nodes Even

**Difficulty:** Hard
**Category:** Graph

## Problem

You are given an undirected graph with `n` nodes numbered from `1` to `n`. You are given an integer `n` and a 2D array `edges` where `edges[i] = [u_i, v_i]` represents an undirected edge between nodes `u_i` and `v_i`.

Return `true` if it is possible to add at most two edges to this graph such that the degree of every node becomes even. Otherwise, return `false`.

### Example

```
Input: n = 5, edges = [[1,2],[2,3],[3,4],[4,2],[1,4],[2,5]]
Output: true
Explanation: We can add edges [1,5] and [3,5] to make all degrees even.
```

## Approach

First, calculate the degree of each node and identify nodes with odd degree. If all nodes already have even degree, return true. If there are exactly 2 or 4 nodes with odd degree, check if we can add 1 or 2 edges to fix them. For 2 odd nodes, add an edge between them if it doesn't exist. For 4 odd nodes, try adding two non-overlapping edges.

## C# Solution

```csharp
public class Solution
{
    public bool IsPossible(int n, IList<IList<int>> edges)
    {
        HashSet<int>[] graph = new HashSet<int>[n + 1];
        for (int i = 0; i <= n; i++)
        {
            graph[i] = new HashSet<int>();
        }
        
        foreach (var edge in edges)
        {
            graph[edge[0]].Add(edge[1]);
            graph[edge[1]].Add(edge[0]);
        }
        
        List<int> oddNodes = new List<int>();
        for (int i = 1; i <= n; i++)
        {
            if (graph[i].Count % 2 == 1)
            {
                oddNodes.Add(i);
            }
        }
        
        if (oddNodes.Count == 0) return true;
        if (oddNodes.Count % 2 == 1 || oddNodes.Count > 4) return false;
        
        if (oddNodes.Count == 2)
        {
            int a = oddNodes[0], b = oddNodes[1];
            if (!graph[a].Contains(b)) return true;
            
            for (int i = 1; i <= n; i++)
            {
                if (i != a && i != b && !graph[i].Contains(a) && !graph[i].Contains(b))
                {
                    return true;
                }
            }
            return false;
        }
        
        if (oddNodes.Count == 4)
        {
            int a = oddNodes[0], b = oddNodes[1], c = oddNodes[2], d = oddNodes[3];
            
            if ((!graph[a].Contains(b) && !graph[c].Contains(d)) ||
                (!graph[a].Contains(c) && !graph[b].Contains(d)) ||
                (!graph[a].Contains(d) && !graph[b].Contains(c)))
            {
                return true;
            }
        }
        
        return false;
    }
}
```

## Complexity

- **Time:** O(n + m) where m is the number of edges
- **Space:** O(n + m) for the graph representation
