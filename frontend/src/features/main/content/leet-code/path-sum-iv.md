# 666. Path Sum IV

**Difficulty:** Medium
**Category:** Array, Tree, Depth-First Search, Hash Table, Binary Tree
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a compact encoding of a binary tree of depth at most 4, where each element is a 3-digit number `depth * 100 + position * 10 + value` (position numbered left to right within its level, starting at 1), return the sum of all root-to-leaf path sums.

### Example

```
Input: nums = [113,215,221]
Output: 12
```

## Approach

Decode every number into a `(depth, position) -> value` map for O(1) lookups. Recursively walk the tree starting from the root (depth 1, position 1): at each node, add its value to the running path sum, then check whether left child (`depth+1`, `2*position - 1`) and/or right child (`depth+1`, `2*position`) exist in the map. A node with no children is a leaf, contributing its accumulated path sum to the total; otherwise, recurse into whichever children exist and sum their contributions.

## C# Solution

```csharp
public class Solution
{
    public int PathSum(int[] nums)
    {
        var valueByPosition = new Dictionary<int, int>();

        foreach (var num in nums)
        {
            int depth = num / 100;
            int position = num / 10 % 10;
            int value = num % 10;

            valueByPosition[depth * 10 + position] = value;
        }

        return Dfs(valueByPosition, 1, 1, 0);
    }

    private int Dfs(Dictionary<int, int> valueByPosition, int depth, int position, int sumSoFar)
    {
        if (!valueByPosition.TryGetValue(depth * 10 + position, out var value)) return 0;

        sumSoFar += value;

        int leftKey = (depth + 1) * 10 + (2 * position - 1);
        int rightKey = (depth + 1) * 10 + (2 * position);

        bool hasLeft = valueByPosition.ContainsKey(leftKey);
        bool hasRight = valueByPosition.ContainsKey(rightKey);

        if (!hasLeft && !hasRight) return sumSoFar;

        int total = 0;
        if (hasLeft) total += Dfs(valueByPosition, depth + 1, 2 * position - 1, sumSoFar);
        if (hasRight) total += Dfs(valueByPosition, depth + 1, 2 * position, sumSoFar);

        return total;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the decoded map.
