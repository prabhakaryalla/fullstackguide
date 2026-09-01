# 2415. Reverse Odd Levels of Binary Tree

**Difficulty:** Medium
**Category:** Tree, Depth-First Search, Breadth-First Search, Binary Tree

## Problem

Given the root of a perfect binary tree, reverse the node values at each odd level of the tree.

A binary tree is perfect if all parent nodes have two children and all leaves are on the same level.

Return the root of the reversed tree.

### Example

```
Input: root = [2,3,5,8,13,21,34]
Output: [2,5,3,8,13,21,34]
Explanation: 
The tree has only one odd level (level 1).
The nodes at level 1 are 3, 5 and their values are reversed to 5, 3.
```

## Approach

Use level-order traversal (BFS) to process the tree level by level. For each odd level, collect all node values, reverse them, and assign them back to the nodes at that level.

## C# Solution

```csharp
public class Solution
{
    public TreeNode ReverseOddLevels(TreeNode root)
    {
        if (root == null) return null;
        
        var queue = new Queue<TreeNode>();
        queue.Enqueue(root);
        int level = 0;
        
        while (queue.Count > 0)
        {
            int size = queue.Count;
            var nodes = new List<TreeNode>();
            
            for (int i = 0; i < size; i++)
            {
                var node = queue.Dequeue();
                nodes.Add(node);
                
                if (node.left != null) queue.Enqueue(node.left);
                if (node.right != null) queue.Enqueue(node.right);
            }
            
            if (level % 2 == 1)
            {
                int left = 0, right = nodes.Count - 1;
                while (left < right)
                {
                    int temp = nodes[left].val;
                    nodes[left].val = nodes[right].val;
                    nodes[right].val = temp;
                    left++;
                    right--;
                }
            }
            
            level++;
        }
        
        return root;
    }
}
```

## Complexity

- **Time:** O(n) where n is the number of nodes
- **Space:** O(w) where w is the maximum width of the tree
