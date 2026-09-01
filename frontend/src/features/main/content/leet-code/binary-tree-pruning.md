# 814. Binary Tree Pruning

**Difficulty:** Medium
**Category:** Tree, Depth-First Search, Binary Tree

## Problem

Given a binary tree where every node has value `0` or `1`, remove every subtree that does not contain a `1`. Return the pruned tree's root.

### Example

```
Input: root = [1,null,0,0,1]
Output: [1,null,0,null,1]
```

## Approach

Recursively prune both children first. After pruning, a node can itself be removed only if both its (already-pruned) children are `null` and its own value is `0` — meaning neither it nor anything below it contains a `1`.

## C# Solution

```csharp
public class Solution
{
    public TreeNode PruneTree(TreeNode root)
    {
        if (root == null) return null;

        root.left = PruneTree(root.left);
        root.right = PruneTree(root.right);

        if (root.left == null && root.right == null && root.val == 0)
            return null;

        return root;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(h)` for the recursion stack, where `h` is the tree height.
