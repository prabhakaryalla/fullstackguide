# 958. Check Completeness of a Binary Tree

**Difficulty:** Medium
**Category:** Tree, Breadth-First Search, Binary Tree

## Problem

Given the `root` of a binary tree, return `true` if it is a complete binary tree — every level is fully filled except possibly the last, which is filled from left to right.

### Example

```
Input: root = [1,2,3,4,5,6]
Output: true
```

## Approach

Run a level-order traversal that enqueues `null` markers for missing children instead of skipping them. If a `null` is ever dequeued before all real nodes have been seen, some node after it would leave a "gap," meaning the tree isn't complete.

## C# Solution

```csharp
public class Solution
{
    public bool IsCompleteTree(TreeNode root)
    {
        var queue = new Queue<TreeNode>();
        queue.Enqueue(root);
        bool seenNull = false;

        while (queue.Count > 0)
        {
            var node = queue.Dequeue();

            if (node == null) { seenNull = true; continue; }
            if (seenNull) return false;

            queue.Enqueue(node.left);
            queue.Enqueue(node.right);
        }

        return true;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the queue.
