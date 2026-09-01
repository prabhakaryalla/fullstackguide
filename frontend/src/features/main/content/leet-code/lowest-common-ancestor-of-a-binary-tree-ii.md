# 1644. Lowest Common Ancestor of a Binary Tree II

**Difficulty:** Medium
**Category:** Tree, Depth-First Search, Binary Tree

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given the root of a binary tree and two nodes `p` and `q`, return their lowest common ancestor. Unlike the classic version, `p` and/or `q` might not exist in the tree, in which case return `null`.

### Example

```
Input: root = [1,2,3], p = 2, q = 3
Output: 3 (their LCA, since both exist)
```

## Approach

Perform a post-order DFS that both searches for the LCA candidate (using the classic recursive rule: a node is the LCA if `p`/`q` are found in different subtrees, or it matches one of them while the other is found below) and separately records, via instance flags, whether `p` and `q` were actually encountered anywhere in the tree. Only return the computed ancestor if both flags end up `true`.

## C# Solution

```csharp
public class Solution
{
    private bool foundP = false;
    private bool foundQ = false;

    public TreeNode LowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q)
    {
        TreeNode ancestor = Dfs(root, p, q);
        return foundP && foundQ ? ancestor : null;
    }

    private TreeNode Dfs(TreeNode node, TreeNode p, TreeNode q)
    {
        if (node == null)
        {
            return null;
        }

        TreeNode left = Dfs(node.left, p, q);
        TreeNode right = Dfs(node.right, p, q);

        if (node == p)
        {
            foundP = true;
        }

        if (node == q)
        {
            foundQ = true;
        }

        if (node == p || node == q)
        {
            return node;
        }

        if (left != null && right != null)
        {
            return node;
        }

        return left ?? right;
    }
}
```

## Complexity

- **Time:** `O(n)`, visiting every node once.
- **Space:** `O(h)` recursion depth, where `h` is the tree height.
