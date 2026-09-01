# 333. Largest BST Subtree

**Difficulty:** Medium
**Category:** Tree, Depth-First Search, Binary Search Tree, Dynamic Programming, Binary Tree
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given the `root` of a binary tree, find the largest subtree that is also a valid binary search tree, and return the size of that subtree (the number of nodes in it).

### Example

```
Input: root = [10,5,15,1,8,null,7]
Output: 3
Explanation: The largest BST subtree is [5,1,8] (or [1,5,8]), of size 3.
```

### Constraints

- The number of nodes is in the range `[0, 10^4]`.
- `-10^4 <= Node.val <= 10^4`

## Approach

Use post-order recursion returning, for each subtree, whether it is a valid BST along with its size, minimum value, and maximum value. A subtree rooted at `node` is a valid BST exactly when both children's subtrees are valid BSTs and `node`'s value fits strictly between the left subtree's max and the right subtree's min. Track the largest valid BST size seen across the whole traversal.

## C# Solution

```csharp
public class Solution
{
    private int largestSize = 0;

    public int LargestBSTSubtree(TreeNode root)
    {
        Dfs(root);
        return largestSize;
    }

    private (int Size, int Min, int Max, bool IsBst) Dfs(TreeNode node)
    {
        if (node == null) return (0, int.MaxValue, int.MinValue, true);

        var left = Dfs(node.left);
        var right = Dfs(node.right);

        if (left.IsBst && right.IsBst && node.val > left.Max && node.val < right.Min)
        {
            int size = left.Size + right.Size + 1;
            largestSize = Math.Max(largestSize, size);

            return (size, Math.Min(node.val, left.Min), Math.Max(node.val, right.Max), true);
        }

        return (0, 0, 0, false);
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(h)` for the recursion stack.
