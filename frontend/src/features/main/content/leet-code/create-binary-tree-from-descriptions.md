# 2196. Create Binary Tree From Descriptions

**Difficulty:** Medium
**Category:** Array, Hash Table, Tree, Binary Tree, Depth-First Search, Breadth-First Search

## Problem

You are given a 2D integer array `descriptions` where `descriptions[i] = [parenti, childi, isLefti]` indicates that `parenti` is the parent of `childi` in a binary tree of unique values. Furthermore:
- If `isLefti == 1`, then `childi` is the left child of `parenti`
- If `isLefti == 0`, then `childi` is the right child of `parenti`

Construct the binary tree described by `descriptions` and return its root.

### Example

```
Input: descriptions = [[20,15,1],[20,17,0],[50,20,1],[50,80,0],[80,19,1]]
Output: [50,20,80,15,17,19]
Explanation: The root node is 50, which has children 20 and 80.
20 has children 15 (left) and 17 (right).
80 has child 19 (left).
```

## Approach

1. Create all nodes and store them in a dictionary
2. Build parent-child relationships based on descriptions
3. Track all child nodes
4. The root is the node that appears as a parent but never as a child

## C# Solution

```csharp
public class Solution
{
    public TreeNode CreateBinaryTree(int[][] descriptions)
    {
        Dictionary<int, TreeNode> nodes = new Dictionary<int, TreeNode>();
        HashSet<int> children = new HashSet<int>();
        
        foreach (var desc in descriptions)
        {
            int parentVal = desc[0];
            int childVal = desc[1];
            bool isLeft = desc[2] == 1;
            
            // Create nodes if they don't exist
            if (!nodes.ContainsKey(parentVal))
            {
                nodes[parentVal] = new TreeNode(parentVal);
            }
            if (!nodes.ContainsKey(childVal))
            {
                nodes[childVal] = new TreeNode(childVal);
            }
            
            // Set up parent-child relationship
            TreeNode parent = nodes[parentVal];
            TreeNode child = nodes[childVal];
            
            if (isLeft)
            {
                parent.left = child;
            }
            else
            {
                parent.right = child;
            }
            
            children.Add(childVal);
        }
        
        // Find root (node that is never a child)
        foreach (var node in nodes.Values)
        {
            if (!children.Contains(node.val))
            {
                return node;
            }
        }
        
        return null;
    }
}
```

## Complexity

- **Time:** O(n), where n is the number of descriptions
- **Space:** O(n), for storing nodes
