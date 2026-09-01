# 889. Construct Binary Tree from Preorder and Postorder Traversal

**Difficulty:** Medium
**Category:** Array, Hash Table, Tree, Depth-First Search, Binary Tree

## Problem

Given two integer arrays `preorder` and `postorder` representing the preorder and postorder traversals of a binary tree with distinct values (where every node has 0 or 2 children), reconstruct and return any valid such tree.

### Example

```
Input: preorder = [1,2,4,5,3,6,7], postorder = [4,5,2,6,7,3,1]
Output: [1,2,3,4,5,6,7]
```

## Approach

The first element of `preorder` is always the current subtree's root, and the last element of the corresponding `postorder` range is also that root. The element right after the root in `preorder` is the root of the left subtree; locating its position in `postorder` reveals exactly where the left subtree's postorder range ends. Recurse to build the left subtree over that range, then recurse to build the right subtree over the remaining range (excluding the current root's own position at the end of the range). A shared, precomputed value-to-index map for `postorder` and a mutable pointer into `preorder` (advanced as each node is consumed) make this efficient.

## C# Solution

```csharp
public class Solution
{
    public TreeNode ConstructFromPrePost(int[] preorder, int[] postorder)
    {
        int n = preorder.Length;
        var postIndexOf = new Dictionary<int, int>();
        for (int i = 0; i < n; i++) postIndexOf[postorder[i]] = i;

        int preIndex = 0;
        return Build(preorder, postIndexOf, ref preIndex, 0, n - 1);
    }

    private TreeNode Build(int[] preorder, Dictionary<int, int> postIndexOf, ref int preIndex, int postStart, int postEnd)
    {
        var root = new TreeNode(preorder[preIndex]);
        preIndex++;

        if (postStart == postEnd) return root;

        int leftRootVal = preorder[preIndex];
        int leftRootPostIndex = postIndexOf[leftRootVal];

        root.left = Build(preorder, postIndexOf, ref preIndex, postStart, leftRootPostIndex);

        if (leftRootPostIndex < postEnd - 1)
            root.right = Build(preorder, postIndexOf, ref preIndex, leftRootPostIndex + 1, postEnd - 1);

        return root;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the index map and recursion stack.
