# 863. All Nodes Distance K in Binary Tree

**Difficulty:** Medium
**Category:** Hash Table, Tree, Depth-First Search, Breadth-First Search, Binary Tree

## Problem

Given the `root` of a binary tree, a `target` node within it, and an integer `k`, return the values of all nodes that are exactly distance `k` from `target`.

### Example

```
Input: root = [3,5,1,6,2,0,8,null,null,7,4], target = 5, k = 2
Output: [7,4,1]
```

## Approach

Build a map of each node's parent via a DFS, turning the tree into an undirected graph where each node connects to its left child, right child, and parent. Then perform a BFS from `target`, expanding outward level by level (treating all three connection types as equal-distance neighbors), stopping once `k` levels have been explored. The final BFS frontier contains exactly the nodes at distance `k`.

## C# Solution

```csharp
public class Solution
{
    public IList<int> DistanceK(TreeNode root, TreeNode target, int k)
    {
        var parentOf = new Dictionary<TreeNode, TreeNode>();
        BuildParents(root, null, parentOf);

        var visited = new HashSet<TreeNode> { target };
        var queue = new Queue<TreeNode>();
        queue.Enqueue(target);
        int dist = 0;

        while (queue.Count > 0 && dist < k)
        {
            int size = queue.Count;

            for (int i = 0; i < size; i++)
            {
                var node = queue.Dequeue();

                foreach (var neighbor in new[] { node.left, node.right, parentOf.GetValueOrDefault(node) })
                {
                    if (neighbor != null && visited.Add(neighbor))
                        queue.Enqueue(neighbor);
                }
            }

            dist++;
        }

        return queue.ToList().Select(n => n.val).ToList();
    }

    private void BuildParents(TreeNode node, TreeNode parent, Dictionary<TreeNode, TreeNode> parentOf)
    {
        if (node == null) return;

        if (parent != null) parentOf[node] = parent;

        BuildParents(node.left, node, parentOf);
        BuildParents(node.right, node, parentOf);
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the parent map and BFS queue.
