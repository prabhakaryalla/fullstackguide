# 865. Smallest Subtree with all the Deepest Nodes

**Difficulty:** Medium
**Category:** Hash Table, Tree, Depth-First Search, Breadth-First Search, Binary Tree

## Problem

Given the `root` of a binary tree, return the smallest subtree that contains all the deepest nodes (nodes with the maximum depth in the tree).

### Example

```
Input: root = [3,5,1,6,2,0,8,null,null,7,4]
Output: [2,7,4]
```

## Approach

Recursively compute, for each subtree, both its maximum depth and the node that represents the smallest subtree containing all deepest nodes within it. If the left and right subtrees have equal depth, the current node itself is the answer (since the deepest nodes are split across both sides, requiring this node as their common ancestor). Otherwise, the deeper side's answer propagates up unchanged, since all deepest nodes lie within that side.

## C# Solution

```csharp
public class Solution
{
    public TreeNode SubtreeWithAllDeepest(TreeNode root)
    {
        return Helper(root).Node;
    }

    private (TreeNode Node, int Depth) Helper(TreeNode node)
    {
        if (node == null) return (null, 0);

        var left = Helper(node.left);
        var right = Helper(node.right);

        if (left.Depth == right.Depth) return (node, left.Depth + 1);
        if (left.Depth > right.Depth) return (left.Node, left.Depth + 1);
        return (right.Node, right.Depth + 1);
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(h)` for the recursion stack, where `h` is the tree height.
