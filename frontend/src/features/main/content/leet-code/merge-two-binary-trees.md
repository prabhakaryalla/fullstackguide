# 617. Merge Two Binary Trees

**Difficulty:** Easy
**Category:** Tree, Depth-First Search, Breadth-First Search, Binary Tree

## Problem

Given the roots of two binary trees, merge them into a new binary tree where overlapping nodes' values are summed, and non-overlapping nodes are simply carried over from whichever tree has a node at that position.

### Example

```
Input: root1 = [1,3,2,5], root2 = [2,1,3,null,4,null,7]
Output: [3,4,5,5,4,null,7]
```

### Constraints

- The number of nodes in both trees is in the range `[0, 2000]`.

## Approach

Recursively merge the two trees: if either node is `null`, the merged subtree is simply the other tree's corresponding subtree (no merging needed). Otherwise, create a new node with the summed value, and recursively merge the left and right children of both trees to build the merged subtrees.

## C# Solution

```csharp
public class Solution
{
    public TreeNode MergeTrees(TreeNode root1, TreeNode root2)
    {
        if (root1 == null) return root2;
        if (root2 == null) return root1;

        var merged = new TreeNode(root1.val + root2.val);
        merged.left = MergeTrees(root1.left, root2.left);
        merged.right = MergeTrees(root1.right, root2.right);

        return merged;
    }
}
```

## Complexity

- **Time:** `O(min(m, n))`, where `m` and `n` are the node counts of the two trees.
- **Space:** `O(min(m, n))` for the recursion stack.
