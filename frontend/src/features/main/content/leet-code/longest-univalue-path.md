# 687. Longest Univalue Path

**Difficulty:** Medium
**Category:** Tree, Depth-First Search, Binary Tree

## Problem

Given the `root` of a binary tree, return the length (in edges) of the longest path where every node in the path has the same value. The path may or may not pass through the root.

### Example

```
Input: root = [5,4,5,1,1,null,5]
Output: 2
```

### Constraints

- The number of nodes is in the range `[0, 10^4]`.

## Approach

Use post-order recursion to compute, for each node, the length of the longest downward same-valued path starting at that node. At each node, check whether its left and/or right child share its value; if so, that child's downward path can be extended through the current node. A path passing through the current node can combine both the left and right extensions (if both children match), so track a running maximum of that combined length across the whole tree, while returning only the single longer branch upward (since a path continuing further up can only use one direction).

## C# Solution

```csharp
public class Solution
{
    private int longestPath = 0;

    public int LongestUnivaluePath(TreeNode root)
    {
        Dfs(root);
        return longestPath;
    }

    private int Dfs(TreeNode node)
    {
        if (node == null) return 0;

        int leftLength = Dfs(node.left);
        int rightLength = Dfs(node.right);

        int leftPath = 0, rightPath = 0;

        if (node.left != null && node.left.val == node.val)
            leftPath = leftLength + 1;

        if (node.right != null && node.right.val == node.val)
            rightPath = rightLength + 1;

        longestPath = Math.Max(longestPath, leftPath + rightPath);

        return Math.Max(leftPath, rightPath);
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(h)` for the recursion stack.
