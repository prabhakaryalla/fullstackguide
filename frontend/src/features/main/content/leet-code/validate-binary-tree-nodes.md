# 1361. Validate Binary Tree Nodes

**Difficulty:** Medium
**Category:** Tree, Graph, Depth-First Search, Breadth-First Search, Union Find, Binary Tree

## Problem

Given `n` nodes with `leftChild` and `rightChild` index arrays (`-1` if absent), return `true` if the nodes form exactly one valid binary tree.

### Example

```
Input: n = 4, leftChild = [1,-1,3,-1], rightChild = [2,-1,-1,-1]
Output: true
```

## Approach

A valid tree requires every node to have at most one parent and exactly one node with no parent (the root). Track an indegree count per node while scanning the child arrays, failing immediately if any node is claimed as a child twice. Then verify that a traversal (BFS/DFS) starting from the unique root reaches all `n` nodes exactly once, which rules out cycles and disconnected components.

## C# Solution

```csharp
public class Solution
{
    public bool ValidateBinaryTreeNodes(int n, int[] leftChild, int[] rightChild)
    {
        var indegree = new int[n];

        foreach (var arr in new[] { leftChild, rightChild })
        {
            foreach (var child in arr)
            {
                if (child == -1) continue;
                indegree[child]++;
                if (indegree[child] > 1) return false;
            }
        }

        int root = -1;
        for (int i = 0; i < n; i++)
        {
            if (indegree[i] == 0)
            {
                if (root != -1) return false;
                root = i;
            }
        }

        if (root == -1) return false;

        var visited = new bool[n];
        var stack = new Stack<int>();
        stack.Push(root);
        visited[root] = true;
        int visitedCount = 1;

        while (stack.Count > 0)
        {
            int node = stack.Pop();
            foreach (int child in new[] { leftChild[node], rightChild[node] })
            {
                if (child == -1) continue;
                if (visited[child]) return false;
                visited[child] = true;
                visitedCount++;
                stack.Push(child);
            }
        }

        return visitedCount == n;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the indegree and visited arrays.
