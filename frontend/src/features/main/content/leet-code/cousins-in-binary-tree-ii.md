# 2641. Cousins in Binary Tree II

**Difficulty:** Medium
**Category:** Tree, Depth-First Search, Breadth-First Search, Hash Table, Binary Tree

## Problem

Given the root of a binary tree, replace the value of each node with the sum of all its cousins' values.

Two nodes are cousins if they are at the same level but have different parents. Return the root of the modified tree.

### Example

```
Input: root = [5,4,9,1,10,null,7]
Output: [0,0,0,7,7,null,11]
Explanation:
Level 0: node 5 has no cousins, new value 0
Level 1: nodes 4 and 9 are siblings, new value 0
Level 2: nodes 1,10 (children of 4) and 7 (child of 9) are cousins
  1 gets 10+7=17... wait need to recalculate based on correct definition
```

## Approach

Use two-pass level-order traversal (BFS):

1. First pass: Calculate the sum of all nodes at each level
2. Second pass: For each node, calculate the sum of its children (sibling sum), then update each child's value to (level sum - sibling sum)

## C# Solution

```csharp
public class Solution
{
    public TreeNode ReplaceValueInTree(TreeNode root)
    {
        if (root == null) return null;
        
        var queue = new Queue<TreeNode>();
        queue.Enqueue(root);
        var levelSums = new List<int>();
        
        while (queue.Count > 0)
        {
            int size = queue.Count;
            int levelSum = 0;
            
            for (int i = 0; i < size; i++)
            {
                var node = queue.Dequeue();
                levelSum += node.val;
                
                if (node.left != null) queue.Enqueue(node.left);
                if (node.right != null) queue.Enqueue(node.right);
            }
            
            levelSums.Add(levelSum);
        }
        
        root.val = 0;
        queue.Enqueue(root);
        int level = 0;
        
        while (queue.Count > 0)
        {
            int size = queue.Count;
            
            for (int i = 0; i < size; i++)
            {
                var node = queue.Dequeue();
                int siblingSum = 0;
                
                if (node.left != null) siblingSum += node.left.val;
                if (node.right != null) siblingSum += node.right.val;
                
                if (node.left != null)
                {
                    node.left.val = levelSums[level + 1] - siblingSum;
                    queue.Enqueue(node.left);
                }
                
                if (node.right != null)
                {
                    node.right.val = levelSums[level + 1] - siblingSum;
                    queue.Enqueue(node.right);
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
- **Space:** O(n) for the queue and level sums
