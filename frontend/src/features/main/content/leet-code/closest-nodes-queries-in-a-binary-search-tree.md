# 2476. Closest Nodes Queries in a Binary Search Tree

**Difficulty:** Medium
**Category:** Array, Binary Search, Tree, Depth-First Search, Binary Search Tree, Binary Tree

## Problem

You are given the root of a binary search tree and an array `queries`. For each query value, find:
- The largest value in the tree that is smaller than or equal to the query
- The smallest value in the tree that is greater than or equal to the query

If no such value exists, use -1. Return a 2D array where `answer[i] = [min_i, max_i]` for each query.

### Example

```
Input: root = [6,2,13,1,4,9,15,null,null,null,null,null,null,14], queries = [2,5,16]
Output: [[2,2],[4,6],[15,-1]]
Explanation:
Query 2: floor=2, ceil=2
Query 5: floor=4, ceil=6
Query 16: floor=15, ceil=none
```

## Approach

First, perform an inorder traversal to get all BST values in sorted order. For each query, use binary search to find:
- Floor: largest element ≤ query
- Ceiling: smallest element ≥ query

## C# Solution

```csharp
public class Solution
{
    public IList<IList<int>> ClosestNodes(TreeNode root, IList<int> queries)
    {
        var values = new List<int>();
        Inorder(root, values);
        
        var result = new List<IList<int>>();
        
        foreach (int query in queries)
        {
            int floor = FindFloor(values, query);
            int ceil = FindCeil(values, query);
            result.Add(new List<int> { floor, ceil });
        }
        
        return result;
    }
    
    private void Inorder(TreeNode node, List<int> values)
    {
        if (node == null) return;
        Inorder(node.left, values);
        values.Add(node.val);
        Inorder(node.right, values);
    }
    
    private int FindFloor(List<int> values, int target)
    {
        int left = 0, right = values.Count - 1;
        int result = -1;
        
        while (left <= right)
        {
            int mid = left + (right - left) / 2;
            if (values[mid] <= target)
            {
                result = values[mid];
                left = mid + 1;
            }
            else
            {
                right = mid - 1;
            }
        }
        
        return result;
    }
    
    private int FindCeil(List<int> values, int target)
    {
        int left = 0, right = values.Count - 1;
        int result = -1;
        
        while (left <= right)
        {
            int mid = left + (right - left) / 2;
            if (values[mid] >= target)
            {
                result = values[mid];
                right = mid - 1;
            }
            else
            {
                left = mid + 1;
            }
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(n + q log n) where n is nodes and q is queries
- **Space:** O(n) for storing values
