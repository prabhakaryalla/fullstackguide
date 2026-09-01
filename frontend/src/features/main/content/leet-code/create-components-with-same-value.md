# 2440. Create Components With Same Value

**Difficulty:** Hard
**Category:** Array, Tree, Depth-First Search

## Problem

You are given a tree with `n` nodes (numbered from 0 to n-1) where each node has a value. You can remove edges to split the tree into components. Return the maximum number of components you can create such that all components have the same sum of node values.

### Example

```
Input: nums = [6,2,2,2,6], edges = [[0,1],[1,2],[1,3],[3,4]]
Output: 3
Explanation: We can remove edges [0,1] and [3,4] to create 3 components with sum 6 each.
```

## Approach

The total sum must be divisible by the number of components `k`. Try each possible divisor `k` of the total sum. For each `k`, check if we can partition the tree into `k` components each with sum `total/k` using DFS. For each subtree, compute its sum; if it equals the target, count it as a separate component and return 0 to the parent (since this subtree is cut off).

## C# Solution

```csharp
public class Solution
{
    public int ComponentValue(int[] nums, int[][] edges)
    {
        int n = nums.Length;
        var graph = new List<int>[n];
        for (int i = 0; i < n; i++) graph[i] = new List<int>();
        
        foreach (var edge in edges)
        {
            graph[edge[0]].Add(edge[1]);
            graph[edge[1]].Add(edge[0]);
        }
        
        int total = nums.Sum();
        
        for (int k = n; k >= 1; k--)
        {
            if (total % k != 0) continue;
            int target = total / k;
            
            if (CanPartition(0, -1, nums, graph, target))
            {
                return k - 1; // k components means k-1 edges removed
            }
        }
        
        return 0;
    }
    
    private bool CanPartition(int node, int parent, int[] nums, List<int>[] graph, int target)
    {
        int sum = nums[node];
        
        foreach (int child in graph[node])
        {
            if (child == parent) continue;
            
            int childSum = DFS(child, node, nums, graph, target);
            if (childSum == -1) return false;
            sum += childSum;
        }
        
        if (sum == target) return true;
        return sum < target;
    }
    
    private int DFS(int node, int parent, int[] nums, List<int>[] graph, int target)
    {
        int sum = nums[node];
        
        foreach (int child in graph[node])
        {
            if (child == parent) continue;
            
            int childSum = DFS(child, node, nums, graph, target);
            if (childSum == -1) return -1;
            sum += childSum;
        }
        
        if (sum == target) return 0; // This component is complete
        if (sum > target) return -1; // Invalid
        return sum;
    }
}
```

## Complexity

- **Time:** O(n * d) where d is the number of divisors of the total sum
- **Space:** O(n) for the graph and recursion stack
