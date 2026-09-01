# 1008. Construct Binary Search Tree from Preorder Traversal

**Difficulty:** Medium
**Category:** Array, Binary Search Tree, Stack, Tree, Binary Tree

## Problem

Given an array `preorder` representing the preorder traversal of a binary search tree, construct the tree and return its root.

### Example

```
Input: preorder = [8,5,1,7,10,12]
Output: [8,5,10,1,7,null,12]
```

## Approach

Walk the array once with a shared cursor and an upper `bound` for valid values at the current position. Each call consumes `preorder[index]` as the current subtree's root (as long as it doesn't exceed `bound`), then recursively builds the left subtree bounded by the new root's value, followed by the right subtree still bounded by the original `bound`. Because the input is a valid BST preorder, this single pass correctly reconstructs the tree without needing to search for split points.

## C# Solution

```csharp
public class Solution
{
    public TreeNode BstFromPreorder(int[] preorder)
    {
        int index = 0;
        return Build(preorder, ref index, int.MaxValue);
    }

    private TreeNode Build(int[] preorder, ref int index, int bound)
    {
        if (index == preorder.Length || preorder[index] > bound) return null;

        var node = new TreeNode(preorder[index++]);
        node.left = Build(preorder, ref index, node.val);
        node.right = Build(preorder, ref index, bound);
        return node;
    }
}
```

## Complexity

- **Time:** `O(n)` — every array element is consumed exactly once.
- **Space:** `O(n)` for the recursion stack in the worst case (skewed tree).
