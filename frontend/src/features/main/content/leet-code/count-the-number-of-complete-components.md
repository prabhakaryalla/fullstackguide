# 2685. Count the Number of Complete Components

**Difficulty:** Medium
**Category:** Graph, Depth-First Search, Breadth-First Search

## Problem

You are given an integer `n` and a 0-indexed integer array `edges` where `edges[i] = [a_i, b_i]` denotes an undirected edge between vertices `a_i` and `b_i`.

A connected component is a subgraph of a graph in which there exists a path between any two vertices, and no vertex of the subgraph shares an edge with a vertex outside of the subgraph.

A connected component is said to be complete if there is an edge between every pair of vertices in the component.

Return the number of complete connected components in the graph.

### Example

```
Input: n = 6, edges = [[0,1],[0,2],[1,2],[3,4]]
Output: 3
Explanation: Components are: {0,1,2} (complete), {3,4} (complete), {5} (complete).

Input: n = 6, edges = [[0,1],[0,2],[1,2],[3,4],[3,5]]
Output: 1
Explanation: Components are: {0,1,2} (complete with 3 edges for 3 nodes), {3,4,5} (not complete - only 2 edges for 3 nodes), so only 1 complete component.
```

## Approach

Use DFS or BFS to find all connected components. For each component with `k` nodes, check if it has exactly `k * (k - 1) / 2` edges (the number of edges in a complete graph). Count components that satisfy this condition.

## C# Solution

```csharp
public class Solution
{
    public int CountCompleteComponents(int n, int[][] edges)
    {
        var adj = new List<int>[n];
        for (int i = 0; i < n; i++)
        {
            adj[i] = new List<int>();
        }
        
        foreach (var edge in edges)
        {
            adj[edge[0]].Add(edge[1]);
            adj[edge[1]].Add(edge[0]);
        }
        
        bool[] visited = new bool[n];
        int completeComponents = 0;
        
        for (int i = 0; i < n; i++)
        {
            if (!visited[i])
            {
                var component = new List<int>();
                DFS(i, adj, visited, component);
                
                int nodeCount = component.Count;
                int edgeCount = 0;
                
                foreach (int node in component)
                {
                    edgeCount += adj[node].Count;
                }
                edgeCount /= 2;
                
                if (edgeCount == nodeCount * (nodeCount - 1) / 2)
                {
                    completeComponents++;
                }
            }
        }
        
        return completeComponents;
    }
    
    private void DFS(int node, List<int>[] adj, bool[] visited, List<int> component)
    {
        visited[node] = true;
        component.Add(node);
        
        foreach (int neighbor in adj[node])
        {
            if (!visited[neighbor])
            {
                DFS(neighbor, adj, visited, component);
            }
        }
    }
}
```

## Complexity

- **Time:** O(n + e) where e is the number of edges
- **Space:** O(n + e) for the adjacency list
