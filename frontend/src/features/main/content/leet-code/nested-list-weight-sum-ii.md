# 364. Nested List Weight Sum II

**Difficulty:** Medium
**Category:** Depth-First Search, Breadth-First Search
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a nested list of integers `nestedList`, return the sum of all integers, but this time weighted inversely by depth: an integer at depth `d` contributes `value * (maxDepth - d + 1)`, where `maxDepth` is the maximum depth in the whole structure.

### Example

```
Input: nestedList = [[1,1],2,[1,1]]
Output: 8
```

### Constraints

- `1 <= nestedList.length <= 50`
- The values of the integers are in the range `[-100, 100]`.
- The maximum depth of any integer is less than or equal to `50`.

## Approach

First perform a traversal purely to determine the maximum nesting depth. Then perform a second traversal, this time summing each integer's value multiplied by `maxDepth - depth + 1`, which gives shallower integers a larger weight than deeper ones.

## C# Solution

```csharp
public class Solution
{
    public int DepthSumInverse(IList<NestedInteger> nestedList)
    {
        int maxDepth = FindMaxDepth(nestedList, 1);
        return Dfs(nestedList, 1, maxDepth);
    }

    private int FindMaxDepth(IList<NestedInteger> list, int depth)
    {
        int maxDepth = depth;
        foreach (var item in list)
        {
            if (!item.IsInteger())
                maxDepth = Math.Max(maxDepth, FindMaxDepth(item.GetList(), depth + 1));
        }

        return maxDepth;
    }

    private int Dfs(IList<NestedInteger> list, int depth, int maxDepth)
    {
        int sum = 0;
        foreach (var item in list)
        {
            if (item.IsInteger())
                sum += item.GetInteger() * (maxDepth - depth + 1);
            else
                sum += Dfs(item.GetList(), depth + 1, maxDepth);
        }

        return sum;
    }
}
```

## Complexity

- **Time:** `O(n)` — two linear passes over the structure.
- **Space:** `O(d)` for the recursion stack, where `d` is the maximum nesting depth.
