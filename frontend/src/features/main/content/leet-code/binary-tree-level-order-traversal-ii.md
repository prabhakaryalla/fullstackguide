# 107. Binary Tree Level Order Traversal II

**Difficulty:** Medium
**Category:** Tree, Breadth-First Search, Binary Tree

## Problem

Given the `root` of a binary tree, return the bottom-up level order traversal of its nodes' values (from leaf level up to the root level, left to right within each level).

### Example 1

```
Input: root = [3,9,20,null,null,15,7]
Output: [[15,7],[9,20],[3]]
```

```mermaid
graph TB
    A["3"] --> B["9"]
    A --> C["20"]
    C --> D["15"]
    C --> E["7"]
    style D fill:#4caf50,color:#fff
    style E fill:#4caf50,color:#fff
```

### Example 2

```
Input: root = [1]
Output: [[1]]
```

### Constraints

- The number of nodes in the tree is in the range `[0, 2000]`.
- `-1000 <= Node.val <= 1000`

## Approach

Run the same level-by-level BFS as standard level order traversal, collecting each level's values into a list, then reverse the overall list of levels at the end so the deepest level appears first.

## C# Solution

```csharp
public class Solution
{
    public IList<IList<int>> LevelOrderBottom(TreeNode root)
    {
        var result = new List<IList<int>>();
        if (root == null) return result;

        var queue = new Queue<TreeNode>();
        queue.Enqueue(root);

        while (queue.Count > 0)
        {
            int levelSize = queue.Count;
            var level = new List<int>(levelSize);

            for (int i = 0; i < levelSize; i++)
            {
                var node = queue.Dequeue();
                level.Add(node.val);

                if (node.left != null) queue.Enqueue(node.left);
                if (node.right != null) queue.Enqueue(node.right);
            }

            result.Add(level);
        }

        result.Reverse();
        return result;
    }
}
```

## Complexity

- **Time:** `O(n)` — every node is processed once.
- **Space:** `O(n)` — the queue can hold up to a full level's worth of nodes.
