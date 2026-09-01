# 1161. Maximum Level Sum of a Binary Tree

**Difficulty:** Medium
**Category:** Tree, Depth-First Search, Breadth-First Search, Binary Tree

## Problem

Given the root of a binary tree, return the smallest level number whose node values sum to the greatest total (levels are numbered starting at `1` for the root).

### Example

```
Input: root = [1,7,0,7,-8,null,null]
Output: 2
```

## Approach

Perform a level-order (BFS) traversal, summing the values at each level as it's processed. Track the maximum sum seen so far and the level at which it occurred; since levels are visited in increasing order, only strictly greater sums update the recorded level, automatically preferring the smallest level on ties.

## C# Solution

```csharp
public class Solution
{
    public int MaxLevelSum(TreeNode root)
    {
        int maxSum = int.MinValue, maxLevel = 1, level = 0;
        var queue = new Queue<TreeNode>();
        queue.Enqueue(root);

        while (queue.Count > 0)
        {
            level++;
            int size = queue.Count;
            int sum = 0;

            for (int i = 0; i < size; i++)
            {
                var node = queue.Dequeue();
                sum += node.val;
                if (node.left != null) queue.Enqueue(node.left);
                if (node.right != null) queue.Enqueue(node.right);
            }

            if (sum > maxSum)
            {
                maxSum = sum;
                maxLevel = level;
            }
        }

        return maxLevel;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the BFS queue.
