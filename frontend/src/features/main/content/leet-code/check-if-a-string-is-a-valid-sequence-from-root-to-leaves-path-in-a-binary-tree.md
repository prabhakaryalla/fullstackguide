# 1430. Check If a String Is a Valid Sequence from Root to Leaves Path in a Binary Tree

**Difficulty:** Medium
**Category:** Tree, Depth-First Search, Binary Tree

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given the `root` of a binary tree and an array `arr`, return `true` if `arr` represents a valid root-to-**leaf** path in the tree — meaning the node values along a path from the root to some leaf match `arr` exactly, in order, with the leaf reached exactly at the last element of `arr`.

## Approach

Perform a depth-first search, comparing the current node's value against `arr` at the current index. If a mismatch occurs, or the tree path ends before consuming all of `arr`, the sequence is invalid. If a leaf node is reached, the sequence is only valid if this leaf corresponds exactly to the last index of `arr`. Otherwise, recurse into both children with the next index and succeed if either branch matches.

## C# Solution

```csharp
public class Solution
{
    public bool IsValidSequence(TreeNode root, int[] arr)
    {
        return Dfs(root, arr, 0);
    }

    private bool Dfs(TreeNode node, int[] arr, int index)
    {
        if (node == null || index >= arr.Length || node.val != arr[index])
            return false;

        bool isLeaf = node.left == null && node.right == null;
        if (isLeaf) return index == arr.Length - 1;

        return Dfs(node.left, arr, index + 1) || Dfs(node.right, arr, index + 1);
    }
}
```

## Complexity

- **Time:** `O(n)` in the worst case, visiting each node once.
- **Space:** `O(h)` for the recursion stack, where `h` is the tree height.
