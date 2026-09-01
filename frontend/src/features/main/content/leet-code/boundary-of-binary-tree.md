# 545. Boundary of Binary Tree

**Difficulty:** Medium
**Category:** Tree, Depth-First Search, Binary Tree
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given the `root` of a binary tree, return the values of its boundary in anticlockwise order, starting with the root: the left boundary (excluding leaves), then all leaves left to right, then the right boundary in reverse (excluding leaves), without duplicating shared nodes.

### Example

```
Input: root = [1,2,3,4,5,6,null,null,null,7,8,9,10]
Output: [1,2,4,7,8,9,10,6,3]
```

## Approach

Handle the boundary in three separate parts. Walk down the left side (from the root's left child), always preferring the left child but falling back to the right child if needed, adding each non-leaf node encountered. Separately collect every leaf node via a plain pre-order traversal. Finally walk down the right side symmetrically (preferring right, falling back to left), collecting non-leaf nodes into a temporary list that gets reversed before appending, since the right boundary must be listed bottom-up.

## C# Solution

```csharp
public class Solution
{
    public IList<int> BoundaryOfBinaryTree(TreeNode root)
    {
        var result = new List<int>();
        if (root == null) return result;

        if (!IsLeaf(root))
            result.Add(root.val);

        AddLeftBoundary(root.left, result);
        AddLeaves(root, result);
        AddRightBoundary(root.right, result);

        return result;
    }

    private bool IsLeaf(TreeNode node) => node.left == null && node.right == null;

    private void AddLeftBoundary(TreeNode node, List<int> result)
    {
        while (node != null && !IsLeaf(node))
        {
            result.Add(node.val);
            node = node.left ?? node.right;
        }
    }

    private void AddRightBoundary(TreeNode node, List<int> result)
    {
        var stack = new List<int>();

        while (node != null && !IsLeaf(node))
        {
            stack.Add(node.val);
            node = node.right ?? node.left;
        }

        for (int i = stack.Count - 1; i >= 0; i--)
            result.Add(stack[i]);
    }

    private void AddLeaves(TreeNode node, List<int> result)
    {
        if (node == null) return;

        if (IsLeaf(node))
        {
            result.Add(node.val);
            return;
        }

        AddLeaves(node.left, result);
        AddLeaves(node.right, result);
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(h)` for the recursion stack.
