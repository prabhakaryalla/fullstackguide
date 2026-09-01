# 2773. Height of Special Binary Tree

**Difficulty:** Medium
**Category:** Tree, Depth-First Search, Binary Tree
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
You are given the root of a special binary tree in which every node value is unique and the nodes structurally satisfy the binary-search-tree property, except that for any given node it is not guaranteed which of its two children is stored as `left` versus `right` (the smaller-valued child may be stored as `node.right` and the larger-valued child as `node.left`). Return the height of the tree, defined as the number of edges on the longest path from the root down to a leaf (a tree containing only the root has height `0`).

### Example
```
Input: root = [2,1,3]
Output: 1
```

## Approach
Height depends only on parent/child structure, not on which pointer (`left` or `right`) a child happens to be stored under. Recurse into both children of a node and take one plus the height of the deeper subtree, treating a `null` child as height `-1`, regardless of value ordering between the children.

## C# Solution

```csharp
public class TreeNode
{
    public int val;
    public TreeNode left;
    public TreeNode right;
    public TreeNode(int val = 0, TreeNode left = null, TreeNode right = null)
    {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

public class Solution
{
    public int HeightOfTree(TreeNode root)
    {
        if (root == null)
        {
            return -1;
        }

        return 1 + Math.Max(HeightOfTree(root.left), HeightOfTree(root.right));
    }
}
```

## Complexity

- **Time:** O(n).
- **Space:** O(h) recursion stack, where h is the tree's height.
