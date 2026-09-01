# 951. Flip Equivalent Binary Trees

**Difficulty:** Medium
**Category:** Tree, Depth-First Search, Binary Tree

## Problem

Two binary trees are *flip equivalent* if one can be transformed into the other by flipping any number of nodes' left and right children. Given the roots of two binary trees, return whether they are flip equivalent.

### Example

```
Input: root1 = [1,2,3,4,5,6,null,null,null,7,8], root2 = [1,3,2,null,6,4,5,null,null,null,null,8,7]
Output: true
```

## Approach

Recursively compare node values, then check both possible matchings of children: either the children align directly (left-with-left, right-with-right) or they align flipped (left-with-right, right-with-left). The trees are equivalent if either matching recursively holds.

## C# Solution

```csharp
public class Solution
{
    public bool FlipEquiv(TreeNode root1, TreeNode root2)
    {
        if (root1 == null && root2 == null) return true;
        if (root1 == null || root2 == null || root1.val != root2.val) return false;

        return (FlipEquiv(root1.left, root2.left) && FlipEquiv(root1.right, root2.right)) ||
               (FlipEquiv(root1.left, root2.right) && FlipEquiv(root1.right, root2.left));
    }
}
```

## Complexity

- **Time:** `O(min(n1, n2))`.
- **Space:** `O(min(h1, h2))` for the recursion stack.
