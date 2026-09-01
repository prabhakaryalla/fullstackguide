# 314. Binary Tree Vertical Order Traversal

**Difficulty:** Medium
**Category:** Tree, Hash Table, Breadth-First Search
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given the `root` of a binary tree, return the vertical order traversal of its nodes' values — from left to right by column, and top to bottom within each column.

### Example

```
Input: root = [3,9,20,null,null,15,7]
Output: [[9],[3,15],[20],[7]]
```

### Constraints

- The number of nodes is in the range `[0, 100]`.
- `-100 <= Node.val <= 100`

## Approach

Assign each node a "column" number, starting at 0 for the root and shifting by -1 for left children and +1 for right children. Perform a breadth-first traversal (so nodes are naturally visited top-to-bottom within a column), grouping node values into a sorted map keyed by column. Reading the map in column order produces the vertical order traversal.

## C# Solution

```csharp
public class Solution
{
    public IList<IList<int>> VerticalOrder(TreeNode root)
    {
        var result = new List<IList<int>>();
        if (root == null) return result;

        var columnMap = new SortedDictionary<int, List<int>>();
        var queue = new Queue<(TreeNode Node, int Column)>();
        queue.Enqueue((root, 0));

        while (queue.Count > 0)
        {
            var (node, column) = queue.Dequeue();

            if (!columnMap.TryGetValue(column, out var list))
            {
                list = new List<int>();
                columnMap[column] = list;
            }

            list.Add(node.val);

            if (node.left != null) queue.Enqueue((node.left, column - 1));
            if (node.right != null) queue.Enqueue((node.right, column + 1));
        }

        foreach (var list in columnMap.Values)
            result.Add(list);

        return result;
    }
}
```

## Complexity

- **Time:** `O(n log n)` due to the sorted column map.
- **Space:** `O(n)` for the map and queue.
