# 2313. Minimum Flips in Binary Tree to Get Result

**Difficulty:** Hard
**Category:** Tree, Depth-First Search, Dynamic Programming

## Problem

You are given the root of a binary tree where each node has a value of `0` or `1`, and an integer `result`. Each node also has an associated boolean operation: AND, OR, or it is a leaf node (no operation).

The tree represents a boolean expression. You can flip any leaf node's value (change `0` to `1` or `1` to `0`). Return the minimum number of leaf nodes you need to flip to make the root evaluate to `result`.

### Example

```
Input: root = [2,1,3,null,null,0,1], result = 0
Output: 2
Explanation: The tree represents (0 AND 1) OR (0 AND 1).
We need to flip 2 leaf nodes to get the result 0.
```

## Approach

Use depth-first search with dynamic programming. For each subtree, calculate:
- The minimum flips needed to make it evaluate to 0
- The minimum flips needed to make it evaluate to 1

For a leaf node:
- 0 flips to get its current value
- 1 flip to get the opposite value

For an internal node with operation:
- AND: Combine children's costs considering all ways to make AND = 0 or AND = 1
- OR: Combine children's costs considering all ways to make OR = 0 or OR = 1

Finally, return the cost to make the root equal to the desired result.

## C# Solution

```csharp
public class Solution
{
    public int MinimumFlips(TreeNode root, bool result)
    {
        var (cost0, cost1) = DFS(root);
        return result ? cost1 : cost0;
    }
    
    private (int, int) DFS(TreeNode node)
    {
        if (node.left == null && node.right == null)
        {
            if (node.val == 0)
                return (0, 1);
            else
                return (1, 0);
        }
        
        var (leftCost0, leftCost1) = DFS(node.left);
        var (rightCost0, rightCost1) = DFS(node.right);
        
        int cost0, cost1;
        
        if (node.val == 2)
        {
            cost0 = Math.Min(leftCost0, Math.Min(rightCost0, leftCost0 + rightCost0));
            cost1 = leftCost1 + rightCost1;
        }
        else if (node.val == 3)
        {
            cost0 = leftCost0 + rightCost0;
            cost1 = Math.Min(leftCost1, Math.Min(rightCost1, leftCost1 + rightCost1));
        }
        else
        {
            cost0 = 0;
            cost1 = int.MaxValue / 2;
        }
        
        return (cost0, cost1);
    }
}
```

## Complexity

- **Time:** O(n) where n is the number of nodes
- **Space:** O(h) where h is the height of the tree (recursion stack)
