# 2385. Amount of Time for Binary Tree to Be Infected

**Difficulty:** Medium
**Category:** Tree, Depth-First Search, Breadth-First Search, Binary Tree

## Problem

You are given the `root` of a binary tree with unique values, and an integer `start`. At minute `0`, an infection starts from the node with value `start`.

Each minute, a node becomes infected if:
- The node is currently uninfected.
- The node is adjacent to an infected node.

Return the number of minutes needed for the entire tree to be infected.

### Example

```
Input: root = [1,5,3,null,4,10,6,9,2], start = 3
Output: 4
```

## Approach

Build a graph representation of the tree (bidirectional edges). Then perform BFS from the start node to find the maximum distance to any node.

## C# Solution

```csharp
public class Solution
{
    public int AmountOfTime(TreeNode root, int start)
    {
        var graph = new Dictionary<int, List<int>>();
        BuildGraph(root, null, graph);
        
        var visited = new HashSet<int>();
        var queue = new Queue<int>();
        queue.Enqueue(start);
        visited.Add(start);
        
        int minutes = -1;
        
        while (queue.Count > 0)
        {
            int size = queue.Count;
            minutes++;
            
            for (int i = 0; i < size; i++)
            {
                int node = queue.Dequeue();
                
                if (graph.ContainsKey(node))
                {
                    foreach (int neighbor in graph[node])
                    {
                        if (!visited.Contains(neighbor))
                        {
                            visited.Add(neighbor);
                            queue.Enqueue(neighbor);
                        }
                    }
                }
            }
        }
        
        return minutes;
    }
    
    private void BuildGraph(TreeNode node, TreeNode parent, Dictionary<int, List<int>> graph)
    {
        if (node == null) return;
        
        if (!graph.ContainsKey(node.val))
            graph[node.val] = new List<int>();
        
        if (parent != null)
        {
            graph[node.val].Add(parent.val);
            if (!graph.ContainsKey(parent.val))
                graph[parent.val] = new List<int>();
            graph[parent.val].Add(node.val);
        }
        
        BuildGraph(node.left, node, graph);
        BuildGraph(node.right, node, graph);
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
