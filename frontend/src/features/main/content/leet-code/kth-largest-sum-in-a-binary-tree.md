# 2805. Kth Largest Sum in a Binary Tree

**Difficulty:** Medium
**Category:** Tree, Binary Tree, Breadth-First Search, Sorting

## Problem

You are given the `root` of a binary tree and a positive integer `k`. The level sum in the tree is the sum of the values of all nodes at the same level.

Return the `kᵗʰ` largest level sum in the tree (1-indexed). If there are fewer than `k` levels in the tree, return `-1`.

### Example

```
Input: root = [5,8,9,2,1,3,7,4,6], k = 2
Output: 13
Explanation: Level sums are [5, 17, 13, 10]. The 2nd largest is 13.
```

## Approach

Use level-order traversal (BFS) to calculate the sum of values at each level, then find the kth largest sum:

1. Perform BFS to traverse the tree level by level.
2. For each level, calculate the sum of all node values.
3. Store all level sums in a list.
4. Sort the sums in descending order.
5. Return the kth element if it exists, otherwise return -1.

## C# Solution

```csharp
public class Solution
{
    public long KthLargestLevelSum(TreeNode root, int k)
    {
        if (root == null)
            return -1;
        
        var levelSums = new List<long>();
        var queue = new Queue<TreeNode>();
        queue.Enqueue(root);
        
        while (queue.Count > 0)
        {
            int levelSize = queue.Count;
            long levelSum = 0;
            
            for (int i = 0; i < levelSize; i++)
            {
                var node = queue.Dequeue();
                levelSum += node.val;
                
                if (node.left != null)
                    queue.Enqueue(node.left);
                if (node.right != null)
                    queue.Enqueue(node.right);
            }
            
            levelSums.Add(levelSum);
        }
        
        if (k > levelSums.Count)
            return -1;
        
        levelSums.Sort((a, b) => b.CompareTo(a));
        return levelSums[k - 1];
    }
}
```

## Complexity

- **Time:** O(n + h log h) where n is the number of nodes (for BFS) and h is the height (for sorting level sums)
- **Space:** O(w + h) where w is the maximum width of the tree (queue) and h is the height (storing level sums)
