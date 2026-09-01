# 2277. Closest Node to Path in Tree

**Difficulty:** Hard
**Category:** Array, Tree, Depth-First Search, Breadth-First Search
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

You are given a tree with `n` nodes. For each query consisting of a path from node `start` to node `end`, find the node not on the path that is closest to any node on the path.

### Example

```
Input: edges = [[0,1],[0,2],[0,3],[2,4],[2,5]], queries = [[0,3],[2,4]]
Output: [2,0]
Explanation: For path 0->3, node 2 is closest. For path 2->4, node 0 is closest.
```

## Approach

For each query, find the path between start and end using BFS or DFS. Mark all nodes on the path. Then use BFS from all path nodes simultaneously to find the closest node not on the path.

## C# Solution

```csharp
public class Solution
{
    public int[] ClosestNode(int n, int[][] edges, int[][] queries)
    {
        var graph = new List<int>[n];
        for (int i = 0; i < n; i++)
        {
            graph[i] = new List<int>();
        }
        
        foreach (var edge in edges)
        {
            graph[edge[0]].Add(edge[1]);
            graph[edge[1]].Add(edge[0]);
        }
        
        int[] result = new int[queries.Length];
        
        for (int q = 0; q < queries.Length; q++)
        {
            int start = queries[q][0], end = queries[q][1];
            var path = FindPath(graph, start, end, n);
            result[q] = FindClosestNodeOutsidePath(graph, path, n);
        }
        
        return result;
    }
    
    private HashSet<int> FindPath(List<int>[] graph, int start, int end, int n)
    {
        var parent = new int[n];
        Array.Fill(parent, -1);
        var queue = new Queue<int>();
        queue.Enqueue(start);
        var visited = new bool[n];
        visited[start] = true;
        
        while (queue.Count > 0)
        {
            int node = queue.Dequeue();
            if (node == end) break;
            
            foreach (int neighbor in graph[node])
            {
                if (!visited[neighbor])
                {
                    visited[neighbor] = true;
                    parent[neighbor] = node;
                    queue.Enqueue(neighbor);
                }
            }
        }
        
        var path = new HashSet<int>();
        int current = end;
        while (current != -1)
        {
            path.Add(current);
            current = parent[current];
        }
        
        return path;
    }
    
    private int FindClosestNodeOutsidePath(List<int>[] graph, HashSet<int> path, int n)
    {
        var queue = new Queue<int>();
        var visited = new bool[n];
        
        foreach (int node in path)
        {
            queue.Enqueue(node);
            visited[node] = true;
        }
        
        while (queue.Count > 0)
        {
            int node = queue.Dequeue();
            
            foreach (int neighbor in graph[node])
            {
                if (!visited[neighbor])
                {
                    if (!path.Contains(neighbor))
                    {
                        return neighbor;
                    }
                    visited[neighbor] = true;
                    queue.Enqueue(neighbor);
                }
            }
        }
        
        return -1;
    }
}
```

## Complexity

- **Time:** O(q * n) where q is the number of queries
- **Space:** O(n)
