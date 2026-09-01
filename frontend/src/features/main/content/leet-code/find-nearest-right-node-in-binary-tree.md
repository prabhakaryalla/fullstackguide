# 1602. Find Nearest Right Node in Binary Tree

**Difficulty:** Medium
**Category:** Tree, Depth-First Search, Breadth-First Search, Binary Tree

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given the root of a binary tree and a node `u` in that tree, return the nearest node on the same level to the right side of `u`, or `null` if `u` is the rightmost node on its level.

### Example

```
Input: root = [1,2,3,null,4,5,6], u = 4
Output: 5
```

## Approach

Perform a level-order (BFS) traversal. While processing each level, whenever the dequeued node equals `u`, the answer is the next node currently at the front of the queue (or `null` if `u` was the last node processed at that level).

## C# Solution

```csharp
public class Solution
{
    public TreeNode FindNearestRightNode(TreeNode root, TreeNode u)
    {
        Queue<TreeNode> queue = new Queue<TreeNode>();
        queue.Enqueue(root);

        while (queue.Count > 0)
        {
            int size = queue.Count;

            for (int i = 0; i < size; i++)
            {
                TreeNode node = queue.Dequeue();

                if (node == u)
                {
                    return i == size - 1 ? null : queue.Peek();
                }

                if (node.left != null)
                {
                    queue.Enqueue(node.left);
                }

                if (node.right != null)
                {
                    queue.Enqueue(node.right);
                }
            }
        }

        return null;
    }
}
```

## Complexity

- **Time:** `O(n)`, visiting every node once.
- **Space:** `O(n)` for the BFS queue.
