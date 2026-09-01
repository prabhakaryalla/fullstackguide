# 236. Lowest Common Ancestor of a Binary Tree

**Difficulty:** Medium
**Category:** Tree, Depth-First Search, Binary Tree

## Problem

Given a binary tree, find the lowest common ancestor (LCA) of two given nodes `p` and `q`. The LCA is the lowest node that has both `p` and `q` as descendants (a node can be a descendant of itself).

### Example

```
Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
Output: 3
```

### Constraints

- The number of nodes is in the range `[2, 10^5]`.
- All node values are unique.
- `p` and `q` both exist in the tree.

## Approach

Recurse into both subtrees. If the current node is `null` or equals `p` or `q`, return it immediately. Otherwise, recurse left and right; if both sides return a non-null result, the current node is the LCA (because `p` and `q` were found on different sides). If only one side is non-null, propagate that result upward.

## C# Solution

```csharp
public class Solution
{
    public TreeNode LowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q)
    {
        if (root == null || root == p || root == q) return root;

        var left = LowestCommonAncestor(root.left, p, q);
        var right = LowestCommonAncestor(root.right, p, q);

        if (left != null && right != null) return root;
        return left ?? right;
    }
}
```

## Complexity

- **Time:** `O(n)` — every node may be visited once.
- **Space:** `O(h)` — recursion stack, where `h` is the tree height.
