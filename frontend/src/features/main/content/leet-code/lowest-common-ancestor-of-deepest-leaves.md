# 1123. Lowest Common Ancestor of Deepest Leaves

**Difficulty:** Medium
**Category:** Tree, Depth-First Search, Binary Tree, Hash Table

## Problem

Given the root of a binary tree, return the lowest common ancestor of its deepest leaves (the leaves with maximum depth).

### Example

```
Input: root = [3,5,1,6,2,0,8,null,null,7,4]
Output: [2,7,4]
```

## Approach

Perform a single post-order DFS that returns, for each subtree, both its depth and the LCA of its deepest leaves so far. At each node, compare the depths reported by the left and right subtrees: if they're equal, the current node is the LCA for that depth; otherwise, propagate the deeper side's answer along with its depth plus one.

## C# Solution

```csharp
public class Solution
{
    public TreeNode LcaDeepestLeaves(TreeNode root)
    {
        return Dfs(root).node;
    }

    private (int depth, TreeNode node) Dfs(TreeNode node)
    {
        if (node == null) return (0, null);

        var left = Dfs(node.left);
        var right = Dfs(node.right);

        if (left.depth == right.depth) return (left.depth + 1, node);
        return left.depth > right.depth
            ? (left.depth + 1, left.node)
            : (right.depth + 1, right.node);
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(h)` for the recursion stack.
