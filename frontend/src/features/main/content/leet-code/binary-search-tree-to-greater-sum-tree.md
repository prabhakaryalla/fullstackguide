# 1038. Binary Search Tree to Greater Sum Tree

**Difficulty:** Medium
**Category:** Tree, Depth-First Search, Binary Search Tree, Binary Tree

## Problem

Given the `root` of a binary search tree, convert it so every node's value becomes the original value plus the sum of all values greater than it in the original tree, then return the modified tree's root.

### Example

```
Input: root = [4,1,6,0,2,5,7,null,null,null,3,null,null,null,8]
Output: [30,36,21,36,35,26,15,null,null,null,33,null,null,null,8]
```

## Approach

A reverse in-order traversal (right subtree, then node, then left subtree) visits BST nodes in strictly descending value order. Keep a running total of values visited so far; at each node, add its original value to the running total, then overwrite the node's value with that updated total, since it now represents the original value plus every larger value already seen.

## C# Solution

```csharp
public class Solution
{
    private int _sum = 0;

    public TreeNode BstToGst(TreeNode root)
    {
        if (root == null) return null;

        BstToGst(root.right);
        _sum += root.val;
        root.val = _sum;
        BstToGst(root.left);

        return root;
    }
}
```

## Complexity

- **Time:** `O(n)` — every node is visited once.
- **Space:** `O(h)` recursion depth equal to the tree height.
