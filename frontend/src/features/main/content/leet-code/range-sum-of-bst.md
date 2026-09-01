# 938. Range Sum of BST

**Difficulty:** Easy
**Category:** Tree, Depth-First Search, Binary Search Tree, Binary Tree

## Problem

Given the `root` of a binary search tree and a range `[low, high]`, return the sum of values of all nodes with a value in that inclusive range.

### Example

```
Input: root = [10,5,15,3,7,null,18], low = 7, high = 15
Output: 32
```

## Approach

Exploit the BST ordering: if the current node's value is below `low`, only its right subtree can contain qualifying values; if above `high`, only its left subtree can. Otherwise the node itself counts, and both subtrees must be checked.

## C# Solution

```csharp
public class Solution
{
    public int RangeSumBST(TreeNode root, int low, int high)
    {
        if (root == null) return 0;
        if (root.val < low) return RangeSumBST(root.right, low, high);
        if (root.val > high) return RangeSumBST(root.left, low, high);

        return root.val + RangeSumBST(root.left, low, high) + RangeSumBST(root.right, low, high);
    }
}
```

## Complexity

- **Time:** `O(n)` worst case, faster in practice by pruning subtrees out of range.
- **Space:** `O(h)` for the recursion stack.
