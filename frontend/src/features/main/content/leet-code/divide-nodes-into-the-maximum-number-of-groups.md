# 2493. Divide Nodes Into the Maximum Number of Groups

**Difficulty:** Hard
**Category:** Graph, Breadth-First Search, Bipartite

## Problem

You are given an undirected graph with `n` nodes numbered from `1` to `n` and an array `edges`. Divide the nodes into the maximum possible number of groups such that:
- Each node belongs to exactly one group
- For every pair of nodes in the same group, there is no edge between them

Return the maximum number of groups you can create. If it's impossible to divide the nodes as described, return -1.

### Example

```
Input: n = 6, edges = [[1,2],[1,4],[1,5],[2,6],[2,3],[4,6]]
Output: 4
Explanation: The graph can be divided into 4 groups with proper BFS leveling.
```

## Approach

This is essentially finding the chromatic number of the graph with a twist. First, check if the graph is bipartite using BFS. For each connected component, perform BFS and track the maximum levels. The answer is the sum of maximum levels across all components if all components are bipartite.

## C# Solution

```csharp
public class Solution
{
    public int MagnificentSets(int n, int[][] edges)
    {
        List<int>[] graph = new List<int>[n + 1];
        for (int i = 0; i <= n; i++)
            graph[i] = new List<int>();
        
        foreach (var edge in edges)
        {
            graph[edge[0]].Add(edge[1]);
            graph[edge[1]].Add(edge[0]);
        }
        
        int[] component = new int[n + 1];
        int compId = 0;
        
        for (int i = 1; i <= n; i++)
        {
            if (component[i] == 0)
            {
                compId++;
                if (!DFS(i, graph, component, compId))
                    return -1;
            }
        }
        
        Dictionary<int, int> maxDepth = new Dictionary<int, int>();
        
        for (int i = 1; i <= n; i++)
        {
            int depth = BFS(i, graph, n);
            if (depth == -1) return -1;
            maxDepth[component[i]] = Math.Max(maxDepth.GetValueOrDefault(component[i], 0), depth);
        }
        
        return maxDepth.Values.Sum();
    }
    
    private bool DFS(int node, List<int>[] graph, int[] component, int compId)
    {
        component[node] = compId;
        foreach (int neighbor in graph[node])
        {
            if (component[neighbor] == 0)
            {
                if (!DFS(neighbor, graph, component, compId))
                    return false;
            }
        }
        return true;
    }
    
    private int BFS(int start, List<int>[] graph, int n)
    {
        int[] color = new int[n + 1];
        Queue<int> queue = new Queue<int>();
        queue.Enqueue(start);
        color[start] = 1;
        int maxLevel = 1;
        
        while (queue.Count > 0)
        {
            int node = queue.Dequeue();
            foreach (int neighbor in graph[node])
            {
                if (color[neighbor] == 0)
                {
                    color[neighbor] = color[node] + 1;
                    maxLevel = Math.Max(maxLevel, color[neighbor]);
                    queue.Enqueue(neighbor);
                }
                else if (Math.Abs(color[neighbor] - color[node]) != 1)
                {
                    return -1;
                }
            }
        }
        
        return maxLevel;
    }
}
```

## Complexity

- **Time:** O(n × (n + m)) where m is the number of edges
- **Space:** O(n + m) for the graph representation
