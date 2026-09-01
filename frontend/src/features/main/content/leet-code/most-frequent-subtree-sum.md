# 508. Most Frequent Subtree Sum

**Difficulty:** Medium
**Category:** Tree, Hash Table, Depth-First Search, Binary Tree

## Problem

Given the `root` of a binary tree, return all the most frequent subtree sum values, where the subtree sum of a node is the sum of all node values formed by the subtree rooted at that node.

### Example

```
Input: root = [5,2,-3]
Output: [2,-3,4]
```

### Constraints

- The number of nodes is in the range `[1, 10^4]`.
- `-10^5 <= Node.val <= 10^5`

## Approach

Perform a post-order depth-first search, computing each subtree's sum from its children's sums plus its own value. Record every computed sum in a frequency dictionary and track the highest frequency seen. After the traversal, collect every sum whose frequency matches that maximum.

## C# Solution

```csharp
public class Solution
{
    public int[] FindFrequentTreeSum(TreeNode root)
    {
        var counts = new Dictionary<int, int>();
        int maxCount = 0;

        ComputeSum(root, counts, ref maxCount);

        return counts.Where(pair => pair.Value == maxCount).Select(pair => pair.Key).ToArray();
    }

    private int ComputeSum(TreeNode node, Dictionary<int, int> counts, ref int maxCount)
    {
        if (node == null) return 0;

        int sum = node.val + ComputeSum(node.left, counts, ref maxCount) + ComputeSum(node.right, counts, ref maxCount);

        counts[sum] = counts.GetValueOrDefault(sum) + 1;
        maxCount = Math.Max(maxCount, counts[sum]);

        return sum;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the sum-frequency map.
