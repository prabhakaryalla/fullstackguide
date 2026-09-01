# 1666. Change the Root of a Binary Tree

**Difficulty:** Medium
**Category:** Tree, Depth-First Search, Binary Tree

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given the root of a binary tree where each `Node` also has a `parent` pointer, and a `leaf` node reference, re-root the tree so that `leaf` becomes the new root while preserving every parent-child relationship's structure (just flipped along the path from the old root to `leaf`). Return the new root.

### Example

```
Input: root = [3,5,1,6,2,0,8,null,null,7,4], leaf = 7
Output: [7,2,null,5,4]
```

## Approach

Recursively flip the path from `leaf` up to the root: for a node with a parent, first recursively flip everything from the parent upward (fixing the ancestors above first), then invert this one link — detach `leaf` from its old parent's child slot, and attach the old parent as `leaf`'s new left child, clearing the now-obsolete `parent` reference. The base case is reaching the original root (`parent == null`), which is simply returned as-is (its flipping happens as the recursive calls unwind back down toward `leaf`).

## C# Solution

```csharp
public class Solution
{
    public Node FlipBinaryTree(Node root, Node leaf)
    {
        if (leaf.parent == null)
        {
            return leaf;
        }

        Node parent = leaf.parent;
        FlipBinaryTree(root, parent);

        if (parent.left == leaf)
        {
            parent.left = null;
        }
        else
        {
            parent.right = null;
        }

        leaf.left = parent;
        parent.parent = leaf;
        leaf.parent = null;

        return leaf;
    }
}
```

## Complexity

- **Time:** `O(h)`, where `h` is the depth of `leaf`.
- **Space:** `O(h)` recursion depth.
