# 429. N-ary Tree Level Order Traversal

**Difficulty:** Medium
**Category:** Tree, Breadth-First Search

## Problem

Given an n-ary tree, return the level order traversal of its nodes' values (each level represented as its own list).

### Example

```
Input: root = [1,null,3,2,4,null,5,6]
Output: [[1],[3,2,4],[5,6]]
```

### Constraints

- The number of nodes is in the range `[0, 10^4]`.
- `0 <= Node.val <= 10^4`

## Approach

Perform a standard breadth-first search using a queue, processing one full level at a time. For each node dequeued, record its value and enqueue all of its children (an n-ary tree node may have any number of children, unlike a binary tree's fixed two).

## C# Solution

```csharp
public class Solution
{
    public IList<IList<int>> LevelOrder(Node root)
    {
        var result = new List<IList<int>>();
        if (root == null) return result;

        var queue = new Queue<Node>();
        queue.Enqueue(root);

        while (queue.Count > 0)
        {
            int levelSize = queue.Count;
            var level = new List<int>();

            for (int i = 0; i < levelSize; i++)
            {
                var node = queue.Dequeue();
                level.Add(node.val);

                foreach (var child in node.children)
                    queue.Enqueue(child);
            }

            result.Add(level);
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n)` — every node is visited once.
- **Space:** `O(n)` for the queue and result.
