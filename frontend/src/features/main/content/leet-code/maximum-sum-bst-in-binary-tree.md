# 1373. Maximum Sum BST in Binary Tree

**Difficulty:** Hard
**Category:** Dynamic Programming, Tree, Depth-First Search, Binary Search Tree, Binary Tree

## Problem

Given the `root` of a binary tree, find the maximum sum of values across all subtrees that are valid binary search trees, or `0` if none exist.

### Example

```
Input: root = [4,3,null,1,2]
Output: 2
```

## Approach

Traverse the tree post-order, returning from each node whether its subtree is a valid BST along with its minimum value, maximum value, and sum. A node forms a valid BST if both children are valid BSTs (or absent) and the node's value is strictly greater than the left subtree's max and strictly less than the right subtree's min. Whenever a valid BST subtree is found, update a running best-sum answer.

## C# Solution

```csharp
public class Solution
{
    private int best = 0;

    public int MaxSumBST(TreeNode root)
    {
        Dfs(root);
        return best;
    }

    // Returns (isBst, minVal, maxVal, sum)
    private (bool isBst, int min, int max, int sum) Dfs(TreeNode node)
    {
        if (node == null) return (true, int.MaxValue, int.MinValue, 0);

        var left = Dfs(node.left);
        var right = Dfs(node.right);

        bool isBst = left.isBst && right.isBst && node.val > left.max && node.val < right.min;

        if (isBst)
        {
            int sum = node.val + left.sum + right.sum;
            best = Math.Max(best, sum);
            int min = Math.Min(node.val, left.min);
            int max = Math.Max(node.val, right.max);
            return (true, min, max, sum);
        }

        return (false, 0, 0, 0);
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(h)` for the recursion stack.
