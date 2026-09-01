# 250. Count Univalue Subtrees

**Difficulty:** Medium
**Category:** Tree, Depth-First Search, Binary Tree

## Problem

Given the `root` of a binary tree, count the number of uni-value subtrees. A uni-value subtree means all nodes of the subtree have the same value.

### Example

```
Input: root = [5,1,5,5,5,null,5]
Output: 4
```

### Constraints

- The number of nodes is in the range `[0, 1000]`.
- `-1000 <= Node.val <= 1000`

## Approach

Use post-order recursion: a subtree rooted at `node` is uni-value only if both its left and right subtrees are uni-value *and* their values (if the respective child exists) match `node.val`. Increment a running counter whenever a node satisfies this condition, and propagate a boolean up so the parent can decide its own status.

## C# Solution

```csharp
public class Solution
{
    private int count = 0;

    public int CountUnivalSubtrees(TreeNode root)
    {
        IsUnivalue(root);
        return count;
    }

    private bool IsUnivalue(TreeNode node)
    {
        if (node == null) return true;

        bool leftUnival = IsUnivalue(node.left);
        bool rightUnival = IsUnivalue(node.right);

        if (!leftUnival || !rightUnival) return false;
        if (node.left != null && node.left.val != node.val) return false;
        if (node.right != null && node.right.val != node.val) return false;

        count++;
        return true;
    }
}
```

## Complexity

- **Time:** `O(n)` — each node is visited once.
- **Space:** `O(h)` — recursion stack, where `h` is the tree height.
