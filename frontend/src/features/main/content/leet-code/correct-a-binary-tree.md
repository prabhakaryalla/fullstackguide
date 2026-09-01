# 1660. Correct a Binary Tree

**Difficulty:** Medium
**Category:** Tree, Depth-First Search, Breadth-First Search, Binary Tree

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Exactly one node in the given binary tree has an invalid `right` pointer that erroneously points to another node in the *same level*, somewhere to its right. Remove that invalid pointer (and thereby the improperly-referenced node, which has no other legitimate parent) and return the corrected tree's root.

### Example

```
Input: root = [1,2,3,null,null,4]
Output: [1,2,3]
```

## Approach

Traverse level by level right-to-left, enqueuing each node's `right` child before its `left` child, and track already-visited nodes in a set. Since the invalid pointer always points to a node further right within the same level, that target node gets reached (and marked visited) through its own legitimate parent before the corrupted node is processed. So when a node's `right` child is found already in the visited set, that pointer must be the invalid one — clear it without re-enqueueing.

## C# Solution

```csharp
public class Solution
{
    public TreeNode CorrectBinaryTree(TreeNode root)
    {
        Queue<TreeNode> queue = new Queue<TreeNode>();
        HashSet<TreeNode> seen = new HashSet<TreeNode>();
        queue.Enqueue(root);

        while (queue.Count > 0)
        {
            int size = queue.Count;

            for (int i = 0; i < size; i++)
            {
                TreeNode node = queue.Dequeue();

                if (node.right != null)
                {
                    if (seen.Contains(node.right))
                    {
                        node.right = null;
                    }
                    else
                    {
                        queue.Enqueue(node.right);
                    }
                }

                if (node.left != null)
                {
                    queue.Enqueue(node.left);
                }

                seen.Add(node);
            }
        }

        return root;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the queue and visited set.
