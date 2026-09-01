# 513. Find Bottom Left Tree Value

**Difficulty:** Medium
**Category:** Tree, Depth-First Search, Breadth-First Search, Binary Tree

## Problem

Given the `root` of a binary tree, return the leftmost value in the last row of the tree.

### Example

```
Input: root = [2,1,3]
Output: 1
```

### Constraints

- The number of nodes is in the range `[1, 10^4]`.
- `-2^31 <= Node.val <= 2^31 - 1`

## Approach

Perform a level-order (breadth-first) traversal, recording the value of the first node dequeued at each level (the leftmost node of that level) before enqueuing the level's children. After processing every level, the last recorded leftmost value belongs to the final, deepest row.

## C# Solution

```csharp
public class Solution
{
    public int FindBottomLeftValue(TreeNode root)
    {
        var queue = new Queue<TreeNode>();
        queue.Enqueue(root);
        int leftmost = root.val;

        while (queue.Count > 0)
        {
            int levelSize = queue.Count;
            leftmost = queue.Peek().val;

            for (int i = 0; i < levelSize; i++)
            {
                var node = queue.Dequeue();
                if (node.left != null) queue.Enqueue(node.left);
                if (node.right != null) queue.Enqueue(node.right);
            }
        }

        return leftmost;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the queue.
