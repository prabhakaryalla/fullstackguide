# 662. Maximum Width of Binary Tree

**Difficulty:** Medium
**Category:** Tree, Depth-First Search, Breadth-First Search, Binary Tree

## Problem

Given the `root` of a binary tree, return the maximum width of the tree — the maximum number of nodes between the leftmost and rightmost non-null nodes at any level, counting the null positions in between as if they were present in a complete binary tree layout.

### Example

```
Input: root = [1,3,2,5,3,null,9]
Output: 4
```

### Constraints

- The number of nodes is in the range `[1, 3000]`.

## Approach

Assign each node a positional index as if the tree were a complete binary tree (root at index 0, left child at `2*index`, right child at `2*index + 1`). Perform a level-order traversal, tracking the index of the first and last node dequeued at each level; the width of that level is the difference between those indices plus one. Track the maximum width across all levels.

## C# Solution

```csharp
public class Solution
{
    public int WidthOfBinaryTree(TreeNode root)
    {
        var queue = new Queue<(TreeNode Node, long Index)>();
        queue.Enqueue((root, 0));
        int maxWidth = 0;

        while (queue.Count > 0)
        {
            int levelSize = queue.Count;
            long first = 0, last = 0;

            for (int i = 0; i < levelSize; i++)
            {
                var (node, index) = queue.Dequeue();
                if (i == 0) first = index;
                if (i == levelSize - 1) last = index;

                if (node.left != null) queue.Enqueue((node.left, 2 * index));
                if (node.right != null) queue.Enqueue((node.right, 2 * index + 1));
            }

            maxWidth = (int)Math.Max(maxWidth, last - first + 1);
        }

        return maxWidth;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the queue.
