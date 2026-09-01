# 1609. Even Odd Tree

**Difficulty:** Medium
**Category:** Tree, Breadth-First Search, Binary Tree

## Problem

A binary tree is an "Even-Odd" tree if: (1) node values on even-indexed levels (0-indexed from the root) are all odd, strictly increasing left to right, and (2) node values on odd-indexed levels are all even, strictly decreasing left to right. Return whether the given tree satisfies this property.

### Example

```
Input: root = [1,10,4,3,null,7,9,12,8,6,null,null,2]
Output: true
```

## Approach

Perform a BFS level by level. For each level, track the required parity (`level % 2 == 0` means values must be odd and strictly increasing; otherwise even and strictly decreasing) and compare each node's value against the previous node processed at that level.

## C# Solution

```csharp
public class Solution
{
    public bool IsEvenOddTree(TreeNode root)
    {
        Queue<TreeNode> queue = new Queue<TreeNode>();
        queue.Enqueue(root);
        int level = 0;

        while (queue.Count > 0)
        {
            int size = queue.Count;
            int previous = level % 2 == 0 ? int.MinValue : int.MaxValue;

            for (int i = 0; i < size; i++)
            {
                TreeNode node = queue.Dequeue();

                if (level % 2 == 0)
                {
                    if (node.val % 2 == 0 || node.val <= previous)
                    {
                        return false;
                    }
                }
                else
                {
                    if (node.val % 2 != 0 || node.val >= previous)
                    {
                        return false;
                    }
                }

                previous = node.val;

                if (node.left != null)
                {
                    queue.Enqueue(node.left);
                }

                if (node.right != null)
                {
                    queue.Enqueue(node.right);
                }
            }

            level++;
        }

        return true;
    }
}
```

## Complexity

- **Time:** `O(n)`, visiting every node once.
- **Space:** `O(n)` for the BFS queue.
