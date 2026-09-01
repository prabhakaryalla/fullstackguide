# 2471. Minimum Number of Operations to Sort a Binary Tree by Level

**Difficulty:** Medium
**Category:** Tree, Breadth-First Search, Binary Tree

## Problem

You are given the root of a binary tree with unique values. In one operation, you can swap any two nodes at the same level.

Return the minimum number of operations needed to make values at each level sorted in strictly increasing order.

### Example

```
Input: root = [1,4,3,7,6,8,5,null,null,null,null,9,null,10]
Output: 3
Explanation: Need to swap nodes at certain levels to make each level sorted.
```

## Approach

Use BFS to traverse level by level. For each level:
1. Collect all node values
2. Find the minimum number of swaps needed to sort this array
3. Add to the total count

To find minimum swaps: create a mapping of value to target position, then count cycles in the permutation.

## C# Solution

```csharp
public class Solution
{
    public int MinimumOperations(TreeNode root)
    {
        if (root == null) return 0;
        
        var queue = new Queue<TreeNode>();
        queue.Enqueue(root);
        int totalOps = 0;
        
        while (queue.Count > 0)
        {
            int size = queue.Count;
            var level = new List<int>();
            
            for (int i = 0; i < size; i++)
            {
                var node = queue.Dequeue();
                level.Add(node.val);
                
                if (node.left != null) queue.Enqueue(node.left);
                if (node.right != null) queue.Enqueue(node.right);
            }
            
            totalOps += MinSwapsToSort(level);
        }
        
        return totalOps;
    }
    
    private int MinSwapsToSort(List<int> arr)
    {
        int n = arr.Count;
        var sorted = new List<int>(arr);
        sorted.Sort();
        
        var pos = new Dictionary<int, int>();
        for (int i = 0; i < n; i++)
        {
            pos[sorted[i]] = i;
        }
        
        var visited = new bool[n];
        int swaps = 0;
        
        for (int i = 0; i < n; i++)
        {
            if (visited[i] || pos[arr[i]] == i) continue;
            
            int cycleSize = 0;
            int j = i;
            
            while (!visited[j])
            {
                visited[j] = true;
                j = pos[arr[j]];
                cycleSize++;
            }
            
            if (cycleSize > 1)
            {
                swaps += cycleSize - 1;
            }
        }
        
        return swaps;
    }
}
```

## Complexity

- **Time:** O(n log n) where n is the number of nodes (sorting at each level)
- **Space:** O(w) where w is the maximum width of the tree
