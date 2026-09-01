# 776. Split BST

**Difficulty:** Medium
**Category:** Tree, Binary Search Tree, Binary Tree
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given the `root` of a binary search tree and an integer `target`, split the tree into two BSTs: one containing all values `<= target` and the other containing all values `> target`. The original tree structure should be preserved as much as possible. Return both resulting roots.

### Example

```
Input: root = [4,2,6,1,3,5,7], target = 2
Output: [[2,1],[4,3,6,null,null,5,7]]
```

## Approach

Recurse on the tree: if the current node's value is `<= target`, it (and its entire left subtree) belongs to the "smaller-or-equal" tree, so recursively split its right subtree and attach the resulting "smaller-or-equal" part back as this node's right child, while the resulting "greater" part becomes the split-off greater tree. Symmetrically, if the current node's value is `> target`, it (and its right subtree) belongs to the "greater" tree, so recursively split its left subtree instead.

## C# Solution

```csharp
public class Solution
{
    public TreeNode[] SplitBST(TreeNode root, int target)
    {
        if (root == null) return new TreeNode[] { null, null };

        if (root.val <= target)
        {
            var split = SplitBST(root.right, target);
            root.right = split[0];
            return new TreeNode[] { root, split[1] };
        }
        else
        {
            var split = SplitBST(root.left, target);
            root.left = split[1];
            return new TreeNode[] { split[0], root };
        }
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(h)` for the recursion stack, where `h` is the tree height.
