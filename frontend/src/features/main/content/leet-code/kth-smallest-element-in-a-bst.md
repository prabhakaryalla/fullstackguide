# 230. Kth Smallest Element in a BST

**Difficulty:** Medium
**Category:** Tree, Depth-First Search, Binary Search Tree, Binary Tree

## Problem

Given the `root` of a binary search tree and an integer `k`, return the `k`-th smallest value (1-indexed) among all the values of the tree's nodes.

### Example

```
root = [3,1,4,null,2], k = 1 -> 1
root = [5,3,6,2,4,null,null,1], k = 3 -> 3
```

## Approach

An inorder traversal of a BST visits values in ascending order, so the `k`-th value produced by an inorder walk is exactly the answer. Use an iterative inorder traversal with an explicit stack and stop as soon as the `k`-th node has been popped, avoiding the need to traverse the entire tree when `k` is small.

## C# Solution

```csharp
public class Solution
{
    public int KthSmallest(TreeNode root, int k)
    {
        var stack = new Stack<TreeNode>();
        var current = root;

        while (current != null || stack.Count > 0)
        {
            while (current != null)
            {
                stack.Push(current);
                current = current.left;
            }

            current = stack.Pop();
            k--;
            if (k == 0) return current.val;

            current = current.right;
        }

        throw new ArgumentException("k is out of range for the given tree.");
    }
}
```

## Complexity

- **Time:** `O(h + k)` — where `h` is the tree height; descends to the leftmost node, then advances `k` steps.
- **Space:** `O(h)` — for the stack.
