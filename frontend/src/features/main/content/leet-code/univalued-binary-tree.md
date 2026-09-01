# 965. Univalued Binary Tree

**Difficulty:** Easy
**Category:** Tree, Depth-First Search, Breadth-First Search, Binary Tree

## Problem

A binary tree is *univalued* if every node has the same value. Given the `root`, return whether it is univalued.

### Example

```
Input: root = [1,1,1,1,1,null,1]
Output: true
```

## Approach

Recursively check that every node's value equals the root's value, short-circuiting on the first mismatch.

## C# Solution

```csharp
public class Solution
{
    public bool IsUnivalTree(TreeNode root) => Check(root, root.val);

    private bool Check(TreeNode node, int val)
    {
        if (node == null) return true;
        if (node.val != val) return false;

        return Check(node.left, val) && Check(node.right, val);
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(h)` for the recursion stack.
