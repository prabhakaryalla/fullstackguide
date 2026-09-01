# 222. Count Complete Tree Nodes

**Difficulty:** Easy
**Category:** Binary Search, Bit Manipulation, Tree, Binary Tree

## Problem

Given the `root` of a complete binary tree (every level is fully filled except possibly the last, which fills left to right), return the number of nodes, faster than `O(n)`.

### Example

```
root = [1,2,3,4,5,6] -> 6
```

## Approach

Measure the "leftmost height" and "rightmost height" of the current subtree (always following left children / always following right children). If they're equal, the subtree is a perfect binary tree, so its node count is `2^height - 1` — no need to recurse further. Otherwise, recurse into both children and add 1 for the current node; because the tree is complete, at least one side collapses into the perfect-tree shortcut at every level, keeping the total work logarithmic-squared rather than linear.

## C# Solution

```csharp
public class Solution
{
    public int CountNodes(TreeNode root)
    {
        if (root == null) return 0;

        int leftHeight = GetLeftHeight(root);
        int rightHeight = GetRightHeight(root);

        if (leftHeight == rightHeight)
        {
            return (1 << leftHeight) - 1;
        }

        return 1 + CountNodes(root.left) + CountNodes(root.right);
    }

    private int GetLeftHeight(TreeNode node)
    {
        int height = 0;
        while (node != null) { height++; node = node.left; }
        return height;
    }

    private int GetRightHeight(TreeNode node)
    {
        int height = 0;
        while (node != null) { height++; node = node.right; }
        return height;
    }
}
```

## Complexity

- **Time:** `O(log^2 n)` — `O(log n)` levels of recursion, each doing `O(log n)` height checks.
- **Space:** `O(log n)` — recursion depth.
