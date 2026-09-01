# 742. Closest Leaf in a Binary Tree

**Difficulty:** Medium
**Category:** Hash Table, Tree, Depth-First Search, Breadth-First Search, Binary Tree
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given the `root` of a binary tree where every node has a unique value, and an integer `k`, return the value of the nearest leaf node to the node with value `k` (nearest measured in number of edges, and the target node itself may already be a leaf).

### Example

```
Input: root = [1,3,2], k = 1
Output: 2
```

## Approach

First perform a DFS to record each node's parent (building an implicit undirected graph where a node connects to its left child, right child, and parent) and to locate the starting node with value `k`. Then run a breadth-first search from that starting node treating the tree as this undirected graph; the first leaf node encountered during the BFS is guaranteed to be the closest, since BFS explores nodes in increasing order of distance.

## C# Solution

```csharp
public class Solution
{
    public int FindClosestLeaf(TreeNode root, int k)
    {
        var parentOf = new Dictionary<TreeNode, TreeNode>();
        TreeNode startNode = null;

        BuildParents(root, null, parentOf, k, ref startNode);

        var visited = new HashSet<TreeNode> { startNode };
        var queue = new Queue<TreeNode>();
        queue.Enqueue(startNode);

        while (queue.Count > 0)
        {
            var node = queue.Dequeue();

            if (node.left == null && node.right == null)
                return node.val;

            foreach (var neighbor in new[] { node.left, node.right, parentOf.GetValueOrDefault(node) })
            {
                if (neighbor != null && visited.Add(neighbor))
                    queue.Enqueue(neighbor);
            }
        }

        return -1;
    }

    private void BuildParents(TreeNode node, TreeNode parent, Dictionary<TreeNode, TreeNode> parentOf, int k, ref TreeNode startNode)
    {
        if (node == null) return;

        if (parent != null) parentOf[node] = parent;
        if (node.val == k) startNode = node;

        BuildParents(node.left, node, parentOf, k, ref startNode);
        BuildParents(node.right, node, parentOf, k, ref startNode);
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the parent map and BFS queue.
