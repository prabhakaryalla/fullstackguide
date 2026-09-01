# 1676. Lowest Common Ancestor of a Binary Tree IV

**Difficulty:** Medium
**Category:** Tree, Depth-First Search, Binary Tree

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given the root of a binary tree and an array of nodes, return the lowest common ancestor of *all* of the given nodes (a generalization of the two-node LCA problem).

### Example

```
Input: root = [3,5,1,6,2,0,8,null,null,7,4], nodes = [4,7]
Output: 2
```

## Approach

Put all target nodes in a hash set for O(1) membership checks. Perform a DFS that returns the current node immediately if it is one of the targets (no need to search its subtree further, since the LCA of a set including this node cannot be lower than this node) or if `null`. Otherwise recurse into both children: if both sides find a target, this node is the LCA; if only one side finds something, propagate that result upward.

## C# Solution

```csharp
public class Solution
{
    public TreeNode LowestCommonAncestor(TreeNode root, TreeNode[] nodes)
    {
        HashSet<TreeNode> targets = new HashSet<TreeNode>(nodes);
        return Dfs(root, targets);
    }

    private TreeNode Dfs(TreeNode node, HashSet<TreeNode> targets)
    {
        if (node == null || targets.Contains(node))
        {
            return node;
        }

        TreeNode left = Dfs(node.left, targets);
        TreeNode right = Dfs(node.right, targets);

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
- **Space:** `O(k + h)`, for the target set and recursion depth.
