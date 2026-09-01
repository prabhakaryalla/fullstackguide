# 572. Subtree of Another Tree

**Difficulty:** Easy
**Category:** Tree, Depth-First Search, String Matching, Binary Tree, Hash Function

## Problem

Given the roots of two binary trees `root` and `subRoot`, return `true` if there is a subtree of `root` with the same structure and node values as `subRoot`.

### Example

```
Input: root = [3,4,5,1,2], subRoot = [4,1,2]
Output: true
```

### Constraints

- The number of nodes in `root` is in the range `[1, 2000]`.
- The number of nodes in `subRoot` is in the range `[1, 1000]`.

## Approach

For every node in `root`, check whether the subtree rooted there is structurally identical to `subRoot` using a standard recursive "same tree" comparison. If any node's subtree matches, return `true`; otherwise recurse into the left and right children of `root` to keep searching.

## C# Solution

```csharp
public class Solution
{
    public bool IsSubtree(TreeNode root, TreeNode subRoot)
    {
        if (root == null) return subRoot == null;

        if (IsSameTree(root, subRoot)) return true;

        return IsSubtree(root.left, subRoot) || IsSubtree(root.right, subRoot);
    }

    private bool IsSameTree(TreeNode a, TreeNode b)
    {
        if (a == null && b == null) return true;
        if (a == null || b == null || a.val != b.val) return false;

        return IsSameTree(a.left, b.left) && IsSameTree(a.right, b.right);
    }
}
```

## Complexity

- **Time:** `O(m * n)`, where `m` and `n` are the node counts of `root` and `subRoot`.
- **Space:** `O(h)` for the recursion stack.
