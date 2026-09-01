# 671. Second Minimum Node In a Binary Tree

**Difficulty:** Easy
**Category:** Tree, Depth-First Search, Binary Tree

## Problem

Given a binary tree where every node has either 0 or 2 children, and each parent node's value is the minimum of its two children's values, return the second minimum value in the tree, or `-1` if it doesn't exist.

### Example

```
Input: root = [2,2,5,null,null,5,7]
Output: 5
```

### Constraints

- The number of nodes is in the range `[1, 25]`.

## Approach

The root always holds the overall minimum value (by the tree's given property). Recursively search for the smallest value strictly greater than the root's value: if a node's value already exceeds the root, it's a valid candidate and no need to search deeper; otherwise (the node still equals the minimum), recurse into both children and take the smaller of their results.

## C# Solution

```csharp
public class Solution
{
    public int FindSecondMinimumValue(TreeNode root)
    {
        long secondMin = Dfs(root, root.val);
        return secondMin == long.MaxValue ? -1 : (int)secondMin;
    }

    private long Dfs(TreeNode node, int rootVal)
    {
        if (node == null) return long.MaxValue;

        if (node.val > rootVal) return node.val;

        long left = Dfs(node.left, rootVal);
        long right = Dfs(node.right, rootVal);

        return Math.Min(left, right);
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(h)` for the recursion stack.
