# 2458. Height of Binary Tree After Subtree Removal Queries

**Difficulty:** Hard
**Category:** Array, Tree, Depth-First Search, Breadth-First Search, Binary Tree

## Problem

You are given the root of a binary tree with `n` nodes. Each node is uniquely labeled from 1 to n. You are also given an array `queries` of size `m`.

For the ith query, you remove the subtree rooted at the node with value `queries[i]` from the tree. Return an array `answer` of size `m` where `answer[i]` is the height of the tree after performing the ith query.

Note: Queries are independent; the tree is restored after each query.

### Example

```
Input: root = [1,3,4,2,null,6,5,null,null,null,null,null,7], queries = [4]
Output: [2]
Explanation: After removing node 4's subtree, the remaining tree has height 2.
```

## Approach

For each node, precompute:
1. The height of the tree without that node's subtree
2. This requires knowing the maximum height among all other paths in the tree

Use DFS to compute:
- The depth of each node
- The height of each subtree
- For each node, the maximum height achievable without including it

Store these in arrays indexed by node value for O(1) query answering.

## C# Solution

```csharp
public class Solution
{
    private Dictionary<int, int> heights = new Dictionary<int, int>();
    private Dictionary<int, int> depths = new Dictionary<int, int>();
    private Dictionary<int, int> answer = new Dictionary<int, int>();
    
    public int[] TreeQueries(TreeNode root, int[] queries)
    {
        ComputeHeights(root);
        ComputeAnswers(root, 0, 0);
        
        int[] result = new int[queries.Length];
        for (int i = 0; i < queries.Length; i++)
        {
            result[i] = answer[queries[i]];
        }
        
        return result;
    }
    
    private int ComputeHeights(TreeNode node)
    {
        if (node == null) return -1;
        
        int leftH = ComputeHeights(node.left);
        int rightH = ComputeHeights(node.right);
        int h = 1 + Math.Max(leftH, rightH);
        heights[node.val] = h;
        return h;
    }
    
    private void ComputeAnswers(TreeNode node, int depth, int maxWithoutThis)
    {
        if (node == null) return;
        
        depths[node.val] = depth;
        answer[node.val] = maxWithoutThis;
        
        int leftH = node.left != null ? heights[node.left.val] : -1;
        int rightH = node.right != null ? heights[node.right.val] : -1;
        
        ComputeAnswers(node.left, depth + 1, Math.Max(maxWithoutThis, depth + 1 + rightH));
        ComputeAnswers(node.right, depth + 1, Math.Max(maxWithoutThis, depth + 1 + leftH));
    }
}
```

## Complexity

- **Time:** O(n + m) where n is number of nodes and m is number of queries
- **Space:** O(n) for the dictionaries
