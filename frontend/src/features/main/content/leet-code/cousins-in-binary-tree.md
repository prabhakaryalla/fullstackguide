# 993. Cousins in Binary Tree

**Difficulty:** Easy
**Category:** Tree, Depth-First Search, Breadth-First Search, Binary Tree

## Problem

Given the `root` of a binary tree with unique values, and two node values `x` and `y`, return `true` if the two nodes are *cousins* — at the same depth but with different parents.

### Example

```
Input: root = [1,2,3,4], x = 4, y = 3
Output: false
```

## Approach

Run a DFS that returns each target value's depth and parent node once found. The two values are cousins exactly when their depths match but their parent references differ.

## C# Solution

```csharp
public class Solution
{
    public bool IsCousins(TreeNode root, int x, int y)
    {
        var xInfo = FindInfo(root, x, 0, null);
        var yInfo = FindInfo(root, y, 0, null);

        return xInfo.depth == yInfo.depth && xInfo.parent != yInfo.parent;
    }

    private (int depth, TreeNode parent) FindInfo(TreeNode node, int val, int depth, TreeNode parent)
    {
        if (node == null) return (-1, null);
        if (node.val == val) return (depth, parent);

        var left = FindInfo(node.left, val, depth + 1, node);
        if (left.depth != -1) return left;

        return FindInfo(node.right, val, depth + 1, node);
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(h)` for the recursion stack.
