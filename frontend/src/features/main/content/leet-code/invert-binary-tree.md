# 226. Invert Binary Tree

**Difficulty:** Easy
**Category:** Tree, Depth-First Search, Breadth-First Search, Binary Tree

## Problem

Given the `root` of a binary tree, invert the tree (swap every node's left and right children), and return its root.

### Example

```
root = [4,2,7,1,3,6,9] -> [4,7,2,9,6,3,1]
```

## Approach

Recursively swap each node's left and right children, then recurse into both (now-swapped) children to invert the rest of the tree. The order of "swap then recurse" vs. "recurse then swap" doesn't matter here since the whole subtree gets inverted either way.

## C# Solution

```csharp
public class Solution
{
    public TreeNode InvertTree(TreeNode root)
    {
        if (root == null) return null;

        (root.left, root.right) = (InvertTree(root.right), InvertTree(root.left));

        return root;
    }
}
```

## Complexity

- **Time:** `O(n)` — every node is visited once.
- **Space:** `O(h)` — recursion depth equal to the tree height.
