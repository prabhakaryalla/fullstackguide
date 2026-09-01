# 1302. Deepest Leaves Sum

**Difficulty:** Medium
**Category:** Tree, Depth-First Search, Breadth-First Search, Binary Tree

## Problem

Given the `root` of a binary tree, return the sum of the values of its deepest leaves.

### Example

```
Input: root = [1,2,3,4,5,null,6,7,null,null,null,null,8]
Output: 15
```

## Approach

Perform a level-order (breadth-first) traversal, tracking the sum of values at each level. When the traversal finishes, the last level processed is the deepest one, so its accumulated sum is the answer.

## C# Solution

```csharp
public class Solution
{
    public int DeepestLeavesSum(TreeNode root)
    {
        var queue = new Queue<TreeNode>();
        queue.Enqueue(root);
        int levelSum = 0;

        while (queue.Count > 0)
        {
            int size = queue.Count;
            levelSum = 0;

            for (int i = 0; i < size; i++)
            {
                var node = queue.Dequeue();
                levelSum += node.val;

                if (node.left != null) queue.Enqueue(node.left);
                if (node.right != null) queue.Enqueue(node.right);
            }
        }

        return levelSum;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the queue.
