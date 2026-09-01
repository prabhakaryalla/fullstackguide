# 1740. Find Distance in a Binary Tree

**Difficulty:** Medium
**Category:** Tree, Depth-First Search, Binary Tree

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given the root of a binary tree and two values `p` and `q`, return the number of edges on the path between the nodes with those values.

### Example

```
Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 0
Output: 3
```

## Approach

Find the lowest common ancestor (LCA) of the two target values with a standard recursive search. Then compute the depth of each target value relative to the LCA with a separate depth-first search; the sum of the two depths is the number of edges between them.

## C# Solution

```csharp
public class Solution
{
    public int FindDistance(TreeNode root, int p, int q)
    {
        TreeNode lca = FindLca(root, p, q);
        int d1 = DepthFrom(lca, p, 0);
        int d2 = DepthFrom(lca, q, 0);
        return d1 + d2;
    }

    private TreeNode FindLca(TreeNode node, int p, int q)
    {
        if (node == null || node.val == p || node.val == q) return node;
        var left = FindLca(node.left, p, q);
        var right = FindLca(node.right, p, q);
        if (left != null && right != null) return node;
        return left ?? right;
    }

    private int DepthFrom(TreeNode node, int target, int depth)
    {
        if (node == null) return -1;
        if (node.val == target) return depth;

        int left = DepthFrom(node.left, target, depth + 1);
        if (left != -1) return left;

        return DepthFrom(node.right, target, depth + 1);
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(h)` for the recursion stack.
