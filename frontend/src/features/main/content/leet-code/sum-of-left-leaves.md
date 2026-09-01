# 404. Sum of Left Leaves

**Difficulty:** Easy
**Category:** Tree, Depth-First Search, Breadth-First Search, Binary Tree

## Problem

Given the `root` of a binary tree, return the sum of all values of its left leaves (leaf nodes that are the left child of their parent).

### Example

```
Input: root = [3,9,20,null,null,15,7]
Output: 24
Explanation: Left leaves are 9 and 15, summing to 24.
```

### Constraints

- The number of nodes in the tree is in the range `[1, 1000]`.
- `-1000 <= Node.val <= 1000`

## Approach

Recursively traverse the tree, passing along whether the current node is a left child of its parent. When a leaf node is reached and it was reached via a left-child link, add its value to the sum; otherwise, recurse into both children.

## C# Solution

```csharp
public class Solution
{
    public int SumOfLeftLeaves(TreeNode root)
    {
        return Dfs(root, false);
    }

    private int Dfs(TreeNode node, bool isLeft)
    {
        if (node == null) return 0;

        if (node.left == null && node.right == null)
            return isLeft ? node.val : 0;

        return Dfs(node.left, true) + Dfs(node.right, false);
    }
}
```

## Complexity

- **Time:** `O(n)` — every node is visited once.
- **Space:** `O(h)` — recursion depth equal to the tree height.
