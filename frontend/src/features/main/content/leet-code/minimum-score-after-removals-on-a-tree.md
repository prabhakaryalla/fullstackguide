# 2322. Minimum Score After Removals on a Tree

**Difficulty:** Hard
**Category:** Array, Bit Manipulation, Tree, Depth-First Search

## Problem

There is an undirected connected tree with `n` nodes labeled from `0` to `n - 1` and `n - 1` edges. You are given a 0-indexed integer array `nums` of length `n` where `nums[i]` represents the value of the `ith` node. You are also given a 2D integer array `edges` of length `n - 1`.

Each removal: you remove an edge, splitting the tree into two connected components. The score after each removal is the bitwise XOR of the values of the nodes in each component.

Return the minimum score after removing two different edges of the tree.

### Example

```
Input: nums = [1,5,5,4,11], edges = [[0,1],[1,2],[1,3],[3,4]]
Output: 9
Explanation: Remove edges (1,3) and (0,1) to split into components with XOR values:
Component 1: 1, Component 2: 5, Component 3: 5 XOR 4 XOR 11 = 14
Score = max(1, 5, 14) - min(1, 5, 14) = 14 - 1 = 13 (need to verify)
```

## Approach

For each pair of edges to remove, calculate the XOR values of the resulting three components. Use DFS to compute subtree XOR values. Try all pairs of edges and find the minimum score (difference between max and min XOR values of the three components).

## C# Solution

```csharp
public class Solution
{
    private List<int>[] graph;
    private int[] nums;
    private int[] subtreeXor;
    private int totalXor;
    
    public int MinimumScore(int[] nums, int[][] edges)
    {
        this.nums = nums;
        int n = nums.Length;
        graph = new List<int>[n];
        subtreeXor = new int[n];
        totalXor = 0;
        
        for (int i = 0; i < n; i++)
        {
            graph[i] = new List<int>();
            totalXor ^= nums[i];
        }
        
        foreach (var edge in edges)
        {
            graph[edge[0]].Add(edge[1]);
            graph[edge[1]].Add(edge[0]);
        }
        
        DFS(0, -1);
        
        int minScore = int.MaxValue;
        
        for (int i = 0; i < edges.Length; i++)
        {
            for (int j = i + 1; j < edges.Length; j++)
            {
                int score = CalculateScore(edges[i], edges[j]);
                minScore = Math.Min(minScore, score);
            }
        }
        
        return minScore;
    }
    
    private int DFS(int node, int parent)
    {
        int xorVal = nums[node];
        
        foreach (int child in graph[node])
        {
            if (child != parent)
            {
                xorVal ^= DFS(child, node);
            }
        }
        
        subtreeXor[node] = xorVal;
        return xorVal;
    }
    
    private int CalculateScore(int[] edge1, int[] edge2)
    {
        int node1 = edge1[1];
        int node2 = edge2[1];
        
        int xor1 = subtreeXor[node1];
        int xor2 = subtreeXor[node2];
        int xor3 = totalXor ^ xor1 ^ xor2;
        
        return Math.Max(Math.Max(xor1, xor2), xor3) - Math.Min(Math.Min(xor1, xor2), xor3);
    }
}
```

## Complexity

- **Time:** O(n + e²) where e is the number of edges
- **Space:** O(n) for the graph and subtree arrays
