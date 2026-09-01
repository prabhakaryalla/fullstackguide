# 298. Binary Tree Longest Consecutive Sequence

**Difficulty:** Medium
**Category:** Tree, Depth-First Search, Binary Tree

## Problem

Given the `root` of a binary tree, return the length of the longest consecutive sequence path — a path where consecutive node values increase by 1 and the path follows parent-to-child connections (in either direction, but must go strictly downward).

### Example

```
Input: root = [1,null,3,2,4,null,null,null,5]
Output: 3  (path 3->4->5)
```

## Approach

Perform a depth-first traversal, passing down the length of the consecutive run ending at the parent. At each node, check whether its value continues the parent's run (`node.val == parent.val + 1`); if so, extend the running length, otherwise reset it to 1. Track the maximum length seen across the whole traversal in a shared variable.

## C# Solution

```csharp
public class Solution
{
    private int maxLength = 0;

    public int LongestConsecutive(TreeNode root)
    {
        Dfs(root, null, 0);
        return maxLength;
    }

    private void Dfs(TreeNode node, TreeNode parent, int parentLength)
    {
        if (node == null) return;

        int length = (parent != null && node.val == parent.val + 1) ? parentLength + 1 : 1;
        maxLength = Math.Max(maxLength, length);

        Dfs(node.left, node, length);
        Dfs(node.right, node, length);
    }
}
```

## Complexity

- **Time:** `O(n)` — each node is visited once.
- **Space:** `O(h)` — recursion stack, where `h` is the tree height.
