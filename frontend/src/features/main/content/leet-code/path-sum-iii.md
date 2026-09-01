# 437. Path Sum III

**Difficulty:** Medium
**Category:** Tree, Depth-First Search, Binary Tree, Prefix Sum

## Problem

Given the `root` of a binary tree and an integer `targetSum`, return the number of paths where the sum of the values along the path equals `targetSum`. The path does not need to start or end at the root or a leaf, but it must go downwards (parent to child).

### Example

```
Input: root = [10,5,-3,3,2,null,11,3,-2,null,1], targetSum = 8
Output: 3
```

### Constraints

- The number of nodes is in the range `[0, 1000]`.
- `-10^9 <= Node.val <= 10^9`
- `-1000 <= targetSum <= 1000`

## Approach

Perform a depth-first search while tracking the running sum from the root to the current node, along with a hash map counting how many times each prefix sum has occurred along the current root-to-node path. At each node, the number of valid paths ending here equals the count of `currentSum - targetSum` seen earlier on this path (since removing that earlier prefix leaves exactly `targetSum`). Update the map on entry and roll it back on exit (backtracking) so sibling subtrees aren't affected.

## C# Solution

```csharp
public class Solution
{
    public int PathSum(TreeNode root, int targetSum)
    {
        var prefixCounts = new Dictionary<long, int> { [0] = 1 };
        return Dfs(root, 0, targetSum, prefixCounts);
    }

    private int Dfs(TreeNode node, long currentSum, int targetSum, Dictionary<long, int> prefixCounts)
    {
        if (node == null) return 0;

        currentSum += node.val;
        int count = prefixCounts.GetValueOrDefault(currentSum - targetSum);

        prefixCounts[currentSum] = prefixCounts.GetValueOrDefault(currentSum) + 1;

        count += Dfs(node.left, currentSum, targetSum, prefixCounts);
        count += Dfs(node.right, currentSum, targetSum, prefixCounts);

        prefixCounts[currentSum]--;

        return count;
    }
}
```

## Complexity

- **Time:** `O(n)` — each node is visited once with constant-time map operations.
- **Space:** `O(n)` for the prefix-sum map and recursion stack.
