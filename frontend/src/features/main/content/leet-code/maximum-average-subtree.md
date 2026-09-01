# 1120. Maximum Average Subtree

**Difficulty:** Medium
**Category:** Tree, Depth-First Search, Binary Tree

> **Note:** This problem is part of LeetCode's premium subscription.

## Problem

Given the root of a binary tree, find the maximum average value of any subtree, where a subtree's average is its sum of node values divided by its number of nodes.

### Example

```
Input: root = [5,6,1]
Output: 6.00000
```

## Approach

Perform a post-order DFS that returns both the sum and node count of each subtree. At every node, compute the sum and count from its left and right subtrees plus itself, update a running maximum average using that subtree's `sum / count`, and propagate the sum and count upward.

## C# Solution

```csharp
public class Solution
{
    private double maxAverage = double.MinValue;

    public double MaximumAverageSubtree(TreeNode root)
    {
        Dfs(root);
        return maxAverage;
    }

    private (int sum, int count) Dfs(TreeNode node)
    {
        if (node == null) return (0, 0);

        var left = Dfs(node.left);
        var right = Dfs(node.right);
        int sum = left.sum + right.sum + node.val;
        int count = left.count + right.count + 1;

        maxAverage = Math.Max(maxAverage, (double)sum / count);
        return (sum, count);
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(h)` for the recursion stack.
