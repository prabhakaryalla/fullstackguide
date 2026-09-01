# 2236. Root Equals Sum of Children

**Difficulty:** Easy
**Category:** Tree, Binary Tree

## Problem

You are given the `root` of a binary tree that consists of exactly 3 nodes: the root, its left child, and its right child.

Return `true` if the value of the root is equal to the sum of the values of its two children, or `false` otherwise.

### Example

```
Input: root = [10,4,6]
Output: true
Explanation: The values are root=10, left=4, right=6. 10 = 4 + 6, so return true.
```

## Approach

Check if `root.val` equals `root.left.val + root.right.val`.

## C# Solution

```csharp
public class Solution
{
    public bool CheckTree(TreeNode root)
    {
        return root.val == root.left.val + root.right.val;
    }
}
```

## Complexity

- **Time:** O(1).
- **Space:** O(1).
