# 2925. Maximum Score After Applying Operations on a Tree

**Difficulty:** Medium
**Category:** Tree, Dynamic Programming, Depth-First Search

## Problem

You are given a tree with `n` nodes rooted at node 0, where each node has a value. You can perform operations to select some nodes and collect their values. However, you must ensure that there is at least one node with a non-zero value on every path from the root to any leaf. Return the maximum score you can achieve.

### Example

```
Input: edges = [[0,1],[0,2],[1,3],[1,4],[2,5],[2,6]], values = [1,2,3,4,5,6,7]
Output: 28
Explanation: Select nodes optimally while maintaining at least one node on each root-to-leaf path.
```

## Approach

Use tree DP. For each subtree, calculate two states: the maximum score when the current node is kept (ensuring connectivity) and when it's taken (children must ensure connectivity). The answer is the maximum of both states at the root. Use DFS to compute both possibilities for each node.

## C# Solution

```csharp
public class Solution 
{
    private List<int>[] graph;
    private int[] values;
    
    public long MaximumScoreAfterOperations(int[][] edges, int[] values) 
    {
        int n = values.Length;
        this.values = values;
        graph = new List<int>[n];
        
        for (int i = 0; i < n; i++) 
        {
            graph[i] = new List<int>();
        }
        
        foreach (var edge in edges) 
        {
            graph[edge[0]].Add(edge[1]);
            graph[edge[1]].Add(edge[0]);
        }
        
        return Dfs(0, -1)[1];
    }
    
    private long[] Dfs(int node, int parent) 
    {
        long subtreeSum = values[node];
        long minLoss = values[node];
        
        foreach (int child in graph[node]) 
        {
            if (child != parent) 
            {
                var childResult = Dfs(child, node);
                subtreeSum += childResult[0];
                minLoss += childResult[1];
            }
        }
        
        if (graph[node].Count == 1 && parent != -1) 
        {
            return new long[] { values[node], 0 };
        }
        
        minLoss = Math.Min(minLoss, subtreeSum - (long)values[node]);
        return new long[] { subtreeSum, subtreeSum - minLoss };
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
