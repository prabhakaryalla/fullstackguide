# 235. Lowest Common Ancestor of a Binary Search Tree

**Difficulty:** Medium
**Category:** Tree, Depth-First Search, Binary Search Tree, Binary Tree

## Problem

Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes `p` and `q` in the BST. The LCA is the lowest node that has both `p` and `q` as descendants (a node can be a descendant of itself).

### Example

```
Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8
Output: 6
```

### Constraints

- The number of nodes is in the range `[2, 10^5]`.
- All node values are unique.
- `p` and `q` both exist in the tree.

## Approach

Exploit the BST ordering property: starting at the root, if both `p.val` and `q.val` are smaller than the current node, the LCA must be in the left subtree; if both are larger, it must be in the right subtree; otherwise the current node is the split point and therefore the LCA.

## C# Solution

```csharp
public class Solution
{
    public TreeNode LowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q)
    {
        var current = root;
        while (current != null)
        {
            if (p.val < current.val && q.val < current.val)
                current = current.left;
            else if (p.val > current.val && q.val > current.val)
                current = current.right;
            else
                return current;
        }

        return null;
    }
}
```

## Complexity

- **Time:** `O(h)` — where `h` is the tree height.
- **Space:** `O(1)` — iterative traversal.
