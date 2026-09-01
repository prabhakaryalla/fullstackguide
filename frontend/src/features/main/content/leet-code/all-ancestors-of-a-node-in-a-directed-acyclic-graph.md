# 2192. All Ancestors of a Node in a Directed Acyclic Graph

**Difficulty:** Medium
**Category:** Depth-First Search, Breadth-First Search, Graph, Topological Sort

## Problem

You are given a positive integer `n` representing the number of nodes of a Directed Acyclic Graph (DAG). The nodes are numbered from `0` to `n - 1`.

You are also given a 2D integer array `edges`, where `edges[i] = [fromi, toi]` denotes an edge from node `fromi` to node `toi`.

Return a list `answer`, where `answer[i]` is the list of ancestors of the i-th node, sorted in ascending order.

A node `u` is an ancestor of another node `v` if `u` can reach `v` via a set of edges.

### Example

```
Input: n = 8, edges = [[0,3],[0,4],[1,3],[2,4],[2,7],[3,5],[3,6],[3,7],[4,6]]
Output: [[],[],[],[0,1],[0,2],[0,1,3],[0,1,2,3,4],[0,1,2,3]]
Explanation:
Node 0 has no ancestors.
Node 1 has no ancestors.
Node 2 has no ancestors.
Node 3 has ancestors [0,1].
...
```

## Approach

Use DFS or BFS from each node to find all nodes it can reach. Then invert the relationship: if node `u` can reach node `v`, then `u` is an ancestor of `v`.

Alternative approach: For each node, perform DFS to find all its ancestors by traversing backward edges.

We'll use topological sort with DFS to propagate ancestor information:
1. Build reverse graph
2. For each node in topological order, collect ancestors from all parent nodes
3. Each node's ancestors = union of all parents' ancestors + the parents themselves

## C# Solution

```csharp
public class Solution
{
    public IList<IList<int>> GetAncestors(int n, int[][] edges)
    {
        List<int>[] graph = new List<int>[n];
        for (int i = 0; i < n; i++)
        {
            graph[i] = new List<int>();
        }
        
        foreach (var edge in edges)
        {
            graph[edge[0]].Add(edge[1]);
        }
        
        List<HashSet<int>> ancestors = new List<HashSet<int>>();
        for (int i = 0; i < n; i++)
        {
            ancestors.Add(new HashSet<int>());
        }
        
        // DFS from each node to mark it as ancestor of all reachable nodes
        for (int i = 0; i < n; i++)
        {
            Dfs(i, i, graph, ancestors);
        }
        
        IList<IList<int>> result = new List<IList<int>>();
        for (int i = 0; i < n; i++)
        {
            List<int> sorted = new List<int>(ancestors[i]);
            sorted.Sort();
            result.Add(sorted);
        }
        
        return result;
    }
    
    private void Dfs(int ancestor, int current, List<int>[] graph, List<HashSet<int>> ancestors)
    {
        foreach (int next in graph[current])
        {
            if (ancestors[next].Add(ancestor))
            {
                Dfs(ancestor, next, graph, ancestors);
            }
        }
    }
}
```

## Complexity

- **Time:** O(n * (n + m)), where n is nodes and m is edges
- **Space:** O(n^2) in worst case for storing ancestors
