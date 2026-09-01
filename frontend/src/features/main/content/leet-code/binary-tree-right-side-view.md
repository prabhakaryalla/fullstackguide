# 199. Binary Tree Right Side View

**Difficulty:** Medium
**Category:** Tree, Depth-First Search, Breadth-First Search, Binary Tree

## Problem

Given the `root` of a binary tree, return the values of the nodes visible from the right side, ordered from top to bottom (i.e., the last node at each level).

### Example

```
root = [1,2,3,null,5,null,4] -> [1,3,4]
```

## Approach

Run a level-by-level BFS; the last node dequeued at each level is exactly the one visible from the right side, so record it before moving to the next level. A DFS variant (right child first) works too, recording the first node seen at each new depth.

## C# Solution

```csharp
public class Solution
{
    public IList<int> RightSideView(TreeNode root)
    {
        var result = new List<int>();
        if (root == null) return result;

        var queue = new Queue<TreeNode>();
        queue.Enqueue(root);

        while (queue.Count > 0)
        {
            int levelSize = queue.Count;

            for (int i = 0; i < levelSize; i++)
            {
                var node = queue.Dequeue();

                if (i == levelSize - 1)
                {
                    result.Add(node.val);
                }

                if (node.left != null) queue.Enqueue(node.left);
                if (node.right != null) queue.Enqueue(node.right);
            }
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n)` — every node is processed once.
- **Space:** `O(n)` — the queue can hold up to a full level's worth of nodes.
