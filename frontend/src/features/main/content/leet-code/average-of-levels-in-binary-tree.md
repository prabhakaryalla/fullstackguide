# 637. Average of Levels in Binary Tree

**Difficulty:** Easy
**Category:** Tree, Depth-First Search, Breadth-First Search, Binary Tree

## Problem

Given the `root` of a binary tree, return the average value of the nodes on each level, as an array indexed by level.

### Example

```
Input: root = [3,9,20,null,null,15,7]
Output: [3.00000,14.50000,11.00000]
```

### Constraints

- The number of nodes is in the range `[1, 10^4]`.

## Approach

Perform a level-order (breadth-first) traversal, summing the values of all nodes at each level while dequeuing them, and divide by the level's node count before moving to the next level.

## C# Solution

```csharp
public class Solution
{
    public IList<double> AverageOfLevels(TreeNode root)
    {
        var result = new List<double>();
        var queue = new Queue<TreeNode>();
        queue.Enqueue(root);

        while (queue.Count > 0)
        {
            int levelSize = queue.Count;
            double sum = 0;

            for (int i = 0; i < levelSize; i++)
            {
                var node = queue.Dequeue();
                sum += node.val;

                if (node.left != null) queue.Enqueue(node.left);
                if (node.right != null) queue.Enqueue(node.right);
            }

            result.Add(sum / levelSize);
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the queue.
