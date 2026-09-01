# 669. Trim a Binary Search Tree

**Difficulty:** Medium
**Category:** Tree, Depth-First Search, Binary Search Tree, Binary Tree

## Problem

Given the `root` of a binary search tree and boundary values `low` and `high`, trim the tree so that all its elements lie within `[low, high]`, and return the root of the trimmed tree (which may require reattaching subtrees to maintain BST validity).

### Example

```
Input: root = [3,0,4,null,2,null,null,1], low = 1, high = 3
Output: [3,2,null,1]
```

### Constraints

- The number of nodes is in the range `[1, 10^4]`.

## Approach

If a node's value is below `low`, the entire node and its left subtree are out of range, so recurse only into its right subtree and return that result directly (skipping the current node). Symmetrically, if the value is above `high`, recurse only into the left subtree. Otherwise, the node itself is valid, so recursively trim both its children and keep the node.

## C# Solution

```csharp
public class Solution
{
    public TreeNode TrimBST(TreeNode root, int low, int high)
    {
        if (root == null) return null;

        if (root.val < low) return TrimBST(root.right, low, high);
        if (root.val > high) return TrimBST(root.left, low, high);

        root.left = TrimBST(root.left, low, high);
        root.right = TrimBST(root.right, low, high);

        return root;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(h)` for the recursion stack.
