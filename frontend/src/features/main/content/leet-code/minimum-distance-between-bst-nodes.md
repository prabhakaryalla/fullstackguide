# 783. Minimum Distance Between BST Nodes

**Difficulty:** Easy
**Category:** Tree, Depth-First Search, Binary Search Tree, Binary Tree

## Problem

Given the `root` of a binary search tree, return the minimum absolute difference between the values of any two distinct nodes.

### Example

```
Input: root = [4,2,6,1,3]
Output: 1
```

## Approach

An in-order traversal of a BST visits nodes in strictly increasing value order, so the minimum difference between any two nodes must occur between two consecutive nodes in that traversal. Perform an in-order traversal while tracking the previously visited node, updating the minimum difference against the current node's value at each step.

## C# Solution

```csharp
public class Solution
{
    private int minDiff = int.MaxValue;
    private TreeNode prev = null;

    public int MinDiffInBST(TreeNode root)
    {
        InOrder(root);
        return minDiff;
    }

    private void InOrder(TreeNode node)
    {
        if (node == null) return;

        InOrder(node.left);

        if (prev != null)
            minDiff = Math.Min(minDiff, node.val - prev.val);

        prev = node;

        InOrder(node.right);
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(h)` for the recursion stack, where `h` is the tree height.
