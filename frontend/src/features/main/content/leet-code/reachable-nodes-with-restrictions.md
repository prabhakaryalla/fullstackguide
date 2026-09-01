# 2368. Reachable Nodes With Restrictions

**Difficulty:** Medium
**Category:** Graph, Depth-First Search, Breadth-First Search

## Problem

There is an undirected tree with `n` nodes labeled from `0` to `n - 1` and `n - 1` edges.

You are given a 2D integer array `edges` of length `n - 1` where `edges[i] = [a_i, b_i]` indicates that there is an edge between nodes `a_i` and `b_i` in the tree. You are also given an integer array `restricted` which represents restricted nodes.

Return the maximum number of nodes you can reach from node `0` without visiting a restricted node.

Note that node `0` will not be a restricted node.

### Example

```
Input: n = 7, edges = [[0,1],[1,2],[3,1],[4,0],[0,5],[5,6]], restricted = [4,5]
Output: 4
Explanation: Can reach nodes 0, 1, 2, 3
```

## Approach

Build an adjacency list and perform DFS/BFS from node 0, avoiding restricted nodes. Count all reachable nodes.

## C# Solution

```csharp
public class Solution
{
    public int ReachableNodes(int n, int[][] edges, int[] restricted)
    {
        var restrictedSet = new HashSet<int>(restricted);
        var graph = new List<int>[n];
        for (int i = 0; i < n; i++)
            graph[i] = new List<int>();
        
        foreach (var edge in edges)
        {
            graph[edge[0]].Add(edge[1]);
            graph[edge[1]].Add(edge[0]);
        }
        
        var visited = new bool[n];
        return DFS(0, graph, restrictedSet, visited);
    }
    
    private int DFS(int node, List<int>[] graph, HashSet<int> restricted, bool[] visited)
    {
        if (visited[node] || restricted.Contains(node))
            return 0;
        
        visited[node] = true;
        int count = 1;
        
        foreach (int neighbor in graph[node])
        {
            count += DFS(neighbor, graph, restricted, visited);
        }
        
        return count;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
