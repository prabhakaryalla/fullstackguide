# 2204. Distance to a Cycle in Undirected Graph

**Difficulty:** Hard
**Category:** Graph, Depth-First Search, Breadth-First Search
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

You are given a positive integer `n` representing the number of nodes in a connected undirected graph containing exactly one cycle. Nodes are numbered from `0` to `n - 1`.

You are also given a 2D array `edges`, where `edges[i] = [nodei1, nodei2]` denotes an edge between `nodei1` and `nodei2`.

Return an array `answer` of size `n` where `answer[i]` is the distance from node `i` to the cycle.

### Example

```
Input: n = 7, edges = [[1,2],[2,4],[4,3],[3,1],[0,1],[5,2],[6,5]]
Output: [1,0,0,0,0,1,2]
```

## Approach

1. Find the cycle using DFS (detect back edge)
2. Mark all nodes in the cycle (distance 0)
3. Use BFS from all cycle nodes to find distances to non-cycle nodes

Algorithm:
- DFS to find one node in the cycle
- From that node, trace back to find all cycle nodes
- BFS from cycle nodes to compute distances

## C# Solution

```csharp
public class Solution
{
    public int[] DistanceToCycle(int n, int[][] edges)
    {
        List<int>[] graph = new List<int>[n];
        for (int i = 0; i < n; i++)
        {
            graph[i] = new List<int>();
        }
        
        foreach (var edge in edges)
        {
            graph[edge[0]].Add(edge[1]);
            graph[edge[1]].Add(edge[0]);
        }
        
        // Find cycle
        int[] parent = new int[n];
        Array.Fill(parent, -1);
        bool[] visited = new bool[n];
        HashSet<int> cycleNodes = new HashSet<int>();
        
        // DFS to find cycle
        FindCycle(0, -1, graph, visited, parent, cycleNodes);
        
        // BFS from cycle nodes
        int[] distances = new int[n];
        Array.Fill(distances, -1);
        Queue<int> queue = new Queue<int>();
        
        foreach (int node in cycleNodes)
        {
            distances[node] = 0;
            queue.Enqueue(node);
        }
        
        while (queue.Count > 0)
        {
            int u = queue.Dequeue();
            
            foreach (int v in graph[u])
            {
                if (distances[v] == -1)
                {
                    distances[v] = distances[u] + 1;
                    queue.Enqueue(v);
                }
            }
        }
        
        return distances;
    }
    
    private bool FindCycle(int u, int par, List<int>[] graph, bool[] visited, int[] parent, HashSet<int> cycle)
    {
        visited[u] = true;
        
        foreach (int v in graph[u])
        {
            if (v == par) continue;
            
            if (visited[v])
            {
                // Found cycle, trace back
                int curr = u;
                while (curr != v)
                {
                    cycle.Add(curr);
                    curr = parent[curr];
                }
                cycle.Add(v);
                return true;
            }
            
            parent[v] = u;
            if (FindCycle(v, u, graph, visited, parent, cycle))
            {
                return true;
            }
        }
        
        return false;
    }
}
```

## Complexity

- **Time:** O(V + E), for DFS and BFS
- **Space:** O(V + E), for graph storage
