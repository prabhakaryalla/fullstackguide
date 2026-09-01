# 2764. Is Array a Preorder of Some Binary Tree

**Difficulty:** Medium
**Category:** Tree, Depth-First Search, Graph
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

You are given a 2D array `nodes` where `nodes[i] = [id, parent_id]` represents a node in a binary tree and a 0-indexed array `order`. 

Determine if `order` represents a valid preorder traversal of the given tree structure.

### Example

```
Input: nodes = [[0,-1],[1,0],[2,0],[3,1],[4,1]], order = [0,1,3,4,2]
Output: true
Explanation: The preorder traversal of the tree is [0,1,3,4,2].
```

## Approach

Build the tree structure from the nodes array, identifying parent-child relationships. Perform a preorder traversal (root, left, right) and compare the result with the given `order` array.

Key steps:
1. Build adjacency list representing parent-child relationships
2. Find the root node (parent_id = -1)
3. Perform preorder DFS traversal
4. Compare the traversal result with the given order

## C# Solution

```csharp
public class Solution
{
    public bool IsPreorder(int[][] nodes, int[] order)
    {
        var children = new Dictionary<int, List<int>>();
        int root = -1;
        
        foreach (var node in nodes)
        {
            int id = node[0];
            int parentId = node[1];
            
            if (parentId == -1)
            {
                root = id;
            }
            else
            {
                if (!children.ContainsKey(parentId))
                {
                    children[parentId] = new List<int>();
                }
                children[parentId].Add(id);
            }
        }
        
        foreach (var kvp in children)
        {
            kvp.Value.Sort();
        }
        
        var preorder = new List<int>();
        Dfs(root, children, preorder);
        
        if (preorder.Count != order.Length) return false;
        
        for (int i = 0; i < order.Length; i++)
        {
            if (preorder[i] != order[i]) return false;
        }
        
        return true;
    }
    
    private void Dfs(int node, Dictionary<int, List<int>> children, List<int> preorder)
    {
        preorder.Add(node);
        
        if (children.ContainsKey(node))
        {
            foreach (int child in children[node])
            {
                Dfs(child, children, preorder);
            }
        }
    }
}
```

## Complexity

- **Time:** O(n) where n is the number of nodes
- **Space:** O(n) for the tree structure and recursion stack
