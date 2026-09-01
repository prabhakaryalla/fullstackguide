# 549. Binary Tree Longest Consecutive Sequence II

**Difficulty:** Medium
**Category:** Tree, Depth-First Search, Binary Tree
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given the `root` of a binary tree, return the length of the longest path where the node values form a consecutive sequence, either increasing or decreasing, and the path may go through both a node's left and right children (not necessarily in a single downward direction).

### Example

```
Input: root = [1,2,3]
Output: 2
```

## Approach

For each node, compute via post-order recursion the longest strictly-increasing-downward run and longest strictly-decreasing-downward run starting at that node, based on whether each child's value is exactly one more or one less than the current node's value. A path passing through the current node can combine an increasing run going into one child with a decreasing run going into the other, so track a running maximum of `increasing + decreasing - 1` (subtracting 1 to avoid double-counting the current node) across the whole tree.

## C# Solution

```csharp
public class Solution
{
    private int longest = 0;

    public int LongestConsecutive(TreeNode root)
    {
        Dfs(root);
        return longest;
    }

    private (int Increasing, int Decreasing) Dfs(TreeNode node)
    {
        if (node == null) return (0, 0);

        int increasing = 1, decreasing = 1;

        if (node.left != null)
        {
            var left = Dfs(node.left);

            if (node.left.val == node.val + 1)
                increasing = left.Increasing + 1;
            else if (node.left.val == node.val - 1)
                decreasing = left.Decreasing + 1;
        }

        if (node.right != null)
        {
            var right = Dfs(node.right);

            if (node.right.val == node.val + 1)
                increasing = Math.Max(increasing, right.Increasing + 1);
            else if (node.right.val == node.val - 1)
                decreasing = Math.Max(decreasing, right.Decreasing + 1);
        }

        longest = Math.Max(longest, increasing + decreasing - 1);

        return (increasing, decreasing);
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(h)` for the recursion stack.
