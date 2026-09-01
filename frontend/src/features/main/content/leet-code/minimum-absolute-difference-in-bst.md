# 530. Minimum Absolute Difference in BST

**Difficulty:** Easy
**Category:** Tree, Depth-First Search, Binary Search Tree, Binary Tree

## Problem

Given the `root` of a binary search tree, return the minimum absolute difference between the values of any two different nodes in the tree.

### Example

```
Input: root = [4,2,6,1,3]
Output: 1
```

### Constraints

- The number of nodes is in the range `[2, 10^4]`.
- `0 <= Node.val <= 10^5`

## Approach

An in-order traversal of a BST visits values in sorted order, so the minimum difference between any two nodes must occur between two *consecutive* values in that traversal. Track the previously visited value during the traversal and update a running minimum difference against each newly visited value.

## C# Solution

```csharp
public class Solution
{
    private int minDiff = int.MaxValue;
    private int? previousVal = null;

    public int GetMinimumDifference(TreeNode root)
    {
        InorderTraversal(root);
        return minDiff;
    }

    private void InorderTraversal(TreeNode node)
    {
        if (node == null) return;

        InorderTraversal(node.left);

        if (previousVal.HasValue)
            minDiff = Math.Min(minDiff, node.val - previousVal.Value);

        previousVal = node.val;

        InorderTraversal(node.right);
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(h)` for the recursion stack.
