# 515. Find Largest Value in Each Tree Row

**Difficulty:** Medium
**Category:** Tree, Depth-First Search, Breadth-First Search, Binary Tree

## Problem

Given the `root` of a binary tree, return an array of the largest value in each row of the tree (0-indexed).

### Example

```
Input: root = [1,3,2,5,3,null,9]
Output: [1,3,9]
```

### Constraints

- The number of nodes is in the range `[0, 10^4]`.
- `-2^31 <= Node.val <= 2^31 - 1`

## Approach

Perform a breadth-first traversal level by level, tracking the maximum value seen while dequeuing every node in the current level before moving to the next.

## C# Solution

```csharp
public class Solution
{
    public IList<int> LargestValues(TreeNode root)
    {
        var result = new List<int>();
        if (root == null) return result;

        var queue = new Queue<TreeNode>();
        queue.Enqueue(root);

        while (queue.Count > 0)
        {
            int levelSize = queue.Count;
            int maxValue = int.MinValue;

            for (int i = 0; i < levelSize; i++)
            {
                var node = queue.Dequeue();
                maxValue = Math.Max(maxValue, node.val);

                if (node.left != null) queue.Enqueue(node.left);
                if (node.right != null) queue.Enqueue(node.right);
            }

            result.Add(maxValue);
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the queue.
